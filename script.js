const screens = {
  home: document.getElementById('homeScreen'),
  menu: document.getElementById('menuScreen'),
  luck: document.getElementById('luckScreen'),
  game1: document.getElementById('game1Screen'),
  game2: document.getElementById('game2Screen'),
  game3: document.getElementById('game3Screen'),
  game4: document.getElementById('game4Screen')
}

const startBtn = document.getElementById('startBtn')
const physicalBtn = document.getElementById('physicalBtn')
const luckBtn = document.getElementById('luckBtn')
const backButtons = document.querySelectorAll('.back-btn')
const gameLaunchButtons = document.querySelectorAll('.game-launch')
const comingSoonButtons = document.querySelectorAll('.game-coming-soon')

const popupOverlay = document.getElementById('popupOverlay')
const popupTitle = document.getElementById('popupTitle')
const popupMessage = document.getElementById('popupMessage')
const closePopupBtn = document.getElementById('closePopupBtn')
const popupIcon = document.querySelector('.popup-icon')
const popupBox = popupOverlay?.querySelector('.popup') || null

const configInput = document.getElementById('configInput')
const shuffleBtn = document.getElementById('shuffleBtn')
const startGameBtn = document.getElementById('startGameBtn')
const resetGameBtn = document.getElementById('resetGameBtn')
const statusText = document.getElementById('statusText')
const totalInfo = document.getElementById('totalInfo')
const slotLegend = document.getElementById('slotLegend')
const slotOverlay = document.getElementById('slotOverlay')
const gameCanvasWrap = document.getElementById('gameCanvasWrap')
const game1Desc = document.querySelector('#game1Screen .game-main-header .sub-text')

const gameSidebar = document.getElementById('gameSidebar')
const drawerToggleBtn = document.getElementById('drawerToggleBtn')
const drawerBackdrop = document.getElementById('drawerBackdrop')
const orientationLockOverlay = document.getElementById('orientationLockOverlay')

const gameCardFull = document.querySelector('#game1Screen .game-card-full')
const gameMain = document.querySelector('#game1Screen .game-main')
const gameMainHeader = document.querySelector('#game1Screen .game-main-header')
const gamePlayArea = document.querySelector('#game1Screen .game-play-area')
const gameSidebarInner = document.querySelector('#game1Screen .game-sidebar-inner')
const scoreboardCard = document.querySelector('#game1Screen .scoreboard-card')
const game1BackBtn = document.querySelector('#game1Screen .game-header-actions .back-btn[data-target="luck"]')
const gameHeaderActions = document.querySelector('#game1Screen .game-header-actions')

const raceConfigInput = document.getElementById('raceConfigInput')
const shuffleRaceBtn = document.getElementById('shuffleRaceBtn')
const startRaceBtn = document.getElementById('startRaceBtn')
const resetRaceBtn = document.getElementById('resetRaceBtn')
const raceStatusText = document.getElementById('raceStatusText')
const raceTotalInfo = document.getElementById('raceTotalInfo')
const horseLegend = document.getElementById('horseLegend')
const raceTrackWrap = document.getElementById('raceTrackWrap')
const raceRankingList = document.getElementById('raceRankingList')
const raceDesc = document.querySelector('#game2Screen .race-main-header .sub-text')

const raceLayout = document.querySelector('#game2Screen .race-layout')
const raceSidebar = document.querySelector('#game2Screen .race-sidebar')
const raceMain = document.querySelector('#game2Screen .race-main')
const raceMainHeader = document.querySelector('#game2Screen .race-main-header')
const raceHeaderActions = document.querySelector('#game2Screen .race-main-header .game-header-actions')
const raceBackBtn = document.querySelector('#game2Screen .race-main-header .back-btn[data-target="luck"]')

const battleConfigInput = document.getElementById('battleConfigInput')
const shuffleBattleBtn = document.getElementById('shuffleBattleBtn')
const startBattleBtn = document.getElementById('startBattleBtn')
const resetBattleBtn = document.getElementById('resetBattleBtn')
const battleStatusText = document.getElementById('battleStatusText')
const battleTotalInfo = document.getElementById('battleTotalInfo')
const battleLegend = document.getElementById('battleLegend')
const battleTable = document.getElementById('battleTable')
const battleRankingList = document.getElementById('battleRankingList')
const battleDeck = document.getElementById('battleDeck')
const battleDesc = document.querySelector('#game3Screen .battle-main-header .sub-text')

const simConfigInput = document.getElementById('simConfigInput')
const shuffleSimBtn = document.getElementById('shuffleSimBtn')
const startSimSetupBtn = document.getElementById('startSimSetupBtn')
const resetSimBtn = document.getElementById('resetSimBtn')
const startSimBattleBtn = document.getElementById('startSimBattleBtn')
const simStatusText = document.getElementById('simStatusText')
const simTotalInfo = document.getElementById('simTotalInfo')
const simLegend = document.getElementById('simLegend')
const simDeck = document.getElementById('simDeck')
const simStatsBoard = document.getElementById('simStatsBoard')
const simArenaWrap = document.getElementById('simArenaWrap')
const simHealthOverlay = document.getElementById('simHealthOverlay')
const simBattleSummary = document.getElementById('simBattleSummary')
const simRankingList = document.getElementById('simRankingList')
const simPhaseBadge = document.getElementById('simPhaseBadge')
const simDesc = document.querySelector('#game4Screen .sim-main-header .sub-text')
const simCardScreen = document.querySelector('#game4Screen .sim-card-screen')
const simLayout = document.querySelector('#game4Screen .sim-layout')
const simSidebar = document.querySelector('#game4Screen .sim-sidebar')
const simSidebarInner = document.querySelector('#game4Screen .sim-sidebar-inner')
const simMain = document.querySelector('#game4Screen .sim-main')
const simMainHeader = document.querySelector('#game4Screen .sim-main-header')
const simHeaderActions = document.querySelector('#game4Screen .sim-main-header .game-header-actions')
const simBackBtn = document.querySelector('#game4Screen .sim-main-header .back-btn[data-target="luck"]')
const simControlsWrap = document.querySelector('#game4Screen .controls-wrap')
const simButtonRow = document.querySelector('#game4Screen .controls-wrap .button-row')
const simScoreboardCard = document.querySelector('#game4Screen .scoreboard-card')
const simSetupCard = document.querySelector('#game4Screen .sim-setup-card')
const simArenaCard = document.querySelector('#game4Screen .sim-arena-card')
const simBattleSummaryCard = document.querySelector('#game4Screen .sim-battle-summary-card')
const simMobileBackWrap = document.querySelector('#game4Screen .sim-mobile-back-wrap')
const simMobileBattleStartSlot = document.querySelector('#game4Screen .sim-mobile-battle-start-slot')
const simMobileResetSlot = document.querySelector('#game4Screen .sim-mobile-reset-slot')
const simInfoBtn = document.getElementById('simInfoBtn')


const {
  Engine,
  Render,
  Runner,
  Bodies,
  Body,
  Composite,
  World,
  Events
} = Matter

const MAX_SLOT_COUNT = 20
const BOMB_COUNT = 20
const SPAWN_INTERVAL_MS = 27
const BOARD_SIDE_PADDING = 18

const BASE_BOARD_WIDTH = 1366
const BASE_BOARD_HEIGHT = 768

const slotPalette = [
  '#f9d3df',
  '#d7f3e9',
  '#dceeff',
  '#fff2c9',
  '#ffdcbc',
  '#e4dbff',
  '#d7f7f0',
  '#ffe3ef',
  '#dff1ff',
  '#ffe8d3'
]

const ballPalette = [
  '#f8b8c9',
  '#bfe8d8',
  '#c6def8',
  '#f9db8f',
  '#d4c0ff',
  '#ffd1a6'
]

const raceHorsePalette = [
  '#f8c8d8',
  '#cfeadf',
  '#d9e9ff',
  '#fde7b8',
  '#ffd7c2',
  '#e4dcff',
  '#d6f4ef',
  '#ffe1ec',
  '#dff3ff',
  '#fbe6cf',
  '#ead8f8',
  '#d9f0d8',
  '#ffe8bf',
  '#f9d7e6',
  '#d7ecf9',
  '#f6deb9',
  '#e0f3e7',
  '#f4d9ff',
  '#fff0c8',
  '#d9f6f2'
]

const nameColorMap = new Map()
const raceNameColorMap = new Map()

function getColorForName(name) {
  if (!nameColorMap.has(name)) {
    const colorIndex = nameColorMap.size % slotPalette.length
    nameColorMap.set(name, slotPalette[colorIndex])
  }
  return nameColorMap.get(name)
}

function getRaceColorForName(name) {
  if (!raceNameColorMap.has(name)) {
    const colorIndex = raceNameColorMap.size % raceHorsePalette.length
    raceNameColorMap.set(name, raceHorsePalette[colorIndex])
  }
  return raceNameColorMap.get(name)
}

function clampValue(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function getBallCountBySlotCount(slotCount) {
  if (slotCount <= 5) return 500
  if (slotCount <= 10) return 400
  if (slotCount <= 15) return 300
  return 200
}

let currentScale = 1
let currentBoardPadding = BOARD_SIDE_PADDING

function getBoardScale(width = 1366, height = 768) {
  return clampValue(
    Math.min(width / BASE_BOARD_WIDTH, height / BASE_BOARD_HEIGHT),
    0.58,
    1.18
  )
}

function S(value) {
  return value * currentScale
}

let engine
let render
let runner
let world
let worldBodies = []
let ballBodies = []
let movingBodies = []
let spawnTimers = []
let countTimer = null
let resizeTimer = null
let countRefreshQueued = false

let settleWatcherTimer = null
let finalWatcherTimer = null
let countdownTimers = []

let roundSpawnComplete = false
let bombSequenceStarted = false
let bombSequenceFinished = false
let resultCountdownStarted = false
let finalResultsShown = false

let settleStableTicks = 0
let finalStableTicks = 0

let boardWidth = 0
let boardHeight = 720
let slotAreaHeight = 100

let currentSlots = []
let lastValidConfigText = configInput ? configInput.value : ''
let lastAppliedRawText = configInput ? configInput.value : ''

let lastViewportWidth = window.innerWidth
let lastViewportHeight = window.innerHeight
let mobileLayoutApplied = false
let raceMobileLayoutApplied = false

const RACE_MAX_COUNT = 8
const RACE_DISTANCE = 2400

let raceHorses = []
let raceRunning = false
let raceFinished = false
let raceAnimationFrame = null
let raceLastTimestamp = 0
let raceEventTimer = null
let raceCommentaryTimer = null
let raceFinishOrder = []
let raceLeaderName = ''
let lastRaceValidConfigText = raceConfigInput ? raceConfigInput.value : ''
let lastRaceAppliedRawText = raceConfigInput ? raceConfigInput.value : ''

const BATTLE_MAX_PLAYERS = 8
const BATTLE_OPERATORS = ['+', '-', '×', '÷']
const SIM_MAX_PLAYERS = 6
const SIM_BASE_HP = 50
const SIM_STAT_KEYS = ['health', 'attack', 'accuracy', 'defense']
const SIM_STAT_META = {
  health: { label: '추가 체력', short: '+HP', icon: '❤️' },
  attack: { label: '공격력', short: 'ATK', icon: '💥' },
  accuracy: { label: '공격 성공률', short: 'ACC', icon: '🎯' },
  defense: { label: '방어력', short: 'DEF', icon: '🛡️' }
}

const SIM_MAP_OPTIONS = {
  classic: { name: '클래식', desc: '기본 범퍼가 배치된 정석 전투장' },
  bomb: { name: '폭탄 창고', desc: '폭탄을 3번 건드리면 주변이 폭발하는 전투장' },
  rotor: { name: '회전 막대', desc: '회전 막대가 끊임없이 압박하는 전투장' },
  pinball: { name: '핀볼 링', desc: '추가 범퍼가 많이 배치된 충돌 가속 전투장' }
}

let battlePlayers = []
let battleGameRunning = false
let battleFlowToken = 0
let battleCurrentToken = 0
let battlePhase = 'idle'
let battleRoundPlayers = []
let battleInteractionLocked = false
let lastBattleValidConfigText = battleConfigInput ? battleConfigInput.value : ''
let lastBattleAppliedRawText = battleConfigInput ? battleConfigInput.value : ''

let simPlayers = []
let simRoundPlayers = []
let simSetupDone = false
let simSetupRunning = false
let simBattleRunning = false
let simBattleFinished = false
let simFinalResultsShown = false
let simFinalResultsTimer = null
let simFinalResultsRaf = null
let simFinalResultsWatchdog = null
let simBattleToken = 0
let simCurrentToken = 0
let simEliminationOrder = []
let simLastCombatMessageAt = 0
let simArenaEngine = null
let simArenaRender = null
let simArenaRunner = null
let simArenaWorld = null
let simArenaBodies = []
let simArenaBodyMap = new Map()
let simOverlayMap = new Map()
let simArenaMeta = null
let simSelectedMap = 'classic'
let lastSimValidConfigText = simConfigInput ? simConfigInput.value : ''
let lastSimAppliedRawText = simConfigInput ? simConfigInput.value : ''

let popupWaitResolver = null

function getCurrentNormalBallCount() {
  const slotCount = currentSlots.length || 1
  return getBallCountBySlotCount(slotCount)
}

function getCurrentTotalDropCount() {
  return getCurrentNormalBallCount() + BOMB_COUNT
}

function updateGame1BallCountText() {
  if (!game1Desc) return
  const ballCount = getCurrentNormalBallCount()
  game1Desc.textContent = `구슬 ${ballCount}개가 떨어져 아래 개별 그릇에 담긴다.`
}

function setGame1InputLock(isLocked) {
  if (!configInput) return
  configInput.disabled = isLocked
  configInput.style.opacity = isLocked ? '0.65' : '1'
  configInput.style.cursor = isLocked ? 'not-allowed' : ''
}

function setRaceInputLock(isLocked) {
  if (!raceConfigInput) return
  raceConfigInput.disabled = isLocked
  raceConfigInput.style.opacity = isLocked ? '0.65' : '1'
  raceConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
}

function setGame1ShuffleLock(isLocked) {
  if (!shuffleBtn) return
  shuffleBtn.disabled = isLocked
  shuffleBtn.style.opacity = isLocked ? '0.55' : '1'
  shuffleBtn.style.cursor = isLocked ? 'not-allowed' : ''
}

function setRaceShuffleLock(isLocked) {
  if (!shuffleRaceBtn) return
  shuffleRaceBtn.disabled = isLocked
  shuffleRaceBtn.style.opacity = isLocked ? '0.55' : '1'
  shuffleRaceBtn.style.cursor = isLocked ? 'not-allowed' : ''
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function showPopup(title, message, options = {}) {
  const { icon = '🛠️', allowHtml = false, popupClass = '' } = options

  if (popupBox) {
    popupBox.className = 'popup'
    if (popupClass) {
      popupBox.classList.add(...String(popupClass).split(/\s+/).filter(Boolean))
    }
  }

  if (popupIcon) {
    popupIcon.textContent = icon
  }

  if (popupTitle) {
    popupTitle.textContent = title
  }

  if (popupMessage) {
    if (allowHtml) {
      popupMessage.innerHTML = message
    } else {
      popupMessage.textContent = message
    }
  }

  if (popupOverlay) {
    popupOverlay.classList.remove('hidden')
  }
}

function showResultsPopup(resultItems) {
  const html = resultItems
    .map((item, index) => {
      return `<span style="display:block;margin:8px 0;"><strong>${index + 1}위. ${escapeHtml(item.name)}</strong> - ${item.count}개</span>`
    })
    .join('')

  showPopup(
    '최종 결과',
    html || '<span>결과가 없습니다.</span>',
    { icon: '🏆', allowHtml: true }
  )
}

function closePopup(options = {}) {
  const { force = false } = options

  if (popupOverlay?.dataset.locked === 'true' && !force) {
    return
  }

  if (popupOverlay) {
    popupOverlay.classList.add('hidden')
    delete popupOverlay.dataset.locked
  }

  if (popupBox) {
    popupBox.className = 'popup'
  }

  if (closePopupBtn) {
    closePopupBtn.style.display = ''
  }

  if (popupWaitResolver) {
    const resolver = popupWaitResolver
    popupWaitResolver = null
    resolver()
  }

  document.dispatchEvent(new CustomEvent('app-popup-closed', { detail: { force } }))
}

function showPopupAndWait(title, message, options = {}) {
  showPopup(title, message, options)
  return new Promise((resolve) => {
    popupWaitResolver = resolve
  })
}

function isPopupVisible() {
  return Boolean(popupOverlay && !popupOverlay.classList.contains('hidden'))
}

function unlockPopupOverlay() {
  if (popupOverlay) {
    delete popupOverlay.dataset.locked
  }
  if (closePopupBtn) {
    closePopupBtn.style.display = ''
  }
}

function setDrawerState(isOpen) {
  if (!gameSidebar || !drawerBackdrop) return

  if (isMobileOrTabletLike()) {
    gameSidebar.classList.remove('open')
    drawerBackdrop.classList.remove('show')
    return
  }

  gameSidebar.classList.toggle('open', isOpen)
  drawerBackdrop.classList.toggle('show', isOpen)
}

function isTouchDevice() {
  return window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0
}

function getViewportShortSide() {
  return Math.min(window.innerWidth, window.innerHeight)
}

function getViewportLongSide() {
  return Math.max(window.innerWidth, window.innerHeight)
}

function isPhoneLike() {
  return isTouchDevice() && getViewportShortSide() < 700
}

function isTabletLike() {
  return isTouchDevice() && getViewportShortSide() >= 700 && getViewportLongSide() <= 1400
}

function isMobileOrTabletLike() {
  return isPhoneLike() || isTabletLike()
}

function isPortraitMode() {
  return window.matchMedia('(orientation: portrait)').matches
}

function updateOrientationGate() {
  const shouldBlock =
    screens.game1?.classList.contains('active') &&
    isPhoneLike() &&
    !isPortraitMode()

  document.body.classList.toggle('orientation-blocked', shouldBlock)

  if (orientationLockOverlay) {
    orientationLockOverlay.setAttribute('aria-hidden', shouldBlock ? 'false' : 'true')
  }
}

function syncGame1MobileLayout() {
  if (
    !gameCardFull ||
    !gameMain ||
    !gameMainHeader ||
    !gamePlayArea ||
    !gameSidebar ||
    !gameSidebarInner ||
    !scoreboardCard ||
    !game1BackBtn ||
    !gameHeaderActions
  ) {
    return
  }

  const shouldUseMobileLayout = isMobileOrTabletLike()

  document.body.classList.toggle('game1-mobile-layout', shouldUseMobileLayout)

  if (shouldUseMobileLayout && !mobileLayoutApplied) {
    if (gameMainHeader.parentElement !== gameCardFull) {
      gameCardFull.insertBefore(gameMainHeader, gameCardFull.firstChild)
    }

    if (scoreboardCard.parentElement !== gameCardFull) {
      gameCardFull.appendChild(scoreboardCard)
    }

    if (game1BackBtn.parentElement !== gameCardFull) {
      game1BackBtn.classList.add('mobile-back-btn')
      gameCardFull.appendChild(game1BackBtn)
    }

    mobileLayoutApplied = true
    return
  }

  if (!shouldUseMobileLayout && mobileLayoutApplied) {
    if (gameMainHeader.parentElement !== gameMain) {
      gameMain.insertBefore(gameMainHeader, gameMain.firstChild)
    }

    if (scoreboardCard.parentElement !== gameSidebarInner) {
      gameSidebarInner.appendChild(scoreboardCard)
    }

    if (game1BackBtn.parentElement !== gameHeaderActions) {
      game1BackBtn.classList.remove('mobile-back-btn')
      gameHeaderActions.appendChild(game1BackBtn)
    }

    mobileLayoutApplied = false
  }
}

function syncRaceMobileLayout() {
  if (
    !raceLayout ||
    !raceSidebar ||
    !raceMain ||
    !raceMainHeader ||
    !raceHeaderActions ||
    !raceBackBtn
  ) {
    return
  }

  const shouldUseMobileLayout = isMobileOrTabletLike()

  document.body.classList.toggle('game2-mobile-layout', shouldUseMobileLayout)

  if (shouldUseMobileLayout && !raceMobileLayoutApplied) {
    if (raceMainHeader.parentElement !== raceLayout) {
      raceLayout.insertBefore(raceMainHeader, raceLayout.firstChild)
    }

    if (raceBackBtn.parentElement !== raceLayout) {
      raceBackBtn.classList.add('mobile-race-back-btn')
      raceLayout.appendChild(raceBackBtn)
    }

    raceMobileLayoutApplied = true
    return
  }

  if (!shouldUseMobileLayout && raceMobileLayoutApplied) {
    if (raceMainHeader.parentElement !== raceMain) {
      raceMain.insertBefore(raceMainHeader, raceMain.firstChild)
    }

    if (raceBackBtn.parentElement !== raceHeaderActions) {
      raceBackBtn.classList.remove('mobile-race-back-btn')
      raceHeaderActions.appendChild(raceBackBtn)
    }

    raceMobileLayoutApplied = false
  }
}

function forceScrollToTop() {
  const scrollingElement = document.scrollingElement || document.documentElement || document.body

  window.scrollTo(0, 0)

  if (scrollingElement) {
    scrollingElement.scrollTop = 0
  }

  if (document.documentElement) {
    document.documentElement.scrollTop = 0
  }

  if (document.body) {
    document.body.scrollTop = 0
  }
}

function forceGame4EntryScrollTop() {
  if (!isMobileOrTabletLike()) return

  forceScrollToTop()

  requestAnimationFrame(() => {
    forceScrollToTop()

    requestAnimationFrame(() => {
      forceScrollToTop()
    })
  })

  setTimeout(() => {
    forceScrollToTop()
  }, 120)
}

function showScreen(target) {
  if (!screens[target]) return

  const leavingGame4 = screens.game4?.classList.contains('active') && target !== 'game4'
  closePopup({ force: true })
  Object.values(screens).forEach((screen) => screen?.classList.remove('active'))
  screens[target].classList.add('active')

  if (target !== 'game1') {
    clearSpawnTimers()
    setGame1InputLock(false)
    setGame1ShuffleLock(false)
    document.body.classList.remove('game1-mode')
    setDrawerState(false)
  } else {
    document.body.classList.add('game1-mode')
  }

  if (target !== 'game2') {
    stopRaceLoop()
    raceFinished = false
    resetRaceHorseStates()
    setRaceInputLock(false)
    setRaceShuffleLock(false)
  }

  if (target !== 'game3') {
    stopBattleFlow()
    setBattleInputLock(false)
    setBattleShuffleLock(false)
  }

  if (target !== 'game4') {
    if (leavingGame4) {
      resetSim()
    } else {
      stopSimBattle({ preserveSetup: true })
    }
  }

  if (target === 'game1') {
    ensureGameReady()
  }

  if (target === 'game2') {
    syncRaceMobileLayout()
    ensureRaceReady()
  }

  if (target === 'game3') {
    ensureBattleReady()
  }

  if (target === 'game4') {
    ensureSimReady()
    syncSimResponsiveLayout()
    forceGame4EntryScrollTop()
  }

  updateOrientationGate()
}

function shuffleArray(arr) {
  const copied = [...arr]
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copied[i], copied[j]] = [copied[j], copied[i]]
  }
  return copied
}

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function parseConfigToSlots(text) {
  const rawItems = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!rawItems.length) {
    return { status: 'EMPTY' }
  }

  const slots = []
  let slotId = 0

  for (const raw of rawItems) {
    let name = ''
    let count = 1

    if (raw.includes('*')) {
      const match = raw.match(/^(.+?)\s*\*\s*(\d+)$/)
      if (!match) {
        return { status: 'INVALID' }
      }

      name = match[1].trim()
      count = Number(match[2])
    } else {
      name = raw.trim()
      count = 1
    }

    if (!name || !Number.isInteger(count) || count < 1) {
      return { status: 'INVALID' }
    }

    for (let i = 0; i < count; i += 1) {
      slotId += 1
      slots.push({
        id: `${name}-${slotId}`,
        name
      })

      if (slots.length > MAX_SLOT_COUNT) {
        return {
          status: 'TOO_MANY',
          slotCount: slots.length
        }
      }
    }
  }

  return {
    status: 'OK',
    slots
  }
}

