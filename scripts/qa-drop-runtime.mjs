import assert from 'node:assert/strict'
import vm from 'node:vm'
import { readFile } from 'node:fs/promises'

const source = await readFile('script.js', 'utf8')
const matter = await readFile('assets/matter.min.js', 'utf8')
const noop = () => {}
function install(c, names) {
  for (const name of names) {
    const start = source.indexOf(`function ${name}(`)
    assert(start >= 0, name)
    const end = source.indexOf('\n}', start) + 2
    vm.runInContext(source.slice(start, end), c, { filename: name })
  }
}

function scene(width = 760, height = 428, quality = 'balanced') {
  let now = 1, id = 0, seed = 27
  const tasks = new Map(), frames = new Map()
  const element = () => ({ style: {}, textContent: '', children: [], classList: { contains: () => true }, appendChild() {}, setAttribute() {} })
  const c = {
    console: { log: noop, warn: noop }, Math: Object.create(Math),
    document: { hidden: false, createElement: element },
    performance: { now: () => now },
    requestAnimationFrame(fn) { frames.set(++id, fn); return id }, cancelAnimationFrame(key) { frames.delete(key) },
    setTimeout(fn, delay) { tasks.set(++id, { fn, at: now + delay }); return id }, clearTimeout(key) { tasks.delete(key) },
    APP_PERFORMANCE_PROFILE: { qualityLevel: quality, physicsHz: 60, canvasRenderInterval: 1000/30 },
    configInput: { value: '치킨, 피자, 국수' }, statusText: {}, totalInfo: {},
    currentSlots: [], lastAppliedRawText: '', lastValidConfigText: '',
    engine: null, render: null, runner: null, world: null, game1PhysicsActive: false,
    game1RenderRaf: null, game1RenderLastPaintAt: 0, worldBodies: [], ballBodies: [], movingBodies: [],
    spawnTimers: [], game1SpawnSessionId: 0, game1RoundRunning: false, countTimer: null, countdownTimers: [],
    settleWatcherTimer: null, finalWatcherTimer: null, settleStableTicks: 0, finalStableTicks: 0,
    roundSpawnComplete: false, bombSequenceStarted: false, bombSequenceFinished: false,
    resultCountdownStarted: false, finalResultsShown: false, countRefreshQueued: false,
    boardWidth: width, boardHeight: height, currentScale: 1, currentBoardPadding: 18, slotAreaHeight: 100,
    BASE_BOARD_WIDTH: 1366, BASE_BOARD_HEIGHT: 768, MAX_SLOT_COUNT: 20, BOMB_COUNT: 20, SPAWN_INTERVAL_MS: 27,
    GAME1_WORLD_COLLISION_CATEGORY: 1, GAME1_BALL_COLLISION_CATEGORIES: [2,4,8,16],
    gameCanvasWrap: { ...element(), clientWidth: width, clientHeight: height }, slotOverlay: element(),
    screens: { game1: { classList: { contains: () => true } } },
    SFX_THROTTLE_MS: {},
    clampValue: (v,lo,hi) => Math.max(lo,Math.min(hi,v)), getCanvasPixelRatio: () => 1,
    getColorForName: () => '#eee', getBallPaletteByTheme: () => ['#eee'],
    getGame1BoardTheme: () => ({ moverPalette: ['#eee','#eee','#eee'], bumperPalette: ['#eee','#eee','#eee','#eee'] }),
    isDarkThemeEnabled: () => false, updateGame1BallCountText: noop, fitGameCanvasViewport: noop,
    syncGame1MobileLayout: noop, setDrawerState: noop, playSfx: noop, playThrottledSfx: noop,
    setGame1InputLock: noop, setGame1ShuffleLock: noop, releaseFastForward: noop,
    scheduleGameStartButtonStateSync: noop, setGameStartButtonRunningState: noop, startGameBtn: {},
    hasAtLeastTwoUniqueGame1Participants: slots => new Set(slots.map(s=>s.name)).size >= 2,
    showMinParticipantsPopup: noop, showPopup: noop, showResultsPopup: noop,
    getFastForwardMultiplier: () => 1, scheduleRefreshCounts: noop
  }
  c.Math.random = () => ((seed = Math.imul(seed,1664525)+1013904223 >>> 0) / 4294967296)
  c.window = c
  vm.createContext(c)
  vm.runInContext(matter, c)
  Object.assign(c, c.Matter)
  c.Render = {
    create: ({engine, options}) => ({ engine, options, canvas: element(), context: {}, bounds: {max:{}} }),
    world: noop, setPixelRatio: noop, setSize: noop
  }
  const timerStart = source.indexOf('const game1Timers =')
  vm.runInContext(source.slice(timerStart, source.indexOf('function clearCountdownTimers()', timerStart)), c)
  install(c, ['canUseMatterPhysics','showMatterUnavailablePopup','getBallCountBySlotCount','getCurrentNormalBallCount','getCurrentTotalDropCount',
    'getBoardScale','S','rand','shuffleArray','parseConfigToSlots','handleParseFailure','setCurrentSlots',
    'ensureGameReady','applyAdaptiveEngineIterations','initMatterWorld','renderGame1CanvasOnce','stopGame1RenderLoop','startGame1RenderLoop',
    'pauseGame1Physics','resumeGame1Physics','isGame1ActiveScreen','handleGame1CollisionAudio','stopGame1LiveRound',
    'getGame1BallCollisionFilter','clearSpawnTimers','clearCountdownTimers','clearSettleWatcher','clearFinalWatcher','resetRoundState',
    'clearWorldBodies','addMovingBody','animateMovingBodies','buildBoard','createBall','spawnBalls','getScaledDelay',
    'clearBallsOnly','startRound','resetRound','hasLiveRound','getSlotCountsPerIndex','getAggregatedCounts',
    'areAllBallsCalm','getUndroppedNormalBalls','areUndroppedNormalBallsCalm','hideMainMovingObstacles','startSettleWatcher','startBombCountdown',
    'explodeSingleBomb','triggerBombExplosionChain','startFinalResultsWatcher','startResultCountdown','finalizeResults'])
  c.renderSlotsOverlay = c.refreshCounts = noop
  function advance(ms) {
    const end = now + ms
    while (now < end) {
      const until = Math.min(now + 1000/60, end)
      for (;;) {
        const entry = [...tasks].filter(([,t])=>t.at <= until).sort((a,b)=>a[1].at-b[1].at)[0]
        if (!entry) break
        tasks.delete(entry[0]); now = entry[1].at; entry[1].fn()
      }
      now = until
      const callbacks = [...frames.values()]; frames.clear()
      for (const fn of callbacks) fn(now)
    }
  }
  return {c, advance, tasks, frames}
}

