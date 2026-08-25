/* generated from script.js · core.js */
const APP_PERFORMANCE_PROFILE = (() => {
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const touchCapable = coarsePointer || navigator.maxTouchPoints > 0
  const shortSide = Math.min(window.innerWidth, window.innerHeight)
  const isMobile = touchCapable && shortSide <= 1100
  const memory = Number(navigator.deviceMemory || 0)
  const cpuThreads = Number(navigator.hardwareConcurrency || 0)
  const saveData = Boolean(navigator.connection?.saveData)
  const lowMemory = memory > 0 && memory <= 4
  const lowCpu = cpuThreads > 0 && cpuThreads <= 8
  const isLowEndDesktop = !isMobile && (saveData || lowMemory || lowCpu)
  const constrained = isMobile || isLowEndDesktop || saveData

  return Object.freeze({
    tier: isMobile ? 'mobile' : isLowEndDesktop ? 'low' : 'standard',
    isMobile,
    isLowEndDesktop,
    constrained,
    canvasPixelRatio: isMobile ? (shortSide <= 430 ? 0.8 : 0.9) : isLowEndDesktop ? 1 : 1.25,
    // 게임 판정은 모든 기기에서 같은 고정 시간축을 사용한다. 성능 차이는 렌더링에만 적용한다.
    physicsHz: 50,
    animationFrameInterval: isMobile ? 1000 / 30 : isLowEndDesktop ? 1000 / 40 : 1000 / 60,
    countRefreshInterval: isMobile ? 200 : isLowEndDesktop ? 120 : 80,
    stockTickInterval: isMobile ? 500 : isLowEndDesktop ? 400 : 250
  })
})()

document.documentElement.classList.add(`perf-${APP_PERFORMANCE_PROFILE.tier}`)
if (APP_PERFORMANCE_PROFILE.constrained) {
  document.documentElement.classList.add('perf-constrained')
}

const screens = {
  home: document.getElementById('homeScreen'),
  menu: document.getElementById('menuScreen'),
  wheel: document.getElementById('wheelScreen'),
  physical: document.getElementById('physicalScreen'),
  physicalBalloon: document.getElementById('physicalBalloonScreen'),
  physicalBomb: document.getElementById('physicalBombScreen'),
  physicalCircle: document.getElementById('physicalCircleScreen'),
  physicalKeyReact: document.getElementById('physicalKeyReactScreen'),
  physicalBearFind: document.getElementById('physicalBearFindScreen'),
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
const gameLaunchButtons = document.querySelectorAll('.game-launch')
const comingSoonButtons = document.querySelectorAll('.game-coming-soon')
const luckGameGrid = document.getElementById('luckGameGrid')
const luckCarouselHud = document.getElementById('luckCarouselHud')
const luckCarouselDots = document.getElementById('luckCarouselDots')
const luckCarouselCounter = document.getElementById('luckCarouselCounter')
const physicalGameGrid = document.getElementById('physicalGameGrid')
const physicalCarouselHud = document.getElementById('physicalCarouselHud')
const physicalCarouselDots = document.getElementById('physicalCarouselDots')
const physicalGameLaunchButtons = document.querySelectorAll('.physical-game-launch')


const EMOJI_FALLBACK_MAP = Object.freeze({
  '🎀': ['✦', '*'],
  '✨': ['✦', '*'],
  '💪': ['◆', 'PLAY'],
  '🍀': ['♣', 'LUCK'],
  '🎲': ['◆', 'RND'],
  '🫙': ['▽', 'DROP'],
  '🏇': ['♞', 'RACE'],
  '🃏': ['♠', 'CARD'],
  '🔵': ['●', 'BALL'],
  '🔫': ['⌖', 'SHOT'],
  '📈': ['↗', 'UP'],
  '🪜': ['↕', 'LADDER'],
  '📱': ['▯', 'MOBILE'],
  '💻': ['PC'],
  '🖥️': ['▣', 'PC'],
  '🖥': ['▣', 'PC'],
  '🎈': ['○', 'BALLOON'],
  '💣': ['●', 'BOMB'],
  '⭕': ['○', 'CIRCLE'],
  '⌨️': ['KEY'],
  '⌨': ['KEY'],
  '🧸': ['BEAR'],
  '🎁': ['□', 'BOX'],
  '💥': ['✹', 'BOOM'],
  '⚔️': ['⚔', 'VS'],
  '⚔': ['VS'],
  '🛠️': ['🛠', 'FIX'],
  '🛠': ['FIX'],
  '⚙': ['SET'],
  '⚠️': ['⚠', '!'],
  '⚠': ['!'],
  '🌙': ['☾', 'NIGHT'],
  '☀️': ['☼', 'DAY'],
  '☀': ['DAY'],
  '🔊': ['♪', 'ON'],
  '🔇': ['×', 'OFF'],
  '⛶': ['□', 'FULL'],
  '🫧': ['○', 'BUBBLE'],
  '🏆': ['★', 'WIN'],
  '👑': ['♛', '1st'],
  '💀': ['☠', 'OUT'],
  '☠': ['X'],
  '😨': ['!', '!!'],
  '🙂': [':)'],
  '👥': ['2P', 'PEOPLE'],
  '🎡': ['↻', 'SPIN'],
  '🎬': ['▶', 'REC'],
  '🐎': ['♞', 'HORSE'],
  '🐴': ['♞', 'HORSE'],
  '🐼': ['BEAR'],
  '👀': ['SEE'],
  '👆': ['TAP'],
  '💄': ['MAKEUP'],
  '📖': ['INFO'],
  '📝': ['NOTE'],
  '🗗': ['□', 'ZOOM'],
  '🗺️': ['MAP'],
  '🗺': ['MAP'],
  '🧮': ['CALC'],
  '🛡️': ['◇', 'DEF'],
  '🛡': ['DEF'],
  '🩺': ['♥', 'HP'],
  '🪙': ['●', 'COIN'],
  '🎆': ['✦', 'FIRE'],
  '🎯': ['⌖', 'HIT'],
  '🍞': ['BREAD'],
  '⬆️': ['↑', 'UP'],
  '⬆': ['↑', 'UP'],
  '★': ['*'],
  '✦': ['*'],
  '✧': ['*'],
  '❤': ['♥', 'HEART'],
  '♥': ['HEART'],
  '❤️': ['♥', 'HEART'],
  '⏩': ['>>'],
  '↩': ['<'],
  '←': ['<'],
  '→': ['>'],
  '↑': ['^'],
  '↓': ['v'],
  '▼': ['v'],
  '−': ['-'],
  '□': ['[]']
})

const EMOJI_FALLBACK_PATTERN = new RegExp(
  Object.keys(EMOJI_FALLBACK_MAP)
    .sort((a, b) => b.length - a.length)
    .map((emoji) => emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|'),
  'g'
)

const EMOJI_SCAN_PATTERN = /(?:[\u{1F000}-\u{1FAFF}]|[\u2190-\u27BF])\uFE0F?(?:\u200D(?:[\u{1F000}-\u{1FAFF}]|[\u2190-\u27BF])\uFE0F?)*/gu

// 비교적 최근 추가되어 OS별 누락이 잦은 문자는 보수적 환경에서 안전 기호로 선교체한다.
const EMOJI_RISKY_FALLBACK_SET = new Set(['🫙', '🪜', '🪙', '🫧', '🗗', '🛡️', '🩺'])

const emojiSupportCache = new Map()
let emojiFallbackObserver = null
let emojiFallbackQueued = false
let emojiFallbackChecking = false

function resetEmojiRegexes() {
  EMOJI_FALLBACK_PATTERN.lastIndex = 0
  EMOJI_SCAN_PATTERN.lastIndex = 0
}

function containsScannableEmoji(text) {
  if (!text) return false
  EMOJI_SCAN_PATTERN.lastIndex = 0
  const result = EMOJI_SCAN_PATTERN.test(text)
  EMOJI_SCAN_PATTERN.lastIndex = 0
  return result
}

function isConservativeEmojiFallbackEnvironment() {
  const userAgent = String(navigator.userAgent || '').toLowerCase()
  const isWindows = userAgent.includes('windows')
  const isAndroid = userAgent.includes('android')
  const isLinuxDesktop = userAgent.includes('linux') && !isAndroid
  const isOldWebView = /version\/\d+\.\d+.*chrome\//.test(userAgent) || userAgent.includes('; wv)') || userAgent.includes(' wv')

  return isWindows || isAndroid || isLinuxDesktop || isOldWebView
}

function shouldUseRiskFallbackForEmoji(emoji) {
  return EMOJI_RISKY_FALLBACK_SET.has(emoji) && isConservativeEmojiFallbackEnvironment()
}

function getFallbackCandidates(emoji) {
  const customFallback = EMOJI_FALLBACK_MAP[emoji]

  if (Array.isArray(customFallback)) {
    return customFallback
  }

  if (typeof customFallback === 'string') {
    return [customFallback]
  }

  return ['*']
}

function isReplacementLikelySupported(text) {
  if (!text || !containsScannableEmoji(text)) return true

  EMOJI_SCAN_PATTERN.lastIndex = 0
  const matches = Array.from(text.matchAll(EMOJI_SCAN_PATTERN), (match) => match[0])
  EMOJI_SCAN_PATTERN.lastIndex = 0

  return matches.every((emoji) => isEmojiLikelySupported(emoji) && !shouldUseRiskFallbackForEmoji(emoji))
}

function isEmojiLikelySupported(emoji) {
  if (!emoji) return true
  if (globalThis.__RANDOM_ROULETTE_FORCE_EMOJI_FALLBACK__ === true) return false
  if (emojiSupportCache.has(emoji)) return emojiSupportCache.get(emoji)

  let supported = false

  try {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d', { willReadFrequently: true })

    if (context) {
      const size = 64
      canvas.width = size * 2
      canvas.height = size
      context.textBaseline = 'top'
      context.font = '44px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla", "Segoe UI Symbol", sans-serif'

      const captureGlyph = (text) => {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.fillText(text, 4, 4)
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
        let ink = 0
        let hash = 2166136261
        for (let index = 0; index < pixels.length; index += 4) {
          const alpha = pixels[index + 3]
          if (alpha > 0) ink += 1
          hash ^= pixels[index] + pixels[index + 1] * 3 + pixels[index + 2] * 5 + alpha * 7
          hash = Math.imul(hash, 16777619)
        }
        return { width: context.measureText(text).width, ink, hash: hash >>> 0 }
      }

      const emojiSignature = captureGlyph(emoji)
      // 글꼴마다 두부 모양이 달라 □만 비교하면 오판한다. 실제 미할당 코드포인트도 함께 비교한다.
      const missingSignatures = ['\uFFFF', '\u{10FFFF}', '\uE000', '�'].map(captureGlyph)
      const matchesMissingGlyph = missingSignatures.some((signature) => (
        Math.abs(emojiSignature.width - signature.width) <= 0.5 &&
        emojiSignature.ink === signature.ink &&
        emojiSignature.hash === signature.hash
      ))
      supported = emojiSignature.ink > 24 && !matchesMissingGlyph
    }
  } catch (error) {
    // 검사가 막힌 환경은 빈 문자를 남기지 않도록 안전 대체를 택한다.
    supported = false
  }

  emojiSupportCache.set(emoji, supported)
  return supported
}

function getSafeEmojiText(emoji) {
  const shouldReplace = !isEmojiLikelySupported(emoji) || shouldUseRiskFallbackForEmoji(emoji)
  if (!shouldReplace) return emoji

  const candidates = getFallbackCandidates(emoji)
  for (const candidate of candidates) {
    if (candidate === emoji) continue
    if (isReplacementLikelySupported(candidate)) return candidate
  }

  return candidates[candidates.length - 1] || '*'
}

function replaceUnsupportedEmojiText(text) {
  if (!text || !containsScannableEmoji(text)) {
    resetEmojiRegexes()
    return text
  }

  EMOJI_SCAN_PATTERN.lastIndex = 0
  const nextText = text.replace(EMOJI_SCAN_PATTERN, (emoji) => getSafeEmojiText(emoji))
  resetEmojiRegexes()
  return nextText
}

function normalizeUnsupportedEmojis(root = document.body) {
  if (!root || emojiFallbackChecking) return

  emojiFallbackChecking = true
  if (emojiFallbackObserver) emojiFallbackObserver.disconnect()

  try {
    const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement
        if (!parent) return NodeFilter.FILTER_REJECT
        if (parent.closest('script, style, textarea, input')) return NodeFilter.FILTER_REJECT
        if (!node.nodeValue || !containsScannableEmoji(node.nodeValue)) {
          resetEmojiRegexes()
          return NodeFilter.FILTER_REJECT
        }
        resetEmojiRegexes()
        return NodeFilter.FILTER_ACCEPT
      }
    })

    const textNodes = []
    while (treeWalker.nextNode()) {
      textNodes.push(treeWalker.currentNode)
    }

    textNodes.forEach((node) => {
      const nextValue = replaceUnsupportedEmojiText(node.nodeValue)
      if (nextValue !== node.nodeValue) {
        node.nodeValue = nextValue
      }
    })

    const attrTargets = root.nodeType === Node.ELEMENT_NODE
      ? [root, ...root.querySelectorAll('[aria-label], [title], [alt]')]
      : Array.from(document.querySelectorAll('[aria-label], [title], [alt]'))

    attrTargets.forEach((element) => {
      ;['aria-label', 'title', 'alt'].forEach((attr) => {
        if (!element.hasAttribute?.(attr)) return
        const value = element.getAttribute(attr)
        const nextValue = replaceUnsupportedEmojiText(value)
        if (nextValue !== value) {
          element.setAttribute(attr, nextValue)
        }
      })
    })
  } finally {
    emojiFallbackChecking = false
    if (emojiFallbackObserver) {
      emojiFallbackObserver.observe(document.body, {
        childList: true,
        characterData: true,
        attributes: true,
        subtree: true,
        attributeFilter: ['aria-label', 'title', 'alt']
      })
    }
  }
}

function scheduleUnsupportedEmojiNormalization(root = document.body) {
  if (emojiFallbackQueued) return
  emojiFallbackQueued = true
  const run = () => {
    emojiFallbackQueued = false
    normalizeUnsupportedEmojis(root)
  }

  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(run)
  } else {
    setTimeout(run, 0)
  }
}

function installEmojiFallbacks() {
  if (typeof MutationObserver === 'function' && !emojiFallbackObserver) {
    emojiFallbackObserver = new MutationObserver((mutations) => {
      const changedRoot = mutations.find((mutation) => mutation.target instanceof Element)?.target || document.body
      scheduleUnsupportedEmojiNormalization(changedRoot)
    })
    emojiFallbackObserver.observe(document.body, {
      childList: true,
      characterData: true,
      attributes: true,
      subtree: true,
      attributeFilter: ['aria-label', 'title', 'alt']
    })
  }

  const runInitialCheck = () => normalizeUnsupportedEmojis(document.body)
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(runInitialCheck)
  } else {
    setTimeout(runInitialCheck, 0)
  }
}

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

