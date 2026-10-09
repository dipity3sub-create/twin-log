// Lets the app open without internet. When online, the page itself is always
// fetched fresh (so updates arrive straight away); the saved copy is used if
// the network is slow or missing.
const CACHE = 'twin-sleep-v3';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function fromNetwork(cache, request) {
  return fetch(request).then((res) => {
    if (res.ok) cache.put(request, res.clone());
    return res;
  });
}

self.addEventListener('fetch', (e) => {
  // Only our own files. The shared log (Google) is never cached.
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(e.request, { ignoreSearch: true }).then((cached) => {
        const network = fromNetwork(cache, e.request);
        if (e.request.mode !== 'navigate') return cached || network;
        // The page: prefer fresh, but don't wait more than 3 seconds if we have a copy.
        if (!cached) return network;
        const timeout = new Promise((resolve) => setTimeout(() => resolve(cached), 3000));
        return Promise.race([network.catch(() => cached), timeout]);
      })
    )
  );
});
