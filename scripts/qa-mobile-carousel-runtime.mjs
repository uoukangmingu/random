import { readFile } from 'node:fs/promises'
import path from 'node:path'
import vm from 'node:vm'

const root = path.resolve(import.meta.dirname, '..')
const [coreSource, html, appSource] = await Promise.all([
  readFile(path.join(root, 'src/games/core.js'), 'utf8'),
  readFile(path.join(root, 'index.html'), 'utf8'),
  readFile(path.join(root, 'script.js'), 'utf8')
])

const functionSource = coreSource.match(/function getWrappedLuckCarouselIndex\(index, itemCount\) \{[\s\S]*?\n\}/)?.[0]
const visibleFunctionSource = coreSource.match(/function getVisibleLuckCarouselItems\(items\) \{[\s\S]*?\n\}/)?.[0]
const indexedItemFunctionSource = coreSource.match(/function getLuckCarouselItemByIndex\(items, targetIndex\) \{[\s\S]*?\n\}/)?.[0]
if (!functionSource || !visibleFunctionSource || !indexedItemFunctionSource) {
  throw new Error('모바일 게임 메뉴 순환 또는 표시 카드 필터 함수 누락')
}

const context = {
  window: {
    getComputedStyle: (item) => ({ display: item.display })
  }
}
vm.createContext(context)
vm.runInContext(`${functionSource}\n${visibleFunctionSource}\n${indexedItemFunctionSource}\nthis.wrapIndex = getWrappedLuckCarouselIndex\nthis.getVisible = getVisibleLuckCarouselItems\nthis.getByIndex = getLuckCarouselItemByIndex`, context)

const mobileCards = [...html.matchAll(/<button class="[^"]*\bgame-item\b[^"]*"[^>]*>/g)]
  .map((match) => match[0])
  .filter((buttonHtml) => !buttonHtml.includes('data-physical-compat="desktop-only"'))

const itemCount = mobileCards.length
if (itemCount !== 13) throw new Error(`모바일 게임 카드 수가 13개가 아님: ${itemCount}`)
if (context.wrapIndex(-1, itemCount) !== 12) throw new Error('1번에서 이전 이동 시 13번으로 순환하지 않음')
if (context.wrapIndex(itemCount, itemCount) !== 0) throw new Error('13번에서 다음 이동 시 1번으로 순환하지 않음')
if (context.wrapIndex(-14, itemCount) !== 12 || context.wrapIndex(26, itemCount) !== 0) {
  throw new Error('연속 순환 시 모바일 게임 메뉴 인덱스가 깨짐')
}

const loopSet = Array.from({ length: itemCount }, (_, index) => index)
const loopTrack = [...loopSet, ...loopSet, ...loopSet]
const centerFirstPosition = itemCount
const centerLastPosition = itemCount * 2 - 1
if (loopTrack[centerFirstPosition - 1] !== itemCount - 1 || loopTrack[centerLastPosition + 1] !== 0) {
  throw new Error('복제 묶음에서 1번 좌측 13번 또는 13번 우측 1번이 인접하지 않음')
}

const mockItem = (carouselIndex, display = 'flex', deviceHidden = false) => ({
  dataset: { carouselIndex: String(carouselIndex) },
  hidden: false,
  display,
  classList: { contains: (name) => name === 'is-device-hidden' && deviceHidden }
})
const visibleCenterItems = Array.from({ length: 12 }, (_, index) => mockItem(index))
const staleDesktopItem = mockItem(12, 'none')
const actualThirteenthItem = mockItem(12)
const normalizedItems = context.getVisible([...visibleCenterItems, staleDesktopItem, actualThirteenthItem])
const normalizedTarget = context.getByIndex(normalizedItems, 12)

if (normalizedItems.includes(staleDesktopItem) || normalizedTarget !== actualThirteenthItem) {
  throw new Error('숨겨진 PC 카드의 이전 인덱스 때문에 13번 정규화 대상이 잘못 선택됨')
}
for (const marker of [
  "addEventListener('touchstart', handleLuckCarouselTouchStart, { passive: true })",
  "addEventListener('touchend', finishLuckCarouselTouch, { passive: true })",
  "addEventListener('touchcancel', finishLuckCarouselTouch, { passive: true })",
  "addEventListener('scrollend', handleLuckCarouselScrollEnd, { passive: true })",
  'LUCK_CAROUSEL_SETTLE_DELAY_MS = 240',
  'LUCK_CAROUSEL_CLICK_DRAG_THRESHOLD_PX = 6'
]) {
  if (!appSource.includes(marker)) throw new Error(`iPhone 네이티브 스크롤 안전장치 누락: ${marker}`)
}
for (const removedMarker of ['handleLuckCarouselPointerUp', 'handleLuckCarouselPointerCancel', 'moveLuckCarouselBySwipe', 'getLuckCarouselSwipeDirection']) {
  if (appSource.includes(removedMarker)) throw new Error(`Safari pointercancel 의존 로직이 남아 있음: ${removedMarker}`)
}

const styleSource = await readFile(path.join(root, 'style.css'), 'utf8')
const mobileCarouselStyle = styleSource.match(/body\.luck-carousel-mode #luckScreen \.game-grid \{[\s\S]*?body\.luck-carousel-mode #luckScreen \.game-item\.is-carousel-neighbor/)?.[0] || ''
for (const marker of ['touch-action: pan-x pan-y pinch-zoom', 'scroll-snap-stop: always', 'touch-action: inherit']) {
  if (!mobileCarouselStyle.includes(marker)) throw new Error(`네이티브 모바일 스크롤 스타일 누락: ${marker}`)
}
if (mobileCarouselStyle.includes('touch-action: pan-y pinch-zoom')) {
  throw new Error('가로 네이티브 스크롤을 막는 이전 touch-action 규칙이 남아 있음')
}

console.log(JSON.stringify({
  mobileCards: itemCount,
  previousFromOne: context.wrapIndex(-1, itemCount) + 1,
  nextFromThirteen: context.wrapIndex(itemCount, itemCount) + 1,
  hiddenDesktopIndexExcluded: true,
  thirteenthNormalizationTarget: 13,
  nativeAdjacentLoop: '13←1→2 / 12←13→1',
  nativeHorizontalScroll: true,
  safariPointerCancelDependency: false,
  scrollSettleDelayMs: 240,
  verticalScrollPreserved: true,
  bidirectionalLoop: true
}))
