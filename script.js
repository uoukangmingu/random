
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

const mathLadderInput = document.getElementById('mathLadderInput')
const shuffleMathLadderBtn = document.getElementById('shuffleMathLadderBtn')
const startMathLadderBtn = document.getElementById('startMathLadderBtn')
const resetMathLadderBtn = document.getElementById('resetMathLadderBtn')
const mathLadderStatusText = document.getElementById('mathLadderStatusText')
const mathLadderTotalInfo = document.getElementById('mathLadderTotalInfo')
const mathLadderLegend = document.getElementById('mathLadderLegend')
const mathLadderBoard = document.getElementById('mathLadderBoard')
const mathLadderResultList = document.getElementById('mathLadderResultList')

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

const MATH_LADDER_MAX_COUNT = 8
const MATH_LADDER_MIN_COUNT = 2
const MATH_LADDER_TOKEN_ORDER = ['number1', 'op1', 'number2', 'op2', 'number3']
const MATH_OPERATORS = ['+', '-', '*', '/']

let mathLadderPlayers = []
let mathLadderRunning = false
let mathLadderFinished = false
let lastMathLadderValidText = mathLadderInput ? mathLadderInput.value : ''
let lastMathLadderAppliedRawText = mathLadderInput ? mathLadderInput.value : ''
let currentMathLadderData = null

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

function setMathLadderInputLock(isLocked) {
  if (!mathLadderInput) return
  mathLadderInput.disabled = isLocked
  mathLadderInput.style.opacity = isLocked ? '0.65' : '1'
  mathLadderInput.style.cursor = isLocked ? 'not-allowed' : ''
}

function setMathLadderShuffleLock(isLocked) {
  if (!shuffleMathLadderBtn) return
  shuffleMathLadderBtn.disabled = isLocked
  shuffleMathLadderBtn.style.opacity = isLocked ? '0.55' : '1'
  shuffleMathLadderBtn.style.cursor = isLocked ? 'not-allowed' : ''
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
    setMathLadderInputLock(false)
    setMathLadderShuffleLock(false)
  }

  if (target === 'game1') {
    ensureGameReady()
  }

  if (target === 'game2') {
    syncRaceMobileLayout()
    ensureRaceReady()
  }

  if (target === 'game3') {
    ensureMathLadderReady()
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
      showPopup('중복 이름 불가', '경마 게임은 같은 이름의 말을 여러 마리 만들 수 없어. 이름당 1마리만 가능해.')
    }
    return false
  }

  if (parsed.status === 'INVALID' || parsed.status === 'EMPTY') {
    if (raceStatusText) {
      raceStatusText.textContent = '입력 형식을 확인해줘. 예: 홍길동, 김아무개, 박철수'
    }
    if (showPopupOnInvalid) {
      showPopup('입력 확인', '경마 게임은 이름만 쉼표로 구분해 적어줘. 예: 홍길동, 김아무개, 박철수')
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

if (shuffleMathLadderBtn) {
  shuffleMathLadderBtn.addEventListener('click', shuffleMathLadder)
}

if (startMathLadderBtn) {
  startMathLadderBtn.addEventListener('click', startMathLadder)
}

if (resetMathLadderBtn) {
  resetMathLadderBtn.addEventListener('click', resetMathLadder)
}

if (mathLadderInput) {
  mathLadderInput.addEventListener('input', () => {
    ensureMathLadderReady()
  })

  mathLadderInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startMathLadder()
    }
  })
}

function parseMathLadderPlayers(text) {
  const rawItems = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!rawItems.length) {
    return { status: 'EMPTY' }
  }

  if (rawItems.length < MATH_LADDER_MIN_COUNT) {
    return { status: 'TOO_FEW' }
  }

  if (rawItems.length > MATH_LADDER_MAX_COUNT) {
    return { status: 'TOO_MANY' }
  }

  const uniqueNames = new Set()
  const players = []

  for (const name of rawItems) {
    if (name.length > 8) {
      return { status: 'NAME_TOO_LONG' }
    }

    if (uniqueNames.has(name)) {
      return { status: 'DUPLICATE' }
    }

    uniqueNames.add(name)

    players.push({
      id: `player-${players.length + 1}`,
      name
    })
  }

  return { status: 'OK', players }
}

