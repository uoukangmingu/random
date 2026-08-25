/* generated from script.js · game5-russian-roulette.js */
/* =========================
   game5 : russian roulette
   기존 화면 전환/초기화 연결 지점을 유지해 러시안 룰렛 구현을 연결한다.
========================= */

const ROULETTE_MAX_PLAYERS = 10
const ROULETTE_CHAMBER_CAPACITY = 30
const ROULETTE_SHOT_DELAY_MS = 1120
const ROULETTE_FIRST_SHOT_DELAY_MS = 720
const ROULETTE_ANIMATION_MS = 720

let rouletteTurnIndex = 0
let rouletteChamber = []
let rouletteRoundNumber = 1
let rouletteShotNumber = 0
let rouletteShotInProgress = false

function getRouletteChamberCountEl() {
  return document.getElementById('rouletteChamberCount')
}

function getRouletteBulletTrackEl() {
  return document.getElementById('rouletteBulletTrack')
}

function getRouletteCurrentAlivePlayers() {
  return navalPlayers.filter((player) => player.isAlive)
}

function setNavalInputLock(isLocked) {
  if (!navalConfigInput) return
  navalConfigInput.disabled = isLocked
  navalConfigInput.style.opacity = isLocked ? '0.65' : '1'
  navalConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
}

function updateNavalDescription() {
  if (!navalDesc) return
  const playerCount = navalPlayers.length || 0
  navalDesc.textContent = `중앙의 총 이모지가 MAP 위 참가자 ${playerCount}명을 향해 자동으로 발사된다. 실탄 여부는 숨긴 채, 불발과 폭죽 연출을 섞어 끝까지 긴장감을 만든다.`
}

function parseNavalConfigToPlayers(text) {
  const rawItems = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!rawItems.length) {
    return { status: 'EMPTY' }
  }

  if (rawItems.length > ROULETTE_MAX_PLAYERS) {
    return { status: 'TOO_MANY', count: rawItems.length }
  }

  const seen = new Set()
  const players = []
  const palette = getNavalPlayerPaletteByTheme()

  for (const raw of rawItems) {
    if (!raw || raw.includes('*')) {
      return { status: 'INVALID' }
    }

    if (seen.has(raw)) {
      return { status: 'DUPLICATE' }
    }

    seen.add(raw)
    players.push({
      id: `roulette-player-${players.length + 1}`,
      label: raw,
      color: palette[players.length % palette.length],
      isAlive: true,
      eliminatedOrder: null,
      finalPlace: null
    })
  }

  return { status: 'OK', players }
}

function handleNavalParseFailure(parsed, { showPopupOnInvalid = false } = {}) {
  if (!navalStatusText) return false

  if (parsed.status === 'EMPTY') {
    navalStatusText.textContent = '참가자를 먼저 입력해줘. 예: 홍길동, 김아무개, 박철수'
  } else if (parsed.status === 'TOO_MANY') {
    navalStatusText.textContent = `러시안 룰렛은 최대 ${ROULETTE_MAX_PLAYERS}명까지 가능해.`
    if (showPopupOnInvalid) {
      showPopup('참가자 수 초과', `러시안 룰렛은 최대 ${ROULETTE_MAX_PLAYERS}명까지 참가할 수 있어.`, { icon: '⚠️' })
    }
  } else if (parsed.status === 'DUPLICATE') {
    navalStatusText.textContent = '같은 이름은 2번 이상 입력할 수 없어.'
    if (showPopupOnInvalid) {
      showPopup('중복 이름 불가', '러시안 룰렛은 같은 이름을 중복 등록할 수 없어.', { icon: '⚠️' })
    }
  } else {
    navalStatusText.textContent = '입력 형식을 확인해줘. 예: 홍길동, 김아무개, 박철수'
    if (showPopupOnInvalid) {
      showPopup('입력 확인', '이름만 쉼표로 구분해 적어줘. 예: 홍길동, 김아무개, 박철수', { icon: '⚠️' })
    }
  }

  return false
}

function setNavalPlayers(players) {
  const palette = getNavalPlayerPaletteByTheme()
  navalPlayers = players.map((player, index) => ({
    ...player,
    color: palette[index % palette.length],
    isAlive: player.isAlive !== false,
    eliminatedOrder: player.eliminatedOrder || null,
    finalPlace: player.finalPlace || null
  }))

  if (navalConfigInput) {
    lastNavalValidConfigText = navalConfigInput.value
    lastNavalAppliedRawText = navalConfigInput.value
  }

  updateNavalDescription()
}

