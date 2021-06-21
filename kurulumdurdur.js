
save_cookie("asama","0")
delete_cookie("telmodel")
alert("• Kurulum İşlemleri Durduruldu.")

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

window.location.href = '/'