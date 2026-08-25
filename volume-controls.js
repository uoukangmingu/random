(function installIndependentVolumeUi(global) {
  const controls = [
    ['bgmVolumeRange', 'bgmVolumeValue'],
    ['sfxVolumeRange', 'sfxVolumeValue']
  ]

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
  }

  function syncControl(range, output) {
    if (!range) return
    const min = Number(range.min || 0)
    const max = Number(range.max || 100)
    const value = clamp(Number(range.value || min), min, max)
    const progress = max > min ? ((value - min) / (max - min)) * 100 : 0
    const label = `${Math.round(value)}%`

    range.style.setProperty('--volume-progress', `${progress}%`)
    range.setAttribute('aria-valuetext', label)
    if (output) output.textContent = label
  }

  function init() {
    controls.forEach(([rangeId, outputId]) => {
      const range = document.getElementById(rangeId)
      const output = document.getElementById(outputId)
      if (!range || range.dataset.volumeUiReady === 'true') return

      range.dataset.volumeUiReady = 'true'
      const sync = () => syncControl(range, output)
      range.addEventListener('input', sync)
      range.addEventListener('change', sync)
      sync()
    })
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true })
  else init()

  global.RandomRouletteVolumeUi = Object.freeze({ init, syncControl })
})(window)
