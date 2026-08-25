/* generated from script.js · game6-stock.js */
const STOCK_MAX_PLAYERS = 4
const STOCK_SEED_MONEY = 1000000
const STOCK_MIN_DURATION = 10
const STOCK_MAX_DURATION = 60
const STOCK_DURATION_STEP = 5
const STOCK_TICK_MS = 250
const STOCK_RENDER_INTERVAL_MS = APP_PERFORMANCE_PROFILE.stockTickInterval
const STOCK_SCHEDULER_INTERVAL_MS = 50
const STOCK_HISTORY_LENGTH = 44
const STOCK_MAX_HOLDINGS = 4
const STOCK_UNIT_WON = 10000
const STOCK_SEED_MANWON = STOCK_SEED_MONEY / STOCK_UNIT_WON

const stockCurrencyFormatter = new Intl.NumberFormat('ko-KR')

const STOCK_MARKET_META = [
  {
    id: 'medical',
    sector: '의료',
    name: '메디코어',
    emoji: '🩺',
    trait: '방어형 · 안정적 상승',
    description: '실적이 비교적 안정적이고 낙폭이 작아 방어적인 흐름을 보이는 의료주.',
    basePriceRange: [52000, 98000],
    drift: 0.0016,
    volatility: 0.007,
    shockChance: 0.07,
    shockScale: 0.012,
    cycleStrength: 0.003
  },
  {
    id: 'tech',
    sector: '기술',
    name: '넥스트테크',
    emoji: '💻',
    trait: '성장형 · 변동성 큼',
    description: '테마를 타면 강하게 치솟지만 조정도 큰 전형적인 기술 성장주.',
    basePriceRange: [48000, 138000],
    drift: 0.0024,
    volatility: 0.012,
    shockChance: 0.12,
    shockScale: 0.023,
    cycleStrength: 0.004
  },
  {
    id: 'food',
    sector: '식료품',
    name: '데일리푸드',
    emoji: '🍞',
    trait: '필수소비재 · 완만한 움직임',
    description: '큰 폭의 급등락은 드물지만 꾸준히 버텨주는 생활밀착형 식료품주.',
    basePriceRange: [26000, 64000],
    drift: 0.0013,
    volatility: 0.0055,
    shockChance: 0.05,
    shockScale: 0.009,
    cycleStrength: 0.0025
  },
  {
    id: 'beauty',
    sector: '뷰티',
    name: '글로우뷰티',
    emoji: '💄',
    trait: '트렌드형 · 뉴스 민감',
    description: '입소문과 유행에 민감해서 한 번 분위기를 타면 빠르게 튀는 뷰티주.',
    basePriceRange: [24000, 82000],
    drift: 0.0018,
    volatility: 0.0095,
    shockChance: 0.1,
    shockScale: 0.018,
    cycleStrength: 0.0037
  },
  {
    id: 'leisure',
    sector: '여가',
    name: '플레이웨이브',
    emoji: '🎡',
    trait: '경기민감형 · 파동 큼',
    description: '수요가 몰릴 때는 강하지만 분위기가 식으면 흔들리기 쉬운 여가주.',
    basePriceRange: [32000, 76000],
    drift: 0.0015,
    volatility: 0.0105,
    shockChance: 0.09,
    shockScale: 0.017,
    cycleStrength: 0.0055
  },
  {
    id: 'coin',
    sector: '코인',
    name: '코스모코인',
    emoji: '🪙',
    trait: '초고변동 · 한순간 급등락',
    description: '짧은 시간에도 방향이 크게 뒤집힐 수 있는 고위험 고변동 코인.',
    basePriceRange: [9000, 42000],
    drift: 0.002,
    volatility: 0.02,
    shockChance: 0.16,
    shockScale: 0.042,
    cycleStrength: 0.0075
  }
]

let stockPlayers = []
let stockDrafts = new Map()
let stockGameRunning = false
let stockGameFinished = false
let stockElapsedMs = 0
let stockDurationSeconds = 30
let stockGameInterval = null
let stockLogicAccumulatorMs = 0
let stockLastSchedulerAt = 0
let stockLastRenderAt = 0
let stockSetupTurnIndex = 0
let stockMarket = []
let stockFocusedSelectionId = ''

function formatStockMoney(value) {
  return `${stockCurrencyFormatter.format(Math.round(value || 0))}원`
}

function formatStockSignedMoney(value) {
  const safe = Math.round(value || 0)
  const sign = safe > 0 ? '+' : safe < 0 ? '−' : '±'
  return `${sign}${stockCurrencyFormatter.format(Math.abs(safe))}원`
}

function formatStockPercent(value) {
  const safe = Number.isFinite(value) ? value : 0
  const sign = safe > 0 ? '+' : safe < 0 ? '−' : '±'
  return `${sign}${Math.abs(safe).toFixed(1)}%`
}

function formatStockManwon(value) {
  return `${stockCurrencyFormatter.format(Math.round((Number(value) || 0) / STOCK_UNIT_WON))}만원`
}

function wonToManwon(value) {
  return Math.round((Number(value) || 0) / STOCK_UNIT_WON)
}

function manwonToWon(value) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric) || numeric <= 0) return 0
  return clampValue(Math.round(numeric), 0, STOCK_SEED_MANWON) * STOCK_UNIT_WON
}

function clampStockDuration(value) {
  const normalized = Number(value)
  if (!Number.isFinite(normalized)) return 30
  const stepped = Math.round(normalized / STOCK_DURATION_STEP) * STOCK_DURATION_STEP
  return clampValue(stepped, STOCK_MIN_DURATION, STOCK_MAX_DURATION)
}

function createEmptyStockDraftSlots() {
  return Array.from({ length: STOCK_MAX_HOLDINGS }, () => ({ stockId: '', amount: 0 }))
}

function compactStockDraftSlots(slots = []) {
  const normalized = (slots || []).map((slot) => ({
    stockId: slot?.stockId || '',
    amount: Number(slot?.amount) || 0
  }))
  const filled = normalized.filter((slot) => slot.stockId)
  const empty = Array.from({ length: Math.max(0, STOCK_MAX_HOLDINGS - filled.length) }, () => ({ stockId: '', amount: 0 }))
  return filled.concat(empty).slice(0, STOCK_MAX_HOLDINGS)
}

function buildStockDraftEntry(label, slots = null) {
  return {
    label,
    slots: compactStockDraftSlots(slots || createEmptyStockDraftSlots())
  }
}

function createStockMarket() {
  return STOCK_MARKET_META.map((meta, index) => {
    const [minPrice, maxPrice] = meta.basePriceRange
    const price = Math.round(rand(minPrice, maxPrice))
    return {
      ...meta,
      colorClass: `sector-${meta.id}`,
      price,
      openPrice: price,
      lastChangePct: 0,
      lastChangeValue: 0,
      eventText: '개장 대기',
      history: Array.from({ length: STOCK_HISTORY_LENGTH }, () => price),
      momentum: rand(-meta.volatility, meta.volatility),
      cycleSeed: rand(0, Math.PI * 2),
      pulseSeed: rand(0, Math.PI * 2),
      eventCooldown: 0,
      sortOrder: index
    }
  })
}

