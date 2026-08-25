/* generated from script.js · physical-games.js */
function parseBalloonPlayers(text) {
  const names = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!names.length) {
    return { status: 'EMPTY' }
  }

  const seen = new Set()
  const players = []

  for (const name of names) {
    if (seen.has(name)) {
      return { status: 'DUPLICATE', name }
    }

    seen.add(name)
    players.push({
      id: `balloon-${players.length + 1}-${name}`,
      label: name,
      color: getCommonPlayerPaletteByTheme()[players.length % getCommonPlayerPaletteByTheme().length]
    })

    if (players.length > BALLOON_MAX_PLAYERS) {
      return { status: 'TOO_MANY' }
    }
  }

  if (players.length < BALLOON_MIN_PLAYERS) {
    return { status: 'TOO_FEW', players }
  }

  return { status: 'OK', players }
}

function updateBalloonFromInput(options = {}) {
  const { render = true } = options
  if (!balloonConfigInput) return false

  const parsed = parseBalloonPlayers(balloonConfigInput.value)

  if (parsed.status === 'OK') {
    balloonPlayers = parsed.players
    balloonLastValidConfigText = balloonConfigInput.value
    balloonLastAppliedRawText = balloonConfigInput.value

    if (balloonStatusText && !balloonGameStarted) {
      balloonStatusText.textContent = '참가자 등록 완료. 시작을 누르면 첫 참가자부터 풍선을 누를 수 있어.'
    }

    if (render) renderBalloonGame()
    return true
  }

  if (!balloonGameStarted) {
    if (parsed.status === 'TOO_FEW' && parsed.players?.length) {
      balloonPlayers = parsed.players
      if (balloonStatusText) {
        balloonStatusText.textContent = `최소 ${BALLOON_MIN_PLAYERS}명부터 시작할 수 있어.`
      }
    } else if (balloonStatusText) {
      const messages = {
        EMPTY: '참가자를 2명 이상 입력해줘.',
        DUPLICATE: '중복 이름은 사용할 수 없어.',
        TOO_MANY: `참가자는 최대 ${BALLOON_MAX_PLAYERS}명까지 가능해.`
      }
      balloonStatusText.textContent = messages[parsed.status] || '참가자 입력을 확인해줘.'
    }
  }

  if (render) renderBalloonGame()
  return false
}

function setBalloonInputLock(isLocked) {
  if (!balloonConfigInput) return
  balloonConfigInput.disabled = isLocked
  balloonConfigInput.style.opacity = isLocked ? '0.65' : '1'
  balloonConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
}

function getCurrentBalloonPlayer() {
  return balloonPlayers[balloonCurrentIndex] || null
}

function getBalloonPressurePercent() {
  if (!balloonBurstPressure) return 0
  return clampValue((balloonPressure / balloonBurstPressure) * 100, 0, 100)
}

function updateBalloonVisual() {
  const scale = clampValue(1 + balloonPressure * 0.0105, 1, 2.55)
  const currentPlayer = getCurrentBalloonPlayer()
  const currentColor = currentPlayer?.color || getCommonPlayerPaletteByTheme()[0] || '#ff6f9f'
  if (balloonVisual) {
    balloonVisual.style.setProperty('--balloon-scale', scale.toFixed(3))
    balloonVisual.style.setProperty('--balloon-current-color', currentColor)
    balloonVisual.classList.remove('is-warning', 'is-danger')
    balloonVisual.classList.toggle('is-popped', balloonPopped)
  }

  if (balloonPressureNumber) {
    balloonPressureNumber.textContent = balloonPopped ? 'POP!' : (balloonHolding ? 'HOLD' : 'READY')
  }

  if (balloonPressureLabel) {
    balloonPressureLabel.textContent = balloonPopped ? '터짐' : (balloonGameStarted ? '언제 터질까?' : '꾹 누르기')
  }

  if (balloonPressureFill) {
    balloonPressureFill.style.width = '0%'
    balloonPressureFill.classList.remove('is-warning', 'is-danger')
  }

  if (balloonPressArea) {
    balloonPressArea.classList.toggle('is-disabled', !balloonGameStarted || balloonPopped)
    balloonPressArea.classList.toggle('is-holding', balloonHolding)
    balloonPressArea.classList.toggle('is-popped', balloonPopped)
  }
}

function renderBalloonPlayers() {
  if (!balloonPlayerList || !balloonTotalInfo) return

  balloonTotalInfo.textContent = balloonPlayers.length ? `총 ${balloonPlayers.length}명` : '총 0명'

  if (!balloonPlayers.length) {
    balloonPlayerList.innerHTML = '<div class="balloon-player-empty">참가자를 입력하면 차례가 표시돼.</div>'
    return
  }

  const currentPlayer = getCurrentBalloonPlayer()
  balloonPlayerList.innerHTML = balloonPlayers.map((player, index) => {
    const isCurrent = balloonGameStarted && !balloonPopped && currentPlayer?.id === player.id
    const isLoser = balloonPopped && currentPlayer?.id === player.id
    const label = isLoser ? '터뜨림' : isCurrent ? '현재 차례' : `${index + 1}번째`
    return `
      <div class="balloon-player-item${isCurrent ? ' is-current' : ''}${isLoser ? ' is-loser' : ''}" style="--balloon-player-color:${player.color};">
        <span class="balloon-player-dot"></span>
        <strong>${escapeHtml(player.label)}</strong>
        <span>${label}</span>
      </div>
    `
  }).join('')
}

function renderBalloonGame() {
  renderBalloonPlayers()

  const passMode = isUsingBalloonPhonePassMode()
  const currentPlayer = getCurrentBalloonPlayer()
  const currentColor = currentPlayer?.color || getCommonPlayerPaletteByTheme()[0] || '#ff6f9f'
  const currentColorName = currentPlayer?.label || '현재'

  if (balloonPressArea) {
    balloonPressArea.style.setProperty('--balloon-current-color', currentColor)
  }

  if (balloonTurnBadge) {
    balloonTurnBadge.style.setProperty('--balloon-current-color', currentColor)
    if (passMode) {
      if (balloonPopped) {
        balloonTurnBadge.textContent = '당첨'
      } else if (balloonGameStarted) {
        balloonTurnBadge.textContent = `${currentColorName} 차례`
      } else {
        balloonTurnBadge.textContent = '대기'
      }
    } else if (balloonPopped && currentPlayer) {
      balloonTurnBadge.textContent = `${currentPlayer.label} 당첨`
    } else if (balloonGameStarted && currentPlayer) {
      balloonTurnBadge.textContent = `${currentPlayer.label} 차례`
    } else {
      balloonTurnBadge.textContent = '대기'
    }
  }

  if (balloonStatusText && passMode && !balloonGameStarted && !balloonPopped) {
    balloonStatusText.textContent = '시작을 누른 뒤 휴대폰을 넘겨줘. 풍선 색이 바뀌면 다음 사람이 누르면 돼.'
  }

  if (balloonStageHint) {
    if (passMode) {
      if (balloonPopped) {
        balloonStageHint.textContent = '풍선이 터졌어. 지금 휴대폰을 들고 있던 사람이 당첨이야.'
      } else if (balloonHolding) {
        balloonStageHint.textContent = '누르는 중... 손을 떼면 다음 차례로 넘어가.'
      } else if (balloonGameStarted) {
        balloonStageHint.textContent = `${currentColorName} 색 차례. 현재 들고 있는 사람이 풍선을 길게 눌러줘.`
      } else {
        balloonStageHint.textContent = '시작을 누른 뒤, 현재 차례 참가자가 풍선을 길게 눌러줘.'
      }
    } else if (balloonPopped && currentPlayer) {
      balloonStageHint.textContent = `${currentPlayer.label}님이 풍선을 터뜨렸어. 리셋 후 다시 시작할 수 있어.`
    } else if (balloonHolding && currentPlayer) {
      balloonStageHint.textContent = `${currentPlayer.label}님이 누르는 중... 손을 떼기 전까지 계속 커져.`
    } else if (balloonGameStarted && currentPlayer) {
      balloonStageHint.textContent = `${currentPlayer.label}님 차례. 풍선을 길게 누르고, 무섭다 싶으면 손을 떼서 다음 사람에게 넘겨.`
    } else {
      balloonStageHint.textContent = '시작을 누른 뒤, 현재 차례의 참가자가 풍선을 길게 눌러줘.'
    }
  }

  setPhysicalStartButtonRunningState(startBalloonBtn, balloonGameStarted && !balloonPopped)
  updateBalloonVisual()
}

function ensureBalloonReady() {
  if (isUsingBalloonPhonePassMode()) {
    ensureBalloonPhonePassPlayers()
  } else if (!balloonPlayers.length) {
    updateBalloonFromInput({ render: false })
  }
  renderBalloonGame()
}

function startBalloonGame() {
  if (balloonGameStarted && !balloonPopped) return

  const passMode = isUsingBalloonPhonePassMode()
  let parsed = null

  if (passMode) {
    ensureBalloonPhonePassPlayers()
  } else {
    if (!balloonConfigInput) return

    parsed = parseBalloonPlayers(balloonConfigInput.value)

    if (parsed.status !== 'OK') {
      const maxText = `${BALLOON_MIN_PLAYERS}~${BALLOON_MAX_PLAYERS}`
      showPopup('참가자 등록 확인', `풍선 불기 게임은 ${maxText}명이 이용 가능해.<br>참가자 이름은 쉼표로 구분하고 중복 없이 입력해줘.`, { icon: '⚠️', allowHtml: true })
      updateBalloonFromInput()
      return
    }

    balloonPlayers = parsed.players
    balloonLastValidConfigText = balloonConfigInput.value
    balloonLastAppliedRawText = balloonConfigInput.value
  }

  balloonGameStarted = true
  balloonPopped = false
  balloonHolding = false
  balloonCurrentIndex = 0
  balloonPressure = 0
  balloonBurstPressure = Number(rand(BALLOON_MIN_BURST_PRESSURE, BALLOON_MAX_BURST_PRESSURE).toFixed(3))

  playSfx('start')
  if (balloonStatusText) {
    balloonStatusText.textContent = passMode
      ? '게임 시작! 지금 휴대폰을 든 사람이 풍선을 길게 눌러줘.'
      : '게임 시작! 현재 차례의 참가자가 풍선을 꾹 눌러줘.'
  }

  setBalloonInputLock(!passMode)
  renderBalloonGame()
  if (!passMode) {
    scrollBalloonStageIntoViewAfterStart()
  }
}

function stopBalloonHold() {
  if (balloonHoldTimer) {
    clearInterval(balloonHoldTimer)
    balloonHoldTimer = null
  }
  balloonHolding = false
  updateBalloonVisual()
}

