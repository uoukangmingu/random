/* generated from script.js · game2-race.js */
/* =========================
   game2 : race
========================= */

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function parseRaceConfigToHorses(text) {
  const rawItems = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!rawItems.length) {
    return { status: 'EMPTY' }
  }

  if (rawItems.length > RACE_MAX_COUNT) {
    return { status: 'TOO_MANY', horseCount: rawItems.length }
  }

  const uniqueCheck = new Set()
  const horses = rawItems.map((name, index) => {
    if (!name || name.includes('*')) {
      return null
    }

    if (uniqueCheck.has(name)) {
      return 'DUPLICATE'
    }

    uniqueCheck.add(name)

    return {
      id: `horse-${index + 1}`,
      name,
      label: name,
      color: getRaceColorForName(name),
      progress: 0,
      finished: false,
      finishOrder: 0,
      currentStatus: '다그닥',
      baseSpeed: 30.8 + Math.random() * 6.8,
      tempoSeed: Math.random() * Math.PI * 2,
      strideSeed: Math.random() * Math.PI * 2,
      formBias: -2.4 + Math.random() * 4.8,
      kickBias: Math.random() * 6.5,
      staminaBias: Math.random() * 5.8,
      burstSeed: Math.random() * Math.PI * 2,
      bonusSpeed: 0,
      slowPenalty: 0,
      eventUntil: 0,
      fallUntil: 0,
      laneEl: null,
      runnerEl: null,
      statusEl: null
    }
  })

  if (horses.includes(null)) {
    return { status: 'INVALID' }
  }

  if (horses.includes('DUPLICATE')) {
    return { status: 'DUPLICATE' }
  }

  return {
    status: 'OK',
    horses
  }
}

function syncRaceInputToCurrentOrder() {
  if (!raceConfigInput) return

  const orderedText = raceHorses.map((horse) => horse.label).join(', ')
  raceConfigInput.value = orderedText
  lastRaceValidConfigText = orderedText
  lastRaceAppliedRawText = orderedText
}

function getRaceSortedHorses() {
  return [...raceHorses].sort((a, b) => {
    if (a.finished && b.finished) return a.finishOrder - b.finishOrder
    if (a.finished) return -1
    if (b.finished) return 1
    return b.progress - a.progress
  })
}

function applyRaceEventEffect(horse, { bonus = 0, penalty = 0, duration = 1600, status = '정상 질주' } = {}) {
  const now = raceElapsedMs
  horse.bonusSpeed = bonus
  horse.slowPenalty = penalty
  horse.eventUntil = now + duration
  horse.currentStatus = status
}

function handleRaceParseFailure(parsed, options = {}) {
  const { showPopupOnTooMany = false, showPopupOnInvalid = false } = options

  if (parsed.status === 'TOO_MANY') {
    if (raceStatusText) {
      raceStatusText.textContent = `참가 말은 최대 ${RACE_MAX_COUNT}마리까지 가능하다.`
    }
    if (showPopupOnTooMany) {
      showPopup('참가 말 수 초과', `참가 말은 최대 ${RACE_MAX_COUNT}마리까지 가능해.`)
    }
    return false
  }

  if (parsed.status === 'DUPLICATE') {
    if (raceStatusText) {
      raceStatusText.textContent = '같은 이름은 2번 이상 입력할 수 없다. 말은 이름당 1마리만 가능하다.'
    }
    if (showPopupOnInvalid) {
      showPopup(
        '중복 이름 불가',
        '경마 게임은 같은 이름의 말을 여러 마리 만들 수 없어. 이름당 1마리만 가능해.'
      )
    }
    return false
  }

  if (parsed.status === 'INVALID' || parsed.status === 'EMPTY') {
    if (raceStatusText) {
      raceStatusText.textContent = '입력 형식을 확인해줘. 예: 홍길동, 김아무개, 박철수'
    }
    if (showPopupOnInvalid) {
      showPopup(
        '입력 확인',
        '경마 게임은 이름만 쉼표로 구분해 적어줘. 예: 홍길동, 김아무개, 박철수'
      )
    }
    return false
  }

  return true
}

function setRaceHorses(horses) {
  raceHorses = horses
  if (raceConfigInput) {
    lastRaceValidConfigText = raceConfigInput.value
    lastRaceAppliedRawText = raceConfigInput.value
  }
  updateRaceDescription()
}