function ensureStockMarket() {
  if (!stockMarket.length) {
    stockMarket = createStockMarket()
  }
}

function regenerateStockMarket() {
  stockMarket = createStockMarket()
}

function getStockMeta(stockId) {
  return stockMarket.find((stock) => stock.id === stockId) || STOCK_MARKET_META.find((stock) => stock.id === stockId) || null
}

function parseStockConfigToPlayers(text) {
  const rawItems = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!rawItems.length) {
    return { status: 'EMPTY' }
  }

  if (rawItems.length > STOCK_MAX_PLAYERS) {
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
      id: `stock-player-${players.length + 1}`,
      label: normalized,
      cash: 0,
      holdings: [],
      totalAsset: STOCK_SEED_MONEY,
      liveProfit: 0
    })
  }

  return { status: 'OK', players }
}

function handleStockParseFailure(parsed, { showPopupOnInvalid = false } = {}) {
  if (!stockStatusText) return false

  if (parsed.status === 'EMPTY') {
    stockStatusText.textContent = '참가자를 먼저 입력해줘. 예: 홍길동, 김아무개'
    return false
  }

  if (parsed.status === 'TOO_MANY') {
    stockStatusText.textContent = `참가자는 최대 ${STOCK_MAX_PLAYERS}명까지 가능하다.`
    if (showPopupOnInvalid) {
      showPopup('참가자 수 초과', `주식게임은 최대 ${STOCK_MAX_PLAYERS}명까지 참가할 수 있어.`)
    }
    return false
  }

  if (parsed.status === 'DUPLICATE') {
    stockStatusText.textContent = '같은 이름은 2번 이상 입력할 수 없다.'
    if (showPopupOnInvalid) {
      showPopup('중복 이름 불가', '주식게임은 같은 이름을 중복 등록할 수 없어.')
    }
    return false
  }

  stockStatusText.textContent = '입력 형식을 확인해줘. 예: 홍길동, 김아무개'
  if (showPopupOnInvalid) {
    showPopup('입력 확인', '이름만 쉼표로 구분해 적어줘. 예: 홍길동, 김아무개')
  }
  return false
}

function setStockPlayers(players) {
  const previous = new Map()
  stockDrafts.forEach((entry) => {
    previous.set(entry.label, buildStockDraftEntry(entry.label, entry.slots))
  })

  stockPlayers = players
  const nextDrafts = new Map()

  stockPlayers.forEach((player) => {
    const reused = previous.get(player.label)
    nextDrafts.set(player.id, reused ? buildStockDraftEntry(player.label, reused.slots) : buildStockDraftEntry(player.label))
  })

  stockDrafts = nextDrafts
  stockSetupTurnIndex = clampValue(stockSetupTurnIndex, 0, Math.max(0, stockPlayers.length - 1))
  updateStockDescription()
}

function resetStockDrafts() {
  const next = new Map()
  stockPlayers.forEach((player) => {
    next.set(player.id, buildStockDraftEntry(player.label))
  })
  stockDrafts = next
  stockSetupTurnIndex = 0
}

function updateStockDescription() {
  if (!stockDesc) return
  stockDesc.textContent = `총 ${stockPlayers.length || 0}명이 분야별 주식에 투자하고, ${stockDurationSeconds}초 동안 자동 등락을 지켜보는 관찰형 게임이다.`
}

function setStockInputLock(isLocked) {
  if (stockConfigInput) {
    stockConfigInput.disabled = isLocked
    stockConfigInput.style.opacity = isLocked ? '0.65' : '1'
    stockConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
  }

  if (stockDurationInput) {
    stockDurationInput.disabled = isLocked
    stockDurationInput.style.opacity = isLocked ? '0.65' : '1'
    stockDurationInput.style.cursor = isLocked ? 'not-allowed' : ''
  }
}

function setStockSetupLock(isLocked) {
  if (shuffleStockBtn) {
    shuffleStockBtn.disabled = isLocked
    shuffleStockBtn.style.opacity = isLocked ? '0.55' : '1'
    shuffleStockBtn.style.cursor = isLocked ? 'not-allowed' : ''
  }

  setGameStartButtonRunningState(startStockBtn, stockGameRunning, { busyText: '진행 중' })

  if (stockCardScreen) {
    stockCardScreen.classList.toggle('stock-setup-locked', isLocked)
  }
}

function getStockDraftValidation(playerId) {
  const draft = stockDrafts.get(playerId)
  const slots = draft?.slots || []
  const positions = []
  const seen = new Set()
  let total = 0
  let hasIncomplete = false
  let hasDuplicate = false
  let hasInvalidAmount = false

  slots.forEach((slot) => {
    const stockId = slot?.stockId || ''
    const amount = Number(slot?.amount) || 0
    const hasStock = Boolean(stockId)
    const hasAmount = amount > 0

    if (hasStock !== hasAmount) {
      hasIncomplete = true
    }

    if (hasStock && hasAmount) {
      if (seen.has(stockId)) {
        hasDuplicate = true
      }
      seen.add(stockId)

      if (amount % 10000 !== 0 || amount < 10000 || amount > STOCK_SEED_MONEY) {
        hasInvalidAmount = true
      }

      total += amount
      positions.push({ stockId, amount })
    }
  })

  const count = positions.length
  const remaining = STOCK_SEED_MONEY - total
  const valid = !hasIncomplete && !hasDuplicate && !hasInvalidAmount && count >= 1 && count <= STOCK_MAX_HOLDINGS && remaining === 0

  let issue = ''
  if (hasDuplicate) {
    issue = '같은 종목은 한 번만 담을 수 있어.'
  } else if (hasIncomplete) {
    issue = '종목과 투자금은 한 줄씩 함께 입력해줘.'
  } else if (hasInvalidAmount) {
    issue = '투자금은 1만원 단위, 최소 1만원부터 가능해.'
  } else if (remaining > 0) {
    issue = `남은 시드머니 ${formatStockMoney(remaining)}을 모두 투자해야 해.`
  } else if (remaining < 0) {
    issue = `투자금이 ${formatStockMoney(Math.abs(remaining))} 초과됐어.`
  } else if (count === 0) {
    issue = '최소 1개 종목은 골라야 해.'
  }

  return {
    valid,
    total,
    remaining,
    positions,
    count,
    issue
  }
}

function getStockReadyCount() {
  return stockPlayers.filter((player) => getStockDraftValidation(player.id).valid).length
}

function updateStockDurationText() {
  if (!stockDurationValue) return
  stockDurationValue.textContent = `${stockDurationSeconds}초`
}

function updateStockStatus(text) {
  if (!stockStatusText) return
  stockStatusText.textContent = text
}

