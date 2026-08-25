import { execFileSync } from 'node:child_process'
import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import vm from 'node:vm'
import { webcrypto } from 'node:crypto'

const root = process.cwd()
const requiredFiles = [
  'index.html', 'dist/app.js', 'dist/app.css', 'random-roulette.v3.10.js', 'random-roulette.v3.10.css', 'app.bundle.js', 'app.bundle.css', 'script.min.js', 'style.min.css', 'volume-controls.js', 'manifest.webmanifest', 'sw.js',
  'assets/matter.min.js', 'assets/app-icon.svg', 'assets/app-icon-192.png', 'assets/app-icon-512.png'
]

for (const relativePath of requiredFiles) await access(path.join(root, relativePath))
execFileSync(process.execPath, ['--check', path.join(root, 'dist', 'app.js')], { stdio: 'inherit' })
execFileSync(process.execPath, ['--check', path.join(root, 'sw.js')], { stdio: 'inherit' })

const html = await readFile(path.join(root, 'index.html'), 'utf8')
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))]
if (duplicateIds.length) throw new Error(`중복 HTML id: ${duplicateIds.join(', ')}`)

for (const marker of ['wheelScreen', 'rosterOverlay', 'sessionConfirmOverlay', 'manifest.webmanifest', 'volume-controls.js', 'random-roulette.v3.10.js', '__RANDOM_ROULETTE_FORCE_EMOJI_FALLBACK__', 'emoji-text-fallback', '랜덤 게임 목록', 'unified-game-grid', 'catalogAvailabilitySummary', 'catalogRosterEditBtn', 'luckCarouselCounter', 'utilitySettingsPanel', 'utilitySettingsToggleBtn', 'utilitySettingsCloseBtn', '공용 목록', '입력 비우기', 'aria-label="공용 목록 열기"', 'aria-describedby="rosterDialogDescription"', 'aria-describedby="popupMessage"']) {
  if (!html.includes(marker)) throw new Error(`필수 마커 누락: ${marker}`)
}
for (const removedMarker of ['id="menuScreen"', 'id="physicalScreen"', 'id="physicalGameGrid"', '>운 게임 목록<', '>피지컬 게임 목록<', 'class="physical-compat-badge', '모바일 · PC</span>', 'PC 전용</span>', '현재 명단 실행 불가', '참가자 명단 수정', '공용 참가자 명단']) {
  if (html.includes(removedMarker)) throw new Error(`제거 대상 메뉴가 남아 있음: ${removedMarker}`)
}
const randomPickIndex = html.indexOf('data-game="8"')
const wheelIndex = html.indexOf('data-game="wheel"')
if (randomPickIndex < 0 || wheelIndex < 0 || randomPickIndex > wheelIndex) throw new Error('랜덤 게임 뽑기가 목록 첫 카드가 아님')
if (/class="[^"]*\bback-btn\b/.test(html) || html.includes('피지컬 목록으로') || html.includes('운 게임 목록으로')) {
  throw new Error('전역 이전 버튼과 중복되는 게임 내부 목록 복귀 버튼이 남아 있음')
}

