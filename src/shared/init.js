(function initializeModularFeatures(global) {
  function init() {
    global.RandomRoulettePerformance?.init?.()
    global.RandomRouletteUtilitySettings?.init?.()
    global.RandomRouletteRoster?.init?.()
    global.RandomRouletteSession?.init?.()
    global.RandomRouletteUX?.init?.()
    global.RandomRouletteWheel?.init?.()
    global.RandomRouletteRegistry?.init?.()
    global.RandomRouletteWakeLock?.init?.()
    global.RandomRouletteApp = Object.freeze({ ready: true, showScreen })
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true })
  else init()
})(window)
