chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
		Kontrol()
});

chrome.tabs.onUpdated.addListener(function (tabId , info) {
	
	if (info.status == 'complete') {
		Kontrol()
		
	}
});



function Gorunmez_Dugmeyi_Sil(){

	chrome.tabs.getSelected(null,function(tab) {

		if ( tab.url.indexOf("forum.csduragi") != -1 ){


			var KisayolAdeti = localStorage.getItem('KisayolAdeti')
			for ( var i = 1 ; i <= KisayolAdeti ; i++ ){

				if ( tab.url == localStorage.getItem('Kisayol'+i+'url') ){
					chrome.tabs.executeScript({code: "var GDugme = document.getElementById('gorunmez_buton');if ( GDugme ){GDugme.click();GDugme.remove();}"});
				}

			}
				


		}
	});


}
function Kontrol(){

	chrome.tabs.getSelected(null,function(tab) {

		




		var tablink = tab.url;
		if ( (tablink.indexOf("csduragi.com") != -1 || tablink.indexOf("gametracker.com") != -1) && tab.title.indexOf("Just a moment...") == -1 ){


			var Aranan1 = " - CSDuragi.COM Forum"
			var Aranan2 = "CSDuragi.COM Forum - "
			var Aranan3 = "★ "
		    var tabname = tab.title.replace(Aranan1,"");
		    tabname = tabname.replace(Aranan2,"");
		    tabname = tabname.replace(Aranan3,"");
		    var Bildirim = 0

		   for(var i=0;i<=9;i++)
			{
				var Bildirim_Varligi = tabname.indexOf("("+i+") ")
				if ( Bildirim_Varligi == 0 || Bildirim_Varligi == 2){
						chrome.browserAction.setBadgeText({text: String(i)});
						tabname = tabname.replace("("+i+") ","")
						i = 10
						Bildirim = 1
				}
			}

			if ( Bildirim == 0 ){
				chrome.browserAction.setBadgeText({text: String("")});
			}


			localStorage.setItem('Sekmedeki_Tablink',tablink)
			localStorage.setItem('Sekmedeki_Tabname',tabname)
			localStorage.setItem('UygunSite',"1")

		}
		
		else localStorage.setItem('UygunSite',"0")

		if ( tablink.indexOf("forum.csduragi") != -1 ){

			chrome.tabs.insertCSS(null, {file: "CSDuragiUzanti.css"});
			chrome.tabs.executeScript({file: "İconPaketi.js"});
			chrome.tabs.executeScript({file: "ForumScript.js"});
		}
		
	});
	setTimeout(Gorunmez_Dugmeyi_Sil , 100)
}


SaniyelikKontrol();
function SaniyelikKontrol(){

	chrome.tabs.getSelected(null,function(tab) {


	if ( tab.url.indexOf("forum.csduragi.com") != -1 ){

		/// YILDIZLA
		var KisayolAdeti = localStorage.getItem('KisayolAdeti')
		for ( var i = 1 ; i <= KisayolAdeti ; i++ ){

			if ( tab.url == localStorage.getItem('Kisayol'+i+'url') ){
				chrome.tabs.executeScript({code: "var baslik = document.title; document.title = baslik.replace('[★]:Ø_.:','★')"});
				i = KisayolAdeti + 1
			}

		}

		/// YILDIZLA + KAYDET
		if ( tab.title.indexOf("[★]:._Ø: ") == 0 ){
			chrome.tabs.executeScript({code: "var baslik = document.title; document.title = baslik.replace('[★]:._Ø:','★')"});
			chrome.tabs.executeScript({code: "var yildiz_icerigi = document.getElementById('yildiz_icerigi');var yildiz_class = yildiz_icerigi.classList;yildiz_icerigi.classList.add('fa-star');yildiz_icerigi.classList.remove('fa-star-o');"});
			Link_Ekleme_Islemi(tab.url,tab.title)
			
		}
		else 
		{
			/// YILDIZI SİL + KAYDI SİL
			if ( tab.title.indexOf("[★]:.-Ø: ") == 0 ){
				chrome.tabs.executeScript({code: "var baslik = document.title; document.title = baslik.replace('[★]:.-Ø:','')"});
				chrome.tabs.executeScript({code: "var yildiz_icerigi = document.getElementById('yildiz_icerigi');var yildiz_class = yildiz_icerigi.classList;yildiz_icerigi.classList.add('fa-star-o');yildiz_icerigi.classList.remove('fa-star');"});
				Link_Kaldirma_Islemi(tab.url)
			}
		}
	}


	});

	setTimeout(SaniyelikKontrol,750);

}
function Link_Ekleme_Islemi(yeniUrl,yeniName) {

	var fixYeniName = yeniName.replace('[★]:Ø_.:','')
	fixYeniName = fixYeniName.replace('[★]:._Ø:','')
	fixYeniName = fixYeniName.replace('[★]:.-Ø:','')
	fixYeniName = fixYeniName.replace(' - CSDuragi.COM Forum','')
	fixYeniName = fixYeniName.replace('CSDuragi.COM Forum - ','')
	fixYeniName = fixYeniName.replace('★ ','')

	var KisayolAdeti = localStorage.getItem('KisayolAdeti')
	KisayolAdeti++

	localStorage.setItem('KisayolAdeti',KisayolAdeti)
	localStorage.setItem('Kisayol'+KisayolAdeti+'url',yeniUrl)
	localStorage.setItem('Kisayol'+KisayolAdeti+'name',fixYeniName)

	UyariYap()

}
function Link_Kaldirma_Islemi(url_yazisi) {

	var KisayolAdeti = localStorage.getItem('KisayolAdeti')


	var katman
	for ( var i = 1 ; i <= KisayolAdeti ; i++ ){

		if ( url_yazisi == localStorage.getItem('Kisayol'+i+'url') ){
			katman = i
			i = KisayolAdeti + 1
		}
	}

	for ( var i = katman ; i < KisayolAdeti ; i++ ){

		i++
		var Bir_Ust_Baslik = localStorage.getItem('Kisayol'+i+'name')
		var Bir_Ust_Url = localStorage.getItem('Kisayol'+i+'url')
		i-= 1

		localStorage.setItem('Kisayol'+i+'url',Bir_Ust_Url)
		localStorage.setItem('Kisayol'+i+'name',Bir_Ust_Baslik)


	}

	KisayolAdeti -= 1;
	localStorage.setItem('KisayolAdeti',KisayolAdeti)
}


function UyariYap(){

	var gun = (new Date()).getDay();

	if ( gun != localStorage.getItem('gun_bilgisi') ){
		localStorage.setItem('gun_bilgisi',gun)

		alert("● Yıldızlama butonunu kullandıktan sonra sayfa veya sekme değişmeden önce lütfen butonun tepki göstermesini bekleyiniz.")

	}

}

var contextMenuItem = {
    "id": "YasakliKodButton",
    "title": "Yasaklı Kod Testi Yap",
    "contexts": ["browser_action"]
};
chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(makeVisible);

function makeVisible(info, tab) {
    chrome.tabs.create({ url: "YasakliKodKontrol.html" });
}