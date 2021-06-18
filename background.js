chrome.browserAction.onClicked.addListener(function(tab) {

    chrome.tabs.executeScript({file: "arayuz.js"});

});

chrome.tabs.onUpdated.addListener(function (tabId , info) {
    
    if (info.status == 'complete') {
        chrome.tabs.executeScript({file: "pageloaded.js"});
    }
});