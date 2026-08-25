(function installWeightedWheel(global) {
  const ITEMS_STORAGE_KEY = 'roulette-basic-wheel-items-v1'
  const HISTORY_STORAGE_KEY = 'roulette-basic-wheel-history-v1'
  const MAX_ITEMS = 50
  const MAX_HISTORY = 50
  const TWO_PI = Math.PI * 2
  const SPIN_ACCELERATION_RATIO = 0.12
  const SPIN_CRUISE_RATIO = 0.28
  const SPIN_DECELERATION_RATIO = 0.60
  const MOBILE_SPIN_ACCELERATION_RATIO = 0.10
  const MOBILE_SPIN_CRUISE_RATIO = 0.26
  const MOBILE_SPIN_DECELERATION_RATIO = 0.64
  const COLORS = ['#75c9f2', '#8edfcf', '#ffd56f', '#ff9f85', '#b9a7f4', '#f38db0', '#86d7a5', '#8caef4', '#efb76f', '#8dd7dc', '#d49ce5', '#ffbd91']
  let initialized = false
  let running = false
  let animationFrame = null
  let currentRotation = 0
  let currentItems = []
  let lastWinner = null
  let history = []
  let usedSavedItems = false
  let followsRoster = false

  function getElements() {
    return {
      input: document.getElementById('wheelItemsInput'),
      autoRemove: document.getElementById('wheelAutoRemoveCheckbox'),
      useRoster: document.getElementById('wheelUseRosterBtn'),
      spin: document.getElementById('wheelSpinBtn'),
      center: document.getElementById('wheelCenterButton'),
      respin: document.getElementById('wheelRespinnerBtn'),
      remove: document.getElementById('wheelRemoveWinnerBtn'),
      status: document.getElementById('wheelInputStatus'),
      weight: document.getElementById('wheelTotalWeightBadge'),
      canvas: document.getElementById('wheelCanvas'),
      resultCard: document.getElementById('wheelResultCard'),
      result: document.getElementById('wheelResultText'),
      history: document.getElementById('wheelHistoryList'),
      clearHistory: document.getElementById('wheelClearHistoryBtn')
    }
  }

  function normalizeAngle(value) {
    const normalized = value % TWO_PI
    return normalized < 0 ? normalized + TWO_PI : normalized
  }

  function isMobileSpinEnvironment() {
    if (global.RandomRouletteRegistry?.isPhoneLikeDevice?.()) return true
    const shortSide = Math.min(Number(global.innerWidth || 0), Number(global.innerHeight || 0))
    const coarsePointer = global.matchMedia?.('(pointer: coarse)')?.matches === true
    return shortSide > 0 && shortSide <= 820 && (coarsePointer || Number(global.innerWidth || 0) <= 600)
  }

  function getSpinMotionProfile(overrides = {}) {
    const reduceMotion = typeof overrides.reduceMotion === 'boolean'
      ? overrides.reduceMotion
      : global.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true
    const mobile = typeof overrides.mobile === 'boolean' ? overrides.mobile : isMobileSpinEnvironment()
    if (reduceMotion) {
      return {
        duration: 180,
        minTurns: 0,
        mobile,
        acceleration: SPIN_ACCELERATION_RATIO,
        cruise: SPIN_CRUISE_RATIO,
        deceleration: SPIN_DECELERATION_RATIO
      }
    }
    return mobile
      ? {
          duration: 8200,
          minTurns: 11,
          mobile: true,
          acceleration: MOBILE_SPIN_ACCELERATION_RATIO,
          cruise: MOBILE_SPIN_CRUISE_RATIO,
          deceleration: MOBILE_SPIN_DECELERATION_RATIO
        }
      : {
          duration: 6200,
          minTurns: 9,
          mobile: false,
          acceleration: SPIN_ACCELERATION_RATIO,
          cruise: SPIN_CRUISE_RATIO,
          deceleration: SPIN_DECELERATION_RATIO
        }
  }

  // 모바일은 감속 구간을 더 길게 배분해 작은 화면에서도 정지 순간이 급하게 느껴지지 않게 한다.
  function getSpinEasedProgress(rawProgress, motionProfile = {}) {
    const progress = Math.max(0, Math.min(1, Number(rawProgress) || 0))
    const acceleration = motionProfile.acceleration ?? SPIN_ACCELERATION_RATIO
    const cruise = motionProfile.cruise ?? SPIN_CRUISE_RATIO
    const deceleration = motionProfile.deceleration ?? SPIN_DECELERATION_RATIO
    const totalArea = acceleration / 2 + cruise + deceleration / 2

    if (progress < acceleration) {
      return (progress * progress / (2 * acceleration)) / totalArea
    }
    if (progress < acceleration + cruise) {
      return (acceleration / 2 + progress - acceleration) / totalArea
    }

    const phaseProgress = (progress - acceleration - cruise) / deceleration
    const decelerationArea = deceleration * (phaseProgress - phaseProgress * phaseProgress / 2)
    return Math.min(1, (acceleration / 2 + cruise + decelerationArea) / totalArea)
  }

  function setCanvasSpinTransform(canvas, delta) {
    if (!canvas) return false
    canvas.classList.add('is-spinning')
    canvas.style.transform = `rotate(${delta}rad)`
    return true
  }

  function clearCanvasSpinTransform(canvas) {
    if (!canvas) return
    canvas.style.transform = ''
    canvas.classList.remove('is-spinning')
  }

  function parseItems(rawText) {
    const source = String(rawText || '').trim()
    if (!source) return { ok: false, reason: '룰렛 항목을 입력해줘.', items: [] }
    const rows = source.includes('\n') ? source.split(/\n+/) : source.split(/,+/)
    const items = []
    const seen = new Set()

    for (const row of rows) {
      const text = row.trim()
      if (!text) continue
      const match = text.match(/^(.*?)\s*(?:\||\*)\s*(\d+(?:\.\d+)?)\s*$/)
      const label = (match ? match[1] : text).trim()
      const weight = match ? Number(match[2]) : 1
      const key = label.toLocaleLowerCase('ko-KR')

      if (!label) return { ok: false, reason: '비어 있는 항목 이름을 확인해줘.', items }
      if (label.length > 40) return { ok: false, reason: `“${label.slice(0, 12)}…” 항목은 40자 이내로 줄여줘.`, items }
      if (!Number.isFinite(weight) || weight <= 0 || weight > 100000) {
        return { ok: false, reason: `“${label}”의 가중치는 0보다 크고 100,000 이하여야 해.`, items }
      }
      if (seen.has(key)) return { ok: false, reason: `중복된 항목 “${label}”을 확인해줘.`, items }
      seen.add(key)
      items.push({ label, weight })
    }

    if (items.length < 2) return { ok: false, reason: '룰렛에는 최소 2개의 항목이 필요해.', items }
    if (items.length > MAX_ITEMS) return { ok: false, reason: `룰렛 항목은 최대 ${MAX_ITEMS}개까지 가능해.`, items }
    return { ok: true, items }
  }

  function serializeItems(items) {
    return items.map((item) => `${item.label} | ${Number(item.weight)}`).join('\n')
  }

  function loadSavedItems() {
    try {
      const saved = JSON.parse(localStorage.getItem(ITEMS_STORAGE_KEY) || 'null')
      if (!Array.isArray(saved)) return null
      const parsed = parseItems(serializeItems(saved))
      if (!parsed.ok) return null
      usedSavedItems = true
      return parsed.items
    } catch (error) {
      return null
    }
  }

  function saveItems(items) {
    try {
      localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
      usedSavedItems = true
    } catch (error) {}
  }

  function loadHistory() {
    try {
      const saved = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || '[]')
      history = Array.isArray(saved) ? saved.slice(0, MAX_HISTORY) : []
    } catch (error) {
      history = []
    }
  }

  function saveHistory() {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)))
    } catch (error) {}
  }

  function renderHistory() {
    const list = getElements().history
    if (!list) return
    list.replaceChildren()

    if (!history.length) {
      const empty = document.createElement('li')
      empty.className = 'wheel-history-empty'
      empty.textContent = '아직 저장된 추첨 기록이 없어.'
      list.appendChild(empty)
      return
    }

    history.forEach((record, index) => {
      const item = document.createElement('li')
      const rank = document.createElement('span')
      const winner = document.createElement('strong')
      const time = document.createElement('time')
      rank.textContent = String(index + 1)
      winner.textContent = `${record.winner} · 가중치 ${record.selectedWeight}/${record.totalWeight}`
      const date = new Date(record.createdAt)
      time.dateTime = date.toISOString()
      time.textContent = new Intl.DateTimeFormat('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date)
      item.append(rank, winner, time)
      list.appendChild(item)
    })
  }

  function fitText(context, text, maxWidth) {
    if (context.measureText(text).width <= maxWidth) return text
    let clipped = text
    while (clipped.length > 2 && context.measureText(`${clipped}…`).width > maxWidth) clipped = clipped.slice(0, -1)
    return `${clipped}…`
  }

  function renderWheel(items = currentItems, rotation = currentRotation) {
    const canvas = getElements().canvas
    if (!canvas || !items.length) return
    const rect = canvas.getBoundingClientRect()
    const cssSize = Math.max(300, Math.min(rect.width || 720, rect.height || 720))
    const dpr = Math.min(global.devicePixelRatio || 1, 2)
    const pixelSize = Math.round(cssSize * dpr)
    if (canvas.width !== pixelSize || canvas.height !== pixelSize) {
      canvas.width = pixelSize
      canvas.height = pixelSize
    }

    const context = canvas.getContext('2d')
    if (!context) return
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    context.clearRect(0, 0, cssSize, cssSize)
    const center = cssSize / 2
    const radius = center - 12
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
    const isDark = document.documentElement.classList.contains('theme-dark')
    let cursor = -Math.PI / 2 + rotation

    items.forEach((item, index) => {
      const span = (item.weight / totalWeight) * TWO_PI
      context.beginPath()
      context.moveTo(center, center)
      context.arc(center, center, radius, cursor, cursor + span)
      context.closePath()
      context.fillStyle = COLORS[index % COLORS.length]
      context.fill()
      context.lineWidth = Math.max(2, cssSize * 0.004)
      context.strokeStyle = isDark ? 'rgba(20,26,34,.78)' : 'rgba(255,255,255,.92)'
      context.stroke()

      if (span > 0.045) {
        context.save()
        context.translate(center, center)
        context.rotate(cursor + span / 2)
        const fontSize = Math.max(11, Math.min(20, cssSize * (items.length > 18 ? 0.021 : 0.03)))
        context.font = `900 ${fontSize}px Pretendard, system-ui, sans-serif`
        context.textAlign = 'right'
        context.textBaseline = 'middle'
        context.fillStyle = '#17384f'
        const maxWidth = radius * 0.52
        const label = fitText(context, item.label, maxWidth)
        context.fillText(label, radius * 0.86, 0, maxWidth)
        context.restore()
      }
      cursor += span
    })

    context.beginPath()
    context.arc(center, center, radius, 0, TWO_PI)
    context.lineWidth = Math.max(6, cssSize * 0.012)
    context.strokeStyle = isDark ? '#dce9f1' : '#ffffff'
    context.stroke()
  }

  function setControlsLocked(locked) {
    const elements = getElements()
    running = locked
    if (elements.input) elements.input.disabled = locked
    if (elements.spin) elements.spin.disabled = locked
    if (elements.center) elements.center.disabled = locked
    if (elements.useRoster) elements.useRoster.disabled = locked
    if (elements.respin) elements.respin.disabled = locked || !lastWinner
    if (elements.remove) elements.remove.disabled = locked || !lastWinner
    global.RandomRouletteWakeLock?.sync?.(locked)
  }

  function updatePreview({ persist = true } = {}) {
    const elements = getElements()
    const parsed = parseItems(elements.input?.value || '')
    if (!parsed.ok) {
      if (elements.status) elements.status.textContent = parsed.reason
      if (elements.spin) elements.spin.disabled = true
      if (elements.center) elements.center.disabled = true
      return parsed
    }

    currentItems = parsed.items
    const totalWeight = currentItems.reduce((sum, item) => sum + item.weight, 0)
    if (elements.status) elements.status.textContent = `${currentItems.length}개 항목 확인 완료. 결과 계산과 애니메이션은 서로 분리되어 실행돼.`
    if (elements.weight) elements.weight.textContent = `총 가중치 ${Number(totalWeight.toFixed(2))}`
    if (elements.spin) elements.spin.disabled = running
    if (elements.center) elements.center.disabled = running
    if (persist) saveItems(currentItems)
    requestAnimationFrame(() => {
      if (!running) renderWheel()
    })
    return parsed
  }

  function getSelectedCenterOffset(items, selectedIndex) {
    const total = items.reduce((sum, item) => sum + item.weight, 0)
    const before = items.slice(0, selectedIndex).reduce((sum, item) => sum + item.weight, 0)
    return ((before + items[selectedIndex].weight / 2) / total) * TWO_PI
  }

  function recordOutcome(outcome) {
    history.unshift({
      winner: outcome.winner,
      selectedWeight: outcome.selectedWeight,
      totalWeight: Number(outcome.totalWeight.toFixed(2)),
      seed: outcome.seed,
      createdAt: outcome.createdAt
    })
    history = history.slice(0, MAX_HISTORY)
    saveHistory()
    renderHistory()
  }

  function finishSpin(outcome) {
    const elements = getElements()
    lastWinner = outcome
    setControlsLocked(false)
    if (elements.result) elements.result.textContent = outcome.winner
    if (elements.resultCard) {
      elements.resultCard.classList.remove('is-winner')
      void elements.resultCard.offsetWidth
      elements.resultCard.classList.add('is-winner')
    }
    if (elements.status) elements.status.textContent = `당첨 결과: ${outcome.winner} · seed ${outcome.seed}`
    if (elements.respin) elements.respin.disabled = false
    if (elements.remove) elements.remove.disabled = false
    recordOutcome(outcome)
    if (typeof playSfx === 'function') playSfx('stockFinal')

    if (elements.autoRemove?.checked) {
      removeLastWinner({ announce: false })
    }
  }

  function spin() {
    if (running) return
    const parsed = updatePreview()
    if (!parsed.ok) {
      showPopup('룰렛 항목 확인', parsed.reason, { icon: '⚠️' })
      return
    }

    let outcome
    try {
      outcome = global.RandomRouletteEngine.calculateWeightedOutcome(parsed.items)
    } catch (error) {
      showPopup('룰렛 계산 오류', '항목과 가중치를 다시 확인해줘.', { icon: '⚠️' })
      return
    }

    setControlsLocked(true)
    lastWinner = null
    const elements = getElements()
    if (elements.result) elements.result.textContent = '룰렛 회전 중…'
    if (elements.status) elements.status.textContent = '당첨 결과 계산 완료. 원판 애니메이션으로 결과를 보여주는 중이야.'
    if (typeof playSfx === 'function') playSfx('rouletteSpin')

    const centerOffset = getSelectedCenterOffset(parsed.items, outcome.selectedIndex)
    const desiredModulo = normalizeAngle(-centerOffset)
    const currentModulo = normalizeAngle(currentRotation)
    const alignmentDelta = normalizeAngle(desiredModulo - currentModulo)
    const startRotation = currentRotation
    const motionProfile = getSpinMotionProfile()
    const visualTurns = motionProfile.minTurns ? Math.max(outcome.turns, motionProfile.minTurns) : 0
    const targetRotation = currentRotation + visualTurns * TWO_PI + alignmentDelta
    const duration = motionProfile.duration
    const startedAt = performance.now()
    const canvas = elements.canvas
    renderWheel(parsed.items, startRotation)
    setCanvasSpinTransform(canvas, 0)

    const frame = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration)
      const eased = getSpinEasedProgress(progress, motionProfile)
      currentRotation = startRotation + (targetRotation - startRotation) * eased
      if (!setCanvasSpinTransform(canvas, currentRotation - startRotation)) renderWheel(parsed.items, currentRotation)
      if (progress < 1 && running) {
        animationFrame = requestAnimationFrame(frame)
        return
      }
      animationFrame = null
      currentRotation = targetRotation
      renderWheel(parsed.items, currentRotation)
      clearCanvasSpinTransform(canvas)
      finishSpin(outcome)
    }

    animationFrame = requestAnimationFrame(frame)
  }

  function removeLastWinner({ announce = true } = {}) {
    if (!lastWinner) return false
    const winner = lastWinner.winner
    const nextItems = currentItems.filter((item) => item.label !== winner)
    if (nextItems.length < 2) {
      if (announce) showPopup('당첨자 제거 불가', '룰렛에는 최소 2개의 항목이 남아 있어야 해.', { icon: '⚠️' })
      return false
    }

    const elements = getElements()
    currentItems = nextItems
    followsRoster = false
    if (elements.input) elements.input.value = serializeItems(nextItems)
    saveItems(nextItems)
    lastWinner = null
    if (elements.remove) elements.remove.disabled = true
    if (elements.respin) elements.respin.disabled = false
    if (elements.status) elements.status.textContent = `“${winner}” 항목을 제거했어. 남은 항목은 ${nextItems.length}개야.`
    renderWheel(nextItems, currentRotation)
    return true
  }

  function useRoster() {
    const rosterNames = global.RandomRouletteRoster?.getNames?.() || []
    if (rosterNames.length < 2) {
      showPopup('공용 목록이 비어 있어', '목록을 만들거나 현재 룰렛 입력창에 항목을 직접 적어줘.', { icon: '☷' })
      global.RandomRouletteRoster?.open?.()
      return false
    }
    const elements = getElements()
    currentItems = rosterNames.map((label) => ({ label, weight: 1 }))
    followsRoster = true
    if (elements.input) elements.input.value = serializeItems(currentItems)
    lastWinner = null
    saveItems(currentItems)
    updatePreview({ persist: false })
    return true
  }

  function cancelSpin() {
    if (animationFrame) cancelAnimationFrame(animationFrame)
    animationFrame = null
    if (running) {
      const elements = getElements()
      renderWheel(currentItems, currentRotation)
      clearCanvasSpinTransform(elements.canvas)
      setControlsLocked(false)
      if (elements.status) elements.status.textContent = '진행 중이던 룰렛을 종료했어.'
    }
  }

  function clearHistory() {
    history = []
    saveHistory()
    renderHistory()
  }

  function init() {
    if (initialized) return
    initialized = true
    const elements = getElements()
    const savedItems = loadSavedItems()
    if (savedItems?.length && elements.input) {
      currentItems = savedItems
      elements.input.value = serializeItems(savedItems)
    }
    loadHistory()
    renderHistory()
    elements.input?.addEventListener('input', () => {
      followsRoster = false
      updatePreview()
    })
    elements.spin?.addEventListener('click', spin)
    elements.center?.addEventListener('click', spin)
    elements.respin?.addEventListener('click', spin)
    elements.remove?.addEventListener('click', () => removeLastWinner())
    elements.useRoster?.addEventListener('click', useRoster)
    elements.clearHistory?.addEventListener('click', clearHistory)
    global.addEventListener('roulette-roster-change', () => {
      if (followsRoster || !usedSavedItems) useRoster()
    })
    global.addEventListener('resize', () => requestAnimationFrame(() => {
      if (!running) renderWheel()
    }), { passive: true })
    new MutationObserver(() => requestAnimationFrame(() => {
      if (!running) renderWheel()
    }))
      .observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    updatePreview({ persist: Boolean(savedItems) })
  }

  function ensureReady() {
    init()
    if (!usedSavedItems && global.RandomRouletteRoster?.hasRoster?.()) useRoster()
    requestAnimationFrame(() => renderWheel())
  }

  global.RandomRouletteWheel = Object.freeze({
    init,
    ensureReady,
    spin,
    useRoster,
    cancelSpin,
    isRunning: () => running,
    parseItems,
    getSpinMotionProfile,
    getSpinEasedProgress
  })
})(window)
