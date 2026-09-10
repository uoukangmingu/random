import assert from 'node:assert/strict'
import vm from 'node:vm'
import { readFile } from 'node:fs/promises'

const global = { window: {} }
vm.runInNewContext(await readFile('src/shared/soundtrack.js', 'utf8'), global)
const score = global.window.RandomRouletteSoundtrack
const keys = Object.keys(score.tracks)
assert.equal(keys.length, 18)
const signatures = new Set()
let eventCount = 0
for (const key of keys) {
  const events = Array.from({length: 64}, (_,tick) => score.scoreStep(key, tick))
  signatures.add(JSON.stringify(events))
  assert(events.flat().some(e => e.instrument === 'bass'))
  assert(events.flat().some(e => e.instrument === 'pad'))
  for (const event of events.flat()) {
    assert(score.instruments[event.instrument])
    assert(event.frequency >= 20 && event.frequency <= 12000)
    assert(event.gain > 0 && event.gain < .25)
    assert(event.duration > 0 && event.duration < 8)
    eventCount++
  }
  assert(score.getStepSeconds(key, true) > score.getStepSeconds(key, false))
  assert.equal(score.scoreStep(key, 0, {energy: -1}).length, 0)
}
assert.equal(signatures.size, 18, 'every screen score must differ')

// Exercise the actual Web Audio scheduler with a deterministic clock and node graph.
let now = 0, id = 0, peakSources = 0, createdSources = 0
const timers = new Map(), sources = new Set(), nodes = new Set()
const Param = () => ({value: 0, setValueAtTime(v,t){assert(Number.isFinite(v)&&Number.isFinite(t));this.value=v},
  linearRampToValueAtTime(v,t){this.setValueAtTime(v,t)}, exponentialRampToValueAtTime(v,t){assert(v>0);this.setValueAtTime(v,t)},
  cancelScheduledValues(){}, setTargetAtTime(v,t){this.setValueAtTime(v,t)} })
function node(source = false) {
  const n = { gain: Param(), frequency: Param(), Q: Param(), connected: false,
    connect(){this.connected = true}, disconnect(){this.connected = false},
    start(at){assert(at >= now - .001);this.startedAt=at;sources.add(this);peakSources=Math.max(peakSources,sources.size)},
    stop(at=now){this.stopsAt=at}, onended:null }
  nodes.add(n)
  if (source) createdSources++
  return n
}
const ctx = { state:'running', sampleRate:22050, get currentTime(){return now},
  createGain:()=>node(), createBiquadFilter:()=>node(), createOscillator:()=>node(true),createBufferSource:()=>node(true),
  createBuffer:(_,length)=>({getChannelData:()=>new Float32Array(length)}) }
const clock = { setInterval(fn,ms){timers.set(++id,{fn,at:now+ms/1000,interval:ms/1000});return id},
  clearInterval(key){timers.delete(key)},setTimeout(fn,ms){timers.set(++id,{fn,at:now+ms/1000});return id},clearTimeout(key){timers.delete(key)} }
function retireSources() { for (const s of [...sources]) if (s.stopsAt <= now) { sources.delete(s); s.onended?.() } }
function advance(seconds) {
  const end=now+seconds
  for (;;) {
    const task=[...timers].filter(([,t])=>t.at<=end).sort((a,b)=>a[1].at-b[1].at)[0]
    if (!task) break
    const [key,t]=task;now=t.at;retireSources()
    if (t.interval) t.at+=t.interval;else timers.delete(key)
    t.fn()
  }
  now=end;retireSources()
}
const player = score.createPlayer(ctx, {}, {timers: clock})
player.play('home');advance(8)
const timerCount=timers.size
player.play('home');assert.equal(timers.size,timerCount)
player.play('wheel');advance(8)
player.play('cardBattle',{night:true});advance(8)
let energy=.7
player.play('keyReact',{getEnergy:()=>energy});advance(2)
energy=-1;advance(.2)
const createdAtSilence=createdSources
advance(2)
assert.equal(createdSources,createdAtSilence,'reaction rounds must stop scheduling background notes')
energy=.7;advance(2)
assert(createdSources>createdAtSilence)
for (const key of keys) { player.play(key);advance(.02) }
advance(.5)
assert(peakSources<=96,'crossfades have a global voice cap')
// Simulate a suspended scheduler. Resumption must skip the missed score, not burst-play it.
for (const t of timers.values()) t.at += 12
now += 12;retireSources()
const beforeResume = createdSources
advance(.081)
assert(createdSources-beforeResume < 20)
player.stop();player.stop();advance(.4)
assert.equal(timers.size,0)
assert.equal(sources.size,0)
assert.equal([...nodes].filter(n=>n.connected).length,0)
player.play('race');advance(1);player.dispose();retireSources()
assert.equal(timers.size,0)
assert.equal(sources.size,0)
assert(!player.isPlaying())

// Check the real screen routing and gameplay-dependent mix, including the wheel.
const legacy = await readFile('script.js','utf8')
const routing = {window:{RandomRouletteWheel:{getPhase:()=> 'spinning'}, RandomRouletteSession:{isRunning:()=>false}},
  isKeyReactRunning:()=>true,bearFindVideoVisible:false,raceRunning:true,raceHorses:[{progress:800}],RACE_DISTANCE:1600,battleGameRunning:true,battlePhase:'phase2'}
vm.createContext(routing)
vm.runInContext(legacy.slice(legacy.indexOf('const SCREEN_BGM_PROFILES ='),legacy.indexOf('function getHorrorBgmProfile')),routing)
for (const name of ['getBgmProfileForScreen','getBgmEnergyForScreen']) {
  const a=legacy.indexOf(`function ${name}(`),b=legacy.indexOf('\n}',a)+2
  vm.runInContext(legacy.slice(a,b),routing)
}
const screenKeys=['wheel','game1','game2','game3','game4','game5','game6','game7','physicalBalloon','physicalBomb','physicalCircle','physicalKeyReact','physicalBearFind']
assert.equal(new Set(screenKeys.map(key=>routing.getBgmProfileForScreen(key).key)).size,13)
for (const key of ['home','menu','luck','physical',...screenKeys]) assert(score.tracks[routing.getBgmProfileForScreen(key).key])
assert.equal(routing.getBgmEnergyForScreen('physicalKeyReact'),-1)
assert.equal(routing.getBgmEnergyForScreen('wheel'),.8)
assert(routing.getBgmEnergyForScreen('game2')>.5)
console.log(JSON.stringify({soundtracks:keys.length,gameRoutes:screenKeys.length,scoreEventsChecked:eventCount,peakConcurrentSources:peakSources,duplicateStart:'ignored',crossfadeCleanup:'passed',reactionRoundMusic:'muted',lateScheduler:'skips missed beats',stopAndDispose:'no nodes or timers'}))
