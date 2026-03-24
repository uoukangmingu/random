const screens = {
  home: document.getElementById('homeScreen'),
  menu: document.getElementById('menuScreen'),
  luck: document.getElementById('luckScreen'),
  game1: document.getElementById('game1Screen'),
  game2: document.getElementById('game2Screen'),
  game3: document.getElementById('game3Screen')
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

function getColorForName(name) {
  if (!nameColorMap.has(name)) {
    const colorIndex = nameColorMap.size % slotPalette.length
    nameColorMap.set(name, slotPalette[colorIndex])
  }
  return nameColorMap.get(name)
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

const RACE_MAX_COUNT = 20
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

let battlePlayers = []
let battleGameRunning = false
let battleFlowToken = 0
let battleCurrentToken = 0
let battlePhase = 'idle'
let battleRoundPlayers = []
let battleInteractionLocked = false
let lastBattleValidConfigText = battleConfigInput ? battleConfigInput.value : ''
let lastBattleAppliedRawText = battleConfigInput ? battleConfigInput.value : ''
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
  const { icon = '🛠️', allowHtml = false } = options

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

function closePopup() {
  if (popupOverlay) {
    popupOverlay.classList.add('hidden')
  }

  if (popupWaitResolver) {
    const resolver = popupWaitResolver
    popupWaitResolver = null
    resolver()
  }
}

function showPopupAndWait(title, message, options = {}) {
  showPopup(title, message, options)
  return new Promise((resolve) => {
    popupWaitResolver = resolve
  })
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

function isMobileOrTabletLike() {
  return window.innerWidth <= 1024 && isTouchDevice()
}

function isPortraitMode() {
  return window.matchMedia('(orientation: portrait)').matches
}

function updateOrientationGate() {
  const shouldBlock =
    screens.game1?.classList.contains('active') &&
    isMobileOrTabletLike() &&
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

function showScreen(target) {
  if (!screens[target]) return

  closePopup()
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
    setRaceInputLock(false)
    setRaceShuffleLock(false)
  }

  if (target !== 'game3') {
    stopBattleFlow()
    setBattleInputLock(false)
    setBattleShuffleLock(false)
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
      color: raceHorsePalette[index % raceHorsePalette.length],
      progress: 0,
      finished: false,
      finishOrder: 0,
      currentStatus: '다그닥',
      baseSpeed: 30 + Math.random() * 8,
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

  const ranking = [...raceHorses].sort((a, b) => {
    if (a.finished && b.finished) return a.finishOrder - b.finishOrder
    if (a.finished) return -1
    if (b.finished) return 1
    return b.progress - a.progress
  })

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
  renderRacePreview()

  addRaceCommentary('출전 순서가 랜덤으로 재배치되었습니다.')
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
  return [...raceHorses].sort((a, b) => {
    if (a.finished && b.finished) return a.finishOrder - b.finishOrder
    if (a.finished) return -1
    if (b.finished) return 1
    return b.progress - a.progress
  })[0]
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

  const candidates = raceHorses.filter((horse) => !horse.finished)
  if (!candidates.length) return

  const horse = getRandomItem(candidates)
  const now = performance.now()
  const roll = Math.random()

  if (roll < 0.18) {
    horse.bonusSpeed = 18 + Math.random() * 8
    horse.slowPenalty = 0
    horse.eventUntil = now + 1800
    horse.currentStatus = '가속 중'
    addRaceCommentary(`${horse.label}, 갑자기 치고 나갑니다!`)
    return
  }

  if (roll < 0.36) {
    horse.slowPenalty = 14 + Math.random() * 7
    horse.bonusSpeed = 0
    horse.eventUntil = now + 1700
    horse.currentStatus = '주춤'
    addRaceCommentary(`${horse.label}, 속도가 잠깐 떨어집니다!`)
    return
  }

  if (roll < 0.48) {
    horse.fallUntil = now + 1400
    horse.eventUntil = now + 1900
    horse.bonusSpeed = 0
    horse.slowPenalty = 28
    horse.currentStatus = '넘어짐'
    addRaceCommentary(`${horse.label}말이 방금 넘어졌습니다!`)
    return
  }

  if (roll < 0.62) {
    horse.bonusSpeed = 24
    horse.slowPenalty = 0
    horse.eventUntil = now + 1600
    horse.currentStatus = '막판 스퍼트'
    addRaceCommentary(`${horse.label}, 막판 스퍼트가 나옵니다!`)
    return
  }

  const top2 = [...raceHorses]
    .filter((item) => !item.finished)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 2)

  if (top2.length === 2) {
    addRaceCommentary(`${top2[0].label}와 ${top2[1].label}, 선두권 접전입니다!`)
  } else {
    addRaceCommentary(`${horse.label}, 안정적으로 페이스를 유지하고 있습니다.`)
  }
}

function pushAutoCommentary() {
  if (!raceRunning || raceFinished) return

  const ranking = [...raceHorses].sort((a, b) => {
    if (a.finished && b.finished) return a.finishOrder - b.finishOrder
    if (a.finished) return -1
    if (b.finished) return 1
    return b.progress - a.progress
  })

  if (!ranking.length) return

  const leader = ranking[0]
  const chaser = ranking[1]

  if (leader && chaser && !leader.finished && !chaser.finished) {
    addRaceCommentary(`${leader.label}가 선두, ${chaser.label}가 바짝 추격합니다!`)
  } else if (leader && !leader.finished) {
    addRaceCommentary(`${leader.label}, 여전히 레이스를 이끌고 있습니다!`)
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

  raceHorses.forEach((horse) => {
    if (horse.finished) return

    if (horse.eventUntil && timestamp > horse.eventUntil) {
      horse.bonusSpeed = 0
      horse.slowPenalty = 0
      horse.eventUntil = 0
      if (!horse.finished) {
        horse.currentStatus = '정상 질주'
      }
    }

    let speed = horse.baseSpeed + Math.sin(timestamp * 0.0016 + horse.baseSpeed) * 3.2

    if (horse.progress > RACE_DISTANCE * 0.78) {
      speed += Math.random() * 4.5
    }

    if (horse.fallUntil && timestamp < horse.fallUntil) {
      speed = 2 + Math.random() * 1.5
    }

    speed += horse.bonusSpeed
    speed -= horse.slowPenalty
    speed = Math.max(3, speed)

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
        <div class="battle-player-sub">카드를 기다리는 중</div>
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

function setBattleCardAvailability(cardEl, isEnabled) {
  if (!cardEl) return
  cardEl.classList.toggle('is-clickable', isEnabled)
  cardEl.classList.toggle('is-locked', !isEnabled)
  cardEl.setAttribute('tabindex', isEnabled ? '0' : '-1')
  cardEl.setAttribute('aria-disabled', isEnabled ? 'false' : 'true')
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
      if (!Number.isFinite(cardIndex)) {
        setBattleCardAvailability(cardEl, false)
        return
      }

      setBattleCardAvailability(cardEl, canFlipBattleCard(player, cardIndex) && !cardEl.classList.contains('is-flipped'))
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

function applyBattleFinalRow(player) {
  const row = getBattleRowElement(player.id)
  if (!row) return

  const resultPill = row.querySelector('.battle-result-pill')
  if (!resultPill) return

  resultPill.innerHTML = `<strong>최종</strong><span>${escapeHtml(formatBattleValue(player.final))}점</span>`
  resultPill.classList.remove('hidden')
  resultPill.setAttribute('aria-hidden', 'false')
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
  roundPlayers.forEach((player) => {
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


function startRace() {
  if (!raceConfigInput) return

  const parsed = parseRaceConfigToHorses(raceConfigInput.value)

  if (!handleRaceParseFailure(parsed, { showPopupOnTooMany: true, showPopupOnInvalid: true })) {
    return
  }

  stopRaceLoop()
  setRaceHorses(parsed.horses)
  renderRacePreview()
  resetRaceHorseStates()

  raceRunning = true
  raceFinished = false
  raceLastTimestamp = 0
  setRaceInputLock(true)
  setRaceShuffleLock(true)

  addRaceCommentary('게이트 오픈, 경주가 시작되었습니다!')

  raceEventTimer = setInterval(triggerRaceEvent, 900)
  raceCommentaryTimer = setInterval(pushAutoCommentary, 1400)
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
  }, 120)
})

window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    syncGame1MobileLayout()
    syncRaceMobileLayout()
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

if (configInput) {
  updateSlotsFromInput({ build: false })
}

if (raceConfigInput) {
  updateRaceFromInput({ render: false })
}

if (screens.home) {
  showScreen('home')
}