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
let countdownTimers = [];
let roundSpawnComplete = false;
let countdownStarted = false;
let explosionTriggered = false;
let settleStableTicks = 0;
let movingBodiesEnabled = true;

let boardWidth = 0;
let boardHeight = 720;
let slotAreaHeight = 100;

let currentSlots = [];
let lastValidConfigText = configInput.value;
let lastAppliedRawText = configInput.value;

function showPopup(title, message) {
  popupTitle.textContent = title;
  popupMessage.textContent = message;
  popupOverlay.classList.remove('hidden');
}

function closePopup() {
  popupOverlay.classList.add('hidden');
}

function setDrawerState(isOpen) {
  if (!gameSidebar || !drawerBackdrop) return;
  gameSidebar.classList.toggle('open', isOpen);
  drawerBackdrop.classList.toggle('show', isOpen);
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

function resetRoundState() {
  roundSpawnComplete = false;
  countdownStarted = false;
  explosionTriggered = false;
  clearSettleWatcher();
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
    anglePhase: options.anglePhase || 0
  });
}

function animateMovingBodies() {
  if (!movingBodies.length || !movingBodiesEnabled) return;
  const t = engine.timing.timestamp;

  movingBodies.forEach((item) => {
    const x = item.baseX + Math.sin(t * item.speed + item.phase) * item.amplitudeX;
    const y = item.baseY + Math.cos(t * item.speed + item.phase) * item.amplitudeY;
    const angle = Math.sin(t * item.angleSpeed + item.anglePhase) * item.angleAmplitude;

    Body.setPosition(item.body, { x, y });
    Body.setAngle(item.body, angle);
    Body.setVelocity(item.body, { x: 0, y: 0 });
    Body.setAngularVelocity(item.body, 0);
  });
}

function hideMovingObstacles() {
  if (!movingBodiesEnabled) return;
  movingBodiesEnabled = false;

  movingBodies.forEach((item) => {
    Composite.remove(world, item.body);
  });
}

function startSettleWatcher() {
  clearSettleWatcher();

  settleWatcherTimer = setInterval(() => {
    if (!roundSpawnComplete || countdownStarted || explosionTriggered) {
      return;
    }

    if (!ballBodies.length) {
      return;
    }

    const thresholdY = boardHeight - slotAreaHeight - 46;
    let belowCount = 0;
    let movingCount = 0;

    ballBodies.forEach((ball) => {
      if (ball.position.y > thresholdY) {
        belowCount += 1;
      }
      if (ball.speed > 0.35) {
        movingCount += 1;
      }
    });

    const enoughBelow = belowCount >= ballBodies.length * 0.95;
    const calmEnough = movingCount <= Math.max(12, Math.floor(ballBodies.length * 0.06));

    if (enoughBelow && calmEnough) {
      settleStableTicks += 1;
    } else {
      settleStableTicks = 0;
    }

    if (settleStableTicks >= 4) {
      startBombCountdown();
    }
  }, 450);
}

function startBombCountdown() {
  if (countdownStarted || explosionTriggered) return;

  countdownStarted = true;
  clearSettleWatcher();
  hideMovingObstacles();

  const countdownValues = [3, 2, 1];

  countdownValues.forEach((value, index) => {
    const timer = setTimeout(() => {
      statusText.textContent = `폭탄 폭발까지 ${value}...`;
    }, index * 1000);
    countdownTimers.push(timer);
  });

  const explodeTimer = setTimeout(() => {
    triggerBombExplosion();
  }, 3000);
  countdownTimers.push(explodeTimer);
}