function resetBalloonGame() {
  const passMode = isUsingBalloonPhonePassMode()
  stopBalloonHold()
  balloonGameStarted = false
  balloonPopped = false
  balloonCurrentIndex = 0
  balloonPressure = 0
  balloonBurstPressure = 0
  setBalloonInputLock(false)

  if (passMode) {
    balloonPlayers = createPhonePassPlayers('balloon')
  }

  if (balloonVisual) {
    balloonVisual.classList.remove('is-popped', 'is-warning', 'is-danger')
  }

  if (balloonPopEffect) {
    balloonPopEffect.classList.remove('is-active')
  }

  if (balloonStatusText) {
    balloonStatusText.textContent = passMode
      ? '시작을 누른 뒤 휴대폰을 넘겨줘. 풍선 색이 바뀌면 다음 사람이 누르면 돼.'
      : '참가자를 등록한 뒤 시작을 누르면 첫 번째 참가자부터 풍선을 꾹 누를 수 있다.'
  }

  if (!passMode) {
    updateBalloonFromInput({ render: false })
  }
  renderBalloonGame()
}

function advanceBalloonTurn() {
  if (!balloonGameStarted || balloonPopped || !balloonPlayers.length) return

  const passMode = isUsingBalloonPhonePassMode()
  balloonCurrentIndex = (balloonCurrentIndex + 1) % balloonPlayers.length
  const currentPlayer = getCurrentBalloonPlayer()

  if (balloonStatusText && currentPlayer) {
    balloonStatusText.textContent = passMode
      ? `${currentPlayer.label} 색으로 바뀌었어. 다음 사람이 풍선을 꾹 눌러줘.`
      : `${currentPlayer.label}님 차례. 풍선을 꾹 눌러줘.`
  }

  playThrottledSfx('tick', 120)
  renderBalloonGame()
}

function popBalloon() {
  if (balloonPopped) return

  const passMode = isUsingBalloonPhonePassMode()
  const loser = getCurrentBalloonPlayer()
  stopBalloonHold()
  balloonPopped = true
  balloonGameStarted = false
  playSfx('balloonPop')

  if (balloonPressArea) {
    balloonPressArea.classList.add('is-popped')
  }

  if (balloonVisual) {
    balloonVisual.classList.add('is-popped')
  }

  if (balloonPopEffect) {
    balloonPopEffect.classList.remove('is-active')
    void balloonPopEffect.offsetWidth
    balloonPopEffect.classList.add('is-active')
  }

  if (balloonStatusText) {
    balloonStatusText.textContent = passMode
      ? '풍선이 터졌어. 지금 휴대폰을 들고 있던 사람이 당첨이야.'
      : (loser ? `${loser.label}님이 풍선을 터뜨렸어.` : '풍선이 터졌어.')
  }

  renderBalloonGame()

  if (passMode) {
    showPopup(
      '풍선 터짐!',
      '지금 휴대폰을 들고 있던 사람이 당첨입니다.<br>리셋 후 다시 시작할 수 있어요.',
      { icon: '🎈', allowHtml: true, popupClass: 'balloon-result-popup' }
    )
  } else if (loser) {
    showPopup(
      '풍선 터짐!',
      `<strong>${escapeHtml(loser.label)}</strong>님이 풍선을 터뜨렸습니다.<br>이번 게임의 당첨자입니다.`,
      { icon: '🎈', allowHtml: true, popupClass: 'balloon-result-popup' }
    )
  }
}

function inflateBalloonOnce() {
  if (!balloonGameStarted || balloonPopped || !balloonHolding) return

  balloonPressure += rand(BALLOON_MIN_PRESSURE_STEP, BALLOON_MAX_PRESSURE_STEP)
  playThrottledSfx('balloonInflate', SFX_THROTTLE_MS.balloonInflate)

  if (balloonPressure >= balloonBurstPressure) {
    balloonPressure = balloonBurstPressure
    updateBalloonVisual()
    popBalloon()
    return
  }

  updateBalloonVisual()
  renderBalloonPlayers()
}

function startBalloonPress(event) {
  if (event?.cancelable) event.preventDefault()

  const passMode = isUsingBalloonPhonePassMode()

  if (!balloonGameStarted || balloonPopped) {
    if (passMode) {
      ensureBalloonPhonePassPlayers()
    } else if (!balloonPlayers.length) {
      updateBalloonFromInput()
    }
    if (!balloonGameStarted && !balloonPopped) {
      showPopup('게임 시작 필요', passMode ? '시작 버튼을 먼저 눌러줘.' : '참가자를 등록한 뒤 시작 버튼을 먼저 눌러줘.', { icon: '🎈' })
    }
    return
  }

  if (balloonHolding) return

  balloonHolding = true

  if (balloonPressArea && event?.pointerId !== undefined && typeof balloonPressArea.setPointerCapture === 'function') {
    try {
      balloonPressArea.setPointerCapture(event.pointerId)
    } catch (error) {}
  }

  inflateBalloonOnce()

  if (!balloonPopped) {
    balloonHoldTimer = setInterval(inflateBalloonOnce, BALLOON_PRESS_INTERVAL_MS)
  }

  renderBalloonGame()
}

function endBalloonPress(event) {
  if (!balloonHolding) return

  if (balloonPressArea && event?.pointerId !== undefined && typeof balloonPressArea.releasePointerCapture === 'function') {
    try {
      balloonPressArea.releasePointerCapture(event.pointerId)
    } catch (error) {}
  }

  stopBalloonHold()

  if (!balloonPopped && balloonGameStarted) {
    advanceBalloonTurn()
  }
}


function canPlayBombPassOnThisDevice() {
  return isTouchDevice() && getViewportShortSide() <= 820
}

function setBombPassControlsLocked(isLocked) {
  setPhysicalStartButtonRunningState(startBombPassBtn, isLocked)
}

function updateBombPassGame() {
  const canPlay = canPlayBombPassOnThisDevice()

  if (bombPassStateBadge) {
    if (!canPlay) {
      bombPassStateBadge.textContent = '모바일 전용'
    } else if (bombPassExploded) {
      bombPassStateBadge.textContent = '폭발'
    } else if (bombPassRunning) {
      bombPassStateBadge.textContent = '전달 중'
    } else {
      bombPassStateBadge.textContent = '대기'
    }
  }

  if (bombPassStage) {
    bombPassStage.classList.toggle('is-running', bombPassRunning)
    bombPassStage.classList.toggle('is-exploded', bombPassExploded)
    bombPassStage.classList.toggle('is-desktop-blocked', !canPlay)
  }

  if (bombPassVisual) {
    bombPassVisual.classList.toggle('is-running', bombPassRunning)
    bombPassVisual.classList.toggle('is-exploded', bombPassExploded)
  }

  if (bombPassStatusText) {
    if (!canPlay) {
      bombPassStatusText.textContent = '이 게임은 핸드폰을 실제로 넘기며 플레이하는 모바일 전용 게임이야. 모바일에서 접속해줘.'
    } else if (bombPassExploded) {
      bombPassStatusText.textContent = '폭탄이 터졌어! 지금 핸드폰을 들고 있던 사람이 당첨이야. 리셋 후 다시 시작할 수 있어.'
    } else if (bombPassRunning) {
      bombPassStatusText.textContent = '폭탄 작동 중... 언제 터질지 몰라. 핸드폰을 조심히 넘겨줘.'
    } else {
      bombPassStatusText.textContent = '시작을 누른 뒤 핸드폰을 사람들에게 넘겨줘. 폭탄이 터지는 순간 들고 있던 사람이 당첨이야.'
    }
  }

  if (bombPassDeviceText) {
    const vibrationSupported = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function'
    bombPassDeviceText.textContent = canPlay
      ? (vibrationSupported ? '※ 이 기기에서는 진동 기능을 시도할 수 있습니다.' : '※ 현재 브라우저에서는 진동 기능이 지원되지 않을 수 있습니다.')
      : '※ 이 게임은 모바일 전용 게임입니다. 데스크톱에서는 목록에 표시되지 않도록 설정되어 있습니다.'
  }

  setBombPassControlsLocked(bombPassRunning)
}

function ensureBombPassReady() {
  updateBombPassGame()
}

function vibrateBombPassDevice() {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(BOMB_PASS_VIBRATION_PATTERN)
    }
  } catch (error) {}
}

function stopBombPassGame() {
  if (bombPassTimer) {
    clearTimeout(bombPassTimer)
    bombPassTimer = null
  }
  if (bombPassFuseTimer) {
    clearInterval(bombPassFuseTimer)
    bombPassFuseTimer = null
  }

  bombPassRunning = false
  bombPassStartedAt = 0
  bombPassDuration = 0
  updateBombPassGame()
}

function resetBombPassGame() {
  stopBombPassGame()
  bombPassExploded = false

  if (bombPassBoom) {
    bombPassBoom.classList.remove('is-active')
  }

  updateBombPassGame()
}

function explodeBombPassGame() {
  if (!bombPassRunning || bombPassExploded) return

  if (bombPassTimer) {
    clearTimeout(bombPassTimer)
    bombPassTimer = null
  }

  bombPassRunning = false
  bombPassExploded = true
  playSfx('bombExplosion')
  vibrateBombPassDevice()

  if (bombPassBoom) {
    bombPassBoom.classList.remove('is-active')
    void bombPassBoom.offsetWidth
    bombPassBoom.classList.add('is-active')
  }

  updateBombPassGame()

  showPopup(
    '폭탄 터짐!',
    '지금 핸드폰을 들고 있던 사람이 당첨입니다.<br>지원되는 기기에서는 폭발 순간 진동이 울립니다.',
    { icon: '💣', allowHtml: true, popupClass: 'bomb-pass-result-popup' }
  )
}

function startBombPassGame() {
  if (!canPlayBombPassOnThisDevice()) {
    showPopup('모바일 전용 게임', '폭탄 넘기기는 핸드폰을 실제로 넘기며 플레이하는 게임이라 모바일에서만 이용할 수 있어.', { icon: '📱' })
    updateBombPassGame()
    return
  }

  if (bombPassRunning) return

  bombPassExploded = false
  bombPassRunning = true
  bombPassStartedAt = Date.now()
  bombPassDuration = Math.round(rand(BOMB_PASS_MIN_DURATION_MS, BOMB_PASS_MAX_DURATION_MS))

  if (bombPassBoom) {
    bombPassBoom.classList.remove('is-active')
  }

  updateBombPassGame()
  playSfx('bombFuse')
  bombPassFuseTimer = setInterval(() => {
    if (!bombPassRunning || bombPassExploded) return
    const elapsedRatio = bombPassDuration ? (Date.now() - bombPassStartedAt) / bombPassDuration : 0
    playThrottledSfx(elapsedRatio > 0.72 ? 'bombPassWarning' : 'bombFuse', elapsedRatio > 0.72 ? 380 : SFX_THROTTLE_MS.bombFuse)
  }, 420)
  bombPassTimer = setTimeout(explodeBombPassGame, bombPassDuration)
}

function canPlayCircleTapOnThisDevice() {
  return isTouchDevice() && getViewportShortSide() <= 820
}

