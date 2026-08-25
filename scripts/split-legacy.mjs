import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const sourcePath = path.join(root, 'script.js')
const outputDir = path.join(root, 'src', 'games')
const source = await readFile(sourcePath, 'utf8')

function find(anchor, from = 0) {
  const index = source.indexOf(anchor, from)
  if (index < 0) throw new Error(`분리 기준을 찾지 못함: ${anchor}`)
  return index
}

const game1Start = find('function parseConfigToSlots')
const raceStart = find('/* =========================\n   game2 : race', game1Start)
const battleStart = find('function setBattleInputLock', raceStart)
const simStart = find('function parseSimConfigToPlayers', battleStart)
const legacyNavalStart = find('function setNavalInputLock', simStart)
const rouletteStart = find('/* =========================\n   game5 : russian roulette', legacyNavalStart)
const stockStart = find('const STOCK_MAX_PLAYERS', rouletteStart)
const ladderStart = find('const LADDER_DESKTOP_MAX_PLAYERS', stockStart)
const physicalStart = find('function parseBalloonPlayers', ladderStart)
const bootstrapStart = find('if (startBtn)', physicalStart)

const modules = [
  ['core.js', source.slice(0, game1Start)],
  ['game1-drop.js', source.slice(game1Start, raceStart)],
  ['game2-race.js', source.slice(raceStart, battleStart)],
  ['game3-card-battle.js', source.slice(battleStart, simStart)],
  ['game4-ball-battle.js', source.slice(simStart, legacyNavalStart)],
  ['game5-russian-roulette.js', source.slice(rouletteStart, stockStart)],
  ['game6-stock.js', source.slice(stockStart, ladderStart)],
  ['game7-ladder.js', source.slice(ladderStart, physicalStart)],
  ['physical-games.js', source.slice(physicalStart, bootstrapStart)],
  ['bootstrap.js', source.slice(bootstrapStart)]
]

await mkdir(outputDir, { recursive: true })
for (const [name, content] of modules) {
  await writeFile(path.join(outputDir, name), `/* generated from script.js · ${name} */\n${content.trim()}\n`, 'utf8')
}

const manifest = modules.map(([name, content]) => ({ name, bytes: Buffer.byteLength(content) }))
await writeFile(path.join(outputDir, 'modules.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
console.log(`게임 소스 ${modules.length}개 모듈 분리 완료`)