function applyMathOperator(a, op, b) {
  if (op === '+') return a + b
  if (op === '-') return a - b
  if (op === '*') return a * b
  if (op === '/') return b === 0 ? 0 : a / b
  return 0
}

function calculateMathExpression(a, op1, b, op2, c) {
  const highPriority = ['*', '/']

  if (highPriority.includes(op1) && highPriority.includes(op2)) {
    const first = applyMathOperator(a, op1, b)
    return applyMathOperator(first, op2, c)
  }

  if (highPriority.includes(op1) && !highPriority.includes(op2)) {
    const first = applyMathOperator(a, op1, b)
    return applyMathOperator(first, op2, c)
  }

  if (!highPriority.includes(op1) && highPriority.includes(op2)) {
    const second = applyMathOperator(b, op2, c)
    return applyMathOperator(a, op1, second)
  }

  const first = applyMathOperator(a, op1, b)
  return applyMathOperator(first, op2, c)
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomMathOperator() {
  return MATH_OPERATORS[Math.floor(Math.random() * MATH_OPERATORS.length)]
}


/* script.js */
/* 1) 아래 블록 전체 교체 */
/* 교체 범위:
   function createMathFormulaData() { ... }
   ~
   function ensureMathLadderReady() { ... }
*/

function setMathLadderPlayers(players) {
  mathLadderPlayers = players.map((player, index) => ({
    ...player,
    color: raceHorsePalette[index % raceHorsePalette.length],
    formula: null
  }))

  if (mathLadderInput) {
    lastMathLadderValidText = mathLadderInput.value
    lastMathLadderAppliedRawText = mathLadderInput.value
  }
}

function renderMathLadderLegend() {
  if (!mathLadderLegend || !mathLadderTotalInfo) return

  mathLadderLegend.innerHTML = ''

  mathLadderPlayers.forEach((player) => {
    const chip = document.createElement('div')
    chip.className = 'legend-chip'
    chip.innerHTML = `
      <span class="legend-dot" style="background:${player.color};"></span>
      <span>${escapeHtml(player.name)}</span>
    `
    mathLadderLegend.appendChild(chip)
  })

  mathLadderTotalInfo.textContent = `총 ${mathLadderPlayers.length}명`
}

function renderMathLadderResults() {
  if (!mathLadderResultList) return

  mathLadderResultList.innerHTML = ''

  const ranking = [...mathLadderPlayers]
    .filter((player) => player.formula)
    .sort((a, b) => b.formula.result - a.formula.result)

  ranking.forEach((player, index) => {
    const item = document.createElement('div')
    item.className = `race-ranking-item${index === 0 ? ' top' : ''}`

    const displayResult = Number(player.formula.result.toFixed(2))

    item.innerHTML = `
      <strong>${index + 1}위. ${escapeHtml(player.name)}</strong><br />
      <span>${escapeHtml(player.formula.display)}</span>
      <div class="math-ladder-formula">결과: ${displayResult}</div>
    `

    mathLadderResultList.appendChild(item)
  })
}

function handleMathLadderParseFailure(parsed) {
  if (!mathLadderStatusText) return false

  if (parsed.status === 'EMPTY') {
    mathLadderStatusText.textContent = '참가자 이름을 입력해줘.'
    return false
  }

  if (parsed.status === 'TOO_FEW') {
    mathLadderStatusText.textContent = '최소 2명부터 시작할 수 있다.'
    return false
  }

  if (parsed.status === 'TOO_MANY') {
    mathLadderStatusText.textContent = `최대 ${MATH_LADDER_MAX_COUNT}명까지 가능하다.`
    return false
  }

  if (parsed.status === 'DUPLICATE') {
    mathLadderStatusText.textContent = '같은 이름은 2번 이상 입력할 수 없다.'
    return false
  }

  if (parsed.status === 'NAME_TOO_LONG') {
    mathLadderStatusText.textContent = '이름은 최대 8자까지만 입력해줘.'
    return false
  }

  return parsed.status === 'OK'
}

function getMathLadderOperatorDisplay(op) {
  if (op === '*') return '×'
  if (op === '/') return '÷'
  return op
}

function buildMathLadderData(players, { randomize = false } = {}) {
const width = Math.max(mathLadderBoard?.clientWidth || 820, 560)
const viewportHeight = Math.max(mathLadderBoard?.clientHeight || 640, 640)
const mapHeight = Math.max(1800, Math.round(viewportHeight * 2.8))

const sidePadding = Math.max(40, Math.min(72, width * 0.06))
const topY = 120
const bottomY = mapHeight - 120
const usableHeight = bottomY - topY

const columns = players.map((player, index) => {
  const x =
    players.length === 1
      ? width / 2
      : sidePadding + ((width - sidePadding * 2) / (players.length - 1)) * index

  return {
    index,
    x,
    playerId: player.id,
    name: player.name
  }
})

const rungRows = Array.from({ length: 18 }, (_, index) => ({
  index,
  y: topY + (usableHeight / 19) * (index + 1)
}))

const tokenRows = MATH_LADDER_TOKEN_ORDER.map((type, index) => ({
  index,
  type,
  y: topY + (usableHeight / 6) * (index + 1)
}))

  const rungs = randomize ? buildMathLadderRungs(columns.length, rungRows.map((row) => row.y)) : []
  const tokens = buildMathLadderTokens(tokenRows, columns.length, { randomize })

const data = {
  width,
  height: mapHeight,
  mapHeight,
  viewportHeight,
  topY,
  bottomY,
  columns,
  rungRows,
  tokenRows,
  rungs,
  tokens,
  players: players.map((player, index) => ({
    ...player,
    startIndex: index
  })),
  runnerMap: new Map(),
  tokenElementMap: new Map(),
  rungElementMap: new Map(),
  resultChipMap: new Map(),
  mapLayer: null,
  cameraY: 0
}

  data.traces = data.players.map((player) => traceMathLadderPath(player.startIndex, data))

  data.players.forEach((player, index) => {
    player.formula = randomize ? data.traces[index].formula : null
  })

  return data
}

function buildMathLadderRungs(columnCount, rowYs) {
  const rungs = []

  rowYs.forEach((rowY, rowIndex) => {
    const picked = []
    const targetCount = Math.max(
      1,
      Math.min(
        Math.floor(columnCount / 2),
        getRandomInt(1, Math.max(1, Math.floor(columnCount / 2)))
      )
    )

    let safety = 0
    while (picked.length < targetCount && safety < 200) {
      const from = getRandomInt(0, columnCount - 2)
      const blocked = picked.some((value) => Math.abs(value - from) <= 1)

      if (!blocked) {
        picked.push(from)
      }

      safety += 1
    }

    picked
      .sort((a, b) => a - b)
      .forEach((from) => {
        rungs.push({
          id: `math-rung-${rowIndex}-${from}`,
          rowY,
          from,
          to: from + 1
        })
      })
  })

  return rungs
}

function buildMathLadderTokens(tokenRows, columnCount, { randomize = false } = {}) {
  return tokenRows.map((row) => {
    return Array.from({ length: columnCount }, (_, columnIndex) => {
      let rawValue = '?'
      let displayValue = '?'

      if (randomize) {
        if (row.type === 'op1' || row.type === 'op2') {
          rawValue = getRandomMathOperator()
          displayValue = getMathLadderOperatorDisplay(rawValue)
        } else if (row.type === 'number1') {
          rawValue = getRandomInt(0, 100)
          displayValue = String(rawValue)
        } else {
          rawValue = getRandomInt(1, 100)
          displayValue = String(rawValue)
        }
      }

      return {
        id: `math-token-${row.index}-${columnIndex}`,
        rowIndex: row.index,
        colIndex: columnIndex,
        type: row.type,
        rawValue,
        displayValue
      }
    })
  })
}

function traceMathLadderPath(startIndex, data) {
  const rungMap = new Map()

  data.rungs.forEach((rung) => {
    if (!rungMap.has(rung.rowY)) rungMap.set(rung.rowY, [])
    rungMap.get(rung.rowY).push(rung)
  })

  const events = [
    ...data.rungRows.map((row) => ({ kind: 'rung', y: row.y })),
    ...data.tokenRows.map((row) => ({ kind: 'token', y: row.y, rowIndex: row.index }))
  ].sort((a, b) => a.y - b.y)

  let currentCol = startIndex
  const points = [{ x: data.columns[currentCol].x, y: data.topY }]
  const tokensHit = []

  events.forEach((event) => {
    points.push({ x: data.columns[currentCol].x, y: event.y })

    if (event.kind === 'rung') {
      const rowRungs = rungMap.get(event.y) || []
      const moveRight = rowRungs.find((rung) => rung.from === currentCol)
      const moveLeft = rowRungs.find((rung) => rung.to === currentCol)
      const activeRung = moveRight || moveLeft

      if (activeRung) {
        currentCol = moveRight ? activeRung.to : activeRung.from
        points.push({
          x: data.columns[currentCol].x,
          y: event.y,
          rungId: activeRung.id
        })
      }
    }

    if (event.kind === 'token') {
      const token = data.tokens[event.rowIndex][currentCol]
      tokensHit.push(token)
      points[points.length - 1].tokenId = token.id
    }
  })

  points.push({ x: data.columns[currentCol].x, y: data.bottomY })

  return {
    startIndex,
    endIndex: currentCol,
    points,
    tokensHit,
    formula: buildFormulaFromTrace(tokensHit)
  }
}

function buildFormulaFromTrace(tokensHit) {
  if (!tokensHit || tokensHit.length !== 5) return null

  const number1 = Number(tokensHit[0].rawValue)
  const op1 = tokensHit[1].rawValue
  const number2 = Number(tokensHit[2].rawValue)
  const op2 = tokensHit[3].rawValue
  const number3 = Number(tokensHit[4].rawValue)

  const result = calculateMathExpression(number1, op1, number2, op2, number3)

  return {
    number1,
    op1,
    number2,
    op2,
    number3,
    result,
    display: `${number1} ${getMathLadderOperatorDisplay(op1)} ${number2} ${getMathLadderOperatorDisplay(op2)} ${number3}`
  }
}

function setMathLadderCamera(data, targetY, animate = true) {
  if (!data?.mapLayer) return

  const maxScroll = Math.max(0, data.mapHeight - data.viewportHeight)
  const desiredScroll = clampValue(
    targetY - data.viewportHeight * 0.38,
    0,
    maxScroll
  )

  data.cameraY = desiredScroll
  data.mapLayer.style.transition = animate ? 'transform 260ms ease' : 'none'
  data.mapLayer.style.transform = `translateY(${-desiredScroll}px)`
}

function renderMathLadderBoard(data, { preview = false, showResults = false } = {}) {
  if (!mathLadderBoard) return

  mathLadderBoard.innerHTML = ''
  mathLadderBoard.style.height = `${data.viewportHeight}px`

  data.runnerMap = new Map()
  data.tokenElementMap = new Map()
  data.rungElementMap = new Map()
  data.resultChipMap = new Map()

  const topRow = document.createElement('div')
  topRow.className = 'math-ladder-top-row'
  topRow.style.gridTemplateColumns = `repeat(${data.players.length}, minmax(0, 1fr))`

  data.players.forEach((player) => {
    const chip = document.createElement('div')
    chip.className = 'math-ladder-name-chip'
    chip.textContent = player.name
    topRow.appendChild(chip)
  })

  const bottomRow = document.createElement('div')
  bottomRow.className = 'math-ladder-bottom-row'
  bottomRow.style.gridTemplateColumns = `repeat(${data.players.length}, minmax(0, 1fr))`

  data.players.forEach((player) => {
    const chip = document.createElement('div')
    chip.className = 'math-ladder-result-chip'
    chip.dataset.playerId = player.id
    chip.innerHTML = showResults && player.formula
      ? `<strong>${escapeHtml(player.name)}</strong><br><span>${Number(player.formula.result.toFixed(2))}</span>`
      : `<strong>${escapeHtml(player.name)}</strong>`
    bottomRow.appendChild(chip)
    data.resultChipMap.set(player.id, chip)
  })

  const mapLayer = document.createElement('div')
  mapLayer.className = 'math-ladder-map'
  mapLayer.style.height = `${data.mapHeight}px`
  data.mapLayer = mapLayer

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', `0 0 ${data.width} ${data.mapHeight}`)
  svg.setAttribute('preserveAspectRatio', 'none')
  svg.classList.add('math-ladder-svg')

  data.columns.forEach((column) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttribute('x1', column.x)
    line.setAttribute('y1', data.topY)
    line.setAttribute('x2', column.x)
    line.setAttribute('y2', data.bottomY)
    line.setAttribute('class', 'math-ladder-path')
    svg.appendChild(line)
  })

  data.rungs.forEach((rung) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttribute('x1', data.columns[rung.from].x)
    line.setAttribute('y1', rung.rowY)
    line.setAttribute('x2', data.columns[rung.to].x)
    line.setAttribute('y2', rung.rowY)
    line.setAttribute('class', 'math-ladder-cross')
    line.dataset.rungId = rung.id
    svg.appendChild(line)
    data.rungElementMap.set(rung.id, line)
  })

  mapLayer.appendChild(svg)

  data.tokenRows.forEach((row) => {
    data.columns.forEach((column, columnIndex) => {
      const token = data.tokens[row.index][columnIndex]
      const tokenEl = document.createElement('div')
      tokenEl.className = `math-ladder-token ${row.type.includes('op') ? 'operator' : 'number'}`
      tokenEl.dataset.tokenId = token.id
      tokenEl.textContent = preview ? '?' : token.displayValue
      tokenEl.style.left = `${column.x}px`
      tokenEl.style.top = `${row.y}px`
      mapLayer.appendChild(tokenEl)
      data.tokenElementMap.set(token.id, tokenEl)
    })
  })

  data.players.forEach((player) => {
    const runner = document.createElement('div')
    runner.className = 'math-ladder-runner'
    runner.textContent = player.name.slice(0, 1)
    runner.style.left = `${data.columns[player.startIndex].x}px`
    runner.style.top = `${data.topY}px`
    runner.style.background = player.color
    runner.style.borderColor = 'rgba(255,255,255,0.95)'
    mapLayer.appendChild(runner)
    data.runnerMap.set(player.id, runner)
  })

  mathLadderBoard.appendChild(mapLayer)
  mathLadderBoard.appendChild(topRow)
  mathLadderBoard.appendChild(bottomRow)

  setMathLadderCamera(data, data.topY, false)
}

