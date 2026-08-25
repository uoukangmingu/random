/* generated from script.js · bootstrap.js */
if (startBtn) {
  startBtn.addEventListener('click', () => showScreen('luck'))
}

if (physicalBtn) {
  physicalBtn.addEventListener('click', () => showScreen('physical'))
}

if (luckBtn) {
  luckBtn.addEventListener('click', () => showScreen('luck'))
}

if (closePopupBtn) {
  closePopupBtn.addEventListener('click', closePopup)
}

if (popupOverlay) {
  popupOverlay.addEventListener('click', (event) => {
    if (event.target === popupOverlay) {
      closePopup()
    }
  })
}


if (luckGameGrid) {
  luckGameGrid.addEventListener('click', handleLuckFastForwardBadgeClick, true)
}

gameLaunchButtons.forEach((button) => {
  bindLuckGameItemInteraction(button)
})

comingSoonButtons.forEach((button) => {
  bindLuckGameItemInteraction(button)
})

physicalGameLaunchButtons.forEach((button) => {
  bindPhysicalGameItemInteraction(button)
})

const allGameStartButtons = [
  startGameBtn,
  startRaceBtn,
  startBattleBtn,
  startSimSetupBtn,
  startSimBattleBtn,
  startNavalBtn,
  startStockBtn,
  startLadderBtn,
  startBalloonBtn,
  startBombPassBtn,
  startCircleTapBtn,
  startKeyReactBtn,
  startBearFindBtn
].filter(Boolean)

allGameStartButtons.forEach((button) => {
  if (!button.dataset.defaultStartText) {
    button.dataset.defaultStartText = button.textContent || '시작'
  }
  button.addEventListener('click', scheduleGameStartButtonStateSync, true)
})


if (balloonConfigInput) {
  balloonConfigInput.addEventListener('input', () => {
    if (!balloonGameStarted) {
      updateBalloonFromInput()
    }
  })

  balloonConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startBalloonGame()
    }
  })
}

if (startBalloonBtn) {
  startBalloonBtn.addEventListener('click', startBalloonGame)
}

if (resetBalloonBtn) {
  resetBalloonBtn.addEventListener('click', resetBalloonGame)
}

if (balloonPressArea) {
  balloonPressArea.addEventListener('pointerdown', startBalloonPress)
  balloonPressArea.addEventListener('pointerup', endBalloonPress)
  balloonPressArea.addEventListener('pointercancel', endBalloonPress)
  balloonPressArea.addEventListener('pointerleave', endBalloonPress)
  balloonPressArea.addEventListener('contextmenu', (event) => event.preventDefault())
  balloonPressArea.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    startBalloonPress(event)
  })
  balloonPressArea.addEventListener('keyup', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    endBalloonPress()
  })
}

if (startBombPassBtn) {
  startBombPassBtn.addEventListener('click', startBombPassGame)
}

if (resetBombPassBtn) {
  resetBombPassBtn.addEventListener('click', resetBombPassGame)
}

if (bearFindCountInput) {
  bearFindCountInput.addEventListener('input', () => {
    if (!bearFindStarted && !bearFindLocked) {
      updateBearFindFromInput()
    }
  })

  bearFindCountInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startBearFindGame()
    }
  })
}

if (startBearFindBtn) {
  startBearFindBtn.addEventListener('click', startBearFindGame)
}

if (resetBearFindBtn) {
  resetBearFindBtn.addEventListener('click', resetBearFindGame)
}

if (bearFindStageButton) {
  bearFindStageButton.addEventListener('click', playBearFindCurrentTurn)
}

if (bearFindVideo) {
  bearFindVideo.addEventListener('playing', () => {
    if (!bearFindCurrentOutcome) return
    setBearFindVideoVisible(true)
    renderBearFindGame()
  })
  bearFindVideo.addEventListener('ended', handleBearFindVideoEnd)
  bearFindVideo.addEventListener('error', handleBearFindVideoError)
  bearFindVideo.addEventListener('contextmenu', (event) => event.preventDefault())
}