const app = await readFile(path.join(root, 'dist', 'app.js'), 'utf8')
const rootApp = await readFile(path.join(root, 'script.min.js'), 'utf8')
const appCss = await readFile(path.join(root, 'dist', 'app.css'), 'utf8')
const rootCss = await readFile(path.join(root, 'style.min.css'), 'utf8')
const deployApp = await readFile(path.join(root, 'app.bundle.js'), 'utf8')
const deployCss = await readFile(path.join(root, 'app.bundle.css'), 'utf8')
const versionedApp = await readFile(path.join(root, 'random-roulette.v3.10.js'), 'utf8')
const versionedCss = await readFile(path.join(root, 'random-roulette.v3.10.css'), 'utf8')
if (rootApp !== app || deployApp !== app || versionedApp !== app || rootCss !== appCss || deployCss !== appCss || versionedCss !== appCss) {
  throw new Error('배포용 루트 번들이 dist 빌드와 일치하지 않음')
}
if (!app.includes('\n;\n/* ===== src/shared/game-engine.js ===== */')) {
  throw new Error('모듈 결합 경계 세미콜론 누락')
}
if (!app.includes("if (historyMode === 'skip')") || !app.includes("commitScreenHistory(previousScreenKey, 'push')")) {
  throw new Error('진행 중 이동 취소 시 화면 기록 복원 로직 누락')
}
for (const marker of ['RandomRouletteWheel', 'RandomRouletteRoster', 'RandomRouletteRegistry', 'RandomRouletteWakeLock', 'RandomRouletteUtilitySettings']) {
  if (!app.includes(marker)) throw new Error(`빌드 기능 누락: ${marker}`)
}
for (const marker of ['getSpinMotionProfile', 'getSpinEasedProgress', 'SPIN_DECELERATION_RATIO = 0.60', 'setCanvasSpinTransform', 'clearCanvasSpinTransform']) {
  if (!app.includes(marker)) throw new Error(`룰렛 감속 로직 누락: ${marker}`)
}
for (const marker of ['handlePopupDialogKeydown', 'popupLastFocusedElement', 'getFocusableElements(elements.overlay)', "event.key === 'Escape'", 'isBlockingAppDialogVisible', 'canRestorePopupFocus', 'handleBlockingDialogClosed', 'app-dialog-closed']) {
  if (!app.includes(marker)) throw new Error(`대화상자 접근성 로직 누락: ${marker}`)
}
for (const marker of ['.utility-settings-panel', '.utility-quick-actions', '.utility-settings-panel .utility-volume-panel', 'display: grid !important', 'padding-bottom: calc(78px + env(safe-area-inset-bottom))']) {
  if (!appCss.includes(marker)) throw new Error(`접이식 설정 패널 스타일 누락: ${marker}`)
}
for (const marker of ['app-native-text-cursor', 'cursor: text !important', 'z-index: 10080']) {
  if (!app.includes(marker) && !appCss.includes(marker)) throw new Error(`입력 커서 안전장치 누락: ${marker}`)
}
for (const marker of ["showScreen('luck')", 'pickEligibleGameScreen', 'bindGameCatalogItemInteraction', "badgeText: '불가'", 'getEntryAvailability']) {
  if (!app.includes(marker)) throw new Error(`통합 게임 목록 로직 누락: ${marker}`)
}
for (const marker of ['restoreCatalogOrder', 'setDeviceVisibility', 'syncCatalogDeviceClass', 'catalog-desktop-device', 'userAgentData?.mobile', 'hasDesktopIdentity', 'getDeviceCompatibleGameScreens', 'listReadiness', 'roulette-shared-list-change', 'resetDraft', 'roulette-catalog-refreshed', 'LADDER_MOBILE_MAX_PLAYERS = 5']) {
  if (!app.includes(marker)) throw new Error(`게임 목록 UX 로직 누락: ${marker}`)
}
for (const marker of ['.catalog-availability-bar', '.game-item.is-device-hidden', 'html:not(.catalog-handheld-device)', 'catalog-desktop-device', 'data-physical-compat="mobile-only"', '--luck-carousel-peek: 10px', '#utilitySettingsPanel .app-settings-action', 'grid-template-columns: repeat(2, minmax(0, 1fr)) !important', 'max-height: min(60dvh, 360px) !important', '.utility-settings-head']) {
  if (!appCss.includes(marker)) throw new Error(`게임 목록 UX 스타일 누락: ${marker}`)
}
for (const removedMarker of ['game-eligibility-overlay', 'is-roster-ineligible', 'sortCatalogCards', '현재 명단으로 실행 불가']) {
  if (app.includes(removedMarker) || appCss.includes(removedMarker)) throw new Error(`이전 명단 차단 UX가 남아 있음: ${removedMarker}`)
}
for (const marker of ['#wheelScreen.screen', 'display: contents', 'width: min(100%, 560px)', 'font: 700 16px/1.6', 'height: clamp(168px, 28dvh, 220px)', 'max-height: min(36dvh, 260px)', '#wheelCanvas.is-spinning', 'will-change: transform']) {
  if (!appCss.includes(marker)) throw new Error(`기본 룰렛 모바일 안전 규칙 누락: ${marker}`)
}
if (app.includes('const duration = reduceMotion ? 180 : 4200')) throw new Error('이전의 짧은 룰렛 회전 시간이 남아 있음')
if (!app.includes("screens[target].classList.add('active')\n  forceScrollToTop()")) {
  throw new Error('화면 전환 시 스크롤 상단 복원 로직 누락')
}
const entryAvailabilityChecks = app.match(/const entryAvailability = window\.RandomRouletteRegistry\?\.getEntryAvailability\?\.\(targetScreen\)/g) || []
if (entryAvailabilityChecks.length < 2) {
  throw new Error('운·피지컬 게임 직접 진입이 공용 목록이 아닌 기기 호환성만 검사하지 않음')
}

