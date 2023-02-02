const CACHE_NAME = 'phs-web-dev';

// A list of resources to cache
const RESOURCES_TO_PRELOAD = [
    '/',
    '/schedule',
];

// The install event listener, which caches all the resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(RESOURCES_TO_PRELOAD);
            })
    );
});

// The fetch event listener, which serves resources from the cache if possible,
// and otherwise makes a network request and adds the response to the cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(networkResponse => {
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, networkResponse.clone());
                            });
                        return networkResponse;
                    });
            })
    );
});