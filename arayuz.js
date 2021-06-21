
arayuzislemleri()
function arayuzislemleri(){

    function delete_cookie(kayityeri){ 

        document.cookie = kayityeri+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    function save_cookie(kayityeri,veri){
        document.cookie = (kayityeri+"="+veri)
    }
    function read_cookie(kayityeri){

    var cerez_degeri
    var cerezler = document.cookie.split("; ");
        for (var i = 0; i < cerezler.length; i++) {
            cerez_degeri = cerezler[i].split("=");
            if(kayityeri == cerez_degeri[0]) {
                return cerez_degeri[1]
            } 
        }
    }

    var telefonArsivi=[
      {
        marka:'Yealink',
        model:'SIP-T30',
        loginElement:['idUsername', 'idPassword'],
        girisBilgisi:{user:'admin', pass:'admin'},
        label:"NutYapı-TTCloud",
        displayname:"{dahilino}",
        registername:"{dahilino}",
        username:"{dahilino}",
        password:"tecmonyttcloud{dahilino}",
        serverhost:"ttsip.tecmony.com",
        baslangicfonksiyonu:function(){islemler_sip_t30()}
      }
    ]
    //##########################################################################################


    var telefon , kayitli_telefon_modeli = read_cookie("telmodel")


    if ( kayitli_telefon_modeli != undefined ){

        telefon = Goruntulenen_Sayfanin_Telefon_Modelini_Bul(kayitli_telefon_modeli)

    }
    else
    {
        save_cookie("asama","0")
        telefon = Goruntulenen_Sayfanin_Telefon_Modelini_Bul();
        if ( telefon == undefined )
        {
            alert("• Telefon arayüz giriş sayfası tesbit edilemedi.")
            return
        }
        else
        {
            save_cookie("telmodel",telefon.model)
        }
    }
    
    telefon.baslangicfonksiyonu(); // Telefonun Başlangıç Fonksiyonunu Çalıştır

    function Goruntulenen_Sayfanin_Telefon_Modelini_Bul(model = undefined){

        if ( model != undefined )
            return ModelBilgileriniBul(model)

        if ( document.getElementById("idUsername") !== null && document.title == "Yealink T30 Phone"){      //### SIP-T30 Modeli Algılama
            return ModelBilgileriniBul("SIP-T30")
        }

    }

    function ModelBilgileriniBul(modelno){
        var sonuc = telefonArsivi.find(function(telefon){
            return telefon.model === modelno;
        });
        return sonuc;
    }



   //  ################################# SIP-T30 İşlemleri
    function islemler_sip_t30(){

        save_cookie("asama",(Number(read_cookie("asama"))+1))

        switch(Number(read_cookie("asama"))){
        //switch(3){
            case 1:
            {
                document.getElementById("idUsername").value = "admin"
                document.getElementById("idPassword").value = "admin"
                document.getElementById("idConfirm").click()
            }
            break;

            case 2:
            {
                document.getElementById("Account").getElementsByClassName("mouseHand")[0].click()
            }
            break
            
            case 3:
            {
                var DahiliNo = prompt("Dahili Numaranızı Giriniz")
                document.getElementsByName("AccountEnable")[0].selectedIndex = "1"
                document.getElementsByName("AccountLabel")[0].value = (telefon.label)
                document.getElementsByName("AccountDisplayName")[0].value = telefon.displayname.replace("{dahilino}",DahiliNo)
                document.getElementsByName("AccountRegisterName")[0].value = telefon.registername.replace("{dahilino}",DahiliNo)
                document.getElementsByName("AccountUserName")[0].value = telefon.username.replace("{dahilino}",DahiliNo)
                document.getElementsByName("AccountPassword")[0].value = telefon.password.replace("{dahilino}",DahiliNo)
                document.getElementsByName("server1")[0].value = telefon.serverhost
                document.getElementById("btn_confirm1").click()
                islemleri_bitir(DahiliNo)
            }
            break;

            

        }
    }

    function islemleri_bitir(DahiliNum){
        alert("• "+DahiliNum+" Dahili Numaralı Telefon Kurulumu Tamamlandı")
        save_cookie("asama","0")
        delete_cookie("telmodel")
        window.location.href = '/'
    }
    //  #################################




}