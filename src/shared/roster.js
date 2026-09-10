(function installSharedRoster(global) {
  const STORAGE_KEY = 'roulette-shared-roster-v1'
  const MAX_NAMES = 50
  const MAX_NAME_LENGTH = 30
  let names = []
  let initialized = false
  let lastFocusedElement = null
  let cachedElements = null
  let renderFrame = null
  const appliedInputs = new Map()

  function getElements() {
    return cachedElements || (cachedElements = {
      overlay: document.getElementById('rosterOverlay'),
      toggle: document.getElementById('rosterToggleBtn'),
      close: document.getElementById('rosterCloseBtn'),
      input: document.getElementById('rosterInput'),
      preview: document.getElementById('rosterPreview'),
      status: document.getElementById('rosterStatus'),
      save: document.getElementById('rosterSaveBtn'),
      clear: document.getElementById('rosterClearBtn'),
      count: document.getElementById('rosterCountBadge')
    })
  }

  function parse(rawText) {
    const tokens = String(rawText || '')
      .split(/[\n,]+/)
      .map((item) => item.trim().normalize('NFC'))
      .filter(Boolean)

    if (!tokens.length) return { ok: true, empty: true, names: [] }
    if (tokens.length < 2) return { ok: false, reason: '선택하려면 최소 2개의 항목이 필요해.', names: tokens }
    if (tokens.length > MAX_NAMES) return { ok: false, reason: `공용 목록은 최대 ${MAX_NAMES}개까지 저장할 수 있어.`, names: tokens }
    if (tokens.some((name) => name.length > MAX_NAME_LENGTH)) {
      return { ok: false, reason: `각 항목은 ${MAX_NAME_LENGTH}자 이내로 입력해줘.`, names: tokens }
    }

    const normalizedSet = new Set()
    for (const name of tokens) {
      const key = name.toLocaleLowerCase('ko-KR')
      if (normalizedSet.has(key)) return { ok: false, reason: `중복된 항목 “${name}”을 확인해줘.`, names: tokens }
      normalizedSet.add(key)
    }

    return { ok: true, names: tokens }
  }

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      const parsed = parse(Array.isArray(saved) ? saved.join('\n') : '')
      names = parsed.ok ? parsed.names : []
    } catch (error) {
      names = []
    }
    return [...names]
  }

  function persist(nextNames = names) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextNames))
      return true
    } catch (error) {
      const { status } = getElements()
      if (status) {
        status.textContent = '목록을 저장하지 못했어. 브라우저의 저장 공간을 확인한 뒤 다시 눌러줘.'
        status.classList.add('is-error')
      }
      return false
    }
  }

  function setInputValue(id, value) {
    const input = document.getElementById(id)
    if (!input) return
    if (input.value === value) return
    input.value = value
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
  }

  function syncToGames() {
    if (!names.length) {
      for (const [id, value] of appliedInputs) {
        const input = document.getElementById(id)
        if (input && input.value === value && !input.disabled) setInputValue(id, '')
      }
      appliedInputs.clear()
      return
    }
    const apply = (id, value) => {
      const input = document.getElementById(id)
      if (!input || input.disabled) return
      setInputValue(id, value)
      appliedInputs.set(id, value)
    }
    const listText = names.join(', ')
    ;['raceConfigInput', 'battleConfigInput', 'simConfigInput', 'navalConfigInput', 'stockConfigInput', 'balloonConfigInput', 'circleTapConfigInput', 'keyReactConfigInput']
      .forEach((id) => apply(id, listText))
    apply('configInput', names.map((name) => `${name}*1`).join(', '))
    apply('ladderConfigInput', names.map((name, index) => `${name}(${index + 1})`).join(', '))
    apply('bearFindCountInput', String(names.length))
  }

  function render(rawText = null) {
    const elements = getElements()
    const source = rawText === null ? names.join('\n') : rawText
    const parsed = parse(source)
    const previewNames = parsed.names || []

    if (elements.preview) {
      elements.preview.replaceChildren(...previewNames.slice(0, MAX_NAMES).map((name, index) => {
        const chip = document.createElement('span')
        chip.className = 'roster-chip'
        chip.textContent = `${index + 1}. ${name}`
        return chip
      }))
    }

    if (elements.status) {
      elements.status.textContent = parsed.empty
        ? '빈 공용 목록으로 저장하면 각 게임에서 직접 입력해서 사용할 수 있어.'
        : parsed.ok
          ? `${previewNames.length}개 항목 확인 완료. 저장하면 각 게임의 입력 형식에 맞춰 반영돼.`
          : parsed.reason
      elements.status.classList.toggle('is-error', !parsed.ok && Boolean(source.trim()))
    }

    if (elements.save) elements.save.disabled = !parsed.ok
    elements.input?.setAttribute('aria-invalid', String(!parsed.ok))
    if (elements.count) elements.count.textContent = String(names.length)
  }

  function saveFromDialog() {
    const elements = getElements()
    if (global.RandomRouletteSession?.isRunning?.()) {
      if (elements.status) elements.status.textContent = '게임이 진행 중이야. 이번 게임이 끝난 뒤 목록을 변경해줘.'
      return false
    }
    const parsed = parse(elements.input?.value || '')
    if (!parsed.ok) {
      render(elements.input?.value || '')
      return false
    }

    if (!persist(parsed.names)) return false
    names = parsed.names
    syncToGames()
    render()
    global.dispatchEvent(new CustomEvent('roulette-roster-change', { detail: { names: [...names], items: [...names] } }))
    global.dispatchEvent(new CustomEvent('roulette-shared-list-change', { detail: { items: [...names] } }))
    close()
    return true
  }

  function clearSavedList() {
    if (global.RandomRouletteSession?.isRunning?.() || !persist([])) return false
    names = []
    syncToGames()
    global.dispatchEvent(new CustomEvent('roulette-roster-change', { detail: { names: [], items: [] } }))
    global.dispatchEvent(new CustomEvent('roulette-shared-list-change', { detail: { items: [] } }))
    render('')
  }

  function resetDraft() {
    const elements = getElements()
    if (elements.input) elements.input.value = ''
    render('')
    elements.input?.focus({ preventScroll: true })
  }

  function getFocusableElements(container) {
    if (!container) return []
    return [...container.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter((element) => element instanceof HTMLElement && element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden')
  }

  function open() {
    const elements = getElements()
    if (!elements.overlay) return
    lastFocusedElement = document.activeElement
    global.RandomRouletteUtilitySettings?.close?.()
    elements.input.value = names.join('\n')
    elements.overlay.classList.remove('hidden')
    render(elements.input.value)
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (!elements.overlay?.classList.contains('hidden')) elements.input?.focus({ preventScroll: true })
      }, 0)
    })
  }

  function close() {
    const elements = getElements()
    elements.overlay?.classList.add('hidden')
    if (lastFocusedElement instanceof HTMLElement && lastFocusedElement.isConnected && lastFocusedElement.getClientRects().length) {
      lastFocusedElement.focus({ preventScroll: true })
    } else document.getElementById('utilitySettingsToggleBtn')?.focus({ preventScroll: true })
    lastFocusedElement = null
    document.dispatchEvent(new CustomEvent('app-dialog-closed', { detail: { dialog: 'roster' } }))
  }

  function init() {
    if (initialized) return
    initialized = true
    load()
    const elements = getElements()
    elements.toggle?.addEventListener('click', open)
    elements.close?.addEventListener('click', close)
    elements.save?.addEventListener('click', saveFromDialog)
    elements.clear?.addEventListener('click', resetDraft)
    elements.input?.addEventListener('input', () => {
      if (renderFrame !== null) return
      renderFrame = requestAnimationFrame(() => { renderFrame = null; render(elements.input.value) })
    })
    elements.overlay?.addEventListener('click', (event) => {
      if (event.target === elements.overlay) close()
    })
    document.addEventListener('keydown', (event) => {
      if (elements.overlay?.classList.contains('hidden')) return
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && !event.isComposing) {
        event.preventDefault()
        event.stopImmediatePropagation()
        saveFromDialog()
        return
      }
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopImmediatePropagation()
        close()
        return
      }
      if (event.key !== 'Tab') return
      event.stopPropagation()

      const focusable = getFocusableElements(elements.overlay)
      if (!focusable.length) {
        event.preventDefault()
        elements.overlay?.querySelector('.app-dialog')?.focus?.({ preventScroll: true })
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement
      if (!elements.overlay?.contains(active)) {
        event.preventDefault()
        first.focus({ preventScroll: true })
      } else if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus({ preventScroll: true })
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus({ preventScroll: true })
      }
    }, true)
    render()
    if (names.length) syncToGames()
  }

  global.RandomRouletteRoster = Object.freeze({
    init,
    open,
    close,
    parse,
    syncToGames,
    getNames: () => [...names],
    getItems: () => [...names],
    getCount: () => names.length,
    hasRoster: () => names.length >= 2,
    hasSharedList: () => names.length >= 2,
    clear: clearSavedList,
    resetDraft
  })
})(window)