function renderStockPlayerSummary() {
  if (!stockPlayerSummary || !stockTotalInfo) return

  stockPlayerSummary.innerHTML = ''

  const isLiveMode = stockGameRunning || stockGameFinished

  if (stockSummaryTitle) {
    stockSummaryTitle.textContent = isLiveMode ? '실시간 순위' : '참가자 준비 현황'
  }

  if (!stockPlayers.length) {
    stockPlayerSummary.innerHTML = `<div class="stock-empty-state">${isLiveMode ? '게임이 시작되면 실시간 순위가 여기에 표시된다.' : '참가자를 입력하면 준비 현황이 여기에 표시된다.'}</div>`
    stockTotalInfo.textContent = '총 0명'
    return
  }

  if (isLiveMode) {
    const ranking = getStockRanking()
    stockPlayerSummary.innerHTML = ranking
      .map((player, index) => {
        const asset = getStockPlayerAsset(player)
        const profit = getStockPlayerProfit(player)
        return `
          <div class="stock-ranking-item${index === 0 ? ' top' : ''}">
            <div class="stock-ranking-num">${index + 1}</div>
            <div class="stock-ranking-main">
              <strong>${escapeHtml(player.label)}</strong>
              <span class="stock-ranking-asset">${formatStockMoney(asset)}</span>
              <em class="stock-ranking-profit ${profit >= 0 ? 'is-profit' : 'is-loss'}">${formatStockSignedMoney(profit)}</em>
            </div>
          </div>
        `
      })
      .join('')
    stockTotalInfo.textContent = `총 ${ranking.length}명`
    return
  }

  stockPlayers.forEach((player, index) => {
    const validation = getStockDraftValidation(player.id)
    const item = document.createElement('div')
    item.className = `stock-player-summary-item${validation.valid ? ' is-ready' : ''}${index === stockSetupTurnIndex ? ' is-active' : ''}`
    item.innerHTML = `
      <div class="stock-player-summary-top">
        <strong>${escapeHtml(player.label)}</strong>
        <span class="stock-player-summary-badge ${validation.valid ? 'is-ready' : 'is-pending'}">${validation.valid ? '투자 완료' : '배분 중'}</span>
      </div>
      <div class="stock-player-summary-sub">${validation.valid ? `${validation.count}종목 · ${formatStockManwon(validation.total)} 배분 완료` : (validation.count ? `${validation.count}종목 선택 · ${validation.remaining > 0 ? `남은 ${formatStockManwon(validation.remaining)}` : escapeHtml(validation.issue || '조정 필요')}` : '아직 종목을 고르지 않았어.')}</div>
    `
    stockPlayerSummary.appendChild(item)
  })

  stockTotalInfo.textContent = `총 ${stockPlayers.length}명`
}

function renderStockPlayerTabs() {
  if (!stockPlayerTabs) return

  stockPlayerTabs.innerHTML = ''

  stockPlayers.forEach((player, index) => {
    const validation = getStockDraftValidation(player.id)
    const button = document.createElement('button')
    button.type = 'button'
    button.className = `stock-player-tab${index === stockSetupTurnIndex ? ' is-active' : ''}${validation.valid ? ' is-ready' : ''}`
    button.dataset.playerId = player.id
    button.innerHTML = `
      <strong>${escapeHtml(player.label)}</strong>
      <span>${validation.valid ? '완료' : `${validation.count}종목 선택`}</span>
    `
    stockPlayerTabs.appendChild(button)
  })
}

function getStockFocusedSelectionIndex(selectedSlots) {
  if (!selectedSlots.length) {
    stockFocusedSelectionId = ''
    return -1
  }

  let focusedIndex = selectedSlots.findIndex((slot) => slot.stockId === stockFocusedSelectionId)

  if (focusedIndex < 0) {
    focusedIndex = 0
    stockFocusedSelectionId = selectedSlots[0].stockId
  }

  return focusedIndex
}

function moveStockFocusedSelection(direction) {
  const activePlayer = stockPlayers[stockSetupTurnIndex] || stockPlayers[0]
  if (!activePlayer) return

  const selectedSlots = getStockSelectedSlots(activePlayer.id)
  if (selectedSlots.length <= 1) return

  const focusedIndex = getStockFocusedSelectionIndex(selectedSlots)
  const nextIndex = (focusedIndex + direction + selectedSlots.length) % selectedSlots.length
  stockFocusedSelectionId = selectedSlots[nextIndex].stockId
  renderStockAllocationEditor()
}

function syncStockPickedCarouselFocus() {
  // single-card mode keeps only the focused stock visible, so no scroll sync is needed.
}

