chrome.browserAction.onClicked.addListener(function (tab) {
    if (tab.url.indexOf("chrome://") === -1) {
        chrome.tabs.executeScript(tab.id, {file: "clickedExtension.js"});
    } else {
        alert("• Lütfen kurulum işlemini başlatmak için chrome://* pencerelerinde bulunmayın.")
    }
});
chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (tab.url !== undefined && info.status === 'complete') {
        chrome.windows.getAll({populate: true}, function (windows) {
            windows.forEach(function (window) {
                window.tabs.forEach(function (tab) {
                    if (tab.id === tabId && tab.url.indexOf("chrome://") === -1) {
                        chrome.tabs.executeScript(tabId, {file: "index.js"});
                    }
                });
            });
        });
    }
});

let contextMenuItem = [
    {
        "id": "IslemleriDurdurButon",
        "title": "Kurulum İşlemlerini Durdur",
        "contexts": ["browser_action"]
    }
]

for (var i = 0; i < contextMenuItem.length; i++) {
    chrome.contextMenus.create(contextMenuItem[i]);
}
chrome.contextMenus.onClicked.addListener(ClickedContextMenuItem);

function ClickedContextMenuItem(info, tab) {
    switch (info.menuItemId) {
        case "IslemleriDurdurButon": {
            if (tab.url.indexOf("chrome://") === -1) {
                chrome.tabs.executeScript({file: "kurulumDurdur.js"})
            } else {
                alert("• Lütfen kurulum işlemini durdurmak için chrome://* pencerelerinde bulunmayın.")
            }
        }
    }
}
