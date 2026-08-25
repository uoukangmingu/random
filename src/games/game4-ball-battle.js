/* generated from script.js · game4-ball-battle.js */
function parseSimConfigToPlayers(text) {
  const rawItems = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!rawItems.length) {
    return { status: 'EMPTY' }
  }

  if (rawItems.length > SIM_MAX_PLAYERS) {
    return { status: 'TOO_MANY', count: rawItems.length }
  }

  const seen = new Set()
  const players = []

  for (const raw of rawItems) {
    if (!raw || raw.includes('*')) {
      return { status: 'INVALID' }
    }

    const normalized = raw.replace(/\u0000/g, '').trim()
    if (!normalized) {
      return { status: 'INVALID' }
    }

    if (seen.has(normalized)) {
      return { status: 'DUPLICATE' }
    }

    seen.add(normalized)
    players.push({
      id: `sim-player-${players.length + 1}`,
      label: normalized,
      color: getCommonPlayerPaletteByTheme()[players.length % getCommonPlayerPaletteByTheme().length]
    })
  }

  return { status: 'OK', players }
}

function handleSimParseFailure(parsed, { showPopupOnInvalid = false } = {}) {
  if (!simStatusText) return false

  if (parsed.status === 'EMPTY') {
    simStatusText.textContent = '참가자를 먼저 입력해줘. 예: 홍길동, 김아무개, 박철수'
    return false
  }

  if (parsed.status === 'TOO_MANY') {
    simStatusText.textContent = `참가자는 최대 ${SIM_MAX_PLAYERS}명까지 가능하다.`
    if (showPopupOnInvalid) {
      showPopup('참가자 수 초과', `볼 배틀은 최대 ${SIM_MAX_PLAYERS}명까지만 참가할 수 있어.`)
    }
    return false
  }

  if (parsed.status === 'DUPLICATE') {
    simStatusText.textContent = '같은 이름은 2번 이상 입력할 수 없다.'
    if (showPopupOnInvalid) {
      showPopup('중복 이름 불가', '볼 배틀은 같은 이름을 중복 등록할 수 없어.')
    }
    return false
  }

  simStatusText.textContent = '입력 형식을 확인해줘. 참가자 이름만 쉼표로 구분해 적어줘.'
  if (showPopupOnInvalid) {
    showPopup('입력 확인', '참가자 이름만 쉼표로 구분해 적어줘. 참가자*n 형식은 사용할 수 없어.')
  }
  return false
}

function setSimPlayers(players) {
  simPlayers = players
  if (simConfigInput) {
    lastSimValidConfigText = simConfigInput.value
    lastSimAppliedRawText = simConfigInput.value
  }
  updateSimDescription()
}

function renderSimLegend() {
  if (!simLegend || !simTotalInfo) return

  simLegend.innerHTML = ''
  simPlayers.forEach((player) => {
    const chip = document.createElement('div')
    chip.className = 'legend-chip'
    chip.innerHTML = `
      <span class="legend-dot" style="background:${player.color}"></span>
      <span>${escapeHtml(player.label)}</span>
    `
    simLegend.appendChild(chip)
  })

  simTotalInfo.textContent = `총 ${simPlayers.length}명`
}

function formatSimStatValue(statKey, value) {
  if (value === null || value === undefined) return '?'
  return `${statKey === 'health' ? '+' : ''}${value}${statKey === 'accuracy' || statKey === 'defense' ? '%' : ''}`
}

function getSimStatSummaryText(stats) {
  if (!stats) return ''
  return `추가 체력 +${stats.health} / 공격력 ${stats.attack} / 성공률 ${stats.accuracy}% / 방어 ${stats.defense}%`
}

function createSimStatCard(statKey, value = null, options = {}) {
  const card = document.createElement('div')
  const meta = SIM_STAT_META[statKey]
  const { flipped = false, dealt = false } = options
  card.className = `sim-stat-card type-${statKey}${flipped ? ' is-flipped' : ''}${dealt ? ' is-dealt' : ''}`
  card.dataset.statKey = statKey
  card.innerHTML = `
    <div class="sim-stat-card-inner">
      <div class="sim-stat-card-face sim-stat-card-back">
        <span>${meta.icon}</span>
      </div>
      <div class="sim-stat-card-face sim-stat-card-front">
        <small>${meta.label}</small>
        <strong>${formatSimStatValue(statKey, value)}</strong>
      </div>
    </div>
  `
  return card
}

function renderSimStatsBoard(players = simPlayers, { reveal = false, dealt = false } = {}) {
  if (!simStatsBoard) return

  simStatsBoard.innerHTML = ''

  if (!players.length) {
    simStatsBoard.innerHTML = '<div class="sim-empty-state">참가자를 입력하면 여기에 스탯 카드가 정렬된다.</div>'
    return
  }

  players.forEach((player) => {
    const row = document.createElement('div')
    row.className = 'sim-player-row'
    row.dataset.playerId = player.id

    const totalText = reveal && player.stats ? `${Object.values(player.stats).reduce((sum, value) => sum + value, 0)}` : '대기'
    row.innerHTML = `
      <div class="sim-player-main">
        <div class="sim-player-head">
          <span class="legend-dot" style="background:${player.color}"></span>
          <span class="sim-player-name">${escapeHtml(player.label)}</span>
          <span class="sim-player-total">합계 ${escapeHtml(totalText)}</span>
        </div>
        <div class="sim-player-sub">${reveal && player.stats ? '스탯 공개 완료' : '카드 배정 대기 중'}</div>
      </div>
      <div class="sim-card-grid"></div>
    `

    const grid = row.querySelector('.sim-card-grid')
    SIM_STAT_KEYS.forEach((statKey) => {
      const card = createSimStatCard(statKey, player.stats?.[statKey] ?? null, {
        flipped: reveal && Boolean(player.stats),
        dealt
      })
      grid.appendChild(card)
    })

    simStatsBoard.appendChild(row)
  })
}

function renderSimRanking(ranking = []) {
  if (!simRankingList) return ranking

  if (!ranking.length) {
    simRankingList.innerHTML = '<div class="sim-ranking-empty">전투가 시작되면 생존 순위가 여기에 표시된다.</div>'
    return ranking
  }

  simRankingList.innerHTML = ranking.map((player, index) => {
    const hp = Number.isFinite(player.currentHp) ? Math.max(0, Math.round(player.currentHp)) : 0
    const maxHp = Number.isFinite(player.maxHp) ? Math.max(1, Math.round(player.maxHp)) : 1
    const hpRatio = clampValue((hp / maxHp) * 100, 0, 100)
    const isOut = !player.isAlive
    return `
      <div class="sim-ranking-item${index === 0 ? ' top' : ''}${isOut ? ' is-out' : ''}">
        <div class="sim-ranking-num">${index + 1}</div>
        <div class="sim-ranking-main">
          <div class="sim-ranking-name"><span class="sim-ranking-dot" style="background:${player.color};"></span>${escapeHtml(player.label)}</div>
          <div class="sim-ranking-hp-track"><i style="width:${hpRatio}%"></i></div>
        </div>
        <div class="sim-ranking-state">${escapeHtml(player.rankLabel || (isOut ? '탈락' : '생존'))}</div>
      </div>
    `
  }).join('')

  return ranking
}

function flushSimRankingRender(ranking = simPendingRanking || getSimRankingData()) {
  if (simRankingRenderTimer) {
    clearTimeout(simRankingRenderTimer)
    simRankingRenderTimer = null
  }
  simPendingRanking = null
  simRankingLastRenderAt = performance.now()
  return renderSimRanking(ranking)
}

function scheduleSimRankingRender({ force = false } = {}) {
  simPendingRanking = getSimRankingData()
  const elapsed = performance.now() - simRankingLastRenderAt

  if (force || elapsed >= SIM_BATTLE_PERFORMANCE.rankingInterval) {
    return flushSimRankingRender(simPendingRanking)
  }

  if (!simRankingRenderTimer) {
    simRankingRenderTimer = setTimeout(() => {
      simRankingRenderTimer = null
      if (simPendingRanking) {
        flushSimRankingRender(simPendingRanking)
      }
    }, Math.max(16, SIM_BATTLE_PERFORMANCE.rankingInterval - elapsed))
  }

  return simPendingRanking
}

function updateSimFromInput({ render = true } = {}) {
  if (!simConfigInput) return false

  const parsed = parseSimConfigToPlayers(simConfigInput.value)
  if (parsed.status !== 'OK') {
    return handleSimParseFailure(parsed)
  }

  setSimPlayers(parsed.players)

  if (!simSetupDone) {
    simRoundPlayers = []
    setSimBattleStartState(false)
    updateSimPhase('대기')
  }

  if (render) {
    renderSimLegend()
    if (!simSetupDone) {
      renderSimStatsBoard(parsed.players)
      renderSimBattleSummary([])
      renderSimRanking([])
      setSimViewMode('setup')
      if (simStatusText) {
        simStatusText.textContent = `실시간 반영 완료: 총 ${parsed.players.length}명`
      }
    }
  }

  return true
}

