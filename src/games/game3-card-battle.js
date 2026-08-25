/* generated from script.js · game3-card-battle.js */
function setBattleInputLock(isLocked) {
  if (!battleConfigInput) return
  battleConfigInput.disabled = isLocked
  battleConfigInput.style.opacity = isLocked ? '0.65' : '1'
  battleConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
}

function setBattleShuffleLock(isLocked) {
  if (!shuffleBattleBtn) return
  shuffleBattleBtn.disabled = isLocked
  shuffleBattleBtn.style.opacity = isLocked ? '0.55' : '1'
  shuffleBattleBtn.style.cursor = isLocked ? 'not-allowed' : ''
}

function updateBattleDescription() {
  if (!battleDesc) return
  battleDesc.textContent = `총 ${battlePlayers.length || 0}명이 카드 5장으로 중간 계산과 최종 점수 순위를 겨루는 게임이다.`
}

function formatBattleValue(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '-'
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

function roundBattleValue(value) {
  return Math.round(value * 10) / 10
}

function randomBattleOperator() {
  return BATTLE_OPERATORS[Math.floor(Math.random() * BATTLE_OPERATORS.length)]
}

function operateBattle(left, operator, right) {
  switch (operator) {
    case '+':
      return left + right
    case '-':
      return left - right
    case '×':
      return left * right
    case '÷':
      return right === 0 ? left : left / right
    default:
      return left
  }
}

function getRandomBattleNumber({ allowZero = true } = {}) {
  const min = allowZero ? 0 : 1
  return Math.floor(rand(min, 101))
}

function parseBattleConfigToPlayers(text) {
  const rawItems = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!rawItems.length) {
    return { status: 'EMPTY' }
  }

  if (rawItems.length > BATTLE_MAX_PLAYERS) {
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
      id: `battle-player-${players.length + 1}`,
      label: normalized,
      color: getSimColorForIndex(players.length)
    })
  }

  return { status: 'OK', players }
}

function handleBattleParseFailure(parsed, { showPopupOnInvalid = false } = {}) {
  if (!battleStatusText) return false

  if (parsed.status === 'EMPTY') {
    battleStatusText.textContent = '참가자를 먼저 입력해줘. 예: 홍길동, 김아무개, 박철수'
    return false
  }

  if (parsed.status === 'TOO_MANY') {
    battleStatusText.textContent = `참가자는 최대 ${BATTLE_MAX_PLAYERS}명까지 가능하다.`
    if (showPopupOnInvalid) {
      showPopup('참가자 수 초과', `카드 연산 배틀은 최대 ${BATTLE_MAX_PLAYERS}명까지만 참가할 수 있어.`)
    }
    return false
  }

  if (parsed.status === 'DUPLICATE') {
    battleStatusText.textContent = '같은 이름은 2번 이상 입력할 수 없다.'
    if (showPopupOnInvalid) {
      showPopup('중복 이름 불가', '카드 연산 배틀은 같은 이름을 중복 등록할 수 없어.')
    }
    return false
  }

  battleStatusText.textContent = '입력 형식을 확인해줘. 참가자*n 형식은 사용할 수 없다. 예: 홍길동, 김아무개, 박철수'
  if (showPopupOnInvalid) {
    showPopup('입력 확인', '참가자 이름만 쉼표로 구분해 적어줘. 참가자*n 형식은 사용할 수 없어.')
  }
  return false
}

function setBattlePlayers(players) {
  battlePlayers = players
  if (battleConfigInput) {
    lastBattleValidConfigText = battleConfigInput.value
    lastBattleAppliedRawText = battleConfigInput.value
  }
  updateBattleDescription()
}

function renderBattleLegend() {
  if (!battleLegend || !battleTotalInfo) return

  battleLegend.innerHTML = ''

  battlePlayers.forEach((player) => {
    const chip = document.createElement('div')
    chip.className = 'legend-chip'
    chip.innerHTML = `
      <span class="legend-dot" style="background:${player.color}"></span>
      <span>${escapeHtml(player.label)}</span>
    `
    battleLegend.appendChild(chip)
  })

  battleTotalInfo.textContent = `총 ${battlePlayers.length}명`
}

function createBattleGhostSlots(count) {
  return Array.from({ length: count }, () => '<div class="battle-slot is-ghost"></div>').join('')
}

function renderBattleRowsPreview() {
  if (!battleTable) return

  battleTable.innerHTML = ''

  battlePlayers.forEach((player) => {
    const row = document.createElement('div')
    row.className = 'battle-row'
    row.dataset.playerId = player.id
    row.innerHTML = `
      <div class="battle-row-main">
        <div class="battle-player-head">
          <span class="legend-dot" style="background:${player.color}"></span>
          <span class="battle-player-name">${escapeHtml(player.label)}</span>
          <span class="battle-result-pill hidden" aria-hidden="true"></span>
        </div>
        <div class="battle-player-sub">카드를 기다리는 중</div>
      </div>
      <div class="battle-hand hand-five">
        ${createBattleGhostSlots(5)}
      </div>
    `
    battleTable.appendChild(row)
  })
}

function renderBattleRanking(ranking = []) {
  if (!battleRankingList) return

  if (!ranking.length) {
    battleRankingList.innerHTML = '<div class="battle-ranking-empty">참가자를 입력한 뒤 시작 버튼을 누르면<br>최종 순위가 여기에 표시된다.</div>'
    return
  }

  battleRankingList.innerHTML = ''

  ranking.forEach((player, index) => {
    const item = document.createElement('div')
    item.className = `battle-ranking-item${index === 0 ? ' top' : ''}`
    item.innerHTML = `
      <div class="battle-rank-num">${index + 1}</div>
      <div class="battle-rank-main">
        <div class="battle-rank-name">${escapeHtml(player.label)}</div>
        <div class="battle-rank-formula">${escapeHtml(getBattleFinalFormulaText(player))}</div>
      </div>
      <div class="battle-rank-score">${formatBattleValue(player.final)}점</div>
    `
    battleRankingList.appendChild(item)
  })
}

function renderBattlePreview() {
  renderBattleLegend()
  renderBattleRowsPreview()
  renderBattleRanking([])
}