function renderStockAllocationEditor() {
  if (!stockAllocationEditor || !stockAllocationSummary || !stockActivePlayerTitle) return

  if (!stockPlayers.length) {
    stockActivePlayerTitle.textContent = '현재 투자 차례'
    stockAllocationEditor.innerHTML = '<div class="stock-empty-state">참가자를 입력하면 투자 슬롯이 열린다.</div>'
    stockAllocationSummary.innerHTML = ''
    return
  }

  const activePlayer = stockPlayers[stockSetupTurnIndex] || stockPlayers[0]
  const draft = getStockDraftEntryByPlayerId(activePlayer.id)
  const validation = getStockDraftValidation(activePlayer.id)
  const selectedSlots = draft.slots.filter((slot) => slot.stockId)
  const isLocked = stockGameRunning

  stockActivePlayerTitle.textContent = `${activePlayer.label} 투자 구성`

  if (!selectedSlots.length) {
    stockAllocationEditor.innerHTML = `
      <div class="stock-empty-state stock-empty-state-setup">
        위 종목 카드를 눌러 최대 ${STOCK_MAX_HOLDINGS}개까지 담아줘. 담은 뒤에는 입력칸에 <strong>N만원</strong> 단위로 금액을 넣으면 돼. 중간 매도는 없고, 시작하면 끝까지 결과를 지켜보는 방식이야.
      </div>
    `
  } else {
    const focusedIndex = getStockFocusedSelectionIndex(selectedSlots)
    const activeSlot = selectedSlots[focusedIndex]
    const stock = getStockMeta(activeSlot.stockId)
    const maxAvailable = STOCK_SEED_MONEY - (validation.total - activeSlot.amount)

    const pickedCardHtml = `
      <article class="stock-picked-card stock-picked-slide ${stock?.colorClass || ''}" data-stock-id="${activeSlot.stockId}">
        <div class="stock-picked-head">
          <div class="stock-picked-head-main">
            <div class="stock-picked-badge">${stock?.emoji || '📈'} ${escapeHtml(stock?.sector || '종목')}</div>
            <div class="stock-picked-name">${escapeHtml(stock?.name || activeSlot.stockId)}</div>
            <div class="stock-picked-trait">${escapeHtml(stock?.trait || '')}</div>
          </div>
          <button class="stock-picked-remove-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" ${isLocked ? 'disabled' : ''}>삭제</button>
        </div>
        <div class="stock-picked-price-row">
          <span>현재가</span>
          <strong>${formatStockMoney(stock?.price || 0)}</strong>
        </div>
        <div class="stock-quick-row">
          <button class="stock-chip-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-step="-10" ${isLocked ? 'disabled' : ''}>-10</button>
          <button class="stock-chip-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-step="-5" ${isLocked ? 'disabled' : ''}>-5</button>
          <button class="stock-chip-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-step="-1" ${isLocked ? 'disabled' : ''}>-1</button>
          <button class="stock-chip-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-step="1" ${isLocked ? 'disabled' : ''}>+1</button>
          <button class="stock-chip-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-step="5" ${isLocked ? 'disabled' : ''}>+5</button>
          <button class="stock-chip-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-step="10" ${isLocked ? 'disabled' : ''}>+10</button>
        </div>
        <div class="stock-manwon-input-row">
          <label class="stock-manwon-label">투자금</label>
          <div class="stock-manwon-control">
            <input class="stock-amount-input stock-amount-input-manwon" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-amount-input="true" type="text" inputmode="numeric" pattern="[0-9]*" placeholder="0" value="${activeSlot.amount ? wonToManwon(activeSlot.amount) : ''}" ${isLocked ? 'disabled' : ''} />
            <span>만원</span>
          </div>
          <button class="stock-fill-btn" type="button" data-player-id="${activePlayer.id}" data-stock-id="${activeSlot.stockId}" data-stock-fill="remaining" ${isLocked ? 'disabled' : ''}>잔액 전부</button>
        </div>
        <div class="stock-picked-meta">현재 ${formatStockManwon(activeSlot.amount)} · 이 종목에 최대 ${formatStockManwon(maxAvailable)}까지 넣을 수 있어.</div>
      </article>
    `

    stockAllocationEditor.innerHTML = `
      <div class="stock-picked-carousel-toolbar">
        <div class="stock-picked-carousel-hint">선택한 종목을 하나씩 넘기며 투자해줘</div>
        <div class="stock-picked-carousel-nav">
          <button class="stock-carousel-nav-btn" type="button" data-stock-carousel-nav="prev" ${selectedSlots.length <= 1 || isLocked ? 'disabled' : ''}>←</button>
          <span class="stock-picked-carousel-count">${focusedIndex + 1} / ${selectedSlots.length}</span>
          <button class="stock-carousel-nav-btn" type="button" data-stock-carousel-nav="next" ${selectedSlots.length <= 1 || isLocked ? 'disabled' : ''}>→</button>
        </div>
      </div>
      <div class="stock-picked-carousel is-single-view">${pickedCardHtml}</div>
    `
  }

  syncStockPickedCarouselFocus()

  stockAllocationSummary.innerHTML = `
    <div class="stock-allocation-chip-grid">
      <div class="stock-allocation-total is-total ${validation.valid ? 'is-ready' : ''}">
        <span>총 투자금</span>
        <strong>${formatStockManwon(validation.total)}</strong>
      </div>
      <div class="stock-allocation-total is-remaining ${validation.remaining === 0 ? 'is-ready' : validation.remaining < 0 ? 'is-danger' : ''}">
        <span>남은 금액</span>
        <strong>${validation.remaining >= 0 ? formatStockManwon(validation.remaining) : `초과 ${formatStockManwon(Math.abs(validation.remaining))}`}</strong>
      </div>
      <div class="stock-allocation-total">
        <span>선택 종목</span>
        <strong>${validation.count} / ${STOCK_MAX_HOLDINGS}</strong>
      </div>
    </div>
    <div class="stock-allocation-note${validation.valid ? ' is-ready' : ''}">${validation.valid ? '준비 완료. 다음 참가자로 넘어가거나 바로 관찰형 게임을 시작할 수 있어.' : escapeHtml(validation.issue || '시드머니 100만원을 모두 채워야 준비 완료돼.')}</div>
    <div class="stock-helper-actions">
      <button class="stock-turn-btn" type="button" data-stock-action="equalize" ${!selectedSlots.length || isLocked ? 'disabled' : ''}>균등 배분</button>
      <button class="stock-turn-btn" type="button" data-stock-action="clear-all" ${!selectedSlots.length || isLocked ? 'disabled' : ''}>전체 비우기</button>
    </div>
    <div class="stock-turn-actions">
      <button class="stock-turn-btn" type="button" data-stock-turn="prev" ${stockSetupTurnIndex === 0 || isLocked ? 'disabled' : ''}>← 이전 참가자</button>
      <button class="stock-turn-btn" type="button" data-stock-turn="next" ${stockSetupTurnIndex >= stockPlayers.length - 1 || isLocked ? 'disabled' : ''}>다음 참가자 →</button>
    </div>
  `
}

function renderStockReadyBadge() {
  if (!stockReadyBadge) return
  const readyCount = getStockReadyCount()
  stockReadyBadge.textContent = `${readyCount}/${stockPlayers.length || 0}명 준비`
  stockReadyBadge.classList.toggle('is-ready', stockPlayers.length > 0 && readyCount === stockPlayers.length)
}

function renderStockRoster() {
  if (!stockRoster) return

  ensureStockMarket()

  const activePlayer = stockPlayers[stockSetupTurnIndex] || stockPlayers[0] || null
  const selectedSlots = activePlayer ? getStockSelectedSlots(activePlayer.id) : []
  const selectedMap = new Map(selectedSlots.map((slot) => [slot.stockId, slot]))
  const selectedCount = selectedSlots.length
  const isLocked = stockGameRunning

  stockRoster.innerHTML = stockMarket
    .map((stock) => {
      const selected = selectedMap.has(stock.id)
      const selectedSlot = selectedMap.get(stock.id)
      const disabled = isLocked || (!selected && selectedCount >= STOCK_MAX_HOLDINGS)
      return `
        <button class="stock-roster-card stock-roster-card-btn ${stock.colorClass}${selected ? ' is-selected' : ''}" type="button" data-player-id="${activePlayer?.id || ''}" data-stock-id="${stock.id}" ${disabled ? 'disabled' : ''}>
          <div class="stock-roster-topline">
            <span class="stock-roster-emoji" aria-hidden="true">${stock.emoji}</span>
            <span class="stock-roster-select-state">${selected ? `${formatStockManwon(selectedSlot.amount)}` : '담기'}</span>
          </div>
          <div class="stock-roster-name">${stock.name}</div>
          <div class="stock-roster-info-line stock-roster-price-line">
            <span>현재 시세</span>
            <strong>${formatStockMoney(stock.price)}</strong>
          </div>
          <div class="stock-roster-info-line stock-roster-trait-line">
            <span>특징</span>
            <strong>${stock.trait}</strong>
          </div>
          <p class="stock-roster-desc">${selected ? '선택됨 · 아래에서 투자금 입력' : '카드 눌러서 담기'}</p>
        </button>
      `
    })
    .join('')
}