function ensureSimReady() {
  if (!simConfigInput) return

  if (!simPlayers.length) {
    const parsed = parseSimConfigToPlayers(simConfigInput.value)
    if (parsed.status === 'OK') {
      setSimPlayers(parsed.players)
    } else {
      simConfigInput.value = '홍길동, 김아무개, 박철수, 최영희'
      const fallbackParsed = parseSimConfigToPlayers(simConfigInput.value)
      if (fallbackParsed.status === 'OK') {
        setSimPlayers(fallbackParsed.players)
      }
    }
  }

  renderSimLegend()

  if (simSetupDone && simRoundPlayers.length) {
    renderSimStatsBoard(simRoundPlayers, { reveal: true, dealt: true })
    renderSimBattleSummary(simBattleRunning || simBattleFinished ? simRoundPlayers : [])
    renderSimRanking(getSimRankingData())
    setSimBattleStartState(!simBattleRunning && !simBattleFinished)
    updateSimPhase(simBattleRunning ? '전투 중' : simBattleFinished ? '종료' : '준비 완료')
    setSimViewMode(simBattleRunning || simBattleFinished ? 'battle' : 'setup')
  } else {
    renderSimStatsBoard(simPlayers)
    renderSimBattleSummary([])
    renderSimRanking([])
    setSimBattleStartState(false)
    updateSimPhase('대기')
    setSimViewMode('setup')
    if (simStatusText && !simSetupRunning) {
      simStatusText.textContent = '참가 준비 완료. 시작 버튼을 누르면 스탯 카드가 섞이고 순차적으로 공개된다.'
    }
  }

  if (simArenaWrap && !simArenaRender) {
    simArenaWrap.classList.remove('is-running')
  }
}

function getSimStatDistributionMode() {
  const roll = Math.random()
  if (roll < 0.45) return 'extreme'
  if (roll < 0.8) return 'skewed'
  return 'balanced'
}

function isValidSimStatValues(values, usedValues = new Set()) {
  if (!Array.isArray(values) || values.length !== 4) return false
  const localUsed = new Set()

  for (const value of values) {
    if (!Number.isInteger(value) || value <= 0) return false
    if (usedValues.has(value) || localUsed.has(value)) return false
    localUsed.add(value)
  }

  return values.reduce((sum, value) => sum + value, 0) === 100
}

function assignSimStats(usedValues = new Set()) {
  const statKeys = shuffleArray([...SIM_STAT_KEYS])
  const pickInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  function createBalancedValues() {
    const values = []
    let remaining = 100

    for (let index = 0; index < 3; index += 1) {
      const slotsLeft = 4 - index
      const minRest = slotsLeft - 1
      const minValue = Math.max(10, remaining - 34 * (slotsLeft - 1))
      const maxValue = Math.min(36, remaining - minRest)
      if (minValue > maxValue) return null

      const pool = []
      for (let value = minValue; value <= maxValue; value += 1) {
        if (values.includes(value)) continue
        pool.push(value)
      }
      if (!pool.length) return null

      const target = remaining / slotsLeft
      const ordered = shuffleArray(pool).sort((a, b) => Math.abs(a - target) - Math.abs(b - target) + (Math.random() - 0.5) * 2)
      const picked = ordered[0]
      values.push(picked)
      remaining -= picked
    }

    values.push(remaining)
    return values
  }

  function createSkewedValues() {
    const dominant = pickInt(36, 62)
    const lowA = pickInt(3, 18)
    const lowB = pickInt(4, 24)
    const last = 100 - dominant - lowA - lowB
    return [dominant, lowA, lowB, last]
  }

  function createExtremeValues() {
    const patternRoll = Math.random()

    if (patternRoll < 0.6) {
      const dominant = pickInt(55, 88)
      const tiny = pickInt(1, 6)
      const low = pickInt(2, 18)
      const last = 100 - dominant - tiny - low
      return [dominant, tiny, low, last]
    }

    const dominantA = pickInt(45, 68)
    const dominantB = pickInt(20, 38)
    const tiny = pickInt(1, 7)
    const last = 100 - dominantA - dominantB - tiny
    return [dominantA, dominantB, tiny, last]
  }

  const modeFactories = {
    extreme: createExtremeValues,
    skewed: createSkewedValues,
    balanced: createBalancedValues
  }

  const primaryMode = getSimStatDistributionMode()
  const fallbackModes = primaryMode === 'balanced'
    ? ['skewed', 'extreme']
    : primaryMode === 'skewed'
      ? ['extreme', 'balanced']
      : ['skewed', 'balanced']
  const modeOrder = [primaryMode, ...fallbackModes]

  for (const mode of modeOrder) {
    for (let attempt = 0; attempt < 240; attempt += 1) {
      const values = modeFactories[mode]()
      if (!isValidSimStatValues(values, usedValues)) continue

      const randomizedValues = shuffleArray([...values])
      const stats = {}
      statKeys.forEach((statKey, index) => {
        stats[statKey] = randomizedValues[index]
      })
      return stats
    }
  }

  return null
}

function buildSimRoundPlayers() {
  const usedValues = new Set()
  const statPool = []

  for (let round = 0; round < 240; round += 1) {
    usedValues.clear()
    statPool.length = 0
    let success = true

    for (let i = 0; i < simPlayers.length; i += 1) {
      const stats = assignSimStats(usedValues)
      if (!stats) {
        success = false
        break
      }
      Object.values(stats).forEach((value) => usedValues.add(value))
      statPool.push(stats)
    }

    if (success) {
      return simPlayers.map((player, index) => {
        const stats = statPool[index]
        return {
          ...player,
          stats,
          maxHp: SIM_BASE_HP + stats.health,
          currentHp: SIM_BASE_HP + stats.health,
          isAlive: true,
          eliminationRank: null,
          rankLabel: '생존'
        }
      })
    }
  }

  return simPlayers.map((player, index) => {
    const fallbackSets = [
      [80, 2, 17, 1],
      [62, 21, 12, 5],
      [54, 7, 31, 8],
      [43, 37, 14, 6],
      [29, 24, 28, 19],
      [16, 41, 34, 9]
    ]
    const fallbackBase = fallbackSets[index] || [67 - index * 2, 6 + index, 13 + index, 14]
    const stats = {
      health: fallbackBase[0],
      attack: fallbackBase[1],
      accuracy: fallbackBase[2],
      defense: fallbackBase[3]
    }

    return {
      ...player,
      stats,
      maxHp: SIM_BASE_HP + stats.health,
      currentHp: SIM_BASE_HP + stats.health,
      isAlive: true,
      eliminationRank: null,
      rankLabel: '생존'
    }
  })
}

function getSimCardElement(playerId, statKey) {
  return simStatsBoard?.querySelector(`[data-player-id="${playerId}"] .sim-stat-card[data-stat-key="${statKey}"]`) || null
}

async function playSimDealAndReveal(token) {
  if (!simDeck) return

  simDeck.classList.add('is-shuffling')
  playSfx('simShuffle')
  updateSimPhase('카드 셔플')
  if (simStatusText) {
    simStatusText.textContent = '참가자별 스탯 카드를 섞는 중...'
  }

  await sleep(1400)
  if (simBattleToken !== token) return

  simDeck.classList.remove('is-shuffling')
  renderSimStatsBoard(simRoundPlayers)

  const cards = [...simStatsBoard.querySelectorAll('.sim-stat-card')]
  for (const card of cards) {
    if (simBattleToken !== token) return
    card.classList.add('is-dealt')
    await sleep(28)
  }

  updateSimPhase('스탯 공개')
  if (simStatusText) {
    simStatusText.textContent = '각 참가자의 스탯 카드가 순차적으로 공개된다...'
  }

  for (const player of simRoundPlayers) {
    for (const statKey of SIM_STAT_KEYS) {
      if (simBattleToken !== token) return
      const card = getSimCardElement(player.id, statKey)
      if (!card) continue
      const frontValue = card.querySelector('.sim-stat-card-front strong')
      if (frontValue) {
        frontValue.textContent = formatSimStatValue(statKey, player.stats[statKey])
      }
      card.classList.add('is-flipped')
      playSfx('card')
      await sleep(120)
    }

    const row = simStatsBoard.querySelector(`[data-player-id="${player.id}"]`)
    const total = row?.querySelector('.sim-player-total')
    const sub = row?.querySelector('.sim-player-sub')
    if (total) {
      total.textContent = '합계 100'
    }
    if (sub) {
      sub.textContent = getSimStatSummaryText(player.stats)
    }
    await sleep(140)
  }

  if (simBattleToken !== token) return

  renderSimBattleSummary([])
  renderSimRanking(getSimRankingData())
  setSimViewMode('setup')
  simSetupDone = true
  simSetupRunning = false
  setSimBattleStartState(true)
  updateSimPhase('준비 완료')
  if (simStatusText) {
    simStatusText.textContent = '모든 플레이어의 스탯 공개가 끝났다. 전투시작 버튼을 눌러 경기를 시작해줘.'
  }
}

