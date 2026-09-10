import { readFile } from 'node:fs/promises'
import path from 'node:path'
import vm from 'node:vm'

const root = process.cwd()
const source = await readFile(path.join(root, 'script.js'), 'utf8')
const managerEnd = source.indexOf('\nconst screens =')
if (managerEnd < 0) throw new Error('성능 관리자 분리 지점을 찾지 못함')
const managerSource = source.slice(0, managerEnd)

class MockClassList {
  constructor() { this.values = new Set() }
  add(...items) { items.forEach((item) => this.values.add(item)) }
  remove(...items) { items.forEach((item) => this.values.delete(item)) }
  contains(item) { return this.values.has(item) }
  toggle(item, force) {
    if (force === undefined) force = !this.values.has(item)
    if (force) this.values.add(item)
    else this.values.delete(item)
    return Boolean(force)
  }
}

class MockButton {
  constructor(mode) {
    this.dataset = { performanceMode: mode }
    this.classList = new MockClassList()
    this.attributes = new Map()
    this.listeners = new Map()
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)) }
  addEventListener(type, handler) { this.listeners.set(type, handler) }
  click() { this.listeners.get('click')?.() }
}

function createContext(options = {}) {
  const {
    userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    platform = 'Windows',
    mobile = false,
    maxTouchPoints = 0,
    coarse = false,
    memory = 16,
    threads = 16,
    width = 1440,
    height = 900
  } = options
  const storage = new Map()
  const rafQueue = []
  let rafId = 0
  const timers = new Map()
  let timerId = 0
  const listeners = new Map()
  const buttons = ['auto', 'quality', 'performance'].map((mode) => new MockButton(mode))
  const status = { textContent: '' }
  const documentElement = { classList: new MockClassList(), dataset: {} }
  const body = { classList: new MockClassList() }
  const context = {
    console,
    Date,
    JSON,
    Math,
    Set,
    Object,
    navigator: {
      userAgent,
      platform,
      maxTouchPoints,
      deviceMemory: memory,
      hardwareConcurrency: threads,
      userAgentData: { mobile, platform },
      connection: { saveData: false }
    },
    innerWidth: width,
    innerHeight: height,
    devicePixelRatio: 1,
    matchMedia: () => ({ matches: coarse }),
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, String(value))
    },
    document: {
      hidden: false,
      documentElement,
      body,
      querySelectorAll: (selector) => selector === '[data-performance-mode]' ? buttons : [],
      getElementById: (id) => id === 'performanceQualityStatus' ? status : null
    },
    CustomEvent: class CustomEvent {
      constructor(type, init = {}) { this.type = type; this.detail = init.detail }
    },
    addEventListener(type, handler) {
      if (!listeners.has(type)) listeners.set(type, [])
      listeners.get(type).push(handler)
    },
    dispatchEvent(event) {
      ;(listeners.get(event.type) || []).forEach((handler) => handler(event))
      return true
    },
    requestAnimationFrame(callback) {
      const id = ++rafId
      rafQueue.push({ id, callback })
      return id
    },
    cancelAnimationFrame(id) {
      const index = rafQueue.findIndex((item) => item.id === id)
      if (index >= 0) rafQueue.splice(index, 1)
    },
    setTimeout(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay }); return id },
    clearTimeout(id) { timers.delete(id) }
  }
  context.window = context
  vm.createContext(context)
  vm.runInContext(managerSource, context, { filename: 'adaptive-performance-manager.js' })
  return { context, storage, rafQueue, buttons, status, documentElement, body, timers }
}

function runFrames(qa, frameCount, intervalMs, startAt = 0) {
  let timestamp = startAt
  for (let index = 0; index < frameCount; index += 1) {
    const callback = qa.rafQueue.shift()?.callback
    if (!callback) throw new Error('성능 측정 requestAnimationFrame 큐가 비어 있음')
    timestamp += intervalMs
    callback(timestamp)
  }
  return timestamp
}

const desktop = createContext()
desktop.context.RandomRoulettePerformance.init()
let state = desktop.context.RandomRoulettePerformance.getState()
if (state.isMobile || state.effectiveLevel !== 'balanced') throw new Error('Windows PC 자동 안전 시작 판정 오류')

desktop.buttons.find((button) => button.dataset.performanceMode === 'performance').click()
state = desktop.context.RandomRoulettePerformance.getState()
if (state.mode !== 'performance' || state.effectiveLevel !== 'low') throw new Error('성능 우선 수동 고정 실패')
if (desktop.storage.get('roulette-performance-preference') !== 'performance') throw new Error('성능 모드 저장 실패')