function getStockHistoryPoints(history) {
  const values = history.slice(-STOCK_HISTORY_LENGTH)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const range = maxValue - minValue || 1

  return values
    .map((value, index) => {
      const x = values.length === 1 ? 0 : (index / (values.length - 1)) * 100
      const y = 52 - ((value - minValue) / range) * 40
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}

function getStockHoldingValue(holding) {
  if (holding.sold) {
    return holding.realizedValue || 0
  }

  const stock = getStockMeta(holding.stockId)
  if (!stock) return 0
  return holding.shares * stock.price
}

function getStockHoldingProfit(holding) {
  return getStockHoldingValue(holding) - holding.amount
}

function getStockPlayerAsset(player) {
  const cash = Number(player.cash) || 0
  const holdingsValue = (player.holdings || []).reduce((sum, holding) => sum + getStockHoldingValue(holding), 0)
  return cash + holdingsValue
}

function getStockPlayerProfit(player) {
  return getStockPlayerAsset(player) - STOCK_SEED_MONEY
}

function getStockChartHolders(stockId) {
  return stockPlayers
    .map((player) => {
      const holding = (player.holdings || []).find((item) => item.stockId === stockId)
      if (!holding) return null
      return { player, holding }
    })
    .filter(Boolean)
}

function renderStockBoard() {
  if (!stockBoard) return

  ensureStockMarket()

  stockBoard.innerHTML = stockMarket
    .map((stock) => {
      const holders = getStockChartHolders(stock.id)
      const priceDiff = stock.price - stock.openPrice
      const percentDiff = stock.openPrice ? (priceDiff / stock.openPrice) * 100 : 0
      const points = getStockHistoryPoints(stock.history)

      const holderHtml = holders.length
        ? holders
            .map(({ player, holding }) => {
              const profit = getStockHoldingProfit(holding)
              const value = getStockHoldingValue(holding)
              const percent = holding.amount ? (profit / holding.amount) * 100 : 0
              return `
                <div class="stock-holder-row ${profit >= 0 ? 'is-profit' : 'is-loss'}${holding.sold ? ' is-sold' : ''}">
                  <strong>${escapeHtml(player.label)}</strong>
                  <span>${stockGameFinished || holding.sold ? '종료 정산' : '보유중'}</span>
                  <em>${formatStockSignedMoney(profit)} · ${formatStockPercent(percent)}</em>
                  <small>평가금액 ${formatStockMoney(value)}</small>
                </div>
              `
            })
            .join('')
        : '<div class="stock-holder-empty">현재 이 종목을 보유한 참가자가 없어.</div>'

      return `
        <article class="stock-chart-card ${stock.colorClass}">
          <div class="stock-chart-head">
            <div>
              <span class="stock-sector-chip">${stock.emoji} ${stock.sector}</span>
              <h4>${stock.name}</h4>
            </div>
            <div class="stock-chart-price-block ${priceDiff >= 0 ? 'is-up' : 'is-down'}">
              <strong>${formatStockMoney(stock.price)}</strong>
              <span>${formatStockSignedMoney(priceDiff)} · ${formatStockPercent(percentDiff)}</span>
            </div>
          </div>
          <div class="stock-chart-shell">
            <svg viewBox="0 0 100 56" preserveAspectRatio="none" aria-hidden="true">
              <polyline class="stock-chart-line ${priceDiff >= 0 ? 'is-up' : 'is-down'}" points="${points}"></polyline>
            </svg>
          </div>
          <div class="stock-chart-note">${stock.trait} · ${stock.eventText}</div>
          <div class="stock-chart-holders">
            ${holderHtml}
          </div>
        </article>
      `
    })
    .join('')
}

function renderStockPortfolio() {
  if (!stockPortfolioList) return

  if (!stockPlayers.length) {
    stockPortfolioList.innerHTML = '<div class="stock-empty-state">게임이 시작되면 각 참가자의 보유 현황이 여기에 표시된다.</div>'
    return
  }

  stockPortfolioList.innerHTML = stockPlayers
    .map((player) => {
      const totalAsset = getStockPlayerAsset(player)
      const profit = getStockPlayerProfit(player)
      const holdings = player.holdings || []
      const holdingsHtml = holdings.length
        ? holdings
            .map((holding) => {
              const stock = getStockMeta(holding.stockId)
              const value = getStockHoldingValue(holding)
              const pnl = value - holding.amount
              const stateText = stockGameFinished || holding.sold ? '종료 정산' : '보유중'
              return `
                <div class="stock-holding-chip ${holding.sold ? 'is-sold' : ''}">
                  <div class="stock-holding-meta">
                    <div class="stock-holding-topline">
                      <strong>${escapeHtml(stock?.name || holding.stockId)}</strong>
                      <span class="stock-holding-state">${stateText}</span>
                    </div>
                    <span>${formatStockMoney(holding.amount)} → ${formatStockMoney(value)}</span>
                    <em>${formatStockSignedMoney(pnl)}</em>
                  </div>
                </div>
              `
            })
            .join('')
        : '<div class="stock-holder-empty">아직 구성된 종목이 없어.</div>'

      return `
        <article class="stock-portfolio-card">
          <div class="stock-portfolio-head">
            <div>
              <h4>${escapeHtml(player.label)}</h4>
              <p>현재 총자산 ${formatStockMoney(totalAsset)}</p>
            </div>
            <div class="stock-portfolio-profit ${profit >= 0 ? 'is-profit' : 'is-loss'}">${formatStockSignedMoney(profit)}</div>
          </div>
          <div class="stock-portfolio-cash">현금 ${formatStockMoney(player.cash || 0)}</div>
          <div class="stock-holdings-list">${holdingsHtml}</div>
        </article>
      `
    })
    .join('')
}

function getStockRanking() {
  return [...stockPlayers].sort((a, b) => {
    const assetDiff = getStockPlayerAsset(b) - getStockPlayerAsset(a)
    if (assetDiff !== 0) return assetDiff
    return a.label.localeCompare(b.label, 'ko')
  })
}

function renderStockRanking() {
  if (!stockRankingList) return

  if (!stockPlayers.length) {
    stockRankingList.innerHTML = '<div class="stock-empty-state">게임이 시작되면 실시간 순위가 여기에 표시된다.</div>'
    return
  }

  const ranking = getStockRanking()
  stockRankingList.innerHTML = ranking
    .map((player, index) => {
      const asset = getStockPlayerAsset(player)
      const profit = getStockPlayerProfit(player)
      return `
        <div class="stock-ranking-item${index === 0 ? ' top' : ''}">
          <div class="stock-ranking-num">${index + 1}</div>
          <div class="stock-ranking-main">
            <strong>${escapeHtml(player.label)}</strong>
            <span class="stock-ranking-asset">${formatStockMoney(asset)}</span>
            <em class="stock-ranking-profit ${profit >= 0 ? 'is-profit' : 'is-loss'}">${formatStockSignedMoney(profit)}</em>
          </div>
        </div>
      `
    })
    .join('')
}

function renderStockTimer() {
  if (!stockTimerBadge) return

  if (stockGameRunning) {
    const remaining = Math.max(0, stockDurationSeconds - Math.ceil(stockElapsedMs / 1000))
    stockTimerBadge.textContent = `${remaining}초 남음`
    stockTimerBadge.classList.add('is-live')
    return
  }

  if (stockGameFinished) {
    stockTimerBadge.textContent = '종료'
    stockTimerBadge.classList.remove('is-live')
    return
  }

  stockTimerBadge.textContent = '준비중'
  stockTimerBadge.classList.remove('is-live')
}

function renderStockGame() {
  updateStockViewMode()
  renderStockPlayerSummary()
  renderStockPlayerTabs()
  renderStockReadyBadge()
  renderStockRoster()
  renderStockAllocationEditor()
  renderStockBoard()
  renderStockPortfolio()
  renderStockRanking()
  renderStockTimer()
}

function setStockTurnByPlayerId(playerId) {
  const nextIndex = stockPlayers.findIndex((player) => player.id === playerId)
  if (nextIndex >= 0) {
    stockSetupTurnIndex = nextIndex
    renderStockGame()
  }
}

function updateStockFromInput({ render = true, preserveDrafts = true } = {}) {
  if (!stockConfigInput) return false

  const parsed = parseStockConfigToPlayers(stockConfigInput.value)
  if (parsed.status !== 'OK') {
    return handleStockParseFailure(parsed)
  }

  if (!preserveDrafts) {
    stockDrafts = new Map()
  }

  setStockPlayers(parsed.players)

  if (!preserveDrafts) {
    resetStockDrafts()
  }

  if (render) {
    renderStockGame()
    updateStockStatus(`실시간 반영 완료: 총 ${stockPlayers.length}명`)
  }

  return true
}

function ensureStockReady() {
  ensureStockMarket()

  if (stockDurationInput) {
    stockDurationSeconds = clampStockDuration(stockDurationInput.value)
    stockDurationInput.value = String(stockDurationSeconds)
  }
  updateStockDurationText()

  if (!stockPlayers.length && stockConfigInput) {
    const parsed = parseStockConfigToPlayers(stockConfigInput.value)
    if (parsed.status === 'OK') {
      setStockPlayers(parsed.players)
    } else {
      stockConfigInput.value = '홍길동, 김아무개'
      const fallbackParsed = parseStockConfigToPlayers(stockConfigInput.value)
      if (fallbackParsed.status === 'OK') {
        setStockPlayers(fallbackParsed.players)
      }
    }
  }

  renderStockGame()

  if (!stockGameRunning && !stockGameFinished) {
    updateStockStatus('종목 카드를 눌러 담고, 입력칸에 N만원 단위로 배분을 끝내면 바로 관찰형 게임을 시작할 수 있다.')
  }
}

function sanitizeStockAmount(value) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric) || numeric <= 0) return 0
  return clampValue(Math.round(numeric / STOCK_UNIT_WON) * STOCK_UNIT_WON, 0, STOCK_SEED_MONEY)
}