async function startSimSetup() {
  if (!simConfigInput || simSetupRunning || simBattleRunning) return

  const parsed = parseSimConfigToPlayers(simConfigInput.value)
  if (parsed.status !== 'OK') {
    handleSimParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  if (parsed.players.length < 2) {
    showMinParticipantsPopup(SIM_MAX_PLAYERS)
    return
  }

  stopSimBattle({ preserveSetup: false })
  simBattleToken += 1
  const token = simBattleToken
  simCurrentToken = token
  simSetupRunning = true
  simSetupDone = false
  simBattleFinished = false
  simEliminationOrder = []
  setSimViewMode('setup')
  setSimPlayers(parsed.players)
  simRoundPlayers = buildSimRoundPlayers()

  setSimInputLock(true)
  setSimShuffleLock(true)
  setSimBattleStartState(false)
  renderSimLegend()
  renderSimRanking([])

  await playSimDealAndReveal(token)
}

function shuffleSimParticipants() {
  if (!simConfigInput || simSetupRunning || simBattleRunning) return

  const parsed = parseSimConfigToPlayers(simConfigInput.value)
  if (parsed.status !== 'OK') {
    handleSimParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  const shuffledNames = shuffleArray(parsed.players.map((player) => player.label))
  simConfigInput.value = shuffledNames.join(', ')
  updateSimFromInput()
  if (simStatusText) {
    simStatusText.textContent = '참가자 순서를 랜덤으로 섞었다.'
  }
}

function resetSimCardsOnly() {
  simSetupDone = false
  simSetupRunning = false
  simBattleFinished = false
  simFinalResultsShown = false
  clearSimFinalResultsWatchdog()
  simRoundPlayers = []
  simEliminationOrder = []
  setSimBattleStartState(false)
  updateSimPhase('대기')
  renderSimStatsBoard(simPlayers)
  renderSimBattleSummary([])
  renderSimRanking([])
  setSimViewMode('setup')
}

function clearSimArena() {
  resetSimSuddenDeathState()
  closeSimArenaZoom()

  if (simRenderRaf) {
    cancelAnimationFrame(simRenderRaf)
    simRenderRaf = null
  }
  simRenderLastPaintAt = 0

  if (simOverlayRaf) {
    cancelAnimationFrame(simOverlayRaf)
    simOverlayRaf = null
  }
  simOverlayLastPaintAt = 0

  if (simRankingRenderTimer) {
    clearTimeout(simRankingRenderTimer)
    simRankingRenderTimer = null
  }
  simRankingLastRenderAt = 0
  simPendingRanking = null
  simEffectLastAt.clear()

  if (simArenaRender) {
    Matter.Render.stop(simArenaRender)
    if (simArenaRender.canvas && simArenaRender.canvas.parentNode) {
      simArenaRender.canvas.parentNode.removeChild(simArenaRender.canvas)
    }
    simArenaRender.textures = {}
  }

  if (simArenaRunner) {
    simArenaRunner.enabled = false
    Matter.Runner.stop(simArenaRunner)
  }

  if (simArenaEngine) {
    Matter.Engine.clear(simArenaEngine)
  }

  if (simFinalResultsTimer) {
    clearTimeout(simFinalResultsTimer)
    simFinalResultsTimer = null
  }
  if (simFinalResultsRaf) {
    cancelAnimationFrame(simFinalResultsRaf)
    simFinalResultsRaf = null
  }
  if (simFinalResultsWatchdog) {
    clearInterval(simFinalResultsWatchdog)
    simFinalResultsWatchdog = null
  }

  simArenaRender = null
  simArenaRunner = null
  simArenaWorld = null
  simArenaEngine = null
  simArenaBodies = []
  simArenaBodyMap.clear()
  simArenaMeta = null
  simOverlayMap.forEach((element) => element.remove())
  simOverlayMap.clear()
  if (simHealthOverlay) {
    simHealthOverlay.innerHTML = ''
  }
  simArenaWrap?.querySelectorAll('.sim-shrink-zone').forEach((element) => element.remove())
  if (simArenaWrap) {
    simArenaWrap.classList.remove('is-running')
  }
}

function stopSimBattle({ preserveSetup = true } = {}) {
  releaseFastForward('game4')
  simBattleToken += 1
  simCurrentToken = 0
  simBattleRunning = false
  simSetupRunning = false
  simFinalResultsShown = false
  clearSimArena()

  if (!preserveSetup) {
    resetSimCardsOnly()
    setSimInputLock(false)
    setSimShuffleLock(false)
    return
  }

  if (simRoundPlayers.length) {
    simRoundPlayers = simRoundPlayers.map((player) => ({
      ...player,
      currentHp: player.maxHp,
      isAlive: true,
      eliminationRank: null,
      rankLabel: '생존'
    }))
    simEliminationOrder = []
    simBattleFinished = false
    setSimBattleStartState(simSetupDone)
    renderSimBattleSummary([])
    renderSimRanking(getSimRankingData())
    updateSimPhase(simSetupDone ? '준비 완료' : '대기')
    setSimViewMode('setup')
    if (simStatusText && screens.game4?.classList.contains('active') && simSetupDone) {
      simStatusText.textContent = '전투가 정지되었다. 같은 스탯으로 다시 시작할 수 있다.'
    }
  } else {
    setSimBattleStartState(false)
    updateSimPhase('대기')
    setSimViewMode('setup')
  }
}

function resetSim() {
  closePopup({ force: true })
  stopSimBattle({ preserveSetup: false })

  if (!simConfigInput) return

  const parsed = parseSimConfigToPlayers(simConfigInput.value)
  if (parsed.status === 'OK') {
    setSimPlayers(parsed.players)
  } else {
    simConfigInput.value = lastSimValidConfigText || '홍길동, 김아무개, 박철수, 최영희'
    const fallbackParsed = parseSimConfigToPlayers(simConfigInput.value)
    if (fallbackParsed.status === 'OK') {
      setSimPlayers(fallbackParsed.players)
    }
  }

  renderSimLegend()
  renderSimStatsBoard(simPlayers)
  renderSimBattleSummary([])
  renderSimRanking([])
  setSimInputLock(false)
  setSimShuffleLock(false)
  setSimBattleStartState(false)
  if (simStatusText) {
    simStatusText.textContent = '볼 배틀이 초기화되었다. 다시 시작하면 새 스탯이 배정된다.'
  }
}

function buildSimMapPickerHtml() {
  const optionsHtml = Object.entries(SIM_MAP_OPTIONS).map(([mapId, map]) => `
    <button class="sim-map-option" type="button" data-sim-map-id="${mapId}">
      <strong>${map.name}</strong>
      <span>${map.desc}</span>
      <div class="sim-map-preview"><i></i><i></i><i></i></div>
    </button>
  `).join('')

  return `<div class="sim-map-note">전투 시작 전에 이번 경기에서 사용할 전투장을 골라줘.</div><div class="sim-map-picker">${optionsHtml}</div>`
}

function selectSimArenaMap() {
  return new Promise((resolve) => {
    if (!popupOverlay || !popupMessage) {
      resolve('classic')
      return
    }

    popupOverlay.dataset.locked = 'true'
    if (closePopupBtn) {
      closePopupBtn.style.display = 'none'
    }

    let resolved = false
    const cleanup = () => {
      popupMessage.removeEventListener('click', handleClick)
      document.removeEventListener('app-popup-closed', handlePopupClosed)
      if (popupOverlay) {
        delete popupOverlay.dataset.locked
      }
      if (closePopupBtn) {
        closePopupBtn.style.display = ''
      }
    }

    const finish = (mapId) => {
      if (resolved) return
      resolved = true
      cleanup()
      resolve(mapId)
    }

    const handleClick = (event) => {
      const button = event.target.closest('[data-sim-map-id]')
      if (!button) return
      finish(button.dataset.simMapId || 'classic')
      closePopup({ force: true })
    }

    const handlePopupClosed = (event) => {
      if (!resolved && event.detail?.force) {
        finish('classic')
      }
    }

    popupMessage.addEventListener('click', handleClick)
    document.addEventListener('app-popup-closed', handlePopupClosed)
    showPopup('전투 경기장 선택', buildSimMapPickerHtml(), {
      icon: '🗺️',
      allowHtml: true,
      popupClass: 'sim-map-popup'
    })
  })
}

function createSimShrinkZone() {
  if (!simArenaWrap) return null
  const zone = document.createElement('div')
  zone.className = 'sim-shrink-zone'
  simArenaWrap.appendChild(zone)
  return zone
}

function createSimWalls(width, height, thickness = 60) {
  const fill = isDarkThemeEnabled() ? '#24344d' : '#eed9c7'
  const stroke = isDarkThemeEnabled() ? '#8fd6ff' : '#fff8ef'
  const lineWidth = isDarkThemeEnabled() ? 2 : 1
  return {
    top: Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true, restitution: 1, render: { fillStyle: fill, strokeStyle: stroke, lineWidth } }),
    bottom: Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true, restitution: 1, render: { fillStyle: fill, strokeStyle: stroke, lineWidth } }),
    left: Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true, restitution: 1, render: { fillStyle: fill, strokeStyle: stroke, lineWidth } }),
    right: Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true, restitution: 1, render: { fillStyle: fill, strokeStyle: stroke, lineWidth } })
  }
}

function applySimBombAppearance(bomb, stage = 0) {
  if (!bomb) return
  const palette = isDarkThemeEnabled()
    ? [
        { fill: '#6b7788', stroke: '#d8ebff', lineWidth: 3 },
        { fill: '#4d5665', stroke: '#bfe3ff', lineWidth: 3 },
        { fill: '#2a313d', stroke: '#8fd6ff', lineWidth: 3 },
        { fill: '#0a0f16', stroke: '#f6c66b', lineWidth: 4 }
      ]
    : [
        { fill: '#bdbdbd', stroke: '#f2f2f2', lineWidth: 3 },
        { fill: '#9a9a9a', stroke: '#e7e7e7', lineWidth: 3 },
        { fill: '#626262', stroke: '#d4d4d4', lineWidth: 3 },
        { fill: '#111111', stroke: '#8d8d8d', lineWidth: 3 }
      ]
  const style = palette[Math.max(0, Math.min(stage, palette.length - 1))]
  bomb.render.fillStyle = style.fill
  bomb.render.strokeStyle = style.stroke
  bomb.render.lineWidth = style.lineWidth
}