function animateMathLadderRunner(player, trace, data) {
  const runner = data.runnerMap.get(player.id)
  if (!runner) return Promise.resolve()

  const moveRunner = (x, y, duration = 220) => {
    return new Promise((resolve) => {
      runner.style.transition = `left ${duration}ms linear, top ${duration}ms linear`
      requestAnimationFrame(() => {
        runner.style.left = `${x}px`
        runner.style.top = `${y}px`
        setMathLadderCamera(data, y, true)
      })
      setTimeout(resolve, duration + 30)
    })
  }

  const flashToken = (tokenId) => {
    const tokenEl = data.tokenElementMap.get(tokenId)
    if (!tokenEl) return
    tokenEl.classList.add('hit')
    setTimeout(() => tokenEl.classList.remove('hit'), 280)
  }

  const activateRung = (rungId) => {
    const rungEl = data.rungElementMap.get(rungId)
    if (!rungEl) return
    rungEl.classList.add('active')
  }

  return (async () => {
    setMathLadderCamera(data, trace.points[0].y, false)

    for (let index = 1; index < trace.points.length; index += 1) {
      const point = trace.points[index]
      const prev = trace.points[index - 1]
      const distance = Math.hypot(point.x - prev.x, point.y - prev.y)
      const duration = Math.max(140, Math.min(320, distance * 1.8))

      await moveRunner(point.x, point.y, duration)

      if (point.rungId) activateRung(point.rungId)
      if (point.tokenId) flashToken(point.tokenId)
    }

    const resultChip = data.resultChipMap.get(player.id)
    if (resultChip && player.formula) {
      resultChip.innerHTML = `
        <strong>${escapeHtml(player.name)}</strong><br>
        <span>${Number(player.formula.result.toFixed(2))}</span>
      `
    }
  })()
}