function getStockDraftEntryByPlayerId(playerId) {
  const player = stockPlayers.find((item) => item.id === playerId)
  const existing = stockDrafts.get(playerId)
  if (existing) {
    return buildStockDraftEntry(existing.label || player?.label || '', existing.slots)
  }
  return buildStockDraftEntry(player?.label || '')
}

function saveStockDraftEntry(playerId, entry) {
  const player = stockPlayers.find((item) => item.id === playerId)
  stockDrafts.set(playerId, buildStockDraftEntry(entry?.label || player?.label || '', entry?.slots || []))
}

function getStockSelectedSlots(playerId) {
  return getStockDraftEntryByPlayerId(playerId).slots.filter((slot) => slot.stockId)
}

function getStockDraftSlotIndex(playerId, stockId) {
  return getStockDraftEntryByPlayerId(playerId).slots.findIndex((slot) => slot.stockId === stockId)
}

function toggleStockDraftSelection(playerId, stockId) {
  if (stockGameRunning) return

  const entry = getStockDraftEntryByPlayerId(playerId)
  const slots = entry.slots.map((slot) => ({ ...slot }))
  const currentIndex = slots.findIndex((slot) => slot.stockId === stockId)

  if (currentIndex >= 0) {
    slots[currentIndex] = { stockId: '', amount: 0 }
    saveStockDraftEntry(playerId, { ...entry, slots })
    renderStockGame()
    return
  }

  const filledCount = slots.filter((slot) => slot.stockId).length
  if (filledCount >= STOCK_MAX_HOLDINGS) {
    showPopup('종목 선택 제한', `한 참가자는 최대 ${STOCK_MAX_HOLDINGS}개 종목까지 선택할 수 있어.`)
    return
  }

  const emptyIndex = slots.findIndex((slot) => !slot.stockId)
  if (emptyIndex < 0) return

  slots[emptyIndex] = { stockId, amount: 0 }
  saveStockDraftEntry(playerId, { ...entry, slots })
  renderStockGame()
}

function setStockDraftAmountByStock(playerId, stockId, amountWon) {
  const entry = getStockDraftEntryByPlayerId(playerId)
  const slots = entry.slots.map((slot) => ({ ...slot }))
  const currentIndex = slots.findIndex((slot) => slot.stockId === stockId)
  if (currentIndex < 0) return
  slots[currentIndex].amount = sanitizeStockAmount(amountWon)
  saveStockDraftEntry(playerId, { ...entry, slots })
  renderStockGame()
}

function adjustStockDraftAmountByStock(playerId, stockId, deltaManwon) {
  const entry = getStockDraftEntryByPlayerId(playerId)
  const slot = entry.slots.find((item) => item.stockId === stockId)
  if (!slot) return
  setStockDraftAmountByStock(playerId, stockId, slot.amount + deltaManwon * STOCK_UNIT_WON)
}

function clearStockDraftStock(playerId, stockId) {
  const entry = getStockDraftEntryByPlayerId(playerId)
  const slots = entry.slots.map((slot) => ({ ...slot }))
  const currentIndex = slots.findIndex((slot) => slot.stockId === stockId)
  if (currentIndex < 0) return
  slots[currentIndex] = { stockId: '', amount: 0 }
  saveStockDraftEntry(playerId, { ...entry, slots })
  renderStockGame()
}

function fillRemainingStockDraftAmount(playerId, stockId) {
  const validation = getStockDraftValidation(playerId)
  if (validation.remaining <= 0) return
  const entry = getStockDraftEntryByPlayerId(playerId)
  const slot = entry.slots.find((item) => item.stockId === stockId)
  if (!slot) return
  setStockDraftAmountByStock(playerId, stockId, slot.amount + validation.remaining)
}

function equalizeStockDraftAmounts(playerId) {
  const entry = getStockDraftEntryByPlayerId(playerId)
  const selectedSlots = entry.slots.filter((slot) => slot.stockId)
  if (!selectedSlots.length) {
    showPopup('균등 배분 안내', '먼저 종목 카드를 눌러 최소 1개 종목을 선택해줘.')
    return
  }

  const base = Math.floor(STOCK_SEED_MANWON / selectedSlots.length)
  let remainder = STOCK_SEED_MANWON - base * selectedSlots.length
  const nextSlots = entry.slots.map((slot) => {
    if (!slot.stockId) return { stockId: '', amount: 0 }
    const bonus = remainder > 0 ? 1 : 0
    if (remainder > 0) remainder -= 1
    return {
      stockId: slot.stockId,
      amount: (base + bonus) * STOCK_UNIT_WON
    }
  })

  saveStockDraftEntry(playerId, { ...entry, slots: nextSlots })
  renderStockGame()
}

function clearAllStockDraftAmounts(playerId) {
  const entry = getStockDraftEntryByPlayerId(playerId)
  const nextSlots = entry.slots.map(() => ({ stockId: '', amount: 0 }))
  saveStockDraftEntry(playerId, { ...entry, slots: nextSlots })
  renderStockGame()
}