const registrySource = await readFile(path.join(root, 'src/games/registry.js'), 'utf8')
function detectHandheld({ userAgent, platform, maxTouchPoints = 0, mobile, coarse = false, noHover = false, width = 1280, height = 800 }) {
  const testNavigator = { userAgent, platform, maxTouchPoints }
  if (typeof mobile === 'boolean') testNavigator.userAgentData = { mobile, platform }
  const context = {
    navigator: testNavigator,
    innerWidth: width,
    innerHeight: height,
    matchMedia(query) {
      return { matches: query === '(pointer: coarse)' ? coarse : query === '(hover: none)' ? noHover : false }
    }
  }
  context.window = context
  vm.createContext(context)
  vm.runInContext(registrySource, context, { filename: 'src/games/registry.js' })
  return context.RandomRouletteRegistry.isPhoneLikeDevice()
}

const deviceCases = [
  {
    name: '터치 가능한 Windows PC',
    expected: false,
    input: { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', platform: 'Windows', maxTouchPoints: 10, mobile: false, coarse: true, noHover: true, width: 800, height: 600 }
  },
  {
    name: '일반 macOS PC',
    expected: false,
    input: { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', platform: 'macOS', mobile: false, width: 1440, height: 900 }
  },
  {
    name: 'Android 태블릿',
    expected: true,
    input: { userAgent: 'Mozilla/5.0 (Linux; Android 14; Tablet)', platform: 'Android', maxTouchPoints: 5, mobile: false, coarse: true, noHover: true, width: 1280, height: 800 }
  },
  {
    name: 'iPadOS 데스크톱 UA',
    expected: true,
    input: { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', platform: 'MacIntel', maxTouchPoints: 5, coarse: true, noHover: true, width: 1024, height: 768 }
  }
]
for (const testCase of deviceCases) {
  const actual = detectHandheld(testCase.input)
  if (actual !== testCase.expected) throw new Error(`${testCase.name} 기기 판정 오류: ${actual}`)
}

const registryContext = {
  navigator: {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    platform: 'Win32',
    maxTouchPoints: 0,
    userAgentData: { mobile: false, platform: 'Windows' }
  },
  innerWidth: 1440,
  innerHeight: 900,
  matchMedia() { return { matches: false } }
}
registryContext.window = registryContext
vm.createContext(registryContext)
vm.runInContext(registrySource, registryContext, { filename: 'src/games/registry.js' })
const registry = registryContext.RandomRouletteRegistry
if (!registry.getEntryAvailability('game6').ok) throw new Error('공용 목록 없이 데스크톱 호환 게임에 입장할 수 없음')
const noListStatus = registry.getEligibility('game6')
if (noListStatus.ok || noListStatus.inputNeeded !== true) throw new Error('공용 목록 없음 상태를 차단이 아닌 게임 내 입력 안내로 판정하지 않음')
if (registry.getDeviceCompatibleGameScreens().length !== 11) throw new Error('데스크톱에서 모바일 전용 2종만 제외되지 않음')

const coreSource = await readFile(path.join(root, 'src/games/core.js'), 'utf8')
const fallbackMapMatch = coreSource.match(/const EMOJI_FALLBACK_MAP = Object\.freeze\((\{[\s\S]*?\})\)\n\nconst EMOJI_FALLBACK_PATTERN/)
if (!fallbackMapMatch) throw new Error('이모지 대체표를 읽을 수 없음')
const fallbackMap = vm.runInNewContext(`(${fallbackMapMatch[1]})`)
const emojiSources = [
  await readFile(path.join(root, 'index.html'), 'utf8'),
  coreSource.replace(fallbackMapMatch[1], '{}'),
  ...await Promise.all([
    'src/games/wheel.js', 'src/games/registry.js', 'src/games/game1-drop.js', 'src/games/game2-race.js',
    'src/games/game3-card-battle.js', 'src/games/game4-ball-battle.js', 'src/games/game5-russian-roulette.js',
    'src/games/game6-stock.js', 'src/games/game7-ladder.js', 'src/games/physical-games.js'
  ].map((relativePath) => readFile(path.join(root, relativePath), 'utf8')))
]
const usedEmoji = new Set()
const sourceEmojiPattern = /\p{Extended_Pictographic}\uFE0F?(?:\u200D\p{Extended_Pictographic}\uFE0F?)*/gu
for (const source of emojiSources) {
  for (const match of source.matchAll(sourceEmojiPattern)) usedEmoji.add(match[0])
}
const missingEmojiFallbacks = [...usedEmoji].filter((emoji) => !Object.hasOwn(fallbackMap, emoji))
if (missingEmojiFallbacks.length) throw new Error(`이모지 대체 누락: ${missingEmojiFallbacks.join(' ')}`)
const unsafeFinalFallbacks = Object.entries(fallbackMap).filter(([, candidates]) => {
  const list = Array.isArray(candidates) ? candidates : [candidates]
  return !Array.from(String(list.at(-1) || '')).every((character) => character.codePointAt(0) <= 0x7f)
})
if (unsafeFinalFallbacks.length) throw new Error(`ASCII 최종 대체 누락: ${unsafeFinalFallbacks.map(([emoji]) => emoji).join(' ')}`)
for (const marker of ['__RANDOM_ROULETTE_FORCE_EMOJI_FALLBACK__', "['\\uFFFF', '\\u{10FFFF}', '\\uE000', '�']", 'matchesMissingGlyph', 'supported = false', 'requestAnimationFrame(runInitialCheck)']) {
  if (!coreSource.includes(marker)) throw new Error(`이모지 렌더링 안전장치 누락: ${marker}`)
}

const volumeUi = await readFile(path.join(root, 'volume-controls.js'), 'utf8')
execFileSync(process.execPath, ['--check', path.join(root, 'volume-controls.js')], { stdio: 'inherit' })
for (const marker of ['--volume-progress', 'bgmVolumeRange', 'sfxVolumeRange', 'aria-valuetext']) {
  if (!volumeUi.includes(marker)) throw new Error(`음량 UI 안전장치 누락: ${marker}`)
}

const duplicateFunctions = [...app.matchAll(/^function\s+([A-Za-z_$][\w$]*)/gm)]
  .map((match) => match[1])
  .filter((name, index, all) => all.indexOf(name) !== index)
if (duplicateFunctions.length) throw new Error(`중복 함수 선언: ${[...new Set(duplicateFunctions)].join(', ')}`)

const logicContext = {
  console,
  Math,
  Date,
  performance,
  crypto: webcrypto,
  Uint32Array,
  setTimeout,
  clearTimeout
}
logicContext.window = logicContext
vm.createContext(logicContext)
for (const relativePath of ['src/shared/rng.js', 'src/shared/game-engine.js', 'src/shared/roster.js', 'src/games/wheel.js']) {
  const source = await readFile(path.join(root, relativePath), 'utf8')
  vm.runInContext(source, logicContext, { filename: relativePath })
}

const rosterParse = logicContext.RandomRouletteRoster.parse('민구\n예빈\n민구')
if (rosterParse.ok || !rosterParse.reason.includes('중복')) throw new Error('공용 목록 중복 검사가 동작하지 않음')
const emptyRosterParse = logicContext.RandomRouletteRoster.parse('  \n  ')
if (!emptyRosterParse.ok || emptyRosterParse.empty !== true || emptyRosterParse.names.length !== 0) {
  throw new Error('빈 공용 목록 저장 판정이 동작하지 않음')
}

class MockHTMLElement {
  constructor() {
    this.value = ''
    this.textContent = ''
    this.disabled = false
    this.isConnected = true
    this.listeners = new Map()
    const classes = new Set()
    this.classList = {
      add: (...items) => items.forEach((item) => classes.add(item)),
      remove: (...items) => items.forEach((item) => classes.delete(item)),
      contains: (item) => classes.has(item),
      toggle: (item, force) => force === undefined
        ? (classes.has(item) ? (classes.delete(item), false) : (classes.add(item), true))
        : (force ? classes.add(item) : classes.delete(item), Boolean(force))
    }
  }
  addEventListener(type, handler) { this.listeners.set(type, handler) }
  click() { this.listeners.get('click')?.({ target: this }) }
  focus() {}
  replaceChildren() {}
  querySelectorAll() { return [] }
}

const rosterElementIds = [
  'rosterOverlay', 'rosterToggleBtn', 'rosterCloseBtn', 'rosterInput', 'rosterPreview',
  'rosterStatus', 'rosterSaveBtn', 'rosterClearBtn', 'rosterCountBadge'
]
const rosterElements = Object.fromEntries(rosterElementIds.map((id) => [id, new MockHTMLElement()]))
rosterElements.rosterOverlay.classList.add('hidden')
const rosterStorage = new Map([['roulette-shared-roster-v1', JSON.stringify(['기존1', '기존2'])]])
const rosterUiContext = {
  console,
  HTMLElement: MockHTMLElement,
  Event: class Event { constructor(type, options = {}) { this.type = type; Object.assign(this, options) } },
  CustomEvent: class CustomEvent { constructor(type, options = {}) { this.type = type; Object.assign(this, options) } },
  localStorage: {
    getItem: (key) => rosterStorage.get(key) ?? null,
    setItem: (key, value) => rosterStorage.set(key, value)
  },
  document: {
    activeElement: null,
    getElementById: (id) => rosterElements[id] || null,
    createElement: () => new MockHTMLElement(),
    addEventListener() {},
    dispatchEvent() {}
  },
  requestAnimationFrame() {},
  setTimeout,
  clearTimeout,
  dispatchEvent() {}
}
rosterUiContext.window = rosterUiContext
vm.createContext(rosterUiContext)
vm.runInContext(await readFile(path.join(root, 'src/shared/roster.js'), 'utf8'), rosterUiContext, { filename: 'src/shared/roster.js' })
rosterUiContext.RandomRouletteRoster.init()
rosterUiContext.RandomRouletteRoster.open()
rosterElements.rosterClearBtn.click()
if (JSON.parse(rosterStorage.get('roulette-shared-roster-v1')).length !== 2) throw new Error('입력 비우기가 저장 목록을 즉시 삭제함')
if (rosterElements.rosterSaveBtn.disabled) throw new Error('빈 공용 목록에서 저장 버튼이 비활성화됨')
rosterElements.rosterSaveBtn.click()
if (JSON.parse(rosterStorage.get('roulette-shared-roster-v1')).length !== 0 || rosterUiContext.RandomRouletteRoster.getCount() !== 0) {
  throw new Error('빈 공용 목록 저장이 기존 저장값을 0개로 갱신하지 않음')
}

const wheelParse = logicContext.RandomRouletteWheel.parseItems('치킨 | 3\n피자 | 1')
if (!wheelParse.ok || wheelParse.items[0].weight !== 3) throw new Error('룰렛 가중치 파싱 실패')
if (logicContext.RandomRouletteWheel.parseItems('치킨 | 1\n치킨 | 2').ok) throw new Error('룰렛 중복 항목 검사가 동작하지 않음')

const mobileSpinProfile = logicContext.RandomRouletteWheel.getSpinMotionProfile({ mobile: true, reduceMotion: false })
const desktopSpinProfile = logicContext.RandomRouletteWheel.getSpinMotionProfile({ mobile: false, reduceMotion: false })
if (mobileSpinProfile.duration !== 7200 || mobileSpinProfile.minTurns !== 10) throw new Error('모바일 룰렛 감속 프로필 오류')
if (desktopSpinProfile.duration !== 6200 || desktopSpinProfile.minTurns !== 9) throw new Error('PC 룰렛 감속 프로필 오류')
const easedAt = (progress) => logicContext.RandomRouletteWheel.getSpinEasedProgress(progress)
const easingSamples = [0, .12, .4, .6, .8, .9, 1].map(easedAt)
if (easingSamples[0] !== 0 || easingSamples.at(-1) !== 1 || easingSamples.some((value, index) => index && value <= easingSamples[index - 1])) {
  throw new Error('룰렛 감속 곡선이 0→1로 단조 증가하지 않음')
}
const middleDistance = easedAt(.7) - easedAt(.6)
const lateDistance = easedAt(.9) - easedAt(.8)
const finalDistance = easedAt(1) - easedAt(.9)
if (!(middleDistance > lateDistance && lateDistance > finalDistance && finalDistance > 0)) {
  throw new Error('룰렛 후반 속도가 단계적으로 감소하지 않음')
}

let firstWins = 0
const sampleItems = [{ label: 'A', weight: 3 }, { label: 'B', weight: 1 }]
for (let seed = 1; seed <= 4000; seed += 1) {
  if (logicContext.RandomRouletteEngine.calculateWeightedOutcome(sampleItems, seed).selectedIndex === 0) firstWins += 1
}
const firstRatio = firstWins / 4000
if (firstRatio < 0.70 || firstRatio > 0.80) throw new Error(`룰렛 가중치 분포 이상: ${firstRatio}`)

execFileSync(process.execPath, [path.join(root, 'scripts', 'qa-wheel-runtime.mjs')], { stdio: 'inherit' })

console.log('정적 검사 통과')
