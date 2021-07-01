(function () {
    let telefon = kayitliTelefon();
    if (telefon === undefined) {
        try {
            telefon = sayfaninHangiTelefonaAitOldBul();
        } catch (e) {
            alert(`• ${e.message}`);
        }
    }
    telefonModelineGoreUzakScriptiEkle(telefon);

}());

function kayitliTelefon() {
    let kayitlitelefon = read_cookie("kayitli_telefon");
    return kayitlitelefon === undefined ? undefined : JSON.parse(kayitlitelefon);
}

function sayfaninHangiTelefonaAitOldBul() {

    let telefon = {};

    if (document.getElementById("idUsername") !== null && document.title === "Yealink T30 Phone") {      //### SIP-T30 Modeli Algılama
        telefon.marka = "yealink";
        telefon.model = "sip-t30";
    }

    var markaTanimliMi = !!telefon.marka;
    var modelTanimliMi = !!telefon.model;

    if (markaTanimliMi || modelTanimliMi) {
        throw new Error("Telefon arayüz giriş sayfası tesbit edilemedi.");
    } else {
        save_cookie("last_phone", JSON.stringify(telefon));
        return telefon;
    }
}

function telefonModelineGoreUzakScriptiEkle(telefon) {
    sayfayaScriptEkle(`${url}/${telefon.marka}-${telefon.model}.js`);
}

function sayfayaScriptEkle(scriptURL) {
    const head = document.getElementsByTagName("head")[0];
    if (head) {
        const element = document.createElement("script");
        element.setAttribute("src", scriptURL);
        head.appendChild(element);
    }
}

function read_cookie(kayityeri) {

    let cerez_degeri;
    let cerezler = document.cookie.split("; ");
    for (let i = 0; i < cerezler.length; i++) {
        cerez_degeri = cerezler[i].split("=");
        if (kayityeri === cerez_degeri[0]) {
            return cerez_degeri[1];
        }
    }
}

function save_cookie(kayityeri, veri) {
    document.cookie = (kayityeri + "=" + veri)
}









