async function runMathLadderAnimation(data) {
  renderMathLadderLegend()

  for (let index = 0; index < data.players.length; index += 1) {
    const player = data.players[index]
    const trace = data.traces[index]

    await animateMathLadderRunner(player, trace, data)
    await new Promise((resolve) => setTimeout(resolve, 120))
  }

  finishMathLadder(data)
}

function finishMathLadder(data) {
  mathLadderRunning = false
  mathLadderFinished = true

  const ranking = [...data.players]
    .filter((player) => player.formula)
    .sort((a, b) => b.formula.result - a.formula.result)

  const winnerId = ranking[0]?.id

  if (winnerId && data.resultChipMap.has(winnerId)) {
    data.resultChipMap.get(winnerId).classList.add('winner')
  }

  renderMathLadderResults()
  setMathLadderInputLock(false)
  setMathLadderShuffleLock(false)

  if (mathLadderStatusText) {
    mathLadderStatusText.textContent = '사다리 완주 완료! 결과를 확인해줘.'
  }
setMathLadderCamera(data, data.bottomY, true)
}

function startMathLadder() {
  if (!mathLadderInput || mathLadderRunning) return

  const parsed = parseMathLadderPlayers(mathLadderInput.value)
  if (!handleMathLadderParseFailure(parsed)) return

  setMathLadderPlayers(parsed.players)
  setMathLadderInputLock(true)
  setMathLadderShuffleLock(true)
  mathLadderRunning = true
  mathLadderFinished = false

  currentMathLadderData = buildMathLadderData(mathLadderPlayers, { randomize: true })
  renderMathLadderBoard(currentMathLadderData, { preview: false, showResults: false })
setMathLadderCamera(currentMathLadderData, currentMathLadderData.topY, false)

  if (mathLadderStatusText) {
    mathLadderStatusText.textContent = '사다리를 타는 중...'
  }

  runMathLadderAnimation(currentMathLadderData)
}

