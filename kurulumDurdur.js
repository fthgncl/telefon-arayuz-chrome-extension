var serviceURL = chrome.runtime.getManifest().service_url;
fetch(`${serviceURL}/extensionScripts/url.json`)
  .then(response => response.json())
  .then(data => {
    sayfayaScriptEkle(`${data.url}/extensionScripts/stopinstall.js`);
  })
  .catch((error) => {
    console.error("stopinstall.js ulaşmaya çalışırken Hata: " + error);
  });