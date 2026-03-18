const screens = {
  home: document.getElementById('homeScreen'),
  menu: document.getElementById('menuScreen'),
  luck: document.getElementById('luckScreen'),
  game1: document.getElementById('game1Screen')
};

const startBtn = document.getElementById('startBtn');
const physicalBtn = document.getElementById('physicalBtn');
const luckBtn = document.getElementById('luckBtn');
const backButtons = document.querySelectorAll('.back-btn');
const gameLaunchButtons = document.querySelectorAll('.game-launch');
const comingSoonButtons = document.querySelectorAll('.game-coming-soon');

const popupOverlay = document.getElementById('popupOverlay');
const popupTitle = document.getElementById('popupTitle');
const popupMessage = document.getElementById('popupMessage');
const closePopupBtn = document.getElementById('closePopupBtn');
const popupIcon = document.querySelector('.popup-icon');

const configInput = document.getElementById('configInput');
const shuffleBtn = document.getElementById('shuffleBtn');
const startGameBtn = document.getElementById('startGameBtn');
const resetGameBtn = document.getElementById('resetGameBtn');
const statusText = document.getElementById('statusText');
const totalInfo = document.getElementById('totalInfo');
const slotLegend = document.getElementById('slotLegend');
const slotOverlay = document.getElementById('slotOverlay');
const gameCanvasWrap = document.getElementById('gameCanvasWrap');

const gameSidebar = document.getElementById('gameSidebar');
const drawerToggleBtn = document.getElementById('drawerToggleBtn');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const orientationLockOverlay = document.getElementById('orientationLockOverlay');

const {
  Engine,
  Render,
  Runner,
  Bodies,
  Body,
  Composite,
  World,
  Events
} = Matter;

const MAX_SLOT_COUNT = 20;
const BALL_COUNT = 500;
const BOMB_COUNT = 20;
const TOTAL_DROP_COUNT = BALL_COUNT + BOMB_COUNT;
const SPAWN_INTERVAL_MS = 27;
const BOARD_SIDE_PADDING = 18;

const BASE_BOARD_WIDTH = 1366;
const BASE_BOARD_HEIGHT = 768;

const slotPalette = [
  '#f9d3df',
  '#d7f3e9',
  '#dceeff',
  '#fff2c9',
  '#ffdcbc',
  '#e4dbff',
  '#d7f7f0',
  '#ffe3ef',
  '#dff1ff',
  '#ffe8d3'
];

const ballPalette = [
  '#f8b8c9',
  '#bfe8d8',
  '#c6def8',
  '#f9db8f',
  '#d4c0ff',
  '#ffd1a6'
];

const nameColorMap = new Map();

function getColorForName(name) {
  if (!nameColorMap.has(name)) {
    const colorIndex = nameColorMap.size % slotPalette.length;
    nameColorMap.set(name, slotPalette[colorIndex]);
  }
  return nameColorMap.get(name);
}

