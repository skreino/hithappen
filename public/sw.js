const CACHE = "hithappen-shell-v3";
const SHELL = ["/", "/manifest.webmanifest", "/branding/logo.png", "/branding/wordmark-transparent.png", "/events/rooftop.png", "/events/live.png", "/events/club.png"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("hithappen-shell-") && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  // Always fetch current HTML; cached documents are an offline fallback only.
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone()).catch(() => undefined);
        return response;
      } catch {
        return await cache.match(request) || await cache.match("/") || Response.error();
      }
    })());
    return;
  }
  // Never return HTML for failed JS/CSS, RSC or API requests.
  const staticAsset = url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/events/") || url.pathname.startsWith("/branding/");
  if (!staticAsset) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone()).catch(() => undefined);
    return response;
  })());
});