function setCurrentSlots(slots) {
  currentSlots = slots
  if (configInput) {
    lastValidConfigText = configInput.value
    lastAppliedRawText = configInput.value
  }
}

function handleParseFailure(parsed, options = {}) {
  const { showPopupOnTooMany = false, showPopupOnInvalid = false } = options

  if (parsed.status === 'TOO_MANY') {
    if (statusText) {
      statusText.textContent = `그릇은 최대 ${MAX_SLOT_COUNT}개까지 가능해. 현재 입력은 초과 상태야.`
    }
    if (showPopupOnTooMany) {
      showPopup('그릇 수 초과', `그릇은 최대 ${MAX_SLOT_COUNT}개까지 가능해. 입력값을 줄여줘.`)
    }
    return false
  }

  if (parsed.status === 'INVALID' || parsed.status === 'EMPTY') {
    if (statusText) {
      statusText.textContent = '입력 형식을 확인해줘. 예: 홍길동*2, 김아무개*2 / 홍길동, 김아무개*3'
    }
    if (showPopupOnInvalid) {
      showPopup(
        '입력 확인',
        '형식은 예를 들어 홍길동*2, 김아무개*2 또는 홍길동, 김아무개*3 처럼 적어줘.'
      )
    }
    return false
  }

  return true
}

function updateSlotsFromInput({ build = true } = {}) {
  if (!configInput) return false

  const parsed = parseConfigToSlots(configInput.value)

  if (!handleParseFailure(parsed)) {
    return false
  }

  setCurrentSlots(parsed.slots)
  updateGame1BallCountText()

  if (engine && screens.game1?.classList.contains('active') && build) {
    buildBoard()
  } else {
    const ballCount = getCurrentNormalBallCount()
    if (statusText) {
      statusText.textContent = `실시간 반영 준비 완료: 총 ${currentSlots.length}개의 개별 그릇 / 구슬 ${ballCount}개`
    }
  }

  return true
}

function fitGameCanvasViewport() {
  const main = document.querySelector('#game1Screen .game-main')
  const playArea = document.querySelector('#game1Screen .game-play-area')

  if (!main || !playArea || !gameCanvasWrap) return

  const header = main.querySelector('.game-main-header')

  if (isMobileOrTabletLike()) {
    const width = Math.max(280, playArea.clientWidth || gameCardFull.clientWidth - 24)
    const height = clampValue(width * 1.12, 340, 760)

    gameCanvasWrap.style.width = `${width}px`
    gameCanvasWrap.style.height = `${height}px`
    return
  }

  if (!header) return

  const styles = getComputedStyle(main)
  const gap = parseFloat(styles.gap) || 0

  const availableW = Math.max(320, main.clientWidth)
  const availableH = Math.max(220, main.clientHeight - header.offsetHeight - gap)

  const ratio = 16 / 9

  let width = availableW
  let height = width / ratio

  if (height > availableH) {
    height = availableH
    width = height * ratio
  }

  gameCanvasWrap.style.width = `${width}px`
  gameCanvasWrap.style.height = `${height}px`
}

function ensureGameReady() {
  if (!engine) {
    initMatterWorld()
  }

  if (!currentSlots.length && configInput) {
    const parsed = parseConfigToSlots(configInput.value)

    if (parsed.status === 'OK') {
      setCurrentSlots(parsed.slots)
    } else {
      configInput.value = '홍길동*2, 김아무개*2'
      const fallbackParsed = parseConfigToSlots(configInput.value)
      setCurrentSlots(fallbackParsed.slots)
    }
  }

  updateGame1BallCountText()
  syncGame1MobileLayout()
  fitGameCanvasViewport()
  buildBoard()
}

function initMatterWorld() {
  if (!gameCanvasWrap) return

  boardWidth = gameCanvasWrap.clientWidth
  boardHeight = gameCanvasWrap.clientHeight

  engine = Engine.create()
  world = engine.world
  engine.gravity.y = 1.05

  render = Render.create({
    element: gameCanvasWrap,
    engine,
    options: {
      width: boardWidth,
      height: boardHeight,
      wireframes: false,
      background: 'transparent',
      pixelRatio: window.devicePixelRatio || 1
    }
  })

  render.canvas.style.position = 'absolute'
  render.canvas.style.inset = '0'

  Render.run(render)

  runner = Runner.create()
  Runner.run(runner, engine)

  Events.on(engine, 'beforeUpdate', animateMovingBodies)
  Events.on(engine, 'afterUpdate', scheduleRefreshCounts)
}

function clearCountdownTimers() {
  countdownTimers.forEach((timer) => clearTimeout(timer))
  countdownTimers = []
}

function clearSettleWatcher() {
  if (settleWatcherTimer) {
    clearInterval(settleWatcherTimer)
    settleWatcherTimer = null
  }
  settleStableTicks = 0
}

function clearFinalWatcher() {
  if (finalWatcherTimer) {
    clearInterval(finalWatcherTimer)
    finalWatcherTimer = null
  }
  finalStableTicks = 0
}

function resetRoundState() {
  roundSpawnComplete = false
  bombSequenceStarted = false
  bombSequenceFinished = false
  resultCountdownStarted = false
  finalResultsShown = false
  clearSettleWatcher()
  clearFinalWatcher()
  clearCountdownTimers()
}

function clearWorldBodies() {
  worldBodies.forEach((body) => Composite.remove(world, body))
  ballBodies.forEach((body) => Composite.remove(world, body))
  worldBodies = []
  ballBodies = []
  movingBodies = []
}

function clearSpawnTimers() {
  spawnTimers.forEach((timer) => clearTimeout(timer))
  spawnTimers = []

  if (countTimer) {
    clearTimeout(countTimer)
    countTimer = null
  }

  resetRoundState()
}

function scheduleRefreshCounts() {
  if (countRefreshQueued) return
  countRefreshQueued = true

  requestAnimationFrame(() => {
    countRefreshQueued = false
    refreshCounts()
  })
}

function addMovingBody(body, options) {
  movingBodies.push({
    body,
    baseX: options.baseX,
    baseY: options.baseY,
    amplitudeX: options.amplitudeX || 0,
    amplitudeY: options.amplitudeY || 0,
    speed: options.speed || 0.02,
    phase: options.phase || 0,
    angleAmplitude: options.angleAmplitude || 0,
    angleSpeed: options.angleSpeed || options.speed || 0.02,
    anglePhase: options.anglePhase || 0,
    spinContinuous: Boolean(options.spinContinuous),
    spinSpeed: options.spinSpeed || 0,
    hidden: false,
    group: options.group || 'main'
  })
}

function animateMovingBodies() {
  if (!movingBodies.length || !engine) return
  const t = engine.timing.timestamp

  movingBodies.forEach((item) => {
    if (item.hidden) return

    const x = item.baseX + Math.sin(t * item.speed + item.phase) * item.amplitudeX
    const y = item.baseY + Math.cos(t * item.speed + item.phase) * item.amplitudeY

    let angle = 0
    if (item.spinContinuous) {
      angle = t * item.spinSpeed + item.anglePhase
    } else {
      angle = Math.sin(t * item.angleSpeed + item.anglePhase) * item.angleAmplitude
    }

    Body.setPosition(item.body, { x, y })
    Body.setAngle(item.body, angle)
    Body.setVelocity(item.body, { x: 0, y: 0 })
    Body.setAngularVelocity(item.body, 0)
  })
}

function hideMainMovingObstacles() {
  movingBodies.forEach((item) => {
    if (item.group === 'main' && !item.hidden) {
      Composite.remove(world, item.body)
      item.hidden = true
    }
  })
}

function areAllBallsCalm() {
  if (!ballBodies.length) return false

  let movingCount = 0
  ballBodies.forEach((ball) => {
    if (ball.speed > 0.24) movingCount += 1
  })

  return movingCount <= Math.max(10, Math.floor(ballBodies.length * 0.04))
}

function getUndroppedNormalBalls() {
  const slotTopY = boardHeight - slotAreaHeight

  return ballBodies.filter((ball) => {
    if (ball.isBombBall) return false

    const radius = ball.circleRadius || S(4.5)
    return ball.position.y < slotTopY - radius * 1.2
  })
}

function areUndroppedNormalBallsCalm() {
  const undroppedBalls = getUndroppedNormalBalls()

  if (!undroppedBalls.length) return true

  let movingCount = 0

  undroppedBalls.forEach((ball) => {
    if (ball.speed > 0.12) movingCount += 1
  })

  return movingCount === 0
}

function getSlotCountsPerIndex() {
  const playableWidth = boardWidth - currentBoardPadding * 2
  const slotTopY = boardHeight - slotAreaHeight
  const slotCount = currentSlots.length
  const slotWidth = playableWidth / slotCount
  const counts = new Array(slotCount).fill(0)

  ballBodies.forEach((ball) => {
    if (ball.isBombBall) return

    const { x, y } = ball.position
    const radius = ball.circleRadius || S(4.5)

    if (y < slotTopY - radius * 1.2) return

    const relativeX = x - currentBoardPadding
    let slotIndex = Math.floor(relativeX / slotWidth)

    if (slotIndex < 0) slotIndex = 0
    if (slotIndex >= slotCount) slotIndex = slotCount - 1

    counts[slotIndex] += 1
  })

  return counts
}

function getAggregatedCounts() {
  const slotCounts = getSlotCountsPerIndex()
  const aggregatedMap = new Map()

  currentSlots.forEach((slot, index) => {
    if (!aggregatedMap.has(slot.name)) {
      aggregatedMap.set(slot.name, 0)
    }
    aggregatedMap.set(slot.name, aggregatedMap.get(slot.name) + (slotCounts[index] || 0))
  })

  return [...aggregatedMap.entries()].map(([name, count]) => ({ name, count }))
}

function finalizeResults() {
  if (finalResultsShown) return
  finalResultsShown = true
  clearFinalWatcher()

  const results = getAggregatedCounts().sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count
    return a.name.localeCompare(b.name, 'ko')
  })

  refreshCounts()
  if (statusText) {
    statusText.textContent = '최종 결과가 반영됐어!'
  }
  setGame1InputLock(false)
  setGame1ShuffleLock(false)
  showResultsPopup(results)
}

function startSettleWatcher() {
  clearSettleWatcher()

  settleWatcherTimer = setInterval(() => {
    if (!roundSpawnComplete || bombSequenceStarted || finalResultsShown) return

    if (areAllBallsCalm()) {
      settleStableTicks += 1
    } else {
      settleStableTicks = 0
    }

    if (settleStableTicks >= 4) {
      startBombCountdown()
    }
  }, 400)
}

function startBombCountdown() {
  if (bombSequenceStarted) return

  bombSequenceStarted = true
  clearSettleWatcher()
  hideMainMovingObstacles()

  const countdownValues = [3, 2, 1]

  countdownValues.forEach((value, index) => {
    const timer = setTimeout(() => {
      if (statusText) {
        statusText.textContent = `폭탄 폭발까지 ${value}...`
      }
    }, index * 1000)
    countdownTimers.push(timer)
  })

  const explodeTimer = setTimeout(() => {
    triggerBombExplosionChain()
  }, 3000)
  countdownTimers.push(explodeTimer)
}

function explodeSingleBomb(bomb, index, total) {
  if (!bomb || bomb.hasExploded) return

  const bombX = bomb.position.x
  const bombY = bomb.position.y
  const blastRadius = bomb.bombBlastRadius || S(90)
  const baseForce = bomb.bombForce || 0.0075

  if (statusText) {
    statusText.textContent = `연쇄 폭발 ${index}/${total}...`
  }

  ballBodies.forEach((ball) => {
    if (ball === bomb) return

    const dx = ball.position.x - bombX
    const dy = ball.position.y - bombY
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance <= 0 || distance > blastRadius) return

    const normalizedX = dx / distance
    const normalizedY = dy / distance
    const falloff = 1 - distance / blastRadius
    const forcePower = baseForce * falloff

    Body.applyForce(ball, ball.position, {
      x: normalizedX * forcePower,
      y: normalizedY * forcePower - forcePower * 0.18
    })
  })

  bomb.hasExploded = true
  Composite.remove(world, bomb)
}

function triggerBombExplosionChain() {
  const bombs = shuffleArray(
    ballBodies.filter((ball) => ball.isBombBall && !ball.hasExploded)
  )

  if (!bombs.length) {
    bombSequenceFinished = true
    if (statusText) {
      statusText.textContent = '폭탄이 없어서 결과 대기 상태로 넘어갈게.'
    }
    startFinalResultsWatcher()
    return
  }

  if (statusText) {
    statusText.textContent = '폭탄 연쇄 폭발 시작...'
  }

  bombs.forEach((bomb, index) => {
    const timer = setTimeout(() => {
      explodeSingleBomb(bomb, index + 1, bombs.length)

      if (index === bombs.length - 1) {
        ballBodies = ballBodies.filter((ball) => !ball.isBombBall)
        bombSequenceFinished = true

        const doneTimer = setTimeout(() => {
          if (statusText) {
            statusText.textContent = '폭발 종료. 남은 구슬 정리 중...'
          }
          startFinalResultsWatcher()
        }, 700)

        countdownTimers.push(doneTimer)
      }
    }, index * 160)

    countdownTimers.push(timer)
  })
}

function startResultCountdown() {
  if (resultCountdownStarted || finalResultsShown) return

  resultCountdownStarted = true
  clearFinalWatcher()

  const countdownValues = [3, 2, 1]

  countdownValues.forEach((value, index) => {
    const timer = setTimeout(() => {
      if (!areUndroppedNormalBallsCalm()) {
        resultCountdownStarted = false
        if (statusText) {
          statusText.textContent = '남은 구슬이 다시 움직였어. 다시 기다리는 중...'
        }
        startFinalResultsWatcher()
        return
      }

      if (statusText) {
        statusText.textContent = `결과 공개까지 ${value}...`
      }
    }, index * 1000)

    countdownTimers.push(timer)
  })

  const revealTimer = setTimeout(() => {
    if (!areUndroppedNormalBallsCalm()) {
      resultCountdownStarted = false
      if (statusText) {
        statusText.textContent = '남은 구슬이 다시 움직였어. 다시 기다리는 중...'
      }
      startFinalResultsWatcher()
      return
    }

    finalizeResults()
  }, 3000)

  countdownTimers.push(revealTimer)
}

function startFinalResultsWatcher() {
  clearFinalWatcher()

  finalWatcherTimer = setInterval(() => {
    if (finalResultsShown || !bombSequenceFinished) return

    const undroppedBalls = getUndroppedNormalBalls()
    const undroppedCount = undroppedBalls.length

    if (areUndroppedNormalBallsCalm()) {
      finalStableTicks += 1
    } else {
      finalStableTicks = 0
    }

    if (statusText) {
      if (undroppedCount > 0) {
        statusText.textContent = `남은 구슬 ${undroppedCount}개 정지 대기 중...`
      } else {
        statusText.textContent = '모든 구슬 정리 완료. 결과를 준비 중...'
      }
    }

    if (finalStableTicks >= 4) {
      startResultCountdown()
    }
  }, 400)
}

