const screens = {
  home: document.getElementById('homeScreen'),
  menu: document.getElementById('menuScreen'),
  physical: document.getElementById('physicalScreen'),
  physicalBalloon: document.getElementById('physicalBalloonScreen'),
  physicalBomb: document.getElementById('physicalBombScreen'),
  physicalCircle: document.getElementById('physicalCircleScreen'),
  physicalKeyReact: document.getElementById('physicalKeyReactScreen'),
  luck: document.getElementById('luckScreen'),
  game1: document.getElementById('game1Screen'),
  game2: document.getElementById('game2Screen'),
  game3: document.getElementById('game3Screen'),
  game4: document.getElementById('game4Screen'),
  game5: document.getElementById('game5Screen'),
  game6: document.getElementById('game6Screen'),
  game7: document.getElementById('game7Screen')
}

const startBtn = document.getElementById('startBtn')
const physicalBtn = document.getElementById('physicalBtn')
const luckBtn = document.getElementById('luckBtn')
const backButtons = document.querySelectorAll('.back-btn')
const gameLaunchButtons = document.querySelectorAll('.game-launch')
const comingSoonButtons = document.querySelectorAll('.game-coming-soon')
const luckGameGrid = document.getElementById('luckGameGrid')
const luckCarouselHud = document.getElementById('luckCarouselHud')
const luckCarouselDots = document.getElementById('luckCarouselDots')
const physicalGameGrid = document.getElementById('physicalGameGrid')
const physicalCarouselHud = document.getElementById('physicalCarouselHud')
const physicalCarouselDots = document.getElementById('physicalCarouselDots')
const physicalGameLaunchButtons = document.querySelectorAll('.physical-game-launch')

const balloonConfigInput = document.getElementById('balloonConfigInput')
const startBalloonBtn = document.getElementById('startBalloonBtn')
const resetBalloonBtn = document.getElementById('resetBalloonBtn')
const balloonStatusText = document.getElementById('balloonStatusText')
const balloonTotalInfo = document.getElementById('balloonTotalInfo')
const balloonPlayerList = document.getElementById('balloonPlayerList')
const balloonTurnBadge = document.getElementById('balloonTurnBadge')
const balloonPressArea = document.getElementById('balloonPressArea')
const balloonVisual = document.getElementById('balloonVisual')
const balloonPressureNumber = document.getElementById('balloonPressureNumber')
const balloonPressureLabel = document.getElementById('balloonPressureLabel')
const balloonPressureFill = document.getElementById('balloonPressureFill')
const balloonStageHint = document.getElementById('balloonStageHint')
const balloonPopEffect = document.getElementById('balloonPopEffect')
const startBombPassBtn = document.getElementById('startBombPassBtn')
const resetBombPassBtn = document.getElementById('resetBombPassBtn')
const bombPassStateBadge = document.getElementById('bombPassStateBadge')
const bombPassStage = document.getElementById('bombPassStage')
const bombPassVisual = document.getElementById('bombPassVisual')
const bombPassBoom = document.getElementById('bombPassBoom')
const bombPassStatusText = document.getElementById('bombPassStatusText')
const bombPassDeviceText = document.getElementById('bombPassDeviceText')
const circleTapConfigInput = document.getElementById('circleTapConfigInput')
const startCircleTapBtn = document.getElementById('startCircleTapBtn')
const resetCircleTapBtn = document.getElementById('resetCircleTapBtn')
const circleTapStatusText = document.getElementById('circleTapStatusText')
const circleTapTotalInfo = document.getElementById('circleTapTotalInfo')
const circleTapPlayerList = document.getElementById('circleTapPlayerList')
const circleTapTurnBadge = document.getElementById('circleTapTurnBadge')
const circleTapStage = document.getElementById('circleTapStage')
const circleTapTarget = document.getElementById('circleTapTarget')
const circleTapCount = document.getElementById('circleTapCount')
const circleTapMissEffect = document.getElementById('circleTapMissEffect')
const circleTapStageHint = document.getElementById('circleTapStageHint')
const keyReactConfigInput = document.getElementById('keyReactConfigInput')
const startKeyReactBtn = document.getElementById('startKeyReactBtn')
const resetKeyReactBtn = document.getElementById('resetKeyReactBtn')
const keyReactStatusText = document.getElementById('keyReactStatusText')
const keyReactTotalInfo = document.getElementById('keyReactTotalInfo')
const keyReactKeyList = document.getElementById('keyReactKeyList')
const keyReactPlayerList = document.getElementById('keyReactPlayerList')
const keyReactPhaseBadge = document.getElementById('keyReactPhaseBadge')
const keyReactStage = document.getElementById('keyReactStage')
const keyReactSignalText = document.getElementById('keyReactSignalText')
const keyReactSignalSubText = document.getElementById('keyReactSignalSubText')
const keyReactKeyChips = document.getElementById('keyReactKeyChips')
const keyReactResultCount = document.getElementById('keyReactResultCount')
const keyReactRankingList = document.getElementById('keyReactRankingList')

const popupOverlay = document.getElementById('popupOverlay')
const popupTitle = document.getElementById('popupTitle')
const popupMessage = document.getElementById('popupMessage')
const closePopupBtn = document.getElementById('closePopupBtn')
const popupIcon = document.querySelector('.popup-icon')
const popupBox = popupOverlay?.querySelector('.popup') || null

const documentRoot = document.documentElement
const themeToggleBtn = document.getElementById('themeToggleBtn')
const themeToggleIcon = themeToggleBtn?.querySelector('.utility-btn-icon') || null
const themeToggleLabel = themeToggleBtn?.querySelector('.utility-btn-label') || null
const fullscreenToggleBtn = document.getElementById('fullscreenToggleBtn')
const fullscreenToggleIcon = fullscreenToggleBtn?.querySelector('.utility-btn-icon') || null
const fullscreenToggleLabel = fullscreenToggleBtn?.querySelector('.utility-btn-label') || null
const desktopPrevStepBtn = document.getElementById('desktopPrevStepBtn')
const mobilePrevStepBtn = document.getElementById('mobilePrevStepBtn')

const THEME_STORAGE_KEY = 'roulette-theme-preference'

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
const raceCardScreen = document.querySelector('#game2Screen .race-card')
const raceTrackZoomBtn = document.getElementById('raceTrackZoomBtn')
const raceTrackZoomBackdrop = document.getElementById('raceTrackZoomBackdrop')

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
const simArenaZoomBtn = document.getElementById('simArenaZoomBtn')
const simArenaZoomStage = document.getElementById('simArenaZoomStage')
const simArenaZoomBackdrop = document.getElementById('simArenaZoomBackdrop')

const navalConfigInput = document.getElementById('navalConfigInput')
const shuffleNavalBtn = document.getElementById('shuffleNavalBtn')
const startNavalBtn = document.getElementById('startNavalBtn')
const resetNavalBtn = document.getElementById('resetNavalBtn')
const navalStatusText = document.getElementById('navalStatusText')
const navalTotalInfo = document.getElementById('navalTotalInfo')
const navalLegend = document.getElementById('navalLegend')
const navalBoard = document.getElementById('navalBoard')
const navalBoardWrap = document.getElementById('navalBoardWrap')
const navalBombLayer = document.getElementById('navalBombLayer')
const navalBoardMeta = document.getElementById('navalBoardMeta')
const navalBoardCard = document.querySelector('#game5Screen .roulette-stage-card') || document.querySelector('#game5Screen .naval-board-card')
const rouletteCardScreen = document.querySelector('#game5Screen .roulette-card-screen')
const rouletteStageZoomBtn = document.getElementById('rouletteStageZoomBtn')
const rouletteStageZoomBackdrop = document.getElementById('rouletteStageZoomBackdrop')
const navalLogList = document.getElementById('navalLogList')
const navalRankingList = document.getElementById('navalRankingList')
const navalDesc = document.querySelector('#game5Screen .naval-main-header .sub-text')

const stockConfigInput = document.getElementById('stockConfigInput')
const stockDurationInput = document.getElementById('stockDurationInput')
const stockDurationValue = document.getElementById('stockDurationValue')
const shuffleStockBtn = document.getElementById('shuffleStockBtn')
const startStockBtn = document.getElementById('startStockBtn')
const resetStockBtn = document.getElementById('resetStockBtn')
const stockStatusText = document.getElementById('stockStatusText')
const stockTotalInfo = document.getElementById('stockTotalInfo')
const stockSummaryTitle = document.getElementById('stockSummaryTitle')
const stockPlayerSummary = document.getElementById('stockPlayerSummary')
const stockDesc = document.getElementById('stockDesc')
const stockReadyBadge = document.getElementById('stockReadyBadge')
const stockPlayerTabs = document.getElementById('stockPlayerTabs')
const stockRoster = document.getElementById('stockRoster')
const stockActivePlayerTitle = document.getElementById('stockActivePlayerTitle')
const stockAllocationEditor = document.getElementById('stockAllocationEditor')
const stockAllocationSummary = document.getElementById('stockAllocationSummary')
const stockTimerBadge = document.getElementById('stockTimerBadge')
const stockBoard = document.getElementById('stockBoard')
const stockPortfolioList = document.getElementById('stockPortfolioList')
const stockRankingList = document.getElementById('stockRankingList')
const stockCardScreen = document.querySelector('#game6Screen .stock-card-screen')

const ladderConfigInput = document.getElementById('ladderConfigInput')
const shuffleLadderBtn = document.getElementById('shuffleLadderBtn')
const startLadderBtn = document.getElementById('startLadderBtn')
const resetLadderBtn = document.getElementById('resetLadderBtn')
const ladderStatusText = document.getElementById('ladderStatusText')
const ladderTotalInfo = document.getElementById('ladderTotalInfo')
const ladderHelperText = document.getElementById('ladderHelperText')
const ladderCheckList = document.getElementById('ladderCheckList')
const ladderBoard = document.getElementById('ladderBoard')
const ladderRevealBadge = document.getElementById('ladderRevealBadge')
const ladderCardScreen = document.querySelector('#game7Screen .ladder-card-screen')


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
const MAX_CANVAS_PIXEL_RATIO = window.matchMedia('(pointer: coarse)').matches ? 1 : 1.35

function getCanvasPixelRatio() {
  return Math.min(window.devicePixelRatio || 1, MAX_CANVAS_PIXEL_RATIO)
}

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

const navalPlayerPalette = [
  '#f8c8d8',
  '#cfeadf',
  '#d9e9ff',
  '#fde7b8',
  '#ffd7c2',
  '#e4dcff'
]

const DARK_SLOT_PALETTE = [
  '#ff82ad',
  '#6ce8d1',
  '#7fd8ff',
  '#ffd56f',
  '#ffae84',
  '#c9b6ff',
  '#68f0c0',
  '#ff9fc9',
  '#9bdcff',
  '#ffd09a'
]

const DARK_BALL_PALETTE = [
  '#ff82ad',
  '#65e7cf',
  '#7dd5ff',
  '#ffd567',
  '#c5b2ff',
  '#ffa97d'
]

const DARK_RACE_HORSE_PALETTE = [
  '#ff8ab2',
  '#69ead3',
  '#80d8ff',
  '#ffd66d',
  '#ffb087',
  '#cab7ff',
  '#73f0c5',
  '#ffa8d0',
  '#9adfff',
  '#ffd5a1',
  '#d6c3ff',
  '#89f2b8',
  '#ffe07e',
  '#ffb6dc',
  '#9fd5ff',
  '#ffc18b',
  '#8ff0d7',
  '#e0c4ff',
  '#ffe89d',
  '#9fe9df'
]

const DARK_COMMON_PLAYER_PALETTE = [
  '#ff82ad',
  '#6ce8d1',
  '#7fd8ff',
  '#ffd56f',
  '#c9b6ff',
  '#ffa97d'
]

const DARK_NAVAL_PLAYER_PALETTE = [
  '#ff82ad',
  '#6ce8d1',
  '#7fd8ff',
  '#ffd56f',
  '#c9b6ff',
  '#ffa97d'
]

const SIM_DARK_PLAYER_PALETTE = [
  '#ff7aa8',
  '#5eead4',
  '#7dd3fc',
  '#ffd166',
  '#c4b5fd',
  '#ff9b6b'
]

const nameColorMap = new Map()
const raceNameColorMap = new Map()

const APP_HISTORY_ID = 'roulette-app-screen-history'
let currentScreenKey = 'home'
let currentHistoryIndex = 0


const BALLOON_MIN_PLAYERS = 2
const BALLOON_MAX_PLAYERS = 8
const BALLOON_MIN_BURST_PRESSURE = 48
const BALLOON_MAX_BURST_PRESSURE = 125
const BALLOON_PRESS_INTERVAL_MS = 64
const BALLOON_MIN_PRESSURE_STEP = 0.18
const BALLOON_MAX_PRESSURE_STEP = 0.74

let balloonPlayers = []
let balloonGameStarted = false
let balloonPopped = false
let balloonHolding = false
let balloonCurrentIndex = 0
let balloonPressure = 0
let balloonBurstPressure = 0
let balloonHoldTimer = null
let balloonLastValidConfigText = balloonConfigInput ? balloonConfigInput.value : ''
let balloonLastAppliedRawText = balloonConfigInput ? balloonConfigInput.value : ''

const BOMB_PASS_MIN_DURATION_MS = 4500
const BOMB_PASS_MAX_DURATION_MS = 16000
const BOMB_PASS_VIBRATION_PATTERN = [260, 90, 260, 90, 560]

let bombPassRunning = false
let bombPassExploded = false
let bombPassTimer = null
let bombPassStartedAt = 0
let bombPassDuration = 0

const CIRCLE_TAP_MIN_PLAYERS = 2
const CIRCLE_TAP_MAX_PLAYERS = 8
const CIRCLE_TAP_START_RADIUS = 142
const CIRCLE_TAP_MIN_RADIUS = 3
const CIRCLE_TAP_SHRINK_MIN = 0.055
const CIRCLE_TAP_SHRINK_MAX = 0.095

let circleTapPlayers = []
let circleTapStarted = false
let circleTapFinished = false
let circleTapCurrentIndex = 0
let circleTapRadius = CIRCLE_TAP_START_RADIUS
let circleTapSuccessCount = 0
let circleTapLastValidConfigText = circleTapConfigInput ? circleTapConfigInput.value : ''
let circleTapLastAppliedRawText = circleTapConfigInput ? circleTapConfigInput.value : ''

const KEY_REACT_MIN_PLAYERS = 2
const KEY_REACT_MAX_PLAYERS = 4
const KEY_REACT_DEFAULT_KEYS = ['A', 'S', 'K', 'L']
const KEY_REACT_STAY_MIN_MS = 1400
const KEY_REACT_STAY_MAX_MS = 4200

let keyReactPlayers = []
let keyReactPhase = 'idle'
let keyReactTimer = null
let keyReactClickStartedAt = 0
let keyReactResults = []
let keyReactRoundToken = 0
let keyReactCapturePlayerId = ''
let keyReactLastValidConfigText = keyReactConfigInput ? keyReactConfigInput.value : ''
let keyReactLastAppliedRawText = keyReactConfigInput ? keyReactConfigInput.value : ''

function getSlotPaletteByTheme() {
  return isDarkThemeEnabled() ? DARK_SLOT_PALETTE : slotPalette
}

function getBallPaletteByTheme() {
  return isDarkThemeEnabled() ? DARK_BALL_PALETTE : ballPalette
}

function getRacePaletteByTheme() {
  return isDarkThemeEnabled() ? DARK_RACE_HORSE_PALETTE : raceHorsePalette
}

function getCommonPlayerPaletteByTheme() {
  return isDarkThemeEnabled() ? DARK_COMMON_PLAYER_PALETTE : navalPlayerPalette
}

function getNavalPlayerPaletteByTheme() {
  return isDarkThemeEnabled() ? DARK_NAVAL_PLAYER_PALETTE : raceHorsePalette
}

function getColorForName(name) {
  if (!nameColorMap.has(name)) {
    nameColorMap.set(name, nameColorMap.size)
  }

  const palette = getSlotPaletteByTheme()
  return palette[nameColorMap.get(name) % palette.length]
}

function getRaceColorForName(name) {
  if (!raceNameColorMap.has(name)) {
    raceNameColorMap.set(name, raceNameColorMap.size)
  }

  const palette = getRacePaletteByTheme()
  return palette[raceNameColorMap.get(name) % palette.length]
}

function getGame1BoardTheme() {
  if (!isDarkThemeEnabled()) {
    return {
      wall: '#ead8c9',
      floor: '#e8cfbd',
      wallSpinner: '#ead8c9',
      wallSpinnerStroke: '#fff9f3',
      divider: '#d8bfae',
      guidePeg: '#e8d7f7',
      guidePegStroke: '#fff7ff',
      pegChaos: '#d7eef8',
      pegEven: '#efd5e4',
      pegOdd: '#d8eafc',
      pegStroke: '#fff7ff',
      moverPalette: ['#f5d7a7', '#d8ebff', '#f6dfb5'],
      moverStroke: '#fffdf8',
      bumperPalette: ['#d9f0e7', '#f1dced', '#d8ebff', '#f6dfb5'],
      bumperStroke: '#fffdf8',
      ballStroke: '#fffafc'
    }
  }

  return {
    wall: '#8ea1b8',
    floor: '#5c6f85',
    wallSpinner: '#8fa4b7',
    wallSpinnerStroke: '#d9e5f0',
    divider: '#61748c',
    guidePeg: '#7f7ab1',
    guidePegStroke: '#d6e2ee',
    pegChaos: '#5e9fbd',
    pegEven: '#bf8aa3',
    pegOdd: '#7da8c8',
    pegStroke: '#d3deea',
    moverPalette: ['#b99a61', '#6f95b2', '#5c998d'],
    moverStroke: '#d6e2ee',
    bumperPalette: ['#5f9484', '#aa7d95', '#6f98bb', '#b79a62'],
    bumperStroke: '#d6e2ee',
    ballStroke: '#edf6ff'
  }
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
let raceTrackZoomed = false
let rouletteStageZoomed = false
let luckCarouselActiveIndex = 0
let luckCarouselScrollTicking = false
let luckCarouselLoopReady = false
let luckCarouselLoopJumping = false
let luckCarouselLoopSettleTimer = null
let physicalCarouselActiveIndex = 0
let physicalCarouselScrollTicking = false
let physicalCarouselLoopReady = false
let physicalCarouselLoopJumping = false
let physicalCarouselLoopSettleTimer = null

const RACE_MAX_COUNT = 8
const RACE_DISTANCE = 2400
const FAST_FORWARD_HOLD_MS = 260
const FAST_FORWARD_MULTIPLIER = 3
const FAST_FORWARD_BLOCKED_MESSAGE = '빨리감기 불가능 게임'

const FAST_FORWARD_CARD_CONFIG = {
  1: { title: '담아라!', state: 'blocked', badgeText: '없음' },
  2: { title: '경마', state: 'supported', badgeText: '가능' },
  3: { title: '카드 연산 배틀', state: 'none', badgeText: '없음' },
  4: { title: '볼 배틀', state: 'supported', badgeText: '가능' },
  5: { title: '러시안 룰렛', state: 'none', badgeText: '없음' },
  6: { title: '주식게임', state: 'none', badgeText: '없음' },
  7: { title: '투명 사다리 타기', state: 'none', badgeText: '없음' },
  8: { title: '게임 8', state: 'pending', badgeText: '미정' }
}

const fastForwardStates = {
  game1: { target: gameCanvasWrap, active: false, timer: null, pointerId: null, blockedNotice: false },
  game2: { target: raceTrackWrap, active: false, timer: null, pointerId: null, blockedNotice: false },
  game4: { target: simArenaWrap, active: false, timer: null, pointerId: null, blockedNotice: false },
  game5: { target: navalBoardCard, active: false, timer: null, pointerId: null, blockedNotice: false }
}

let raceElapsedMs = 0

let raceHorses = []
let raceRunning = false
let raceFinished = false
let raceAnimationFrame = null
let raceLastTimestamp = 0
let raceLastRankingRenderAt = 0
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
let simArenaZoomed = false
let simArenaZoomBaseRect = null
let simOverlayRaf = null
let simOverlayLastPaintAt = 0
let lastSimValidConfigText = simConfigInput ? simConfigInput.value : ''
let lastSimAppliedRawText = simConfigInput ? simConfigInput.value : ''

let popupWaitResolver = null

const NAVAL_MAX_PLAYERS = 6
const NAVAL_BOARD_SIZE = 8
const NAVAL_SHIP_LENGTH = 3
const NAVAL_BOMB_INTERVAL_MS = 980

let navalPlayers = []
let navalRunning = false
let navalFinished = false
let navalBombTimer = null
let navalBombedSet = new Set()
let navalMissSet = new Set()
let navalHitMap = new Map()
let navalEliminationOrder = []
let navalLogs = []
let navalLastBombIndex = null
let lastNavalValidConfigText = navalConfigInput ? navalConfigInput.value : ''
let lastNavalAppliedRawText = navalConfigInput ? navalConfigInput.value : ''

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


function getFastForwardCardConfig(gameNumber) {
  return FAST_FORWARD_CARD_CONFIG[gameNumber] || {
    title: `게임 ${gameNumber}`,
    state: 'pending',
    badgeText: '미정'
  }
}

function getFastForwardStateLabel(state) {
  switch (state) {
    case 'supported':
      return '지원'
    case 'blocked':
      return '제한'
    case 'none':
      return '미지원'
    case 'pending':
    default:
      return '추후 결정'
  }
}

function getFastForwardGuideMessage(config) {
  switch (config.state) {
    case 'supported':
      return `${config.title}에서는 게임 진행 화면을 길게 꾹 누르면 빨리감기 x${FAST_FORWARD_MULTIPLIER}가 켜지고, 손을 떼면 원래 속도로 돌아가.`
    case 'blocked':
      return `${config.title}는 계산 안정성을 위해 빨리감기 기능을 지원하지 않아. 길게 눌러도 사용할 수 없다는 안내만 표시돼.`
    case 'none':
      return `${config.title}는 현재 빨리감기 기능이 없는 게임이야. 일반 속도로만 진행돼.`
    case 'pending':
    default:
      return `${config.title}의 빨리감기 지원 여부는 아직 정해지지 않았어. 게임이 추가되면 함께 안내될 예정이야.`
  }
}

function getFastForwardGuideDemoHtml(gameNumber, config, badgeLabel) {
  const stateClass = `is-${config.state}`

  if (gameNumber === 2 && config.state === 'supported') {
    const runners = [
      { lane: '1레인', name: '홍길동', colorClass: 'is-pink' },
      { lane: '2레인', name: '김아무개', colorClass: 'is-mint' },
      { lane: '3레인', name: '박철수', colorClass: 'is-sky' }
    ]

    const laneHtml = runners
      .map((runner, index) => {
        return `
          <div class="ff-race-lane">
            <div class="ff-race-lane-track"></div>
            <span class="ff-race-lane-label">${runner.lane}</span>
            <span class="ff-race-start-line"></span>
            <span class="ff-race-finish-line"></span>
            <div class="ff-race-runner ${runner.colorClass} is-runner-${index + 1}">
              <span class="ff-race-runner-emoji">🏇</span>
              <span class="ff-race-runner-info">
                <strong>${runner.name}</strong>
                <span>다그닥</span>
              </span>
            </div>
          </div>
        `
      })
      .join('')

    return `
      <div class="ff-guide-screen ff-guide-screen-race ${stateClass}">
        <div class="ff-race-demo-shell">
          <div class="ff-race-demo-topbar">
            <span class="ff-race-demo-chip">🏇 실제 게임 느낌 예시</span>
            <span class="ff-race-demo-badge">${escapeHtml(badgeLabel)}</span>
          </div>
          <div class="ff-race-demo-stage">
            ${laneHtml}
            <div class="ff-race-touch-area"></div>
            <div class="ff-guide-ripple ff-guide-ripple-1 ff-guide-ripple-race"></div>
            <div class="ff-guide-ripple ff-guide-ripple-2 ff-guide-ripple-race"></div>
            <div class="ff-guide-finger ff-guide-finger-race">👆</div>
            <div class="ff-guide-hold-badge ff-guide-hold-badge-race">게임 화면 길게 꾹</div>
          </div>
        </div>
      </div>
    `
  }

  if (gameNumber === 4 && config.state === 'supported') {
    const fighters = [
      { name: '홍길동', hp: '93/93', colorClass: 'is-pink', labelClass: 'is-hong', ballClass: 'is-ball-1' },
      { name: '김아무개', hp: '76/76', colorClass: 'is-mint', labelClass: 'is-kim', ballClass: 'is-ball-2' },
      { name: '박철수', hp: '59/59', colorClass: 'is-sky', labelClass: 'is-park', ballClass: 'is-ball-3' },
      { name: '최영희', hp: '82/82', colorClass: 'is-gold', labelClass: 'is-choi', ballClass: 'is-ball-4' }
    ]

    const fighterHtml = fighters
      .map((fighter) => {
        return `
          <div class="ff-sim-fighter ${fighter.ballClass}">
            <div class="ff-sim-ball ${fighter.colorClass}"></div>
            <div class="ff-sim-label ${fighter.labelClass}">
              <strong>${fighter.name}</strong>
              <span>${fighter.hp}</span>
              <i class="ff-sim-health-bar"></i>
            </div>
          </div>
        `
      })
      .join('')

    return `
      <div class="ff-guide-screen ff-guide-screen-sim ${stateClass}">
        <div class="ff-sim-demo-shell">
          <div class="ff-sim-demo-topbar">
            <span class="ff-race-demo-chip">⚔️ 실제 게임 느낌 예시</span>
            <span class="ff-race-demo-badge ff-sim-demo-badge">${escapeHtml(badgeLabel)}</span>
          </div>
          <div class="ff-sim-demo-stage">
            <div class="ff-sim-arena-grid"></div>
            <div class="ff-sim-arena-glow"></div>
            ${fighterHtml}
            <div class="ff-sim-touch-area"></div>
            <div class="ff-guide-ripple ff-guide-ripple-1 ff-guide-ripple-sim"></div>
            <div class="ff-guide-ripple ff-guide-ripple-2 ff-guide-ripple-sim"></div>
            <div class="ff-guide-finger ff-guide-finger-sim">👆</div>
            <div class="ff-guide-hold-badge ff-guide-hold-badge-sim">전투 경기장 길게 꾹</div>
          </div>
        </div>
      </div>
    `
  }

  return `
    <div class="ff-guide-screen ${stateClass}">
      <div class="ff-guide-overlay-badge ${config.state}">${escapeHtml(badgeLabel)}</div>
      <div class="ff-guide-progress-row">
        <span class="ff-guide-progress ff-guide-progress-a"></span>
        <span class="ff-guide-progress ff-guide-progress-b"></span>
        <span class="ff-guide-progress ff-guide-progress-c"></span>
      </div>
      <div class="ff-guide-ripple ff-guide-ripple-1"></div>
      <div class="ff-guide-ripple ff-guide-ripple-2"></div>
      <div class="ff-guide-finger">👆</div>
      <div class="ff-guide-hold-badge">길게 꾹</div>
    </div>
  `
}

function getFastForwardGuideHtml(gameNumber) {
  const config = getFastForwardCardConfig(gameNumber)
  const stateClass = `is-${config.state}`
  const badgeLabel = config.state === 'supported'
    ? `⏩ 빨리감기 x${FAST_FORWARD_MULTIPLIER}`
    : config.state === 'blocked'
      ? FAST_FORWARD_BLOCKED_MESSAGE
      : config.state === 'pending'
        ? '추후 결정'
        : '빨리감기 미지원'

  const guideSummary = config.state === 'supported'
    ? `<div class="ff-guide-steps"><span>1. 게임 진행 화면 위에서</span><strong>길게 꾹 누르기</strong><span>2. 상단에 ⏩ x${FAST_FORWARD_MULTIPLIER} 표시 확인</span><span>3. 손을 떼면 원래 속도로 복귀</span></div>`
    : `<div class="ff-guide-steps"><span>현재 상태</span><strong>${getFastForwardStateLabel(config.state)}</strong><span>${config.state === 'pending' ? '추가 개발 후 반영 예정' : '일반 속도로만 플레이 가능'}</span></div>`

  return `
    <div class="ff-guide-content ${stateClass}">
      <div class="ff-guide-topline">
        <span class="ff-guide-chip ${stateClass}">⏩ ${config.badgeText}</span>
        <span class="ff-guide-chip is-subtle">${getFastForwardStateLabel(config.state)}</span>
      </div>
      <p class="ff-guide-copy">${escapeHtml(getFastForwardGuideMessage(config))}</p>
      <div class="ff-guide-demo ${stateClass}" aria-hidden="true">
        ${getFastForwardGuideDemoHtml(gameNumber, config, badgeLabel)}
        <p class="ff-guide-caption">GIF처럼 반복되는 예시야. 실제 게임 화면을 길게 눌렀을 때 어떤 느낌으로 빨라지는지 시각적으로 보여줘.</p>
      </div>
      ${guideSummary}
    </div>
  `
}

function openFastForwardGuide(gameNumber) {
  const config = getFastForwardCardConfig(gameNumber)

  if (config.state !== 'supported') {
    showPopup('안내', '빨리감기가 불가능한 게임입니다.', { icon: '⚠️' })
    return
  }

  showPopup(
    `${config.title} · 빨리감기 안내`,
    getFastForwardGuideHtml(gameNumber),
    { icon: '⏩', allowHtml: true, popupClass: 'fast-forward-guide-popup' }
  )
}

function decorateLuckGameFastForwardBadges() {
  const items = document.querySelectorAll('.game-item')

  items.forEach((item) => {
    const gameNumber = Number(item.dataset.game || item.querySelector('.game-num')?.textContent?.trim())
    if (!Number.isFinite(gameNumber)) return

    const config = getFastForwardCardConfig(gameNumber)
    item.dataset.ffGame = String(gameNumber)
    item.dataset.ffState = config.state

    if (item.querySelector('.game-ff-badge')) return

    const badge = document.createElement('span')
    badge.className = `game-ff-badge is-${config.state}`
    badge.innerHTML = `<span class="game-ff-badge-icon">⏩</span><span class="game-ff-badge-text">${escapeHtml(config.badgeText)}</span>`
    badge.setAttribute('aria-hidden', 'true')
    item.appendChild(badge)
  })
}

function isFastForwardBadgeClick(item, event) {
  if (!item || !(event instanceof MouseEvent)) return false

  const target = event.target
  if (target instanceof Element && target.closest('.game-ff-badge')) {
    return true
  }

  const badge = item.querySelector('.game-ff-badge')
  if (!badge) return false

  const rect = badge.getBoundingClientRect()
  return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom
}

function handleLuckFastForwardBadgeClick(event) {
  const item = event.target instanceof Element ? event.target.closest('.game-item') : null
  if (!item) return
  if (!isFastForwardBadgeClick(item, event)) return

  event.preventDefault()
  event.stopPropagation()

  const gameNumber = Number(item.dataset.ffGame || item.dataset.game || item.querySelector('.game-num')?.textContent?.trim())
  if (!Number.isFinite(gameNumber)) return

  openFastForwardGuide(gameNumber)
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}


function getSavedThemePreference() {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    return 'dark'
  } catch (error) {
    return documentRoot.classList.contains('theme-dark') ? 'dark' : 'light'
  }
}

function isDarkThemeEnabled() {
  return documentRoot.classList.contains('theme-dark')
}

function getSimPlayerPalette() {
  return isDarkThemeEnabled() ? SIM_DARK_PLAYER_PALETTE : navalPlayerPalette
}

function getSimColorForIndex(index) {
  const palette = getSimPlayerPalette()
  return palette[index % palette.length]
}

function getSimBallStrokeColor() {
  return isDarkThemeEnabled() ? '#ecf7ff' : '#fffaf8'
}

function refreshSimThemeVisuals() {
  const palette = getSimPlayerPalette()

  if (simPlayers.length) {
    simPlayers = simPlayers.map((player, index) => ({
      ...player,
      color: palette[index % palette.length]
    }))
  }

  if (simRoundPlayers.length) {
    simRoundPlayers = simRoundPlayers.map((player, index) => ({
      ...player,
      color: palette[index % palette.length]
    }))
  }

  if (simLegend) {
    renderSimLegend()
  }

  if (simStatsBoard) {
    if (simSetupDone && simRoundPlayers.length) {
      renderSimStatsBoard(simRoundPlayers, { reveal: true, dealt: true })
    } else if (simPlayers.length) {
      renderSimStatsBoard(simPlayers)
    }
  }

  if (simBattleSummary) {
    renderSimBattleSummary(simBattleRunning || simBattleFinished ? simRoundPlayers : [])
  }

  if (simArenaBodyMap.size) {
    simRoundPlayers.forEach((player) => {
      const body = simArenaBodyMap.get(player.id)
      if (!body?.render) return
      body.render.fillStyle = player.color
      body.render.strokeStyle = getSimBallStrokeColor()
      body.render.lineWidth = isDarkThemeEnabled() ? 4 : 3
    })
  }
}

function refreshExtendedThemeVisuals() {
  if (currentSlots.length && slotOverlay) {
    renderSlotsOverlay()
    refreshCounts()

    if (engine && !hasLiveRound()) {
      buildBoard()
    }
  }

  if (ballBodies.length) {
    const palette = getBallPaletteByTheme()
    ballBodies.forEach((body, index) => {
      if (body?.isBombBall || !body?.render) return
      body.render.fillStyle = palette[index % palette.length]
      body.render.strokeStyle = getGame1BoardTheme().ballStroke
      body.render.lineWidth = isDarkThemeEnabled() ? 1.6 : 1.1
    })
  }

  if (raceHorses.length) {
    raceHorses = raceHorses.map((horse) => ({
      ...horse,
      color: getRaceColorForName(horse.label)
    }))

    renderRaceLegend()
    raceHorses.forEach((horse) => {
      if (horse?.runnerEl) {
        horse.runnerEl.style.setProperty('--horse-color', horse.color)
      }
    })
    renderRaceRanking()
  }

  if (battlePlayers.length) {
    const palette = getCommonPlayerPaletteByTheme()
    battlePlayers = battlePlayers.map((player, index) => ({
      ...player,
      color: palette[index % palette.length]
    }))

    renderBattleLegend()

    document.querySelectorAll('#game3Screen .battle-row[data-player-id]').forEach((row) => {
      const player = battlePlayers.find((item) => item.id === row.dataset.playerId)
      const dot = row.querySelector('.legend-dot')
      if (player && dot) {
        dot.style.background = player.color
      }
    })

    if (!battleGameRunning && battlePhase === 'idle') {
      renderBattleRowsPreview()
      renderBattleRanking([])
    }
  }

  if (navalPlayers.length) {
    const palette = getNavalPlayerPaletteByTheme()
    navalPlayers = navalPlayers.map((player, index) => ({
      ...player,
      color: palette[index % palette.length]
    }))

    renderNavalLegend()
    renderNavalBoardState()
    renderNavalLogs()
    renderNavalRanking()
  }
}

function updateThemeToggleButton() {
  if (!themeToggleBtn) return

  const isDark = isDarkThemeEnabled()
  const nextActionText = isDark ? '낮 모드로 전환' : '밤 모드로 전환'

  themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false')
  themeToggleBtn.setAttribute('aria-label', nextActionText)
  themeToggleBtn.title = nextActionText

  if (themeToggleIcon) {
    themeToggleIcon.textContent = isDark ? '☀️' : '🌙'
  }

  if (themeToggleLabel) {
    themeToggleLabel.textContent = isDark ? '낮 모드' : '밤 모드'
  }
}

function applyThemePreference(theme, options = {}) {
  const { persist = true } = options
  const useDarkTheme = theme === 'dark'

  documentRoot.classList.toggle('theme-dark', useDarkTheme)

  if (document.body) {
    document.body.classList.toggle('theme-dark', useDarkTheme)
  }

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, useDarkTheme ? 'dark' : 'light')
    } catch (error) {}
  }

  updateThemeToggleButton()
  refreshSimThemeVisuals()
  refreshExtendedThemeVisuals()
}

function toggleThemePreference() {
  applyThemePreference(isDarkThemeEnabled() ? 'light' : 'dark')
}

function getActiveFullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || null
}

function isFullscreenMode() {
  return Boolean(getActiveFullscreenElement())
}

function canUseFullscreenMode() {
  const target = document.documentElement
  return Boolean(
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    target?.requestFullscreen ||
    target?.webkitRequestFullscreen
  )
}

function requestAppFullscreen() {
  const target = document.documentElement
  const requestMethod = target?.requestFullscreen || target?.webkitRequestFullscreen

  if (typeof requestMethod !== 'function') {
    return Promise.reject(new Error('Fullscreen API is not supported'))
  }

  const result = requestMethod.call(target)
  return result instanceof Promise ? result : Promise.resolve()
}

function exitAppFullscreen() {
  const exitMethod = document.exitFullscreen || document.webkitExitFullscreen

  if (typeof exitMethod !== 'function') {
    return Promise.reject(new Error('Fullscreen exit is not supported'))
  }

  const result = exitMethod.call(document)
  return result instanceof Promise ? result : Promise.resolve()
}

function updateFullscreenToggleButton() {
  if (!fullscreenToggleBtn) return

  const supported = canUseFullscreenMode()
  const isActive = isFullscreenMode()
  const buttonText = isActive ? '전체화면 해제' : '전체화면'
  const actionText = supported
    ? (isActive ? '전체화면 끄기' : '전체화면 켜기')
    : '이 브라우저에서는 전체화면을 지원하지 않음'

  fullscreenToggleBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false')
  fullscreenToggleBtn.setAttribute('aria-label', actionText)
  fullscreenToggleBtn.title = actionText
  fullscreenToggleBtn.classList.toggle('is-unsupported', !supported)

  if (fullscreenToggleIcon) {
    fullscreenToggleIcon.textContent = isActive ? '🗗' : '⛶'
  }

  if (fullscreenToggleLabel) {
    fullscreenToggleLabel.textContent = buttonText
  }
}

function syncResponsiveAfterViewportModeChange() {
  lastViewportWidth = window.innerWidth
  lastViewportHeight = window.innerHeight

  syncGame1MobileLayout()
  syncRaceMobileLayout()
  syncSimResponsiveLayout()
  updateOrientationGate()
  initCustomCursor()

  if (screens.game1?.classList.contains('active')) {
    fitGameCanvasViewport()

    if (engine && currentSlots.length) {
      buildBoard()
    }
  }

  if (screens.game2?.classList.contains('active') && raceHorses.length) {
    renderRacePreview()
    if (raceTrackZoomed) {
      updateRaceTrackZoomLayout()
    }
  }

  if (screens.game4?.classList.contains('active')) {
    if (simBattleRunning || simBattleFinished) {
      updateSimArenaOverlay(true)
    }
    if (simArenaZoomed) {
      updateSimArenaZoomScale()
    }
  }

  if (screens.game5?.classList.contains('active')) {
    if (rouletteStageZoomed) {
      updateRouletteStageZoomLayout()
    } else {
      renderNavalBoardState()
    }
  }

  if (screens.game7?.classList.contains('active')) {
    renderLadderGame()
  }
}

async function toggleFullscreenMode() {
  if (!canUseFullscreenMode()) {
    showPopup('전체화면 안내', '현재 브라우저에서는 전체화면 전환을 지원하지 않아.')
    updateFullscreenToggleButton()
    return
  }

  try {
    if (isFullscreenMode()) {
      await exitAppFullscreen()
    } else {
      await requestAppFullscreen()
    }
  } catch (error) {
    showPopup('전체화면 안내', '전체화면 전환이 차단되었거나 지원되지 않아.')
  } finally {
    updateFullscreenToggleButton()
    setTimeout(syncResponsiveAfterViewportModeChange, 100)
  }
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

function showMinParticipantsPopup(maxCount) {
  showPopup(
    '참가자 등록 확인',
    `최소 인원 2인 ~ 최대 ${maxCount}인이 이용가능합니다.<br>참가자 등록을 수정해주세요.`,
    { icon: '⚠️', allowHtml: true }
  )
}

function hasAtLeastTwoUniqueGame1Participants(slots) {
  return new Set(slots.map((slot) => slot.name)).size >= 2
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



function isLuckCarouselMode() {
  return Boolean(luckGameGrid) && isTouchDevice() && window.innerWidth <= 820
}

function handleLuckGameSelection(button) {
  if (!button) return

  if (button.classList.contains('game-launch')) {
    if (button.dataset.game === '1') showScreen('game1')
    if (button.dataset.game === '2') showScreen('game2')
    if (button.dataset.game === '3') showScreen('game3')
    if (button.dataset.game === '4') showScreen('game4')
    if (button.dataset.game === '5') showScreen('game5')
    if (button.dataset.game === '6') showScreen('game6')
    if (button.dataset.game === '7') showScreen('game7')
    return
  }

  if (button.classList.contains('game-coming-soon')) {
    showPopup('개발중', '이 게임은 아직 준비중이야!')
  }
}

function bindLuckGameItemInteraction(button) {
  if (!button || button.dataset.luckGameBound === 'true') return

  button.dataset.luckGameBound = 'true'
  button.addEventListener('click', () => {
    handleLuckGameSelection(button)
  })
}

function getLuckCarouselOriginalItems() {
  return luckGameGrid ? [...luckGameGrid.querySelectorAll('.game-item:not([data-clone])')] : []
}

function getLuckCarouselTrackItems() {
  return luckGameGrid ? [...luckGameGrid.querySelectorAll('.game-item')] : []
}

function ensureLuckCarouselLoop() {
  if (!luckGameGrid) return

  const existingClones = [...luckGameGrid.querySelectorAll('.game-item[data-clone]')]
  if (existingClones.length) {
    existingClones.forEach((item) => item.remove())
  }

  const originalItems = getLuckCarouselOriginalItems()
  originalItems.forEach((item, index) => {
    item.dataset.carouselIndex = String(index)
    item.dataset.loopSet = 'center'
    bindLuckGameItemInteraction(item)
  })

  luckCarouselLoopReady = false

  if (originalItems.length <= 1) {
    luckCarouselLoopReady = true
    return
  }

  const prependFragment = document.createDocumentFragment()
  const appendFragment = document.createDocumentFragment()

  originalItems.forEach((item) => {
    const prependClone = item.cloneNode(true)
    prependClone.dataset.clone = 'prepend'
    prependClone.dataset.loopSet = 'prepend'
    prependClone.dataset.carouselIndex = item.dataset.carouselIndex
    prependClone.removeAttribute('id')
    bindLuckGameItemInteraction(prependClone)
    prependFragment.appendChild(prependClone)

    const appendClone = item.cloneNode(true)
    appendClone.dataset.clone = 'append'
    appendClone.dataset.loopSet = 'append'
    appendClone.dataset.carouselIndex = item.dataset.carouselIndex
    appendClone.removeAttribute('id')
    bindLuckGameItemInteraction(appendClone)
    appendFragment.appendChild(appendClone)
  })

  luckGameGrid.prepend(prependFragment)
  luckGameGrid.append(appendFragment)
  luckCarouselLoopReady = true
}

function updateLuckCarouselDots(activeIndex = 0) {
  if (!luckCarouselDots) return

  const dots = [...luckCarouselDots.querySelectorAll('.luck-carousel-dot')]
  dots.forEach((dot, index) => {
    const isActive = index === activeIndex
    dot.classList.toggle('is-active', isActive)
    dot.setAttribute('aria-pressed', isActive ? 'true' : 'false')
    dot.setAttribute('aria-current', isActive ? 'true' : 'false')
  })
}

function buildLuckCarouselDots() {
  if (!luckCarouselDots) return

  const items = getLuckCarouselOriginalItems()
  luckCarouselDots.innerHTML = ''

  items.forEach((item, index) => {
    const dot = document.createElement('button')
    dot.type = 'button'
    dot.className = 'luck-carousel-dot'
    dot.setAttribute('aria-label', `${index + 1}번 게임으로 이동`)
    dot.addEventListener('click', () => {
      scrollToLuckCarouselIndex(index)
    })
    luckCarouselDots.appendChild(dot)
  })

  updateLuckCarouselDots(luckCarouselActiveIndex)
}

function getLuckCarouselClosestItem() {
  const items = getLuckCarouselTrackItems()

  if (!luckGameGrid || !items.length) {
    return null
  }

  const viewportCenter = luckGameGrid.scrollLeft + luckGameGrid.clientWidth / 2
  let closestItem = null
  let closestDistance = Number.POSITIVE_INFINITY

  items.forEach((item) => {
    const itemCenter = item.offsetLeft + item.offsetWidth / 2
    const distance = Math.abs(itemCenter - viewportCenter)
    if (distance < closestDistance) {
      closestDistance = distance
      closestItem = item
    }
  })

  return closestItem
}

function getLuckCarouselClosestIndex() {
  const closestItem = getLuckCarouselClosestItem()
  if (!closestItem) return 0

  const rawIndex = Number.parseInt(closestItem.dataset.carouselIndex || '0', 10)
  const itemCount = getLuckCarouselOriginalItems().length
  if (!itemCount) return 0

  if (Number.isNaN(rawIndex)) return 0
  return clampValue(rawIndex, 0, itemCount - 1)
}

function updateLuckCarouselActiveIndex(index, closestItem = null) {
  const originalItems = getLuckCarouselOriginalItems()
  const trackItems = getLuckCarouselTrackItems()
  const safeIndex = clampValue(index, 0, Math.max(0, originalItems.length - 1))
  const activeItem = closestItem && trackItems.includes(closestItem)
    ? closestItem
    : trackItems.find((item) => Number.parseInt(item.dataset.carouselIndex || '-1', 10) === safeIndex) || null

  luckCarouselActiveIndex = safeIndex
  updateLuckCarouselDots(safeIndex)

  const activeTrackIndex = activeItem ? trackItems.indexOf(activeItem) : -1

  trackItems.forEach((item, itemTrackIndex) => {
    const isActive = item === activeItem
    const isNeighbor = activeTrackIndex !== -1 && Math.abs(itemTrackIndex - activeTrackIndex) === 1
    item.classList.toggle('is-carousel-active', isActive)
    item.classList.toggle('is-carousel-neighbor', isNeighbor)
  })
}

function getLuckCarouselCenteredLeft(targetItem) {
  if (!luckGameGrid || !targetItem) return 0

  const targetLeft = targetItem.offsetLeft - (luckGameGrid.clientWidth - targetItem.offsetWidth) / 2
  const maxLeft = Math.max(0, luckGameGrid.scrollWidth - luckGameGrid.clientWidth)
  return clampValue(targetLeft, 0, maxLeft)
}

function scrollLuckCarouselToItem(targetItem, behavior = 'smooth') {
  if (!luckGameGrid || !targetItem) return

  luckGameGrid.scrollTo({
    left: getLuckCarouselCenteredLeft(targetItem),
    behavior
  })
}

function scrollToLuckCarouselIndex(index, behavior = 'smooth') {
  if (!luckGameGrid) return

  const items = getLuckCarouselOriginalItems()
  const safeIndex = clampValue(index, 0, Math.max(0, items.length - 1))
  const targetItem = items[safeIndex]

  if (!targetItem) return

  updateLuckCarouselActiveIndex(safeIndex, targetItem)
  scrollLuckCarouselToItem(targetItem, behavior)
}

function getLuckCarouselLoopMetrics() {
  if (!luckGameGrid) return null

  const prependItems = [...luckGameGrid.querySelectorAll('.game-item[data-loop-set="prepend"]')]
  const centerItems = [...luckGameGrid.querySelectorAll('.game-item[data-loop-set="center"]')]
  const appendItems = [...luckGameGrid.querySelectorAll('.game-item[data-loop-set="append"]')]

  if (!prependItems.length || !centerItems.length || !appendItems.length) {
    return null
  }

  const prependFirst = prependItems[0]
  const centerFirst = centerItems[0]
  const appendFirst = appendItems[0]
  const setWidth = appendFirst.offsetLeft - centerFirst.offsetLeft

  if (!Number.isFinite(setWidth) || setWidth <= 0) {
    return null
  }

  return {
    prependItems,
    centerItems,
    appendItems,
    prependFirst,
    centerFirst,
    appendFirst,
    setWidth
  }
}

function clearLuckCarouselLoopSettleTimer() {
  if (!luckCarouselLoopSettleTimer) return
  clearTimeout(luckCarouselLoopSettleTimer)
  luckCarouselLoopSettleTimer = null
}

function scheduleLuckCarouselLoopNormalize(closestItem) {
  clearLuckCarouselLoopSettleTimer()

  if (!isLuckCarouselMode() || !luckGameGrid || !closestItem || luckCarouselLoopJumping) {
    return
  }

  const loopSet = closestItem.dataset.loopSet || 'center'
  if (loopSet === 'center') return

  const snapshotKey = `${loopSet}:${closestItem.dataset.carouselIndex || ''}`

  luckCarouselLoopSettleTimer = setTimeout(() => {
    luckCarouselLoopSettleTimer = null

    if (luckCarouselLoopJumping) return

    const settledItem = getLuckCarouselClosestItem()
    if (!settledItem) return

    const settledLoopSet = settledItem.dataset.loopSet || 'center'
    const settledKey = `${settledLoopSet}:${settledItem.dataset.carouselIndex || ''}`

    if (settledKey !== snapshotKey) {
      if (settledLoopSet !== 'center') {
        scheduleLuckCarouselLoopNormalize(settledItem)
      }
      return
    }

    normalizeLuckCarouselLoop(settledItem)
  }, 96)
}

function normalizeLuckCarouselLoop(closestItem) {
  if (!isLuckCarouselMode() || !luckGameGrid || !closestItem || luckCarouselLoopJumping) {
    return
  }

  const loopSet = closestItem.dataset.loopSet || 'center'
  if (loopSet === 'center') return

  const metrics = getLuckCarouselLoopMetrics()
  if (!metrics) return

  const targetIndex = Number.parseInt(closestItem.dataset.carouselIndex || '-1', 10)
  const targetItem = metrics.centerItems[targetIndex]

  if (!targetItem) return

  const centeredLeft = getLuckCarouselCenteredLeft(closestItem)
  if (Math.abs(luckGameGrid.scrollLeft - centeredLeft) > Math.max(12, closestItem.offsetWidth * 0.08)) {
    return
  }

  clearLuckCarouselLoopSettleTimer()
  luckCarouselLoopJumping = true
  luckGameGrid.classList.add('is-loop-resetting')
  luckGameGrid.scrollLeft = getLuckCarouselCenteredLeft(targetItem)
  updateLuckCarouselActiveIndex(targetIndex, targetItem)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      luckGameGrid.classList.remove('is-loop-resetting')
      setTimeout(() => {
        luckCarouselLoopJumping = false
      }, 40)
    })
  })
}

function handleLuckCarouselScroll() {
  if (!isLuckCarouselMode() || !luckGameGrid) return
  if (luckCarouselScrollTicking) return

  luckCarouselScrollTicking = true

  requestAnimationFrame(() => {
    const closestItem = getLuckCarouselClosestItem()
    const closestIndex = getLuckCarouselClosestIndex()
    updateLuckCarouselActiveIndex(closestIndex, closestItem)
    scheduleLuckCarouselLoopNormalize(closestItem)
    luckCarouselScrollTicking = false
  })
}

function syncLuckCarousel(options = {}) {
  if (!luckGameGrid) return

  const { align = false } = options
  const shouldUseCarousel = isLuckCarouselMode()

  clearLuckCarouselLoopSettleTimer()
  luckCarouselLoopJumping = false
  luckGameGrid.classList.remove('is-loop-resetting')

  ensureLuckCarouselLoop()

  const originalItems = getLuckCarouselOriginalItems()

  document.body.classList.toggle('luck-carousel-mode', shouldUseCarousel)

  if (luckCarouselHud) {
    luckCarouselHud.setAttribute('aria-hidden', shouldUseCarousel ? 'false' : 'true')
  }

  if (!originalItems.length) return

  if (!luckCarouselDots || luckCarouselDots.children.length !== originalItems.length) {
    buildLuckCarouselDots()
  }

  const safeIndex = Math.min(luckCarouselActiveIndex, originalItems.length - 1)
  updateLuckCarouselActiveIndex(safeIndex, originalItems[safeIndex] || null)

  if (shouldUseCarousel) {
    if (align || screens.luck?.classList.contains('active')) {
      requestAnimationFrame(() => {
        scrollToLuckCarouselIndex(safeIndex, 'auto')
      })
    }
    return
  }

  if (luckGameGrid.scrollLeft !== 0) {
    luckGameGrid.scrollLeft = 0
  }
}


function isPhysicalCarouselMode() {
  return Boolean(physicalGameGrid) && isTouchDevice() && window.innerWidth <= 820
}

function handlePhysicalGameSelection(button) {
  if (!button) return

  if (button.dataset.physicalGame === 'balloon') {
    showScreen('physicalBalloon')
    return
  }

  if (button.dataset.physicalGame === 'bomb-pass') {
    showScreen('physicalBomb')
    return
  }

  if (button.dataset.physicalGame === 'shrinking-circle') {
    showScreen('physicalCircle')
    return
  }

  if (button.dataset.physicalGame === 'stay-click') {
    showScreen('physicalKeyReact')
  }
}

function bindPhysicalGameItemInteraction(button) {
  if (!button || button.dataset.physicalGameBound === 'true') return

  button.dataset.physicalGameBound = 'true'
  button.addEventListener('click', () => {
    handlePhysicalGameSelection(button)
  })
}

function getVisiblePhysicalCarouselItems(items) {
  return items.filter((item) => window.getComputedStyle(item).display !== 'none')
}

function getPhysicalCarouselOriginalItems() {
  if (!physicalGameGrid) return []
  return getVisiblePhysicalCarouselItems([...physicalGameGrid.querySelectorAll('.physical-game-item:not([data-clone])')])
}

function getPhysicalCarouselTrackItems() {
  if (!physicalGameGrid) return []
  return getVisiblePhysicalCarouselItems([...physicalGameGrid.querySelectorAll('.physical-game-item')])
}

function ensurePhysicalCarouselLoop() {
  if (!physicalGameGrid) return

  const existingClones = [...physicalGameGrid.querySelectorAll('.physical-game-item[data-clone]')]
  if (existingClones.length) {
    existingClones.forEach((item) => item.remove())
  }

  const originalItems = getPhysicalCarouselOriginalItems()
  originalItems.forEach((item, index) => {
    item.dataset.carouselIndex = String(index)
    item.dataset.loopSet = 'center'
    bindPhysicalGameItemInteraction(item)
  })

  physicalCarouselLoopReady = false

  if (originalItems.length <= 1) {
    physicalCarouselLoopReady = true
    return
  }

  const prependFragment = document.createDocumentFragment()
  const appendFragment = document.createDocumentFragment()

  originalItems.forEach((item) => {
    const prependClone = item.cloneNode(true)
    prependClone.dataset.clone = 'prepend'
    prependClone.dataset.loopSet = 'prepend'
    prependClone.dataset.carouselIndex = item.dataset.carouselIndex
    prependClone.removeAttribute('id')
    bindPhysicalGameItemInteraction(prependClone)
    prependFragment.appendChild(prependClone)

    const appendClone = item.cloneNode(true)
    appendClone.dataset.clone = 'append'
    appendClone.dataset.loopSet = 'append'
    appendClone.dataset.carouselIndex = item.dataset.carouselIndex
    appendClone.removeAttribute('id')
    bindPhysicalGameItemInteraction(appendClone)
    appendFragment.appendChild(appendClone)
  })

  physicalGameGrid.prepend(prependFragment)
  physicalGameGrid.append(appendFragment)
  physicalCarouselLoopReady = true
}

function updatePhysicalCarouselDots(activeIndex = 0) {
  if (!physicalCarouselDots) return

  const dots = [...physicalCarouselDots.querySelectorAll('.physical-carousel-dot')]
  dots.forEach((dot, index) => {
    const isActive = index === activeIndex
    dot.classList.toggle('is-active', isActive)
    dot.setAttribute('aria-pressed', isActive ? 'true' : 'false')
    dot.setAttribute('aria-current', isActive ? 'true' : 'false')
  })
}

function buildPhysicalCarouselDots() {
  if (!physicalCarouselDots) return

  const items = getPhysicalCarouselOriginalItems()
  physicalCarouselDots.innerHTML = ''

  items.forEach((item, index) => {
    const dot = document.createElement('button')
    dot.type = 'button'
    dot.className = 'physical-carousel-dot'
    dot.setAttribute('aria-label', `${index + 1}번째 피지컬 게임으로 이동`)
    dot.addEventListener('click', () => {
      scrollToPhysicalCarouselIndex(index)
    })
    physicalCarouselDots.appendChild(dot)
  })

  updatePhysicalCarouselDots(physicalCarouselActiveIndex)
}

function getPhysicalCarouselClosestItem() {
  const items = getPhysicalCarouselTrackItems()
  if (!physicalGameGrid || !items.length) return null

  const viewportCenter = physicalGameGrid.scrollLeft + physicalGameGrid.clientWidth / 2
  let closestItem = null
  let closestDistance = Number.POSITIVE_INFINITY

  items.forEach((item) => {
    const itemCenter = item.offsetLeft + item.offsetWidth / 2
    const distance = Math.abs(itemCenter - viewportCenter)
    if (distance < closestDistance) {
      closestDistance = distance
      closestItem = item
    }
  })

  return closestItem
}

function getPhysicalCarouselClosestIndex() {
  const closestItem = getPhysicalCarouselClosestItem()
  if (!closestItem) return 0

  const rawIndex = Number.parseInt(closestItem.dataset.carouselIndex || '0', 10)
  const itemCount = getPhysicalCarouselOriginalItems().length
  if (!itemCount) return 0

  if (Number.isNaN(rawIndex)) return 0
  return clampValue(rawIndex, 0, itemCount - 1)
}

function updatePhysicalCarouselActiveIndex(index, closestItem = null) {
  const originalItems = getPhysicalCarouselOriginalItems()
  const trackItems = getPhysicalCarouselTrackItems()
  const safeIndex = clampValue(index, 0, Math.max(0, originalItems.length - 1))
  const activeItem = closestItem && trackItems.includes(closestItem)
    ? closestItem
    : trackItems.find((item) => Number.parseInt(item.dataset.carouselIndex || '-1', 10) === safeIndex) || null

  physicalCarouselActiveIndex = safeIndex
  updatePhysicalCarouselDots(safeIndex)

  const activeTrackIndex = activeItem ? trackItems.indexOf(activeItem) : -1

  trackItems.forEach((item, itemTrackIndex) => {
    const isActive = item === activeItem
    const isNeighbor = activeTrackIndex !== -1 && Math.abs(itemTrackIndex - activeTrackIndex) === 1
    item.classList.toggle('is-carousel-active', isActive)
    item.classList.toggle('is-carousel-neighbor', isNeighbor)
  })
}

function getPhysicalCarouselCenteredLeft(targetItem) {
  if (!physicalGameGrid || !targetItem) return 0

  const targetLeft = targetItem.offsetLeft - (physicalGameGrid.clientWidth - targetItem.offsetWidth) / 2
  const maxLeft = Math.max(0, physicalGameGrid.scrollWidth - physicalGameGrid.clientWidth)
  return clampValue(targetLeft, 0, maxLeft)
}

function scrollPhysicalCarouselToItem(targetItem, behavior = 'smooth') {
  if (!physicalGameGrid || !targetItem) return

  physicalGameGrid.scrollTo({
    left: getPhysicalCarouselCenteredLeft(targetItem),
    behavior
  })
}

function scrollToPhysicalCarouselIndex(index, behavior = 'smooth') {
  if (!physicalGameGrid) return

  const items = getPhysicalCarouselOriginalItems()
  const safeIndex = clampValue(index, 0, Math.max(0, items.length - 1))
  const targetItem = items[safeIndex]
  if (!targetItem) return

  updatePhysicalCarouselActiveIndex(safeIndex, targetItem)
  scrollPhysicalCarouselToItem(targetItem, behavior)
}

function getPhysicalCarouselLoopMetrics() {
  if (!physicalGameGrid) return null

  const prependItems = getVisiblePhysicalCarouselItems([...physicalGameGrid.querySelectorAll('.physical-game-item[data-loop-set="prepend"]')])
  const centerItems = getVisiblePhysicalCarouselItems([...physicalGameGrid.querySelectorAll('.physical-game-item[data-loop-set="center"]')])
  const appendItems = getVisiblePhysicalCarouselItems([...physicalGameGrid.querySelectorAll('.physical-game-item[data-loop-set="append"]')])

  if (!prependItems.length || !centerItems.length || !appendItems.length) {
    return null
  }

  const prependFirst = prependItems[0]
  const centerFirst = centerItems[0]
  const appendFirst = appendItems[0]
  const setWidth = appendFirst.offsetLeft - centerFirst.offsetLeft

  if (!Number.isFinite(setWidth) || setWidth <= 0) {
    return null
  }

  return {
    prependItems,
    centerItems,
    appendItems,
    prependFirst,
    centerFirst,
    appendFirst,
    setWidth
  }
}

function clearPhysicalCarouselLoopSettleTimer() {
  if (!physicalCarouselLoopSettleTimer) return
  clearTimeout(physicalCarouselLoopSettleTimer)
  physicalCarouselLoopSettleTimer = null
}

function schedulePhysicalCarouselLoopNormalize(closestItem) {
  clearPhysicalCarouselLoopSettleTimer()

  if (!isPhysicalCarouselMode() || !physicalGameGrid || !closestItem || physicalCarouselLoopJumping) {
    return
  }

  const loopSet = closestItem.dataset.loopSet || 'center'
  if (loopSet === 'center') return

  const snapshotKey = `${loopSet}:${closestItem.dataset.carouselIndex || ''}`

  physicalCarouselLoopSettleTimer = setTimeout(() => {
    physicalCarouselLoopSettleTimer = null

    if (physicalCarouselLoopJumping) return

    const settledItem = getPhysicalCarouselClosestItem()
    if (!settledItem) return

    const settledLoopSet = settledItem.dataset.loopSet || 'center'
    const settledKey = `${settledLoopSet}:${settledItem.dataset.carouselIndex || ''}`

    if (settledKey !== snapshotKey) {
      if (settledLoopSet !== 'center') {
        schedulePhysicalCarouselLoopNormalize(settledItem)
      }
      return
    }

    normalizePhysicalCarouselLoop(settledItem)
  }, 96)
}

function normalizePhysicalCarouselLoop(closestItem) {
  if (!isPhysicalCarouselMode() || !physicalGameGrid || !closestItem || physicalCarouselLoopJumping) {
    return
  }

  const loopSet = closestItem.dataset.loopSet || 'center'
  if (loopSet === 'center') return

  const metrics = getPhysicalCarouselLoopMetrics()
  if (!metrics) return

  const targetIndex = Number.parseInt(closestItem.dataset.carouselIndex || '-1', 10)
  const targetItem = metrics.centerItems[targetIndex]

  if (!targetItem) return

  const centeredLeft = getPhysicalCarouselCenteredLeft(closestItem)
  if (Math.abs(physicalGameGrid.scrollLeft - centeredLeft) > Math.max(12, closestItem.offsetWidth * 0.08)) {
    return
  }

  clearPhysicalCarouselLoopSettleTimer()
  physicalCarouselLoopJumping = true
  physicalGameGrid.classList.add('is-loop-resetting')
  physicalGameGrid.scrollLeft = getPhysicalCarouselCenteredLeft(targetItem)
  updatePhysicalCarouselActiveIndex(targetIndex, targetItem)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      physicalGameGrid.classList.remove('is-loop-resetting')
      setTimeout(() => {
        physicalCarouselLoopJumping = false
      }, 40)
    })
  })
}

function handlePhysicalCarouselScroll() {
  if (!isPhysicalCarouselMode() || !physicalGameGrid) return
  if (physicalCarouselScrollTicking) return

  physicalCarouselScrollTicking = true

  requestAnimationFrame(() => {
    const closestItem = getPhysicalCarouselClosestItem()
    const closestIndex = getPhysicalCarouselClosestIndex()
    updatePhysicalCarouselActiveIndex(closestIndex, closestItem)
    schedulePhysicalCarouselLoopNormalize(closestItem)
    physicalCarouselScrollTicking = false
  })
}

function syncPhysicalCarousel(options = {}) {
  if (!physicalGameGrid) return

  const { align = false } = options
  const shouldUseCarousel = isPhysicalCarouselMode()

  clearPhysicalCarouselLoopSettleTimer()
  physicalCarouselLoopJumping = false
  physicalGameGrid.classList.remove('is-loop-resetting')

  ensurePhysicalCarouselLoop()

  const originalItems = getPhysicalCarouselOriginalItems()

  document.body.classList.toggle('physical-carousel-mode', shouldUseCarousel)

  if (physicalCarouselHud) {
    physicalCarouselHud.setAttribute('aria-hidden', shouldUseCarousel ? 'false' : 'true')
  }

  if (!originalItems.length) return

  if (!physicalCarouselDots || physicalCarouselDots.children.length !== originalItems.length) {
    buildPhysicalCarouselDots()
  }

  const safeIndex = Math.min(physicalCarouselActiveIndex, originalItems.length - 1)
  updatePhysicalCarouselActiveIndex(safeIndex, originalItems[safeIndex] || null)

  if (shouldUseCarousel) {
    if (align || screens.physical?.classList.contains('active')) {
      requestAnimationFrame(() => {
        scrollToPhysicalCarouselIndex(safeIndex, 'auto')
      })
    }
    return
  }

  if (physicalGameGrid.scrollLeft !== 0) {
    physicalGameGrid.scrollLeft = 0
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

function updateRaceTrackZoomButton() {
  if (!raceTrackZoomBtn) return

  raceTrackZoomBtn.setAttribute('aria-pressed', raceTrackZoomed ? 'true' : 'false')
  raceTrackZoomBtn.textContent = raceTrackZoomed ? '원래 크기로' : '크게 보기'
}

function updateRaceTrackZoomLayout() {
  if (!raceTrackWrap) return

  if (raceTrackZoomed) {
    raceTrackWrap.style.setProperty('--race-track-zoom-lane-count', String(Math.max(1, raceHorses.length || 1)))
  } else {
    raceTrackWrap.style.removeProperty('--race-track-zoom-lane-count')
  }

  raceHorses.forEach((horse) => updateHorsePosition(horse))
}

function closeRaceTrackZoom() {
  if (!raceCardScreen) return

  raceTrackZoomed = false
  raceCardScreen.classList.remove('race-track-zoomed')
  document.body.classList.remove('race-track-zoom-lock')
  raceTrackZoomBackdrop?.classList.remove('is-active')
  if (raceTrackZoomBackdrop) {
    raceTrackZoomBackdrop.setAttribute('aria-hidden', 'true')
  }

  updateRaceTrackZoomLayout()
  updateRaceTrackZoomButton()
}

function openRaceTrackZoom() {
  if (!raceCardScreen || !raceTrackWrap) return

  raceTrackZoomed = true
  raceCardScreen.classList.add('race-track-zoomed')
  document.body.classList.add('race-track-zoom-lock')
  raceTrackZoomBackdrop?.classList.add('is-active')
  if (raceTrackZoomBackdrop) {
    raceTrackZoomBackdrop.setAttribute('aria-hidden', 'false')
  }

  requestAnimationFrame(() => {
    updateRaceTrackZoomLayout()
  })

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      updateRaceTrackZoomLayout()
    })
  })

  updateRaceTrackZoomButton()
}

function toggleRaceTrackZoom() {
  if (raceTrackZoomed) {
    closeRaceTrackZoom()
    return
  }
  openRaceTrackZoom()
}

function updateRouletteStageZoomButton() {
  if (!rouletteStageZoomBtn) return

  rouletteStageZoomBtn.setAttribute('aria-pressed', rouletteStageZoomed ? 'true' : 'false')
  rouletteStageZoomBtn.textContent = rouletteStageZoomed ? '원래 크기로' : '크게 보기'
}

function updateRouletteStageZoomLayout() {
  if (!navalBoard || !navalBoardWrap) return

  syncRouletteMapLayoutVars()
}

function closeRouletteStageZoom() {
  if (!rouletteCardScreen) return

  rouletteStageZoomed = false
  rouletteCardScreen.classList.remove('roulette-stage-zoomed')
  document.body.classList.remove('roulette-stage-zoom-lock')
  rouletteStageZoomBackdrop?.classList.remove('is-active')
  if (rouletteStageZoomBackdrop) {
    rouletteStageZoomBackdrop.setAttribute('aria-hidden', 'true')
  }

  requestAnimationFrame(() => {
    updateRouletteStageZoomLayout()
  })
  updateRouletteStageZoomButton()
}

function openRouletteStageZoom() {
  if (!rouletteCardScreen || !navalBoardCard || !navalBoardWrap) return

  rouletteStageZoomed = true
  rouletteCardScreen.classList.add('roulette-stage-zoomed')
  document.body.classList.add('roulette-stage-zoom-lock')
  rouletteStageZoomBackdrop?.classList.add('is-active')
  if (rouletteStageZoomBackdrop) {
    rouletteStageZoomBackdrop.setAttribute('aria-hidden', 'false')
  }

  requestAnimationFrame(() => {
    updateRouletteStageZoomLayout()
  })

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      updateRouletteStageZoomLayout()
    })
  })

  updateRouletteStageZoomButton()
}

function toggleRouletteStageZoom() {
  if (rouletteStageZoomed) {
    closeRouletteStageZoom()
    return
  }
  openRouletteStageZoom()
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

function forceGame6EntryScrollTop() {
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

function forceLadderEntryScrollTop() {
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

function getActiveScreenKey() {
  return Object.entries(screens).find(([, screen]) => screen?.classList.contains('active'))?.[0] || 'home'
}

function getAppHistoryState(screenKey, index = currentHistoryIndex) {
  return {
    appId: APP_HISTORY_ID,
    screen: screenKey,
    index
  }
}

function commitScreenHistory(screenKey, mode = 'push') {
  if (!window.history || typeof window.history.pushState !== 'function') return

  if (mode === 'replace') {
    window.history.replaceState(getAppHistoryState(screenKey, currentHistoryIndex), '')
    return
  }

  if (mode === 'push') {
    currentHistoryIndex += 1
    window.history.pushState(getAppHistoryState(screenKey, currentHistoryIndex), '')
  }
}

function goToPreviousStep(fallbackTarget = 'home') {
  const state = window.history?.state
  const hasAppHistory = state?.appId === APP_HISTORY_ID && Number.isFinite(state.index) && state.index > 0

  if (hasAppHistory) {
    window.history.back()
    return
  }

  showScreen(fallbackTarget, { historyMode: 'replace' })
}

function getPreviousStepFallbackTarget(screenKey = getActiveScreenKey()) {
  switch (screenKey) {
    case 'menu':
      return 'home'
    case 'luck':
      return 'menu'
    case 'physical':
      return 'menu'
    case 'physicalBalloon':
    case 'physicalBomb':
    case 'physicalCircle':
    case 'physicalKeyReact':
      return 'physical'
    case 'game1':
    case 'game2':
    case 'game3':
    case 'game4':
    case 'game5':
    case 'game6':
    case 'game7':
      return 'luck'
    case 'home':
    default:
      return 'home'
  }
}

function updatePrevStepButtons() {
  const activeScreen = getActiveScreenKey()
  const isHomeScreen = activeScreen === 'home'
  const fallbackTarget = getPreviousStepFallbackTarget(activeScreen)
  const buttonLabel = isHomeScreen ? '처음 화면' : '이전으로'

  ;[desktopPrevStepBtn, mobilePrevStepBtn].forEach((button) => {
    if (!button) return

    button.disabled = isHomeScreen
    button.setAttribute('aria-disabled', isHomeScreen ? 'true' : 'false')
    button.setAttribute('aria-label', buttonLabel)
    button.title = buttonLabel
    button.dataset.fallbackTarget = fallbackTarget
  })
}

function showScreen(target, options = {}) {
  if (!screens[target]) return

  const { historyMode = 'push' } = options
  const previousScreenKey = currentScreenKey

  releaseAllFastForward()

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
    closeRaceTrackZoom()
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

  if (target !== 'game5') {
    closeRouletteStageZoom()
    stopNavalGame({ preserveBoard: false })
    setNavalInputLock(false)
  }

  if (target !== 'game6') {
    stopStockGame({ preserveSetup: true })
    setStockInputLock(false)
    setStockSetupLock(false)
  }

  if (target !== 'game7') {
    ladderRunToken += 1
    stopLadderProgressAnimation()
    ladderAutoRunning = false
    ladderActivePlayerId = ''
    setLadderInputLock(false)
  }

  if (target !== 'physicalBalloon') {
    stopBalloonHold()
  }

  if (target !== 'physicalBomb') {
    stopBombPassGame()
  }

  if (target !== 'physicalCircle') {
    stopCircleTapGame({ preservePlayers: true })
  }

  if (target !== 'physicalKeyReact') {
    stopKeyReactGame({ preservePlayers: true })
  }

  if (target === 'luck') {
    syncLuckCarousel({ align: true })
  }

  if (target === 'physical') {
    syncPhysicalCarousel({ align: true })
  }

  if (target === 'game1') {
    ensureGameReady()
  }

  if (target === 'game2') {
    syncRaceMobileLayout()
    ensureRaceReady()
    updateRaceTrackZoomButton()
  }

  if (target === 'game3') {
    ensureBattleReady()
  }

  if (target === 'game4') {
    ensureSimReady()
    syncSimResponsiveLayout()
    forceGame4EntryScrollTop()
  }

  if (target === 'game5') {
    ensureNavalReady()
    updateRouletteStageZoomButton()
  }

  if (target === 'game6') {
    ensureStockReady()
    forceGame6EntryScrollTop()
  }

  if (target === 'game7') {
    ensureLadderReady()
    forceLadderEntryScrollTop()
  }

  if (target === 'physicalBalloon') {
    ensureBalloonReady()
    forceScrollToTop()
  }

  if (target === 'physicalBomb') {
    ensureBombPassReady()
    forceScrollToTop()
  }

  if (target === 'physicalCircle') {
    ensureCircleTapReady()
    forceScrollToTop()
  }

  if (target === 'physicalKeyReact') {
    ensureKeyReactReady()
    forceScrollToTop()
  }

  document.body.classList.toggle('app-active-game', /^game\d+$/.test(target) || target === 'physicalBalloon' || target === 'physicalBomb' || target === 'physicalCircle' || target === 'physicalKeyReact')
  updateOrientationGate()

  currentScreenKey = target
  updatePrevStepButtons()

  if (historyMode === 'replace') {
    commitScreenHistory(target, 'replace')
  } else if (historyMode === 'push' && target !== previousScreenKey) {
    commitScreenHistory(target, 'push')
  }
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
  const initialCanvasPixelRatio = getCanvasPixelRatio()

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
      pixelRatio: initialCanvasPixelRatio
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
  releaseFastForward('game1')
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
  releaseFastForward('game1')
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
  const countdownStepDelay = getScaledDelay(1000, 'game1', 120)

  countdownValues.forEach((value, index) => {
    const timer = setTimeout(() => {
      if (statusText) {
        statusText.textContent = `폭탄 폭발까지 ${value}...`
      }
    }, index * countdownStepDelay)
    countdownTimers.push(timer)
  })

  const explodeTimer = setTimeout(() => {
    triggerBombExplosionChain()
  }, countdownStepDelay * countdownValues.length)
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
        }, getScaledDelay(700, 'game1', 120))

        countdownTimers.push(doneTimer)
      }
    }, index * getScaledDelay(160, 'game1', 45))

    countdownTimers.push(timer)
  })
}

function startResultCountdown() {
  if (resultCountdownStarted || finalResultsShown) return

  resultCountdownStarted = true
  clearFinalWatcher()

  const countdownValues = [3, 2, 1]
  const countdownStepDelay = getScaledDelay(1000, 'game1', 120)

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
    }, index * countdownStepDelay)

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
  }, countdownStepDelay * countdownValues.length)

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

  const canvasPixelRatio = getCanvasPixelRatio()

  render.options.pixelRatio = canvasPixelRatio

  if (typeof Render.setPixelRatio === 'function') {
    Render.setPixelRatio(render, canvasPixelRatio)
  }

  if (typeof Render.setSize === 'function') {
    Render.setSize(render, boardWidth, boardHeight)
  } else {
    render.canvas.width = boardWidth * canvasPixelRatio
    render.canvas.height = boardHeight * canvasPixelRatio
    render.canvas.style.width = `${boardWidth}px`
    render.canvas.style.height = `${boardHeight}px`
    render.options.width = boardWidth
    render.options.height = boardHeight
    render.bounds.max.x = boardWidth
    render.bounds.max.y = boardHeight
    render.context.setTransform(canvasPixelRatio, 0, 0, canvasPixelRatio, 0, 0)
  }

  slotOverlay.style.left = `${currentBoardPadding}px`
  slotOverlay.style.right = `${currentBoardPadding}px`
  slotOverlay.style.bottom = `${S(16)}px`
  slotOverlay.style.height = `${clampValue(boardHeight * 0.16, S(74), S(112))}px`

  const game1Theme = getGame1BoardTheme()

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
      render: { fillStyle: game1Theme.wall }
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
      render: { fillStyle: game1Theme.wall }
    }
  )

  const floor = Bodies.rectangle(boardWidth / 2, floorY, boardWidth, wallThickness, {
    isStatic: true,
    restitution: 0.15,
    render: { fillStyle: game1Theme.floor }
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
        fillStyle: game1Theme.wallSpinner,
        strokeStyle: game1Theme.wallSpinnerStroke,
        lineWidth: Math.max(1, S(2))
      }
    })

    const rightSpinner = Bodies.rectangle(rightX, y, barThickness, barLength, {
      isStatic: true,
      restitution: 1.22,
      friction: 0,
      frictionStatic: 0,
      render: {
        fillStyle: game1Theme.wallSpinner,
        strokeStyle: game1Theme.wallSpinnerStroke,
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
        render: { fillStyle: game1Theme.divider }
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
        fillStyle: game1Theme.guidePeg,
        strokeStyle: game1Theme.guidePegStroke,
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
          fillStyle: isChaosRow ? game1Theme.pegChaos : row % 2 === 0 ? game1Theme.pegEven : game1Theme.pegOdd,
          strokeStyle: game1Theme.pegStroke,
          lineWidth: Math.max(1, S(2))
        }
      })

      worldBodies.push(peg)
    }
  }

  const horizontalMoverConfigs = [
    { x: boardWidth * 0.16, y: boardHeight * 0.22, w: S(78), h: S(12), ax: playableWidth * 0.06, ay: S(4), speed: 0.0017, phase: 0.2, color: game1Theme.moverPalette[0] },
    { x: boardWidth * 0.34, y: boardHeight * 0.31, w: S(82), h: S(12), ax: playableWidth * 0.07, ay: S(5), speed: 0.00155, phase: 1.0, color: game1Theme.moverPalette[1] },
    { x: boardWidth * 0.50, y: boardHeight * 0.42, w: S(88), h: S(12), ax: playableWidth * 0.09, ay: S(6), speed: 0.0014, phase: 1.8, color: game1Theme.moverPalette[0] },
    { x: boardWidth * 0.66, y: boardHeight * 0.31, w: S(82), h: S(12), ax: playableWidth * 0.07, ay: S(5), speed: 0.0016, phase: 2.5, color: game1Theme.moverPalette[1] },
    { x: boardWidth * 0.84, y: boardHeight * 0.22, w: S(78), h: S(12), ax: playableWidth * 0.06, ay: S(4), speed: 0.00175, phase: 3.0, color: game1Theme.moverPalette[0] },
    { x: boardWidth * 0.14, y: boardHeight * 0.56, w: S(72), h: S(12), ax: playableWidth * 0.05, ay: S(5), speed: 0.0019, phase: 0.7, color: game1Theme.moverPalette[1] },
    { x: boardWidth * 0.86, y: boardHeight * 0.56, w: S(72), h: S(12), ax: playableWidth * 0.05, ay: S(5), speed: 0.00195, phase: 2.1, color: game1Theme.moverPalette[2] }
  ]

  horizontalMoverConfigs.forEach((cfg, index) => {
    const mover = Bodies.rectangle(cfg.x, cfg.y, cfg.w, cfg.h, {
      isStatic: true,
      chamfer: { radius: S(6) },
      restitution: 1.08,
      render: {
        fillStyle: cfg.color,
        strokeStyle: game1Theme.moverStroke,
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
      fillStyle: game1Theme.bumperPalette[0],
      strokeStyle: game1Theme.bumperStroke,
      lineWidth: Math.max(1, S(2))
    }
  })

  const spinnerRightOuter = Bodies.rectangle(boardWidth * 0.80, boardHeight * 0.46, S(14), S(92), {
    isStatic: true,
    chamfer: { radius: S(7) },
    restitution: 1.1,
    render: {
      fillStyle: game1Theme.bumperPalette[1],
      strokeStyle: game1Theme.bumperStroke,
      lineWidth: Math.max(1, S(2))
    }
  })

  const spinnerLeftInner = Bodies.rectangle(boardWidth * 0.30, boardHeight * 0.60, S(14), S(82), {
    isStatic: true,
    chamfer: { radius: S(7) },
    restitution: 1.08,
    render: {
      fillStyle: game1Theme.bumperPalette[2],
      strokeStyle: game1Theme.bumperStroke,
      lineWidth: Math.max(1, S(2))
    }
  })

  const spinnerRightInner = Bodies.rectangle(boardWidth * 0.70, boardHeight * 0.60, S(14), S(82), {
    isStatic: true,
    chamfer: { radius: S(7) },
    restitution: 1.08,
    render: {
      fillStyle: game1Theme.bumperPalette[3],
      strokeStyle: game1Theme.bumperStroke,
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
    { x: boardWidth * 0.10, y: boardHeight * 0.17, color: game1Theme.bumperPalette[0], phase: 0.3, ax: S(20), ay: S(7) },
    { x: boardWidth * 0.24, y: boardHeight * 0.27, color: game1Theme.bumperPalette[1], phase: 1.1, ax: S(18), ay: S(8) },
    { x: boardWidth * 0.50, y: boardHeight * 0.20, color: game1Theme.bumperPalette[2], phase: 2.0, ax: S(14), ay: S(6) },
    { x: boardWidth * 0.76, y: boardHeight * 0.27, color: game1Theme.bumperPalette[3], phase: 2.8, ax: S(18), ay: S(8) },
    { x: boardWidth * 0.90, y: boardHeight * 0.17, color: game1Theme.bumperPalette[0], phase: 3.4, ax: S(20), ay: S(7) },
    { x: boardWidth * 0.12, y: boardHeight * 0.48, color: game1Theme.bumperPalette[1], phase: 0.9, ax: S(16), ay: S(9) },
    { x: boardWidth * 0.88, y: boardHeight * 0.48, color: game1Theme.bumperPalette[2], phase: 2.6, ax: S(16), ay: S(9) }
  ]

  bumperConfigs.forEach((cfg, index) => {
    const bumper = Bodies.circle(cfg.x, cfg.y, S(16), {
      isStatic: true,
      restitution: 1.15,
      render: {
        fillStyle: cfg.color,
        strokeStyle: game1Theme.bumperStroke,
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
    slotBox.style.background = isDarkThemeEnabled()
      ? `linear-gradient(180deg, ${color}d9 0%, ${color}66 42%, rgba(8,16,29,0.96) 100%)`
      : `linear-gradient(180deg, ${color} 0%, rgba(255,255,255,0.48) 100%)`
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
    const palette = getBallPaletteByTheme()
    const color = palette[Math.floor(Math.random() * palette.length)]
    const game1Theme = getGame1BoardTheme()
    const ball = Bodies.circle(x, y, S(4.5), {
      restitution: rand(0.42, 0.6),
      friction: 0.002,
      frictionAir: 0.0008,
      density: 0.0018,
      render: {
        fillStyle: color,
        strokeStyle: game1Theme.ballStroke,
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
  let nextIndex = 0

  const scheduleNextSpawn = (delay = 0) => {
    const timer = setTimeout(() => {
      if (nextIndex >= mixedOrder.length) return

      const isBomb = mixedOrder[nextIndex]
      nextIndex += 1

      const x = S(30) + Math.random() * (boardWidth - S(60))
      const y = S(22) + Math.random() * S(12)

      createBall(x, y, { isBomb })
      spawned += 1

      if (statusText) {
        statusText.textContent = `구슬이 떨어지는 중... ${spawned}/${totalDropCount}`
      }

      if (spawned >= totalDropCount) {
        roundSpawnComplete = true
        if (statusText) {
          statusText.textContent = `구슬 ${normalBallCount}개 + 폭탄 ${BOMB_COUNT}개 투하 완료. 멈추는 중...`
        }
        startSettleWatcher()
        return
      }

      scheduleNextSpawn(getScaledDelay(SPAWN_INTERVAL_MS, 'game1', 4))
    }, delay)

    spawnTimers.push(timer)
  }

  scheduleNextSpawn(0)
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

  if (!hasAtLeastTwoUniqueGame1Participants(parsed.slots)) {
    showMinParticipantsPopup(MAX_SLOT_COUNT)
    return
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

function getScaledDelay(baseDelay, gameKey, minDelay = 50) {
  return Math.max(minDelay, baseDelay / getFastForwardMultiplier(gameKey))
}

function getFastForwardMultiplier(gameKey) {
  return fastForwardStates[gameKey]?.active ? FAST_FORWARD_MULTIPLIER : 1
}

function isFastForwardEligible(gameKey) {
  switch (gameKey) {
    case 'game1':
      return false
    case 'game2':
      return screens.game2?.classList.contains('active') && raceRunning && !raceFinished
    case 'game4':
      return screens.game4?.classList.contains('active') && simBattleRunning && !simBattleFinished
    case 'game5':
      return screens.game5?.classList.contains('active') && navalRunning && !navalFinished
    default:
      return false
  }
}

function syncFastForwardRuntime(gameKey) {
  const multiplier = getFastForwardMultiplier(gameKey)

  if (gameKey === 'game1' && engine) {
    engine.timing.timeScale = multiplier
  }

  if (gameKey === 'game4' && simArenaEngine) {
    simArenaEngine.timing.timeScale = multiplier
  }
}


function isFastForwardBlockedGame(gameKey) {
  return gameKey === 'game1' && screens.game1?.classList.contains('active') && hasLiveRound()
}

function setFastForwardBlockedNotice(gameKey, isActive) {
  const state = fastForwardStates[gameKey]
  if (!state) return

  state.blockedNotice = Boolean(isActive) && isFastForwardBlockedGame(gameKey)

  if (state.target) {
    state.target.classList.toggle('is-fast-forward-blocked', state.blockedNotice)
    if (state.blockedNotice) {
      state.target.setAttribute('data-fast-forward-label', FAST_FORWARD_BLOCKED_MESSAGE)
    } else if (!state.active) {
      state.target.removeAttribute('data-fast-forward-label')
    }
  }
}

function setFastForwardActive(gameKey, isActive) {
  const state = fastForwardStates[gameKey]
  if (!state) return

  const nextActive = Boolean(isActive) && isFastForwardEligible(gameKey)
  state.active = nextActive

  if (nextActive) {
    state.blockedNotice = false
  }

  if (state.target) {
    state.target.classList.toggle('is-fast-forwarding', nextActive)
    if (nextActive) {
      state.target.setAttribute('data-fast-forward-label', `⏩ 빨리감기 x${FAST_FORWARD_MULTIPLIER}`)
    } else if (!state.blockedNotice) {
      state.target.removeAttribute('data-fast-forward-label')
    }
  }

  syncFastForwardRuntime(gameKey)

  if (gameKey === 'game5' && navalRunning && !navalFinished && navalBombTimer) {
    clearTimeout(navalBombTimer)
    navalBombTimer = setTimeout(executeNavalBombTurn, getScaledDelay(140, 'game5', 50))
  }
}

function clearFastForwardHold(gameKey) {
  const state = fastForwardStates[gameKey]
  if (!state) return

  if (state.timer) {
    clearTimeout(state.timer)
    state.timer = null
  }

  state.pointerId = null
}

function releaseFastForward(gameKey) {
  clearFastForwardHold(gameKey)
  setFastForwardActive(gameKey, false)
  setFastForwardBlockedNotice(gameKey, false)
}

function releaseAllFastForward() {
  releaseFastForward('game1')
  releaseFastForward('game2')
  releaseFastForward('game4')
  releaseFastForward('game5')
}

function shouldIgnoreFastForwardPointerEvent(event) {
  const target = event?.target
  if (!(target instanceof Element)) return false

  return Boolean(
    target.closest(
      'button, input, textarea, select, a, [role="button"], .race-track-zoom-btn, .roulette-stage-zoom-btn, .sim-arena-zoom-btn, .back-btn, .action-btn, .utility-btn'
    )
  )
}

function stopZoomControlEvent(event) {
  event.stopPropagation()
}

function bindFastForwardTarget(gameKey) {
  const state = fastForwardStates[gameKey]
  const target = state?.target
  if (!state || !target) return

  const endHold = (event) => {
    if (state.pointerId !== null && event?.pointerId !== undefined && event.pointerId !== state.pointerId) {
      return
    }

    releaseFastForward(gameKey)

    if (event?.pointerId !== undefined && typeof target.releasePointerCapture === 'function') {
      try {
        if (target.hasPointerCapture?.(event.pointerId)) {
          target.releasePointerCapture(event.pointerId)
        }
      } catch (error) {}
    }
  }

  target.addEventListener('pointerdown', (event) => {
    if (shouldIgnoreFastForwardPointerEvent(event)) return

    const blockedGame = isFastForwardBlockedGame(gameKey)
    if (!blockedGame && !isFastForwardEligible(gameKey)) return

    clearFastForwardHold(gameKey)
    state.pointerId = event.pointerId

    if (typeof target.setPointerCapture === 'function') {
      try {
        target.setPointerCapture(event.pointerId)
      } catch (error) {}
    }

    state.timer = setTimeout(() => {
      state.timer = null
      if (state.pointerId !== event.pointerId) return

      if (isFastForwardBlockedGame(gameKey)) {
        setFastForwardBlockedNotice(gameKey, true)
        return
      }

      if (isFastForwardEligible(gameKey)) {
        setFastForwardActive(gameKey, true)
      }
    }, FAST_FORWARD_HOLD_MS)

    event.preventDefault()
  }, { passive: false })

  target.addEventListener('pointerup', endHold)
  target.addEventListener('pointercancel', endHold)
  target.addEventListener('pointerleave', endHold)
  target.addEventListener('contextmenu', (event) => {
    event.preventDefault()
  })
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
  const now = raceElapsedMs
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

  const stageHead = document.createElement('div')
  stageHead.className = 'race-track-stage-head'
  stageHead.innerHTML = `
    <div class="race-track-stage-copy">
      <h3 class="race-track-stage-title">경주 트랙</h3>
      <p class="race-track-stage-desc">경주가 시작되면 각 말이 자동으로 달리고, 결승 통과 순서대로 순위가 확정된다.</p>
    </div>
  `

  const stageActions = document.createElement('div')
  stageActions.className = 'race-track-stage-actions'
  if (raceTrackZoomBtn) {
    stageActions.appendChild(raceTrackZoomBtn)
  }
  stageHead.appendChild(stageActions)
  raceTrackWrap.appendChild(stageHead)

  const laneStack = document.createElement('div')
  laneStack.className = 'race-track-lanes'
  raceTrackWrap.appendChild(laneStack)

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

    laneStack.appendChild(lane)
    updateHorsePosition(horse)
  })
}

function updateHorsePosition(horse) {
  if (!horse.runnerEl) return

  const percent = Math.min(94, (horse.progress / RACE_DISTANCE) * 94)
  const percentText = `${percent.toFixed(3)}%`

  if (horse.runnerEl.dataset.progress !== percentText) {
    horse.runnerEl.style.left = percentText
    horse.runnerEl.dataset.progress = percentText
  }

  if (horse.statusEl && horse.statusEl.textContent !== horse.currentStatus) {
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
  updateRaceTrackZoomLayout()
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
  releaseFastForward('game2')
  raceRunning = false
  raceLastTimestamp = 0
  raceLastRankingRenderAt = 0

  if (raceAnimationFrame) {
    cancelAnimationFrame(raceAnimationFrame)
    raceAnimationFrame = null
  }

  if (raceEventTimer) {
    clearTimeout(raceEventTimer)
    raceEventTimer = null
  }

  if (raceCommentaryTimer) {
    clearTimeout(raceCommentaryTimer)
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

  if (parsed.horses.length < 2) {
    showMinParticipantsPopup(RACE_MAX_COUNT)
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

function scheduleRaceEventLoop() {
  if (!raceRunning || raceFinished) return

  raceEventTimer = setTimeout(() => {
    if (!raceRunning || raceFinished) return
    triggerRaceEvent()
    scheduleRaceEventLoop()
  }, getScaledDelay(760, 'game2', 180))
}

function scheduleRaceCommentaryLoop() {
  if (!raceRunning || raceFinished) return

  raceCommentaryTimer = setTimeout(() => {
    if (!raceRunning || raceFinished) return
    pushAutoCommentary()
    scheduleRaceCommentaryLoop()
  }, getScaledDelay(1180, 'game2', 240))
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
  const now = raceElapsedMs
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

  const speedMultiplier = getFastForwardMultiplier('game2')
  const rawDt = Math.min(0.05, (timestamp - raceLastTimestamp) / 1000)
  const dt = rawDt * speedMultiplier
  raceLastTimestamp = timestamp
  raceElapsedMs += dt * 1000
  const raceNow = raceElapsedMs

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

    if (horse.eventUntil && raceNow > horse.eventUntil) {
      horse.bonusSpeed = 0
      horse.slowPenalty = 0
      horse.eventUntil = 0
      if (!horse.finished) {
        horse.currentStatus = '다그닥'
      }
    }

    if (horse.fallUntil && raceNow > horse.fallUntil) {
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
    const rhythmSwing = Math.sin(raceNow * 0.00195 + horse.tempoSeed) * (2.8 + horse.kickBias * 0.16)
      + Math.cos(raceNow * 0.00112 + horse.strideSeed) * (1.8 + horse.staminaBias * 0.12)
      + Math.sin(raceNow * 0.0026 + horse.burstSeed) * 1.9

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

    if (horse.fallUntil && raceNow < horse.fallUntil) {
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

  if (!raceLastRankingRenderAt || timestamp - raceLastRankingRenderAt >= 120) {
    renderRaceRanking()
    raceLastRankingRenderAt = timestamp
  }

  if (raceFinishOrder.length === raceHorses.length) {
    raceRunning = false
    raceFinished = true
    releaseFastForward('game2')
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
      color: getSimColorForIndex(players.length)
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
  if (!ranking.length) {
    return '<div class="battle-final-popup-empty">결과가 없습니다.</div>'
  }

  return `
    <div class="battle-final-popup-list">
      ${ranking.map((player, index) => {
        return `
          <div class="battle-final-popup-item">
            <div class="battle-final-popup-rank-badge">${index + 1}위</div>
            <div class="battle-final-popup-name">${escapeHtml(player.label)}</div>
            <div class="battle-final-popup-formula">1차: ${escapeHtml(getBattlePhase1FormulaText(player))}</div>
            <div class="battle-final-popup-formula">최종: ${escapeHtml(getBattleFinalFormulaText(player))}</div>
          </div>
        `
      }).join('')}
    </div>
  `
}

function reorderBattleRowsByRanking(ranking) {
  if (!battleTable || !Array.isArray(ranking) || !ranking.length) return

  ranking.forEach((player) => {
    const row = getBattleRowElement(player.id)
    if (!row) return
    battleTable.appendChild(row)
  })
}

function applyBattleFinalCardsToRows(roundPlayers) {
  roundPlayers.forEach((player, index) => {
    player.finalRank = index + 1
    applyBattleFinalRow(player)
  })

  reorderBattleRowsByRanking(roundPlayers)
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
    { icon: '🏆', allowHtml: true, popupClass: 'battle-final-popup' }
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

  if (parsed.players.length < 2) {
    showMinParticipantsPopup(BATTLE_MAX_PLAYERS)
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

function getSimInfoTabButtonsHtml() {
  return `
    <div class="game-info-tabbar" role="tablist" aria-label="볼 배틀 설명 보기 방식">
      <button class="game-info-tab-btn is-active" type="button" role="tab" aria-selected="true" data-info-tab="visual">👀 시각 설명</button>
      <button class="game-info-tab-btn" type="button" role="tab" aria-selected="false" data-info-tab="text">📝 글 설명</button>
    </div>
  `
}

function getSimGameInfoVisualHtml() {
  return `
    <div class="sim-info-visual-wrap">
      <section class="sim-info-hero-note">
        <div class="sim-info-hero-badge">처음 보는 사람도 바로 이해하는 핵심 흐름</div>
        <p><strong>카드 공개 → 충돌 판정 → 체력 감소 → 최후의 1인 우승</strong> 순서만 먼저 짧게 보여준다.</p>
      </section>

      <div class="sim-info-visual-grid">
        <section class="sim-info-visual-card sim-info-visual-card-step1">
          <div class="sim-info-card-head">
            <span class="sim-info-step">1</span>
            <div>
              <h4>시작하면 스탯 카드 4장이 공개된다</h4>
              <p>참가자마다 추가 체력, 공격력, 공격 성공률, 방어력이 랜덤으로 배정된다.</p>
            </div>
          </div>
          <div class="sim-info-scene sim-info-scene-cards" aria-hidden="true">
            <div class="sim-info-player-chip is-pink">홍길동</div>
            <div class="sim-info-card-deck-mini">
              <div class="sim-info-stat-card-mini is-health">
                <span class="sim-info-stat-card-icon">${SIM_STAT_META.health.icon}</span>
                <strong>${SIM_STAT_META.health.short}</strong>
                <span>+43</span>
              </div>
              <div class="sim-info-stat-card-mini is-attack delay-1">
                <span class="sim-info-stat-card-icon">${SIM_STAT_META.attack.icon}</span>
                <strong>${SIM_STAT_META.attack.short}</strong>
                <span>18</span>
              </div>
              <div class="sim-info-stat-card-mini is-accuracy delay-2">
                <span class="sim-info-stat-card-icon">${SIM_STAT_META.accuracy.icon}</span>
                <strong>${SIM_STAT_META.accuracy.short}</strong>
                <span>79%</span>
              </div>
              <div class="sim-info-stat-card-mini is-defense delay-3">
                <span class="sim-info-stat-card-icon">${SIM_STAT_META.defense.icon}</span>
                <strong>${SIM_STAT_META.defense.short}</strong>
                <span>50%</span>
              </div>
            </div>
            <div class="sim-info-ready-pill">전투시작 가능</div>
          </div>
        </section>

        <section class="sim-info-visual-card">
          <div class="sim-info-card-head">
            <span class="sim-info-step">2</span>
            <div>
              <h4>공끼리 부딪히면 바로 전투 판정</h4>
              <p>맞으면 체력이 줄고, 체력바와 숫자가 즉시 바뀐다.</p>
            </div>
          </div>
          <div class="sim-info-scene sim-info-scene-duel" aria-hidden="true">
            <div class="sim-info-arena-shell">
              <div class="sim-info-arena-grid"></div>
              <div class="sim-info-demo-ball is-pink duel-left"></div>
              <div class="sim-info-demo-ball is-mint duel-right"></div>
              <div class="sim-info-hit-spark"></div>
              <div class="sim-info-hit-badge">충돌!</div>
              <div class="sim-info-health-label duel-label-left">
                <strong>홍길동</strong>
                <span class="sim-info-health-values">93/93</span>
                <i class="sim-info-health-track"><b class="sim-info-health-fill is-full"></b></i>
              </div>
              <div class="sim-info-health-label duel-label-right">
                <strong>김아무개</strong>
                <span class="sim-info-health-values"><em class="hp-before">76/76</em><em class="hp-after">61/76</em></span>
                <i class="sim-info-health-track"><b class="sim-info-health-fill is-drop"></b></i>
              </div>
            </div>
          </div>
        </section>

        <section class="sim-info-visual-card is-wide">
          <div class="sim-info-card-head">
            <span class="sim-info-step">3</span>
            <div>
              <h4>스탯 4개 의미를 한 번에 이해하기</h4>
              <p>특히 <strong>방어력은 피해량 감소가 아니라 상대 공격 성공률 자체를 낮추는 스탯</strong>이다.</p>
            </div>
          </div>
          <div class="sim-info-scene sim-info-scene-stats" aria-hidden="true">
            <div class="sim-info-stat-meaning-grid">
              <article class="sim-info-stat-meaning-card is-health">
                <header><span>${SIM_STAT_META.health.icon}</span><strong>${SIM_STAT_META.health.label}</strong></header>
                <div class="sim-info-mini-note">기본 체력 50에 더해져 오래 버틴다</div>
                <div class="sim-info-big-hp-track"><b class="sim-info-big-hp-base"></b><b class="sim-info-big-hp-bonus"></b></div>
                <div class="sim-info-mini-formula">50 → 93</div>
              </article>
              <article class="sim-info-stat-meaning-card is-attack">
                <header><span>${SIM_STAT_META.attack.icon}</span><strong>${SIM_STAT_META.attack.label}</strong></header>
                <div class="sim-info-mini-note">공격이 맞았을 때 더 크게 깎는다</div>
                <div class="sim-info-attack-demo"><span class="sim-info-attack-hit">-18</span></div>
                <div class="sim-info-mini-formula">명중 시 피해량 강화</div>
              </article>
              <article class="sim-info-stat-meaning-card is-accuracy">
                <header><span>${SIM_STAT_META.accuracy.icon}</span><strong>${SIM_STAT_META.accuracy.label}</strong></header>
                <div class="sim-info-mini-note">공격이 실제로 들어갈 확률이다</div>
                <div class="sim-info-accuracy-demo"><span class="is-hit">명중!</span><span class="is-miss">빗나감</span></div>
                <div class="sim-info-mini-formula">수치가 높을수록 더 잘 맞음</div>
              </article>
              <article class="sim-info-stat-meaning-card is-defense">
                <header><span>${SIM_STAT_META.defense.icon}</span><strong>${SIM_STAT_META.defense.label}</strong></header>
                <div class="sim-info-mini-note">예: A공의 공격 성공률이 50%, B공의 방어력이 50%라면</div>
                <div class="sim-info-defense-formula">A공 최종 공격 성공률 = 25%</div>
                <div class="sim-info-mini-formula">50% × (1 - 0.50) = 25% · 피해량 감소가 아니라 상대 명중률 감소</div>
              </article>
            </div>
          </div>
        </section>

        <section class="sim-info-visual-card is-wide">
          <div class="sim-info-card-head">
            <span class="sim-info-step">4</span>
            <div>
              <h4>마지막까지 남은 1명이 우승</h4>
              <p>체력이 0이 되면 탈락하고, 끝까지 남은 참가자가 최종 1위가 된다.</p>
            </div>
          </div>
          <div class="sim-info-scene sim-info-scene-finale" aria-hidden="true">
            <div class="sim-info-arena-shell is-finale">
              <div class="sim-info-demo-ball is-pink finale-ball-1"></div>
              <div class="sim-info-demo-ball is-mint finale-ball-2 is-faded"></div>
              <div class="sim-info-demo-ball is-sky finale-ball-3 is-faded"></div>
              <div class="sim-info-health-label finale-label is-winner">
                <strong>홍길동</strong>
                <span class="sim-info-health-values">37/93</span>
                <i class="sim-info-health-track"><b class="sim-info-health-fill is-winner"></b></i>
              </div>
              <div class="sim-info-health-label finale-label is-eliminated">김아무개 탈락</div>
              <div class="sim-info-winner-crown">👑 1위</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `
}

function getSimGameInfoTextHtml() {
  return `
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
        <li><strong>${SIM_STAT_META.health.icon} ${SIM_STAT_META.health.label}</strong>: 기본 체력 50에 더해지는 값이다. 최종 체력은 <strong>50 + 추가 체력</strong>으로 계산된다.</li>
        <li><strong>${SIM_STAT_META.attack.icon} ${SIM_STAT_META.attack.label}</strong>: 충돌 시 상대에게 줄 수 있는 기본 피해량에 영향을 준다.</li>
        <li><strong>${SIM_STAT_META.accuracy.icon} ${SIM_STAT_META.accuracy.label}</strong>: 충돌 순간 공격 판정이 실제로 들어갈 확률이다. 수치가 높을수록 공격이 더 잘 맞는다.</li>
        <li><strong>${SIM_STAT_META.defense.icon} ${SIM_STAT_META.defense.label}</strong>: 상대의 <strong>공격 성공률 자체를 낮추는</strong> 능력치이다. 피해량을 깎는 스탯이 아니라 상대 명중 확률에 곱연산으로 적용된다.</li>
        <li><strong>예시</strong>: 상대 공격 성공률이 <strong>50%</strong>이고 내 방어력이 <strong>50%</strong>면, 상대의 실제 공격 성공률은 <strong>25%</strong>가 된다.</li>
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
  `
}

function getSimGameInfoHtml() {
  return `
    <div class="game-info-content game-info-content-sim">
      <p class="game-info-lead">볼 배틀은 참가자마다 총합 100의 스탯을 랜덤 배정한 뒤, 공끼리 충돌할 때마다 즉시 전투 판정이 일어나는 관찰형 생존 게임이다. <strong>시각 설명으로 흐름을 먼저 보고</strong>, 헷갈리는 부분만 글 설명에서 확인하면 된다.</p>
      ${getSimInfoTabButtonsHtml()}
      <div class="game-info-panels">
        <div class="game-info-panel is-active" data-info-panel="visual">${getSimGameInfoVisualHtml()}</div>
        <div class="game-info-panel" data-info-panel="text" hidden>${getSimGameInfoTextHtml()}</div>
      </div>
    </div>
  `
}

function setGameInfoPanel(root, nextTab) {
  if (!root) return

  root.querySelectorAll('.game-info-tab-btn[data-info-tab]').forEach((button) => {
    const isActive = button.dataset.infoTab === nextTab
    button.classList.toggle('is-active', isActive)
    button.setAttribute('aria-selected', isActive ? 'true' : 'false')
  })

  root.querySelectorAll('.game-info-panel[data-info-panel]').forEach((panel) => {
    const isActive = panel.dataset.infoPanel === nextTab
    panel.classList.toggle('is-active', isActive)
    panel.hidden = !isActive
  })
}

function handleGameInfoTabClick(event) {
  const button = event.target instanceof Element ? event.target.closest('.game-info-tab-btn[data-info-tab]') : null
  if (!button) return

  const root = button.closest('.game-info-content')
  if (!root) return

  setGameInfoPanel(root, button.dataset.infoTab || 'visual')
}

function openSimGameInfo() {
  showPopup('볼 배틀 설명', getSimGameInfoHtml(), {
    icon: '📖',
    allowHtml: true,
    popupClass: 'game-info-popup game-info-popup-sim'
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

function updateSimArenaZoomButton() {
  if (!simArenaZoomBtn) return

  const isBattleView = Boolean(simCardScreen?.classList.contains('sim-view-battle'))
  simArenaZoomBtn.disabled = !isBattleView
  simArenaZoomBtn.setAttribute('aria-pressed', simArenaZoomed ? 'true' : 'false')
  simArenaZoomBtn.textContent = simArenaZoomed ? '원래 크기로' : '크게 보기'
}

function updateSimArenaZoomScale() {
  if (!simArenaWrap) return

  if (!simArenaZoomed || !simArenaZoomStage) {
    simArenaWrap.style.removeProperty('--sim-arena-base-width')
    simArenaWrap.style.removeProperty('--sim-arena-base-height')
    simArenaWrap.style.removeProperty('--sim-arena-zoom-scale')
    return
  }

  const capturedBaseWidth = simArenaZoomBaseRect?.width || 0
  const capturedBaseHeight = simArenaZoomBaseRect?.height || 0
  const baseWidth = Math.max(1, capturedBaseWidth || simArenaWrap.clientWidth || simArenaMeta?.width || 900)
  const baseHeight = Math.max(1, capturedBaseHeight || simArenaWrap.clientHeight || simArenaMeta?.height || 460)
  const stageWidth = Math.max(1, simArenaZoomStage.clientWidth)
  const stageHeight = Math.max(1, simArenaZoomStage.clientHeight)
  const usableStageWidth = stageWidth * 0.94
  const usableStageHeight = stageHeight * 0.92
  const zoomScale = clampValue(Math.min(usableStageWidth / baseWidth, usableStageHeight / baseHeight), 1.12, 2.8)

  simArenaWrap.style.setProperty('--sim-arena-base-width', `${baseWidth}px`)
  simArenaWrap.style.setProperty('--sim-arena-base-height', `${baseHeight}px`)
  simArenaWrap.style.setProperty('--sim-arena-zoom-scale', String(zoomScale))
}

function closeSimArenaZoom() {
  if (!simCardScreen) return

  simArenaZoomed = false
  simArenaZoomBaseRect = null
  simCardScreen.classList.remove('sim-arena-zoomed')
  document.body.classList.remove('sim-arena-zoom-lock')
  simArenaZoomBackdrop?.classList.remove('is-active')
  if (simArenaZoomBackdrop) {
    simArenaZoomBackdrop.setAttribute('aria-hidden', 'true')
  }
  updateSimArenaZoomScale()
  updateSimArenaZoomButton()
}

function openSimArenaZoom() {
  if (!simCardScreen || !simArenaWrap || !simCardScreen.classList.contains('sim-view-battle')) return

  const currentRect = simArenaWrap.getBoundingClientRect()
  simArenaZoomBaseRect = {
    width: Math.max(1, currentRect.width || simArenaWrap.clientWidth || simArenaMeta?.width || 900),
    height: Math.max(1, currentRect.height || simArenaWrap.clientHeight || simArenaMeta?.height || 460)
  }

  simArenaZoomed = true
  simCardScreen.classList.add('sim-arena-zoomed')
  document.body.classList.add('sim-arena-zoom-lock')
  simArenaZoomBackdrop?.classList.add('is-active')
  if (simArenaZoomBackdrop) {
    simArenaZoomBackdrop.setAttribute('aria-hidden', 'false')
  }

  requestAnimationFrame(() => {
    updateSimArenaZoomScale()
  })

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      updateSimArenaZoomScale()
    })
  })

  updateSimArenaZoomButton()
}

function toggleSimArenaZoom() {
  if (simArenaZoomed) {
    closeSimArenaZoom()
    return
  }
  openSimArenaZoom()
}

function setSimViewMode(mode = 'setup') {
  if (!simCardScreen) return
  simCardScreen.classList.remove('sim-view-setup', 'sim-view-battle')
  simCardScreen.classList.add(mode === 'battle' ? 'sim-view-battle' : 'sim-view-setup')
  if (mode !== 'battle') {
    closeSimArenaZoom()
  }
  syncSimResponsiveLayout()
  updateSimArenaZoomButton()
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
      color: getCommonPlayerPaletteByTheme()[players.length % getCommonPlayerPaletteByTheme().length]
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
      showPopup('참가자 수 초과', `볼 배틀은 최대 ${SIM_MAX_PLAYERS}명까지만 참가할 수 있어.`)
    }
    return false
  }

  if (parsed.status === 'DUPLICATE') {
    simStatusText.textContent = '같은 이름은 2번 이상 입력할 수 없다.'
    if (showPopupOnInvalid) {
      showPopup('중복 이름 불가', '볼 배틀은 같은 이름을 중복 등록할 수 없어.')
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

  if (parsed.players.length < 2) {
    showMinParticipantsPopup(SIM_MAX_PLAYERS)
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
  closeSimArenaZoom()

  if (simOverlayRaf) {
    cancelAnimationFrame(simOverlayRaf)
    simOverlayRaf = null
  }
  simOverlayLastPaintAt = 0

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
  releaseFastForward('game4')
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
    simStatusText.textContent = '볼 배틀이 초기화되었다. 다시 시작하면 새 스탯이 배정된다.'
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
      allowHtml: true,
      popupClass: 'sim-map-popup'
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
  const fill = isDarkThemeEnabled() ? '#24344d' : '#eed9c7'
  const stroke = isDarkThemeEnabled() ? '#8fd6ff' : '#fff8ef'
  const lineWidth = isDarkThemeEnabled() ? 2 : 1
  return {
    top: Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true, restitution: 1, render: { fillStyle: fill, strokeStyle: stroke, lineWidth } }),
    bottom: Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true, restitution: 1, render: { fillStyle: fill, strokeStyle: stroke, lineWidth } }),
    left: Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true, restitution: 1, render: { fillStyle: fill, strokeStyle: stroke, lineWidth } }),
    right: Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true, restitution: 1, render: { fillStyle: fill, strokeStyle: stroke, lineWidth } })
  }
}

function applySimBombAppearance(bomb, stage = 0) {
  if (!bomb) return
  const palette = isDarkThemeEnabled()
    ? [
        { fill: '#6b7788', stroke: '#d8ebff', lineWidth: 3 },
        { fill: '#4d5665', stroke: '#bfe3ff', lineWidth: 3 },
        { fill: '#2a313d', stroke: '#8fd6ff', lineWidth: 3 },
        { fill: '#0a0f16', stroke: '#f6c66b', lineWidth: 4 }
      ]
    : [
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

function flashSimBallBody(player, { stroke = null, glowStroke = '#fff7a8', lineWidth = 5, duration = 260 } = {}) {
  stroke = stroke || getSimBallStrokeColor()
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
  label._parts = {
    bar: label.querySelector('.sim-ball-hpbar span'),
    text: label.querySelector('.sim-ball-hptext'),
    place: label.querySelector('.sim-ball-place')
  }
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
        strokeStyle: getSimBallStrokeColor(),
        lineWidth: isDarkThemeEnabled() ? 4 : 3
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
      pixelRatio: getCanvasPixelRatio()
    }
  })

  simArenaRender.canvas.style.position = 'absolute'
  simArenaRender.canvas.style.inset = '0'
  simArenaRender.canvas.style.width = '100%'
  simArenaRender.canvas.style.height = '100%'

  Matter.Render.run(simArenaRender)
  simArenaRunner = Matter.Runner.create()
  Matter.Runner.run(simArenaRunner, simArenaEngine)
  syncFastForwardRuntime('game4')

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

function paintSimArenaOverlay() {
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
    const parts = label._parts || {}

    if (parts.bar) {
      parts.bar.style.width = `${(hpRatio * 100).toFixed(1)}%`
    }
    if (parts.text) {
      const nextText = player.isAlive ? `${Math.max(0, player.currentHp)}/${player.maxHp}` : '탈락'
      if (parts.text.textContent !== nextText) {
        parts.text.textContent = nextText
      }
    }
    if (parts.place) {
      const nextPlaceText = player.finalPlace ? `${player.finalPlace}위` : ''
      if (parts.place.textContent !== nextPlaceText) {
        parts.place.textContent = nextPlaceText
      }
    }

    label.classList.toggle('is-dead', !player.isAlive)
    label.classList.toggle('is-winner', player.finalPlace === 1)

    const x = body.position.x * scaleX
    const y = body.position.y * scaleY
    const offsetY = player.isAlive ? -36 : 16
    const scale = player.isAlive ? 0.96 : 0.8
    label.style.transform = `translate3d(${x}px, ${y + offsetY}px, 0) translate(-50%, -50%) scale(${scale})`
  })
}

function updateSimArenaOverlay(force = false) {
  if (!simArenaRender || !simArenaWrap) return

  const minFrameGap = 1000 / 30
  const now = performance.now()

  if (force || now - simOverlayLastPaintAt >= minFrameGap) {
    simOverlayLastPaintAt = now
    if (simOverlayRaf) {
      cancelAnimationFrame(simOverlayRaf)
      simOverlayRaf = null
    }
    paintSimArenaOverlay()
    return
  }

  if (simOverlayRaf) return

  simOverlayRaf = requestAnimationFrame(() => {
    simOverlayRaf = null
    simOverlayLastPaintAt = performance.now()
    paintSimArenaOverlay()
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

  closeSimArenaZoom()

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

  releaseFastForward('game4')
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
    updateSimArenaOverlay(true)
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
  syncFastForwardRuntime('game4')
  setSimInputLock(true)
  setSimShuffleLock(true)
  updateSimPhase('전투 중')
  renderSimRanking(getSimRankingData())
  updateSimArenaOverlay()

  if (simStatusText) {
    simStatusText.textContent = `${SIM_MAP_OPTIONS[simSelectedMap]?.name || '전투장'} 전투 시작! 공이 부딪히는 순간 즉시 판정되고, 일정 시간이 지나면 안전 구역이 줄어든다.`
  }
}



function setNavalInputLock(isLocked) {
  if (!navalConfigInput) return
  navalConfigInput.disabled = isLocked
  navalConfigInput.style.opacity = isLocked ? '0.65' : '1'
  navalConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
}

function updateNavalDescription() {
  if (!navalDesc) return
  navalDesc.textContent = `하나의 공용 좌표판에 숨겨진 3칸짜리 배 ${navalPlayers.length || 0}척이 배치되고, 좌표 경고 후 폭격이 발생해 최후의 1인을 가린다.`
}

function parseNavalConfigToPlayers(text) {
  const rawItems = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!rawItems.length) {
    return { status: 'EMPTY' }
  }

  if (rawItems.length > NAVAL_MAX_PLAYERS) {
    return { status: 'TOO_MANY', count: rawItems.length }
  }

  const seen = new Set()
  const players = []

  for (const raw of rawItems) {
    if (!raw || raw.includes('*')) {
      return { status: 'INVALID' }
    }

    if (seen.has(raw)) {
      return { status: 'DUPLICATE' }
    }

    seen.add(raw)
    players.push({
      id: `naval-player-${players.length + 1}`,
      label: raw,
      color: getNavalPlayerPaletteByTheme()[players.length % getNavalPlayerPaletteByTheme().length]
    })
  }

  return { status: 'OK', players }
}

function handleNavalParseFailure(parsed, { showPopupOnInvalid = false } = {}) {
  if (!navalStatusText) return false

  if (parsed.status === 'EMPTY') {
    navalStatusText.textContent = '참가자를 먼저 입력해줘. 예: 홍길동, 김아무개, 박철수'
  } else if (parsed.status === 'TOO_MANY') {
    navalStatusText.textContent = `참가자는 최대 ${NAVAL_MAX_PLAYERS}명까지 가능하다.`
    if (showPopupOnInvalid) {
      showPopup('참가자 수 초과', `폭격 해전은 최대 ${NAVAL_MAX_PLAYERS}명까지 참가할 수 있어.`)
    }
  } else if (parsed.status === 'DUPLICATE') {
    navalStatusText.textContent = '같은 이름은 2번 이상 입력할 수 없다.'
    if (showPopupOnInvalid) {
      showPopup('중복 이름 불가', '폭격 해전은 같은 이름을 중복 등록할 수 없어.')
    }
  } else {
    navalStatusText.textContent = '입력 형식을 확인해줘. 예: 홍길동, 김아무개, 박철수'
    if (showPopupOnInvalid) {
      showPopup('입력 확인', '이름만 쉼표로 구분해 적어줘. 예: 홍길동, 김아무개, 박철수')
    }
  }

  return false
}

function getNavalCoordLabel(index) {
  const row = Math.floor(index / NAVAL_BOARD_SIZE)
  const col = index % NAVAL_BOARD_SIZE
  return `${String.fromCharCode(65 + col)}${row + 1}`
}

function createNavalCell(index) {
  const cell = document.createElement('button')
  cell.type = 'button'
  cell.className = 'naval-cell'
  cell.dataset.index = String(index)
  cell.disabled = true
  return cell
}

function renderNavalBoardBase() {
  if (!navalBoard) return

  navalBoard.innerHTML = ''
  if (navalBombLayer) {
    navalBombLayer.innerHTML = ''
  }
  navalBoard.style.setProperty('--naval-board-size', String(NAVAL_BOARD_SIZE))

  for (let index = 0; index < NAVAL_BOARD_SIZE * NAVAL_BOARD_SIZE; index += 1) {
    navalBoard.appendChild(createNavalCell(index))
  }
}

function tryPlaceNavalShips(players) {
  const occupied = new Set()

  const placedPlayers = players.map((player) => ({
    ...player,
    shipIndices: [],
    hitIndices: [],
    remainingHull: NAVAL_SHIP_LENGTH,
    isAlive: true,
    eliminatedOrder: null,
    finalPlace: null
  }))

  for (const player of placedPlayers) {
    let placed = false

    for (let attempt = 0; attempt < 500 && !placed; attempt += 1) {
      const isHorizontal = Math.random() < 0.5
      const startRow = Math.floor(Math.random() * NAVAL_BOARD_SIZE)
      const startCol = Math.floor(Math.random() * NAVAL_BOARD_SIZE)
      const indices = []

      for (let offset = 0; offset < NAVAL_SHIP_LENGTH; offset += 1) {
        const row = startRow + (isHorizontal ? 0 : offset)
        const col = startCol + (isHorizontal ? offset : 0)

        if (row >= NAVAL_BOARD_SIZE || col >= NAVAL_BOARD_SIZE) {
          indices.length = 0
          break
        }

        const index = row * NAVAL_BOARD_SIZE + col
        indices.push(index)
      }

      if (indices.length !== NAVAL_SHIP_LENGTH) continue
      if (indices.some((index) => occupied.has(index))) continue

      indices.forEach((index) => occupied.add(index))
      player.shipIndices = indices
      placed = true
    }

    if (!placed) {
      return null
    }
  }

  return placedPlayers
}

function buildNavalRoundPlayers(players) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const placed = tryPlaceNavalShips(players)
    if (placed) return placed
  }
  return null
}

function setNavalPlayers(players) {
  navalPlayers = players
  if (navalConfigInput) {
    lastNavalValidConfigText = navalConfigInput.value
    lastNavalAppliedRawText = navalConfigInput.value
  }
  updateNavalDescription()
}

function renderNavalLegend() {
  if (!navalLegend || !navalTotalInfo) return

  navalLegend.innerHTML = ''

  const ranking = navalPlayers.length
    ? (navalFinished ? getNavalFinalRanking() : getNavalProvisionalRanking())
    : []

  ranking.forEach((player, index) => {
    const chip = document.createElement('div')
    chip.className = `legend-chip naval-sidebar-rank-chip${index === 0 ? ' top' : ''}${!player.isAlive ? ' is-eliminated' : ''}`
    const statusText = player.isAlive
      ? `남은 선체 ${player.remainingHull ?? NAVAL_SHIP_LENGTH}/${NAVAL_SHIP_LENGTH}`
      : `${player.eliminatedOrder}번째 탈락`

    chip.innerHTML = `
      <span class="naval-sidebar-rank-num">${index + 1}</span>
      <span class="legend-dot" style="background:${player.color}"></span>
      <span class="naval-sidebar-rank-meta">
        <strong>${escapeHtml(player.label)}</strong>
        <small>${statusText}</small>
      </span>
    `
    navalLegend.appendChild(chip)
  })

  navalTotalInfo.textContent = `총 ${navalPlayers.length}명`
}

function renderNavalBoardState() {
  if (!navalBoard) return

  const cells = navalBoard.querySelectorAll('.naval-cell')

  cells.forEach((cell, index) => {
    const hitPlayerId = navalHitMap.get(index)
    const isMiss = navalMissSet.has(index)
    const isLast = navalLastBombIndex === index
    const hitPlayer = hitPlayerId ? navalPlayers.find((player) => player.id === hitPlayerId) : null

    cell.classList.remove('is-miss', 'is-hit', 'is-last-target')
    cell.style.removeProperty('--naval-hit-color')
    cell.textContent = ''

    if (isMiss) {
      cell.classList.add('is-miss')
    }

    if (hitPlayer) {
      cell.classList.add('is-hit')
      cell.style.setProperty('--naval-hit-color', hitPlayer.color)
    }

    if (isLast) {
      cell.classList.add('is-last-target')
    }
  })

  if (navalBoardMeta) {
    navalBoardMeta.textContent = `${NAVAL_BOARD_SIZE} × ${NAVAL_BOARD_SIZE} · 투하 ${navalBombedSet.size}/${NAVAL_BOARD_SIZE * NAVAL_BOARD_SIZE}`
  }
}

function renderNavalLogs() {
  if (!navalLogList) return

  if (!navalLogs.length) {
    navalLogList.innerHTML = '<div class="naval-log-empty">폭격이 시작되면 좌표 로그가 여기에 쌓인다.</div>'
    return
  }

  navalLogList.innerHTML = ''

  navalLogs.forEach((item) => {
    const row = document.createElement('div')
    row.className = `naval-log-item ${item.type ? `type-${item.type}` : ''}`
    row.textContent = item.text
    navalLogList.appendChild(row)
  })
}

function getNavalAlivePlayers() {
  return navalPlayers.filter((player) => player.isAlive)
}

function getNavalProvisionalRanking() {
  const alive = navalPlayers
    .filter((player) => player.isAlive)
    .sort((a, b) => {
      if (b.remainingHull !== a.remainingHull) return b.remainingHull - a.remainingHull
      return a.label.localeCompare(b.label, 'ko')
    })

  const eliminated = [...navalEliminationOrder].reverse()
  return [...alive, ...eliminated]
}

function getNavalFinalRanking() {
  const alive = navalPlayers.filter((player) => player.isAlive)
  const survivor = alive.length ? alive[0] : null
  const eliminated = [...navalEliminationOrder].reverse()
  return survivor ? [survivor, ...eliminated] : eliminated
}

function renderNavalRanking() {
  if (!navalRankingList) return

  const ranking = navalFinished ? getNavalFinalRanking() : getNavalProvisionalRanking()

  if (!ranking.length) {
    navalRankingList.innerHTML = '<div class="naval-ranking-empty">참가자를 입력한 뒤 시작 버튼을 누르면 현재 생존 순위가 여기에 표시된다.</div>'
    return
  }

  navalRankingList.innerHTML = ''

  ranking.forEach((player, index) => {
    const item = document.createElement('div')
    item.className = `naval-ranking-item${index === 0 ? ' top' : ''}${!player.isAlive ? ' is-eliminated' : ''}`
    const subText = player.isAlive
      ? `남은 선체 ${player.remainingHull}/${NAVAL_SHIP_LENGTH}`
      : `${player.eliminatedOrder}번째 탈락`

    item.innerHTML = `
      <div class="naval-rank-num">${index + 1}</div>
      <div class="naval-rank-main">
        <div class="naval-rank-name"><span class="naval-rank-color" style="--naval-player-color:${player.color};"></span>${escapeHtml(player.label)}</div>
        <div class="naval-rank-sub">${subText}</div>
      </div>
      <div class="naval-rank-hull ${player.isAlive ? '' : 'is-out'}">${player.isAlive ? `${player.remainingHull}칸` : '탈락'}</div>
    `
    navalRankingList.appendChild(item)
  })
}

function addNavalLog(text, type = 'info') {
  navalLogs.unshift({ text, type })
  navalLogs = navalLogs.slice(0, 30)
}

function updateNavalStatus(text) {
  if (!navalStatusText) return
  navalStatusText.textContent = text
}

function clearNavalBombTimer() {
  if (navalBombTimer) {
    clearTimeout(navalBombTimer)
    navalBombTimer = null
  }
}

function resetNavalBoardState() {
  clearNavalBombTimer()
  if (navalBombLayer) {
    navalBombLayer.innerHTML = ''
  }
  navalRunning = false
  navalFinished = false
  navalBombedSet = new Set()
  navalMissSet = new Set()
  navalHitMap = new Map()
  navalEliminationOrder = []
  navalLogs = []
  navalLastBombIndex = null
}

function stopNavalGame(options = {}) {
  const { preserveBoard = true } = options
  clearNavalBombTimer()
  navalRunning = false
  navalFinished = false

  if (!preserveBoard) {
    navalBombedSet = new Set()
    navalMissSet = new Set()
    navalHitMap = new Map()
    navalEliminationOrder = []
    navalLogs = []
    navalLastBombIndex = null
    navalPlayers = []
    renderNavalBoardBase()
    renderNavalBoardState()
    renderNavalLogs()
    renderNavalRanking()
    renderNavalLegend()
    updateNavalDescription()
  }
}

function updateNavalFromInput({ render = true } = {}) {
  if (!navalConfigInput) return false

  const parsed = parseNavalConfigToPlayers(navalConfigInput.value)

  if (parsed.status !== 'OK') {
    return handleNavalParseFailure(parsed)
  }

  const readyPlayers = parsed.players.map((player) => ({
    ...player,
    remainingHull: NAVAL_SHIP_LENGTH,
    isAlive: true,
    eliminatedOrder: null
  }))

  setNavalPlayers(readyPlayers)

  if (render) {
    renderNavalLegend()
    renderNavalBoardBase()
    renderNavalBoardState()
    renderNavalLogs()
    renderNavalRanking()
    updateNavalStatus(`실시간 반영 완료: 총 ${navalPlayers.length}명`)
  }

  return true
}

function ensureNavalReady() {
  if (!navalConfigInput) return

  if (!navalPlayers.length) {
    const parsed = parseNavalConfigToPlayers(navalConfigInput.value)

    if (parsed.status === 'OK') {
      const previewPlayers = parsed.players.map((player) => ({
        ...player,
        remainingHull: NAVAL_SHIP_LENGTH,
        isAlive: true,
        eliminatedOrder: null
      }))
      setNavalPlayers(previewPlayers)
    } else {
      navalConfigInput.value = '홍길동, 김아무개, 박철수, 최영희'
      const fallbackParsed = parseNavalConfigToPlayers(navalConfigInput.value)
      if (fallbackParsed.status === 'OK') {
        const previewPlayers = fallbackParsed.players.map((player) => ({
          ...player,
          remainingHull: NAVAL_SHIP_LENGTH,
          isAlive: true,
          eliminatedOrder: null
        }))
        setNavalPlayers(previewPlayers)
      }
    }
  }

  renderNavalLegend()
  renderNavalBoardBase()
  renderNavalBoardState()
  renderNavalLogs()
  renderNavalRanking()

  if (!navalRunning && !navalFinished) {
    updateNavalStatus('참가 준비 완료. 시작 버튼을 누르면 배가 랜덤 배치된다.')
  }
}

function getRandomNavalTargetIndex() {
  const candidates = []
  for (let index = 0; index < NAVAL_BOARD_SIZE * NAVAL_BOARD_SIZE; index += 1) {
    if (!navalBombedSet.has(index)) {
      candidates.push(index)
    }
  }

  if (!candidates.length) return -1
  return candidates[Math.floor(Math.random() * candidates.length)]
}

function animateNavalBombDrop(targetIndex) {
  if (!navalBoardWrap || !navalBombLayer || !navalBoard) {
    return Promise.resolve()
  }

  const targetCell = navalBoard.querySelector(`.naval-cell[data-index="${targetIndex}"]`)
  if (!targetCell) {
    return Promise.resolve()
  }

  const speedMultiplier = getFastForwardMultiplier('game5')
  const warningDuration = Math.max(140, 360 / speedMultiplier)
  const bombDuration = Math.max(120, 250 / speedMultiplier)
  const explodeDelay = warningDuration + Math.max(90, 250 / speedMultiplier)
  const impactDuration = Math.max(220, 560 / speedMultiplier)
  const burstDuration = Math.max(240, 620 / speedMultiplier)
  const particleDuration = Math.max(220, 540 / speedMultiplier)
  const cleanupDelay = explodeDelay + Math.max(220, 570 / speedMultiplier)

  const boardRect = navalBoardWrap.getBoundingClientRect()
  const cellRect = targetCell.getBoundingClientRect()
  const centerX = cellRect.left - boardRect.left + cellRect.width / 2
  const centerY = cellRect.top - boardRect.top + cellRect.height / 2

  const warning = document.createElement('div')
  warning.className = 'naval-target-warning'
  warning.textContent = '⚠️'
  warning.style.left = `${centerX}px`
  warning.style.top = `${centerY}px`
  navalBombLayer.appendChild(warning)

  const targetPulse = document.createElement('div')
  targetPulse.className = 'naval-target-pulse'
  targetPulse.style.left = `${centerX}px`
  targetPulse.style.top = `${centerY}px`
  navalBombLayer.appendChild(targetPulse)

  const bomb = document.createElement('div')
  bomb.className = 'naval-bomb-drop'
  bomb.textContent = '💣'
  bomb.style.left = `${centerX}px`
  bomb.style.top = `${centerY}px`
  bomb.style.opacity = '0'
  navalBombLayer.appendChild(bomb)

  const impact = document.createElement('div')
  impact.className = 'naval-bomb-impact'
  impact.style.left = `${centerX}px`
  impact.style.top = `${centerY}px`
  navalBombLayer.appendChild(impact)

  const burst = document.createElement('div')
  burst.className = 'naval-bomb-burst'
  burst.style.left = `${centerX}px`
  burst.style.top = `${centerY}px`
  navalBombLayer.appendChild(burst)

  const particles = Array.from({ length: 10 }, () => {
    const particle = document.createElement('span')
    particle.className = 'naval-bomb-particle'
    particle.style.left = `${centerX}px`
    particle.style.top = `${centerY}px`
    navalBombLayer.appendChild(particle)
    return particle
  })

  targetCell.classList.add('is-arming')

  warning.animate(
    [
      { transform: 'translate(-50%, -50%) scale(0.55)', opacity: 0 },
      { transform: 'translate(-50%, -50%) scale(1.08)', opacity: 1, offset: 0.28 },
      { transform: 'translate(-50%, -50%) scale(0.96)', opacity: 1, offset: 0.7 },
      { transform: 'translate(-50%, -50%) scale(1.14)', opacity: 0 }
    ],
    {
      duration: warningDuration,
      easing: 'ease-out',
      fill: 'forwards'
    }
  )

  targetPulse.animate(
    [
      { transform: 'translate(-50%, -50%) scale(0.35)', opacity: 0.08 },
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.4, offset: 0.4 },
      { transform: 'translate(-50%, -50%) scale(1.42)', opacity: 0 }
    ],
    {
      duration: Math.max(warningDuration + 60, 180),
      easing: 'ease-out',
      fill: 'forwards'
    }
  )

  setTimeout(() => {
    targetCell.classList.remove('is-arming')
    targetCell.classList.add('is-targeting')

    bomb.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.35) rotate(-16deg)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1.08) rotate(8deg)', opacity: 1, offset: 0.44 },
        { transform: 'translate(-50%, -50%) scale(0.96) rotate(-6deg)', opacity: 1, offset: 0.76 },
        { transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', opacity: 1 }
      ],
      {
        duration: bombDuration,
        easing: 'cubic-bezier(0.18, 0.86, 0.24, 1)',
        fill: 'forwards'
      }
    )
  }, warningDuration - 40)

  setTimeout(() => {
    targetCell.classList.remove('is-targeting')
    targetCell.classList.add('is-impacting')
    bomb.remove()

    impact.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.18)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.98, offset: 0.4 },
        { transform: 'translate(-50%, -50%) scale(2.2)', opacity: 0 }
      ],
      {
        duration: impactDuration,
        easing: 'ease-out',
        fill: 'forwards'
      }
    )

    burst.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.36)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.94, offset: 0.28 },
        { transform: 'translate(-50%, -50%) scale(1.82)', opacity: 0 }
      ],
      {
        duration: burstDuration,
        easing: 'cubic-bezier(0.12, 0.84, 0.22, 1)',
        fill: 'forwards'
      }
    )

    particles.forEach((particle, index) => {
      const angle = (index * Math.PI * 2) / particles.length
      const distance = 22 + (index % 3) * 8
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance
      particle.animate(
        [
          { transform: 'translate(-50%, -50%) scale(0.22)', opacity: 0 },
          { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`, opacity: 1, offset: 0.28 },
          { transform: `translate(calc(-50% + ${x * 1.8}px), calc(-50% + ${y * 1.8}px)) scale(0.3)`, opacity: 0 }
        ],
        {
          duration: particleDuration,
          easing: 'ease-out',
          fill: 'forwards'
        }
      )
    })
  }, explodeDelay)

  return new Promise((resolve) => {
    setTimeout(() => {
      targetCell.classList.remove('is-arming', 'is-targeting', 'is-impacting')
      ;[warning, targetPulse, impact, burst, ...particles].forEach((node) => node.remove())
      resolve()
    }, cleanupDelay)
  })
}

function applyNavalBombResult(targetIndex) {
  navalBombedSet.add(targetIndex)
  navalLastBombIndex = targetIndex

  const hitPlayer = navalPlayers.find((player) => player.shipIndices?.includes(targetIndex)) || null
  const coord = getNavalCoordLabel(targetIndex)

  if (!hitPlayer) {
    navalMissSet.add(targetIndex)
    addNavalLog(`${coord} 좌표 폭발 · 빗나감`, 'drop')
    updateNavalStatus(`${coord} 좌표 경고 후 폭발 · 빗나갔다!`)
    return { type: 'miss', coord }
  }

  navalHitMap.set(targetIndex, hitPlayer.id)

  if (!hitPlayer.hitIndices.includes(targetIndex)) {
    hitPlayer.hitIndices.push(targetIndex)
  }
  hitPlayer.remainingHull = Math.max(0, NAVAL_SHIP_LENGTH - hitPlayer.hitIndices.length)

  if (hitPlayer.remainingHull > 0) {
    addNavalLog(`${coord} 좌표 명중 · ${hitPlayer.label} 피격 (${hitPlayer.remainingHull}/${NAVAL_SHIP_LENGTH})`, 'hit')
    updateNavalStatus(`${coord} 명중! ${hitPlayer.label} 배가 피격됐다.`)
    return { type: 'hit', coord, player: hitPlayer }
  }

  hitPlayer.isAlive = false
  hitPlayer.eliminatedOrder = navalEliminationOrder.length + 1
  navalEliminationOrder.push(hitPlayer)
  addNavalLog(`${coord} 좌표 직격 · ${hitPlayer.label} 탈락`, 'out')
  updateNavalStatus(`${coord} 직격! ${hitPlayer.label} 배가 침몰했다.`)
  return { type: 'out', coord, player: hitPlayer }
}

function maybeFinishNavalGame() {
  if (navalFinished) return true

  const alivePlayers = getNavalAlivePlayers()
  if (alivePlayers.length > 1) return false

  navalRunning = false
  navalFinished = true
  clearNavalBombTimer()
  setNavalInputLock(false)

  const ranking = getNavalFinalRanking()
  if (ranking[0]) {
    ranking.forEach((player, index) => {
      player.finalPlace = index + 1
    })
    addNavalLog(`${ranking[0].label} 최후의 1인 생존`, 'final')
    updateNavalStatus(`${ranking[0].label} 최후의 1인 생존! 최종 결과를 확인해줘.`)
  } else {
    updateNavalStatus('게임이 종료되었다.')
  }

  renderNavalLegend()
  renderNavalBoardState()
  renderNavalLogs()
  renderNavalRanking()

  const html = ranking
    .map((player, index) => `<span style="display:block;margin:8px 0;"><strong>${index + 1}위. ${escapeHtml(player.label)}</strong></span>`)
    .join('')

  showPopup('폭격 해전 결과', html || '<span>결과가 없습니다.</span>', {
    icon: '💣',
    allowHtml: true
  })

  return true
}

async function executeNavalBombTurn() {
  if (!navalRunning || navalFinished) return

  const targetIndex = getRandomNavalTargetIndex()
  if (targetIndex < 0) {
    maybeFinishNavalGame()
    return
  }

  await animateNavalBombDrop(targetIndex)

  if (!navalRunning || navalFinished) return

  applyNavalBombResult(targetIndex)
  renderNavalLegend()
  renderNavalBoardState()
  renderNavalLogs()
  renderNavalRanking()

  if (!maybeFinishNavalGame()) {
    navalBombTimer = setTimeout(executeNavalBombTurn, getScaledDelay(NAVAL_BOMB_INTERVAL_MS, 'game5', 180))
  }
}

function startNavalGame() {
  if (!navalConfigInput || navalRunning) return

  const parsed = parseNavalConfigToPlayers(navalConfigInput.value)

  if (parsed.status !== 'OK') {
    handleNavalParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  if (parsed.players.length < 2) {
    showMinParticipantsPopup(NAVAL_MAX_PLAYERS)
    return
  }

  resetNavalBoardState()

  const roundPlayers = buildNavalRoundPlayers(parsed.players)
  if (!roundPlayers) {
    updateNavalStatus('배를 배치하는 중 문제가 발생했다. 다시 시도해줘.')
    showPopup('배치 오류', '배 랜덤 배치에 실패했어. 다시 시작해줘.')
    return
  }

  setNavalPlayers(roundPlayers)
  renderNavalBoardBase()
  renderNavalBoardState()
  renderNavalLegend()
  renderNavalLogs()
  renderNavalRanking()

  navalRunning = true
  navalFinished = false
  setNavalInputLock(true)

  updateNavalStatus('전투 진행 중 · 보드 아래 실시간 순위를 확인해줘.')

  navalBombTimer = setTimeout(executeNavalBombTurn, getScaledDelay(520, 'game5', 140))
}

function resetNavalGame() {
  resetNavalBoardState()
  setNavalInputLock(false)

  if (!navalConfigInput) return

  const parsed = parseNavalConfigToPlayers(navalConfigInput.value)
  if (parsed.status === 'OK') {
    const previewPlayers = parsed.players.map((player) => ({
      ...player,
      remainingHull: NAVAL_SHIP_LENGTH,
      isAlive: true,
      eliminatedOrder: null
    }))
    setNavalPlayers(previewPlayers)
  } else {
    navalConfigInput.value = lastNavalValidConfigText || '홍길동, 김아무개, 박철수, 최영희'
    const fallbackParsed = parseNavalConfigToPlayers(navalConfigInput.value)
    if (fallbackParsed.status === 'OK') {
      const previewPlayers = fallbackParsed.players.map((player) => ({
        ...player,
        remainingHull: NAVAL_SHIP_LENGTH,
        isAlive: true,
        eliminatedOrder: null
      }))
      setNavalPlayers(previewPlayers)
    }
  }

  renderNavalBoardBase()
  renderNavalBoardState()
  renderNavalLegend()
  renderNavalLogs()
  renderNavalRanking()
  updateNavalStatus('리셋 완료. 시작 버튼을 누르면 다시 시작된다.')
}


/* =========================
   game5 : russian roulette
   기존 폭격 해전 함수명을 재사용해 화면 전환/초기화 흐름과 연결한다.
========================= */

const ROULETTE_MAX_PLAYERS = 10
const ROULETTE_CHAMBER_CAPACITY = 30
const ROULETTE_SHOT_DELAY_MS = 1120
const ROULETTE_FIRST_SHOT_DELAY_MS = 720
const ROULETTE_ANIMATION_MS = 720

let rouletteTurnIndex = 0
let rouletteChamber = []
let rouletteRoundNumber = 1
let rouletteShotNumber = 0
let rouletteShotInProgress = false

function getRouletteChamberCountEl() {
  return document.getElementById('rouletteChamberCount')
}

function getRouletteBulletTrackEl() {
  return document.getElementById('rouletteBulletTrack')
}

function getRouletteCurrentAlivePlayers() {
  return navalPlayers.filter((player) => player.isAlive)
}

function setNavalInputLock(isLocked) {
  if (!navalConfigInput) return
  navalConfigInput.disabled = isLocked
  navalConfigInput.style.opacity = isLocked ? '0.65' : '1'
  navalConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
}

function updateNavalDescription() {
  if (!navalDesc) return
  const playerCount = navalPlayers.length || 0
  navalDesc.textContent = `중앙의 총 이모지가 MAP 위 참가자 ${playerCount}명을 향해 자동으로 발사된다. 실탄 여부는 숨긴 채, 불발과 폭죽 연출을 섞어 끝까지 긴장감을 만든다.`
}

function parseNavalConfigToPlayers(text) {
  const rawItems = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!rawItems.length) {
    return { status: 'EMPTY' }
  }

  if (rawItems.length > ROULETTE_MAX_PLAYERS) {
    return { status: 'TOO_MANY', count: rawItems.length }
  }

  const seen = new Set()
  const players = []
  const palette = getNavalPlayerPaletteByTheme()

  for (const raw of rawItems) {
    if (!raw || raw.includes('*')) {
      return { status: 'INVALID' }
    }

    if (seen.has(raw)) {
      return { status: 'DUPLICATE' }
    }

    seen.add(raw)
    players.push({
      id: `roulette-player-${players.length + 1}`,
      label: raw,
      color: palette[players.length % palette.length],
      isAlive: true,
      eliminatedOrder: null,
      finalPlace: null
    })
  }

  return { status: 'OK', players }
}

function handleNavalParseFailure(parsed, { showPopupOnInvalid = false } = {}) {
  if (!navalStatusText) return false

  if (parsed.status === 'EMPTY') {
    navalStatusText.textContent = '참가자를 먼저 입력해줘. 예: 홍길동, 김아무개, 박철수'
  } else if (parsed.status === 'TOO_MANY') {
    navalStatusText.textContent = `러시안 룰렛은 최대 ${ROULETTE_MAX_PLAYERS}명까지 가능해.`
    if (showPopupOnInvalid) {
      showPopup('참가자 수 초과', `러시안 룰렛은 최대 ${ROULETTE_MAX_PLAYERS}명까지 참가할 수 있어.`, { icon: '⚠️' })
    }
  } else if (parsed.status === 'DUPLICATE') {
    navalStatusText.textContent = '같은 이름은 2번 이상 입력할 수 없어.'
    if (showPopupOnInvalid) {
      showPopup('중복 이름 불가', '러시안 룰렛은 같은 이름을 중복 등록할 수 없어.', { icon: '⚠️' })
    }
  } else {
    navalStatusText.textContent = '입력 형식을 확인해줘. 예: 홍길동, 김아무개, 박철수'
    if (showPopupOnInvalid) {
      showPopup('입력 확인', '이름만 쉼표로 구분해 적어줘. 예: 홍길동, 김아무개, 박철수', { icon: '⚠️' })
    }
  }

  return false
}

function setNavalPlayers(players) {
  const palette = getNavalPlayerPaletteByTheme()
  navalPlayers = players.map((player, index) => ({
    ...player,
    color: palette[index % palette.length],
    isAlive: player.isAlive !== false,
    eliminatedOrder: player.eliminatedOrder || null,
    finalPlace: player.finalPlace || null
  }))

  if (navalConfigInput) {
    lastNavalValidConfigText = navalConfigInput.value
    lastNavalAppliedRawText = navalConfigInput.value
  }

  updateNavalDescription()
}

function buildRouletteChamber(aliveCount) {
  const liveBulletCount = clampValue(aliveCount - 1, 0, ROULETTE_CHAMBER_CAPACITY)
  const blankCount = ROULETTE_CHAMBER_CAPACITY - liveBulletCount
  rouletteChamber = shuffleArray([
    ...Array.from({ length: liveBulletCount }, () => 'live'),
    ...Array.from({ length: blankCount }, () => 'blank')
  ])
  rouletteRoundNumber += 1
}

function getRouletteRemainingShots() {
  return rouletteChamber.length
}

function renderRouletteBulletTrack() {
  const track = getRouletteBulletTrackEl()
  if (!track) return

  const remaining = getRouletteRemainingShots()
  track.innerHTML = ''

  for (let index = 0; index < ROULETTE_CHAMBER_CAPACITY; index += 1) {
    const dot = document.createElement('span')
    dot.className = `roulette-bullet-dot${index >= remaining ? ' is-spent' : ''}`
    track.appendChild(dot)
  }
}

function renderNavalBoardBase() {
  renderNavalBoardState()
}

function getRouletteCurrentTarget() {
  const alive = getRouletteCurrentAlivePlayers()
  if (!alive.length) return null
  return alive[clampValue(rouletteTurnIndex, 0, alive.length - 1) % alive.length]
}

function getRouletteAngleForPlayer(player) {
  const total = Math.max(1, navalPlayers.length)
  const index = Math.max(0, navalPlayers.findIndex((item) => item.id === player?.id))
  return -90 + (360 / total) * index
}

function syncRouletteMapLayoutVars() {
  if (!navalBoard) return

  const total = Math.max(1, navalPlayers.length)
  const rect = navalBoardWrap?.getBoundingClientRect?.() || navalBoard.getBoundingClientRect?.() || { width: 620, height: 500 }
  const wrapWidth = rect.width || navalBoardWrap?.clientWidth || 620
  const wrapHeight = rect.height || navalBoardWrap?.clientHeight || 500
  const isMobileViewport = window.innerWidth <= 760

  let nodeWidth = isMobileViewport ? 76 : 118
  let nodeHeight = isMobileViewport ? 74 : 102
  let avatarSize = isMobileViewport ? 24 : 30

  if (total > 4) {
    nodeWidth = isMobileViewport ? 72 : 110
    nodeHeight = isMobileViewport ? 70 : 96
    avatarSize = isMobileViewport ? 22 : 28
  }
  if (total > 6) {
    nodeWidth = isMobileViewport ? 68 : 104
    nodeHeight = isMobileViewport ? 66 : 90
    avatarSize = isMobileViewport ? 20 : 26
  }
  if (total > 8) {
    nodeWidth = isMobileViewport ? 64 : 98
    nodeHeight = isMobileViewport ? 62 : 84
    avatarSize = isMobileViewport ? 19 : 24
  }

  const edgePadding = isMobileViewport ? 12 : 20
  const minRadius = isMobileViewport ? 96 : 70
  const maxRadius = Math.max(minRadius, Math.min(
    (wrapWidth - nodeWidth) / 2 - edgePadding,
    (wrapHeight - nodeHeight) / 2 - edgePadding
  ))
  const preferredRadius = Math.min(wrapWidth, wrapHeight) * (isMobileViewport ? (total > 6 ? 0.43 : 0.4) : (total > 10 ? 0.41 : 0.38))
  const radius = clampValue(Math.min(preferredRadius, maxRadius), minRadius, maxRadius)

  navalBoard.style.setProperty('--roulette-radius', `${Math.floor(radius)}px`)
  navalBoard.style.setProperty('--roulette-node-width', `${nodeWidth}px`)
  navalBoard.style.setProperty('--roulette-node-min-height', `${nodeHeight}px`)
  navalBoard.style.setProperty('--roulette-avatar-size', `${avatarSize}px`)
  navalBoard.classList.toggle('is-compact', total > (isMobileViewport ? 6 : 8))
  navalBoard.classList.toggle('is-tiny', total > (isMobileViewport ? 8 : 10))
}

function renderNavalBoardState() {
  if (!navalBoard) return

  const activeTarget = navalRunning && !navalFinished ? getRouletteCurrentTarget() : null
  const activeAngle = activeTarget ? getRouletteAngleForPlayer(activeTarget) : -90
  const aliveCount = getRouletteCurrentAlivePlayers().length
  const remaining = getRouletteRemainingShots()

  navalBoard.innerHTML = ''
  navalBoard.style.setProperty('--roulette-player-count', String(Math.max(1, navalPlayers.length)))
  syncRouletteMapLayoutVars()

  const gun = document.createElement('div')
  gun.className = `roulette-gun-core${navalRunning && !navalFinished ? ' is-live' : ''}`
  gun.style.setProperty('--gun-angle', `${activeAngle + 90}deg`)
  gun.innerHTML = `
    <span class="roulette-gun-emoji" aria-hidden="true">🔫</span>
  `
  navalBoard.appendChild(gun)

  navalPlayers.forEach((player, index) => {
    const angle = -90 + (360 / Math.max(1, navalPlayers.length)) * index
    const node = document.createElement('div')
    node.className = `roulette-player-node${player.isAlive ? '' : ' is-dead'}${activeTarget?.id === player.id ? ' is-active' : ''}`
    node.dataset.playerId = player.id
    node.style.setProperty('--player-angle', `${angle}deg`)
    node.style.setProperty('--player-color', player.color)
    node.innerHTML = `
      <span class="roulette-player-avatar">${player.isAlive ? (activeTarget?.id === player.id ? '😨' : '🙂') : '💀'}</span>
      <span class="roulette-player-name">${escapeHtml(player.label)}</span>
      <span class="roulette-player-state">${player.isAlive ? (activeTarget?.id === player.id ? '타깃' : '생존') : '사망'}</span>
    `
    navalBoard.appendChild(node)
  })

  if (navalBoardMeta) {
    navalBoardMeta.textContent = `${remaining}/${ROULETTE_CHAMBER_CAPACITY}`
  }

  const chamberCount = getRouletteChamberCountEl()
  if (chamberCount) {
    chamberCount.textContent = `${remaining}/${ROULETTE_CHAMBER_CAPACITY}`
  }

  renderRouletteBulletTrack()
}

function renderNavalLegend() {
  if (!navalLegend || !navalTotalInfo) return

  navalLegend.innerHTML = ''

  const ranking = navalPlayers.length
    ? (navalFinished ? getNavalFinalRanking() : getNavalProvisionalRanking())
    : []

  ranking.forEach((player, index) => {
    const chip = document.createElement('div')
    chip.className = `legend-chip roulette-sidebar-rank-chip${index === 0 ? ' top' : ''}${!player.isAlive ? ' is-eliminated' : ''}`
    chip.innerHTML = `
      <span class="legend-dot" style="background:${player.color};"></span>
      <span class="roulette-sidebar-rank-num">${index + 1}</span>
      <span class="roulette-sidebar-rank-meta">
        <strong>${escapeHtml(player.label)}</strong>
        <small>${player.isAlive ? '생존' : '사망'}</small>
      </span>
    `
    navalLegend.appendChild(chip)
  })

  const aliveCount = getRouletteCurrentAlivePlayers().length
  navalTotalInfo.textContent = `생존 ${aliveCount}명 / 총 ${navalPlayers.length}명`
}

function renderNavalLogs() {
  if (!navalLogList) return

  if (!navalLogs.length) {
    navalLogList.innerHTML = '<div class="roulette-log-empty">게임이 시작되면 발사 기록이 여기에 쌓인다.</div>'
    return
  }

  navalLogList.innerHTML = ''
  navalLogs.forEach((item) => {
    const row = document.createElement('div')
    row.className = `roulette-log-item ${item.type ? `type-${item.type}` : ''}`
    row.textContent = item.text
    navalLogList.appendChild(row)
  })
}

function getNavalAlivePlayers() {
  return getRouletteCurrentAlivePlayers()
}

function getNavalProvisionalRanking() {
  const alive = navalPlayers.filter((player) => player.isAlive)
  const eliminated = [...navalEliminationOrder].reverse()
  return [...alive, ...eliminated]
}

function getNavalFinalRanking() {
  const alive = navalPlayers.filter((player) => player.isAlive)
  const eliminated = [...navalEliminationOrder].reverse()
  return [...alive, ...eliminated]
}

function renderNavalRanking() {
  if (!navalRankingList) return

  const ranking = navalFinished ? getNavalFinalRanking() : getNavalProvisionalRanking()

  if (!ranking.length) {
    navalRankingList.innerHTML = '<div class="roulette-ranking-empty">참가자를 입력한 뒤 시작 버튼을 누르면 생존 순위가 표시된다.</div>'
    return
  }

  navalRankingList.innerHTML = ''

  ranking.forEach((player, index) => {
    const item = document.createElement('div')
    item.className = `roulette-ranking-item${index === 0 ? ' top' : ''}${!player.isAlive ? ' is-eliminated' : ''}`
    const subText = player.isAlive
      ? (navalFinished ? '최후의 1인 생존' : '아직 MAP에 남아 있음')
      : `${player.eliminatedOrder || '-'}번째 사망`
    item.innerHTML = `
      <div class="roulette-rank-num">${index + 1}</div>
      <div class="roulette-rank-main">
        <div class="roulette-rank-name"><span class="roulette-rank-color" style="--roulette-player-color:${player.color};"></span>${escapeHtml(player.label)}</div>
        <div class="roulette-rank-sub">${subText}</div>
      </div>
      <div class="roulette-rank-state ${player.isAlive ? '' : 'is-out'}">${player.isAlive ? '생존' : '사망'}</div>
    `
    navalRankingList.appendChild(item)
  })
}

function addNavalLog(text, type = '') {
  navalLogs.unshift({ text, type })
  navalLogs = navalLogs.slice(0, 40)
}

function updateNavalStatus(text) {
  if (!navalStatusText) return
  navalStatusText.textContent = text
}

function clearNavalBombTimer() {
  if (navalBombTimer) {
    clearTimeout(navalBombTimer)
    navalBombTimer = null
  }
}

function resetNavalBoardState() {
  releaseFastForward('game5')
  clearNavalBombTimer()
  rouletteTurnIndex = 0
  rouletteChamber = []
  rouletteRoundNumber = 1
  rouletteShotNumber = 0
  rouletteShotInProgress = false
  navalRunning = false
  navalFinished = false
  navalEliminationOrder = []
  navalLogs = []
  navalLastBombIndex = null
  if (navalBombLayer) {
    navalBombLayer.innerHTML = ''
  }
}

function stopNavalGame(options = {}) {
  const { preserveBoard = false } = options
  clearNavalBombTimer()
  rouletteShotInProgress = false
  navalRunning = false

  if (!preserveBoard) {
    resetNavalBoardState()
    navalPlayers = []
    renderNavalBoardBase()
    renderNavalLegend()
    renderNavalLogs()
    renderNavalRanking()
  }
}

function updateNavalFromInput({ render = true } = {}) {
  if (!navalConfigInput) return false

  const parsed = parseNavalConfigToPlayers(navalConfigInput.value)

  if (parsed.status !== 'OK') {
    handleNavalParseFailure(parsed)
    return false
  }

  setNavalPlayers(parsed.players)

  if (!rouletteChamber.length) {
    rouletteChamber = Array.from({ length: ROULETTE_CHAMBER_CAPACITY }, () => 'blank')
  }

  if (render) {
    renderNavalBoardBase()
    renderNavalLegend()
    renderNavalLogs()
    renderNavalRanking()
  }

  updateNavalStatus(`실시간 반영 완료: 총 ${parsed.players.length}명 · 시작하면 실탄 여부를 숨긴 채 자동 발사된다.`)
  return true
}

function ensureNavalReady() {
  if (!navalConfigInput) return

  if (!navalPlayers.length) {
    const parsed = parseNavalConfigToPlayers(navalConfigInput.value)
    if (parsed.status === 'OK') {
      setNavalPlayers(parsed.players)
    } else {
      navalConfigInput.value = lastNavalValidConfigText || '홍길동, 김아무개, 박철수, 최영희'
      const fallbackParsed = parseNavalConfigToPlayers(navalConfigInput.value)
      if (fallbackParsed.status === 'OK') {
        setNavalPlayers(fallbackParsed.players)
      }
    }
  }

  if (!rouletteChamber.length) {
    rouletteChamber = Array.from({ length: ROULETTE_CHAMBER_CAPACITY }, () => 'blank')
  }

  renderNavalBoardBase()
  renderNavalLegend()
  renderNavalLogs()
  renderNavalRanking()
  updateNavalDescription()
}

function getRandomNavalTargetIndex() {
  return -1
}

function animateNavalBombDrop() {
  return Promise.resolve()
}

function applyNavalBombResult() {
  return { type: 'noop' }
}

function sleepRoulette(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function createRouletteEffectNode(className, x, y, text = '') {
  if (!navalBombLayer) return null
  const node = document.createElement('div')
  node.className = className
  node.style.left = `${x}px`
  node.style.top = `${y}px`
  if (text) node.textContent = text
  navalBombLayer.appendChild(node)
  return node
}

function createRouletteFireworkParticles(x, y) {
  if (!navalBombLayer) return []
  return Array.from({ length: 14 }, (_, index) => {
    const particle = document.createElement('span')
    particle.className = 'roulette-firework-particle'
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
    const angle = (index * Math.PI * 2) / 14
    const distance = 28 + (index % 4) * 8
    const fx = Math.cos(angle) * distance
    const fy = Math.sin(angle) * distance
    particle.style.setProperty('--fx', `${fx}px`)
    particle.style.setProperty('--fy', `${fy}px`)
    particle.style.setProperty('--fx2', `${fx * 1.42}px`)
    particle.style.setProperty('--fy2', `${fy * 1.42}px`)
    navalBombLayer.appendChild(particle)
    return particle
  })
}

async function animateRouletteShot(targetPlayer, shotType) {
  const targetNode = navalBoard?.querySelector(`.roulette-player-node[data-player-id="${targetPlayer.id}"]`)
  const gun = navalBoard?.querySelector('.roulette-gun-core')

  if (!targetNode || !gun || !navalBoardWrap || !navalBombLayer) {
    return sleepRoulette(Math.max(300, ROULETTE_ANIMATION_MS / getFastForwardMultiplier('game5')))
  }

  const speedMultiplier = getFastForwardMultiplier('game5')
  const aimDuration = Math.max(160, (ROULETTE_ANIMATION_MS * 0.28) / speedMultiplier)
  const shotDuration = Math.max(210, (ROULETTE_ANIMATION_MS * 0.46) / speedMultiplier)
  const resultDuration = Math.max(300, (ROULETTE_ANIMATION_MS * 0.62) / speedMultiplier)

  const wrapRect = navalBoardWrap.getBoundingClientRect()
  const gunRect = gun.getBoundingClientRect()
  const targetRect = targetNode.getBoundingClientRect()
  const startX = gunRect.left - wrapRect.left + gunRect.width / 2
  const startY = gunRect.top - wrapRect.top + gunRect.height / 2
  const endX = targetRect.left - wrapRect.left + targetRect.width / 2
  const endY = targetRect.top - wrapRect.top + targetRect.height / 2
  const deltaX = endX - startX
  const deltaY = endY - startY
  const distance = Math.max(20, Math.hypot(deltaX, deltaY))
  const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI

  navalBombLayer.innerHTML = ''
  targetNode.classList.add('is-targeted')
  gun.classList.add('is-firing')

  const flash = createRouletteEffectNode('roulette-muzzle-flash', startX, startY)
  await sleepRoulette(aimDuration)

  const beam = document.createElement('div')
  beam.className = `roulette-shot-beam is-${shotType}`
  beam.style.left = `${startX}px`
  beam.style.top = `${startY}px`
  beam.style.width = `${distance}px`
  beam.style.transform = `rotate(${angle}deg)`
  beam.style.setProperty('--shot-distance', `${distance}px`)
  navalBombLayer.appendChild(beam)

  const bolt = document.createElement('div')
  bolt.className = `roulette-shot-bolt is-${shotType}`
  bolt.style.left = `${startX}px`
  bolt.style.top = `${startY}px`
  navalBombLayer.appendChild(bolt)
  bolt.animate(
    [
      { transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(0px) scale(0.8)`, opacity: 0 },
      { transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${distance * 0.18}px) scale(1)`, opacity: 1, offset: 0.18 },
      { transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${distance}px) scale(0.88)`, opacity: 1 }
    ],
    { duration: shotDuration, easing: 'cubic-bezier(0.12, 0.82, 0.18, 1)', fill: 'forwards' }
  )

  await sleepRoulette(shotDuration)

  beam.remove()
  bolt.remove()
  flash?.remove()

  if (shotType === 'hit') {
    targetNode.classList.add('is-hit')
    createRouletteEffectNode('roulette-hit-burst', endX, endY)
  } else if (shotType === 'firework') {
    targetNode.classList.add('is-firework')
    createRouletteEffectNode('roulette-firework-burst', endX, endY, '🎆')
    createRouletteFireworkParticles(endX, endY)
  } else {
    targetNode.classList.add('is-blank')
    createRouletteEffectNode('roulette-blank-spark', endX, endY, '✨')
  }

  await sleepRoulette(resultDuration)

  targetNode.classList.remove('is-targeted', 'is-hit', 'is-blank', 'is-firework')
  gun.classList.remove('is-firing')

  if (navalBombLayer) {
    navalBombLayer.innerHTML = ''
  }
}

function reloadRouletteChamberForAlive() {
  const aliveCount = getRouletteCurrentAlivePlayers().length
  buildRouletteChamber(aliveCount)
  addNavalLog(`탄창 리셋 · ${ROULETTE_CHAMBER_CAPACITY}/${ROULETTE_CHAMBER_CAPACITY}`, 'reload')
}

function maybeFinishNavalGame() {
  if (navalFinished) return true

  const alivePlayers = getRouletteCurrentAlivePlayers()
  if (alivePlayers.length > 1) return false

  navalRunning = false
  navalFinished = true
  clearNavalBombTimer()
  setNavalInputLock(false)

  const ranking = getNavalFinalRanking()
  ranking.forEach((player, index) => {
    player.finalPlace = index + 1
  })

  if (ranking[0]) {
    addNavalLog(`${ranking[0].label} 최후의 1인 생존`, 'final')
    updateNavalStatus(`${ranking[0].label} 최후의 1인 생존! 최종 결과를 확인해줘.`)
  } else {
    updateNavalStatus('게임이 종료되었다.')
  }

  renderNavalBoardState()
  renderNavalLegend()
  renderNavalLogs()
  renderNavalRanking()

  const html = `
    <div class="roulette-final-list">
      ${ranking.map((player, index) => `
        <div class="roulette-final-item${index === 0 ? ' top' : ''}">
          <span class="roulette-final-rank">${index + 1}위</span>
          <strong>${escapeHtml(player.label)}</strong>
          <small>${index === 0 ? '최후의 1인 생존' : `${player.eliminatedOrder || '-'}번째 사망`}</small>
        </div>
      `).join('')}
    </div>
  `

  showPopup('러시안 룰렛 결과', html || '<span>결과가 없습니다.</span>', {
    icon: '🏆',
    allowHtml: true,
    popupClass: 'roulette-final-popup'
  })

  return true
}

async function executeNavalBombTurn() {
  await fireRouletteTurn()
}

async function fireRouletteTurn() {
  if (!navalRunning || navalFinished || rouletteShotInProgress) return

  const alivePlayers = getRouletteCurrentAlivePlayers()
  if (alivePlayers.length <= 1) {
    maybeFinishNavalGame()
    return
  }

  if (!rouletteChamber.length) {
    reloadRouletteChamberForAlive()
  }

  rouletteTurnIndex = rouletteTurnIndex % alivePlayers.length
  const targetPlayer = alivePlayers[rouletteTurnIndex]
  if (!targetPlayer) return

  const bullet = rouletteChamber.shift() || 'blank'
  const isHit = bullet === 'live'
  rouletteShotNumber += 1
  rouletteShotInProgress = true

  renderNavalBoardState()
  updateNavalStatus(`${targetPlayer.label} 차례 · 총구가 타깃을 향했다.`)

  const shotType = isHit ? 'hit' : (Math.random() < 0.42 ? 'firework' : 'blank')
  await animateRouletteShot(targetPlayer, shotType)

  if (!navalRunning || navalFinished) {
    rouletteShotInProgress = false
    return
  }

  if (isHit) {
    targetPlayer.isAlive = false
    targetPlayer.eliminatedOrder = navalEliminationOrder.length + 1
    navalEliminationOrder.push(targetPlayer)
    addNavalLog(`${rouletteShotNumber}번째 발사 · ${targetPlayer.label} 피격 · 사망 처리`, 'hit')
    updateNavalStatus(`${targetPlayer.label} 피격! MAP에서 사망 처리되고 탄창이 다시 리셋된다.`)
    reloadRouletteChamberForAlive()
    const nextAlive = getRouletteCurrentAlivePlayers()
    rouletteTurnIndex = nextAlive.length ? rouletteTurnIndex % nextAlive.length : 0
  } else {
    if (shotType === 'firework') {
      addNavalLog(`${rouletteShotNumber}번째 발사 · ${targetPlayer.label} 폭죽 · 생존`, 'blank')
      updateNavalStatus(`${targetPlayer.label} 앞에서 폭죽이 터졌다! 효과는 없고 다음 차례로 넘어간다.`)
    } else {
      addNavalLog(`${rouletteShotNumber}번째 발사 · ${targetPlayer.label} 불발 · 생존`, 'blank')
      updateNavalStatus(`${targetPlayer.label} 불발! 다음 참가자 차례로 넘어간다.`)
    }
    rouletteTurnIndex = (rouletteTurnIndex + 1) % alivePlayers.length
  }

  rouletteShotInProgress = false
  renderNavalBoardState()
  renderNavalLegend()
  renderNavalLogs()
  renderNavalRanking()

  if (!maybeFinishNavalGame()) {
    navalBombTimer = setTimeout(fireRouletteTurn, getScaledDelay(ROULETTE_SHOT_DELAY_MS, 'game5', 260))
  }
}

function startNavalGame() {
  if (!navalConfigInput || navalRunning) return

  const parsed = parseNavalConfigToPlayers(navalConfigInput.value)

  if (parsed.status !== 'OK') {
    handleNavalParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  if (parsed.players.length < 2) {
    showMinParticipantsPopup(ROULETTE_MAX_PLAYERS)
    return
  }

  resetNavalBoardState()
  setNavalPlayers(parsed.players)
  buildRouletteChamber(parsed.players.length)
  navalRunning = true
  navalFinished = false
  setNavalInputLock(true)

  addNavalLog(`게임 시작 · 참가자 ${parsed.players.length}명 · 탄창 ${ROULETTE_CHAMBER_CAPACITY}/${ROULETTE_CHAMBER_CAPACITY}`, 'start')
  updateNavalStatus('러시안 룰렛 시작! 실탄 여부는 공개되지 않고 중앙 총이 참가자를 순서대로 조준한다.')
  renderNavalBoardState()
  renderNavalLegend()
  renderNavalLogs()
  renderNavalRanking()

  navalBombTimer = setTimeout(fireRouletteTurn, getScaledDelay(ROULETTE_FIRST_SHOT_DELAY_MS, 'game5', 180))
}

function resetNavalGame() {
  resetNavalBoardState()
  setNavalInputLock(false)

  if (!navalConfigInput) return

  const parsed = parseNavalConfigToPlayers(navalConfigInput.value)
  if (parsed.status === 'OK') {
    setNavalPlayers(parsed.players)
  } else {
    navalConfigInput.value = lastNavalValidConfigText || '홍길동, 김아무개, 박철수, 최영희'
    const fallbackParsed = parseNavalConfigToPlayers(navalConfigInput.value)
    if (fallbackParsed.status === 'OK') {
      setNavalPlayers(fallbackParsed.players)
    }
  }

  rouletteChamber = Array.from({ length: ROULETTE_CHAMBER_CAPACITY }, () => 'blank')
  renderNavalBoardBase()
  renderNavalLegend()
  renderNavalLogs()
  renderNavalRanking()
  updateNavalStatus('리셋 완료. 시작 버튼을 누르면 총이 다시 자동 발사된다.')
}


const STOCK_MAX_PLAYERS = 4
const STOCK_SEED_MONEY = 1000000
const STOCK_MIN_DURATION = 10
const STOCK_MAX_DURATION = 60
const STOCK_DURATION_STEP = 5
const STOCK_TICK_MS = 250
const STOCK_HISTORY_LENGTH = 44
const STOCK_MAX_HOLDINGS = 4
const STOCK_UNIT_WON = 10000
const STOCK_SEED_MANWON = STOCK_SEED_MONEY / STOCK_UNIT_WON

const stockCurrencyFormatter = new Intl.NumberFormat('ko-KR')

const STOCK_MARKET_META = [
  {
    id: 'medical',
    sector: '의료',
    name: '메디코어',
    emoji: '🩺',
    trait: '방어형 · 안정적 상승',
    description: '실적이 비교적 안정적이고 낙폭이 작아 방어적인 흐름을 보이는 의료주.',
    basePriceRange: [52000, 98000],
    drift: 0.0016,
    volatility: 0.007,
    shockChance: 0.07,
    shockScale: 0.012,
    cycleStrength: 0.003
  },
  {
    id: 'tech',
    sector: '기술',
    name: '넥스트테크',
    emoji: '💻',
    trait: '성장형 · 변동성 큼',
    description: '테마를 타면 강하게 치솟지만 조정도 큰 전형적인 기술 성장주.',
    basePriceRange: [48000, 138000],
    drift: 0.0024,
    volatility: 0.012,
    shockChance: 0.12,
    shockScale: 0.023,
    cycleStrength: 0.004
  },
  {
    id: 'food',
    sector: '식료품',
    name: '데일리푸드',
    emoji: '🍞',
    trait: '필수소비재 · 완만한 움직임',
    description: '큰 폭의 급등락은 드물지만 꾸준히 버텨주는 생활밀착형 식료품주.',
    basePriceRange: [26000, 64000],
    drift: 0.0013,
    volatility: 0.0055,
    shockChance: 0.05,
    shockScale: 0.009,
    cycleStrength: 0.0025
  },
  {
    id: 'beauty',
    sector: '뷰티',
    name: '글로우뷰티',
    emoji: '💄',
    trait: '트렌드형 · 뉴스 민감',
    description: '입소문과 유행에 민감해서 한 번 분위기를 타면 빠르게 튀는 뷰티주.',
    basePriceRange: [24000, 82000],
    drift: 0.0018,
    volatility: 0.0095,
    shockChance: 0.1,
    shockScale: 0.018,
    cycleStrength: 0.0037
  },
  {
    id: 'leisure',
    sector: '여가',
    name: '플레이웨이브',
    emoji: '🎡',
    trait: '경기민감형 · 파동 큼',
    description: '수요가 몰릴 때는 강하지만 분위기가 식으면 흔들리기 쉬운 여가주.',
    basePriceRange: [32000, 76000],
    drift: 0.0015,
    volatility: 0.0105,
    shockChance: 0.09,
    shockScale: 0.017,
    cycleStrength: 0.0055
  },
  {
    id: 'coin',
    sector: '코인',
    name: '코스모코인',
    emoji: '🪙',
    trait: '초고변동 · 한순간 급등락',
    description: '짧은 시간에도 방향이 크게 뒤집힐 수 있는 고위험 고변동 코인.',
    basePriceRange: [9000, 42000],
    drift: 0.002,
    volatility: 0.02,
    shockChance: 0.16,
    shockScale: 0.042,
    cycleStrength: 0.0075
  }
]

let stockPlayers = []
let stockDrafts = new Map()
let stockGameRunning = false
let stockGameFinished = false
let stockElapsedMs = 0
let stockDurationSeconds = 30
let stockGameInterval = null
let stockSetupTurnIndex = 0
let stockMarket = []
let stockFocusedSelectionId = ''

function formatStockMoney(value) {
  return `${stockCurrencyFormatter.format(Math.round(value || 0))}원`
}

function formatStockSignedMoney(value) {
  const safe = Math.round(value || 0)
  const sign = safe > 0 ? '+' : safe < 0 ? '−' : '±'
  return `${sign}${stockCurrencyFormatter.format(Math.abs(safe))}원`
}

function formatStockPercent(value) {
  const safe = Number.isFinite(value) ? value : 0
  const sign = safe > 0 ? '+' : safe < 0 ? '−' : '±'
  return `${sign}${Math.abs(safe).toFixed(1)}%`
}

function formatStockManwon(value) {
  return `${stockCurrencyFormatter.format(Math.round((Number(value) || 0) / STOCK_UNIT_WON))}만원`
}

function wonToManwon(value) {
  return Math.round((Number(value) || 0) / STOCK_UNIT_WON)
}

function manwonToWon(value) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric) || numeric <= 0) return 0
  return clampValue(Math.round(numeric), 0, STOCK_SEED_MANWON) * STOCK_UNIT_WON
}

function clampStockDuration(value) {
  const normalized = Number(value)
  if (!Number.isFinite(normalized)) return 30
  const stepped = Math.round(normalized / STOCK_DURATION_STEP) * STOCK_DURATION_STEP
  return clampValue(stepped, STOCK_MIN_DURATION, STOCK_MAX_DURATION)
}

function createEmptyStockDraftSlots() {
  return Array.from({ length: STOCK_MAX_HOLDINGS }, () => ({ stockId: '', amount: 0 }))
}

function compactStockDraftSlots(slots = []) {
  const normalized = (slots || []).map((slot) => ({
    stockId: slot?.stockId || '',
    amount: Number(slot?.amount) || 0
  }))
  const filled = normalized.filter((slot) => slot.stockId)
  const empty = Array.from({ length: Math.max(0, STOCK_MAX_HOLDINGS - filled.length) }, () => ({ stockId: '', amount: 0 }))
  return filled.concat(empty).slice(0, STOCK_MAX_HOLDINGS)
}

function buildStockDraftEntry(label, slots = null) {
  return {
    label,
    slots: compactStockDraftSlots(slots || createEmptyStockDraftSlots())
  }
}

function createStockMarket() {
  return STOCK_MARKET_META.map((meta, index) => {
    const [minPrice, maxPrice] = meta.basePriceRange
    const price = Math.round(rand(minPrice, maxPrice))
    return {
      ...meta,
      colorClass: `sector-${meta.id}`,
      price,
      openPrice: price,
      lastChangePct: 0,
      lastChangeValue: 0,
      eventText: '개장 대기',
      history: Array.from({ length: STOCK_HISTORY_LENGTH }, () => price),
      momentum: rand(-meta.volatility, meta.volatility),
      cycleSeed: rand(0, Math.PI * 2),
      pulseSeed: rand(0, Math.PI * 2),
      eventCooldown: 0,
      sortOrder: index
    }
  })
}

function ensureStockMarket() {
  if (!stockMarket.length) {
    stockMarket = createStockMarket()
  }
}

function regenerateStockMarket() {
  stockMarket = createStockMarket()
}

function getStockMeta(stockId) {
  return stockMarket.find((stock) => stock.id === stockId) || STOCK_MARKET_META.find((stock) => stock.id === stockId) || null
}

function parseStockConfigToPlayers(text) {
  const rawItems = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!rawItems.length) {
    return { status: 'EMPTY' }
  }

  if (rawItems.length > STOCK_MAX_PLAYERS) {
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
      id: `stock-player-${players.length + 1}`,
      label: normalized,
      cash: 0,
      holdings: [],
      totalAsset: STOCK_SEED_MONEY,
      liveProfit: 0
    })
  }

  return { status: 'OK', players }
}

function handleStockParseFailure(parsed, { showPopupOnInvalid = false } = {}) {
  if (!stockStatusText) return false

  if (parsed.status === 'EMPTY') {
    stockStatusText.textContent = '참가자를 먼저 입력해줘. 예: 홍길동, 김아무개'
    return false
  }

  if (parsed.status === 'TOO_MANY') {
    stockStatusText.textContent = `참가자는 최대 ${STOCK_MAX_PLAYERS}명까지 가능하다.`
    if (showPopupOnInvalid) {
      showPopup('참가자 수 초과', `주식게임은 최대 ${STOCK_MAX_PLAYERS}명까지 참가할 수 있어.`)
    }
    return false
  }

  if (parsed.status === 'DUPLICATE') {
    stockStatusText.textContent = '같은 이름은 2번 이상 입력할 수 없다.'
    if (showPopupOnInvalid) {
      showPopup('중복 이름 불가', '주식게임은 같은 이름을 중복 등록할 수 없어.')
    }
    return false
  }

  stockStatusText.textContent = '입력 형식을 확인해줘. 예: 홍길동, 김아무개'
  if (showPopupOnInvalid) {
    showPopup('입력 확인', '이름만 쉼표로 구분해 적어줘. 예: 홍길동, 김아무개')
  }
  return false
}

function setStockPlayers(players) {
  const previous = new Map()
  stockDrafts.forEach((entry) => {
    previous.set(entry.label, buildStockDraftEntry(entry.label, entry.slots))
  })

  stockPlayers = players
  const nextDrafts = new Map()

  stockPlayers.forEach((player) => {
    const reused = previous.get(player.label)
    nextDrafts.set(player.id, reused ? buildStockDraftEntry(player.label, reused.slots) : buildStockDraftEntry(player.label))
  })

  stockDrafts = nextDrafts
  stockSetupTurnIndex = clampValue(stockSetupTurnIndex, 0, Math.max(0, stockPlayers.length - 1))
  updateStockDescription()
}

function resetStockDrafts() {
  const next = new Map()
  stockPlayers.forEach((player) => {
    next.set(player.id, buildStockDraftEntry(player.label))
  })
  stockDrafts = next
  stockSetupTurnIndex = 0
}

function updateStockDescription() {
  if (!stockDesc) return
  stockDesc.textContent = `총 ${stockPlayers.length || 0}명이 분야별 주식에 투자하고, ${stockDurationSeconds}초 동안 자동 등락을 지켜보는 관찰형 게임이다.`
}

function setStockInputLock(isLocked) {
  if (stockConfigInput) {
    stockConfigInput.disabled = isLocked
    stockConfigInput.style.opacity = isLocked ? '0.65' : '1'
    stockConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
  }

  if (stockDurationInput) {
    stockDurationInput.disabled = isLocked
    stockDurationInput.style.opacity = isLocked ? '0.65' : '1'
    stockDurationInput.style.cursor = isLocked ? 'not-allowed' : ''
  }
}

function setStockSetupLock(isLocked) {
  if (shuffleStockBtn) {
    shuffleStockBtn.disabled = isLocked
    shuffleStockBtn.style.opacity = isLocked ? '0.55' : '1'
    shuffleStockBtn.style.cursor = isLocked ? 'not-allowed' : ''
  }

  if (startStockBtn) {
    startStockBtn.disabled = false
  }

  if (stockCardScreen) {
    stockCardScreen.classList.toggle('stock-setup-locked', isLocked)
  }
}

function getStockDraftValidation(playerId) {
  const draft = stockDrafts.get(playerId)
  const slots = draft?.slots || []
  const positions = []
  const seen = new Set()
  let total = 0
  let hasIncomplete = false
  let hasDuplicate = false
  let hasInvalidAmount = false

  slots.forEach((slot) => {
    const stockId = slot?.stockId || ''
    const amount = Number(slot?.amount) || 0
    const hasStock = Boolean(stockId)
    const hasAmount = amount > 0

    if (hasStock !== hasAmount) {
      hasIncomplete = true
    }

    if (hasStock && hasAmount) {
      if (seen.has(stockId)) {
        hasDuplicate = true
      }
      seen.add(stockId)

      if (amount % 10000 !== 0 || amount < 10000 || amount > STOCK_SEED_MONEY) {
        hasInvalidAmount = true
      }

      total += amount
      positions.push({ stockId, amount })
    }
  })

  const count = positions.length
  const remaining = STOCK_SEED_MONEY - total
  const valid = !hasIncomplete && !hasDuplicate && !hasInvalidAmount && count >= 1 && count <= STOCK_MAX_HOLDINGS && remaining === 0

  let issue = ''
  if (hasDuplicate) {
    issue = '같은 종목은 한 번만 담을 수 있어.'
  } else if (hasIncomplete) {
    issue = '종목과 투자금은 한 줄씩 함께 입력해줘.'
  } else if (hasInvalidAmount) {
    issue = '투자금은 1만원 단위, 최소 1만원부터 가능해.'
  } else if (remaining > 0) {
    issue = `남은 시드머니 ${formatStockMoney(remaining)}을 모두 투자해야 해.`
  } else if (remaining < 0) {
    issue = `투자금이 ${formatStockMoney(Math.abs(remaining))} 초과됐어.`
  } else if (count === 0) {
    issue = '최소 1개 종목은 골라야 해.'
  }

  return {
    valid,
    total,
    remaining,
    positions,
    count,
    issue
  }
}

function getStockReadyCount() {
  return stockPlayers.filter((player) => getStockDraftValidation(player.id).valid).length
}

function updateStockDurationText() {
  if (!stockDurationValue) return
  stockDurationValue.textContent = `${stockDurationSeconds}초`
}

function updateStockStatus(text) {
  if (!stockStatusText) return
  stockStatusText.textContent = text
}

function renderStockPlayerSummary() {
  if (!stockPlayerSummary || !stockTotalInfo) return

  stockPlayerSummary.innerHTML = ''

  const isLiveMode = stockGameRunning || stockGameFinished

  if (stockSummaryTitle) {
    stockSummaryTitle.textContent = isLiveMode ? '실시간 순위' : '참가자 준비 현황'
  }

  if (!stockPlayers.length) {
    stockPlayerSummary.innerHTML = `<div class="stock-empty-state">${isLiveMode ? '게임이 시작되면 실시간 순위가 여기에 표시된다.' : '참가자를 입력하면 준비 현황이 여기에 표시된다.'}</div>`
    stockTotalInfo.textContent = '총 0명'
    return
  }

  if (isLiveMode) {
    const ranking = getStockRanking()
    stockPlayerSummary.innerHTML = ranking
      .map((player, index) => {
        const asset = getStockPlayerAsset(player)
        const profit = getStockPlayerProfit(player)
        return `
          <div class="stock-ranking-item${index === 0 ? ' top' : ''}">
            <div class="stock-ranking-num">${index + 1}</div>
            <div class="stock-ranking-main">
              <strong>${escapeHtml(player.label)}</strong>
              <span class="stock-ranking-asset">${formatStockMoney(asset)}</span>
              <em class="stock-ranking-profit ${profit >= 0 ? 'is-profit' : 'is-loss'}">${formatStockSignedMoney(profit)}</em>
            </div>
          </div>
        `
      })
      .join('')
    stockTotalInfo.textContent = `총 ${ranking.length}명`
    return
  }

  stockPlayers.forEach((player, index) => {
    const validation = getStockDraftValidation(player.id)
    const item = document.createElement('div')
    item.className = `stock-player-summary-item${validation.valid ? ' is-ready' : ''}${index === stockSetupTurnIndex ? ' is-active' : ''}`
    item.innerHTML = `
      <div class="stock-player-summary-top">
        <strong>${escapeHtml(player.label)}</strong>
        <span class="stock-player-summary-badge ${validation.valid ? 'is-ready' : 'is-pending'}">${validation.valid ? '투자 완료' : '배분 중'}</span>
      </div>
      <div class="stock-player-summary-sub">${validation.valid ? `${validation.count}종목 · ${formatStockManwon(validation.total)} 배분 완료` : (validation.count ? `${validation.count}종목 선택 · ${validation.remaining > 0 ? `남은 ${formatStockManwon(validation.remaining)}` : escapeHtml(validation.issue || '조정 필요')}` : '아직 종목을 고르지 않았어.')}</div>
    `
    stockPlayerSummary.appendChild(item)
  })

  stockTotalInfo.textContent = `총 ${stockPlayers.length}명`
}

function renderStockPlayerTabs() {
  if (!stockPlayerTabs) return

  stockPlayerTabs.innerHTML = ''

  stockPlayers.forEach((player, index) => {
    const validation = getStockDraftValidation(player.id)
    const button = document.createElement('button')
    button.type = 'button'
    button.className = `stock-player-tab${index === stockSetupTurnIndex ? ' is-active' : ''}${validation.valid ? ' is-ready' : ''}`
    button.dataset.playerId = player.id
    button.innerHTML = `
      <strong>${escapeHtml(player.label)}</strong>
      <span>${validation.valid ? '완료' : `${validation.count}종목 선택`}</span>
    `
    stockPlayerTabs.appendChild(button)
  })
}

function getStockFocusedSelectionIndex(selectedSlots) {
  if (!selectedSlots.length) {
    stockFocusedSelectionId = ''
    return -1
  }

  let focusedIndex = selectedSlots.findIndex((slot) => slot.stockId === stockFocusedSelectionId)

  if (focusedIndex < 0) {
    focusedIndex = 0
    stockFocusedSelectionId = selectedSlots[0].stockId
  }

  return focusedIndex
}

function moveStockFocusedSelection(direction) {
  const activePlayer = stockPlayers[stockSetupTurnIndex] || stockPlayers[0]
  if (!activePlayer) return

  const selectedSlots = getStockSelectedSlots(activePlayer.id)
  if (selectedSlots.length <= 1) return

  const focusedIndex = getStockFocusedSelectionIndex(selectedSlots)
  const nextIndex = (focusedIndex + direction + selectedSlots.length) % selectedSlots.length
  stockFocusedSelectionId = selectedSlots[nextIndex].stockId
  renderStockAllocationEditor()
}

function syncStockPickedCarouselFocus() {
  // single-card mode keeps only the focused stock visible, so no scroll sync is needed.
}

function renderStockAllocationEditor() {
  if (!stockAllocationEditor || !stockAllocationSummary || !stockActivePlayerTitle) return

  if (!stockPlayers.length) {
    stockActivePlayerTitle.textContent = '현재 투자 차례'
    stockAllocationEditor.innerHTML = '<div class="stock-empty-state">참가자를 입력하면 투자 슬롯이 열린다.</div>'
    stockAllocationSummary.innerHTML = ''
    return
  }

  const activePlayer = stockPlayers[stockSetupTurnIndex] || stockPlayers[0]
  const draft = getStockDraftEntryByPlayerId(activePlayer.id)
  const validation = getStockDraftValidation(activePlayer.id)
  const selectedSlots = draft.slots.filter((slot) => slot.stockId)
  const isLocked = stockGameRunning

  stockActivePlayerTitle.textContent = `${activePlayer.label} 투자 구성`

  if (!selectedSlots.length) {
    stockAllocationEditor.innerHTML = `
      <div class="stock-empty-state stock-empty-state-setup">
        위 종목 카드를 눌러 최대 ${STOCK_MAX_HOLDINGS}개까지 담아줘. 담은 뒤에는 입력칸에 <strong>N만원</strong> 단위로 금액을 넣으면 돼. 중간 매도는 없고, 시작하면 끝까지 결과를 지켜보는 방식이야.
      </div>
    `
  } else {
    const focusedIndex = getStockFocusedSelectionIndex(selectedSlots)
    const activeSlot = selectedSlots[focusedIndex]
    const stock = getStockMeta(activeSlot.stockId)
    const maxAvailable = STOCK_SEED_MONEY - (validation.total - activeSlot.amount)

    const pickedCardHtml = `
      <article class="stock-picked-card stock-picked-slide ${stock?.colorClass || ''}" data-stock-id="${activeSlot.stockId}">
        <div class="stock-picked-head">
          <div class="stock-picked-head-main">
            <div class="stock-picked-badge">${stock?.emoji || '📈'} ${escapeHtml(stock?.sector || '종목')}</div>
            <div class="stock-picked-name">${escapeHtml(stock?.name || activeSlot.stockId)}</div>
            <div class="stock-picked-trait">${escapeHtml(stock?.trait || '')}</div>
          </div>
          <button class="stock-picked-remove-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" ${isLocked ? 'disabled' : ''}>삭제</button>
        </div>
        <div class="stock-picked-price-row">
          <span>현재가</span>
          <strong>${formatStockMoney(stock?.price || 0)}</strong>
        </div>
        <div class="stock-quick-row">
          <button class="stock-chip-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-step="-10" ${isLocked ? 'disabled' : ''}>-10</button>
          <button class="stock-chip-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-step="-5" ${isLocked ? 'disabled' : ''}>-5</button>
          <button class="stock-chip-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-step="-1" ${isLocked ? 'disabled' : ''}>-1</button>
          <button class="stock-chip-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-step="1" ${isLocked ? 'disabled' : ''}>+1</button>
          <button class="stock-chip-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-step="5" ${isLocked ? 'disabled' : ''}>+5</button>
          <button class="stock-chip-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-step="10" ${isLocked ? 'disabled' : ''}>+10</button>
        </div>
        <div class="stock-manwon-input-row">
          <label class="stock-manwon-label">투자금</label>
          <div class="stock-manwon-control">
            <input class="stock-amount-input stock-amount-input-manwon" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-amount-input="true" type="text" inputmode="numeric" pattern="[0-9]*" placeholder="0" value="${activeSlot.amount ? wonToManwon(activeSlot.amount) : ''}" ${isLocked ? 'disabled' : ''} />
            <span>만원</span>
          </div>
          <button class="stock-fill-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-fill="remaining" ${isLocked ? 'disabled' : ''}>잔액 전부</button>
        </div>
        <div class="stock-picked-meta">현재 ${formatStockManwon(activeSlot.amount)} · 이 종목에 최대 ${formatStockManwon(maxAvailable)}까지 넣을 수 있어.</div>
      </article>
    `

    stockAllocationEditor.innerHTML = `
      <div class="stock-picked-carousel-toolbar">
        <div class="stock-picked-carousel-hint">선택한 종목을 하나씩 넘기며 투자해줘</div>
        <div class="stock-picked-carousel-nav">
          <button class="stock-carousel-nav-btn" type="button" data-stock-carousel-nav="prev" ${selectedSlots.length <= 1 || isLocked ? 'disabled' : ''}>←</button>
          <span class="stock-picked-carousel-count">${focusedIndex + 1} / ${selectedSlots.length}</span>
          <button class="stock-carousel-nav-btn" type="button" data-stock-carousel-nav="next" ${selectedSlots.length <= 1 || isLocked ? 'disabled' : ''}>→</button>
        </div>
      </div>
      <div class="stock-picked-carousel is-single-view">${pickedCardHtml}</div>
    `
  }

  syncStockPickedCarouselFocus()

  stockAllocationSummary.innerHTML = `
    <div class="stock-allocation-chip-grid">
      <div class="stock-allocation-total is-total ${validation.valid ? 'is-ready' : ''}">
        <span>총 투자금</span>
        <strong>${formatStockManwon(validation.total)}</strong>
      </div>
      <div class="stock-allocation-total is-remaining ${validation.remaining === 0 ? 'is-ready' : validation.remaining < 0 ? 'is-danger' : ''}">
        <span>남은 금액</span>
        <strong>${validation.remaining >= 0 ? formatStockManwon(validation.remaining) : `초과 ${formatStockManwon(Math.abs(validation.remaining))}`}</strong>
      </div>
      <div class="stock-allocation-total">
        <span>선택 종목</span>
        <strong>${validation.count} / ${STOCK_MAX_HOLDINGS}</strong>
      </div>
    </div>
    <div class="stock-allocation-note${validation.valid ? ' is-ready' : ''}">${validation.valid ? '준비 완료. 다음 참가자로 넘어가거나 바로 관찰형 게임을 시작할 수 있어.' : escapeHtml(validation.issue || '시드머니 100만원을 모두 채워야 준비 완료돼.')}</div>
    <div class="stock-helper-actions">
      <button class="stock-turn-btn" type="button" data-stock-action="equalize" ${!selectedSlots.length || isLocked ? 'disabled' : ''}>균등 배분</button>
      <button class="stock-turn-btn" type="button" data-stock-action="clear-all" ${!selectedSlots.length || isLocked ? 'disabled' : ''}>전체 비우기</button>
    </div>
    <div class="stock-turn-actions">
      <button class="stock-turn-btn" type="button" data-stock-turn="prev" ${stockSetupTurnIndex === 0 || isLocked ? 'disabled' : ''}>← 이전 참가자</button>
      <button class="stock-turn-btn" type="button" data-stock-turn="next" ${stockSetupTurnIndex >= stockPlayers.length - 1 || isLocked ? 'disabled' : ''}>다음 참가자 →</button>
    </div>
  `
}

function renderStockReadyBadge() {
  if (!stockReadyBadge) return
  const readyCount = getStockReadyCount()
  stockReadyBadge.textContent = `${readyCount}/${stockPlayers.length || 0}명 준비`
  stockReadyBadge.classList.toggle('is-ready', stockPlayers.length > 0 && readyCount === stockPlayers.length)
}

function renderStockRoster() {
  if (!stockRoster) return

  ensureStockMarket()

  const activePlayer = stockPlayers[stockSetupTurnIndex] || stockPlayers[0] || null
  const selectedSlots = activePlayer ? getStockSelectedSlots(activePlayer.id) : []
  const selectedMap = new Map(selectedSlots.map((slot) => [slot.stockId, slot]))
  const selectedCount = selectedSlots.length
  const isLocked = stockGameRunning

  stockRoster.innerHTML = stockMarket
    .map((stock) => {
      const selected = selectedMap.has(stock.id)
      const selectedSlot = selectedMap.get(stock.id)
      const disabled = isLocked || (!selected && selectedCount >= STOCK_MAX_HOLDINGS)
      return `
        <button class="stock-roster-card stock-roster-card-btn ${stock.colorClass}${selected ? ' is-selected' : ''}" type="button" data-player-id="${activePlayer?.id || ''}" data-stock-id="${stock.id}" ${disabled ? 'disabled' : ''}>
          <div class="stock-roster-topline">
            <span class="stock-roster-emoji" aria-hidden="true">${stock.emoji}</span>
            <span class="stock-roster-select-state">${selected ? `${formatStockManwon(selectedSlot.amount)}` : '담기'}</span>
          </div>
          <div class="stock-roster-name">${stock.name}</div>
          <div class="stock-roster-info-line stock-roster-price-line">
            <span>현재 시세</span>
            <strong>${formatStockMoney(stock.price)}</strong>
          </div>
          <div class="stock-roster-info-line stock-roster-trait-line">
            <span>특징</span>
            <strong>${stock.trait}</strong>
          </div>
          <p class="stock-roster-desc">${selected ? '선택됨 · 아래에서 투자금 입력' : '카드 눌러서 담기'}</p>
        </button>
      `
    })
    .join('')
}

function getStockHistoryPoints(history) {
  const values = history.slice(-STOCK_HISTORY_LENGTH)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const range = maxValue - minValue || 1

  return values
    .map((value, index) => {
      const x = values.length === 1 ? 0 : (index / (values.length - 1)) * 100
      const y = 52 - ((value - minValue) / range) * 40
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}

function getStockHoldingValue(holding) {
  if (holding.sold) {
    return holding.realizedValue || 0
  }

  const stock = getStockMeta(holding.stockId)
  if (!stock) return 0
  return holding.shares * stock.price
}

function getStockHoldingProfit(holding) {
  return getStockHoldingValue(holding) - holding.amount
}

function getStockPlayerAsset(player) {
  const cash = Number(player.cash) || 0
  const holdingsValue = (player.holdings || []).reduce((sum, holding) => sum + getStockHoldingValue(holding), 0)
  return cash + holdingsValue
}

function getStockPlayerProfit(player) {
  return getStockPlayerAsset(player) - STOCK_SEED_MONEY
}

function getStockChartHolders(stockId) {
  return stockPlayers
    .map((player) => {
      const holding = (player.holdings || []).find((item) => item.stockId === stockId)
      if (!holding) return null
      return { player, holding }
    })
    .filter(Boolean)
}

function renderStockBoard() {
  if (!stockBoard) return

  ensureStockMarket()

  stockBoard.innerHTML = stockMarket
    .map((stock) => {
      const holders = getStockChartHolders(stock.id)
      const priceDiff = stock.price - stock.openPrice
      const percentDiff = stock.openPrice ? (priceDiff / stock.openPrice) * 100 : 0
      const points = getStockHistoryPoints(stock.history)

      const holderHtml = holders.length
        ? holders
            .map(({ player, holding }) => {
              const profit = getStockHoldingProfit(holding)
              const value = getStockHoldingValue(holding)
              const percent = holding.amount ? (profit / holding.amount) * 100 : 0
              return `
                <div class="stock-holder-row ${profit >= 0 ? 'is-profit' : 'is-loss'}${holding.sold ? ' is-sold' : ''}">
                  <strong>${escapeHtml(player.label)}</strong>
                  <span>${stockGameFinished || holding.sold ? '종료 정산' : '보유중'}</span>
                  <em>${formatStockSignedMoney(profit)} · ${formatStockPercent(percent)}</em>
                  <small>평가금액 ${formatStockMoney(value)}</small>
                </div>
              `
            })
            .join('')
        : '<div class="stock-holder-empty">현재 이 종목을 보유한 참가자가 없어.</div>'

      return `
        <article class="stock-chart-card ${stock.colorClass}">
          <div class="stock-chart-head">
            <div>
              <span class="stock-sector-chip">${stock.emoji} ${stock.sector}</span>
              <h4>${stock.name}</h4>
            </div>
            <div class="stock-chart-price-block ${priceDiff >= 0 ? 'is-up' : 'is-down'}">
              <strong>${formatStockMoney(stock.price)}</strong>
              <span>${formatStockSignedMoney(priceDiff)} · ${formatStockPercent(percentDiff)}</span>
            </div>
          </div>
          <div class="stock-chart-shell">
            <svg viewBox="0 0 100 56" preserveAspectRatio="none" aria-hidden="true">
              <polyline class="stock-chart-line ${priceDiff >= 0 ? 'is-up' : 'is-down'}" points="${points}"></polyline>
            </svg>
          </div>
          <div class="stock-chart-note">${stock.trait} · ${stock.eventText}</div>
          <div class="stock-chart-holders">
            ${holderHtml}
          </div>
        </article>
      `
    })
    .join('')
}

function renderStockPortfolio() {
  if (!stockPortfolioList) return

  if (!stockPlayers.length) {
    stockPortfolioList.innerHTML = '<div class="stock-empty-state">게임이 시작되면 각 참가자의 보유 현황이 여기에 표시된다.</div>'
    return
  }

  stockPortfolioList.innerHTML = stockPlayers
    .map((player) => {
      const totalAsset = getStockPlayerAsset(player)
      const profit = getStockPlayerProfit(player)
      const holdings = player.holdings || []
      const holdingsHtml = holdings.length
        ? holdings
            .map((holding) => {
              const stock = getStockMeta(holding.stockId)
              const value = getStockHoldingValue(holding)
              const pnl = value - holding.amount
              const stateText = stockGameFinished || holding.sold ? '종료 정산' : '보유중'
              return `
                <div class="stock-holding-chip ${holding.sold ? 'is-sold' : ''}">
                  <div class="stock-holding-meta">
                    <div class="stock-holding-topline">
                      <strong>${escapeHtml(stock?.name || holding.stockId)}</strong>
                      <span class="stock-holding-state">${stateText}</span>
                    </div>
                    <span>${formatStockMoney(holding.amount)} → ${formatStockMoney(value)}</span>
                    <em>${formatStockSignedMoney(pnl)}</em>
                  </div>
                </div>
              `
            })
            .join('')
        : '<div class="stock-holder-empty">아직 구성된 종목이 없어.</div>'

      return `
        <article class="stock-portfolio-card">
          <div class="stock-portfolio-head">
            <div>
              <h4>${escapeHtml(player.label)}</h4>
              <p>현재 총자산 ${formatStockMoney(totalAsset)}</p>
            </div>
            <div class="stock-portfolio-profit ${profit >= 0 ? 'is-profit' : 'is-loss'}">${formatStockSignedMoney(profit)}</div>
          </div>
          <div class="stock-portfolio-cash">현금 ${formatStockMoney(player.cash || 0)}</div>
          <div class="stock-holdings-list">${holdingsHtml}</div>
        </article>
      `
    })
    .join('')
}

function getStockRanking() {
  return [...stockPlayers].sort((a, b) => {
    const assetDiff = getStockPlayerAsset(b) - getStockPlayerAsset(a)
    if (assetDiff !== 0) return assetDiff
    return a.label.localeCompare(b.label, 'ko')
  })
}

function renderStockRanking() {
  if (!stockRankingList) return

  if (!stockPlayers.length) {
    stockRankingList.innerHTML = '<div class="stock-empty-state">게임이 시작되면 실시간 순위가 여기에 표시된다.</div>'
    return
  }

  const ranking = getStockRanking()
  stockRankingList.innerHTML = ranking
    .map((player, index) => {
      const asset = getStockPlayerAsset(player)
      const profit = getStockPlayerProfit(player)
      return `
        <div class="stock-ranking-item${index === 0 ? ' top' : ''}">
          <div class="stock-ranking-num">${index + 1}</div>
          <div class="stock-ranking-main">
            <strong>${escapeHtml(player.label)}</strong>
            <span class="stock-ranking-asset">${formatStockMoney(asset)}</span>
            <em class="stock-ranking-profit ${profit >= 0 ? 'is-profit' : 'is-loss'}">${formatStockSignedMoney(profit)}</em>
          </div>
        </div>
      `
    })
    .join('')
}

function renderStockTimer() {
  if (!stockTimerBadge) return

  if (stockGameRunning) {
    const remaining = Math.max(0, stockDurationSeconds - Math.ceil(stockElapsedMs / 1000))
    stockTimerBadge.textContent = `${remaining}초 남음`
    stockTimerBadge.classList.add('is-live')
    return
  }

  if (stockGameFinished) {
    stockTimerBadge.textContent = '종료'
    stockTimerBadge.classList.remove('is-live')
    return
  }

  stockTimerBadge.textContent = '준비중'
  stockTimerBadge.classList.remove('is-live')
}

function renderStockGame() {
  updateStockViewMode()
  renderStockPlayerSummary()
  renderStockPlayerTabs()
  renderStockReadyBadge()
  renderStockRoster()
  renderStockAllocationEditor()
  renderStockBoard()
  renderStockPortfolio()
  renderStockRanking()
  renderStockTimer()
}

function setStockTurnByPlayerId(playerId) {
  const nextIndex = stockPlayers.findIndex((player) => player.id === playerId)
  if (nextIndex >= 0) {
    stockSetupTurnIndex = nextIndex
    renderStockGame()
  }
}

function updateStockFromInput({ render = true, preserveDrafts = true } = {}) {
  if (!stockConfigInput) return false

  const parsed = parseStockConfigToPlayers(stockConfigInput.value)
  if (parsed.status !== 'OK') {
    return handleStockParseFailure(parsed)
  }

  if (!preserveDrafts) {
    stockDrafts = new Map()
  }

  setStockPlayers(parsed.players)

  if (!preserveDrafts) {
    resetStockDrafts()
  }

  if (render) {
    renderStockGame()
    updateStockStatus(`실시간 반영 완료: 총 ${stockPlayers.length}명`)
  }

  return true
}

function ensureStockReady() {
  ensureStockMarket()

  if (stockDurationInput) {
    stockDurationSeconds = clampStockDuration(stockDurationInput.value)
    stockDurationInput.value = String(stockDurationSeconds)
  }
  updateStockDurationText()

  if (!stockPlayers.length && stockConfigInput) {
    const parsed = parseStockConfigToPlayers(stockConfigInput.value)
    if (parsed.status === 'OK') {
      setStockPlayers(parsed.players)
    } else {
      stockConfigInput.value = '홍길동, 김아무개'
      const fallbackParsed = parseStockConfigToPlayers(stockConfigInput.value)
      if (fallbackParsed.status === 'OK') {
        setStockPlayers(fallbackParsed.players)
      }
    }
  }

  renderStockGame()

  if (!stockGameRunning && !stockGameFinished) {
    updateStockStatus('종목 카드를 눌러 담고, 입력칸에 N만원 단위로 배분을 끝내면 바로 관찰형 게임을 시작할 수 있다.')
  }
}

function sanitizeStockAmount(value) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric) || numeric <= 0) return 0
  return clampValue(Math.round(numeric / STOCK_UNIT_WON) * STOCK_UNIT_WON, 0, STOCK_SEED_MONEY)
}

function getStockDraftEntryByPlayerId(playerId) {
  const player = stockPlayers.find((item) => item.id === playerId)
  const existing = stockDrafts.get(playerId)
  if (existing) {
    return buildStockDraftEntry(existing.label || player?.label || '', existing.slots)
  }
  return buildStockDraftEntry(player?.label || '')
}

function saveStockDraftEntry(playerId, entry) {
  const player = stockPlayers.find((item) => item.id === playerId)
  stockDrafts.set(playerId, buildStockDraftEntry(entry?.label || player?.label || '', entry?.slots || []))
}

function getStockSelectedSlots(playerId) {
  return getStockDraftEntryByPlayerId(playerId).slots.filter((slot) => slot.stockId)
}

function getStockDraftSlotIndex(playerId, stockId) {
  return getStockDraftEntryByPlayerId(playerId).slots.findIndex((slot) => slot.stockId === stockId)
}

function toggleStockDraftSelection(playerId, stockId) {
  if (stockGameRunning) return

  const entry = getStockDraftEntryByPlayerId(playerId)
  const slots = entry.slots.map((slot) => ({ ...slot }))
  const currentIndex = slots.findIndex((slot) => slot.stockId === stockId)

  if (currentIndex >= 0) {
    slots[currentIndex] = { stockId: '', amount: 0 }
    saveStockDraftEntry(playerId, { ...entry, slots })
    renderStockGame()
    return
  }

  const filledCount = slots.filter((slot) => slot.stockId).length
  if (filledCount >= STOCK_MAX_HOLDINGS) {
    showPopup('종목 선택 제한', `한 참가자는 최대 ${STOCK_MAX_HOLDINGS}개 종목까지 선택할 수 있어.`)
    return
  }

  const emptyIndex = slots.findIndex((slot) => !slot.stockId)
  if (emptyIndex < 0) return

  slots[emptyIndex] = { stockId, amount: 0 }
  saveStockDraftEntry(playerId, { ...entry, slots })
  renderStockGame()
}

function setStockDraftAmountByStock(playerId, stockId, amountWon) {
  const entry = getStockDraftEntryByPlayerId(playerId)
  const slots = entry.slots.map((slot) => ({ ...slot }))
  const currentIndex = slots.findIndex((slot) => slot.stockId === stockId)
  if (currentIndex < 0) return
  slots[currentIndex].amount = sanitizeStockAmount(amountWon)
  saveStockDraftEntry(playerId, { ...entry, slots })
  renderStockGame()
}

function adjustStockDraftAmountByStock(playerId, stockId, deltaManwon) {
  const entry = getStockDraftEntryByPlayerId(playerId)
  const slot = entry.slots.find((item) => item.stockId === stockId)
  if (!slot) return
  setStockDraftAmountByStock(playerId, stockId, slot.amount + deltaManwon * STOCK_UNIT_WON)
}

function clearStockDraftStock(playerId, stockId) {
  const entry = getStockDraftEntryByPlayerId(playerId)
  const slots = entry.slots.map((slot) => ({ ...slot }))
  const currentIndex = slots.findIndex((slot) => slot.stockId === stockId)
  if (currentIndex < 0) return
  slots[currentIndex] = { stockId: '', amount: 0 }
  saveStockDraftEntry(playerId, { ...entry, slots })
  renderStockGame()
}

function fillRemainingStockDraftAmount(playerId, stockId) {
  const validation = getStockDraftValidation(playerId)
  if (validation.remaining <= 0) return
  const entry = getStockDraftEntryByPlayerId(playerId)
  const slot = entry.slots.find((item) => item.stockId === stockId)
  if (!slot) return
  setStockDraftAmountByStock(playerId, stockId, slot.amount + validation.remaining)
}

function equalizeStockDraftAmounts(playerId) {
  const entry = getStockDraftEntryByPlayerId(playerId)
  const selectedSlots = entry.slots.filter((slot) => slot.stockId)
  if (!selectedSlots.length) {
    showPopup('균등 배분 안내', '먼저 종목 카드를 눌러 최소 1개 종목을 선택해줘.')
    return
  }

  const base = Math.floor(STOCK_SEED_MANWON / selectedSlots.length)
  let remainder = STOCK_SEED_MANWON - base * selectedSlots.length
  const nextSlots = entry.slots.map((slot) => {
    if (!slot.stockId) return { stockId: '', amount: 0 }
    const bonus = remainder > 0 ? 1 : 0
    if (remainder > 0) remainder -= 1
    return {
      stockId: slot.stockId,
      amount: (base + bonus) * STOCK_UNIT_WON
    }
  })

  saveStockDraftEntry(playerId, { ...entry, slots: nextSlots })
  renderStockGame()
}

function clearAllStockDraftAmounts(playerId) {
  const entry = getStockDraftEntryByPlayerId(playerId)
  const nextSlots = entry.slots.map(() => ({ stockId: '', amount: 0 }))
  saveStockDraftEntry(playerId, { ...entry, slots: nextSlots })
  renderStockGame()
}

function commitStockAmountInput(target, options = {}) {
  if (!(target instanceof HTMLInputElement)) return

  const { restoreFocus = false } = options
  const playerId = target.dataset.playerId
  const stockId = target.dataset.stockId

  if (!playerId || !stockId) return

  const digitsOnly = String(target.value || '').replace(/[^\d]/g, '')
  const cursorPosition = digitsOnly.length

  if (target.value !== digitsOnly) {
    target.value = digitsOnly
  }

  stockFocusedSelectionId = stockId
  setStockDraftAmountByStock(playerId, stockId, manwonToWon(digitsOnly))

  if (!restoreFocus) return

  requestAnimationFrame(() => {
    const refreshedInput = stockAllocationEditor?.querySelector(
      `.stock-amount-input[data-player-id="${playerId}"][data-stock-id="${stockId}"]`
    )

    if (!(refreshedInput instanceof HTMLInputElement)) return

    refreshedInput.focus({ preventScroll: true })
    refreshedInput.setSelectionRange(cursorPosition, cursorPosition)
  })
}

function updateStockViewMode() {
  if (!stockCardScreen) return
  const isLiveMode = stockGameRunning || stockGameFinished
  stockCardScreen.classList.toggle('stock-view-setup', !isLiveMode)
  stockCardScreen.classList.toggle('stock-view-live', isLiveMode)
}

function updateStockDraftField(playerId, slotIndex, field, value) {
  const entry = getStockDraftEntryByPlayerId(playerId)
  if (!entry.slots[slotIndex]) return

  if (field === 'stockId') {
    entry.slots[slotIndex].stockId = String(value || '')
    if (!entry.slots[slotIndex].stockId) {
      entry.slots[slotIndex].amount = 0
    }
  }

  if (field === 'amount') {
    entry.slots[slotIndex].amount = manwonToWon(value)
  }

  saveStockDraftEntry(playerId, entry)
  renderStockGame()
}

function buildStockRoundPlayers() {
  return stockPlayers.map((player) => {
    const validation = getStockDraftValidation(player.id)
    const holdings = validation.positions.map((position, index) => {
      const stock = getStockMeta(position.stockId)
      const buyPrice = stock?.price || 1
      return {
        id: `${player.id}-holding-${index + 1}`,
        stockId: position.stockId,
        amount: position.amount,
        buyPrice,
        shares: position.amount / buyPrice,
        sold: false,
        realizedValue: 0,
        sellPrice: 0
      }
    })

    return {
      id: player.id,
      label: player.label,
      cash: 0,
      holdings
    }
  })
}

function getStockEventText(stock, changePct) {
  if (stock.id === 'coin') {
    if (changePct >= 0.03) return '코인 매수세 폭발'
    if (changePct <= -0.03) return '코인 급락 경보'
  }

  if (stock.id === 'tech') {
    if (changePct >= 0.018) return '기술 테마 강세'
    if (changePct <= -0.018) return '차익 실현 매물 출회'
  }

  if (stock.id === 'medical') {
    if (changePct >= 0.012) return '방어주 선호 유입'
    if (changePct <= -0.012) return '차분한 조정'
  }

  if (stock.id === 'beauty') {
    if (changePct >= 0.017) return '뷰티 바이럴 확산'
    if (changePct <= -0.017) return '유행 식는 중'
  }

  if (stock.id === 'leisure') {
    if (changePct >= 0.017) return '여가 수요 급증'
    if (changePct <= -0.017) return '소비 심리 위축'
  }

  if (stock.id === 'food') {
    if (changePct >= 0.01) return '필수소비재 방어력 발동'
    if (changePct <= -0.01) return '수급 조정 구간'
  }

  return changePct >= 0 ? '완만한 상승' : '완만한 하락'
}

function updateSingleStockTick(stock, tickIndex) {
  const cycleWave = Math.sin(tickIndex * 0.32 + stock.cycleSeed) * stock.cycleStrength
  const pulse = Math.cos(tickIndex * 0.18 + stock.pulseSeed) * stock.cycleStrength * 0.6
  const noise = rand(-stock.volatility, stock.volatility)
  stock.momentum = clampValue(stock.momentum * 0.74 + cycleWave * 0.8 + pulse * 0.4 + noise * 0.45, -0.08, 0.08)

  let shock = 0
  if (Math.random() < stock.shockChance) {
    shock = rand(-stock.shockScale, stock.shockScale)
    stock.eventCooldown = 3
  } else if (stock.eventCooldown > 0) {
    stock.eventCooldown -= 1
  }

  const changePct = stock.drift + stock.momentum + noise + shock
  const prevPrice = stock.price
  const nextPrice = Math.max(1000, Math.round(prevPrice * (1 + changePct)))
  stock.price = nextPrice
  stock.lastChangeValue = nextPrice - prevPrice
  stock.lastChangePct = prevPrice ? stock.lastChangeValue / prevPrice : 0
  stock.eventText = getStockEventText(stock, stock.lastChangePct)
  stock.history.push(nextPrice)
  if (stock.history.length > STOCK_HISTORY_LENGTH) {
    stock.history.shift()
  }
}

function finalizeStockAutoSell() {
  stockPlayers.forEach((player) => {
    player.holdings.forEach((holding) => {
      if (holding.sold) return
      const value = getStockHoldingValue(holding)
      player.cash += value
      holding.sold = true
      holding.realizedValue = value
      holding.sellPrice = getStockMeta(holding.stockId)?.price || holding.buyPrice
    })
  })
}

function showStockResultsPopup() {
  const ranking = getStockRanking()
  const html = `
    <div class="stock-results-popup-list">
      ${ranking
        .map((player, index) => {
          const asset = getStockPlayerAsset(player)
          const profit = getStockPlayerProfit(player)
          return `
            <div class="stock-results-popup-item">
              <div class="stock-results-popup-rank">${index + 1}위</div>
              <strong>${escapeHtml(player.label)}</strong>
              <span>최종 자산 ${formatStockMoney(asset)}</span>
              <em class="${profit >= 0 ? 'is-profit' : 'is-loss'}">${formatStockSignedMoney(profit)}</em>
            </div>
          `
        })
        .join('')}
    </div>
  `

  showPopup('주식게임 최종 순위', html, { icon: '🏆', allowHtml: true, popupClass: 'stock-results-popup' })
}

function finishStockGame() {
  if (stockGameFinished) return
  if (stockGameInterval) {
    clearInterval(stockGameInterval)
    stockGameInterval = null
  }

  stockGameRunning = false
  stockGameFinished = true
  stockElapsedMs = stockDurationSeconds * 1000
  finalizeStockAutoSell()
  setStockInputLock(false)
  setStockSetupLock(false)
  updateStockStatus('게임 종료! 최종 자산이 자동으로 정산됐어.')
  renderStockGame()
  showStockResultsPopup()
}

function tickStockGame() {
  if (!stockGameRunning) return

  stockElapsedMs += STOCK_TICK_MS
  const tickIndex = Math.floor(stockElapsedMs / STOCK_TICK_MS)
  stockMarket.forEach((stock) => updateSingleStockTick(stock, tickIndex))
  renderStockBoard()
  renderStockPlayerSummary()
  renderStockPortfolio()
  renderStockRanking()
  renderStockTimer()

  if (stockElapsedMs >= stockDurationSeconds * 1000) {
    finishStockGame()
  }
}

function startStockGame() {
  if (stockGameRunning) return
  if (!stockConfigInput) return

  const parsed = parseStockConfigToPlayers(stockConfigInput.value)
  if (parsed.status !== 'OK') {
    handleStockParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  if (parsed.players.length < 2) {
    showMinParticipantsPopup(STOCK_MAX_PLAYERS)
    return
  }

  setStockPlayers(parsed.players)

  const invalidPlayer = stockPlayers.find((player) => !getStockDraftValidation(player.id).valid)
  if (invalidPlayer) {
    setStockTurnByPlayerId(invalidPlayer.id)
    showPopup('투자 준비 확인', `${invalidPlayer.label}의 투자 구성이 아직 완성되지 않았어. 종목 카드를 고르고 N만원 단위로 시드머니 100만원을 모두 채워줘.`)
    return
  }

  stockPlayers = buildStockRoundPlayers()
  stockGameRunning = true
  stockGameFinished = false
  stockElapsedMs = 0
  setStockInputLock(true)
  setStockSetupLock(true)
  updateStockStatus('실시간 변동 시작! 중간 매도 없이 끝까지 지켜보는 관찰형 주식게임이야.')
  renderStockGame()

  if (stockGameInterval) {
    clearInterval(stockGameInterval)
  }
  stockGameInterval = setInterval(tickStockGame, STOCK_TICK_MS)
}

function sellStockHolding(playerId, stockId) {
  if (!stockGameRunning) return
  const player = stockPlayers.find((item) => item.id === playerId)
  if (!player) return

  const holding = player.holdings.find((item) => item.stockId === stockId)
  if (!holding || holding.sold) return

  const value = getStockHoldingValue(holding)
  player.cash += value
  holding.sold = true
  holding.realizedValue = value
  holding.sellPrice = getStockMeta(holding.stockId)?.price || holding.buyPrice

  updateStockStatus(`${player.label}이(가) ${getStockMeta(stockId)?.name || stockId}을(를) ${formatStockMoney(value)}에 매도했다.`)
  renderStockBoard()
  renderStockPortfolio()
  renderStockRanking()
}

function stopStockGame(options = {}) {
  const { preserveSetup = true } = options
  if (stockGameInterval) {
    clearInterval(stockGameInterval)
    stockGameInterval = null
  }

  stockGameRunning = false

  if (!preserveSetup) {
    stockGameFinished = false
    stockElapsedMs = 0
    stockPlayers = []
    stockDrafts = new Map()
    regenerateStockMarket()
  }

  renderStockTimer()
}

function shuffleStockParticipants() {
  if (!stockConfigInput || stockGameRunning) return

  const parsed = parseStockConfigToPlayers(stockConfigInput.value)
  if (parsed.status !== 'OK') {
    handleStockParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  const shuffled = shuffleArray(parsed.players)
  stockConfigInput.value = shuffled.map((player) => player.label).join(', ')
  setStockPlayers(shuffled)
  resetStockDrafts()
  regenerateStockMarket()
  renderStockGame()
  updateStockStatus('참가자 순서와 주식 시세를 새로 셔플했어.')
}

function resetStockGame() {
  stopStockGame({ preserveSetup: true })
  stockGameFinished = false
  stockElapsedMs = 0
  setStockInputLock(false)
  setStockSetupLock(false)

  if (stockConfigInput) {
    const parsed = parseStockConfigToPlayers(stockConfigInput.value)
    if (parsed.status === 'OK') {
      setStockPlayers(parsed.players)
    } else {
      stockConfigInput.value = '홍길동, 김아무개'
      const fallbackParsed = parseStockConfigToPlayers(stockConfigInput.value)
      if (fallbackParsed.status === 'OK') {
        setStockPlayers(fallbackParsed.players)
      }
    }
  }

  resetStockDrafts()
  regenerateStockMarket()
  renderStockGame()
  updateStockStatus('리셋 완료. 종목 카드를 다시 고르고 N만원 단위로 새롭게 배분해줘.')
}

function startRace() {
  if (!raceConfigInput) return

  const parsed = parseRaceConfigToHorses(raceConfigInput.value)

  if (!handleRaceParseFailure(parsed, { showPopupOnTooMany: true, showPopupOnInvalid: true })) {
    return
  }

  if (parsed.horses.length < 2) {
    showMinParticipantsPopup(RACE_MAX_COUNT)
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
  raceElapsedMs = 0
  setRaceInputLock(true)
  setRaceShuffleLock(true)

  addRaceCommentary('게이트 오픈, 경주가 시작되었습니다! 셔플한 레인 순서와 지정 색상 그대로 출발합니다.')

  scheduleRaceEventLoop()
  scheduleRaceCommentaryLoop()
  raceAnimationFrame = requestAnimationFrame(raceFrame)
}



const LADDER_DESKTOP_MAX_PLAYERS = 8
const LADDER_MOBILE_MAX_PLAYERS = 4
const LADDER_MIN_PLAYERS = 2
const LADDER_PLAYER_PALETTE = ['#ff82ad', '#6ce8d1', '#7fd8ff', '#ffd56f', '#c9b6ff', '#ffa97d', '#9fe9df', '#ffb087', '#d6c3ff', '#89f2b8', '#ffe07e', '#ffb6dc']

let ladderPlayers = []
let ladderRungs = []
let ladderResults = []
let ladderCheckedIds = new Set()
let ladderGameStarted = false
let ladderRevealed = false
let ladderRows = 0
let ladderLastValidConfigText = ladderConfigInput ? ladderConfigInput.value : ''
let ladderAutoRunning = false
let ladderActivePlayerId = ''
let ladderRunToken = 0
let ladderActiveProgress = 0
let ladderProgressRaf = null

function getLadderMaxPlayers() {
  return isMobileOrTabletLike() ? LADDER_MOBILE_MAX_PLAYERS : LADDER_DESKTOP_MAX_PLAYERS
}

function updateLadderHelperText() {
  if (!ladderHelperText) return
  const max = getLadderMaxPlayers()
  ladderHelperText.textContent = isMobileOrTabletLike()
    ? `이름(번호) 형식만 가능. 모바일 최대 ${max}명, 번호는 1~참가자 수 안에서 중복 없이 입력.`
    : `이름(번호) 형식만 가능. 데스크톱 최대 ${max}명, 번호는 1~참가자 수 안에서 중복 없이 입력.`
}

function parseLadderPlayers(text) {
  const maxPlayers = getLadderMaxPlayers()
  const rawItems = String(text || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!rawItems.length) return { status: 'EMPTY', maxPlayers }
  if (rawItems.length < LADDER_MIN_PLAYERS) return { status: 'TOO_FEW', count: rawItems.length, maxPlayers }
  if (rawItems.length > maxPlayers) return { status: 'TOO_MANY', count: rawItems.length, maxPlayers }

  const participantCount = rawItems.length
  const seenNames = new Set()
  const seenLanes = new Set()
  const players = []

  for (const raw of rawItems) {
    const match = raw.match(/^(.+?)\s*\(\s*(\d+)\s*\)$/)
    if (!match) {
      return { status: 'INVALID_FORMAT', value: raw, maxPlayers }
    }

    const label = match[1].trim()
    const laneNumber = Number(match[2])

    if (!label || !Number.isInteger(laneNumber)) {
      return { status: 'INVALID_FORMAT', value: raw, maxPlayers }
    }

    if (laneNumber < 1 || laneNumber > participantCount) {
      return { status: 'OUT_OF_RANGE', laneNumber, participantCount, maxPlayers }
    }

    if (seenNames.has(label)) {
      return { status: 'DUPLICATE_NAME', name: label, maxPlayers }
    }

    if (seenLanes.has(laneNumber)) {
      return { status: 'DUPLICATE_LANE', laneNumber, maxPlayers }
    }

    seenNames.add(label)
    seenLanes.add(laneNumber)

    players.push({
      id: `ladder-player-${players.length + 1}`,
      label,
      raw,
      laneNumber,
      startLane: laneNumber - 1,
      color: LADDER_PLAYER_PALETTE[(laneNumber - 1) % LADDER_PLAYER_PALETTE.length]
    })
  }

  return {
    status: 'OK',
    players: players.sort((a, b) => a.startLane - b.startLane),
    maxPlayers
  }
}

function setLadderInputLock(isLocked) {
  if (ladderConfigInput) {
    ladderConfigInput.disabled = isLocked
    ladderConfigInput.style.opacity = isLocked ? '0.65' : '1'
    ladderConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
  }

  if (shuffleLadderBtn) {
    shuffleLadderBtn.disabled = true
    shuffleLadderBtn.style.display = 'none'
  }
}

function handleLadderParseFailure(parsed, options = {}) {
  const { showPopupOnInvalid = false } = options
  const maxPlayers = parsed?.maxPlayers || getLadderMaxPlayers()
  let title = '입력 확인'
  let message = `홍길동(1), 김아무개(2)처럼 이름(사다리번호) 형식으로 입력해줘.`

  if (parsed.status === 'TOO_MANY') {
    title = '참가자 수 초과'
    message = `투명 사다리 타기는 현재 환경에서 최대 ${maxPlayers}명까지 가능해.`
  } else if (parsed.status === 'TOO_FEW' || parsed.status === 'EMPTY') {
    title = '참가자 등록 확인'
    message = `최소 ${LADDER_MIN_PLAYERS}명 이상 입력해야 해.`
  } else if (parsed.status === 'INVALID_FORMAT') {
    title = '입력 형식 확인'
    message = `이번 게임은 반드시 홍길동(1), 김아무개(2)처럼 이름 뒤에 사용할 사다리 번호를 괄호로 적어야 해.`
  } else if (parsed.status === 'DUPLICATE_NAME') {
    title = '중복 이름 불가'
    message = `같은 이름은 중복 등록할 수 없어: ${parsed.name}`
  } else if (parsed.status === 'DUPLICATE_LANE') {
    title = '중복 사다리 불가'
    message = `${parsed.laneNumber}번 사다리는 이미 다른 참가자가 선택했어. 각 사다리는 한 명만 사용할 수 있어.`
  } else if (parsed.status === 'OUT_OF_RANGE') {
    title = '사다리 번호 확인'
    message = `참가자가 ${parsed.participantCount}명이면 사다리 번호는 1~${parsed.participantCount}까지만 사용할 수 있어.`
  }

  if (ladderStatusText) {
    ladderStatusText.textContent = message.replace(/<[^>]*>/g, '')
  }
  if (showPopupOnInvalid) {
    showPopup(title, message, { icon: '⚠️', allowHtml: true })
  }
  return false
}

function setLadderPlayers(players) {
  ladderPlayers = players
    .slice()
    .sort((a, b) => a.startLane - b.startLane)
    .map((player, index) => ({
      ...player,
      id: `ladder-player-${index + 1}`,
      color: LADDER_PLAYER_PALETTE[index % LADDER_PLAYER_PALETTE.length]
    }))
  ladderLastValidConfigText = ladderConfigInput ? ladderConfigInput.value : ladderLastValidConfigText
}

function updateLadderFromInput(options = {}) {
  const { render = true } = options
  if (!ladderConfigInput) return false

  updateLadderHelperText()
  const parsed = parseLadderPlayers(ladderConfigInput.value)
  if (parsed.status !== 'OK') {
    handleLadderParseFailure(parsed)
    if (render) renderLadderGame()
    return false
  }

  setLadderPlayers(parsed.players)
  ladderGameStarted = false
  ladderRevealed = false
  ladderCheckedIds = new Set()
  ladderRungs = []
  ladderResults = []
  ladderRows = 0
  ladderAutoRunning = false
  ladderActivePlayerId = ''

  if (ladderStatusText) {
    ladderStatusText.textContent = `참가자 ${ladderPlayers.length}명 준비 완료. 시작하면 1번 사다리부터 순서대로 내려와.`
  }

  if (render) renderLadderGame()
  return true
}

function ensureLadderReady() {
  updateLadderHelperText()
  if (!ladderPlayers.length && ladderConfigInput) {
    const parsed = parseLadderPlayers(ladderConfigInput.value)
    if (parsed.status === 'OK') {
      setLadderPlayers(parsed.players)
    }
  }
  renderLadderGame()
}

function buildTransparentLadder(count) {
  const rows = Math.max(8, count * 3)
  const rungs = []
  const laneTouchCount = Array.from({ length: Math.max(0, count - 1) }, () => 0)

  for (let row = 0; row < rows; row += 1) {
    const used = new Set()
    const lineCount = count <= 3 ? 1 : (Math.random() < 0.28 ? 2 : 1)

    for (let attempt = 0; attempt < lineCount; attempt += 1) {
      const candidates = []
      for (let lane = 0; lane < count - 1; lane += 1) {
        if (used.has(lane) || used.has(lane - 1) || used.has(lane + 1)) continue
        const sameAbove = rungs.some((rung) => rung.row === row - 1 && rung.leftLane === lane)
        if (sameAbove) continue
        candidates.push(lane)
      }
      if (!candidates.length) continue
      candidates.sort((a, b) => laneTouchCount[a] - laneTouchCount[b] || Math.random() - 0.5)
      const selected = candidates[0]
      used.add(selected)
      laneTouchCount[selected] += 1
      rungs.push({ row, leftLane: selected })
    }
  }

  for (let lane = 0; lane < count - 1; lane += 1) {
    if (laneTouchCount[lane] > 0) continue
    const row = Math.floor(rand(1, rows - 1))
    if (!rungs.some((rung) => rung.row === row && Math.abs(rung.leftLane - lane) <= 1)) {
      rungs.push({ row, leftLane: lane })
    }
  }

  rungs.sort((a, b) => a.row - b.row || a.leftLane - b.leftLane)
  return { rows, rungs }
}

function resolveLadderEndLane(startLane, rungs, rows) {
  let lane = startLane
  for (let row = 0; row < rows; row += 1) {
    const rowRungs = rungs.filter((rung) => rung.row === row)
    for (const rung of rowRungs) {
      if (rung.leftLane === lane) {
        lane += 1
        break
      }
      if (rung.leftLane === lane - 1) {
        lane -= 1
        break
      }
    }
  }
  return lane
}

function isLadderMobilePortraitView() {
  return isMobileOrTabletLike() && isPortraitMode() && window.innerWidth <= 820
}

function getCompactLadderLabel(label) {
  const text = String(label || '')
  if (!isLadderMobilePortraitView()) return text
  return text.length > 4 ? `${text.slice(0, 4)}…` : text
}

function getLadderGeometry(count, rows) {
  const useMobilePortrait = isLadderMobilePortraitView()

  if (useMobilePortrait) {
    const width = 420
    const height = 760
    const topY = 168
    const bottomY = 600
    const leftX = count === 1 ? width / 2 : 58
    const rightX = count === 1 ? width / 2 : width - 58
    const gap = count <= 1 ? 0 : (rightX - leftX) / (count - 1)
    const rowGap = rows <= 1 ? 0 : (bottomY - topY) / rows
    const laneX = (index) => leftX + gap * index
    const yForRow = (row) => topY + rowGap * (row + 0.55)

    return {
      width,
      height,
      topY,
      bottomY,
      leftX,
      rightX,
      gap,
      rowGap,
      laneX,
      yForRow,
      isMobilePortrait: true,
      topLabelY: 64,
      topCircleR: 23,
      topNameY: 56,
      topLaneY: 84,
      rankY: 682,
      rankRectX: -42,
      rankRectY: -28,
      rankRectWidth: 84,
      rankRectHeight: 46,
      rankRectRadius: 23,
      rankTextY: 4,
      runnerR: 21,
      runnerTextY: 8
    }
  }

  const width = 1000
  const height = 560
  const topY = 88
  const bottomY = 452
  const leftX = count === 1 ? 500 : 90
  const rightX = count === 1 ? 500 : 910
  const gap = count <= 1 ? 0 : (rightX - leftX) / (count - 1)
  const rowGap = rows <= 1 ? 0 : (bottomY - topY) / rows
  const laneX = (index) => leftX + gap * index
  const yForRow = (row) => topY + rowGap * (row + 0.55)

  return {
    width,
    height,
    topY,
    bottomY,
    leftX,
    rightX,
    gap,
    rowGap,
    laneX,
    yForRow,
    isMobilePortrait: false,
    topLabelY: 38,
    topCircleR: 16,
    topNameY: 38,
    topLaneY: 62,
    rankY: 520,
    rankRectX: -34,
    rankRectY: -22,
    rankRectWidth: 68,
    rankRectHeight: 36,
    rankRectRadius: 18,
    rankTextY: 2,
    runnerR: 18,
    runnerTextY: 7
  }
}

function getLadderPathData(points) {
  if (!Array.isArray(points) || !points.length) return ''
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
}

function getLadderPointAtProgress(points, progress) {
  if (!Array.isArray(points) || !points.length) return { x: 0, y: 0 }
  if (points.length === 1) return points[0]

  const safeProgress = clampValue(progress, 0, 1)
  const segments = []
  let totalLength = 0

  for (let index = 1; index < points.length; index += 1) {
    const from = points[index - 1]
    const to = points[index]
    const length = Math.hypot(to.x - from.x, to.y - from.y)
    segments.push({ from, to, length })
    totalLength += length
  }

  if (!totalLength) return points[points.length - 1]

  let targetLength = totalLength * safeProgress
  for (const segment of segments) {
    if (targetLength > segment.length) {
      targetLength -= segment.length
      continue
    }

    const ratio = segment.length ? targetLength / segment.length : 0
    return {
      x: segment.from.x + (segment.to.x - segment.from.x) * ratio,
      y: segment.from.y + (segment.to.y - segment.from.y) * ratio
    }
  }

  return points[points.length - 1]
}

function stopLadderProgressAnimation() {
  if (ladderProgressRaf) {
    cancelAnimationFrame(ladderProgressRaf)
    ladderProgressRaf = null
  }
}

function updateLadderRunnerPosition() {
  if (!ladderBoard || !ladderGameStarted || !ladderActivePlayerId || !ladderPlayers.length) return

  const activePlayer = getLadderPlayerById(ladderActivePlayerId)
  if (!activePlayer) return

  let runnerEl = ladderBoard.querySelector('.ladder-active-runner')
  if (!runnerEl) {
    renderLadderGame()
    runnerEl = ladderBoard.querySelector('.ladder-active-runner')
    if (!runnerEl) return
  }

  const rows = ladderRows || Math.max(6, ladderPlayers.length * 2)
  const geometry = getLadderGeometry(ladderPlayers.length, rows)
  const path = getLadderPathPoints(activePlayer.startLane, ladderRungs, rows, geometry)
  const point = getLadderPointAtProgress(path.points, ladderActiveProgress)
  runnerEl.setAttribute('transform', `translate(${point.x}, ${point.y})`)
}

function animateLadderRunnerProgress(token, duration) {
  stopLadderProgressAnimation()
  ladderActiveProgress = 0

  return new Promise((resolve) => {
    const startedAt = performance.now()

    const step = (now) => {
      if (token !== ladderRunToken || !screens.game7?.classList.contains('active') || !ladderActivePlayerId) {
        ladderProgressRaf = null
        resolve(false)
        return
      }

      const elapsed = now - startedAt
      ladderActiveProgress = clampValue(elapsed / duration, 0, 1)
      updateLadderRunnerPosition()

      if (ladderActiveProgress >= 1) {
        ladderProgressRaf = null
        resolve(true)
        return
      }

      ladderProgressRaf = requestAnimationFrame(step)
    }

    updateLadderRunnerPosition()
    ladderProgressRaf = requestAnimationFrame(step)
  })
}

function getLadderRankFillByLane() {
  const fillMap = new Map()
  ladderResults.forEach((result) => {
    if (!ladderCheckedIds.has(result.playerId)) return
    const player = getLadderPlayerById(result.playerId)
    if (!player) return
    fillMap.set(result.endLane, player)
  })
  return fillMap
}

function getLadderPathPoints(startLane, rungs, rows, geometry) {
  const points = []
  let lane = startLane
  points.push({ x: geometry.laneX(lane), y: geometry.topY })

  for (let row = 0; row < rows; row += 1) {
    const y = geometry.yForRow(row)
    points.push({ x: geometry.laneX(lane), y })

    const rightRung = rungs.find((rung) => rung.row === row && rung.leftLane === lane)
    const leftRung = rungs.find((rung) => rung.row === row && rung.leftLane === lane - 1)

    if (rightRung) {
      lane += 1
      points.push({ x: geometry.laneX(lane), y })
    } else if (leftRung) {
      lane -= 1
      points.push({ x: geometry.laneX(lane), y })
    }
  }

  points.push({ x: geometry.laneX(lane), y: geometry.bottomY })
  return { points, endLane: lane }
}

function computeLadderResults() {
  ladderResults = ladderPlayers.map((player) => {
    const endLane = resolveLadderEndLane(player.startLane, ladderRungs, ladderRows)
    return {
      playerId: player.id,
      label: player.label,
      color: player.color,
      startLane: player.startLane,
      laneNumber: player.laneNumber,
      endLane,
      rank: endLane + 1
    }
  })
}

function getLadderResultByPlayerId(playerId) {
  return ladderResults.find((result) => result.playerId === playerId) || null
}

function getLadderPlayerById(playerId) {
  return ladderPlayers.find((player) => player.id === playerId) || null
}

function getLadderFinalRanking() {
  return [...ladderResults].sort((a, b) => a.rank - b.rank)
}

function showLadderFinalRankingPopup() {
  const ranking = getLadderFinalRanking()
  const html = ranking.length
    ? `<div class="ladder-final-popup-list">${ranking.map((result) => `
        <div class="ladder-final-popup-item${result.rank === 1 ? ' top' : ''}">
          <span class="ladder-final-popup-rank">${result.rank}위</span>
          <strong>${escapeHtml(result.label)}</strong>
          <small>${result.laneNumber}번 사다리 → ${result.rank}등 도착</small>
        </div>
      `).join('')}</div>`
    : '<span>결과가 없습니다.</span>'

  showPopup('투명 사다리 종합 순위', html, {
    icon: '🏆',
    allowHtml: true,
    popupClass: 'ladder-final-popup'
  })
}

function getLadderStatusForPlayer(player) {
  if (!ladderGameStarted) return '대기'
  if (ladderActivePlayerId === player.id) return '내려가는 중'
  if (ladderCheckedIds.has(player.id)) return '결과 확인 완료'
  return '순서 대기'
}

async function runLadderAutoSequence(token) {
  if (ladderAutoRunning) return
  ladderAutoRunning = true

  const order = [...ladderPlayers].sort((a, b) => a.startLane - b.startLane)
  const traceDelay = 4700
  const settleDelay = 820

  for (const player of order) {
    if (token !== ladderRunToken || !screens.game7?.classList.contains('active')) break

    ladderActivePlayerId = player.id
    ladderActiveProgress = 0
    if (ladderStatusText) {
      ladderStatusText.textContent = `${player.laneNumber}번 사다리 · ${player.label}이 천천히 내려오는 중이야.`
    }
    renderLadderGame()

    const completedMove = await animateLadderRunnerProgress(token, traceDelay)
    if (!completedMove || token !== ladderRunToken || !screens.game7?.classList.contains('active')) break

    const result = getLadderResultByPlayerId(player.id)
    if (result) {
      ladderCheckedIds.add(player.id)
      ladderActiveProgress = 1
      ladderActivePlayerId = ''
      if (ladderStatusText) {
        ladderStatusText.textContent = `${player.label} 도착 완료. 다음 참가자가 이어서 내려와.`
      }
      renderLadderGame()
      await new Promise((resolve) => setTimeout(resolve, settleDelay))
    }
  }

  const isCompleted = token === ladderRunToken && ladderCheckedIds.size === ladderPlayers.length
  ladderActivePlayerId = ''
  ladderAutoRunning = false

  if (isCompleted) {
    revealLadderIfComplete()
    return
  }

  renderLadderGame()
}

function startLadderGame() {
  if (!ladderConfigInput || ladderAutoRunning) return

  const parsed = parseLadderPlayers(ladderConfigInput.value)
  if (parsed.status !== 'OK') {
    handleLadderParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  setLadderPlayers(parsed.players)
  const ladder = buildTransparentLadder(ladderPlayers.length)
  ladderRows = ladder.rows
  ladderRungs = ladder.rungs
  ladderCheckedIds = new Set()
  ladderGameStarted = true
  ladderRevealed = false
  ladderActivePlayerId = ''
  ladderActiveProgress = 0
  computeLadderResults()
  setLadderInputLock(true)
  ladderRunToken += 1

  if (ladderStatusText) {
    ladderStatusText.textContent = '투명 사다리 시작! 왼쪽 1번 사다리부터 순서대로 내려온다.'
  }

  renderLadderGame()
  setTimeout(() => runLadderAutoSequence(ladderRunToken), 420)
}

function resetLadderGame() {
  ladderRunToken += 1
  stopLadderProgressAnimation()
  ladderAutoRunning = false
  ladderActivePlayerId = ''
  ladderActiveProgress = 0
  ladderGameStarted = false
  ladderRevealed = false
  ladderCheckedIds = new Set()
  ladderRungs = []
  ladderResults = []
  ladderRows = 0
  setLadderInputLock(false)
  updateLadderFromInput({ render: true })
}

function shuffleLadderParticipants() {
  showPopup('셔플 비활성화', '이번 게임은 참가자가 직접 사다리 번호를 선택해야 해서 셔플을 사용하지 않아.', { icon: '🪜' })
}

function revealLadderIfComplete() {
  if (!ladderGameStarted || ladderRevealed) return
  if (ladderCheckedIds.size < ladderPlayers.length) return

  ladderRevealed = true
  ladderActivePlayerId = ''
  ladderActiveProgress = 0
  setLadderInputLock(false)

  if (ladderStatusText) {
    ladderStatusText.textContent = '모든 참가자가 사다리를 탔어. 숨겨져 있던 가로 라인과 종합 순위를 공개했어!'
  }

  renderLadderGame()
  showLadderFinalRankingPopup()
}

function checkLadderResult(playerId) {
  if (!ladderGameStarted) {
    showPopup('게임 시작 필요', '먼저 시작 버튼을 눌러 투명 사다리를 생성해줘.', { icon: '🪜' })
    return
  }

  const result = getLadderResultByPlayerId(playerId)
  if (!result) return

  ladderCheckedIds.add(playerId)
  renderLadderGame()
  revealLadderIfComplete()
}

function renderLadderBoard() {
  if (!ladderBoard) return

  const count = Math.max(0, ladderPlayers.length)
  const started = ladderGameStarted && count >= 2
  const revealedClass = ladderRevealed ? ' is-revealed' : ''
  const runningClass = ladderActivePlayerId ? ' is-running' : ''

  if (!count) {
    ladderBoard.className = 'ladder-board'
    ladderBoard.innerHTML = '<div class="ladder-empty-state">홍길동(1), 김아무개(2) 형식으로 참가자를 입력하면 사다리 보드가 준비돼.</div>'
    return
  }

  const rows = started ? ladderRows : Math.max(6, count * 2)
  const rungs = started ? ladderRungs : []
  const geometry = getLadderGeometry(count, rows)
  const laneX = geometry.laneX
  const yForRow = geometry.yForRow

  const verticalLines = ladderPlayers.map((player) => {
    const x = laneX(player.startLane)
    return `<line class="ladder-vertical-line" x1="${x}" y1="${geometry.topY}" x2="${x}" y2="${geometry.bottomY}" />`
  }).join('')

  const horizontalLines = rungs.map((rung) => {
    const x1 = laneX(rung.leftLane)
    const x2 = laneX(rung.leftLane + 1)
    const y = yForRow(rung.row)
    return `<line class="ladder-horizontal-line" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" />`
  }).join('')

  const activePlayer = getLadderPlayerById(ladderActivePlayerId)
  let activeMarker = ''
  if (started && activePlayer) {
    const path = getLadderPathPoints(activePlayer.startLane, rungs, rows, geometry)
    const runnerPoint = getLadderPointAtProgress(path.points, ladderActiveProgress)
    const runnerLabel = escapeHtml(activePlayer.label.slice(0, 1))
    activeMarker = `
      <g class="ladder-active-runner" transform="translate(${runnerPoint.x}, ${runnerPoint.y})" style="--ladder-player-color:${activePlayer.color};">
        <circle class="ladder-active-runner-body" cx="0" cy="0" r="${geometry.runnerR}"></circle>
        <text class="ladder-active-runner-text" x="0" y="${geometry.runnerTextY}">${runnerLabel}</text>
      </g>
    `
  }

  const rankFillByLane = getLadderRankFillByLane()

  const topLabels = ladderPlayers.map((player) => {
    const x = laneX(player.startLane)
    const isActive = ladderActivePlayerId === player.id
    const isDone = ladderCheckedIds.has(player.id)
    return `
      <g class="ladder-player-label${isActive ? ' is-active' : ''}${isDone ? ' is-done' : ''}" transform="translate(${x}, ${geometry.topLabelY})">
        <circle r="${geometry.topCircleR}" fill="${player.color}"></circle>
        <text y="${geometry.topNameY}">${escapeHtml(getCompactLadderLabel(player.label))}</text>
        <text class="ladder-lane-num" y="${geometry.topLaneY}">${player.laneNumber}번</text>
      </g>
    `
  }).join('')

  const bottomLabels = Array.from({ length: count }, (_, index) => {
    const x = laneX(index)
    const rank = index + 1
    const arrivedPlayer = rankFillByLane.get(index)
    const filledClass = arrivedPlayer ? ' is-filled' : ''
    const style = arrivedPlayer ? ` style="--ladder-rank-color:${arrivedPlayer.color};"` : ''
    return `
      <g class="ladder-rank-label${filledClass}" transform="translate(${x}, ${geometry.rankY})"${style}>
        <rect x="${geometry.rankRectX}" y="${geometry.rankRectY}" width="${geometry.rankRectWidth}" height="${geometry.rankRectHeight}" rx="${geometry.rankRectRadius}"></rect>
        <text y="${geometry.rankTextY}">${rank}등</text>
      </g>
    `
  }).join('')

  ladderBoard.className = `ladder-board${revealedClass}${runningClass}`
  ladderBoard.innerHTML = `
    <svg class="ladder-svg" viewBox="0 0 ${geometry.width} ${geometry.height}" role="img" aria-label="투명 사다리">
      <g class="ladder-grid-lines">
        ${verticalLines}
        ${horizontalLines}
        ${activeMarker}
      </g>
      <g class="ladder-top-labels">${topLabels}</g>
      <g class="ladder-bottom-labels">${bottomLabels}</g>
    </svg>
    <div class="ladder-board-caption">${ladderRevealed ? '숨겨졌던 가로 라인이 모두 공개됨' : (ladderActivePlayerId ? '현재 참가자가 투명 사다리를 내려오는 중' : '가로 라인은 투명 처리됨')}</div>
  `
}

function renderLadderCheckList() {
  if (!ladderCheckList || !ladderTotalInfo) return

  const checkedCount = ladderCheckedIds.size
  const total = ladderPlayers.length
  ladderTotalInfo.textContent = total ? (ladderGameStarted ? `${checkedCount}/${total}명 완료` : `총 ${total}명`) : '총 0명'

  if (!total) {
    ladderCheckList.innerHTML = '<div class="ladder-check-empty">홍길동(1), 김아무개(2) 형식으로 입력하면 참가자 준비 현황이 표시돼.</div>'
    return
  }

  const rows = ladderPlayers.map((player) => {
    const done = ladderCheckedIds.has(player.id)
    const active = ladderActivePlayerId === player.id
    const result = getLadderResultByPlayerId(player.id)
    const stateText = getLadderStatusForPlayer(player)
    const resultText = done && result ? `${result.rank}등` : `${player.laneNumber}번 사다리`
    return `
      <div class="ladder-check-item${done ? ' is-checked' : ''}${active ? ' is-active' : ''}" style="--ladder-player-color:${player.color};">
        <span class="ladder-check-dot"></span>
        <span class="ladder-check-name">${escapeHtml(player.label)}</span>
        <span class="ladder-check-lane">${resultText}</span>
        <span class="ladder-check-result">${stateText}</span>
      </div>
    `
  }).join('')

  ladderCheckList.innerHTML = rows
}

function renderLadderGame() {
  updateLadderHelperText()
  renderLadderBoard()
  renderLadderCheckList()

  if (ladderRevealBadge) {
    ladderRevealBadge.textContent = ladderRevealed ? '가로 라인 공개' : '가로 라인 숨김'
    ladderRevealBadge.classList.toggle('is-revealed', ladderRevealed)
  }
}


function parseBalloonPlayers(text) {
  const names = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!names.length) {
    return { status: 'EMPTY' }
  }

  const seen = new Set()
  const players = []

  for (const name of names) {
    if (seen.has(name)) {
      return { status: 'DUPLICATE', name }
    }

    seen.add(name)
    players.push({
      id: `balloon-${players.length + 1}-${name}`,
      label: name,
      color: getCommonPlayerPaletteByTheme()[players.length % getCommonPlayerPaletteByTheme().length]
    })

    if (players.length > BALLOON_MAX_PLAYERS) {
      return { status: 'TOO_MANY' }
    }
  }

  if (players.length < BALLOON_MIN_PLAYERS) {
    return { status: 'TOO_FEW', players }
  }

  return { status: 'OK', players }
}

function updateBalloonFromInput(options = {}) {
  const { render = true } = options
  if (!balloonConfigInput) return false

  const parsed = parseBalloonPlayers(balloonConfigInput.value)

  if (parsed.status === 'OK') {
    balloonPlayers = parsed.players
    balloonLastValidConfigText = balloonConfigInput.value
    balloonLastAppliedRawText = balloonConfigInput.value

    if (balloonStatusText && !balloonGameStarted) {
      balloonStatusText.textContent = '참가자 등록 완료. 시작을 누르면 첫 참가자부터 풍선을 누를 수 있어.'
    }

    if (render) renderBalloonGame()
    return true
  }

  if (!balloonGameStarted) {
    if (parsed.status === 'TOO_FEW' && parsed.players?.length) {
      balloonPlayers = parsed.players
      if (balloonStatusText) {
        balloonStatusText.textContent = `최소 ${BALLOON_MIN_PLAYERS}명부터 시작할 수 있어.`
      }
    } else if (balloonStatusText) {
      const messages = {
        EMPTY: '참가자를 2명 이상 입력해줘.',
        DUPLICATE: '중복 이름은 사용할 수 없어.',
        TOO_MANY: `참가자는 최대 ${BALLOON_MAX_PLAYERS}명까지 가능해.`
      }
      balloonStatusText.textContent = messages[parsed.status] || '참가자 입력을 확인해줘.'
    }
  }

  if (render) renderBalloonGame()
  return false
}

function setBalloonInputLock(isLocked) {
  if (!balloonConfigInput) return
  balloonConfigInput.disabled = isLocked
  balloonConfigInput.style.opacity = isLocked ? '0.65' : '1'
  balloonConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
}

function getCurrentBalloonPlayer() {
  return balloonPlayers[balloonCurrentIndex] || null
}

function getBalloonPressurePercent() {
  if (!balloonBurstPressure) return 0
  return clampValue((balloonPressure / balloonBurstPressure) * 100, 0, 100)
}

function updateBalloonVisual() {
  const scale = clampValue(1 + balloonPressure * 0.0105, 1, 2.55)
  const currentPlayer = getCurrentBalloonPlayer()
  const currentColor = currentPlayer?.color || getCommonPlayerPaletteByTheme()[0] || '#ff6f9f'
  const displayPressure = Number(balloonPressure).toFixed(3)

  if (balloonVisual) {
    balloonVisual.style.setProperty('--balloon-scale', scale.toFixed(3))
    balloonVisual.style.setProperty('--balloon-current-color', currentColor)
    balloonVisual.classList.remove('is-warning', 'is-danger')
    balloonVisual.classList.toggle('is-popped', balloonPopped)
  }

  if (balloonPressureNumber) {
    balloonPressureNumber.textContent = displayPressure
  }

  if (balloonPressArea) {
    balloonPressArea.classList.toggle('is-disabled', !balloonGameStarted || balloonPopped)
    balloonPressArea.classList.toggle('is-holding', balloonHolding)
    balloonPressArea.classList.toggle('is-popped', balloonPopped)
  }
}

function renderBalloonPlayers() {
  if (!balloonPlayerList || !balloonTotalInfo) return

  balloonTotalInfo.textContent = balloonPlayers.length ? `총 ${balloonPlayers.length}명` : '총 0명'

  if (!balloonPlayers.length) {
    balloonPlayerList.innerHTML = '<div class="balloon-player-empty">참가자를 입력하면 차례가 표시돼.</div>'
    return
  }

  const currentPlayer = getCurrentBalloonPlayer()
  balloonPlayerList.innerHTML = balloonPlayers.map((player, index) => {
    const isCurrent = balloonGameStarted && !balloonPopped && currentPlayer?.id === player.id
    const isLoser = balloonPopped && currentPlayer?.id === player.id
    const label = isLoser ? '터뜨림' : isCurrent ? '현재 차례' : `${index + 1}번째`
    return `
      <div class="balloon-player-item${isCurrent ? ' is-current' : ''}${isLoser ? ' is-loser' : ''}" style="--balloon-player-color:${player.color};">
        <span class="balloon-player-dot"></span>
        <strong>${escapeHtml(player.label)}</strong>
        <span>${label}</span>
      </div>
    `
  }).join('')
}

function renderBalloonGame() {
  renderBalloonPlayers()

  const currentPlayer = getCurrentBalloonPlayer()
  const currentColor = currentPlayer?.color || getCommonPlayerPaletteByTheme()[0] || '#ff6f9f'

  if (balloonPressArea) {
    balloonPressArea.style.setProperty('--balloon-current-color', currentColor)
  }

  if (balloonTurnBadge) {
    if (balloonPopped && currentPlayer) {
      balloonTurnBadge.textContent = `${currentPlayer.label} 당첨`
    } else if (balloonGameStarted && currentPlayer) {
      balloonTurnBadge.textContent = `${currentPlayer.label} 차례`
    } else {
      balloonTurnBadge.textContent = '대기'
    }
  }

  if (balloonStageHint) {
    if (balloonPopped && currentPlayer) {
      balloonStageHint.textContent = `${currentPlayer.label}님이 풍선을 터뜨렸어. 리셋 후 다시 시작할 수 있어.`
    } else if (balloonHolding && currentPlayer) {
      balloonStageHint.textContent = `${currentPlayer.label}님이 누르는 중... 손을 떼기 전까지 계속 커져.`
    } else if (balloonGameStarted && currentPlayer) {
      balloonStageHint.textContent = `${currentPlayer.label}님 차례. 풍선을 길게 누르고, 무섭다 싶으면 손을 떼서 다음 사람에게 넘겨.`
    } else {
      balloonStageHint.textContent = '시작을 누른 뒤, 현재 차례의 참가자가 풍선을 길게 눌러줘.'
    }
  }

  updateBalloonVisual()
}

function ensureBalloonReady() {
  if (!balloonPlayers.length) {
    updateBalloonFromInput({ render: false })
  }
  renderBalloonGame()
}

function startBalloonGame() {
  if (!balloonConfigInput) return

  const parsed = parseBalloonPlayers(balloonConfigInput.value)

  if (parsed.status !== 'OK') {
    const maxText = `${BALLOON_MIN_PLAYERS}~${BALLOON_MAX_PLAYERS}`
    showPopup('참가자 등록 확인', `풍선 불기 게임은 ${maxText}명이 이용 가능해.<br>참가자 이름은 쉼표로 구분하고 중복 없이 입력해줘.`, { icon: '⚠️', allowHtml: true })
    updateBalloonFromInput()
    return
  }

  balloonPlayers = parsed.players
  balloonGameStarted = true
  balloonPopped = false
  balloonHolding = false
  balloonCurrentIndex = 0
  balloonPressure = 0
  balloonBurstPressure = Number(rand(BALLOON_MIN_BURST_PRESSURE, BALLOON_MAX_BURST_PRESSURE).toFixed(3))
  balloonLastValidConfigText = balloonConfigInput.value
  balloonLastAppliedRawText = balloonConfigInput.value

  if (balloonStatusText) {
    balloonStatusText.textContent = '게임 시작! 현재 차례의 참가자가 풍선을 꾹 눌러줘.'
  }

  setBalloonInputLock(true)
  renderBalloonGame()
}

function stopBalloonHold() {
  if (balloonHoldTimer) {
    clearInterval(balloonHoldTimer)
    balloonHoldTimer = null
  }
  balloonHolding = false
  updateBalloonVisual()
}

function resetBalloonGame() {
  stopBalloonHold()
  balloonGameStarted = false
  balloonPopped = false
  balloonCurrentIndex = 0
  balloonPressure = 0
  balloonBurstPressure = 0
  setBalloonInputLock(false)

  if (balloonVisual) {
    balloonVisual.classList.remove('is-popped', 'is-warning', 'is-danger')
  }

  if (balloonPopEffect) {
    balloonPopEffect.classList.remove('is-active')
  }

  if (balloonStatusText) {
    balloonStatusText.textContent = '참가자를 등록한 뒤 시작을 누르면 첫 번째 참가자부터 풍선을 꾹 누를 수 있다.'
  }

  updateBalloonFromInput({ render: false })
  renderBalloonGame()
}

function advanceBalloonTurn() {
  if (!balloonGameStarted || balloonPopped || !balloonPlayers.length) return

  balloonCurrentIndex = (balloonCurrentIndex + 1) % balloonPlayers.length
  const currentPlayer = getCurrentBalloonPlayer()

  if (balloonStatusText && currentPlayer) {
    balloonStatusText.textContent = `${currentPlayer.label}님 차례. 풍선을 꾹 눌러줘.`
  }

  renderBalloonGame()
}

function popBalloon() {
  if (balloonPopped) return

  const loser = getCurrentBalloonPlayer()
  stopBalloonHold()
  balloonPopped = true
  balloonGameStarted = false

  if (balloonPressArea) {
    balloonPressArea.classList.add('is-popped')
  }

  if (balloonVisual) {
    balloonVisual.classList.add('is-popped')
  }

  if (balloonPopEffect) {
    balloonPopEffect.classList.remove('is-active')
    void balloonPopEffect.offsetWidth
    balloonPopEffect.classList.add('is-active')
  }

  if (balloonStatusText && loser) {
    balloonStatusText.textContent = `${loser.label}님이 풍선을 터뜨렸어.`
  }

  renderBalloonGame()

  if (loser) {
    showPopup(
      '풍선 터짐!',
      `<strong>${escapeHtml(loser.label)}</strong>님이 풍선을 터뜨렸습니다.<br>이번 게임의 당첨자입니다.`,
      { icon: '🎈', allowHtml: true, popupClass: 'balloon-result-popup' }
    )
  }
}

function inflateBalloonOnce() {
  if (!balloonGameStarted || balloonPopped || !balloonHolding) return

  balloonPressure += rand(BALLOON_MIN_PRESSURE_STEP, BALLOON_MAX_PRESSURE_STEP)

  if (balloonPressure >= balloonBurstPressure) {
    balloonPressure = balloonBurstPressure
    updateBalloonVisual()
    popBalloon()
    return
  }

  updateBalloonVisual()
  renderBalloonPlayers()
}

function startBalloonPress(event) {
  if (event?.cancelable) event.preventDefault()

  if (!balloonGameStarted || balloonPopped) {
    if (!balloonPlayers.length) {
      updateBalloonFromInput()
    }
    if (!balloonGameStarted && !balloonPopped) {
      showPopup('게임 시작 필요', '참가자를 등록한 뒤 시작 버튼을 먼저 눌러줘.', { icon: '🎈' })
    }
    return
  }

  if (balloonHolding) return

  balloonHolding = true

  if (balloonPressArea && event?.pointerId !== undefined && typeof balloonPressArea.setPointerCapture === 'function') {
    try {
      balloonPressArea.setPointerCapture(event.pointerId)
    } catch (error) {}
  }

  inflateBalloonOnce()

  if (!balloonPopped) {
    balloonHoldTimer = setInterval(inflateBalloonOnce, BALLOON_PRESS_INTERVAL_MS)
  }

  renderBalloonGame()
}

function endBalloonPress(event) {
  if (!balloonHolding) return

  if (balloonPressArea && event?.pointerId !== undefined && typeof balloonPressArea.releasePointerCapture === 'function') {
    try {
      balloonPressArea.releasePointerCapture(event.pointerId)
    } catch (error) {}
  }

  stopBalloonHold()

  if (!balloonPopped && balloonGameStarted) {
    advanceBalloonTurn()
  }
}


function canPlayBombPassOnThisDevice() {
  return isTouchDevice() && getViewportShortSide() <= 820
}

function setBombPassControlsLocked(isLocked) {
  if (startBombPassBtn) {
    startBombPassBtn.disabled = isLocked
    startBombPassBtn.style.opacity = isLocked ? '0.55' : '1'
    startBombPassBtn.style.cursor = isLocked ? 'not-allowed' : ''
  }
}

function updateBombPassGame() {
  const canPlay = canPlayBombPassOnThisDevice()

  if (bombPassStateBadge) {
    if (!canPlay) {
      bombPassStateBadge.textContent = '모바일 전용'
    } else if (bombPassExploded) {
      bombPassStateBadge.textContent = '폭발'
    } else if (bombPassRunning) {
      bombPassStateBadge.textContent = '전달 중'
    } else {
      bombPassStateBadge.textContent = '대기'
    }
  }

  if (bombPassStage) {
    bombPassStage.classList.toggle('is-running', bombPassRunning)
    bombPassStage.classList.toggle('is-exploded', bombPassExploded)
    bombPassStage.classList.toggle('is-desktop-blocked', !canPlay)
  }

  if (bombPassVisual) {
    bombPassVisual.classList.toggle('is-running', bombPassRunning)
    bombPassVisual.classList.toggle('is-exploded', bombPassExploded)
  }

  if (bombPassStatusText) {
    if (!canPlay) {
      bombPassStatusText.textContent = '이 게임은 핸드폰을 실제로 넘기며 플레이하는 모바일 전용 게임이야. 모바일에서 접속해줘.'
    } else if (bombPassExploded) {
      bombPassStatusText.textContent = '폭탄이 터졌어! 지금 핸드폰을 들고 있던 사람이 당첨이야. 리셋 후 다시 시작할 수 있어.'
    } else if (bombPassRunning) {
      bombPassStatusText.textContent = '폭탄 작동 중... 언제 터질지 몰라. 핸드폰을 조심히 넘겨줘.'
    } else {
      bombPassStatusText.textContent = '시작을 누른 뒤 핸드폰을 사람들에게 넘겨줘. 폭탄이 터지는 순간 들고 있던 사람이 당첨이야.'
    }
  }

  if (bombPassDeviceText) {
    const vibrationSupported = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function'
    bombPassDeviceText.textContent = canPlay
      ? (vibrationSupported ? '※ 이 기기에서는 진동 기능을 시도할 수 있습니다.' : '※ 현재 브라우저에서는 진동 기능이 지원되지 않을 수 있습니다.')
      : '※ 이 게임은 모바일 전용 게임입니다. 데스크톱에서는 목록에 표시되지 않도록 설정되어 있습니다.'
  }

  setBombPassControlsLocked(bombPassRunning)
}

function ensureBombPassReady() {
  updateBombPassGame()
}

function vibrateBombPassDevice() {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(BOMB_PASS_VIBRATION_PATTERN)
    }
  } catch (error) {}
}

function stopBombPassGame() {
  if (bombPassTimer) {
    clearTimeout(bombPassTimer)
    bombPassTimer = null
  }

  bombPassRunning = false
  bombPassStartedAt = 0
  bombPassDuration = 0
  updateBombPassGame()
}

function resetBombPassGame() {
  stopBombPassGame()
  bombPassExploded = false

  if (bombPassBoom) {
    bombPassBoom.classList.remove('is-active')
  }

  updateBombPassGame()
}

function explodeBombPassGame() {
  if (!bombPassRunning || bombPassExploded) return

  if (bombPassTimer) {
    clearTimeout(bombPassTimer)
    bombPassTimer = null
  }

  bombPassRunning = false
  bombPassExploded = true
  vibrateBombPassDevice()

  if (bombPassBoom) {
    bombPassBoom.classList.remove('is-active')
    void bombPassBoom.offsetWidth
    bombPassBoom.classList.add('is-active')
  }

  updateBombPassGame()

  showPopup(
    '폭탄 터짐!',
    '지금 핸드폰을 들고 있던 사람이 당첨입니다.<br>지원되는 기기에서는 폭발 순간 진동이 울립니다.',
    { icon: '💣', allowHtml: true, popupClass: 'bomb-pass-result-popup' }
  )
}

function startBombPassGame() {
  if (!canPlayBombPassOnThisDevice()) {
    showPopup('모바일 전용 게임', '폭탄 넘기기는 핸드폰을 실제로 넘기며 플레이하는 게임이라 모바일에서만 이용할 수 있어.', { icon: '📱' })
    updateBombPassGame()
    return
  }

  if (bombPassRunning) return

  bombPassExploded = false
  bombPassRunning = true
  bombPassStartedAt = Date.now()
  bombPassDuration = Math.round(rand(BOMB_PASS_MIN_DURATION_MS, BOMB_PASS_MAX_DURATION_MS))

  if (bombPassBoom) {
    bombPassBoom.classList.remove('is-active')
  }

  updateBombPassGame()
  bombPassTimer = setTimeout(explodeBombPassGame, bombPassDuration)
}

function canPlayCircleTapOnThisDevice() {
  return isTouchDevice() && getViewportShortSide() <= 820
}

function parseCircleTapPlayers(text) {
  const names = String(text || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!names.length) return { status: 'EMPTY' }

  const seen = new Set()
  const players = []

  for (const name of names) {
    if (seen.has(name)) return { status: 'DUPLICATE', name }
    seen.add(name)

    players.push({
      id: `circle-tap-${players.length + 1}-${name}`,
      label: name,
      color: getCommonPlayerPaletteByTheme()[players.length % getCommonPlayerPaletteByTheme().length]
    })

    if (players.length > CIRCLE_TAP_MAX_PLAYERS) {
      return { status: 'TOO_MANY' }
    }
  }

  if (players.length < CIRCLE_TAP_MIN_PLAYERS) {
    return { status: 'TOO_FEW', players }
  }

  return { status: 'OK', players }
}

function setCircleTapInputLock(isLocked) {
  if (!circleTapConfigInput) return
  circleTapConfigInput.disabled = isLocked
  circleTapConfigInput.style.opacity = isLocked ? '0.65' : '1'
  circleTapConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
}

function setCircleTapPlayers(players) {
  circleTapPlayers = players
  circleTapLastValidConfigText = circleTapConfigInput ? circleTapConfigInput.value : circleTapLastValidConfigText
  circleTapLastAppliedRawText = circleTapConfigInput ? circleTapConfigInput.value : circleTapLastAppliedRawText
}

function updateCircleTapFromInput(options = {}) {
  const { render = true } = options
  if (!circleTapConfigInput) return false

  const parsed = parseCircleTapPlayers(circleTapConfigInput.value)

  if (parsed.status === 'OK') {
    setCircleTapPlayers(parsed.players)
    if (circleTapStatusText && !circleTapStarted) {
      circleTapStatusText.textContent = '참가자 등록 완료. 시작을 누르면 첫 번째 참가자 색상의 원이 나타나.'
    }
    if (render) renderCircleTapGame()
    return true
  }

  if (!circleTapStarted) {
    if (parsed.status === 'TOO_FEW' && parsed.players?.length) {
      circleTapPlayers = parsed.players
      if (circleTapStatusText) circleTapStatusText.textContent = `최소 ${CIRCLE_TAP_MIN_PLAYERS}명부터 시작할 수 있어.`
    } else if (circleTapStatusText) {
      const messages = {
        EMPTY: '참가자를 2명 이상 입력해줘.',
        DUPLICATE: '중복 이름은 사용할 수 없어.',
        TOO_MANY: `참가자는 최대 ${CIRCLE_TAP_MAX_PLAYERS}명까지 가능해.`
      }
      circleTapStatusText.textContent = messages[parsed.status] || '참가자 입력을 확인해줘.'
    }
  }

  if (render) renderCircleTapGame()
  return false
}

function getCurrentCircleTapPlayer() {
  return circleTapPlayers[circleTapCurrentIndex] || null
}

function updateCircleTapVisual() {
  const currentPlayer = getCurrentCircleTapPlayer()
  const currentColor = currentPlayer?.color || getCommonPlayerPaletteByTheme()[0] || '#ff82ad'
  const safeRadius = clampValue(circleTapRadius, CIRCLE_TAP_MIN_RADIUS, CIRCLE_TAP_START_RADIUS)
  const diameter = Math.round(safeRadius * 2)

  if (circleTapStage) {
    circleTapStage.classList.toggle('is-started', circleTapStarted && !circleTapFinished)
    circleTapStage.classList.toggle('is-finished', circleTapFinished)
    circleTapStage.classList.toggle('is-mobile-blocked', !canPlayCircleTapOnThisDevice())
    circleTapStage.style.setProperty('--circle-tap-current-color', currentColor)
  }

  if (circleTapTarget) {
    circleTapTarget.style.setProperty('--circle-tap-size', `${diameter}px`)
    circleTapTarget.style.setProperty('--circle-tap-current-color', currentColor)
    circleTapTarget.classList.toggle('is-active', circleTapStarted && !circleTapFinished)
    circleTapTarget.classList.toggle('is-finished', circleTapFinished)
  }

}

function renderCircleTapPlayers() {
  if (!circleTapPlayerList || !circleTapTotalInfo) return

  circleTapTotalInfo.textContent = circleTapPlayers.length ? `총 ${circleTapPlayers.length}명` : '총 0명'

  if (!circleTapPlayers.length) {
    circleTapPlayerList.innerHTML = '<div class="circle-tap-player-empty">참가자를 입력하면 차례 색상이 표시돼.</div>'
    return
  }

  const currentPlayer = getCurrentCircleTapPlayer()
  circleTapPlayerList.innerHTML = circleTapPlayers.map((player, index) => {
    const isCurrent = circleTapStarted && !circleTapFinished && currentPlayer?.id === player.id
    const isLoser = circleTapFinished && currentPlayer?.id === player.id
    const label = isLoser ? '탈락' : isCurrent ? '현재 차례' : `${index + 1}번째`
    return `
      <div class="circle-tap-player-item${isCurrent ? ' is-current' : ''}${isLoser ? ' is-loser' : ''}" style="--circle-tap-player-color:${player.color};">
        <span class="circle-tap-player-dot"></span>
        <strong>${escapeHtml(player.label)}</strong>
        <span>${label}</span>
      </div>
    `
  }).join('')
}

function renderCircleTapGame() {
  renderCircleTapPlayers()

  const canPlay = canPlayCircleTapOnThisDevice()
  const currentPlayer = getCurrentCircleTapPlayer()

  if (circleTapTurnBadge) {
    if (!canPlay) {
      circleTapTurnBadge.textContent = '모바일 전용'
    } else if (circleTapFinished && currentPlayer) {
      circleTapTurnBadge.textContent = `${currentPlayer.label} 탈락`
    } else if (circleTapStarted && currentPlayer) {
      circleTapTurnBadge.textContent = `${currentPlayer.label} 차례`
    } else {
      circleTapTurnBadge.textContent = '대기'
    }
  }

  if (circleTapStageHint) {
    if (!canPlay) {
      circleTapStageHint.textContent = '작아지는 원은 손가락 터치 판정이 핵심이라 모바일에서만 이용할 수 있어.'
    } else if (circleTapFinished && currentPlayer) {
      circleTapStageHint.textContent = `${currentPlayer.label}님이 원 밖을 눌러 탈락했어. 리셋 후 다시 시작할 수 있어.`
    } else if (circleTapStarted && currentPlayer) {
      circleTapStageHint.textContent = `${currentPlayer.label}님 차례. 자신의 색 원 안쪽을 정확히 눌러줘. 원 밖을 누르면 바로 탈락이야.`
    } else {
      circleTapStageHint.textContent = '시작을 누른 뒤, 현재 차례 참가자가 색상 원 안쪽을 정확히 눌러줘.'
    }
  }

  updateCircleTapVisual()
}

function ensureCircleTapReady() {
  if (!circleTapPlayers.length) {
    updateCircleTapFromInput({ render: false })
  }
  renderCircleTapGame()
}

function startCircleTapGame() {
  if (!canPlayCircleTapOnThisDevice()) {
    showPopup('모바일 전용 게임', '작아지는 원은 손가락으로 원 안쪽을 정확히 누르는 모바일 전용 게임이야. 모바일에서 접속해줘.', { icon: '📱' })
    renderCircleTapGame()
    return
  }

  if (!circleTapConfigInput) return
  const parsed = parseCircleTapPlayers(circleTapConfigInput.value)

  if (parsed.status !== 'OK') {
    showPopup('참가자 등록 확인', `작아지는 원 게임은 ${CIRCLE_TAP_MIN_PLAYERS}~${CIRCLE_TAP_MAX_PLAYERS}명이 이용 가능해.<br>참가자 이름은 쉼표로 구분하고 중복 없이 입력해줘.`, { icon: '⚠️', allowHtml: true })
    updateCircleTapFromInput()
    return
  }

  setCircleTapPlayers(parsed.players)
  circleTapStarted = true
  circleTapFinished = false
  circleTapCurrentIndex = 0
  circleTapRadius = CIRCLE_TAP_START_RADIUS
  circleTapSuccessCount = 0

  if (circleTapMissEffect) {
    circleTapMissEffect.classList.remove('is-active')
  }

  if (circleTapStatusText) {
    circleTapStatusText.textContent = '게임 시작! 현재 차례 참가자는 자기 색상 원 안쪽을 정확히 눌러줘.'
  }

  setCircleTapInputLock(true)
  renderCircleTapGame()
}

function stopCircleTapGame(options = {}) {
  const { preservePlayers = true } = options
  if (!preservePlayers) {
    circleTapPlayers = []
  }
  circleTapStarted = false
  renderCircleTapGame()
}

function resetCircleTapGame() {
  circleTapStarted = false
  circleTapFinished = false
  circleTapCurrentIndex = 0
  circleTapRadius = CIRCLE_TAP_START_RADIUS
  circleTapSuccessCount = 0
  setCircleTapInputLock(false)

  if (circleTapMissEffect) {
    circleTapMissEffect.classList.remove('is-active')
  }

  if (circleTapStatusText) {
    circleTapStatusText.textContent = '참가자를 등록한 뒤 시작을 누르면 현재 차례의 색상 원을 정확히 눌러줘.'
  }

  updateCircleTapFromInput({ render: false })
  renderCircleTapGame()
}

function advanceCircleTapTurn() {
  if (!circleTapStarted || circleTapFinished || !circleTapPlayers.length) return
  circleTapCurrentIndex = (circleTapCurrentIndex + 1) % circleTapPlayers.length
  const currentPlayer = getCurrentCircleTapPlayer()

  if (circleTapStatusText && currentPlayer) {
    circleTapStatusText.textContent = `${currentPlayer.label}님 차례. 원 안쪽을 정확히 눌러줘.`
  }

  renderCircleTapGame()
}

function shrinkCircleTapTarget() {
  const shrinkRatio = rand(CIRCLE_TAP_SHRINK_MIN, CIRCLE_TAP_SHRINK_MAX)
  const shrinkAmount = Math.max(0.75, circleTapRadius * shrinkRatio)
  circleTapRadius = Math.max(CIRCLE_TAP_MIN_RADIUS, circleTapRadius - shrinkAmount)
  circleTapSuccessCount += 1
}

function failCircleTapGame() {
  if (!circleTapStarted || circleTapFinished) return

  const loser = getCurrentCircleTapPlayer()
  circleTapFinished = true
  circleTapStarted = false

  if (circleTapMissEffect) {
    circleTapMissEffect.classList.remove('is-active')
    void circleTapMissEffect.offsetWidth
    circleTapMissEffect.classList.add('is-active')
  }

  if (circleTapStatusText && loser) {
    circleTapStatusText.textContent = `${loser.label}님이 원 밖을 눌러 탈락했어.`
  }

  renderCircleTapGame()

  if (loser) {
    showPopup(
      '원 밖 터치!',
      `<strong>${escapeHtml(loser.label)}</strong>님이 원 밖을 눌렀습니다.<br>이번 게임의 탈락자입니다.`,
      { icon: '⭕', allowHtml: true, popupClass: 'circle-tap-result-popup' }
    )
  }
}

function getCircleTapPointerResult(event) {
  if (!circleTapTarget || !event) return { inside: false }

  const rect = circleTapTarget.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const x = event.clientX
  const y = event.clientY
  const distance = Math.hypot(x - centerX, y - centerY)
  const radius = rect.width / 2

  return { inside: distance <= radius, distance, radius }
}

function handleCircleTapPointer(event) {
  if (event?.cancelable) event.preventDefault()

  if (!canPlayCircleTapOnThisDevice()) {
    showPopup('모바일 전용 게임', '이 게임은 손가락 터치 판정이 핵심이라 모바일에서만 이용할 수 있어.', { icon: '📱' })
    renderCircleTapGame()
    return
  }

  if (!circleTapStarted || circleTapFinished) {
    showPopup('게임 시작 필요', '참가자를 등록한 뒤 시작 버튼을 먼저 눌러줘.', { icon: '⭕' })
    return
  }

  const result = getCircleTapPointerResult(event)

  if (!result.inside) {
    failCircleTapGame()
    return
  }

  shrinkCircleTapTarget()
  updateCircleTapVisual()

  if (circleTapTarget) {
    circleTapTarget.classList.remove('is-hit')
    void circleTapTarget.offsetWidth
    circleTapTarget.classList.add('is-hit')
  }

  advanceCircleTapTurn()
}


function canPlayKeyReactOnThisDevice() {
  return !isMobileOrTabletLike()
}

function normalizeKeyReactKey(value) {
  const text = String(value || '')
  if (text === ' ') return 'SPACE'

  const raw = text.trim()
  if (!raw) return ''

  const aliases = {
    Spacebar: 'SPACE',
    Space: 'SPACE',
    Enter: 'ENTER',
    Escape: 'ESC',
    Esc: 'ESC',
    Backspace: 'BACKSPACE',
    Delete: 'DELETE',
    ArrowUp: '↑',
    ArrowDown: '↓',
    ArrowLeft: '←',
    ArrowRight: '→',
    Minus: '-',
    Equal: '=',
    BracketLeft: '[',
    BracketRight: ']',
    Semicolon: ';',
    Quote: "'",
    Comma: ',',
    Period: '.',
    Slash: '/',
    Backslash: '\\',
    Backquote: '`'
  }

  if (aliases[raw]) return aliases[raw]
  if (/^Key[A-Z]$/i.test(raw)) return raw.slice(3).toUpperCase()
  if (/^Digit[0-9]$/i.test(raw)) return raw.slice(5)
  if (/^Numpad[0-9]$/i.test(raw)) return `NUM${raw.slice(6)}`
  if (raw.length === 1) return raw.toUpperCase()
  return raw.replace(/^Key/i, '').replace(/^Digit/i, '').toUpperCase()
}

function normalizeKeyReactEventKey(event) {
  const code = String(event?.code || '')

  if (/^Key[A-Z]$/.test(code)) return code.slice(3)
  if (/^Digit[0-9]$/.test(code)) return code.slice(5)
  if (/^Numpad[0-9]$/.test(code)) return `NUM${code.slice(6)}`

  const codeAliases = {
    Space: 'SPACE',
    Enter: 'ENTER',
    Escape: 'ESC',
    Backspace: 'BACKSPACE',
    Delete: 'DELETE',
    ArrowUp: '↑',
    ArrowDown: '↓',
    ArrowLeft: '←',
    ArrowRight: '→',
    Minus: '-',
    Equal: '=',
    BracketLeft: '[',
    BracketRight: ']',
    Semicolon: ';',
    Quote: "'",
    Comma: ',',
    Period: '.',
    Slash: '/',
    Backslash: '\\',
    Backquote: '`'
  }

  if (codeAliases[code]) return codeAliases[code]
  return normalizeKeyReactKey(event?.key || '')
}

function getDefaultKeyReactKey(index, usedKeys = new Set()) {
  const fallbackKeys = [...KEY_REACT_DEFAULT_KEYS, 'Q', 'W', 'E', 'R', 'U', 'I', 'O', 'P']
  const found = fallbackKeys.find((key) => !usedKeys.has(key))
  return found || `F${index + 1}`
}

function getKeyReactPlayerResult(playerId) {
  return keyReactResults.find((result) => result.playerId === playerId) || null
}

function getValidKeyReactResults() {
  return keyReactResults.filter((result) => result.status === 'valid')
}

function getKeyReactResultLabel(player) {
  const result = getKeyReactPlayerResult(player.id)
  if (!result) {
    if (keyReactPhase === 'click') return '입력 대기'
    if (keyReactPhase === 'stay') return '누르면 실격'
    return '대기'
  }

  if (result.status === 'false-start') return '실격'

  const rank = getValidKeyReactResults().findIndex((item) => item.playerId === player.id) + 1
  return `${rank}위 · ${result.reactionMs}ms`
}

function parseKeyReactPlayers(text) {
  const names = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!names.length) return { status: 'EMPTY' }

  const seen = new Set()
  const usedKeys = new Set()
  const existingKeyByName = new Map(keyReactPlayers.map((player) => [player.label, player.key]))
  const players = []

  for (const name of names) {
    if (seen.has(name)) return { status: 'DUPLICATE', name }
    seen.add(name)

    const existingKey = normalizeKeyReactKey(existingKeyByName.get(name) || '')
    const assignedKey = existingKey && !usedKeys.has(existingKey)
      ? existingKey
      : getDefaultKeyReactKey(players.length, usedKeys)

    usedKeys.add(assignedKey)
    players.push({
      id: `key-react-${players.length + 1}-${name}`,
      label: name,
      key: assignedKey,
      color: getCommonPlayerPaletteByTheme()[players.length % getCommonPlayerPaletteByTheme().length]
    })

    if (players.length > KEY_REACT_MAX_PLAYERS) {
      return { status: 'TOO_MANY' }
    }
  }

  if (players.length < KEY_REACT_MIN_PLAYERS) {
    return { status: 'TOO_FEW', players }
  }

  return { status: 'OK', players }
}

function getKeyReactDuplicateKeys(players = keyReactPlayers) {
  const counts = new Map()
  players.forEach((player) => {
    const key = normalizeKeyReactKey(player.key)
    if (!key) return
    counts.set(key, (counts.get(key) || 0) + 1)
  })

  return new Set([...counts.entries()].filter(([, count]) => count > 1).map(([key]) => key))
}

function updateKeyReactFromInput(options = {}) {
  const { render = true } = options
  if (!keyReactConfigInput) return false

  const parsed = parseKeyReactPlayers(keyReactConfigInput.value)

  if (parsed.status === 'OK') {
    keyReactPlayers = parsed.players
    keyReactLastValidConfigText = keyReactConfigInput.value
    keyReactLastAppliedRawText = keyReactConfigInput.value

    if (keyReactStatusText && keyReactPhase === 'idle') {
      keyReactStatusText.textContent = '참가자 등록 완료. 각자 사용할 키를 지정한 뒤 시작을 눌러줘.'
    }

    if (render) renderKeyReactGame()
    return true
  }

  if (keyReactPhase === 'idle') {
    if (parsed.status === 'TOO_FEW' && parsed.players?.length) {
      keyReactPlayers = parsed.players
      if (keyReactStatusText) keyReactStatusText.textContent = `최소 ${KEY_REACT_MIN_PLAYERS}명부터 시작할 수 있어.`
    } else if (keyReactStatusText) {
      const messages = {
        EMPTY: '참가자를 2명 이상 입력해줘.',
        DUPLICATE: '중복 이름은 사용할 수 없어.',
        TOO_MANY: `참가자는 최대 ${KEY_REACT_MAX_PLAYERS}명까지 가능해.`
      }
      keyReactStatusText.textContent = messages[parsed.status] || '참가자 입력을 확인해줘.'
    }
  }

  if (render) renderKeyReactGame()
  return false
}

function setKeyReactInputLock(isLocked) {
  if (keyReactConfigInput) {
    keyReactConfigInput.disabled = isLocked
    keyReactConfigInput.style.opacity = isLocked ? '0.65' : '1'
    keyReactConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
  }

  if (keyReactKeyList) {
    keyReactKeyList.querySelectorAll('.key-react-key-input').forEach((input) => {
      input.disabled = isLocked
      input.style.opacity = isLocked ? '0.65' : '1'
      input.style.cursor = isLocked ? 'not-allowed' : 'pointer'
    })
  }
}

function updateKeyReactPhaseVisuals() {
  if (keyReactStage) {
    keyReactStage.classList.remove('is-idle', 'is-stay', 'is-click', 'is-finished', 'is-desktop-blocked')
    keyReactStage.classList.add(`is-${keyReactPhase}`)
    keyReactStage.classList.toggle('is-desktop-blocked', !canPlayKeyReactOnThisDevice())
  }

  if (keyReactPhaseBadge) {
    if (!canPlayKeyReactOnThisDevice()) {
      keyReactPhaseBadge.textContent = 'PC 전용'
    } else if (keyReactPhase === 'stay') {
      keyReactPhaseBadge.textContent = 'STAY'
    } else if (keyReactPhase === 'click') {
      keyReactPhaseBadge.textContent = 'CLICK!'
    } else if (keyReactPhase === 'finished') {
      keyReactPhaseBadge.textContent = '결과 완료'
    } else {
      keyReactPhaseBadge.textContent = '대기'
    }
  }

  if (keyReactSignalText) {
    if (!canPlayKeyReactOnThisDevice()) {
      keyReactSignalText.textContent = 'PC ONLY'
    } else if (keyReactPhase === 'stay') {
      keyReactSignalText.textContent = 'STAY...'
    } else if (keyReactPhase === 'click') {
      keyReactSignalText.textContent = 'CLICK!'
    } else if (keyReactPhase === 'finished') {
      keyReactSignalText.textContent = 'RESULT'
    } else {
      keyReactSignalText.textContent = 'READY'
    }
  }

  if (keyReactSignalSubText) {
    if (!canPlayKeyReactOnThisDevice()) {
      keyReactSignalSubText.textContent = '이 게임은 키보드 입력이 필요한 컴퓨터 전용 게임입니다.'
    } else if (keyReactPhase === 'stay') {
      keyReactSignalSubText.textContent = '아직 누르면 안 됩니다. STAY 중 입력은 실격입니다.'
    } else if (keyReactPhase === 'click') {
      keyReactSignalSubText.textContent = '지금 자신의 지정 키를 눌러주세요.'
    } else if (keyReactPhase === 'finished') {
      keyReactSignalSubText.textContent = '모든 참가자의 입력이 완료되었습니다. 리셋 후 다시 시작할 수 있습니다.'
    } else {
      keyReactSignalSubText.textContent = '시작을 누르면 곧 STAY...가 표시됩니다.'
    }
  }
}

function renderKeyReactKeyList() {
  if (!keyReactKeyList) return

  if (!keyReactPlayers.length) {
    keyReactCapturePlayerId = ''
    keyReactKeyList.innerHTML = '<div class="key-react-player-empty">참가자를 입력하면 키 지정칸이 표시돼.</div>'
    return
  }

  if (!keyReactPlayers.some((player) => player.id === keyReactCapturePlayerId)) {
    keyReactCapturePlayerId = ''
  }

  const duplicateKeys = getKeyReactDuplicateKeys()
  keyReactKeyList.innerHTML = keyReactPlayers.map((player) => {
    const isDuplicate = duplicateKeys.has(normalizeKeyReactKey(player.key))
    const isListening = keyReactCapturePlayerId === player.id
    return `
      <div class="key-react-key-row${isDuplicate ? ' is-duplicate' : ''}${isListening ? ' is-listening' : ''}" data-player-id="${escapeHtml(player.id)}" style="--key-react-player-color:${player.color};">
        <span class="key-react-player-dot"></span>
        <strong>${escapeHtml(player.label)}</strong>
        <button class="key-react-key-input" data-player-id="${escapeHtml(player.id)}" type="button" aria-label="${escapeHtml(player.label)} 키 지정" title="클릭 후 원하는 키를 누르세요">${escapeHtml(isListening ? '입력중' : player.key)}</button>
      </div>
    `
  }).join('')
}

function renderKeyReactPlayers() {
  if (!keyReactPlayerList || !keyReactTotalInfo) return

  keyReactTotalInfo.textContent = keyReactPlayers.length ? `총 ${keyReactPlayers.length}명` : '총 0명'

  if (!keyReactPlayers.length) {
    keyReactPlayerList.innerHTML = '<div class="key-react-player-empty">참가자를 입력하면 키와 상태가 표시돼.</div>'
    return
  }

  keyReactPlayerList.innerHTML = keyReactPlayers.map((player) => {
    const result = getKeyReactPlayerResult(player.id)
    const isDone = Boolean(result)
    const isFalseStart = result?.status === 'false-start'
    return `
      <div class="key-react-player-item${isDone ? ' is-done' : ''}${isFalseStart ? ' is-false-start' : ''}" style="--key-react-player-color:${player.color};">
        <span class="key-react-player-dot"></span>
        <strong>${escapeHtml(player.label)}</strong>
        <kbd>${escapeHtml(player.key)}</kbd>
        <span>${escapeHtml(getKeyReactResultLabel(player))}</span>
      </div>
    `
  }).join('')
}

function renderKeyReactKeyChips() {
  if (!keyReactKeyChips) return

  if (!keyReactPlayers.length) {
    keyReactKeyChips.innerHTML = ''
    return
  }

  keyReactKeyChips.innerHTML = keyReactPlayers.map((player) => {
    const result = getKeyReactPlayerResult(player.id)
    return `
      <div class="key-react-chip${result ? ' is-pressed' : ''}${result?.status === 'false-start' ? ' is-false-start' : ''}" style="--key-react-player-color:${player.color};">
        <strong>${escapeHtml(player.label)}</strong>
        <kbd>${escapeHtml(player.key)}</kbd>
      </div>
    `
  }).join('')
}

function renderKeyReactRanking() {
  if (!keyReactRankingList || !keyReactResultCount) return

  keyReactResultCount.textContent = `${keyReactResults.length} / ${keyReactPlayers.length}`

  if (!keyReactResults.length) {
    keyReactRankingList.innerHTML = '<div class="key-react-ranking-empty">CLICK 이후 키를 누른 순서가 여기에 표시돼.</div>'
    return
  }

  const validResults = getValidKeyReactResults()
  const html = keyReactResults.map((result) => {
    const rank = result.status === 'valid'
      ? validResults.findIndex((item) => item.playerId === result.playerId) + 1
      : 0
    const isValid = result.status === 'valid'
    return `
      <div class="key-react-ranking-item${isValid ? ' is-valid' : ' is-false-start'}">
        <span class="key-react-rank-badge">${isValid ? `${rank}위` : '실격'}</span>
        <strong>${escapeHtml(result.label)}</strong>
        <span>${isValid ? `${result.reactionMs}ms` : 'STAY 입력'}</span>
      </div>
    `
  }).join('')

  keyReactRankingList.innerHTML = html
}

function renderKeyReactGame() {
  renderKeyReactKeyList()
  renderKeyReactPlayers()
  renderKeyReactKeyChips()
  renderKeyReactRanking()
  updateKeyReactPhaseVisuals()
  setKeyReactInputLock(keyReactPhase === 'stay' || keyReactPhase === 'click')

  if (startKeyReactBtn) {
    startKeyReactBtn.disabled = keyReactPhase === 'stay' || keyReactPhase === 'click'
    startKeyReactBtn.textContent = keyReactPhase === 'stay' || keyReactPhase === 'click' ? '진행 중' : '시작'
  }
}

function ensureKeyReactReady() {
  if (!keyReactPlayers.length) {
    updateKeyReactFromInput({ render: false })
  }
  renderKeyReactGame()
}

function getKeyReactInputByPlayerId(playerId) {
  if (!keyReactKeyList || !playerId) return null
  return [...keyReactKeyList.querySelectorAll('.key-react-key-input')]
    .find((input) => input.dataset.playerId === playerId) || null
}

function beginKeyReactKeyCapture(input) {
  if (!input || input.disabled) return
  const playerId = input.dataset.playerId || ''
  if (!playerId) return

  keyReactCapturePlayerId = playerId

  if (keyReactStatusText && keyReactPhase === 'idle') {
    const player = keyReactPlayers.find((item) => item.id === playerId)
    keyReactStatusText.textContent = `${player?.label || '참가자'}님 키 지정 대기 중. 원하는 키를 한 번 눌러줘.`
  }

  renderKeyReactKeyList()
  const nextInput = getKeyReactInputByPlayerId(playerId)
  nextInput?.focus({ preventScroll: true })
}

function endKeyReactKeyCapture() {
  if (!keyReactCapturePlayerId) return
  keyReactCapturePlayerId = ''
  renderKeyReactKeyList()
}

function setKeyReactPlayerKey(playerId, key) {
  const normalizedKey = normalizeKeyReactKey(key)
  if (!normalizedKey) return

  keyReactPlayers = keyReactPlayers.map((player) => {
    if (player.id !== playerId) return player
    return { ...player, key: normalizedKey }
  })

  if (keyReactStatusText && keyReactPhase === 'idle') {
    const duplicateKeys = getKeyReactDuplicateKeys()
    keyReactStatusText.textContent = duplicateKeys.size
      ? '중복된 키가 있어. 참가자별 키는 서로 달라야 해.'
      : '키 지정 완료. 시작을 누르면 STAY... 이후 CLICK이 뜬다.'
  }

  renderKeyReactGame()
}

function setKeyReactPlayerKeyFromEvent(playerId, event) {
  const normalizedKey = normalizeKeyReactEventKey(event)
  if (!normalizedKey) return
  setKeyReactPlayerKey(playerId, normalizedKey)
}

function handleKeyReactKeyAssignKeydown(event) {
  if (!screens.physicalKeyReact?.classList.contains('active')) return
  if (!keyReactKeyList || keyReactPhase === 'stay' || keyReactPhase === 'click') return

  const target = event.target
  const focusedInput = target instanceof HTMLElement ? target.closest('.key-react-key-input') : null
  const captureInput = keyReactCapturePlayerId ? getKeyReactInputByPlayerId(keyReactCapturePlayerId) : null
  const input = focusedInput || captureInput

  if (!input || input.disabled) return
  if (event.key === 'Tab') return

  event.preventDefault()
  event.stopPropagation()

  if (event.key === 'Escape') {
    endKeyReactKeyCapture()
    input.blur()
    return
  }

  const playerId = input.dataset.playerId || keyReactCapturePlayerId
  setKeyReactPlayerKeyFromEvent(playerId, event)
  keyReactCapturePlayerId = ''
  input.blur()
  renderKeyReactGame()
}

function validateKeyReactStart() {
  const duplicateKeys = getKeyReactDuplicateKeys()
  const hasEmptyKey = keyReactPlayers.some((player) => !normalizeKeyReactKey(player.key))

  if (hasEmptyKey || duplicateKeys.size) {
    showPopup('키 지정 확인', '모든 참가자의 키를 서로 다르게 지정해야 시작할 수 있어.', { icon: '⌨️' })
    return false
  }

  return true
}

function startKeyReactGame() {
  if (!canPlayKeyReactOnThisDevice()) {
    showPopup('PC 전용 게임', 'STAY CLICK은 키보드 입력이 필요한 컴퓨터 전용 피지컬 게임이야. PC에서 이용해줘.', { icon: '🖥️' })
    renderKeyReactGame()
    return
  }

  if (!keyReactConfigInput) return
  const parsed = parseKeyReactPlayers(keyReactConfigInput.value)

  if (parsed.status !== 'OK') {
    showPopup('참가자 등록 확인', `STAY CLICK 게임은 ${KEY_REACT_MIN_PLAYERS}~${KEY_REACT_MAX_PLAYERS}명이 이용 가능해.<br>참가자 이름은 쉼표로 구분하고 중복 없이 입력해줘.`, { icon: '⚠️', allowHtml: true })
    updateKeyReactFromInput()
    return
  }

  keyReactPlayers = parsed.players.map((player) => {
    const current = keyReactPlayers.find((item) => item.label === player.label)
    return current ? { ...player, key: current.key } : player
  })

  if (!validateKeyReactStart()) {
    renderKeyReactGame()
    return
  }

  keyReactRoundToken += 1
  const roundToken = keyReactRoundToken
  keyReactPhase = 'stay'
  keyReactCapturePlayerId = ''
  keyReactResults = []
  keyReactClickStartedAt = 0
  clearKeyReactTimer()

  const stayDuration = Math.round(rand(KEY_REACT_STAY_MIN_MS, KEY_REACT_STAY_MAX_MS))

  if (keyReactStatusText) {
    keyReactStatusText.textContent = 'STAY... 아직 누르면 안 돼. CLICK이 뜨는 순간 자신의 키를 눌러줘.'
  }

  renderKeyReactGame()

  keyReactTimer = setTimeout(() => {
    if (roundToken !== keyReactRoundToken || keyReactPhase !== 'stay') return
    triggerKeyReactClick()
  }, stayDuration)
}

function triggerKeyReactClick() {
  if (keyReactResults.length >= keyReactPlayers.length) {
    finishKeyReactGame()
    return
  }

  keyReactPhase = 'click'
  keyReactClickStartedAt = performance.now()

  if (keyReactStatusText) {
    keyReactStatusText.textContent = 'CLICK! 지금 자신의 키를 눌러줘.'
  }

  renderKeyReactGame()
}

function clearKeyReactTimer() {
  if (!keyReactTimer) return
  clearTimeout(keyReactTimer)
  keyReactTimer = null
}

function stopKeyReactGame(options = {}) {
  const { preservePlayers = true } = options
  clearKeyReactTimer()
  keyReactRoundToken += 1
  keyReactPhase = 'idle'
  keyReactCapturePlayerId = ''
  keyReactClickStartedAt = 0
  keyReactResults = []
  if (!preservePlayers) keyReactPlayers = []
  setKeyReactInputLock(false)
  renderKeyReactGame()
}

function resetKeyReactGame() {
  clearKeyReactTimer()
  keyReactRoundToken += 1
  keyReactPhase = 'idle'
  keyReactCapturePlayerId = ''
  keyReactClickStartedAt = 0
  keyReactResults = []
  setKeyReactInputLock(false)

  if (keyReactStatusText) {
    keyReactStatusText.textContent = '참가자와 키를 지정한 뒤 시작을 누르면 STAY... 이후 CLICK이 뜬다.'
  }

  updateKeyReactFromInput({ render: false })
  renderKeyReactGame()
}

function finishKeyReactGame() {
  if (keyReactPhase === 'finished') return

  clearKeyReactTimer()
  keyReactPhase = 'finished'
  keyReactClickStartedAt = 0
  setKeyReactInputLock(false)

  if (keyReactStatusText) {
    keyReactStatusText.textContent = '모든 참가자의 입력이 완료됐어. 순위가 확정됐어.'
  }

  renderKeyReactGame()
  showKeyReactResultsPopup()
}

function showKeyReactResultsPopup() {
  const validResults = getValidKeyReactResults()
  const html = keyReactResults.length
    ? `<div class="key-react-popup-list">${keyReactResults.map((result) => {
        const isValid = result.status === 'valid'
        const rank = isValid ? validResults.findIndex((item) => item.playerId === result.playerId) + 1 : 0
        return `
          <div class="key-react-popup-item${isValid ? ' is-valid' : ' is-false-start'}">
            <span>${isValid ? `${rank}위` : '실격'}</span>
            <strong>${escapeHtml(result.label)}</strong>
            <em>${isValid ? `${result.reactionMs}ms` : 'STAY에서 먼저 누름'}</em>
          </div>
        `
      }).join('')}</div>`
    : '<span>결과가 없습니다.</span>'

  showPopup('STAY CLICK 결과', html, { icon: '⌨️', allowHtml: true, popupClass: 'key-react-result-popup' })
}

function recordKeyReactResult(player, status, reactionMs = null) {
  if (!player || getKeyReactPlayerResult(player.id)) return

  keyReactResults.push({
    playerId: player.id,
    label: player.label,
    key: player.key,
    status,
    reactionMs
  })

  if (keyReactStatusText) {
    if (status === 'false-start') {
      keyReactStatusText.textContent = `${player.label}님이 STAY 중에 눌러 실격 처리됐어.`
    } else {
      const rank = getValidKeyReactResults().length
      keyReactStatusText.textContent = `${rank}위 ${player.label}님 · ${reactionMs}ms`
    }
  }

  renderKeyReactGame()

  if (keyReactResults.length >= keyReactPlayers.length) {
    finishKeyReactGame()
  }
}

function handleKeyReactGlobalKeydown(event) {
  if (!screens.physicalKeyReact?.classList.contains('active')) return
  if (event.repeat) return

  const target = event.target
  if (target instanceof HTMLElement && target.closest('.key-react-key-input')) return
  if (keyReactPhase !== 'stay' && keyReactPhase !== 'click') return

  const pressedKey = normalizeKeyReactEventKey(event)
  const player = keyReactPlayers.find((item) => normalizeKeyReactKey(item.key) === pressedKey)
  if (!player) return

  event.preventDefault()

  if (keyReactPhase === 'stay') {
    recordKeyReactResult(player, 'false-start')
    return
  }

  if (keyReactPhase === 'click') {
    const reactionMs = Math.max(0, Math.round(performance.now() - keyReactClickStartedAt))
    recordKeyReactResult(player, 'valid', reactionMs)
  }
}

if (startBtn) {
  startBtn.addEventListener('click', () => showScreen('menu'))
}

if (physicalBtn) {
  physicalBtn.addEventListener('click', () => showScreen('physical'))
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


if (luckGameGrid) {
  luckGameGrid.addEventListener('click', handleLuckFastForwardBadgeClick, true)
}

backButtons.forEach((button) => {
  button.addEventListener('click', () => {
    goToPreviousStep(button.dataset.target)
  })
})

gameLaunchButtons.forEach((button) => {
  bindLuckGameItemInteraction(button)
})

comingSoonButtons.forEach((button) => {
  bindLuckGameItemInteraction(button)
})

physicalGameLaunchButtons.forEach((button) => {
  bindPhysicalGameItemInteraction(button)
})


if (balloonConfigInput) {
  balloonConfigInput.addEventListener('input', () => {
    if (!balloonGameStarted) {
      updateBalloonFromInput()
    }
  })

  balloonConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startBalloonGame()
    }
  })
}

if (startBalloonBtn) {
  startBalloonBtn.addEventListener('click', startBalloonGame)
}

if (resetBalloonBtn) {
  resetBalloonBtn.addEventListener('click', resetBalloonGame)
}

if (balloonPressArea) {
  balloonPressArea.addEventListener('pointerdown', startBalloonPress)
  balloonPressArea.addEventListener('pointerup', endBalloonPress)
  balloonPressArea.addEventListener('pointercancel', endBalloonPress)
  balloonPressArea.addEventListener('pointerleave', endBalloonPress)
  balloonPressArea.addEventListener('contextmenu', (event) => event.preventDefault())
  balloonPressArea.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    startBalloonPress(event)
  })
  balloonPressArea.addEventListener('keyup', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    endBalloonPress()
  })
}

if (startBombPassBtn) {
  startBombPassBtn.addEventListener('click', startBombPassGame)
}

if (resetBombPassBtn) {
  resetBombPassBtn.addEventListener('click', resetBombPassGame)
}

if (circleTapConfigInput) {
  circleTapConfigInput.addEventListener('input', () => {
    if (!circleTapStarted) {
      updateCircleTapFromInput()
    }
  })

  circleTapConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startCircleTapGame()
    }
  })
}

if (startCircleTapBtn) {
  startCircleTapBtn.addEventListener('click', startCircleTapGame)
}

if (resetCircleTapBtn) {
  resetCircleTapBtn.addEventListener('click', resetCircleTapGame)
}

if (circleTapStage) {
  circleTapStage.addEventListener('pointerdown', handleCircleTapPointer)
  circleTapStage.addEventListener('contextmenu', (event) => event.preventDefault())
}


if (keyReactConfigInput) {
  keyReactConfigInput.addEventListener('input', () => {
    if (keyReactPhase === 'idle' || keyReactPhase === 'finished') {
      keyReactPhase = 'idle'
      keyReactResults = []
      updateKeyReactFromInput()
    }
  })

  keyReactConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startKeyReactGame()
    }
  })
}

if (keyReactKeyList) {
  keyReactKeyList.addEventListener('pointerdown', (event) => {
    const target = event.target instanceof HTMLElement ? event.target : null
    const row = target?.closest('.key-react-key-row') || null
    const input = target?.closest('.key-react-key-input') || row?.querySelector('.key-react-key-input') || null

    if (input && !input.disabled && keyReactPhase !== 'stay' && keyReactPhase !== 'click') {
      event.preventDefault()
      beginKeyReactKeyCapture(input)
    }
  })

  keyReactKeyList.addEventListener('click', (event) => {
    const target = event.target instanceof HTMLElement ? event.target : null
    const row = target?.closest('.key-react-key-row') || null
    const input = target?.closest('.key-react-key-input') || row?.querySelector('.key-react-key-input') || null

    if (input && !input.disabled && keyReactPhase !== 'stay' && keyReactPhase !== 'click') {
      event.preventDefault()
      beginKeyReactKeyCapture(input)
    }
  })

  keyReactKeyList.addEventListener('focusin', (event) => {
    const input = event.target instanceof HTMLElement ? event.target.closest('.key-react-key-input') : null
    if (input && !input.disabled && keyReactCapturePlayerId !== input.dataset.playerId) {
      beginKeyReactKeyCapture(input)
    }
  })
}

if (startKeyReactBtn) {
  startKeyReactBtn.addEventListener('click', startKeyReactGame)
}

if (resetKeyReactBtn) {
  resetKeyReactBtn.addEventListener('click', resetKeyReactGame)
}

document.addEventListener('keydown', handleKeyReactKeyAssignKeydown, true)
document.addEventListener('keydown', handleKeyReactGlobalKeydown)

if (stockConfigInput) {
  stockConfigInput.addEventListener('input', () => {
    if (!stockGameRunning) {
      updateStockFromInput({ preserveDrafts: true })
    }
  })

  stockConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startStockGame()
    }
  })
}

if (stockDurationInput) {
  stockDurationInput.addEventListener('input', () => {
    stockDurationSeconds = clampStockDuration(stockDurationInput.value)
    stockDurationInput.value = String(stockDurationSeconds)
    updateStockDurationText()
    updateStockDescription()
    renderStockTimer()
  })
}

if (shuffleStockBtn) {
  shuffleStockBtn.addEventListener('click', shuffleStockParticipants)
}

if (startStockBtn) {
  startStockBtn.addEventListener('click', startStockGame)
}

if (resetStockBtn) {
  resetStockBtn.addEventListener('click', resetStockGame)
}

if (stockPlayerTabs) {
  stockPlayerTabs.addEventListener('click', (event) => {
    const button = event.target.closest('.stock-player-tab')
    if (!button || stockGameRunning) return
    stockFocusedSelectionId = ''
    setStockTurnByPlayerId(button.dataset.playerId)
  })
}

if (stockAllocationEditor) {
  stockAllocationEditor.addEventListener('input', (event) => {
    const target = event.target
    if (!(target instanceof HTMLInputElement)) return
    if (stockGameRunning) return

    if (target.classList.contains('stock-amount-input')) {
      commitStockAmountInput(target, { restoreFocus: true })
    }
  })

  stockAllocationEditor.addEventListener('change', (event) => {
    const target = event.target
    if (!(target instanceof HTMLInputElement) || stockGameRunning) return

    if (target.classList.contains('stock-amount-input')) {
      commitStockAmountInput(target)
    }
  })

  stockAllocationEditor.addEventListener('click', (event) => {
    const button = event.target.closest('button')
    if (!button || stockGameRunning) return

    const playerId = button.dataset.playerId
    const stockId = button.dataset.stockId

    if (button.dataset.stockCarouselNav) {
      moveStockFocusedSelection(button.dataset.stockCarouselNav === 'next' ? 1 : -1)
      return
    }

    if (button.dataset.stockStep && playerId && stockId) {
      stockFocusedSelectionId = stockId
      adjustStockDraftAmountByStock(playerId, stockId, Number(button.dataset.stockStep))
      return
    }

    if (button.dataset.stockFill === 'remaining' && playerId && stockId) {
      stockFocusedSelectionId = stockId
      fillRemainingStockDraftAmount(playerId, stockId)
      return
    }

    if (button.classList.contains('stock-picked-remove-btn') && playerId && stockId) {
      stockFocusedSelectionId = ''
      clearStockDraftStock(playerId, stockId)
    }
  })
}

if (stockAllocationSummary) {
  stockAllocationSummary.addEventListener('click', (event) => {
    const button = event.target.closest('.stock-turn-btn')
    if (!button || stockGameRunning) return

    if (button.dataset.stockAction === 'equalize') {
      const activePlayer = stockPlayers[stockSetupTurnIndex] || stockPlayers[0]
      if (activePlayer) {
        equalizeStockDraftAmounts(activePlayer.id)
      }
      return
    }

    if (button.dataset.stockAction === 'clear-all') {
      const activePlayer = stockPlayers[stockSetupTurnIndex] || stockPlayers[0]
      if (activePlayer) {
        clearAllStockDraftAmounts(activePlayer.id)
      }
      return
    }

    if (button.dataset.stockTurn === 'prev') {
      stockFocusedSelectionId = ''
      stockSetupTurnIndex = clampValue(stockSetupTurnIndex - 1, 0, Math.max(0, stockPlayers.length - 1))
      renderStockGame()
      return
    }

    if (button.dataset.stockTurn === 'next') {
      stockFocusedSelectionId = ''
      stockSetupTurnIndex = clampValue(stockSetupTurnIndex + 1, 0, Math.max(0, stockPlayers.length - 1))
      renderStockGame()
    }
  })
}

if (stockRoster) {
  stockRoster.addEventListener('click', (event) => {
    const button = event.target.closest('.stock-roster-card-btn')
    if (!button || stockGameRunning) return
    const playerId = button.dataset.playerId
    const stockId = button.dataset.stockId
    if (!playerId || !stockId) return
    stockFocusedSelectionId = stockId
    toggleStockDraftSelection(playerId, stockId)
  })
}

if (ladderConfigInput) {
  ladderConfigInput.addEventListener('input', () => {
    if (!ladderGameStarted) {
      updateLadderFromInput()
    } else {
      updateLadderHelperText()
    }
  })

  ladderConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startLadderGame()
    }
  })
}

if (shuffleLadderBtn) {
  shuffleLadderBtn.addEventListener('click', shuffleLadderParticipants)
}

if (startLadderBtn) {
  startLadderBtn.addEventListener('click', startLadderGame)
}

if (resetLadderBtn) {
  resetLadderBtn.addEventListener('click', resetLadderGame)
}

if (ladderCheckList) {
  ladderCheckList.addEventListener('click', (event) => {
    const button = event.target.closest('.ladder-check-btn')
    if (!button || button.disabled) return
    checkLadderResult(button.dataset.playerId)
  })
}

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


if (startNavalBtn) {
  startNavalBtn.addEventListener('click', startNavalGame)
}

if (resetNavalBtn) {
  resetNavalBtn.addEventListener('click', resetNavalGame)
}

if (navalConfigInput) {
  navalConfigInput.addEventListener('input', () => {
    if (!navalRunning && !navalFinished) {
      updateNavalFromInput()
    }
  })

  navalConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startNavalGame()
    }
  })
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

document.addEventListener('click', handleGameInfoTabClick)

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

if (raceTrackZoomBtn) {
  raceTrackZoomBtn.addEventListener('pointerdown', stopZoomControlEvent)
  raceTrackZoomBtn.addEventListener('pointerup', stopZoomControlEvent)
  raceTrackZoomBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    toggleRaceTrackZoom()
  })
}

if (raceTrackZoomBackdrop) {
  raceTrackZoomBackdrop.addEventListener('click', () => {
    if (raceTrackZoomed) {
      closeRaceTrackZoom()
    }
  })
}

if (rouletteStageZoomBtn) {
  rouletteStageZoomBtn.addEventListener('pointerdown', stopZoomControlEvent)
  rouletteStageZoomBtn.addEventListener('pointerup', stopZoomControlEvent)
  rouletteStageZoomBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    toggleRouletteStageZoom()
  })
}

if (rouletteStageZoomBackdrop) {
  rouletteStageZoomBackdrop.addEventListener('click', () => {
    if (rouletteStageZoomed) {
      closeRouletteStageZoom()
    }
  })
}

if (simArenaZoomBtn) {
  simArenaZoomBtn.addEventListener('click', toggleSimArenaZoom)
}

if (simArenaZoomBackdrop) {
  simArenaZoomBackdrop.addEventListener('click', () => {
    if (simArenaZoomed) {
      closeSimArenaZoom()
    }
  })
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleThemePreference)
}

if (fullscreenToggleBtn) {
  fullscreenToggleBtn.addEventListener('click', () => {
    toggleFullscreenMode()
  })
}

;[desktopPrevStepBtn, mobilePrevStepBtn].forEach((button) => {
  if (!button) return

  button.addEventListener('click', () => {
    if (button.disabled) return
    goToPreviousStep(button.dataset.fallbackTarget || getPreviousStepFallbackTarget())
  })
})

document.addEventListener('fullscreenchange', () => {
  updateFullscreenToggleButton()
  syncResponsiveAfterViewportModeChange()
})

document.addEventListener('webkitfullscreenchange', () => {
  updateFullscreenToggleButton()
  syncResponsiveAfterViewportModeChange()
})

bindFastForwardTarget('game1')
bindFastForwardTarget('game2')
bindFastForwardTarget('game4')
bindFastForwardTarget('game5')

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return

  if (raceTrackZoomed) {
    closeRaceTrackZoom()
  }

  if (simArenaZoomed) {
    closeSimArenaZoom()
  }

  if (rouletteStageZoomed) {
    closeRouletteStageZoom()
  }
})

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
    syncLuckCarousel({ align: screens.luck?.classList.contains('active') })
    syncPhysicalCarousel({ align: screens.physical?.classList.contains('active') })
    updateOrientationGate()

    if (screens.game1?.classList.contains('active')) {
      fitGameCanvasViewport()

      if (engine && currentSlots.length) {
        buildBoard()
      }
    }

    if (screens.game7?.classList.contains('active')) {
      updateLadderHelperText()
      renderLadderGame()
    }

    if (screens.game2?.classList.contains('active') && raceHorses.length) {
      renderRacePreview()
      if (raceTrackZoomed) {
        updateRaceTrackZoomLayout()
      }
    }

    if (screens.game4?.classList.contains('active')) {
      if (simBattleRunning || simBattleFinished) {
        updateSimArenaOverlay(true)
      }
      if (simArenaZoomed) {
        updateSimArenaZoomScale()
      }
    }

    if (screens.game5?.classList.contains('active')) {
      if (rouletteStageZoomed) {
        updateRouletteStageZoomLayout()
      } else {
        renderNavalBoardState()
      }
    }
  }, 120)
})

window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    syncGame1MobileLayout()
    syncRaceMobileLayout()
    syncSimResponsiveLayout()
    syncPhysicalCarousel({ align: screens.physical?.classList.contains('active') })
    updateOrientationGate()

    if (screens.game1?.classList.contains('active')) {
      fitGameCanvasViewport()

      if (engine && currentSlots.length) {
        buildBoard()
      }
    }

    if (screens.game2?.classList.contains('active') && raceHorses.length) {
      renderRacePreview()
      if (raceTrackZoomed) {
        updateRaceTrackZoomLayout()
      }
    }

    if (screens.game4?.classList.contains('active')) {
      if (simBattleRunning || simBattleFinished) {
        updateSimArenaOverlay(true)
      }
      if (simArenaZoomed) {
        updateSimArenaZoomScale()
      }
    }

    if (screens.game5?.classList.contains('active')) {
      if (rouletteStageZoomed) {
        updateRouletteStageZoomLayout()
      } else {
        renderNavalBoardState()
      }
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

if (luckGameGrid) {
  luckGameGrid.addEventListener('scroll', handleLuckCarouselScroll, { passive: true })
}

if (physicalGameGrid) {
  physicalGameGrid.addEventListener('scroll', handlePhysicalCarouselScroll, { passive: true })
}

window.addEventListener('popstate', (event) => {
  const state = event.state

  if (state?.appId !== APP_HISTORY_ID || !screens[state.screen]) {
    return
  }

  currentHistoryIndex = Number.isFinite(state.index) ? state.index : 0
  showScreen(state.screen, { historyMode: 'skip' })
})



let customCursorEl = null
let customCursorRaf = null
let customCursorX = 0
let customCursorY = 0
let customCursorHoverState = ''

function canUseCustomCursor() {
  return window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(pointer: coarse)').matches
}

function updateCustomCursorPosition(x, y) {
  if (!customCursorEl) return
  customCursorX = x
  customCursorY = y

  if (customCursorRaf) return

  customCursorRaf = requestAnimationFrame(() => {
    customCursorRaf = null
    if (!customCursorEl) return
    customCursorEl.style.setProperty('--cursor-x', `${customCursorX}px`)
    customCursorEl.style.setProperty('--cursor-y', `${customCursorY}px`)
  })
}

function syncCustomCursorState(target) {
  if (!customCursorEl) return

  const element = target instanceof Element ? target : null
  const interactive = element?.closest('button, a, input, textarea, select, summary, label, [role="button"], .game-item, .luck-carousel-dot, .physical-carousel-dot, .utility-btn, .action-btn, .back-btn, .popup-btn, .sim-info-btn, .sim-arena-zoom-btn')
  const textEditable = element?.closest('input:not([type="button"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable="true"]')
  const nextState = `${Boolean(interactive)}:${Boolean(textEditable)}`

  if (customCursorHoverState === nextState) return
  customCursorHoverState = nextState

  customCursorEl.classList.toggle('is-hover', Boolean(interactive))
  customCursorEl.classList.toggle('is-text', Boolean(textEditable))
}

function initCustomCursor() {
  if (!canUseCustomCursor() || document.getElementById('appCursor')) return

  customCursorEl = document.createElement('div')
  customCursorEl.id = 'appCursor'
  customCursorEl.className = 'app-cursor'
  customCursorEl.setAttribute('aria-hidden', 'true')
  document.body.appendChild(customCursorEl)

  document.addEventListener('pointermove', (event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return
    if (!customCursorEl) return
    customCursorEl.classList.add('is-visible')
    updateCustomCursorPosition(event.clientX, event.clientY)
    syncCustomCursorState(event.target)
  }, true)

  document.addEventListener('pointerdown', (event) => {
    if (!customCursorEl) return
    if (event.pointerType && event.pointerType !== 'mouse') return
    customCursorEl.classList.add('is-press')
    syncCustomCursorState(event.target)
  }, true)

  document.addEventListener('pointerup', () => {
    customCursorEl?.classList.remove('is-press')
  }, true)

  document.addEventListener('pointerout', (event) => {
    if (!event.relatedTarget) {
      customCursorHoverState = ''
      customCursorEl?.classList.remove('is-visible', 'is-hover', 'is-press', 'is-text')
    }
  }, true)

  window.addEventListener('blur', () => {
    customCursorHoverState = ''
    customCursorEl?.classList.remove('is-visible', 'is-hover', 'is-press', 'is-text')
  })
}

applyThemePreference(getSavedThemePreference(), { persist: false })
updateFullscreenToggleButton()
updatePrevStepButtons()

updateGame1BallCountText()
decorateLuckGameFastForwardBadges()
syncGame1MobileLayout()
syncRaceMobileLayout()
syncSimResponsiveLayout()
syncLuckCarousel()
syncPhysicalCarousel()
updateRaceTrackZoomButton()
updateSimArenaZoomButton()
updateRouletteStageZoomButton()
updateOrientationGate()
initCustomCursor()

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

if (navalConfigInput) {
  updateNavalFromInput({ render: false })
  renderNavalBoardBase()
  renderNavalBoardState()
  renderNavalLogs()
  renderNavalRanking()
}

if (stockDurationInput) {
  stockDurationSeconds = clampStockDuration(stockDurationInput.value)
  stockDurationInput.value = String(stockDurationSeconds)
  updateStockDurationText()
}

if (stockConfigInput) {
  updateStockFromInput({ render: false, preserveDrafts: true })
  renderStockGame()
}

if (ladderConfigInput) {
  updateLadderFromInput({ render: false })
  renderLadderGame()
}

if (balloonConfigInput) {
  updateBalloonFromInput({ render: false })
  renderBalloonGame()
}

if (screens.home) {
  currentScreenKey = getActiveScreenKey()
  showScreen('home', { historyMode: 'replace' })
}


function updateStockDurationSliderVisual() {
  if (!stockDurationInput) return

  const min = Number(stockDurationInput.min || 0)
  const max = Number(stockDurationInput.max || 100)
  const value = Number(stockDurationInput.value || min)
  const percent = max > min ? ((value - min) / (max - min)) * 100 : 0

  stockDurationInput.style.setProperty('--stock-duration-progress', `${percent}%`)
}

if (stockDurationInput) {
  const syncStockDurationSliderVisual = () => updateStockDurationSliderVisual()
  stockDurationInput.addEventListener('input', syncStockDurationSliderVisual)
  stockDurationInput.addEventListener('change', syncStockDurationSliderVisual)
  updateStockDurationSliderVisual()
}
