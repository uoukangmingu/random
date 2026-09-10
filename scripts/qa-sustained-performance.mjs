import { createRequire } from 'node:module'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const source = await readFile(path.join(root, 'script.js'), 'utf8')
const featureCss = await readFile(path.join(root, 'src/styles/features.css'), 'utf8')

const requiredSourceMarkers = [
  'canvasRenderInterval: 1000 / 24',
  'physicsHz: 60',
  "roulette-performance-auto-cache-v2",
  'animationFrameInterval: 1000 / 30',
  'stockSecondaryRenderInterval: 1500',
  'STOCK_SCHEDULER_INTERVAL_MS = 100',
  'function startGame1RenderLoop()',
  'Render.world(render, timestamp)',
  'syncGame1BallCollisionMode()',
  'getAggregatedCounts(slotCounts)',
  "chip.querySelector('.legend-count')",
  'requestIdleCallback(runInitialCheck',
  'emojiFallbackRoots',
  'getLuckCarouselIndexForItem',
  'previousActiveItem === activeItem'
]
for (const marker of requiredSourceMarkers) {
  if (!source.includes(marker)) throw new Error(`지속 성능 보호 로직 누락: ${marker}`)
}
if (source.includes('Render.run(render)')) {
  throw new Error('담아라 게임이 Matter 기본 60fps 렌더 루프를 아직 사용함')
}
if (source.includes('characterData: true')) {
  throw new Error('이모지 폴백이 모든 텍스트 변경을 감시해 반복 렌더링 비용을 추가함')
}
const carouselHandler = source.slice(
  source.indexOf('function handleLuckCarouselScroll()'),
  source.indexOf('function handleLuckCarouselScrollEnd()')
)
if ((carouselHandler.match(/getLuckCarouselClosestItem\(\)/g) || []).length !== 1 || carouselHandler.includes('getLuckCarouselClosestIndex()')) {
  throw new Error('모바일 메뉴 스크롤 한 프레임에서 카드 위치를 중복 측정함')
}

const lowGuardIndex = featureCss.lastIndexOf('/* 실제 저사양 보호 단계')
if (lowGuardIndex < 0 || lowGuardIndex < featureCss.length * 0.75) {
  throw new Error('저사양 최종 CSS 보호 규칙이 캐스케이드 끝에 있지 않음')
}
for (const marker of [
  'html.perf-constrained .background-deco',
  'html.perf-constrained body *',
  'html.perf-constrained body.app-active-game .background-deco',
  'html.perf-constrained.hell-mode',
  'html.perf-quality-low .background-deco',
  'html.perf-quality-low body.app-active-game .screen.active *',
  'backdrop-filter: none !important',
  'contain: layout paint style',
  'mix-blend-mode: normal !important'
]) {
  if (!featureCss.slice(lowGuardIndex).includes(marker)) throw new Error(`저사양 합성 보호 규칙 누락: ${marker}`)
}

const require = createRequire(import.meta.url)
const Matter = require(path.join(root, 'assets/matter.min.js'))
const { Bodies, Composite, Engine } = Matter

const ballCategories = [0x0002, 0x0004, 0x0008, 0x0010]

function buildCollisionScene(mode) {
  const engine = Engine.create({ gravity: { x: 0, y: 0 } })
  engine.positionIterations = 3
  engine.velocityIterations = 2
  engine.constraintIterations = 1
  const balls = []
  for (let index = 0; index < 240; index += 1) {
    const column = index % 20
    const row = Math.floor(index / 20)
    const category = mode === 'full' ? ballCategories[0] : ballCategories[index % ballCategories.length]
    const mask = mode === 'full' ? 0xFFFFFFFF : mode === 'grouped' ? 0x0001 | category : 0x0001
    balls.push(Bodies.circle(40 + column * 8, 40 + row * 8, 6, {
      collisionFilter: { category, mask },
      frictionAir: 0
    }))
  }
  Composite.add(engine.world, balls)
  Engine.update(engine, 1000 / 60)
  return engine.pairs.list.filter((pair) => pair.isActive).length
}

const fullCollisionPairs = buildCollisionScene('full')
const groupedCollisionPairs = buildCollisionScene('grouped')
const protectedCollisionPairs = buildCollisionScene('protected')
if (fullCollisionPairs < 100) throw new Error(`비교 장면의 충돌 쌍이 부족함: ${fullCollisionPairs}`)
if (groupedCollisionPairs <= 0 || groupedCollisionPairs >= fullCollisionPairs * 0.5) {
  throw new Error(`균형 단계 충돌 그룹의 작업량 감소가 불충분함: ${groupedCollisionPairs}/${fullCollisionPairs}`)
}
if (protectedCollisionPairs !== 0) throw new Error(`성능 보호 단계에서 공-공 충돌 쌍이 남음: ${protectedCollisionPairs}`)

console.log(JSON.stringify({
  game1BallsPreserved: 240,
  fullCollisionPairs,
  groupedCollisionPairs,
  protectedCollisionPairs,
  lowRenderFps: 24,
  stablePhysicsHz: 60,
  stockSchedulerHz: 10,
  expensiveCompositingDisabled: true
}))