function buildBoard() {
  if (!engine || !currentSlots.length || !render || !gameCanvasWrap || !slotOverlay) {
    return
  }

  updateGame1BallCountText()
  fitGameCanvasViewport()

  clearSpawnTimers()
  clearWorldBodies()

  boardWidth = gameCanvasWrap.clientWidth
  boardHeight = gameCanvasWrap.clientHeight

  currentScale = getBoardScale(boardWidth, boardHeight)
  currentBoardPadding = Math.round(S(18))
  slotAreaHeight = clampValue(boardHeight * 0.18, S(86), S(118))

  render.canvas.width = boardWidth * (window.devicePixelRatio || 1)
  render.canvas.height = boardHeight * (window.devicePixelRatio || 1)
  render.options.width = boardWidth
  render.options.height = boardHeight
  render.bounds.max.x = boardWidth
  render.bounds.max.y = boardHeight
  render.context.setTransform(1, 0, 0, 1, 0, 0)
  render.context.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)

  slotOverlay.style.left = `${currentBoardPadding}px`
  slotOverlay.style.right = `${currentBoardPadding}px`
  slotOverlay.style.bottom = `${S(16)}px`
  slotOverlay.style.height = `${clampValue(boardHeight * 0.16, S(74), S(112))}px`

  const wallThickness = S(60)
  const slotTopY = boardHeight - slotAreaHeight
  const floorY = boardHeight + S(20)
  const playableWidth = boardWidth - currentBoardPadding * 2
  const slotCount = currentSlots.length
  const slotWidth = playableWidth / slotCount

  const mainPegRadius = S(13)
  const guidePegRadius = S(8)

  const wallInnerFaceX = currentBoardPadding

  const leftWall = Bodies.rectangle(
    -wallThickness / 2 + wallInnerFaceX,
    boardHeight / 2,
    wallThickness,
    boardHeight,
    {
      isStatic: true,
      restitution: 0.4,
      render: { fillStyle: '#ead8c9' }
    }
  )

  const rightWall = Bodies.rectangle(
    boardWidth + wallThickness / 2 - wallInnerFaceX,
    boardHeight / 2,
    wallThickness,
    boardHeight,
    {
      isStatic: true,
      restitution: 0.4,
      render: { fillStyle: '#ead8c9' }
    }
  )

  const floor = Bodies.rectangle(boardWidth / 2, floorY, boardWidth, wallThickness, {
    isStatic: true,
    restitution: 0.15,
    render: { fillStyle: '#e8cfbd' }
  })

  worldBodies.push(leftWall, rightWall, floor)

  const wallSpinnerYs = [
    boardHeight * 0.20,
    boardHeight * 0.34,
    boardHeight * 0.48,
    slotTopY - S(70)
  ]

  wallSpinnerYs.forEach((y, index) => {
    const barLength = index === wallSpinnerYs.length - 1 ? S(90) : S(82)
    const barThickness = S(12)
    const leftX = wallInnerFaceX + S(32)
    const rightX = boardWidth - wallInnerFaceX - S(32)

    const leftSpinner = Bodies.rectangle(leftX, y, barThickness, barLength, {
      isStatic: true,
      restitution: 1.22,
      friction: 0,
      frictionStatic: 0,
      render: {
        fillStyle: '#ead8c9',
        strokeStyle: '#fff9f3',
        lineWidth: Math.max(1, S(2))
      }
    })

    const rightSpinner = Bodies.rectangle(rightX, y, barThickness, barLength, {
      isStatic: true,
      restitution: 1.22,
      friction: 0,
      frictionStatic: 0,
      render: {
        fillStyle: '#ead8c9',
        strokeStyle: '#fff9f3',
        lineWidth: Math.max(1, S(2))
      }
    })

    worldBodies.push(leftSpinner, rightSpinner)

    addMovingBody(leftSpinner, {
      baseX: leftX,
      baseY: y,
      amplitudeX: 0,
      amplitudeY: 0,
      speed: 0,
      phase: 0,
      spinContinuous: true,
      spinSpeed: 0.0042 + index * 0.00025,
      anglePhase: index * 0.45,
      group: 'wall'
    })

    addMovingBody(rightSpinner, {
      baseX: rightX,
      baseY: y,
      amplitudeX: 0,
      amplitudeY: 0,
      speed: 0,
      phase: 0,
      spinContinuous: true,
      spinSpeed: -(0.0044 + index * 0.00022),
      anglePhase: index * 0.55,
      group: 'wall'
    })
  })

  for (let i = 1; i < slotCount; i += 1) {
    const x = currentBoardPadding + slotWidth * i

    const divider = Bodies.rectangle(
      x,
      boardHeight - (slotAreaHeight + S(22)) / 2 + S(14),
      S(8),
      slotAreaHeight + S(22),
      {
        isStatic: true,
        restitution: 0.5,
        render: { fillStyle: '#d8bfae' }
      }
    )

    worldBodies.push(divider)
  }

  for (let i = 1; i < slotCount; i += 1) {
    const x = currentBoardPadding + slotWidth * i

    const guidePeg = Bodies.circle(x, slotTopY - S(24), guidePegRadius, {
      isStatic: true,
      restitution: 0.82,
      render: {
        fillStyle: '#e8d7f7',
        strokeStyle: '#fff7ff',
        lineWidth: Math.max(1, S(2))
      }
    })

    worldBodies.push(guidePeg)
  }

  const rows = Math.max(6, Math.floor((boardHeight - slotAreaHeight - S(130)) / S(58)))
  const pegGapX = Math.max(S(42), Math.min(S(72), playableWidth / 10))
  const pegGapY = S(58)
  const pegStartY = S(86)

  for (let row = 0; row < rows; row += 1) {
    const cols = Math.floor(playableWidth / pegGapX)
    const offset = row % 2 === 0 ? 0 : pegGapX / 2

    for (let col = 0; col <= cols; col += 1) {
      const jitterX = rand(-S(6), S(6))
      const jitterY = rand(-S(3), S(3))

      const x = currentBoardPadding + S(16) + col * pegGapX + offset + jitterX
      const y = pegStartY + row * pegGapY + jitterY

      if (
        x < currentBoardPadding + mainPegRadius ||
        x > boardWidth - currentBoardPadding - mainPegRadius ||
        y > slotTopY - mainPegRadius * 2 - S(16)
      ) {
        continue
      }

      const isChaosRow = row === Math.floor(rows * 0.45) || row === Math.floor(rows * 0.62)

      const peg = Bodies.circle(x, y, mainPegRadius, {
        isStatic: true,
        restitution: isChaosRow ? 1.04 : 0.72,
        render: {
          fillStyle: isChaosRow ? '#d7eef8' : row % 2 === 0 ? '#efd5e4' : '#d8eafc',
          strokeStyle: '#fff7ff',
          lineWidth: Math.max(1, S(2))
        }
      })

      worldBodies.push(peg)
    }
  }

  const horizontalMoverConfigs = [
    { x: boardWidth * 0.16, y: boardHeight * 0.22, w: S(78), h: S(12), ax: playableWidth * 0.06, ay: S(4), speed: 0.0017, phase: 0.2, color: '#f5d7a7' },
    { x: boardWidth * 0.34, y: boardHeight * 0.31, w: S(82), h: S(12), ax: playableWidth * 0.07, ay: S(5), speed: 0.00155, phase: 1.0, color: '#d8ebff' },
    { x: boardWidth * 0.50, y: boardHeight * 0.42, w: S(88), h: S(12), ax: playableWidth * 0.09, ay: S(6), speed: 0.0014, phase: 1.8, color: '#f5d7a7' },
    { x: boardWidth * 0.66, y: boardHeight * 0.31, w: S(82), h: S(12), ax: playableWidth * 0.07, ay: S(5), speed: 0.0016, phase: 2.5, color: '#d8ebff' },
    { x: boardWidth * 0.84, y: boardHeight * 0.22, w: S(78), h: S(12), ax: playableWidth * 0.06, ay: S(4), speed: 0.00175, phase: 3.0, color: '#f5d7a7' },
    { x: boardWidth * 0.14, y: boardHeight * 0.56, w: S(72), h: S(12), ax: playableWidth * 0.05, ay: S(5), speed: 0.0019, phase: 0.7, color: '#d8ebff' },
    { x: boardWidth * 0.86, y: boardHeight * 0.56, w: S(72), h: S(12), ax: playableWidth * 0.05, ay: S(5), speed: 0.00195, phase: 2.1, color: '#f6dfb5' }
  ]

  horizontalMoverConfigs.forEach((cfg, index) => {
    const mover = Bodies.rectangle(cfg.x, cfg.y, cfg.w, cfg.h, {
      isStatic: true,
      chamfer: { radius: S(6) },
      restitution: 1.08,
      render: {
        fillStyle: cfg.color,
        strokeStyle: '#fffdf8',
        lineWidth: Math.max(1, S(2))
      }
    })

    worldBodies.push(mover)

    addMovingBody(mover, {
      baseX: cfg.x,
      baseY: cfg.y,
      amplitudeX: cfg.ax,
      amplitudeY: cfg.ay,
      speed: cfg.speed,
      phase: cfg.phase,
      angleAmplitude: 0.18 + (index % 3) * 0.04,
      angleSpeed: cfg.speed + 0.00025,
      anglePhase: cfg.phase * 0.8,
      group: 'main'
    })
  })

  const spinnerLeftOuter = Bodies.rectangle(boardWidth * 0.20, boardHeight * 0.46, S(14), S(92), {
    isStatic: true,
    chamfer: { radius: S(7) },
    restitution: 1.1,
    render: {
      fillStyle: '#d9f0e7',
      strokeStyle: '#fffdf8',
      lineWidth: Math.max(1, S(2))
    }
  })

  const spinnerRightOuter = Bodies.rectangle(boardWidth * 0.80, boardHeight * 0.46, S(14), S(92), {
    isStatic: true,
    chamfer: { radius: S(7) },
    restitution: 1.1,
    render: {
      fillStyle: '#f1dced',
      strokeStyle: '#fffdf8',
      lineWidth: Math.max(1, S(2))
    }
  })

  const spinnerLeftInner = Bodies.rectangle(boardWidth * 0.30, boardHeight * 0.60, S(14), S(82), {
    isStatic: true,
    chamfer: { radius: S(7) },
    restitution: 1.08,
    render: {
      fillStyle: '#d8ebff',
      strokeStyle: '#fffdf8',
      lineWidth: Math.max(1, S(2))
    }
  })

  const spinnerRightInner = Bodies.rectangle(boardWidth * 0.70, boardHeight * 0.60, S(14), S(82), {
    isStatic: true,
    chamfer: { radius: S(7) },
    restitution: 1.08,
    render: {
      fillStyle: '#f6dfb5',
      strokeStyle: '#fffdf8',
      lineWidth: Math.max(1, S(2))
    }
  })

  worldBodies.push(spinnerLeftOuter, spinnerRightOuter, spinnerLeftInner, spinnerRightInner)

  addMovingBody(spinnerLeftOuter, {
    baseX: boardWidth * 0.20,
    baseY: boardHeight * 0.46,
    amplitudeX: S(22),
    amplitudeY: S(12),
    speed: 0.0021,
    phase: 0.5,
    angleAmplitude: 0.9,
    angleSpeed: 0.0031,
    anglePhase: 1.0,
    group: 'main'
  })

  addMovingBody(spinnerRightOuter, {
    baseX: boardWidth * 0.80,
    baseY: boardHeight * 0.46,
    amplitudeX: S(22),
    amplitudeY: S(12),
    speed: 0.00225,
    phase: 2.2,
    angleAmplitude: 0.9,
    angleSpeed: 0.00315,
    anglePhase: 0.3,
    group: 'main'
  })

  addMovingBody(spinnerLeftInner, {
    baseX: boardWidth * 0.30,
    baseY: boardHeight * 0.60,
    amplitudeX: S(16),
    amplitudeY: S(10),
    speed: 0.002,
    phase: 1.4,
    angleAmplitude: 0.78,
    angleSpeed: 0.0029,
    anglePhase: 0.8,
    group: 'main'
  })

  addMovingBody(spinnerRightInner, {
    baseX: boardWidth * 0.70,
    baseY: boardHeight * 0.60,
    amplitudeX: S(16),
    amplitudeY: S(10),
    speed: 0.00205,
    phase: 2.9,
    angleAmplitude: 0.78,
    angleSpeed: 0.00295,
    anglePhase: 1.9,
    group: 'main'
  })

  const bumperConfigs = [
    { x: boardWidth * 0.10, y: boardHeight * 0.17, color: '#d9f0e7', phase: 0.3, ax: S(20), ay: S(7) },
    { x: boardWidth * 0.24, y: boardHeight * 0.27, color: '#f1dced', phase: 1.1, ax: S(18), ay: S(8) },
    { x: boardWidth * 0.50, y: boardHeight * 0.20, color: '#d8ebff', phase: 2.0, ax: S(14), ay: S(6) },
    { x: boardWidth * 0.76, y: boardHeight * 0.27, color: '#f6dfb5', phase: 2.8, ax: S(18), ay: S(8) },
    { x: boardWidth * 0.90, y: boardHeight * 0.17, color: '#d9f0e7', phase: 3.4, ax: S(20), ay: S(7) },
    { x: boardWidth * 0.12, y: boardHeight * 0.48, color: '#f1dced', phase: 0.9, ax: S(16), ay: S(9) },
    { x: boardWidth * 0.88, y: boardHeight * 0.48, color: '#d8ebff', phase: 2.6, ax: S(16), ay: S(9) }
  ]

  bumperConfigs.forEach((cfg, index) => {
    const bumper = Bodies.circle(cfg.x, cfg.y, S(16), {
      isStatic: true,
      restitution: 1.15,
      render: {
        fillStyle: cfg.color,
        strokeStyle: '#fffdf8',
        lineWidth: Math.max(1, S(2))
      }
    })

    worldBodies.push(bumper)

    addMovingBody(bumper, {
      baseX: cfg.x,
      baseY: cfg.y,
      amplitudeX: cfg.ax,
      amplitudeY: cfg.ay,
      speed: 0.002 + index * 0.00018,
      phase: cfg.phase,
      group: 'main'
    })
  })

  World.add(world, worldBodies)
  renderSlotsOverlay()
  refreshCounts()

  if (totalInfo) {
    totalInfo.textContent = `총 ${slotCount}그릇`
  }

  const uniqueNames = [...new Set(currentSlots.map((slot) => slot.name))]
  if (statusText) {
    statusText.textContent = `현재 배치: ${uniqueNames.join(' / ')}`
  }
}

function renderSlotsOverlay() {
  if (!slotOverlay || !slotLegend) return

  slotOverlay.innerHTML = ''
  slotLegend.innerHTML = ''

  currentSlots.forEach((slot, index) => {
    const color = getColorForName(slot.name)

    const slotBox = document.createElement('div')
    slotBox.className = 'slot-box'
    slotBox.style.flex = '1 1 0'
    slotBox.style.background = `linear-gradient(180deg, ${color} 0%, rgba(255,255,255,0.48) 100%)`
    slotBox.dataset.slotId = slot.id

    const nameEl = document.createElement('div')
    nameEl.className = 'slot-name'
    nameEl.textContent = slot.name

    const metaEl = document.createElement('div')
    metaEl.className = 'slot-meta'
    metaEl.textContent = `그릇 ${index + 1} · 0개`

    slotBox.appendChild(nameEl)
    slotBox.appendChild(metaEl)
    slotOverlay.appendChild(slotBox)
  })
}

function updateLegendWithAggregatedCounts() {
  if (!slotLegend) return

  slotLegend.innerHTML = ''

  const aggregatedCounts = getAggregatedCounts().sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count
    return a.name.localeCompare(b.name, 'ko')
  })

  aggregatedCounts.forEach((item) => {
    const color = getColorForName(item.name)

    const chip = document.createElement('div')
    chip.className = 'legend-chip'
    chip.innerHTML = `
      <span class="legend-dot" style="background:${color}"></span>
      <span>${escapeHtml(item.name)} (${item.count}개)</span>
    `
    slotLegend.appendChild(chip)
  })
}

function createBall(x, y, options = {}) {
  const isBomb = Boolean(options.isBomb)

  if (!isBomb) {
    const color = ballPalette[Math.floor(Math.random() * ballPalette.length)]
    const ball = Bodies.circle(x, y, S(4.5), {
      restitution: rand(0.42, 0.6),
      friction: 0.002,
      frictionAir: 0.0008,
      density: 0.0018,
      render: {
        fillStyle: color,
        strokeStyle: '#fffafc',
        lineWidth: Math.max(0.8, S(1.1))
      }
    })

    ball.isBombBall = false
    ball.hasExploded = false

    ballBodies.push(ball)
    World.add(world, ball)
    return
  }

  const gray = Math.floor(rand(45, 170))
  const darknessRatio = 1 - (gray - 45) / 125
  const bombForce = 0.0055 + darknessRatio * 0.0045
  const bombBlastRadius = S(74 + darknessRatio * 42)
  const bombColor = `rgb(${gray}, ${gray}, ${gray})`

  const bomb = Bodies.circle(x, y, S(5.2), {
    restitution: 0.5,
    friction: 0.002,
    frictionAir: 0.0008,
    density: 0.0022,
    render: {
      fillStyle: bombColor,
      strokeStyle: '#5c5c5c',
      lineWidth: Math.max(1, S(1.4))
    }
  })

  bomb.isBombBall = true
  bomb.hasExploded = false
  bomb.bombForce = bombForce
  bomb.bombBlastRadius = bombBlastRadius
  bomb.bombGray = gray

  ballBodies.push(bomb)
  World.add(world, bomb)
}

function spawnBalls() {
  clearSpawnTimers()
  resetRoundState()

  const normalBallCount = getCurrentNormalBallCount()
  const totalDropCount = getCurrentTotalDropCount()

  const ballTypePool = [
    ...new Array(normalBallCount).fill(false),
    ...new Array(BOMB_COUNT).fill(true)
  ]

  const mixedOrder = shuffleArray(ballTypePool)

  let spawned = 0

  mixedOrder.forEach((isBomb, index) => {
    const timer = setTimeout(() => {
      const x = S(30) + Math.random() * (boardWidth - S(60))
      const y = S(22) + Math.random() * S(12)

      createBall(x, y, { isBomb })
      spawned += 1
      if (statusText) {
        statusText.textContent = `구슬이 떨어지는 중... ${spawned}/${totalDropCount}`
      }

      if (spawned === totalDropCount) {
        roundSpawnComplete = true
        if (statusText) {
          statusText.textContent = `구슬 ${normalBallCount}개 + 폭탄 ${BOMB_COUNT}개 투하 완료. 멈추는 중...`
        }
        startSettleWatcher()
      }
    }, index * SPAWN_INTERVAL_MS)

    spawnTimers.push(timer)
  })
}

function refreshCounts() {
  if (!currentSlots.length || !slotOverlay) return

  const slotCounts = getSlotCountsPerIndex()

  ;[...slotOverlay.children].forEach((slotNode, index) => {
    const meta = slotNode.querySelector('.slot-meta')
    if (meta) {
      meta.textContent = `그릇 ${index + 1} · ${slotCounts[index]}개`
    }
  })

  updateLegendWithAggregatedCounts()
}

function clearBallsOnly() {
  clearSpawnTimers()
  ballBodies.forEach((body) => Composite.remove(world, body))
  ballBodies = []
}

function startRound() {
  if (!configInput) return

  const parsed = parseConfigToSlots(configInput.value)

  if (!handleParseFailure(parsed, { showPopupOnTooMany: true, showPopupOnInvalid: true })) {
    return
  }

  if (configInput.value !== lastAppliedRawText || !currentSlots.length) {
    setCurrentSlots(parsed.slots)
    buildBoard()
  }

  clearBallsOnly()
  refreshCounts()
  setDrawerState(false)
  setGame1InputLock(true)
  setGame1ShuffleLock(true)
  spawnBalls()
}

function shuffleRound() {
  if (!configInput) return

  const parsed = parseConfigToSlots(configInput.value)

  if (!handleParseFailure(parsed, { showPopupOnTooMany: true, showPopupOnInvalid: true })) {
    return
  }

  if (configInput.value !== lastAppliedRawText || !currentSlots.length) {
    setCurrentSlots(parsed.slots)
  }

  currentSlots = shuffleArray(currentSlots)
  lastAppliedRawText = configInput.value
  buildBoard()
  setDrawerState(false)
  if (statusText) {
    statusText.textContent = '셔플 완료! 개별 그릇 위치가 랜덤으로 섞였어.'
  }
}

function resetRound() {
  clearBallsOnly()

  if (!configInput) return

  const parsed = parseConfigToSlots(configInput.value)

  if (parsed.status === 'OK') {
    setCurrentSlots(parsed.slots)
  } else {
    configInput.value = lastValidConfigText
    const fallbackParsed = parseConfigToSlots(lastValidConfigText)
    if (fallbackParsed.status === 'OK') {
      setCurrentSlots(fallbackParsed.slots)
    }
  }

  buildBoard()
  setDrawerState(false)
  setGame1InputLock(false)
  setGame1ShuffleLock(false)
  if (statusText) {
    statusText.textContent = '리셋 완료! 입력값 기준으로 개별 그릇을 다시 만들었어.'
  }
}

function hasLiveRound() {
  return ballBodies.length > 0 && !finalResultsShown
}

function shouldIgnoreMobileChromeResize(nextWidth, nextHeight) {
  if (!isMobileOrTabletLike()) return false

  const widthDelta = Math.abs(nextWidth - lastViewportWidth)
  const heightDelta = Math.abs(nextHeight - lastViewportHeight)

  return widthDelta < 6 && heightDelta > 0 && hasLiveRound()
}

/* =========================
   game2 : race
========================= */

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function parseRaceConfigToHorses(text) {
  const rawItems = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!rawItems.length) {
    return { status: 'EMPTY' }
  }

  if (rawItems.length > RACE_MAX_COUNT) {
    return { status: 'TOO_MANY', horseCount: rawItems.length }
  }

  const uniqueCheck = new Set()
  const horses = rawItems.map((name, index) => {
    if (!name || name.includes('*')) {
      return null
    }

    if (uniqueCheck.has(name)) {
      return 'DUPLICATE'
    }

    uniqueCheck.add(name)

    return {
      id: `horse-${index + 1}`,
      name,
      label: name,
      color: getRaceColorForName(name),
      progress: 0,
      finished: false,
      finishOrder: 0,
      currentStatus: '다그닥',
      baseSpeed: 30.8 + Math.random() * 6.8,
      tempoSeed: Math.random() * Math.PI * 2,
      strideSeed: Math.random() * Math.PI * 2,
      formBias: -2.4 + Math.random() * 4.8,
      kickBias: Math.random() * 6.5,
      staminaBias: Math.random() * 5.8,
      burstSeed: Math.random() * Math.PI * 2,
      bonusSpeed: 0,
      slowPenalty: 0,
      eventUntil: 0,
      fallUntil: 0,
      laneEl: null,
      runnerEl: null,
      statusEl: null
    }
  })

  if (horses.includes(null)) {
    return { status: 'INVALID' }
  }

  if (horses.includes('DUPLICATE')) {
    return { status: 'DUPLICATE' }
  }

  return {
    status: 'OK',
    horses
  }
}

function syncRaceInputToCurrentOrder() {
  if (!raceConfigInput) return

  const orderedText = raceHorses.map((horse) => horse.label).join(', ')
  raceConfigInput.value = orderedText
  lastRaceValidConfigText = orderedText
  lastRaceAppliedRawText = orderedText
}

function getRaceSortedHorses() {
  return [...raceHorses].sort((a, b) => {
    if (a.finished && b.finished) return a.finishOrder - b.finishOrder
    if (a.finished) return -1
    if (b.finished) return 1
    return b.progress - a.progress
  })
}

function applyRaceEventEffect(horse, { bonus = 0, penalty = 0, duration = 1600, status = '정상 질주' } = {}) {
  const now = performance.now()
  horse.bonusSpeed = bonus
  horse.slowPenalty = penalty
  horse.eventUntil = now + duration
  horse.currentStatus = status
}

function handleRaceParseFailure(parsed, options = {}) {
  const { showPopupOnTooMany = false, showPopupOnInvalid = false } = options

  if (parsed.status === 'TOO_MANY') {
    if (raceStatusText) {
      raceStatusText.textContent = `참가 말은 최대 ${RACE_MAX_COUNT}마리까지 가능하다.`
    }
    if (showPopupOnTooMany) {
      showPopup('참가 말 수 초과', `참가 말은 최대 ${RACE_MAX_COUNT}마리까지 가능해.`)
    }
    return false
  }

  if (parsed.status === 'DUPLICATE') {
    if (raceStatusText) {
      raceStatusText.textContent = '같은 이름은 2번 이상 입력할 수 없다. 말은 이름당 1마리만 가능하다.'
    }
    if (showPopupOnInvalid) {
      showPopup(
        '중복 이름 불가',
        '경마 게임은 같은 이름의 말을 여러 마리 만들 수 없어. 이름당 1마리만 가능해.'
      )
    }
    return false
  }

  if (parsed.status === 'INVALID' || parsed.status === 'EMPTY') {
    if (raceStatusText) {
      raceStatusText.textContent = '입력 형식을 확인해줘. 예: 홍길동, 김아무개, 박철수'
    }
    if (showPopupOnInvalid) {
      showPopup(
        '입력 확인',
        '경마 게임은 이름만 쉼표로 구분해 적어줘. 예: 홍길동, 김아무개, 박철수'
      )
    }
    return false
  }

  return true
}

function setRaceHorses(horses) {
  raceHorses = horses
  if (raceConfigInput) {
    lastRaceValidConfigText = raceConfigInput.value
    lastRaceAppliedRawText = raceConfigInput.value
  }
  updateRaceDescription()
}

function updateRaceDescription() {
  if (!raceDesc) return
  raceDesc.textContent = `총 ${raceHorses.length || 0}마리가 완전 랜덤으로 질주하는 자동 경주 게임이다.`
}

function addRaceCommentary(text) {
  if (!raceStatusText) return
  raceStatusText.textContent = text
}

function renderRaceLegend() {
  if (!horseLegend || !raceTotalInfo) return

  horseLegend.innerHTML = ''

  raceHorses.forEach((horse) => {
    const chip = document.createElement('div')
    chip.className = 'legend-chip'
    chip.innerHTML = `
      <span class="legend-dot" style="background:${horse.color}"></span>
      <span>${escapeHtml(horse.label)}</span>
    `
    horseLegend.appendChild(chip)
  })

  raceTotalInfo.textContent = `총 ${raceHorses.length}마리`
}

function renderRaceTracks() {
  if (!raceTrackWrap) return

  raceTrackWrap.innerHTML = ''

  raceHorses.forEach((horse, index) => {
    const lane = document.createElement('div')
    lane.className = 'race-lane'

    lane.innerHTML = `
      <div class="race-lane-label">${index + 1}레인</div>
      <div class="race-start-line"></div>
      <div class="race-finish-line"></div>
      <div class="race-track-inner">
        <div class="race-horse">
          <span class="horse-emoji">🐎</span>
          <div class="horse-info">
            <div class="horse-name">${escapeHtml(horse.label)}</div>
            <div class="horse-status">다그닥</div>
          </div>
        </div>
      </div>
    `

    horse.laneEl = lane
    horse.runnerEl = lane.querySelector('.race-horse')
    horse.statusEl = lane.querySelector('.horse-status')

    if (horse.runnerEl) {
      horse.runnerEl.style.setProperty('--horse-color', horse.color)
    }

    raceTrackWrap.appendChild(lane)
    updateHorsePosition(horse)
  })
}

function updateHorsePosition(horse) {
  if (!horse.runnerEl) return

  const percent = Math.min(94, (horse.progress / RACE_DISTANCE) * 94)
  horse.runnerEl.style.left = `${percent}%`

  if (horse.statusEl) {
    horse.statusEl.textContent = horse.currentStatus
  }
}

function renderRaceRanking() {
  if (!raceRankingList) return

  raceRankingList.innerHTML = ''

  const ranking = getRaceSortedHorses()

  ranking.forEach((horse, index) => {
    const item = document.createElement('div')
    item.className = `race-ranking-item${index === 0 ? ' top' : ''}`
    item.innerHTML = `
      <strong>${index + 1}위</strong> ${escapeHtml(horse.label)}
      <div style="margin-top:4px; font-size:0.82rem; color:#8b7366;">
        ${horse.finished ? '완주' : `${Math.floor((horse.progress / RACE_DISTANCE) * 100)}% 진행`}
      </div>
    `
    raceRankingList.appendChild(item)
  })
}

function renderRacePreview() {
  renderRaceLegend()
  renderRaceTracks()
  renderRaceRanking()
}

function updateRaceFromInput({ render = true } = {}) {
  if (!raceConfigInput) return false

  const parsed = parseRaceConfigToHorses(raceConfigInput.value)

  if (!handleRaceParseFailure(parsed)) {
    return false
  }

  setRaceHorses(parsed.horses)

  if (render) {
    renderRacePreview()
    if (raceStatusText) {
      raceStatusText.textContent = `실시간 반영 완료: 총 ${raceHorses.length}마리`
    }
  }

  return true
}

function ensureRaceReady() {
  if (!raceConfigInput) return

  if (!raceHorses.length) {
    const parsed = parseRaceConfigToHorses(raceConfigInput.value)

    if (parsed.status === 'OK') {
      setRaceHorses(parsed.horses)
    } else {
      raceConfigInput.value = '홍길동, 김아무개, 박철수'
      const fallbackParsed = parseRaceConfigToHorses(raceConfigInput.value)
      if (fallbackParsed.status === 'OK') {
        setRaceHorses(fallbackParsed.horses)
      }
    }
  }

  renderRacePreview()

  if (raceStatusText && !raceRunning) {
    raceStatusText.textContent = '출전 준비 완료. 시작 버튼을 누르면 경주가 시작된다.'
  }
}

