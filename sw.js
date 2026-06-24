// SMA v6.0.6 minimal service worker - stale cache prevention
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
