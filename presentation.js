const slides = [...document.querySelectorAll('.slide')];
const deck = document.getElementById('deck');
const slideLabel = document.getElementById('slideLabel');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

let currentIndex = 0;
let touchStartX = 0;
let touchStartY = 0;
let cursorHideTimer = null;

function clampIndex(index) {
  return Math.max(0, Math.min(index, slides.length - 1));
}

function isFullscreen() {
  return Boolean(document.fullscreenElement || document.webkitFullscreenElement);
}

function syncFullscreenButton() {
  fullscreenBtn.textContent = isFullscreen() ? '🗗' : '⛶';
}

async function toggleFullscreen() {
  try {
    if (isFullscreen()) {
      if (document.exitFullscreen) await document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    } else {
      const target = document.documentElement;
      if (target.requestFullscreen) await target.requestFullscreen();
      else if (target.webkitRequestFullscreen) target.webkitRequestFullscreen();
    }
  } catch (error) {
    console.warn('fullscreen error', error);
  } finally {
    syncFullscreenButton();
  }
}

function updateSlide(index) {
  currentIndex = clampIndex(index);

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentIndex);
  });

  if (slideLabel) {
    slideLabel.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  }

  if (progressBar) {
    progressBar.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
  }

  document.title = `${slides[currentIndex].dataset.title} | 랜덤 룰렛 사이트`;
}

function nextSlide() {
  updateSlide(currentIndex + 1);
}

function prevSlide() {
  updateSlide(currentIndex - 1);
}

function isInteractiveTarget(target) {
  return Boolean(target.closest('.interactive, a, button'));
}

function showCursorNow() {
  document.body.classList.remove('cursor-hidden');
  if (cursorHideTimer) clearTimeout(cursorHideTimer);
  cursorHideTimer = setTimeout(() => {
    document.body.classList.add('cursor-hidden');
  }, 3000);
}

deck.addEventListener('click', (event) => {
  if (isInteractiveTarget(event.target)) return;
  nextSlide();
});

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
fullscreenBtn.addEventListener('click', toggleFullscreen);

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
    event.preventDefault();
    nextSlide();
  }

  if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    event.preventDefault();
    prevSlide();
  }

  if (event.key === 'Home') {
    event.preventDefault();
    updateSlide(0);
  }

  if (event.key === 'End') {
    event.preventDefault();
    updateSlide(slides.length - 1);
  }

  if (event.key.toLowerCase() === 'f') {
    event.preventDefault();
    toggleFullscreen();
  }
});

deck.addEventListener('touchstart', (event) => {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, { passive: true });

deck.addEventListener('touchend', (event) => {
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;

  if (Math.abs(deltaX) < 36 || Math.abs(deltaX) < Math.abs(deltaY)) return;
  if (deltaX < 0) nextSlide();
  else prevSlide();
}, { passive: true });

document.addEventListener('fullscreenchange', syncFullscreenButton);
document.addEventListener('webkitfullscreenchange', syncFullscreenButton);

document.addEventListener('mousemove', showCursorNow, { passive: true });
document.addEventListener('mousedown', showCursorNow, { passive: true });
document.addEventListener('mouseleave', () => {
  document.body.classList.add('cursor-hidden');
});
window.addEventListener('blur', () => {
  document.body.classList.add('cursor-hidden');
});

updateSlide(0);
syncFullscreenButton();
showCursorNow();
