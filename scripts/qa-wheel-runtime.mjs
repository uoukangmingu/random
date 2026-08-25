import { webcrypto } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import vm from 'node:vm'

const root = path.resolve(import.meta.dirname, '..')
const frameMs = 1000 / 60
let now = 0
let nextFrameId = 1
let frameQueue = []

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
}

const canvasContext = new Proxy({}, {
  get(target, property) {
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
}

const elementIds = [
  'wheelItemsInput', 'wheelAutoRemoveCheckbox', 'wheelUseRosterBtn', 'wheelSpinBtn',
  'wheelCenterButton', 'wheelRespinnerBtn', 'wheelRemoveWinnerBtn', 'wheelInputStatus',
  'wheelTotalWeightBadge', 'wheelResultCard', 'wheelResultText', 'wheelHistoryList',
  'wheelClearHistoryBtn'
]
const elements = Object.fromEntries(elementIds.map((id) => [id, new MockElement()]))
elements.wheelCanvas = new MockCanvas()
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
    createElement: () => new MockElement()
  },
  MutationObserver: class MutationObserver {
    observe() {}
  },
  requestAnimationFrame(callback) {
    const id = nextFrameId
    nextFrameId += 1
    frameQueue.push({ id, callback })
    return id
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

const sampleTimes = [5200, 5800, 6400, 7000, 7600, 8000]
const samples = []
for (const target of sampleTimes) {
  runUntil(target)
  samples.push({ time: Math.round(now), angle: readAngle(), running: context.RandomRouletteWheel.isRunning() })
}

if (!samples.every((sample) => sample.running && Number.isFinite(sample.angle))) {
  throw new Error('모바일 룰렛이 8초 이전에 종료되거나 회전 transform이 누락됨')
}

const deltas = samples.slice(1).map((sample, index) => sample.angle - samples[index].angle)
if (!deltas.every((delta, index) => delta > 0 && (index === 0 || delta < deltas[index - 1]))) {
  throw new Error(`모바일 룰렛 후반 이동량이 단계적으로 감소하지 않음: ${deltas.join(', ')}`)
}

runUntil(8250)
if (context.RandomRouletteWheel.isRunning()) throw new Error('모바일 룰렛이 8.2초 이후에도 종료되지 않음')
if (elements.wheelCanvas.classList.contains('is-spinning') || elements.wheelCanvas.style.transform) {
  throw new Error('룰렛 종료 후 GPU 회전 상태가 정리되지 않음')
}
if (elements.wheelSpinBtn.disabled || elements.wheelResultText.textContent === '룰렛 회전 중…') {
  throw new Error('룰렛 종료 후 결과 확정 또는 조작 잠금 해제가 누락됨')
}

console.log(JSON.stringify({
  mobileDurationMs: 8200,
  stillSpinningAtMs: samples.at(-1).time,
  distancePer600Ms: deltas.map((value) => Number(value.toFixed(4))),
  finishedAtOrBeforeMs: Math.round(now),
  resultConfirmed: elements.wheelResultText.textContent
}))