function parseCircleTapPlayers(text) {
  const names = String(text || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!names.length) return { status: 'EMPTY' }

  const seen = new Set()
  const players = []

  for (const name of names) {
    if (seen.has(name)) return { status: 'DUPLICATE', name }
    seen.add(name)

    players.push({
      id: `circle-tap-${players.length + 1}-${name}`,
      label: name,
      color: getCommonPlayerPaletteByTheme()[players.length % getCommonPlayerPaletteByTheme().length]
    })

    if (players.length > CIRCLE_TAP_MAX_PLAYERS) {
      return { status: 'TOO_MANY' }
    }
  }

  if (players.length < CIRCLE_TAP_MIN_PLAYERS) {
    return { status: 'TOO_FEW', players }
  }

  return { status: 'OK', players }
}

function setCircleTapInputLock(isLocked) {
  if (!circleTapConfigInput) return
  circleTapConfigInput.disabled = isLocked
  circleTapConfigInput.style.opacity = isLocked ? '0.65' : '1'
  circleTapConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
}

function setCircleTapPlayers(players) {
  circleTapPlayers = players
  circleTapLastValidConfigText = circleTapConfigInput ? circleTapConfigInput.value : circleTapLastValidConfigText
  circleTapLastAppliedRawText = circleTapConfigInput ? circleTapConfigInput.value : circleTapLastAppliedRawText
}

function updateCircleTapFromInput(options = {}) {
  const { render = true } = options
  if (!circleTapConfigInput) return false

  const parsed = parseCircleTapPlayers(circleTapConfigInput.value)

  if (parsed.status === 'OK') {
    setCircleTapPlayers(parsed.players)
    if (circleTapStatusText && !circleTapStarted) {
      circleTapStatusText.textContent = '참가자 등록 완료. 시작을 누르면 첫 번째 참가자 색상의 원이 나타나.'
    }
    if (render) renderCircleTapGame()
    return true
  }

  if (!circleTapStarted) {
    if (parsed.status === 'TOO_FEW' && parsed.players?.length) {
      circleTapPlayers = parsed.players
      if (circleTapStatusText) circleTapStatusText.textContent = `최소 ${CIRCLE_TAP_MIN_PLAYERS}명부터 시작할 수 있어.`
    } else if (circleTapStatusText) {
      const messages = {
        EMPTY: '참가자를 2명 이상 입력해줘.',
        DUPLICATE: '중복 이름은 사용할 수 없어.',
        TOO_MANY: `참가자는 최대 ${CIRCLE_TAP_MAX_PLAYERS}명까지 가능해.`
      }
      circleTapStatusText.textContent = messages[parsed.status] || '참가자 입력을 확인해줘.'
    }
  }

  if (render) renderCircleTapGame()
  return false
}

function getCurrentCircleTapPlayer() {
  return circleTapPlayers[circleTapCurrentIndex] || null
}

function resetCircleTapTargetPosition() {
  circleTapTargetX = 50
  circleTapTargetY = 50
}

function randomizeCircleTapTargetPosition() {
  if (!circleTapStage) {
    resetCircleTapTargetPosition()
    return
  }

  const stageRect = circleTapStage.getBoundingClientRect()
  const safeRadius = clampValue(circleTapRadius, CIRCLE_TAP_MIN_RADIUS, CIRCLE_TAP_START_RADIUS)

  if (!stageRect.width || !stageRect.height) {
    resetCircleTapTargetPosition()
    return
  }

  const minX = safeRadius + CIRCLE_TAP_EDGE_PADDING
  const maxX = Math.max(minX, stageRect.width - safeRadius - CIRCLE_TAP_EDGE_PADDING)
  const minY = safeRadius + CIRCLE_TAP_EDGE_PADDING
  const maxY = Math.max(minY, stageRect.height - safeRadius - CIRCLE_TAP_EDGE_PADDING)
  const previousX = (circleTapTargetX / 100) * stageRect.width
  const previousY = (circleTapTargetY / 100) * stageRect.height
  const minMove = Math.min(stageRect.width, stageRect.height) * CIRCLE_TAP_MIN_RANDOM_MOVE_RATIO

  let nextX = rand(minX, maxX)
  let nextY = rand(minY, maxY)

  if (maxX > minX && maxY > minY) {
    for (let attempt = 0; attempt < 10; attempt += 1) {
      const candidateX = rand(minX, maxX)
      const candidateY = rand(minY, maxY)
      if (Math.hypot(candidateX - previousX, candidateY - previousY) >= minMove) {
        nextX = candidateX
        nextY = candidateY
        break
      }
    }
  }

  circleTapTargetX = clampValue((nextX / stageRect.width) * 100, 0, 100)
  circleTapTargetY = clampValue((nextY / stageRect.height) * 100, 0, 100)
}

function updateCircleTapVisual() {
  const currentPlayer = getCurrentCircleTapPlayer()
  const currentColor = currentPlayer?.color || getCommonPlayerPaletteByTheme()[0] || '#ff82ad'
  const safeRadius = clampValue(circleTapRadius, CIRCLE_TAP_MIN_RADIUS, CIRCLE_TAP_START_RADIUS)
  const diameter = Math.round(safeRadius * 2)

  if (circleTapStage) {
    circleTapStage.classList.toggle('is-started', circleTapStarted && !circleTapFinished)
    circleTapStage.classList.toggle('is-finished', circleTapFinished)
    circleTapStage.classList.toggle('is-mobile-blocked', !canPlayCircleTapOnThisDevice())
    circleTapStage.style.setProperty('--circle-tap-current-color', currentColor)
  }

  if (circleTapTarget) {
    circleTapTarget.style.setProperty('--circle-tap-size', `${diameter}px`)
    circleTapTarget.style.setProperty('--circle-tap-current-color', currentColor)
    circleTapTarget.style.setProperty('--circle-tap-x', `${circleTapTargetX}%`)
    circleTapTarget.style.setProperty('--circle-tap-y', `${circleTapTargetY}%`)
    circleTapTarget.classList.toggle('is-active', circleTapStarted && !circleTapFinished)
    circleTapTarget.classList.toggle('is-finished', circleTapFinished)
  }

  if (circleTapCount) {
    circleTapCount.textContent = `${circleTapSuccessCount}회`
  }

}

function renderCircleTapPlayers() {
  if (!circleTapPlayerList || !circleTapTotalInfo) return

  circleTapTotalInfo.textContent = circleTapPlayers.length ? `총 ${circleTapPlayers.length}명` : '총 0명'

  if (!circleTapPlayers.length) {
    circleTapPlayerList.innerHTML = '<div class="circle-tap-player-empty">참가자를 입력하면 차례 색상이 표시돼.</div>'
    return
  }

  const currentPlayer = getCurrentCircleTapPlayer()
  circleTapPlayerList.innerHTML = circleTapPlayers.map((player, index) => {
    const isCurrent = circleTapStarted && !circleTapFinished && currentPlayer?.id === player.id
    const isLoser = circleTapFinished && currentPlayer?.id === player.id
    const label = isLoser ? '탈락' : isCurrent ? '현재 차례' : `${index + 1}번째`
    return `
      <div class="circle-tap-player-item${isCurrent ? ' is-current' : ''}${isLoser ? ' is-loser' : ''}" style="--circle-tap-player-color:${player.color};">
        <span class="circle-tap-player-dot"></span>
        <strong>${escapeHtml(player.label)}</strong>
        <span>${label}</span>
      </div>
    `
  }).join('')
}

function renderCircleTapGame() {
  renderCircleTapPlayers()

  const canPlay = canPlayCircleTapOnThisDevice()
  const passMode = isUsingCircleTapPhonePassMode()
  const currentPlayer = getCurrentCircleTapPlayer()
  const currentColorName = currentPlayer?.label || '현재'

  if (circleTapTurnBadge) {
    if (!canPlay) {
      circleTapTurnBadge.textContent = '모바일 전용'
    } else if (passMode) {
      if (circleTapFinished) {
        circleTapTurnBadge.textContent = '탈락'
      } else if (circleTapStarted) {
        circleTapTurnBadge.textContent = `${currentColorName} 차례`
      } else {
        circleTapTurnBadge.textContent = '대기'
      }
    } else if (circleTapFinished && currentPlayer) {
      circleTapTurnBadge.textContent = `${currentPlayer.label} 탈락`
    } else if (circleTapStarted && currentPlayer) {
      circleTapTurnBadge.textContent = `${currentPlayer.label} 차례`
    } else {
      circleTapTurnBadge.textContent = '대기'
    }
  }

  if (circleTapStatusText && passMode && !circleTapStarted && !circleTapFinished) {
    circleTapStatusText.textContent = '시작을 누른 뒤 휴대폰을 넘겨줘. 원 색이 바뀌면 다음 사람이 누르면 돼.'
  }

  if (circleTapStageHint) {
    if (!canPlay) {
      circleTapStageHint.textContent = '작아지는 원은 손가락 터치 판정이 핵심이라 모바일에서만 이용할 수 있어.'
    } else if (passMode) {
      if (circleTapFinished) {
        circleTapStageHint.textContent = '원 밖을 눌렀어. 지금 터치한 사람이 탈락이야.'
      } else if (circleTapStarted) {
        circleTapStageHint.textContent = `${currentColorName} 색 차례. 현재 들고 있는 사람이 원 안쪽을 정확히 눌러줘.`
      } else {
        circleTapStageHint.textContent = '시작을 누른 뒤, 현재 차례 참가자가 색상 원 안쪽을 정확히 눌러줘.'
      }
    } else if (circleTapFinished && currentPlayer) {
      circleTapStageHint.textContent = `${currentPlayer.label}님이 원 밖을 눌러 탈락했어. 리셋 후 다시 시작할 수 있어.`
    } else if (circleTapStarted && currentPlayer) {
      circleTapStageHint.textContent = `${currentPlayer.label}님 차례. 자신의 색 원 안쪽을 정확히 눌러줘. 원 밖을 누르면 바로 탈락이야.`
    } else {
      circleTapStageHint.textContent = '시작을 누른 뒤, 현재 차례 참가자가 색상 원 안쪽을 정확히 눌러줘.'
    }
  }

  setPhysicalStartButtonRunningState(startCircleTapBtn, circleTapStarted && !circleTapFinished)
  updateCircleTapVisual()
}

function ensureCircleTapReady() {
  if (isUsingCircleTapPhonePassMode()) {
    ensureCircleTapPhonePassPlayers()
  } else if (!circleTapPlayers.length) {
    updateCircleTapFromInput({ render: false })
  }
  renderCircleTapGame()
}