const bearFindCountInput = document.getElementById('bearFindCountInput')
const startBearFindBtn = document.getElementById('startBearFindBtn')
const resetBearFindBtn = document.getElementById('resetBearFindBtn')
const bearFindStatusText = document.getElementById('bearFindStatusText')
const bearFindTotalInfo = document.getElementById('bearFindTotalInfo')
const bearFindPlayerList = document.getElementById('bearFindPlayerList')
const bearFindPhaseBadge = document.getElementById('bearFindPhaseBadge')
const bearFindStageButton = document.getElementById('bearFindStageButton')
const bearFindPoster = document.getElementById('bearFindPoster')
const bearFindVideo = document.getElementById('bearFindVideo')
const bearFindStillFrame = document.getElementById('bearFindStillFrame')
const bearFindColorMatchProbe = document.getElementById('bearFindColorMatchProbe')
const bearFindColorMatchR = document.getElementById('bearFindColorMatchR')
const bearFindColorMatchG = document.getElementById('bearFindColorMatchG')
const bearFindColorMatchB = document.getElementById('bearFindColorMatchB')
const bearFindStageHint = document.getElementById('bearFindStageHint')
const bearFindCurrentLabel = document.getElementById('bearFindCurrentLabel')
const bearFindTouchBlocker = document.getElementById('bearFindTouchBlocker')

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
const audioToggleBtn = document.getElementById('audioToggleBtn')
const audioToggleIcon = audioToggleBtn?.querySelector('.utility-btn-icon') || null
const audioToggleLabel = audioToggleBtn?.querySelector('.utility-btn-label') || null
const bgmVolumeRange = document.getElementById('bgmVolumeRange')
const sfxVolumeRange = document.getElementById('sfxVolumeRange')
const bgmVolumeValue = document.getElementById('bgmVolumeValue')
const sfxVolumeValue = document.getElementById('sfxVolumeValue')
const desktopPrevStepBtn = document.getElementById('desktopPrevStepBtn')
const mobilePrevStepBtn = document.getElementById('mobilePrevStepBtn')

const THEME_STORAGE_KEY = 'roulette-theme-preference'
const HORROR_BGM_SESSION_KEY = 'roulette-horror-bgm-easter-egg'
const HELL_MODE_CLASS = 'hell-mode'
const HORROR_BGM_TAP_WINDOW_MS = 10000
const HORROR_BGM_TAP_THRESHOLD = 6
const HELL_MODE_MIN_BGM_VOLUME = 0.68
const HELL_MODE_MIN_SFX_VOLUME = 0.92

document.body.classList.toggle('home-screen-mode', screens.home?.classList.contains('active'))
document.body.classList.toggle('menu-screen-mode', screens.menu?.classList.contains('active'))
document.body.classList.toggle('physical-screen-mode', screens.physical?.classList.contains('active'))
document.body.classList.toggle('luck-screen-mode', screens.luck?.classList.contains('active'))
const AUDIO_STORAGE_KEY = 'roulette-audio-preference'
const BGM_VOLUME_STORAGE_KEY = 'roulette-bgm-volume'
const SFX_VOLUME_STORAGE_KEY = 'roulette-sfx-volume'
const AUDIO_MASTER_GAIN_VALUE = 1.68
const AUDIO_DEFAULT_BGM_VOLUME = 0.44
const AUDIO_DEFAULT_SFX_VOLUME = 0.9

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
const simControlsWrap = document.querySelector('#game4Screen .controls-wrap')
const simButtonRow = document.querySelector('#game4Screen .controls-wrap .button-row')
const simScoreboardCard = document.querySelector('#game4Screen .scoreboard-card')
const simSetupCard = document.querySelector('#game4Screen .sim-setup-card')
const simArenaCard = document.querySelector('#game4Screen .sim-arena-card')
const simBattleSummaryCard = document.querySelector('#game4Screen .sim-battle-summary-card')
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


const matterApi = window.Matter || {}
const {
  Engine,
  Render,
  Runner,
  Bodies,
  Body,
  Composite,
  World,
  Events
} = matterApi

function canUseMatterPhysics() {
  return Boolean(window.Matter && Engine && Render && Runner && Bodies && Body && Composite && World && Events)
}

function showMatterUnavailablePopup() {
  showPopup(
    '물리 엔진 로드 실패',
    '이 게임은 Matter.js 물리 엔진이 필요해. 네트워크가 막혀 있거나 CDN을 불러오지 못하면 담아라!와 볼 배틀은 실행할 수 없어. 인터넷 연결을 확인하거나 Matter.js를 로컬 파일로 포함해야 해.',
    { icon: '⚠️' }
  )
}

const MAX_SLOT_COUNT = 20
const BOMB_COUNT = 20
const SPAWN_INTERVAL_MS = 27
const BOARD_SIDE_PADDING = 18

const BASE_BOARD_WIDTH = 1366
const BASE_BOARD_HEIGHT = 768
const MAX_CANVAS_PIXEL_RATIO = APP_PERFORMANCE_PROFILE.canvasPixelRatio

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
let bombPassFuseTimer = null
let bombPassStartedAt = 0
let bombPassDuration = 0

const CIRCLE_TAP_MIN_PLAYERS = 2
const CIRCLE_TAP_MAX_PLAYERS = 8
const CIRCLE_TAP_START_RADIUS = 142
const CIRCLE_TAP_MIN_RADIUS = 3
const CIRCLE_TAP_SHRINK_MIN = 0.055
const CIRCLE_TAP_SHRINK_MAX = 0.095
const CIRCLE_TAP_EDGE_PADDING = 12
const CIRCLE_TAP_MIN_RANDOM_MOVE_RATIO = 0.18

let circleTapPlayers = []
let circleTapStarted = false
let circleTapFinished = false
let circleTapCurrentIndex = 0
let circleTapRadius = CIRCLE_TAP_START_RADIUS
let circleTapSuccessCount = 0
let circleTapTargetX = 50
let circleTapTargetY = 50
let circleTapLastValidConfigText = circleTapConfigInput ? circleTapConfigInput.value : ''
let circleTapLastAppliedRawText = circleTapConfigInput ? circleTapConfigInput.value : ''

const KEY_REACT_MIN_PLAYERS = 2
const KEY_REACT_MAX_PLAYERS = 4
const KEY_REACT_DEFAULT_KEYS = ['A', 'S', 'K', 'L']
const KEY_REACT_COUNTDOWN_SECONDS = 5
const KEY_REACT_STAY_MIN_MS = 1400
const KEY_REACT_STAY_MAX_MS = 4200

let keyReactPlayers = []
let keyReactPhase = 'idle'
let keyReactTimer = null
let keyReactClickStartedAt = 0
let keyReactResults = []
let keyReactCountdownLeft = 0
let keyReactCountdownTimer = null
let keyReactRoundToken = 0
let keyReactCapturePlayerId = ''
let keyReactLastValidConfigText = keyReactConfigInput ? keyReactConfigInput.value : ''
let keyReactLastAppliedRawText = keyReactConfigInput ? keyReactConfigInput.value : ''

const BEAR_FIND_MIN_PLAYERS = 2
const BEAR_FIND_MAX_PLAYERS = 20
const BEAR_FIND_POSTER_SRC = 'assets/bear-find-start.webp'
const BEAR_FIND_BEAR_VIDEO_SRC = 'assets/bear-find-bear.mp4'
const BEAR_FIND_PANDA_VIDEO_SRC = 'assets/bear-find-panda.mp4'
const BEAR_FIND_BEAR_MOBILE_VIDEO_SRC = 'assets/bear-find-bear-mobile.mp4'
const BEAR_FIND_PANDA_MOBILE_VIDEO_SRC = 'assets/bear-find-panda-mobile.mp4'

const PHONE_PASS_TURN_COUNT = 8

function isPhonePassPhysicalMode() {
  return isTouchDevice() && getViewportShortSide() <= 820
}

function createPhonePassPlayers(prefix, count = PHONE_PASS_TURN_COUNT) {
  const palette = getCommonPlayerPaletteByTheme()
  const sharedNames = window.RandomRouletteRoster?.getNames?.() || []
  const fallbackNames = ['분홍', '민트', '하늘', '노랑', '보라', '주황', '초록', '라벤더']
  const playerNames = sharedNames.length >= 2 ? sharedNames : fallbackNames.slice(0, count)

  return Array.from({ length: playerNames.length }, (_, index) => ({
    id: `${prefix}-pass-${index + 1}`,
    label: playerNames[index],
    color: palette[index % palette.length] || '#ff82ad',
    isPhonePassVirtual: true
  }))
}

function setGameStartButtonRunningState(button, isRunning, options = {}) {
  if (!button) return

  const running = Boolean(isRunning)
  const { busyText = '진행 중', restoreText = true } = options

  if (!button.dataset.defaultStartText) {
    button.dataset.defaultStartText = button.textContent || '시작'
  }

  button.disabled = running
  button.classList.toggle('is-game-running', running)
  button.setAttribute('aria-pressed', running ? 'true' : 'false')
  button.setAttribute('aria-disabled', running ? 'true' : 'false')

  if (restoreText) {
    button.textContent = running ? busyText : button.dataset.defaultStartText
  }

  if (running) {
    button.title = '게임 진행 중에는 다시 시작할 수 없습니다.'
  } else {
    button.removeAttribute('title')
  }
}

function setPhysicalStartButtonRunningState(button, isRunning) {
  setGameStartButtonRunningState(button, isRunning, { busyText: '진행 중' })
}

function isKeyReactRunning() {
  return keyReactPhase === 'countdown' || keyReactPhase === 'stay' || keyReactPhase === 'click'
}

function updateAllGameStartButtonRunningStates() {
  setGameStartButtonRunningState(startGameBtn, typeof hasLiveRound === 'function' && hasLiveRound(), { busyText: '진행 중' })
  setGameStartButtonRunningState(startRaceBtn, raceRunning && !raceFinished, { busyText: '진행 중' })
  setGameStartButtonRunningState(startBattleBtn, battleGameRunning, { busyText: '진행 중' })
  setGameStartButtonRunningState(startSimSetupBtn, simSetupRunning, { busyText: '진행 중' })
  if (startSimBattleBtn && !simBattleRunning && (!simSetupDone || !simRoundPlayers.length)) {
    startSimBattleBtn.disabled = true
    startSimBattleBtn.classList.remove('is-game-running')
    startSimBattleBtn.setAttribute('aria-disabled', 'true')
    startSimBattleBtn.setAttribute('aria-pressed', 'false')
    if (startSimBattleBtn.dataset.defaultStartText) {
      startSimBattleBtn.textContent = startSimBattleBtn.dataset.defaultStartText
    }
    startSimBattleBtn.title = '스탯 공개가 끝난 뒤 전투를 시작할 수 있습니다.'
  } else {
    setGameStartButtonRunningState(startSimBattleBtn, simBattleRunning, { busyText: '전투 중' })
  }
  setGameStartButtonRunningState(startNavalBtn, navalRunning && !navalFinished, { busyText: '진행 중' })
  setGameStartButtonRunningState(startStockBtn, stockGameRunning, { busyText: '진행 중' })
  setGameStartButtonRunningState(startLadderBtn, ladderAutoRunning || (ladderGameStarted && !ladderRevealed), { busyText: '진행 중' })
  setGameStartButtonRunningState(startBalloonBtn, balloonGameStarted && !balloonPopped, { busyText: '진행 중' })
  setGameStartButtonRunningState(startBombPassBtn, bombPassRunning, { busyText: '진행 중' })
  setGameStartButtonRunningState(startCircleTapBtn, circleTapStarted && !circleTapFinished, { busyText: '진행 중' })
  setGameStartButtonRunningState(startKeyReactBtn, isKeyReactRunning(), { busyText: '진행 중' })
  setGameStartButtonRunningState(startBearFindBtn, bearFindStarted && !bearFindFinished, { busyText: '진행 중' })
}

function scheduleGameStartButtonStateSync() {
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(updateAllGameStartButtonRunningStates)
  } else {
    setTimeout(updateAllGameStartButtonRunningStates, 0)
  }
}

function isUsingBalloonPhonePassMode() {
  return isPhonePassPhysicalMode()
}

function isUsingCircleTapPhonePassMode() {
  return canPlayCircleTapOnThisDevice()
}

function ensureBalloonPhonePassPlayers() {
  if (!isUsingBalloonPhonePassMode()) return false
  if (!balloonGameStarted || !balloonPlayers.length || !balloonPlayers.every((player) => player.isPhonePassVirtual)) {
    balloonPlayers = createPhonePassPlayers('balloon')
  }
  return true
}

function ensureCircleTapPhonePassPlayers() {
  if (!isUsingCircleTapPhonePassMode()) return false
  if (!circleTapStarted || !circleTapPlayers.length || !circleTapPlayers.every((player) => player.isPhonePassVirtual)) {
    circleTapPlayers = createPhonePassPlayers('circle-tap')
  }
  return true
}

let bearFindPlayerCount = bearFindCountInput ? Number(bearFindCountInput.value) || 4 : 4
let bearFindCurrentIndex = 0
let bearFindWinningIndex = -1
let bearFindStarted = false
let bearFindLocked = false
let bearFindFinished = false
let bearFindResults = []
let bearFindCurrentOutcome = ''
let bearFindVideoVisible = false
let bearFindStillFrameVisible = false
let bearFindPendingPlayToken = 0
let bearFindColorMatchTimer = null
let bearFindLastColorMatchKey = ''

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
  if (slotCount <= 5) return 220
  if (slotCount <= 10) return 180
  if (slotCount <= 15) return 150
  return 120
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
let game1PhysicsActive = false
let worldBodies = []
let ballBodies = []
let movingBodies = []
let spawnTimers = []
let game1SpawnSessionId = 0
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
  random: { title: '랜덤 게임 뽑기', state: 'none', badgeText: '불가' },
  wheel: { title: '기본 원판 룰렛', state: 'none', badgeText: '불가' },
  1: { title: '담아라!', state: 'blocked', badgeText: '불가' },
  2: { title: '경마', state: 'supported', badgeText: '가능' },
  3: { title: '카드 연산 배틀', state: 'none', badgeText: '불가' },
  4: { title: '볼 배틀', state: 'supported', badgeText: '가능' },
  5: { title: '러시안 룰렛', state: 'supported', badgeText: '가능' },
  6: { title: '주식게임', state: 'none', badgeText: '불가' },
  7: { title: '투명 사다리 타기', state: 'none', badgeText: '불가' },
  balloon: { title: '풍선 불기', state: 'none', badgeText: '불가' },
  'bomb-pass': { title: '폭탄 넘기기', state: 'none', badgeText: '불가' },
  'shrinking-circle': { title: '작아지는 원', state: 'none', badgeText: '불가' },
  'stay-click': { title: 'STAY CLICK', state: 'none', badgeText: '불가' },
  'bear-find': { title: '곰찾기', state: 'none', badgeText: '불가' }
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
const SIM_SUDDEN_DEATH_START_MS = 42000
const SIM_SUDDEN_DEATH_INTERVAL_MS = 2600
const SIM_SUDDEN_DEATH_BASE_DAMAGE = 2
const SIM_SUDDEN_DEATH_MAX_DAMAGE = 8
const SIM_SUDDEN_DEATH_DAMAGE_STEP_EVERY = 3
const SIM_BATTLE_PERFORMANCE = Object.freeze({
  renderFrameGap: APP_PERFORMANCE_PROFILE.constrained ? 30 : 15,
  overlayFrameGap: 1000 / (APP_PERFORMANCE_PROFILE.isMobile ? 20 : APP_PERFORMANCE_PROFILE.isLowEndDesktop ? 25 : 30),
  rankingInterval: APP_PERFORMANCE_PROFILE.isMobile ? 420 : APP_PERFORMANCE_PROFILE.isLowEndDesktop ? 280 : 140,
  effectInterval: APP_PERFORMANCE_PROFILE.isMobile ? 240 : APP_PERFORMANCE_PROFILE.isLowEndDesktop ? 160 : 80,
  statusInterval: APP_PERFORMANCE_PROFILE.isMobile ? 280 : APP_PERFORMANCE_PROFILE.isLowEndDesktop ? 180 : 120,
  maxTransientEffects: APP_PERFORMANCE_PROFILE.isMobile ? 3 : APP_PERFORMANCE_PROFILE.isLowEndDesktop ? 5 : 10,
  showFloatingDamage: !APP_PERFORMANCE_PROFILE.isMobile,
  canvasPixelRatio: APP_PERFORMANCE_PROFILE.isMobile
    ? Math.min(APP_PERFORMANCE_PROFILE.canvasPixelRatio, 0.7)
    : APP_PERFORMANCE_PROFILE.isLowEndDesktop
      ? Math.min(APP_PERFORMANCE_PROFILE.canvasPixelRatio, 0.85)
      : Math.min(APP_PERFORMANCE_PROFILE.canvasPixelRatio, 1.1)
})
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
let simSuddenDeathStarted = false
let simSuddenDeathLastTickAt = 0
let simSuddenDeathTickCount = 0
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
let simRenderRaf = null
let simRenderLastPaintAt = 0
let simOverlayRaf = null
let simOverlayLastPaintAt = 0
let simRankingRenderTimer = null
let simRankingLastRenderAt = 0
let simPendingRanking = null
let simEffectLastAt = new Map()
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


