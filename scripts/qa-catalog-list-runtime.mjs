import { readFile } from 'node:fs/promises'
import path from 'node:path'
import vm from 'node:vm'

const root = path.resolve(import.meta.dirname, '..')

class MockClassList {
  constructor(...names) {
    this.values = new Set(names)
  }

  add(...names) { names.forEach((name) => this.values.add(name)) }
  remove(...names) { names.forEach((name) => this.values.delete(name)) }
  contains(name) { return this.values.has(name) }
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
  constructor({ classes = [], dataset = {} } = {}) {
    this.classList = new MockClassList(...classes)
    this.dataset = { ...dataset }
    this.attributes = new Map()
    this.children = []
    this.parent = null
    this.hidden = false
    this.textContent = ''
    this.title = ''
    this.listeners = new Map()
  }

  addEventListener(type, handler) {
    this.listeners.set(type, handler)
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value))
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null
  }

  removeAttribute(name) {
    this.attributes.delete(name)
    if (name === 'title') this.title = ''
  }

  appendChild(child) {
    child.parent = this
    this.children.push(child)
    return child
  }

  remove() {
    if (!this.parent) return
    this.parent.children = this.parent.children.filter((child) => child !== this)
    this.parent = null
  }

  querySelector(selector) {
    if (selector === '.catalog-list-status') {
      return this.children.find((child) => child.classList.contains('catalog-list-status') || child.className === 'catalog-list-status') || null
    }
    return null
  }

  matches(selector) {
    if (selector === '.game-launch[data-game]') return this.classList.contains('game-launch') && Boolean(this.dataset.game)
    return false
  }
}

class MockGrid extends MockElement {
  constructor(cards) {
    super()
    this.cards = cards
    cards.forEach((card) => { card.parent = this })
  }

  querySelectorAll(selector) {
    if (selector === '.game-item[data-clone]') return this.cards.filter((card) => card.dataset.clone)
    if (selector === ':scope > .game-item:not([data-clone])') return this.cards.filter((card) => !card.dataset.clone)
    return []
  }

  appendChild(card) {
    this.cards = this.cards.filter((item) => item !== card)
    this.cards.push(card)
    card.parent = this
    return card
  }
}

const randomCard = new MockElement({ classes: ['game-item', 'game-launch'], dataset: { game: '8' } })
const maxTenCard = new MockElement({ classes: ['game-item', 'game-launch'], dataset: { game: '5' } })
const maxTwentyCard = new MockElement({ classes: ['game-item', 'game-launch'], dataset: { game: '1' } })
const cards = [randomCard, maxTenCard, maxTwentyCard]
const grid = new MockGrid(cards)
const summary = new MockElement()
const editButton = new MockElement()
const documentElement = new MockElement()
const eventListeners = new Map()
let sharedListCount = 0

const context = {
  console,
  navigator: {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    platform: 'Win32',
    maxTouchPoints: 0,
    userAgentData: { mobile: false, platform: 'Windows' }
  },
  innerWidth: 1440,
  innerHeight: 900,
  matchMedia: () => ({ matches: false }),
  document: {
    documentElement,
    getElementById(id) {
      return id === 'luckGameGrid' ? grid
        : id === 'catalogAvailabilitySummary' ? summary
          : id === 'catalogRosterEditBtn' ? editButton
            : null
    },
    createElement: () => new MockElement()
  },
  CustomEvent: class CustomEvent {
    constructor(type, options = {}) {
      this.type = type
      this.detail = options.detail
    }
  },
  addEventListener(type, handler) {
    eventListeners.set(type, handler)
  },
  dispatchEvent(event) {
    eventListeners.get(event.type)?.(event)
    return true
  },
  RandomRouletteRoster: {
    getCount: () => sharedListCount,
    hasRoster: () => sharedListCount >= 2,
    hasSharedList: () => sharedListCount >= 2,
    open() {}
  }
}
context.window = context

vm.createContext(context)
const registrySource = await readFile(path.join(root, 'src/games/registry.js'), 'utf8')
vm.runInContext(registrySource, context, { filename: 'src/games/registry.js' })
context.RandomRouletteRegistry.init()

if (maxTenCard.getAttribute('aria-disabled') !== 'false') {
  throw new Error('빈 공용 목록에서 최대 10개 게임이 자유 입장 상태가 아님')
}

sharedListCount = 13
context.dispatchEvent(new context.CustomEvent('roulette-roster-change'))
const blockedStatus = maxTenCard.querySelector('.catalog-list-status')
if (maxTenCard.getAttribute('aria-disabled') !== 'true' || !maxTenCard.classList.contains('is-list-ineligible')) {
  throw new Error('13개 공용 목록 저장 직후 최대 10개 게임 카드가 비활성화되지 않음')
}
if (!blockedStatus?.textContent.includes('공용 목록 13개') || !blockedStatus.textContent.includes('2~10개만 가능')) {
  throw new Error('조건 불일치 카드에 현재 개수와 지원 범위가 표시되지 않음')
}
if (maxTwentyCard.getAttribute('aria-disabled') !== 'false' || maxTwentyCard.classList.contains('is-list-ineligible')) {
  throw new Error('13개를 지원하는 최대 20개 게임 카드까지 비활성화됨')
}
if (!summary.textContent.includes('실행 가능 1개') || !summary.textContent.includes('조건 불일치 1개')) {
  throw new Error(`목록 상단 실행 가능 요약이 즉시 갱신되지 않음: ${summary.textContent}`)
}

sharedListCount = 10
context.dispatchEvent(new context.CustomEvent('roulette-roster-change'))
if (maxTenCard.getAttribute('aria-disabled') !== 'false' || maxTenCard.classList.contains('is-list-ineligible')) {
  throw new Error('공용 목록을 10개로 수정한 직후 최대 10개 게임 카드가 복구되지 않음')
}
if (maxTenCard.querySelector('.catalog-list-status')) throw new Error('조건이 맞아진 카드에 이전 불일치 문구가 남아 있음')

console.log(JSON.stringify({
  emptyListAllowsDirectEntry: true,
  blockedAtThirteen: '2~10개 게임',
  availableAtThirteen: '2~20개 게임',
  restoredAtTen: true,
  catalogRefreshEvent: 'synchronous'
}))
