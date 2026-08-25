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

  function getEligibilityHint(eligibility) {
    if (!eligibility) return '참가자 명단 확인 필요'
    if (Number.isFinite(eligibility.count) && Number.isFinite(eligibility.max) && eligibility.count > eligibility.max) {
      return `지원 인원 ${eligibility.min}~${eligibility.max}명`
    }
    if (Number.isFinite(eligibility.min)) return `명단 ${eligibility.min}명 이상 필요`
    return '참가자 명단을 조정해줘'
  }

  function setEligibilityOverlay(button, eligibility, label = '현재 명단 실행 불가') {
    let overlay = button.querySelector(':scope > .game-eligibility-overlay')
    if (eligibility.ok) {
      overlay?.remove()
      return
    }

    if (!overlay) {
      overlay = document.createElement('span')
      overlay.className = 'game-eligibility-overlay'
      overlay.setAttribute('aria-hidden', 'true')
      const icon = document.createElement('span')
      icon.className = 'game-eligibility-icon'
      icon.textContent = '👥'
      const title = document.createElement('strong')
      const hint = document.createElement('small')
      overlay.append(icon, title, hint)
      button.appendChild(overlay)
    }

    overlay.querySelector('strong').textContent = label
    overlay.querySelector('small').textContent = getEligibilityHint(eligibility)
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

  function getEligibility(screenKey, options = {}) {
    const config = games[screenKey]
    if (!config) return { ok: true, reason: '' }
    const roster = global.RandomRouletteRoster
    const count = roster?.getCount?.() || 0
    const max = typeof config.max === 'function' ? config.max() : config.max

    if (config.device === 'phone' && !isPhoneLikeDevice()) {
      return { ok: false, reason: `${config.title} 게임은 모바일 전용이야.` }
    }
    if (config.device === 'desktop' && isPhoneLikeDevice()) {
      return { ok: false, reason: `${config.title} 게임은 키보드가 있는 PC에서 이용할 수 있어.` }
    }
    if (config.requiresRoster === false && !options.forSmartPick) return { ok: true, reason: '' }
    if (count < config.min) {
      return { ok: false, reason: `공용 참가자 명단에 최소 ${config.min}명을 먼저 등록해줘.`, count, min: config.min, max }
    }
    if (count > max) {
      return { ok: false, reason: `${config.title}: 현재 ${count}명 명단으로 실행할 수 없어. 지원 인원은 ${config.min}~${max}명이야.`, count, min: config.min, max }
    }
    return { ok: true, reason: '', count, min: config.min, max }
  }

  function markCard(button, screenKey) {
    if (!button || !screenKey) return
    const eligibility = getEligibility(screenKey)
    button.classList.toggle('is-roster-ineligible', !eligibility.ok)
    button.setAttribute('aria-disabled', eligibility.ok ? 'false' : 'true')
    if (eligibility.ok) {
      delete button.dataset.ineligibleLabel
      button.removeAttribute('title')
    } else {
      button.dataset.ineligibleLabel = '현재 명단 실행 불가'
      button.title = eligibility.reason
    }
    setEligibilityOverlay(button, eligibility)
  }

  function updateCatalogSummary(visibleCards, hiddenCards) {
    const summary = document.getElementById('catalogAvailabilitySummary')
    if (!summary) return
    const gameCards = visibleCards.filter((button) => button.dataset.game !== '8')
    const available = gameCards.filter((button) => !button.classList.contains('is-roster-ineligible')).length
    const unavailable = gameCards.length - available
    const hiddenLabel = isPhoneLikeDevice() ? 'PC 전용' : '모바일 전용'
    const parts = [`바로 실행 ${available}개`]
    if (unavailable) parts.push(`명단 조정 필요 ${unavailable}개는 목록 뒤에 표시`)
    if (hiddenCards.length) parts.push(`${hiddenLabel} ${hiddenCards.length}개 숨김`)
    summary.textContent = parts.join(' · ')
  }

  function sortCatalogCards(grid, cards) {
    const randomPick = cards.find((button) => button.dataset.game === '8')
    const visible = cards.filter((button) => !button.hidden && button !== randomPick)
    const available = visible.filter((button) => !button.classList.contains('is-roster-ineligible'))
    const unavailable = visible.filter((button) => button.classList.contains('is-roster-ineligible'))
    const hidden = cards.filter((button) => button.hidden)
    ;[randomPick, ...available, ...unavailable, ...hidden].filter(Boolean).forEach((button) => grid.appendChild(button))
  }

  function refreshCards() {
    const grid = document.getElementById('luckGameGrid')
    if (!grid) return
    syncCatalogDeviceClass()
    grid.querySelectorAll('.game-item[data-clone]').forEach((clone) => clone.remove())
    const cards = [...grid.querySelectorAll(':scope > .game-item:not([data-clone])')]

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
        const hasEligible = getEligibleGameScreens().length > 0
        const eligibility = hasEligible
          ? { ok: true, reason: '' }
          : { ok: false, reason: '공용 참가자 명단을 등록하면 현재 기기에서 실행 가능한 게임만 골라줘.', min: 2 }
        button.classList.toggle('is-roster-ineligible', !hasEligible)
        button.setAttribute('aria-disabled', hasEligible ? 'false' : 'true')
        if (hasEligible) {
          delete button.dataset.ineligibleLabel
          button.removeAttribute('title')
        } else {
          button.dataset.ineligibleLabel = '명단 등록 필요'
          button.title = '공용 참가자 명단을 등록하면 현재 기기에서 실행 가능한 게임만 골라줘.'
        }
        setEligibilityOverlay(button, eligibility, '명단 등록 필요')
        return
      }
      markCard(button, luckButtonToScreen[game])
    })
    cards.filter((button) => button.classList.contains('physical-game-item')).forEach((button) => {
      markCard(button, physicalButtonToScreen[button.dataset.physicalGame])
    })

    sortCatalogCards(grid, cards)
    const visibleCards = cards.filter((button) => !button.hidden)
    updateCatalogSummary(visibleCards, cards.filter((button) => button.hidden))
    global.dispatchEvent(new CustomEvent('roulette-catalog-refreshed'))
  }

  function getEligibleGameScreens() {
    return Object.entries(games)
      .map(([screen]) => screen)
      .filter((screen) => getEligibility(screen, { forSmartPick: true }).ok)
  }

  function pickEligibleGameScreen() {
    if (!global.RandomRouletteRoster?.hasRoster?.()) {
      global.RandomRouletteRoster?.open?.()
      return null
    }

    const eligible = getEligibleGameScreens()
    if (!eligible.length) {
      showPopup('실행 가능한 게임 없음', '현재 인원수와 기기에서 실행 가능한 게임이 없어. 공용 명단의 인원을 조정해줘.', { icon: '⚠️' })
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
    getEligibleGameScreens,
    pickEligibleGameScreen,
    getEligibleLuckScreens: getEligibleGameScreens,
    pickEligibleLuckScreen: pickEligibleGameScreen,
    isPhoneLikeDevice,
    syncCatalogDeviceClass,
    refreshCards
  })
})(window)