function flashSimBallBody(player, { stroke = null, glowStroke = '#fff7a8', lineWidth = 5, duration = 260 } = {}) {
  stroke = stroke || getSimBallStrokeColor()
  const body = simArenaBodyMap.get(player?.id)
  if (!body || !body.render) return
  if (body.plugin?.flashTimer) {
    clearTimeout(body.plugin.flashTimer)
  }
  body.render.lineWidth = lineWidth
  body.render.strokeStyle = glowStroke
  body.plugin.flashTimer = setTimeout(() => {
    if (!body || !body.render) return
    body.render.lineWidth = body.plugin?.baseLineWidth || getSimBallLineWidth(body.circleRadius || SIM_BASE_BALL_RADIUS)
    body.render.strokeStyle = body.plugin?.baseStrokeStyle || stroke
    body.plugin.flashTimer = null
  }, duration)
}

function shouldPlaySimTransientEffect(playerId = '') {
  const now = performance.now()
  const lastAt = simEffectLastAt.get(playerId) || 0
  if (now - lastAt < SIM_BATTLE_PERFORMANCE.effectInterval) return false
  simEffectLastAt.set(playerId, now)
  return true
}

function spawnSimFloatingBurst(player, {
  text = '-1',
  className = 'sim-hit-burst',
  duration = 760,
  xOffset = 0,
  yOffset = 0,
  startClass = 'is-active'
} = {}) {
  if (!simHealthOverlay || !simArenaWrap || !simArenaRender || !player) return
  const transientCount = Math.max(0, simHealthOverlay.childElementCount - simOverlayMap.size)
  if (transientCount >= SIM_BATTLE_PERFORMANCE.maxTransientEffects) return
  const body = simArenaBodyMap.get(player.id)
  if (!body) return

  const displayWidth = simArenaMeta?.displayWidth || simArenaRender.options.width
  const displayHeight = simArenaMeta?.displayHeight || simArenaRender.options.height
  const scaleX = displayWidth / simArenaRender.options.width
  const scaleY = displayHeight / simArenaRender.options.height

  const burst = document.createElement('div')
  burst.className = className
  burst.textContent = text
  burst.style.left = `${body.position.x * scaleX + xOffset}px`
  burst.style.top = `${body.position.y * scaleY + yOffset}px`
  simHealthOverlay.appendChild(burst)

  requestAnimationFrame(() => burst.classList.add(startClass))
  setTimeout(() => burst.remove(), duration)
}

function spawnSimHitEffect(player, damage = 0) {
  if (!player || damage <= 0) return
  if (!shouldPlaySimTransientEffect(player.id)) return

  const label = simOverlayMap.get(player.id)
  if (label && !APP_PERFORMANCE_PROFILE.isMobile && !label.classList.contains('is-hit')) {
    label.classList.add('is-hit')
    label._simHitTimer = setTimeout(() => {
      label.classList.remove('is-hit')
      label._simHitTimer = null
    }, 300)
  }

  flashSimBallBody(player, {
    glowStroke: '#ff7f92',
    lineWidth: 5,
    duration: 260
  })

  if (SIM_BATTLE_PERFORMANCE.showFloatingDamage) {
    spawnSimFloatingBurst(player, {
      text: `-${damage}`,
      className: 'sim-hit-burst',
      duration: 720,
      yOffset: -4
    })
  }
}

function spawnSimDecayEffect(player, damage = 0) {
  if (!player || damage <= 0) return
  if (!shouldPlaySimTransientEffect(`decay-${player.id}`)) return

  const label = simOverlayMap.get(player.id)
  if (label && !APP_PERFORMANCE_PROFILE.isMobile && !label.classList.contains('is-hit')) {
    label.classList.add('is-hit')
    label._simHitTimer = setTimeout(() => {
      label.classList.remove('is-hit')
      label._simHitTimer = null
    }, 320)
  }

  flashSimBallBody(player, {
    glowStroke: '#ffb14f',
    lineWidth: 6,
    duration: 300
  })

  if (SIM_BATTLE_PERFORMANCE.showFloatingDamage) {
    spawnSimFloatingBurst(player, {
      text: `-${damage}`,
      className: 'sim-hit-burst sim-decay-burst',
      duration: 780,
      yOffset: -8
    })
  }
}

function resetSimSuddenDeathState() {
  simSuddenDeathStarted = false
  simSuddenDeathLastTickAt = 0
  simSuddenDeathTickCount = 0
  if (simArenaWrap) {
    simArenaWrap.classList.remove('is-sudden-death')
  }
}

function getSimSuddenDeathDamage() {
  const escalation = Math.floor(Math.max(0, simSuddenDeathTickCount - 1) / SIM_SUDDEN_DEATH_DAMAGE_STEP_EVERY)
  return Math.min(SIM_SUDDEN_DEATH_MAX_DAMAGE, SIM_SUDDEN_DEATH_BASE_DAMAGE + escalation)
}

function updateSimSuddenDeath(now) {
  if (!simArenaMeta || !simBattleRunning || simBattleFinished) return

  const aliveBefore = simRoundPlayers.filter((player) => player.isAlive)
  if (aliveBefore.length <= 1) return
  if (now < SIM_SUDDEN_DEATH_START_MS) return

  if (!simSuddenDeathStarted) {
    simSuddenDeathStarted = true
    simSuddenDeathLastTickAt = now
    simSuddenDeathTickCount = 0
    if (simArenaWrap) {
      simArenaWrap.classList.add('is-sudden-death')
    }
    playThrottledSfx('simDecay', SFX_THROTTLE_MS.simDecay)
    syncSimCombatStatus('후반전 돌입! 전투가 길어져 모든 생존자의 체력이 서서히 깎이기 시작한다.', { force: true })
    return
  }

  if (now - simSuddenDeathLastTickAt < SIM_SUDDEN_DEATH_INTERVAL_MS) return

  simSuddenDeathLastTickAt = now
  simSuddenDeathTickCount += 1

  const damage = getSimSuddenDeathDamage()
  const alive = simRoundPlayers.filter((player) => player.isAlive)
  if (alive.length <= 1) return

  const hpBefore = new Map(alive.map((player) => [player.id, player.currentHp]))
  playThrottledSfx('simDecay', SFX_THROTTLE_MS.simDecay)

  alive.forEach((player) => {
    player.currentHp -= damage
    spawnSimDecayEffect(player, damage)
  })

  let deadPlayers = alive.filter((player) => player.currentHp <= 0)
  let forcedSurvivor = null

  if (deadPlayers.length >= alive.length && alive.length > 1) {
    forcedSurvivor = [...alive].sort((a, b) => {
      const hpDiff = (hpBefore.get(b.id) || 0) - (hpBefore.get(a.id) || 0)
      if (hpDiff !== 0) return hpDiff
      const statDiff = (b.stats.health + b.stats.attack + b.stats.accuracy + b.stats.defense) - (a.stats.health + a.stats.attack + a.stats.accuracy + a.stats.defense)
      if (statDiff !== 0) return statDiff
      return Math.random() < 0.5 ? -1 : 1
    })[0]
    forcedSurvivor.currentHp = 1
    deadPlayers = deadPlayers.filter((player) => player.id !== forcedSurvivor.id)
  }

  deadPlayers.forEach((player) => {
    player.currentHp = 0
    markSimPlayerDead(player, { silent: true })
  })

  if (!simBattleFinished) {
    scheduleSimRankingRender({ force: deadPlayers.length > 0 })
  }
  updateSimArenaOverlay(true)

  if (forcedSurvivor && !simBattleFinished) {
    syncSimCombatStatus(`후반 체력 감소로 전원이 쓰러질 뻔했다. ${forcedSurvivor.label}이 1 체력으로 버텼다.`, { force: true })
  } else if (deadPlayers.length) {
    syncSimCombatStatus(`후반 체력 감소 -${damage}. ${deadPlayers.map((player) => player.label).join(', ')} 탈락.`, { force: true })
  } else {
    syncSimCombatStatus(`후반 체력 감소 -${damage}. 전원이 체력을 잃고 있다.`, { force: true })
  }

  maybeFinishSimBattle()
}

function spawnSimBombExplosionEffect(bomb, { innerRadius = null, outerRadius = null, duration = 760 } = {}) {
  if (!simHealthOverlay || !simArenaWrap || !simArenaRender || !bomb) return

  const displayWidth = simArenaMeta?.displayWidth || simArenaRender.options.width
  const displayHeight = simArenaMeta?.displayHeight || simArenaRender.options.height
  const scaleX = displayWidth / simArenaRender.options.width
  const scaleY = displayHeight / simArenaRender.options.height
  const scale = Math.min(scaleX, scaleY)

  const centerX = bomb.position.x * scaleX
  const centerY = bomb.position.y * scaleY
  const resolvedInnerRadius = innerRadius ?? bomb.plugin?.innerBlastRadius ?? 54
  const resolvedOuterRadius = outerRadius ?? bomb.plugin?.blastRadius ?? 126

  const core = document.createElement('div')
  core.className = 'sim-bomb-blast-core'
  core.style.left = `${centerX}px`
  core.style.top = `${centerY}px`
  core.style.setProperty('--blast-core-size', `${Math.max(54, resolvedInnerRadius * scale * 1.9)}px`)
  simHealthOverlay.appendChild(core)

  const ring = document.createElement('div')
  ring.className = 'sim-bomb-blast-ring'
  ring.style.left = `${centerX}px`
  ring.style.top = `${centerY}px`
  ring.style.setProperty('--blast-ring-size', `${Math.max(120, resolvedOuterRadius * scale * 2.2)}px`)
  simHealthOverlay.appendChild(ring)

  requestAnimationFrame(() => {
    core.classList.add('is-active')
    ring.classList.add('is-active')
  })

  setTimeout(() => {
    core.remove()
    ring.remove()
  }, duration)
}

