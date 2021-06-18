arayuzislemleri()
function arayuzislemleri(){

save_cookie("test","1234")
alert(document.cookie)
delete_cookie("test")
alert(document.cookie)

function delete_cookie(kayityeri){ 

    var cerez_degeri
    var yazi = (kayityeri+"="+read_cookie(kayityeri))

    var kayitparcalari = document.cookie.split("; "+yazi)
    if( kayitparcalari.length == 1 )
        kayitparcalari = document.cookie.split(yazi+"; ");

    yazi = ""
    for (var i = 0; i < kayitparcalari.length; i++) {
        yazi += kayitparcalari[i]
    }
    
    document.cookie = yazi
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
    baslangicfonksiyonu:function(){islemler_sip_t30()}
  }
]
//##########################################################################################


if ( read_cookie("asama") != "0"){ // Kurulum işlemleri devam ediyorken , düğmeye basıldığında kurulum işlemlerini durdurur.
    save_cookie("asama","0")
    alert("• Kurulum İşlemleri Durduruldu.")
    return
}







var telefon , asama = read_cookie("asama") , kayitli_telefon_modeli = read_cookie("telmodel")


if ( kayitli_telefon_modeli != undefined ){

    Goruntulenen_Sayfanin_Telefon_Modelini_Bul(kayitli_telefon_modeli)
}
else
{
    telefon = Goruntulenen_Sayfanin_Telefon_Modelini_Bul();
    if ( telefon == undefined )
    {
        alert("• Telefon arayüz giriş sayfası tesbit edilemedi.")
    }
    else
    {
        save_cookie("asama","1")
        save_cookie("telmodel",telefon.model)
        telefon.baslangicfonksiyonu(); // Telefonun Başlangıç Fonksiyonunu Çalıştır
    }
}

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


}
function islemler_sip_t30(){

    document.getElementById("idUsername").value = "admin"
    document.getElementById("idPassword").value = "admin"
    document.getElementById("idConfirm").click()

 }
//  #################################








}