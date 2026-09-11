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
    simRankingRows.clear()
    simRankingList.innerHTML = '<div class="sim-ranking-empty">전투를 시작하면 생존 순위와 남은 체력을 확인할 수 있어.</div>'
    return ranking
  }
  if (!simRankingRows.size) simRankingList.replaceChildren()
  const activeIds = new Set(ranking.map((player) => player.id))
  simRankingRows.forEach((row, id) => {
    if (!activeIds.has(id)) { row.remove(); simRankingRows.delete(id) }
  })
  ranking.forEach((player, index) => {
    let row = simRankingRows.get(player.id)
    if (!row) {
      row = document.createElement('div')
      row.className = 'sim-ranking-item'
      row.dataset.playerId = player.id
      row.innerHTML = '<div class="sim-ranking-num"></div><div class="sim-ranking-main"><div class="sim-ranking-name"><span class="sim-ranking-dot"></span><span class="sim-ranking-player"></span></div><div class="sim-ranking-hp-track"><i></i></div><div class="sim-ranking-hp-value"></div></div><div class="sim-ranking-state"></div>'
      row._parts = Object.fromEntries(['num', 'dot', 'player', 'state', 'hp-value'].map((name) => [name, row.querySelector(`.sim-ranking-${name}`)]))
      row._parts.bar = row.querySelector('.sim-ranking-hp-track i')
      simRankingRows.set(player.id, row)
    }
    const hp = Math.max(0, Math.round(player.currentHp || 0))
    const maxHp = Math.max(1, Math.round(player.maxHp || 1))
    const parts = row._parts
    const setText = (part, value) => { if (part.textContent !== value) part.textContent = value }
    setText(parts.num, String(index + 1))
    setText(parts.player, player.label)
    setText(parts.state, player.rankLabel || (player.isAlive ? '생존' : '탈락'))
    setText(parts['hp-value'], `${hp} / ${maxHp} HP`)
    if (row._color !== player.color) { parts.dot.style.background = player.color; row._color = player.color }
    const ratio = clampValue(hp / maxHp, 0, 1)
    if (row._ratio !== ratio) { parts.bar.style.transform = `scaleX(${ratio})`; row._ratio = ratio }
    row.classList.toggle('top', index === 0)
    row.classList.toggle('is-out', !player.isAlive)
    row.classList.toggle('is-critical', player.isAlive && ratio <= 0.25)
    if (simRankingList.children[index] !== row) simRankingList.insertBefore(row, simRankingList.children[index] || null)
  })
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
  simArenaResizeObserver?.disconnect()
  simArenaResizeObserver = null
  simBattlePaused = false
  simBattlePending = false
  simVisibilityPaused = false
  simPlaybackRate = 1
  simMetricsDirty = true
  simFrameClock.lastAt = null
  simFrameClock.accumulator = 0
  simFrameClock.visualTime = 0
  simEffectPool.forEach((effect) => { effect.active = false })
  simArenaWrap?.classList.remove('is-paused')
  resetSimSuddenDeathState()
  closeSimArenaZoom()

  if (simRenderRaf) {
    cancelAnimationFrame(simRenderRaf)
    simRenderRaf = null
  }
  simRenderLastPaintAt = 0

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

function flashSimBallBody(player, { glowStroke = '#fff7a8', lineWidth = 5, duration = 260 } = {}) {
  const body = simArenaBodyMap.get(player?.id)
  if (!body) return
  body.plugin.flashUntil = simFrameClock.visualTime + duration
  body.plugin.flashColor = glowStroke
  body.plugin.flashWidth = lineWidth
}

function shouldPlaySimTransientEffect(playerId = '') {
  const now = simFrameClock.visualTime
  const lastAt = simEffectLastAt.get(playerId) ?? -Infinity
  if (now - lastAt < SIM_BATTLE_PERFORMANCE.effectInterval) return false
  simEffectLastAt.set(playerId, now)
  return true
}

function addSimCanvasEffect(options) {
  const active = simEffectPool.filter((effect) => effect.active)
  let slot = simEffectPool.find((effect) => !effect.active)
  if (active.length >= SIM_BATTLE_PERFORMANCE.maxTransientEffects || !slot) {
    if (options.kind !== 'bomb') return
    slot = active.reduce((oldest, effect) => effect.startedAt < oldest.startedAt ? effect : oldest)
  }
  Object.assign(slot, { text: '', radius: 0, color: '#ff7f92', duration: 420 }, options, { active: true, startedAt: simFrameClock.visualTime })
}