function clampValue(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

let currentScale = 1;
let currentBoardPadding = BOARD_SIDE_PADDING;

function getBoardScale(width = 1366, height = 768) {
  return clampValue(
    Math.min(width / BASE_BOARD_WIDTH, height / BASE_BOARD_HEIGHT),
    0.58,
    1.18
  );
}

function S(value) {
  return value * currentScale;
}

let engine;
let render;
let runner;
let world;
let worldBodies = [];
let ballBodies = [];
let movingBodies = [];
let spawnTimers = [];
let countTimer = null;
let resizeTimer = null;
let countRefreshQueued = false;

let settleWatcherTimer = null;
let finalWatcherTimer = null;
let countdownTimers = [];

let roundSpawnComplete = false;
let bombSequenceStarted = false;
let bombSequenceFinished = false;
let resultCountdownStarted = false;
let finalResultsShown = false;

let settleStableTicks = 0;
let finalStableTicks = 0;

let boardWidth = 0;
let boardHeight = 720;
let slotAreaHeight = 100;

let currentSlots = [];
let lastValidConfigText = configInput.value;
let lastAppliedRawText = configInput.value;

let lastViewportWidth = window.innerWidth;
let lastViewportHeight = window.innerHeight;

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function showPopup(title, message, options = {}) {
  const {
    icon = '🛠️',
    allowHtml = false
  } = options;

  if (popupIcon) {
    popupIcon.textContent = icon;
  }

  popupTitle.textContent = title;

  if (allowHtml) {
    popupMessage.innerHTML = message;
  } else {
    popupMessage.textContent = message;
  }

  popupOverlay.classList.remove('hidden');
}

function showResultsPopup(resultItems) {
  const html = resultItems
    .map((item, index) => {
      return `<span style="display:block;margin:8px 0;"><strong>${index + 1}위. ${escapeHtml(item.name)}</strong> - ${item.count}개</span>`;
    })
    .join('');

  showPopup(
    '최종 결과',
    html || '<span>결과가 없습니다.</span>',
    { icon: '🏆', allowHtml: true }
  );
}

function closePopup() {
  popupOverlay.classList.add('hidden');
}

function setDrawerState(isOpen) {
  if (!gameSidebar || !drawerBackdrop) return;

  if (isMobileOrTabletLike()) {
    gameSidebar.classList.remove('open');
    drawerBackdrop.classList.remove('show');
    return;
  }

  gameSidebar.classList.toggle('open', isOpen);
  drawerBackdrop.classList.toggle('show', isOpen);
}

function isTouchDevice() {
  return window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
}

function isMobileOrTabletLike() {
  return window.innerWidth <= 1024 && isTouchDevice();
}

function isPortraitMode() {
  return window.matchMedia('(orientation: portrait)').matches;
}

function updateOrientationGate() {
  const shouldBlock =
    screens.game1.classList.contains('active') &&
    isMobileOrTabletLike() &&
    !isPortraitMode();

  document.body.classList.toggle('orientation-blocked', shouldBlock);

  if (orientationLockOverlay) {
    orientationLockOverlay.setAttribute('aria-hidden', shouldBlock ? 'false' : 'true');
  }
}

function showScreen(target) {
  Object.values(screens).forEach((screen) => screen.classList.remove('active'));
  screens[target].classList.add('active');

  if (target !== 'game1') {
    clearSpawnTimers();
    document.body.classList.remove('game1-mode');
    setDrawerState(false);
  } else {
    document.body.classList.add('game1-mode');
  }

  if (target === 'game1') {
    ensureGameReady();
  }

  updateOrientationGate();
}

function shuffleArray(arr) {
  const copied = [...arr];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function parseConfigToSlots(text) {
  const rawItems = text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (!rawItems.length) {
    return { status: 'EMPTY' };
  }

  const slots = [];
  let slotId = 0;

  for (const raw of rawItems) {
    let name = '';
    let count = 1;

    if (raw.includes('*')) {
      const match = raw.match(/^(.+?)\s*\*\s*(\d+)$/);
      if (!match) {
        return { status: 'INVALID' };
      }

      name = match[1].trim();
      count = Number(match[2]);
    } else {
      name = raw.trim();
      count = 1;
    }

    if (!name || !Number.isInteger(count) || count < 1) {
      return { status: 'INVALID' };
    }

    for (let i = 0; i < count; i += 1) {
      slotId += 1;
      slots.push({
        id: `${name}-${slotId}`,
        name
      });

      if (slots.length > MAX_SLOT_COUNT) {
        return {
          status: 'TOO_MANY',
          slotCount: slots.length
        };
      }
    }
  }

  return {
    status: 'OK',
    slots
  };
}

function setCurrentSlots(slots) {
  currentSlots = slots;
  lastValidConfigText = configInput.value;
  lastAppliedRawText = configInput.value;
}

function handleParseFailure(parsed, options = {}) {
  const { showPopupOnTooMany = false, showPopupOnInvalid = false } = options;

  if (parsed.status === 'TOO_MANY') {
    statusText.textContent = `그릇은 최대 ${MAX_SLOT_COUNT}개까지 가능해. 현재 입력은 초과 상태야.`;
    if (showPopupOnTooMany) {
      showPopup('그릇 수 초과', `그릇은 최대 ${MAX_SLOT_COUNT}개까지 가능해. 입력값을 줄여줘.`);
    }
    return false;
  }

  if (parsed.status === 'INVALID' || parsed.status === 'EMPTY') {
    statusText.textContent = '입력 형식을 확인해줘. 예: 홍길동*2, 김아무개*2 / 홍길동, 김아무개*3';
    if (showPopupOnInvalid) {
      showPopup(
        '입력 확인',
        '형식은 예를 들어 홍길동*2, 김아무개*2 또는 홍길동, 김아무개*3 처럼 적어줘.'
      );
    }
    return false;
  }

  return true;
}

function updateSlotsFromInput({ build = true } = {}) {
  const parsed = parseConfigToSlots(configInput.value);

  if (!handleParseFailure(parsed)) {
    return false;
  }

  setCurrentSlots(parsed.slots);

  if (engine && screens.game1.classList.contains('active') && build) {
    buildBoard();
  } else {
    statusText.textContent = `실시간 반영 준비 완료: 총 ${currentSlots.length}개의 개별 그릇`;
  }

  return true;
}

function fitGameCanvasViewport() {
  const main = document.querySelector('#game1Screen .game-main');
  const playArea = document.querySelector('#game1Screen .game-play-area');
  const header = main?.querySelector('.game-main-header');

  if (!main || !playArea || !header) return;

  if (isMobileOrTabletLike()) {
    const width = Math.max(280, playArea.clientWidth);
    const height = clampValue(width * 1.12, 340, 760);

    gameCanvasWrap.style.width = `${width}px`;
    gameCanvasWrap.style.height = `${height}px`;
    return;
  }

  const styles = getComputedStyle(main);
  const gap = parseFloat(styles.gap) || 0;

  const availableW = Math.max(320, main.clientWidth);
  const availableH = Math.max(220, main.clientHeight - header.offsetHeight - gap);

  const ratio = 16 / 9;

  let width = availableW;
  let height = width / ratio;

  if (height > availableH) {
    height = availableH;
    width = height * ratio;
  }

  gameCanvasWrap.style.width = `${width}px`;
  gameCanvasWrap.style.height = `${height}px`;
}

function ensureGameReady() {
  if (!engine) {
    initMatterWorld();
  }

  if (!currentSlots.length) {
    const parsed = parseConfigToSlots(configInput.value);

    if (parsed.status === 'OK') {
      setCurrentSlots(parsed.slots);
    } else {
      configInput.value = '홍길동*2, 김아무개*2';
      const fallbackParsed = parseConfigToSlots(configInput.value);
      setCurrentSlots(fallbackParsed.slots);
    }
  }

  fitGameCanvasViewport();
  buildBoard();
}

function initMatterWorld() {
  boardWidth = gameCanvasWrap.clientWidth;
  boardHeight = gameCanvasWrap.clientHeight;

  engine = Engine.create();
  world = engine.world;
  engine.gravity.y = 1.05;

  render = Render.create({
    element: gameCanvasWrap,
    engine,
    options: {
      width: boardWidth,
      height: boardHeight,
      wireframes: false,
      background: 'transparent',
      pixelRatio: window.devicePixelRatio || 1
    }
  });

  render.canvas.style.position = 'absolute';
  render.canvas.style.inset = '0';

  Render.run(render);

  runner = Runner.create();
  Runner.run(runner, engine);

  Events.on(engine, 'beforeUpdate', animateMovingBodies);
  Events.on(engine, 'afterUpdate', scheduleRefreshCounts);
}

function clearCountdownTimers() {
  countdownTimers.forEach((timer) => clearTimeout(timer));
  countdownTimers = [];
}

function clearSettleWatcher() {
  if (settleWatcherTimer) {
    clearInterval(settleWatcherTimer);
    settleWatcherTimer = null;
  }
  settleStableTicks = 0;
}

function clearFinalWatcher() {
  if (finalWatcherTimer) {
    clearInterval(finalWatcherTimer);
    finalWatcherTimer = null;
  }
  finalStableTicks = 0;
}

function resetRoundState() {
  roundSpawnComplete = false;
  bombSequenceStarted = false;
  bombSequenceFinished = false;
  resultCountdownStarted = false;
  finalResultsShown = false;
  clearSettleWatcher();
  clearFinalWatcher();
  clearCountdownTimers();
}

function clearWorldBodies() {
  worldBodies.forEach((body) => Composite.remove(world, body));
  ballBodies.forEach((body) => Composite.remove(world, body));
  worldBodies = [];
  ballBodies = [];
  movingBodies = [];
}

function clearSpawnTimers() {
  spawnTimers.forEach((timer) => clearTimeout(timer));
  spawnTimers = [];

  if (countTimer) {
    clearTimeout(countTimer);
    countTimer = null;
  }

  resetRoundState();
}

function scheduleRefreshCounts() {
  if (countRefreshQueued) return;
  countRefreshQueued = true;

  requestAnimationFrame(() => {
    countRefreshQueued = false;
    refreshCounts();
  });
}

function addMovingBody(body, options) {
  movingBodies.push({
    body,
    baseX: options.baseX,
    baseY: options.baseY,
    amplitudeX: options.amplitudeX || 0,
    amplitudeY: options.amplitudeY || 0,
    speed: options.speed || 0.02,
    phase: options.phase || 0,
    angleAmplitude: options.angleAmplitude || 0,
    angleSpeed: options.angleSpeed || options.speed || 0.02,
    anglePhase: options.anglePhase || 0,
    spinContinuous: Boolean(options.spinContinuous),
    spinSpeed: options.spinSpeed || 0,
    hidden: false,
    group: options.group || 'main'
  });
}

function animateMovingBodies() {
  if (!movingBodies.length) return;
  const t = engine.timing.timestamp;

  movingBodies.forEach((item) => {
    if (item.hidden) return;

    const x = item.baseX + Math.sin(t * item.speed + item.phase) * item.amplitudeX;
    const y = item.baseY + Math.cos(t * item.speed + item.phase) * item.amplitudeY;

    let angle = 0;
    if (item.spinContinuous) {
      angle = t * item.spinSpeed + item.anglePhase;
    } else {
      angle = Math.sin(t * item.angleSpeed + item.anglePhase) * item.angleAmplitude;
    }

    Body.setPosition(item.body, { x, y });
    Body.setAngle(item.body, angle);
    Body.setVelocity(item.body, { x: 0, y: 0 });
    Body.setAngularVelocity(item.body, 0);
  });
}

function hideMainMovingObstacles() {
  movingBodies.forEach((item) => {
    if (item.group === 'main' && !item.hidden) {
      Composite.remove(world, item.body);
      item.hidden = true;
    }
  });
}

function areAllBallsCalm() {
  if (!ballBodies.length) return false;

  let movingCount = 0;
  ballBodies.forEach((ball) => {
    if (ball.speed > 0.24) movingCount += 1;
  });

  return movingCount <= Math.max(10, Math.floor(ballBodies.length * 0.04));
}

function getUndroppedNormalBalls() {
  const slotTopY = boardHeight - slotAreaHeight;

  return ballBodies.filter((ball) => {
    if (ball.isBombBall) return false;

    const radius = ball.circleRadius || S(4.5);
    return ball.position.y < slotTopY - radius * 1.2;
  });
}

function areUndroppedNormalBallsCalm() {
  const undroppedBalls = getUndroppedNormalBalls();

  if (!undroppedBalls.length) return true;

  let movingCount = 0;

  undroppedBalls.forEach((ball) => {
    if (ball.speed > 0.12) movingCount += 1;
  });

  return movingCount === 0;
}

function getSlotCountsPerIndex() {
  const playableWidth = boardWidth - currentBoardPadding * 2;
  const slotTopY = boardHeight - slotAreaHeight;
  const slotCount = currentSlots.length;
  const slotWidth = playableWidth / slotCount;
  const counts = new Array(slotCount).fill(0);

  ballBodies.forEach((ball) => {
    if (ball.isBombBall) return;

    const { x, y } = ball.position;
    const radius = ball.circleRadius || S(4.5);

    if (y < slotTopY - radius * 1.2) return;

    const relativeX = x - currentBoardPadding;
    let slotIndex = Math.floor(relativeX / slotWidth);

    if (slotIndex < 0) slotIndex = 0;
    if (slotIndex >= slotCount) slotIndex = slotCount - 1;

    counts[slotIndex] += 1;
  });

  return counts;
}

function getAggregatedCounts() {
  const slotCounts = getSlotCountsPerIndex();
  const aggregatedMap = new Map();

  currentSlots.forEach((slot, index) => {
    if (!aggregatedMap.has(slot.name)) {
      aggregatedMap.set(slot.name, 0);
    }
    aggregatedMap.set(slot.name, aggregatedMap.get(slot.name) + (slotCounts[index] || 0));
  });

  return [...aggregatedMap.entries()].map(([name, count]) => ({ name, count }));
}

function finalizeResults() {
  if (finalResultsShown) return;
  finalResultsShown = true;
  clearFinalWatcher();

  const results = getAggregatedCounts().sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.name.localeCompare(b.name, 'ko');
  });

  refreshCounts();
  statusText.textContent = '최종 결과가 반영됐어!';
  showResultsPopup(results);
}