function getFastForwardCardConfig(gameKey) {
  return FAST_FORWARD_CARD_CONFIG[gameKey] || {
    title: `게임 ${gameKey}`,
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
    const gameKey = item.dataset.physicalGame || (item.dataset.game === '8' ? 'random' : item.dataset.game)
    if (!gameKey) return

    const config = getFastForwardCardConfig(gameKey)
    item.dataset.ffGame = String(gameKey)
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

  const gameKey = item.dataset.ffGame || item.dataset.physicalGame || (item.dataset.game === '8' ? 'random' : item.dataset.game)
  if (!gameKey) return
  const guideKey = /^\d+$/.test(gameKey) ? Number(gameKey) : gameKey

  openFastForwardGuide(guideKey)
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}



function getSavedAudioPreference() {
  try {
    const savedAudio = localStorage.getItem(AUDIO_STORAGE_KEY)
    return savedAudio === 'off' ? 'off' : 'on'
  } catch (error) {
    return 'on'
  }
}

function normalizeAudioVolume(value, fallback) {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return fallback
  }

  return Math.min(1, Math.max(0, numericValue))
}

function getSavedVolumePreference(storageKey, fallback) {
  try {
    const savedVolume = localStorage.getItem(storageKey)

    if (savedVolume === null) {
      return fallback
    }

    return normalizeAudioVolume(savedVolume, fallback)
  } catch (error) {
    return fallback
  }
}

function saveVolumePreference(storageKey, value) {
  try {
    localStorage.setItem(storageKey, String(normalizeAudioVolume(value, 0)))
  } catch (error) {}
}

function getSavedHorrorBgmEasterEggPreference() {
  try {
    sessionStorage.removeItem(HORROR_BGM_SESSION_KEY)
  } catch (error) {}
  return false
}

function saveHorrorBgmEasterEggPreference(enabled) {
  // 지옥 모드는 새로고침하면 반드시 풀려야 하므로 저장하지 않는다.
  try {
    sessionStorage.removeItem(HORROR_BGM_SESSION_KEY)
  } catch (error) {}
}

const siteAudio = {
  ctx: null,
  masterGain: null,
  bgmGain: null,
  sfxGain: null,
  outputLimiter: null,
  bgmFilter: null,
  bgmTimer: null,
  bgmProfileKey: '',
  bgmStep: 0,
  bgmVolume: getSavedVolumePreference(BGM_VOLUME_STORAGE_KEY, AUDIO_DEFAULT_BGM_VOLUME),
  sfxVolume: getSavedVolumePreference(SFX_VOLUME_STORAGE_KEY, AUDIO_DEFAULT_SFX_VOLUME),
  enabled: getSavedAudioPreference() !== 'off',
  unlocked: false,
  hoverReadyAt: 0,
  lastHoverTarget: null,
  sfxLastAt: Object.create(null),
  currentSfxMix: 1,
  bgmDuckTimer: null,
  horrorMode: getSavedHorrorBgmEasterEggPreference(),
  horrorThemeToggleTapTimes: [],
  horrorProfileCache: new Map(),
  horrorStingerTimer: null,
  horrorPulseTimer: null,
  horrorVisualGlitchTimer: null,
  horrorTempoState: 'drag',
  horrorTempoChangeAt: 0
}

const SFX_THROTTLE_MS = {
  marbleDrop: 85,
  marbleHit: 70,
  countdown: 120,
  chainExplosion: 90,
  raceHoof: 180,
  raceStumble: 320,
  simImpact: 120,
  simEliminate: 280,
  simDecay: 700,
  rouletteSpin: 160,
  rouletteEmpty: 120,
  stockTick: 220,
  stockUp: 300,
  stockDown: 300,
  ladderStep: 140,
  balloonInflate: 95,
  bombFuse: 180,
  circleHit: 70,
  keyHit: 80,
  bear: 280
}


const SFX_MIX_LEVELS = {
  hover: 0.62,
  tap: 0.86,
  tick: 0.76,
  screen: 0.88,
  marbleDrop: 0.92,
  marbleHit: 0.76,
  countdown: 0.94,
  chainExplosion: 1.08,
  raceHoof: 0.84,
  raceStumble: 1.02,
  card: 0.82,
  simImpact: 0.92,
  simDecay: 0.96,
  rouletteSpin: 0.88,
  rouletteEmpty: 0.9,
  stockTick: 0.78,
  stockUp: 0.94,
  stockDown: 0.92,
  ladderStep: 0.82,
  ladderDraw: 0.9,
  balloonInflate: 0.78,
  balloonWarning: 0,
  bombFuse: 0.86,
  bombPassWarning: 1.0,
  circleHit: 0.9,
  stayBeep: 0.9,
  keyHit: 0.96,
  bear: 0.92,
  giftOpen: 1.0,
  rouletteShot: 1.2,
  bombExplosion: 1.18,
  balloonPop: 1.16,
  pandaWin: 1.15,
  result: 1.12
}

const UI_TAP_MOVE_THRESHOLD_PX = 12
const UI_SWIPE_CLICK_SUPPRESS_MS = 450
let uiAudioPointerState = null
let uiAudioSuppressClickUntil = 0

const SFX_DUCKING_PROFILES = {
  result: { level: 0.56, duration: 620 },
  chainExplosion: { level: 0.62, duration: 520 },
  raceFinish: { level: 0.58, duration: 680 },
  battleFinal: { level: 0.55, duration: 720 },
  simWin: { level: 0.50, duration: 760 },
  rouletteShot: { level: 0.44, duration: 720 },
  rouletteFirework: { level: 0.55, duration: 620 },
  rouletteEliminate: { level: 0.54, duration: 620 },
  stockCrash: { level: 0.52, duration: 560 },
  stockFinal: { level: 0.54, duration: 720 },
  ladderWin: { level: 0.56, duration: 720 },
  balloonPop: { level: 0.46, duration: 760 },
  bombExplosion: { level: 0.38, duration: 900 },
  circleMiss: { level: 0.56, duration: 520 },
  falseStart: { level: 0.58, duration: 520 },
  clickSignal: { level: 0.62, duration: 480 },
  pandaWin: { level: 0.52, duration: 780 }
}

const SCREEN_BGM_PROFILES = {
  home: {
    key: 'home',
    interval: 840,
    gain: 0.068,
    wave: 'sine',
    notes: [329.63, 392.0, 493.88, 587.33, 659.25, 493.88],
    chords: [[164.81, 246.94], [196.0, 293.66], [220.0, 329.63], [196.0, 293.66]],
    chordEvery: 4
  },
  menu: {
    key: 'menu',
    interval: 700,
    gain: 0.07,
    wave: 'triangle',
    notes: [261.63, 329.63, 392.0, 523.25, 659.25, 392.0],
    chords: [[130.81, 196.0], [164.81, 246.94], [196.0, 293.66], [164.81, 246.94]],
    chordEvery: 4
  },
  physical: {
    key: 'physical',
    interval: 520,
    gain: 0.066,
    wave: 'triangle',
    notes: [196.0, 246.94, 293.66, 392.0, 293.66, 246.94],
    chords: [[98.0, 196.0], [123.47, 246.94], [146.83, 293.66], [123.47, 246.94]],
    chordEvery: 5
  },
  luck: {
    key: 'luck',
    interval: 560,
    gain: 0.07,
    wave: 'sine',
    notes: [392.0, 493.88, 587.33, 783.99, 659.25, 493.88],
    chords: [[196.0, 293.66], [246.94, 369.99], [293.66, 440.0], [246.94, 369.99]],
    chordEvery: 4
  },
  calmGame: {
    key: 'calmGame',
    interval: 760,
    gain: 0.06,
    wave: 'sine',
    notes: [293.66, 349.23, 440.0, 523.25, 440.0, 349.23],
    chords: [[146.83, 220.0], [174.61, 261.63], [196.0, 293.66], [174.61, 261.63]],
    chordEvery: 4
  },
  suspense: {
    key: 'suspense',
    interval: 900,
    gain: 0.058,
    wave: 'sine',
    notes: [98.0, 103.83, 116.54, 110.0, 87.31, 92.5],
    chords: [[49.0, 98.0], [51.91, 103.83], [43.65, 87.31]],
    chordEvery: 3
  },
  race: {
    key: 'race',
    interval: 420,
    gain: 0.07,
    wave: 'triangle',
    notes: [164.81, 220.0, 246.94, 329.63, 246.94, 220.0, 196.0, 246.94],
    chords: [[82.41, 164.81], [110.0, 220.0], [123.47, 246.94]],
    chordEvery: 6
  },
  stock: {
    key: 'stock',
    interval: 480,
    gain: 0.064,
    wave: 'square',
    notes: [880.0, 987.77, 1174.66, 1046.5, 1318.51, 932.33],
    chords: [[220.0, 440.0], [246.94, 493.88], [196.0, 392.0]],
    chordEvery: 5
  },
  marble: {
    key: 'marble',
    interval: 430,
    gain: 0.065,
    wave: 'triangle',
    notes: [783.99, 659.25, 587.33, 493.88, 659.25, 880.0],
    chords: [[196.0, 293.66], [246.94, 369.99], [293.66, 440.0]],
    chordEvery: 6
  },
  cardBattle: {
    key: 'cardBattle',
    interval: 620,
    gain: 0.064,
    wave: 'triangle',
    notes: [220.0, 261.63, 329.63, 392.0, 329.63, 261.63],
    chords: [[110.0, 164.81], [130.81, 196.0], [164.81, 246.94]],
    chordEvery: 5
  },
  arena: {
    key: 'arena',
    interval: 500,
    gain: 0.06,
    wave: 'sawtooth',
    notes: [98.0, 110.0, 130.81, 164.81, 130.81, 110.0],
    chords: [[49.0, 98.0], [55.0, 110.0], [65.41, 130.81]],
    chordEvery: 4
  },
  ladder: {
    key: 'ladder',
    interval: 620,
    gain: 0.064,
    wave: 'sine',
    notes: [392.0, 493.88, 587.33, 659.25, 783.99, 587.33],
    chords: [[196.0, 293.66], [246.94, 369.99], [293.66, 440.0]],
    chordEvery: 4
  },
  balloon: {
    key: 'balloon',
    interval: 650,
    gain: 0.06,
    wave: 'sine',
    notes: [349.23, 392.0, 440.0, 493.88, 440.0, 392.0],
    chords: [[174.61, 261.63], [196.0, 293.66]],
    chordEvery: 5
  },
  bombPass: {
    key: 'bombPass',
    interval: 720,
    gain: 0.06,
    wave: 'triangle',
    notes: [196.0, 184.99, 174.61, 155.56, 146.83, 138.59],
    chords: [[98.0, 146.83], [92.5, 138.59], [77.78, 116.54]],
    chordEvery: 3
  },
  precision: {
    key: 'precision',
    interval: 460,
    gain: 0.064,
    wave: 'triangle',
    notes: [659.25, 783.99, 987.77, 880.0, 783.99, 659.25],
    chords: [[329.63, 493.88], [392.0, 587.33]],
    chordEvery: 4
  },
  keyReact: {
    key: 'keyReact',
    interval: 380,
    gain: 0.062,
    wave: 'square',
    notes: [440.0, 440.0, 659.25, 440.0, 880.0, 659.25],
    chords: [[110.0, 220.0], [164.81, 329.63]],
    chordEvery: 6
  },
  bearFind: {
    key: 'bearFind',
    interval: 660,
    gain: 0.062,
    wave: 'sine',
    notes: [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25],
    chords: [[261.63, 392.0], [329.63, 493.88]],
    chordEvery: 4
  }
}


function getHorrorBgmProfile(profile) {
  if (!profile) return profile
  if (profile.horror) return profile

  const cacheKey = profile.key || JSON.stringify(profile.notes || [])
  if (siteAudio.horrorProfileCache.has(cacheKey)) {
    return siteAudio.horrorProfileCache.get(cacheKey)
  }

  const baseNotes = Array.isArray(profile.notes) && profile.notes.length
    ? profile.notes
    : [220, 207.65, 196, 174.61, 155.56]

  const wrongIntervals = [0.1875, 0.229, 0.25, 0.265, 0.318, 0.354, 0.414, 0.471, 0.493, 0.532, 0.707, 1.029]
  const horrorNotes = baseNotes.map((note, index) => {
    const interval = wrongIntervals[(index * 5 + baseNotes.length) % wrongIntervals.length]
    const tapeDrag = index % 3 === 0 ? 0.931 : index % 3 === 1 ? 1.071 : 0.982
    return clampValue(note * interval * tapeDrag, 18.5, 520)
  })

  const sourceChords = Array.isArray(profile.chords) && profile.chords.length
    ? profile.chords
    : [[82.41, 116.54], [65.41, 92.5], [55, 77.78]]

  const horrorChords = sourceChords.map((chord, chordIndex) => {
    const seed = Array.isArray(chord) && chord[0] ? chord[0] : 76
    const root = clampValue(seed * (chordIndex % 2 ? 0.22 : 0.28), 18.5, 96)
    const flatSecond = root * 1.033
    const tritone = root * 1.4142
    const rottenFifth = root * 1.486
    const detunedOctave = root * 2.018
    return [root, flatSecond, tritone, rottenFifth, detunedOctave]
      .map((freq, index) => clampValue(freq * (index % 2 ? 0.974 : 1.019), 18.5, 360))
  })

  const horrorProfile = {
    ...profile,
    key: `${profile.key || 'bgm'}:hell-hq`,
    interval: Math.round(clampValue((profile.interval || 780) * 0.82, 240, 820)),
    gain: Math.min((profile.gain || 0.06) * 0.78, 0.058),
    wave: 'sawtooth',
    notes: horrorNotes,
    chords: horrorChords,
    chordEvery: Math.max(2, Math.min(3, profile.chordEvery || 3)),
    horror: true,
    detunePattern: [-211, 97, -144, 263, -318, 41, 188, -89, 376, -251, 129, -33],
    scrapePattern: [118, 147, 193, 271, 333, 419, 666, 880, 1110, 1440],
    tempoPattern: [0.16, 0.42, 1.85, 0.08, 0.72, 2.65, 0.28, 1.18]
  }

  siteAudio.horrorProfileCache.set(cacheKey, horrorProfile)
  return horrorProfile
}

