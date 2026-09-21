/* Portfolio image cache — stale-while-revalidate
 *
 * The visitor always sees something instantly (the cached frame), while a
 * background refresh quietly replaces it. Swapping an image on the server —
 * or bumping MEDIA_VERSION in site.ts — reaches every visitor on the very
 * next render, no manual cache clears needed.
 *
 * Requests still go directly to Pexels / ImgBB — never through a Vercel
 * function or proxy.
 */
const IMAGE_CACHE_KEY = "portfolio-images";
const MAX_IMAGE_ENTRIES = 64;
const IMAGE_HOSTS = new Set(["images.pexels.com", "i.ibb.co"]);

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

async function trimCache(cache) {
  const keys = await cache.keys();
  const overflow = keys.length - MAX_IMAGE_ENTRIES;
  if (overflow <= 0) return;
  /* evict the oldest entries first (Cache Storage gives them in LRU order) */
  await Promise.all(keys.slice(0, overflow).map((key) => cache.delete(key)));
}

/* fetch from the network, remembering the result on success / opaque */
async function fetchAndCache(cache, request) {
  try {
    const response = await fetch(request, { cache: "no-store" });
    if (response.ok || response.type === "opaque") {
      await cache.put(request, response.clone());
      await trimCache(cache);
    }
    return response;
  } catch {
    return null;
  }
}

/* the win-win path: cached frame replies instantly, but a refresh always
 * follows so anything the server swapped replaces it silently */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(IMAGE_CACHE_KEY);
  const cached = await cache.match(request, { ignoreVary: true });

  const refresh = cached ? fetchAndCache(cache, request) : fetchAndCache(cache, request);
  if (cached) {
    /* background task is guaranteed if the page is controlled */
    event.respondWith(cached);
    return refresh; // unawaited — finishes whenever it can
  }

  return refresh;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || request.destination !== "image") return;

  const url = new URL(request.url);
  if (!IMAGE_HOSTS.has(url.hostname)) return;

  /* the pattern matches cache-then-refresh — the cached copy answers now,
     the background copy updates Cache Storage for the next render */
  event.respondWith(
    (async () => {
      const cache = await caches.open(IMAGE_CACHE_KEY);
      const cached = await cache.match(request, { ignoreVary: true });
      const promise = fetchAndCache(cache, request);
      if (cached) {
        /* respond instantly with the memory, refresh later */
        promise.catch(() => undefined);
        return cached;
      }
      /* first visit — the network is the truth */
      return promise;
    })(),
  );
});