function updateRaceDescription() {
  if (!raceDesc) return
  raceDesc.textContent = `총 ${raceHorses.length || 0}마리가 완전 랜덤으로 질주하는 자동 경주 게임이다.`
}

function addRaceCommentary(text) {
  if (!raceStatusText) return
  raceStatusText.textContent = text
}

function renderRaceLegend() {
  if (!horseLegend || !raceTotalInfo) return

  horseLegend.innerHTML = ''

  raceHorses.forEach((horse) => {
    const chip = document.createElement('div')
    chip.className = 'legend-chip'
    chip.innerHTML = `
      <span class="legend-dot" style="background:${horse.color}"></span>
      <span>${escapeHtml(horse.label)}</span>
    `
    horseLegend.appendChild(chip)
  })

  raceTotalInfo.textContent = `총 ${raceHorses.length}마리`
}

function renderRaceTracks() {
  if (!raceTrackWrap) return

  raceTrackWrap.innerHTML = ''
  raceTrackWrap.style.setProperty('--race-lane-count', String(Math.max(1, raceHorses.length || 1)))

  const stageHead = document.createElement('div')
  stageHead.className = 'race-track-stage-head'
  stageHead.innerHTML = `
    <div class="race-track-stage-copy">
      <h3 class="race-track-stage-title">경주 트랙</h3>
      <p class="race-track-stage-desc">경주가 시작되면 각 말이 자동으로 달리고, 결승 통과 순서대로 순위가 확정된다.</p>
    </div>
  `

  const stageActions = document.createElement('div')
  stageActions.className = 'race-track-stage-actions'
  if (raceTrackZoomBtn) {
    stageActions.appendChild(raceTrackZoomBtn)
  }
  stageHead.appendChild(stageActions)
  raceTrackWrap.appendChild(stageHead)

  const laneStack = document.createElement('div')
  laneStack.className = 'race-track-lanes'
  laneStack.classList.toggle('is-vertical-track', shouldUseVerticalRaceTrack())
  raceTrackWrap.classList.toggle('is-vertical-track-wrap', shouldUseVerticalRaceTrack())
  raceTrackWrap.appendChild(laneStack)

  raceHorses.forEach((horse, index) => {
    const lane = document.createElement('div')
    lane.className = 'race-lane'

    lane.innerHTML = `
      <div class="race-lane-label">${index + 1}레인</div>
      <div class="race-start-line"></div>
      <div class="race-finish-line"></div>
      <div class="race-track-inner">
        <div class="race-horse">
          <span class="horse-emoji">🐎</span>
          <div class="horse-info">
            <div class="horse-name">${escapeHtml(horse.label)}</div>
            <div class="horse-status">다그닥</div>
          </div>
        </div>
      </div>
    `

    horse.laneEl = lane
    horse.runnerEl = lane.querySelector('.race-horse')
    horse.statusEl = lane.querySelector('.horse-status')

    if (horse.runnerEl) {
      horse.runnerEl.style.setProperty('--horse-color', horse.color)
        horse.runnerEl.style.setProperty('background', horse.color, 'important')
    }

    laneStack.appendChild(lane)
    updateHorsePosition(horse)
  })
}

function updateHorsePosition(horse) {
  if (!horse.runnerEl) return

  const percent = Math.min(94, (horse.progress / RACE_DISTANCE) * 94)
  const percentText = `${percent.toFixed(3)}%`

  if (horse.runnerEl.dataset.progress !== percentText) {
    horse.runnerEl.style.left = percentText
    horse.runnerEl.style.setProperty('--race-progress', percentText)
    horse.runnerEl.dataset.progress = percentText
  }

  if (horse.statusEl && horse.statusEl.textContent !== horse.currentStatus) {
    horse.statusEl.textContent = horse.currentStatus
  }
}

function renderRaceRanking() {
  if (!raceRankingList) return

  raceRankingList.innerHTML = ''

  const ranking = getRaceSortedHorses()

  ranking.forEach((horse, index) => {
    const item = document.createElement('div')
    item.className = `race-ranking-item${index === 0 ? ' top' : ''}`
    item.innerHTML = `
      <strong>${index + 1}위</strong> ${escapeHtml(horse.label)}
      <div style="margin-top:4px; font-size:0.82rem; color:#8b7366;">
        ${horse.finished ? '완주' : `${Math.floor((horse.progress / RACE_DISTANCE) * 100)}% 진행`}
      </div>
    `
    raceRankingList.appendChild(item)
  })
}