function getActiveBgmProfile(profile) {
  return siteAudio.horrorMode ? getHorrorBgmProfile(profile) : profile
}

function syncBgmFilterForMode() {
  if (!siteAudio.bgmFilter) return

  const ctx = siteAudio.ctx
  const now = ctx?.currentTime || 0
  const isHell = Boolean(siteAudio.horrorMode)
  const targetType = isHell ? 'bandpass' : 'lowpass'
  const targetFrequency = isHell ? 620 : 3400
  const targetQ = isHell ? 7.8 : 0.7

  try {
    siteAudio.bgmFilter.type = targetType
    siteAudio.bgmFilter.frequency.cancelScheduledValues(now)
    siteAudio.bgmFilter.Q.cancelScheduledValues(now)
    siteAudio.bgmFilter.frequency.setTargetAtTime(targetFrequency, now, 0.055)
    siteAudio.bgmFilter.Q.setTargetAtTime(targetQ, now, 0.055)
  } catch (error) {
    siteAudio.bgmFilter.type = targetType
    siteAudio.bgmFilter.frequency.value = targetFrequency
    siteAudio.bgmFilter.Q.value = targetQ
  }
}

function playHorrorBgmUnlockCue() {
  if (!siteAudio.enabled) return
  const ctx = ensureAudioContext()
  if (!ctx) return

  const output = siteAudio.sfxGain || siteAudio.bgmGain
  playTone(46.25, { duration: 2.4, gain: 0.095, type: 'sawtooth', destination: output, detune: -280, slideTo: 24.5, attack: 0.04, release: 2.25 })
  playTone(92.5, { duration: 1.9, gain: 0.082, type: 'square', destination: output, delay: 0.015, detune: 193, slideTo: 41.2, attack: 0.02, release: 1.75 })
  playTone(277.18, { duration: 1.65, gain: 0.052, type: 'sawtooth', destination: output, delay: 0.07, detune: -340, slideTo: 88, attack: 0.014, release: 1.48 })
  playNoise({ duration: 1.7, gain: 0.09, delay: 0.03, filterFreq: 430, filterType: 'bandpass', filterQ: 16, destination: output })
  playNoise({ duration: 0.42, gain: 0.07, delay: 0.44, filterFreq: 3200, filterType: 'highpass', filterQ: 0.8, destination: output })
  playHellModeStinger({ immediate: true, violent: true })
}

function forceHellModeAudioLock(options = {}) {
  if (!siteAudio.horrorMode) return

  const { restart = false } = options
  siteAudio.enabled = true
  siteAudio.bgmVolume = Math.max(siteAudio.bgmVolume, HELL_MODE_MIN_BGM_VOLUME)
  siteAudio.sfxVolume = Math.max(siteAudio.sfxVolume, HELL_MODE_MIN_SFX_VOLUME)

  try {
    localStorage.setItem(AUDIO_STORAGE_KEY, 'on')
  } catch (error) {}

  if (siteAudio.bgmGain && siteAudio.ctx) {
    siteAudio.bgmGain.gain.setTargetAtTime(siteAudio.bgmVolume, siteAudio.ctx.currentTime, 0.018)
  }
  if (siteAudio.sfxGain && siteAudio.ctx) {
    siteAudio.sfxGain.gain.setTargetAtTime(siteAudio.sfxVolume, siteAudio.ctx.currentTime, 0.018)
  }

  syncAudioVolumeControls()
  updateAudioToggleButton()

  if (restart) {
    unlockSiteAudio()
  }
}

function updateHellModeControls() {
  const isHell = Boolean(siteAudio.horrorMode)

  documentRoot.classList.toggle(HELL_MODE_CLASS, isHell)
  if (document.body) {
    document.body.classList.toggle(HELL_MODE_CLASS, isHell)
    document.body.classList.toggle('horror-bgm-easter-egg', isHell)
  }

  if (isHell) {
    documentRoot.classList.remove('theme-dark')
    if (document.body) document.body.classList.remove('theme-dark')
  }

  if (themeToggleBtn && isHell) {
    themeToggleBtn.setAttribute('aria-pressed', 'true')
    themeToggleBtn.setAttribute('aria-label', '지옥 모드 잠김')
    themeToggleBtn.title = '지옥 모드: 새로고침 전까지 해제 불가'
    themeToggleBtn.classList.add('is-hell-locked')
    if (themeToggleIcon) themeToggleIcon.textContent = '☠'
    if (themeToggleLabel) themeToggleLabel.textContent = '지옥 모드'
  } else if (themeToggleBtn) {
    themeToggleBtn.classList.remove('is-hell-locked')
  }

  if (audioToggleBtn) {
    audioToggleBtn.classList.toggle('is-hell-locked', isHell)
    if (isHell) {
      audioToggleBtn.setAttribute('aria-pressed', 'true')
      audioToggleBtn.setAttribute('aria-label', '지옥 모드에서는 사운드를 끌 수 없음')
      audioToggleBtn.title = '지옥 모드에서는 사운드를 끌 수 없음'
      if (audioToggleIcon) audioToggleIcon.textContent = '☊'
      if (audioToggleLabel) audioToggleLabel.textContent = '사운드 잠김'
    }
  }

  ;[bgmVolumeRange, sfxVolumeRange].forEach((range) => {
    if (!range) return
    range.disabled = isHell
    range.setAttribute('aria-disabled', isHell ? 'true' : 'false')
    range.classList.toggle('is-hell-locked', isHell)
  })
}

function stopHellModeVisualGlitches() {
  if (siteAudio.horrorVisualGlitchTimer) {
    window.clearTimeout(siteAudio.horrorVisualGlitchTimer)
    siteAudio.horrorVisualGlitchTimer = null
  }
  documentRoot.classList.remove('hell-glitch-hit', 'hell-glitch-deep')
}

function triggerHellModeVisualGlitch(options = {}) {
  if (!siteAudio.horrorMode) return
  const { deep = false, duration = deep ? rand(190, 430) : rand(80, 210) } = options
  documentRoot.classList.add('hell-glitch-hit')
  documentRoot.classList.toggle('hell-glitch-deep', Boolean(deep))
  window.setTimeout(() => {
    documentRoot.classList.remove('hell-glitch-hit', 'hell-glitch-deep')
  }, duration)
}

function scheduleHellModeVisualGlitches() {
  if (!siteAudio.horrorMode) return
  stopHellModeVisualGlitches()

  const scheduleNext = () => {
    if (!siteAudio.horrorMode) return
    const nextDelay = Math.round(rand(1800, 7200))
    siteAudio.horrorVisualGlitchTimer = window.setTimeout(() => {
      triggerHellModeVisualGlitch({ deep: Math.random() < 0.32 })
      scheduleNext()
    }, nextDelay)
  }

  scheduleNext()
}

function stopHellModeStingers() {
  if (siteAudio.horrorStingerTimer) {
    window.clearTimeout(siteAudio.horrorStingerTimer)
    siteAudio.horrorStingerTimer = null
  }
  if (siteAudio.horrorPulseTimer) {
    window.clearInterval(siteAudio.horrorPulseTimer)
    siteAudio.horrorPulseTimer = null
  }
}

function playHellModeStinger(options = {}) {
  if (!siteAudio.horrorMode || !siteAudio.enabled || !siteAudio.unlocked) return
  const ctx = ensureAudioContext()
  if (!ctx) return

  const { immediate = false, violent = false } = options
  const output = siteAudio.sfxGain || siteAudio.bgmGain
  const delay = immediate ? 0 : rand(0.01, 0.28)
  const screamStart = rand(980, violent ? 2600 : 1900)
  const screamEnd = rand(86, 320)
  const duration = violent ? rand(1.15, 2.1) : rand(0.74, 1.55)

  playTone(screamStart, { duration, gain: rand(0.038, violent ? 0.075 : 0.058), type: 'sawtooth', destination: output, delay, detune: rand(-420, 420), slideTo: screamEnd, attack: 0.006, release: duration * rand(0.72, 1.05) })
  playTone(screamStart * rand(0.485, 0.612), { duration: duration * rand(0.86, 1.2), gain: rand(0.024, violent ? 0.055 : 0.042), type: 'square', destination: output, delay: delay + rand(0.012, 0.038), detune: rand(-260, 310), slideTo: screamEnd * rand(0.52, 1.28), attack: 0.01, release: duration * rand(0.75, 1.22) })
  playTone(rand(23, 54), { duration: rand(1.65, 3.2), gain: rand(0.032, violent ? 0.07 : 0.052), type: 'sine', destination: output, delay: delay + 0.015, slideTo: rand(18.5, 36), attack: 0.18, release: rand(1.4, 2.8) })
  playNoise({ duration: rand(0.42, violent ? 1.35 : 0.92), gain: rand(0.026, violent ? 0.07 : 0.048), delay: delay + 0.01, filterFreq: rand(1200, 4800), filterType: 'bandpass', filterQ: rand(8, 22), destination: output })
  playNoise({ duration: rand(0.11, 0.32), gain: rand(0.018, 0.038), delay: delay + rand(0.04, 0.18), filterFreq: rand(5400, 9200), filterType: 'highpass', filterQ: 0.7, destination: output })

  if (Math.random() < 0.72 || violent) {
    playTone(rand(520, 920), { duration: rand(0.08, 0.18), gain: rand(0.018, 0.036), type: 'square', destination: output, delay: delay + rand(0.18, 0.42), detune: rand(-500, 500), slideTo: rand(130, 260), attack: 0.004, release: rand(0.08, 0.2) })
  }

  triggerHellModeVisualGlitch({ deep: violent || Math.random() < 0.42, duration: violent ? rand(260, 560) : rand(120, 300) })
}

function scheduleHellModeStingers() {
  if (!siteAudio.horrorMode) return
  stopHellModeStingers()

  const scheduleNext = () => {
    if (!siteAudio.horrorMode) return
    const nextDelay = Math.round(rand(5800, 17000))
    siteAudio.horrorStingerTimer = window.setTimeout(() => {
      playHellModeStinger({ violent: Math.random() < 0.26 })
      scheduleNext()
    }, nextDelay)
  }

  scheduleNext()
  siteAudio.horrorPulseTimer = window.setInterval(() => {
    if (!siteAudio.horrorMode || !siteAudio.enabled || !siteAudio.unlocked) return
    const output = Math.random() < 0.52 ? siteAudio.bgmGain : siteAudio.sfxGain
    if (Math.random() < 0.62) {
      playNoise({ duration: rand(0.08, 0.42), gain: rand(0.008, 0.026), filterFreq: rand(90, 1600), filterType: 'bandpass', filterQ: rand(4, 15), destination: output })
    }
    if (Math.random() < 0.24) {
      playTone(rand(18.5, 42), { duration: rand(0.5, 1.4), gain: rand(0.012, 0.034), type: 'sine', destination: output, slideTo: rand(18.5, 32), attack: 0.16, release: rand(0.6, 1.2) })
    }
  }, 1450)
}

function setHorrorBgmEasterEggEnabled(enabled, options = {}) {
  const nextEnabled = Boolean(enabled)
  const { announce = true } = options

  if (siteAudio.horrorMode === nextEnabled) return

  siteAudio.horrorMode = nextEnabled
  saveHorrorBgmEasterEggPreference(nextEnabled)
  siteAudio.horrorProfileCache.clear()
  updateHellModeControls()
  syncBgmFilterForMode()

  if (nextEnabled) {
    forceHellModeAudioLock({ restart: true })
    playHorrorBgmUnlockCue()
    if (siteAudio.enabled && siteAudio.unlocked) {
      stopBgm()
      startBgmForScreen(currentScreenKey)
    }
    scheduleHellModeStingers()
    scheduleHellModeVisualGlitches()
    if (announce) {
      showPopup('지옥 모드', '낮도 밤도 아니다. 화면과 소리는 새로고침하기 전까지 돌아오지 않는다.', { icon: '☠' })
    }
    return
  }

  stopHellModeStingers()
  stopHellModeVisualGlitches()
  if (siteAudio.enabled && siteAudio.unlocked) {
    stopBgm()
    startBgmForScreen(currentScreenKey)
  }
}

function registerThemeHorrorEasterEggTap() {
  const now = performance.now()
  siteAudio.horrorThemeToggleTapTimes = siteAudio.horrorThemeToggleTapTimes
    .filter((time) => now - time <= HORROR_BGM_TAP_WINDOW_MS)

  siteAudio.horrorThemeToggleTapTimes.push(now)

  if (siteAudio.horrorThemeToggleTapTimes.length < HORROR_BGM_TAP_THRESHOLD) return

  siteAudio.horrorThemeToggleTapTimes = []
  setHorrorBgmEasterEggEnabled(true)
}

function getAudioContextCtor() {
  return window.AudioContext || window.webkitAudioContext || null
}

function ensureAudioContext() {
  if (siteAudio.ctx) return siteAudio.ctx

  const AudioContextCtor = getAudioContextCtor()
  if (!AudioContextCtor) return null

  const ctx = new AudioContextCtor()
  const masterGain = ctx.createGain()
  const bgmGain = ctx.createGain()
  const sfxGain = ctx.createGain()
  const bgmFilter = ctx.createBiquadFilter()
  const outputLimiter = ctx.createDynamicsCompressor()

  masterGain.gain.value = AUDIO_MASTER_GAIN_VALUE
  bgmGain.gain.value = siteAudio.bgmVolume
  sfxGain.gain.value = siteAudio.sfxVolume
  bgmFilter.type = siteAudio.horrorMode ? 'bandpass' : 'lowpass'
  bgmFilter.frequency.value = siteAudio.horrorMode ? 620 : 3400
  bgmFilter.Q.value = siteAudio.horrorMode ? 7.8 : 0.7
  outputLimiter.threshold.value = -4
  outputLimiter.knee.value = 8
  outputLimiter.ratio.value = 4.6
  outputLimiter.attack.value = 0.003
  outputLimiter.release.value = 0.18

  bgmGain.connect(bgmFilter)
  bgmFilter.connect(masterGain)
  sfxGain.connect(masterGain)
  masterGain.connect(outputLimiter)
  outputLimiter.connect(ctx.destination)

  siteAudio.ctx = ctx
  siteAudio.masterGain = masterGain
  siteAudio.bgmGain = bgmGain
  siteAudio.sfxGain = sfxGain
  siteAudio.outputLimiter = outputLimiter
  siteAudio.bgmFilter = bgmFilter
  syncBgmFilterForMode()
  return ctx
}