function buildRouletteChamber(aliveCount) {
  const liveBulletCount = clampValue(aliveCount - 1, 0, ROULETTE_CHAMBER_CAPACITY)
  const blankCount = ROULETTE_CHAMBER_CAPACITY - liveBulletCount
  rouletteChamber = shuffleArray([
    ...Array.from({ length: liveBulletCount }, () => 'live'),
    ...Array.from({ length: blankCount }, () => 'blank')
  ])
  rouletteRoundNumber += 1
}

function getRouletteRemainingShots() {
  return rouletteChamber.length
}

function renderRouletteBulletTrack() {
  const track = getRouletteBulletTrackEl()
  if (!track) return

  const remaining = getRouletteRemainingShots()
  track.innerHTML = ''

  for (let index = 0; index < ROULETTE_CHAMBER_CAPACITY; index += 1) {
    const dot = document.createElement('span')
    dot.className = `roulette-bullet-dot${index >= remaining ? ' is-spent' : ''}`
    track.appendChild(dot)
  }
}

function renderNavalBoardBase() {
  renderNavalBoardState()
}

function getRouletteCurrentTarget() {
  const alive = getRouletteCurrentAlivePlayers()
  if (!alive.length) return null
  return alive[clampValue(rouletteTurnIndex, 0, alive.length - 1) % alive.length]
}

function getRouletteAngleForPlayer(player) {
  const total = Math.max(1, navalPlayers.length)
  const index = Math.max(0, navalPlayers.findIndex((item) => item.id === player?.id))
  return -90 + (360 / total) * index
}

function syncRouletteMapLayoutVars() {
  if (!navalBoard) return

  const total = Math.max(1, navalPlayers.length)
  const rect = navalBoardWrap?.getBoundingClientRect?.() || navalBoard.getBoundingClientRect?.() || { width: 620, height: 500 }
  const wrapWidth = rect.width || navalBoardWrap?.clientWidth || 620
  const wrapHeight = rect.height || navalBoardWrap?.clientHeight || 500
  const isMobileViewport = window.innerWidth <= 760

  let nodeWidth = isMobileViewport ? 76 : 118
  let nodeHeight = isMobileViewport ? 74 : 102
  let avatarSize = isMobileViewport ? 24 : 30

  if (total > 4) {
    nodeWidth = isMobileViewport ? 72 : 110
    nodeHeight = isMobileViewport ? 70 : 96
    avatarSize = isMobileViewport ? 22 : 28
  }
  if (total > 6) {
    nodeWidth = isMobileViewport ? 68 : 104
    nodeHeight = isMobileViewport ? 66 : 90
    avatarSize = isMobileViewport ? 20 : 26
  }
  if (total > 8) {
    nodeWidth = isMobileViewport ? 64 : 98
    nodeHeight = isMobileViewport ? 62 : 84
    avatarSize = isMobileViewport ? 19 : 24
  }

  const edgePadding = isMobileViewport ? 12 : 20
  const minRadius = isMobileViewport ? 96 : 70
  const maxRadius = Math.max(minRadius, Math.min(
    (wrapWidth - nodeWidth) / 2 - edgePadding,
    (wrapHeight - nodeHeight) / 2 - edgePadding
  ))
  const preferredRadius = Math.min(wrapWidth, wrapHeight) * (isMobileViewport ? (total > 6 ? 0.43 : 0.4) : (total > 10 ? 0.41 : 0.38))
  const radius = clampValue(Math.min(preferredRadius, maxRadius), minRadius, maxRadius)

  navalBoard.style.setProperty('--roulette-radius', `${Math.floor(radius)}px`)
  navalBoard.style.setProperty('--roulette-node-width', `${nodeWidth}px`)
  navalBoard.style.setProperty('--roulette-node-min-height', `${nodeHeight}px`)
  navalBoard.style.setProperty('--roulette-avatar-size', `${avatarSize}px`)
  navalBoard.classList.toggle('is-compact', total > (isMobileViewport ? 6 : 8))
  navalBoard.classList.toggle('is-tiny', total > (isMobileViewport ? 8 : 10))
}

