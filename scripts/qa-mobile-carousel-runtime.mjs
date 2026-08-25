import { readFile } from 'node:fs/promises'
import path from 'node:path'
import vm from 'node:vm'

const root = path.resolve(import.meta.dirname, '..')
const [coreSource, html] = await Promise.all([
  readFile(path.join(root, 'src/games/core.js'), 'utf8'),
  readFile(path.join(root, 'index.html'), 'utf8')
])

const functionSource = coreSource.match(/function getWrappedLuckCarouselIndex\(index, itemCount\) \{[\s\S]*?\n\}/)?.[0]
if (!functionSource) throw new Error('모바일 게임 메뉴 순환 인덱스 함수 누락')

const context = {}
vm.createContext(context)
vm.runInContext(`${functionSource}\nthis.wrapIndex = getWrappedLuckCarouselIndex`, context)

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

console.log(JSON.stringify({
  mobileCards: itemCount,
  previousFromOne: context.wrapIndex(-1, itemCount) + 1,
  nextFromThirteen: context.wrapIndex(itemCount, itemCount) + 1,
  bidirectionalLoop: true
}))
