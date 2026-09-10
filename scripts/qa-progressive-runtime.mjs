import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import vm from 'node:vm'

const source = await readFile('script.js', 'utf8')
const shell = await readFile('index.html', 'utf8')
const template = await readFile('src/index.template.html', 'utf8')
const markup = await readFile('app-markup.v3.28.js', 'utf8')
const sw = await readFile('sw.js', 'utf8')
const metrics = JSON.parse(await readFile('BUILD_METRICS.json', 'utf8'))
assert(metrics.initialScriptBytes < 5000 && metrics.initialCssBytes < 110000)
assert(!shell.includes('src="assets/matter') && !shell.includes('src="runtime.'))
assert(!shell.includes('id="game1Screen"') && !shell.includes('id="wheelScreen"'))
assert(shell.includes('media="print"') && shell.includes('id="homeScreen"'))
const actualIds = [...shell.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1])
const lazy = { window: {}, document: { querySelector() { return { insertAdjacentHTML(position, html) {
  actualIds.push(...[...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]))
} } } } }
vm.runInNewContext(markup, lazy)
vm.runInNewContext(markup, lazy)
const expectedIds = [...template.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1])
assert.deepEqual(actualIds.filter((id) => id !== 'appLoadStatus').sort(), expectedIds.sort())
assert.equal(new Set(actualIds).size, actualIds.length, 'Markup must mount once without duplicate IDs')
const precache = sw.slice(0, sw.indexOf("self.addEventListener('install'"))
assert(!/\.mp4|matter\.min|runtime\.v/.test(precache), 'Heavy assets must not be precached')
for (const match of precache.matchAll(/'\.\/([^']*)'/g)) {
  if (match[1]) await access(`dist/${match[1]}`)
}
for (const name of ['shell.v3.28.js', 'runtime.v3.28.js', 'app-markup.v3.28.js', 'sw.js']) {
  new vm.Script(await readFile(`dist/${name}`, 'utf8'), { filename: name })
}

const loader = await readFile('shell.v3.28.js', 'utf8')
async function exerciseLoader(failOnce = false) {
  const requests = [], listeners = new Map()
  let actionCount = 0, ready = false
  const button = { dataset: {}, textContent: '시작', setAttribute() {}, removeAttribute() {}, closest() { return this }, click() { assert(ready); actionCount++ } }
  const status = { textContent: '' }
  const context = {
    navigator: {}, location: { protocol: 'file:' }, setTimeout, clearTimeout,
    document: {
      readyState: 'complete',
      querySelector: () => null,
      getElementById: (id) => id === 'startBtn' ? button : status,
      addEventListener: (name, fn) => listeners.set(name, fn),
      removeEventListener: (name) => listeners.delete(name),
      createElement: () => ({ remove() {} }),
      head: { appendChild(node) {
        const url = node.src || node.href
        requests.push(url)
        queueMicrotask(() => {
          if (failOnce && url.includes('runtime.v3.28.css')) { failOnce = false; node.onerror(); return }
          if (url === 'runtime.v3.28.js') { ready = true; context.RandomRouletteApp = { ready: true } }
          node.onload()
        })
      } }
    }
  }
  context.window = context
  vm.runInNewContext(loader, context)
  assert.equal(requests.length, 0, 'Idle home must make no game request')
  const event = { target: button, preventDefault() {}, stopImmediatePropagation() {} }
  const handler = listeners.get('click')
  await Promise.all([handler(event), handler(event)])
  if (!ready) {
    assert.equal(actionCount, 0)
    assert(status.textContent.includes('다시'))
    await handler(event)
  }
  assert.equal(actionCount, 1, 'Deferred double click must launch exactly once')
  assert.equal(requests.filter((url) => url === 'runtime.v3.28.js').length, 1)
  assert(!requests.some((url) => url.includes('matter')))
  await Promise.all([context.RandomRouletteLoader.loadPhysics(), context.RandomRouletteLoader.loadPhysics()])
  assert.equal(requests.filter((url) => url.includes('matter')).length, 1)
  return { actionCount, requests: requests.length }
}
await exerciseLoader()
await exerciseLoader(true)

function fakeClock(context) {
  let now = 0, next = 0
  const timers = new Map()
  context.performance = { now: () => now }
  context.setTimeout = (fn, delay) => { const id = ++next; timers.set(id, { fn, at: now + delay }); return id }
  context.clearTimeout = (id) => timers.delete(id)
  return { timers, advance(ms) {
    const end = now + ms
    for (;;) {
      const item = [...timers.entries()].filter(([, v]) => v.at <= end).sort((a, b) => a[1].at - b[1].at)[0]
      if (!item) break
      timers.delete(item[0]); now = item[1].at; item[1].fn()
    }
    now = end
  } }
}
const timerContext = { document: { hidden: false } }
const clock = fakeClock(timerContext)
vm.createContext(timerContext)
const timerStart = source.indexOf('const game1Timers =')
const timerEnd = source.indexOf('function clearCountdownTimers()', timerStart)
vm.runInContext(source.slice(timerStart, timerEnd) + '\nthis.timers = game1Timers', timerContext)
let countdown = 0
timerContext.timers.timeout(() => countdown++, 1000)
clock.advance(400)
timerContext.document.hidden = true
timerContext.timers.pause()
assert.equal(clock.timers.size, 0)
clock.advance(60000)
assert.equal(countdown, 0, 'Hidden tab must not consume countdown time')
timerContext.document.hidden = false
timerContext.timers.resume()
clock.advance(599); assert.equal(countdown, 0)
clock.advance(1); assert.equal(countdown, 1)
const canceled = timerContext.timers.timeout(() => countdown++, 20)
timerContext.timers.cancel(canceled)
clock.advance(100); assert.equal(countdown, 1)