function stopRaceLoop() {
  raceRunning = false
  raceLastTimestamp = 0

  if (raceAnimationFrame) {
    cancelAnimationFrame(raceAnimationFrame)
    raceAnimationFrame = null
  }

  if (raceEventTimer) {
    clearInterval(raceEventTimer)
    raceEventTimer = null
  }

  if (raceCommentaryTimer) {
    clearInterval(raceCommentaryTimer)
    raceCommentaryTimer = null
  }
}

function resetRaceHorseStates() {
  raceFinishOrder = []
  raceLeaderName = ''

  raceHorses.forEach((horse) => {
    horse.progress = 0
    horse.finished = false
    horse.finishOrder = 0
    horse.currentStatus = '다그닥'
    horse.bonusSpeed = 0
    horse.slowPenalty = 0
    horse.eventUntil = 0
    horse.fallUntil = 0

    if (horse.runnerEl) {
      horse.runnerEl.classList.remove('horse-finished')
    }

    if (horse.laneEl) {
      horse.laneEl.classList.remove('lane-finished')
    }

    updateHorsePosition(horse)
  })

  renderRaceRanking()
}

function shuffleRace() {
  if (!raceConfigInput) return

  const parsed = parseRaceConfigToHorses(raceConfigInput.value)

  if (!handleRaceParseFailure(parsed, { showPopupOnTooMany: true, showPopupOnInvalid: true })) {
    return
  }

  stopRaceLoop()
  raceFinished = false
  setRaceInputLock(false)
  setRaceShuffleLock(false)
  setRaceHorses(shuffleArray(parsed.horses))
  syncRaceInputToCurrentOrder()
  renderRacePreview()

  addRaceCommentary('출전 순서가 랜덤으로 재배치되었습니다. 시작을 누르면 이 순서 그대로 출발합니다.')
}

function resetRace() {
  if (!raceConfigInput) return

  stopRaceLoop()
  raceFinished = false

  const parsed = parseRaceConfigToHorses(raceConfigInput.value)

  if (parsed.status === 'OK') {
    setRaceHorses(parsed.horses)
  } else {
    raceConfigInput.value = lastRaceValidConfigText
    const fallbackParsed = parseRaceConfigToHorses(lastRaceValidConfigText)
    if (fallbackParsed.status === 'OK') {
      setRaceHorses(fallbackParsed.horses)
    }
  }

  renderRacePreview()
  setRaceInputLock(false)
  setRaceShuffleLock(false)

  addRaceCommentary('출전 준비가 다시 완료되었습니다.')
}

function getLeaderHorse() {
  return getRaceSortedHorses()[0]
}

function maybeCommentLeaderChange() {
  const leader = getLeaderHorse()
  if (!leader) return

  if (raceLeaderName !== leader.label) {
    raceLeaderName = leader.label
    addRaceCommentary(`${leader.label}, 선두로 올라섭니다!`)
  }
}

function triggerRaceEvent() {
  if (!raceRunning || raceFinished) return

  const ranking = getRaceSortedHorses().filter((horse) => !horse.finished)
  if (!ranking.length) return

  const groupSize = Math.max(1, Math.ceil(ranking.length / 3))
  const leaders = ranking.slice(0, groupSize)
  const trailers = ranking.slice(-groupSize)
  const midStart = Math.max(1, Math.floor(ranking.length / 3))
  const midEnd = Math.max(midStart + 1, Math.ceil((ranking.length * 2) / 3))
  const midPack = ranking.slice(midStart, midEnd)
  const upperMidPack = ranking.slice(1, Math.max(2, groupSize + 1))
  const now = performance.now()
  const roll = Math.random()

  if (roll < 0.22) {
    const horse = getRandomItem(trailers)
    applyRaceEventEffect(horse, {
      bonus: 18 + Math.random() * 10,
      duration: 1500 + Math.random() * 700,
      status: '막판 추격'
    })
    addRaceCommentary(`${horse.label}, 뒤에서 폭발적인 추격이 나옵니다!`)
    return
  }

  if (roll < 0.40) {
    const horse = getRandomItem(midPack.length ? midPack : ranking)
    applyRaceEventEffect(horse, {
      bonus: 14 + Math.random() * 8,
      duration: 1200 + Math.random() * 650,
      status: '치고 나감'
    })
    addRaceCommentary(`${horse.label}, 중위권에서 한 번에 치고 올라옵니다!`)
    return
  }

  if (roll < 0.58) {
    const horse = getRandomItem(leaders)
    applyRaceEventEffect(horse, {
      penalty: 14 + Math.random() * 8,
      duration: 1300 + Math.random() * 700,
      status: '페이스 흔들림'
    })
    addRaceCommentary(`${horse.label}, 선두권에서 페이스가 눈에 띄게 꺾입니다!`)
    return
  }

  if (roll < 0.73) {
    const attackerPool = [...upperMidPack, ...trailers].filter(Boolean)
    const horse = getRandomItem(attackerPool.length ? attackerPool : ranking)
    applyRaceEventEffect(horse, {
      bonus: 15 + Math.random() * 8,
      duration: 1200 + Math.random() * 500,
      status: '바깥쪽 질주'
    })

    const leader = leaders[0]
    if (leader && leader !== horse) {
      leader.slowPenalty = Math.max(leader.slowPenalty, 7 + Math.random() * 5)
      leader.eventUntil = Math.max(leader.eventUntil, now + 1200)
      if (!leader.finished) {
        leader.currentStatus = '견제당함'
      }
    }

    addRaceCommentary(`${horse.label}, 선두권을 강하게 압박합니다!`)
    return
  }

  if (roll < 0.90) {
    const dangerPool = [...leaders, ...midPack, ...trailers].filter(Boolean)
    const horse = getRandomItem(dangerPool.length ? dangerPool : ranking)
    horse.fallUntil = now + 1200 + Math.random() * 850
    horse.progress = Math.max(0, horse.progress - (16 + Math.random() * 22))
    applyRaceEventEffect(horse, {
      penalty: 18 + Math.random() * 10,
      duration: 1800 + Math.random() * 800,
      status: '넘어짐'
    })
    updateHorsePosition(horse)
    addRaceCommentary(`${horse.label}, 크게 휘청하며 속도가 확 떨어집니다!`)
    return
  }

  const leader = ranking[0]
  const chaser = ranking[1]
  const tail = ranking[ranking.length - 1]

  if (leader && chaser && tail && leader !== tail) {
    addRaceCommentary(`${leader.label}가 버티는 가운데 ${tail.label}까지 다시 살아납니다!`)
  } else if (leader) {
    addRaceCommentary(`${leader.label}, 아직 끝까지 안심할 수 없는 흐름입니다!`)
  }
}

function pushAutoCommentary() {
  if (!raceRunning || raceFinished) return

  const ranking = getRaceSortedHorses()

  if (!ranking.length) return

  const leader = ranking[0]
  const chaser = ranking[1]
  const third = ranking[2]
  const gap = leader && chaser ? leader.progress - chaser.progress : 0

  if (leader && chaser && third && !leader.finished && !chaser.finished) {
    if (gap < 70) {
      addRaceCommentary(`${leader.label}, ${chaser.label}, ${third.label}까지 한 덩어리로 몰립니다!`)
    } else {
      addRaceCommentary(`${leader.label}가 앞서가지만 ${chaser.label}가 다시 거리를 줄입니다!`)
    }
  } else if (leader && chaser && !leader.finished && !chaser.finished) {
    addRaceCommentary(`${leader.label}가 선두, ${chaser.label}가 끝까지 물고 늘어집니다!`)
  } else if (leader && !leader.finished) {
    addRaceCommentary(`${leader.label}, 아직도 뒤를 따돌리지 못하고 있습니다!`)
  }
}

function finishHorse(horse) {
  if (horse.finished) return

  horse.finished = true
  horse.progress = RACE_DISTANCE
  horse.finishOrder = raceFinishOrder.length + 1
  horse.currentStatus = '완주'
  raceFinishOrder.push(horse)
  updateHorsePosition(horse)

  if (horse.runnerEl) {
    horse.runnerEl.classList.add('horse-finished')
  }

  if (horse.laneEl) {
    horse.laneEl.classList.add('lane-finished')
  }

  addRaceCommentary(`${horse.label}, ${horse.finishOrder}위로 결승선을 통과합니다!`)
}

function showRaceResultsPopup() {
  const html = raceFinishOrder
    .map((horse, index) => {
      return `<span style="display:block;margin:8px 0;"><strong>${index + 1}위. ${escapeHtml(horse.label)}</strong></span>`
    })
    .join('')

  showPopup('경주 결과', html || '<span>결과가 없습니다.</span>', {
    icon: '🏇',
    allowHtml: true
  })
}

function raceFrame(timestamp) {
  if (!raceRunning) return

  if (!raceLastTimestamp) {
    raceLastTimestamp = timestamp
  }

  const dt = Math.min(0.05, (timestamp - raceLastTimestamp) / 1000)
  raceLastTimestamp = timestamp

  const activeRanking = getRaceSortedHorses().filter((horse) => !horse.finished)
  const leaderProgress = activeRanking[0]?.progress || 0
  const tailProgress = activeRanking[activeRanking.length - 1]?.progress || 0
  const averageProgress = activeRanking.length
    ? activeRanking.reduce((sum, horse) => sum + horse.progress, 0) / activeRanking.length
    : 0
  const spread = leaderProgress - tailProgress
  const rankMap = new Map(activeRanking.map((horse, index) => [horse.id, index]))

  raceHorses.forEach((horse) => {
    if (horse.finished) return

    if (horse.eventUntil && timestamp > horse.eventUntil) {
      horse.bonusSpeed = 0
      horse.slowPenalty = 0
      horse.eventUntil = 0
      if (!horse.finished) {
        horse.currentStatus = '다그닥'
      }
    }

    if (horse.fallUntil && timestamp > horse.fallUntil) {
      horse.fallUntil = 0
      if (!horse.finished && horse.currentStatus === '넘어짐') {
        horse.currentStatus = '다시 추격'
      }
    }

    const rankIndex = rankMap.get(horse.id) ?? activeRanking.length - 1
    const gapToLeader = leaderProgress - horse.progress
    const gapToAverage = averageProgress - horse.progress
    const progressRatio = horse.progress / RACE_DISTANCE
    const packBias = Math.max(0, Math.min(6.2, (gapToAverage / RACE_DISTANCE) * 24))
    const comebackBoost = rankIndex >= Math.floor(activeRanking.length / 2)
      ? Math.max(0, Math.min(7.8, (gapToLeader / RACE_DISTANCE) * 34))
      : Math.max(0, Math.min(3.8, (gapToLeader / RACE_DISTANCE) * 15))
    const leaderDrag = rankIndex === 0
      ? Math.max(0, Math.min(4.8, (spread / RACE_DISTANCE) * 10))
      : rankIndex === 1
        ? Math.max(0, Math.min(1.8, (spread / RACE_DISTANCE) * 4))
        : 0
    const fatiguePenalty = rankIndex <= 1 && progressRatio > 0.48
      ? Math.max(0, Math.min(5.6, ((progressRatio - 0.48) / 0.52) * (2.8 + spread / 220)))
      : 0
    const lateKick = progressRatio > 0.72
      ? horse.kickBias * ((progressRatio - 0.72) / 0.28)
      : 0
    const rhythmSwing = Math.sin(timestamp * 0.00195 + horse.tempoSeed) * (2.8 + horse.kickBias * 0.16)
      + Math.cos(timestamp * 0.00112 + horse.strideSeed) * (1.8 + horse.staminaBias * 0.12)
      + Math.sin(timestamp * 0.0026 + horse.burstSeed) * 1.9

    let speed = horse.baseSpeed
      + horse.formBias
      + rhythmSwing
      + (Math.random() - 0.5) * 2.8

    speed += packBias
    speed += comebackBoost
    speed += lateKick
    speed -= leaderDrag
    speed -= fatiguePenalty

    if (horse.progress > RACE_DISTANCE * 0.58) {
      if (rankIndex === 0) {
        speed -= Math.min(3.8, (spread / RACE_DISTANCE) * 8.5)
      } else if (rankIndex >= 1 && rankIndex <= 3) {
        speed += Math.max(0, Math.min(4.8, (gapToLeader / RACE_DISTANCE) * 14))
      } else {
        speed += Math.max(0, Math.min(3.6, (gapToLeader / RACE_DISTANCE) * 10))
      }
    }

    if (horse.fallUntil && timestamp < horse.fallUntil) {
      speed = 1.4 + Math.random() * 1.8
    }

    speed += horse.bonusSpeed
    speed -= horse.slowPenalty
    speed = Math.max(2, speed)

    horse.progress += speed * dt

    if (horse.progress >= RACE_DISTANCE) {
      finishHorse(horse)
    }

    updateHorsePosition(horse)
  })

  maybeCommentLeaderChange()
  renderRaceRanking()

  if (raceFinishOrder.length === raceHorses.length) {
    raceRunning = false
    raceFinished = true
    setRaceInputLock(false)
    setRaceShuffleLock(false)
    if (raceStatusText) {
      raceStatusText.textContent = '경주 종료! 최종 순위를 확인해줘.'
    }
    stopRaceLoop()
    renderRaceRanking()
    showRaceResultsPopup()
    return
  }

  raceAnimationFrame = requestAnimationFrame(raceFrame)
}


function setBattleInputLock(isLocked) {
  if (!battleConfigInput) return
  battleConfigInput.disabled = isLocked
  battleConfigInput.style.opacity = isLocked ? '0.65' : '1'
  battleConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
}

function setBattleShuffleLock(isLocked) {
  if (!shuffleBattleBtn) return
  shuffleBattleBtn.disabled = isLocked
  shuffleBattleBtn.style.opacity = isLocked ? '0.55' : '1'
  shuffleBattleBtn.style.cursor = isLocked ? 'not-allowed' : ''
}

function updateBattleDescription() {
  if (!battleDesc) return
  battleDesc.textContent = `총 ${battlePlayers.length || 0}명이 카드 5장으로 중간 계산과 최종 점수 순위를 겨루는 게임이다.`
}

function formatBattleValue(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '-'
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

function roundBattleValue(value) {
  return Math.round(value * 10) / 10
}

function randomBattleOperator() {
  return BATTLE_OPERATORS[Math.floor(Math.random() * BATTLE_OPERATORS.length)]
}

function operateBattle(left, operator, right) {
  switch (operator) {
    case '+':
      return left + right
    case '-':
      return left - right
    case '×':
      return left * right
    case '÷':
      return right === 0 ? left : left / right
    default:
      return left
  }
}

function getRandomBattleNumber({ allowZero = true } = {}) {
  const min = allowZero ? 0 : 1
  return Math.floor(rand(min, 101))
}

function parseBattleConfigToPlayers(text) {
  const rawItems = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!rawItems.length) {
    return { status: 'EMPTY' }
  }

  if (rawItems.length > BATTLE_MAX_PLAYERS) {
    return { status: 'TOO_MANY', count: rawItems.length }
  }

  const seen = new Set()
  const players = []

  for (const raw of rawItems) {
    if (!raw || raw.includes('*')) {
      return { status: 'INVALID' }
    }

    const normalized = raw.replace(/\u0000/g, '').trim()
    if (!normalized) {
      return { status: 'INVALID' }
    }

    if (seen.has(normalized)) {
      return { status: 'DUPLICATE' }
    }

    seen.add(normalized)
    players.push({
      id: `battle-player-${players.length + 1}`,
      label: normalized,
      color: raceHorsePalette[players.length % raceHorsePalette.length]
    })
  }

  return { status: 'OK', players }
}

function handleBattleParseFailure(parsed, { showPopupOnInvalid = false } = {}) {
  if (!battleStatusText) return false

  if (parsed.status === 'EMPTY') {
    battleStatusText.textContent = '참가자를 먼저 입력해줘. 예: 홍길동, 김아무개, 박철수'
    return false
  }

  if (parsed.status === 'TOO_MANY') {
    battleStatusText.textContent = `참가자는 최대 ${BATTLE_MAX_PLAYERS}명까지 가능하다.`
    if (showPopupOnInvalid) {
      showPopup('참가자 수 초과', `카드 연산 배틀은 최대 ${BATTLE_MAX_PLAYERS}명까지만 참가할 수 있어.`)
    }
    return false
  }

  if (parsed.status === 'DUPLICATE') {
    battleStatusText.textContent = '같은 이름은 2번 이상 입력할 수 없다.'
    if (showPopupOnInvalid) {
      showPopup('중복 이름 불가', '카드 연산 배틀은 같은 이름을 중복 등록할 수 없어.')
    }
    return false
  }

  battleStatusText.textContent = '입력 형식을 확인해줘. 참가자*n 형식은 사용할 수 없다. 예: 홍길동, 김아무개, 박철수'
  if (showPopupOnInvalid) {
    showPopup('입력 확인', '참가자 이름만 쉼표로 구분해 적어줘. 참가자*n 형식은 사용할 수 없어.')
  }
  return false
}

function setBattlePlayers(players) {
  battlePlayers = players
  if (battleConfigInput) {
    lastBattleValidConfigText = battleConfigInput.value
    lastBattleAppliedRawText = battleConfigInput.value
  }
  updateBattleDescription()
}

function renderBattleLegend() {
  if (!battleLegend || !battleTotalInfo) return

  battleLegend.innerHTML = ''

  battlePlayers.forEach((player) => {
    const chip = document.createElement('div')
    chip.className = 'legend-chip'
    chip.innerHTML = `
      <span class="legend-dot" style="background:${player.color}"></span>
      <span>${escapeHtml(player.label)}</span>
    `
    battleLegend.appendChild(chip)
  })

  battleTotalInfo.textContent = `총 ${battlePlayers.length}명`
}

function createBattleGhostSlots(count) {
  return Array.from({ length: count }, () => '<div class="battle-slot is-ghost"></div>').join('')
}

function renderBattleRowsPreview() {
  if (!battleTable) return

  battleTable.innerHTML = ''

  battlePlayers.forEach((player) => {
    const row = document.createElement('div')
    row.className = 'battle-row'
    row.dataset.playerId = player.id
    row.innerHTML = `
      <div class="battle-row-main">
        <div class="battle-player-head">
          <span class="legend-dot" style="background:${player.color}"></span>
          <span class="battle-player-name">${escapeHtml(player.label)}</span>
          <span class="battle-result-pill hidden" aria-hidden="true"></span>
        </div>
        <div class="battle-player-sub">카드를 기다리는 중</div>
      </div>
      <div class="battle-hand hand-five">
        ${createBattleGhostSlots(5)}
      </div>
    `
    battleTable.appendChild(row)
  })
}

function renderBattleRanking(ranking = []) {
  if (!battleRankingList) return

  if (!ranking.length) {
    battleRankingList.innerHTML = '<div class="battle-ranking-empty">참가자를 입력한 뒤 시작 버튼을 누르면<br>최종 순위가 여기에 표시된다.</div>'
    return
  }

  battleRankingList.innerHTML = ''

  ranking.forEach((player, index) => {
    const item = document.createElement('div')
    item.className = `battle-ranking-item${index === 0 ? ' top' : ''}`
    item.innerHTML = `
      <div class="battle-rank-num">${index + 1}</div>
      <div class="battle-rank-main">
        <div class="battle-rank-name">${escapeHtml(player.label)}</div>
        <div class="battle-rank-formula">${escapeHtml(getBattleFinalFormulaText(player))}</div>
      </div>
      <div class="battle-rank-score">${formatBattleValue(player.final)}점</div>
    `
    battleRankingList.appendChild(item)
  })
}

function renderBattlePreview() {
  renderBattleLegend()
  renderBattleRowsPreview()
  renderBattleRanking([])
}

function updateBattleFromInput({ render = true } = {}) {
  if (!battleConfigInput) return false

  const parsed = parseBattleConfigToPlayers(battleConfigInput.value)

  if (parsed.status !== 'OK') {
    return handleBattleParseFailure(parsed)
  }

  setBattlePlayers(parsed.players)

  if (render) {
    renderBattlePreview()
    if (battleStatusText) {
      battleStatusText.textContent = `실시간 반영 완료: 총 ${battlePlayers.length}명`
    }
  }

  return true
}