function updateBattleFromInput({ render = true } = {}) {
  if (!battleConfigInput) return false

  const parsed = parseBattleConfigToPlayers(battleConfigInput.value)

  if (parsed.status !== 'OK') {
    return handleBattleParseFailure(parsed)
  }

  setBattlePlayers(parsed.players)

  if (render) {
    renderBattlePreview()
    if (battleStatusText) {
      battleStatusText.textContent = `실시간 반영 완료: 총 ${battlePlayers.length}명`
    }
  }

  return true
}

function ensureBattleReady() {
  if (!battleConfigInput) return

  if (!battlePlayers.length) {
    const parsed = parseBattleConfigToPlayers(battleConfigInput.value)

    if (parsed.status === 'OK') {
      setBattlePlayers(parsed.players)
    } else {
      battleConfigInput.value = '홍길동, 김아무개, 박철수'
      const fallbackParsed = parseBattleConfigToPlayers(battleConfigInput.value)
      if (fallbackParsed.status === 'OK') {
        setBattlePlayers(fallbackParsed.players)
      }
    }
  }

  renderBattlePreview()

  if (battleStatusText && !battleGameRunning) {
    battleStatusText.textContent = '참가 준비 완료. 시작 버튼을 누르면 카드가 섞이고, 각 참가자가 직접 카드를 뒤집는다.'
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isBattleFlowActive(token) {
  return battleFlowToken === token && screens.game3?.classList.contains('active')
}

function stopBattleFlow() {
  battleFlowToken += 1
  battleCurrentToken = 0
  battlePhase = 'idle'
  battleRoundPlayers = []
  battleInteractionLocked = false
  battleGameRunning = false
  battleDeck?.classList.remove('is-shuffling')
  setBattleInputLock(false)
  setBattleShuffleLock(false)
}

function getBattlePhase1FormulaText(player) {
  return `${player.cards[0].text} ${player.cards[1].text} ${player.cards[2].text} = ${formatBattleValue(player.interim)}`
}

function getBattleFinalFormulaText(player) {
  return `${formatBattleValue(player.interim)} ${player.cards[3].text} ${player.cards[4].text} = ${formatBattleValue(player.final)}`
}

function buildBattleRoundPlayers() {
  return battlePlayers.map((player) => {
    const number1 = getRandomBattleNumber()
    const operator1 = randomBattleOperator()
    const number2 = getRandomBattleNumber({ allowZero: operator1 !== '÷' })
    const operator2 = randomBattleOperator()
    const number3 = getRandomBattleNumber({ allowZero: operator2 !== '÷' })

    const interim = roundBattleValue(operateBattle(number1, operator1, number2))
    const final = roundBattleValue(operateBattle(interim, operator2, number3))

    return {
      ...player,
      cards: [
        { type: 'number', value: number1, text: String(number1) },
        { type: 'operator', value: operator1, text: operator1 },
        { type: 'number', value: number2, text: String(number2) },
        { type: 'operator', value: operator2, text: operator2 },
        { type: 'number', value: number3, text: String(number3) }
      ],
      interim,
      final,
      nextRevealIndex: 3,
      phase1Revealed: [false, false, false],
      phase2Revealed: [false, false],
      phase1Done: false,
      finalDone: false
    }
  })
}

function createBattleCardElement(card, { flipped = false, actualIndex = null } = {}) {
  const cardEl = document.createElement('div')
  cardEl.className = `battle-card type-${card.type}${flipped ? ' is-flipped' : ''}`
  cardEl.style.setProperty('--deal-rotate', `${Math.round(rand(-18, 18))}deg`)
  if (actualIndex !== null) {
    cardEl.dataset.cardIndex = String(actualIndex)
  }
  cardEl.setAttribute('role', 'button')
  cardEl.setAttribute('tabindex', '-1')
  cardEl.setAttribute('aria-disabled', 'true')
  cardEl.innerHTML = `
    <div class="battle-card-inner">
      <div class="battle-card-face battle-card-back"></div>
      <div class="battle-card-face battle-card-front">
        <div class="battle-card-value">${card.type === 'result' ? `<small>${escapeHtml(card.label || '중간 결과')}</small>${escapeHtml(card.text)}` : escapeHtml(card.text)}</div>
      </div>
    </div>
  `
  return cardEl
}

function getBattleRowElement(playerId) {
  return battleTable?.querySelector(`[data-player-id="${playerId}"]`) || null
}

function getBattleRoundPlayer(playerId) {
  return battleRoundPlayers.find((player) => player.id === playerId) || null
}

function createBattleSlots(count) {
  return Array.from({ length: count }, () => {
    const slot = document.createElement('div')
    slot.className = 'battle-slot'
    return slot
  })
}

function prepareBattleRoundRows(roundPlayers) {
  if (!battleTable) return

  battleTable.innerHTML = ''

  roundPlayers.forEach((player) => {
    const row = document.createElement('div')
    row.className = 'battle-row'
    row.dataset.playerId = player.id

    const slotsMarkup = Array.from({ length: 5 }, () => '<div class="battle-slot"></div>').join('')

    row.innerHTML = `
      <div class="battle-row-main">
        <div class="battle-player-head">
          <span class="legend-dot" style="background:${player.color}"></span>
          <span class="battle-player-name">${escapeHtml(player.label)}</span>
          <span class="battle-result-pill hidden" aria-hidden="true"></span>
        </div>
      </div>
      <div class="battle-hand hand-five">${slotsMarkup}</div>
    `
    battleTable.appendChild(row)
  })
}

async function playBattleShuffleAnimation(token) {
  if (!battleDeck) return
  battleDeck.classList.add('is-shuffling')
  playSfx('battleShuffle')
  if (battleStatusText) {
    battleStatusText.textContent = '카드를 섞는 중...'
  }
  await sleep(1650)
  if (!isBattleFlowActive(token)) return
  battleDeck.classList.remove('is-shuffling')
}

async function dealBattleCards(roundPlayers, token) {
  for (const player of roundPlayers) {
    const row = getBattleRowElement(player.id)
    if (!row) continue


    const slots = row.querySelectorAll('.battle-slot')

    for (let index = 0; index < player.cards.length; index += 1) {
      if (!isBattleFlowActive(token)) return

      const slot = slots[index]
      if (!slot) continue

      const cardEl = createBattleCardElement(player.cards[index], { actualIndex: index })
      slot.appendChild(cardEl)
      requestAnimationFrame(() => {
        cardEl.classList.add('is-dealt')
      })
      playThrottledSfx('card', 70)
      await sleep(95)
    }

  }

  await sleep(320)
}

function updateBattlePlayerSubText(player) {
  const row = getBattleRowElement(player.id)
  const subText = row?.querySelector('.battle-player-sub')
  if (!subText) return

  if (player.finalDone) {
    subText.textContent = getBattleFinalFormulaText(player)
    return
  }

  if (!player.phase1Done) {
    const remaining = [1, 2, 3].filter((number, index) => !player.phase1Revealed[index])
    subText.textContent = remaining.length
      ? `${remaining.join(', ')}번째 카드 중 원하는 카드를 선택해 공개`
      : '1차 수식 확인 중'
    return
  }

  const allPhase1Done = battleRoundPlayers.length > 0 && battleRoundPlayers.every((item) => item.phase1Done)
  if (!allPhase1Done) {
    subText.textContent = `1차 결과 ${formatBattleValue(player.interim)} 공개 완료 · 다른 참가자 대기 중`
    return
  }

  const remainingPhase2 = []
  if (!player.phase2Revealed?.[0]) remainingPhase2.push('4번째')
  if (!player.phase2Revealed?.[1]) remainingPhase2.push('5번째')

  if (remainingPhase2.length === 2) {
    subText.textContent = '4번째 또는 5번째 카드를 원하는 순서로 공개'
    return
  }

  if (remainingPhase2.length === 1) {
    subText.textContent = `${remainingPhase2[0]} 카드를 선택해 공개`
    return
  }

  subText.textContent = '최종 수식 확인 중'
}

function updateAllBattlePlayerSubTexts() {
  battleRoundPlayers.forEach((player) => {
    updateBattlePlayerSubText(player)
  })
}

function setBattleCardAvailability(cardEl, isEnabled, options = {}) {
  if (!cardEl) return

  const { showLocked = false } = options

  cardEl.classList.toggle('is-clickable', isEnabled)
  cardEl.classList.toggle('is-soft-disabled', !isEnabled && !showLocked)
  cardEl.classList.toggle('is-locked', !isEnabled && showLocked)
  cardEl.setAttribute('tabindex', isEnabled ? '0' : '-1')
  cardEl.setAttribute('aria-disabled', isEnabled ? 'false' : 'true')
}

function getBattleCardAvailabilityState(player, cardIndex, cardEl) {
  const isFlipped = Boolean(cardEl?.classList.contains('is-flipped'))

  if (!Number.isFinite(cardIndex) || isFlipped) {
    return { isEnabled: false, showLocked: false }
  }

  if (!battleGameRunning || !player || player.finalDone) {
    return { isEnabled: false, showLocked: false }
  }

  if (battlePhase === 'phase1') {
    if (cardIndex >= 0 && cardIndex <= 2) {
      return {
        isEnabled: !battleInteractionLocked && !player.phase1Revealed[cardIndex],
        showLocked: false
      }
    }

    if (cardIndex === 3 || cardIndex === 4) {
      return { isEnabled: false, showLocked: true }
    }

    return { isEnabled: false, showLocked: false }
  }

  if (battlePhase === 'phase2') {
    const allPhase1Done = battleRoundPlayers.every((item) => item.phase1Done)

    if (!allPhase1Done && (cardIndex === 3 || cardIndex === 4)) {
      return { isEnabled: false, showLocked: true }
    }

    if (cardIndex === 3) {
      return {
        isEnabled: !battleInteractionLocked && !player.phase2Revealed?.[0],
        showLocked: false
      }
    }

    if (cardIndex === 4) {
      return {
        isEnabled: !battleInteractionLocked && !player.phase2Revealed?.[1],
        showLocked: false
      }
    }

    return { isEnabled: false, showLocked: false }
  }

  return { isEnabled: false, showLocked: false }
}

function canFlipBattleCard(player, cardIndex) {
  if (!battleGameRunning || battleInteractionLocked) return false
  if (!player || player.finalDone) return false

  if (battlePhase === 'phase1') {
    return cardIndex >= 0 && cardIndex <= 2 && !player.phase1Revealed[cardIndex]
  }

  if (battlePhase === 'phase2') {
    if (!battleRoundPlayers.every((item) => item.phase1Done)) return false
    if (cardIndex === 3) {
      return !player.phase2Revealed?.[0]
    }
    if (cardIndex === 4) {
      return !player.phase2Revealed?.[1]
    }
    return false
  }

  return false
}

function refreshBattleCardAvailability() {
  battleRoundPlayers.forEach((player) => {
    const row = getBattleRowElement(player.id)
    if (!row) return

    row.querySelectorAll('.battle-card').forEach((cardEl) => {
      const cardIndex = Number(cardEl.dataset.cardIndex)
      const state = getBattleCardAvailabilityState(player, cardIndex, cardEl)

      setBattleCardAvailability(cardEl, state.isEnabled, { showLocked: state.showLocked })
    })
  })
}

async function condenseBattlePlayerRow(player, token) {
  const row = getBattleRowElement(player.id)
  if (!row) return

  row.classList.add('is-condensing')
  row.querySelectorAll('.battle-card').forEach((card, index) => {
    const actualIndex = Number(card.dataset.cardIndex)
    if (index < 3 || actualIndex <= 2) {
      card.classList.add('is-retiring')
    }
  })

  await sleep(340)
  if (!isBattleFlowActive(token)) return

  const hand = row.querySelector('.battle-hand')
  if (!hand) return

  hand.className = 'battle-hand hand-three'
  hand.innerHTML = ''

  const slots = createBattleSlots(3)
  slots.forEach((slot) => hand.appendChild(slot))

  const resultCard = createBattleCardElement(
    { type: 'result', value: player.interim, text: formatBattleValue(player.interim), label: '1차 결과' },
    { flipped: true }
  )
  slots[0].appendChild(resultCard)
  requestAnimationFrame(() => {
    resultCard.classList.add('is-dealt')
  })

  const opCard = createBattleCardElement(player.cards[3], { actualIndex: 3 })
  const numCard = createBattleCardElement(player.cards[4], { actualIndex: 4 })
  slots[1].appendChild(opCard)
  slots[2].appendChild(numCard)

  requestAnimationFrame(() => {
    opCard.classList.add('is-dealt')
    numCard.classList.add('is-dealt')
  })

  row.classList.remove('is-condensing')
  updateBattlePlayerSubText(player)
}

function createBattleFinalSummary(player) {
  const summary = document.createElement('div')
  summary.className = 'battle-final-summary'

  const rankBadge = document.createElement('div')
  rankBadge.className = 'battle-final-rank'
  rankBadge.innerHTML = `<strong>${player.finalRank}위</strong>`

  const finalBox = document.createElement('div')
  finalBox.className = 'battle-final-result-box'
  finalBox.innerHTML = `
    <small>최종 결과</small>
    <strong>${formatBattleValue(player.final)}점</strong>
  `

  summary.appendChild(rankBadge)
  summary.appendChild(finalBox)

  return summary
}

function applyBattleFinalRow(player) {
  const row = getBattleRowElement(player.id)
  if (!row) return

  row.classList.add('is-finalized')

  const resultPill = row.querySelector('.battle-result-pill')
  if (resultPill) {
    resultPill.classList.add('hidden')
    resultPill.setAttribute('aria-hidden', 'true')
  }

  const subText = row.querySelector('.battle-player-sub')
  if (subText) {
    subText.textContent = ''
  }

  const hand = row.querySelector('.battle-hand')
  if (!hand) return

  hand.className = 'battle-hand battle-hand-final'
  hand.innerHTML = ''
  hand.appendChild(createBattleFinalSummary(player))
}

function getBattleRanking(roundPlayers) {
  return [...roundPlayers].sort((a, b) => {
    if (b.final !== a.final) return b.final - a.final
    return a.label.localeCompare(b.label, 'ko')
  })
}

function buildBattleFinalPopupHtml(ranking) {
  if (!ranking.length) {
    return '<div class="battle-final-popup-empty">결과가 없습니다.</div>'
  }

  return `
    <div class="battle-final-popup-list">
      ${ranking.map((player, index) => {
        return `
          <div class="battle-final-popup-item">
            <div class="battle-final-popup-rank-badge">${index + 1}위</div>
            <div class="battle-final-popup-name">${escapeHtml(player.label)}</div>
            <div class="battle-final-popup-formula">1차: ${escapeHtml(getBattlePhase1FormulaText(player))}</div>
            <div class="battle-final-popup-formula">최종: ${escapeHtml(getBattleFinalFormulaText(player))}</div>
          </div>
        `
      }).join('')}
    </div>
  `
}

function reorderBattleRowsByRanking(ranking) {
  if (!battleTable || !Array.isArray(ranking) || !ranking.length) return

  ranking.forEach((player) => {
    const row = getBattleRowElement(player.id)
    if (!row) return
    battleTable.appendChild(row)
  })
}

function applyBattleFinalCardsToRows(roundPlayers) {
  roundPlayers.forEach((player, index) => {
    player.finalRank = index + 1
    applyBattleFinalRow(player)
  })

  reorderBattleRowsByRanking(roundPlayers)
}

async function finalizeBattleIfReady(token) {
  const remaining = battleRoundPlayers.filter((player) => !player.finalDone).length
  if (remaining > 0) {
    if (battleStatusText) {
      battleStatusText.textContent = `아직 ${remaining}명의 최종 카드 공개가 남아 있다.`
    }
    return
  }

  const ranking = getBattleRanking(battleRoundPlayers)
  playSfx('battleFinal')
  renderBattleRanking(ranking)

  if (battleStatusText) {
    battleStatusText.textContent = '모든 참가자의 최종 결과가 공개되었다. 팝업을 닫으면 각 참가자 옆에 최종 결과 카드가 표시된다.'
  }

  await showPopupAndWait(
    '최종결과 확인',
    buildBattleFinalPopupHtml(ranking) || '<span>결과가 없습니다.</span>',
    { icon: '🏆', allowHtml: true, popupClass: 'battle-final-popup' }
  )

  if (!isBattleFlowActive(token)) return

  applyBattleFinalCardsToRows(ranking)

  battleGameRunning = false
  battlePhase = 'done'
  battleInteractionLocked = false
  setBattleInputLock(false)
  setBattleShuffleLock(false)
  refreshBattleCardAvailability()
}

async function handleBattleCardReveal(player, cardIndex) {
  if (!battleGameRunning) return

  const token = battleCurrentToken
  if (!isBattleFlowActive(token)) return

  const row = getBattleRowElement(player.id)
  const targetCard = row?.querySelector(`.battle-card[data-card-index="${cardIndex}"]`)
  if (!targetCard || targetCard.classList.contains('is-flipped') || !canFlipBattleCard(player, cardIndex)) {
    return
  }

  battleInteractionLocked = true
  refreshBattleCardAvailability()

  targetCard.classList.add('is-flipped')
  playSfx('card')
  await sleep(260)
  if (!isBattleFlowActive(token)) return

  if (battlePhase === 'phase1') {
    player.phase1Revealed[cardIndex] = true

    const revealedCount = player.phase1Revealed.filter(Boolean).length
    if (revealedCount < 3) {
      updateBattlePlayerSubText(player)
      if (battleStatusText) {
        battleStatusText.textContent = `${player.label}의 ${cardIndex + 1}번째 카드가 공개되었다. 첫 3장 중 남은 카드를 이어서 선택해줘.`
      }
      battleInteractionLocked = false
      refreshBattleCardAvailability()
      return
    }

    player.phase1Done = true
    playSfx('battleFormula')

    await showPopupAndWait(
      `${player.label}의 1차 수식 완성`,
      `${getBattlePhase1FormulaText(player)}`,
      { icon: '🧮' }
    )
    if (!isBattleFlowActive(token)) return

    await condenseBattlePlayerRow(player, token)
    if (!isBattleFlowActive(token)) return

    const pendingPhase1 = battleRoundPlayers.filter((item) => !item.phase1Done).length
    if (pendingPhase1 === 0) {
      battlePhase = 'phase2'
      if (battleStatusText) {
        battleStatusText.textContent = '모든 참가자의 1차 결과 카드가 공개되었다. 이제 4번째와 5번째 카드를 원하는 순서로 열 수 있다.'
      }
    } else if (battleStatusText) {
      battleStatusText.textContent = `아직 ${pendingPhase1}명의 1차 결과 카드가 남아 있다.`
    }

    updateAllBattlePlayerSubTexts()
    battleInteractionLocked = false
    refreshBattleCardAvailability()
    return
  }

  if (battlePhase === 'phase2') {
    const phase2Index = cardIndex === 3 ? 0 : cardIndex === 4 ? 1 : -1
    if (phase2Index === -1) {
      battleInteractionLocked = false
      refreshBattleCardAvailability()
      return
    }

    player.phase2Revealed[phase2Index] = true
    const remainingPhase2 = [3, 4].filter((index) => {
      const mappedIndex = index === 3 ? 0 : 1
      return !player.phase2Revealed[mappedIndex]
    })

    if (remainingPhase2.length > 0) {
      updateBattlePlayerSubText(player)
      if (battleStatusText) {
        battleStatusText.textContent = `${player.label}의 ${cardIndex + 1}번째 카드가 공개되었다. 남은 ${remainingPhase2[0] + 1}번째 카드도 원하는 때에 공개해줘.`
      }
      battleInteractionLocked = false
      refreshBattleCardAvailability()
      return
    }

    player.finalDone = true
    await finalizeBattleIfReady(token)
    if (!isBattleFlowActive(token) || battlePhase === 'done') return

    battleInteractionLocked = false
    refreshBattleCardAvailability()
  }
}

async function startBattleGame() {
  if (!battleConfigInput || battleGameRunning) return

  const parsed = parseBattleConfigToPlayers(battleConfigInput.value)
  if (parsed.status !== 'OK') {
    handleBattleParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  if (parsed.players.length < 2) {
    showMinParticipantsPopup(BATTLE_MAX_PLAYERS)
    return
  }

  stopBattleFlow()
  battleFlowToken += 1
  const token = battleFlowToken
  battleCurrentToken = token

  setBattlePlayers(parsed.players)
  battleGameRunning = true
  battlePhase = 'dealing'
  battleInteractionLocked = true
  setBattleInputLock(true)
  setBattleShuffleLock(true)
  renderBattleLegend()
  renderBattleRanking([])

  battleRoundPlayers = buildBattleRoundPlayers()
  prepareBattleRoundRows(battleRoundPlayers)

  await playBattleShuffleAnimation(token)
  if (!isBattleFlowActive(token)) return

  await dealBattleCards(battleRoundPlayers, token)
  if (!isBattleFlowActive(token)) return

  battlePhase = 'phase1'
  battleInteractionLocked = false
  updateAllBattlePlayerSubTexts()
  refreshBattleCardAvailability()

  if (battleStatusText) {
    battleStatusText.textContent = '각 참가자의 첫 3장 카드는 원하는 순서로 공개할 수 있다. 세 장이 모두 열리면 1차 결과가 확정된다.'
  }
}

function shuffleBattle() {
  if (!battleConfigInput || battleGameRunning) return

  const parsed = parseBattleConfigToPlayers(battleConfigInput.value)
  if (parsed.status !== 'OK') {
    handleBattleParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  const shuffledPlayers = shuffleArray(parsed.players.map((player) => player.label))
  battleConfigInput.value = shuffledPlayers.join(', ')
  updateBattleFromInput()

  if (battleStatusText) {
    battleStatusText.textContent = '참가자 순서를 랜덤으로 섞었다.'
  }
}

function resetBattle() {
  stopBattleFlow()
  closePopup()

  if (!battleConfigInput) return

  const parsed = parseBattleConfigToPlayers(battleConfigInput.value)
  if (parsed.status === 'OK') {
    setBattlePlayers(parsed.players)
  } else {
    battleConfigInput.value = lastBattleValidConfigText || '홍길동, 김아무개, 박철수'
    const fallbackParsed = parseBattleConfigToPlayers(battleConfigInput.value)
    if (fallbackParsed.status === 'OK') {
      setBattlePlayers(fallbackParsed.players)
    }
  }

  renderBattlePreview()

  if (battleStatusText) {
    battleStatusText.textContent = '카드 게임이 초기화되었다. 다시 시작하면 참가자가 직접 카드를 뒤집을 수 있다.'
  }
}



function setSimInputLock(isLocked) {
  if (!simConfigInput) return
  simConfigInput.disabled = isLocked
  simConfigInput.style.opacity = isLocked ? '0.65' : '1'
  simConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
}

function setSimShuffleLock(isLocked) {
  if (!shuffleSimBtn) return
  shuffleSimBtn.disabled = isLocked
  shuffleSimBtn.style.opacity = isLocked ? '0.55' : '1'
  shuffleSimBtn.style.cursor = isLocked ? 'not-allowed' : ''
}

function setSimBattleStartState(isEnabled) {
  if (!startSimBattleBtn) return
  startSimBattleBtn.disabled = !isEnabled
}

function updateSimPhase(text) {
  if (simPhaseBadge) {
    simPhaseBadge.textContent = text
  }
}

function updateSimDescription() {
  if (!simDesc) return
  simDesc.textContent = `최대 ${SIM_MAX_PLAYERS}명의 참가자가 각자 4가지 스탯 총합 100의 카드를 배정받은 뒤, 공끼리 충돌하는 순간 즉시 전투 판정이 반영되는 관찰형 시뮬레이션 게임이다.`
}

function getSimInfoTabButtonsHtml() {
  return `
    <div class="game-info-tabbar" role="tablist" aria-label="볼 배틀 설명 보기 방식">
      <button class="game-info-tab-btn is-active" type="button" role="tab" aria-selected="true" data-info-tab="visual">👀 시각 설명</button>
      <button class="game-info-tab-btn" type="button" role="tab" aria-selected="false" data-info-tab="text">📝 글 설명</button>
    </div>
  `
}

function getSimGameInfoVisualHtml() {
  return `
    <div class="sim-info-visual-wrap">
      <section class="sim-info-hero-note">
        <div class="sim-info-hero-badge">처음 보는 사람도 바로 이해하는 핵심 흐름</div>
        <p><strong>카드 공개 → 충돌 판정 → 체력 감소 → 최후의 1인 우승</strong> 순서만 먼저 짧게 보여준다.</p>
      </section>

      <div class="sim-info-visual-grid">
        <section class="sim-info-visual-card sim-info-visual-card-step1">
          <div class="sim-info-card-head">
            <span class="sim-info-step">1</span>
            <div>
              <h4>시작하면 스탯 카드 4장이 공개된다</h4>
              <p>참가자마다 추가 체력, 공격력, 공격 성공률, 방어력이 랜덤으로 배정된다.</p>
            </div>
          </div>
          <div class="sim-info-scene sim-info-scene-cards" aria-hidden="true">
            <div class="sim-info-player-chip is-pink">홍길동</div>
            <div class="sim-info-card-deck-mini">
              <div class="sim-info-stat-card-mini is-health">
                <span class="sim-info-stat-card-icon">${SIM_STAT_META.health.icon}</span>
                <strong>${SIM_STAT_META.health.short}</strong>
                <span>+43</span>
              </div>
              <div class="sim-info-stat-card-mini is-attack delay-1">
                <span class="sim-info-stat-card-icon">${SIM_STAT_META.attack.icon}</span>
                <strong>${SIM_STAT_META.attack.short}</strong>
                <span>18</span>
              </div>
              <div class="sim-info-stat-card-mini is-accuracy delay-2">
                <span class="sim-info-stat-card-icon">${SIM_STAT_META.accuracy.icon}</span>
                <strong>${SIM_STAT_META.accuracy.short}</strong>
                <span>79%</span>
              </div>
              <div class="sim-info-stat-card-mini is-defense delay-3">
                <span class="sim-info-stat-card-icon">${SIM_STAT_META.defense.icon}</span>
                <strong>${SIM_STAT_META.defense.short}</strong>
                <span>50%</span>
              </div>
            </div>
            <div class="sim-info-ready-pill">전투시작 가능</div>
          </div>
        </section>

        <section class="sim-info-visual-card">
          <div class="sim-info-card-head">
            <span class="sim-info-step">2</span>
            <div>
              <h4>공끼리 부딪히면 바로 전투 판정</h4>
              <p>맞으면 체력이 줄고, 체력바와 숫자가 즉시 바뀐다.</p>
            </div>
          </div>
          <div class="sim-info-scene sim-info-scene-duel" aria-hidden="true">
            <div class="sim-info-arena-shell">
              <div class="sim-info-arena-grid"></div>
              <div class="sim-info-demo-ball is-pink duel-left"></div>
              <div class="sim-info-demo-ball is-mint duel-right"></div>
              <div class="sim-info-hit-spark"></div>
              <div class="sim-info-hit-badge">충돌!</div>
              <div class="sim-info-health-label duel-label-left">
                <strong>홍길동</strong>
                <span class="sim-info-health-values">93/93</span>
                <i class="sim-info-health-track"><b class="sim-info-health-fill is-full"></b></i>
              </div>
              <div class="sim-info-health-label duel-label-right">
                <strong>김아무개</strong>
                <span class="sim-info-health-values"><em class="hp-before">76/76</em><em class="hp-after">61/76</em></span>
                <i class="sim-info-health-track"><b class="sim-info-health-fill is-drop"></b></i>
              </div>
            </div>
          </div>
        </section>

        <section class="sim-info-visual-card is-wide">
          <div class="sim-info-card-head">
            <span class="sim-info-step">3</span>
            <div>
              <h4>스탯 4개 의미를 한 번에 이해하기</h4>
              <p>특히 <strong>방어력은 피해량 감소가 아니라 상대 공격 성공률 자체를 낮추는 스탯</strong>이다.</p>
            </div>
          </div>
          <div class="sim-info-scene sim-info-scene-stats" aria-hidden="true">
            <div class="sim-info-stat-meaning-grid">
              <article class="sim-info-stat-meaning-card is-health">
                <header><span>${SIM_STAT_META.health.icon}</span><strong>${SIM_STAT_META.health.label}</strong></header>
                <div class="sim-info-mini-note">기본 체력 50에 더해져 오래 버틴다</div>
                <div class="sim-info-big-hp-track"><b class="sim-info-big-hp-base"></b><b class="sim-info-big-hp-bonus"></b></div>
                <div class="sim-info-mini-formula">50 → 93</div>
              </article>
              <article class="sim-info-stat-meaning-card is-attack">
                <header><span>${SIM_STAT_META.attack.icon}</span><strong>${SIM_STAT_META.attack.label}</strong></header>
                <div class="sim-info-mini-note">공격이 맞았을 때 더 크게 깎는다</div>
                <div class="sim-info-attack-demo"><span class="sim-info-attack-hit">-18</span></div>
                <div class="sim-info-mini-formula">명중 시 피해량 강화</div>
              </article>
              <article class="sim-info-stat-meaning-card is-accuracy">
                <header><span>${SIM_STAT_META.accuracy.icon}</span><strong>${SIM_STAT_META.accuracy.label}</strong></header>
                <div class="sim-info-mini-note">공격이 실제로 들어갈 확률이다</div>
                <div class="sim-info-accuracy-demo"><span class="is-hit">명중!</span><span class="is-miss">빗나감</span></div>
                <div class="sim-info-mini-formula">수치가 높을수록 더 잘 맞음</div>
              </article>
              <article class="sim-info-stat-meaning-card is-defense">
                <header><span>${SIM_STAT_META.defense.icon}</span><strong>${SIM_STAT_META.defense.label}</strong></header>
                <div class="sim-info-mini-note">예: A공의 공격 성공률이 50%, B공의 방어력이 50%라면</div>
                <div class="sim-info-defense-formula">A공 최종 공격 성공률 = 25%</div>
                <div class="sim-info-mini-formula">50% × (1 - 0.50) = 25% · 피해량 감소가 아니라 상대 명중률 감소</div>
              </article>
            </div>
          </div>
        </section>

        <section class="sim-info-visual-card is-wide">
          <div class="sim-info-card-head">
            <span class="sim-info-step">4</span>
            <div>
              <h4>마지막까지 남은 1명이 우승</h4>
              <p>체력이 0이 되면 탈락하고, 끝까지 남은 참가자가 최종 1위가 된다.</p>
            </div>
          </div>
          <div class="sim-info-scene sim-info-scene-finale" aria-hidden="true">
            <div class="sim-info-arena-shell is-finale">
              <div class="sim-info-demo-ball is-pink finale-ball-1"></div>
              <div class="sim-info-demo-ball is-mint finale-ball-2 is-faded"></div>
              <div class="sim-info-demo-ball is-sky finale-ball-3 is-faded"></div>
              <div class="sim-info-health-label finale-label is-winner">
                <strong>홍길동</strong>
                <span class="sim-info-health-values">37/93</span>
                <i class="sim-info-health-track"><b class="sim-info-health-fill is-winner"></b></i>
              </div>
              <div class="sim-info-health-label finale-label is-eliminated">김아무개 탈락</div>
              <div class="sim-info-winner-crown">👑 1위</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `
}

function getSimGameInfoTextHtml() {
  return `
    <section class="game-info-section">
      <h4>게임 진행 방식</h4>
      <ul>
        <li>참가자 이름을 쉼표로 입력하고 <strong>시작</strong>을 누르면 각 참가자에게 4장의 스탯 카드가 랜덤 배정된다.</li>
        <li>카드가 순차적으로 공개되면 <strong>전투시작</strong> 버튼이 활성화된다.</li>
        <li>전투가 시작되면 설정 화면은 정리되고, 경기장과 최종 스탯 요약표 중심의 관전 화면으로 바뀐다.</li>
        <li>마지막까지 살아남은 1명이 우승하며, 탈락 순서를 기준으로 최종 순위가 정해진다.</li>
      </ul>
    </section>

    <section class="game-info-section">
      <h4>스탯 설명</h4>
      <ul>
        <li><strong>${SIM_STAT_META.health.icon} ${SIM_STAT_META.health.label}</strong>: 기본 체력 50에 더해지는 값이다. 최종 체력은 <strong>50 + 추가 체력</strong>으로 계산된다.</li>
        <li><strong>${SIM_STAT_META.attack.icon} ${SIM_STAT_META.attack.label}</strong>: 충돌 시 상대에게 줄 수 있는 기본 피해량에 영향을 준다.</li>
        <li><strong>${SIM_STAT_META.accuracy.icon} ${SIM_STAT_META.accuracy.label}</strong>: 충돌 순간 공격 판정이 실제로 들어갈 확률이다. 수치가 높을수록 공격이 더 잘 맞는다.</li>
        <li><strong>${SIM_STAT_META.defense.icon} ${SIM_STAT_META.defense.label}</strong>: 상대의 <strong>공격 성공률 자체를 낮추는</strong> 능력치이다. 피해량을 깎는 스탯이 아니라 상대 명중 확률에 곱연산으로 적용된다.</li>
        <li><strong>예시</strong>: 상대 공격 성공률이 <strong>50%</strong>이고 내 방어력이 <strong>50%</strong>면, 상대의 실제 공격 성공률은 <strong>25%</strong>가 된다.</li>
      </ul>
    </section>

    <section class="game-info-section">
      <h4>전투에서 보이는 것</h4>
      <ul>
        <li>각 공 위 라벨에서 이름과 현재 체력을 바로 볼 수 있다.</li>
        <li>아래 요약표에서는 전투 시작 시 확정된 최종 스탯을 한눈에 비교할 수 있다.</li>
        <li>맵에 따라 폭탄, 회전 막대, 범퍼 등 전투를 흔드는 요소가 등장할 수 있다.</li>
      </ul>
    </section>

    <section class="game-info-section">
      <h4>알아두면 좋은 점</h4>
      <ul>
        <li>셔플은 참가자 순서만 바꾸고, 실제 스탯은 시작할 때 다시 랜덤 배정된다.</li>
        <li>리셋하면 전투 상태와 카드 배정이 모두 초기화되어 새 판처럼 다시 시작할 수 있다.</li>
        <li>같은 이름은 중복 등록할 수 없고, 최대 ${SIM_MAX_PLAYERS}명까지 참가할 수 있다.</li>
      </ul>
    </section>
  `
}

function getSimGameInfoHtml() {
  return `
    <div class="game-info-content game-info-content-sim">
      <p class="game-info-lead">볼 배틀은 참가자마다 총합 100의 스탯을 랜덤 배정한 뒤, 공끼리 충돌할 때마다 즉시 전투 판정이 일어나는 관찰형 생존 게임이다. <strong>시각 설명으로 흐름을 먼저 보고</strong>, 헷갈리는 부분만 글 설명에서 확인하면 된다.</p>
      ${getSimInfoTabButtonsHtml()}
      <div class="game-info-panels">
        <div class="game-info-panel is-active" data-info-panel="visual">${getSimGameInfoVisualHtml()}</div>
        <div class="game-info-panel" data-info-panel="text" hidden>${getSimGameInfoTextHtml()}</div>
      </div>
    </div>
  `
}

function setGameInfoPanel(root, nextTab) {
  if (!root) return

  root.querySelectorAll('.game-info-tab-btn[data-info-tab]').forEach((button) => {
    const isActive = button.dataset.infoTab === nextTab
    button.classList.toggle('is-active', isActive)
    button.setAttribute('aria-selected', isActive ? 'true' : 'false')
  })

  root.querySelectorAll('.game-info-panel[data-info-panel]').forEach((panel) => {
    const isActive = panel.dataset.infoPanel === nextTab
    panel.classList.toggle('is-active', isActive)
    panel.hidden = !isActive
  })
}

function handleGameInfoTabClick(event) {
  const button = event.target instanceof Element ? event.target.closest('.game-info-tab-btn[data-info-tab]') : null
  if (!button) return

  const root = button.closest('.game-info-content')
  if (!root) return

  setGameInfoPanel(root, button.dataset.infoTab || 'visual')
}

function openSimGameInfo() {
  showPopup('볼 배틀 설명', getSimGameInfoHtml(), {
    icon: '📖',
    allowHtml: true,
    popupClass: 'game-info-popup game-info-popup-sim'
  })
}

function shouldUseSimResponsiveLayout() {
  return isMobileOrTabletLike()
}

function syncSimResponsiveLayout() {
  if (
    !simCardScreen ||
    !simControlsWrap ||
    !simButtonRow ||
    !startSimBattleBtn ||
    !resetSimBtn ||
    !simMobileBattleStartSlot ||
    !simMobileResetSlot
  ) {
    return
  }

  const shouldUseResponsiveLayout = shouldUseSimResponsiveLayout()

  document.body.classList.toggle('game4-mobile-layout', shouldUseResponsiveLayout)

  if (shouldUseResponsiveLayout) {
    if (startSimBattleBtn.parentElement !== simMobileBattleStartSlot) {
      simMobileBattleStartSlot.appendChild(startSimBattleBtn)
    }

    if (simCardScreen.classList.contains('sim-view-battle')) {
      if (resetSimBtn.parentElement !== simMobileResetSlot) {
        simMobileResetSlot.appendChild(resetSimBtn)
      }
    } else if (resetSimBtn.parentElement !== simButtonRow) {
      simButtonRow.appendChild(resetSimBtn)
    }

    return
  }

  if (startSimBattleBtn.parentElement !== simControlsWrap) {
    simControlsWrap.insertBefore(startSimBattleBtn, simStatusText || null)
  }

  if (resetSimBtn.parentElement !== simButtonRow) {
    simButtonRow.appendChild(resetSimBtn)
  }
}

function updateSimArenaZoomButton() {
  if (!simArenaZoomBtn) return

  const isBattleView = Boolean(simCardScreen?.classList.contains('sim-view-battle'))
  simArenaZoomBtn.disabled = !isBattleView
  simArenaZoomBtn.setAttribute('aria-pressed', simArenaZoomed ? 'true' : 'false')
  simArenaZoomBtn.textContent = simArenaZoomed ? '원래 크기로' : '크게 보기'
}

function updateSimArenaZoomScale() {
  if (!simArenaWrap) return

  if (!simArenaZoomed || !simArenaZoomStage) {
    simArenaWrap.style.removeProperty('--sim-arena-base-width')
    simArenaWrap.style.removeProperty('--sim-arena-base-height')
    simArenaWrap.style.removeProperty('--sim-arena-display-width')
    simArenaWrap.style.removeProperty('--sim-arena-display-height')
    simArenaWrap.style.removeProperty('--sim-arena-zoom-scale')
    simArenaWrap.style.removeProperty('--sim-arena-aspect')
    return
  }

  const renderBaseWidth = simArenaRender?.options?.width || 0
  const renderBaseHeight = simArenaRender?.options?.height || 0
  const capturedBaseWidth = simArenaZoomBaseRect?.width || 0
  const capturedBaseHeight = simArenaZoomBaseRect?.height || 0
  const baseWidth = Math.max(1, renderBaseWidth || capturedBaseWidth || simArenaMeta?.width || 900)
  const baseHeight = Math.max(1, renderBaseHeight || capturedBaseHeight || simArenaMeta?.height || 460)
  const stageWidth = Math.max(1, simArenaZoomStage.clientWidth)
  const stageHeight = Math.max(1, simArenaZoomStage.clientHeight)
  const usableStageWidth = stageWidth * 0.96
  const usableStageHeight = stageHeight * 0.96
  const zoomScale = clampValue(Math.min(usableStageWidth / baseWidth, usableStageHeight / baseHeight), 0.35, 2.8)
  const displayWidth = Math.max(1, Math.floor(baseWidth * zoomScale))
  const displayHeight = Math.max(1, Math.floor(baseHeight * zoomScale))

  simArenaWrap.style.setProperty('--sim-arena-base-width', `${baseWidth}px`)
  simArenaWrap.style.setProperty('--sim-arena-base-height', `${baseHeight}px`)
  simArenaWrap.style.setProperty('--sim-arena-display-width', `${displayWidth}px`)
  simArenaWrap.style.setProperty('--sim-arena-display-height', `${displayHeight}px`)
  simArenaWrap.style.setProperty('--sim-arena-zoom-scale', String(zoomScale))
  simArenaWrap.style.setProperty('--sim-arena-aspect', `${baseWidth} / ${baseHeight}`)
}

function closeSimArenaZoom() {
  if (!simCardScreen) return

  simArenaZoomed = false
  simArenaZoomBaseRect = null
  simCardScreen.classList.remove('sim-arena-zoomed')
  document.body.classList.remove('sim-arena-zoom-lock')
  simArenaZoomBackdrop?.classList.remove('is-active')
  if (simArenaZoomBackdrop) {
    simArenaZoomBackdrop.setAttribute('aria-hidden', 'true')
  }
  updateSimArenaZoomScale()
  updateSimArenaOverlay(true)
  updateSimArenaZoomButton()
}

function openSimArenaZoom() {
  if (!simCardScreen || !simArenaWrap || !simCardScreen.classList.contains('sim-view-battle')) return

  const currentRect = simArenaWrap.getBoundingClientRect()
  simArenaZoomBaseRect = {
    width: Math.max(1, currentRect.width || simArenaWrap.clientWidth || simArenaMeta?.width || 900),
    height: Math.max(1, currentRect.height || simArenaWrap.clientHeight || simArenaMeta?.height || 460)
  }

  simArenaZoomed = true
  simCardScreen.classList.add('sim-arena-zoomed')
  document.body.classList.add('sim-arena-zoom-lock')
  simArenaZoomBackdrop?.classList.add('is-active')
  if (simArenaZoomBackdrop) {
    simArenaZoomBackdrop.setAttribute('aria-hidden', 'false')
  }

  requestAnimationFrame(() => {
    updateSimArenaZoomScale()
    updateSimArenaOverlay(true)
  })

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      updateSimArenaZoomScale()
      updateSimArenaOverlay(true)
    })
  })

  updateSimArenaZoomButton()
}

