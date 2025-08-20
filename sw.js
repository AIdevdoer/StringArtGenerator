importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {url: '/', revision: null},
  {url: '/index.html', revision: null},
  {url: '/style.css', revision: null},
  {url: '/ndarray.js', revision: null},
  {url: '/opencv.js', revision: null},
  {url: '/exporter.js', revision: null},
  {url: '/test2.gif', revision: null},
  {url: '/manifest.webmanifest', revision: null}
]);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image' || request.destination === 'font',
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'script' || request.destination === 'style',
  new workbox.strategies.StaleWhileRevalidate()
);
