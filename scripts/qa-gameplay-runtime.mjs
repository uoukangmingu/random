import assert from 'node:assert/strict'
import vm from 'node:vm'
import { readFile } from 'node:fs/promises'

const source = await readFile('script.js', 'utf8')
const rulesContext = { window: {} }
vm.runInNewContext(await readFile('src/shared/gameplay-rules.js', 'utf8'), rulesContext)
const rules = rulesContext.window.RandomRouletteGameplay
function install(c, names) {
  vm.createContext(c)
  for (const name of names) {
    const start = source.indexOf(`function ${name}(`)
    assert(start >= 0, name)
    const end = source.indexOf('\n}', start) + 2
    vm.runInContext(source.slice(start, end), c, { filename: name })
  }
}
const noop = () => {}
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
function clock(c) {
  let now = 0, id = 0
  const timers = new Map()
  c.performance = { now: () => now }
  c.setTimeout = (fn, delay) => { timers.set(++id, { fn, at: now + delay }); return id }
  c.setInterval = (fn, delay) => { timers.set(++id, { fn, at: now + delay, interval: delay }); return id }
  c.clearTimeout = c.clearInterval = (key) => timers.delete(key)
  return { timers, advance(ms) {
    const end = now + ms
    for (;;) {
      const entry = [...timers].filter(([, t]) => t.at <= end).sort((a, b) => a[1].at - b[1].at)[0]
      if (!entry) break
      const [key, t] = entry; now = t.at
      if (t.interval) t.at += t.interval
      else timers.delete(key)
      t.fn()
    }
    now = end
  } }
}

// A later array entry that crosses earlier must win the photo finish.
const form = rules.createRaceForm(() => .5)
assert(rules.raceSprintBoost(.6, form) === 0)
assert(rules.raceSprintBoost(.85, form) > 0)
assert(rules.raceSprintBoost(1, form) === 0)
assert.notDeepEqual(rules.createRaceForm(() => .1), rules.createRaceForm(() => .9))
const race = {
  window: { RandomRouletteGameplay: rules }, document: { hidden: false }, Math: Object.create(Math),
  raceHorses: [99.8, 99.95].map((progress, i) => ({ ...form, id: i, label: String(i), progress, finished: false, bonusSpeed: 0, slowPenalty: 0, eventUntil: 0, fallUntil: 0 })),
  raceRunning: true, raceFinished: false, raceLastTimestamp: 1000, raceElapsedMs: 1000, raceLastRankingRenderAt: 1000,
  raceFinishOrder: [], RACE_DISTANCE: 100, APP_PERFORMANCE_PROFILE: { animationFrameInterval: 0 },
  SFX_THROTTLE_MS: {}, getFastForwardMultiplier: () => 1, clampValue: clamp,
  playThrottledSfx: noop, playSfx: noop, updateHorsePosition: noop, maybeCommentLeaderChange: noop,
  getRaceSortedHorses() { return this.raceHorses.slice().sort((a,b) => b.progress-a.progress) },
  renderRaceRanking: noop, releaseFastForward: noop, setRaceInputLock: noop, setRaceShuffleLock: noop,
  raceStatusText: {}, stopRaceLoop: noop, showRaceResultsPopup: noop, addRaceCommentary: noop, requestAnimationFrame: noop
}
race.Math.random = () => .5
race.getRaceSortedHorses = () => race.raceHorses.slice().sort((a,b)=>b.progress-a.progress)
install(race, ['raceFrame', 'finishHorse'])
race.raceFrame(1050)
assert.equal(race.raceFinishOrder[0].id, 1)
assert(race.raceFinishOrder[0].finishElapsedMs < race.raceFinishOrder[1].finishElapsedMs)
assert.equal(race.raceFinished, true)

// A slow foreground frame advances elapsed race time instead of dropping it at 50ms.
race.raceRunning = true; race.raceFinished = false; race.raceElapsedMs = 0
race.raceLastTimestamp = 1000; race.raceFinishOrder = []
race.raceHorses.forEach((horse) => { horse.progress = 0; horse.finished = false })
race.raceFrame(1750)
assert.equal(race.raceElapsedMs, 750)
assert(race.raceHorses.every((horse) => horse.progress > 10 && horse.progress < 100))

// Either late card can be first; the first-three phase and double-flip guards stay intact.
const cards = { window: { RandomRouletteGameplay: rules }, battleGameRunning: true, battleInteractionLocked: false, battlePhase: 'phase2', battleRoundPlayers: [0,1].map(()=>({ phase1Done: true, phase2Revealed: [false,false], finalDone: false })) }
install(cards, ['canFlipBattleCard', 'getBattleCardAvailabilityState'])
const [a,b] = cards.battleRoundPlayers
assert(cards.canFlipBattleCard(a, 4))
assert(cards.canFlipBattleCard(a, 3))
assert(cards.getBattleCardAvailabilityState(a, 4, null).isEnabled)
b.phase1Done = false
assert(!cards.canFlipBattleCard(a, 4))
b.phase1Done = true
a.phase2Revealed[1] = true
assert(cards.canFlipBattleCard(a, 3))
assert(!cards.canFlipBattleCard(a, 4))
b.phase2Revealed[0] = true
assert(cards.canFlipBattleCard(b, 4))
assert(!cards.canFlipBattleCard(b, 3))
cards.battleInteractionLocked = true
assert(!cards.canFlipBattleCard(a, 3))

