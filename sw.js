// Cube 2048 Service Worker
// バージョンを変えるとキャッシュ更新される
const CACHE_NAME = 'cube2048-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 失敗してもインストールを続行（外部CDNが落ちてた場合に備えて）
      return Promise.all(
        ASSETS.map((url) =>
          cache.add(url).catch((err) => console.warn('cache miss:', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // GETのみキャッシュ対象
  if (event.request.method !== 'GET') return;

  // Cache first, fallback to network
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // 同一オリジンと既知CDNのみ追加キャッシュ
        const url = new URL(event.request.url);
        if (
          url.origin === self.location.origin ||
          url.host === 'cdnjs.cloudflare.com'
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // オフラインで未キャッシュなら諦める
        return new Response('Offline', { status: 503, statusText: 'Offline' });
      });
    })
  );
});
