const CACHE_NAME = "bleus-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/assest/blue.jpg",
  "/assest/IMG_0709.PNG",
  "/assest/wal.jpeg"
];

// install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});