function triggerBombExplosion() {
  if (explosionTriggered) return;
  explosionTriggered = true;

  const bombBalls = ballBodies.filter((ball) => ball.isBombBall && !ball.hasExploded);

  if (!bombBalls.length) {
    statusText.textContent = '폭탄이 없어서 그대로 결과를 확정할게.';
    countTimer = setTimeout(() => {
      refreshCounts();
      statusText.textContent = '최종 결과가 반영됐어!';
    }, 1200);
    return;
  }

  statusText.textContent = '폭탄 폭발! 마지막 랜덤 변수가 반영되고 있어...';

  const blastRadius = 92;
  const baseForce = 0.0075;

  bombBalls.forEach((bomb) => {
    const bombX = bomb.position.x;
    const bombY = bomb.position.y;

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
        y: normalizedY * forcePower - forcePower * 0.22
      });
    });

    bomb.hasExploded = true;
    Composite.remove(world, bomb);
  });

  ballBodies = ballBodies.filter((ball) => !ball.isBombBall);

  countTimer = setTimeout(() => {
    refreshCounts();
    statusText.textContent = '최종 결과가 반영됐어!';
  }, 2200);
}

function buildBoard() {
  if (!engine || !currentSlots.length) {
    return;
  }

  clearSpawnTimers();
  clearWorldBodies();
  movingBodiesEnabled = true;

  boardWidth = gameCanvasWrap.clientWidth;
  boardHeight = gameCanvasWrap.clientHeight;
  slotAreaHeight = Math.max(86, Math.min(118, boardHeight * 0.18));

  render.canvas.width = boardWidth * (window.devicePixelRatio || 1);
  render.canvas.height = boardHeight * (window.devicePixelRatio || 1);
  render.options.width = boardWidth;
  render.options.height = boardHeight;
  render.bounds.max.x = boardWidth;
  render.bounds.max.y = boardHeight;
  render.context.setTransform(1, 0, 0, 1, 0, 0);
  render.context.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

  const wallThickness = 60;
  const slotTopY = boardHeight - slotAreaHeight;
  const floorY = boardHeight + 20;
  const playableWidth = boardWidth - BOARD_SIDE_PADDING * 2;
  const slotCount = currentSlots.length;
  const slotWidth = playableWidth / slotCount;

  const mainPegRadius = 13;
  const guidePegRadius = 8;

  const leftWall = Bodies.rectangle(
    -wallThickness / 2 + 8,
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
    boardWidth + wallThickness / 2 - 8,
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

  // 양쪽 벽 범퍼
  const wallBumperYs = [
    boardHeight * 0.20,
    boardHeight * 0.34,
    boardHeight * 0.48,
    slotTopY - 70
  ];

  wallBumperYs.forEach((y, index) => {
    const radius = index === wallBumperYs.length - 1 ? 18 : 15;

    const leftBumper = Bodies.circle(BOARD_SIDE_PADDING + radius - 2, y, radius, {
      isStatic: true,
      restitution: 1.08,
      render: {
        fillStyle: '#ead8c9',
        strokeStyle: '#fff9f3',
        lineWidth: 2
      }
    });

    const rightBumper = Bodies.circle(boardWidth - BOARD_SIDE_PADDING - radius + 2, y, radius, {
      isStatic: true,
      restitution: 1.08,
      render: {
        fillStyle: '#ead8c9',
        strokeStyle: '#fff9f3',
        lineWidth: 2
      }
    });

    worldBodies.push(leftBumper, rightBumper);
  });

  // 슬롯 칸막이
  for (let i = 1; i < slotCount; i += 1) {
    const x = BOARD_SIDE_PADDING + slotWidth * i;

    const divider = Bodies.rectangle(
      x,
      boardHeight - (slotAreaHeight + 22) / 2 + 14,
      8,
      slotAreaHeight + 22,
      {
        isStatic: true,
        restitution: 0.5,
        render: { fillStyle: '#d8bfae' }
      }
    );

    worldBodies.push(divider);
  }

  // 슬롯 진입 직전 유도용 peg
  for (let i = 1; i < slotCount; i += 1) {
    const x = BOARD_SIDE_PADDING + slotWidth * i;

    const guidePeg = Bodies.circle(x, slotTopY - 24, guidePegRadius, {
      isStatic: true,
      restitution: 0.82,
      render: {
        fillStyle: '#e8d7f7',
        strokeStyle: '#fff7ff',
        lineWidth: 2
      }
    });

    worldBodies.push(guidePeg);
  }

  // 메인 peg 필드
  const rows = Math.max(6, Math.floor((boardHeight - slotAreaHeight - 130) / 58));
  const pegGapX = Math.max(42, Math.min(72, playableWidth / 10));
  const pegGapY = 58;
  const pegStartY = 86;

  for (let row = 0; row < rows; row += 1) {
    const cols = Math.floor(playableWidth / pegGapX);
    const offset = row % 2 === 0 ? 0 : pegGapX / 2;

    for (let col = 0; col <= cols; col += 1) {
      const jitterX = rand(-6, 6);
      const jitterY = rand(-3, 3);

      const x = BOARD_SIDE_PADDING + 16 + col * pegGapX + offset + jitterX;
      const y = pegStartY + row * pegGapY + jitterY;

      if (
        x < BOARD_SIDE_PADDING + mainPegRadius ||
        x > boardWidth - BOARD_SIDE_PADDING - mainPegRadius ||
        y > slotTopY - mainPegRadius * 2 - 16
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
          lineWidth: 2
        }
      });

      worldBodies.push(peg);
    }
  }

  // 움직이는 가로 장애물
  const horizontalMoverConfigs = [
    { x: boardWidth * 0.16, y: boardHeight * 0.22, w: 78, h: 12, ax: playableWidth * 0.06, ay: 4, speed: 0.0017, phase: 0.2, color: '#f5d7a7' },
    { x: boardWidth * 0.34, y: boardHeight * 0.31, w: 82, h: 12, ax: playableWidth * 0.07, ay: 5, speed: 0.00155, phase: 1.0, color: '#d8ebff' },
    { x: boardWidth * 0.50, y: boardHeight * 0.42, w: 88, h: 12, ax: playableWidth * 0.09, ay: 6, speed: 0.0014, phase: 1.8, color: '#f5d7a7' },
    { x: boardWidth * 0.66, y: boardHeight * 0.31, w: 82, h: 12, ax: playableWidth * 0.07, ay: 5, speed: 0.0016, phase: 2.5, color: '#d8ebff' },
    { x: boardWidth * 0.84, y: boardHeight * 0.22, w: 78, h: 12, ax: playableWidth * 0.06, ay: 4, speed: 0.00175, phase: 3.0, color: '#f5d7a7' },
    { x: boardWidth * 0.14, y: boardHeight * 0.56, w: 72, h: 12, ax: playableWidth * 0.05, ay: 5, speed: 0.0019, phase: 0.7, color: '#d8ebff' },
    { x: boardWidth * 0.86, y: boardHeight * 0.56, w: 72, h: 12, ax: playableWidth * 0.05, ay: 5, speed: 0.00195, phase: 2.1, color: '#f6dfb5' }
  ];

  horizontalMoverConfigs.forEach((cfg, index) => {
    const mover = Bodies.rectangle(cfg.x, cfg.y, cfg.w, cfg.h, {
      isStatic: true,
      chamfer: { radius: 6 },
      restitution: 1.08,
      render: {
        fillStyle: cfg.color,
        strokeStyle: '#fffdf8',
        lineWidth: 2
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
      anglePhase: cfg.phase * 0.8
    });
  });

  // 세로 회전 장애물
  const spinnerLeftOuter = Bodies.rectangle(boardWidth * 0.20, boardHeight * 0.46, 14, 92, {
    isStatic: true,
    chamfer: { radius: 7 },
    restitution: 1.1,
    render: {
      fillStyle: '#d9f0e7',
      strokeStyle: '#fffdf8',
      lineWidth: 2
    }
  });

  const spinnerRightOuter = Bodies.rectangle(boardWidth * 0.80, boardHeight * 0.46, 14, 92, {
    isStatic: true,
    chamfer: { radius: 7 },
    restitution: 1.1,
    render: {
      fillStyle: '#f1dced',
      strokeStyle: '#fffdf8',
      lineWidth: 2
    }
  });

  const spinnerLeftInner = Bodies.rectangle(boardWidth * 0.30, boardHeight * 0.60, 14, 82, {
    isStatic: true,
    chamfer: { radius: 7 },
    restitution: 1.08,
    render: {
      fillStyle: '#d8ebff',
      strokeStyle: '#fffdf8',
      lineWidth: 2
    }
  });

  const spinnerRightInner = Bodies.rectangle(boardWidth * 0.70, boardHeight * 0.60, 14, 82, {
    isStatic: true,
    chamfer: { radius: 7 },
    restitution: 1.08,
    render: {
      fillStyle: '#f6dfb5',
      strokeStyle: '#fffdf8',
      lineWidth: 2
    }
  });

  worldBodies.push(spinnerLeftOuter, spinnerRightOuter, spinnerLeftInner, spinnerRightInner);

  addMovingBody(spinnerLeftOuter, {
    baseX: boardWidth * 0.20,
    baseY: boardHeight * 0.46,
    amplitudeX: 22,
    amplitudeY: 12,
    speed: 0.0021,
    phase: 0.5,
    angleAmplitude: 0.9,
    angleSpeed: 0.0031,
    anglePhase: 1.0
  });

  addMovingBody(spinnerRightOuter, {
    baseX: boardWidth * 0.80,
    baseY: boardHeight * 0.46,
    amplitudeX: 22,
    amplitudeY: 12,
    speed: 0.00225,
    phase: 2.2,
    angleAmplitude: 0.9,
    angleSpeed: 0.00315,
    anglePhase: 0.3
  });

  addMovingBody(spinnerLeftInner, {
    baseX: boardWidth * 0.30,
    baseY: boardHeight * 0.60,
    amplitudeX: 16,
    amplitudeY: 10,
    speed: 0.002,
    phase: 1.4,
    angleAmplitude: 0.78,
    angleSpeed: 0.0029,
    anglePhase: 0.8
  });

  addMovingBody(spinnerRightInner, {
    baseX: boardWidth * 0.70,
    baseY: boardHeight * 0.60,
    amplitudeX: 16,
    amplitudeY: 10,
    speed: 0.00205,
    phase: 2.9,
    angleAmplitude: 0.78,
    angleSpeed: 0.00295,
    anglePhase: 1.9
  });

  // 움직이는 원형 bumper
  const bumperConfigs = [
    { x: boardWidth * 0.10, y: boardHeight * 0.17, color: '#d9f0e7', phase: 0.3, ax: 20, ay: 7 },
    { x: boardWidth * 0.24, y: boardHeight * 0.27, color: '#f1dced', phase: 1.1, ax: 18, ay: 8 },
    { x: boardWidth * 0.50, y: boardHeight * 0.20, color: '#d8ebff', phase: 2.0, ax: 14, ay: 6 },
    { x: boardWidth * 0.76, y: boardHeight * 0.27, color: '#f6dfb5', phase: 2.8, ax: 18, ay: 8 },
    { x: boardWidth * 0.90, y: boardHeight * 0.17, color: '#d9f0e7', phase: 3.4, ax: 20, ay: 7 },
    { x: boardWidth * 0.12, y: boardHeight * 0.48, color: '#f1dced', phase: 0.9, ax: 16, ay: 9 },
    { x: boardWidth * 0.88, y: boardHeight * 0.48, color: '#d8ebff', phase: 2.6, ax: 16, ay: 9 }
  ];

  bumperConfigs.forEach((cfg, index) => {
    const bumper = Bodies.circle(cfg.x, cfg.y, 16, {
      isStatic: true,
      restitution: 1.15,
      render: {
        fillStyle: cfg.color,
        strokeStyle: '#fffdf8',
        lineWidth: 2
      }
    });

    worldBodies.push(bumper);

    addMovingBody(bumper, {
      baseX: cfg.x,
      baseY: cfg.y,
      amplitudeX: cfg.ax,
      amplitudeY: cfg.ay,
      speed: 0.002 + index * 0.00018,
      phase: cfg.phase
    });
  });

  World.add(world, worldBodies);
  renderSlotsOverlay();
  refreshCounts();

  totalInfo.textContent = `총 ${slotCount}그릇`;
  statusText.textContent = `현재 배치: ${currentSlots.map((slot) => slot.name).join(' / ')}`;
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

    const chip = document.createElement('div');
    chip.className = 'legend-chip';
    chip.innerHTML = `
      <span class="legend-dot" style="background:${color}"></span>
      <span>${index + 1}. ${slot.name}</span>
    `;
    slotLegend.appendChild(chip);
  });
}