function startSettleWatcher() {
  clearSettleWatcher();

  settleWatcherTimer = setInterval(() => {
    if (!roundSpawnComplete || bombSequenceStarted || finalResultsShown) return;

    if (areAllBallsCalm()) {
      settleStableTicks += 1;
    } else {
      settleStableTicks = 0;
    }

    if (settleStableTicks >= 4) {
      startBombCountdown();
    }
  }, 400);
}

function startBombCountdown() {
  if (bombSequenceStarted) return;

  bombSequenceStarted = true;
  clearSettleWatcher();
  hideMainMovingObstacles();

  const countdownValues = [3, 2, 1];

  countdownValues.forEach((value, index) => {
    const timer = setTimeout(() => {
      statusText.textContent = `폭탄 폭발까지 ${value}...`;
    }, index * 1000);
    countdownTimers.push(timer);
  });

  const explodeTimer = setTimeout(() => {
    triggerBombExplosionChain();
  }, 3000);
  countdownTimers.push(explodeTimer);
}

function explodeSingleBomb(bomb, index, total) {
  if (!bomb || bomb.hasExploded) return;

  const bombX = bomb.position.x;
  const bombY = bomb.position.y;
  const blastRadius = bomb.bombBlastRadius || S(90);
  const baseForce = bomb.bombForce || 0.0075;

  statusText.textContent = `연쇄 폭발 ${index}/${total}...`;

  ballBodies.forEach((ball) => {
    if (ball === bomb) return;

    const dx = ball.position.x - bombX;
    const dy = ball.position.y - bombY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= 0 || distance > blastRadius) return;

    const normalizedX = dx / distance;
    const normalizedY = dy / distance;
    const falloff = 1 - distance / blastRadius;
    const forcePower = baseForce * falloff;

    Body.applyForce(ball, ball.position, {
      x: normalizedX * forcePower,
      y: normalizedY * forcePower - forcePower * 0.18
    });
  });

  bomb.hasExploded = true;
  Composite.remove(world, bomb);
}