function spawnSimFloatingBurst(player, { text = '-1', duration = 640, yOffset = 0 } = {}) {
  const body = simArenaBodyMap.get(player?.id)
  if (!body) return
  addSimCanvasEffect({ kind: 'damage', x: body.position.x, y: body.position.y + yOffset, text, duration, color: '#ff6f86' })
}

function spawnSimHitEffect(player, damage = 0) {
  if (!player || damage <= 0 || !shouldPlaySimTransientEffect(player.id)) return
  flashSimBallBody(player, { glowStroke: '#ff7f92', lineWidth: 5, duration: 260 })
  const body = simArenaBodyMap.get(player.id)
  if (body) addSimCanvasEffect({ kind: 'hit', x: body.position.x, y: body.position.y, radius: body.circleRadius, duration: 320, color: '#ff7f92' })
  if (SIM_BATTLE_PERFORMANCE.showFloatingDamage) spawnSimFloatingBurst(player, { text: `-${damage}`, yOffset: -8 })
}

function spawnSimDecayEffect(player, damage = 0) {
  if (!player || damage <= 0 || !shouldPlaySimTransientEffect(`decay-${player.id}`)) return
  flashSimBallBody(player, { glowStroke: '#ffb14f', lineWidth: 5, duration: 300 })
  const body = simArenaBodyMap.get(player.id)
  if (body) addSimCanvasEffect({ kind: 'hit', x: body.position.x, y: body.position.y, radius: body.circleRadius, duration: 400, color: '#ffb14f' })
  if (SIM_BATTLE_PERFORMANCE.showFloatingDamage) spawnSimFloatingBurst(player, { text: `-${damage}`, yOffset: -8 })
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
  if (!bomb) return
  addSimCanvasEffect({ kind: 'bomb', x: bomb.position.x, y: bomb.position.y, radius: outerRadius ?? bomb.plugin?.blastRadius ?? 126, innerRadius: innerRadius ?? 54, duration, color: '#ffb14f' })
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

  bomb.plugin.removeAt = simArenaEngine.timing.timestamp + 140

  syncSimCombatStatus('폭탄이 터졌다! 근처 공들이 강하게 튕겨 나간다.')
  updateSimArenaOverlay()
  maybeFinishSimBattle()
}

function updateSimArenaHazards(now) {
  if (!simArenaMeta || !simBattleRunning) return

  simArenaMeta.bombs?.forEach((bomb) => {
    if (bomb.plugin.pendingExplosion && !bomb.plugin.exploded && now >= bomb.plugin.explosionAt) triggerSimBombExplosion(bomb)
    if (bomb.plugin.removeAt && now >= bomb.plugin.removeAt && !bomb.plugin.removed) {
      bomb.plugin.removed = true
      World.remove(simArenaWorld, bomb)
    }
  })
  simArenaMeta.rotors?.forEach((rotor) => {
    if (!rotor?.plugin?.center) return
    Body.setAngle(rotor, rotor.plugin.baseAngle + now * rotor.plugin.spinSpeed)
  })

  const shrink = simArenaMeta.shrink
  if (!shrink) return

  const elapsed = now - shrink.startAt
  if (elapsed < 0) return

  const progress = Math.min(1, elapsed / shrink.duration)
  const zoneWidth = shrink.fullWidth - (shrink.fullWidth - shrink.minWidth) * progress
  const zoneHeight = shrink.fullHeight - (shrink.fullHeight - shrink.minHeight) * progress
  const left = (shrink.fullWidth - zoneWidth) / 2
  const top = (shrink.fullHeight - zoneHeight) / 2

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
  label.title = player.label
  label.style.setProperty('--sim-player-color', player.color)
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

function captureSimPoses() {
  simArenaMeta?.renderBodies.forEach((body) => {
    const pose = body.plugin.simPreviousPose || (body.plugin.simPreviousPose = {})
    pose.x = body.position.x
    pose.y = body.position.y
    pose.angle = body.angle
  })
}

function getSimDrawPose(body, alpha = 1) {
  const previous = body.plugin.simPreviousPose
  const pose = body.plugin.simDrawPose || (body.plugin.simDrawPose = {})
  pose.x = previous ? previous.x + (body.position.x - previous.x) * alpha : body.position.x
  pose.y = previous ? previous.y + (body.position.y - previous.y) * alpha : body.position.y
  pose.angle = previous ? previous.angle + (body.angle - previous.angle) * alpha : body.angle
  return pose
}

function paintSimCanvasEffects(ctx) {
  simEffectPool.forEach((effect) => {
    if (!effect.active) return
    const progress = clampValue((simFrameClock.visualTime - effect.startedAt) / effect.duration, 0, 1)
    if (progress >= 1) { effect.active = false; return }
    ctx.globalAlpha = (1 - progress) * (effect.kind === 'bomb' ? 0.85 : 0.9)
    ctx.strokeStyle = effect.color
    ctx.fillStyle = effect.color
    if (effect.kind === 'damage') {
      ctx.font = '800 14px system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.lineWidth = 3
      ctx.strokeStyle = isDarkThemeEnabled() ? '#142c42' : '#ffffff'
      ctx.strokeText(effect.text, effect.x, effect.y - 14 - progress * 30)
      ctx.fillText(effect.text, effect.x, effect.y - 14 - progress * 30)
    } else {
      const radius = effect.kind === 'bomb' ? effect.radius * (0.15 + progress * 0.85) : effect.radius + 4 + progress * 20
      ctx.lineWidth = effect.kind === 'bomb' ? 5 * (1 - progress) + 1 : 2
      ctx.beginPath()
      ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2)
      ctx.stroke()
      if (effect.kind === 'bomb') {
        ctx.globalAlpha *= 0.2
        ctx.beginPath()
        ctx.arc(effect.x, effect.y, effect.innerRadius * (0.5 + progress), 0, Math.PI * 2)
        ctx.fill()
      }
    }
  })
  ctx.globalAlpha = 1
}