function shuffleMathLadder() {
  if (!mathLadderInput || mathLadderRunning) return

  const parsed = parseMathLadderPlayers(mathLadderInput.value)
  if (!handleMathLadderParseFailure(parsed)) return

  setMathLadderPlayers(shuffleArray(parsed.players))
  mathLadderInput.value = mathLadderPlayers.map((player) => player.name).join(', ')

  currentMathLadderData = buildMathLadderData(mathLadderPlayers, { randomize: false })
  renderMathLadderBoard(currentMathLadderData, { preview: true, showResults: false })
  renderMathLadderLegend()
  renderMathLadderResults()

  if (mathLadderStatusText) {
    mathLadderStatusText.textContent = '참가자 시작 위치가 랜덤으로 재배치되었다.'
  }
}

function resetMathLadder() {
  if (!mathLadderInput) return

  const parsed = parseMathLadderPlayers(mathLadderInput.value)

  if (parsed.status === 'OK') {
    setMathLadderPlayers(parsed.players)
  } else {
    mathLadderInput.value = lastMathLadderValidText
    const fallbackParsed = parseMathLadderPlayers(lastMathLadderValidText)
    if (fallbackParsed.status === 'OK') {
      setMathLadderPlayers(fallbackParsed.players)
    }
  }

  mathLadderPlayers.forEach((player) => {
    player.formula = null
  })

  mathLadderRunning = false
  mathLadderFinished = false
  currentMathLadderData = buildMathLadderData(mathLadderPlayers, { randomize: false })

  renderMathLadderBoard(currentMathLadderData, { preview: true, showResults: false })
setMathLadderCamera(currentMathLadderData, currentMathLadderData.topY, false)
  renderMathLadderLegend()
  renderMathLadderResults()
  setMathLadderInputLock(false)
  setMathLadderShuffleLock(false)

  if (mathLadderStatusText) {
    mathLadderStatusText.textContent = '사다리 준비가 다시 완료되었다.'
  }
}

