const CACHE_NAME = 'dompetku-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'
];

// Menginstal Service Worker dan menyimpan file ke memori
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Mengambil file dari memori saat offline
self.addEventListener('fetch', event => {
  // BARU: Jangan cegat permintaan POST atau komunikasi ke API Google Script
  if (event.request.method !== 'GET' || event.request.url.includes('script.google.com')) {
    return; // Biarkan browser yang menanganinya secara normal
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      // Kembalikan versi memori jika ada, jika tidak ambil dari internet
      return response || fetch(event.request);
    })
  );
});