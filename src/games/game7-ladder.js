/* generated from script.js · game7-ladder.js */
const LADDER_DESKTOP_MAX_PLAYERS = 8
const LADDER_MOBILE_MAX_PLAYERS = 5
const LADDER_MIN_PLAYERS = 2
const LADDER_PLAYER_PALETTE = ['#ff82ad', '#6ce8d1', '#7fd8ff', '#ffd56f', '#c9b6ff', '#ffa97d', '#9fe9df', '#ffb087', '#d6c3ff', '#89f2b8', '#ffe07e', '#ffb6dc']

let ladderPlayers = []
let ladderRungs = []
let ladderResults = []
let ladderCheckedIds = new Set()
let ladderGameStarted = false
let ladderRevealed = false
let ladderRows = 0
let ladderLastValidConfigText = ladderConfigInput ? ladderConfigInput.value : ''
let ladderAutoRunning = false
let ladderActivePlayerId = ''
let ladderRunToken = 0
let ladderActiveProgress = 0
let ladderProgressRaf = null

function getLadderMaxPlayers() {
  return isMobileOrTabletLike() ? LADDER_MOBILE_MAX_PLAYERS : LADDER_DESKTOP_MAX_PLAYERS
}

function updateLadderHelperText() {
  if (!ladderHelperText) return
  const max = getLadderMaxPlayers()
  ladderHelperText.textContent = isMobileOrTabletLike()
    ? `이름(번호) 형식만 가능. 모바일 최대 ${max}명, 번호는 1~참가자 수 안에서 중복 없이 입력.`
    : `이름(번호) 형식만 가능. 데스크톱 최대 ${max}명, 번호는 1~참가자 수 안에서 중복 없이 입력.`
}