function renderNavalBoardState() {
  if (!navalBoard) return

  const activeTarget = navalRunning && !navalFinished ? getRouletteCurrentTarget() : null
  const activeAngle = activeTarget ? getRouletteAngleForPlayer(activeTarget) : -90
  const aliveCount = getRouletteCurrentAlivePlayers().length
  const remaining = getRouletteRemainingShots()

  navalBoard.innerHTML = ''
  navalBoard.style.setProperty('--roulette-player-count', String(Math.max(1, navalPlayers.length)))
  syncRouletteMapLayoutVars()

  const gun = document.createElement('div')
  const normalizedAimAngle = ((((activeAngle % 360) + 540) % 360) - 180)
  const isRightAim = normalizedAimAngle > -90 && normalizedAimAngle < 90
  gun.className = `roulette-gun-core${navalRunning && !navalFinished ? ' is-live' : ''}${isRightAim ? ' is-right-aim' : ''}`
  gun.style.setProperty('--gun-angle', `${activeAngle + 90}deg`)
  gun.style.setProperty('--gun-target-angle', `${normalizedAimAngle}deg`)
  gun.innerHTML = `
    <span class="roulette-gun-emoji" aria-hidden="true">🔫</span>
  `
  navalBoard.appendChild(gun)

  navalPlayers.forEach((player, index) => {
    const angle = -90 + (360 / Math.max(1, navalPlayers.length)) * index
    const node = document.createElement('div')
    node.className = `roulette-player-node${player.isAlive ? '' : ' is-dead'}${activeTarget?.id === player.id ? ' is-active' : ''}`
    node.dataset.playerId = player.id
    node.style.setProperty('--player-angle', `${angle}deg`)
    node.style.setProperty('--player-color', player.color)
    node.innerHTML = `
      <span class="roulette-player-avatar">${player.isAlive ? (activeTarget?.id === player.id ? '😨' : '🙂') : '💀'}</span>
      <span class="roulette-player-name">${escapeHtml(player.label)}</span>
      <span class="roulette-player-state">${player.isAlive ? (activeTarget?.id === player.id ? '타깃' : '생존') : '사망'}</span>
    `
    navalBoard.appendChild(node)
  })

  if (navalBoardMeta) {
    navalBoardMeta.textContent = `${remaining}/${ROULETTE_CHAMBER_CAPACITY}`
  }

  const chamberCount = getRouletteChamberCountEl()
  if (chamberCount) {
    chamberCount.textContent = `${remaining}/${ROULETTE_CHAMBER_CAPACITY}`
  }

  renderRouletteBulletTrack()
}

function renderNavalLegend() {
  if (!navalLegend || !navalTotalInfo) return

  navalLegend.innerHTML = ''

  const ranking = navalPlayers.length
    ? (navalFinished ? getNavalFinalRanking() : getNavalProvisionalRanking())
    : []

  ranking.forEach((player, index) => {
    const chip = document.createElement('div')
    chip.className = `legend-chip roulette-sidebar-rank-chip${index === 0 ? ' top' : ''}${!player.isAlive ? ' is-eliminated' : ''}`
    chip.innerHTML = `
      <span class="legend-dot" style="background:${player.color};"></span>
      <span class="roulette-sidebar-rank-num">${index + 1}</span>
      <span class="roulette-sidebar-rank-meta">
        <strong>${escapeHtml(player.label)}</strong>
        <small>${player.isAlive ? '생존' : '사망'}</small>
      </span>
    `
    navalLegend.appendChild(chip)
  })

  const aliveCount = getRouletteCurrentAlivePlayers().length
  navalTotalInfo.textContent = `생존 ${aliveCount}명 / 총 ${navalPlayers.length}명`
}

function renderNavalLogs() {
  if (!navalLogList) return

  if (!navalLogs.length) {
    navalLogList.innerHTML = '<div class="roulette-log-empty">게임이 시작되면 발사 기록이 여기에 쌓인다.</div>'
    return
  }

  navalLogList.innerHTML = ''
  navalLogs.forEach((item) => {
    const row = document.createElement('div')
    row.className = `roulette-log-item ${item.type ? `type-${item.type}` : ''}`
    row.textContent = item.text
    navalLogList.appendChild(row)
  })
}

function getNavalAlivePlayers() {
  return getRouletteCurrentAlivePlayers()
}

