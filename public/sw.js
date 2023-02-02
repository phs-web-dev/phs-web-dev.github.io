const CACHE_NAME = 'phs-web-dev';

self.addEventListener('fetch', event => {
    const isOnline = navigator.onLine;
    if (!isOnline) {
        // User is offline, serve the cached version of the resource
        event.respondWith(caches.match(event.request));
    } else {
        // User is online, fetch the latest version of the resource from the server
        event.respondWith(
            fetch(event.request).then(response => {
                // Once the response is received, cache it for future offline use
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, response.clone());
                });
                return response;

            })
        );
    }
});