function createBall(x, y, options = {}) {
  const isBomb = Boolean(options.isBomb);
  const radius = isBomb ? 5.2 : 4.5;
  const color = isBomb ? '#1f1f1f' : ballPalette[Math.floor(Math.random() * ballPalette.length)];

  const ball = Bodies.circle(x, y, radius, {
    restitution: isBomb ? 0.5 : rand(0.42, 0.6),
    friction: 0.002,
    frictionAir: 0.0008,
    density: isBomb ? 0.0022 : 0.0018,
    render: {
      fillStyle: color,
      strokeStyle: isBomb ? '#5c5c5c' : '#fffafc',
      lineWidth: isBomb ? 1.4 : 1.1
    }
  });

  ball.isBombBall = isBomb;
  ball.hasExploded = false;

  ballBodies.push(ball);
  World.add(world, ball);
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
      const x = 30 + Math.random() * (boardWidth - 60);
      const y = 22 + Math.random() * 12;

      createBall(x, y, { isBomb });
      spawned += 1;
      statusText.textContent = `구슬이 떨어지는 중... ${spawned}/${TOTAL_DROP_COUNT}`;

      if (spawned === TOTAL_DROP_COUNT) {
        roundSpawnComplete = true;
        statusText.textContent = `구슬 ${BALL_COUNT}개 + 폭탄 ${BOMB_COUNT}개 투하 완료. 모이는 중...`;
        startSettleWatcher();
      }
    }, index * SPAWN_INTERVAL_MS);

    spawnTimers.push(timer);
  });
}