if (circleTapConfigInput) {
  circleTapConfigInput.addEventListener('input', () => {
    if (!circleTapStarted) {
      updateCircleTapFromInput()
    }
  })

  circleTapConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startCircleTapGame()
    }
  })
}

if (startCircleTapBtn) {
  startCircleTapBtn.addEventListener('click', startCircleTapGame)
}

if (resetCircleTapBtn) {
  resetCircleTapBtn.addEventListener('click', resetCircleTapGame)
}

if (circleTapStage) {
  circleTapStage.addEventListener('pointerdown', handleCircleTapPointer)
  circleTapStage.addEventListener('contextmenu', (event) => event.preventDefault())
}


if (keyReactConfigInput) {
  keyReactConfigInput.addEventListener('input', () => {
    if (keyReactPhase === 'idle' || keyReactPhase === 'finished') {
      keyReactPhase = 'idle'
      keyReactResults = []
      updateKeyReactFromInput()
    }
  })

  keyReactConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startKeyReactGame()
    }
  })
}

if (keyReactKeyList) {
  keyReactKeyList.addEventListener('pointerdown', (event) => {
    const target = event.target instanceof HTMLElement ? event.target : null
    const row = target?.closest('.key-react-key-row') || null
    const input = target?.closest('.key-react-key-input') || row?.querySelector('.key-react-key-input') || null

    if (input && !input.disabled && keyReactPhase !== 'stay' && keyReactPhase !== 'click') {
      event.preventDefault()
      beginKeyReactKeyCapture(input)
    }
  })

  keyReactKeyList.addEventListener('click', (event) => {
    const target = event.target instanceof HTMLElement ? event.target : null
    const row = target?.closest('.key-react-key-row') || null
    const input = target?.closest('.key-react-key-input') || row?.querySelector('.key-react-key-input') || null

    if (input && !input.disabled && keyReactPhase !== 'stay' && keyReactPhase !== 'click') {
      event.preventDefault()
      beginKeyReactKeyCapture(input)
    }
  })

  keyReactKeyList.addEventListener('focusin', (event) => {
    const input = event.target instanceof HTMLElement ? event.target.closest('.key-react-key-input') : null
    if (input && !input.disabled && keyReactCapturePlayerId !== input.dataset.playerId) {
      beginKeyReactKeyCapture(input)
    }
  })
}

if (startKeyReactBtn) {
  startKeyReactBtn.addEventListener('click', startKeyReactGame)
}

if (resetKeyReactBtn) {
  resetKeyReactBtn.addEventListener('click', resetKeyReactGame)
}

document.addEventListener('keydown', handleKeyReactKeyAssignKeydown, true)
document.addEventListener('keydown', handleKeyReactGlobalKeydown)

if (stockConfigInput) {
  stockConfigInput.addEventListener('input', () => {
    if (!stockGameRunning) {
      updateStockFromInput({ preserveDrafts: true })
    }
  })

  stockConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startStockGame()
    }
  })
}

if (stockDurationInput) {
  stockDurationInput.addEventListener('input', () => {
    stockDurationSeconds = clampStockDuration(stockDurationInput.value)
    stockDurationInput.value = String(stockDurationSeconds)
    updateStockDurationText()
    updateStockDescription()
    renderStockTimer()
  })
}

if (shuffleStockBtn) {
  shuffleStockBtn.addEventListener('click', shuffleStockParticipants)
}

if (startStockBtn) {
  startStockBtn.addEventListener('click', startStockGame)
}

if (resetStockBtn) {
  resetStockBtn.addEventListener('click', resetStockGame)
}

if (stockPlayerTabs) {
  stockPlayerTabs.addEventListener('click', (event) => {
    const button = event.target.closest('.stock-player-tab')
    if (!button || stockGameRunning) return
    stockFocusedSelectionId = ''
    setStockTurnByPlayerId(button.dataset.playerId)
  })
}

