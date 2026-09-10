(function installPwaAndWakeLock(global) {
  let wakeLock = null
  let shouldStayAwake = false
  let pendingRequest = null
  let pageActive = true

  async function requestWakeLock() {
    if (!shouldStayAwake || !pageActive || document.visibilityState !== 'visible' || !('wakeLock' in navigator)) return false
    if (wakeLock) return true
    if (pendingRequest) return pendingRequest
    pendingRequest = (async () => {
      try {
        const requested = await Promise.resolve().then(() => navigator.wakeLock.request('screen'))
        if (!shouldStayAwake || !pageActive || document.visibilityState !== 'visible') {
          await requested.release()
          return false
        }
        wakeLock = requested
        requested.addEventListener('release', () => {
          if (wakeLock === requested) wakeLock = null
        }, { once: true })
        return true
      } catch (error) {
        return false
      } finally {
        pendingRequest = null
      }
    })()
    return pendingRequest
  }

  async function releaseWakeLock() {
    if (!wakeLock) return
    const current = wakeLock
    wakeLock = null
    try {
      await current.release()
    } catch (error) {}
  }

  function sync(running) {
    shouldStayAwake = Boolean(running)
    if (shouldStayAwake) requestWakeLock()
    else releaseWakeLock()
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator) || location.protocol === 'file:' || location.hostname === 'terminal.local') return
    if (global.RandomRouletteLoader) return
    const register = () => navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {})
    if (document.readyState === 'complete') register()
    else global.addEventListener('load', register, { once: true })
  }

  function init() {
    registerServiceWorker()
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && shouldStayAwake) requestWakeLock()
      else releaseWakeLock()
    })
    global.addEventListener('pagehide', () => { pageActive = false; releaseWakeLock() })
    global.addEventListener('pageshow', () => { pageActive = true; if (shouldStayAwake) requestWakeLock() })
  }

  global.RandomRouletteWakeLock = Object.freeze({
    init,
    sync,
    request: () => sync(true),
    release: () => sync(false),
    isActive: () => Boolean(wakeLock)
  })
})(window)