function triggerBombExplosionChain() {
  const bombs = shuffleArray(
    ballBodies.filter((ball) => ball.isBombBall && !ball.hasExploded)
  );

  if (!bombs.length) {
    bombSequenceFinished = true;
    statusText.textContent = '폭탄이 없어서 결과 대기 상태로 넘어갈게.';
    startFinalResultsWatcher();
    return;
  }

  statusText.textContent = '폭탄 연쇄 폭발 시작...';

  bombs.forEach((bomb, index) => {
    const timer = setTimeout(() => {
      explodeSingleBomb(bomb, index + 1, bombs.length);

      if (index === bombs.length - 1) {
        ballBodies = ballBodies.filter((ball) => !ball.isBombBall);
        bombSequenceFinished = true;

        const doneTimer = setTimeout(() => {
          statusText.textContent = '폭발 종료. 남은 구슬 정리 중...';
          startFinalResultsWatcher();
        }, 700);

        countdownTimers.push(doneTimer);
      }
    }, index * 160);

    countdownTimers.push(timer);
  });
}

function startResultCountdown() {
  if (resultCountdownStarted || finalResultsShown) return;

  resultCountdownStarted = true;
  clearFinalWatcher();

  const countdownValues = [3, 2, 1];

  countdownValues.forEach((value, index) => {
    const timer = setTimeout(() => {
      if (!areUndroppedNormalBallsCalm()) {
        resultCountdownStarted = false;
        statusText.textContent = '남은 구슬이 다시 움직였어. 다시 기다리는 중...';
        startFinalResultsWatcher();
        return;
      }

      statusText.textContent = `결과 공개까지 ${value}...`;
    }, index * 1000);

    countdownTimers.push(timer);
  });

  const revealTimer = setTimeout(() => {
    if (!areUndroppedNormalBallsCalm()) {
      resultCountdownStarted = false;
      statusText.textContent = '남은 구슬이 다시 움직였어. 다시 기다리는 중...';
      startFinalResultsWatcher();
      return;
    }

    finalizeResults();
  }, 3000);

  countdownTimers.push(revealTimer);
}

function startFinalResultsWatcher() {
  clearFinalWatcher();

  finalWatcherTimer = setInterval(() => {
    if (finalResultsShown || !bombSequenceFinished) return;

    const undroppedBalls = getUndroppedNormalBalls();
    const undroppedCount = undroppedBalls.length;

    if (areUndroppedNormalBallsCalm()) {
      finalStableTicks += 1;
    } else {
      finalStableTicks = 0;
    }

    if (undroppedCount > 0) {
      statusText.textContent = `남은 구슬 ${undroppedCount}개 정지 대기 중...`;
    } else {
      statusText.textContent = '모든 구슬 정리 완료. 결과를 준비 중...';
    }

    if (finalStableTicks >= 4) {
      startResultCountdown();
    }
  }, 400);
}