if (stockAllocationEditor) {
  stockAllocationEditor.addEventListener('input', (event) => {
    const target = event.target
    if (!(target instanceof HTMLInputElement)) return
    if (stockGameRunning) return

    if (target.classList.contains('stock-amount-input')) {
      commitStockAmountInput(target, { restoreFocus: true })
    }
  })

  stockAllocationEditor.addEventListener('change', (event) => {
    const target = event.target
    if (!(target instanceof HTMLInputElement) || stockGameRunning) return

    if (target.classList.contains('stock-amount-input')) {
      commitStockAmountInput(target)
    }
  })

  stockAllocationEditor.addEventListener('click', (event) => {
    const button = event.target.closest('button')
    if (!button || stockGameRunning) return

    const playerId = button.dataset.playerId
    const stockId = button.dataset.stockId

    if (button.dataset.stockCarouselNav) {
      moveStockFocusedSelection(button.dataset.stockCarouselNav === 'next' ? 1 : -1)
      return
    }

    if (button.dataset.stockStep && playerId && stockId) {
      stockFocusedSelectionId = stockId
      adjustStockDraftAmountByStock(playerId, stockId, Number(button.dataset.stockStep))
      return
    }

    if (button.dataset.stockFill === 'remaining' && playerId && stockId) {
      stockFocusedSelectionId = stockId
      fillRemainingStockDraftAmount(playerId, stockId)
      return
    }

    if (button.classList.contains('stock-picked-remove-btn') && playerId && stockId) {
      stockFocusedSelectionId = ''
      clearStockDraftStock(playerId, stockId)
    }
  })
}

if (stockAllocationSummary) {
  stockAllocationSummary.addEventListener('click', (event) => {
    const button = event.target.closest('.stock-turn-btn')
    if (!button || stockGameRunning) return

    if (button.dataset.stockAction === 'equalize') {
      const activePlayer = stockPlayers[stockSetupTurnIndex] || stockPlayers[0]
      if (activePlayer) {
        equalizeStockDraftAmounts(activePlayer.id)
      }
      return
    }

    if (button.dataset.stockAction === 'clear-all') {
      const activePlayer = stockPlayers[stockSetupTurnIndex] || stockPlayers[0]
      if (activePlayer) {
        clearAllStockDraftAmounts(activePlayer.id)
      }
      return
    }

    if (button.dataset.stockTurn === 'prev') {
      stockFocusedSelectionId = ''
      stockSetupTurnIndex = clampValue(stockSetupTurnIndex - 1, 0, Math.max(0, stockPlayers.length - 1))
      renderStockGame()
      return
    }

    if (button.dataset.stockTurn === 'next') {
      stockFocusedSelectionId = ''
      stockSetupTurnIndex = clampValue(stockSetupTurnIndex + 1, 0, Math.max(0, stockPlayers.length - 1))
      renderStockGame()
    }
  })
}

if (stockRoster) {
  stockRoster.addEventListener('click', (event) => {
    const button = event.target.closest('.stock-roster-card-btn')
    if (!button || stockGameRunning) return
    const playerId = button.dataset.playerId
    const stockId = button.dataset.stockId
    if (!playerId || !stockId) return
    stockFocusedSelectionId = stockId
    toggleStockDraftSelection(playerId, stockId)
  })
}

if (ladderConfigInput) {
  ladderConfigInput.addEventListener('input', () => {
    if (!ladderGameStarted) {
      updateLadderFromInput()
    } else {
      updateLadderHelperText()
    }
  })

  ladderConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startLadderGame()
    }
  })
}

if (shuffleLadderBtn) {
  shuffleLadderBtn.addEventListener('click', shuffleLadderParticipants)
}

if (startLadderBtn) {
  startLadderBtn.addEventListener('click', startLadderGame)
}

if (resetLadderBtn) {
  resetLadderBtn.addEventListener('click', resetLadderGame)
}

if (ladderCheckList) {
  ladderCheckList.addEventListener('click', (event) => {
    const button = event.target.closest('.ladder-check-btn')
    if (!button || button.disabled) return
    checkLadderResult(button.dataset.playerId)
  })
}

if (shuffleBtn) {
  shuffleBtn.addEventListener('click', shuffleRound)
}

if (startGameBtn) {
  startGameBtn.addEventListener('click', startRound)
}

if (resetGameBtn) {
  resetGameBtn.addEventListener('click', resetRound)
}

