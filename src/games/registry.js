(function installGameRegistry(global) {
  const games = Object.freeze({
    wheel: { title: '기본 원판 룰렛', min: 2, max: 50, group: 'luck', requiresRoster: false },
    game1: { title: '담아라!', min: 2, max: 20, group: 'luck' },
    game2: { title: '경마', min: 2, max: 8, group: 'luck' },
    game3: { title: '카드 연산 배틀', min: 2, max: 8, group: 'luck' },
    game4: { title: '볼 배틀', min: 2, max: 6, group: 'luck' },
    game5: { title: '러시안 룰렛', min: 2, max: 10, group: 'luck' },
    game6: { title: '주식게임', min: 2, max: 4, group: 'luck' },
    game7: { title: '투명 사다리', min: 2, max: () => isPhoneLikeDevice() ? 5 : 8, group: 'luck' },
    physicalBalloon: { title: '풍선 불기', min: 2, max: 8, group: 'physical' },
    physicalBomb: { title: '폭탄 넘기기', min: 2, max: 50, group: 'physical', device: 'phone' },
    physicalCircle: { title: '작아지는 원', min: 2, max: 8, group: 'physical', device: 'phone' },
    physicalKeyReact: { title: 'STAY CLICK', min: 2, max: 4, group: 'physical', device: 'desktop' },
    physicalBearFind: { title: '곰찾기', min: 2, max: 20, group: 'physical' }
  })

  const luckButtonToScreen = Object.freeze({
    wheel: 'wheel', '1': 'game1', '2': 'game2', '3': 'game3', '4': 'game4',
    '5': 'game5', '6': 'game6', '7': 'game7'
  })
  const physicalButtonToScreen = Object.freeze({
    balloon: 'physicalBalloon', 'bomb-pass': 'physicalBomb', 'shrinking-circle': 'physicalCircle',
    'stay-click': 'physicalKeyReact', 'bear-find': 'physicalBearFind'
  })

  function isPhoneLikeDevice() {
    const nav = global.navigator || {}
    const userAgent = String(nav.userAgent || '')
    const platform = String(nav.userAgentData?.platform || nav.platform || '')
    const maxTouchPoints = Number(nav.maxTouchPoints || 0)

    // 터치 모니터와 Windows 태블릿 모드는 PC다. 포인터 종류보다 OS 식별값을 우선한다.
    const isIPadDesktopMode = /MacIntel/i.test(platform) && maxTouchPoints > 1
    const hasHandheldUserAgent = /Android|iPhone|iPad|iPod|Windows Phone|IEMobile|webOS|BlackBerry|Opera Mini|Silk|Kindle/i.test(userAgent)
    if (isIPadDesktopMode || hasHandheldUserAgent || nav.userAgentData?.mobile === true) return true

    const hasDesktopIdentity = /Windows NT|Win32|Win64|Macintosh|Mac OS X|CrOS|Linux x86_64|Linux i[3-6]86/i.test(`${userAgent} ${platform}`)
    if (hasDesktopIdentity || nav.userAgentData?.mobile === false) return false

    // UA가 전혀 없는 특수 브라우저만 보수적으로 포인터와 짧은 변을 함께 본다.
    const coarsePrimary = global.matchMedia?.('(pointer: coarse)')?.matches === true
    const noHover = global.matchMedia?.('(hover: none)')?.matches === true
    const shortSide = Math.min(Number(global.innerWidth || 0), Number(global.innerHeight || 0))
    return Boolean(coarsePrimary && noHover && maxTouchPoints > 0 && shortSide > 0 && shortSide <= 820)
  }

  function syncCatalogDeviceClass() {
    const handheld = isPhoneLikeDevice()
    const root = global.document?.documentElement
    root?.classList.toggle('catalog-handheld-device', handheld)
    root?.classList.toggle('catalog-desktop-device', !handheld)
    if (root) root.dataset.catalogDevice = handheld ? 'handheld' : 'desktop'
    return handheld
  }

  function getScreenKey(button) {
    if (!button) return ''
    if (button.classList.contains('physical-game-item')) {
      return physicalButtonToScreen[button.dataset.physicalGame] || ''
    }
    return luckButtonToScreen[button.dataset.game] || ''
  }

  function shouldHideForDevice(screenKey) {
    const config = games[screenKey]
    if (!config?.device) return false
    if (config.device === 'phone') return !isPhoneLikeDevice()
    if (config.device === 'desktop') return isPhoneLikeDevice()
    return false
  }

  function setDeviceVisibility(button, screenKey) {
    const hidden = shouldHideForDevice(screenKey)
    button.hidden = hidden
    button.classList.toggle('is-device-hidden', hidden)
    button.classList.toggle('is-device-compatible', !hidden)
    if (hidden) button.setAttribute('aria-hidden', 'true')
    else button.removeAttribute('aria-hidden')
    return hidden
  }

  function getSharedListState() {
    const roster = global.RandomRouletteRoster
    const count = roster?.getCount?.() || 0
    const hasSharedList = Boolean(roster?.hasSharedList?.() || roster?.hasRoster?.() || count >= 2)
    return { count, hasSharedList }
  }

  function getEligibility(screenKey, options = {}) {
    const config = games[screenKey]
    if (!config) return { ok: true, reason: '' }
    const { count, hasSharedList } = getSharedListState()
    const max = typeof config.max === 'function' ? config.max() : config.max

    const entry = getEntryAvailability(screenKey)
    if (!entry.ok) return entry
    if (!hasSharedList) {
      return { ok: false, inputNeeded: true, reason: `공용 목록 없이 입장해 게임 안에서 ${config.min}개 이상 직접 입력할 수 있어.`, count, min: config.min, max }
    }
    if (count < config.min) {
      return { ok: false, listBlocked: true, reason: `${config.title}은 ${config.min}~${max}개 항목을 지원해. 현재 공용 목록은 ${count}개라 실행할 수 없어.`, count, min: config.min, max }
    }
    if (count > max) {
      return { ok: false, listBlocked: true, reason: `${config.title}은 ${config.min}~${max}개 항목을 지원해. 현재 공용 목록은 ${count}개라 실행할 수 없어.`, count, min: config.min, max }
    }
    return { ok: true, reason: '', count, min: config.min, max }
  }

  function getLaunchAvailability(screenKey) {
    const config = games[screenKey]
    if (!config) return { ok: true, reason: '' }
    const entry = getEntryAvailability(screenKey)
    if (!entry.ok) return entry

    const { count, hasSharedList } = getSharedListState()
    const max = typeof config.max === 'function' ? config.max() : config.max
    if (!hasSharedList) {
      return {
        ok: true,
        inputNeeded: true,
        reason: `공용 목록 없이 입장해 게임 안에서 ${config.min}~${max}개 항목을 직접 입력할 수 있어.`,
        count,
        min: config.min,
        max
      }
    }
    return getEligibility(screenKey)
  }

  function getEntryAvailability(screenKey) {
    const config = games[screenKey]
    if (!config) return { ok: true, reason: '' }
    if (config.device === 'phone' && !isPhoneLikeDevice()) {
      return { ok: false, reason: `${config.title} 게임은 모바일 전용이야.` }
    }
    if (config.device === 'desktop' && isPhoneLikeDevice()) {
      return { ok: false, reason: `${config.title} 게임은 키보드가 있는 PC에서 이용할 수 있어.` }
    }
    return { ok: true, reason: '' }
  }

  function markCard(button, screenKey) {
    if (!button || !screenKey) return
    const availability = getLaunchAvailability(screenKey)
    const blocked = availability.listBlocked === true
    button.setAttribute('aria-disabled', blocked ? 'true' : 'false')
    button.dataset.listReadiness = blocked ? 'blocked' : availability.inputNeeded ? 'input' : 'ready'
    button.classList.toggle('is-list-ineligible', blocked)

    let status = button.querySelector('.catalog-list-status')
    if (blocked) {
      const label = `공용 목록 ${availability.count}개 · ${availability.min}~${availability.max}개만 가능`
      button.dataset.ineligibleLabel = label
      button.title = `${availability.reason} 공용 목록을 수정하거나 비워서 저장해줘.`
      if (!status) {
        status = document.createElement('span')
        status.className = 'catalog-list-status'
        button.appendChild(status)
      }
      status.textContent = label
    } else {
      delete button.dataset.ineligibleLabel
      status?.remove()
      if (availability.inputNeeded) button.title = availability.reason
      else button.removeAttribute('title')
    }
  }

  function updateCatalogSummary(visibleCards, hiddenCards) {
    const summary = document.getElementById('catalogAvailabilitySummary')
    if (!summary) return
    const gameCards = visibleCards.filter((button) => button.dataset.game !== '8')
    const sharedCount = global.RandomRouletteRoster?.getCount?.() || 0
    const ready = gameCards.filter((button) => button.dataset.listReadiness === 'ready').length
    const blocked = gameCards.filter((button) => button.dataset.listReadiness === 'blocked').length
    const hiddenLabel = isPhoneLikeDevice() ? 'PC 전용' : '모바일 전용'
    const parts = sharedCount >= 2
      ? [`공용 목록 ${sharedCount}개`, `실행 가능 ${ready}개`, blocked ? `조건 불일치 ${blocked}개` : '모든 게임 조건 일치']
      : ['공용 목록은 선택 사항', `${gameCards.length}개 게임 모두 입장 가능`, '게임 안에서 직접 입력']
    if (hiddenCards.length) parts.push(`${hiddenLabel} ${hiddenCards.length}개 숨김`)
    summary.textContent = parts.join(' · ')

    const editButton = document.getElementById('catalogRosterEditBtn')
    if (editButton) {
      editButton.textContent = sharedCount >= 2 ? `공용 목록 편집 · ${sharedCount}개` : '공용 목록 만들기 · 선택'
    }
  }

  function restoreCatalogOrder(grid, cards) {
    cards
      .slice()
      .sort((a, b) => Number(a.dataset.catalogOrder || 0) - Number(b.dataset.catalogOrder || 0))
      .forEach((button) => grid.appendChild(button))
  }

  function refreshCards() {
    const grid = document.getElementById('luckGameGrid')
    if (!grid) return
    syncCatalogDeviceClass()
    grid.querySelectorAll('.game-item[data-clone]').forEach((clone) => clone.remove())
    const cards = [...grid.querySelectorAll(':scope > .game-item:not([data-clone])')]
    cards.forEach((button, index) => {
      if (!button.dataset.catalogOrder) button.dataset.catalogOrder = String(index + 1)
    })

    cards.forEach((button) => {
      const screenKey = getScreenKey(button)
      if (screenKey) setDeviceVisibility(button, screenKey)
      else {
        button.hidden = false
        button.classList.remove('is-device-hidden')
        button.classList.add('is-device-compatible')
        button.removeAttribute('aria-hidden')
      }
    })

    cards.filter((button) => button.matches('.game-launch[data-game]')).forEach((button) => {
      const game = button.dataset.game
      if (game === '8') {
        button.setAttribute('aria-disabled', 'false')
        button.dataset.listReadiness = 'ready'
        button.classList.remove('is-list-ineligible')
        delete button.dataset.ineligibleLabel
        button.querySelector('.catalog-list-status')?.remove()
        button.removeAttribute('title')
        return
      }
      markCard(button, luckButtonToScreen[game])
    })
    cards.filter((button) => button.classList.contains('physical-game-item')).forEach((button) => {
      markCard(button, physicalButtonToScreen[button.dataset.physicalGame])
    })

    restoreCatalogOrder(grid, cards)
    const visibleCards = cards.filter((button) => !button.hidden)
    updateCatalogSummary(visibleCards, cards.filter((button) => button.hidden))
    global.dispatchEvent(new CustomEvent('roulette-catalog-refreshed'))
  }

  function getEligibleGameScreens() {
    return Object.entries(games)
      .map(([screen]) => screen)
      .filter((screen) => getEligibility(screen, { forSmartPick: true }).ok)
  }

  function getDeviceCompatibleGameScreens() {
    return Object.keys(games).filter((screen) => getEntryAvailability(screen).ok)
  }

  function pickEligibleGameScreen() {
    const hasSharedList = global.RandomRouletteRoster?.hasSharedList?.() || global.RandomRouletteRoster?.hasRoster?.()
    const eligible = hasSharedList ? getEligibleGameScreens() : getDeviceCompatibleGameScreens()
    if (!eligible.length) {
      showPopup('실행 가능한 게임 없음', '현재 기기에서 실행 가능한 게임이 없어.', { icon: '⚠️' })
      return null
    }

    const selected = eligible[global.RandomRouletteRng.randomInt(eligible.length)]
    return selected
  }

  function init() {
    document.getElementById('catalogRosterEditBtn')?.addEventListener('click', () => {
      global.RandomRouletteRoster?.open?.()
    })
    global.addEventListener('roulette-roster-change', refreshCards)
    global.addEventListener('resize', refreshCards, { passive: true })
    refreshCards()
  }

  global.RandomRouletteRegistry = Object.freeze({
    init,
    games,
    getEligibility,
    getLaunchAvailability,
    getEntryAvailability,
    getEligibleGameScreens,
    getDeviceCompatibleGameScreens,
    pickEligibleGameScreen,
    getEligibleLuckScreens: getEligibleGameScreens,
    pickEligibleLuckScreen: pickEligibleGameScreen,
    isPhoneLikeDevice,
    syncCatalogDeviceClass,
    refreshCards
  })
})(window)