function startCircleTapGame() {
  if (circleTapStarted && !circleTapFinished) return

  if (!canPlayCircleTapOnThisDevice()) {
    showPopup('모바일 전용 게임', '작아지는 원은 손가락으로 원 안쪽을 정확히 누르는 모바일 전용 게임이야. 모바일에서 접속해줘.', { icon: '📱' })
    renderCircleTapGame()
    return
  }

  const passMode = isUsingCircleTapPhonePassMode()
  if (passMode) {
    ensureCircleTapPhonePassPlayers()
  } else {
    if (!circleTapConfigInput) return
    const parsed = parseCircleTapPlayers(circleTapConfigInput.value)

    if (parsed.status !== 'OK') {
      showPopup('참가자 등록 확인', `작아지는 원 게임은 ${CIRCLE_TAP_MIN_PLAYERS}~${CIRCLE_TAP_MAX_PLAYERS}명이 이용 가능해.<br>참가자 이름은 쉼표로 구분하고 중복 없이 입력해줘.`, { icon: '⚠️', allowHtml: true })
      updateCircleTapFromInput()
      return
    }

    setCircleTapPlayers(parsed.players)
  }

  circleTapStarted = true
  circleTapFinished = false
  circleTapCurrentIndex = 0
  circleTapRadius = CIRCLE_TAP_START_RADIUS
  circleTapSuccessCount = 0
  randomizeCircleTapTargetPosition()

  if (circleTapMissEffect) {
    circleTapMissEffect.classList.remove('is-active')
  }

  if (circleTapStatusText) {
    circleTapStatusText.textContent = passMode
      ? '게임 시작! 지금 휴대폰을 든 사람이 원 안쪽을 정확히 눌러줘.'
      : '게임 시작! 현재 차례 참가자는 자기 색상 원 안쪽을 정확히 눌러줘.'
  }

  setCircleTapInputLock(!passMode)
  renderCircleTapGame()
}

function stopCircleTapGame(options = {}) {
  const { preservePlayers = true } = options
  if (!preservePlayers) {
    circleTapPlayers = []
  }
  circleTapStarted = false
  renderCircleTapGame()
}

function resetCircleTapGame() {
  const passMode = isUsingCircleTapPhonePassMode()
  circleTapStarted = false
  circleTapFinished = false
  circleTapCurrentIndex = 0
  circleTapRadius = CIRCLE_TAP_START_RADIUS
  circleTapSuccessCount = 0
  resetCircleTapTargetPosition()
  setCircleTapInputLock(false)

  if (passMode) {
    circleTapPlayers = createPhonePassPlayers('circle-tap')
  }

  if (circleTapMissEffect) {
    circleTapMissEffect.classList.remove('is-active')
  }

  if (circleTapStatusText) {
    circleTapStatusText.textContent = passMode
      ? '시작을 누른 뒤 휴대폰을 넘겨줘. 원 색이 바뀌면 다음 사람이 누르면 돼.'
      : '참가자를 등록한 뒤 시작을 누르면 현재 차례의 색상 원을 정확히 눌러줘.'
  }

  if (!passMode) {
    updateCircleTapFromInput({ render: false })
  }
  renderCircleTapGame()
}

function advanceCircleTapTurn() {
  if (!circleTapStarted || circleTapFinished || !circleTapPlayers.length) return
  const passMode = isUsingCircleTapPhonePassMode()
  circleTapCurrentIndex = (circleTapCurrentIndex + 1) % circleTapPlayers.length
  const currentPlayer = getCurrentCircleTapPlayer()

  if (circleTapStatusText && currentPlayer) {
    circleTapStatusText.textContent = passMode
      ? `${currentPlayer.label} 색으로 바뀌었어. 다음 사람이 원 안쪽을 정확히 눌러줘.`
      : `${currentPlayer.label}님 차례. 원 안쪽을 정확히 눌러줘.`
  }

  renderCircleTapGame()
}

function shrinkCircleTapTarget() {
  const shrinkRatio = rand(CIRCLE_TAP_SHRINK_MIN, CIRCLE_TAP_SHRINK_MAX)
  const shrinkAmount = Math.max(0.75, circleTapRadius * shrinkRatio)
  circleTapRadius = Math.max(CIRCLE_TAP_MIN_RADIUS, circleTapRadius - shrinkAmount)
  circleTapSuccessCount += 1
  randomizeCircleTapTargetPosition()
}

function failCircleTapGame() {
  if (!circleTapStarted || circleTapFinished) return

  const passMode = isUsingCircleTapPhonePassMode()
  const loser = getCurrentCircleTapPlayer()
  playSfx('circleMiss')
  circleTapFinished = true
  circleTapStarted = false

  if (circleTapMissEffect) {
    circleTapMissEffect.classList.remove('is-active')
    void circleTapMissEffect.offsetWidth
    circleTapMissEffect.classList.add('is-active')
  }

  if (circleTapStatusText) {
    circleTapStatusText.textContent = passMode
      ? '원 밖을 눌렀어. 지금 터치한 사람이 탈락이야.'
      : (loser ? `${loser.label}님이 원 밖을 눌러 탈락했어.` : '원 밖을 눌러 탈락했어.')
  }

  renderCircleTapGame()

  if (passMode) {
    showPopup(
      '원 밖 터치!',
      '지금 터치한 사람이 탈락입니다.<br>리셋 후 다시 시작할 수 있어요.',
      { icon: '⭕', allowHtml: true, popupClass: 'circle-tap-result-popup' }
    )
  } else if (loser) {
    showPopup(
      '원 밖 터치!',
      `<strong>${escapeHtml(loser.label)}</strong>님이 원 밖을 눌렀습니다.<br>이번 게임의 탈락자입니다.`,
      { icon: '⭕', allowHtml: true, popupClass: 'circle-tap-result-popup' }
    )
  }
}

function getCircleTapPointerResult(event) {
  if (!circleTapTarget || !event) return { inside: false }

  const rect = circleTapTarget.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const x = event.clientX
  const y = event.clientY
  const distance = Math.hypot(x - centerX, y - centerY)
  const radius = rect.width / 2

  return { inside: distance <= radius, distance, radius }
}

function handleCircleTapPointer(event) {
  if (event?.cancelable) event.preventDefault()

  if (!canPlayCircleTapOnThisDevice()) {
    showPopup('모바일 전용 게임', '이 게임은 손가락 터치 판정이 핵심이라 모바일에서만 이용할 수 있어.', { icon: '📱' })
    renderCircleTapGame()
    return
  }

  if (!circleTapStarted || circleTapFinished) {
    showPopup('게임 시작 필요', isUsingCircleTapPhonePassMode() ? '시작 버튼을 먼저 눌러줘.' : '참가자를 등록한 뒤 시작 버튼을 먼저 눌러줘.', { icon: '⭕' })
    return
  }

  const result = getCircleTapPointerResult(event)

  if (!result.inside) {
    failCircleTapGame()
    return
  }

  shrinkCircleTapTarget()
  playThrottledSfx('circleHit', SFX_THROTTLE_MS.circleHit)
  updateCircleTapVisual()

  if (circleTapTarget) {
    circleTapTarget.classList.remove('is-hit')
    void circleTapTarget.offsetWidth
    circleTapTarget.classList.add('is-hit')
  }

  advanceCircleTapTurn()
}


function canPlayKeyReactOnThisDevice() {
  return !isMobileOrTabletLike()
}

function normalizeKeyReactKey(value) {
  const text = String(value || '')
  if (text === ' ') return 'SPACE'

  const raw = text.trim()
  if (!raw) return ''

  const aliases = {
    Spacebar: 'SPACE',
    Space: 'SPACE',
    Enter: 'ENTER',
    Escape: 'ESC',
    Esc: 'ESC',
    Backspace: 'BACKSPACE',
    Delete: 'DELETE',
    ArrowUp: '↑',
    ArrowDown: '↓',
    ArrowLeft: '←',
    ArrowRight: '→',
    Minus: '-',
    Equal: '=',
    BracketLeft: '[',
    BracketRight: ']',
    Semicolon: ';',
    Quote: "'",
    Comma: ',',
    Period: '.',
    Slash: '/',
    Backslash: '\\',
    Backquote: '`'
  }

  if (aliases[raw]) return aliases[raw]
  if (/^Key[A-Z]$/i.test(raw)) return raw.slice(3).toUpperCase()
  if (/^Digit[0-9]$/i.test(raw)) return raw.slice(5)
  if (/^Numpad[0-9]$/i.test(raw)) return `NUM${raw.slice(6)}`
  if (raw.length === 1) return raw.toUpperCase()
  return raw.replace(/^Key/i, '').replace(/^Digit/i, '').toUpperCase()
}

function normalizeKeyReactEventKey(event) {
  const code = String(event?.code || '')

  if (/^Key[A-Z]$/.test(code)) return code.slice(3)
  if (/^Digit[0-9]$/.test(code)) return code.slice(5)
  if (/^Numpad[0-9]$/.test(code)) return `NUM${code.slice(6)}`

  const codeAliases = {
    Space: 'SPACE',
    Enter: 'ENTER',
    Escape: 'ESC',
    Backspace: 'BACKSPACE',
    Delete: 'DELETE',
    ArrowUp: '↑',
    ArrowDown: '↓',
    ArrowLeft: '←',
    ArrowRight: '→',
    Minus: '-',
    Equal: '=',
    BracketLeft: '[',
    BracketRight: ']',
    Semicolon: ';',
    Quote: "'",
    Comma: ',',
    Period: '.',
    Slash: '/',
    Backslash: '\\',
    Backquote: '`'
  }

  if (codeAliases[code]) return codeAliases[code]
  return normalizeKeyReactKey(event?.key || '')
}

function getDefaultKeyReactKey(index, usedKeys = new Set()) {
  const fallbackKeys = [...KEY_REACT_DEFAULT_KEYS, 'Q', 'W', 'E', 'R', 'U', 'I', 'O', 'P']
  const found = fallbackKeys.find((key) => !usedKeys.has(key))
  return found || `F${index + 1}`
}

function getKeyReactPlayerResult(playerId) {
  return keyReactResults.find((result) => result.playerId === playerId) || null
}

function getValidKeyReactResults() {
  return keyReactResults.filter((result) => result.status === 'valid')
}

function getKeyReactResultLabel(player) {
  const result = getKeyReactPlayerResult(player.id)
  if (!result) {
    if (keyReactPhase === 'click') return '입력 대기'
    if (keyReactPhase === 'stay') return '누르면 실격'
    if (keyReactPhase === 'countdown') return '준비 중'
    return '대기'
  }

  if (result.status === 'false-start') return '실격'

  const rank = getValidKeyReactResults().findIndex((item) => item.playerId === player.id) + 1
  return `${rank}위 · ${result.reactionMs}ms`
}

function parseKeyReactPlayers(text) {
  const names = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!names.length) return { status: 'EMPTY' }

  const seen = new Set()
  const usedKeys = new Set()
  const existingKeyByName = new Map(keyReactPlayers.map((player) => [player.label, player.key]))
  const players = []

  for (const name of names) {
    if (seen.has(name)) return { status: 'DUPLICATE', name }
    seen.add(name)

    const existingKey = normalizeKeyReactKey(existingKeyByName.get(name) || '')
    const assignedKey = existingKey && !usedKeys.has(existingKey)
      ? existingKey
      : getDefaultKeyReactKey(players.length, usedKeys)

    usedKeys.add(assignedKey)
    players.push({
      id: `key-react-${players.length + 1}-${name}`,
      label: name,
      key: assignedKey,
      color: getCommonPlayerPaletteByTheme()[players.length % getCommonPlayerPaletteByTheme().length]
    })

    if (players.length > KEY_REACT_MAX_PLAYERS) {
      return { status: 'TOO_MANY' }
    }
  }

  if (players.length < KEY_REACT_MIN_PLAYERS) {
    return { status: 'TOO_FEW', players }
  }

  return { status: 'OK', players }
}

