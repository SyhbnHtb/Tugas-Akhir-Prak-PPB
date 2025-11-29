const CACHE_NAME = "maa-cache-v1";

const urlsToCache = [
  "/",
  "/dashboard",
  "/index.html",
  "/manifest.json",

  // tambahkan file static hasil build
  "/assets/*"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Bila ada cache → pakai cache
      if (response) return response;

      // Bila tidak ada → fetch normal
      return fetch(event.request).catch(() => {
        // fallback offline untuk route React
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }
      });
    })
  );
});
