
save_cookie("sayfayuklendi","1")

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
