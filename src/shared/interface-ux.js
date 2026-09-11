(function installInterfaceUX(global) {
  let initialized = false
  let lastLaunch = null
  let focusFrame = 0
  const playAreas = {
    startGameBtn: ['game1', '.game-play-area'],
    startRaceBtn: ['game2', '#raceTrackWrap'],
    startBattleBtn: ['game3', '#battleStageBadge'],
    startSimSetupBtn: ['game4', '.sim-setup-card'],
    startStockBtn: ['game6', '.stock-live-card'],
    startNavalBtn: ['game5', '#navalBoard'],
    startLadderBtn: ['game7', '#ladderBoard'],
    startBalloonBtn: ['physicalBalloon', '.balloon-stage-card'],
    startBombPassBtn: ['physicalBomb', '.bomb-pass-stage-card'],
    startCircleTapBtn: ['physicalCircle', '.circle-tap-stage-card'],
    startKeyReactBtn: ['physicalKeyReact', '#keyReactStage'],
    startBearFindBtn: ['physicalBearFind', '.bear-find-stage-card']
  }

  function hasDialog() {
    return Boolean(document.querySelector('.popup-overlay:not(.hidden), .app-dialog-overlay:not(.hidden)'))
  }

  function revealPlayArea(button) {
    const entry = playAreas[button?.id]
    if (!entry || global.innerWidth > 900) return
    requestAnimationFrame(() => {
      const [key, selector] = entry
      if (currentScreenKey !== key || hasDialog() || !global.RandomRouletteSession?.isRunning(key)) return
      const stage = document.querySelector(`#${key}Screen ${selector}`)
      if (!stage || !stage.getClientRects().length) return
      const rect = stage.getBoundingClientRect()
      if (rect.top < 0 || rect.top > global.innerHeight * .4) {
        stage.scrollIntoView({ block: 'start', behavior: 'auto' })
      }
      // Closing a mobile keyboard reveals the game without another tap.
      if (document.activeElement?.matches('input') && document.activeElement.closest('.game-screen')) {
        document.activeElement.blur()
      }
    })
  }

  function handleScreenChange() {
    cancelAnimationFrame(focusFrame)
    focusFrame = requestAnimationFrame(() => {
      if (hasDialog()) return
      const screen = document.querySelector('.screen.active')
      if (!screen) return
      if (screen.id === 'luckScreen' && lastLaunch?.isConnected && lastLaunch.getClientRects().length) {
        lastLaunch.focus({ preventScroll: true })
        lastLaunch.scrollIntoView({ block: 'nearest', behavior: 'auto' })
        return
      }
      const heading = screen.querySelector('h1, h2')
      if (!heading) return
      heading.tabIndex = -1
      heading.focus({ preventScroll: true })
    })
  }

  function preserveStockKeyboardFocus(event) {
    if (event.detail !== 0) return
    const button = event.target.closest('#game6Screen button')
    if (!button || button.disabled || !button.closest('#stockRoster, #stockPlayerTabs, #stockAllocationEditor, #stockAllocationSummary')) return
    const owner = button.parentElement.closest('[id]')
    if (!owner) return
    const attributes = [...button.attributes].filter((item) => item.name.startsWith('data-'))
    const selector = `button.${CSS.escape(button.classList[0])}` + attributes.map(({ name, value }) => `[${name}="${CSS.escape(value)}"]`).join('')
    requestAnimationFrame(() => {
      if (button.isConnected || hasDialog() || !owner.isConnected) return
      if (document.activeElement !== document.body && document.activeElement !== button) return
      // Stock setup replaces these controls after every allocation; keep keyboard users in place.
      const replacement = owner.querySelector(selector)
      const fallback = document.querySelector('#stockAmountInput') || owner.querySelector('button:not(:disabled)')
      const target = replacement && !replacement.disabled ? replacement : fallback
      target?.focus({ preventScroll: true })
    })
  }

  function init() {
    if (initialized) return
    initialized = true
    document.addEventListener('click', (event) => {
      if (!(event.target instanceof Element)) return
      const launch = event.target.closest('#luckScreen .game-item')
      if (launch) lastLaunch = launch
      preserveStockKeyboardFocus(event)
    }, true)
    document.addEventListener('click', (event) => {
      if (event.target instanceof Element) revealPlayArea(event.target.closest('button'))
    })
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' || event.isComposing || event.keyCode === 229 || !(event.target instanceof HTMLInputElement)) return
      const screen = event.target.closest('.game-screen')
      const button = screen && [...screen.querySelectorAll('button')].find((item) => playAreas[item.id])
      revealPlayArea(button)
    })
    global.addEventListener('roulette-screen-change', handleScreenChange)
  }

  global.RandomRouletteUX = Object.freeze({ init })
})(window)
