import { webcrypto } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import vm from 'node:vm'
import assert from 'node:assert/strict'

const root = path.resolve(import.meta.dirname, '..')
const simulatedFps = 30
const frameMs = 1000 / simulatedFps
let now = 0
let nextFrameId = 1
let frameQueue = []
let textureDraws = 0

function queueFrame(callback) {
  const id = nextFrameId
  nextFrameId += 1
  frameQueue.push({ id, callback })
  return id
}

class MockClassList {
  constructor() {
    this.values = new Set()
  }

  add(...names) {
    names.forEach((name) => this.values.add(name))
  }

  remove(...names) {
    names.forEach((name) => this.values.delete(name))
  }

  contains(name) {
    return this.values.has(name)
  }

  toggle(name, force) {
    if (force === undefined) {
      if (this.values.has(name)) {
        this.values.delete(name)
        return false
      }
      this.values.add(name)
      return true
    }
    if (force) this.values.add(name)
    else this.values.delete(name)
    return Boolean(force)
  }
}

class MockElement {
  constructor() {
    this.value = ''
    this.textContent = ''
    this.disabled = false
    this.checked = false
    this.className = ''
    this.classList = new MockClassList()
    this.style = {}
    this.listeners = new Map()
    this.children = []
    this.offsetWidth = 1
    this.isConnected = true
  }

  addEventListener(type, handler) {
    this.listeners.set(type, handler)
  }

  append(...children) {
    this.children.push(...children)
  }

  appendChild(child) {
    this.children.push(child)
    return child
  }

  replaceChildren(...children) {
    this.children = [...children]
  }

  focus() {}
  setAttribute(name, value) { this[name] = String(value) }
}

const canvasContext = new Proxy({}, {
  get(target, property) {
    if (property === 'drawImage') return () => { textureDraws++ }
    if (property === 'measureText') return (text) => ({ width: String(text).length * 10 })
    if (!(property in target)) target[property] = () => {}
    return target[property]
  },
  set(target, property, value) {
    target[property] = value
    return true
  }
})

class MockCanvas extends MockElement {
  constructor() {
    super()
    this.width = 720
    this.height = 720
  }

  getBoundingClientRect() {
    return { width: 360, height: 360 }
  }

  getContext(type) {
    return type === '2d' ? canvasContext : null
  }

  animate() {
    throw new Error('Wheel rotation must work without Web Animations')
  }
}

const elementIds = [
  'wheelItemsInput', 'wheelAutoRemoveCheckbox', 'wheelUseRosterBtn', 'wheelSpinBtn',
  'wheelCenterButton', 'wheelRespinnerBtn', 'wheelRemoveWinnerBtn', 'wheelInputStatus',
  'wheelTotalWeightBadge', 'wheelResultCard', 'wheelResultText', 'wheelHistoryList',
  'wheelClearHistoryBtn', 'wheelSpinProgress', 'wheelSpinProgressFill', 'wheelResultNote', 'wheelHistoryCount',
  'wheelSpeedInput', 'wheelSpeedStatus'
]
const elements = Object.fromEntries(elementIds.map((id) => [id, new MockElement()]))
elements.wheelCanvas = new MockCanvas()
elements.wheelMotionCanvas = new MockCanvas()
elements.wheelMotionCanvas.hidden = true
elements.wheelItemsInput.value = '점심 A | 1\n점심 B | 1\n점심 C | 1'

const storage = new Map()
const documentElement = new MockElement()
const context = {
  console,
  crypto: webcrypto,
  Date,
  Intl,
  Math,
  Uint32Array,
  setTimeout,
  clearTimeout,
  devicePixelRatio: 2,
  innerWidth: 390,
  innerHeight: 844,
  performance: { now: () => now },
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value)
  },
  document: {
    documentElement,
    getElementById: (id) => elements[id] || null,
    createElement: (tag) => tag === 'canvas' ? new MockCanvas() : new MockElement(),
    addEventListener() {}
  },
  MutationObserver: class MutationObserver {
    observe() {}
  },
  requestAnimationFrame(callback) {
    return queueFrame(callback)
  },
  cancelAnimationFrame(id) {
    frameQueue = frameQueue.filter((frame) => frame.id !== id)
  },
  addEventListener() {},
  matchMedia(query) {
    return { matches: query === '(pointer: coarse)' }
  },
  RandomRouletteRegistry: { isPhoneLikeDevice: () => true },
  RandomRouletteRoster: { getNames: () => [], hasRoster: () => false },
  RandomRouletteWakeLock: { sync() {} },
  playSfx() {},
  showPopup() {}
}
context.window = context

