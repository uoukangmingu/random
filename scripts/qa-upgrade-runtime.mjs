import assert from 'node:assert/strict'
import { webcrypto } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'

// Deterministic, browser-free regressions for v3.24's changed behavior.
class Element {
  constructor() {
    Object.assign(this, { value: '', textContent: '', disabled: false, checked: false, style: {}, children: [], attributes: {}, isConnected: true })
    this.listeners = new Map()
    const classes = new Set()
    this.classList = {
      add: (...names) => names.forEach((n) => classes.add(n)),
      remove: (...names) => names.forEach((n) => classes.delete(n)),
      contains: (n) => classes.has(n),
      toggle: (n, on = !classes.has(n)) => { on ? classes.add(n) : classes.delete(n); return on }
    }
  }
  addEventListener(type, fn) { const list = this.listeners.get(type) || []; list.push(fn); this.listeners.set(type, list) }
  dispatchEvent(event) { for (const fn of this.listeners.get(event.type) || []) fn(event) }
  setAttribute(name, value) { this.attributes[name] = String(value) }
  append(...children) { this.children.push(...children) }
  appendChild(child) { this.children.push(child); return child }
  replaceChildren(...children) { this.children = children }
  getBoundingClientRect() { return { width: 360, height: 360 } }
  focus() {}
}

const sources = await Promise.all(['src/shared/rng.js', 'src/shared/game-engine.js', 'src/games/wheel.js'].map((name) => readFile(name, 'utf8')))
function wheelHarness({ compositor = false, stored = [], reduced = false, active = true } = {}) {
  let now = 0, nextId = 0, paints = 0
  const frames = new Map(), timers = new Map(), elements = new Map(), storage = new Map(stored)
  const element = (id) => { if (!elements.has(id)) elements.set(id, new Element()); return elements.get(id) }
  element('wheelItemsInput').value = '치킨 | 3\n피자 | 1\n국수 | 1'
  element('wheelScreen').classList.toggle('active', active)
  const canvas = element('wheelCanvas')
  const noop = () => {}
  canvas.getContext = () => ({ setTransform: noop, clearRect: () => paints++, beginPath: noop, moveTo: noop, arc: noop, closePath: noop, fill: noop, stroke: noop, save: noop, translate: noop, rotate: noop, fillText: noop, restore: noop, measureText: (text) => ({ width: text.length * 8 }) })
  if (compositor) canvas.animate = () => { throw new Error('Unreliable Web Animations must not be used') }

  const document = Object.assign(new Element(), { hidden: false, documentElement: new Element(), getElementById: element, createElement: () => new Element() })
  const events = new Element()
  const context = {
    document, crypto: webcrypto, Date, Intl, Math, Uint32Array,
    innerWidth: 390, innerHeight: 844, devicePixelRatio: 3,
    performance: { now: () => now },
    localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
    setTimeout: (fn, delay) => { const id = ++nextId; timers.set(id, { fn, at: now + delay }); return id },
    clearTimeout: (id) => timers.delete(id),
    requestAnimationFrame: (fn) => { const id = ++nextId; frames.set(id, fn); return id },
    cancelAnimationFrame: (id) => frames.delete(id),
    MutationObserver: class { observe() {} },
    addEventListener: events.addEventListener.bind(events),
    matchMedia: (query) => ({ matches: query.includes('reduced') ? reduced : query.includes('coarse') }),
    RandomRoulettePerformance: { profile: { qualityLevel: 'low' } },
    RandomRouletteRegistry: { isPhoneLikeDevice: () => true },
    RandomRouletteRoster: { getNames: () => [], hasRoster: () => false },
    RandomRouletteWakeLock: { sync() {} }, playSfx() {}, showPopup() {}
  }
  context.window = context
  vm.createContext(context)
  for (const source of sources) vm.runInContext(source, context)
  context.RandomRouletteWheel.init()
  function advance(ms) {
    const end = now + ms
    while (now < end) {
      now = Math.min(end, now + 1000 / 60)
      for (const [id, timer] of [...timers]) if (timer.at <= now) { timers.delete(id); timer.fn() }
      const callbacks = [...frames.values()]; frames.clear()
      for (const fn of callbacks) fn(now)
    }
  }
  function hidden(value) { document.hidden = value; document.dispatchEvent({ type: 'visibilitychange' }) }
  return { context, document, element, storage, events, advance, hidden, frames, canvas, paints: () => paints }
}