function getKeyReactDuplicateKeys(players = keyReactPlayers) {
  const counts = new Map()
  players.forEach((player) => {
    const key = normalizeKeyReactKey(player.key)
    if (!key) return
    counts.set(key, (counts.get(key) || 0) + 1)
  })

  return new Set([...counts.entries()].filter(([, count]) => count > 1).map(([key]) => key))
}

function updateKeyReactFromInput(options = {}) {
  const { render = true } = options
  if (!keyReactConfigInput) return false

  const parsed = parseKeyReactPlayers(keyReactConfigInput.value)

  if (parsed.status === 'OK') {
    keyReactPlayers = parsed.players
    keyReactLastValidConfigText = keyReactConfigInput.value
    keyReactLastAppliedRawText = keyReactConfigInput.value

    if (keyReactStatusText && keyReactPhase === 'idle') {
      keyReactStatusText.textContent = '참가자 등록 완료. 각자 사용할 키를 지정한 뒤 시작을 눌러줘.'
    }

    if (render) renderKeyReactGame()
    return true
  }

  if (keyReactPhase === 'idle') {
    if (parsed.status === 'TOO_FEW' && parsed.players?.length) {
      keyReactPlayers = parsed.players
      if (keyReactStatusText) keyReactStatusText.textContent = `최소 ${KEY_REACT_MIN_PLAYERS}명부터 시작할 수 있어.`
    } else if (keyReactStatusText) {
      const messages = {
        EMPTY: '참가자를 2명 이상 입력해줘.',
        DUPLICATE: '중복 이름은 사용할 수 없어.',
        TOO_MANY: `참가자는 최대 ${KEY_REACT_MAX_PLAYERS}명까지 가능해.`
      }
      keyReactStatusText.textContent = messages[parsed.status] || '참가자 입력을 확인해줘.'
    }
  }

  if (render) renderKeyReactGame()
  return false
}

function setKeyReactInputLock(isLocked) {
  if (keyReactConfigInput) {
    keyReactConfigInput.disabled = isLocked
    keyReactConfigInput.style.opacity = isLocked ? '0.65' : '1'
    keyReactConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
  }

  if (keyReactKeyList) {
    keyReactKeyList.querySelectorAll('.key-react-key-input').forEach((input) => {
      input.disabled = isLocked
      input.style.opacity = isLocked ? '0.65' : '1'
      input.style.cursor = isLocked ? 'not-allowed' : 'pointer'
    })
  }
}

function updateKeyReactPhaseVisuals() {
  if (keyReactStage) {
    keyReactStage.classList.remove('is-idle', 'is-countdown', 'is-stay', 'is-click', 'is-finished', 'is-desktop-blocked')
    keyReactStage.classList.add(`is-${keyReactPhase}`)
    keyReactStage.classList.toggle('is-desktop-blocked', !canPlayKeyReactOnThisDevice())
  }

  if (keyReactPhaseBadge) {
    if (!canPlayKeyReactOnThisDevice()) {
      keyReactPhaseBadge.textContent = 'PC 전용'
    } else if (keyReactPhase === 'countdown') {
      keyReactPhaseBadge.textContent = `준비 · ${keyReactCountdownLeft}`
    } else if (keyReactPhase === 'stay') {
      keyReactPhaseBadge.textContent = 'STAY'
    } else if (keyReactPhase === 'click') {
      keyReactPhaseBadge.textContent = 'CLICK!'
    } else if (keyReactPhase === 'finished') {
      keyReactPhaseBadge.textContent = '결과 완료'
    } else {
      keyReactPhaseBadge.textContent = '대기'
    }
  }

  if (keyReactSignalText) {
    if (!canPlayKeyReactOnThisDevice()) {
      keyReactSignalText.textContent = 'PC ONLY'
    } else if (keyReactPhase === 'countdown') {
      keyReactSignalText.textContent = String(keyReactCountdownLeft)
    } else if (keyReactPhase === 'stay') {
      keyReactSignalText.textContent = 'STAY...'
    } else if (keyReactPhase === 'click') {
      keyReactSignalText.textContent = 'CLICK!'
    } else if (keyReactPhase === 'finished') {
      keyReactSignalText.textContent = 'RESULT'
    } else {
      keyReactSignalText.textContent = 'READY'
    }
  }

  if (keyReactSignalSubText) {
    if (!canPlayKeyReactOnThisDevice()) {
      keyReactSignalSubText.textContent = '이 게임은 키보드 입력이 필요한 컴퓨터 전용 게임입니다.'
    } else if (keyReactPhase === 'countdown') {
      keyReactSignalSubText.textContent = '카운트다운이 끝나면 STAY가 나타납니다. 아직 게임 입력은 받지 않습니다.'
    } else if (keyReactPhase === 'stay') {
      keyReactSignalSubText.textContent = '아직 누르면 안 됩니다. 랜덤한 순간 CLICK으로 바뀝니다.'
    } else if (keyReactPhase === 'click') {
      keyReactSignalSubText.textContent = '지금 자신의 지정 키를 눌러주세요.'
    } else if (keyReactPhase === 'finished') {
      keyReactSignalSubText.textContent = '모든 참가자의 입력이 완료되었습니다. 리셋 후 다시 시작할 수 있습니다.'
    } else {
      keyReactSignalSubText.textContent = '시작을 누르면 곧 STAY...가 표시됩니다.'
    }
  }
}

function renderKeyReactKeyList() {
  if (!keyReactKeyList) return

  if (!keyReactPlayers.length) {
    keyReactCapturePlayerId = ''
    keyReactKeyList.innerHTML = '<div class="key-react-player-empty">참가자를 입력하면 키 지정칸이 표시돼.</div>'
    return
  }

  if (!keyReactPlayers.some((player) => player.id === keyReactCapturePlayerId)) {
    keyReactCapturePlayerId = ''
  }

  const duplicateKeys = getKeyReactDuplicateKeys()
  keyReactKeyList.innerHTML = keyReactPlayers.map((player) => {
    const isDuplicate = duplicateKeys.has(normalizeKeyReactKey(player.key))
    const isListening = keyReactCapturePlayerId === player.id
    return `
      <div class="key-react-key-row${isDuplicate ? ' is-duplicate' : ''}${isListening ? ' is-listening' : ''}" data-player-id="${escapeHtml(player.id)}" style="--key-react-player-color:${player.color};">
        <span class="key-react-player-dot"></span>
        <strong>${escapeHtml(player.label)}</strong>
        <button class="key-react-key-input" data-player-id="${escapeHtml(player.id)}" type="button" aria-label="${escapeHtml(player.label)} 키 지정" title="클릭 후 원하는 키를 누르세요">${escapeHtml(isListening ? '입력중' : player.key)}</button>
      </div>
    `
  }).join('')
}

function renderKeyReactPlayers() {
  if (!keyReactPlayerList || !keyReactTotalInfo) return

  keyReactTotalInfo.textContent = keyReactPlayers.length ? `총 ${keyReactPlayers.length}명` : '총 0명'

  if (!keyReactPlayers.length) {
    keyReactPlayerList.innerHTML = '<div class="key-react-player-empty">참가자를 입력하면 키와 상태가 표시돼.</div>'
    return
  }

  keyReactPlayerList.innerHTML = keyReactPlayers.map((player) => {
    const result = getKeyReactPlayerResult(player.id)
    const isDone = Boolean(result)
    const isFalseStart = result?.status === 'false-start'
    return `
      <div class="key-react-player-item${isDone ? ' is-done' : ''}${isFalseStart ? ' is-false-start' : ''}" style="--key-react-player-color:${player.color};">
        <span class="key-react-player-dot"></span>
        <strong>${escapeHtml(player.label)}</strong>
        <kbd>${escapeHtml(player.key)}</kbd>
        <span>${escapeHtml(getKeyReactResultLabel(player))}</span>
      </div>
    `
  }).join('')
}

function renderKeyReactKeyChips() {
  if (!keyReactKeyChips) return

  if (!keyReactPlayers.length) {
    keyReactKeyChips.innerHTML = ''
    return
  }

  keyReactKeyChips.innerHTML = keyReactPlayers.map((player) => {
    const result = getKeyReactPlayerResult(player.id)
    return `
      <div class="key-react-chip${result ? ' is-pressed' : ''}${result?.status === 'false-start' ? ' is-false-start' : ''}" style="--key-react-player-color:${player.color};">
        <strong>${escapeHtml(player.label)}</strong>
        <kbd>${escapeHtml(player.key)}</kbd>
      </div>
    `
  }).join('')
}

function renderKeyReactRanking() {
  if (!keyReactRankingList || !keyReactResultCount) return

  keyReactResultCount.textContent = `${keyReactResults.length} / ${keyReactPlayers.length}`

  if (!keyReactResults.length) {
    keyReactRankingList.innerHTML = '<div class="key-react-ranking-empty">CLICK 이후 키를 누른 순서가 여기에 표시돼.</div>'
    return
  }

  const validResults = getValidKeyReactResults()
  const html = keyReactResults.map((result) => {
    const rank = result.status === 'valid'
      ? validResults.findIndex((item) => item.playerId === result.playerId) + 1
      : 0
    const isValid = result.status === 'valid'
    return `
      <div class="key-react-ranking-item${isValid ? ' is-valid' : ' is-false-start'}">
        <span class="key-react-rank-badge">${isValid ? `${rank}위` : '실격'}</span>
        <strong>${escapeHtml(result.label)}</strong>
        <span>${isValid ? `${result.reactionMs}ms` : 'STAY 입력'}</span>
      </div>
    `
  }).join('')

  keyReactRankingList.innerHTML = html
}

function renderKeyReactGame() {
  renderKeyReactKeyList()
  renderKeyReactPlayers()
  renderKeyReactKeyChips()
  renderKeyReactRanking()
  updateKeyReactPhaseVisuals()
  setKeyReactInputLock(keyReactPhase === 'countdown' || keyReactPhase === 'stay' || keyReactPhase === 'click')

  setGameStartButtonRunningState(startKeyReactBtn, isKeyReactRunning(), { busyText: '진행 중' })
}

function ensureKeyReactReady() {
  if (!keyReactPlayers.length) {
    updateKeyReactFromInput({ render: false })
  }
  renderKeyReactGame()
}

function getKeyReactInputByPlayerId(playerId) {
  if (!keyReactKeyList || !playerId) return null
  return [...keyReactKeyList.querySelectorAll('.key-react-key-input')]
    .find((input) => input.dataset.playerId === playerId) || null
}

