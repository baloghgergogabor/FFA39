const API_URL = "4000/api";//PORT: 4000, ENDPOINT: /api;

// ── DOM elemek ────────────────────────────────────────────────────────────────

const fagyiKartyaTarolo    = document.getElementById("fagyiKartyaTarolo");
const fagyiLekerdezoGomb   = document.getElementById("fagyiLekerdezoGomb");
const fagyiNevKereso       = document.getElementById("fagyiNevKereso");
const tipusSzuro           = document.getElementById("tipusSzuro");
const elerhetosegSzuro     = document.getElementById("elerhetosegSzuro");
const rendezesValaszto     = document.getElementById("rendezesValaszto");
const fagyiMuveletUzenet   = document.getElementById("fagyiMuveletUzenet");
const statisztikaValaszto  = document.getElementById("statisztikaValaszto");
const statisztikaFejlecSor = document.getElementById("statisztikaFejlecSor");
const statisztikaTorzs     = document.getElementById("statisztikaTorzs");
const statisztikaUzenet    = document.getElementById("statisztikaUzenet");
const fagyiUrlap           = document.getElementById("fagyiUrlap");
const uzenet               = document.getElementById("uzenet");

let torlesAlattiId = null;

// ── Modal segéd ───────────────────────────────────────────────────────────────

function modalShow(id) {
    bootstrap.Modal.getOrCreateInstance(document.getElementById(id)).show();
}

function modalHide(id) {
    bootstrap.Modal.getOrCreateInstance(document.getElementById(id)).hide();
}

// ── Visszajelzés ──────────────────────────────────────────────────────────────

function uzenetMutat(cim, szoveg, tipus) {

    document.getElementById("visszajelzesCim").textContent = cim;

    const szovegElem = document.getElementById("visszajelzesUzenet");
    szovegElem.textContent = szoveg
    if (tipus == 'hiba') {
        szovegElem.classList.add("fw-semibold text-center text-danger");
    }
    else{
        szovegElem.classList.add("fw-semibold text-center text-success");
    }
    modalShow("visszajelzesModal");
}

// ── Típusok betöltése ─────────────────────────────────────────────────────────

function tipusokBetoltese(selectId) {
    const selectElem = document.getElementById(selectId);
    if (!selectElem) {
        return
    }
    fetch(API_URL + "/tipusok")
        .then(r => r.json())
        .then(adatok => {
            adatok.forEach(element => {
                const opcio = document.createElement("option");
                opcio.value = element.tipus_kod
                opcio.textContent = element.tipus_nev
                selectElem.appendChild(opcio);
            });
        })
        .catch(() => {
            if (fagyiMuveletUzenet) {
                fagyiMuveletUzenet.textContent = "Nem sikerült betölteni a típusokat"
                fagyiMuveletUzenet.classList.add('text-danger text-center mb-4');
            }
        })
} 

// ── Fagylalt kártya ───────────────────────────────────────────────────────────

function fagyiKartyaKeszites(fagyi) {

}

// ── Fagylaltok lekérdezése ────────────────────────────────────────────────────

function fagyikLekerdezese() {

}

// ── Szerkesztés modal ─────────────────────────────────────────────────────────

function szerkesztesModalMegnyit(gomb) {

}

document.getElementById("szerkesztesUrlap").addEventListener("submit", function(e) {
    e.preventDefault();

    // Lekérdezés

    //Szerkesztés
document.getElementById("torlesMegerosites").addEventListener("click", function() {
    const adat = {
        fagyiNev: document.getElementById("szerkesztesNev").value,
        fagyiTipus: document.getElementById("szerkesztesTipus").value,
        fagyiAr: document.getElementById("szerkesztesAr").value,
        fagyiLeiras: document.getElementById("szerkesztesLeiras").value,
        fagyiElerheto: document.getElementById("szerkesztesElerheto").value
    };
    fetch(API_URL + "fagylaltok/" + document.getElementById("szerkesztesId"),{
    method: "PUT",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(adat)
}).then(r => r.json())
.then(valasz => {
    modalHide('szerkesztesModal')
    uzenetMutat('Sikeres módosítás', valasz.uzenet, "siker")
})
.catch(() => {
    uzenetMutat('Hiba', "Hiba történt a módosítás során", "hiba")
})
});

});

// ── Törlés modal ──────────────────────────────────────────────────────────────

function torlesModalMegnyit(gomb) {

}


// ── Statisztika ───────────────────────────────────────────────────────────────

const statisztikaBeallitasok = {

};

function statisztikaLekerdezese() {

}

// ── Új fagyi mentése ──────────────────────────────────────────────────────────

function ujFagyiMentese(e) {
    e.preventDefault();

    const adat = {
        fagyiNev: document.getElementById("fagyiNev").value,
        fagyiTipus: document.getElementById("fagyiTipus").value,
        fagyiAr: document.getElementById("fagyiAr").value,
        fagyiLeiras: document.getElementById("fegyiLeiras").value,
        fagyiElerheto: document.getElementById("fagyiElerheto").value
    };

    fetch(API_URL + "/fagylaltok",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(adat)
        }
    )
        .then(r => r.json)
        .then(valasz => {
            uzenetMutat("Sikeres mentés", valasz.uzenet, "siker");
            fagyiUrlap.reset();
            fagyikLekerdezese();
        })
        .catch(() => {
            uzenetMutat("Hiba", "Hiba történt a metnés során", "hiba")
        })

}

// ── Indítás ───────────────────────────────────────────────────────────────────

if (fagyiLekerdezoGomb) {
    tipusokBetoltese("tipusSzuro");
    fagyiLekerdezoGomb.addEventListener("click", fagyikLekerdezese);
}

statisztikaValaszto.addEventListener("change", statisztikaLekerdezese);

if (fagyiUrlap) {
    tipusokBetoltese("fagyiTipus");
    fagyiUrlap.addEventListener("submit", ujFagyiMentese);
}