function ensureMathLadderReady() {
  if (!mathLadderInput || mathLadderRunning) return

  const parsed = parseMathLadderPlayers(mathLadderInput.value)
  if (!handleMathLadderParseFailure(parsed)) return

  setMathLadderPlayers(parsed.players)
  currentMathLadderData = buildMathLadderData(mathLadderPlayers, { randomize: false })

  renderMathLadderBoard(currentMathLadderData, { preview: true, showResults: false })
setMathLadderCamera(currentMathLadderData, currentMathLadderData.topY, false)
  renderMathLadderLegend()
  renderMathLadderResults()

  if (mathLadderStatusText) {
    mathLadderStatusText.textContent = '참가자 설정 완료. 시작 버튼을 누르면 랜덤 사다리가 생성된다.'
  }
}


window.addEventListener('resize', () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    const nextWidth = window.innerWidth
    const nextHeight = window.innerHeight

    updateOrientationGate()

    if (shouldIgnoreMobileChromeResize(nextWidth, nextHeight)) {
      lastViewportWidth = nextWidth
      lastViewportHeight = nextHeight
      return
    }

    if (!isMobileOrTabletLike() && window.innerWidth > 980) {
      setDrawerState(false)
    }

    if (
      screens.game1?.classList.contains('active') &&
      engine &&
      currentSlots.length &&
      !document.body.classList.contains('orientation-blocked')
    ) {
      syncGame1MobileLayout()
      fitGameCanvasViewport()
      buildBoard()
    }

    if (screens.game2?.classList.contains('active')) {
      syncRaceMobileLayout()
    }

if (screens.game3?.classList.contains('active') && currentMathLadderData) {
  renderMathLadderBoard(currentMathLadderData, {
    preview: !mathLadderFinished,
    showResults: mathLadderFinished
  })
  setMathLadderCamera(
    currentMathLadderData,
    currentMathLadderData.topY + currentMathLadderData.cameraY,
    false
  )
}

    lastViewportWidth = nextWidth
    lastViewportHeight = nextHeight
  }, 180)
})

