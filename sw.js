const CACHE_VERSION = 'random-roulette-v20260825-mobile-swipe-loop-fix-ux15'
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './random-roulette.v3.15.css',
  './volume-controls.js',
  './random-roulette.v3.15.js',
  './assets/matter.min.js',
  './assets/app-icon.svg',
  './assets/app-icon-192.png',
  './assets/app-icon-512.png',
  './assets/bear-find-start.webp',
  './assets/bear-find-bear.mp4',
  './assets/bear-find-panda.mp4',
  './assets/bear-find-bear-mobile.mp4',
  './assets/bear-find-panda-mobile.mp4',
  './assets/home-qr-light.png',
  './assets/home-qr-dark.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  )
})

async function serveCachedRange(request, cached) {
  const rangeHeader = request.headers.get('range') || ''
  const match = rangeHeader.match(/^bytes=(\d+)-(\d*)$/)
  if (!match) return cached

  const blob = await cached.blob()
  const start = Number(match[1])
  const requestedEnd = match[2] ? Number(match[2]) : blob.size - 1
  const end = Math.min(requestedEnd, blob.size - 1)
  if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= blob.size) {
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${blob.size}` }
    })
  }

  return new Response(blob.slice(start, end + 1), {
    status: 206,
    statusText: 'Partial Content',
    headers: {
      'Accept-Ranges': 'bytes',
      'Content-Length': String(end - start + 1),
      'Content-Range': `bytes ${start}-${end}/${blob.size}`,
      'Content-Type': cached.headers.get('Content-Type') || 'application/octet-stream'
    }
  })
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  const url = new URL(event.request.url)
  if (url.origin !== self.location.origin) return

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE_VERSION).then((cache) => cache.put('./index.html', copy))
          return response
        })
        .catch(() => caches.match('./index.html'))
    )
    return
  }

  if (event.request.headers.has('range')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return serveCachedRange(event.request, cached)
        return fetch(event.request)
      })
    )
    return
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached
      return fetch(event.request).then((response) => {
        if (response.ok) {
          const copy = response.clone()
          caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy))
        }
        return response
      })
    })
  )
})