function createSimMapBodies(mapId, width, height) {
  const bodies = []
  const meta = { bombs: [], rotors: [] }

  if (mapId === 'classic') {
    bodies.push(
      Bodies.circle(width * 0.5, height * 0.32, 18, { isStatic: true, restitution: 1.08, render: { fillStyle: '#fff2ba', strokeStyle: '#fffef3', lineWidth: 3 } }),
      Bodies.circle(width * 0.28, height * 0.64, 16, { isStatic: true, restitution: 1.05, render: { fillStyle: '#dff4ec', strokeStyle: '#fffef3', lineWidth: 3 } }),
      Bodies.circle(width * 0.72, height * 0.66, 16, { isStatic: true, restitution: 1.05, render: { fillStyle: '#e4e0ff', strokeStyle: '#fffef3', lineWidth: 3 } })
    )
  }

  if (mapId === 'bomb') {
    const bombPositions = [
      [width * 0.22, height * 0.28],
      [width * 0.78, height * 0.3],
      [width * 0.5, height * 0.5],
      [width * 0.28, height * 0.76],
      [width * 0.74, height * 0.72]
    ]
    bombPositions.forEach(([x, y]) => {
      const bomb = Bodies.circle(x, y, 18, {
        isStatic: true,
        restitution: 1.12,
        render: {
          fillStyle: '#bdbdbd',
          strokeStyle: '#f2f2f2',
          lineWidth: 3
        }
      })
      bomb.plugin.simHazardType = 'bomb'
      bomb.plugin.hitCount = 0
      bomb.plugin.lastHitAt = 0
      bomb.plugin.explodeAt = 3
      bomb.plugin.exploded = false
      bomb.plugin.innerBlastRadius = 54
      bomb.plugin.blastRadius = 126
      bomb.plugin.blastDamage = 0
      bomb.plugin.blastForce = 0.068
      applySimBombAppearance(bomb, 0)
      bodies.push(bomb)
      meta.bombs.push(bomb)
    })
    bodies.push(
      Bodies.circle(width * 0.5, height * 0.22, 14, { isStatic: true, restitution: 1.03, render: { fillStyle: '#fff2ba', strokeStyle: '#fffef3', lineWidth: 3 } }),
      Bodies.circle(width * 0.5, height * 0.8, 14, { isStatic: true, restitution: 1.03, render: { fillStyle: '#fff2ba', strokeStyle: '#fffef3', lineWidth: 3 } })
    )
  }

  if (mapId === 'rotor') {
    const rotorA = Bodies.rectangle(width * 0.57, height * 0.58, 188, 14, {
      isStatic: true,
      restitution: 1.04,
      render: { fillStyle: '#d8dcff', strokeStyle: '#fffef3', lineWidth: 3 }
    })
    rotorA.plugin.simHazardType = 'rotor'
    rotorA.plugin.center = { x: width * 0.57, y: height * 0.58 }
    rotorA.plugin.spinSpeed = 0.0036
    rotorA.plugin.baseAngle = 0

    const rotorB = Bodies.rectangle(width * 0.32, height * 0.28, 154, 14, {
      isStatic: true,
      restitution: 1.03,
      render: { fillStyle: '#c4f1d7', strokeStyle: '#fffef3', lineWidth: 3 }
    })
    rotorB.plugin.simHazardType = 'rotor'
    rotorB.plugin.center = { x: width * 0.32, y: height * 0.28 }
    rotorB.plugin.spinSpeed = -0.0044
    rotorB.plugin.baseAngle = 0.4

    bodies.push(rotorA, rotorB,
      Bodies.circle(width * 0.57, height * 0.58, 15, { isStatic: true, restitution: 1.04, render: { fillStyle: '#fff4c1', strokeStyle: '#fffef3', lineWidth: 3 } }),
      Bodies.circle(width * 0.32, height * 0.28, 12, { isStatic: true, restitution: 1.04, render: { fillStyle: '#fff4c1', strokeStyle: '#fffef3', lineWidth: 3 } })
    )
    meta.rotors.push(rotorA, rotorB)
  }

  if (mapId === 'pinball') {
    const positions = [
      [0.2, 0.2, 14, '#ffdcb8'], [0.5, 0.2, 16, '#d8ebff'], [0.8, 0.22, 14, '#ffe9af'],
      [0.28, 0.44, 18, '#d7f4ea'], [0.72, 0.42, 18, '#e5ddff'], [0.18, 0.7, 14, '#ffd8e7'],
      [0.5, 0.66, 20, '#fff2ba'], [0.82, 0.72, 14, '#dff4ec']
    ]
    positions.forEach(([px, py, r, color]) => {
      bodies.push(Bodies.circle(width * px, height * py, r, {
        isStatic: true,
        restitution: 1.14,
        render: { fillStyle: color, strokeStyle: '#fffef3', lineWidth: 3 }
      }))
    })
  }

  return { bodies, meta }
}

function triggerSimBombExplosion(bomb) {
  if (!bomb || bomb.plugin.exploded || !simArenaWorld) return
  bomb.plugin.exploded = true
  playThrottledSfx('bombExplosion', 180)
  applySimBombAppearance(bomb, 3)
  bomb.render.strokeStyle = '#ffffff'
  bomb.render.lineWidth = 4

  const innerRadius = bomb.plugin.innerBlastRadius || 54
  const outerRadius = bomb.plugin.blastRadius || 126
  const baseForce = bomb.plugin.blastForce || 0.068

  spawnSimBombExplosionEffect(bomb, {
    innerRadius,
    outerRadius,
    duration: 780
  })

  simRoundPlayers.forEach((player) => {
    if (!player.isAlive) return
    const body = simArenaBodyMap.get(player.id)
    if (!body || !body.plugin.isAlive) return
    const dx = body.position.x - bomb.position.x
    const dy = body.position.y - bomb.position.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance <= 0 || distance > outerRadius) return

    const safeDistance = Math.max(12, distance)
    let pushForce = 0

    if (distance <= innerRadius) {
      const innerRatio = 1 - distance / innerRadius
      pushForce = baseForce * (1.1 + innerRatio * 1.75)
    } else {
      const outerRatio = 1 - (distance - innerRadius) / Math.max(1, outerRadius - innerRadius)
      pushForce = baseForce * (0.38 + outerRatio * 0.92)
    }

    Body.applyForce(body, body.position, {
      x: (dx / safeDistance) * pushForce,
      y: (dy / safeDistance) * pushForce - pushForce * 0.16
    })

    flashSimBallBody(player, {
      glowStroke: '#ffd98f',
      lineWidth: 6,
      duration: 320
    })
  })

  setTimeout(() => {
    if (simArenaWorld && bomb) {
      World.remove(simArenaWorld, bomb)
    }
  }, 140)

  syncSimCombatStatus('폭탄이 터졌다! 근처 공들이 강하게 튕겨 나간다.')
  updateSimArenaOverlay()
  maybeFinishSimBattle()
}

function updateSimArenaHazards(now) {
  if (!simArenaMeta || !simBattleRunning) return

  simArenaMeta.rotors?.forEach((rotor) => {
    if (!rotor?.plugin?.center) return
    Body.setAngle(rotor, rotor.plugin.baseAngle + now * rotor.plugin.spinSpeed)
  })

  const shrink = simArenaMeta.shrink
  if (!shrink || !shrink.zoneEl) return

  const elapsed = now - shrink.startAt
  if (elapsed < 0) return

  const progress = Math.min(1, elapsed / shrink.duration)
  const zoneWidth = shrink.fullWidth - (shrink.fullWidth - shrink.minWidth) * progress
  const zoneHeight = shrink.fullHeight - (shrink.fullHeight - shrink.minHeight) * progress
  const left = (shrink.fullWidth - zoneWidth) / 2
  const top = (shrink.fullHeight - zoneHeight) / 2

  const lastVisualUpdateAt = shrink.lastVisualUpdateAt || 0
  if (now - lastVisualUpdateAt >= SIM_BATTLE_PERFORMANCE.overlayFrameGap) {
    shrink.lastVisualUpdateAt = now
    shrink.zoneEl.classList.add('is-active')
    shrink.zoneEl.classList.toggle('is-danger', progress > 0.12)
    shrink.zoneEl.style.left = `${left}px`
    shrink.zoneEl.style.top = `${top}px`
    shrink.zoneEl.style.width = `${zoneWidth}px`
    shrink.zoneEl.style.height = `${zoneHeight}px`

    const displayWidth = simArenaMeta.displayWidth || simArenaRender?.options?.width || shrink.fullWidth
    const displayHeight = simArenaMeta.displayHeight || simArenaRender?.options?.height || shrink.fullHeight
    const scaleX = displayWidth / Math.max(1, simArenaRender?.options?.width || shrink.fullWidth)
    const scaleY = displayHeight / Math.max(1, simArenaRender?.options?.height || shrink.fullHeight)
    shrink.zoneEl.style.setProperty('--sim-shrink-display-left', `${left * scaleX}px`)
    shrink.zoneEl.style.setProperty('--sim-shrink-display-top', `${top * scaleY}px`)
    shrink.zoneEl.style.setProperty('--sim-shrink-display-width', `${zoneWidth * scaleX}px`)
    shrink.zoneEl.style.setProperty('--sim-shrink-display-height', `${zoneHeight * scaleY}px`)
  }

  shrink.rect = { left, top, right: left + zoneWidth, bottom: top + zoneHeight }

  simRoundPlayers.forEach((player) => {
    if (!player.isAlive) return
    const body = simArenaBodyMap.get(player.id)
    if (!body || !body.plugin.isAlive) return
    const r = body.circleRadius || 22
    const rect = shrink.rect
    const tolerance = 10
    const outside = body.position.x < rect.left + r - tolerance || body.position.x > rect.right - r + tolerance || body.position.y < rect.top + r - tolerance || body.position.y > rect.bottom - r + tolerance
    if (!outside) return

    const targetX = Math.min(Math.max(body.position.x, rect.left + r + 6), rect.right - r - 6)
    const targetY = Math.min(Math.max(body.position.y, rect.top + r + 6), rect.bottom - r - 6)
    const dx = targetX - body.position.x
    const dy = targetY - body.position.y

    Body.applyForce(body, body.position, {
      x: dx * 0.00034,
      y: dy * 0.00034
    })

    if (Math.abs(dx) > 16 || Math.abs(dy) > 16) {
      Body.setVelocity(body, {
        x: body.velocity.x * 0.94 + dx * 0.014,
        y: body.velocity.y * 0.94 + dy * 0.014
      })
    }
  })
}