window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    const nextWidth = window.innerWidth
    const nextHeight = window.innerHeight

    updateOrientationGate()

    if (
      screens.game1?.classList.contains('active') &&
      engine &&
      currentSlots.length &&
      !document.body.classList.contains('orientation-blocked')
    ) {
      syncGame1MobileLayout()
      fitGameCanvasViewport()
      buildBoard()
    }

    if (screens.game2?.classList.contains('active')) {
      syncRaceMobileLayout()
    }

if (screens.game3?.classList.contains('active') && currentMathLadderData) {
  renderMathLadderBoard(currentMathLadderData, {
    preview: !mathLadderFinished,
    showResults: mathLadderFinished
  })
  setMathLadderCamera(
    currentMathLadderData,
    currentMathLadderData.topY + currentMathLadderData.cameraY,
    false
  )
}

    lastViewportWidth = nextWidth
    lastViewportHeight = nextHeight
  }, 220)
})

updateSlotsFromInput({ build: false })
updateRaceFromInput({ render: false })
syncGame1MobileLayout()
syncRaceMobileLayout()
updateOrientationGate()
setGame1InputLock(false)
setGame1ShuffleLock(false)
setRaceInputLock(false)
setRaceShuffleLock(false)
ensureMathLadderReady()
setMathLadderInputLock(false)
setMathLadderShuffleLock(false)