function parseLadderPlayers(text) {
  const maxPlayers = getLadderMaxPlayers()
  const rawItems = String(text || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (!rawItems.length) return { status: 'EMPTY', maxPlayers }
  if (rawItems.length < LADDER_MIN_PLAYERS) return { status: 'TOO_FEW', count: rawItems.length, maxPlayers }
  if (rawItems.length > maxPlayers) return { status: 'TOO_MANY', count: rawItems.length, maxPlayers }

  const participantCount = rawItems.length
  const seenNames = new Set()
  const seenLanes = new Set()
  const players = []

  for (const raw of rawItems) {
    const match = raw.match(/^(.+?)\s*\(\s*(\d+)\s*\)$/)
    if (!match) {
      return { status: 'INVALID_FORMAT', value: raw, maxPlayers }
    }

    const label = match[1].trim()
    const laneNumber = Number(match[2])

    if (!label || !Number.isInteger(laneNumber)) {
      return { status: 'INVALID_FORMAT', value: raw, maxPlayers }
    }

    if (laneNumber < 1 || laneNumber > participantCount) {
      return { status: 'OUT_OF_RANGE', laneNumber, participantCount, maxPlayers }
    }

    if (seenNames.has(label)) {
      return { status: 'DUPLICATE_NAME', name: label, maxPlayers }
    }

    if (seenLanes.has(laneNumber)) {
      return { status: 'DUPLICATE_LANE', laneNumber, maxPlayers }
    }

    seenNames.add(label)
    seenLanes.add(laneNumber)

    players.push({
      id: `ladder-player-${players.length + 1}`,
      label,
      raw,
      laneNumber,
      startLane: laneNumber - 1,
      color: LADDER_PLAYER_PALETTE[(laneNumber - 1) % LADDER_PLAYER_PALETTE.length]
    })
  }

  return {
    status: 'OK',
    players: players.sort((a, b) => a.startLane - b.startLane),
    maxPlayers
  }
}

function setLadderInputLock(isLocked) {
  if (ladderConfigInput) {
    ladderConfigInput.disabled = isLocked
    ladderConfigInput.style.opacity = isLocked ? '0.65' : '1'
    ladderConfigInput.style.cursor = isLocked ? 'not-allowed' : ''
  }

  if (shuffleLadderBtn) {
    shuffleLadderBtn.disabled = true
    shuffleLadderBtn.style.display = 'none'
  }
}

function handleLadderParseFailure(parsed, options = {}) {
  const { showPopupOnInvalid = false } = options
  const maxPlayers = parsed?.maxPlayers || getLadderMaxPlayers()
  let title = '입력 확인'
  let message = `홍길동(1), 김아무개(2)처럼 이름(사다리번호) 형식으로 입력해줘.`

  if (parsed.status === 'TOO_MANY') {
    title = '참가자 수 초과'
    message = `투명 사다리 타기는 현재 환경에서 최대 ${maxPlayers}명까지 가능해.`
  } else if (parsed.status === 'TOO_FEW' || parsed.status === 'EMPTY') {
    title = '참가자 등록 확인'
    message = `최소 ${LADDER_MIN_PLAYERS}명 이상 입력해야 해.`
  } else if (parsed.status === 'INVALID_FORMAT') {
    title = '입력 형식 확인'
    message = `이번 게임은 반드시 홍길동(1), 김아무개(2)처럼 이름 뒤에 사용할 사다리 번호를 괄호로 적어야 해.`
  } else if (parsed.status === 'DUPLICATE_NAME') {
    title = '중복 이름 불가'
    message = `같은 이름은 중복 등록할 수 없어: ${parsed.name}`
  } else if (parsed.status === 'DUPLICATE_LANE') {
    title = '중복 사다리 불가'
    message = `${parsed.laneNumber}번 사다리는 이미 다른 참가자가 선택했어. 각 사다리는 한 명만 사용할 수 있어.`
  } else if (parsed.status === 'OUT_OF_RANGE') {
    title = '사다리 번호 확인'
    message = `참가자가 ${parsed.participantCount}명이면 사다리 번호는 1~${parsed.participantCount}까지만 사용할 수 있어.`
  }

  if (ladderStatusText) {
    ladderStatusText.textContent = message.replace(/<[^>]*>/g, '')
  }
  if (showPopupOnInvalid) {
    showPopup(title, message, { icon: '⚠️', allowHtml: true })
  }
  return false
}

function setLadderPlayers(players) {
  ladderPlayers = players
    .slice()
    .sort((a, b) => a.startLane - b.startLane)
    .map((player, index) => ({
      ...player,
      id: `ladder-player-${index + 1}`,
      color: LADDER_PLAYER_PALETTE[index % LADDER_PLAYER_PALETTE.length]
    }))
  ladderLastValidConfigText = ladderConfigInput ? ladderConfigInput.value : ladderLastValidConfigText
}

function updateLadderFromInput(options = {}) {
  const { render = true } = options
  if (!ladderConfigInput) return false

  updateLadderHelperText()
  const parsed = parseLadderPlayers(ladderConfigInput.value)
  if (parsed.status !== 'OK') {
    handleLadderParseFailure(parsed)
    if (render) renderLadderGame()
    return false
  }

  setLadderPlayers(parsed.players)
  ladderGameStarted = false
  ladderRevealed = false
  ladderCheckedIds = new Set()
  ladderRungs = []
  ladderResults = []
  ladderRows = 0
  ladderAutoRunning = false
  ladderActivePlayerId = ''

  if (ladderStatusText) {
    ladderStatusText.textContent = `참가자 ${ladderPlayers.length}명 준비 완료. 시작하면 1번 사다리부터 순서대로 내려와.`
  }

  if (render) renderLadderGame()
  return true
}

function ensureLadderReady() {
  updateLadderHelperText()
  if (!ladderPlayers.length && ladderConfigInput) {
    const parsed = parseLadderPlayers(ladderConfigInput.value)
    if (parsed.status === 'OK') {
      setLadderPlayers(parsed.players)
    }
  }
  renderLadderGame()
}

function buildTransparentLadder(count) {
  const rows = Math.max(8, count * 3)
  const rungs = []
  const laneTouchCount = Array.from({ length: Math.max(0, count - 1) }, () => 0)

  for (let row = 0; row < rows; row += 1) {
    const used = new Set()
    const lineCount = count <= 3 ? 1 : (Math.random() < 0.28 ? 2 : 1)

    for (let attempt = 0; attempt < lineCount; attempt += 1) {
      const candidates = []
      for (let lane = 0; lane < count - 1; lane += 1) {
        if (used.has(lane) || used.has(lane - 1) || used.has(lane + 1)) continue
        const sameAbove = rungs.some((rung) => rung.row === row - 1 && rung.leftLane === lane)
        if (sameAbove) continue
        candidates.push(lane)
      }
      if (!candidates.length) continue
      candidates.sort((a, b) => laneTouchCount[a] - laneTouchCount[b] || Math.random() - 0.5)
      const selected = candidates[0]
      used.add(selected)
      laneTouchCount[selected] += 1
      rungs.push({ row, leftLane: selected })
    }
  }

  for (let lane = 0; lane < count - 1; lane += 1) {
    if (laneTouchCount[lane] > 0) continue
    const row = Math.floor(rand(1, rows - 1))
    if (!rungs.some((rung) => rung.row === row && Math.abs(rung.leftLane - lane) <= 1)) {
      rungs.push({ row, leftLane: lane })
    }
  }

  rungs.sort((a, b) => a.row - b.row || a.leftLane - b.leftLane)
  return { rows, rungs }
}

function resolveLadderEndLane(startLane, rungs, rows) {
  let lane = startLane
  for (let row = 0; row < rows; row += 1) {
    const rowRungs = rungs.filter((rung) => rung.row === row)
    for (const rung of rowRungs) {
      if (rung.leftLane === lane) {
        lane += 1
        break
      }
      if (rung.leftLane === lane - 1) {
        lane -= 1
        break
      }
    }
  }
  return lane
}

function isLadderMobilePortraitView() {
  return isMobileOrTabletLike() && isPortraitMode() && window.innerWidth <= 820
}

function getCompactLadderLabel(label) {
  const text = String(label || '')
  if (!isLadderMobilePortraitView()) return text
  return text.length > 4 ? `${text.slice(0, 4)}…` : text
}

function getLadderGeometry(count, rows) {
  const useMobilePortrait = isLadderMobilePortraitView()

  if (useMobilePortrait) {
    const width = 420
    const height = 760
    const topY = 168
    const bottomY = 600
    const leftX = count === 1 ? width / 2 : 58
    const rightX = count === 1 ? width / 2 : width - 58
    const gap = count <= 1 ? 0 : (rightX - leftX) / (count - 1)
    const rowGap = rows <= 1 ? 0 : (bottomY - topY) / rows
    const laneX = (index) => leftX + gap * index
    const yForRow = (row) => topY + rowGap * (row + 0.55)

    return {
      width,
      height,
      topY,
      bottomY,
      leftX,
      rightX,
      gap,
      rowGap,
      laneX,
      yForRow,
      isMobilePortrait: true,
      topLabelY: 64,
      topCircleR: 23,
      topNameY: 56,
      topLaneY: 84,
      rankY: 682,
      rankRectX: -42,
      rankRectY: -28,
      rankRectWidth: 84,
      rankRectHeight: 46,
      rankRectRadius: 23,
      rankTextY: 4,
      runnerR: 21,
      runnerTextY: 8
    }
  }

  const width = 1000
  const height = 560
  const topY = 88
  const bottomY = 452
  const leftX = count === 1 ? 500 : 90
  const rightX = count === 1 ? 500 : 910
  const gap = count <= 1 ? 0 : (rightX - leftX) / (count - 1)
  const rowGap = rows <= 1 ? 0 : (bottomY - topY) / rows
  const laneX = (index) => leftX + gap * index
  const yForRow = (row) => topY + rowGap * (row + 0.55)

  return {
    width,
    height,
    topY,
    bottomY,
    leftX,
    rightX,
    gap,
    rowGap,
    laneX,
    yForRow,
    isMobilePortrait: false,
    topLabelY: 38,
    topCircleR: 16,
    topNameY: 38,
    topLaneY: 62,
    rankY: 520,
    rankRectX: -34,
    rankRectY: -22,
    rankRectWidth: 68,
    rankRectHeight: 36,
    rankRectRadius: 18,
    rankTextY: 2,
    runnerR: 18,
    runnerTextY: 7
  }
}

function getLadderPathData(points) {
  if (!Array.isArray(points) || !points.length) return ''
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
}

function getLadderPointAtProgress(points, progress) {
  if (!Array.isArray(points) || !points.length) return { x: 0, y: 0 }
  if (points.length === 1) return points[0]

  const safeProgress = clampValue(progress, 0, 1)
  const segments = []
  let totalLength = 0

  for (let index = 1; index < points.length; index += 1) {
    const from = points[index - 1]
    const to = points[index]
    const length = Math.hypot(to.x - from.x, to.y - from.y)
    segments.push({ from, to, length })
    totalLength += length
  }

  if (!totalLength) return points[points.length - 1]

  let targetLength = totalLength * safeProgress
  for (const segment of segments) {
    if (targetLength > segment.length) {
      targetLength -= segment.length
      continue
    }

    const ratio = segment.length ? targetLength / segment.length : 0
    return {
      x: segment.from.x + (segment.to.x - segment.from.x) * ratio,
      y: segment.from.y + (segment.to.y - segment.from.y) * ratio
    }
  }

  return points[points.length - 1]
}

function stopLadderProgressAnimation() {
  if (ladderProgressRaf) {
    cancelAnimationFrame(ladderProgressRaf)
    ladderProgressRaf = null
  }
}

function updateLadderRunnerPosition() {
  if (!ladderBoard || !ladderGameStarted || !ladderActivePlayerId || !ladderPlayers.length) return

  const activePlayer = getLadderPlayerById(ladderActivePlayerId)
  if (!activePlayer) return

  let runnerEl = ladderBoard.querySelector('.ladder-active-runner')
  if (!runnerEl) {
    renderLadderGame()
    runnerEl = ladderBoard.querySelector('.ladder-active-runner')
    if (!runnerEl) return
  }

  const rows = ladderRows || Math.max(6, ladderPlayers.length * 2)
  const geometry = getLadderGeometry(ladderPlayers.length, rows)
  const path = getLadderPathPoints(activePlayer.startLane, ladderRungs, rows, geometry)
  const point = getLadderPointAtProgress(path.points, ladderActiveProgress)
  runnerEl.setAttribute('transform', `translate(${point.x}, ${point.y})`)
}

function animateLadderRunnerProgress(token, duration) {
  stopLadderProgressAnimation()
  ladderActiveProgress = 0

  return new Promise((resolve) => {
    const startedAt = performance.now()

    const step = (now) => {
      if (token !== ladderRunToken || !screens.game7?.classList.contains('active') || !ladderActivePlayerId) {
        ladderProgressRaf = null
        resolve(false)
        return
      }

      const elapsed = now - startedAt
      ladderActiveProgress = clampValue(elapsed / duration, 0, 1)
      playThrottledSfx('ladderStep', SFX_THROTTLE_MS.ladderStep)
      updateLadderRunnerPosition()

      if (ladderActiveProgress >= 1) {
        ladderProgressRaf = null
        resolve(true)
        return
      }

      ladderProgressRaf = requestAnimationFrame(step)
    }

    updateLadderRunnerPosition()
    ladderProgressRaf = requestAnimationFrame(step)
  })
}

function getLadderRankFillByLane() {
  const fillMap = new Map()
  ladderResults.forEach((result) => {
    if (!ladderCheckedIds.has(result.playerId)) return
    const player = getLadderPlayerById(result.playerId)
    if (!player) return
    fillMap.set(result.endLane, player)
  })
  return fillMap
}

function getLadderPathPoints(startLane, rungs, rows, geometry) {
  const points = []
  let lane = startLane
  points.push({ x: geometry.laneX(lane), y: geometry.topY })

  for (let row = 0; row < rows; row += 1) {
    const y = geometry.yForRow(row)
    points.push({ x: geometry.laneX(lane), y })

    const rightRung = rungs.find((rung) => rung.row === row && rung.leftLane === lane)
    const leftRung = rungs.find((rung) => rung.row === row && rung.leftLane === lane - 1)

    if (rightRung) {
      lane += 1
      points.push({ x: geometry.laneX(lane), y })
    } else if (leftRung) {
      lane -= 1
      points.push({ x: geometry.laneX(lane), y })
    }
  }

  points.push({ x: geometry.laneX(lane), y: geometry.bottomY })
  return { points, endLane: lane }
}

function computeLadderResults() {
  ladderResults = ladderPlayers.map((player) => {
    const endLane = resolveLadderEndLane(player.startLane, ladderRungs, ladderRows)
    return {
      playerId: player.id,
      label: player.label,
      color: player.color,
      startLane: player.startLane,
      laneNumber: player.laneNumber,
      endLane,
      rank: endLane + 1
    }
  })
}

function getLadderResultByPlayerId(playerId) {
  return ladderResults.find((result) => result.playerId === playerId) || null
}

function getLadderPlayerById(playerId) {
  return ladderPlayers.find((player) => player.id === playerId) || null
}

function getLadderFinalRanking() {
  return [...ladderResults].sort((a, b) => a.rank - b.rank)
}

function showLadderFinalRankingPopup() {
  const ranking = getLadderFinalRanking()
  const html = ranking.length
    ? `<div class="ladder-final-popup-list">${ranking.map((result) => `
        <div class="ladder-final-popup-item${result.rank === 1 ? ' top' : ''}">
          <span class="ladder-final-popup-rank">${result.rank}위</span>
          <strong>${escapeHtml(result.label)}</strong>
          <small>${result.laneNumber}번 사다리 → ${result.rank}등 도착</small>
        </div>
      `).join('')}</div>`
    : '<span>결과가 없습니다.</span>'

  showPopup('투명 사다리 종합 순위', html, {
    icon: '🏆',
    allowHtml: true,
    popupClass: 'ladder-final-popup'
  })
}

function getLadderStatusForPlayer(player) {
  if (!ladderGameStarted) return '대기'
  if (ladderActivePlayerId === player.id) return '내려가는 중'
  if (ladderCheckedIds.has(player.id)) return '결과 확인 완료'
  return '순서 대기'
}

async function runLadderAutoSequence(token) {
  if (ladderAutoRunning) return
  ladderAutoRunning = true

  const order = [...ladderPlayers].sort((a, b) => a.startLane - b.startLane)
  const traceDelay = 4700
  const settleDelay = 820

  for (const player of order) {
    if (token !== ladderRunToken || !screens.game7?.classList.contains('active')) break

    ladderActivePlayerId = player.id
    ladderActiveProgress = 0
    if (ladderStatusText) {
      ladderStatusText.textContent = `${player.laneNumber}번 사다리 · ${player.label}이 천천히 내려오는 중이야.`
    }
    renderLadderGame()

    const completedMove = await animateLadderRunnerProgress(token, traceDelay)
    if (!completedMove || token !== ladderRunToken || !screens.game7?.classList.contains('active')) break

    const result = getLadderResultByPlayerId(player.id)
    if (result) {
      ladderCheckedIds.add(player.id)
      ladderActiveProgress = 1
      ladderActivePlayerId = ''
      if (ladderStatusText) {
        ladderStatusText.textContent = `${player.label} 도착 완료. 다음 참가자가 이어서 내려와.`
      }
      renderLadderGame()
      await new Promise((resolve) => setTimeout(resolve, settleDelay))
    }
  }

  const isCompleted = token === ladderRunToken && ladderCheckedIds.size === ladderPlayers.length
  ladderActivePlayerId = ''
  ladderAutoRunning = false

  if (isCompleted) {
    revealLadderIfComplete()
    return
  }

  renderLadderGame()
}

function startLadderGame() {
  if (!ladderConfigInput || ladderAutoRunning || (ladderGameStarted && !ladderRevealed)) return

  const parsed = parseLadderPlayers(ladderConfigInput.value)
  if (parsed.status !== 'OK') {
    handleLadderParseFailure(parsed, { showPopupOnInvalid: true })
    return
  }

  setLadderPlayers(parsed.players)
  const ladder = buildTransparentLadder(ladderPlayers.length)
  ladderRows = ladder.rows
  ladderRungs = ladder.rungs
  ladderCheckedIds = new Set()
  ladderGameStarted = true
  ladderRevealed = false
  ladderActivePlayerId = ''
  ladderActiveProgress = 0
  computeLadderResults()
  setLadderInputLock(true)
  ladderRunToken += 1

  playSfx('ladderDraw')
  if (ladderStatusText) {
    ladderStatusText.textContent = '투명 사다리 시작! 왼쪽 1번 사다리부터 순서대로 내려온다.'
  }

  renderLadderGame()
  setTimeout(() => runLadderAutoSequence(ladderRunToken), 420)
}

function resetLadderGame() {
  ladderRunToken += 1
  stopLadderProgressAnimation()
  ladderAutoRunning = false
  ladderActivePlayerId = ''
  ladderActiveProgress = 0
  ladderGameStarted = false
  ladderRevealed = false
  ladderCheckedIds = new Set()
  ladderRungs = []
  ladderResults = []
  ladderRows = 0
  setLadderInputLock(false)
  updateLadderFromInput({ render: true })
}

function shuffleLadderParticipants() {
  showPopup('셔플 비활성화', '이번 게임은 참가자가 직접 사다리 번호를 선택해야 해서 셔플을 사용하지 않아.', { icon: '🪜' })
}

function revealLadderIfComplete() {
  if (!ladderGameStarted || ladderRevealed) return
  if (ladderCheckedIds.size < ladderPlayers.length) return

  ladderRevealed = true
  ladderActivePlayerId = ''
  ladderActiveProgress = 0
  setLadderInputLock(false)

  playSfx('ladderReveal')
  playSfx('ladderWin')
  if (ladderStatusText) {
    ladderStatusText.textContent = '모든 참가자가 사다리를 탔어. 숨겨져 있던 가로 라인과 종합 순위를 공개했어!'
  }

  renderLadderGame()
  showLadderFinalRankingPopup()
}

function checkLadderResult(playerId) {
  if (!ladderGameStarted) {
    showPopup('게임 시작 필요', '먼저 시작 버튼을 눌러 투명 사다리를 생성해줘.', { icon: '🪜' })
    return
  }

  const result = getLadderResultByPlayerId(playerId)
  if (!result) return

  ladderCheckedIds.add(playerId)
  renderLadderGame()
  revealLadderIfComplete()
}

function renderLadderBoard() {
  if (!ladderBoard) return

  const count = Math.max(0, ladderPlayers.length)
  const started = ladderGameStarted && count >= 2
  const revealedClass = ladderRevealed ? ' is-revealed' : ''
  const runningClass = ladderActivePlayerId ? ' is-running' : ''

  if (!count) {
    ladderBoard.className = 'ladder-board'
    ladderBoard.innerHTML = '<div class="ladder-empty-state">홍길동(1), 김아무개(2) 형식으로 참가자를 입력하면 사다리 보드가 준비돼.</div>'
    return
  }

  const rows = started ? ladderRows : Math.max(6, count * 2)
  const rungs = started ? ladderRungs : []
  const geometry = getLadderGeometry(count, rows)
  const laneX = geometry.laneX
  const yForRow = geometry.yForRow

  const verticalLines = ladderPlayers.map((player) => {
    const x = laneX(player.startLane)
    return `<line class="ladder-vertical-line" x1="${x}" y1="${geometry.topY}" x2="${x}" y2="${geometry.bottomY}" />`
  }).join('')

  const horizontalLines = rungs.map((rung) => {
    const x1 = laneX(rung.leftLane)
    const x2 = laneX(rung.leftLane + 1)
    const y = yForRow(rung.row)
    return `<line class="ladder-horizontal-line" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" />`
  }).join('')

  const activePlayer = getLadderPlayerById(ladderActivePlayerId)
  let activeMarker = ''
  if (started && activePlayer) {
    const path = getLadderPathPoints(activePlayer.startLane, rungs, rows, geometry)
    const runnerPoint = getLadderPointAtProgress(path.points, ladderActiveProgress)
    const runnerLabel = escapeHtml(activePlayer.label.slice(0, 1))
    activeMarker = `
      <g class="ladder-active-runner" transform="translate(${runnerPoint.x}, ${runnerPoint.y})" style="--ladder-player-color:${activePlayer.color};">
        <circle class="ladder-active-runner-body" cx="0" cy="0" r="${geometry.runnerR}"></circle>
        <text class="ladder-active-runner-text" x="0" y="${geometry.runnerTextY}">${runnerLabel}</text>
      </g>
    `
  }

  const rankFillByLane = getLadderRankFillByLane()

  const topLabels = ladderPlayers.map((player) => {
    const x = laneX(player.startLane)
    const isActive = ladderActivePlayerId === player.id
    const isDone = ladderCheckedIds.has(player.id)
    return `
      <g class="ladder-player-label${isActive ? ' is-active' : ''}${isDone ? ' is-done' : ''}" transform="translate(${x}, ${geometry.topLabelY})">
        <circle r="${geometry.topCircleR}" fill="${player.color}"></circle>
        <text y="${geometry.topNameY}">${escapeHtml(getCompactLadderLabel(player.label))}</text>
        <text class="ladder-lane-num" y="${geometry.topLaneY}">${player.laneNumber}번</text>
      </g>
    `
  }).join('')

  const bottomLabels = Array.from({ length: count }, (_, index) => {
    const x = laneX(index)
    const rank = index + 1
    const arrivedPlayer = rankFillByLane.get(index)
    const filledClass = arrivedPlayer ? ' is-filled' : ''
    const style = arrivedPlayer ? ` style="--ladder-rank-color:${arrivedPlayer.color};"` : ''
    return `
      <g class="ladder-rank-label${filledClass}" transform="translate(${x}, ${geometry.rankY})"${style}>
        <rect x="${geometry.rankRectX}" y="${geometry.rankRectY}" width="${geometry.rankRectWidth}" height="${geometry.rankRectHeight}" rx="${geometry.rankRectRadius}"></rect>
        <text y="${geometry.rankTextY}">${rank}등</text>
      </g>
    `
  }).join('')

  ladderBoard.className = `ladder-board${revealedClass}${runningClass}`
  ladderBoard.innerHTML = `
    <svg class="ladder-svg" viewBox="0 0 ${geometry.width} ${geometry.height}" role="img" aria-label="투명 사다리">
      <g class="ladder-grid-lines">
        ${verticalLines}
        ${horizontalLines}
        ${activeMarker}
      </g>
      <g class="ladder-top-labels">${topLabels}</g>
      <g class="ladder-bottom-labels">${bottomLabels}</g>
    </svg>
    <div class="ladder-board-caption">${ladderRevealed ? '숨겨졌던 가로 라인이 모두 공개됨' : (ladderActivePlayerId ? '현재 참가자가 투명 사다리를 내려오는 중' : '가로 라인은 투명 처리됨')}</div>
  `
}

function renderLadderCheckList() {
  if (!ladderCheckList || !ladderTotalInfo) return

  const checkedCount = ladderCheckedIds.size
  const total = ladderPlayers.length
  ladderTotalInfo.textContent = total ? (ladderGameStarted ? `${checkedCount}/${total}명 완료` : `총 ${total}명`) : '총 0명'

  if (!total) {
    ladderCheckList.innerHTML = '<div class="ladder-check-empty">홍길동(1), 김아무개(2) 형식으로 입력하면 참가자 준비 현황이 표시돼.</div>'
    return
  }

  const rows = ladderPlayers.map((player) => {
    const done = ladderCheckedIds.has(player.id)
    const active = ladderActivePlayerId === player.id
    const result = getLadderResultByPlayerId(player.id)
    const stateText = getLadderStatusForPlayer(player)
    const resultText = done && result ? `${result.rank}등` : `${player.laneNumber}번 사다리`
    return `
      <div class="ladder-check-item${done ? ' is-checked' : ''}${active ? ' is-active' : ''}" style="--ladder-player-color:${player.color};">
        <span class="ladder-check-dot"></span>
        <span class="ladder-check-name">${escapeHtml(player.label)}</span>
        <span class="ladder-check-lane">${resultText}</span>
        <span class="ladder-check-result">${stateText}</span>
      </div>
    `
  }).join('')

  ladderCheckList.innerHTML = rows
}

function renderLadderGame() {
  updateLadderHelperText()
  renderLadderBoard()
  renderLadderCheckList()

  if (ladderRevealBadge) {
    ladderRevealBadge.textContent = ladderRevealed ? '가로 라인 공개' : '가로 라인 숨김'
    ladderRevealBadge.classList.toggle('is-revealed', ladderRevealed)
  }
}