function ensureBattleReady() {
  if (!battleConfigInput) return

  if (!battlePlayers.length) {
    const parsed = parseBattleConfigToPlayers(battleConfigInput.value)

    if (parsed.status === 'OK') {
      setBattlePlayers(parsed.players)
    } else {
      battleConfigInput.value = '홍길동, 김아무개, 박철수'
      const fallbackParsed = parseBattleConfigToPlayers(battleConfigInput.value)
      if (fallbackParsed.status === 'OK') {
        setBattlePlayers(fallbackParsed.players)
      }
    }
  }

  renderBattlePreview()

  if (battleStatusText && !battleGameRunning) {
    battleStatusText.textContent = '참가 준비 완료. 시작 버튼을 누르면 카드가 섞이고, 각 참가자가 직접 카드를 뒤집는다.'
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isBattleFlowActive(token) {
  return battleFlowToken === token && screens.game3?.classList.contains('active')
}

function stopBattleFlow() {
  battleFlowToken += 1
  battleCurrentToken = 0
  battlePhase = 'idle'
  battleRoundPlayers = []
  battleInteractionLocked = false
  battleGameRunning = false
  battleDeck?.classList.remove('is-shuffling')
  setBattleInputLock(false)
  setBattleShuffleLock(false)
}

function getBattlePhase1FormulaText(player) {
  return `${player.cards[0].text} ${player.cards[1].text} ${player.cards[2].text} = ${formatBattleValue(player.interim)}`
}

function getBattleFinalFormulaText(player) {
  return `${formatBattleValue(player.interim)} ${player.cards[3].text} ${player.cards[4].text} = ${formatBattleValue(player.final)}`
}

function buildBattleRoundPlayers() {
  return battlePlayers.map((player) => {
    const number1 = getRandomBattleNumber()
    const operator1 = randomBattleOperator()
    const number2 = getRandomBattleNumber({ allowZero: operator1 !== '÷' })
    const operator2 = randomBattleOperator()
    const number3 = getRandomBattleNumber({ allowZero: operator2 !== '÷' })

    const interim = roundBattleValue(operateBattle(number1, operator1, number2))
    const final = roundBattleValue(operateBattle(interim, operator2, number3))

    return {
      ...player,
      cards: [
        { type: 'number', value: number1, text: String(number1) },
        { type: 'operator', value: operator1, text: operator1 },
        { type: 'number', value: number2, text: String(number2) },
        { type: 'operator', value: operator2, text: operator2 },
        { type: 'number', value: number3, text: String(number3) }
      ],
      interim,
      final,
      nextRevealIndex: 3,
      phase1Revealed: [false, false, false],
      phase2Revealed: [false, false],
      phase1Done: false,
      finalDone: false
    }
  })
}

function createBattleCardElement(card, { flipped = false, actualIndex = null } = {}) {
  const cardEl = document.createElement('div')
  cardEl.className = `battle-card type-${card.type}${flipped ? ' is-flipped' : ''}`
  cardEl.style.setProperty('--deal-rotate', `${Math.round(rand(-18, 18))}deg`)
  if (actualIndex !== null) {
    cardEl.dataset.cardIndex = String(actualIndex)
  }
  cardEl.setAttribute('role', 'button')
  cardEl.setAttribute('tabindex', '-1')
  cardEl.setAttribute('aria-disabled', 'true')
  cardEl.innerHTML = `
    <div class="battle-card-inner">
      <div class="battle-card-face battle-card-back"></div>
      <div class="battle-card-face battle-card-front">
        <div class="battle-card-value">${card.type === 'result' ? `<small>${escapeHtml(card.label || '중간 결과')}</small>${escapeHtml(card.text)}` : escapeHtml(card.text)}</div>
      </div>
    </div>
  `
  return cardEl
}

function getBattleRowElement(playerId) {
  return battleTable?.querySelector(`[data-player-id="${playerId}"]`) || null
}

function getBattleRoundPlayer(playerId) {
  return battleRoundPlayers.find((player) => player.id === playerId) || null
}

function createBattleSlots(count) {
  return Array.from({ length: count }, () => {
    const slot = document.createElement('div')
    slot.className = 'battle-slot'
    return slot
  })
}

function prepareBattleRoundRows(roundPlayers) {
  if (!battleTable) return

  battleTable.innerHTML = ''

  roundPlayers.forEach((player) => {
    const row = document.createElement('div')
    row.className = 'battle-row'
    row.dataset.playerId = player.id

    const slotsMarkup = Array.from({ length: 5 }, () => '<div class="battle-slot"></div>').join('')

    row.innerHTML = `
      <div class="battle-row-main">
        <div class="battle-player-head">
          <span class="legend-dot" style="background:${player.color}"></span>
          <span class="battle-player-name">${escapeHtml(player.label)}</span>
          <span class="battle-result-pill hidden" aria-hidden="true"></span>
        </div>
      </div>
      <div class="battle-hand hand-five">${slotsMarkup}</div>
    `
    battleTable.appendChild(row)
  })
}

async function playBattleShuffleAnimation(token) {
  if (!battleDeck) return
  battleDeck.classList.add('is-shuffling')
  if (battleStatusText) {
    battleStatusText.textContent = '카드를 섞는 중...'
  }
  await sleep(1650)
  if (!isBattleFlowActive(token)) return
  battleDeck.classList.remove('is-shuffling')
}

async function dealBattleCards(roundPlayers, token) {
  for (const player of roundPlayers) {
    const row = getBattleRowElement(player.id)
    if (!row) continue


    const slots = row.querySelectorAll('.battle-slot')

    for (let index = 0; index < player.cards.length; index += 1) {
      if (!isBattleFlowActive(token)) return

      const slot = slots[index]
      if (!slot) continue

      const cardEl = createBattleCardElement(player.cards[index], { actualIndex: index })
      slot.appendChild(cardEl)
      requestAnimationFrame(() => {
        cardEl.classList.add('is-dealt')
      })
      await sleep(95)
    }

  }

  await sleep(320)
}

function updateBattlePlayerSubText(player) {
  const row = getBattleRowElement(player.id)
  const subText = row?.querySelector('.battle-player-sub')
  if (!subText) return

  if (player.finalDone) {
    subText.textContent = getBattleFinalFormulaText(player)
    return
  }

  if (!player.phase1Done) {
    const remaining = [1, 2, 3].filter((number, index) => !player.phase1Revealed[index])
    subText.textContent = remaining.length
      ? `${remaining.join(', ')}번째 카드 중 원하는 카드를 선택해 공개`
      : '1차 수식 확인 중'
    return
  }

  const allPhase1Done = battleRoundPlayers.length > 0 && battleRoundPlayers.every((item) => item.phase1Done)
  if (!allPhase1Done) {
    subText.textContent = `1차 결과 ${formatBattleValue(player.interim)} 공개 완료 · 다른 참가자 대기 중`
    return
  }

  const remainingPhase2 = []
  if (!player.phase2Revealed?.[0]) remainingPhase2.push('4번째')
  if (!player.phase2Revealed?.[1]) remainingPhase2.push('5번째')

  if (remainingPhase2.length === 2) {
    subText.textContent = '4번째 또는 5번째 카드를 원하는 순서로 공개'
    return
  }

  if (remainingPhase2.length === 1) {
    subText.textContent = `${remainingPhase2[0]} 카드를 선택해 공개`
    return
  }

  subText.textContent = '최종 수식 확인 중'
}

function updateAllBattlePlayerSubTexts() {
  battleRoundPlayers.forEach((player) => {
    updateBattlePlayerSubText(player)
  })
}

function setBattleCardAvailability(cardEl, isEnabled, options = {}) {
  if (!cardEl) return

  const { showLocked = false } = options

  cardEl.classList.toggle('is-clickable', isEnabled)
  cardEl.classList.toggle('is-soft-disabled', !isEnabled && !showLocked)
  cardEl.classList.toggle('is-locked', !isEnabled && showLocked)
  cardEl.setAttribute('tabindex', isEnabled ? '0' : '-1')
  cardEl.setAttribute('aria-disabled', isEnabled ? 'false' : 'true')
}

function getBattleCardAvailabilityState(player, cardIndex, cardEl) {
  const isFlipped = Boolean(cardEl?.classList.contains('is-flipped'))

  if (!Number.isFinite(cardIndex) || isFlipped) {
    return { isEnabled: false, showLocked: false }
  }

  if (!battleGameRunning || !player || player.finalDone) {
    return { isEnabled: false, showLocked: false }
  }

  if (battlePhase === 'phase1') {
    if (cardIndex >= 0 && cardIndex <= 2) {
      return {
        isEnabled: !battleInteractionLocked && !player.phase1Revealed[cardIndex],
        showLocked: false
      }
    }

    if (cardIndex === 3 || cardIndex === 4) {
      return { isEnabled: false, showLocked: true }
    }

    return { isEnabled: false, showLocked: false }
  }

  if (battlePhase === 'phase2') {
    const allPhase1Done = battleRoundPlayers.every((item) => item.phase1Done)

    if (!allPhase1Done && (cardIndex === 3 || cardIndex === 4)) {
      return { isEnabled: false, showLocked: true }
    }

    if (cardIndex === 3) {
      return {
        isEnabled: !battleInteractionLocked && !player.phase2Revealed?.[0],
        showLocked: false
      }
    }

    if (cardIndex === 4) {
      return {
        isEnabled: !battleInteractionLocked && !player.phase2Revealed?.[1],
        showLocked: false
      }
    }

    return { isEnabled: false, showLocked: false }
  }

  return { isEnabled: false, showLocked: false }
}

function canFlipBattleCard(player, cardIndex) {
  if (!battleGameRunning || battleInteractionLocked) return false
  if (!player || player.finalDone) return false

  if (battlePhase === 'phase1') {
    return cardIndex >= 0 && cardIndex <= 2 && !player.phase1Revealed[cardIndex]
  }

  if (battlePhase === 'phase2') {
    if (!battleRoundPlayers.every((item) => item.phase1Done)) return false
    if (cardIndex === 3) {
      return !player.phase2Revealed?.[0]
    }
    if (cardIndex === 4) {
      return !player.phase2Revealed?.[1]
    }
    return false
  }

  return false
}

function refreshBattleCardAvailability() {
  battleRoundPlayers.forEach((player) => {
    const row = getBattleRowElement(player.id)
    if (!row) return

    row.querySelectorAll('.battle-card').forEach((cardEl) => {
      const cardIndex = Number(cardEl.dataset.cardIndex)
      const state = getBattleCardAvailabilityState(player, cardIndex, cardEl)

      setBattleCardAvailability(cardEl, state.isEnabled, { showLocked: state.showLocked })
    })
  })
}

async function condenseBattlePlayerRow(player, token) {
  const row = getBattleRowElement(player.id)
  if (!row) return

  row.classList.add('is-condensing')
  row.querySelectorAll('.battle-card').forEach((card, index) => {
    const actualIndex = Number(card.dataset.cardIndex)
    if (index < 3 || actualIndex <= 2) {
      card.classList.add('is-retiring')
    }
  })

  await sleep(340)
  if (!isBattleFlowActive(token)) return

  const hand = row.querySelector('.battle-hand')
  if (!hand) return

  hand.className = 'battle-hand hand-three'
  hand.innerHTML = ''

  const slots = createBattleSlots(3)
  slots.forEach((slot) => hand.appendChild(slot))

  const resultCard = createBattleCardElement(
    { type: 'result', value: player.interim, text: formatBattleValue(player.interim), label: '1차 결과' },
    { flipped: true }
  )
  slots[0].appendChild(resultCard)
  requestAnimationFrame(() => {
    resultCard.classList.add('is-dealt')
  })

  const opCard = createBattleCardElement(player.cards[3], { actualIndex: 3 })
  const numCard = createBattleCardElement(player.cards[4], { actualIndex: 4 })
  slots[1].appendChild(opCard)
  slots[2].appendChild(numCard)

  requestAnimationFrame(() => {
    opCard.classList.add('is-dealt')
    numCard.classList.add('is-dealt')
  })

  row.classList.remove('is-condensing')
  updateBattlePlayerSubText(player)
}

function createBattleFinalSummary(player) {
  const summary = document.createElement('div')
  summary.className = 'battle-final-summary'

  const rankBadge = document.createElement('div')
  rankBadge.className = 'battle-final-rank'
  rankBadge.innerHTML = `<strong>${player.finalRank}위</strong>`

  const finalBox = document.createElement('div')
  finalBox.className = 'battle-final-result-box'
  finalBox.innerHTML = `
    <small>최종 결과</small>
    <strong>${formatBattleValue(player.final)}점</strong>
  `

  summary.appendChild(rankBadge)
  summary.appendChild(finalBox)

  return summary
}

function applyBattleFinalRow(player) {
  const row = getBattleRowElement(player.id)
  if (!row) return

  row.classList.add('is-finalized')

  const resultPill = row.querySelector('.battle-result-pill')
  if (resultPill) {
    resultPill.classList.add('hidden')
    resultPill.setAttribute('aria-hidden', 'true')
  }

  const subText = row.querySelector('.battle-player-sub')
  if (subText) {
    subText.textContent = ''
  }

  const hand = row.querySelector('.battle-hand')
  if (!hand) return

  hand.className = 'battle-hand battle-hand-final'
  hand.innerHTML = ''
  hand.appendChild(createBattleFinalSummary(player))
}

function getBattleRanking(roundPlayers) {
  return [...roundPlayers].sort((a, b) => {
    if (b.final !== a.final) return b.final - a.final
    return a.label.localeCompare(b.label, 'ko')
  })
}

function buildBattleFinalPopupHtml(ranking) {
  return ranking
    .map((player, index) => {
      return `
        <span style="display:block;margin:10px 0;padding:10px 12px;border-radius:14px;background:rgba(255,255,255,0.72);">
          <strong>${index + 1}위. ${escapeHtml(player.label)}</strong><br>
          <span style="display:block;margin-top:4px;color:#8f7363;">1차: ${escapeHtml(getBattlePhase1FormulaText(player))}</span>
          <span style="display:block;margin-top:4px;color:#8f7363;">최종: ${escapeHtml(getBattleFinalFormulaText(player))}</span>
        </span>
      `
    })
    .join('')
}


function applyBattleFinalCardsToRows(roundPlayers) {
  roundPlayers.forEach((player, index) => {
    player.finalRank = index + 1
    applyBattleFinalRow(player)
  })
}

async function finalizeBattleIfReady(token) {
  const remaining = battleRoundPlayers.filter((player) => !player.finalDone).length
  if (remaining > 0) {
    if (battleStatusText) {
      battleStatusText.textContent = `아직 ${remaining}명의 최종 카드 공개가 남아 있다.`
    }
    return
  }

  const ranking = getBattleRanking(battleRoundPlayers)
  renderBattleRanking(ranking)

  if (battleStatusText) {
    battleStatusText.textContent = '모든 참가자의 최종 결과가 공개되었다. 팝업을 닫으면 각 참가자 옆에 최종 결과 카드가 표시된다.'
  }

  await showPopupAndWait(
    '최종결과 확인',
    buildBattleFinalPopupHtml(ranking) || '<span>결과가 없습니다.</span>',
    { icon: '🏆', allowHtml: true }
  )

  if (!isBattleFlowActive(token)) return

  applyBattleFinalCardsToRows(ranking)

  battleGameRunning = false
  battlePhase = 'done'
  battleInteractionLocked = false
  setBattleInputLock(false)
  setBattleShuffleLock(false)
  refreshBattleCardAvailability()
}

async function handleBattleCardReveal(player, cardIndex) {
  if (!battleGameRunning) return

  const token = battleCurrentToken
  if (!isBattleFlowActive(token)) return

  const row = getBattleRowElement(player.id)
  const targetCard = row?.querySelector(`.battle-card[data-card-index="${cardIndex}"]`)
  if (!targetCard || targetCard.classList.contains('is-flipped') || !canFlipBattleCard(player, cardIndex)) {
    return
  }

  battleInteractionLocked = true
  refreshBattleCardAvailability()

  targetCard.classList.add('is-flipped')
  await sleep(260)
  if (!isBattleFlowActive(token)) return

  if (battlePhase === 'phase1') {
    player.phase1Revealed[cardIndex] = true

    const revealedCount = player.phase1Revealed.filter(Boolean).length
    if (revealedCount < 3) {
      updateBattlePlayerSubText(player)
      if (battleStatusText) {
        battleStatusText.textContent = `${player.label}의 ${cardIndex + 1}번째 카드가 공개되었다. 첫 3장 중 남은 카드를 이어서 선택해줘.`
      }
      battleInteractionLocked = false
      refreshBattleCardAvailability()
      return
    }

    player.phase1Done = true

    await showPopupAndWait(
      `${player.label}의 1차 수식 완성`,
      `${getBattlePhase1FormulaText(player)}`,
      { icon: '🧮' }
    )
    if (!isBattleFlowActive(token)) return

    await condenseBattlePlayerRow(player, token)
    if (!isBattleFlowActive(token)) return

    const pendingPhase1 = battleRoundPlayers.filter((item) => !item.phase1Done).length
    if (pendingPhase1 === 0) {
      battlePhase = 'phase2'
      if (battleStatusText) {
        battleStatusText.textContent = '모든 참가자의 1차 결과 카드가 공개되었다. 이제 4번째와 5번째 카드를 원하는 순서로 열 수 있다.'
      }
    } else if (battleStatusText) {
      battleStatusText.textContent = `아직 ${pendingPhase1}명의 1차 결과 카드가 남아 있다.`
    }

    updateAllBattlePlayerSubTexts()
    battleInteractionLocked = false
    refreshBattleCardAvailability()
    return
  }

  if (battlePhase === 'phase2') {
    const phase2Index = cardIndex === 3 ? 0 : cardIndex === 4 ? 1 : -1
    if (phase2Index === -1) {
      battleInteractionLocked = false
      refreshBattleCardAvailability()
      return
    }

    player.phase2Revealed[phase2Index] = true
    const remainingPhase2 = [3, 4].filter((index) => {
      const mappedIndex = index === 3 ? 0 : 1
      return !player.phase2Revealed[mappedIndex]
    })

    if (remainingPhase2.length > 0) {
      updateBattlePlayerSubText(player)
      if (battleStatusText) {
        battleStatusText.textContent = `${player.label}의 ${cardIndex + 1}번째 카드가 공개되었다. 남은 ${remainingPhase2[0] + 1}번째 카드도 원하는 때에 공개해줘.`
      }
      battleInteractionLocked = false
      refreshBattleCardAvailability()
      return
    }

    player.finalDone = true
    await finalizeBattleIfReady(token)
    if (!isBattleFlowActive(token) || battlePhase === 'done') return

    battleInteractionLocked = false
    refreshBattleCardAvailability()
  }
}

async function startBattleGame() {
  if (!battleConfigInput || battleGameRunning) return

  const parsed = parseBattleConfigToPlayers(battleConfigInput.value)
  if (parsed.status !== 'OK') {
    handleBattleParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  stopBattleFlow()
  battleFlowToken += 1
  const token = battleFlowToken
  battleCurrentToken = token

  setBattlePlayers(parsed.players)
  battleGameRunning = true
  battlePhase = 'dealing'
  battleInteractionLocked = true
  setBattleInputLock(true)
  setBattleShuffleLock(true)
  renderBattleLegend()
  renderBattleRanking([])

  battleRoundPlayers = buildBattleRoundPlayers()
  prepareBattleRoundRows(battleRoundPlayers)

  await playBattleShuffleAnimation(token)
  if (!isBattleFlowActive(token)) return

  await dealBattleCards(battleRoundPlayers, token)
  if (!isBattleFlowActive(token)) return

  battlePhase = 'phase1'
  battleInteractionLocked = false
  updateAllBattlePlayerSubTexts()
  refreshBattleCardAvailability()

  if (battleStatusText) {
    battleStatusText.textContent = '각 참가자의 첫 3장 카드는 원하는 순서로 공개할 수 있다. 세 장이 모두 열리면 1차 결과가 확정된다.'
  }
}

function shuffleBattle() {
  if (!battleConfigInput || battleGameRunning) return

  const parsed = parseBattleConfigToPlayers(battleConfigInput.value)
  if (parsed.status !== 'OK') {
    handleBattleParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  const shuffledPlayers = shuffleArray(parsed.players.map((player) => player.label))
  battleConfigInput.value = shuffledPlayers.join(', ')
  updateBattleFromInput()

  if (battleStatusText) {
    battleStatusText.textContent = '참가자 순서를 랜덤으로 섞었다.'
  }
}

function resetBattle() {
  stopBattleFlow()
  closePopup()

  if (!battleConfigInput) return

  const parsed = parseBattleConfigToPlayers(battleConfigInput.value)
  if (parsed.status === 'OK') {
    setBattlePlayers(parsed.players)
  } else {
    battleConfigInput.value = lastBattleValidConfigText || '홍길동, 김아무개, 박철수'
    const fallbackParsed = parseBattleConfigToPlayers(battleConfigInput.value)
    if (fallbackParsed.status === 'OK') {
      setBattlePlayers(fallbackParsed.players)
    }
  }

  renderBattlePreview()

  if (battleStatusText) {
    battleStatusText.textContent = '카드 게임이 초기화되었다. 다시 시작하면 참가자가 직접 카드를 뒤집을 수 있다.'
  }
}



function setSimInputLock(isLocked) {
  if (!simConfigInput) return
  simConfigInput.disabled = isLocked
  simConfigInput.style.opacity = isLocked ? '0.65' : '1'
  simConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
}

function setSimShuffleLock(isLocked) {
  if (!shuffleSimBtn) return
  shuffleSimBtn.disabled = isLocked
  shuffleSimBtn.style.opacity = isLocked ? '0.55' : '1'
  shuffleSimBtn.style.cursor = isLocked ? 'not-allowed' : ''
}

function setSimBattleStartState(isEnabled) {
  if (!startSimBattleBtn) return
  startSimBattleBtn.disabled = !isEnabled
}

function updateSimPhase(text) {
  if (simPhaseBadge) {
    simPhaseBadge.textContent = text
  }
}

function updateSimDescription() {
  if (!simDesc) return
  simDesc.textContent = `최대 ${SIM_MAX_PLAYERS}명의 참가자가 각자 4가지 스탯 총합 100의 카드를 배정받은 뒤, 공끼리 충돌하는 순간 즉시 전투 판정이 반영되는 관찰형 시뮬레이션 게임이다.`
}

function getSimGameInfoHtml() {
  return `
    <div class="game-info-content">
      <p class="game-info-lead">생존 볼 배틀은 참가자마다 총합 100의 스탯을 랜덤 배정한 뒤, 공끼리 충돌할 때마다 즉시 전투 판정이 일어나는 관찰형 생존 게임이다.</p>

      <section class="game-info-section">
        <h4>게임 진행 방식</h4>
        <ul>
          <li>참가자 이름을 쉼표로 입력하고 <strong>시작</strong>을 누르면 각 참가자에게 4장의 스탯 카드가 랜덤 배정된다.</li>
          <li>카드가 순차적으로 공개되면 <strong>전투시작</strong> 버튼이 활성화된다.</li>
          <li>전투가 시작되면 설정 화면은 정리되고, 경기장과 최종 스탯 요약표 중심의 관전 화면으로 바뀐다.</li>
          <li>마지막까지 살아남은 1명이 우승하며, 탈락 순서를 기준으로 최종 순위가 정해진다.</li>
        </ul>
      </section>

      <section class="game-info-section">
        <h4>스탯 설명</h4>
        <ul>
          <li><strong>추가 체력</strong>: 기본 체력 50에 더해지는 값이다. 최종 체력은 <strong>50 + 추가 체력</strong>으로 계산된다.</li>
          <li><strong>공격력</strong>: 충돌 시 상대에게 줄 수 있는 기본 피해량에 영향을 준다.</li>
          <li><strong>공격 성공률</strong>: 충돌 순간 공격 판정이 실제로 들어갈 확률이다. 수치가 높을수록 공격이 더 잘 맞는다.</li>
          <li><strong>방어력</strong>: 상대와의 전투에서 상대의 공격 성공률을 방어력 수치만큼 확률적으로 감소시키는 능력치이다.</li>
        </ul>
      </section>

      <section class="game-info-section">
        <h4>전투에서 보이는 것</h4>
        <ul>
          <li>각 공 위 라벨에서 이름과 현재 체력을 바로 볼 수 있다.</li>
          <li>아래 요약표에서는 전투 시작 시 확정된 최종 스탯을 한눈에 비교할 수 있다.</li>
          <li>맵에 따라 폭탄, 회전 막대, 범퍼 등 전투를 흔드는 요소가 등장할 수 있다.</li>
        </ul>
      </section>

      <section class="game-info-section">
        <h4>알아두면 좋은 점</h4>
        <ul>
          <li>셔플은 참가자 순서만 바꾸고, 실제 스탯은 시작할 때 다시 랜덤 배정된다.</li>
          <li>리셋하면 전투 상태와 카드 배정이 모두 초기화되어 새 판처럼 다시 시작할 수 있다.</li>
          <li>같은 이름은 중복 등록할 수 없고, 최대 ${SIM_MAX_PLAYERS}명까지 참가할 수 있다.</li>
        </ul>
      </section>
    </div>
  `
}

function openSimGameInfo() {
  showPopup('게임 설명', getSimGameInfoHtml(), {
    icon: '📖',
    allowHtml: true,
    popupClass: 'game-info-popup'
  })
}

function shouldUseSimResponsiveLayout() {
  return isMobileOrTabletLike()
}

function syncSimResponsiveLayout() {
  if (
    !simCardScreen ||
    !simControlsWrap ||
    !simButtonRow ||
    !startSimBattleBtn ||
    !resetSimBtn ||
    !simMobileBattleStartSlot ||
    !simMobileResetSlot
  ) {
    return
  }

  const shouldUseResponsiveLayout = shouldUseSimResponsiveLayout()

  document.body.classList.toggle('game4-mobile-layout', shouldUseResponsiveLayout)

  if (shouldUseResponsiveLayout) {
    if (startSimBattleBtn.parentElement !== simMobileBattleStartSlot) {
      simMobileBattleStartSlot.appendChild(startSimBattleBtn)
    }

    if (simCardScreen.classList.contains('sim-view-battle')) {
      if (resetSimBtn.parentElement !== simMobileResetSlot) {
        simMobileResetSlot.appendChild(resetSimBtn)
      }
    } else if (resetSimBtn.parentElement !== simButtonRow) {
      simButtonRow.appendChild(resetSimBtn)
    }

    return
  }

  if (startSimBattleBtn.parentElement !== simControlsWrap) {
    simControlsWrap.insertBefore(startSimBattleBtn, simStatusText || null)
  }

  if (resetSimBtn.parentElement !== simButtonRow) {
    simButtonRow.appendChild(resetSimBtn)
  }
}

function setSimViewMode(mode = 'setup') {
  if (!simCardScreen) return
  simCardScreen.classList.remove('sim-view-setup', 'sim-view-battle')
  simCardScreen.classList.add(mode === 'battle' ? 'sim-view-battle' : 'sim-view-setup')
  syncSimResponsiveLayout()
}

function renderSimBattleSummary(players = []) {
  if (!simBattleSummary) return

  if (!players.length) {
    simBattleSummary.innerHTML = '<div class="sim-empty-state">전투를 시작하면 여기에 참가자별 최종 스탯 요약표가 표시된다.</div>'
    return
  }

  const rows = players.map((player) => {
    const totalHpText = player.stats?.health !== undefined
      ? `${SIM_BASE_HP} + ${player.stats.health}`
      : (player.maxHp ?? '-')

    return `
    <tr>
      <td class="sim-summary-name">${escapeHtml(player.label)}</td>
      <td>${totalHpText}</td>
      <td>${player.stats?.attack ?? '-'}</td>
      <td>${player.stats?.accuracy ?? '-'}%</td>
      <td>${player.stats?.defense ?? '-'}%</td>
    </tr>
  `}).join('')

  simBattleSummary.innerHTML = `
    <table class="sim-summary-table">
      <thead>
        <tr>
          <th>참가자</th>
          <th>총 체력</th>
          <th>공격력</th>
          <th>공격 성공률</th>
          <th>방어력</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `
}

function parseSimConfigToPlayers(text) {
  const rawItems = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!rawItems.length) {
    return { status: 'EMPTY' }
  }

  if (rawItems.length > SIM_MAX_PLAYERS) {
    return { status: 'TOO_MANY', count: rawItems.length }
  }

  const seen = new Set()
  const players = []

  for (const raw of rawItems) {
    if (!raw || raw.includes('*')) {
      return { status: 'INVALID' }
    }

    const normalized = raw.replace(/\u0000/g, '').trim()
    if (!normalized) {
      return { status: 'INVALID' }
    }

    if (seen.has(normalized)) {
      return { status: 'DUPLICATE' }
    }

    seen.add(normalized)
    players.push({
      id: `sim-player-${players.length + 1}`,
      label: normalized,
      color: raceHorsePalette[players.length % raceHorsePalette.length]
    })
  }

  return { status: 'OK', players }
}

function handleSimParseFailure(parsed, { showPopupOnInvalid = false } = {}) {
  if (!simStatusText) return false

  if (parsed.status === 'EMPTY') {
    simStatusText.textContent = '참가자를 먼저 입력해줘. 예: 홍길동, 김아무개, 박철수'
    return false
  }

  if (parsed.status === 'TOO_MANY') {
    simStatusText.textContent = `참가자는 최대 ${SIM_MAX_PLAYERS}명까지 가능하다.`
    if (showPopupOnInvalid) {
      showPopup('참가자 수 초과', `생존 볼 배틀은 최대 ${SIM_MAX_PLAYERS}명까지만 참가할 수 있어.`)
    }
    return false
  }

  if (parsed.status === 'DUPLICATE') {
    simStatusText.textContent = '같은 이름은 2번 이상 입력할 수 없다.'
    if (showPopupOnInvalid) {
      showPopup('중복 이름 불가', '생존 볼 배틀은 같은 이름을 중복 등록할 수 없어.')
    }
    return false
  }

  simStatusText.textContent = '입력 형식을 확인해줘. 참가자 이름만 쉼표로 구분해 적어줘.'
  if (showPopupOnInvalid) {
    showPopup('입력 확인', '참가자 이름만 쉼표로 구분해 적어줘. 참가자*n 형식은 사용할 수 없어.')
  }
  return false
}

function setSimPlayers(players) {
  simPlayers = players
  if (simConfigInput) {
    lastSimValidConfigText = simConfigInput.value
    lastSimAppliedRawText = simConfigInput.value
  }
  updateSimDescription()
}

function renderSimLegend() {
  if (!simLegend || !simTotalInfo) return

  simLegend.innerHTML = ''
  simPlayers.forEach((player) => {
    const chip = document.createElement('div')
    chip.className = 'legend-chip'
    chip.innerHTML = `
      <span class="legend-dot" style="background:${player.color}"></span>
      <span>${escapeHtml(player.label)}</span>
    `
    simLegend.appendChild(chip)
  })

  simTotalInfo.textContent = `총 ${simPlayers.length}명`
}

function formatSimStatValue(statKey, value) {
  if (value === null || value === undefined) return '?'
  return `${statKey === 'health' ? '+' : ''}${value}${statKey === 'accuracy' || statKey === 'defense' ? '%' : ''}`
}

function getSimStatSummaryText(stats) {
  if (!stats) return ''
  return `추가 체력 +${stats.health} / 공격력 ${stats.attack} / 성공률 ${stats.accuracy}% / 방어 ${stats.defense}%`
}

function createSimStatCard(statKey, value = null, options = {}) {
  const card = document.createElement('div')
  const meta = SIM_STAT_META[statKey]
  const { flipped = false, dealt = false } = options
  card.className = `sim-stat-card type-${statKey}${flipped ? ' is-flipped' : ''}${dealt ? ' is-dealt' : ''}`
  card.dataset.statKey = statKey
  card.innerHTML = `
    <div class="sim-stat-card-inner">
      <div class="sim-stat-card-face sim-stat-card-back">
        <span>${meta.icon}</span>
      </div>
      <div class="sim-stat-card-face sim-stat-card-front">
        <small>${meta.label}</small>
        <strong>${formatSimStatValue(statKey, value)}</strong>
      </div>
    </div>
  `
  return card
}

function renderSimStatsBoard(players = simPlayers, { reveal = false, dealt = false } = {}) {
  if (!simStatsBoard) return

  simStatsBoard.innerHTML = ''

  if (!players.length) {
    simStatsBoard.innerHTML = '<div class="sim-empty-state">참가자를 입력하면 여기에 스탯 카드가 정렬된다.</div>'
    return
  }

  players.forEach((player) => {
    const row = document.createElement('div')
    row.className = 'sim-player-row'
    row.dataset.playerId = player.id

    const totalText = reveal && player.stats ? `${Object.values(player.stats).reduce((sum, value) => sum + value, 0)}` : '대기'
    row.innerHTML = `
      <div class="sim-player-main">
        <div class="sim-player-head">
          <span class="legend-dot" style="background:${player.color}"></span>
          <span class="sim-player-name">${escapeHtml(player.label)}</span>
          <span class="sim-player-total">합계 ${escapeHtml(totalText)}</span>
        </div>
        <div class="sim-player-sub">${reveal && player.stats ? '스탯 공개 완료' : '카드 배정 대기 중'}</div>
      </div>
      <div class="sim-card-grid"></div>
    `

    const grid = row.querySelector('.sim-card-grid')
    SIM_STAT_KEYS.forEach((statKey) => {
      const card = createSimStatCard(statKey, player.stats?.[statKey] ?? null, {
        flipped: reveal && Boolean(player.stats),
        dealt
      })
      grid.appendChild(card)
    })

    simStatsBoard.appendChild(row)
  })
}

function renderSimRanking(ranking = []) {
  return ranking
}

function updateSimFromInput({ render = true } = {}) {
  if (!simConfigInput) return false

  const parsed = parseSimConfigToPlayers(simConfigInput.value)
  if (parsed.status !== 'OK') {
    return handleSimParseFailure(parsed)
  }

  setSimPlayers(parsed.players)

  if (!simSetupDone) {
    simRoundPlayers = []
    setSimBattleStartState(false)
    updateSimPhase('대기')
  }

  if (render) {
    renderSimLegend()
    if (!simSetupDone) {
      renderSimStatsBoard(parsed.players)
      renderSimBattleSummary([])
      renderSimRanking([])
      setSimViewMode('setup')
      if (simStatusText) {
        simStatusText.textContent = `실시간 반영 완료: 총 ${parsed.players.length}명`
      }
    }
  }

  return true
}

function ensureSimReady() {
  if (!simConfigInput) return

  if (!simPlayers.length) {
    const parsed = parseSimConfigToPlayers(simConfigInput.value)
    if (parsed.status === 'OK') {
      setSimPlayers(parsed.players)
    } else {
      simConfigInput.value = '홍길동, 김아무개, 박철수, 최영희'
      const fallbackParsed = parseSimConfigToPlayers(simConfigInput.value)
      if (fallbackParsed.status === 'OK') {
        setSimPlayers(fallbackParsed.players)
      }
    }
  }

  renderSimLegend()

  if (simSetupDone && simRoundPlayers.length) {
    renderSimStatsBoard(simRoundPlayers, { reveal: true, dealt: true })
    renderSimBattleSummary(simBattleRunning || simBattleFinished ? simRoundPlayers : [])
    renderSimRanking(getSimRankingData())
    setSimBattleStartState(!simBattleRunning && !simBattleFinished)
    updateSimPhase(simBattleRunning ? '전투 중' : simBattleFinished ? '종료' : '준비 완료')
    setSimViewMode(simBattleRunning || simBattleFinished ? 'battle' : 'setup')
  } else {
    renderSimStatsBoard(simPlayers)
    renderSimBattleSummary([])
    renderSimRanking([])
    setSimBattleStartState(false)
    updateSimPhase('대기')
    setSimViewMode('setup')
    if (simStatusText && !simSetupRunning) {
      simStatusText.textContent = '참가 준비 완료. 시작 버튼을 누르면 스탯 카드가 섞이고 순차적으로 공개된다.'
    }
  }

  if (simArenaWrap && !simArenaRender) {
    simArenaWrap.classList.remove('is-running')
  }
}

function getSimStatDistributionMode() {
  const roll = Math.random()
  if (roll < 0.45) return 'extreme'
  if (roll < 0.8) return 'skewed'
  return 'balanced'
}

function isValidSimStatValues(values, usedValues = new Set()) {
  if (!Array.isArray(values) || values.length !== 4) return false
  const localUsed = new Set()

  for (const value of values) {
    if (!Number.isInteger(value) || value <= 0) return false
    if (usedValues.has(value) || localUsed.has(value)) return false
    localUsed.add(value)
  }

  return values.reduce((sum, value) => sum + value, 0) === 100
}

function assignSimStats(usedValues = new Set()) {
  const statKeys = shuffleArray([...SIM_STAT_KEYS])
  const pickInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  function createBalancedValues() {
    const values = []
    let remaining = 100

    for (let index = 0; index < 3; index += 1) {
      const slotsLeft = 4 - index
      const minRest = slotsLeft - 1
      const minValue = Math.max(10, remaining - 34 * (slotsLeft - 1))
      const maxValue = Math.min(36, remaining - minRest)
      if (minValue > maxValue) return null

      const pool = []
      for (let value = minValue; value <= maxValue; value += 1) {
        if (values.includes(value)) continue
        pool.push(value)
      }
      if (!pool.length) return null

      const target = remaining / slotsLeft
      const ordered = shuffleArray(pool).sort((a, b) => Math.abs(a - target) - Math.abs(b - target) + (Math.random() - 0.5) * 2)
      const picked = ordered[0]
      values.push(picked)
      remaining -= picked
    }

    values.push(remaining)
    return values
  }

  function createSkewedValues() {
    const dominant = pickInt(36, 62)
    const lowA = pickInt(3, 18)
    const lowB = pickInt(4, 24)
    const last = 100 - dominant - lowA - lowB
    return [dominant, lowA, lowB, last]
  }

  function createExtremeValues() {
    const patternRoll = Math.random()

    if (patternRoll < 0.6) {
      const dominant = pickInt(55, 88)
      const tiny = pickInt(1, 6)
      const low = pickInt(2, 18)
      const last = 100 - dominant - tiny - low
      return [dominant, tiny, low, last]
    }

    const dominantA = pickInt(45, 68)
    const dominantB = pickInt(20, 38)
    const tiny = pickInt(1, 7)
    const last = 100 - dominantA - dominantB - tiny
    return [dominantA, dominantB, tiny, last]
  }

  const modeFactories = {
    extreme: createExtremeValues,
    skewed: createSkewedValues,
    balanced: createBalancedValues
  }

  const primaryMode = getSimStatDistributionMode()
  const fallbackModes = primaryMode === 'balanced'
    ? ['skewed', 'extreme']
    : primaryMode === 'skewed'
      ? ['extreme', 'balanced']
      : ['skewed', 'balanced']
  const modeOrder = [primaryMode, ...fallbackModes]

  for (const mode of modeOrder) {
    for (let attempt = 0; attempt < 240; attempt += 1) {
      const values = modeFactories[mode]()
      if (!isValidSimStatValues(values, usedValues)) continue

      const randomizedValues = shuffleArray([...values])
      const stats = {}
      statKeys.forEach((statKey, index) => {
        stats[statKey] = randomizedValues[index]
      })
      return stats
    }
  }

  return null
}

function buildSimRoundPlayers() {
  const usedValues = new Set()
  const statPool = []

  for (let round = 0; round < 240; round += 1) {
    usedValues.clear()
    statPool.length = 0
    let success = true

    for (let i = 0; i < simPlayers.length; i += 1) {
      const stats = assignSimStats(usedValues)
      if (!stats) {
        success = false
        break
      }
      Object.values(stats).forEach((value) => usedValues.add(value))
      statPool.push(stats)
    }

    if (success) {
      return simPlayers.map((player, index) => {
        const stats = statPool[index]
        return {
          ...player,
          stats,
          maxHp: SIM_BASE_HP + stats.health,
          currentHp: SIM_BASE_HP + stats.health,
          isAlive: true,
          eliminationRank: null,
          rankLabel: '생존'
        }
      })
    }
  }

  return simPlayers.map((player, index) => {
    const fallbackSets = [
      [80, 2, 17, 1],
      [62, 21, 12, 5],
      [54, 7, 31, 8],
      [43, 37, 14, 6],
      [29, 24, 28, 19],
      [16, 41, 34, 9]
    ]
    const fallbackBase = fallbackSets[index] || [67 - index * 2, 6 + index, 13 + index, 14]
    const stats = {
      health: fallbackBase[0],
      attack: fallbackBase[1],
      accuracy: fallbackBase[2],
      defense: fallbackBase[3]
    }

    return {
      ...player,
      stats,
      maxHp: SIM_BASE_HP + stats.health,
      currentHp: SIM_BASE_HP + stats.health,
      isAlive: true,
      eliminationRank: null,
      rankLabel: '생존'
    }
  })
}

function getSimCardElement(playerId, statKey) {
  return simStatsBoard?.querySelector(`[data-player-id="${playerId}"] .sim-stat-card[data-stat-key="${statKey}"]`) || null
}

async function playSimDealAndReveal(token) {
  if (!simDeck) return

  simDeck.classList.add('is-shuffling')
  updateSimPhase('카드 셔플')
  if (simStatusText) {
    simStatusText.textContent = '참가자별 스탯 카드를 섞는 중...'
  }

  await sleep(1400)
  if (simBattleToken !== token) return

  simDeck.classList.remove('is-shuffling')
  renderSimStatsBoard(simRoundPlayers)

  const cards = [...simStatsBoard.querySelectorAll('.sim-stat-card')]
  for (const card of cards) {
    if (simBattleToken !== token) return
    card.classList.add('is-dealt')
    await sleep(28)
  }

  updateSimPhase('스탯 공개')
  if (simStatusText) {
    simStatusText.textContent = '각 참가자의 스탯 카드가 순차적으로 공개된다...'
  }

  for (const player of simRoundPlayers) {
    for (const statKey of SIM_STAT_KEYS) {
      if (simBattleToken !== token) return
      const card = getSimCardElement(player.id, statKey)
      if (!card) continue
      const frontValue = card.querySelector('.sim-stat-card-front strong')
      if (frontValue) {
        frontValue.textContent = formatSimStatValue(statKey, player.stats[statKey])
      }
      card.classList.add('is-flipped')
      await sleep(120)
    }

    const row = simStatsBoard.querySelector(`[data-player-id="${player.id}"]`)
    const total = row?.querySelector('.sim-player-total')
    const sub = row?.querySelector('.sim-player-sub')
    if (total) {
      total.textContent = '합계 100'
    }
    if (sub) {
      sub.textContent = getSimStatSummaryText(player.stats)
    }
    await sleep(140)
  }

  if (simBattleToken !== token) return

  renderSimBattleSummary([])
  renderSimRanking(getSimRankingData())
  setSimViewMode('setup')
  simSetupDone = true
  simSetupRunning = false
  setSimBattleStartState(true)
  updateSimPhase('준비 완료')
  if (simStatusText) {
    simStatusText.textContent = '모든 플레이어의 스탯 공개가 끝났다. 전투시작 버튼을 눌러 경기를 시작해줘.'
  }
}

async function startSimSetup() {
  if (!simConfigInput || simSetupRunning || simBattleRunning) return

  const parsed = parseSimConfigToPlayers(simConfigInput.value)
  if (parsed.status !== 'OK') {
    handleSimParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  stopSimBattle({ preserveSetup: false })
  simBattleToken += 1
  const token = simBattleToken
  simCurrentToken = token
  simSetupRunning = true
  simSetupDone = false
  simBattleFinished = false
  simEliminationOrder = []
  setSimViewMode('setup')
  setSimPlayers(parsed.players)
  simRoundPlayers = buildSimRoundPlayers()

  setSimInputLock(true)
  setSimShuffleLock(true)
  setSimBattleStartState(false)
  renderSimLegend()
  renderSimRanking([])

  await playSimDealAndReveal(token)
}

function shuffleSimParticipants() {
  if (!simConfigInput || simSetupRunning || simBattleRunning) return

  const parsed = parseSimConfigToPlayers(simConfigInput.value)
  if (parsed.status !== 'OK') {
    handleSimParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  const shuffledNames = shuffleArray(parsed.players.map((player) => player.label))
  simConfigInput.value = shuffledNames.join(', ')
  updateSimFromInput()
  if (simStatusText) {
    simStatusText.textContent = '참가자 순서를 랜덤으로 섞었다.'
  }
}

function resetSimCardsOnly() {
  simSetupDone = false
  simSetupRunning = false
  simBattleFinished = false
  simFinalResultsShown = false
  clearSimFinalResultsWatchdog()
  simRoundPlayers = []
  simEliminationOrder = []
  setSimBattleStartState(false)
  updateSimPhase('대기')
  renderSimStatsBoard(simPlayers)
  renderSimBattleSummary([])
  renderSimRanking([])
  setSimViewMode('setup')
}

function clearSimArena() {
  if (simArenaRender) {
    Matter.Render.stop(simArenaRender)
    if (simArenaRender.canvas && simArenaRender.canvas.parentNode) {
      simArenaRender.canvas.parentNode.removeChild(simArenaRender.canvas)
    }
    simArenaRender.textures = {}
  }

  if (simArenaRunner) {
    Matter.Runner.stop(simArenaRunner)
  }

  if (simArenaEngine) {
    Matter.Engine.clear(simArenaEngine)
  }

  if (simFinalResultsTimer) {
    clearTimeout(simFinalResultsTimer)
    simFinalResultsTimer = null
  }
  if (simFinalResultsRaf) {
    cancelAnimationFrame(simFinalResultsRaf)
    simFinalResultsRaf = null
  }
  if (simFinalResultsWatchdog) {
    clearInterval(simFinalResultsWatchdog)
    simFinalResultsWatchdog = null
  }

  simArenaRender = null
  simArenaRunner = null
  simArenaWorld = null
  simArenaEngine = null
  simArenaBodies = []
  simArenaBodyMap.clear()
  simArenaMeta = null
  simOverlayMap.forEach((element) => element.remove())
  simOverlayMap.clear()
  if (simHealthOverlay) {
    simHealthOverlay.innerHTML = ''
  }
  simArenaWrap?.querySelectorAll('.sim-shrink-zone').forEach((element) => element.remove())
  if (simArenaWrap) {
    simArenaWrap.classList.remove('is-running')
  }
}

function stopSimBattle({ preserveSetup = true } = {}) {
  simBattleToken += 1
  simCurrentToken = 0
  simBattleRunning = false
  simSetupRunning = false
  simFinalResultsShown = false
  clearSimArena()

  if (!preserveSetup) {
    resetSimCardsOnly()
    setSimInputLock(false)
    setSimShuffleLock(false)
    return
  }

  if (simRoundPlayers.length) {
    simRoundPlayers = simRoundPlayers.map((player) => ({
      ...player,
      currentHp: player.maxHp,
      isAlive: true,
      eliminationRank: null,
      rankLabel: '생존'
    }))
    simEliminationOrder = []
    simBattleFinished = false
    setSimBattleStartState(simSetupDone)
    renderSimBattleSummary([])
    renderSimRanking(getSimRankingData())
    updateSimPhase(simSetupDone ? '준비 완료' : '대기')
    setSimViewMode('setup')
    if (simStatusText && screens.game4?.classList.contains('active') && simSetupDone) {
      simStatusText.textContent = '전투가 정지되었다. 같은 스탯으로 다시 시작할 수 있다.'
    }
  } else {
    setSimBattleStartState(false)
    updateSimPhase('대기')
    setSimViewMode('setup')
  }
}

function resetSim() {
  closePopup({ force: true })
  stopSimBattle({ preserveSetup: false })

  if (!simConfigInput) return

  const parsed = parseSimConfigToPlayers(simConfigInput.value)
  if (parsed.status === 'OK') {
    setSimPlayers(parsed.players)
  } else {
    simConfigInput.value = lastSimValidConfigText || '홍길동, 김아무개, 박철수, 최영희'
    const fallbackParsed = parseSimConfigToPlayers(simConfigInput.value)
    if (fallbackParsed.status === 'OK') {
      setSimPlayers(fallbackParsed.players)
    }
  }

  renderSimLegend()
  renderSimStatsBoard(simPlayers)
  renderSimBattleSummary([])
  renderSimRanking([])
  setSimInputLock(false)
  setSimShuffleLock(false)
  setSimBattleStartState(false)
  if (simStatusText) {
    simStatusText.textContent = '생존 볼 배틀이 초기화되었다. 다시 시작하면 새 스탯이 배정된다.'
  }
}

function buildSimMapPickerHtml() {
  const optionsHtml = Object.entries(SIM_MAP_OPTIONS).map(([mapId, map]) => `
    <button class="sim-map-option" type="button" data-sim-map-id="${mapId}">
      <strong>${map.name}</strong>
      <span>${map.desc}</span>
      <div class="sim-map-preview"><i></i><i></i><i></i></div>
    </button>
  `).join('')

  return `<div class="sim-map-note">전투 시작 전에 이번 경기에서 사용할 전투장을 골라줘.</div><div class="sim-map-picker">${optionsHtml}</div>`
}

function selectSimArenaMap() {
  return new Promise((resolve) => {
    if (!popupOverlay || !popupMessage) {
      resolve('classic')
      return
    }

    popupOverlay.dataset.locked = 'true'
    if (closePopupBtn) {
      closePopupBtn.style.display = 'none'
    }

    let resolved = false
    const cleanup = () => {
      popupMessage.removeEventListener('click', handleClick)
      document.removeEventListener('app-popup-closed', handlePopupClosed)
      if (popupOverlay) {
        delete popupOverlay.dataset.locked
      }
      if (closePopupBtn) {
        closePopupBtn.style.display = ''
      }
    }

    const finish = (mapId) => {
      if (resolved) return
      resolved = true
      cleanup()
      resolve(mapId)
    }

    const handleClick = (event) => {
      const button = event.target.closest('[data-sim-map-id]')
      if (!button) return
      finish(button.dataset.simMapId || 'classic')
      closePopup({ force: true })
    }

    const handlePopupClosed = (event) => {
      if (!resolved && event.detail?.force) {
        finish('classic')
      }
    }

    popupMessage.addEventListener('click', handleClick)
    document.addEventListener('app-popup-closed', handlePopupClosed)
    showPopup('전투 경기장 선택', buildSimMapPickerHtml(), {
      icon: '🗺️',
      allowHtml: true
    })
  })
}

function createSimShrinkZone() {
  if (!simArenaWrap) return null
  const zone = document.createElement('div')
  zone.className = 'sim-shrink-zone'
  simArenaWrap.appendChild(zone)
  return zone
}

function createSimWalls(width, height, thickness = 60) {
  return {
    top: Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true, restitution: 1, render: { fillStyle: '#eed9c7' } }),
    bottom: Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true, restitution: 1, render: { fillStyle: '#eed9c7' } }),
    left: Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true, restitution: 1, render: { fillStyle: '#eed9c7' } }),
    right: Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true, restitution: 1, render: { fillStyle: '#eed9c7' } })
  }
}