function buildBoard() {
  if (!engine || !currentSlots.length) {
    return;
  }

  fitGameCanvasViewport();

  clearSpawnTimers();
  clearWorldBodies();

  boardWidth = gameCanvasWrap.clientWidth;
  boardHeight = gameCanvasWrap.clientHeight;

  currentScale = getBoardScale(boardWidth, boardHeight);
  currentBoardPadding = Math.round(S(18));
  slotAreaHeight = clampValue(boardHeight * 0.18, S(86), S(118));

  render.canvas.width = boardWidth * (window.devicePixelRatio || 1);
  render.canvas.height = boardHeight * (window.devicePixelRatio || 1);
  render.options.width = boardWidth;
  render.options.height = boardHeight;
  render.bounds.max.x = boardWidth;
  render.bounds.max.y = boardHeight;
  render.context.setTransform(1, 0, 0, 1, 0, 0);
  render.context.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

  slotOverlay.style.left = `${currentBoardPadding}px`;
  slotOverlay.style.right = `${currentBoardPadding}px`;
  slotOverlay.style.bottom = `${S(16)}px`;
  slotOverlay.style.height = `${clampValue(boardHeight * 0.16, S(74), S(112))}px`;

  const wallThickness = S(60);
  const slotTopY = boardHeight - slotAreaHeight;
  const floorY = boardHeight + S(20);
  const playableWidth = boardWidth - currentBoardPadding * 2;
  const slotCount = currentSlots.length;
  const slotWidth = playableWidth / slotCount;

  const mainPegRadius = S(13);
  const guidePegRadius = S(8);

  const wallInnerFaceX = currentBoardPadding;

  const leftWall = Bodies.rectangle(
    -wallThickness / 2 + wallInnerFaceX,
    boardHeight / 2,
    wallThickness,
    boardHeight,
    {
      isStatic: true,
      restitution: 0.4,
      render: { fillStyle: '#ead8c9' }
    }
  );

  const rightWall = Bodies.rectangle(
    boardWidth + wallThickness / 2 - wallInnerFaceX,
    boardHeight / 2,
    wallThickness,
    boardHeight,
    {
      isStatic: true,
      restitution: 0.4,
      render: { fillStyle: '#ead8c9' }
    }
  );

  const floor = Bodies.rectangle(boardWidth / 2, floorY, boardWidth, wallThickness, {
    isStatic: true,
    restitution: 0.15,
    render: { fillStyle: '#e8cfbd' }
  });

  worldBodies.push(leftWall, rightWall, floor);

  const wallSpinnerYs = [
    boardHeight * 0.20,
    boardHeight * 0.34,
    boardHeight * 0.48,
    slotTopY - S(70)
  ];

  wallSpinnerYs.forEach((y, index) => {
    const barLength = index === wallSpinnerYs.length - 1 ? S(90) : S(82);
    const barThickness = S(12);
    const leftX = wallInnerFaceX + S(32);
    const rightX = boardWidth - wallInnerFaceX - S(32);

    const leftSpinner = Bodies.rectangle(leftX, y, barThickness, barLength, {
      isStatic: true,
      restitution: 1.22,
      friction: 0,
      frictionStatic: 0,
      render: {
        fillStyle: '#ead8c9',
        strokeStyle: '#fff9f3',
        lineWidth: Math.max(1, S(2))
      }
    });

    const rightSpinner = Bodies.rectangle(rightX, y, barThickness, barLength, {
      isStatic: true,
      restitution: 1.22,
      friction: 0,
      frictionStatic: 0,
      render: {
        fillStyle: '#ead8c9',
        strokeStyle: '#fff9f3',
        lineWidth: Math.max(1, S(2))
      }
    });

    worldBodies.push(leftSpinner, rightSpinner);

    addMovingBody(leftSpinner, {
      baseX: leftX,
      baseY: y,
      amplitudeX: 0,
      amplitudeY: 0,
      speed: 0,
      phase: 0,
      spinContinuous: true,
      spinSpeed: 0.0042 + index * 0.00025,
      anglePhase: index * 0.45,
      group: 'wall'
    });

    addMovingBody(rightSpinner, {
      baseX: rightX,
      baseY: y,
      amplitudeX: 0,
      amplitudeY: 0,
      speed: 0,
      phase: 0,
      spinContinuous: true,
      spinSpeed: -(0.0044 + index * 0.00022),
      anglePhase: index * 0.55,
      group: 'wall'
    });
  });

  for (let i = 1; i < slotCount; i += 1) {
    const x = currentBoardPadding + slotWidth * i;

    const divider = Bodies.rectangle(
      x,
      boardHeight - (slotAreaHeight + S(22)) / 2 + S(14),
      S(8),
      slotAreaHeight + S(22),
      {
        isStatic: true,
        restitution: 0.5,
        render: { fillStyle: '#d8bfae' }
      }
    );

    worldBodies.push(divider);
  }

  for (let i = 1; i < slotCount; i += 1) {
    const x = currentBoardPadding + slotWidth * i;

    const guidePeg = Bodies.circle(x, slotTopY - S(24), guidePegRadius, {
      isStatic: true,
      restitution: 0.82,
      render: {
        fillStyle: '#e8d7f7',
        strokeStyle: '#fff7ff',
        lineWidth: Math.max(1, S(2))
      }
    });

    worldBodies.push(guidePeg);
  }

  const rows = Math.max(6, Math.floor((boardHeight - slotAreaHeight - S(130)) / S(58)));
  const pegGapX = Math.max(S(42), Math.min(S(72), playableWidth / 10));
  const pegGapY = S(58);
  const pegStartY = S(86);

  for (let row = 0; row < rows; row += 1) {
    const cols = Math.floor(playableWidth / pegGapX);
    const offset = row % 2 === 0 ? 0 : pegGapX / 2;

    for (let col = 0; col <= cols; col += 1) {
      const jitterX = rand(-S(6), S(6));
      const jitterY = rand(-S(3), S(3));

      const x = currentBoardPadding + S(16) + col * pegGapX + offset + jitterX;
      const y = pegStartY + row * pegGapY + jitterY;

      if (
        x < currentBoardPadding + mainPegRadius ||
        x > boardWidth - currentBoardPadding - mainPegRadius ||
        y > slotTopY - mainPegRadius * 2 - S(16)
      ) {
        continue;
      }

      const isChaosRow = row === Math.floor(rows * 0.45) || row === Math.floor(rows * 0.62);

      const peg = Bodies.circle(x, y, mainPegRadius, {
        isStatic: true,
        restitution: isChaosRow ? 1.04 : 0.72,
        render: {
          fillStyle: isChaosRow ? '#d7eef8' : row % 2 === 0 ? '#efd5e4' : '#d8eafc',
          strokeStyle: '#fff7ff',
          lineWidth: Math.max(1, S(2))
        }
      });

      worldBodies.push(peg);
    }
  }

  const horizontalMoverConfigs = [
    { x: boardWidth * 0.16, y: boardHeight * 0.22, w: S(78), h: S(12), ax: playableWidth * 0.06, ay: S(4), speed: 0.0017, phase: 0.2, color: '#f5d7a7' },
    { x: boardWidth * 0.34, y: boardHeight * 0.31, w: S(82), h: S(12), ax: playableWidth * 0.07, ay: S(5), speed: 0.00155, phase: 1.0, color: '#d8ebff' },
    { x: boardWidth * 0.50, y: boardHeight * 0.42, w: S(88), h: S(12), ax: playableWidth * 0.09, ay: S(6), speed: 0.0014, phase: 1.8, color: '#f5d7a7' },
    { x: boardWidth * 0.66, y: boardHeight * 0.31, w: S(82), h: S(12), ax: playableWidth * 0.07, ay: S(5), speed: 0.0016, phase: 2.5, color: '#d8ebff' },
    { x: boardWidth * 0.84, y: boardHeight * 0.22, w: S(78), h: S(12), ax: playableWidth * 0.06, ay: S(4), speed: 0.00175, phase: 3.0, color: '#f5d7a7' },
    { x: boardWidth * 0.14, y: boardHeight * 0.56, w: S(72), h: S(12), ax: playableWidth * 0.05, ay: S(5), speed: 0.0019, phase: 0.7, color: '#d8ebff' },
    { x: boardWidth * 0.86, y: boardHeight * 0.56, w: S(72), h: S(12), ax: playableWidth * 0.05, ay: S(5), speed: 0.00195, phase: 2.1, color: '#f6dfb5' }
  ];

  horizontalMoverConfigs.forEach((cfg, index) => {
    const mover = Bodies.rectangle(cfg.x, cfg.y, cfg.w, cfg.h, {
      isStatic: true,
      chamfer: { radius: S(6) },
      restitution: 1.08,
      render: {
        fillStyle: cfg.color,
        strokeStyle: '#fffdf8',
        lineWidth: Math.max(1, S(2))
      }
    });

    worldBodies.push(mover);

    addMovingBody(mover, {
      baseX: cfg.x,
      baseY: cfg.y,
      amplitudeX: cfg.ax,
      amplitudeY: cfg.ay,
      speed: cfg.speed,
      phase: cfg.phase,
      angleAmplitude: 0.18 + (index % 3) * 0.04,
      angleSpeed: cfg.speed + 0.00025,
      anglePhase: cfg.phase * 0.8,
      group: 'main'
    });
  });

  const spinnerLeftOuter = Bodies.rectangle(boardWidth * 0.20, boardHeight * 0.46, S(14), S(92), {
    isStatic: true,
    chamfer: { radius: S(7) },
    restitution: 1.1,
    render: {
      fillStyle: '#d9f0e7',
      strokeStyle: '#fffdf8',
      lineWidth: Math.max(1, S(2))
    }
  });

  const spinnerRightOuter = Bodies.rectangle(boardWidth * 0.80, boardHeight * 0.46, S(14), S(92), {
    isStatic: true,
    chamfer: { radius: S(7) },
    restitution: 1.1,
    render: {
      fillStyle: '#f1dced',
      strokeStyle: '#fffdf8',
      lineWidth: Math.max(1, S(2))
    }
  });

  const spinnerLeftInner = Bodies.rectangle(boardWidth * 0.30, boardHeight * 0.60, S(14), S(82), {
    isStatic: true,
    chamfer: { radius: S(7) },
    restitution: 1.08,
    render: {
      fillStyle: '#d8ebff',
      strokeStyle: '#fffdf8',
      lineWidth: Math.max(1, S(2))
    }
  });

  const spinnerRightInner = Bodies.rectangle(boardWidth * 0.70, boardHeight * 0.60, S(14), S(82), {
    isStatic: true,
    chamfer: { radius: S(7) },
    restitution: 1.08,
    render: {
      fillStyle: '#f6dfb5',
      strokeStyle: '#fffdf8',
      lineWidth: Math.max(1, S(2))
    }
  });

  worldBodies.push(spinnerLeftOuter, spinnerRightOuter, spinnerLeftInner, spinnerRightInner);

  addMovingBody(spinnerLeftOuter, {
    baseX: boardWidth * 0.20,
    baseY: boardHeight * 0.46,
    amplitudeX: S(22),
    amplitudeY: S(12),
    speed: 0.0021,
    phase: 0.5,
    angleAmplitude: 0.9,
    angleSpeed: 0.0031,
    anglePhase: 1.0,
    group: 'main'
  });

  addMovingBody(spinnerRightOuter, {
    baseX: boardWidth * 0.80,
    baseY: boardHeight * 0.46,
    amplitudeX: S(22),
    amplitudeY: S(12),
    speed: 0.00225,
    phase: 2.2,
    angleAmplitude: 0.9,
    angleSpeed: 0.00315,
    anglePhase: 0.3,
    group: 'main'
  });

  addMovingBody(spinnerLeftInner, {
    baseX: boardWidth * 0.30,
    baseY: boardHeight * 0.60,
    amplitudeX: S(16),
    amplitudeY: S(10),
    speed: 0.002,
    phase: 1.4,
    angleAmplitude: 0.78,
    angleSpeed: 0.0029,
    anglePhase: 0.8,
    group: 'main'
  });

  addMovingBody(spinnerRightInner, {
    baseX: boardWidth * 0.70,
    baseY: boardHeight * 0.60,
    amplitudeX: S(16),
    amplitudeY: S(10),
    speed: 0.00205,
    phase: 2.9,
    angleAmplitude: 0.78,
    angleSpeed: 0.00295,
    anglePhase: 1.9,
    group: 'main'
  });

  const bumperConfigs = [
    { x: boardWidth * 0.10, y: boardHeight * 0.17, color: '#d9f0e7', phase: 0.3, ax: S(20), ay: S(7) },
    { x: boardWidth * 0.24, y: boardHeight * 0.27, color: '#f1dced', phase: 1.1, ax: S(18), ay: S(8) },
    { x: boardWidth * 0.50, y: boardHeight * 0.20, color: '#d8ebff', phase: 2.0, ax: S(14), ay: S(6) },
    { x: boardWidth * 0.76, y: boardHeight * 0.27, color: '#f6dfb5', phase: 2.8, ax: S(18), ay: S(8) },
    { x: boardWidth * 0.90, y: boardHeight * 0.17, color: '#d9f0e7', phase: 3.4, ax: S(20), ay: S(7) },
    { x: boardWidth * 0.12, y: boardHeight * 0.48, color: '#f1dced', phase: 0.9, ax: S(16), ay: S(9) },
    { x: boardWidth * 0.88, y: boardHeight * 0.48, color: '#d8ebff', phase: 2.6, ax: S(16), ay: S(9) }
  ];

  bumperConfigs.forEach((cfg, index) => {
    const bumper = Bodies.circle(cfg.x, cfg.y, S(16), {
      isStatic: true,
      restitution: 1.15,
      render: {
        fillStyle: cfg.color,
        strokeStyle: '#fffdf8',
        lineWidth: Math.max(1, S(2))
      }
    });

    worldBodies.push(bumper);

    addMovingBody(bumper, {
      baseX: cfg.x,
      baseY: cfg.y,
      amplitudeX: cfg.ax,
      amplitudeY: cfg.ay,
      speed: 0.002 + index * 0.00018,
      phase: cfg.phase,
      group: 'main'
    });
  });

  World.add(world, worldBodies);
  renderSlotsOverlay();
  refreshCounts();

  totalInfo.textContent = `총 ${slotCount}그릇`;

  const uniqueNames = [...new Set(currentSlots.map((slot) => slot.name))];
  statusText.textContent = `현재 배치: ${uniqueNames.join(' / ')}`;
}