function updateAudioToggleButton() {
  if (!audioToggleBtn) return

  if (siteAudio.horrorMode) {
    audioToggleBtn.setAttribute('aria-pressed', 'true')
    audioToggleBtn.setAttribute('aria-label', '지옥 모드에서는 사운드를 끌 수 없음')
    audioToggleBtn.title = '지옥 모드에서는 사운드를 끌 수 없음'
    audioToggleBtn.classList.remove('is-audio-off')
    audioToggleBtn.classList.add('is-hell-locked')
    if (audioToggleIcon) audioToggleIcon.textContent = '☊'
    if (audioToggleLabel) audioToggleLabel.textContent = '사운드 잠김'
    return
  }

  const label = siteAudio.enabled ? '사운드 켬' : '사운드 꺼짐'
  const action = siteAudio.enabled ? '사운드 끄기' : '사운드 켜기'

  audioToggleBtn.setAttribute('aria-pressed', siteAudio.enabled ? 'true' : 'false')
  audioToggleBtn.setAttribute('aria-label', action)
  audioToggleBtn.title = action
  audioToggleBtn.classList.toggle('is-audio-off', !siteAudio.enabled)
  audioToggleBtn.classList.remove('is-hell-locked')

  if (audioToggleIcon) {
    audioToggleIcon.textContent = siteAudio.enabled ? '🔊' : '🔇'
  }

  if (audioToggleLabel) {
    audioToggleLabel.textContent = label
  }
}

function formatVolumePercent(value) {
  return `${Math.round(normalizeAudioVolume(value, 0) * 100)}%`
}

function syncAudioVolumeControls() {
  if (bgmVolumeRange) {
    bgmVolumeRange.value = String(Math.round(siteAudio.bgmVolume * 100))
    bgmVolumeRange.style.setProperty('--volume-progress', `${Math.round(siteAudio.bgmVolume * 100)}%`)
  }

  if (sfxVolumeRange) {
    sfxVolumeRange.value = String(Math.round(siteAudio.sfxVolume * 100))
    sfxVolumeRange.style.setProperty('--volume-progress', `${Math.round(siteAudio.sfxVolume * 100)}%`)
  }

  if (bgmVolumeValue) {
    bgmVolumeValue.textContent = formatVolumePercent(siteAudio.bgmVolume)
  }

  if (sfxVolumeValue) {
    sfxVolumeValue.textContent = formatVolumePercent(siteAudio.sfxVolume)
  }
}


function getSfxMixLevel(name) {
  const baseLevel = SFX_MIX_LEVELS[name] ?? 1

  if (window.matchMedia('(pointer: coarse)').matches) {
    if (/Hoof|Tick|Hit|Fuse|Step|Inflate/.test(name)) {
      return baseLevel * 0.88
    }
  }

  return baseLevel
}

function getCurrentSfxOutputScale(destination) {
  if (destination && destination !== siteAudio.sfxGain) {
    return 1
  }

  const scale = Number(siteAudio.currentSfxMix)
  return Number.isFinite(scale) && scale > 0 ? scale : 1
}

function duckBgmForSfx(name) {
  if (!siteAudio.bgmGain || !siteAudio.enabled) return

  const profile = SFX_DUCKING_PROFILES[name]
  if (!profile) return

  const ctx = ensureAudioContext()
  if (!ctx) return

  const targetLevel = Math.max(0.12, Math.min(1, profile.level || 0.55))
  const duckedGain = siteAudio.bgmVolume * targetLevel

  if (siteAudio.bgmDuckTimer) {
    window.clearTimeout(siteAudio.bgmDuckTimer)
    siteAudio.bgmDuckTimer = null
  }

  siteAudio.bgmGain.gain.cancelScheduledValues(ctx.currentTime)
  siteAudio.bgmGain.gain.setTargetAtTime(duckedGain, ctx.currentTime, 0.018)

  siteAudio.bgmDuckTimer = window.setTimeout(() => {
    if (!siteAudio.bgmGain || !siteAudio.enabled) return
    siteAudio.bgmGain.gain.setTargetAtTime(siteAudio.bgmVolume, ctx.currentTime, 0.06)
    siteAudio.bgmDuckTimer = null
  }, profile.duration || 620)
}

function setAudioCategoryVolume(category, rawValue, options = {}) {
  const value = normalizeAudioVolume(rawValue, category === 'bgm' ? siteAudio.bgmVolume : siteAudio.sfxVolume)
  const { persist = true, preview = false } = options
  const ctx = ensureAudioContext()

  if (category === 'bgm') {
    siteAudio.bgmVolume = value

    if (siteAudio.bgmGain) {
      siteAudio.bgmGain.gain.setTargetAtTime(value, ctx?.currentTime || 0, 0.015)
    }

    if (persist) {
      saveVolumePreference(BGM_VOLUME_STORAGE_KEY, value)
    }
  }

  if (category === 'sfx') {
    siteAudio.sfxVolume = value

    if (siteAudio.sfxGain) {
      siteAudio.sfxGain.gain.setTargetAtTime(value, ctx?.currentTime || 0, 0.015)
    }

    if (persist) {
      saveVolumePreference(SFX_VOLUME_STORAGE_KEY, value)
    }

    if (preview && siteAudio.enabled && siteAudio.unlocked && value > 0) {
      playSfx('tick')
    }
  }

  syncAudioVolumeControls()
}

function handleBgmVolumeInput(event) {
  if (siteAudio.horrorMode) {
    forceHellModeAudioLock({ restart: true })
    playHellModeStinger({ immediate: true })
    return
  }

  const value = normalizeAudioVolume(Number(event.target.value) / 100, siteAudio.bgmVolume)
  setAudioCategoryVolume('bgm', value)

  if (siteAudio.enabled && !siteAudio.unlocked) {
    unlockSiteAudio()
  }
}

function handleSfxVolumeInput(event) {
  if (siteAudio.horrorMode) {
    forceHellModeAudioLock({ restart: true })
    playHellModeStinger({ immediate: true })
    return
  }

  const value = normalizeAudioVolume(Number(event.target.value) / 100, siteAudio.sfxVolume)
  setAudioCategoryVolume('sfx', value, { preview: true })

  if (siteAudio.enabled && !siteAudio.unlocked) {
    unlockSiteAudio()
  }
}

function scheduleGain(gainNode, startValue, peakValue, endValue, startTime, attack = 0.012, release = 0.16) {
  if (!gainNode) return
  gainNode.gain.cancelScheduledValues(startTime)
  gainNode.gain.setValueAtTime(startValue, startTime)
  gainNode.gain.linearRampToValueAtTime(peakValue, startTime + attack)
  gainNode.gain.exponentialRampToValueAtTime(Math.max(0.0001, endValue), startTime + attack + release)
}

function playTone(freq, options = {}) {
  const ctx = ensureAudioContext()
  if (!ctx || !siteAudio.enabled) return null

  const {
    duration = 0.14,
    gain = 0.12,
    type = 'sine',
    destination = siteAudio.sfxGain,
    delay = 0,
    detune = 0,
    slideTo = null,
    attack = 0.01,
    release = duration
  } = options

  const startTime = ctx.currentTime + delay
  const oscillator = ctx.createOscillator()
  const toneGain = ctx.createGain()
  oscillator.type = type
  oscillator.frequency.setValueAtTime(freq, startTime)
  oscillator.detune.setValueAtTime(detune, startTime)

  if (Number.isFinite(slideTo)) {
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), startTime + Math.max(0.03, duration * 0.85))
  }

  const outputGain = gain * getCurrentSfxOutputScale(destination)
  scheduleGain(toneGain, 0.0001, outputGain, 0.0001, startTime, attack, Math.max(0.035, release))
  oscillator.connect(toneGain)
  toneGain.connect(destination || siteAudio.sfxGain)
  oscillator.start(startTime)
  oscillator.stop(startTime + duration + 0.08)
  return oscillator
}

function playNoise(options = {}) {
  const ctx = ensureAudioContext()
  if (!ctx || !siteAudio.enabled) return

  const {
    duration = 0.18,
    gain = 0.12,
    delay = 0,
    filterType = 'bandpass',
    filterFreq = 1200,
    filterQ = 0.8,
    destination = siteAudio.sfxGain
  } = options

  const startTime = ctx.currentTime + delay
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration))
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < bufferSize; i += 1) {
    const fade = 1 - i / bufferSize
    data[i] = (Math.random() * 2 - 1) * fade
  }

  const source = ctx.createBufferSource()
  const filter = ctx.createBiquadFilter()
  const noiseGain = ctx.createGain()

  source.buffer = buffer
  filter.type = filterType
  filter.frequency.value = filterFreq
  filter.Q.value = filterQ
  const outputGain = gain * getCurrentSfxOutputScale(destination)
  scheduleGain(noiseGain, 0.0001, outputGain, 0.0001, startTime, 0.005, duration)

  source.connect(filter)
  filter.connect(noiseGain)
  noiseGain.connect(destination || siteAudio.sfxGain)
  source.start(startTime)
}


function playThrottledSfx(name, throttleMs = SFX_THROTTLE_MS[name] || 100) {
  const now = performance.now()
  const lastAt = siteAudio.sfxLastAt[name] || 0
  if (now - lastAt < throttleMs) return false
  siteAudio.sfxLastAt[name] = now
  playSfx(name)
  return true
}

function playRandomToneCluster(baseFreq, count = 3, options = {}) {
  const { gap = 0.035, spread = 0.16, gain = 0.035, type = 'triangle', duration = 0.08 } = options
  for (let index = 0; index < count; index += 1) {
    const ratio = 1 + rand(-spread, spread)
    playTone(baseFreq * ratio, {
      duration: duration * rand(0.78, 1.24),
      gain: gain * rand(0.72, 1.06),
      type,
      delay: index * gap,
      release: duration * 0.92
    })
  }
}

function playUiClickSfx(target = null) {
  const element = target instanceof Element ? target : null
  if (element?.closest('input, textarea, select')) return

  if (element?.closest('.main-btn')) {
    playSfx('start')
    return
  }

  if (element?.closest('.back-btn, .utility-prevstep-btn')) {
    playSfx('back')
    return
  }

  if (element?.closest('.popup-btn')) {
    playSfx('close')
    return
  }

  if (element?.closest('.game-launch, .physical-game-launch, .menu-btn')) {
    playSfx('select')
    return
  }

  if (element?.closest('.action-btn.primary')) {
    playSfx('start')
    return
  }

  if (element?.closest('.action-btn.soft, .action-btn.secondary')) {
    playSfx('reset')
    return
  }

  if (element?.closest('button, a, .luck-carousel-dot, .physical-carousel-dot')) {
    playSfx('tap')
  }
}


function playHellSfxCorruption(name) {
  if (!siteAudio.horrorMode || !siteAudio.enabled || !siteAudio.unlocked) return
  const output = siteAudio.sfxGain || siteAudio.bgmGain
  const isUi = ['tap', 'hover', 'select', 'start', 'back', 'reset', 'close', 'screen', 'popup'].includes(name)
  const chance = isUi ? 0.56 : 0.22

  if (Math.random() > chance) return

  playNoise({
    duration: rand(0.035, isUi ? 0.14 : 0.09),
    gain: rand(0.006, isUi ? 0.022 : 0.016),
    filterFreq: rand(420, 4200),
    filterType: Math.random() < 0.5 ? 'bandpass' : 'highpass',
    filterQ: rand(2.2, 13),
    destination: output
  })

  if (Math.random() < (isUi ? 0.48 : 0.2)) {
    playTone(rand(58, 240), {
      duration: rand(0.055, 0.2),
      gain: rand(0.006, 0.018),
      type: Math.random() < 0.5 ? 'sawtooth' : 'square',
      destination: output,
      detune: rand(-360, 360),
      slideTo: rand(24, 110),
      attack: 0.004,
      release: rand(0.05, 0.18)
    })
  }
}