function getNavalProvisionalRanking() {
  const alive = navalPlayers.filter((player) => player.isAlive)
  const eliminated = [...navalEliminationOrder].reverse()
  return [...alive, ...eliminated]
}

function getNavalFinalRanking() {
  const alive = navalPlayers.filter((player) => player.isAlive)
  const eliminated = [...navalEliminationOrder].reverse()
  return [...alive, ...eliminated]
}

function renderNavalRanking() {
  if (!navalRankingList) return

  const ranking = navalFinished ? getNavalFinalRanking() : getNavalProvisionalRanking()

  if (!ranking.length) {
    navalRankingList.innerHTML = '<div class="roulette-ranking-empty">참가자를 입력한 뒤 시작 버튼을 누르면 생존 순위가 표시된다.</div>'
    return
  }

  navalRankingList.innerHTML = ''

  ranking.forEach((player, index) => {
    const item = document.createElement('div')
    item.className = `roulette-ranking-item${index === 0 ? ' top' : ''}${!player.isAlive ? ' is-eliminated' : ''}`
    const subText = player.isAlive
      ? (navalFinished ? '최후의 1인 생존' : '아직 MAP에 남아 있음')
      : `${player.eliminatedOrder || '-'}번째 사망`
    item.innerHTML = `
      <div class="roulette-rank-num">${index + 1}</div>
      <div class="roulette-rank-main">
        <div class="roulette-rank-name"><span class="roulette-rank-color" style="--roulette-player-color:${player.color};"></span>${escapeHtml(player.label)}</div>
        <div class="roulette-rank-sub">${subText}</div>
      </div>
      <div class="roulette-rank-state ${player.isAlive ? '' : 'is-out'}">${player.isAlive ? '생존' : '사망'}</div>
    `
    navalRankingList.appendChild(item)
  })
}

function addNavalLog(text, type = '') {
  navalLogs.unshift({ text, type })
  navalLogs = navalLogs.slice(0, 40)
}

function updateNavalStatus(text) {
  if (!navalStatusText) return
  navalStatusText.textContent = text
}

function clearNavalBombTimer() {
  if (navalBombTimer) {
    clearTimeout(navalBombTimer)
    navalBombTimer = null
  }
}

function resetNavalBoardState() {
  releaseFastForward('game5')
  clearNavalBombTimer()
  rouletteTurnIndex = 0
  rouletteChamber = []
  rouletteRoundNumber = 1
  rouletteShotNumber = 0
  rouletteShotInProgress = false
  navalRunning = false
  navalFinished = false
  navalEliminationOrder = []
  navalLogs = []
  navalLastBombIndex = null
  if (navalBombLayer) {
    navalBombLayer.innerHTML = ''
  }
}

function stopNavalGame(options = {}) {
  const { preserveBoard = false } = options
  clearNavalBombTimer()
  rouletteShotInProgress = false
  navalRunning = false

  if (!preserveBoard) {
    resetNavalBoardState()
    navalPlayers = []
    renderNavalBoardBase()
    renderNavalLegend()
    renderNavalLogs()
    renderNavalRanking()
  }
}

function updateNavalFromInput({ render = true } = {}) {
  if (!navalConfigInput) return false

  const parsed = parseNavalConfigToPlayers(navalConfigInput.value)

  if (parsed.status !== 'OK') {
    handleNavalParseFailure(parsed)
    return false
  }

  setNavalPlayers(parsed.players)

  if (!rouletteChamber.length) {
    rouletteChamber = Array.from({ length: ROULETTE_CHAMBER_CAPACITY }, () => 'blank')
  }

  if (render) {
    renderNavalBoardBase()
    renderNavalLegend()
    renderNavalLogs()
    renderNavalRanking()
  }

  updateNavalStatus(`실시간 반영 완료: 총 ${parsed.players.length}명 · 시작하면 실탄 여부를 숨긴 채 자동 발사된다.`)
  return true
}

function ensureNavalReady() {
  if (!navalConfigInput) return

  if (!navalPlayers.length) {
    const parsed = parseNavalConfigToPlayers(navalConfigInput.value)
    if (parsed.status === 'OK') {
      setNavalPlayers(parsed.players)
    } else {
      navalConfigInput.value = lastNavalValidConfigText || '홍길동, 김아무개, 박철수, 최영희'
      const fallbackParsed = parseNavalConfigToPlayers(navalConfigInput.value)
      if (fallbackParsed.status === 'OK') {
        setNavalPlayers(fallbackParsed.players)
      }
    }
  }

  if (!rouletteChamber.length) {
    rouletteChamber = Array.from({ length: ROULETTE_CHAMBER_CAPACITY }, () => 'blank')
  }

  renderNavalBoardBase()
  renderNavalLegend()
  renderNavalLogs()
  renderNavalRanking()
  updateNavalDescription()
}