function createSimOverlayLabel(player) {
  if (!simHealthOverlay) return null
  const label = document.createElement('div')
  label.className = 'sim-ball-label'
  label.dataset.playerId = player.id
  label.innerHTML = `
    <div class="sim-ball-top">
      <div class="sim-ball-name">${escapeHtml(player.label)}</div>
      <div class="sim-ball-place"></div>
    </div>
    <div class="sim-ball-hpbar"><span></span></div>
    <div class="sim-ball-hptext">${player.currentHp}/${player.maxHp}</div>
  `
  label._parts = {
    bar: label.querySelector('.sim-ball-hpbar span'),
    text: label.querySelector('.sim-ball-hptext'),
    place: label.querySelector('.sim-ball-place')
  }
  simHealthOverlay.appendChild(label)
  simOverlayMap.set(player.id, label)
  return label
}

function createSimBody(player, worldWidth, worldHeight) {
  const radius = getSimBallRadius(worldWidth, worldHeight)
  const spawnPadding = clampValue(Math.min(worldWidth, worldHeight) * 0.16, radius + 22, 70)
  const lineWidth = getSimBallLineWidth(radius)
  const strokeStyle = getSimBallStrokeColor()

  const body = Bodies.circle(
    rand(spawnPadding, worldWidth - spawnPadding),
    rand(spawnPadding, worldHeight - spawnPadding),
    radius,
    {
      restitution: 0.98,
      friction: 0,
      frictionStatic: 0,
      frictionAir: 0,
      inertia: Infinity,
      render: {
        fillStyle: player.color,
        strokeStyle,
        lineWidth
      }
    }
  )

  body.plugin.simPlayerId = player.id
  body.plugin.baseRadius = radius
  body.plugin.baseStrokeStyle = strokeStyle
  body.plugin.baseLineWidth = lineWidth
  body.plugin.targetSpeed = 2.42
  body.plugin.nextTurnAt = 0
  body.plugin.lastCollisionAt = 0
  body.plugin.isAlive = true

  const startAngle = rand(0, Math.PI * 2)
  Body.setVelocity(body, {
    x: Math.cos(startAngle) * body.plugin.targetSpeed,
    y: Math.sin(startAngle) * body.plugin.targetSpeed
  })

  return body
}

function renderSimCanvasOnce(timestamp = performance.now()) {
  if (!simArenaRender) return
  simRenderLastPaintAt = timestamp
  Render.world(simArenaRender, timestamp)
}

function startSimRenderLoop() {
  if (simRenderRaf) {
    cancelAnimationFrame(simRenderRaf)
  }
  simRenderLastPaintAt = 0

  const renderFrame = (timestamp) => {
    if (!simArenaRender) {
      simRenderRaf = null
      return
    }

    const shouldPaint = simBattleFinished || !simRenderLastPaintAt || timestamp - simRenderLastPaintAt >= SIM_BATTLE_PERFORMANCE.renderFrameGap
    if (shouldPaint) {
      renderSimCanvasOnce(timestamp)
    }

    if (simBattleFinished) {
      simRenderRaf = null
      return
    }
    simRenderRaf = requestAnimationFrame(renderFrame)
  }

  simRenderRaf = requestAnimationFrame(renderFrame)
}

function initSimArena() {
  if (!simArenaWrap) return false

  clearSimArena()
  const width = simArenaWrap.clientWidth || 900
  const height = simArenaWrap.clientHeight || 460

  simArenaEngine = Engine.create()
  simArenaWorld = simArenaEngine.world
  simArenaEngine.gravity.y = 0
  simArenaEngine.enableSleeping = true
  if (APP_PERFORMANCE_PROFILE.isMobile) {
    simArenaEngine.positionIterations = 4
    simArenaEngine.velocityIterations = 3
    simArenaEngine.constraintIterations = 1
  } else if (APP_PERFORMANCE_PROFILE.isLowEndDesktop) {
    simArenaEngine.positionIterations = 5
    simArenaEngine.velocityIterations = 3
    simArenaEngine.constraintIterations = 1
  }

  simArenaRender = Matter.Render.create({
    element: simArenaWrap,
    engine: simArenaEngine,
    options: {
      width,
      height,
      wireframes: false,
      background: 'transparent',
      pixelRatio: Math.min(window.devicePixelRatio || 1, SIM_BATTLE_PERFORMANCE.canvasPixelRatio)
    }
  })

  simArenaRender.canvas.style.position = 'absolute'
  simArenaRender.canvas.style.inset = '0'
  simArenaRender.canvas.style.width = '100%'
  simArenaRender.canvas.style.height = '100%'

  startSimRenderLoop()
  simArenaRunner = Matter.Runner.create()
  simArenaRunner.delta = 1000 / APP_PERFORMANCE_PROFILE.physicsHz
  Matter.Runner.run(simArenaRunner, simArenaEngine)
  syncFastForwardRuntime('game4')

  const walls = createSimWalls(width, height)
  const wallBodies = [walls.top, walls.bottom, walls.left, walls.right]
  const mapResult = createSimMapBodies(simSelectedMap, width, height)
  const shrinkZoneEl = createSimShrinkZone()

  simArenaMeta = {
    width,
    height,
    displayWidth: width,
    displayHeight: height,
    mapId: simSelectedMap,
    walls,
    ...mapResult.meta,
    shrink: {
      zoneEl: shrinkZoneEl,
      startAt: 12000,
      duration: 22000,
      fullWidth: width,
      fullHeight: height,
      minWidth: width * 0.36,
      minHeight: height * 0.36,
      lastVisualUpdateAt: 0,
      rect: { left: 0, top: 0, right: width, bottom: height }
    }
  }

  Matter.World.add(simArenaWorld, [...wallBodies, ...mapResult.bodies])
  simArenaWrap.classList.add('is-running')

  simRoundPlayers.forEach((player) => {
    const body = createSimBody(player, width, height)
    simArenaBodies.push(body)
    simArenaBodyMap.set(player.id, body)
    createSimOverlayLabel(player)
  })

  Matter.World.add(simArenaWorld, simArenaBodies)
  Matter.Events.on(simArenaEngine, 'beforeUpdate', updateSimMovement)
  Matter.Events.on(simArenaEngine, 'afterUpdate', updateSimArenaOverlay)
  Matter.Events.on(simArenaEngine, 'collisionStart', handleSimCollisions)

  return true
}

function updateSimMovement() {
  if (!simArenaEngine || !simBattleRunning) return

  const now = simArenaEngine.timing.timestamp
  updateSimArenaHazards(now)
  updateSimSuddenDeath(now)
  if (!simBattleRunning) return

  simRoundPlayers.forEach((player) => {
    if (!simBattleRunning || !player.isAlive) return
    const body = simArenaBodyMap.get(player.id)
    if (!body || !body.plugin.isAlive) return

    const speed = Math.max(0.0001, body.speed)
    const targetSpeed = body.plugin.targetSpeed

    if (now >= body.plugin.nextTurnAt) {
      const currentAngle = speed > 0.001 ? Math.atan2(body.velocity.y, body.velocity.x) : rand(0, Math.PI * 2)
      const nextAngle = currentAngle + rand(-0.55, 0.55)
      Body.setVelocity(body, {
        x: Math.cos(nextAngle) * targetSpeed,
        y: Math.sin(nextAngle) * targetSpeed
      })
      body.plugin.nextTurnAt = now + rand(420, 980)
      return
    }

    const adjustRatio = targetSpeed / speed
    if (adjustRatio > 1.12 || adjustRatio < 0.88) {
      Body.setVelocity(body, {
        x: body.velocity.x * adjustRatio,
        y: body.velocity.y * adjustRatio
      })
    }
  })

  if (!simBattleFinished) {
    maybeFinishSimBattle()
  } else if (!simFinalResultsShown) {
    queueSimFinalResultsPopup()
  }
}

