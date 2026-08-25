(function installUtilitySettings(global) {
  let initialized = false

  function getElements() {
    return {
      controls: document.querySelector('.utility-controls'),
      panel: document.getElementById('utilitySettingsPanel'),
      toggle: document.getElementById('utilitySettingsToggleBtn'),
      closeButton: document.getElementById('utilitySettingsCloseBtn')
    }
  }

  function isOpen() {
    const { panel } = getElements()
    return Boolean(panel && !panel.classList.contains('hidden'))
  }

  function setOpen(open, options = {}) {
    const { restoreFocus = false } = options
    const { panel, toggle } = getElements()
    if (!panel || !toggle) return

    panel.classList.toggle('hidden', !open)
    panel.setAttribute('aria-hidden', open ? 'false' : 'true')
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
    toggle.setAttribute('aria-label', open ? '화면 설정 닫기' : '화면 설정 열기')
    toggle.title = open ? '화면 설정 닫기' : '화면 설정 열기'
    document.body.classList.toggle('utility-settings-open', open)

    if (!open && restoreFocus) toggle.focus({ preventScroll: true })
  }

  function close(options = {}) {
    setOpen(false, options)
  }

  function init() {
    if (initialized) return
    initialized = true

    const { controls, panel, toggle, closeButton } = getElements()
    if (!controls || !panel || !toggle) return

    setOpen(false)
    toggle.addEventListener('click', () => setOpen(!isOpen()))
    closeButton?.addEventListener('click', () => close({ restoreFocus: true }))

    document.addEventListener('pointerdown', (event) => {
      if (!isOpen() || !(event.target instanceof Node) || controls.contains(event.target)) return
      close()
    })

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !isOpen()) return
      if (document.querySelector('.app-dialog-overlay:not(.hidden)')) return
      event.preventDefault()
      close({ restoreFocus: true })
    })
  }

  global.RandomRouletteUtilitySettings = Object.freeze({
    init,
    open: () => setOpen(true),
    close,
    isOpen
  })
})(window)