function getRandomNavalTargetIndex() {
  return -1
}

function animateNavalBombDrop() {
  return Promise.resolve()
}

function applyNavalBombResult() {
  return { type: 'noop' }
}

function sleepRoulette(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function createRouletteEffectNode(className, x, y, text = '') {
  if (!navalBombLayer) return null
  const node = document.createElement('div')
  node.className = className
  node.style.left = `${x}px`
  node.style.top = `${y}px`
  if (text) node.textContent = text
  navalBombLayer.appendChild(node)
  return node
}

function createRouletteFireworkParticles(x, y) {
  if (!navalBombLayer) return []
  const particleCount = APP_PERFORMANCE_PROFILE.isMobile ? 7 : APP_PERFORMANCE_PROFILE.isLowEndDesktop ? 10 : 14
  return Array.from({ length: particleCount }, (_, index) => {
    const particle = document.createElement('span')
    particle.className = 'roulette-firework-particle'
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
    const angle = (index * Math.PI * 2) / particleCount
    const distance = 28 + (index % 4) * 8
    const fx = Math.cos(angle) * distance
    const fy = Math.sin(angle) * distance
    particle.style.setProperty('--fx', `${fx}px`)
    particle.style.setProperty('--fy', `${fy}px`)
    particle.style.setProperty('--fx2', `${fx * 1.42}px`)
    particle.style.setProperty('--fy2', `${fy * 1.42}px`)
    navalBombLayer.appendChild(particle)
    return particle
  })
}

async function animateRouletteShot(targetPlayer, shotType) {
  const targetNode = navalBoard?.querySelector(`.roulette-player-node[data-player-id="${targetPlayer.id}"]`)
  const gun = navalBoard?.querySelector('.roulette-gun-core')

  if (!targetNode || !gun || !navalBoardWrap || !navalBombLayer) {
    return sleepRoulette(Math.max(300, ROULETTE_ANIMATION_MS / getFastForwardMultiplier('game5')))
  }

  const speedMultiplier = getFastForwardMultiplier('game5')
  const aimDuration = Math.max(160, (ROULETTE_ANIMATION_MS * 0.28) / speedMultiplier)
  const shotDuration = Math.max(210, (ROULETTE_ANIMATION_MS * 0.46) / speedMultiplier)
  const resultDuration = Math.max(300, (ROULETTE_ANIMATION_MS * 0.62) / speedMultiplier)

  const wrapRect = navalBoardWrap.getBoundingClientRect()
  const gunRect = gun.getBoundingClientRect()
  const targetRect = targetNode.getBoundingClientRect()
  const startX = gunRect.left - wrapRect.left + gunRect.width / 2
  const startY = gunRect.top - wrapRect.top + gunRect.height / 2
  const endX = targetRect.left - wrapRect.left + targetRect.width / 2
  const endY = targetRect.top - wrapRect.top + targetRect.height / 2
  const deltaX = endX - startX
  const deltaY = endY - startY
  const distance = Math.max(20, Math.hypot(deltaX, deltaY))
  const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI

  navalBombLayer.innerHTML = ''
  targetNode.classList.add('is-targeted')
  gun.classList.add('is-firing')
  playSfx('rouletteAim')

  const flash = createRouletteEffectNode('roulette-muzzle-flash', startX, startY)
  await sleepRoulette(aimDuration)

  playSfx(shotType === 'hit' ? 'rouletteShot' : shotType === 'firework' ? 'rouletteFirework' : 'rouletteEmpty')
  const beam = document.createElement('div')
  beam.className = `roulette-shot-beam is-${shotType}`
  beam.style.left = `${startX}px`
  beam.style.top = `${startY}px`
  beam.style.width = `${distance}px`
  beam.style.transform = `rotate(${angle}deg)`
  beam.style.setProperty('--shot-distance', `${distance}px`)
  navalBombLayer.appendChild(beam)

  const bolt = document.createElement('div')
  bolt.className = `roulette-shot-bolt is-${shotType}`
  bolt.style.left = `${startX}px`
  bolt.style.top = `${startY}px`
  navalBombLayer.appendChild(bolt)
  bolt.animate(
    [
      { transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(0px) scale(0.8)`, opacity: 0 },
      { transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${distance * 0.18}px) scale(1)`, opacity: 1, offset: 0.18 },
      { transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${distance}px) scale(0.88)`, opacity: 1 }
    ],
    { duration: shotDuration, easing: 'cubic-bezier(0.12, 0.82, 0.18, 1)', fill: 'forwards' }
  )

  await sleepRoulette(shotDuration)

  beam.remove()
  bolt.remove()
  flash?.remove()

  if (shotType === 'hit') {
    targetNode.classList.add('is-hit')
    createRouletteEffectNode('roulette-hit-burst', endX, endY)
  } else if (shotType === 'firework') {
    targetNode.classList.add('is-firework')
    createRouletteEffectNode('roulette-firework-burst', endX, endY, '🎆')
    createRouletteFireworkParticles(endX, endY)
  } else {
    targetNode.classList.add('is-blank')
    createRouletteEffectNode('roulette-blank-spark', endX, endY, '✨')
  }

  await sleepRoulette(resultDuration)

  targetNode.classList.remove('is-targeted', 'is-hit', 'is-blank', 'is-firework')
  gun.classList.remove('is-firing')

  if (navalBombLayer) {
    navalBombLayer.innerHTML = ''
  }
}

function reloadRouletteChamberForAlive() {
  const aliveCount = getRouletteCurrentAlivePlayers().length
  playSfx('rouletteReload')
  buildRouletteChamber(aliveCount)
  addNavalLog(`탄창 리셋 · ${ROULETTE_CHAMBER_CAPACITY}/${ROULETTE_CHAMBER_CAPACITY}`, 'reload')
}

function maybeFinishNavalGame() {
  if (navalFinished) return true

  const alivePlayers = getRouletteCurrentAlivePlayers()
  if (alivePlayers.length > 1) return false

  navalRunning = false
  navalFinished = true
  clearNavalBombTimer()
  setNavalInputLock(false)

  const ranking = getNavalFinalRanking()
  ranking.forEach((player, index) => {
    player.finalPlace = index + 1
  })

  if (ranking[0]) {
    addNavalLog(`${ranking[0].label} 최후의 1인 생존`, 'final')
    updateNavalStatus(`${ranking[0].label} 최후의 1인 생존! 최종 결과를 확인해줘.`)
  } else {
    updateNavalStatus('게임이 종료되었다.')
  }

  renderNavalBoardState()
  renderNavalLegend()
  renderNavalLogs()
  renderNavalRanking()

  const html = `
    <div class="roulette-final-list">
      ${ranking.map((player, index) => `
        <div class="roulette-final-item${index === 0 ? ' top' : ''}">
          <span class="roulette-final-rank">${index + 1}위</span>
          <strong>${escapeHtml(player.label)}</strong>
          <small>${index === 0 ? '최후의 1인 생존' : `${player.eliminatedOrder || '-'}번째 사망`}</small>
        </div>
      `).join('')}
    </div>
  `

  showPopup('러시안 룰렛 결과', html || '<span>결과가 없습니다.</span>', {
    icon: '🏆',
    allowHtml: true,
    popupClass: 'roulette-final-popup'
  })

  return true
}

async function executeNavalBombTurn() {
  await fireRouletteTurn()
}

async function fireRouletteTurn() {
  if (!navalRunning || navalFinished || rouletteShotInProgress) return

  const alivePlayers = getRouletteCurrentAlivePlayers()
  if (alivePlayers.length <= 1) {
    maybeFinishNavalGame()
    return
  }

  if (!rouletteChamber.length) {
    reloadRouletteChamberForAlive()
  }

  rouletteTurnIndex = rouletteTurnIndex % alivePlayers.length
  const targetPlayer = alivePlayers[rouletteTurnIndex]
  if (!targetPlayer) return

  const bullet = rouletteChamber.shift() || 'blank'
  const isHit = bullet === 'live'
  rouletteShotNumber += 1
  rouletteShotInProgress = true
  playSfx('rouletteSpin')

  renderNavalBoardState()
  updateNavalStatus(`${targetPlayer.label} 차례 · 총구가 타깃을 향했다.`)

  const shotType = isHit ? 'hit' : (Math.random() < 0.42 ? 'firework' : 'blank')
  await animateRouletteShot(targetPlayer, shotType)

  if (!navalRunning || navalFinished) {
    rouletteShotInProgress = false
    return
  }

  if (isHit) {
    playSfx('rouletteEliminate')
    targetPlayer.isAlive = false
    targetPlayer.eliminatedOrder = navalEliminationOrder.length + 1
    navalEliminationOrder.push(targetPlayer)
    addNavalLog(`${rouletteShotNumber}번째 발사 · ${targetPlayer.label} 피격 · 사망 처리`, 'hit')
    updateNavalStatus(`${targetPlayer.label} 피격! MAP에서 사망 처리되고 탄창이 다시 리셋된다.`)
    reloadRouletteChamberForAlive()
    const nextAlive = getRouletteCurrentAlivePlayers()
    rouletteTurnIndex = nextAlive.length ? rouletteTurnIndex % nextAlive.length : 0
  } else {
    if (shotType === 'firework') {
      addNavalLog(`${rouletteShotNumber}번째 발사 · ${targetPlayer.label} 폭죽 · 생존`, 'blank')
      updateNavalStatus(`${targetPlayer.label} 앞에서 폭죽이 터졌다! 효과는 없고 다음 차례로 넘어간다.`)
    } else {
      addNavalLog(`${rouletteShotNumber}번째 발사 · ${targetPlayer.label} 불발 · 생존`, 'blank')
      updateNavalStatus(`${targetPlayer.label} 불발! 다음 참가자 차례로 넘어간다.`)
    }
    rouletteTurnIndex = (rouletteTurnIndex + 1) % alivePlayers.length
  }

  rouletteShotInProgress = false
  renderNavalBoardState()
  renderNavalLegend()
  renderNavalLogs()
  renderNavalRanking()

  if (!maybeFinishNavalGame()) {
    navalBombTimer = setTimeout(fireRouletteTurn, getScaledDelay(ROULETTE_SHOT_DELAY_MS, 'game5', 260))
  }
}

function startNavalGame() {
  if (!navalConfigInput || navalRunning) return

  const parsed = parseNavalConfigToPlayers(navalConfigInput.value)

  if (parsed.status !== 'OK') {
    handleNavalParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  if (parsed.players.length < 2) {
    showMinParticipantsPopup(ROULETTE_MAX_PLAYERS)
    return
  }

  resetNavalBoardState()
  setNavalPlayers(parsed.players)
  buildRouletteChamber(parsed.players.length)
  playSfx('rouletteReload')
  navalRunning = true
  navalFinished = false
  setNavalInputLock(true)

  addNavalLog(`게임 시작 · 참가자 ${parsed.players.length}명 · 탄창 ${ROULETTE_CHAMBER_CAPACITY}/${ROULETTE_CHAMBER_CAPACITY}`, 'start')
  updateNavalStatus('러시안 룰렛 시작! 실탄 여부는 공개되지 않고 중앙 총이 참가자를 순서대로 조준한다.')
  renderNavalBoardState()
  renderNavalLegend()
  renderNavalLogs()
  renderNavalRanking()

  navalBombTimer = setTimeout(fireRouletteTurn, getScaledDelay(ROULETTE_FIRST_SHOT_DELAY_MS, 'game5', 180))
}

function resetNavalGame() {
  resetNavalBoardState()
  setNavalInputLock(false)

  if (!navalConfigInput) return

  const parsed = parseNavalConfigToPlayers(navalConfigInput.value)
  if (parsed.status === 'OK') {
    setNavalPlayers(parsed.players)
  } else {
    navalConfigInput.value = lastNavalValidConfigText || '홍길동, 김아무개, 박철수, 최영희'
    const fallbackParsed = parseNavalConfigToPlayers(navalConfigInput.value)
    if (fallbackParsed.status === 'OK') {
      setNavalPlayers(fallbackParsed.players)
    }
  }

  rouletteChamber = Array.from({ length: ROULETTE_CHAMBER_CAPACITY }, () => 'blank')
  renderNavalBoardBase()
  renderNavalLegend()
  renderNavalLogs()
  renderNavalRanking()
  updateNavalStatus('리셋 완료. 시작 버튼을 누르면 총이 다시 자동 발사된다.')
}
