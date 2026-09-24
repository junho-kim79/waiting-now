// 예전 일본어 교실 캐시 제거용: 이전에 방문한 기기에서 옛 화면이 계속 뜨지 않도록 캐시를 지우고 스스로 해제
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.registration.unregister();
    const cs = await self.clients.matchAll({ type: 'window' });
    cs.forEach(c => c.navigate(c.url));
  })());
});