function renderSlotsOverlay() {
  slotOverlay.innerHTML = '';
  slotLegend.innerHTML = '';

  currentSlots.forEach((slot, index) => {
    const color = getColorForName(slot.name);

    const slotBox = document.createElement('div');
    slotBox.className = 'slot-box';
    slotBox.style.flex = '1 1 0';
    slotBox.style.background = `linear-gradient(180deg, ${color} 0%, rgba(255,255,255,0.48) 100%)`;
    slotBox.dataset.slotId = slot.id;

    const nameEl = document.createElement('div');
    nameEl.className = 'slot-name';
    nameEl.textContent = slot.name;

    const metaEl = document.createElement('div');
    metaEl.className = 'slot-meta';
    metaEl.textContent = `그릇 ${index + 1} · 0개`;

    slotBox.appendChild(nameEl);
    slotBox.appendChild(metaEl);
    slotOverlay.appendChild(slotBox);
  });
}

function updateLegendWithAggregatedCounts() {
  slotLegend.innerHTML = '';

  const aggregatedCounts = getAggregatedCounts().sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.name.localeCompare(b.name, 'ko');
  });

  aggregatedCounts.forEach((item) => {
    const color = getColorForName(item.name);

    const chip = document.createElement('div');
    chip.className = 'legend-chip';
    chip.innerHTML = `
      <span class="legend-dot" style="background:${color}"></span>
      <span>${escapeHtml(item.name)} (${item.count}개)</span>
    `;
    slotLegend.appendChild(chip);
  });
}