function renderRacePreview() {
  renderRaceLegend()
  renderRaceTracks()
  renderRaceRanking()
  updateRaceTrackZoomLayout()
}

function updateRaceFromInput({ render = true } = {}) {
  if (!raceConfigInput) return false

  const parsed = parseRaceConfigToHorses(raceConfigInput.value)

  if (!handleRaceParseFailure(parsed)) {
    return false
  }

  setRaceHorses(parsed.horses)

  if (render) {
    renderRacePreview()
    if (raceStatusText) {
      raceStatusText.textContent = `실시간 반영 완료: 총 ${raceHorses.length}마리`
    }
  }

  return true
}

function ensureRaceReady() {
  if (!raceConfigInput) return

  if (!raceHorses.length) {
    const parsed = parseRaceConfigToHorses(raceConfigInput.value)

    if (parsed.status === 'OK') {
      setRaceHorses(parsed.horses)
    } else {
      raceConfigInput.value = '홍길동, 김아무개, 박철수'
      const fallbackParsed = parseRaceConfigToHorses(raceConfigInput.value)
      if (fallbackParsed.status === 'OK') {
        setRaceHorses(fallbackParsed.horses)
      }
    }
  }

  renderRacePreview()

  if (raceStatusText && !raceRunning) {
    raceStatusText.textContent = '출전 준비 완료. 시작 버튼을 누르면 경주가 시작된다.'
  }
}

function stopRaceLoop() {
  releaseFastForward('game2')
  raceRunning = false
  raceLastTimestamp = 0
  raceLastRankingRenderAt = 0

  if (raceAnimationFrame) {
    cancelAnimationFrame(raceAnimationFrame)
    raceAnimationFrame = null
  }

  if (raceEventTimer) {
    clearTimeout(raceEventTimer)
    raceEventTimer = null
  }

  if (raceCommentaryTimer) {
    clearTimeout(raceCommentaryTimer)
    raceCommentaryTimer = null
  }
}

function resetRaceHorseStates() {
  raceFinishOrder = []
  raceLeaderName = ''

  raceHorses.forEach((horse) => {
    horse.progress = 0
    horse.finished = false
    horse.finishOrder = 0
    horse.currentStatus = '다그닥'
    horse.bonusSpeed = 0
    horse.slowPenalty = 0
    horse.eventUntil = 0
    horse.fallUntil = 0

    if (horse.runnerEl) {
      horse.runnerEl.classList.remove('horse-finished')
    }

    if (horse.laneEl) {
      horse.laneEl.classList.remove('lane-finished')
    }

    updateHorsePosition(horse)
  })

  renderRaceRanking()
}

function shuffleRace() {
  if (!raceConfigInput) return

  const parsed = parseRaceConfigToHorses(raceConfigInput.value)

  if (!handleRaceParseFailure(parsed, { showPopupOnTooMany: true, showPopupOnInvalid: true })) {
    return
  }

  if (parsed.horses.length < 2) {
    showMinParticipantsPopup(RACE_MAX_COUNT)
    return
  }

  stopRaceLoop()
  raceFinished = false
  setRaceInputLock(false)
  setRaceShuffleLock(false)
  setRaceHorses(shuffleArray(parsed.horses))
  syncRaceInputToCurrentOrder()
  renderRacePreview()
  playSfx('shuffle')

  addRaceCommentary('출전 순서가 랜덤으로 재배치되었습니다. 시작을 누르면 이 순서 그대로 출발합니다.')
}

function resetRace() {
  if (!raceConfigInput) return

  stopRaceLoop()
  raceFinished = false

  const parsed = parseRaceConfigToHorses(raceConfigInput.value)

  if (parsed.status === 'OK') {
    setRaceHorses(parsed.horses)
  } else {
    raceConfigInput.value = lastRaceValidConfigText
    const fallbackParsed = parseRaceConfigToHorses(lastRaceValidConfigText)
    if (fallbackParsed.status === 'OK') {
      setRaceHorses(fallbackParsed.horses)
    }
  }

  renderRacePreview()
  setRaceInputLock(false)
  setRaceShuffleLock(false)

  addRaceCommentary('출전 준비가 다시 완료되었습니다.')
}

