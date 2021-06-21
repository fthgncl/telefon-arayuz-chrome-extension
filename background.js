
chrome.browserAction.onClicked.addListener(function(tab) {

    if (tab.url.indexOf("chrome://") == -1 ){
        chrome.tabs.executeScript({file: "clickedExtension.js"});
        chrome.tabs.executeScript({file: "arayuz.js"});
    }

});

var contextMenuItem = {
    "id": "IslemleriDurdurButon",
    "title": "Kurulum İşlemlerini Durdur",
    "contexts": ["browser_action"]
}
chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(makeVisible);

function makeVisible(info, tab) {
    if (tab.url.indexOf("chrome://") == -1 ){
        chrome.tabs.executeScript({file: "kurulumdurdur.js"})
    }
    else
    {
        alert("• Lütfen kurulum işlemini durdurmak telefon arayüz sayfasına gidin.")
    }
}