const results = []
for (const [width,height,quality] of [[760,428,'balanced'],[320,380,'low'],[1100,619,'high']]) {
  const s = scene(width,height,quality), {c} = s
  // Tab hidden on the menu before the physics engine has ever been created.
  c.document.hidden = true; c.pauseGame1Physics(); s.advance(30000)
  c.document.hidden = false
  assert.equal(c.ensureGameReady(), true)
  c.startRound()
  assert.equal(c.ballBodies.length, 1, 'First ball must appear in the start click')
  assert(c.hasLiveRound(), 'Navigation and double-click guards must engage immediately')
  c.startRound()
  assert.equal(c.ballBodies.length, 1, 'Duplicate start must not rebuild the round')
  s.advance(5000)
  assert(c.ballBodies.length > 150, 'First entry after a hidden menu must resume spawn timers')
  const firstCounts = c.getSlotCountsPerIndex().reduce((a,b)=>a+b,0)
  assert(firstCounts > 0, 'The real physics engine must deliver balls to the bowls')
  assert(c.spawnTimers.length <= 1, 'Only the pending spawn task should be retained')

  c.document.hidden = true; c.pauseGame1Physics()
  const ballCount = c.ballBodies.length, timestamp = c.engine.timing.timestamp
  s.advance(60000)
  assert.equal(c.ballBodies.length, ballCount)
  assert.equal(c.engine.timing.timestamp, timestamp)
  c.document.hidden = false; c.resumeGame1Physics(); c.resumeGame1Physics()
  s.advance(2000)
  assert.equal(c.ballBodies.length, 240, 'All 220 marbles and 20 bombs must spawn exactly once')
  assert(c.engine.timing.timestamp - timestamp < 2100, 'Repeated resume must not duplicate the physics loop')

  c.resetRound(); s.advance(1000)
  assert.equal(c.ballBodies.length, 0)
  assert(!c.hasLiveRound())
  c.startRound(); s.advance(500)
  c.stopGame1LiveRound(); s.advance(3000)
  assert.equal(c.ballBodies.length, 0, 'Leaving the game must cancel pending spawns')
  c.ensureGameReady(); c.startRound(); s.advance(5000)
  assert(c.ballBodies.length > 150, 'Re-entry must allow another complete drop')
  c.stopGame1LiveRound()
  assert.equal(s.tasks.size, 0)
  results.push({width,height,quality,firstCounts,immediateFirstBall:true,hiddenResume:true,resetAndReentry:true})
}
console.log(JSON.stringify({dropRuntime:results}))