function applySimBombAppearance(bomb, stage = 0) {
  if (!bomb) return
  const palette = [
    { fill: '#bdbdbd', stroke: '#f2f2f2', lineWidth: 3 },
    { fill: '#9a9a9a', stroke: '#e7e7e7', lineWidth: 3 },
    { fill: '#626262', stroke: '#d4d4d4', lineWidth: 3 },
    { fill: '#111111', stroke: '#8d8d8d', lineWidth: 3 }
  ]
  const style = palette[Math.max(0, Math.min(stage, palette.length - 1))]
  bomb.render.fillStyle = style.fill
  bomb.render.strokeStyle = style.stroke
  bomb.render.lineWidth = style.lineWidth
}

function flashSimBallBody(player, { stroke = 'rgba(255,255,255,0.88)', glowStroke = '#fff7a8', lineWidth = 5, duration = 260 } = {}) {
  const body = simArenaBodyMap.get(player?.id)
  if (!body || !body.render) return
  body.render.lineWidth = lineWidth
  body.render.strokeStyle = glowStroke
  setTimeout(() => {
    if (!body || !body.render) return
    body.render.lineWidth = 3
    body.render.strokeStyle = stroke
  }, duration)
}

function spawnSimFloatingBurst(player, {
  text = '-1',
  className = 'sim-hit-burst',
  duration = 760,
  xOffset = 0,
  yOffset = 0,
  startClass = 'is-active'
} = {}) {
  if (!simHealthOverlay || !simArenaWrap || !simArenaRender || !player) return
  const body = simArenaBodyMap.get(player.id)
  if (!body) return

  const displayWidth = simArenaWrap.clientWidth || simArenaRender.options.width
  const displayHeight = simArenaWrap.clientHeight || simArenaRender.options.height
  const scaleX = displayWidth / simArenaRender.options.width
  const scaleY = displayHeight / simArenaRender.options.height

  const burst = document.createElement('div')
  burst.className = className
  burst.textContent = text
  burst.style.left = `${body.position.x * scaleX + xOffset}px`
  burst.style.top = `${body.position.y * scaleY + yOffset}px`
  simHealthOverlay.appendChild(burst)

  requestAnimationFrame(() => burst.classList.add(startClass))
  setTimeout(() => burst.remove(), duration)
}

