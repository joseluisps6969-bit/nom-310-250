const CACHE_NAME = 'nom-trainer-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalación y almacenamiento en caché de los recursos esenciales
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercepción de peticiones de red para servir la versión almacenada localmente
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
