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

    if (!tokens.length) return { ok: false, reason: '참가자 이름을 입력해줘.', names: [] }
    if (tokens.length < 2) return { ok: false, reason: '최소 2명의 참가자가 필요해.', names: tokens }
    if (tokens.length > MAX_NAMES) return { ok: false, reason: `공용 명단은 최대 ${MAX_NAMES}명까지 저장할 수 있어.`, names: tokens }
    if (tokens.some((name) => name.length > MAX_NAME_LENGTH)) {
      return { ok: false, reason: `이름은 ${MAX_NAME_LENGTH}자 이내로 입력해줘.`, names: tokens }
    }

    const normalizedSet = new Set()
    for (const name of tokens) {
      const key = name.toLocaleLowerCase('ko-KR')
      if (normalizedSet.has(key)) return { ok: false, reason: `중복된 이름 “${name}”을 확인해줘.`, names: tokens }
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
      elements.status.textContent = parsed.ok
        ? `${previewNames.length}명 확인 완료. 저장하면 모든 게임에 반영돼.`
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
    global.dispatchEvent(new CustomEvent('roulette-roster-change', { detail: { names: [...names] } }))
    close()
    return true
  }

  function open() {
    const elements = getElements()
    if (!elements.overlay) return
    lastFocusedElement = document.activeElement
    elements.input.value = names.join('\n')
    elements.overlay.classList.remove('hidden')
    render(elements.input.value)
    requestAnimationFrame(() => elements.input?.focus())
  }

  function close() {
    const elements = getElements()
    elements.overlay?.classList.add('hidden')
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus({ preventScroll: true })
  }

  function init() {
    if (initialized) return
    initialized = true
    load()
    const elements = getElements()
    elements.toggle?.addEventListener('click', open)
    elements.close?.addEventListener('click', close)
    elements.save?.addEventListener('click', saveFromDialog)
    elements.clear?.addEventListener('click', () => {
      if (elements.input) elements.input.value = ''
      render('')
      elements.input?.focus()
    })
    elements.input?.addEventListener('input', () => render(elements.input.value))
    elements.overlay?.addEventListener('click', (event) => {
      if (event.target === elements.overlay) close()
    })
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !elements.overlay?.classList.contains('hidden')) close()
    })
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
    getCount: () => names.length,
    hasRoster: () => names.length >= 2
  })
})(window)