function paintSimArenaOverlay(refreshMetrics = false) {
  if (!simArenaRender || !simArenaWrap) return

  if (refreshMetrics && simArenaMeta) {
    simArenaMeta.displayWidth = simArenaWrap.clientWidth || simArenaRender.options.width
    simArenaMeta.displayHeight = simArenaWrap.clientHeight || simArenaRender.options.height
  }
  const displayWidth = simArenaMeta?.displayWidth || simArenaRender.options.width
  const displayHeight = simArenaMeta?.displayHeight || simArenaRender.options.height
  const scaleX = displayWidth / simArenaRender.options.width
  const scaleY = displayHeight / simArenaRender.options.height

  simRoundPlayers.forEach((player) => {
    const body = simArenaBodyMap.get(player.id)
    const label = simOverlayMap.get(player.id)
    if (!body || !label) return

    const hpRatio = player.maxHp ? Math.max(0, player.currentHp) / player.maxHp : 0
    const parts = label._parts || {}

    if (parts.bar) {
      const nextBarWidth = `${(hpRatio * 100).toFixed(1)}%`
      if (parts.bar._lastWidth !== nextBarWidth) {
        parts.bar._lastWidth = nextBarWidth
        parts.bar.style.width = nextBarWidth
      }
    }
    if (parts.text) {
      const nextText = player.isAlive ? `${Math.max(0, player.currentHp)}/${player.maxHp}` : '탈락'
      if (parts.text.textContent !== nextText) {
        parts.text.textContent = nextText
      }
    }
    if (parts.place) {
      const nextPlaceText = player.finalPlace ? `${player.finalPlace}위` : ''
      if (parts.place.textContent !== nextPlaceText) {
        parts.place.textContent = nextPlaceText
      }
    }

    const isDead = !player.isAlive
    const isWinner = player.finalPlace === 1
    if (label._isDead !== isDead) {
      label._isDead = isDead
      label.classList.toggle('is-dead', isDead)
    }
    if (label._isWinner !== isWinner) {
      label._isWinner = isWinner
      label.classList.toggle('is-winner', isWinner)
    }

    const x = body.position.x * scaleX
    const y = body.position.y * scaleY
    const displayRadius = (body.circleRadius || SIM_BASE_BALL_RADIUS) * Math.min(scaleX, scaleY)
    const offsetY = player.isAlive ? -(displayRadius + 14) : displayRadius * 0.72
    const scale = player.isAlive ? 0.96 : 0.8
    label.style.transform = `translate3d(${x}px, ${y + offsetY}px, 0) translate(-50%, -50%) scale(${scale})`
  })
}

function updateSimArenaOverlay(force = false) {
  if (!simArenaRender || !simArenaWrap) return

  const forcePaint = force === true
  const now = performance.now()

  if (forcePaint || now - simOverlayLastPaintAt >= SIM_BATTLE_PERFORMANCE.overlayFrameGap) {
    simOverlayLastPaintAt = now
    if (simOverlayRaf) {
      cancelAnimationFrame(simOverlayRaf)
      simOverlayRaf = null
    }
    paintSimArenaOverlay(forcePaint)
  }
}

function getSimPlayerById(playerId) {
  return simRoundPlayers.find((player) => player.id === playerId) || null
}

function getSimRankingData() {
  const alive = simRoundPlayers
    .filter((player) => player.isAlive)
    .sort((a, b) => {
      if (b.currentHp !== a.currentHp) return b.currentHp - a.currentHp
      return a.label.localeCompare(b.label, 'ko')
    })
    .map((player) => ({ ...player, rankLabel: '생존' }))

  const eliminated = [...simEliminationOrder].reverse()
  const dead = eliminated.map((player) => ({
    ...player,
    rankLabel: `${player.eliminationRank || '-'}번째 탈락`
  }))

  if (simBattleFinished && alive.length === 1) {
    const winner = alive[0]
    winner.rankLabel = '우승'
  }

  if (simBattleFinished && !alive.length && dead.length) {
    dead[0].rankLabel = '마지막 생존자'
  }

  return [...alive, ...dead]
}

function syncSimCombatStatus(message, options = {}) {
  const { force = false } = options
  const now = performance.now()
  if (!force && now - simLastCombatMessageAt < SIM_BATTLE_PERFORMANCE.statusInterval) return
  simLastCombatMessageAt = now
  if (simStatusText) {
    simStatusText.textContent = message
  }
}

function markSimPlayerDead(player, { silent = false } = {}) {
  if (!player || !player.isAlive) return
  playSfx('simEliminate')
  player.isAlive = false
  player.currentHp = 0
  simEliminationOrder.push(player)
  player.finalPlace = simRoundPlayers.length - simEliminationOrder.length + 1
  player.eliminationRank = simEliminationOrder.length
  player.rankLabel = `${player.finalPlace}위`

  const body = simArenaBodyMap.get(player.id)
  if (body) {
    body.plugin.isAlive = false
    Body.setVelocity(body, { x: 0, y: 0 })
    Body.setAngularVelocity(body, 0)
    Body.setStatic(body, true)
    body.isSensor = true
    body.collisionFilter.mask = 0
    body.collisionFilter.category = 0
    body.render.opacity = 0.28
    body.render.strokeStyle = 'rgba(255,255,255,0.22)'
    body.render.lineWidth = 2
  }

  const label = simOverlayMap.get(player.id)
  if (label) {
    label.classList.add('is-dead')
    const place = label.querySelector('.sim-ball-place')
    if (place) {
      place.textContent = `${player.finalPlace}위`
    }
  }

  if (!silent) {
    syncSimCombatStatus(`${player.label} 탈락! ${player.finalPlace}위 확정.`)
  }

  maybeFinishSimBattle()
}

function resolveSimPairCombat(playerA, playerB) {
  if (!playerA || !playerB || !playerA.isAlive || !playerB.isAlive) return
  playThrottledSfx('simImpact', SFX_THROTTLE_MS.simImpact)

  const hpBeforeA = playerA.currentHp
  const hpBeforeB = playerB.currentHp
  const actualAccA = Math.max(0, playerA.stats.accuracy * (1 - playerB.stats.defense / 100))
  const actualAccB = Math.max(0, playerB.stats.accuracy * (1 - playerA.stats.defense / 100))

  const hitA = Math.random() * 100 < actualAccA
  const hitB = Math.random() * 100 < actualAccB

  const damageA = hitA ? playerA.stats.attack : 0
  const damageB = hitB ? playerB.stats.attack : 0

  if (damageA > 0) {
    playerB.currentHp -= damageA
    spawnSimHitEffect(playerB, damageA)
  }
  if (damageB > 0) {
    playerA.currentHp -= damageB
    spawnSimHitEffect(playerA, damageB)
  }

  const bothDead = playerA.currentHp <= 0 && playerB.currentHp <= 0
  if (bothDead) {
    let survivor = playerA
    let loser = playerB

    if (hpBeforeB > hpBeforeA) {
      survivor = playerB
      loser = playerA
    } else if (hpBeforeA === hpBeforeB) {
      if ((playerB.stats.attack + playerB.stats.accuracy + playerB.stats.defense) > (playerA.stats.attack + playerA.stats.accuracy + playerA.stats.defense)) {
        survivor = playerB
        loser = playerA
      } else if ((playerA.stats.attack + playerA.stats.accuracy + playerA.stats.defense) === (playerB.stats.attack + playerB.stats.accuracy + playerB.stats.defense) && Math.random() < 0.5) {
        survivor = playerB
        loser = playerA
      }
    }

    survivor.currentHp = 1
    loser.currentHp = 0
    markSimPlayerDead(loser, { silent: true })
    syncSimCombatStatus(`${playerA.label} vs ${playerB.label} 동시 격돌! ${survivor.label}이 1 체력으로 간신히 생존.`)
  } else {
    if (playerA.currentHp <= 0) {
      markSimPlayerDead(playerA, { silent: true })
    }
    if (playerB.currentHp <= 0) {
      markSimPlayerDead(playerB, { silent: true })
    }

    const resultA = hitA ? `${playerA.label} 적중` : `${playerA.label} 빗나감`
    const resultB = hitB ? `${playerB.label} 적중` : `${playerB.label} 빗나감`
    syncSimCombatStatus(`${playerA.label} vs ${playerB.label} 충돌 · ${resultA} / ${resultB}`)
  }

  if (!simBattleFinished) {
    scheduleSimRankingRender({ force: !playerA.isAlive || !playerB.isAlive })
  }
  updateSimArenaOverlay()
  maybeFinishSimBattle()
}

function handleSimCollisions(event) {
  if (!simBattleRunning) return

  const now = simArenaEngine?.timing?.timestamp || performance.now()
  event.pairs.forEach((pair) => {
    const bodyA = pair.bodyA
    const bodyB = pair.bodyB
    const playerIdA = bodyA.plugin?.simPlayerId
    const playerIdB = bodyB.plugin?.simPlayerId
    const hazardA = bodyA.plugin?.simHazardType
    const hazardB = bodyB.plugin?.simHazardType

    if (playerIdA && playerIdB && playerIdA !== playerIdB) {
      if (!bodyA.plugin?.isAlive || !bodyB.plugin?.isAlive) return

      const cooldownKeyA = bodyA.plugin.lastCollisionAt || 0
      const cooldownKeyB = bodyB.plugin.lastCollisionAt || 0
      if (now - cooldownKeyA < 220 || now - cooldownKeyB < 220) return

      bodyA.plugin.lastCollisionAt = now
      bodyB.plugin.lastCollisionAt = now

      const playerA = getSimPlayerById(playerIdA)
      const playerB = getSimPlayerById(playerIdB)
      resolveSimPairCombat(playerA, playerB)
      return
    }

    const bombBody = hazardA === 'bomb' ? bodyA : hazardB === 'bomb' ? bodyB : null
    const playerBody = playerIdA && hazardB === 'bomb' ? bodyA : playerIdB && hazardA === 'bomb' ? bodyB : null
    if (bombBody && playerBody && !bombBody.plugin.exploded) {
      if (!bombBody.plugin.lastHitAt || now - bombBody.plugin.lastHitAt > 240) {
        bombBody.plugin.lastHitAt = now
        bombBody.plugin.hitCount += 1
        applySimBombAppearance(bombBody, bombBody.plugin.hitCount)
        const remaining = Math.max(0, bombBody.plugin.explodeAt - bombBody.plugin.hitCount)
        syncSimCombatStatus(remaining > 0 ? `폭탄이 흔들린다... ${remaining}번만 더 부딪히면 폭발!` : '폭탄이 검게 물들며 곧 폭발한다!')
        if (bombBody.plugin.hitCount >= bombBody.plugin.explodeAt && !bombBody.plugin.pendingExplosion) {
          bombBody.plugin.pendingExplosion = true
          setTimeout(() => triggerSimBombExplosion(bombBody), 120)
        }
      }
    }
  })
}