function createBall(x, y, options = {}) {
  const isBomb = Boolean(options.isBomb);

  if (!isBomb) {
    const color = ballPalette[Math.floor(Math.random() * ballPalette.length)];
    const ball = Bodies.circle(x, y, S(4.5), {
      restitution: rand(0.42, 0.6),
      friction: 0.002,
      frictionAir: 0.0008,
      density: 0.0018,
      render: {
        fillStyle: color,
        strokeStyle: '#fffafc',
        lineWidth: Math.max(0.8, S(1.1))
      }
    });

    ball.isBombBall = false;
    ball.hasExploded = false;

    ballBodies.push(ball);
    World.add(world, ball);
    return;
  }

  const gray = Math.floor(rand(45, 170));
  const darknessRatio = 1 - (gray - 45) / 125;
  const bombForce = 0.0055 + darknessRatio * 0.0045;
  const bombBlastRadius = S(74 + darknessRatio * 42);
  const bombColor = `rgb(${gray}, ${gray}, ${gray})`;

  const bomb = Bodies.circle(x, y, S(5.2), {
    restitution: 0.5,
    friction: 0.002,
    frictionAir: 0.0008,
    density: 0.0022,
    render: {
      fillStyle: bombColor,
      strokeStyle: '#5c5c5c',
      lineWidth: Math.max(1, S(1.4))
    }
  });

  bomb.isBombBall = true;
  bomb.hasExploded = false;
  bomb.bombForce = bombForce;
  bomb.bombBlastRadius = bombBlastRadius;
  bomb.bombGray = gray;

  ballBodies.push(bomb);
  World.add(world, bomb);
}

