(function installPwaAndWakeLock(global) {
  let wakeLock = null
  let shouldStayAwake = false

  async function requestWakeLock() {
    if (!shouldStayAwake || document.visibilityState !== 'visible' || !('wakeLock' in navigator)) return false
    if (wakeLock) return true
    try {
      wakeLock = await navigator.wakeLock.request('screen')
      wakeLock.addEventListener('release', () => {
        wakeLock = null
      }, { once: true })
      return true
    } catch (error) {
      wakeLock = null
      return false
    }
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
    global.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {})
    }, { once: true })
  }

  function init() {
    registerServiceWorker()
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && shouldStayAwake) requestWakeLock()
    })
    global.addEventListener('pagehide', releaseWakeLock)
  }

  global.RandomRouletteWakeLock = Object.freeze({
    init,
    sync,
    request: () => sync(true),
    release: () => sync(false),
    isActive: () => Boolean(wakeLock)
  })
})(window)