function commitStockAmountInput(target, options = {}) {
  if (!(target instanceof HTMLInputElement)) return

  const { restoreFocus = false } = options
  const playerId = target.dataset.playerId
  const stockId = target.dataset.stockId

  if (!playerId || !stockId) return

  const digitsOnly = String(target.value || '').replace(/[^\d]/g, '')
  const cursorPosition = digitsOnly.length

  if (target.value !== digitsOnly) {
    target.value = digitsOnly
  }

  stockFocusedSelectionId = stockId
  setStockDraftAmountByStock(playerId, stockId, manwonToWon(digitsOnly))

  if (!restoreFocus) return

  requestAnimationFrame(() => {
    const refreshedInput = stockAllocationEditor?.querySelector(
      `.stock-amount-input[data-player-id="${playerId}"][data-stock-id="${stockId}"]`
    )

    if (!(refreshedInput instanceof HTMLInputElement)) return

    refreshedInput.focus({ preventScroll: true })
    refreshedInput.setSelectionRange(cursorPosition, cursorPosition)
  })
}

function updateStockViewMode() {
  if (!stockCardScreen) return
  const isLiveMode = stockGameRunning || stockGameFinished
  stockCardScreen.classList.toggle('stock-view-setup', !isLiveMode)
  stockCardScreen.classList.toggle('stock-view-live', isLiveMode)
}

function updateStockDraftField(playerId, slotIndex, field, value) {
  const entry = getStockDraftEntryByPlayerId(playerId)
  if (!entry.slots[slotIndex]) return

  if (field === 'stockId') {
    entry.slots[slotIndex].stockId = String(value || '')
    if (!entry.slots[slotIndex].stockId) {
      entry.slots[slotIndex].amount = 0
    }
  }

  if (field === 'amount') {
    entry.slots[slotIndex].amount = manwonToWon(value)
  }

  saveStockDraftEntry(playerId, entry)
  renderStockGame()
}

function buildStockRoundPlayers() {
  return stockPlayers.map((player) => {
    const validation = getStockDraftValidation(player.id)
    const holdings = validation.positions.map((position, index) => {
      const stock = getStockMeta(position.stockId)
      const buyPrice = stock?.price || 1
      return {
        id: `${player.id}-holding-${index + 1}`,
        stockId: position.stockId,
        amount: position.amount,
        buyPrice,
        shares: position.amount / buyPrice,
        sold: false,
        realizedValue: 0,
        sellPrice: 0
      }
    })

    return {
      id: player.id,
      label: player.label,
      cash: 0,
      holdings
    }
  })
}

function getStockEventText(stock, changePct) {
  if (stock.id === 'coin') {
    if (changePct >= 0.03) return '코인 매수세 폭발'
    if (changePct <= -0.03) return '코인 급락 경보'
  }

  if (stock.id === 'tech') {
    if (changePct >= 0.018) return '기술 테마 강세'
    if (changePct <= -0.018) return '차익 실현 매물 출회'
  }

  if (stock.id === 'medical') {
    if (changePct >= 0.012) return '방어주 선호 유입'
    if (changePct <= -0.012) return '차분한 조정'
  }

  if (stock.id === 'beauty') {
    if (changePct >= 0.017) return '뷰티 바이럴 확산'
    if (changePct <= -0.017) return '유행 식는 중'
  }

  if (stock.id === 'leisure') {
    if (changePct >= 0.017) return '여가 수요 급증'
    if (changePct <= -0.017) return '소비 심리 위축'
  }

  if (stock.id === 'food') {
    if (changePct >= 0.01) return '필수소비재 방어력 발동'
    if (changePct <= -0.01) return '수급 조정 구간'
  }

  return changePct >= 0 ? '완만한 상승' : '완만한 하락'
}

function updateSingleStockTick(stock, tickIndex) {
  const cycleWave = Math.sin(tickIndex * 0.32 + stock.cycleSeed) * stock.cycleStrength
  const pulse = Math.cos(tickIndex * 0.18 + stock.pulseSeed) * stock.cycleStrength * 0.6
  const noise = rand(-stock.volatility, stock.volatility)
  stock.momentum = clampValue(stock.momentum * 0.74 + cycleWave * 0.8 + pulse * 0.4 + noise * 0.45, -0.08, 0.08)

  let shock = 0
  if (Math.random() < stock.shockChance) {
    shock = rand(-stock.shockScale, stock.shockScale)
    stock.eventCooldown = 3
  } else if (stock.eventCooldown > 0) {
    stock.eventCooldown -= 1
  }

  const changePct = stock.drift + stock.momentum + noise + shock
  const prevPrice = stock.price
  const nextPrice = Math.max(1000, Math.round(prevPrice * (1 + changePct)))
  stock.price = nextPrice
  stock.lastChangeValue = nextPrice - prevPrice
  stock.lastChangePct = prevPrice ? stock.lastChangeValue / prevPrice : 0
  if (Math.abs(stock.lastChangePct) >= 0.032) {
    playThrottledSfx(stock.lastChangePct > 0 ? 'stockUp' : 'stockCrash', stock.lastChangePct > 0 ? 300 : 420)
  } else if (Math.abs(stock.lastChangePct) >= 0.014) {
    playThrottledSfx(stock.lastChangePct > 0 ? 'stockUp' : 'stockDown', stock.lastChangePct > 0 ? 300 : 300)
  } else {
    playThrottledSfx('stockTick', SFX_THROTTLE_MS.stockTick)
  }
  stock.eventText = getStockEventText(stock, stock.lastChangePct)
  stock.history.push(nextPrice)
  if (stock.history.length > STOCK_HISTORY_LENGTH) {
    stock.history.shift()
  }
}

function finalizeStockAutoSell() {
  stockPlayers.forEach((player) => {
    player.holdings.forEach((holding) => {
      if (holding.sold) return
      const value = getStockHoldingValue(holding)
      player.cash += value
      holding.sold = true
      holding.realizedValue = value
      holding.sellPrice = getStockMeta(holding.stockId)?.price || holding.buyPrice
    })
  })
}

function showStockResultsPopup() {
  const ranking = getStockRanking()
  const html = `
    <div class="stock-results-popup-list">
      ${ranking
        .map((player, index) => {
          const asset = getStockPlayerAsset(player)
          const profit = getStockPlayerProfit(player)
          return `
            <div class="stock-results-popup-item">
              <div class="stock-results-popup-rank">${index + 1}위</div>
              <strong>${escapeHtml(player.label)}</strong>
              <span>최종 자산 ${formatStockMoney(asset)}</span>
              <em class="${profit >= 0 ? 'is-profit' : 'is-loss'}">${formatStockSignedMoney(profit)}</em>
            </div>
          `
        })
        .join('')}
    </div>
  `

  showPopup('주식게임 최종 순위', html, { icon: '🏆', allowHtml: true, popupClass: 'stock-results-popup' })
}

