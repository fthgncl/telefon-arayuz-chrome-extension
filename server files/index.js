const serverURL = "https://aaf5a57897f3.ngrok.io";

(function () {

    if (!kurulumAsamasindaMi())                 // Kurulum aşamasında değilse dur.
        return;

    if (!sayfaIlkDefaMiYuklendi())              // Sayfa ilk defa yüklenmediyse dur.
        return;

    sayfayaScriptEkle(`${serverURL}/phoneExtension.js`);    // Telefon model tesbiti yapması için sayfaya sunucudan script ekle.

}());



function kurulumAsamasindaMi() {
    return read_cookie("startinstall") === "1";
}
function sayfaIlkDefaMiYuklendi() {
    const kontrolElementi = document.getElementById("control_element_") == null;
    if (!kontrolElementi) {
        return false
    }

    const element = document.createElement("a");
    element.setAttribute("id", "control_element_");
    document.getElementsByTagName("body")[0].appendChild(element)
    return true

        // Sayfada bir nesne oluşturduk. Eğer bu script sayfa yenilenmeden önce tekrar çalışmaya
        // kalkarsa control_element_ idsi olan bir nesnenin varlığını kontrol edip daha önceden
        // çalışıp çalışmadığını algılayacak.

}
function read_cookie(kayityeri) {

    let cerez_degeri
    let cerezler = document.cookie.split("; ");
    for (let i = 0; i < cerezler.length; i++) {
        cerez_degeri = cerezler[i].split("=");
        if (kayityeri === cerez_degeri[0]) {
            return cerez_degeri[1];
        }
    }
}
function sayfayaScriptEkle(scriptURL) {
    const head = document.getElementsByTagName("head")[0];
    if (head) {
        const element = document.createElement("script");
        element.setAttribute("src", scriptURL);
        head.appendChild(element);
    }
}


