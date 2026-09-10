import { createRequire } from 'node:module'
import path from 'node:path'

const require = createRequire(import.meta.url)
const Matter = require(path.join(process.cwd(), 'assets/matter.min.js'))
const { Bodies, Composite, Engine } = Matter
const categories = [0x0002, 0x0004, 0x0008, 0x0010]

function createScene(mode) {
  const engine = Engine.create({ gravity: { x: 0, y: 0.45 } })
  engine.positionIterations = mode === 'high' ? 6 : mode === 'balanced' ? 4 : 3
  engine.velocityIterations = mode === 'high' ? 4 : mode === 'balanced' ? 3 : 2
  engine.constraintIterations = mode === 'high' ? 2 : 1

  const bodies = []
  for (let index = 0; index < 240; index += 1) {
    const category = mode === 'high' ? categories[0] : categories[index % categories.length]
    const mask = mode === 'high'
      ? 0xFFFFFFFF
      : mode === 'balanced'
        ? 0x0001 | category
        : 0x0001
    bodies.push(Bodies.circle(40 + (index % 20) * 8, 30 + Math.floor(index / 20) * 8, 6, {
      collisionFilter: { category, mask }
    }))
  }
  bodies.push(Bodies.rectangle(120, 160, 260, 20, {
    isStatic: true,
    collisionFilter: { category: 0x0001, mask: 0xFFFFFFFF }
  }))
  Composite.add(engine.world, bodies)
  return engine
}

function measure(mode) {
  const engine = createScene(mode)
  const startedAt = process.hrtime.bigint()
  for (let frame = 0; frame < 180; frame += 1) Engine.update(engine, 1000 / 60)
  return Number(process.hrtime.bigint() - startedAt) / 1e6
}

for (const mode of ['high', 'balanced', 'low']) measure(mode)

const result = {}
for (const mode of ['high', 'balanced', 'low']) {
  const samples = Array.from({ length: 7 }, () => measure(mode)).sort((a, b) => a - b)
  result[mode] = {
    medianMs: Number(samples[3].toFixed(2)),
    minMs: Number(samples[0].toFixed(2)),
    maxMs: Number(samples.at(-1).toFixed(2))
  }
}

console.log(JSON.stringify({
  scene: '240 balls · 60Hz · 3 simulated seconds',
  ...result,
  lowReductionPercent: Number(((1 - result.low.medianMs / result.high.medianMs) * 100).toFixed(1))
}))