function spawnSimHitEffect(player, damage = 0) {
  if (!player || damage <= 0) return

  const label = simOverlayMap.get(player.id)
  if (label) {
    label.classList.remove('is-hit')
    void label.offsetWidth
    label.classList.add('is-hit')
    setTimeout(() => label.classList.remove('is-hit'), 300)
  }

  flashSimBallBody(player, {
    glowStroke: '#ff7f92',
    lineWidth: 5,
    duration: 260
  })

  spawnSimFloatingBurst(player, {
    text: `-${damage}`,
    className: 'sim-hit-burst',
    duration: 720,
    yOffset: -4
  })
}

function spawnSimBombExplosionEffect(bomb, { innerRadius = null, outerRadius = null, duration = 760 } = {}) {
  if (!simHealthOverlay || !simArenaWrap || !simArenaRender || !bomb) return

  const displayWidth = simArenaWrap.clientWidth || simArenaRender.options.width
  const displayHeight = simArenaWrap.clientHeight || simArenaRender.options.height
  const scaleX = displayWidth / simArenaRender.options.width
  const scaleY = displayHeight / simArenaRender.options.height
  const scale = Math.min(scaleX, scaleY)

  const centerX = bomb.position.x * scaleX
  const centerY = bomb.position.y * scaleY
  const resolvedInnerRadius = innerRadius ?? bomb.plugin?.innerBlastRadius ?? 54
  const resolvedOuterRadius = outerRadius ?? bomb.plugin?.blastRadius ?? 126

  const core = document.createElement('div')
  core.className = 'sim-bomb-blast-core'
  core.style.left = `${centerX}px`
  core.style.top = `${centerY}px`
  core.style.setProperty('--blast-core-size', `${Math.max(54, resolvedInnerRadius * scale * 1.9)}px`)
  simHealthOverlay.appendChild(core)

  const ring = document.createElement('div')
  ring.className = 'sim-bomb-blast-ring'
  ring.style.left = `${centerX}px`
  ring.style.top = `${centerY}px`
  ring.style.setProperty('--blast-ring-size', `${Math.max(120, resolvedOuterRadius * scale * 2.2)}px`)
  simHealthOverlay.appendChild(ring)

  requestAnimationFrame(() => {
    core.classList.add('is-active')
    ring.classList.add('is-active')
  })

  setTimeout(() => {
    core.remove()
    ring.remove()
  }, duration)
}

function createSimMapBodies(mapId, width, height) {
  const bodies = []
  const meta = { bombs: [], rotors: [] }

  if (mapId === 'classic') {
    bodies.push(
      Bodies.circle(width * 0.5, height * 0.32, 18, { isStatic: true, restitution: 1.08, render: { fillStyle: '#fff2ba', strokeStyle: '#fffef3', lineWidth: 3 } }),
      Bodies.circle(width * 0.28, height * 0.64, 16, { isStatic: true, restitution: 1.05, render: { fillStyle: '#dff4ec', strokeStyle: '#fffef3', lineWidth: 3 } }),
      Bodies.circle(width * 0.72, height * 0.66, 16, { isStatic: true, restitution: 1.05, render: { fillStyle: '#e4e0ff', strokeStyle: '#fffef3', lineWidth: 3 } })
    )
  }

  if (mapId === 'bomb') {
    const bombPositions = [
      [width * 0.22, height * 0.28],
      [width * 0.78, height * 0.3],
      [width * 0.5, height * 0.5],
      [width * 0.28, height * 0.76],
      [width * 0.74, height * 0.72]
    ]
    bombPositions.forEach(([x, y]) => {
      const bomb = Bodies.circle(x, y, 18, {
        isStatic: true,
        restitution: 1.12,
        render: {
          fillStyle: '#bdbdbd',
          strokeStyle: '#f2f2f2',
          lineWidth: 3
        }
      })
      bomb.plugin.simHazardType = 'bomb'
      bomb.plugin.hitCount = 0
      bomb.plugin.lastHitAt = 0
      bomb.plugin.explodeAt = 3
      bomb.plugin.exploded = false
      bomb.plugin.innerBlastRadius = 54
      bomb.plugin.blastRadius = 126
      bomb.plugin.blastDamage = 0
      bomb.plugin.blastForce = 0.068
      applySimBombAppearance(bomb, 0)
      bodies.push(bomb)
      meta.bombs.push(bomb)
    })
    bodies.push(
      Bodies.circle(width * 0.5, height * 0.22, 14, { isStatic: true, restitution: 1.03, render: { fillStyle: '#fff2ba', strokeStyle: '#fffef3', lineWidth: 3 } }),
      Bodies.circle(width * 0.5, height * 0.8, 14, { isStatic: true, restitution: 1.03, render: { fillStyle: '#fff2ba', strokeStyle: '#fffef3', lineWidth: 3 } })
    )
  }

  if (mapId === 'rotor') {
    const rotorA = Bodies.rectangle(width * 0.57, height * 0.58, 188, 14, {
      isStatic: true,
      restitution: 1.04,
      render: { fillStyle: '#d8dcff', strokeStyle: '#fffef3', lineWidth: 3 }
    })
    rotorA.plugin.simHazardType = 'rotor'
    rotorA.plugin.center = { x: width * 0.57, y: height * 0.58 }
    rotorA.plugin.spinSpeed = 0.0036
    rotorA.plugin.baseAngle = 0

    const rotorB = Bodies.rectangle(width * 0.32, height * 0.28, 154, 14, {
      isStatic: true,
      restitution: 1.03,
      render: { fillStyle: '#c4f1d7', strokeStyle: '#fffef3', lineWidth: 3 }
    })
    rotorB.plugin.simHazardType = 'rotor'
    rotorB.plugin.center = { x: width * 0.32, y: height * 0.28 }
    rotorB.plugin.spinSpeed = -0.0044
    rotorB.plugin.baseAngle = 0.4

    bodies.push(rotorA, rotorB,
      Bodies.circle(width * 0.57, height * 0.58, 15, { isStatic: true, restitution: 1.04, render: { fillStyle: '#fff4c1', strokeStyle: '#fffef3', lineWidth: 3 } }),
      Bodies.circle(width * 0.32, height * 0.28, 12, { isStatic: true, restitution: 1.04, render: { fillStyle: '#fff4c1', strokeStyle: '#fffef3', lineWidth: 3 } })
    )
    meta.rotors.push(rotorA, rotorB)
  }

  if (mapId === 'pinball') {
    const positions = [
      [0.2, 0.2, 14, '#ffdcb8'], [0.5, 0.2, 16, '#d8ebff'], [0.8, 0.22, 14, '#ffe9af'],
      [0.28, 0.44, 18, '#d7f4ea'], [0.72, 0.42, 18, '#e5ddff'], [0.18, 0.7, 14, '#ffd8e7'],
      [0.5, 0.66, 20, '#fff2ba'], [0.82, 0.72, 14, '#dff4ec']
    ]
    positions.forEach(([px, py, r, color]) => {
      bodies.push(Bodies.circle(width * px, height * py, r, {
        isStatic: true,
        restitution: 1.14,
        render: { fillStyle: color, strokeStyle: '#fffef3', lineWidth: 3 }
      }))
    })
  }

  return { bodies, meta }
}

function triggerSimBombExplosion(bomb) {
  if (!bomb || bomb.plugin.exploded || !simArenaWorld) return
  bomb.plugin.exploded = true
  applySimBombAppearance(bomb, 3)
  bomb.render.strokeStyle = '#ffffff'
  bomb.render.lineWidth = 4

  const innerRadius = bomb.plugin.innerBlastRadius || 54
  const outerRadius = bomb.plugin.blastRadius || 126
  const baseForce = bomb.plugin.blastForce || 0.068

  spawnSimBombExplosionEffect(bomb, {
    innerRadius,
    outerRadius,
    duration: 780
  })

  simRoundPlayers.forEach((player) => {
    if (!player.isAlive) return
    const body = simArenaBodyMap.get(player.id)
    if (!body || !body.plugin.isAlive) return
    const dx = body.position.x - bomb.position.x
    const dy = body.position.y - bomb.position.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance <= 0 || distance > outerRadius) return

    const safeDistance = Math.max(12, distance)
    let pushForce = 0

    if (distance <= innerRadius) {
      const innerRatio = 1 - distance / innerRadius
      pushForce = baseForce * (1.1 + innerRatio * 1.75)
    } else {
      const outerRatio = 1 - (distance - innerRadius) / Math.max(1, outerRadius - innerRadius)
      pushForce = baseForce * (0.38 + outerRatio * 0.92)
    }

    Body.applyForce(body, body.position, {
      x: (dx / safeDistance) * pushForce,
      y: (dy / safeDistance) * pushForce - pushForce * 0.16
    })

    flashSimBallBody(player, {
      glowStroke: '#ffd98f',
      lineWidth: 6,
      duration: 320
    })
  })

  setTimeout(() => {
    if (simArenaWorld && bomb) {
      World.remove(simArenaWorld, bomb)
    }
  }, 140)

  syncSimCombatStatus('폭탄이 터졌다! 근처 공들이 강하게 튕겨 나간다.')
  updateSimArenaOverlay()
  maybeFinishSimBattle()
}

function updateSimArenaHazards(now) {
  if (!simArenaMeta || !simBattleRunning) return

  simArenaMeta.rotors?.forEach((rotor) => {
    if (!rotor?.plugin?.center) return
    Body.setPosition(rotor, rotor.plugin.center)
    Body.setAngle(rotor, rotor.plugin.baseAngle + now * rotor.plugin.spinSpeed)
    Body.setVelocity(rotor, { x: 0, y: 0 })
    Body.setAngularVelocity(rotor, 0)
  })

  const shrink = simArenaMeta.shrink
  if (!shrink || !shrink.zoneEl) return

  const elapsed = now - shrink.startAt
  if (elapsed < 0) return

  const progress = Math.min(1, elapsed / shrink.duration)
  const zoneWidth = shrink.fullWidth - (shrink.fullWidth - shrink.minWidth) * progress
  const zoneHeight = shrink.fullHeight - (shrink.fullHeight - shrink.minHeight) * progress
  const left = (shrink.fullWidth - zoneWidth) / 2
  const top = (shrink.fullHeight - zoneHeight) / 2

  shrink.zoneEl.classList.add('is-active')
  shrink.zoneEl.classList.toggle('is-danger', progress > 0.12)
  shrink.zoneEl.style.left = `${left}px`
  shrink.zoneEl.style.top = `${top}px`
  shrink.zoneEl.style.width = `${zoneWidth}px`
  shrink.zoneEl.style.height = `${zoneHeight}px`
  shrink.rect = { left, top, right: left + zoneWidth, bottom: top + zoneHeight }

  simRoundPlayers.forEach((player) => {
    if (!player.isAlive) return
    const body = simArenaBodyMap.get(player.id)
    if (!body || !body.plugin.isAlive) return
    const r = body.circleRadius || 22
    const rect = shrink.rect
    const tolerance = 10
    const outside = body.position.x < rect.left + r - tolerance || body.position.x > rect.right - r + tolerance || body.position.y < rect.top + r - tolerance || body.position.y > rect.bottom - r + tolerance
    if (!outside) return

    const targetX = Math.min(Math.max(body.position.x, rect.left + r + 6), rect.right - r - 6)
    const targetY = Math.min(Math.max(body.position.y, rect.top + r + 6), rect.bottom - r - 6)
    const dx = targetX - body.position.x
    const dy = targetY - body.position.y

    Body.applyForce(body, body.position, {
      x: dx * 0.00034,
      y: dy * 0.00034
    })

    if (Math.abs(dx) > 16 || Math.abs(dy) > 16) {
      Body.setVelocity(body, {
        x: body.velocity.x * 0.94 + dx * 0.014,
        y: body.velocity.y * 0.94 + dy * 0.014
      })
    }
  })
}

function createSimOverlayLabel(player) {
  if (!simHealthOverlay) return null
  const label = document.createElement('div')
  label.className = 'sim-ball-label'
  label.dataset.playerId = player.id
  label.innerHTML = `
    <div class="sim-ball-top">
      <div class="sim-ball-name">${escapeHtml(player.label)}</div>
      <div class="sim-ball-place"></div>
    </div>
    <div class="sim-ball-hpbar"><span></span></div>
    <div class="sim-ball-hptext">${player.currentHp}/${player.maxHp}</div>
  `
  simHealthOverlay.appendChild(label)
  simOverlayMap.set(player.id, label)
  return label
}

function createSimBody(player, worldWidth, worldHeight) {
  const radius = 22
  const body = Bodies.circle(
    rand(70, worldWidth - 70),
    rand(70, worldHeight - 70),
    radius,
    {
      restitution: 0.98,
      friction: 0,
      frictionStatic: 0,
      frictionAir: 0,
      inertia: Infinity,
      render: {
        fillStyle: player.color,
        strokeStyle: '#fffaf8',
        lineWidth: 3
      }
    }
  )

  body.plugin.simPlayerId = player.id
  body.plugin.targetSpeed = 2.42
  body.plugin.nextTurnAt = 0
  body.plugin.lastCollisionAt = 0
  body.plugin.isAlive = true

  const startAngle = rand(0, Math.PI * 2)
  Body.setVelocity(body, {
    x: Math.cos(startAngle) * body.plugin.targetSpeed,
    y: Math.sin(startAngle) * body.plugin.targetSpeed
  })

  return body
}

function initSimArena() {
  if (!simArenaWrap) return false

  clearSimArena()
  const width = simArenaWrap.clientWidth || 900
  const height = simArenaWrap.clientHeight || 460

  simArenaEngine = Engine.create()
  simArenaWorld = simArenaEngine.world
  simArenaEngine.gravity.y = 0

  simArenaRender = Matter.Render.create({
    element: simArenaWrap,
    engine: simArenaEngine,
    options: {
      width,
      height,
      wireframes: false,
      background: 'transparent',
      pixelRatio: window.devicePixelRatio || 1
    }
  })

  simArenaRender.canvas.style.position = 'absolute'
  simArenaRender.canvas.style.inset = '0'
  simArenaRender.canvas.style.width = '100%'
  simArenaRender.canvas.style.height = '100%'

  Matter.Render.run(simArenaRender)
  simArenaRunner = Matter.Runner.create()
  Matter.Runner.run(simArenaRunner, simArenaEngine)

  const walls = createSimWalls(width, height)
  const wallBodies = [walls.top, walls.bottom, walls.left, walls.right]
  const mapResult = createSimMapBodies(simSelectedMap, width, height)
  const shrinkZoneEl = createSimShrinkZone()

  simArenaMeta = {
    width,
    height,
    mapId: simSelectedMap,
    walls,
    ...mapResult.meta,
    shrink: {
      zoneEl: shrinkZoneEl,
      startAt: 12000,
      duration: 22000,
      fullWidth: width,
      fullHeight: height,
      minWidth: width * 0.36,
      minHeight: height * 0.36,
      rect: { left: 0, top: 0, right: width, bottom: height }
    }
  }

  Matter.World.add(simArenaWorld, [...wallBodies, ...mapResult.bodies])
  simArenaWrap.classList.add('is-running')

  simRoundPlayers.forEach((player) => {
    const body = createSimBody(player, width, height)
    simArenaBodies.push(body)
    simArenaBodyMap.set(player.id, body)
    createSimOverlayLabel(player)
  })

  Matter.World.add(simArenaWorld, simArenaBodies)
  Matter.Events.on(simArenaEngine, 'beforeUpdate', updateSimMovement)
  Matter.Events.on(simArenaEngine, 'afterUpdate', updateSimArenaOverlay)
  Matter.Events.on(simArenaEngine, 'collisionStart', handleSimCollisions)

  return true
}

function updateSimMovement() {
  if (!simArenaEngine || !simBattleRunning) return

  const now = simArenaEngine.timing.timestamp
  updateSimArenaHazards(now)
  if (!simBattleRunning) return

  simRoundPlayers.forEach((player) => {
    if (!simBattleRunning || !player.isAlive) return
    const body = simArenaBodyMap.get(player.id)
    if (!body || !body.plugin.isAlive) return

    const speed = Math.max(0.0001, body.speed)
    const targetSpeed = body.plugin.targetSpeed

    if (now >= body.plugin.nextTurnAt) {
      const currentAngle = speed > 0.001 ? Math.atan2(body.velocity.y, body.velocity.x) : rand(0, Math.PI * 2)
      const nextAngle = currentAngle + rand(-0.55, 0.55)
      Body.setVelocity(body, {
        x: Math.cos(nextAngle) * targetSpeed,
        y: Math.sin(nextAngle) * targetSpeed
      })
      body.plugin.nextTurnAt = now + rand(420, 980)
      return
    }

    const adjustRatio = targetSpeed / speed
    if (adjustRatio > 1.12 || adjustRatio < 0.88) {
      Body.setVelocity(body, {
        x: body.velocity.x * adjustRatio,
        y: body.velocity.y * adjustRatio
      })
    }
  })

  if (!simBattleFinished) {
    maybeFinishSimBattle()
  } else if (!simFinalResultsShown) {
    queueSimFinalResultsPopup()
  }
}

function updateSimArenaOverlay() {
  if (!simArenaRender || !simArenaWrap) return

  const displayWidth = simArenaWrap.clientWidth || simArenaRender.options.width
  const displayHeight = simArenaWrap.clientHeight || simArenaRender.options.height
  const scaleX = displayWidth / simArenaRender.options.width
  const scaleY = displayHeight / simArenaRender.options.height

  simRoundPlayers.forEach((player) => {
    const body = simArenaBodyMap.get(player.id)
    const label = simOverlayMap.get(player.id)
    if (!body || !label) return

    const hpRatio = player.maxHp ? Math.max(0, player.currentHp) / player.maxHp : 0
    const bar = label.querySelector('.sim-ball-hpbar span')
    const text = label.querySelector('.sim-ball-hptext')
    const place = label.querySelector('.sim-ball-place')
    if (bar) {
      bar.style.width = `${(hpRatio * 100).toFixed(1)}%`
    }
    if (text) {
      text.textContent = player.isAlive ? `${Math.max(0, player.currentHp)}/${player.maxHp}` : '탈락'
    }
    if (place) {
      place.textContent = player.finalPlace ? `${player.finalPlace}위` : ''
    }

    label.classList.toggle('is-dead', !player.isAlive)
    label.classList.toggle('is-winner', player.finalPlace === 1)

    const x = body.position.x * scaleX
    const y = body.position.y * scaleY
    const offsetY = player.isAlive ? -36 : 16
    const scale = player.isAlive ? 0.96 : 0.8
    label.style.left = `${x}px`
    label.style.top = `${y + offsetY}px`
    label.style.transform = `translate(-50%, -50%) scale(${scale})`
  })
}

function getSimPlayerById(playerId) {
  return simRoundPlayers.find((player) => player.id === playerId) || null
}

