import { execFileSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const distDir = path.join(root, 'dist')

execFileSync(process.execPath, [path.join(root, 'scripts', 'split-legacy.mjs')], { cwd: root, stdio: 'inherit' })
await mkdir(distDir, { recursive: true })

const scriptOrder = [
  'src/games/core.js',
  'src/shared/rng.js',
  'src/shared/game-engine.js',
  'src/shared/utility-settings.js',
  'src/shared/roster.js',
  'src/shared/session-guard.js',
  'src/games/wheel.js',
  'src/games/registry.js',
  'src/shared/pwa.js',
  'src/games/game1-drop.js',
  'src/games/game2-race.js',
  'src/games/game3-card-battle.js',
  'src/games/game4-ball-battle.js',
  'src/games/game5-russian-roulette.js',
  'src/games/game6-stock.js',
  'src/games/game7-ladder.js',
  'src/games/physical-games.js',
  'src/games/bootstrap.js',
  'src/shared/init.js'
]

const scriptParts = []
for (const relativePath of scriptOrder) {
  const content = await readFile(path.join(root, relativePath), 'utf8')
  // 모듈이 IIFE로 시작하더라도 앞 파일의 반환값을 함수처럼 호출하지 않도록
  // 모든 결합 경계를 명시적인 세미콜론으로 끊는다.
  scriptParts.push(`\n;\n/* ===== ${relativePath} ===== */\n${content.trim()}\n`)
}

const cssOrder = ['style.css', 'src/styles/features.css']
const cssParts = []
for (const relativePath of cssOrder) {
  const content = await readFile(path.join(root, relativePath), 'utf8')
  cssParts.push(`\n/* ===== ${relativePath} ===== */\n${content.trim()}\n`)
}

const banner = `/* Random Roulette modular build · ${new Date().toISOString()} */\n`
const appJs = banner + scriptParts.join('\n')
const appCss = banner + cssParts.join('\n')
await Promise.all([
  writeFile(path.join(distDir, 'app.js'), appJs, 'utf8'),
  writeFile(path.join(distDir, 'app.css'), appCss, 'utf8'),
  writeFile(path.join(root, 'random-roulette.v3.10.js'), appJs, 'utf8'),
  writeFile(path.join(root, 'random-roulette.v3.10.css'), appCss, 'utf8'),
  writeFile(path.join(root, 'app.bundle.js'), appJs, 'utf8'),
  writeFile(path.join(root, 'app.bundle.css'), appCss, 'utf8'),
  writeFile(path.join(root, 'script.min.js'), appJs, 'utf8'),
  writeFile(path.join(root, 'style.min.css'), appCss, 'utf8')
])
console.log(`빌드 완료: dist + v3.10 배포 번들 + 호환 루트 번들`)