function freezeSimBodiesOnFinish() {
  const rect = simArenaMeta?.shrink?.rect || {
    left: 0,
    top: 0,
    right: simArenaMeta?.width || 0,
    bottom: simArenaMeta?.height || 0
  }

  simRoundPlayers.forEach((player) => {
    const body = simArenaBodyMap.get(player.id)
    if (!body) return

    const radius = body.circleRadius || 22
    const clampedX = Math.min(Math.max(body.position.x, rect.left + radius + 4), rect.right - radius - 4)
    const clampedY = Math.min(Math.max(body.position.y, rect.top + radius + 4), rect.bottom - radius - 4)

    Body.setPosition(body, { x: clampedX, y: clampedY })
    Body.setVelocity(body, { x: 0, y: 0 })
    Body.setAngularVelocity(body, 0)
    body.plugin.lastCollisionAt = Infinity
    body.plugin.nextTurnAt = Infinity

    if (player.isAlive) {
      body.plugin.isAlive = false
      Body.setStatic(body, true)
      body.collisionFilter.mask = 0
      body.collisionFilter.category = 0
    }
  })

  if (simArenaMeta?.shrink?.zoneEl) {
    simArenaMeta.shrink.zoneEl.classList.add('is-frozen')
  }
}

function getSimFinalRanking() {
  return [...simRoundPlayers].sort((a, b) => {
    const placeA = Number.isFinite(a.finalPlace) ? a.finalPlace : 999
    const placeB = Number.isFinite(b.finalPlace) ? b.finalPlace : 999
    if (placeA !== placeB) return placeA - placeB
    if (b.currentHp !== a.currentHp) return b.currentHp - a.currentHp
    return a.label.localeCompare(b.label, 'ko')
  })
}

function clearSimFinalResultsWatchdog() {
  if (simFinalResultsWatchdog) {
    clearInterval(simFinalResultsWatchdog)
    simFinalResultsWatchdog = null
  }
}

function buildSimFinalResultsHtml(ranking = []) {
  if (!ranking.length) {
    return '<span>결과가 없습니다.</span>'
  }

  return `
    <div style="display:flex;flex-direction:column;gap:10px;align-items:center;">
      ${ranking.map((player, index) => {
        return `<div style="font-size:1.05rem;font-weight:800;color:#8b6f60;line-height:1.35;">${index + 1}위. ${escapeHtml(player.label)}</div>`
      }).join('')}
    </div>
  `
}

function ensureSimFinalResultsPopup() {
  if (!simBattleFinished) return false

  closeSimArenaZoom()

  const ranking = getSimFinalRanking()
  const winner = ranking.find((player) => player.finalPlace === 1) || null
  const html = buildSimFinalResultsHtml(ranking)

  unlockPopupOverlay()
  closePopup({ force: true })

  if (simStatusText) {
    simStatusText.textContent = winner
      ? `${winner.label} 최후의 1인 생존! (${SIM_MAP_OPTIONS[simSelectedMap]?.name || '전투장'})`
      : '전투가 종료되었다.'
  }

  showPopup('최종 결과', html, {
    icon: '🏆',
    allowHtml: true
  })

  return isPopupVisible()
}

function queueSimFinalResultsPopup() {
  if (!simBattleFinished) return

  const tryShow = () => {
    if (!simBattleFinished) return
    showSimFinalResults({ force: true })
  }

  if (simFinalResultsRaf) {
    cancelAnimationFrame(simFinalResultsRaf)
  }
  simFinalResultsRaf = requestAnimationFrame(() => {
    simFinalResultsRaf = null
    tryShow()
  })

  if (simFinalResultsTimer) {
    clearTimeout(simFinalResultsTimer)
  }
  simFinalResultsTimer = setTimeout(() => {
    simFinalResultsTimer = null
    tryShow()
  }, 80)

  clearSimFinalResultsWatchdog()
  let attempts = 0
  simFinalResultsWatchdog = setInterval(() => {
    attempts += 1
    if (!simBattleFinished) {
      clearSimFinalResultsWatchdog()
      return
    }

    const visible = showSimFinalResults({ force: true })
    if (visible || attempts >= 40) {
      clearSimFinalResultsWatchdog()
    }
  }, 100)
}

function maybeFinishSimBattle() {
  if (simBattleFinished) return false

  const survivors = simRoundPlayers.filter((player) => player.isAlive)
  if (survivors.length > 1) return false

  releaseFastForward('game4')
  simBattleRunning = false
  simBattleFinished = true
  if (simArenaRunner) {
    simArenaRunner.enabled = false
    Matter.Runner.stop(simArenaRunner)
  }
  if (simArenaWrap) {
    simArenaWrap.classList.remove('is-sudden-death')
  }

  if (survivors.length === 1) {
    playSfx('simWin')
    survivors[0].rankLabel = '우승'
    survivors[0].finalPlace = 1
    const winnerLabel = simOverlayMap.get(survivors[0].id)
    if (winnerLabel) {
      const place = winnerLabel.querySelector('.sim-ball-place')
      if (place) place.textContent = '1위'
      winnerLabel.classList.add('is-winner')
    }
  }

  queueSimFinalResultsPopup()

  try {
    freezeSimBodiesOnFinish()
  } catch (error) {
    console.error('[game4] freezeSimBodiesOnFinish failed:', error)
  }

  try {
    setSimInputLock(false)
    setSimShuffleLock(false)
    setSimBattleStartState(false)
    updateSimPhase('종료')
    flushSimRankingRender(getSimRankingData())
    updateSimArenaOverlay(true)
    setSimViewMode('battle')
  } catch (error) {
    console.error('[game4] finish UI sync failed:', error)
  }

  showSimFinalResults({ force: true })
  return true
}

function showSimFinalResults(options = {}) {
  const { force = false } = options
  if (!simBattleFinished) return false

  const alreadyVisible = isPopupVisible() && popupTitle?.textContent === '최종 결과'
  if (simFinalResultsShown && alreadyVisible && !force) {
    return true
  }

  simFinalResultsShown = true

  if (simFinalResultsTimer) {
    clearTimeout(simFinalResultsTimer)
    simFinalResultsTimer = null
  }
  if (simFinalResultsRaf) {
    cancelAnimationFrame(simFinalResultsRaf)
    simFinalResultsRaf = null
  }

  const visible = ensureSimFinalResultsPopup()
  if (visible) {
    clearSimFinalResultsWatchdog()
  }
  return visible
}

async function startSimBattle() {
  if (!simSetupDone || simBattleRunning || !simRoundPlayers.length) return

  if (!canUseMatterPhysics()) {
    showMatterUnavailablePopup()
    return
  }

  simRoundPlayers = simRoundPlayers.map((player) => ({
    ...player,
    currentHp: player.maxHp,
    isAlive: true,
    eliminationRank: null,
    finalPlace: null,
    rankLabel: '생존'
  }))
  simEliminationOrder = []
  simBattleFinished = false
  simFinalResultsShown = false
  resetSimSuddenDeathState()
  clearSimFinalResultsWatchdog()

  if (simFinalResultsTimer) {
    clearTimeout(simFinalResultsTimer)
    simFinalResultsTimer = null
  }
  if (simFinalResultsRaf) {
    cancelAnimationFrame(simFinalResultsRaf)
    simFinalResultsRaf = null
  }

  renderSimBattleSummary(simRoundPlayers)
  setSimViewMode('battle')
  setSimBattleStartState(false)
  updateSimPhase('맵 선택')

  if (simStatusText) {
    simStatusText.textContent = '전투 경기장을 선택해줘. 선택이 끝나면 즉시 경기가 시작된다.'
  }

  const mapId = await selectSimArenaMap()
  if (!mapId || !simSetupDone || simBattleRunning) return

  simSelectedMap = SIM_MAP_OPTIONS[mapId] ? mapId : 'classic'

  if (!initSimArena()) {
    setSimViewMode('setup')
    renderSimBattleSummary([])
    setSimBattleStartState(true)
    updateSimPhase('준비 완료')
    return
  }

  simBattleRunning = true
  playSfx('arenaStart')
  syncFastForwardRuntime('game4')
  setSimInputLock(true)
  setSimShuffleLock(true)
  updateSimPhase('전투 중')
  flushSimRankingRender(getSimRankingData())
  updateSimArenaOverlay()

  if (simStatusText) {
    simStatusText.textContent = `${SIM_MAP_OPTIONS[simSelectedMap]?.name || '전투장'} 전투 시작! 공이 부딪히는 순간 즉시 판정되고, 일정 시간이 지나면 안전 구역이 줄어든다.`
  }
}