desktop.buttons.find((button) => button.dataset.performanceMode === 'quality').click()
state = desktop.context.RandomRoulettePerformance.getState()
if (state.mode !== 'quality' || state.effectiveLevel !== 'high') throw new Error('고화질 수동 고정 실패')

desktop.buttons.find((button) => button.dataset.performanceMode === 'auto').click()
let desktopTimestamp = runFrames(desktop, 27, 60)
state = desktop.context.RandomRoulettePerformance.getState()
if (state.mode !== 'auto' || state.effectiveLevel !== 'balanced') {
  throw new Error(`유휴 화면의 단발성 저하를 성급하게 반영함: ${state.effectiveLevel}`)
}
desktopTimestamp = runFrames(desktop, 27, 60, desktopTimestamp)
state = desktop.context.RandomRoulettePerformance.getState()
if (state.effectiveLevel !== 'low') throw new Error(`유휴 화면의 지속 저하 시 성능 보호 전환 실패: ${state.effectiveLevel}`)

const activeGameDesktop = createContext()
activeGameDesktop.body.classList.add('app-active-game')
activeGameDesktop.context.RandomRoulettePerformance.init()
runFrames(activeGameDesktop, 18, 100)
state = activeGameDesktop.context.RandomRoulettePerformance.getState()
if (state.effectiveLevel !== 'low' || state.lastReason !== 'measured-emergency') {
  throw new Error(`게임 중 심한 프레임 저하의 즉시 보호 실패: ${state.effectiveLevel}/${state.lastReason}`)
}

const touchWindows = createContext({ maxTouchPoints: 10, coarse: true, width: 800, height: 600 })
state = touchWindows.context.RandomRoulettePerformance.getState()
if (state.isMobile || state.effectiveLevel !== 'balanced') throw new Error('터치 가능한 Windows PC 안전 판정 오류')

const officeDesktop = createContext({ memory: 8, threads: 16, width: 1920, height: 1080 })
state = officeDesktop.context.RandomRoulettePerformance.getState()
if (state.effectiveLevel !== 'balanced') throw new Error('다중 스레드 사무용 PC를 고품질로 오인함')

const lowDesktop = createContext({ memory: 4, threads: 4, width: 1920, height: 1080 })
state = lowDesktop.context.RandomRoulettePerformance.getState()
if (state.effectiveLevel !== 'low') throw new Error('저사양 PC 성능 보호 초기 판정 오류')

const iphone = createContext({
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
  platform: 'iPhone',
  mobile: true,
  maxTouchPoints: 5,
  coarse: true,
  memory: 0,
  threads: 6,
  width: 390,
  height: 844
})
state = iphone.context.RandomRoulettePerformance.getState()
if (!state.isMobile || state.effectiveLevel !== 'balanced') throw new Error('iPhone 자동 균형 판정 오류')

console.log(JSON.stringify({
  desktopAutoInitial: 'balanced',
  officeDesktopInitial: 'balanced',
  lowDesktopInitial: 'low',
  idleSlowFrames: 'balanced → low (2 windows)',
  activeGameSevereFrames: 'balanced → low (1 window)',
  minimumSamples: 10,
  upgradeWindows: 8,
  touchWindowsIsMobile: false,
  iphoneInitial: 'balanced',
  manualModes: ['auto', 'quality', 'performance']
}))

const extreme = createContext()
extreme.body.classList.add('app-active-game')
extreme.context.RandomRoulettePerformance.init()
runFrames(extreme, 10, 300)
if (extreme.context.RandomRoulettePerformance.getState().effectiveLevel !== 'low') throw new Error('300ms 프레임에서 보호 단계 진입 실패')
const idle = createContext()
idle.context.RandomRoulettePerformance.init()
let idleTimestamp = 0
for (let frame = 0; frame < 100 && idle.rafQueue.length; frame++) idleTimestamp = runFrames(idle, 1, 1000 / 60, idleTimestamp)
if (idle.rafQueue.length !== 0 || idle.timers.size !== 1) throw new Error('안정된 메뉴에서 프레임 감시가 쉬지 않음')
idle.context.RandomRoulettePerformance.setMode('quality')
if (idle.rafQueue.length !== 0 || idle.timers.size !== 0) throw new Error('수동 모드에서 감시가 남아 있음')
console.log(JSON.stringify({ extremeFrameMs: 300, safetyMode: 'low', stableMenuRaf: 0, manualModeRaf: 0 }))