function spawnBalls() {
  clearSpawnTimers();
  resetRoundState();

  const ballTypePool = [
    ...new Array(BALL_COUNT).fill(false),
    ...new Array(BOMB_COUNT).fill(true)
  ];

  const mixedOrder = shuffleArray(ballTypePool);

  let spawned = 0;

  mixedOrder.forEach((isBomb, index) => {
    const timer = setTimeout(() => {
      const x = S(30) + Math.random() * (boardWidth - S(60));
      const y = S(22) + Math.random() * S(12);

      createBall(x, y, { isBomb });
      spawned += 1;
      statusText.textContent = `구슬이 떨어지는 중... ${spawned}/${TOTAL_DROP_COUNT}`;

      if (spawned === TOTAL_DROP_COUNT) {
        roundSpawnComplete = true;
        statusText.textContent = `구슬 ${BALL_COUNT}개 + 폭탄 ${BOMB_COUNT}개 투하 완료. 멈추는 중...`;
        startSettleWatcher();
      }
    }, index * SPAWN_INTERVAL_MS);

    spawnTimers.push(timer);
  });
}

function refreshCounts() {
  if (!currentSlots.length) return;

  const slotCounts = getSlotCountsPerIndex();

  [...slotOverlay.children].forEach((slotNode, index) => {
    const meta = slotNode.querySelector('.slot-meta');
    meta.textContent = `그릇 ${index + 1} · ${slotCounts[index]}개`;
  });

  updateLegendWithAggregatedCounts();
}

function clearBallsOnly() {
  clearSpawnTimers();
  ballBodies.forEach((body) => Composite.remove(world, body));
  ballBodies = [];
}

function startRound() {
  const parsed = parseConfigToSlots(configInput.value);

  if (!handleParseFailure(parsed, { showPopupOnTooMany: true, showPopupOnInvalid: true })) {
    return;
  }

  if (configInput.value !== lastAppliedRawText || !currentSlots.length) {
    setCurrentSlots(parsed.slots);
    buildBoard();
  }

  clearBallsOnly();
  refreshCounts();
  setDrawerState(false);
  spawnBalls();
}

function shuffleRound() {
  const parsed = parseConfigToSlots(configInput.value);

  if (!handleParseFailure(parsed, { showPopupOnTooMany: true, showPopupOnInvalid: true })) {
    return;
  }

  if (configInput.value !== lastAppliedRawText || !currentSlots.length) {
    setCurrentSlots(parsed.slots);
  }

  currentSlots = shuffleArray(currentSlots);
  lastAppliedRawText = configInput.value;
  buildBoard();
  setDrawerState(false);
  statusText.textContent = '셔플 완료! 개별 그릇 위치가 랜덤으로 섞였어.';
}

function resetRound() {
  clearBallsOnly();

  const parsed = parseConfigToSlots(configInput.value);

  if (parsed.status === 'OK') {
    setCurrentSlots(parsed.slots);
  } else {
    configInput.value = lastValidConfigText;
    const fallbackParsed = parseConfigToSlots(lastValidConfigText);
    if (fallbackParsed.status === 'OK') {
      setCurrentSlots(fallbackParsed.slots);
    }
  }

  buildBoard();
  setDrawerState(false);
  statusText.textContent = '리셋 완료! 입력값 기준으로 개별 그릇을 다시 만들었어.';
}

function hasLiveRound() {
  return ballBodies.length > 0 && !finalResultsShown;
}

function shouldIgnoreMobileChromeResize(nextWidth, nextHeight) {
  if (!isMobileOrTabletLike()) return false;

  const widthDelta = Math.abs(nextWidth - lastViewportWidth);
  const heightDelta = Math.abs(nextHeight - lastViewportHeight);

  return widthDelta < 6 && heightDelta > 0 && hasLiveRound();
}

startBtn.addEventListener('click', () => showScreen('menu'));
physicalBtn.addEventListener('click', () => showPopup('개발중', '피지컬 메뉴는 아직 개발중이야!'));
luckBtn.addEventListener('click', () => showScreen('luck'));

closePopupBtn.addEventListener('click', closePopup);

popupOverlay.addEventListener('click', (event) => {
  if (event.target === popupOverlay) {
    closePopup();
  }
});

backButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showScreen(button.dataset.target);
  });
});

gameLaunchButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.game === '1') {
      showScreen('game1');
    }
  });
});

comingSoonButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showPopup('개발중', '이 게임은 아직 준비중이야!');
  });
});

shuffleBtn.addEventListener('click', shuffleRound);
startGameBtn.addEventListener('click', startRound);
resetGameBtn.addEventListener('click', resetRound);

if (drawerToggleBtn) {
  drawerToggleBtn.addEventListener('click', () => {
    const willOpen = !gameSidebar.classList.contains('open');
    setDrawerState(willOpen);
  });
}

if (drawerBackdrop) {
  drawerBackdrop.addEventListener('click', () => {
    setDrawerState(false);
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setDrawerState(false);
    closePopup();
  }
});

configInput.addEventListener('input', () => {
  updateSlotsFromInput();
});

configInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    startRound();
  }
});

window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const nextWidth = window.innerWidth;
    const nextHeight = window.innerHeight;

    updateOrientationGate();

    if (shouldIgnoreMobileChromeResize(nextWidth, nextHeight)) {
      lastViewportWidth = nextWidth;
      lastViewportHeight = nextHeight;
      return;
    }

    if (!isMobileOrTabletLike() && window.innerWidth > 980) {
      setDrawerState(false);
    }

    if (
      screens.game1.classList.contains('active') &&
      engine &&
      currentSlots.length &&
      !document.body.classList.contains('orientation-blocked')
    ) {
      fitGameCanvasViewport();
      buildBoard();
    }

    lastViewportWidth = nextWidth;
    lastViewportHeight = nextHeight;
  }, 180);
});

window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    const nextWidth = window.innerWidth;
    const nextHeight = window.innerHeight;

    updateOrientationGate();

    if (
      screens.game1.classList.contains('active') &&
      engine &&
      currentSlots.length &&
      !document.body.classList.contains('orientation-blocked')
    ) {
      fitGameCanvasViewport();
      buildBoard();
    }

    lastViewportWidth = nextWidth;
    lastViewportHeight = nextHeight;
  }, 220);
});

updateSlotsFromInput({ build: false });
updateOrientationGate();