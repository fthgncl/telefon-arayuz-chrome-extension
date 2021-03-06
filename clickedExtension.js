var serviceURL = chrome.runtime.getManifest().service_url;

fetch(`${serviceURL}/extensionScripts/url.json`)
  .then(response=>response.json())
  .then(data => {
      sayfayaScriptEkle(`${data.url}/extensionScripts/clickedExtension.js`);
  })
  .catch((error) => {
      console.error("index.js ulaşmaya çalışırken hata: "+error);
  });

function sayfayaScriptEkle(scriptURL) {
    const head = document.getElementsByTagName("head")[0];
    if (head) {
        const element = document.createElement("script");
        element.setAttribute("src", scriptURL);
        head.appendChild(element);
    }
}