if (shuffleRaceBtn) {
  shuffleRaceBtn.addEventListener('click', shuffleRace)
}

if (startRaceBtn) {
  startRaceBtn.addEventListener('click', startRace)
}

if (resetRaceBtn) {
  resetRaceBtn.addEventListener('click', resetRace)
}


if (startNavalBtn) {
  startNavalBtn.addEventListener('click', startNavalGame)
}

if (resetNavalBtn) {
  resetNavalBtn.addEventListener('click', resetNavalGame)
}

if (navalConfigInput) {
  navalConfigInput.addEventListener('input', () => {
    if (!navalRunning && !navalFinished) {
      updateNavalFromInput()
    }
  })

  navalConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startNavalGame()
    }
  })
}

if (shuffleBattleBtn) {
  shuffleBattleBtn.addEventListener('click', shuffleBattle)
}

if (startBattleBtn) {
  startBattleBtn.addEventListener('click', startBattleGame)
}

if (resetBattleBtn) {
  resetBattleBtn.addEventListener('click', resetBattle)
}

if (drawerToggleBtn) {
  drawerToggleBtn.addEventListener('click', () => {
    const willOpen = !gameSidebar.classList.contains('open')
    setDrawerState(willOpen)
  })
}

if (drawerBackdrop) {
  drawerBackdrop.addEventListener('click', () => {
    setDrawerState(false)
  })
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setDrawerState(false)
    closePopup()
  }
})

document.addEventListener('click', handleGameInfoTabClick)

if (configInput) {
  configInput.addEventListener('input', () => {
    updateSlotsFromInput()
  })

  configInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startRound()
    }
  })
}

if (raceConfigInput) {
  raceConfigInput.addEventListener('input', () => {
    updateRaceFromInput()
  })

  raceConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startRace()
    }
  })
}


if (battleConfigInput) {
  battleConfigInput.addEventListener('input', () => {
    updateBattleFromInput()
  })

  battleConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startBattleGame()
    }
  })
}


if (simConfigInput) {
  simConfigInput.addEventListener('input', () => {
    if (!simSetupDone && !simSetupRunning && !simBattleRunning) {
      updateSimFromInput()
    }
  })

  simConfigInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startSimSetup()
    }
  })
}

if (shuffleSimBtn) {
  shuffleSimBtn.addEventListener('click', shuffleSimParticipants)
}

if (startSimSetupBtn) {
  startSimSetupBtn.addEventListener('click', startSimSetup)
}

if (resetSimBtn) {
  resetSimBtn.addEventListener('click', resetSim)
}

if (startSimBattleBtn) {
  startSimBattleBtn.addEventListener('click', startSimBattle)
}

if (simInfoBtn) {
  simInfoBtn.addEventListener('click', openSimGameInfo)
}

if (raceTrackZoomBtn) {
  raceTrackZoomBtn.addEventListener('pointerdown', stopZoomControlEvent)
  raceTrackZoomBtn.addEventListener('pointerup', stopZoomControlEvent)
  raceTrackZoomBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    toggleRaceTrackZoom()
  })
}

if (raceTrackZoomBackdrop) {
  raceTrackZoomBackdrop.addEventListener('click', () => {
    if (raceTrackZoomed) {
      closeRaceTrackZoom()
    }
  })
}

if (rouletteStageZoomBtn) {
  rouletteStageZoomBtn.addEventListener('pointerdown', stopZoomControlEvent)
  rouletteStageZoomBtn.addEventListener('pointerup', stopZoomControlEvent)
  rouletteStageZoomBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    toggleRouletteStageZoom()
  })
}

if (rouletteStageZoomBackdrop) {
  rouletteStageZoomBackdrop.addEventListener('click', () => {
    if (rouletteStageZoomed) {
      closeRouletteStageZoom()
    }
  })
}

if (simArenaZoomBtn) {
  simArenaZoomBtn.addEventListener('pointerdown', stopZoomControlEvent)
  simArenaZoomBtn.addEventListener('pointerup', stopZoomControlEvent)
  simArenaZoomBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    toggleSimArenaZoom()
  })
}