function renderSimCanvasOnce(timestamp = performance.now(), alpha = 1) {
  if (!simArenaRender || !simArenaMeta) return
  simRenderLastPaintAt = timestamp
  const ctx = simArenaRender.context
  const { width, height, pixelRatio = 1 } = simArenaRender.options
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  ctx.clearRect(0, 0, width, height)
  simArenaMeta.renderBodies.forEach((body) => {
    if (body.render.visible === false || body.plugin.removed) return
    const pose = getSimDrawPose(body, alpha)
    ctx.save()
    ctx.translate(pose.x, pose.y)
    ctx.rotate(pose.angle)
    ctx.globalAlpha = body.render.opacity ?? 1
    ctx.fillStyle = body.render.fillStyle
    const flash = body.plugin.isAlive && body.plugin.flashUntil > simFrameClock.visualTime
    ctx.strokeStyle = flash ? body.plugin.flashColor : body.render.strokeStyle
    ctx.lineWidth = flash ? body.plugin.flashWidth : body.render.lineWidth
    ctx.beginPath()
    if (body.circleRadius) {
      ctx.arc(0, 0, body.circleRadius, 0, Math.PI * 2)
    } else {
      const vertices = body.plugin.simLocalVertices
      vertices.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y))
      ctx.closePath()
    }
    ctx.fill()
    if (ctx.lineWidth > 0) ctx.stroke()
    ctx.restore()
  })
  const shrink = simArenaMeta.shrink
  const visualGameTime = Math.max(0, simArenaEngine.timing.timestamp - SIM_PHYSICS_STEP_MS * (1 - alpha))
  if (visualGameTime >= shrink.startAt) {
    const p = clampValue((visualGameTime - shrink.startAt) / shrink.duration, 0, 1)
    const w = shrink.fullWidth - (shrink.fullWidth - shrink.minWidth) * p
    const h = shrink.fullHeight - (shrink.fullHeight - shrink.minHeight) * p
    ctx.strokeStyle = simSuddenDeathStarted ? '#ff5e58' : '#f28d67'
    ctx.lineWidth = 2
    ctx.setLineDash([8, 6])
    ctx.strokeRect((width - w) / 2, (height - h) / 2, w, h)
    ctx.setLineDash([])
  }
  paintSimCanvasEffects(ctx)
  paintSimArenaOverlay(simMetricsDirty, alpha)
  syncSimLiveStatus()
}

