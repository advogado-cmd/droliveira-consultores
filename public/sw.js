// Service worker minimo: permite instalar como app e mantem o shell em cache; conteudo sempre da rede quando disponivel.
const CACHE = "dro-consultores-v1";
self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", (e) => {
  const r = e.request; if (r.method !== "GET" || new URL(r.url).pathname.startsWith("/api/")) return;
  e.respondWith(fetch(r).then((res) => { if (res.ok && r.url.startsWith(self.location.origin)) { const c = res.clone(); caches.open(CACHE).then((cache) => cache.put(r, c)); } return res; }).catch(() => caches.match(r)));
});