// Short taps do not hand over a turn. Pointer cancellation and second fingers do not either.
const balloon = {
  window: { RandomRouletteGameplay: rules }, BALLOON_MIN_HOLD_MS: 600, BALLOON_PRESS_INTERVAL_MS: 64,
  balloonPlayers: [{ id: 1, label: 'A' }, { id: 2, label: 'B' }], balloonCurrentIndex: 0,
  balloonGameStarted: true, balloonPopped: false, balloonHolding: false, balloonPressure: 0, balloonBurstPressure: 10000,
  balloonTurnHeldMs: 0, balloonLastInflateAt: 0, balloonTurnRate: 1, balloonActivePointerId: null, balloonHoldTimer: null,
  balloonPressArea: null, balloonStatusText: {}, balloonStageHint: {}, SFX_THROTTLE_MS: {},
  rand: (a,b) => (a+b)/2, getCurrentBalloonPlayer: () => ({label: 'next'}),
  isUsingBalloonPhonePassMode: () => false, playThrottledSfx: noop, updateBalloonVisual: noop,
  renderBalloonGame: noop, renderBalloonPlayers: noop, popBalloon() { balloon.balloonPopped=true; balloon.balloonGameStarted=false; balloon.stopBalloonHold() }
}
const bc = clock(balloon)
install(balloon, ['startBalloonPress', 'endBalloonPress', 'inflateBalloonOnce', 'stopBalloonHold', 'advanceBalloonTurn'])
balloon.startBalloonPress({pointerId:1}); bc.advance(100); balloon.endBalloonPress({pointerId:1})
assert.equal(balloon.balloonCurrentIndex,0)
assert(balloon.balloonPressure > 0)
balloon.startBalloonPress({pointerId:1}); bc.advance(100); balloon.endBalloonPress({pointerId:2})
assert(balloon.balloonHolding)
bc.advance(600); balloon.endBalloonPress({pointerId:1})
assert.equal(balloon.balloonCurrentIndex,1)
assert.equal(balloon.balloonTurnHeldMs,0)
balloon.startBalloonPress({pointerId:1}); bc.advance(800); balloon.endBalloonPress({pointerId:1,type:'pointercancel'})
assert.equal(balloon.balloonCurrentIndex,1)
assert(!balloon.balloonHolding)
assert.equal(bc.timers.size,0)
assert(rules.balloonGrowth({elapsedMs:64,heldMs:2000,turnRate:1,random:()=>.5}) > rules.balloonGrowth({elapsedMs:64,heldMs:200,turnRate:1,random:()=>.5}))

// Feints keep the phase in STAY; real CLICK has a finite input deadline.
for (const random of [()=>0,()=>.5,()=>.99999]) {
  const p=rules.reactionPattern(random)
  assert(p.duration>=1800 && p.duration<=5400)
  assert(p.feints.length<=2)
  assert(p.feints.every(f=>f.at>0 && f.at+f.duration<p.duration))
}
let popups=0
const react = {
  window:{RandomRouletteGameplay:{...rules,reactionPattern:()=>({duration:2200,feints:[{at:600,duration:320,text:'WAIT!'}]})}},
  keyReactRoundToken:1,keyReactPhase:'idle',keyReactPlayers:[{id:1,label:'A',key:'A'},{id:2,label:'B',key:'S'}],keyReactResults:[],
  keyReactFeintText:'',keyReactFeintTimers:[],keyReactTimer:null,keyReactCountdownTimer:null,keyReactCountdownLeft:0,keyReactClickStartedAt:0,keyReactCapturePlayerId:'',
  keyReactStatusText:{},KEY_REACT_RESPONSE_MS:3000,
  updateKeyReactPhaseVisuals:noop,renderKeyReactGame:noop,playSfx:noop,setKeyReactInputLock:noop,showKeyReactResultsPopup:()=>popups++
}
const rc=clock(react)
install(react,['beginKeyReactStayPhase','triggerKeyReactClick','clearKeyReactTimer','recordKeyReactResult','getKeyReactPlayerResult','getValidKeyReactResults','finishKeyReactGame','stopKeyReactGame'])
react.beginKeyReactStayPhase(1);rc.advance(650)
assert.equal(react.keyReactPhase,'stay');assert.equal(react.keyReactFeintText,'WAIT!')
rc.advance(1600);assert.equal(react.keyReactPhase,'click')
react.recordKeyReactResult(react.keyReactPlayers[0],'valid',50)
rc.advance(3000)
assert.equal(react.keyReactResults[1].status,'timeout')
assert.equal(react.keyReactPhase,'finished');assert.equal(popups,1)
assert.equal(rc.timers.size,0)
react.keyReactRoundToken=2;react.keyReactResults=[];react.beginKeyReactStayPhase(2)
react.stopKeyReactGame();rc.advance(10000)
assert.equal(react.keyReactPhase,'idle');assert.equal(rc.timers.size,0)
console.log(JSON.stringify({raceCrossingOrder:'fraction, not lane order',raceSprint:'variable per round',lateCardOrder:'number or operator first',balloonMinimumHoldMs:600,balloonPointerOwnership:true,feintsNeverEnableInput:true,responseDeadlineMs:3000,resetCancelsTimers:true}))