function syncSimLiveStatus() {
  const alive = simRoundPlayers.reduce((count, player) => count + Number(player.isAlive), 0)
  const seconds = Math.floor((simArenaEngine?.timing.timestamp || 0) / 1000)
  const phase = simBattleFinished ? '경기 종료' : simBattlePaused ? '일시정지' : simSuddenDeathStarted ? '후반 체력 감소' : seconds >= 12 ? '안전 구역 축소 중' : '전투 중'
  const text = `${SIM_MAP_OPTIONS[simSelectedMap]?.name || '클래식'} · ${phase} · 생존 ${alive}/${simRoundPlayers.length} · ${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
  if (simLiveStatus && simLiveStatus.textContent !== text) simLiveStatus.textContent = text
  if (simPauseBtn) {
    if (simPauseBtn.disabled !== !simBattleRunning) simPauseBtn.disabled = !simBattleRunning
    const label = simBattlePaused ? '계속하기' : '일시정지'
    if (simPauseBtn.textContent !== label) simPauseBtn.textContent = label
    if (simPauseBtn._paused !== simBattlePaused) {
      simPauseBtn._paused = simBattlePaused
      simPauseBtn.setAttribute('aria-pressed', String(simBattlePaused))
    }
  }
  if (simArenaWrap && simArenaWrap._paused !== simBattlePaused) {
    simArenaWrap._paused = simBattlePaused
    simArenaWrap.classList.toggle('is-paused', simBattlePaused)
  }
}

function toggleSimPause() {
  if (!simBattleRunning || simBattleFinished) return
  releaseFastForward('game4')
  simBattlePaused = !simBattlePaused
  if (simBattlePaused) {
    if (simRenderRaf) cancelAnimationFrame(simRenderRaf)
    simRenderRaf = null
    renderSimCanvasOnce(performance.now(), simFrameClock.accumulator / SIM_PHYSICS_STEP_MS)
  } else {
    startSimRenderLoop()
  }
  syncSimLiveStatus()
}

function startSimRenderLoop() {
  if (simRenderRaf) return
  simFrameClock.lastAt = null
  const renderFrame = (timestamp) => {
    simRenderRaf = null
    if (!simArenaRender || !simArenaEngine || document.hidden || !screens.game4?.classList.contains('active')) return
    if (simBattlePaused) { syncSimLiveStatus(); return }
    const elapsed = simFrameClock.lastAt === null ? 0 : clampValue(timestamp - simFrameClock.lastAt, 0, 100)
    simFrameClock.lastAt = timestamp
    if (simBattleRunning && !simBattleFinished) {
      simFrameClock.visualTime += elapsed
      simFrameClock.accumulator = Math.min(simFrameClock.accumulator + elapsed * simPlaybackRate, SIM_PHYSICS_STEP_MS * SIM_MAX_STEPS_PER_FRAME)
      let steps = 0
      while (simFrameClock.accumulator + 0.00001 >= SIM_PHYSICS_STEP_MS && steps < SIM_MAX_STEPS_PER_FRAME && simBattleRunning) {
        captureSimPoses()
        Engine.update(simArenaEngine, SIM_PHYSICS_STEP_MS)
        simFrameClock.accumulator = Math.max(0, simFrameClock.accumulator - SIM_PHYSICS_STEP_MS)
        steps += 1
      }
    }
    const alpha = simBattleFinished ? 1 : clampValue(simFrameClock.accumulator / SIM_PHYSICS_STEP_MS, 0, 1)
    renderSimCanvasOnce(timestamp, alpha)
    if (simBattleRunning && !simBattleFinished && !simBattlePaused) simRenderRaf = requestAnimationFrame(renderFrame)
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
  applyAdaptiveEngineIterations(simArenaEngine)

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


  const walls = createSimWalls(width, height)
  const wallBodies = [walls.top, walls.bottom, walls.left, walls.right]
  const mapResult = createSimMapBodies(simSelectedMap, width, height)
  const shrinkZoneEl = null

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
  Matter.Events.on(simArenaEngine, 'collisionStart', handleSimCollisions)
  simArenaMeta.renderBodies = [...wallBodies, ...mapResult.bodies, ...simArenaBodies]
  simArenaMeta.renderBodies.forEach((body) => {
    if (!body.circleRadius) {
      const c = Math.cos(-body.angle), sn = Math.sin(-body.angle)
      body.plugin.simLocalVertices = body.vertices.map((v) => {
        const x = v.x - body.position.x, y = v.y - body.position.y
        return { x: x * c - y * sn, y: x * sn + y * c }
      })
    }
  })
  captureSimPoses()
  simArenaWrap.style.setProperty('--sim-arena-aspect', `${width} / ${height}`)
  simMetricsDirty = true
  if (typeof ResizeObserver === 'function') {
    simArenaResizeObserver = new ResizeObserver(() => {
      simMetricsDirty = true
      if (simBattlePaused || simBattleFinished) renderSimCanvasOnce()
    })
    simArenaResizeObserver.observe(simArenaWrap)
  }
  renderSimCanvasOnce()
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
    let angle = speed > 0.001 ? Math.atan2(body.velocity.y, body.velocity.x) : rand(0, Math.PI * 2)
    if (now >= body.plugin.nextTurnAt) {
      body.plugin.turnRemaining = rand(-0.55, 0.55)
      body.plugin.nextTurnAt = now + rand(420, 980)
    }
    const turn = (body.plugin.turnRemaining || 0) * 0.22
    angle += turn
    body.plugin.turnRemaining = (body.plugin.turnRemaining || 0) - turn
    const nextSpeed = clampValue(speed + (targetSpeed - speed) * 0.12, targetSpeed * 0.45, targetSpeed * 5)
    Body.setVelocity(body, { x: Math.cos(angle) * nextSpeed, y: Math.sin(angle) * nextSpeed })
  })

  if (!simBattleFinished) {
    maybeFinishSimBattle()
  } else if (!simFinalResultsShown) {
    queueSimFinalResultsPopup()
  }
}

function paintSimArenaOverlay(refreshMetrics = false, alpha = 1) {
  if (!simArenaRender || !simArenaWrap) return
  if (refreshMetrics && simArenaMeta) {
    simArenaMeta.displayWidth = simArenaWrap.clientWidth || simArenaRender.options.width
    simArenaMeta.displayHeight = simArenaWrap.clientHeight || simArenaRender.options.height
    simOverlayMap.forEach((label) => {
      label._width = label.offsetWidth || 96
      label._height = label.offsetHeight || 54
    })
    simMetricsDirty = false
  }
  const width = simArenaMeta?.displayWidth || simArenaRender.options.width
  const height = simArenaMeta?.displayHeight || simArenaRender.options.height
  const scaleX = width / simArenaRender.options.width
  const scaleY = height / simArenaRender.options.height
  simRoundPlayers.forEach((player) => {
    const body = simArenaBodyMap.get(player.id), label = simOverlayMap.get(player.id)
    if (!body || !label) return
    const parts = label._parts
    const hp = Math.max(0, Math.round(player.currentHp))
    const hpRatio = clampValue(hp / Math.max(1, player.maxHp), 0, 1)
    if (label._hp !== hp) {
      label._hp = hp
      parts.bar.style.transform = `scaleX(${hpRatio})`
      parts.text.textContent = player.isAlive ? `${hp}/${player.maxHp}` : '탈락'
      label.classList.toggle('is-critical', player.isAlive && hpRatio <= 0.25)
    }
    const place = player.finalPlace ? `${player.finalPlace}위` : ''
    if (parts.place.textContent !== place) parts.place.textContent = place
    if (label._isDead !== !player.isAlive) { label._isDead = !player.isAlive; label.classList.toggle('is-dead', !player.isAlive) }
    if (label._isWinner !== (player.finalPlace === 1)) { label._isWinner = player.finalPlace === 1; label.classList.toggle('is-winner', player.finalPlace === 1) }
    const pose = getSimDrawPose(body, alpha)
    const radius = (body.circleRadius || SIM_BASE_BALL_RADIUS) * Math.min(scaleX, scaleY)
    const halfWidth = (label._width || 96) / 2, halfHeight = (label._height || 54) / 2
    const x = clampValue(pose.x * scaleX, halfWidth + 3, width - halfWidth - 3)
    const y = clampValue(pose.y * scaleY - radius - halfHeight - 4, halfHeight + 3, height - halfHeight - 3)
    label.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
  })
}

function updateSimArenaOverlay(force = false) {
  if (force === true) simMetricsDirty = true
  // Moving labels are painted only with their matching canvas frame.
  if ((simBattlePaused || simBattleFinished || !simBattleRunning) && simArenaMeta) renderSimCanvasOnce()
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
  if (simCombatLiveText && simCombatLiveText.textContent !== message) simCombatLiveText.textContent = message
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
    if (bodyA.plugin?.simPlayerId) bodyA.plugin.turnRemaining = 0
    if (bodyB.plugin?.simPlayerId) bodyB.plugin.turnRemaining = 0
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
          bombBody.plugin.explosionAt = now + 120
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
  simBattlePaused = false
  simEffectPool.forEach((effect) => { effect.active = false })
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
  if (!simSetupDone || simBattleRunning || simBattlePending || !simRoundPlayers.length) return

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

  simBattlePending = true
  const selectionToken = ++simBattleToken
  const mapId = await selectSimArenaMap()
  if (selectionToken !== simBattleToken) return
  simBattlePending = false
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
  simBattlePaused = false
  startSimRenderLoop()
  playSfx('arenaStart')
  syncFastForwardRuntime('game4')
  setSimInputLock(true)
  setSimShuffleLock(true)
  updateSimPhase('전투 중')
  flushSimRankingRender(getSimRankingData())
  updateSimArenaOverlay()

  if (simStatusText) {
    syncSimCombatStatus('공이 부딪히면 공격 판정! 12초 후부터 안전 구역이 줄어들어.', { force: true })
  }
}