function getLeaderHorse() {
  return getRaceSortedHorses()[0]
}

function maybeCommentLeaderChange() {
  const leader = getLeaderHorse()
  if (!leader) return

  if (raceLeaderName !== leader.label) {
    raceLeaderName = leader.label
    addRaceCommentary(`${leader.label}, 선두로 올라섭니다!`)
  }
}

function scheduleRaceEventLoop() {
  if (!raceRunning || raceFinished) return

  raceEventTimer = setTimeout(() => {
    if (!raceRunning || raceFinished) return
    triggerRaceEvent()
    scheduleRaceEventLoop()
  }, getScaledDelay(760, 'game2', 180))
}

function scheduleRaceCommentaryLoop() {
  if (!raceRunning || raceFinished) return

  raceCommentaryTimer = setTimeout(() => {
    if (!raceRunning || raceFinished) return
    pushAutoCommentary()
    scheduleRaceCommentaryLoop()
  }, getScaledDelay(1180, 'game2', 240))
}

function triggerRaceEvent() {
  if (!raceRunning || raceFinished) return

  const ranking = getRaceSortedHorses().filter((horse) => !horse.finished)
  if (!ranking.length) return

  const groupSize = Math.max(1, Math.ceil(ranking.length / 3))
  const leaders = ranking.slice(0, groupSize)
  const trailers = ranking.slice(-groupSize)
  const midStart = Math.max(1, Math.floor(ranking.length / 3))
  const midEnd = Math.max(midStart + 1, Math.ceil((ranking.length * 2) / 3))
  const midPack = ranking.slice(midStart, midEnd)
  const upperMidPack = ranking.slice(1, Math.max(2, groupSize + 1))
  const now = raceElapsedMs
  const roll = Math.random()

  if (roll < 0.22) {
    const horse = getRandomItem(trailers)
    applyRaceEventEffect(horse, {
      bonus: 18 + Math.random() * 10,
      duration: 1500 + Math.random() * 700,
      status: '막판 추격'
    })
    addRaceCommentary(`${horse.label}, 뒤에서 폭발적인 추격이 나옵니다!`)
    return
  }

  if (roll < 0.40) {
    const horse = getRandomItem(midPack.length ? midPack : ranking)
    applyRaceEventEffect(horse, {
      bonus: 14 + Math.random() * 8,
      duration: 1200 + Math.random() * 650,
      status: '치고 나감'
    })
    addRaceCommentary(`${horse.label}, 중위권에서 한 번에 치고 올라옵니다!`)
    return
  }

  if (roll < 0.58) {
    const horse = getRandomItem(leaders)
    applyRaceEventEffect(horse, {
      penalty: 14 + Math.random() * 8,
      duration: 1300 + Math.random() * 700,
      status: '페이스 흔들림'
    })
    addRaceCommentary(`${horse.label}, 선두권에서 페이스가 눈에 띄게 꺾입니다!`)
    return
  }

  if (roll < 0.73) {
    const attackerPool = [...upperMidPack, ...trailers].filter(Boolean)
    const horse = getRandomItem(attackerPool.length ? attackerPool : ranking)
    applyRaceEventEffect(horse, {
      bonus: 15 + Math.random() * 8,
      duration: 1200 + Math.random() * 500,
      status: '바깥쪽 질주'
    })

    const leader = leaders[0]
    if (leader && leader !== horse) {
      leader.slowPenalty = Math.max(leader.slowPenalty, 7 + Math.random() * 5)
      leader.eventUntil = Math.max(leader.eventUntil, now + 1200)
      if (!leader.finished) {
        leader.currentStatus = '견제당함'
      }
    }

    addRaceCommentary(`${horse.label}, 선두권을 강하게 압박합니다!`)
    return
  }

  if (roll < 0.90) {
    const dangerPool = [...leaders, ...midPack, ...trailers].filter(Boolean)
    const horse = getRandomItem(dangerPool.length ? dangerPool : ranking)
    horse.fallUntil = now + 1200 + Math.random() * 850
    horse.progress = Math.max(0, horse.progress - (16 + Math.random() * 22))
    applyRaceEventEffect(horse, {
      penalty: 18 + Math.random() * 10,
      duration: 1800 + Math.random() * 800,
      status: '넘어짐'
    })
    updateHorsePosition(horse)
    playSfx('raceStumble')
    addRaceCommentary(`${horse.label}, 크게 휘청하며 속도가 확 떨어집니다!`)
    return
  }

  const leader = ranking[0]
  const chaser = ranking[1]
  const tail = ranking[ranking.length - 1]

  if (leader && chaser && tail && leader !== tail) {
    addRaceCommentary(`${leader.label}가 버티는 가운데 ${tail.label}까지 다시 살아납니다!`)
  } else if (leader) {
    addRaceCommentary(`${leader.label}, 아직 끝까지 안심할 수 없는 흐름입니다!`)
  }
}

