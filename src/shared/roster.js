(function installSharedRoster(global) {
  const STORAGE_KEY = 'roulette-shared-roster-v1'
  const MAX_NAMES = 50
  const MAX_NAME_LENGTH = 30
  let names = []
  let initialized = false
  let lastFocusedElement = null

  function getElements() {
    return {
      overlay: document.getElementById('rosterOverlay'),
      toggle: document.getElementById('rosterToggleBtn'),
      close: document.getElementById('rosterCloseBtn'),
      input: document.getElementById('rosterInput'),
      preview: document.getElementById('rosterPreview'),
      status: document.getElementById('rosterStatus'),
      save: document.getElementById('rosterSaveBtn'),
      clear: document.getElementById('rosterClearBtn'),
      count: document.getElementById('rosterCountBadge')
    }
  }

  function parse(rawText) {
    const tokens = String(rawText || '')
      .split(/[\n,]+/)
      .map((item) => item.trim())
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

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(names))
    } catch (error) {}
  }

  function setInputValue(id, value) {
    const input = document.getElementById(id)
    if (!input) return
    input.value = value
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
  }

  function syncToGames() {
    if (!names.length) return
    const listText = names.join(', ')
    ;['raceConfigInput', 'battleConfigInput', 'simConfigInput', 'navalConfigInput', 'stockConfigInput', 'balloonConfigInput', 'circleTapConfigInput', 'keyReactConfigInput']
      .forEach((id) => setInputValue(id, listText))
    setInputValue('configInput', names.map((name) => `${name}*1`).join(', '))
    setInputValue('ladderConfigInput', names.map((name, index) => `${name}(${index + 1})`).join(', '))
    setInputValue('bearFindCountInput', String(names.length))
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
    if (elements.count) elements.count.textContent = String(names.length)
  }

  function saveFromDialog() {
    const elements = getElements()
    const parsed = parse(elements.input?.value || '')
    if (!parsed.ok) {
      render(elements.input?.value || '')
      return false
    }

    names = parsed.names
    persist()
    syncToGames()
    render()
    global.dispatchEvent(new CustomEvent('roulette-roster-change', { detail: { names: [...names], items: [...names] } }))
    global.dispatchEvent(new CustomEvent('roulette-shared-list-change', { detail: { items: [...names] } }))
    close()
    return true
  }

  function clearSavedList() {
    names = []
    persist()
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
    if (lastFocusedElement instanceof HTMLElement && lastFocusedElement.isConnected) lastFocusedElement.focus({ preventScroll: true })
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
    elements.input?.addEventListener('input', () => render(elements.input.value))
    elements.overlay?.addEventListener('click', (event) => {
      if (event.target === elements.overlay) close()
    })
    document.addEventListener('keydown', (event) => {
      if (elements.overlay?.classList.contains('hidden')) return
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