// Execute the real render loop with different refresh rates and a clock with jitter.
const renderStart = source.indexOf('function renderGame1CanvasOnce')
const renderEnd = source.indexOf('function initMatterWorld()', renderStart)
const pacing = []
for (const refreshHz of [60, 120, 144]) {
  for (const targetFps of [24, 30, 60]) {
    let painted = 0, id = 0
    const queue = new Map()
    const c = {
      render: {}, game1RenderRaf: null, game1RenderLastPaintAt: 0, game1PhysicsActive: true,
      Render: { world() { painted++ } }, document: { hidden: false },
      isGame1ActiveScreen: () => true,
      APP_PERFORMANCE_PROFILE: { canvasRenderInterval: 1000 / targetFps },
      requestAnimationFrame(fn) { queue.set(++id, fn); return id }, cancelAnimationFrame(i) { queue.delete(i) }
    }
    vm.createContext(c); vm.runInContext(source.slice(renderStart, renderEnd), c)
    c.startGame1RenderLoop()
    for (let frame = 1; frame <= refreshHz * 5; frame++) {
      const callbacks = [...queue.values()]; queue.clear()
      for (const fn of callbacks) fn(frame * 1000 / refreshHz + (frame % 3) * 0.1)
    }
    const actualFps = painted / 5
    assert(Math.abs(actualFps - targetFps) < 1, `${refreshHz}Hz/${targetFps}fps: got ${actualFps}`)
    c.document.hidden = true
    for (const fn of [...queue.values()]) fn(6000)
    assert.equal(c.game1RenderRaf, null)
    pacing.push({ refreshHz, targetFps, actualFps })
  }
}

const visibilityStart = source.indexOf('function syncGameVisibility()')
const visibilityEnd = source.indexOf("document.addEventListener('visibilitychange', syncGameVisibility)", visibilityStart)
for (const game of ['game2', 'game4', 'game6']) {
  let runnerStarts = 0, intervalStarts = 0, raceStarts = 0
  const c = {
    document: { hidden: true },
    balloonHolding: false, isKeyReactRunning: () => false,
    screens: Object.fromEntries(['game1', 'game2', 'game4', 'game6'].map((name) => [name, { classList: { contains: () => name === game } }])),
    raceAnimationFrame: 1, raceEventTimer: 2, raceCommentaryTimer: 3, raceLastTimestamp: 500,
    raceRunning: game === 'game2', raceFinished: false, raceFrame() {},
    simArenaRunner: game === 'game4' ? {} : null, simArenaEngine: {}, simBattleRunning: game === 'game4', simRenderRaf: 4, simVisibilityPaused: false,
    stockGameInterval: 5, stockLastSchedulerAt: 500, stockGameRunning: game === 'game6', STOCK_SCHEDULER_INTERVAL_MS: 100,
    cancelAnimationFrame() {}, clearTimeout() {}, clearInterval() {},
    pauseGame1Physics() {}, resumeGame1Physics() {},
    Runner: { stop() {}, run() { runnerStarts++ } }, startSimRenderLoop() {},
    scheduleRaceEventLoop() { raceStarts++ }, scheduleRaceCommentaryLoop() {},
    requestAnimationFrame: () => 10, tickStockGame() {},
    performance: { now: () => 60000 }, setInterval() { intervalStarts++; return 20 }
  }
  vm.createContext(c); vm.runInContext(source.slice(visibilityStart, visibilityEnd), c)
  c.syncGameVisibility()
  assert.equal(c.raceAnimationFrame, null); assert.equal(c.stockGameInterval, null)
  c.document.hidden = false
  c.syncGameVisibility(); c.syncGameVisibility()
  assert.equal(runnerStarts, game === 'game4' ? 1 : 0)
  assert.equal(intervalStarts, game === 'game6' ? 1 : 0)
  assert.equal(raceStarts, game === 'game2' ? 1 : 0)
}
console.log(JSON.stringify({ lazyMountIds: actualIds.length, duplicateIds: 0, delayedActions: 'once', networkRetry: 'passed', physicsLoad: 'on demand, once', hiddenCountdown: 'remaining time preserved', visibilityResume: 'race / battle / stock, once', pacing }))