function beginKeyReactKeyCapture(input) {
  if (!input || input.disabled) return
  const playerId = input.dataset.playerId || ''
  if (!playerId) return

  keyReactCapturePlayerId = playerId

  if (keyReactStatusText && keyReactPhase === 'idle') {
    const player = keyReactPlayers.find((item) => item.id === playerId)
    keyReactStatusText.textContent = `${player?.label || '참가자'}님 키 지정 대기 중. 원하는 키를 한 번 눌러줘.`
  }

  renderKeyReactKeyList()
  const nextInput = getKeyReactInputByPlayerId(playerId)
  nextInput?.focus({ preventScroll: true })
}

function endKeyReactKeyCapture() {
  if (!keyReactCapturePlayerId) return
  keyReactCapturePlayerId = ''
  renderKeyReactKeyList()
}

function setKeyReactPlayerKey(playerId, key) {
  const normalizedKey = normalizeKeyReactKey(key)
  if (!normalizedKey) return

  keyReactPlayers = keyReactPlayers.map((player) => {
    if (player.id !== playerId) return player
    return { ...player, key: normalizedKey }
  })

  if (keyReactStatusText && keyReactPhase === 'idle') {
    const duplicateKeys = getKeyReactDuplicateKeys()
    keyReactStatusText.textContent = duplicateKeys.size
      ? '중복된 키가 있어. 참가자별 키는 서로 달라야 해.'
      : '키 지정 완료. 시작을 누르면 5초 카운트다운 후 STAY가 뜨고, 랜덤한 순간 CLICK으로 바뀐다.'
  }

  renderKeyReactGame()
}

function setKeyReactPlayerKeyFromEvent(playerId, event) {
  const normalizedKey = normalizeKeyReactEventKey(event)
  if (!normalizedKey) return
  setKeyReactPlayerKey(playerId, normalizedKey)
}

function handleKeyReactKeyAssignKeydown(event) {
  if (!screens.physicalKeyReact?.classList.contains('active')) return
  if (!keyReactKeyList || keyReactPhase === 'stay' || keyReactPhase === 'click') return

  const target = event.target
  const focusedInput = target instanceof HTMLElement ? target.closest('.key-react-key-input') : null
  const captureInput = keyReactCapturePlayerId ? getKeyReactInputByPlayerId(keyReactCapturePlayerId) : null
  const input = focusedInput || captureInput

  if (!input || input.disabled) return
  if (event.key === 'Tab') return

  event.preventDefault()
  event.stopPropagation()

  if (event.key === 'Escape') {
    endKeyReactKeyCapture()
    input.blur()
    return
  }

  const playerId = input.dataset.playerId || keyReactCapturePlayerId
  setKeyReactPlayerKeyFromEvent(playerId, event)
  keyReactCapturePlayerId = ''
  input.blur()
  renderKeyReactGame()
}

function validateKeyReactStart() {
  const duplicateKeys = getKeyReactDuplicateKeys()
  const hasEmptyKey = keyReactPlayers.some((player) => !normalizeKeyReactKey(player.key))

  if (hasEmptyKey || duplicateKeys.size) {
    showPopup('키 지정 확인', '모든 참가자의 키를 서로 다르게 지정해야 시작할 수 있어.', { icon: '⌨️' })
    return false
  }

  return true
}

function startKeyReactGame() {
  if (isKeyReactRunning()) return

  if (!canPlayKeyReactOnThisDevice()) {
    showPopup('PC 전용 게임', 'STAY CLICK은 키보드 입력이 필요한 컴퓨터 전용 피지컬 게임이야. PC에서 이용해줘.', { icon: '🖥️' })
    renderKeyReactGame()
    return
  }

  if (!keyReactConfigInput) return
  const parsed = parseKeyReactPlayers(keyReactConfigInput.value)

  if (parsed.status !== 'OK') {
    showPopup('참가자 등록 확인', `STAY CLICK 게임은 ${KEY_REACT_MIN_PLAYERS}~${KEY_REACT_MAX_PLAYERS}명이 이용 가능해.<br>참가자 이름은 쉼표로 구분하고 중복 없이 입력해줘.`, { icon: '⚠️', allowHtml: true })
    updateKeyReactFromInput()
    return
  }

  keyReactPlayers = parsed.players.map((player) => {
    const current = keyReactPlayers.find((item) => item.label === player.label)
    return current ? { ...player, key: current.key } : player
  })

  if (!validateKeyReactStart()) {
    renderKeyReactGame()
    return
  }

  keyReactRoundToken += 1
  const roundToken = keyReactRoundToken
  keyReactPhase = 'countdown'
  keyReactCapturePlayerId = ''
  keyReactResults = []
  keyReactClickStartedAt = 0
  clearKeyReactTimer()

  keyReactCountdownLeft = KEY_REACT_COUNTDOWN_SECONDS

  if (keyReactStatusText) {
    keyReactStatusText.textContent = `${KEY_REACT_COUNTDOWN_SECONDS}초 카운트다운 후 STAY가 나타나고, 이후 랜덤한 순간 CLICK으로 바뀌어.`
  }

  renderKeyReactGame()
  playSfx('stayBeep')

  keyReactCountdownTimer = setInterval(() => {
    if (roundToken !== keyReactRoundToken || keyReactPhase !== 'countdown') return

    keyReactCountdownLeft = Math.max(0, keyReactCountdownLeft - 1)

    if (keyReactCountdownLeft > 0) {
      if (keyReactStatusText) {
        keyReactStatusText.textContent = `${keyReactCountdownLeft}초 뒤 STAY가 나타납니다.`
      }
      playSfx('stayBeep')
      renderKeyReactGame()
      return
    }

    clearKeyReactTimer()
    beginKeyReactStayPhase(roundToken)
  }, 1000)
}


function beginKeyReactStayPhase(roundToken = keyReactRoundToken) {
  if (roundToken !== keyReactRoundToken) return

  keyReactPhase = 'stay'
  keyReactCountdownLeft = 0

  const stayDuration = Math.round(
    KEY_REACT_STAY_MIN_MS + Math.random() * (KEY_REACT_STAY_MAX_MS - KEY_REACT_STAY_MIN_MS)
  )

  if (keyReactStatusText) {
    keyReactStatusText.textContent = 'STAY... 아직 누르면 실격이야. 언제 CLICK으로 바뀔지 몰라.'
  }

  renderKeyReactGame()
  playSfx('stayBeep')

  keyReactTimer = setTimeout(() => {
    if (roundToken !== keyReactRoundToken || keyReactPhase !== 'stay') return
    triggerKeyReactClick()
  }, stayDuration)
}

function triggerKeyReactClick() {
  if (keyReactResults.length >= keyReactPlayers.length) {
    finishKeyReactGame()
    return
  }

  keyReactPhase = 'click'
  keyReactCountdownLeft = 0
  keyReactClickStartedAt = performance.now()
  playSfx('clickSignal')

  if (keyReactStatusText) {
    keyReactStatusText.textContent = 'CLICK! 지금 자신의 키를 눌러줘.'
  }

  renderKeyReactGame()
}

function clearKeyReactTimer() {
  if (keyReactTimer) {
    clearTimeout(keyReactTimer)
    keyReactTimer = null
  }

  if (keyReactCountdownTimer) {
    clearInterval(keyReactCountdownTimer)
    keyReactCountdownTimer = null
  }
}

function stopKeyReactGame(options = {}) {
  const { preservePlayers = true } = options
  clearKeyReactTimer()
  keyReactRoundToken += 1
  keyReactPhase = 'idle'
  keyReactCapturePlayerId = ''
  keyReactClickStartedAt = 0
  keyReactCountdownLeft = 0
  keyReactResults = []
  if (!preservePlayers) keyReactPlayers = []
  setKeyReactInputLock(false)
  renderKeyReactGame()
}

function resetKeyReactGame() {
  clearKeyReactTimer()
  keyReactRoundToken += 1
  keyReactPhase = 'idle'
  keyReactCapturePlayerId = ''
  keyReactClickStartedAt = 0
  keyReactCountdownLeft = 0
  keyReactResults = []
  setKeyReactInputLock(false)

  if (keyReactStatusText) {
    keyReactStatusText.textContent = '참가자와 키를 지정한 뒤 시작을 누르면 5초 카운트다운 후 STAY가 뜨고, 랜덤한 순간 CLICK으로 바뀐다.'
  }

  updateKeyReactFromInput({ render: false })
  renderKeyReactGame()
}

function finishKeyReactGame() {
  if (keyReactPhase === 'finished') return

  clearKeyReactTimer()
  keyReactPhase = 'finished'
  keyReactCountdownLeft = 0
  keyReactClickStartedAt = 0
  setKeyReactInputLock(false)

  if (keyReactStatusText) {
    keyReactStatusText.textContent = '모든 참가자의 입력이 완료됐어. 순위가 확정됐어.'
  }

  renderKeyReactGame()
  showKeyReactResultsPopup()
}

function showKeyReactResultsPopup() {
  const validResults = getValidKeyReactResults()
  const html = keyReactResults.length
    ? `<div class="key-react-popup-list">${keyReactResults.map((result) => {
        const isValid = result.status === 'valid'
        const rank = isValid ? validResults.findIndex((item) => item.playerId === result.playerId) + 1 : 0
        return `
          <div class="key-react-popup-item${isValid ? ' is-valid' : ' is-false-start'}">
            <span>${isValid ? `${rank}위` : '실격'}</span>
            <strong>${escapeHtml(result.label)}</strong>
            <em>${isValid ? `${result.reactionMs}ms` : 'STAY에서 먼저 누름'}</em>
          </div>
        `
      }).join('')}</div>`
    : '<span>결과가 없습니다.</span>'

  showPopup('STAY CLICK 결과', html, { icon: '⌨️', allowHtml: true, popupClass: 'key-react-result-popup' })
}

function recordKeyReactResult(player, status, reactionMs = null) {
  if (!player || getKeyReactPlayerResult(player.id)) return

  playSfx(status === 'false-start' ? 'falseStart' : 'keyHit')

  keyReactResults.push({
    playerId: player.id,
    label: player.label,
    key: player.key,
    status,
    reactionMs
  })

  if (keyReactStatusText) {
    if (status === 'false-start') {
      keyReactStatusText.textContent = `${player.label}님이 STAY 중에 눌러 실격 처리됐어.`
    } else {
      const rank = getValidKeyReactResults().length
      keyReactStatusText.textContent = `${rank}위 ${player.label}님 · ${reactionMs}ms`
    }
  }

  renderKeyReactGame()

  if (keyReactResults.length >= keyReactPlayers.length) {
    finishKeyReactGame()
  }
}

function handleKeyReactGlobalKeydown(event) {
  if (!screens.physicalKeyReact?.classList.contains('active')) return
  if (event.repeat) return

  const target = event.target
  if (target instanceof HTMLElement && target.closest('.key-react-key-input')) return
  if (keyReactPhase !== 'stay' && keyReactPhase !== 'click') return

  const pressedKey = normalizeKeyReactEventKey(event)
  const player = keyReactPlayers.find((item) => normalizeKeyReactKey(item.key) === pressedKey)
  if (!player) return

  event.preventDefault()

  if (keyReactPhase === 'stay') {
    recordKeyReactResult(player, 'false-start')
    return
  }

  if (keyReactPhase === 'click') {
    const reactionMs = Math.max(0, Math.round(performance.now() - keyReactClickStartedAt))
    recordKeyReactResult(player, 'valid', reactionMs)
  }
}