const h = wheelHarness()
h.advance(20)
assert.equal(h.canvas.width, 450, 'low mode should cap the backing store at 1.25x')
const before = h.paints()
for (let i = 0; i < 100; i++) h.events.dispatchEvent({ type: 'resize' })
assert.equal(h.frames.size, 1, 'a resize burst should enqueue one draw')
h.advance(20)
assert.equal(h.paints(), before + 1)
h.element('wheelScreen').classList.remove('active')
h.events.dispatchEvent({ type: 'resize' }); h.advance(20)
assert.equal(h.paints(), before + 1, 'an inactive wheel must not paint')
h.element('wheelScreen').classList.add('active')
const spinPaintsBefore = h.paints()
h.context.RandomRouletteWheel.spin(); h.advance(2000)
h.context.RandomRouletteWheel.requestStop(); h.advance(600)
const framesBeforePause = h.paints()
h.hidden(true); h.advance(60000)
assert.equal(h.paints(), framesBeforePause)
assert(h.context.RandomRouletteWheel.isRunning())
h.hidden(false); h.advance(2500)
assert(h.context.RandomRouletteWheel.isRunning(), 'hidden time must not skip the deceleration')
h.advance(3000)
assert(!h.context.RandomRouletteWheel.isRunning())
assert.equal(JSON.parse(h.storage.get('roulette-basic-wheel-history-v1')).length, 1)
assert.equal(h.paints() - spinPaintsBefore, 2, 'a complete spin must paint only at start and finish')

const independent = wheelHarness({ compositor: true })
independent.context.RandomRouletteWheel.spin()
independent.advance(1000)
const firstAngle = independent.canvas.style.transform
independent.advance(1000)
assert.notEqual(independent.canvas.style.transform, firstAngle, 'the visible wheel must advance')
independent.context.RandomRouletteWheel.spin()
independent.advance(7200)
assert(independent.context.RandomRouletteWheel.isRunning(), 'must wait for STOP')
independent.context.RandomRouletteWheel.requestStop()
independent.advance(5400)
assert(!independent.context.RandomRouletteWheel.isRunning())
assert.equal(JSON.parse(independent.storage.get('roulette-basic-wheel-history-v1')).length, 1, 'repeated starts must not duplicate results')
assert.equal(independent.element('wheelSpinProgress').hidden, true)
assert.equal(independent.element('wheelHistoryCount').textContent, '1')

const reduced = wheelHarness({ reduced: true })
reduced.context.RandomRouletteWheel.spin()
reduced.advance(1000)
assert(reduced.context.RandomRouletteWheel.isRunning(), 'reduced motion still needs visible draw feedback')
reduced.context.RandomRouletteWheel.requestStop()
reduced.advance(2700)
assert(!reduced.context.RandomRouletteWheel.isRunning())
assert.equal(JSON.parse(reduced.storage.get('roulette-basic-wheel-history-v1')).length, 1)

const cancelled = wheelHarness()
cancelled.context.RandomRouletteWheel.spin()
cancelled.advance(50)
cancelled.context.RandomRouletteWheel.requestStop()
cancelled.context.RandomRouletteWheel.cancelSpin()
cancelled.advance(20000)
assert(!cancelled.context.RandomRouletteWheel.isRunning())
assert.equal(cancelled.element('wheelCenterButton').textContent, 'SPIN')
assert(!cancelled.storage.has('roulette-basic-wheel-history-v1'), 'cancelled spins must never record a winner')

const goodRecord = { winner: '유효 기록', selectedWeight: 1, totalWeight: 3, createdAt: Date.now() }
const repaired = wheelHarness({ stored: [['roulette-basic-wheel-history-v1', JSON.stringify([null, {}, { ...goodRecord, createdAt: 'bad' }, goodRecord])]] })
assert.equal(repaired.element('wheelHistoryList').children.length, 1)
const input = repaired.element('wheelItemsInput')
input.value = ''; input.dispatchEvent({ type: 'input' }); repaired.advance(250)
assert.equal(repaired.storage.get('roulette-basic-wheel-draft-v1'), '')
const restored = wheelHarness({ stored: [...repaired.storage] })
assert.equal(restored.element('wheelItemsInput').value, '')
assert(restored.element('wheelSpinBtn').disabled)

const pwaSource = await readFile('src/shared/pwa.js', 'utf8')
let resolveRequest, requested = 0, released = 0
const sentinel = { addEventListener() {}, release: async () => { released++ } }
const wakeContext = {
  document: { visibilityState: 'visible' },
  navigator: { wakeLock: { request: () => { requested++; return new Promise((resolve) => { resolveRequest = resolve }) } } }
}
wakeContext.window = wakeContext
vm.runInNewContext(pwaSource, wakeContext)
wakeContext.RandomRouletteWakeLock.request()
wakeContext.RandomRouletteWakeLock.request()
await Promise.resolve()
assert.equal(requested, 1, 'concurrent starts must share a wake lock request')
wakeContext.RandomRouletteWakeLock.release()
resolveRequest(sentinel)
for (let i = 0; i < 8; i++) await Promise.resolve()
assert.equal(released, 1, 'a late wake lock must be released after the game stops')
assert(!wakeContext.RandomRouletteWakeLock.isActive())

console.log(JSON.stringify({ resizeDrawsPer100Events: 1, canvasPaintsPerSpin: 2, inactiveWheelPaints: 0, lowModeDpr: 1.25, hiddenTimeExcluded: true, rotationIndependentOfWebAnimations: true, reducedMotionShortSpin: true, malformedHistoryRecovered: true, emptyDraftRestored: true, lateWakeLockReleased: true }))
