import { access, readFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const [source, css] = await Promise.all([
  readFile(path.join(root, 'script.js'), 'utf8'),
  readFile(path.join(root, 'style.css'), 'utf8')
])

for (const asset of ['assets/cursor-arrow.svg', 'assets/cursor-hover.svg', 'assets/cursor-text.svg']) {
  await access(path.join(root, asset))
}

for (const marker of [
  "url('./assets/cursor-arrow.svg') 4 3, default",
  "url('./assets/cursor-hover.svg') 14 4, pointer !important",
  "url('./assets/cursor-text.svg') 16 16, text !important"
]) {
  if (!css.includes(marker)) throw new Error(`정적 네이티브 커서 규칙 누락: ${marker}`)
}

for (const selector of ['button,', 'input[type="range"],', '[role="button"],', '[contenteditable="true"]']) {
  if (!css.includes(selector)) throw new Error(`커서 상태 선택자 누락: ${selector}`)
}

for (const removedMarker of ['initCustomCursor', 'customCursorEl', 'customCursorRaf', "className = 'app-cursor'", "classList.add('app-custom-cursor')"]) {
  if (source.includes(removedMarker)) throw new Error(`메인 스레드 DOM 커서 로직이 남아 있음: ${removedMarker}`)
}

const pointerMoveListeners = source.match(/addEventListener\('pointermove'/g) || []
if (pointerMoveListeners.length !== 1 || !source.includes("document.addEventListener('pointermove', handleAudioPointerMove, true)")) {
  throw new Error(`오디오 슬라이더 외 전역 pointermove 리스너가 남아 있음: ${pointerMoveListeners.length}개`)
}

if (css.includes('.app-cursor') || css.includes('cursor: none !important')) {
  throw new Error('DOM 커서 스타일 또는 운영체제 커서 숨김 규칙이 남아 있음')
}

console.log(JSON.stringify({
  cursorRenderer: 'browser-native-svg',
  cursorStates: ['default', 'hover', 'text'],
  cursorDomNodes: 0,
  cursorAnimationFramesPerMove: 0,
  cursorStyleWritesPerMove: 0,
  globalPointerMoveListeners: pointerMoveListeners.length
}))
