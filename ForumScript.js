
if ( document.getElementById("yildiz_icerigi") == null ){

	UstBaslikDuzenle()
	YildizButonuEkle()
	AramaDegismeButonuEkle()
	GununSunucusuEkle();
	GoogleAramaKutusu();
	AramaKutusuEkle();
	AnaSayfaTusuEkle();
	GununSunucusuKontrol();
	MesajlaraEklenmisBildirimCheckKontrolEt()
	VideoEklemeKontrolu()
	GecemoduKontrolu()
	EklentileriGoruntuleButtonuEkle()
	SonMesajaGitDugmeleriFixle()
	DiscordDavetPenceresi()

	function SonMesajaGitDugmeleriFixle(){

		var dugme = document.getElementById("recenttopicstop")
		if ( dugme != null ){
			dugme = dugme.getElementsByClassName("fa-external-link-square")
			var link
			var linkelement
			for ( var i = 0 ; i < dugme.length ; i++ ){

				linkelement = dugme[i].parentNode
				link = linkelement.href
				linkelement.href = "https://forum.csduragi.com/viewtopic.php?p"+link.slice(link.lastIndexOf("="),link.length)
			
			}
		}
	}

	function AnaSayfaTusuEkle(){

		var a = document.createElement("div")
		a.innerHTML = "<center><a href='https://forum.csduragi.com/' class='anasayfa-buton-yazi'>Ana Sayfa</a><center>"
		document.getElementById("page-header").appendChild(a)


	}

	function EklentileriGoruntuleButtonuEkle(){

		var kullaniciadi
		var element = document.getElementById("viewprofile")
		if ( element != null ){ /// profil kısmı
			element = element.getElementsByClassName("profile-details")[0]
			kullaniciadi = element.getElementsByTagName("span")[0].innerHTML.replaceAll(" ","+")

			element.innerHTML = element.innerHTML + "<dt>&nbsp;</dt><dd class='zebra'><a id='eklentilerbuton' data-ajax='zebra'><strong>Paylaştığı eklentileri görüntüle</strong></a></dd>"
			document.getElementById("eklentilerbuton").href = "https://forum.csduragi.com/search.php?keywords=&terms=all&author="+kullaniciadi+"&fid%5B%5D=19&sc=1&sf=titleonly&sr=topics&sk=t&sd=d&st=0&ch=300&t=0&submit=Ara"
		}
		else /// mesaj kenarı kısmı
		{
			element = document.getElementsByClassName("postprofile")
			for ( var i = 0 ; i < element.length ; i++ )
			{
				kullaniciadi = element[i].getElementsByTagName("a")[1].innerHTML.replaceAll(" ","+")
				var bilgibolmesi = element[i].getElementsByClassName("userPostProfileInfo")[0]
				if ( bilgibolmesi != null ){
					bilgibolmesi.innerHTML = bilgibolmesi.innerHTML + "<dd class='profile-posts'><a id='eklentilerbuton"+i+"'>Paylaştığı eklentileri görüntüle</a></dd>"
					document.getElementById("eklentilerbuton"+i).href = "https://forum.csduragi.com/search.php?keywords=&terms=all&author="+kullaniciadi+"&fid%5B%5D=19&sc=1&sf=titleonly&sr=topics&sk=t&sd=d&st=0&ch=300&t=0&submit=Ara"
				}
			}
		}
	}
	function GecemoduKontrolu(){

		var gecemodudugmesi = document.getElementsByClassName("fa-moon-o")[0]
		gecemodudugmesi.addEventListener('click', function (event) {GeceModuDugmesineBasildi(true)});

		gecemodudugmesi = document.getElementsByClassName("fa-lightbulb-o")[0]
		gecemodudugmesi.addEventListener('click', function (event) {GeceModuDugmesineBasildi(false)});

	}
	function GeceModuDugmesineBasildi(durum){

		var element = document.getElementById("Aranan")
		element.style.height = durum ? "1px":"7px"


	}

	function AramaAyarinaBasildi(){
		var searchbox1 = document.getElementById("uzantiaramasi")
		var searchbox2 = document.getElementById("search-box")
		if ( searchbox1 != null && searchbox2 != null ){
			if ( localStorage.getItem("AramaCinsi") != "csdarama" ){
				searchbox1.style.visibility = "hidden";
				searchbox2.style.visibility = "visible";
				localStorage.setItem("AramaCinsi","csdarama")
			}
			else
			{
				searchbox1.style.visibility = "visible";
				searchbox2.style.visibility = "hidden";
				localStorage.removeItem('AramaCinsi')
			}
		}




	}
	function AramaKutusuEkle(){

		

		var alanElement = document.createElement("div")
		alanElement.classList.add('ustbaslik-alan-arama');
		element = document.getElementById("page-header")
		if ( element != null ){
			element.appendChild(alanElement)


			var googlesearch = document.createElement("div");
			googlesearch.innerHTML = "<form id = 'uzantiaramasi' class='forumMenuItem form-wrapper cf '><input id='Aranan' class='yazi aramakutusu' type='text' placeholder='Google Desteğiyle Ara' name=q size=31 maxlength='255' autofocus='autofocus' required><button id='Aramabtnnu' class='yazi aramabutonu'>ARA</button></form>"
			
			if ( localStorage.getItem("AramaCinsi") == "csdarama" ){
				googlesearch.style.visibility = "hidden";
			}

			alanElement.appendChild(googlesearch);


			var orjinalseachbox = document.getElementById("search-box")
			if ( orjinalseachbox != null ){
				alanElement.appendChild(orjinalseachbox);
				orjinalseachbox.classList.add('orjinal-arama-kutusu');
			}

		}

	}

	function UstBaslikDuzenle()
	{
		
		var element = document.getElementById("csdForumMenu")
		if ( element != null )
			element.remove()

		element = document.getElementById("search-box")
		if ( element != null && localStorage.getItem("AramaCinsi") != "csdarama" )
			element.style.visibility = "hidden";

		var alanElement = document.createElement("div")
		alanElement.classList.add('ustbaslik-alan');
		element = document.getElementById("page-header")
		if ( element != null ){
			element.appendChild(alanElement)
		}

		var navmain = document.getElementById("nav-main")
		if ( navmain != null )
			alanElement.appendChild(navmain)

		var avatarPenceresi = document.getElementById("username_logged_in")
		if ( avatarPenceresi != null ){
			avatarPenceresi.getElementsByTagName("a")[0].classList.remove('header-avatar');

			var avatar = avatarPenceresi.getElementsByClassName("avatar")[0]
			if ( avatar == null )
				avatar = avatarPenceresi.getElementsByClassName("username")[0]
			
			avatar.classList.add('baslik-avatar');


			var element = document.getElementsByClassName("dropdown-container")
			var bildirimicon
			for ( var i = 0 ; i < element.length ; i++ ){
				bildirimicon = element[i].getElementsByClassName("fa-bell-o")[0]
				if ( bildirimicon != null ){
					navmain.appendChild(element[i])
					break;
				}
			}


			
		}

	}

	function VideoEklemeKontrolu(){

		if ( localStorage.getItem("VideoGoruldu") != "1"  && localStorage.getItem('SonAnlatimVideosu') != null ){
			VideoEkle(localStorage.getItem('SonAnlatimVideosu'))
		}

	}
	function VideoEkle(VideoKimligi){
		if ( localStorage.getItem('EgitimBildirimKaydi') == "1" || localStorage.getItem("EgitimBildirimKaydi") == null ){
			var sayfabaslikksmi = document.getElementById("start_here")
			var elementvideo = document.createElement("div")
			if ( sayfabaslikksmi != null ){
				
				var buton
				for ( var i = 0 ; i < 2 ; i++ ){
					buton = document.createElement("button");
					if ( buton != null ){
						buton.id = "videobutton"+i
						buton.classList.add('yazi')
						buton.classList.add('video-goruldu')
						buton.innerHTML = i==0? "Bu Anlatımı Tekrar Gösterme" : "Tüm Anlatımları Göster"
						if ( i == 0 )
							buton.addEventListener('click', function() { localStorage.setItem("VideoGoruldu","1");elementvideo.remove();document.getElementById("videobutton1").remove();document.getElementById("videobutton0").remove() });
						else
							buton.addEventListener('click', function() { window.location.href = "https://www.youtube.com/watch?v=33lMOuqbPas&list=PLB10iqtqgtBm1Mj37TfdTZMHHlH1jwMV-&index=1" });

						sayfabaslikksmi.appendChild(buton);
					}
				}

				elementvideo.innerHTML = "<iframe width=100% height='400' src='https://www.youtube.com/embed/"+VideoKimligi+"' frameborder='0' allow='accelerometer; autoplay; clipboard-write;encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
				sayfabaslikksmi.appendChild(elementvideo);
				sayfabaslikksmi.scrollIntoView({behavior: 'auto',block: 'center',inline: 'center'});
			}
		}
	}

	function MesajlaraEklenmisBildirimCheckKontrolEt(){

		var mesajlar = document.getElementsByClassName("content") , Mesaj_icerigi
		for ( var i = 0 ; i < mesajlar.length ; i++ ){
			mesaj_icerigi = mesajlar[i].getElementsByTagName("span")

			for ( var j = 0 ; j < mesaj_icerigi.length ; j++ ){
				if ( mesaj_icerigi[j].style.color.indexOf("rgb(83, 70, 122)") != -1 )
				{
					EklentiAnlatimBildirimCheckBoxEkle(mesaj_icerigi[j])
				}
			}
		}
	}

		
		function GoogleAramaKutusu(){

			var googlesearch = document.createElement("li");
			googlesearch.innerHTML = "<center><div class='dropdown-right rightside' style='max-width:600px;' ><div class='dropdown-right rightside' style='max-width:600px;' ><div class='gcse-search'></div></div></div></center>"
			var element = document.getElementById("phpbb");
			element.appendChild(googlesearch);
			
			var cx = "015091159480402863352:ryhe2qdtq-m"
	        var gcse = document.createElement('script');
	        gcse.type = 'text/javascript';
	        gcse.async = true;
	       	gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//www.google.com/cse/cse.js?cx=' + cx;
	      	var s = document.getElementsByTagName('script')[0];
	        s.parentNode.insertBefore(gcse, s);
	        
		}

	function AramaDegismeButonuEkle(){

		var li_element = document.createElement("li");
		li_element.setAttribute( "data-last-responsive", "true" )
		li_element.setAttribute( "class", "rightside" )
		document.getElementsByClassName("navbar")[0].getElementsByClassName("nav-main")[0].appendChild(li_element)

		var buton_element = document.createElement("a")
		buton_element.setAttribute( "id", "aramaayarbuton" )
		buton_element.setAttribute( "class", "icon fa-search fa-fw")
		buton_element.setAttribute( "aria-hidden", "true")
		li_element.appendChild(buton_element)
			
		buton_element.addEventListener('click', function (event) {
		    AramaAyarinaBasildi();
		});


	}
	function YildizButonuEkle(){

			var li_element = document.createElement("li");
			li_element.setAttribute( "data-last-responsive", "true" )
			li_element.setAttribute( "class", "rightside" )
			document.getElementsByClassName("navbar")[0].getElementsByClassName("nav-main")[0].appendChild(li_element)

			var buton_element = document.createElement("a")
			buton_element.setAttribute( "id", "yildiz_icerigi" )
			buton_element.setAttribute( "class", "icon fa-star-o fa-fw")
			buton_element.setAttribute( "aria-hidden", "true")
			li_element.appendChild(buton_element)
			
			buton_element.addEventListener('click', function (event) {
		            YildizButonunaBasildi(1);
		    });

			GorunmezButonEkle()

	}
	function GorunmezButonEkle(){

			var btn = document.createElement("BUTTON");
			btn.addEventListener('click', function (event) {
		            YildizButonunaBasildi(0);
		            var yildiz_icerigi = document.getElementById('yildiz_icerigi');
		            var yildiz_class = yildiz_icerigi.classList;
		            yildiz_icerigi.classList.add('fa-star');
		            yildiz_icerigi.classList.remove('fa-star-o');
		    });
			btn.id = "gorunmez_buton"
	  		document.body.appendChild(btn);
	  		


	}
	function YildizButonunaBasildi(kayit){

		var yildiz_icerigi = document.getElementById("yildiz_icerigi");



		var yildiz_class = yildiz_icerigi.classList;
		if ( yildiz_class.contains("fa-star-o") ){
				Basliga_Yildiz_Ekle(1,kayit);
		}
		else
		{
				Basliga_Yildiz_Ekle(0,kayit);
		}


	}
	function Basliga_Yildiz_Ekle(ISLEM,kayit){



		if ( ISLEM == 1 ){

			var tabname = document.title
			if ( kayit == 1 )	tabname = document.title.replace(document.title,"[★]:._Ø: "+tabname)
			else 				tabname = document.title.replace(document.title,"★ "+tabname)
			document.title = tabname

		}
		else
		{

			var tabname = document.title
			tabname = document.title.replace("★ ","[★]:.-Ø: ")
			document.title = tabname

		}



	}

	////// Günün Sunucusu Kısmı /////////

	function AramaKutusuEkle(){

		

		var alanElement = document.createElement("div")
		alanElement.classList.add('ustbaslik-alan-arama');
		element = document.getElementById("page-header")
		if ( element != null ){
			element.appendChild(alanElement)


			var googlesearch = document.createElement("div");
			googlesearch.innerHTML = "<form id = 'uzantiaramasi' class='forumMenuItem form-wrapper cf '><input id='Aranan' class='yazi aramakutusu' type='text' placeholder='Google Desteğiyle Ara' name=q size=31 maxlength='255' autofocus='autofocus' required><button id='Aramabtnnu' class='yazi aramabutonu'>ARA</button></form>"
			
			if ( localStorage.getItem("AramaCinsi") == "csdarama" ){
				googlesearch.style.visibility = "hidden";
			}

			alanElement.appendChild(googlesearch);


			var orjinalseachbox = document.getElementById("search-box")
			if ( orjinalseachbox != null ){
				alanElement.appendChild(orjinalseachbox);
				orjinalseachbox.classList.add('orjinal-arama-kutusu');
			}

		}

	}
	function GununSunucusuEkle(){

			var Sunucu = localStorage.getItem('KayitGununSunucusu')

			if ( Sunucu != null ){

				var alanElement = document.createElement("div")
				alanElement.classList.add('gununsunucusu-hader');
				element = document.getElementById("page-header")

				if ( element != null ){
					element.appendChild(alanElement)


					var Tema = "b_350_20_223242_223242_ffffff_223242"

					var tema_buton = document.createElement("img");
					tema_buton.src = "https://cache.gametracker.com/server_info/"+Sunucu+":27015/"+Tema+".png"
					tema_buton.classList.add('gununsunucusu');

					alanElement.appendChild(tema_buton);


				}

			}

	}
	function GununSunucusuKontrol(){

		var FatihGonderiler = []
		var tumGonderiler = document.getElementsByClassName("has-profile") , y
		for ( var i = 0; i < tumGonderiler.length; i++	) {

			y = tumGonderiler[i].getElementsByClassName("postprofile")[0].getElementsByTagName("a")[0]
			

			if ( y == "https://forum.csduragi.com/fatih-ejderya-u8309/" ){
				FatihGonderiler[FatihGonderiler.length] = i
			}

			
		}

		for ( var i = 0 ; i < FatihGonderiler.length ; i++ ){


			y = tumGonderiler[FatihGonderiler[i]].getElementsByClassName("signature")[0].getElementsByTagName("span")			

				for ( var j = 0; j < y.length; j++	) {
					if ( y[j] ){

						if ( y[j].style.color.indexOf("rgb(252, 252, 252)") != -1 )
						{
							var ImzaYazi , satir_sonu_index
							y[j].innerHTML = y[j].innerHTML + "<br>"


							while ( y[j].innerHTML.indexOf("<br>") != -1 ){

								satir_sonu_index = y[j].innerHTML.indexOf("<br>")
								ImzaYazi = y[j].innerHTML.substring(0,satir_sonu_index)
								Imzada_Yazi(ImzaYazi,i)
								y[j].innerHTML = y[j].innerHTML.substring(satir_sonu_index+5)


							}

						}


						if ( y[j].style.color.indexOf("rgb(83, 70, 122)") != -1 )
						{
								EklentiAnlatimBildirimCheckBoxEkle(y[j])
						}

						
					}
				}
			

		}
	}

	function EklentiAnlatimBildirimCheckBoxEkle(EklenecekYer){

		EklenecekYer.innerHTML = ""

        var checkbox = document.createElement('input'); 
        checkbox.type = "checkbox"
        var label = document.createElement('label'); 
        label.appendChild(document.createTextNode(' Yeni Eğitim Videolarından Haberdar Olmak İçin İşaretleyin'))
        checkbox.classList.add('bildirimbutonu');
        EklenecekYer.appendChild(checkbox); 
        EklenecekYer.appendChild(label); 

        if ( localStorage.getItem('EgitimBildirimKaydi') == "1" || localStorage.getItem("EgitimBildirimKaydi") == null ){
        	checkbox.checked = true
        }
       	else
       	{
       		checkbox.checked = false
       	}
        

        checkbox.addEventListener('change', function (event) {
		            EgitimVideolariBildirimiCheckBoxBasildi(checkbox,label,event.target.checked);
		});

	}
	function EgitimVideolariBildirimiCheckBoxBasildi(checkbox,aciklama_kismi,durum){

		
		if (event.target.checked) {
		    localStorage.setItem('EgitimBildirimKaydi',"1")

		}
		else
		{
		    localStorage.setItem('EgitimBildirimKaydi',"0")
		}

		var checkboxlar = document.getElementsByClassName("bildirimbutonu")
		for ( var i = 0 ; i < checkboxlar.length ; i++ ){

			if ( localStorage.getItem('EgitimBildirimKaydi') == "1" ){
        		checkboxlar[i].checked = true
        	}
       		else
       		{
    	   		checkboxlar[i].checked = false
	       	}


		}
	}

	function Imzada_Yazi(Yazi,katman){

		if ( !Yazi == "" ){
			var Veri

			if ( katman == 0 ){
				Veri = YaziSonunuCek("Günün Sunucusu : ",Yazi)
				if ( Yazi.indexOf("Günün Sunucusu : ") != -1 ){
					if ( Veri != "yok" || Veri.length > 3 )
							localStorage.setItem('KayitGununSunucusu',Veri)
					else 	localStorage.removeItem('KayitGununSunucusu')
				}
			}

			Veri = YaziSonunuCek("Video Bildirimi : ",Yazi)
			if ( Yazi.indexOf("Video Bildirimi : ") != -1 ){
				if ( Veri != null && Veri.length > 3 && localStorage.getItem('SonAnlatimVideosu') != Veri ){
					localStorage.setItem('SonAnlatimVideosu',Veri)
					localStorage.setItem('VideoGoruldu',"0")
				}
			}

		}

	}

	function YaziSonunuCek(On_Tag,Yazi){
		var Baslangic = Yazi.indexOf(On_Tag)
		if ( Baslangic != -1 ){
			Yazi = Yazi.substring(Baslangic+On_Tag.length)
			return Yazi
		}
		return null
	}

	function DiscordDavetPenceresi(){

		document.getElementById("phpbb_announcement").remove()

		var a = document.createElement("div")
		a.innerHTML = '<iframe id="discorframe" class="discord" src="https://discord.com/widget?id=484834642801721355&theme=dark" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>'
		document.getElementById("phpbb").appendChild(a)

		setDiscordSize()
		
	}


	window.addEventListener("resize", setDiscordSize, false);
	function setDiscordSize() {


	    var sayfagenisligi = Math.round(window.innerWidth)
	    var govdegenisligi = document.getElementsByClassName("page-header")[0].clientWidth
	    var discordframe = document.getElementById("discorframe")
	    var govdeyuzdesi = ( 100 * govdegenisligi ) / sayfagenisligi
	    
	    var newpixcel = ( 97.5 - govdeyuzdesi ) / 2
	    if ( newpixcel < 10 )
	    	discordframe.style.display = "none"
	    else discordframe.style.display = "block"

	    discordframe.width =  newpixcel+"%"

	}

}
