import { readFile } from 'node:fs/promises'
import path from 'node:path'
import vm from 'node:vm'

const root = path.resolve(import.meta.dirname, '..')

class MockClassList {
  constructor() { this.values = new Set() }
  add(...names) { names.forEach((name) => this.values.add(name)) }
  remove(...names) { names.forEach((name) => this.values.delete(name)) }
  toggle(name, force) {
    if (force) this.values.add(name)
    else this.values.delete(name)
    return Boolean(force)
  }
}

class MockStyle {
  constructor() { this.values = new Map() }
  setProperty(name, value) { this.values.set(name, String(value)) }
  getPropertyValue(name) { return this.values.get(name) || '' }
}

class MockElement {
  constructor() {
    this.className = ''
    this.classList = new MockClassList()
    this.style = new MockStyle()
    this.children = []
    this.attributes = new Map()
    this.dataset = {}
    this.textContent = ''
    this._innerHTML = ''
    this.runner = null
    this.status = null
  }

  set innerHTML(value) {
    this._innerHTML = String(value)
    if (!value) this.children = []
  }
  get innerHTML() { return this._innerHTML }
  setAttribute(name, value) { this.attributes.set(name, String(value)) }
  appendChild(child) { this.children.push(child); return child }
  querySelector(selector) {
    if (selector === '.race-horse') {
      this.runner ||= new MockElement()
      return this.runner
    }
    if (selector === '.horse-status') {
      this.status ||= new MockElement()
      return this.status
    }
    return null
  }
}

const raceTrackWrap = new MockElement()
const raceHorses = Array.from({ length: 8 }, (_, index) => ({
  label: `참가자${index + 1}`,
  color: `hsl(${index * 42} 70% 74%)`,
  progress: 0,
  currentStatus: '다그닥',
  laneEl: null,
  runnerEl: null,
  statusEl: null
}))

const context = {
  console,
  document: { createElement: () => new MockElement() },
  raceTrackWrap,
  raceTrackZoomBtn: null,
  raceHorses,
  RACE_DISTANCE: 100,
  shouldUseVerticalRaceTrack: () => true,
  escapeHtml: (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
context.window = context
vm.createContext(context)
vm.runInContext(await readFile(path.join(root, 'src/games/game2-race.js'), 'utf8'), context, { filename: 'src/games/game2-race.js' })
vm.runInContext('renderRaceTracks()', context)

const identityLegend = raceTrackWrap.children.find((child) => child.className === 'race-mobile-identity-legend')
const laneStack = raceTrackWrap.children.find((child) => child.className === 'race-track-lanes')
if (!identityLegend || !laneStack) throw new Error('모바일 경마 이름 범례 또는 트랙이 렌더링되지 않음')
if (raceTrackWrap.style.getPropertyValue('--race-legend-columns') !== '4') throw new Error('8명 경마 범례가 4열로 압축되지 않음')

for (let index = 0; index < raceHorses.length; index += 1) {
  const number = index + 1
  const label = `참가자${number}`
  if (!identityLegend.innerHTML.includes(`race-mobile-identity-number">${number}</span>`) || !identityLegend.innerHTML.includes(label)) {
    throw new Error(`${number}번 말과 ${label}의 범례 연결 누락`)
  }
  const laneMarkup = laneStack.children[index]?.innerHTML || ''
  if (!laneMarkup.includes(`horse-number-badge" aria-hidden="true">${number}</span>`) || !laneMarkup.includes(`${number}번 말, ${label}`)) {
    throw new Error(`${number}번 움직이는 말의 번호 또는 접근성 이름 누락`)
  }
}

console.log(JSON.stringify({
  participants: raceHorses.length,
  legendColumns: 4,
  identityMappings: 8,
  laneNumbers: 8,
  movingHorseNumbers: 8
}))
