
(function () {
    alert(read_cookie("kayitli_telefon"));
    let telefon = kayitliTelefonuBul();
    if (telefon === undefined) {
        try {
            telefon = sayfaninHangiTelefonaAitOldBul();
        } catch (e) {
            alert(`• ${e.message}`);
        }
    }

    kullaniciGirisIslemleri(telefon);

}());

function kullaniciGirisIslemleri(telefon){

    let kullaniciadi = prompt('Kullanıcı Adı');
    let parola = prompt('Parola');

    fetch('https://f8167acda9f7.ngrok.io/api/v1/login', {
        method: 'POST',
        body: JSON.stringify({
            email: kullaniciadi,
            password: parola,
            expireInSeconds: 600,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => {
            if (200 !== response.status) {
                alert("Giriş Başarısız")
            }
        })
        .then(data => {
            telefonModelineGoreUzakScriptiEkle(telefon)
            //data.access_token
        })
        .catch(err => {
                console.log(err);
            }
        );
}


function kayitliTelefonuBul() {
    const kayitlitelefon = read_cookie("kayitli_telefon");
    if ( kayitlitelefon )
        return JSON.parse(kayitlitelefon)

    return undefined;
}
function sayfaninHangiTelefonaAitOldBul() {

    let telefon = {};

    if (document.getElementById("idUsername") !== null && document.title === "Yealink T30 Phone") {      //### SIP-T30 Modeli Algılama
        telefon.marka = "yealink";
        telefon.model = "sip-t30";
    }


    const markaTanimliMi = !telefon.marka;
    const modelTanimliMi = !telefon.model;

    if (markaTanimliMi || modelTanimliMi) {
        throw new Error("Telefon arayüz giriş sayfası tesbit edilemedi.");
    } else {
        save_cookie("kayitli_telefon", JSON.stringify(telefon));
        return telefon;
    }
}
function telefonModelineGoreUzakScriptiEkle(telefon) {
    sayfayaScriptEkle(`${serverURL}/${telefon.marka}-${telefon.model}.js`);
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
    const cerezler = document.cookie.split("; ");
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


