function runFrame() {
  now += frameMs
  const callbacks = frameQueue
  frameQueue = []
  callbacks.forEach(({ callback }) => callback(now))
}

function runUntil(targetMs) {
  while (now + 0.01 < targetMs) runFrame()
}

function readAngle() {
  const match = String(elements.wheelCanvas.style.transform || '').match(/rotate\(([-+0-9.eE]+)rad\)/)
  return match ? Number(match[1]) : null
}

vm.createContext(context)
for (const relativePath of ['src/shared/rng.js', 'src/shared/game-engine.js', 'src/games/wheel.js']) {
  const source = await readFile(path.join(root, relativePath), 'utf8')
  vm.runInContext(source, context, { filename: relativePath })
}

context.RandomRouletteWheel.init()
runFrame()
now = 0
context.RandomRouletteWheel.spin()

if (!context.RandomRouletteWheel.isRunning()) throw new Error('룰렛이 시작되지 않음')

// SPIN never chooses an automatic stopping time. Both controls remain usable.
runUntil(20000)
if (!context.RandomRouletteWheel.isRunning()) throw new Error('STOP 전에 자동 종료됨')
if (elements.wheelCenterButton.textContent !== 'STOP' || elements.wheelCenterButton.disabled || elements.wheelSpinBtn.disabled) throw new Error('STOP 조작 불가')
if (storage.get('roulette-basic-wheel-history-v1') && JSON.parse(storage.get('roulette-basic-wheel-history-v1')).length) throw new Error('STOP 전에 결과 저장됨')
const cruiseStart = readAngle()
runUntil(21000)
const cruiseTurnsPerSecond = (readAngle() - cruiseStart) / (Math.PI * 2)
if (Math.abs(cruiseTurnsPerSecond - 14) > .01) throw new Error('고속 회전 속도 오류')
context.RandomRouletteWheel.requestStop()
if (!elements.wheelCenterButton.disabled || context.RandomRouletteWheel.requestStop() !== false) throw new Error('STOP 중복 처리 오류')
const sampleTimes = [21700, 22400, 23100, 23800, 24500, 25200]
const samples = []
for (const target of sampleTimes) {
  runUntil(target)
  samples.push({ time: Math.round(now), angle: readAngle(), running: context.RandomRouletteWheel.isRunning() })
}
if (!samples.every((sample) => sample.running && Number.isFinite(sample.angle))) throw new Error('감속 중 회전이 끊김')
const deltas = samples.slice(1).map((sample, index) => sample.angle - samples[index].angle)
if (!deltas.every((delta, index) => delta > 0 && (index === 0 || delta < deltas[index - 1]))) throw new Error('감속 속도가 순차 감소하지 않음')
runUntil(26400)
if (context.RandomRouletteWheel.isRunning()) throw new Error('STOP 후 감속이 종료되지 않음')
if (elements.wheelCanvas.classList.contains('is-spinning') || elements.wheelCanvas.style.transform) throw new Error('회전 상태 정리 누락')
if (elements.wheelSpinBtn.disabled || elements.wheelCenterButton.textContent !== 'SPIN') throw new Error('SPIN 조작 복원 실패')
if (JSON.parse(storage.get('roulette-basic-wheel-history-v1')).length !== 1) throw new Error('결과가 한 번만 저장되지 않음')
console.log(JSON.stringify({ simulatedFps, manualStop: true, noAutomaticStopAfterSeconds: 20, cruiseTurnsPerSecond: Number(cruiseTurnsPerSecond.toFixed(2)), decelerationPer700ms: deltas.map(n=>Number(n.toFixed(4))), resultConfirmed: elements.wheelResultText.textContent }))

