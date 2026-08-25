(function initializeModularFeatures(global) {
  function init() {
    global.RandomRouletteUtilitySettings?.init?.()
    global.RandomRouletteRoster?.init?.()
    global.RandomRouletteSession?.init?.()
    global.RandomRouletteWheel?.init?.()
    global.RandomRouletteRegistry?.init?.()
    global.RandomRouletteWakeLock?.init?.()
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true })
  else init()
})(window)