function toggleSimArenaZoom() {
  if (simArenaZoomed) {
    closeSimArenaZoom()
    return
  }
  openSimArenaZoom()
}

function setSimViewMode(mode = 'setup') {
  if (!simCardScreen) return
  simCardScreen.classList.remove('sim-view-setup', 'sim-view-battle')
  simCardScreen.classList.add(mode === 'battle' ? 'sim-view-battle' : 'sim-view-setup')
  if (mode !== 'battle') {
    closeSimArenaZoom()
  }
  syncSimResponsiveLayout()
  updateSimArenaZoomButton()
}

function renderSimBattleSummary(players = []) {
  if (!simBattleSummary) return

  if (!players.length) {
    simBattleSummary.innerHTML = '<div class="sim-empty-state">전투를 시작하면 여기에 참가자별 최종 스탯 요약표가 표시된다.</div>'
    return
  }

  const rows = players.map((player) => {
    const totalHpText = player.stats?.health !== undefined
      ? `${SIM_BASE_HP} + ${player.stats.health}`
      : (player.maxHp ?? '-')

    return `
    <tr>
      <td class="sim-summary-name">${escapeHtml(player.label)}</td>
      <td>${totalHpText}</td>
      <td>${player.stats?.attack ?? '-'}</td>
      <td>${player.stats?.accuracy ?? '-'}%</td>
      <td>${player.stats?.defense ?? '-'}%</td>
    </tr>
  `}).join('')

  simBattleSummary.innerHTML = `
    <table class="sim-summary-table">
      <thead>
        <tr>
          <th>참가자</th>
          <th>총 체력</th>
          <th>공격력</th>
          <th>공격 성공률</th>
          <th>방어력</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `
}