if (simArenaZoomBackdrop) {
  simArenaZoomBackdrop.addEventListener('click', () => {
    if (simArenaZoomed) {
      closeSimArenaZoom()
    }
  })
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleThemePreference)
}

if (fullscreenToggleBtn) {
  fullscreenToggleBtn.addEventListener('click', () => {
    toggleFullscreenMode()
  })
}

;[desktopPrevStepBtn, mobilePrevStepBtn].forEach((button) => {
  if (!button) return

  button.addEventListener('click', () => {
    if (button.disabled) return
    goToPreviousStep(button.dataset.fallbackTarget || getPreviousStepFallbackTarget())
  })
})

document.addEventListener('fullscreenchange', () => {
  updateFullscreenToggleButton()
  syncResponsiveAfterViewportModeChange()
})

document.addEventListener('webkitfullscreenchange', () => {
  updateFullscreenToggleButton()
  syncResponsiveAfterViewportModeChange()
})

bindFastForwardTarget('game1')
bindFastForwardTarget('game2')
bindFastForwardTarget('game4')
bindFastForwardTarget('game5')

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return

  if (raceTrackZoomed) {
    closeRaceTrackZoom()
  }

  if (simArenaZoomed) {
    closeSimArenaZoom()
  }

  if (rouletteStageZoomed) {
    closeRouletteStageZoom()
  }
})

if (battleTable) {
  battleTable.addEventListener('click', (event) => {
    const targetCard = event.target.closest('.battle-card')
    const row = event.target.closest('.battle-row')
    if (!targetCard || !row) return

    const player = getBattleRoundPlayer(row.dataset.playerId)
    const cardIndex = Number(targetCard.dataset.cardIndex)

    if (!player || !Number.isFinite(cardIndex)) return

    handleBattleCardReveal(player, cardIndex)
  })

  battleTable.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return

    const targetCard = event.target.closest('.battle-card')
    const row = event.target.closest('.battle-row')
    if (!targetCard || !row) return

    const player = getBattleRoundPlayer(row.dataset.playerId)
    const cardIndex = Number(targetCard.dataset.cardIndex)

    if (!player || !Number.isFinite(cardIndex)) return

    event.preventDefault()
    handleBattleCardReveal(player, cardIndex)
  })
}

window.addEventListener('resize', () => {
  const nextWidth = window.innerWidth
  const nextHeight = window.innerHeight

  if (shouldIgnoreMobileChromeResize(nextWidth, nextHeight)) {
    lastViewportWidth = nextWidth
    lastViewportHeight = nextHeight
    return
  }

  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    const widthChanged = Math.abs(nextWidth - lastViewportWidth) > 4
    const heightChanged = Math.abs(nextHeight - lastViewportHeight) > 4

    if (!widthChanged && !heightChanged) return

    lastViewportWidth = nextWidth
    lastViewportHeight = nextHeight

    syncGame1MobileLayout()
    syncRaceMobileLayout()
    syncSimResponsiveLayout()
    syncLuckCarousel({ align: screens.luck?.classList.contains('active') })
    syncPhysicalCarousel({ align: screens.physical?.classList.contains('active') })
    updateOrientationGate()

    if (screens.game1?.classList.contains('active')) {
      fitGameCanvasViewport()

      if (engine && currentSlots.length) {
        buildBoard()
      }
    }

    if (screens.game7?.classList.contains('active')) {
      updateLadderHelperText()
      renderLadderGame()
    }

    if (screens.game2?.classList.contains('active') && raceHorses.length) {
      renderRacePreview()
      if (raceTrackZoomed) {
        updateRaceTrackZoomLayout()
      }
    }

    if (screens.game4?.classList.contains('active')) {
      if (simBattleRunning || simBattleFinished) {
        updateSimArenaOverlay(true)
      }
      if (simArenaZoomed) {
        updateSimArenaZoomScale()
      }
    }

    if (screens.game5?.classList.contains('active')) {
      if (rouletteStageZoomed) {
        updateRouletteStageZoomLayout()
      } else {
        renderNavalBoardState()
      }
    }
  }, 120)
})