function getSimRankingData() {
  const alive = simRoundPlayers
    .filter((player) => player.isAlive)
    .sort((a, b) => {
      if (b.currentHp !== a.currentHp) return b.currentHp - a.currentHp
      return a.label.localeCompare(b.label, 'ko')
    })
    .map((player) => ({ ...player, rankLabel: '생존' }))

  const dead = [...simEliminationOrder]
    .reverse()
    .map((player, index) => ({
      ...player,
      rankLabel: simBattleFinished && index === dead.length - 1 ? '우승' : `${player.eliminationRank}번째 탈락`
    }))

  if (simBattleFinished && alive.length === 1) {
    const winner = alive[0]
    winner.rankLabel = '우승'
  }

  return [...alive, ...dead]
}

function syncSimCombatStatus(message) {
  const now = performance.now()
  if (now - simLastCombatMessageAt < 120) return
  simLastCombatMessageAt = now
  if (simStatusText) {
    simStatusText.textContent = message
  }
}

function markSimPlayerDead(player, { silent = false } = {}) {
  if (!player || !player.isAlive) return
  player.isAlive = false
  player.currentHp = 0
  simEliminationOrder.push(player)
  player.finalPlace = simRoundPlayers.length - simEliminationOrder.length + 1
  player.eliminationRank = simEliminationOrder.length
  player.rankLabel = `${player.finalPlace}위`

  const body = simArenaBodyMap.get(player.id)
  if (body) {
    body.plugin.isAlive = false
    Body.setVelocity(body, { x: 0, y: 0 })
    Body.setAngularVelocity(body, 0)
    Body.setStatic(body, true)
    body.isSensor = true
    body.collisionFilter.mask = 0
    body.collisionFilter.category = 0
    body.render.opacity = 0.28
    body.render.strokeStyle = 'rgba(255,255,255,0.22)'
    body.render.lineWidth = 2
  }

  const label = simOverlayMap.get(player.id)
  if (label) {
    label.classList.add('is-dead')
    const place = label.querySelector('.sim-ball-place')
    if (place) {
      place.textContent = `${player.finalPlace}위`
    }
  }

  if (!silent) {
    syncSimCombatStatus(`${player.label} 탈락! ${player.finalPlace}위 확정.`)
  }

  maybeFinishSimBattle()
}

function resolveSimPairCombat(playerA, playerB) {
  if (!playerA || !playerB || !playerA.isAlive || !playerB.isAlive) return

  const hpBeforeA = playerA.currentHp
  const hpBeforeB = playerB.currentHp
  const actualAccA = Math.max(0, playerA.stats.accuracy * (1 - playerB.stats.defense / 100))
  const actualAccB = Math.max(0, playerB.stats.accuracy * (1 - playerA.stats.defense / 100))

  const hitA = Math.random() * 100 < actualAccA
  const hitB = Math.random() * 100 < actualAccB

  const damageA = hitA ? playerA.stats.attack : 0
  const damageB = hitB ? playerB.stats.attack : 0

  if (damageA > 0) {
    playerB.currentHp -= damageA
    spawnSimHitEffect(playerB, damageA)
  }
  if (damageB > 0) {
    playerA.currentHp -= damageB
    spawnSimHitEffect(playerA, damageB)
  }

  const bothDead = playerA.currentHp <= 0 && playerB.currentHp <= 0
  if (bothDead) {
    let survivor = playerA
    let loser = playerB

    if (hpBeforeB > hpBeforeA) {
      survivor = playerB
      loser = playerA
    } else if (hpBeforeA === hpBeforeB) {
      if ((playerB.stats.attack + playerB.stats.accuracy + playerB.stats.defense) > (playerA.stats.attack + playerA.stats.accuracy + playerA.stats.defense)) {
        survivor = playerB
        loser = playerA
      } else if ((playerA.stats.attack + playerA.stats.accuracy + playerA.stats.defense) === (playerB.stats.attack + playerB.stats.accuracy + playerB.stats.defense) && Math.random() < 0.5) {
        survivor = playerB
        loser = playerA
      }
    }

    survivor.currentHp = 1
    loser.currentHp = 0
    markSimPlayerDead(loser, { silent: true })
    syncSimCombatStatus(`${playerA.label} vs ${playerB.label} 동시 격돌! ${survivor.label}이 1 체력으로 간신히 생존.`)
  } else {
    if (playerA.currentHp <= 0) {
      markSimPlayerDead(playerA, { silent: true })
    }
    if (playerB.currentHp <= 0) {
      markSimPlayerDead(playerB, { silent: true })
    }

    const resultA = hitA ? `${playerA.label} 적중` : `${playerA.label} 빗나감`
    const resultB = hitB ? `${playerB.label} 적중` : `${playerB.label} 빗나감`
    syncSimCombatStatus(`${playerA.label} vs ${playerB.label} 충돌 · ${resultA} / ${resultB}`)
  }

  renderSimRanking(getSimRankingData())
  updateSimArenaOverlay()
  maybeFinishSimBattle()
}

function handleSimCollisions(event) {
  if (!simBattleRunning) return

  const now = simArenaEngine?.timing?.timestamp || performance.now()
  event.pairs.forEach((pair) => {
    const bodyA = pair.bodyA
    const bodyB = pair.bodyB
    const playerIdA = bodyA.plugin?.simPlayerId
    const playerIdB = bodyB.plugin?.simPlayerId
    const hazardA = bodyA.plugin?.simHazardType
    const hazardB = bodyB.plugin?.simHazardType

    if (playerIdA && playerIdB && playerIdA !== playerIdB) {
      if (!bodyA.plugin?.isAlive || !bodyB.plugin?.isAlive) return

      const cooldownKeyA = bodyA.plugin.lastCollisionAt || 0
      const cooldownKeyB = bodyB.plugin.lastCollisionAt || 0
      if (now - cooldownKeyA < 220 || now - cooldownKeyB < 220) return

      bodyA.plugin.lastCollisionAt = now
      bodyB.plugin.lastCollisionAt = now

      const playerA = getSimPlayerById(playerIdA)
      const playerB = getSimPlayerById(playerIdB)
      resolveSimPairCombat(playerA, playerB)
      return
    }

    const bombBody = hazardA === 'bomb' ? bodyA : hazardB === 'bomb' ? bodyB : null
    const playerBody = playerIdA && hazardB === 'bomb' ? bodyA : playerIdB && hazardA === 'bomb' ? bodyB : null
    if (bombBody && playerBody && !bombBody.plugin.exploded) {
      if (!bombBody.plugin.lastHitAt || now - bombBody.plugin.lastHitAt > 240) {
        bombBody.plugin.lastHitAt = now
        bombBody.plugin.hitCount += 1
        applySimBombAppearance(bombBody, bombBody.plugin.hitCount)
        const remaining = Math.max(0, bombBody.plugin.explodeAt - bombBody.plugin.hitCount)
        syncSimCombatStatus(remaining > 0 ? `폭탄이 흔들린다... ${remaining}번만 더 부딪히면 폭발!` : '폭탄이 검게 물들며 곧 폭발한다!')
        if (bombBody.plugin.hitCount >= bombBody.plugin.explodeAt && !bombBody.plugin.pendingExplosion) {
          bombBody.plugin.pendingExplosion = true
          setTimeout(() => triggerSimBombExplosion(bombBody), 120)
        }
      }
    }
  })
}

function freezeSimBodiesOnFinish() {
  const rect = simArenaMeta?.shrink?.rect || {
    left: 0,
    top: 0,
    right: simArenaMeta?.width || 0,
    bottom: simArenaMeta?.height || 0
  }

  simRoundPlayers.forEach((player) => {
    const body = simArenaBodyMap.get(player.id)
    if (!body) return

    const radius = body.circleRadius || 22
    const clampedX = Math.min(Math.max(body.position.x, rect.left + radius + 4), rect.right - radius - 4)
    const clampedY = Math.min(Math.max(body.position.y, rect.top + radius + 4), rect.bottom - radius - 4)

    Body.setPosition(body, { x: clampedX, y: clampedY })
    Body.setVelocity(body, { x: 0, y: 0 })
    Body.setAngularVelocity(body, 0)
    body.plugin.lastCollisionAt = Infinity
    body.plugin.nextTurnAt = Infinity

    if (player.isAlive) {
      body.plugin.isAlive = false
      Body.setStatic(body, true)
      body.collisionFilter.mask = 0
      body.collisionFilter.category = 0
    }
  })

  if (simArenaMeta?.shrink?.zoneEl) {
    simArenaMeta.shrink.zoneEl.classList.add('is-frozen')
  }
}

function getSimFinalRanking() {
  return [...simRoundPlayers].sort((a, b) => {
    const placeA = Number.isFinite(a.finalPlace) ? a.finalPlace : 999
    const placeB = Number.isFinite(b.finalPlace) ? b.finalPlace : 999
    if (placeA !== placeB) return placeA - placeB
    if (b.currentHp !== a.currentHp) return b.currentHp - a.currentHp
    return a.label.localeCompare(b.label, 'ko')
  })
}

function clearSimFinalResultsWatchdog() {
  if (simFinalResultsWatchdog) {
    clearInterval(simFinalResultsWatchdog)
    simFinalResultsWatchdog = null
  }
}

function buildSimFinalResultsHtml(ranking = []) {
  if (!ranking.length) {
    return '<span>결과가 없습니다.</span>'
  }

  return `
    <div style="display:flex;flex-direction:column;gap:10px;align-items:center;">
      ${ranking.map((player, index) => {
        return `<div style="font-size:1.05rem;font-weight:800;color:#8b6f60;line-height:1.35;">${index + 1}위. ${escapeHtml(player.label)}</div>`
      }).join('')}
    </div>
  `
}

function ensureSimFinalResultsPopup() {
  if (!simBattleFinished) return false

  const ranking = getSimFinalRanking()
  const winner = ranking.find((player) => player.finalPlace === 1) || null
  const html = buildSimFinalResultsHtml(ranking)

  unlockPopupOverlay()
  closePopup({ force: true })

  if (simStatusText) {
    simStatusText.textContent = winner
      ? `${winner.label} 최후의 1인 생존! (${SIM_MAP_OPTIONS[simSelectedMap]?.name || '전투장'})`
      : '전투가 종료되었다.'
  }

  showPopup('최종 결과', html, {
    icon: '🏆',
    allowHtml: true
  })

  return isPopupVisible()
}

function queueSimFinalResultsPopup() {
  if (!simBattleFinished) return

  const tryShow = () => {
    if (!simBattleFinished) return
    showSimFinalResults({ force: true })
  }

  if (simFinalResultsRaf) {
    cancelAnimationFrame(simFinalResultsRaf)
  }
  simFinalResultsRaf = requestAnimationFrame(() => {
    simFinalResultsRaf = null
    tryShow()
  })

  if (simFinalResultsTimer) {
    clearTimeout(simFinalResultsTimer)
  }
  simFinalResultsTimer = setTimeout(() => {
    simFinalResultsTimer = null
    tryShow()
  }, 80)

  clearSimFinalResultsWatchdog()
  let attempts = 0
  simFinalResultsWatchdog = setInterval(() => {
    attempts += 1
    if (!simBattleFinished) {
      clearSimFinalResultsWatchdog()
      return
    }

    const visible = showSimFinalResults({ force: true })
    if (visible || attempts >= 40) {
      clearSimFinalResultsWatchdog()
    }
  }, 100)
}

function maybeFinishSimBattle() {
  if (simBattleFinished) return false

  const survivors = simRoundPlayers.filter((player) => player.isAlive)
  if (survivors.length > 1) return false

  simBattleRunning = false
  simBattleFinished = true

  if (survivors.length === 1) {
    survivors[0].rankLabel = '우승'
    survivors[0].finalPlace = 1
    const winnerLabel = simOverlayMap.get(survivors[0].id)
    if (winnerLabel) {
      const place = winnerLabel.querySelector('.sim-ball-place')
      if (place) place.textContent = '1위'
      winnerLabel.classList.add('is-winner')
    }
  }

  queueSimFinalResultsPopup()

  try {
    freezeSimBodiesOnFinish()
  } catch (error) {
    console.error('[game4] freezeSimBodiesOnFinish failed:', error)
  }

  try {
    setSimInputLock(false)
    setSimShuffleLock(false)
    setSimBattleStartState(false)
    updateSimPhase('종료')
    renderSimRanking(getSimRankingData())
    updateSimArenaOverlay()
    setSimViewMode('battle')
  } catch (error) {
    console.error('[game4] finish UI sync failed:', error)
  }

  showSimFinalResults({ force: true })
  return true
}

function showSimFinalResults(options = {}) {
  const { force = false } = options
  if (!simBattleFinished) return false

  const alreadyVisible = isPopupVisible() && popupTitle?.textContent === '최종 결과'
  if (simFinalResultsShown && alreadyVisible && !force) {
    return true
  }

  simFinalResultsShown = true

  if (simFinalResultsTimer) {
    clearTimeout(simFinalResultsTimer)
    simFinalResultsTimer = null
  }
  if (simFinalResultsRaf) {
    cancelAnimationFrame(simFinalResultsRaf)
    simFinalResultsRaf = null
  }

  const visible = ensureSimFinalResultsPopup()
  if (visible) {
    clearSimFinalResultsWatchdog()
  }
  return visible
}

async function startSimBattle() {
  if (!simSetupDone || simBattleRunning || !simRoundPlayers.length) return

  simRoundPlayers = simRoundPlayers.map((player) => ({
    ...player,
    currentHp: player.maxHp,
    isAlive: true,
    eliminationRank: null,
    finalPlace: null,
    rankLabel: '생존'
  }))
  simEliminationOrder = []
  simBattleFinished = false
  simFinalResultsShown = false
  clearSimFinalResultsWatchdog()

  if (simFinalResultsTimer) {
    clearTimeout(simFinalResultsTimer)
    simFinalResultsTimer = null
  }
  if (simFinalResultsRaf) {
    cancelAnimationFrame(simFinalResultsRaf)
    simFinalResultsRaf = null
  }

  renderSimBattleSummary(simRoundPlayers)
  setSimViewMode('battle')
  setSimBattleStartState(false)
  updateSimPhase('맵 선택')

  if (simStatusText) {
    simStatusText.textContent = '전투 경기장을 선택해줘. 선택이 끝나면 즉시 경기가 시작된다.'
  }

  const mapId = await selectSimArenaMap()
  if (!mapId || !simSetupDone || simBattleRunning) return

  simSelectedMap = SIM_MAP_OPTIONS[mapId] ? mapId : 'classic'

  if (!initSimArena()) {
    setSimViewMode('setup')
    renderSimBattleSummary([])
    setSimBattleStartState(true)
    updateSimPhase('준비 완료')
    return
  }

  simBattleRunning = true
  setSimInputLock(true)
  setSimShuffleLock(true)
  updateSimPhase('전투 중')
  renderSimRanking(getSimRankingData())
  updateSimArenaOverlay()

  if (simStatusText) {
    simStatusText.textContent = `${SIM_MAP_OPTIONS[simSelectedMap]?.name || '전투장'} 전투 시작! 공이 부딪히는 순간 즉시 판정되고, 일정 시간이 지나면 안전 구역이 줄어든다.`
  }
}


function startRace() {
  if (!raceConfigInput) return

  const parsed = parseRaceConfigToHorses(raceConfigInput.value)

  if (!handleRaceParseFailure(parsed, { showPopupOnTooMany: true, showPopupOnInvalid: true })) {
    return
  }

  stopRaceLoop()

  const parsedOrderKey = parsed.horses.map((horse) => horse.label).join('||')
  const currentOrderKey = raceHorses.map((horse) => horse.label).join('||')

  if (raceHorses.length && parsedOrderKey === currentOrderKey) {
    syncRaceInputToCurrentOrder()
  } else {
    setRaceHorses(parsed.horses)
    syncRaceInputToCurrentOrder()
  }

  renderRacePreview()
  resetRaceHorseStates()

  raceRunning = true
  raceFinished = false
  raceLastTimestamp = 0
  setRaceInputLock(true)
  setRaceShuffleLock(true)

  addRaceCommentary('게이트 오픈, 경주가 시작되었습니다! 셔플한 레인 순서와 지정 색상 그대로 출발합니다.')

  raceEventTimer = setInterval(triggerRaceEvent, 760)
  raceCommentaryTimer = setInterval(pushAutoCommentary, 1180)
  raceAnimationFrame = requestAnimationFrame(raceFrame)
}

if (startBtn) {
  startBtn.addEventListener('click', () => showScreen('menu'))
}

if (physicalBtn) {
  physicalBtn.addEventListener('click', () => showPopup('개발중', '피지컬 메뉴는 아직 개발중이야!'))
}

if (luckBtn) {
  luckBtn.addEventListener('click', () => showScreen('luck'))
}

if (closePopupBtn) {
  closePopupBtn.addEventListener('click', closePopup)
}

if (popupOverlay) {
  popupOverlay.addEventListener('click', (event) => {
    if (event.target === popupOverlay) {
      closePopup()
    }
  })
}

backButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showScreen(button.dataset.target)
  })
})

gameLaunchButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.game === '1') {
      showScreen('game1')
    }

    if (button.dataset.game === '2') {
      showScreen('game2')
    }

    if (button.dataset.game === '3') {
      showScreen('game3')
    }

    if (button.dataset.game === '4') {
      showScreen('game4')
    }
  })
})

comingSoonButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showPopup('개발중', '이 게임은 아직 준비중이야!')
  })
})

if (shuffleBtn) {
  shuffleBtn.addEventListener('click', shuffleRound)
}

if (startGameBtn) {
  startGameBtn.addEventListener('click', startRound)
}

if (resetGameBtn) {
  resetGameBtn.addEventListener('click', resetRound)
}

if (shuffleRaceBtn) {
  shuffleRaceBtn.addEventListener('click', shuffleRace)
}

if (startRaceBtn) {
  startRaceBtn.addEventListener('click', startRace)
}

if (resetRaceBtn) {
  resetRaceBtn.addEventListener('click', resetRace)
}

if (shuffleBattleBtn) {
  shuffleBattleBtn.addEventListener('click', shuffleBattle)
}

if (startBattleBtn) {
  startBattleBtn.addEventListener('click', startBattleGame)
}

if (resetBattleBtn) {
  resetBattleBtn.addEventListener('click', resetBattle)
}

if (drawerToggleBtn) {
  drawerToggleBtn.addEventListener('click', () => {
    const willOpen = !gameSidebar.classList.contains('open')
    setDrawerState(willOpen)
  })
}

if (drawerBackdrop) {
  drawerBackdrop.addEventListener('click', () => {
    setDrawerState(false)
  })
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setDrawerState(false)
    closePopup()
  }
})

if (configInput) {
  configInput.addEventListener('input', () => {
    updateSlotsFromInput()
  })

  configInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startRound()
    }
  })
}

if (raceConfigInput) {
  raceConfigInput.addEventListener('input', () => {
    updateRaceFromInput()
  })

  raceConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startRace()
    }
  })
}


if (battleConfigInput) {
  battleConfigInput.addEventListener('input', () => {
    updateBattleFromInput()
  })

  battleConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startBattleGame()
    }
  })
}


if (simConfigInput) {
  simConfigInput.addEventListener('input', () => {
    if (!simSetupDone && !simSetupRunning && !simBattleRunning) {
      updateSimFromInput()
    }
  })

  simConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startSimSetup()
    }
  })
}

if (shuffleSimBtn) {
  shuffleSimBtn.addEventListener('click', shuffleSimParticipants)
}

if (startSimSetupBtn) {
  startSimSetupBtn.addEventListener('click', startSimSetup)
}

if (resetSimBtn) {
  resetSimBtn.addEventListener('click', resetSim)
}

if (startSimBattleBtn) {
  startSimBattleBtn.addEventListener('click', startSimBattle)
}

if (simInfoBtn) {
  simInfoBtn.addEventListener('click', openSimGameInfo)
}

if (battleTable) {
  battleTable.addEventListener('click', (event) => {
    const targetCard = event.target.closest('.battle-card')
    const row = event.target.closest('.battle-row')
    if (!targetCard || !row) return

    const player = getBattleRoundPlayer(row.dataset.playerId)
    const cardIndex = Number(targetCard.dataset.cardIndex)

    if (!player || !Number.isFinite(cardIndex)) return

    handleBattleCardReveal(player, cardIndex)
  })

  battleTable.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return

    const targetCard = event.target.closest('.battle-card')
    const row = event.target.closest('.battle-row')
    if (!targetCard || !row) return

    const player = getBattleRoundPlayer(row.dataset.playerId)
    const cardIndex = Number(targetCard.dataset.cardIndex)

    if (!player || !Number.isFinite(cardIndex)) return

    event.preventDefault()
    handleBattleCardReveal(player, cardIndex)
  })
}

window.addEventListener('resize', () => {
  const nextWidth = window.innerWidth
  const nextHeight = window.innerHeight

  if (shouldIgnoreMobileChromeResize(nextWidth, nextHeight)) {
    lastViewportWidth = nextWidth
    lastViewportHeight = nextHeight
    return
  }

  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    const widthChanged = Math.abs(nextWidth - lastViewportWidth) > 4
    const heightChanged = Math.abs(nextHeight - lastViewportHeight) > 4

    if (!widthChanged && !heightChanged) return

    lastViewportWidth = nextWidth
    lastViewportHeight = nextHeight

    syncGame1MobileLayout()
    syncRaceMobileLayout()
    syncSimResponsiveLayout()
    updateOrientationGate()

    if (screens.game1?.classList.contains('active')) {
      fitGameCanvasViewport()

      if (engine && currentSlots.length) {
        buildBoard()
      }
    }

    if (screens.game2?.classList.contains('active') && raceHorses.length) {
      renderRacePreview()
    }

    if (screens.game4?.classList.contains('active') && simBattleRunning) {
      updateSimArenaOverlay()
    }
  }, 120)
})

window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    syncGame1MobileLayout()
    syncRaceMobileLayout()
    syncSimResponsiveLayout()
    updateOrientationGate()

    if (screens.game1?.classList.contains('active')) {
      fitGameCanvasViewport()

      if (engine && currentSlots.length) {
        buildBoard()
      }
    }

    if (screens.game2?.classList.contains('active') && raceHorses.length) {
      renderRacePreview()
    }

    if (screens.game4?.classList.contains('active') && simBattleRunning) {
      updateSimArenaOverlay()
    }
  }, 150)
})

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (screens.game2?.classList.contains('active')) {
      stopRaceLoop()
    }
  }
})

updateGame1BallCountText()
syncGame1MobileLayout()
syncRaceMobileLayout()
updateOrientationGate()

setGame1InputLock(false)
setGame1ShuffleLock(false)

setRaceInputLock(false)
setRaceShuffleLock(false)
setSimInputLock(false)
setSimShuffleLock(false)

if (configInput) {
  updateSlotsFromInput({ build: false })
}

if (raceConfigInput) {
  updateRaceFromInput({ render: false })
}

if (simConfigInput) {
  updateSimFromInput({ render: false })
}

if (screens.home) {
  showScreen('home')
}

syncSimResponsiveLayout()