function refreshCounts() {
  if (!currentSlots.length) return;

  const playableWidth = boardWidth - BOARD_SIDE_PADDING * 2;
  const slotTopY = boardHeight - slotAreaHeight;
  const slotCount = currentSlots.length;
  const slotWidth = playableWidth / slotCount;
  const counts = new Array(slotCount).fill(0);

  ballBodies.forEach((ball) => {
    const { x, y } = ball.position;

    if (y < slotTopY + 6) return;

    const relativeX = x - BOARD_SIDE_PADDING;
    if (relativeX < 0 || relativeX > playableWidth) return;

    let slotIndex = Math.floor(relativeX / slotWidth);
    if (slotIndex < 0) slotIndex = 0;
    if (slotIndex >= slotCount) slotIndex = slotCount - 1;

    counts[slotIndex] += 1;
  });

  [...slotOverlay.children].forEach((slotNode, index) => {
    const meta = slotNode.querySelector('.slot-meta');
    meta.textContent = `그릇 ${index + 1} · ${counts[index]}개`;
  });
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
    if (window.innerWidth > 980) {
      setDrawerState(false);
    }

    if (screens.game1.classList.contains('active') && engine && currentSlots.length) {
      buildBoard();
    }
  }, 180);
});

updateSlotsFromInput({ build: false });