function playSfx(name) {
  const ctx = ensureAudioContext()
  if (!ctx || !siteAudio.enabled) return

  playHellSfxCorruption(name)

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }

  const previousSfxMix = siteAudio.currentSfxMix
  siteAudio.currentSfxMix = getSfxMixLevel(name)
  duckBgmForSfx(name)

  try {
    switch (name) {
    case 'tap':
      playTone(740, { duration: 0.055, gain: 0.055, type: 'triangle', release: 0.06 })
      break
    case 'hover':
      playTone(1050, { duration: 0.045, gain: 0.025, type: 'sine', release: 0.045 })
      break
    case 'select':
      playTone(523.25, { duration: 0.08, gain: 0.07, type: 'triangle', release: 0.08 })
      playTone(783.99, { duration: 0.1, gain: 0.055, type: 'triangle', delay: 0.045, release: 0.09 })
      break
    case 'start':
      playTone(392.0, { duration: 0.08, gain: 0.07, type: 'sine', release: 0.075 })
      playTone(587.33, { duration: 0.08, gain: 0.06, type: 'sine', delay: 0.055, release: 0.075 })
      playTone(783.99, { duration: 0.12, gain: 0.06, type: 'sine', delay: 0.11, release: 0.12 })
      break
    case 'back':
      playTone(420, { duration: 0.09, gain: 0.06, type: 'triangle', slideTo: 260, release: 0.09 })
      break
    case 'reset':
      playTone(330, { duration: 0.09, gain: 0.055, type: 'triangle', slideTo: 220, release: 0.09 })
      playNoise({ duration: 0.08, gain: 0.035, filterFreq: 900 })
      break
    case 'close':
      playTone(560, { duration: 0.06, gain: 0.045, type: 'triangle', slideTo: 420, release: 0.06 })
      break
    case 'screen':
      playTone(440, { duration: 0.07, gain: 0.035, type: 'sine', release: 0.08 })
      playTone(660, { duration: 0.08, gain: 0.032, type: 'sine', delay: 0.045, release: 0.08 })
      break
    case 'popup':
      playTone(659.25, { duration: 0.08, gain: 0.06, type: 'sine', release: 0.09 })
      playTone(880, { duration: 0.12, gain: 0.045, type: 'sine', delay: 0.06, release: 0.12 })
      break
    case 'error':
      playTone(180, { duration: 0.18, gain: 0.06, type: 'sawtooth', slideTo: 130, release: 0.16 })
      playNoise({ duration: 0.12, gain: 0.03, filterFreq: 260, filterType: 'lowpass' })
      break
    case 'result':
      playTone(523.25, { duration: 0.11, gain: 0.07, type: 'triangle', release: 0.1 })
      playTone(659.25, { duration: 0.11, gain: 0.065, type: 'triangle', delay: 0.09, release: 0.1 })
      playTone(783.99, { duration: 0.18, gain: 0.07, type: 'triangle', delay: 0.18, release: 0.18 })
      playNoise({ duration: 0.22, gain: 0.035, delay: 0.18, filterFreq: 3200, filterType: 'highpass' })
      break
    case 'pop':
      playTone(160, { duration: 0.12, gain: 0.09, type: 'sine', slideTo: 65, release: 0.12 })
      playNoise({ duration: 0.2, gain: 0.08, filterFreq: 1000 })
      break
    case 'bomb':
      playTone(130, { duration: 0.2, gain: 0.09, type: 'sine', slideTo: 55, release: 0.22 })
      playNoise({ duration: 0.32, gain: 0.1, filterFreq: 420, filterType: 'lowpass', filterQ: 0.4 })
      break
    case 'card':
      playNoise({ duration: 0.075, gain: 0.052, filterFreq: 2400, filterType: 'bandpass', filterQ: 1.6 })
      playTone(1100, { duration: 0.05, gain: 0.038, type: 'triangle', release: 0.045 })
      break
    case 'raceFinish':
      playTone(523.25, { duration: 0.08, gain: 0.07, type: 'square', release: 0.08 })
      playTone(659.25, { duration: 0.1, gain: 0.066, type: 'square', delay: 0.07, release: 0.09 })
      playTone(1046.5, { duration: 0.22, gain: 0.065, type: 'square', delay: 0.15, release: 0.18 })
      break
    case 'bearOpen':
      playTone(250, { duration: 0.08, gain: 0.055, type: 'triangle', slideTo: 420, release: 0.08 })
      playNoise({ duration: 0.12, gain: 0.035, filterFreq: 1800 })
      break
    case 'panda':
      playTone(523.25, { duration: 0.08, gain: 0.065, type: 'sine', release: 0.08 })
      playTone(659.25, { duration: 0.08, gain: 0.06, type: 'sine', delay: 0.07, release: 0.08 })
      playTone(1046.5, { duration: 0.2, gain: 0.055, type: 'sine', delay: 0.15, release: 0.18 })
      break
    case 'tick':
      playTone(1180, { duration: 0.035, gain: 0.028, type: 'square', release: 0.035 })
      break
    case 'marbleStart':
      playNoise({ duration: 0.12, gain: 0.05, filterFreq: 3200, filterType: 'highpass' })
      playTone(523.25, { duration: 0.07, gain: 0.065, type: 'triangle', release: 0.06 })
      playTone(783.99, { duration: 0.1, gain: 0.058, type: 'triangle', delay: 0.055, release: 0.09 })
      break
    case 'marbleDrop':
      playTone(rand(880, 1320), { duration: 0.04, gain: 0.036, type: 'triangle', release: 0.035 })
      break
    case 'marbleHit':
      playTone(rand(620, 1040), { duration: 0.032, gain: 0.028, type: 'sine', release: 0.03 })
      break
    case 'countdown':
      playTone(880, { duration: 0.055, gain: 0.052, type: 'square', release: 0.045 })
      playTone(1320, { duration: 0.04, gain: 0.026, type: 'sine', delay: 0.035, release: 0.04 })
      break
    case 'chainExplosion':
      playTone(110, { duration: 0.16, gain: 0.085, type: 'sine', slideTo: 48, release: 0.18 })
      playNoise({ duration: 0.24, gain: 0.074, filterFreq: 520, filterType: 'lowpass', filterQ: 0.55 })
      break
    case 'slotSettle':
      playRandomToneCluster(880, 5, { gap: 0.048, spread: 0.08, gain: 0.042, type: 'triangle', duration: 0.07 })
      break
    case 'shuffle':
      playNoise({ duration: 0.18, gain: 0.04, filterFreq: 1600, filterType: 'bandpass', filterQ: 1.5 })
      playRandomToneCluster(620, 3, { gap: 0.04, spread: 0.18, gain: 0.026, type: 'triangle', duration: 0.06 })
      break
    case 'raceStart':
      playTone(196, { duration: 0.075, gain: 0.07, type: 'square', release: 0.07 })
      playTone(246.94, { duration: 0.075, gain: 0.066, type: 'square', delay: 0.07, release: 0.07 })
      playTone(329.63, { duration: 0.16, gain: 0.066, type: 'square', delay: 0.14, release: 0.14 })
      playNoise({ duration: 0.18, gain: 0.032, delay: 0.12, filterFreq: 760, filterType: 'bandpass', filterQ: 2.4 })
      break
    case 'raceHoof':
      playTone(150, { duration: 0.032, gain: 0.048, type: 'square', release: 0.026 })
      playTone(112, { duration: 0.03, gain: 0.038, type: 'square', delay: 0.052, release: 0.024 })
      playNoise({ duration: 0.04, gain: 0.026, delay: 0.018, filterFreq: 580, filterType: 'bandpass', filterQ: 2.4 })
      break
    case 'raceStumble':
      playTone(260, { duration: 0.09, gain: 0.065, type: 'sawtooth', slideTo: 120, release: 0.085 })
      playNoise({ duration: 0.16, gain: 0.056, filterFreq: 420, filterType: 'lowpass' })
      break
    case 'battleShuffle':
      playNoise({ duration: 0.24, gain: 0.064, filterFreq: 2600, filterType: 'bandpass', filterQ: 1.9 })
      playRandomToneCluster(880, 6, { gap: 0.028, spread: 0.24, gain: 0.032, type: 'triangle', duration: 0.045 })
      break
    case 'battleFormula':
      playTone(349.23, { duration: 0.065, gain: 0.052, type: 'triangle', release: 0.06 })
      playTone(440, { duration: 0.075, gain: 0.048, type: 'triangle', delay: 0.055, release: 0.07 })
      playTone(523.25, { duration: 0.1, gain: 0.05, type: 'triangle', delay: 0.12, release: 0.09 })
      break
    case 'battleFinal':
      playTone(392.0, { duration: 0.08, gain: 0.072, type: 'triangle', release: 0.07 })
      playTone(587.33, { duration: 0.08, gain: 0.068, type: 'triangle', delay: 0.075, release: 0.07 })
      playTone(783.99, { duration: 0.24, gain: 0.07, type: 'triangle', delay: 0.15, release: 0.2 })
      break
    case 'simShuffle':
      playNoise({ duration: 0.2, gain: 0.054, filterFreq: 1700, filterType: 'bandpass', filterQ: 1.4 })
      playTone(246.94, { duration: 0.08, gain: 0.046, type: 'triangle', release: 0.07 })
      playTone(369.99, { duration: 0.09, gain: 0.044, type: 'triangle', delay: 0.07, release: 0.08 })
      break
    case 'arenaStart':
      playTone(130.81, { duration: 0.16, gain: 0.076, type: 'sawtooth', slideTo: 261.63, release: 0.14 })
      playTone(392, { duration: 0.18, gain: 0.058, type: 'triangle', delay: 0.08, release: 0.16 })
      playNoise({ duration: 0.18, gain: 0.038, delay: 0.04, filterFreq: 700, filterType: 'lowpass' })
      break
    case 'simImpact':
      playTone(rand(95, 170), { duration: 0.06, gain: 0.064, type: 'square', slideTo: rand(55, 95), release: 0.05 })
      playNoise({ duration: 0.085, gain: 0.052, filterFreq: 460, filterType: 'lowpass' })
      break
    case 'simDecay':
      playTone(220, { duration: 0.08, gain: 0.058, type: 'sawtooth', slideTo: 120, release: 0.08 })
      playTone(150, { duration: 0.11, gain: 0.044, type: 'sine', delay: 0.045, slideTo: 72, release: 0.1 })
      playNoise({ duration: 0.17, gain: 0.046, filterFreq: 460, filterType: 'lowpass', filterQ: 0.7 })
      break
    case 'simEliminate':
      playTone(196, { duration: 0.14, gain: 0.068, type: 'sawtooth', slideTo: 70, release: 0.12 })
      playTone(98, { duration: 0.2, gain: 0.052, type: 'sine', delay: 0.08, release: 0.18 })
      break
    case 'simWin':
      playTone(329.63, { duration: 0.08, gain: 0.07, type: 'triangle', release: 0.08 })
      playTone(493.88, { duration: 0.08, gain: 0.068, type: 'triangle', delay: 0.075, release: 0.08 })
      playTone(659.25, { duration: 0.22, gain: 0.07, type: 'triangle', delay: 0.15, release: 0.18 })
      break
    case 'rouletteReload':
      playNoise({ duration: 0.13, gain: 0.06, filterFreq: 850, filterType: 'bandpass', filterQ: 2.4 })
      playTone(220, { duration: 0.07, gain: 0.046, type: 'triangle', delay: 0.045, slideTo: 170, release: 0.06 })
      break
    case 'rouletteSpin':
      playRandomToneCluster(220, 5, { gap: 0.045, spread: 0.3, gain: 0.036, type: 'square', duration: 0.04 })
      break
    case 'rouletteAim':
      playTone(220, { duration: 0.11, gain: 0.048, type: 'triangle', slideTo: 150, release: 0.09 })
      break
    case 'rouletteEmpty':
      playTone(520, { duration: 0.045, gain: 0.058, type: 'square', release: 0.04 })
      playNoise({ duration: 0.04, gain: 0.024, filterFreq: 2600, filterType: 'highpass' })
      break
    case 'rouletteShot':
      playTone(78, { duration: 0.14, gain: 0.1, type: 'sine', slideTo: 38, release: 0.13 })
      playNoise({ duration: 0.26, gain: 0.112, filterFreq: 560, filterType: 'lowpass', filterQ: 0.65 })
      playNoise({ duration: 0.08, gain: 0.06, filterFreq: 2900, filterType: 'highpass', delay: 0.012 })
      break
    case 'rouletteFirework':
      playTone(740, { duration: 0.06, gain: 0.048, type: 'triangle', release: 0.06 })
      playTone(988, { duration: 0.14, gain: 0.04, type: 'sine', delay: 0.05, release: 0.14 })
      playNoise({ duration: 0.12, gain: 0.034, delay: 0.04, filterFreq: 3300, filterType: 'highpass' })
      break
    case 'rouletteEliminate':
      playTone(155, { duration: 0.14, gain: 0.055, type: 'sawtooth', slideTo: 65, release: 0.13 })
      break
    case 'stockBell':
      playTone(1046.5, { duration: 0.075, gain: 0.07, type: 'square', release: 0.07 })
      playTone(1567.98, { duration: 0.1, gain: 0.056, type: 'square', delay: 0.055, release: 0.1 })
      break
    case 'stockTick':
      playTone(rand(860, 1320), { duration: 0.03, gain: 0.036, type: 'square', release: 0.026 })
      break
    case 'stockUp':
      playTone(659.25, { duration: 0.045, gain: 0.045, type: 'triangle', release: 0.04 })
      playTone(987.77, { duration: 0.065, gain: 0.038, type: 'triangle', delay: 0.04, release: 0.06 })
      break
    case 'stockDown':
      playTone(659.25, { duration: 0.06, gain: 0.044, type: 'triangle', slideTo: 329.63, release: 0.055 })
      break
    case 'stockCrash':
      playTone(220, { duration: 0.13, gain: 0.068, type: 'sawtooth', slideTo: 86, release: 0.12 })
      playNoise({ duration: 0.18, gain: 0.06, filterFreq: 420, filterType: 'lowpass' })
      break
    case 'stockFinal':
      playTone(880, { duration: 0.08, gain: 0.07, type: 'square', release: 0.08 })
      playTone(1318.51, { duration: 0.16, gain: 0.064, type: 'square', delay: 0.075, release: 0.14 })
      break
    case 'ladderDraw':
      playNoise({ duration: 0.11, gain: 0.046, filterFreq: 2100, filterType: 'bandpass', filterQ: 1.8 })
      playTone(493.88, { duration: 0.075, gain: 0.036, type: 'triangle', release: 0.07 })
      break
    case 'ladderStep':
      playTone(523.25 + Math.random() * 260, { duration: 0.034, gain: 0.036, type: 'triangle', release: 0.032 })
      break
    case 'ladderReveal':
      playRandomToneCluster(880, 6, { gap: 0.052, spread: 0.1, gain: 0.044, type: 'triangle', duration: 0.06 })
      break
    case 'ladderWin':
      playTone(523.25, { duration: 0.08, gain: 0.068, type: 'triangle', release: 0.08 })
      playTone(783.99, { duration: 0.18, gain: 0.064, type: 'triangle', delay: 0.08, release: 0.16 })
      break
    case 'balloonInflate':
      playTone(rand(260, 340), { duration: 0.052, gain: 0.034, type: 'sine', slideTo: rand(310, 390), release: 0.048 })
      playNoise({ duration: 0.055, gain: 0.012, filterFreq: 900, filterType: 'bandpass', filterQ: 0.7 })
      break
    case 'balloonWarning':
      // 풍선 터짐 시점을 예측하지 못하도록 경고음은 intentionally muted.
      break
    case 'balloonPop':
      playTone(130, { duration: 0.13, gain: 0.105, type: 'sine', slideTo: 48, release: 0.12 })
      playNoise({ duration: 0.25, gain: 0.098, filterFreq: 1500, filterType: 'bandpass' })
      break
    case 'bombFuse':
      playNoise({ duration: 0.06, gain: 0.036, filterFreq: 3800, filterType: 'highpass', filterQ: 0.9 })
      playTone(980, { duration: 0.038, gain: 0.03, type: 'sine', release: 0.032 })
      break
    case 'bombPassWarning':
      playTone(220, { duration: 0.065, gain: 0.052, type: 'square', release: 0.055 })
      break
    case 'bombExplosion':
      playTone(96, { duration: 0.2, gain: 0.11, type: 'sine', slideTo: 38, release: 0.2 })
      playNoise({ duration: 0.38, gain: 0.12, filterFreq: 400, filterType: 'lowpass', filterQ: 0.4 })
      break
    case 'circleHit':
      playTone(987.77, { duration: 0.034, gain: 0.05, type: 'triangle', release: 0.03 })
      break
    case 'circleMiss':
      playTone(196, { duration: 0.13, gain: 0.075, type: 'sawtooth', slideTo: 70, release: 0.12 })
      playNoise({ duration: 0.11, gain: 0.045, filterFreq: 340, filterType: 'lowpass' })
      break
    case 'stayBeep':
      playTone(440, { duration: 0.055, gain: 0.052, type: 'square', release: 0.044 })
      break
    case 'clickSignal':
      playTone(1174.66, { duration: 0.08, gain: 0.08, type: 'square', release: 0.07 })
      playTone(1760, { duration: 0.1, gain: 0.062, type: 'square', delay: 0.05, release: 0.09 })
      break
    case 'keyHit':
      playTone(1320, { duration: 0.032, gain: 0.052, type: 'square', release: 0.03 })
      break
    case 'falseStart':
      playTone(165, { duration: 0.15, gain: 0.075, type: 'sawtooth', slideTo: 88, release: 0.13 })
      break
    case 'giftOpen':
      playTone(261.63, { duration: 0.065, gain: 0.066, type: 'triangle', slideTo: 523.25, release: 0.065 })
      playNoise({ duration: 0.14, gain: 0.052, filterFreq: 2300, filterType: 'bandpass', filterQ: 1.3 })
      break
    case 'bear':
      playTone(392, { duration: 0.08, gain: 0.052, type: 'sine', release: 0.08 })
      playTone(523.25, { duration: 0.1, gain: 0.044, type: 'sine', delay: 0.07, release: 0.1 })
      break
    case 'pandaWin':
      playTone(523.25, { duration: 0.08, gain: 0.074, type: 'sine', release: 0.08 })
      playTone(783.99, { duration: 0.08, gain: 0.07, type: 'sine', delay: 0.065, release: 0.08 })
      playTone(1046.5, { duration: 0.23, gain: 0.074, type: 'sine', delay: 0.14, release: 0.2 })
      playNoise({ duration: 0.18, gain: 0.04, delay: 0.14, filterFreq: 3600, filterType: 'highpass' })
      break
    default:
      playTone(620, { duration: 0.07, gain: 0.04, type: 'triangle', release: 0.07 })
    }
  } finally {
    siteAudio.currentSfxMix = previousSfxMix
  }
}

