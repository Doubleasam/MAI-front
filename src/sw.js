// src/sw.js
import { precacheAndRoute } from 'workbox-precaching';

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open('mai-cache-v1')
      .then((cache) => cache.addAll(['/','/index.html', '/assets/*']))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

precacheAndRoute(self.__WB_MANIFEST, {
  cacheName: 'mai-cache-v1',
  urls: ['/','/index.html', '/assets/*'],
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
});