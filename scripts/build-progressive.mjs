import { readFile, writeFile, cp } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { minify } from 'vite'

// Resolve the tools shipped by the pinned Vite dependency without adding a runtime dependency.
const require = createRequire(import.meta.url)
const viteRequire = createRequire(require.resolve('vite'))
const postcss = viteRequire('postcss')
const { transform } = viteRequire('lightningcss')
const targets = { chrome: 90 << 16, safari: (14 << 16) | (1 << 8), firefox: 90 << 16 }
const cssMinify = (css) => transform({ filename: 'app.css', code: Buffer.from(css), minify: true, targets }).code.toString()
const jsMinify = async (name, code) => (await minify(name, code, { compress: true, mangle: true })).code

// Remove only byte-equivalent earlier rules in the same cascade scope.
// Different values and responsive wrappers are deliberately preserved.
function pruneDuplicateRules(container) {
  const seen = new Set()
  for (const node of [...(container.nodes || [])].reverse()) {
    if (node.type === 'comment') { node.remove(); continue }
    if (node.type === 'rule') {
      const key = JSON.stringify([node.selector, node.nodes.map((n) => [n.type, n.prop, n.value, Boolean(n.important)])])
      if (seen.has(key)) node.remove()
      else seen.add(key)
    } else if (node.type === 'atrule' && node.nodes) {
      pruneDuplicateRules(node)
    }
  }
}

function pruneUnusedKeyframes(tree) {
  const animationValues = []
  tree.walkDecls(/^(?:-webkit-)?animation(?:-name)?$/, (decl) => animationValues.push(decl.value))
  if (animationValues.some((value) => value.includes('var('))) return
  const tokens = new Set(animationValues.join(' ').split(/[\s,]+/))
  tree.walkAtRules(/keyframes$/, (rule) => { if (!tokens.has(rule.params)) rule.remove() })
}

export async function buildProgressive(appJs, appCss) {
  const completeTree = postcss.parse(appCss)
  pruneDuplicateRules(completeTree)
  const template = await readFile('src/index.template.html', 'utf8')
  const mainMatch = template.match(/<main class="app">([\s\S]*?)<\/main>/)
  if (!mainMatch) throw new Error('Main surface missing')
  const home = mainMatch[1].match(/<section id="homeScreen"[\s\S]*?<\/section>/)?.[0]
  if (!home) throw new Error('Home screen missing')
  const screens = mainMatch[1].replace(home, '')
  let shell = template.replace(mainMatch[0], `<main class="app">${home}</main>`)
  shell = shell.replace(/<script src="[^"]+"><\/script>/g, '')
  shell = shell.replace('random-roulette.v3.21.css', 'shell.v3.27.css')
  shell = shell.replace('<body>', '<body class="home-screen-mode">')
  shell = shell.replace('</main>', '</main><p id="appLoadStatus" role="status" aria-live="polite"></p>')
  // Fonts must never block the first screen when the font server is slow or unavailable.
  shell = shell.replace(/(<link\s+href="https:\/\/fonts.googleapis.com[\s\S]*?rel="stylesheet")/, '$1 media="print" onload="this.media=\'all\'"')
  shell = shell.replace('</body>', '<script defer src="shell.v3.27.js"></script>\n<noscript>게임을 실행하려면 브라우저에서 JavaScript를 켜 주세요.</noscript>\n</body>')
  shell = shell.replace(/(id="(?:desktopPrevStepBtn|mobilePrevStepBtn)"[^>]*)(>)/g, '$1 disabled aria-disabled="true"$2')

  // Conservatively retain all rules whose positive selector tokens exist in the shell.
  // Complex functional selectors are retained whole; :not() tokens cannot prove absence.
  // Keep order and conditional wrappers so day/night and responsive cascade stay identical.
  const ids = new Set([...shell.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]))
  const classes = new Set([...shell.matchAll(/\bclass="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/)))
  for (const c of ['theme-dark', 'perf-mobile', 'perf-low', 'perf-standard', 'perf-constrained', 'perf-quality-high', 'perf-quality-balanced', 'perf-quality-low', 'home-screen-mode', 'emoji-text-fallback', 'catalog-desktop-device', 'catalog-handheld-device', 'is-active', 'hidden']) classes.add(c)
  const tree = completeTree.clone()
  tree.walkRules((rule) => {
    if (rule.parent.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return
    const kept = rule.selectors.filter((selector) => {
      const positive = selector.replace(/:not\([^()]*\)/g, '')
      if (positive.includes('(')) return true
      const idTokens = [...positive.matchAll(/#([\w-]+)/g)].map((m) => m[1])
      const classTokens = [...positive.matchAll(/\.([a-zA-Z_][\w-]*)/g)].map((m) => m[1])
      return idTokens.every((id) => ids.has(id)) && classTokens.every((c) => classes.has(c))
    })
    if (kept.length) rule.selector = kept.join(',')
    else rule.remove()
  })
  tree.walkAtRules((rule) => { if (rule.nodes?.length === 0) rule.remove() })
  pruneUnusedKeyframes(tree)
  const loadStatusCss = '#appLoadStatus{position:fixed;left:16px;right:16px;bottom:78px;z-index:2500;text-align:center;pointer-events:none;font:500 14px/1.5 sans-serif;color:var(--brown)}#appLoadStatus:empty{display:none}'
  const markup = `;(function(){if(window.__rouletteMarkupLoaded)return;document.querySelector('main.app').insertAdjacentHTML('beforeend',${JSON.stringify(screens)});window.__rouletteMarkupLoaded=true;})();`
  const files = {
    'index.html': shell,
    'shell.v3.27.css': cssMinify(tree.toString() + loadStatusCss),
    'shell.v3.27.js': await jsMinify('shell.js', await readFile('src/shared/progressive-loader.js', 'utf8')),
    'app-markup.v3.27.js': markup,
    'runtime.v3.27.js': await jsMinify('runtime.js', appJs),
    'runtime.v3.27.css': cssMinify(completeTree.toString() + loadStatusCss)
  }
  for (const [name, content] of Object.entries(files)) {
    await writeFile(name, content)
    await writeFile(`dist/${name}`, content)
  }
  for (const name of ['assets', 'volume-controls.js', 'sw.js', 'manifest.webmanifest', 'robots.txt', 'sitemap.xml', 'CNAME']) {
    await cp(name, `dist/${name}`, { recursive: true })
  }
  const metrics = {
    initialHtmlBytes: Buffer.byteLength(shell),
    initialScriptBytes: Buffer.byteLength(files['shell.v3.27.js']),
    initialCssBytes: Buffer.byteLength(files['shell.v3.27.css']),
    baselineV321ScriptBytes: 653805,
    baselineV321CssBytes: 761978,
    sourceScriptBytes: Buffer.byteLength(appJs),
    sourceCssBytes: Buffer.byteLength(appCss),
    gameScriptBytes: Buffer.byteLength(files['runtime.v3.27.js']),
    gameCssBytes: Buffer.byteLength(files['runtime.v3.27.css'])
  }
  await writeFile('BUILD_METRICS.json', JSON.stringify(metrics, null, 2) + '\n')
  console.log('Progressive build:', JSON.stringify(metrics))
}