function getBgmProfileForScreen(screenKey) {
  if (screenKey === 'home') return SCREEN_BGM_PROFILES.home
  if (screenKey === 'menu') return SCREEN_BGM_PROFILES.menu
  if (screenKey === 'physical') return SCREEN_BGM_PROFILES.physical
  if (screenKey === 'physicalBalloon') return SCREEN_BGM_PROFILES.balloon
  if (screenKey === 'physicalBomb') return SCREEN_BGM_PROFILES.bombPass
  if (screenKey === 'physicalCircle') return SCREEN_BGM_PROFILES.precision
  if (screenKey === 'physicalKeyReact') return SCREEN_BGM_PROFILES.keyReact
  if (screenKey === 'physicalBearFind') return SCREEN_BGM_PROFILES.bearFind
  if (screenKey === 'luck') return SCREEN_BGM_PROFILES.luck
  if (screenKey === 'game1') return SCREEN_BGM_PROFILES.marble
  if (screenKey === 'game2') return SCREEN_BGM_PROFILES.race
  if (screenKey === 'game3') return SCREEN_BGM_PROFILES.cardBattle
  if (screenKey === 'game4') return SCREEN_BGM_PROFILES.arena
  if (screenKey === 'game5') return SCREEN_BGM_PROFILES.suspense
  if (screenKey === 'game6') return SCREEN_BGM_PROFILES.stock
  if (screenKey === 'game7') return SCREEN_BGM_PROFILES.ladder
  if (/^physical/.test(screenKey)) return SCREEN_BGM_PROFILES.physical
  if (/^game\d+$/.test(screenKey)) return SCREEN_BGM_PROFILES.calmGame
  return SCREEN_BGM_PROFILES.menu
}


function getHellBgmNextDelay(profile) {
  const now = performance.now()
  const baseInterval = Math.max(110, Number(profile?.interval) || 520)

  if (now >= (siteAudio.horrorTempoChangeAt || 0)) {
    const roll = Math.random()
    if (roll < 0.19) siteAudio.horrorTempoState = 'panic'
    else if (roll < 0.34) siteAudio.horrorTempoState = 'stutter'
    else if (roll < 0.52) siteAudio.horrorTempoState = 'drag'
    else if (roll < 0.68) siteAudio.horrorTempoState = 'dead'
    else siteAudio.horrorTempoState = 'crawl'
    siteAudio.horrorTempoChangeAt = now + rand(900, 4300)
  }

  switch (siteAudio.horrorTempoState) {
    case 'panic':
      return Math.round(clampValue(baseInterval * rand(0.13, 0.34), 58, 240))
    case 'stutter':
      return Math.round(Math.random() < 0.58 ? rand(34, 92) : baseInterval * rand(0.42, 0.76))
    case 'dead':
      return Math.round(clampValue(baseInterval * rand(2.25, 4.9), 880, 3200))
    case 'drag':
      return Math.round(clampValue(baseInterval * rand(1.22, 2.25), 560, 2100))
    case 'crawl':
    default:
      return Math.round(clampValue(baseInterval * rand(0.54, 1.28), 160, 1160))
  }
}

function scheduleNextHellBgmStep(profile, options = {}) {
  if (!siteAudio.horrorMode || !siteAudio.enabled || !siteAudio.unlocked || !profile?.horror) return

  const { immediate = false } = options
  const delay = immediate ? 0 : getHellBgmNextDelay(profile)
  siteAudio.bgmTimer = window.setTimeout(() => {
    if (!siteAudio.horrorMode || !siteAudio.enabled || !siteAudio.unlocked) return
    playBgmStep(profile)
    scheduleNextHellBgmStep(profile)
  }, delay)
}

function playBgmStep(profile) {
  const ctx = ensureAudioContext()
  if (!ctx || !siteAudio.enabled || !siteAudio.unlocked || !profile?.notes?.length) return

  const step = siteAudio.bgmStep % profile.notes.length
  const freq = profile.notes[step]
  const noteGain = profile.gain || 0.045
  const isAccent = step % 4 === 0

  if (profile.horror) {
    const detunePattern = profile.detunePattern || [-211, 97, -144, 263, -318, 41]
    const detune = detunePattern[siteAudio.bgmStep % detunePattern.length]
    const scrapePattern = profile.scrapePattern || [118, 147, 193, 271, 333, 419]
    const tempoState = siteAudio.horrorTempoState || 'drag'
    const isAccent = step % 4 === 0 || tempoState === 'dead'
    const isPanic = tempoState === 'panic' || tempoState === 'stutter'
    const isDeadAir = tempoState === 'dead' && Math.random() < 0.38
    const slideRatio = isPanic ? rand(0.18, 2.85) : isAccent ? rand(0.34, 0.68) : rand(0.74, 1.42)
    const secondFreq = clampValue(freq * (siteAudio.bgmStep % 2 === 0 ? 1.4142 : 1.033), 24, 760)
    const thirdFreq = clampValue(freq * (siteAudio.bgmStep % 3 === 0 ? 2.973 : 0.515), 22, 920)

    if (!isDeadAir) {
      playTone(freq, {
        duration: isPanic ? rand(0.16, 0.48) : isAccent ? rand(1.1, 2.4) : rand(0.48, 1.16),
        gain: noteGain * (isPanic ? rand(0.62, 1.0) : isAccent ? rand(1.18, 1.58) : rand(0.82, 1.12)),
        type: profile.wave || 'sawtooth',
        destination: siteAudio.bgmGain,
        detune,
        slideTo: clampValue(freq * slideRatio, 18.5, 780),
        attack: isPanic ? 0.003 : isAccent ? 0.13 : 0.035,
        release: isPanic ? rand(0.08, 0.24) : isAccent ? rand(1.3, 2.7) : rand(0.58, 1.1)
      })

      playTone(secondFreq, {
        duration: isPanic ? rand(0.09, 0.32) : isAccent ? rand(0.9, 1.8) : rand(0.34, 0.84),
        gain: noteGain * (isPanic ? 0.38 : 0.58),
        type: 'square',
        destination: siteAudio.bgmGain,
        delay: rand(0.004, isPanic ? 0.028 : 0.065),
        detune: -detune * rand(0.72, 1.18),
        slideTo: clampValue(secondFreq * rand(0.58, 1.38), 18.5, 840),
        attack: isPanic ? 0.002 : 0.022,
        release: isPanic ? rand(0.06, 0.2) : rand(0.42, 1.1)
      })
    }

    if (siteAudio.bgmStep % 2 === 1 || isPanic) {
      playTone(thirdFreq, {
        duration: isPanic ? rand(0.045, 0.18) : rand(0.16, 0.54),
        gain: noteGain * (isPanic ? 0.24 : 0.2),
        type: 'sawtooth',
        destination: siteAudio.bgmGain,
        delay: isPanic ? rand(0.006, 0.04) : rand(0.04, 0.12),
        detune: detunePattern[(siteAudio.bgmStep + 4) % detunePattern.length],
        slideTo: clampValue(thirdFreq * rand(0.42, 1.72), 18.5, 980),
        attack: 0.004,
        release: isPanic ? rand(0.04, 0.16) : rand(0.18, 0.5)
      })
    }

    if (profile.chords?.length && profile.chordEvery && siteAudio.bgmStep % profile.chordEvery === 0) {
      const chord = profile.chords[(siteAudio.bgmStep / profile.chordEvery) % profile.chords.length]
      chord.forEach((chordFreq, index) => {
        playTone(chordFreq, {
          duration: isPanic ? rand(0.22, 0.7) : rand(2.6, 5.2),
          gain: noteGain * (index === 0 ? 0.66 : 0.28),
          type: index === 0 ? 'sine' : index % 2 ? 'sawtooth' : 'square',
          destination: siteAudio.bgmGain,
          delay: index * rand(0.012, isPanic ? 0.04 : 0.095),
          detune: detunePattern[(siteAudio.bgmStep + index + 2) % detunePattern.length],
          slideTo: clampValue(chordFreq * (index % 2 ? rand(0.86, 0.98) : rand(1.05, 1.24)), 18.5, 360),
          attack: isPanic ? 0.01 : rand(0.18, 0.48),
          release: isPanic ? rand(0.2, 0.7) : rand(2.1, 4.2)
        })
      })
    }

    if (siteAudio.bgmStep % (isPanic ? 1 : 3) !== 1) {
      const scrapeFreq = scrapePattern[siteAudio.bgmStep % scrapePattern.length]
      playNoise({
        duration: isPanic ? rand(0.06, 0.22) : rand(0.28, 0.96),
        gain: noteGain * rand(0.16, isPanic ? 0.58 : 0.44),
        filterFreq: scrapeFreq * rand(0.75, 1.42),
        filterType: Math.random() < 0.64 ? 'bandpass' : 'highpass',
        filterQ: rand(7, 24),
        destination: siteAudio.bgmGain
      })
    }

    if (isPanic && Math.random() < 0.36) {
      playNoise({ duration: rand(0.035, 0.12), gain: noteGain * rand(0.22, 0.48), filterFreq: rand(2600, 8800), filterType: 'highpass', filterQ: 0.7, destination: siteAudio.bgmGain })
    }

    if (siteAudio.bgmStep % 9 === 5 || (tempoState === 'dead' && Math.random() < 0.18)) {
      playHellModeStinger({ violent: tempoState === 'dead' && Math.random() < 0.45 })
    }

    if (siteAudio.bgmStep % 5 === 2) {
      triggerHellModeVisualGlitch({ deep: Math.random() < 0.22, duration: rand(70, 190) })
    }

    siteAudio.bgmStep += 1
    return
  }

  playTone(freq, {
    duration: isAccent ? 0.42 : 0.28,
    gain: isAccent ? noteGain * 1.25 : noteGain,
    type: profile.wave || 'sine',
    destination: siteAudio.bgmGain,
    release: isAccent ? 0.42 : 0.26
  })

  if (profile.chords?.length && profile.chordEvery && siteAudio.bgmStep % profile.chordEvery === 0) {
    const chord = profile.chords[(siteAudio.bgmStep / profile.chordEvery) % profile.chords.length]
    chord.forEach((chordFreq, index) => {
      playTone(chordFreq, {
        duration: 1.55,
        gain: noteGain * 0.32,
        type: 'sine',
        destination: siteAudio.bgmGain,
        delay: index * 0.015,
        attack: 0.08,
        release: 1.25
      })
    })
  }

  siteAudio.bgmStep += 1
}

function stopBgm() {
  if (siteAudio.bgmTimer) {
    clearInterval(siteAudio.bgmTimer)
    siteAudio.bgmTimer = null
  }
  siteAudio.bgmProfileKey = ''
  siteAudio.bgmStep = 0
}

function startBgmForScreen(screenKey = currentScreenKey) {
  if (!siteAudio.enabled || !siteAudio.unlocked) return

  const ctx = ensureAudioContext()
  if (!ctx) return

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }

  const profile = getActiveBgmProfile(getBgmProfileForScreen(screenKey))
  if (!profile) return
  if (siteAudio.bgmProfileKey === profile.key && siteAudio.bgmTimer) return

  stopBgm()
  syncBgmFilterForMode()
  siteAudio.bgmProfileKey = profile.key
  siteAudio.bgmStep = 0
  playBgmStep(profile)

  if (profile.horror) {
    scheduleNextHellBgmStep(profile)
  } else {
    siteAudio.bgmTimer = window.setInterval(() => playBgmStep(profile), profile.interval || 820)
  }
}

function unlockSiteAudio() {
  if (!siteAudio.enabled) return

  const ctx = ensureAudioContext()
  if (!ctx) return

  siteAudio.unlocked = true
  ctx.resume().then(() => {
    if (siteAudio.horrorMode) {
      forceHellModeAudioLock()
      scheduleHellModeStingers()
    }
    startBgmForScreen(currentScreenKey)
  }).catch(() => {})
}

function setSiteAudioEnabled(enabled) {
  if (siteAudio.horrorMode && !enabled) {
    forceHellModeAudioLock({ restart: true })
    playHellModeStinger({ immediate: true })
    return
  }

  siteAudio.enabled = Boolean(enabled)

  try {
    localStorage.setItem(AUDIO_STORAGE_KEY, siteAudio.enabled ? 'on' : 'off')
  } catch (error) {}

  updateAudioToggleButton()

  if (!siteAudio.enabled) {
    stopBgm()
    if (siteAudio.ctx?.state === 'running') {
      siteAudio.ctx.suspend().catch(() => {})
    }
    return
  }

  unlockSiteAudio()
  playSfx('select')
}

function toggleSiteAudio() {
  setSiteAudioEnabled(!siteAudio.enabled)
}

function handleAudioPointerUnlock(event) {
  if (event.isPrimary === false) return

  uiAudioPointerState = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    moved: false
  }

  unlockSiteAudio()
}

function handleAudioPointerMove(event) {
  if (!uiAudioPointerState || event.pointerId !== uiAudioPointerState.pointerId) return

  const distanceX = Math.abs(event.clientX - uiAudioPointerState.startX)
  const distanceY = Math.abs(event.clientY - uiAudioPointerState.startY)

  if (Math.max(distanceX, distanceY) > UI_TAP_MOVE_THRESHOLD_PX) {
    uiAudioPointerState.moved = true
  }
}

function finishAudioPointerTracking(shouldSuppressClick = false) {
  if (!uiAudioPointerState) return

  if (uiAudioPointerState.moved || shouldSuppressClick) {
    uiAudioSuppressClickUntil = performance.now() + UI_SWIPE_CLICK_SUPPRESS_MS
  }

  uiAudioPointerState = null
}

function handleAudioPointerEnd(event) {
  if (!uiAudioPointerState || event.pointerId !== uiAudioPointerState.pointerId) return
  finishAudioPointerTracking(false)
}

function handleAudioPointerCancel(event) {
  if (!uiAudioPointerState || event.pointerId !== uiAudioPointerState.pointerId) return
  finishAudioPointerTracking(true)
}

function handleAudioClick(event) {
  const target = event.target instanceof Element ? event.target : null

  unlockSiteAudio()

  if (target?.closest('#audioToggleBtn')) {
    return
  }

  if (performance.now() < uiAudioSuppressClickUntil) {
    return
  }

  playUiClickSfx(target)
}

function handleAudioHover(event) {
  if (APP_PERFORMANCE_PROFILE.constrained) return
  if (!siteAudio.enabled || !siteAudio.unlocked || !window.matchMedia('(pointer: fine)').matches) return

  const target = event.target instanceof Element ? event.target.closest('button, a, .game-item, .luck-carousel-dot, .physical-carousel-dot') : null
  if (!target || target === siteAudio.lastHoverTarget) return

  const now = performance.now()
  if (now < siteAudio.hoverReadyAt) return

  siteAudio.lastHoverTarget = target
  siteAudio.hoverReadyAt = now + 140
  playSfx('hover')
}

function installSiteAudioInteractions() {
  updateHellModeControls()
  updateAudioToggleButton()

  document.addEventListener('pointerdown', handleAudioPointerUnlock, true)
  document.addEventListener('pointermove', handleAudioPointerMove, true)
  document.addEventListener('pointerup', handleAudioPointerEnd, true)
  document.addEventListener('pointercancel', handleAudioPointerCancel, true)
  document.addEventListener('click', handleAudioClick, true)
  document.addEventListener('pointerover', handleAudioHover, true)

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', toggleSiteAudio)
  }

  if (bgmVolumeRange) {
    bgmVolumeRange.addEventListener('input', handleBgmVolumeInput)
    bgmVolumeRange.addEventListener('change', handleBgmVolumeInput)
  }

  if (sfxVolumeRange) {
    sfxVolumeRange.addEventListener('input', handleSfxVolumeInput)
    sfxVolumeRange.addEventListener('change', handleSfxVolumeInput)
  }

  syncAudioVolumeControls()

  document.addEventListener('visibilitychange', () => {
    if (!siteAudio.ctx) return

    if (document.hidden) {
      stopBgm()
      if (siteAudio.ctx.state === 'running') {
        siteAudio.ctx.suspend().catch(() => {})
      }
      return
    }

    if (siteAudio.enabled && siteAudio.unlocked) {
      siteAudio.ctx.resume().then(() => startBgmForScreen(currentScreenKey)).catch(() => {})
    }
  })
}

