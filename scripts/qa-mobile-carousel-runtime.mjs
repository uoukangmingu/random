import { readFile } from 'node:fs/promises'
import path from 'node:path'
import vm from 'node:vm'

const root = path.resolve(import.meta.dirname, '..')
const [coreSource, html] = await Promise.all([
  readFile(path.join(root, 'src/games/core.js'), 'utf8'),
  readFile(path.join(root, 'index.html'), 'utf8')
])

const functionSource = coreSource.match(/function getWrappedLuckCarouselIndex\(index, itemCount\) \{[\s\S]*?\n\}/)?.[0]
const visibleFunctionSource = coreSource.match(/function getVisibleLuckCarouselItems\(items\) \{[\s\S]*?\n\}/)?.[0]
const indexedItemFunctionSource = coreSource.match(/function getLuckCarouselItemByIndex\(items, targetIndex\) \{[\s\S]*?\n\}/)?.[0]
const swipeDirectionFunctionSource = coreSource.match(/function getLuckCarouselSwipeDirection\(distanceX, distanceY\) \{[\s\S]*?\n\}/)?.[0]
if (!functionSource || !visibleFunctionSource || !indexedItemFunctionSource || !swipeDirectionFunctionSource) {
  throw new Error('모바일 게임 메뉴 순환 또는 표시 카드 필터 함수 누락')
}

const context = {
  window: {
    getComputedStyle: (item) => ({ display: item.display })
  }
}
vm.createContext(context)
vm.runInContext(`const LUCK_CAROUSEL_SWIPE_THRESHOLD_PX = 34\n${functionSource}\n${visibleFunctionSource}\n${indexedItemFunctionSource}\n${swipeDirectionFunctionSource}\nthis.wrapIndex = getWrappedLuckCarouselIndex\nthis.getVisible = getVisibleLuckCarouselItems\nthis.getByIndex = getLuckCarouselItemByIndex\nthis.getSwipeDirection = getLuckCarouselSwipeDirection`, context)

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
if (context.getSwipeDirection(-35, 2) !== 1 || context.getSwipeDirection(35, 2) !== -1) {
  throw new Error('34px 수평 스와이프가 한 칸 이동으로 인식되지 않음')
}
if (context.getSwipeDirection(25, 1) !== 0 || context.getSwipeDirection(40, 40) !== 0) {
  throw new Error('짧은 터치 또는 세로 스크롤이 게임 메뉴 이동으로 잘못 인식됨')
}

console.log(JSON.stringify({
  mobileCards: itemCount,
  previousFromOne: context.wrapIndex(-1, itemCount) + 1,
  nextFromThirteen: context.wrapIndex(itemCount, itemCount) + 1,
  hiddenDesktopIndexExcluded: true,
  thirteenthNormalizationTarget: 13,
  swipeThresholdPx: 34,
  verticalScrollPreserved: true,
  bidirectionalLoop: true
}))