// Numeric speed is independent of selection weights and is editable while cruising.
function enterSpeed(value) {
  elements.wheelSpeedInput.value = value
  elements.wheelSpeedInput.listeners.get('input')()
}
for (const value of ['', '0', '-1', '.49', '10.1', 'Infinity', 'abc']) {
  enterSpeed(value)
  assert(elements.wheelSpinBtn.disabled)
  assert.equal(elements.wheelSpeedInput['aria-invalid'], 'true')
  context.RandomRouletteWheel.spin()
  assert(!context.RandomRouletteWheel.isRunning())
}
const speedResults = []
for (const multiplier of [.5, 2, 2.75, 10]) {
  enterSpeed(String(multiplier))
  assert(!elements.wheelSpinBtn.disabled)
  assert.equal(storage.get('roulette-basic-wheel-speed-v1'), String(multiplier))
  context.RandomRouletteWheel.spin()
  assert(!elements.wheelSpeedInput.disabled)
  runUntil(now + 1000)
  const before = readAngle()
  runUntil(now + 1000)
  const actual = (readAngle() - before) / (Math.PI * 2)
  assert(Math.abs(actual - 14 * multiplier) < .01)
  context.RandomRouletteWheel.requestStop()
  assert(elements.wheelSpeedInput.disabled, 'Speed changes must lock once braking starts')
  runUntil(now + 6000)
  assert(!context.RandomRouletteWheel.isRunning())
  assert(!elements.wheelSpeedInput.disabled)
  const last = JSON.parse(storage.get('roulette-basic-wheel-history-v1'))[0]
  assert.equal(last.selectedWeight, 1)
  assert.equal(last.totalWeight, 3)
  speedResults.push({multiplier,turnsPerSecond:Number(actual.toFixed(2))})
}
assert.equal(JSON.parse(storage.get('roulette-basic-wheel-history-v1')).length, 5)
const profile = context.RandomRouletteWheel.getSpinMotionProfile({reduceMotion:true,speedMultiplier:10})
assert.equal(profile.maxSpeed, Math.PI * 2 * 140)

// Raise and lower speed without restarting the current wheel or redrawing it every frame.
enterSpeed('1'); context.RandomRouletteWheel.spin(); runUntil(now + 1000)
const firstAngle = readAngle()
enterSpeed('10')
assert.equal(readAngle(), firstAngle, 'Live speed input must not jump the wheel angle')
runUntil(now + 500)
const fastStart = readAngle(), drawCount = textureDraws
runUntil(now + 1000)
assert(Math.abs((readAngle()-fastStart)/(Math.PI*2)-140) < .01)
assert.equal(textureDraws, drawCount, 'Stable high-speed frames must reuse the cached texture')
assert.equal(elements.wheelCanvas.style.opacity, '0')
assert.equal(elements.wheelMotionCanvas.hidden, false)
assert.equal(elements.wheelMotionCanvas.style.transform, elements.wheelCanvas.style.transform)
enterSpeed('')
assert(!elements.wheelSpinBtn.disabled, 'A temporarily empty speed input must not disable STOP')
enterSpeed('2'); runUntil(now + 500)
const slowStart = readAngle(); runUntil(now + 1000)
assert(Math.abs((readAngle()-slowStart)/(Math.PI*2)-28) < .01)
context.RandomRouletteWheel.requestStop(); runUntil(now + 6000)
assert.equal(elements.wheelMotionCanvas.hidden, true)
assert.equal(elements.wheelCanvas.style.opacity, '')
assert.equal(elements.wheelMotionCanvas.width, 1, 'The transient texture must be released after stopping')
assert.equal(JSON.parse(storage.get('roulette-basic-wheel-history-v1')).length, 6, 'Live speed changes must keep one outcome')

enterSpeed('10')
vm.runInContext(await readFile(path.join(root,'src/games/wheel.js'),'utf8'),context)
context.RandomRouletteWheel.init()
assert.equal(elements.wheelSpeedInput.value, '10', 'Speed setting must survive a reload')
console.log(JSON.stringify({speedResults,invalidSpeedBlocked:true,persisted:true,selectionWeightsPreserved:true,reducedMotionRespectsUserSpeed:true,liveChanges:'1→10→2, one outcome',stableSpeedTextureRedraws:0}))