function pushAutoCommentary() {
  if (!raceRunning || raceFinished) return

  const ranking = getRaceSortedHorses()

  if (!ranking.length) return

  const leader = ranking[0]
  const chaser = ranking[1]
  const third = ranking[2]
  const gap = leader && chaser ? leader.progress - chaser.progress : 0

  if (leader && chaser && third && !leader.finished && !chaser.finished) {
    if (gap < 70) {
      addRaceCommentary(`${leader.label}, ${chaser.label}, ${third.label}까지 한 덩어리로 몰립니다!`)
    } else {
      addRaceCommentary(`${leader.label}가 앞서가지만 ${chaser.label}가 다시 거리를 줄입니다!`)
    }
  } else if (leader && chaser && !leader.finished && !chaser.finished) {
    addRaceCommentary(`${leader.label}가 선두, ${chaser.label}가 끝까지 물고 늘어집니다!`)
  } else if (leader && !leader.finished) {
    addRaceCommentary(`${leader.label}, 아직도 뒤를 따돌리지 못하고 있습니다!`)
  }
}

function finishHorse(horse) {
  if (horse.finished) return

  horse.finished = true
  horse.progress = RACE_DISTANCE
  horse.finishOrder = raceFinishOrder.length + 1
  horse.currentStatus = '완주'
  raceFinishOrder.push(horse)
  playSfx('raceFinish')
  updateHorsePosition(horse)

  if (horse.runnerEl) {
    horse.runnerEl.classList.add('horse-finished')
  }

  if (horse.laneEl) {
    horse.laneEl.classList.add('lane-finished')
  }

  addRaceCommentary(`${horse.label}, ${horse.finishOrder}위로 결승선을 통과합니다!`)
}

function showRaceResultsPopup() {
  const html = raceFinishOrder
    .map((horse, index) => {
      return `<span style="display:block;margin:8px 0;"><strong>${index + 1}위. ${escapeHtml(horse.label)}</strong></span>`
    })
    .join('')

  showPopup('경주 결과', html || '<span>결과가 없습니다.</span>', {
    icon: '🏇',
    allowHtml: true
  })
}

