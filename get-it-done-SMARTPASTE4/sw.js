// Service Worker for Get It Done PWA
// Does NOT cache anything - pure pass-through to preserve IndexedDB data

const SW_VERSION = 'v3-persist-safe';

self.addEventListener('install', (event) => {
  // Activate immediately without waiting
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Clear any old caches from previous SW versions, then claim clients
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('[SW] Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Pure pass-through: no caching, always fetch from network
  // This ensures fresh JS/HTML is always loaded and IndexedDB is never touched
  event.respondWith(fetch(event.request));
});
