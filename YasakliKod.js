window.onload = function () {
	var textArea = document.getElementById("myTextarea");
    
    textArea.onkeyup = function(evt)
    {
            evt = evt || window.event;

            if (evt.keyCode == 13) {
                YasaklıKodKontrol()
            }
    };

	
	var YasakliKodlar = [ 'rcon_password' , '_pw' , 'svc_director' , '"connect' , 'oyunyoneticisi' , '95.173' , 'oyunsunucum' , 'webdiyo' , 'webailesi' , '185.' , '46.20' , '85.153' , 'amx_exec' , 'socket' , 'ts3gir' , 'plugins.ini' , 'next_file' , 'LoadFileForMe' ]

	function YasaklıKodKontrol(){

		var textArea = document.getElementById("myTextarea")
		var Yazi = textArea.value.toLowerCase();
		Yazi = Yazi.split("<").join("<span><</span>")

    	textArea.style.display = 'none'

    	var StrSatirYazi = Yazi.split(/\n/)
    	var YeniYazi = ""

		for ( var i = 0 ; i < StrSatirYazi.length-1 ; i++ ){

			StrSatirYazi[i] = "<button id='button"+i+"' class='satirnumaralari' disabled>"+(i+1)+"</button> "+StrSatirYazi[i]+"<br>"

			for ( var j = 0 ; j < YasakliKodlar.length ; j++ ){
				YasakliKodlar[j].toLowerCase();
				StrSatirYazi[i] = StrSatirYazi[i].split(YasakliKodlar[j]).join("<span id='hata' class='highlight'>"+YasakliKodlar[j]+"</span>")
			}


			YeniYazi = YeniYazi+StrSatirYazi[i]
		}

		


		document.getElementById("myForm").innerHTML = YeniYazi

		var element = document.getElementById("hata");
		if ( element != null )
			element.scrollIntoView({behavior: 'auto',block: 'center',inline: 'center'});

	}


}