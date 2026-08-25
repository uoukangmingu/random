(function installSessionGuard(global) {
  const RESET_BUTTON_IDS = new Set([
    'resetGameBtn', 'resetRaceBtn', 'resetBattleBtn', 'resetSimBtn', 'resetNavalBtn',
    'resetStockBtn', 'resetLadderBtn', 'resetBalloonBtn', 'resetBombPassBtn',
    'resetCircleTapBtn', 'resetKeyReactBtn', 'resetBearFindBtn'
  ])
  let pending = null
  let bypassResetButton = null
  let lastFocusedElement = null

  function isRunning(screenKey = currentScreenKey) {
    switch (screenKey) {
      case 'wheel': return Boolean(global.RandomRouletteWheel?.isRunning?.())
      case 'game1': return typeof hasLiveRound === 'function' && hasLiveRound()
      case 'game2': return Boolean(raceRunning && !raceFinished)
      case 'game3': return Boolean(battleGameRunning)
      case 'game4': return Boolean(simSetupRunning || simBattleRunning)
      case 'game5': return Boolean(navalRunning && !navalFinished)
      case 'game6': return Boolean(stockGameRunning)
      case 'game7': return Boolean(ladderAutoRunning || (ladderGameStarted && !ladderRevealed))
      case 'physicalBalloon': return Boolean(balloonGameStarted && !balloonPopped)
      case 'physicalBomb': return Boolean(bombPassRunning)
      case 'physicalCircle': return Boolean(circleTapStarted && !circleTapFinished)
      case 'physicalKeyReact': return typeof isKeyReactRunning === 'function' && isKeyReactRunning()
      case 'physicalBearFind': return Boolean(bearFindStarted && !bearFindFinished)
      default: return false
    }
  }

  function getElements() {
    return {
      overlay: document.getElementById('sessionConfirmOverlay'),
      message: document.getElementById('sessionConfirmMessage'),
      cancel: document.getElementById('sessionConfirmCancelBtn'),
      leave: document.getElementById('sessionConfirmLeaveBtn')
    }
  }

  function close(runCancel = false) {
    const elements = getElements()
    elements.overlay?.classList.add('hidden')
    const action = pending
    pending = null
    if (runCancel) action?.onCancel?.()
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus({ preventScroll: true })
  }

  function confirm() {
    const action = pending
    close(false)
    action?.onConfirm?.()
  }

  function request({ message = '현재 진행 상황이 사라진다.', onConfirm, onCancel } = {}) {
    const elements = getElements()
    if (!elements.overlay) {
      if (global.confirm(message)) onConfirm?.()
      else onCancel?.()
      return
    }
    pending = { onConfirm, onCancel }
    lastFocusedElement = document.activeElement
    if (elements.message) elements.message.textContent = message
    elements.overlay.classList.remove('hidden')
    requestAnimationFrame(() => elements.cancel?.focus())
  }

  function requestNavigation({ message, onConfirm, onCancel }) {
    request({ message, onConfirm, onCancel })
  }

  function installResetGuards() {
    document.addEventListener('click', (event) => {
      const button = event.target instanceof Element ? event.target.closest('button') : null
      if (!button || !RESET_BUTTON_IDS.has(button.id) || button === bypassResetButton) return
      if (!isRunning(currentScreenKey)) return

      event.preventDefault()
      event.stopImmediatePropagation()
      request({
        message: '게임이 아직 진행 중이야. 리셋하면 현재 진행 상황이 사라져.',
        onConfirm: () => {
          bypassResetButton = button
          button.click()
          bypassResetButton = null
        }
      })
    }, true)
  }

  function installDialogEvents() {
    const elements = getElements()
    elements.cancel?.addEventListener('click', () => close(true))
    elements.leave?.addEventListener('click', confirm)
    elements.overlay?.addEventListener('click', (event) => {
      if (event.target === elements.overlay) close(true)
    })
    document.addEventListener('keydown', (event) => {
      if (elements.overlay?.classList.contains('hidden')) return
      if (event.key === 'Escape') {
        event.preventDefault()
        close(true)
        return
      }
      if (event.key !== 'Tab') return
      const focusable = [elements.cancel, elements.leave].filter(Boolean)
      const index = focusable.indexOf(document.activeElement)
      const nextIndex = event.shiftKey
        ? (index <= 0 ? focusable.length - 1 : index - 1)
        : (index >= focusable.length - 1 ? 0 : index + 1)
      event.preventDefault()
      focusable[nextIndex]?.focus()
    })
  }

  function init() {
    installDialogEvents()
    installResetGuards()
  }

  global.RandomRouletteSession = Object.freeze({
    init,
    isRunning,
    shouldConfirmExit: isRunning,
    request,
    requestNavigation
  })
})(window)
