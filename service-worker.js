const CACHE_NAME = 'leaveledger-cache-v1';

const urlsToCache = [
  '/leaveledger/index.html',
  '/leaveledger/leaveledger.png',
  '/leaveledger/leaveledgerBG.png',
  '/leaveledger/leaveledger.ico',
  '/leaveledger/leaveledger192.png',
  '/leaveledger/leaveledger512.png',
  '/leaveledger/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest',
  'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js',
  'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      
      return fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate' || event.request.destination === 'document') {
          return caches.match('/leaveledger/index.html');
        }
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('leaveledger-') && cacheName !== CACHE_NAME;
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
