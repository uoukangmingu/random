/* Keep the first screen interactive without parsing every game or physics engine. */
;(function installProgressiveLoader(global) {
  const resources = new Map()
  let appPromise = null
  let ready = false
  let pendingControl = null
  const startButton = document.getElementById('startBtn')
  const status = document.getElementById('appLoadStatus')

  function loadResource(url, kind = 'script') {
    if (resources.has(url)) return resources.get(url)
    const promise = new Promise((resolve, reject) => {
      const node = document.createElement(kind === 'style' ? 'link' : 'script')
      let settled = false
      const finish = (error) => {
        if (settled) return
        settled = true
        global.clearTimeout(timer)
        node.onload = node.onerror = null
        if (error) {
          node.remove()
          resources.delete(url)
          reject(error)
        } else resolve()
      }
      const timer = global.setTimeout(() => {
        // Removing an in-flight classic script does not reliably cancel execution.
        // Keep its promise to prevent a late arrival and a retry executing twice.
        if (kind === 'style') finish(new Error('RESOURCE_TIMEOUT'))
        else showStatus('연결이 느려요. 잠시 기다리거나 화면을 새로고침해 주세요.')
      }, 20000)
      if (kind === 'style') {
        node.rel = 'stylesheet'
        node.href = url
      } else {
        node.src = url
        node.async = false
      }
      node.onload = () => finish()
      node.onerror = () => finish(new Error('RESOURCE_UNAVAILABLE'))
      document.head.appendChild(node)
    })
    resources.set(url, promise)
    return promise
  }

  function showStatus(message) {
    if (status) status.textContent = message
  }

  function ensureApp() {
    if (appPromise) return appPromise
    appPromise = (async () => {
      await Promise.all([
        loadResource('runtime.v3.32.css', 'style'),
        loadResource('app-markup.v3.32.js'),
        loadResource('volume-controls.js?v=20260909')
      ])
      await loadResource('runtime.v3.32.js')
      if (!global.RandomRouletteApp?.ready) throw new Error('APP_INITIALIZATION_FAILED')
      ready = true
      // The complete stylesheet now contains the shell rules in the same order.
      document.querySelector('link[href="shell.v3.32.css"]')?.remove()
      document.removeEventListener('click', handleDeferredAction, true)
      document.removeEventListener('pointerdown', warmOnIntent, true)
      document.removeEventListener('keydown', warmOnIntent, true)
      showStatus('')
    })().catch((error) => {
      appPromise = null
      throw error
    })
    return appPromise
  }

  function warmOnIntent(event) {
    if (event.type === 'keydown' && !['Enter', ' ', 'Tab'].includes(event.key)) return
    if (event.type === 'pointerdown' && !event.target.closest?.('button, input, textarea, select')) return
    ensureApp().catch(() => {})
  }

  async function handleDeferredAction(event) {
    if (ready) return
    const control = event.target.closest?.('button')
    if (!control || control.disabled) return
    event.preventDefault()
    event.stopImmediatePropagation()
    // A double click must not launch or toggle a control twice when loading completes.
    if (pendingControl) return
    pendingControl = control
    control.dataset.loading = 'true'
    control.setAttribute('aria-busy', 'true')
    if (control === startButton) startButton.textContent = '준비 중…'
    showStatus('게임을 준비하고 있어요.')
    try {
      await ensureApp()
      control.click()
    } catch (error) {
      showStatus(error.message === 'APP_INITIALIZATION_FAILED'
        ? '게임을 시작하지 못했어요. 화면을 새로고침해 주세요.'
        : '불러오지 못했어요. 연결을 확인하고 다시 눌러 주세요.')
    } finally {
      delete control.dataset.loading
      pendingControl = null
      control.removeAttribute('aria-busy')
      if (control === startButton) startButton.textContent = '시작'
    }
  }

  global.RandomRouletteLoader = Object.freeze({
    ensureApp,
    loadPhysics: () => {
      showStatus('게임을 준비하고 있어요.')
      return loadResource('assets/matter.min.js?v=0.20.0').finally(() => showStatus(''))
    },
    isReady: () => ready
  })
  document.addEventListener('pointerdown', warmOnIntent, true)
  document.addEventListener('keydown', warmOnIntent, true)
  document.addEventListener('click', handleDeferredAction, true)

  // The worker caches the small shell only. Game assets are cached when requested.
  if ('serviceWorker' in navigator && location.protocol !== 'file:' && location.hostname !== 'terminal.local') {
    const register = () => navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {})
    if (document.readyState === 'complete') register()
    else global.addEventListener('load', register, { once: true })
  }
})(window)
