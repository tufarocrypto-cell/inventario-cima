const VERSIONE = "0.1.3";
const CACHE = "inventario-" + VERSIONE;
const FILE = ["./", "./index.html", "./manifest.webmanifest", "./icona.svg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILE))); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
self.addEventListener("message", e => { if (e.data && e.data.tipo === "aggiorna") self.skipWaiting(); });
