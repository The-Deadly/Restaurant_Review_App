let staticCacheName = 'restaurant-static-v1';

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
				'./',
				'./index.html',
				'./restaurant.html',
				'./css/styles.css',
				'./data/restaurants.json',
				'./js/dbhelper.js',
				'./js/main.js',
				'./js/restaurant_info.js',
				'./js/sw_register.js',
				'./img/1.jpg',
				'./img/2.jpg',
				'./img/3.jpg',
				'./img/4.jpg',
				'./img/5.jpg',
				'./img/6.jpg',
				'./img/7.jpg',
				'./img/8.jpg',
				'./img/9.jpg',
				'./img/10.jpg'
			]);
		})
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('restaurant-') &&
						   cacheName != staticCacheName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request , {ignoreSearch:true})
		.then(function(response) {
			return response || fetch(event.request);
		})
	);
});
// let staticCacheName = 'restaurant-cache';
// let urlsToCache = [
//   './',
//   './index.html',
//   './restaurant.html',
//   './css/styles.css',
//   './js/main.js',
//   './js/restaurant_info.js',
//   './js/dbhelper.js',
//   './js/sw_registration.js',
//   './data/restaurants.json',
//   './img/1.jpg',
//   './img/2.jpg',
//   './img/3.jpg',
//   './img/4.jpg',
//   './img/5.jpg',
//   './img/6.jpg',
//   './img/7.jpg',
//   './img/8.jpg',
//   './img/9.jpg',
//   './img/10.jpg',
// ];


// /**
//  * Installation of service worker
//  */
// self.addEventListener('install', function(event) {
// 	event.waitUntil(
// 		caches.open(staticCacheName).then(function(cache) {
// 			return cache.addAll(urlsToCache);
//         })
//     );
// });


// /**
//  * Activation of service worker
//  */
// self.addEventListener('activate', function(event) {
//     event.waitUntil(
//         caches.keys().then(function(cacheNames) {
//             return Promise.all(
//                 cacheNames.filter(function(cacheName) {
//                     return cacheName.startsWith('restaurant-') &&
//                         cacheName != staticCacheName;
//                 }).map(function(cacheName) {
//                     return caches.delete(cacheName);
//                 })
//             );
//         })
//     );
// });


// /**
//  * Fetching for offline content viewing
//  */
// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches.match(event.request).then(function(response) {
//             return response || fetch(event.request);
//         })
//     );
// });