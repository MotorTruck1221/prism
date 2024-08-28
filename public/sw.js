//The UV bundle. It contains most of the code for ultraviolet to function properly.
importScripts('/uv/uv.bundle.js');
//our uv.config.js that we just made a few steps ago
importScripts('/uv/uv.config.js');
//the actual Ultraviolet service worker. Needed for UV to function properly.
importScripts(__uv$config.sw || '/uv/uv.sw.js');

//create the uv service worker
const uv = new UVServiceWorker();

//listen for when things are requested.
self.addEventListener('fetch', function (event) {
    //If the request starts with the websites origin (eg. https://localhost:8080) and the uv prefix (/uv/service), then proxy the request.
    if (event.request.url.startsWith(location.origin + __uv$config.prefix)) {
        //respond (proxy) the request
        event.respondWith(
            (async function () {
                return await uv.fetch(event);
            })()
        );
    }
    //if it doesn't start with the origin and prefix, just get the stuff normally.
    else {
        event.respondWith(
            (async function() {
                return await fetch(event.request);
            })()
        );
    }
});