function playPopupAudioCue(title, message) {
  const text = `${title || ''} ${typeof message === 'string' ? message : ''}`

  if (/결과|최종|당첨|완주|성공|우승|판다/.test(text)) {
    playSfx('result')
    return
  }

  if (/오류|불가|확인|초과|중복|필요|실패|차단|지원하지|입력/.test(text)) {
    playSfx('error')
    return
  }

  playSfx('popup')
}

function getSavedThemePreference() {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    return 'light'
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

const SIM_BASE_BALL_RADIUS = 22

function shouldUseCompactSimBallRadius() {
  return shouldUseSimResponsiveLayout() && isPortraitMode()
}

function getSimBallRadius(worldWidth = 900, worldHeight = 460) {
  if (!shouldUseCompactSimBallRadius()) {
    return SIM_BASE_BALL_RADIUS
  }

  const arenaScale = Math.min(
    Math.max(1, worldWidth) / 900,
    Math.max(1, worldHeight) / 460
  )

  return Math.round(SIM_BASE_BALL_RADIUS * clampValue(arenaScale, 0.74, 0.82))
}

function getSimBallLineWidth(radius = SIM_BASE_BALL_RADIUS) {
  if (radius < SIM_BASE_BALL_RADIUS) {
    return isDarkThemeEnabled() ? 3 : 2.5
  }

  return isDarkThemeEnabled() ? 4 : 3
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
      const strokeStyle = getSimBallStrokeColor()
      const lineWidth = getSimBallLineWidth(body.circleRadius || SIM_BASE_BALL_RADIUS)
      body.render.fillStyle = player.color
      body.render.strokeStyle = strokeStyle
      body.render.lineWidth = lineWidth
      if (body.plugin) {
        body.plugin.baseStrokeStyle = strokeStyle
        body.plugin.baseLineWidth = lineWidth
      }
    })
    if (simBattleFinished) {
      renderSimCanvasOnce()
    }
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
        horse.runnerEl.style.setProperty('background', horse.color, 'important')
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

  if (siteAudio.horrorMode) {
    themeToggleBtn.setAttribute('aria-pressed', 'true')
    themeToggleBtn.setAttribute('aria-label', '지옥 모드 잠김')
    themeToggleBtn.title = '지옥 모드: 새로고침 전까지 해제 불가'
    themeToggleBtn.classList.add('is-hell-locked')
    if (themeToggleIcon) themeToggleIcon.textContent = '☠'
    if (themeToggleLabel) themeToggleLabel.textContent = '지옥 모드'
    return
  }

  const isDark = isDarkThemeEnabled()
  const nextActionText = isDark ? '낮 모드로 전환' : '밤 모드로 전환'

  themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false')
  themeToggleBtn.setAttribute('aria-label', nextActionText)
  themeToggleBtn.title = nextActionText
  themeToggleBtn.classList.remove('is-hell-locked')

  if (themeToggleIcon) {
    themeToggleIcon.textContent = isDark ? '☀️' : '🌙'
  }

  if (themeToggleLabel) {
    themeToggleLabel.textContent = isDark ? '낮 모드' : '밤 모드'
  }
}

function applyThemePreference(theme, options = {}) {
  if (siteAudio.horrorMode) {
    updateHellModeControls()
    return
  }

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
  if (siteAudio.horrorMode) {
    forceHellModeAudioLock({ restart: true })
    playHellModeStinger({ immediate: true })
    return
  }

  registerThemeHorrorEasterEggTap()
  if (siteAudio.horrorMode) return
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

  playPopupAudioCue(title, message)
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

function shouldUseVerticalRaceTrack() {
  return window.innerHeight > window.innerWidth && window.innerWidth <= 1024
}

function syncRaceTrackOrientationClass() {
  const shouldUseVerticalTrack = shouldUseVerticalRaceTrack()
  document.body.classList.toggle('race-vertical-track-mode', shouldUseVerticalTrack)

  if (raceTrackWrap) {
    raceTrackWrap.classList.toggle('is-vertical-track-wrap', shouldUseVerticalTrack)
    raceTrackWrap.style.setProperty('--race-lane-count', String(Math.max(1, raceHorses.length || 1)))
  }

  const laneStack = raceTrackWrap?.querySelector('.race-track-lanes')
  if (laneStack) {
    laneStack.classList.toggle('is-vertical-track', shouldUseVerticalTrack)
  }

  raceHorses.forEach((horse) => updateHorsePosition(horse))
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
    let selectedGame = button.dataset.game

    if (selectedGame === '8') {
      const smartPick = window.RandomRouletteRegistry?.pickEligibleGameScreen?.()
      if (!smartPick) return
      showScreen(smartPick)
      return
    }

    if (selectedGame === 'wheel') {
      showScreen('wheel')
      return
    }

    const targetScreen = `game${selectedGame}`
    const eligibility = window.RandomRouletteRegistry?.getEligibility?.(targetScreen)
    if (eligibility && !eligibility.ok) {
      showPopup('현재 명단으로 실행 불가', eligibility.reason, { icon: '👥' })
      return
    }

    if (selectedGame === '1') showScreen('game1')
    if (selectedGame === '2') showScreen('game2')
    if (selectedGame === '3') showScreen('game3')
    if (selectedGame === '4') showScreen('game4')
    if (selectedGame === '5') showScreen('game5')
    if (selectedGame === '6') showScreen('game6')
    if (selectedGame === '7') showScreen('game7')
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

function bindGameCatalogItemInteraction(button) {
  if (!button) return
  if (button.classList.contains('physical-game-launch')) {
    bindPhysicalGameItemInteraction(button)
    return
  }
  bindLuckGameItemInteraction(button)
}

function getVisibleLuckCarouselItems(items) {
  return items.filter((item) => !item.hidden && !item.classList.contains('is-device-hidden') && window.getComputedStyle(item).display !== 'none')
}

function getLuckCarouselOriginalItems() {
  return luckGameGrid
    ? getVisibleLuckCarouselItems([...luckGameGrid.querySelectorAll('.game-item:not([data-clone])')])
    : []
}

function getLuckCarouselTrackItems() {
  return luckGameGrid
    ? getVisibleLuckCarouselItems([...luckGameGrid.querySelectorAll('.game-item')])
    : []
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
    bindGameCatalogItemInteraction(item)
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
    delete prependClone.dataset.luckGameBound
    delete prependClone.dataset.physicalGameBound
    bindGameCatalogItemInteraction(prependClone)
    prependFragment.appendChild(prependClone)

    const appendClone = item.cloneNode(true)
    appendClone.dataset.clone = 'append'
    appendClone.dataset.loopSet = 'append'
    appendClone.dataset.carouselIndex = item.dataset.carouselIndex
    appendClone.removeAttribute('id')
    delete appendClone.dataset.luckGameBound
    delete appendClone.dataset.physicalGameBound
    bindGameCatalogItemInteraction(appendClone)
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
  if (luckCarouselCounter) {
    luckCarouselCounter.textContent = originalItems.length ? `${safeIndex + 1} / ${originalItems.length}` : '0 / 0'
  }

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

  if (!originalItems.length) {
    if (luckCarouselCounter) luckCarouselCounter.textContent = '0 / 0'
    return
  }

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
  const targetByGame = {
    balloon: 'physicalBalloon',
    'bomb-pass': 'physicalBomb',
    'shrinking-circle': 'physicalCircle',
    'stay-click': 'physicalKeyReact',
    'bear-find': 'physicalBearFind'
  }
  const targetScreen = targetByGame[button.dataset.physicalGame]
  if (!targetScreen) return

  const eligibility = window.RandomRouletteRegistry?.getEligibility?.(targetScreen)
  if (eligibility && !eligibility.ok) {
    showPopup('현재 환경에서 실행 불가', eligibility.reason, { icon: '👥' })
    return
  }

  showScreen(targetScreen)
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
    !scoreboardCard
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

    mobileLayoutApplied = false
  }
}

function syncRaceMobileLayout() {
  // Keep the track-orientation sync independent from optional mobile header/back-button DOM.
  // Some builds do not include a race back button, and an early return here made portrait
  // phones keep the normal horizontal lanes.
  syncRaceTrackOrientationClass()

  if (!raceLayout || !raceSidebar || !raceMain || !raceMainHeader) {
    return
  }

  const shouldUseMobileLayout = isMobileOrTabletLike()
  document.body.classList.toggle('game2-mobile-layout', shouldUseMobileLayout)

  if (shouldUseMobileLayout && !raceMobileLayoutApplied) {
    if (raceMainHeader.parentElement !== raceLayout) {
      raceLayout.insertBefore(raceMainHeader, raceLayout.firstChild)
    }

    raceMobileLayoutApplied = true
    return
  }

  if (!shouldUseMobileLayout && raceMobileLayoutApplied) {
    if (raceMainHeader.parentElement !== raceMain) {
      raceMain.insertBefore(raceMainHeader, raceMain.firstChild)
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


function scrollBalloonStageIntoViewAfterStart() {
  if (!isMobileOrTabletLike()) return

  const target = document.querySelector('#physicalBalloonScreen .balloon-stage-card') || balloonPressArea
  if (!target) return

  const scrollToTarget = () => {
    const rect = target.getBoundingClientRect()
    const currentY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    const top = Math.max(0, currentY + rect.top - 12)

    try {
      window.scrollTo({ top, behavior: 'smooth' })
    } catch (error) {
      window.scrollTo(0, top)
    }
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(scrollToTarget)
  })

  setTimeout(scrollToTarget, 160)
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
    case 'luck':
      return 'home'
    case 'menu':
    case 'physical':
      return 'luck'
    case 'wheel':
      return 'luck'
    case 'physicalBalloon':
    case 'physicalBomb':
    case 'physicalCircle':
    case 'physicalKeyReact':
    case 'physicalBearFind':
      return 'luck'
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
  if (target === 'menu' || target === 'physical') target = 'luck'
  if (!screens[target]) return

  const { historyMode = 'push', force = false } = options
  const previousScreenKey = currentScreenKey

  if (!force && target !== previousScreenKey && window.RandomRouletteSession?.shouldConfirmExit?.(previousScreenKey)) {
    window.RandomRouletteSession.requestNavigation({
      target,
      message: '현재 게임이 진행 중이야. 이동하면 진행 상황이 사라져.',
      onConfirm: () => showScreen(target, { ...options, force: true }),
      onCancel: () => {
        if (historyMode === 'skip') {
          // popstate는 이미 브라우저 기록을 이전 항목으로 이동시킨 뒤 발생한다.
          // 이동을 취소했다면 현재 게임 화면을 다시 push해 기록 위치도 함께 복원한다.
          commitScreenHistory(previousScreenKey, 'push')
        }
      }
    })
    return
  }

  releaseAllFastForward()

  const leavingWheel = previousScreenKey === 'wheel' && target !== 'wheel'
  const leavingGame1 = previousScreenKey === 'game1' && target !== 'game1'
  const leavingGame2 = previousScreenKey === 'game2' && target !== 'game2'
  const leavingGame3 = previousScreenKey === 'game3' && target !== 'game3'
  const leavingGame4 = previousScreenKey === 'game4' && target !== 'game4'
  const leavingGame5 = previousScreenKey === 'game5' && target !== 'game5'
  const leavingGame6 = previousScreenKey === 'game6' && target !== 'game6'
  const leavingGame7 = previousScreenKey === 'game7' && target !== 'game7'
  const leavingBalloon = previousScreenKey === 'physicalBalloon' && target !== 'physicalBalloon'
  const leavingBomb = previousScreenKey === 'physicalBomb' && target !== 'physicalBomb'
  const leavingCircle = previousScreenKey === 'physicalCircle' && target !== 'physicalCircle'
  const leavingKeyReact = previousScreenKey === 'physicalKeyReact' && target !== 'physicalKeyReact'
  const leavingBearFind = previousScreenKey === 'physicalBearFind' && target !== 'physicalBearFind'
  closePopup({ force: true })
  Object.values(screens).forEach((screen) => screen?.classList.remove('active'))
  screens[target].classList.add('active')
  forceScrollToTop()

  if (leavingWheel) {
    window.RandomRouletteWheel?.cancelSpin?.()
  }

  document.body.classList.toggle('home-screen-mode', target === 'home')
  document.body.classList.toggle('menu-screen-mode', target === 'menu')
  document.body.classList.toggle('physical-screen-mode', target === 'physical')
  document.body.classList.toggle('luck-screen-mode', target === 'luck')
  document.body.classList.toggle('physical-balloon-mode', target === 'physicalBalloon')
  document.body.classList.toggle('physical-bomb-mode', target === 'physicalBomb')
  document.body.classList.toggle('physical-circle-mode', target === 'physicalCircle')
  document.body.classList.toggle('physical-bearfind-mode', target === 'physicalBearFind')
  document.body.classList.toggle('key-react-compact-mode', target === 'physicalKeyReact')

  document.body.classList.toggle('game1-mode', target === 'game1')
  if (leavingGame1) {
    stopGame1LiveRound()
    setDrawerState(false)
  }

  if (leavingGame2) {
    closeRaceTrackZoom()
    stopRaceLoop()
    raceFinished = false
    resetRaceHorseStates()
    setRaceInputLock(false)
    setRaceShuffleLock(false)
  }

  if (leavingGame3) {
    stopBattleFlow()
    setBattleInputLock(false)
    setBattleShuffleLock(false)
  }

  if (leavingGame4) {
    resetSim()
  }

  if (leavingGame5) {
    closeRouletteStageZoom()
    stopNavalGame({ preserveBoard: false })
    setNavalInputLock(false)
  }

  if (leavingGame6) {
    stopStockGame({ preserveSetup: true })
    setStockInputLock(false)
    setStockSetupLock(false)
  }

  if (leavingGame7) {
    ladderRunToken += 1
    stopLadderProgressAnimation()
    ladderAutoRunning = false
    ladderActivePlayerId = ''
    setLadderInputLock(false)
  }

  if (leavingBalloon) {
    stopBalloonHold()
  }

  if (leavingBomb) {
    stopBombPassGame()
  }

  if (leavingCircle) {
    stopCircleTapGame({ preservePlayers: true })
  }

  if (leavingKeyReact) {
    stopKeyReactGame({ preservePlayers: true })
  }


  if (leavingBearFind) {
    stopBearFindPlayback()
  }

  if (target === 'luck') {
    syncLuckCarousel({ align: true })
    window.RandomRouletteRegistry?.refreshCards?.()
  }

  if (target === 'physical') {
    syncPhysicalCarousel({ align: true })
    window.RandomRouletteRegistry?.refreshCards?.()
  }

  if (target === 'wheel') {
    window.RandomRouletteWheel?.ensureReady?.()
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


  if (target === 'physicalBearFind') {
    ensureBearFindReady()
    forceScrollToTop()
  }

  document.body.classList.toggle('app-active-game', target === 'wheel' || /^game\d+$/.test(target) || target === 'physicalBalloon' || target === 'physicalBomb' || target === 'physicalCircle' || target === 'physicalKeyReact' || target === 'physicalBearFind')
  updateOrientationGate()

  currentScreenKey = target
  updatePrevStepButtons()
  scheduleGameStartButtonStateSync()

  if (target !== previousScreenKey) {
    playSfx('screen')
  }

  startBgmForScreen(target)

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