function resetBearFindVideoColorMatch() {
  bearFindLastColorMatchKey = ''
  if (bearFindColorMatchTimer) {
    clearTimeout(bearFindColorMatchTimer)
    bearFindColorMatchTimer = null
  }
  ;[bearFindColorMatchR, bearFindColorMatchG, bearFindColorMatchB].forEach((node) => {
    if (!node) return
    node.setAttribute('slope', '1')
    node.setAttribute('intercept', '0')
  })
  if (bearFindVideo) {
    bearFindVideo.classList.remove('is-color-matched')
  }
}

function clampBearFindColorValue(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function drawBearFindCover(ctx, source, sourceWidth, sourceHeight, size) {
  if (!ctx || !source || !sourceWidth || !sourceHeight) return false
  const scale = Math.max(size / sourceWidth, size / sourceHeight)
  const drawWidth = sourceWidth * scale
  const drawHeight = sourceHeight * scale
  const offsetX = (size - drawWidth) / 2
  const offsetY = (size - drawHeight) / 2
  ctx.clearRect(0, 0, size, size)
  ctx.drawImage(source, offsetX, offsetY, drawWidth, drawHeight)
  return true
}

function getBearFindEdgeStats(ctx, size) {
  const imageData = ctx.getImageData(0, 0, size, size).data
  const edge = Math.max(12, Math.round(size * 0.16))
  const centerStart = Math.round(size * 0.26)
  const centerEnd = Math.round(size * 0.74)
  const sums = [0, 0, 0]
  const squares = [0, 0, 0]
  let count = 0

  for (let y = 0; y < size; y += 2) {
    for (let x = 0; x < size; x += 2) {
      const isEdge = x < edge || x >= size - edge || y < edge || y >= size - edge
      const isCenter = x >= centerStart && x <= centerEnd && y >= centerStart && y <= centerEnd
      if (!isEdge || isCenter) continue

      const offset = (y * size + x) * 4
      for (let channel = 0; channel < 3; channel += 1) {
        const value = imageData[offset + channel]
        sums[channel] += value
        squares[channel] += value * value
      }
      count += 1
    }
  }

  if (!count) return null

  return sums.map((sum, channel) => {
    const mean = sum / count
    const variance = Math.max(0, (squares[channel] / count) - (mean * mean))
    return {
      mean,
      std: Math.sqrt(variance)
    }
  })
}

function applyBearFindVideoColorMatchFromStats(posterStats, videoStats, key) {
  if (!posterStats || !videoStats || !bearFindVideo) return false
  if (!bearFindColorMatchR || !bearFindColorMatchG || !bearFindColorMatchB) return false

  const funcs = [bearFindColorMatchR, bearFindColorMatchG, bearFindColorMatchB]
  funcs.forEach((node, channel) => {
    const poster = posterStats[channel]
    const video = videoStats[channel]
    const stdSlope = video.std > 2 ? poster.std / video.std : 1
    const meanSlope = video.mean > 1 ? poster.mean / video.mean : 1
    const slope = clampBearFindColorValue((stdSlope * 0.65) + (meanSlope * 0.35), 0.82, 1.18)
    const intercept = clampBearFindColorValue((poster.mean - (video.mean * slope)) / 255, -0.08, 0.08)
    node.setAttribute('slope', slope.toFixed(4))
    node.setAttribute('intercept', intercept.toFixed(4))
  })

  bearFindLastColorMatchKey = key
  bearFindVideo.classList.add('is-color-matched')
  return true
}

function calibrateBearFindVideoColorMatch() {
  if (!bearFindVideo || !bearFindPoster) return
  if (APP_PERFORMANCE_PROFILE.constrained) return
  if (!bearFindVideo.videoWidth || !bearFindVideo.videoHeight) return

  const key = `${bearFindCurrentOutcome || 'idle'}:${bearFindVideo.currentSrc || bearFindVideo.src || ''}`
  if (bearFindLastColorMatchKey === key && bearFindVideo.classList.contains('is-color-matched')) return

  try {
    const size = 160
    const posterCanvas = document.createElement('canvas')
    const videoCanvas = document.createElement('canvas')
    posterCanvas.width = size
    posterCanvas.height = size
    videoCanvas.width = size
    videoCanvas.height = size
    const posterCtx = posterCanvas.getContext('2d', { willReadFrequently: true })
    const videoCtx = videoCanvas.getContext('2d', { willReadFrequently: true })
    if (!posterCtx || !videoCtx) return

    const posterReady = bearFindPoster.complete && bearFindPoster.naturalWidth && bearFindPoster.naturalHeight
    if (!posterReady) return

    drawBearFindCover(posterCtx, bearFindPoster, bearFindPoster.naturalWidth, bearFindPoster.naturalHeight, size)
    drawBearFindCover(videoCtx, bearFindVideo, bearFindVideo.videoWidth, bearFindVideo.videoHeight, size)

    const posterStats = getBearFindEdgeStats(posterCtx, size)
    const videoStats = getBearFindEdgeStats(videoCtx, size)
    applyBearFindVideoColorMatchFromStats(posterStats, videoStats, key)
  } catch (error) {
    // 일부 브라우저/파일 실행 환경에서는 비디오 프레임 샘플링이 제한될 수 있다.
    // 이 경우 원본 비디오를 그대로 보여주되, 레이어/필터는 추가하지 않는다.
    if (bearFindVideo) {
      bearFindVideo.classList.remove('is-color-matched')
    }
  }
}

function scheduleBearFindVideoColorMatch(delay = 80) {
  if (bearFindColorMatchTimer) clearTimeout(bearFindColorMatchTimer)
  bearFindColorMatchTimer = setTimeout(() => {
    bearFindColorMatchTimer = null
    calibrateBearFindVideoColorMatch()
  }, delay)
}

function hideBearFindStillFrame() {
  bearFindStillFrameVisible = false
  if (!bearFindStillFrame) return
  bearFindStillFrame.classList.remove('is-active')
}

function showBearFindStillFrameFromVideo() {
  if (!bearFindVideo || !bearFindStillFrame) return false
  if (!bearFindVideo.videoWidth || !bearFindVideo.videoHeight) return false

  try {
    const ctx = bearFindStillFrame.getContext('2d')
    if (!ctx) return false
    bearFindStillFrame.width = bearFindVideo.videoWidth
    bearFindStillFrame.height = bearFindVideo.videoHeight
    ctx.clearRect(0, 0, bearFindStillFrame.width, bearFindStillFrame.height)
    ctx.drawImage(bearFindVideo, 0, 0, bearFindStillFrame.width, bearFindStillFrame.height)
    bearFindStillFrameVisible = true
    bearFindStillFrame.classList.add('is-active')
    return true
  } catch (error) {
    hideBearFindStillFrame()
    return false
  }
}

function setBearFindVideoVisible(isVisible) {
  bearFindVideoVisible = Boolean(isVisible)
  if (bearFindVideo) {
    bearFindVideo.classList.toggle('is-active', bearFindVideoVisible)
  }
  if (bearFindVideoVisible) {
    hideBearFindStillFrame()
  }
}

function parseBearFindPlayerCount(value) {
  const count = Number.parseInt(String(value || '').trim(), 10)
  if (!Number.isFinite(count)) return { status: 'EMPTY' }
  if (count < BEAR_FIND_MIN_PLAYERS) return { status: 'TOO_FEW', count }
  if (count > BEAR_FIND_MAX_PLAYERS) return { status: 'TOO_MANY', count }
  return { status: 'OK', count }
}

function getBearFindPlayerLabel(index) {
  const sharedNames = window.RandomRouletteRoster?.getNames?.() || []
  return sharedNames[index] || `${index + 1}번 참가자`
}

function getBearFindOutcomeByIndex(index) {
  if (index === bearFindWinningIndex) return 'panda'
  return 'bear'
}

function getBearFindVideoSrc(outcome) {
  if (APP_PERFORMANCE_PROFILE.isMobile) {
    return outcome === 'panda' ? BEAR_FIND_PANDA_MOBILE_VIDEO_SRC : BEAR_FIND_BEAR_MOBILE_VIDEO_SRC
  }
  return outcome === 'panda' ? BEAR_FIND_PANDA_VIDEO_SRC : BEAR_FIND_BEAR_VIDEO_SRC
}

function updateBearFindFromInput(options = {}) {
  const { render = true } = options
  if (!bearFindCountInput) return false

  const parsed = parseBearFindPlayerCount(bearFindCountInput.value)
  if (parsed.status === 'OK') {
    bearFindPlayerCount = parsed.count
    if (!bearFindStarted && !bearFindFinished && bearFindStatusText) {
      bearFindStatusText.textContent = `참가자 ${parsed.count}명 등록 완료. 시작을 누르면 판다 1개가 랜덤 배정돼.`
    }
    if (render) renderBearFindGame()
    return true
  }

  if (!bearFindStarted && !bearFindFinished && bearFindStatusText) {
    const messages = {
      EMPTY: '참가자 인원수를 입력해줘.',
      TOO_FEW: `참가자는 최소 ${BEAR_FIND_MIN_PLAYERS}명부터 가능해.`,
      TOO_MANY: `참가자는 최대 ${BEAR_FIND_MAX_PLAYERS}명까지 가능해.`
    }
    bearFindStatusText.textContent = messages[parsed.status] || '참가자 인원수를 확인해줘.'
  }

  if (render) renderBearFindGame()
  return false
}

function setBearFindInputLock(isLocked) {
  if (!bearFindCountInput) return
  bearFindCountInput.disabled = isLocked
  bearFindCountInput.style.opacity = isLocked ? '0.65' : '1'
  bearFindCountInput.style.cursor = isLocked ? 'not-allowed' : ''
}

function setBearFindLocked(isLocked) {
  bearFindLocked = isLocked

  if (bearFindTouchBlocker) {
    bearFindTouchBlocker.classList.toggle('is-active', isLocked)
    bearFindTouchBlocker.setAttribute('aria-hidden', isLocked ? 'false' : 'true')
  }

  if (bearFindStageButton) {
    bearFindStageButton.disabled = isLocked || !bearFindStarted || bearFindFinished
    bearFindStageButton.classList.toggle('is-locked', isLocked)
  }
}

function stopBearFindPlayback() {
  resetBearFindVideoColorMatch()
  bearFindPendingPlayToken += 1
  setBearFindVideoVisible(false)
  hideBearFindStillFrame()
  if (bearFindVideo) {
    try {
      bearFindVideo.pause()
      bearFindVideo.removeAttribute('src')
      bearFindVideo.load()
    } catch (error) {}
  }

  bearFindCurrentOutcome = ''
  setBearFindLocked(false)
  renderBearFindGame()
}

function clearBearFindVideoWithoutFlash() {
  // 영상 종료 뒤에는 src를 비우지 않는다.
  // MP4와 PNG는 브라우저의 색공간/감마 처리 방식이 달라 같은 프레임이어도 색이 미세하게 달라질 수 있다.
  // 그래서 마지막 비디오 프레임을 정지 화면으로 유지해 다음 차례 전환 때 색 튐과 검은 깜빡임을 동시에 막는다.
  resetBearFindVideoColorMatch()
  setBearFindVideoVisible(false)
}

function resetBearFindGame() {
  stopBearFindPlayback()
  bearFindStarted = false
  bearFindFinished = false
  bearFindLocked = false
  bearFindCurrentIndex = 0
  bearFindWinningIndex = -1
  bearFindResults = []
  bearFindCurrentOutcome = ''
  setBearFindInputLock(false)

  if (bearFindStatusText) {
    bearFindStatusText.textContent = '인원수를 입력한 뒤 시작을 누르면 1번 참가자부터 원하는 순간 상자를 누를 수 있다.'
  }

  updateBearFindFromInput({ render: false })
  renderBearFindGame()
}

function renderBearFindPlayers() {
  if (!bearFindPlayerList || !bearFindTotalInfo) return

  bearFindTotalInfo.textContent = bearFindPlayerCount ? `총 ${bearFindPlayerCount}명` : '총 0명'

  if (!bearFindPlayerCount) {
    bearFindPlayerList.innerHTML = '<div class="bear-find-player-empty">인원수를 입력하면 참가자 현황이 표시돼.</div>'
    return
  }

  const rows = Array.from({ length: bearFindPlayerCount }, (_, index) => {
    const result = bearFindResults[index]
    const isCurrent = bearFindStarted && !bearFindFinished && !result && index === bearFindCurrentIndex
    const isPanda = result === 'panda'
    const isBear = result === 'bear'
    const label = isPanda ? '당첨' : isBear ? '곰인형' : isCurrent ? '현재 차례' : '대기'
    return `
      <div class="bear-find-player-item${isCurrent ? ' is-current' : ''}${isBear ? ' is-bear' : ''}${isPanda ? ' is-panda' : ''}">
        <span class="bear-find-player-dot"></span>
        <strong>${escapeHtml(getBearFindPlayerLabel(index))}</strong>
        <span>${label}</span>
      </div>
    `
  }).join('')

  bearFindPlayerList.innerHTML = rows
}

function renderBearFindGame() {
  renderBearFindPlayers()

  const isOpening = bearFindLocked && Boolean(bearFindCurrentOutcome)
  const isPlaying = isOpening && bearFindVideoVisible
  const canPress = bearFindStarted && !bearFindFinished && !bearFindLocked

  if (bearFindStageButton) {
    bearFindStageButton.disabled = !canPress
    bearFindStageButton.classList.toggle('is-playing', isOpening)
    bearFindStageButton.classList.toggle('is-ready', canPress)
    bearFindStageButton.classList.toggle('is-finished', bearFindFinished)
  }

  if (bearFindPoster) {
    bearFindPoster.src = BEAR_FIND_POSTER_SRC
    bearFindPoster.classList.toggle('is-hidden', isOpening || bearFindStillFrameVisible)
  }

  if (bearFindStillFrame) {
    bearFindStillFrame.classList.toggle('is-active', bearFindStillFrameVisible && !isPlaying)
  }

  if (bearFindVideo) {
    bearFindVideo.controls = false
    bearFindVideo.removeAttribute('controls')
    bearFindVideo.classList.toggle('is-active', isPlaying)
    if (!isPlaying) {
      bearFindVideo.classList.remove('is-color-matched')
    }
  }

  if (bearFindPhaseBadge) {
    if (isOpening) {
      bearFindPhaseBadge.textContent = '상자 오픈 중'
    } else if (bearFindFinished) {
      bearFindPhaseBadge.textContent = '당첨 완료'
    } else if (bearFindStarted) {
      bearFindPhaseBadge.textContent = `${getBearFindPlayerLabel(bearFindCurrentIndex)} 차례`
    } else {
      bearFindPhaseBadge.textContent = '대기'
    }
  }

  if (bearFindCurrentLabel) {
    if (isOpening) {
      bearFindCurrentLabel.textContent = '상자 오픈 중'
    } else if (bearFindFinished) {
      const winnerIndex = bearFindResults.findIndex((item) => item === 'panda')
      bearFindCurrentLabel.textContent = winnerIndex >= 0 ? `${getBearFindPlayerLabel(winnerIndex)} 당첨` : '게임 종료'
    } else if (bearFindStarted) {
      bearFindCurrentLabel.textContent = `${getBearFindPlayerLabel(bearFindCurrentIndex)} 차례`
    } else {
      bearFindCurrentLabel.textContent = '시작 전'
    }
  }

  if (bearFindStageHint) {
    if (isOpening) {
      bearFindStageHint.textContent = '영상이 끝날 때까지 다른 조작은 막힌다.'
    } else if (bearFindFinished) {
      bearFindStageHint.textContent = '판다를 찾았어. 리셋 후 다시 시작할 수 있어.'
    } else if (bearFindStarted) {
      bearFindStageHint.textContent = `${getBearFindPlayerLabel(bearFindCurrentIndex)}님이 원할 때 선물 상자를 눌러줘.`
    } else {
      bearFindStageHint.textContent = '시작을 누른 뒤, 현재 참가자가 원할 때 상자를 눌러줘.'
    }
  }

  setGameStartButtonRunningState(startBearFindBtn, bearFindStarted && !bearFindFinished, { busyText: '진행 중' })
}

function ensureBearFindReady() {
  if (!bearFindPlayerCount) {
    updateBearFindFromInput({ render: false })
  }
  renderBearFindGame()
}

function startBearFindGame() {
  if (bearFindStarted && !bearFindFinished) return
  if (!bearFindCountInput) return

  const parsed = parseBearFindPlayerCount(bearFindCountInput.value)
  if (parsed.status !== 'OK') {
    showPopup('참가자 인원수 확인', `곰찾기 게임은 ${BEAR_FIND_MIN_PLAYERS}~${BEAR_FIND_MAX_PLAYERS}명이 이용 가능해.<br>참가자 인원수를 숫자로 입력해줘.`, { icon: '🎁', allowHtml: true })
    updateBearFindFromInput()
    return
  }

  stopBearFindPlayback()
  bearFindPlayerCount = parsed.count
  bearFindStarted = true
  bearFindFinished = false
  bearFindLocked = false
  bearFindCurrentIndex = 0
  bearFindWinningIndex = window.RandomRouletteRng?.randomInt?.(bearFindPlayerCount) ?? Math.floor(Math.random() * bearFindPlayerCount)
  bearFindResults = []
  bearFindCurrentOutcome = ''
  setBearFindInputLock(true)

  playSfx('giftOpen')
  if (bearFindStatusText) {
    bearFindStatusText.textContent = '게임 시작! 현재 참가자가 원할 때 상자를 눌러줘.'
  }

  renderBearFindGame()
}

function handleBearFindVideoEnd() {
  if (!bearFindStarted || !bearFindCurrentOutcome) return

  const finishedIndex = bearFindCurrentIndex
  const outcome = bearFindCurrentOutcome
  bearFindResults[finishedIndex] = outcome

  // PNG 포스터로 되돌리면 MP4와 색공간/감마 처리 차이 때문에 같은 프레임도 미세하게 달라 보일 수 있다.
  // 그래서 영상의 마지막 프레임을 캔버스에 잡아 정지 화면처럼 유지한다.
  showBearFindStillFrameFromVideo()
  bearFindCurrentOutcome = ''
  setBearFindVideoVisible(false)
  setBearFindLocked(false)

  if (bearFindVideo) {
    try {
      bearFindVideo.pause()
    } catch (error) {}
  }

  if (outcome === 'panda') {
    playSfx('pandaWin')
    bearFindFinished = true
    bearFindStarted = false
    setBearFindInputLock(false)

    if (bearFindStatusText) {
      bearFindStatusText.textContent = `${getBearFindPlayerLabel(finishedIndex)}님이 판다를 찾았어.`
    }

    renderBearFindGame()
    showPopup(
      '당첨!',
      `<strong>${escapeHtml(getBearFindPlayerLabel(finishedIndex))}</strong>님이 판다를 찾았습니다.<br>당신이 당첨입니다!`,
      { icon: '🐼', allowHtml: true, popupClass: 'bear-find-result-popup' }
    )
    return
  }

  playSfx('bear')
  bearFindCurrentIndex += 1

  if (bearFindStatusText) {
    bearFindStatusText.textContent = `${getBearFindPlayerLabel(finishedIndex)}님은 곰인형이 나왔어. 다음 참가자 차례야.`
  }

  renderBearFindGame()
}

function handleBearFindVideoError() {
  if (!bearFindLocked) return

  const missingSrc = getBearFindVideoSrc(bearFindCurrentOutcome)
  bearFindCurrentOutcome = ''
  setBearFindLocked(false)

  if (bearFindVideo) {
    try {
      bearFindVideo.pause()
      setBearFindVideoVisible(false)
      bearFindVideo.removeAttribute('src')
      bearFindVideo.load()
    } catch (error) {}
  }

  if (bearFindStatusText) {
    bearFindStatusText.textContent = '영상 파일을 찾지 못했어. 파일명을 확인한 뒤 다시 눌러줘.'
  }

  renderBearFindGame()
  showPopup('영상 파일 필요', `${escapeHtml(missingSrc)} 파일을 index.html과 같은 폴더에 넣어줘.`, { icon: '🎬' })
}

function playBearFindCurrentTurn() {
  if (!bearFindStarted || bearFindFinished || bearFindLocked) {
    if (!bearFindStarted && !bearFindFinished) {
      showPopup('게임 시작 필요', '참가자 인원수를 입력하고 시작 버튼을 먼저 눌러줘.', { icon: '🎁' })
    }
    return
  }

  const outcome = getBearFindOutcomeByIndex(bearFindCurrentIndex)
  playSfx('giftOpen')
  const src = getBearFindVideoSrc(outcome)
  bearFindCurrentOutcome = outcome
  setBearFindLocked(true)

  if (bearFindStatusText) {
    bearFindStatusText.textContent = `${bearFindCurrentIndex + 1}번 참가자 상자 오픈 중...`
  }

  const playToken = bearFindPendingPlayToken + 1
  bearFindPendingPlayToken = playToken

  if (bearFindVideo) {
    resetBearFindVideoColorMatch()
    setBearFindVideoVisible(false)
    bearFindVideo.controls = false
    bearFindVideo.removeAttribute('controls')
    bearFindVideo.playsInline = true
    bearFindVideo.poster = BEAR_FIND_POSTER_SRC
    bearFindVideo.preload = APP_PERFORMANCE_PROFILE.isMobile ? 'metadata' : 'auto'
    bearFindVideo.src = src
    try {
      bearFindVideo.currentTime = 0
    } catch (error) {}
    bearFindVideo.load()
  }

  renderBearFindGame()

  const playPromise = bearFindVideo?.play?.()
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {
      handleBearFindVideoError()
    })
  }
}