window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    syncGame1MobileLayout()
    syncRaceMobileLayout()
    syncSimResponsiveLayout()
    syncPhysicalCarousel({ align: screens.physical?.classList.contains('active') })
    updateOrientationGate()

    if (screens.game1?.classList.contains('active')) {
      fitGameCanvasViewport()

      if (engine && currentSlots.length) {
        buildBoard()
      }
    }

    if (screens.game2?.classList.contains('active') && raceHorses.length) {
      renderRacePreview()
      if (raceTrackZoomed) {
        updateRaceTrackZoomLayout()
      }
    }

    if (screens.game4?.classList.contains('active')) {
      if (simBattleRunning || simBattleFinished) {
        updateSimArenaOverlay(true)
      }
      if (simArenaZoomed) {
        updateSimArenaZoomScale()
      }
    }

    if (screens.game5?.classList.contains('active')) {
      if (rouletteStageZoomed) {
        updateRouletteStageZoomLayout()
      } else {
        renderNavalBoardState()
      }
    }
  }, 150)
})

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (screens.game2?.classList.contains('active')) {
      stopRaceLoop()
    }
    if (screens.game1?.classList.contains('active')) {
      pauseGame1Physics()
    }
    return
  }

  if (screens.game1?.classList.contains('active')) {
    resumeGame1Physics()
  }
})

if (luckGameGrid) {
  luckGameGrid.addEventListener('scroll', handleLuckCarouselScroll, { passive: true })
}

window.addEventListener('roulette-catalog-refreshed', () => {
  luckCarouselActiveIndex = 0
  syncLuckCarousel({ align: screens.luck?.classList.contains('active') })
})

if (physicalGameGrid) {
  physicalGameGrid.addEventListener('scroll', handlePhysicalCarouselScroll, { passive: true })
}

window.addEventListener('popstate', (event) => {
  const state = event.state

  if (state?.appId !== APP_HISTORY_ID || !screens[state.screen]) {
    return
  }

  currentHistoryIndex = Number.isFinite(state.index) ? state.index : 0
  showScreen(state.screen, { historyMode: 'skip' })
})



let customCursorEl = null
let customCursorRaf = null
let customCursorX = 0
let customCursorY = 0
let customCursorHoverState = ''

function canUseCustomCursor() {
  return window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(pointer: coarse)').matches
}

function updateCustomCursorPosition(x, y) {
  if (!customCursorEl) return
  customCursorX = x
  customCursorY = y

  if (customCursorRaf) return

  customCursorRaf = requestAnimationFrame(() => {
    customCursorRaf = null
    if (!customCursorEl) return
    customCursorEl.style.setProperty('--cursor-x', `${customCursorX}px`)
    customCursorEl.style.setProperty('--cursor-y', `${customCursorY}px`)
  })
}

function syncCustomCursorState(target) {
  if (!customCursorEl) return

  const element = target instanceof Element ? target : null
  const interactive = element?.closest('button, a, input, textarea, select, summary, label, [role="button"], .game-item, .luck-carousel-dot, .physical-carousel-dot, .utility-btn, .action-btn, .back-btn, .popup-btn, .sim-info-btn, .sim-arena-zoom-btn')
  const textEditable = element?.closest('input:not([type="button"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable="true"]')
  const nextState = `${Boolean(interactive)}:${Boolean(textEditable)}`

  if (customCursorHoverState === nextState) return
  customCursorHoverState = nextState

  customCursorEl.classList.toggle('is-hover', Boolean(interactive))
  customCursorEl.classList.toggle('is-text', Boolean(textEditable))
  document.documentElement.classList.toggle('app-native-text-cursor', Boolean(textEditable))
}