function finishStockGame() {
  if (stockGameFinished) return
  if (stockGameInterval) {
    clearInterval(stockGameInterval)
    stockGameInterval = null
  }

  stockGameRunning = false
  stockGameFinished = true
  stockElapsedMs = stockDurationSeconds * 1000
  stockLogicAccumulatorMs = 0
  stockLastSchedulerAt = 0
  stockLastRenderAt = 0
  finalizeStockAutoSell()
  setStockInputLock(false)
  setStockSetupLock(false)
  updateStockStatus('게임 종료! 최종 자산이 자동으로 정산됐어.')
  playSfx('stockFinal')
  renderStockGame()
  showStockResultsPopup()
}

function tickStockGame() {
  if (!stockGameRunning) return

  const now = performance.now()
  const elapsedSinceScheduler = stockLastSchedulerAt
    ? Math.min(1000, Math.max(0, now - stockLastSchedulerAt))
    : STOCK_SCHEDULER_INTERVAL_MS
  stockLastSchedulerAt = now
  stockLogicAccumulatorMs += elapsedSinceScheduler

  while (stockLogicAccumulatorMs >= STOCK_TICK_MS && stockElapsedMs < stockDurationSeconds * 1000) {
    stockLogicAccumulatorMs -= STOCK_TICK_MS
    stockElapsedMs += STOCK_TICK_MS
    const tickIndex = Math.floor(stockElapsedMs / STOCK_TICK_MS)
    stockMarket.forEach((stock) => updateSingleStockTick(stock, tickIndex))
  }

  if (!stockLastRenderAt || now - stockLastRenderAt >= STOCK_RENDER_INTERVAL_MS) {
    stockLastRenderAt = now
    renderStockBoard()
    renderStockPlayerSummary()
    renderStockPortfolio()
    renderStockRanking()
    renderStockTimer()
  }

  if (stockElapsedMs >= stockDurationSeconds * 1000) {
    finishStockGame()
  }
}

function startStockGame() {
  if (stockGameRunning) return
  if (!stockConfigInput) return

  const parsed = parseStockConfigToPlayers(stockConfigInput.value)
  if (parsed.status !== 'OK') {
    handleStockParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  if (parsed.players.length < 2) {
    showMinParticipantsPopup(STOCK_MAX_PLAYERS)
    return
  }

  setStockPlayers(parsed.players)

  const invalidPlayer = stockPlayers.find((player) => !getStockDraftValidation(player.id).valid)
  if (invalidPlayer) {
    setStockTurnByPlayerId(invalidPlayer.id)
    showPopup('투자 준비 확인', `${invalidPlayer.label}의 투자 구성이 아직 완성되지 않았어. 종목 카드를 고르고 N만원 단위로 시드머니 100만원을 모두 채워줘.`)
    return
  }

  stockPlayers = buildStockRoundPlayers()
  stockGameRunning = true
  stockGameFinished = false
  stockElapsedMs = 0
  stockLogicAccumulatorMs = 0
  stockLastSchedulerAt = performance.now()
  stockLastRenderAt = 0
  setStockInputLock(true)
  setStockSetupLock(true)
  updateStockStatus('실시간 변동 시작! 중간 매도 없이 끝까지 지켜보는 관찰형 주식게임이야.')
  playSfx('stockBell')
  renderStockGame()

  if (stockGameInterval) {
    clearInterval(stockGameInterval)
  }
  stockGameInterval = setInterval(tickStockGame, STOCK_SCHEDULER_INTERVAL_MS)
}

function sellStockHolding(playerId, stockId) {
  if (!stockGameRunning) return
  const player = stockPlayers.find((item) => item.id === playerId)
  if (!player) return

  const holding = player.holdings.find((item) => item.stockId === stockId)
  if (!holding || holding.sold) return

  const value = getStockHoldingValue(holding)
  player.cash += value
  holding.sold = true
  holding.realizedValue = value
  holding.sellPrice = getStockMeta(holding.stockId)?.price || holding.buyPrice

  updateStockStatus(`${player.label}이(가) ${getStockMeta(stockId)?.name || stockId}을(를) ${formatStockMoney(value)}에 매도했다.`)
  playSfx('stockBell')
  renderStockBoard()
  renderStockPortfolio()
  renderStockRanking()
}

function stopStockGame(options = {}) {
  const { preserveSetup = true } = options
  if (stockGameInterval) {
    clearInterval(stockGameInterval)
    stockGameInterval = null
  }

  stockGameRunning = false
  stockLogicAccumulatorMs = 0
  stockLastSchedulerAt = 0
  stockLastRenderAt = 0

  if (!preserveSetup) {
    stockGameFinished = false
    stockElapsedMs = 0
    stockPlayers = []
    stockDrafts = new Map()
    regenerateStockMarket()
  }

  renderStockTimer()
}

function shuffleStockParticipants() {
  if (!stockConfigInput || stockGameRunning) return

  const parsed = parseStockConfigToPlayers(stockConfigInput.value)
  if (parsed.status !== 'OK') {
    handleStockParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  const shuffled = shuffleArray(parsed.players)
  stockConfigInput.value = shuffled.map((player) => player.label).join(', ')
  setStockPlayers(shuffled)
  resetStockDrafts()
  regenerateStockMarket()
  renderStockGame()
  playSfx('shuffle')
  updateStockStatus('참가자 순서와 주식 시세를 새로 셔플했어.')
}

function resetStockGame() {
  stopStockGame({ preserveSetup: true })
  stockGameFinished = false
  stockElapsedMs = 0
  setStockInputLock(false)
  setStockSetupLock(false)

  if (stockConfigInput) {
    const parsed = parseStockConfigToPlayers(stockConfigInput.value)
    if (parsed.status === 'OK') {
      setStockPlayers(parsed.players)
    } else {
      stockConfigInput.value = '홍길동, 김아무개'
      const fallbackParsed = parseStockConfigToPlayers(stockConfigInput.value)
      if (fallbackParsed.status === 'OK') {
        setStockPlayers(fallbackParsed.players)
      }
    }
  }

  resetStockDrafts()
  regenerateStockMarket()
  renderStockGame()
  updateStockStatus('리셋 완료. 종목 카드를 다시 고르고 N만원 단위로 새롭게 배분해줘.')
}

function startRace() {
  if (raceRunning && !raceFinished) return
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

  const parsedOrderKey = parsed.horses.map((horse) => horse.label).join('||')
  const currentOrderKey = raceHorses.map((horse) => horse.label).join('||')

  if (raceHorses.length && parsedOrderKey === currentOrderKey) {
    syncRaceInputToCurrentOrder()
  } else {
    setRaceHorses(parsed.horses)
    syncRaceInputToCurrentOrder()
  }

  renderRacePreview()
  resetRaceHorseStates()

  raceRunning = true
  raceFinished = false
  raceLastTimestamp = 0
  raceElapsedMs = 0
  setRaceInputLock(true)
  setRaceShuffleLock(true)

  playSfx('raceStart')
  addRaceCommentary('게이트 오픈, 경주가 시작되었습니다! 셔플한 레인 순서와 지정 색상 그대로 출발합니다.')

  scheduleRaceEventLoop()
  scheduleRaceCommentaryLoop()
  raceAnimationFrame = requestAnimationFrame(raceFrame)
}
