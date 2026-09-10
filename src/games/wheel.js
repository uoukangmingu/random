(function installWeightedWheel(global) {
  const ITEMS_STORAGE_KEY = 'roulette-basic-wheel-items-v1'
  const HISTORY_STORAGE_KEY = 'roulette-basic-wheel-history-v1'
  const OPTIONS_STORAGE_KEY = 'roulette-basic-wheel-options-v1'
  const DRAFT_STORAGE_KEY = 'roulette-basic-wheel-draft-v1'
  const SPEED_STORAGE_KEY = 'roulette-basic-wheel-speed-v1'
  const MAX_ITEMS = 50
  const MAX_HISTORY = 50
  const TWO_PI = Math.PI * 2
  const COLORS = ['#75c9f2', '#8edfcf', '#ffd56f', '#ff9f85', '#b9a7f4', '#f38db0', '#86d7a5', '#8caef4', '#efb76f', '#8dd7dc', '#d49ce5', '#ffbd91']
  let initialized = false
  let running = false
  let animationFrame = null
  let spinRunId = 0
  let currentRotation = 0
  let currentItems = []
  let lastWinner = null
  let history = []
  let usedSavedItems = false
  let followsRoster = false
  let cachedElements = null
  let previewFrame = null
  let saveTimer = null
  let fallbackFrame = null
  let lastSpinFrameAt = null
  let spinSession = null
  let motionTextures = null
  let speedMultiplier = 1
  let storageAvailable = true
  let resultVisualItems = null
  let resultVisualRotation = 0
  const historyDateFormat = new Intl.DateTimeFormat('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })

  function getElements() {
    return cachedElements || (cachedElements = {
      screen: document.getElementById('wheelScreen'),
      input: document.getElementById('wheelItemsInput'),
      autoRemove: document.getElementById('wheelAutoRemoveCheckbox'),
      speed: document.getElementById('wheelSpeedInput'),
      speedStatus: document.getElementById('wheelSpeedStatus'),
      useRoster: document.getElementById('wheelUseRosterBtn'),
      editItems: document.getElementById('wheelEditItemsBtn'),
      spin: document.getElementById('wheelSpinBtn'),
      center: document.getElementById('wheelCenterButton'),
      remove: document.getElementById('wheelRemoveWinnerBtn'),
      status: document.getElementById('wheelInputStatus'),
      weight: document.getElementById('wheelTotalWeightBadge'),
      canvas: document.getElementById('wheelCanvas'),
      motionCanvas: document.getElementById('wheelMotionCanvas'),
      resultCard: document.getElementById('wheelResultCard'),
      result: document.getElementById('wheelResultText'),
      resultNote: document.getElementById('wheelResultNote'),
      progress: document.getElementById('wheelSpinProgress'),
      progressFill: document.getElementById('wheelSpinProgressFill'),
      history: document.getElementById('wheelHistoryList'),
      historyCount: document.getElementById('wheelHistoryCount'),
      clearHistory: document.getElementById('wheelClearHistoryBtn')
    })
  }

  function queuePreview() {
    if (previewFrame !== null) return
    previewFrame = requestAnimationFrame(() => {
      previewFrame = null
      if (!running && !document.hidden) renderWheel()
    })
  }

  function flushItemSave() {
    if (saveTimer === null) return
    global.clearTimeout(saveTimer)
    saveTimer = null
    saveItems(currentItems)
  }

  function scheduleItemSave() {
    global.clearTimeout(saveTimer)
    saveTimer = global.setTimeout(flushItemSave, 220)
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

  function parseSpeedMultiplier(value) {
    const number = typeof value === 'string' && !value.trim() ? NaN : Number(value)
    return Number.isFinite(number) && number >= .5 && number <= 10 ? number : null
  }

  function updateSpeed({ persist = true } = {}) {
    const elements = getElements()
    const value = parseSpeedMultiplier(elements.speed?.value ?? speedMultiplier)
    const valid = value !== null
    elements.speed?.setAttribute('aria-invalid', String(!valid))
    elements.speedStatus?.classList.toggle('is-error', !valid)
    let message = '0.5~10 사이의 숫자를 입력해줘.'
    if (valid) {
      speedMultiplier = value
      message = running ? `현재 ${value}배 · 회전 중에도 바로 적용돼.` : `현재 ${value}배 · 회전 중에도 조절할 수 있어.`
      if (spinSession && !spinSession.stopRequested && value !== spinSession.profile.speedMultiplier) {
        spinSession.profile = getSpinMotionProfile({ speedMultiplier: value })
        spinSession.ramp = {
          startedAt: spinSession.elapsedMs, startRotation: currentRotation,
          startSpeed: spinSession.currentSpeed, targetSpeed: spinSession.profile.maxSpeed
        }
        if (elements.status) elements.status.textContent = `${value}배 속도 적용 중 · 원하는 순간 STOP을 눌러줘.`
      }
      if (persist) {
        try { localStorage.setItem(SPEED_STORAGE_KEY, String(value)) }
        catch (error) { message = `현재 ${value}배 · 이 기기에 설정을 저장하지 못했어.` }
      }
    }
    if (elements.speedStatus) elements.speedStatus.textContent = message
    if (!running) {
      const disabled = !valid || !parseItems(elements.input?.value || '').ok
      if (elements.spin) elements.spin.disabled = disabled
      if (elements.center) elements.center.disabled = disabled
    }
    return valid
  }

  function getSpinMotionProfile(overrides = {}) {
    const reducedMotion = typeof overrides.reduceMotion === 'boolean'
      ? overrides.reduceMotion
      : global.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true
    const mobile = typeof overrides.mobile === 'boolean' ? overrides.mobile : isMobileSpinEnvironment()
    const multiplier = parseSpeedMultiplier(overrides.speedMultiplier ?? speedMultiplier) ?? 1
    return {
      mobile, reducedMotion, speedMultiplier: multiplier,
      // The user's explicit game-speed control takes precedence over ambient motion preferences.
      // Reduced-motion CSS still suppresses decorative effects elsewhere in the app.
      maxSpeed: TWO_PI * 14 * multiplier,
      accelerationMs: 260,
      stopDurationMs: 4800
    }
  }

  function getCruiseAngle(elapsedMs, profile) {
    return getSpeedRampMotion(elapsedMs, 0, profile.maxSpeed, profile.accelerationMs).distance
  }

  function getSpeedRampMotion(elapsedMs, startSpeed, targetSpeed, accelerationMs) {
    const seconds = Math.max(0, elapsedMs) / 1000
    const acceleration = accelerationMs / 1000
    const rampTime = Math.min(seconds, acceleration)
    const change = targetSpeed - startSpeed
    return {
      distance: startSpeed * rampTime + change * rampTime * rampTime / (2 * acceleration)
        + targetSpeed * Math.max(0, seconds - acceleration),
      speed: startSpeed + change * rampTime / acceleration
    }
  }

  function createStopPlan(rotation, desiredModulo, profile) {
    const alignment = normalizeAngle(desiredModulo - normalizeAngle(rotation))
    const preferredDistance = profile.maxSpeed * profile.stopDurationMs / 3000
    const turns = Math.max(1, Math.round((preferredDistance - alignment) / TWO_PI))
    const distance = turns * TWO_PI + alignment
    const durationMs = 3000 * distance / profile.maxSpeed
    return { startRotation: rotation, targetRotation: rotation + distance, distance, durationMs,
      initialSlope: profile.maxSpeed * durationMs / (1000 * distance) }
  }

  function getBrakeProgress(rawProgress, initialSlope = 3) {
    const p = Math.max(0, Math.min(1, rawProgress))
    // Hermite curve: preserve entry speed, land on the selected wedge with zero speed.
    return (-2 * p * p * p + 3 * p * p) + initialSlope * (p * p * p - 2 * p * p + p)
  }

  function setCanvasSpinTransform(canvas, delta) {
    if (!canvas) return false
    // Rotate cached textures; never redraw labels on every frame.
    canvas.style.transform = `rotate(${delta}rad)`
    const motionCanvas = getElements().motionCanvas
    if (motionCanvas && !motionCanvas.hidden) motionCanvas.style.transform = canvas.style.transform
    return true
  }

  function prepareMotionTextures(canvas) {
    motionTextures = null
    const overlay = getElements().motionCanvas
    if (!canvas || !overlay) return
    const size = Math.min(512, canvas.width)
    const base = document.createElement('canvas')
    const context = base.getContext?.('2d')
    if (!context || !overlay.getContext?.('2d')) return
    base.width = base.height = size
    context.drawImage(canvas, 0, 0, size, size)
    overlay.width = overlay.height = size
    motionTextures = { base, size, variants: new Map(), level: 0 }
  }

  function syncMotionTexture(speed) {
    if (!motionTextures) return
    // Temporal trails prevent very fast wheels from looking like slow, sharp snapshots.
    const turnsPerSecond = Math.max(0, speed) / TWO_PI
    const level = turnsPerSecond < 2 ? 0 : turnsPerSecond < 10 ? 1 : turnsPerSecond < 24 ? 2
      : turnsPerSecond < 50 ? 3 : turnsPerSecond < 90 ? 4 : 5
    if (level === motionTextures.level) return
    motionTextures.level = level
    const { canvas, motionCanvas } = getElements()
    if (level === 0) {
      canvas.style.opacity = ''
      motionCanvas.hidden = true
      return
    }
    const { size, base, variants } = motionTextures
    if (!variants.has(level)) {
      const texture = document.createElement('canvas')
      texture.width = texture.height = size
      const context = texture.getContext('2d')
      const sweep = [0, .24, .65, 1.4, 2.3, 3.2][level]
      const samples = 24
      context.globalCompositeOperation = 'lighter'
      context.globalAlpha = 1 / samples
      for (let i = 0; i < samples; i++) {
        context.save()
        context.translate(size / 2, size / 2)
        context.rotate(-sweep * i / (samples - 1))
        context.drawImage(base, -size / 2, -size / 2)
        context.restore()
      }
      variants.set(level, texture)
    }
    const context = motionCanvas.getContext('2d')
    context.clearRect(0, 0, size, size)
    context.drawImage(variants.get(level), 0, 0)
    motionCanvas.hidden = false
    canvas.style.opacity = '0'
  }

  function clearCanvasSpinTransform(canvas) {
    if (!canvas) return
    canvas.style.transform = ''
    canvas.style.opacity = ''
    canvas.classList.remove('is-spinning')
    const motionCanvas = getElements().motionCanvas
    if (motionCanvas) {
      motionCanvas.hidden = true
      motionCanvas.style.transform = ''
      motionCanvas.width = motionCanvas.height = 1
    }
    motionTextures = null
  }

  function finishVisualSpin({ canvas, items, targetRotation, outcome, runId }) {
    if (!running || runId !== spinRunId) return
    animationFrame = null
    currentRotation = normalizeAngle(targetRotation)
    resultVisualItems = items
    resultVisualRotation = currentRotation
    fallbackFrame = null
    spinSession = null
    renderWheel(items, currentRotation)
    clearCanvasSpinTransform(canvas)
    finishSpin(outcome)
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
      const match = text.match(/^(.*?)\s*(?:\||\*)\s*(\d+(?:\.\d+)?|\.\d+)\s*$/)
      if (/[|*]/.test(text) && !match) return { ok: false, reason: '가중치는 0보다 큰 숫자로 입력해줘. 예: 치킨 | 3', items }
      const label = (match ? match[1] : text).trim().normalize('NFC')
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
      localStorage.setItem(DRAFT_STORAGE_KEY, getElements().input?.value || '')
      usedSavedItems = true
      storageAvailable = true
    } catch (error) {
      storageAvailable = false
      const status = getElements().status
      if (status) status.textContent = '현재 창에서는 사용할 수 있지만, 항목을 이 기기에 저장하지 못했어.'
    }
  }

  function loadHistory() {
    try {
      const saved = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || '[]')
      history = Array.isArray(saved) ? saved.filter((record) =>
        record && typeof record.winner === 'string' && record.winner.length <= 40 &&
        Number.isFinite(record.selectedWeight) && record.selectedWeight > 0 &&
        Number.isFinite(record.totalWeight) && record.totalWeight >= record.selectedWeight &&
        Number.isFinite(record.createdAt) && Number.isFinite(new Date(record.createdAt).getTime())
      ).slice(0, MAX_HISTORY) : []
    } catch (error) {
      history = []
    }
  }

  function saveHistory() {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)))
    } catch (error) {
      storageAvailable = false
    }
  }

  function renderHistory() {
    const elements = getElements()
    const list = elements.history
    if (!list) return
    if (elements.historyCount) elements.historyCount.textContent = String(history.length)
    if (elements.clearHistory) elements.clearHistory.disabled = !history.length
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
      winner.textContent = record.winner
      const detail = document.createElement('small')
      const percentage = record.selectedWeight / record.totalWeight * 100
      detail.textContent = `당첨 확률 ${percentage < 0.01 ? '0.01% 미만' : `${Number(percentage.toFixed(2))}%`}`
      winner.appendChild(detail)
      const date = new Date(record.createdAt)
      time.dateTime = date.toISOString()
      time.textContent = historyDateFormat.format(date)
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

  function renderWheel(items = resultVisualItems || currentItems, rotation = resultVisualItems ? resultVisualRotation : currentRotation) {
    const { canvas, screen } = getElements()
    if (!canvas || document.hidden || (screen && !screen.classList.contains('active'))) return
    const rect = canvas.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const cssSize = Math.max(1, Math.min(rect.width, rect.height))
    const level = global.RandomRoulettePerformance?.profile?.qualityLevel
    const dpr = Math.min(global.devicePixelRatio || 1, level === 'low' ? 1.25 : level === 'balanced' ? 1.5 : 2)
    const pixelSize = Math.round(cssSize * dpr)
    if (canvas.width !== pixelSize || canvas.height !== pixelSize) {
      canvas.width = pixelSize
      canvas.height = pixelSize
    }

    const context = canvas.getContext('2d')
    if (!context) return
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    context.clearRect(0, 0, cssSize, cssSize)
    if (!items.length) return
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

  function updateSpinButtonState() {
    const elements = getElements()
    const stopping = running && Boolean(spinSession?.stopRequested)
    const spinning = running && !stopping
    const invalidSpeed = !running && parseSpeedMultiplier(elements.speed?.value ?? speedMultiplier) === null
    if (elements.speed) elements.speed.disabled = stopping
    if (elements.center) {
      elements.center.textContent = stopping ? '감속 중' : spinning ? 'STOP' : 'SPIN'
      elements.center.setAttribute('aria-label', stopping ? '원판 감속 중' : spinning ? 'STOP 원판 서서히 멈추기' : 'SPIN 원판 룰렛 돌리기')
      elements.center.disabled = stopping || invalidSpeed
      elements.center.classList.toggle('is-stop', spinning)
    }
    if (elements.spin) {
      elements.spin.textContent = stopping ? '멈추는 중…' : spinning ? 'STOP · 멈추기' : 'SPIN · 돌리기'
      elements.spin.disabled = stopping || invalidSpeed
      elements.spin.classList.toggle('is-stop', spinning)
    }
    elements.screen?.classList.toggle('wheel-is-running', running)
    elements.screen?.classList.toggle('wheel-is-cruising', spinning)
    elements.screen?.classList.toggle('wheel-is-stopping', stopping)
    if (elements.progress) elements.progress.hidden = !stopping
    if (!stopping && elements.progressFill) elements.progressFill.style.transform = 'scaleX(0)'
  }

  function setControlsLocked(locked) {
    const elements = getElements()
    running = locked
    for (const control of [elements.input, elements.useRoster, elements.autoRemove]) {
      if (control) control.disabled = locked
    }
    updateSpinButtonState()
    if (elements.remove) elements.remove.disabled = locked || !lastWinner || currentItems.length < 3
    global.RandomRouletteWakeLock?.sync?.(locked)
  }

  function updatePreview({ persist = true } = {}) {
    const elements = getElements()
    const parsed = parseItems(elements.input?.value || '')
    elements.input?.setAttribute('aria-invalid', String(!parsed.ok))
    elements.status?.classList.toggle('is-error', !parsed.ok)
    if (!parsed.ok) {
      currentItems = parsed.items
      if (persist) scheduleItemSave()
      if (elements.status) elements.status.textContent = parsed.reason
      if (elements.weight) elements.weight.textContent = '항목 확인'
      if (elements.spin) elements.spin.disabled = true
      if (elements.center) elements.center.disabled = true
      if (elements.remove) elements.remove.disabled = true
      queuePreview()
      return parsed
    }

    currentItems = parsed.items
    const totalWeight = currentItems.reduce((sum, item) => sum + item.weight, 0)
    if (elements.status) elements.status.textContent = `${currentItems.length}개 준비 완료. SPIN으로 돌리고 STOP으로 멈춰줘.`
    if (elements.weight) elements.weight.textContent = `총 가중치 ${Number(totalWeight.toFixed(2))}`
    const spinDisabled = running ? Boolean(spinSession?.stopRequested) : parseSpeedMultiplier(elements.speed?.value ?? speedMultiplier) === null
    if (elements.spin) elements.spin.disabled = spinDisabled
    if (elements.center) elements.center.disabled = spinDisabled
    if (elements.remove) elements.remove.disabled = running || !lastWinner || currentItems.length < 3
    if (persist) scheduleItemSave()
    queuePreview()
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
      totalWeight: outcome.totalWeight,
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
    if (elements.status) elements.status.textContent = currentItems.length < 3
      ? `“${outcome.winner}” 당첨! 항목이 2개 남아 같은 항목으로 다시 돌릴 수 있어.`
      : `“${outcome.winner}” 당첨! 한 번 더 돌리거나 당첨 항목을 제외할 수 있어.`
    if (elements.spin) elements.spin.textContent = 'SPIN · 한 번 더'
    if (elements.resultNote) elements.resultNote.textContent = '위쪽 화살표가 가리키는 항목이 당첨!'
    if (elements.remove) elements.remove.disabled = currentItems.length < 3
    recordOutcome(outcome)
    if (!storageAvailable && elements.status) elements.status.textContent = `“${outcome.winner}” 당첨! 기록을 이 기기에 저장하지 못했어.`
    if (typeof playSfx === 'function') playSfx('stockFinal')

    if (elements.autoRemove?.checked) {
      removeLastWinner({ announce: false })
    }
  }

  function requestStop() {
    if (!running || !spinSession || spinSession.stopRequested) return false
    spinSession.stopRequested = true
    updateSpinButtonState()
    const elements = getElements()
    if (elements.result) elements.result.textContent = '어디에 멈출까?'
    if (elements.resultNote) elements.resultNote.textContent = '서서히 멈추고 있어. 화살표 아래 당첨 항목을 확인해줘.'
    if (elements.status) elements.status.textContent = 'STOP! 천천히 멈출 때까지 기다려줘.'
    elements.progress?.setAttribute('aria-valuenow', '0')
    return true
  }

  function toggleSpin() {
    if (running) requestStop()
    else spin()
  }

  function spin() {
    if (running) return
    if (!updateSpeed()) {
      getElements().speed?.focus()
      return
    }
    const parsed = updatePreview()
    if (!parsed.ok) {
      showPopup('룰렛 항목 확인', parsed.reason, { icon: '⚠️' })
      return
    }
    flushItemSave()
    let outcome
    try {
      outcome = global.RandomRouletteEngine.calculateWeightedOutcome(parsed.items)
    } catch (error) {
      showPopup('룰렛 계산 오류', '항목과 가중치를 다시 확인해줘.', { icon: '⚠️' })
      return
    }

    resultVisualItems = null
    lastWinner = null
    const elements = getElements()
    const canvas = elements.canvas
    const profile = getSpinMotionProfile()
    const runId = ++spinRunId
    const startRotation = normalizeAngle(currentRotation)
    const desiredModulo = normalizeAngle(-getSelectedCenterOffset(parsed.items, outcome.selectedIndex))
    const session = {
      elapsedMs: 0, stopRequested: false, brake: null, profile, currentSpeed: 0,
      ramp: { startedAt: 0, startRotation, startSpeed: 0, targetSpeed: profile.maxSpeed }
    }
    spinSession = session
    setControlsLocked(true)
    if (elements.result) elements.result.textContent = '고속 회전 중'
    if (elements.resultNote) elements.resultNote.textContent = '원하는 순간 STOP을 누르면 서서히 멈춰.'
    if (elements.status) elements.status.textContent = `SPIN! ${profile.speedMultiplier}배 속도 · 원하는 순간 STOP을 눌러줘.`
    if (elements.speedStatus) elements.speedStatus.textContent = `현재 ${profile.speedMultiplier}배 · 회전 중에도 바로 적용돼.`
    elements.resultCard?.classList.remove('is-winner')
    if (typeof playSfx === 'function') playSfx('rouletteSpin')
    renderWheel(parsed.items, startRotation)
    prepareMotionTextures(canvas)
    canvas?.classList.add('is-spinning')
    setCanvasSpinTransform(canvas, 0)
    lastSpinFrameAt = performance.now()
    let lastPercent = -1
    const frame = (now) => {
      if (document.hidden || !running || runId !== spinRunId) { animationFrame = null; return }
      session.elapsedMs += lastSpinFrameAt === null ? 0 : Math.max(0, now - lastSpinFrameAt)
      lastSpinFrameAt = now
      if (!session.brake) {
        const ramp = session.ramp
        const motion = getSpeedRampMotion(session.elapsedMs - ramp.startedAt, ramp.startSpeed, ramp.targetSpeed, session.profile.accelerationMs)
        currentRotation = ramp.startRotation + motion.distance
        session.currentSpeed = motion.speed
        if (session.stopRequested && session.elapsedMs >= profile.accelerationMs) {
          session.brake = { ...createStopPlan(currentRotation, desiredModulo, { ...session.profile, maxSpeed: session.currentSpeed }), startedAt: session.elapsedMs }
        }
      }
      if (session.brake) {
        const brake = session.brake
        const progress = Math.min(1, (session.elapsedMs - brake.startedAt) / brake.durationMs)
        session.currentSpeed = (brake.distance * 1000 / brake.durationMs) * (
          -6 * progress * progress + 6 * progress + brake.initialSlope * (3 * progress * progress - 4 * progress + 1)
        )
        currentRotation = brake.startRotation + brake.distance * getBrakeProgress(progress, brake.initialSlope)
        const percent = Math.floor(progress * 100)
        if (percent !== lastPercent) {
          lastPercent = percent
          elements.progress?.setAttribute('aria-valuenow', String(percent))
          if (elements.progressFill) elements.progressFill.style.transform = `scaleX(${progress})`
        }
        if (progress >= 1) {
          finishVisualSpin({ canvas, items: parsed.items, targetRotation: brake.targetRotation, outcome, runId })
          return
        }
      }
      syncMotionTexture(session.currentSpeed)
      setCanvasSpinTransform(canvas, currentRotation - startRotation)
      animationFrame = requestAnimationFrame(frame)
    }
    fallbackFrame = frame
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
    const totalWeight = nextItems.reduce((total, item) => total + item.weight, 0)
    if (elements.weight) elements.weight.textContent = `총 가중치 ${Number(totalWeight.toFixed(2))}`
    lastWinner = null
    if (elements.remove) elements.remove.disabled = true
    if (elements.status) elements.status.textContent = `다음 추첨에서 “${winner}” 제외 · 남은 항목 ${nextItems.length}개`
    if (elements.resultNote) elements.resultNote.textContent = `다음 추첨에서는 “${winner}” 제외`
    // Preserve the winning wedge until the next spin or input edit.
    queuePreview()
    return true
  }

  function resetResultPreview() {
    const elements = getElements()
    lastWinner = null
    resultVisualItems = null
    if (elements.result) elements.result.textContent = '새 추첨 준비'
    if (elements.resultNote) elements.resultNote.textContent = '항목을 확인하고 룰렛을 돌려봐.'
    if (elements.spin) elements.spin.textContent = 'SPIN · 돌리기'
    elements.resultCard?.classList.remove('is-winner')
  }

  function useRoster() {
    if (running) return false
    const rosterNames = global.RandomRouletteRoster?.getNames?.() || []
    if (rosterNames.length < 2) {
      followsRoster = true
      global.RandomRouletteRoster?.open?.()
      return false
    }
    const elements = getElements()
    currentItems = rosterNames.map((label) => ({ label, weight: 1 }))
    resetResultPreview()
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
    spinRunId += 1
    fallbackFrame = null
    spinSession = null
    currentRotation = normalizeAngle(currentRotation)
    if (running) {
      const elements = getElements()
      renderWheel(currentItems, currentRotation)
      clearCanvasSpinTransform(elements.canvas)
      setControlsLocked(false)
      if (elements.result) elements.result.textContent = '추첨 취소'
      if (elements.resultNote) elements.resultNote.textContent = '항목을 확인하고 다시 시작할 수 있어.'
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
    try {
      const draft = localStorage.getItem(DRAFT_STORAGE_KEY)
      if (draft !== null && draft.length <= 8000 && elements.input) {
        elements.input.value = draft
        usedSavedItems = true
      }
    } catch (error) {}
    loadHistory()
    renderHistory()
    try {
      speedMultiplier = parseSpeedMultiplier(localStorage.getItem(SPEED_STORAGE_KEY)) ?? 1
    } catch (error) { speedMultiplier = 1 }
    if (elements.speed) elements.speed.value = String(speedMultiplier)
    updateSpeed({ persist: false })
    elements.speed?.addEventListener('input', () => updateSpeed())
    elements.speed?.addEventListener('change', () => updateSpeed())
    elements.speed?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') { event.preventDefault(); spin() }
    })
    try {
      if (elements.autoRemove) elements.autoRemove.checked = localStorage.getItem(OPTIONS_STORAGE_KEY) === 'true'
    } catch (error) {}
    elements.autoRemove?.addEventListener('change', () => {
      try { localStorage.setItem(OPTIONS_STORAGE_KEY, String(elements.autoRemove.checked)) } catch (error) {}
    })
    elements.input?.addEventListener('input', () => {
      followsRoster = false
      resetResultPreview()
      updatePreview()
    })
    elements.input?.addEventListener('blur', flushItemSave)
    global.addEventListener('pagehide', flushItemSave)
    elements.spin?.addEventListener('click', toggleSpin)
    elements.center?.addEventListener('click', toggleSpin)
    elements.remove?.addEventListener('click', () => removeLastWinner())
    elements.useRoster?.addEventListener('click', useRoster)
    elements.editItems?.addEventListener('click', () => {
      const control = running ? elements.speed : elements.input
      control?.scrollIntoView({ block: 'center', behavior: 'auto' })
      control?.focus({ preventScroll: true })
    })
    elements.clearHistory?.addEventListener('click', clearHistory)
    global.addEventListener('roulette-roster-change', () => {
      if (running) return
      if (global.RandomRouletteRoster?.getCount?.() === 0) {
        if (followsRoster) {
          if (elements.input) elements.input.value = ''
          currentItems = []
          resetResultPreview()
          saveItems([])
          lastWinner = null
          followsRoster = false
          updatePreview({ persist: false })
        }
      } else if (followsRoster || !usedSavedItems) useRoster()
    })
    global.addEventListener('resize', queuePreview, { passive: true })
    global.addEventListener('roulette-screen-change', () => { flushItemSave(); queuePreview() })
    new MutationObserver(queuePreview)
      .observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    if (typeof global.ResizeObserver === 'function' && elements.canvas) {
      new global.ResizeObserver(queuePreview).observe(elements.canvas)
    }
    document.fonts?.ready?.then(queuePreview)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        flushItemSave()
        if (animationFrame) cancelAnimationFrame(animationFrame)
        animationFrame = null
        lastSpinFrameAt = null
      } else if (running) {
        if (fallbackFrame && !animationFrame) animationFrame = requestAnimationFrame(fallbackFrame)
      } else queuePreview()
    })
    updatePreview({ persist: Boolean(savedItems) })
  }

  function ensureReady() {
    init()
    if (!usedSavedItems && global.RandomRouletteRoster?.hasRoster?.()) useRoster()
    queuePreview()
  }

  global.RandomRouletteWheel = Object.freeze({
    init,
    ensureReady,
    spin,
    requestStop,
    toggleSpin,
    getPhase: () => !running ? 'idle' : spinSession?.stopRequested ? 'stopping' : 'spinning',
    useRoster,
    cancelSpin,
    isRunning: () => running,
    parseItems,
    parseSpeedMultiplier,
    getSpinMotionProfile,
    getCruiseAngle,
    getSpeedRampMotion,
    createStopPlan,
    getBrakeProgress
  })
})(window)