function initCustomCursor() {
  if (!canUseCustomCursor() || document.getElementById('appCursor')) return

  customCursorEl = document.createElement('div')
  customCursorEl.id = 'appCursor'
  customCursorEl.className = 'app-cursor'
  customCursorEl.setAttribute('aria-hidden', 'true')
  document.body.appendChild(customCursorEl)

  document.addEventListener('pointermove', (event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return
    if (!customCursorEl) return
    document.documentElement.classList.add('app-custom-cursor')
    customCursorEl.classList.add('is-visible')
    updateCustomCursorPosition(event.clientX, event.clientY)
    syncCustomCursorState(event.target)
  }, true)

  document.addEventListener('pointerdown', (event) => {
    if (!customCursorEl) return
    if (event.pointerType && event.pointerType !== 'mouse') return
    document.documentElement.classList.add('app-custom-cursor')
    customCursorEl.classList.add('is-visible')
    customCursorEl.classList.add('is-press')
    syncCustomCursorState(event.target)
  }, true)

  document.addEventListener('pointerup', () => {
    customCursorEl?.classList.remove('is-press')
  }, true)

  document.addEventListener('pointerout', (event) => {
    if (!event.relatedTarget) {
      customCursorHoverState = ''
      document.documentElement.classList.remove('app-custom-cursor', 'app-native-text-cursor')
      customCursorEl?.classList.remove('is-visible', 'is-hover', 'is-press', 'is-text')
    }
  }, true)

  window.addEventListener('blur', () => {
    customCursorHoverState = ''
    document.documentElement.classList.remove('app-custom-cursor', 'app-native-text-cursor')
    customCursorEl?.classList.remove('is-visible', 'is-hover', 'is-press', 'is-text')
  })
}

applyThemePreference(getSavedThemePreference(), { persist: false })
updateHellModeControls()
updateFullscreenToggleButton()
updatePrevStepButtons()
installSiteAudioInteractions()

updateGame1BallCountText()
decorateLuckGameFastForwardBadges()
syncGame1MobileLayout()
syncRaceMobileLayout()
syncSimResponsiveLayout()
syncLuckCarousel()
syncPhysicalCarousel()
updateRaceTrackZoomButton()
updateSimArenaZoomButton()
updateRouletteStageZoomButton()
updateOrientationGate()
initCustomCursor()
installEmojiFallbacks()

setGame1InputLock(false)
setGame1ShuffleLock(false)

setRaceInputLock(false)
setRaceShuffleLock(false)
setSimInputLock(false)
setSimShuffleLock(false)
updateAllGameStartButtonRunningStates()

function monitorActiveGameStartButton() {
  if (!document.hidden && document.body.classList.contains('app-active-game')) {
    updateAllGameStartButtonRunningStates()
  }
  window.RandomRouletteWakeLock?.sync?.(window.RandomRouletteSession?.isRunning?.(currentScreenKey) || false)
  setTimeout(monitorActiveGameStartButton, document.hidden ? 2500 : 1000)
}

setTimeout(monitorActiveGameStartButton, 1000)

if (configInput) {
  updateSlotsFromInput({ build: false })
}

if (raceConfigInput) {
  updateRaceFromInput({ render: false })
}

if (simConfigInput) {
  updateSimFromInput({ render: false })
}

if (navalConfigInput) {
  updateNavalFromInput({ render: false })
}

if (stockDurationInput) {
  stockDurationSeconds = clampStockDuration(stockDurationInput.value)
  stockDurationInput.value = String(stockDurationSeconds)
  updateStockDurationText()
}

if (stockConfigInput) {
  updateStockFromInput({ render: false, preserveDrafts: true })
}

if (ladderConfigInput) {
  updateLadderFromInput({ render: false })
}

if (balloonConfigInput) {
  updateBalloonFromInput({ render: false })
}

if (screens.home) {
  currentScreenKey = getActiveScreenKey()
  showScreen('home', { historyMode: 'replace' })
}


function updateStockDurationSliderVisual() {
  if (!stockDurationInput) return

  const min = Number(stockDurationInput.min || 0)
  const max = Number(stockDurationInput.max || 100)
  const value = Number(stockDurationInput.value || min)
  const percent = max > min ? ((value - min) / (max - min)) * 100 : 0

  stockDurationInput.style.setProperty('--stock-duration-progress', `${percent}%`)
}

if (stockDurationInput) {
  const syncStockDurationSliderVisual = () => updateStockDurationSliderVisual()
  stockDurationInput.addEventListener('input', syncStockDurationSliderVisual)
  stockDurationInput.addEventListener('change', syncStockDurationSliderVisual)
  updateStockDurationSliderVisual()
}
