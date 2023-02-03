const CACHE_NAME = `phs-web-dev`;

self.addEventListener("fetch", (event) => {
  if (!(event.request.url.indexOf("http") === 0)) return;
  event.respondWith(
    (async function () {
      const cache = await caches.open(CACHE_NAME);
      try {
        const networkResponse = await fetch(event.request);
        event.waitUntil(cache.put(event.request, networkResponse.clone()));
        return networkResponse;
      } catch (err) {
        return cache.match(event.request);
      }
    })()
  );
});
