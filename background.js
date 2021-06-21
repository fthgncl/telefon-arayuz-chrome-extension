
chrome.browserAction.onClicked.addListener(function(tab) {

    if (tab.url.indexOf("chrome://") == -1 ){
        chrome.tabs.executeScript({file: "clickedExtension.js"});
        chrome.tabs.executeScript({file: "arayuz.js"});
    }

});


var contextMenuItem = [
{
    "id": "IslemleriDurdurButon",
    "title": "Kurulum İşlemlerini Durdur",
    "contexts": ["browser_action"]
}
,
{
    "id": "test",
    "title": "test",
    "contexts": ["browser_action"]
}
]

for(var i = 0 ; i < contextMenuItem.length ; i++){
    chrome.contextMenus.create(contextMenuItem[i]);
}
chrome.contextMenus.onClicked.addListener(ClickedContextMenuItem);

function ClickedContextMenuItem(info, tab) {
    
    switch(info.menuItemId){

        case "IslemleriDurdurButon":
        {
            if (tab.url.indexOf("chrome://") == -1 ){
                chrome.tabs.executeScript({file: "kurulumdurdur.js"})
            }
            else
            {
                alert("• Lütfen kurulum işlemini durdurmak telefon arayüz sayfasına gidin.")
            }
        }
        break;

        case "test":
        {
            fetch('https://jsonplaceholder.typicode.com/posts/1')
              .then(function(response){
                response.json()
                  .then(function(user){
                    alert(user.title)
                  })
            })
        }
        break;





    }

}