function raceFrame(timestamp) {
  if (!raceRunning) return

  if (!raceLastTimestamp) {
    raceLastTimestamp = timestamp
  }

  if (timestamp - raceLastTimestamp < APP_PERFORMANCE_PROFILE.animationFrameInterval) {
    raceAnimationFrame = requestAnimationFrame(raceFrame)
    return
  }

  playThrottledSfx('raceHoof', SFX_THROTTLE_MS.raceHoof)
  const speedMultiplier = getFastForwardMultiplier('game2')
  const rawDt = Math.min(0.05, (timestamp - raceLastTimestamp) / 1000)
  const dt = rawDt * speedMultiplier
  raceLastTimestamp = timestamp
  raceElapsedMs += dt * 1000
  const raceNow = raceElapsedMs

  const activeRanking = getRaceSortedHorses().filter((horse) => !horse.finished)
  const leaderProgress = activeRanking[0]?.progress || 0
  const tailProgress = activeRanking[activeRanking.length - 1]?.progress || 0
  const averageProgress = activeRanking.length
    ? activeRanking.reduce((sum, horse) => sum + horse.progress, 0) / activeRanking.length
    : 0
  const spread = leaderProgress - tailProgress
  const rankMap = new Map(activeRanking.map((horse, index) => [horse.id, index]))

  raceHorses.forEach((horse) => {
    if (horse.finished) return

    if (horse.eventUntil && raceNow > horse.eventUntil) {
      horse.bonusSpeed = 0
      horse.slowPenalty = 0
      horse.eventUntil = 0
      if (!horse.finished) {
        horse.currentStatus = '다그닥'
      }
    }

    if (horse.fallUntil && raceNow > horse.fallUntil) {
      horse.fallUntil = 0
      if (!horse.finished && horse.currentStatus === '넘어짐') {
        horse.currentStatus = '다시 추격'
      }
    }

    const rankIndex = rankMap.get(horse.id) ?? activeRanking.length - 1
    const gapToLeader = leaderProgress - horse.progress
    const gapToAverage = averageProgress - horse.progress
    const progressRatio = horse.progress / RACE_DISTANCE
    const packBias = Math.max(0, Math.min(6.2, (gapToAverage / RACE_DISTANCE) * 24))
    const comebackBoost = rankIndex >= Math.floor(activeRanking.length / 2)
      ? Math.max(0, Math.min(7.8, (gapToLeader / RACE_DISTANCE) * 34))
      : Math.max(0, Math.min(3.8, (gapToLeader / RACE_DISTANCE) * 15))
    const leaderDrag = rankIndex === 0
      ? Math.max(0, Math.min(4.8, (spread / RACE_DISTANCE) * 10))
      : rankIndex === 1
        ? Math.max(0, Math.min(1.8, (spread / RACE_DISTANCE) * 4))
        : 0
    const fatiguePenalty = rankIndex <= 1 && progressRatio > 0.48
      ? Math.max(0, Math.min(5.6, ((progressRatio - 0.48) / 0.52) * (2.8 + spread / 220)))
      : 0
    const lateKick = progressRatio > 0.72
      ? horse.kickBias * ((progressRatio - 0.72) / 0.28)
      : 0
    const rhythmSwing = Math.sin(raceNow * 0.00195 + horse.tempoSeed) * (2.8 + horse.kickBias * 0.16)
      + Math.cos(raceNow * 0.00112 + horse.strideSeed) * (1.8 + horse.staminaBias * 0.12)
      + Math.sin(raceNow * 0.0026 + horse.burstSeed) * 1.9

    let speed = horse.baseSpeed
      + horse.formBias
      + rhythmSwing
      + (Math.random() - 0.5) * 2.8

    speed += packBias
    speed += comebackBoost
    speed += lateKick
    speed -= leaderDrag
    speed -= fatiguePenalty

    if (horse.progress > RACE_DISTANCE * 0.58) {
      if (rankIndex === 0) {
        speed -= Math.min(3.8, (spread / RACE_DISTANCE) * 8.5)
      } else if (rankIndex >= 1 && rankIndex <= 3) {
        speed += Math.max(0, Math.min(4.8, (gapToLeader / RACE_DISTANCE) * 14))
      } else {
        speed += Math.max(0, Math.min(3.6, (gapToLeader / RACE_DISTANCE) * 10))
      }
    }

    if (horse.fallUntil && raceNow < horse.fallUntil) {
      speed = 1.4 + Math.random() * 1.8
    }

    speed += horse.bonusSpeed
    speed -= horse.slowPenalty
    speed = Math.max(2, speed)

    horse.progress += speed * dt

    if (horse.progress >= RACE_DISTANCE) {
      finishHorse(horse)
    }

    updateHorsePosition(horse)
  })

  maybeCommentLeaderChange()

  if (!raceLastRankingRenderAt || timestamp - raceLastRankingRenderAt >= 120) {
    renderRaceRanking()
    raceLastRankingRenderAt = timestamp
  }

  if (raceFinishOrder.length === raceHorses.length) {
    raceRunning = false
    raceFinished = true
    releaseFastForward('game2')
    setRaceInputLock(false)
    setRaceShuffleLock(false)
    if (raceStatusText) {
      raceStatusText.textContent = '경주 종료! 최종 순위를 확인해줘.'
    }
    stopRaceLoop()
    renderRaceRanking()
    showRaceResultsPopup()
    return
  }

  raceAnimationFrame = requestAnimationFrame(raceFrame)
}
