// Referentiedatums
const referentieDatum1 = new Date(2023, 7, 5); // 5 augustus 2023 (Javaans jaar 6449, dag 1)
const referentieDatum2 = new Date(1975, 11, 20); // 20 december 1975 (Javaans jaar 6400, dag 1)
const referentieJavaansJaar1 = 6449;
const referentieJavaansJaar2 = 6400;

// Lengte van een Javaans jaar in dagen
const javaansJaarLengte = 355;

// Javaanse maanden en hun lengte
const javaanseMaanden = [
    ["Koso Soworo (1)", 36],
    ["Pobo (2)", 35],
    ["Mono (3)", 36],
    ["Somo (4)", 35],
    ["Poko (5)", 36],
    ["Bowoko (6)", 35],
    ["Pono (7)", 36],
    ["Woko (8)", 35],
    ["Sono (9)", 36],
    ["Noto (10)", 35]
];

// Pasaran data
const pasaranData = [
    { naam: "Kliwon", waarde: 8, verkort: "Kl" },
    { naam: "Legi", waarde: 5, verkort: "Lg" },
    { naam: "Pahing", waarde: 9, verkort: "Pa" },
    { naam: "Pon", waarde: 7, verkort: "Po" },
    { naam: "Wage", waarde: 4, verkort: "Wg" }
];

// Speciale Javaanse dagen per maand
const specialeJavaanseDagenPerMaand = {
    1: [1, 11, 21, 31],
    2: [2, 12, 22, 32],
    3: [3, 13, 23, 33],
    4: [4, 14, 24, 34],
    5: [5, 15, 25, 35],
    6: [6, 16, 26],
    7: [7, 17, 27],
    8: [8, 18, 28],
    9: [9, 19, 29],
    10: [10, 20, 30]
};

// Speciale dagen en Pasaran-combinaties per maand
const specialeDagenPasaranPerMaand = {
    1: [
        { dag: "Ma", pasaran: "Lg" },
        { dag: "Di", pasaran: "Wg" },
        { dag: "Do", pasaran: "Pa" },
        { dag: "Vr", pasaran: "Kl" }
    ],
    2: [
        { dag: "Di", pasaran: "Kl" },
        { dag: "Wo", pasaran: "Po" },
        { dag: "Vr", pasaran: "Lg" },
        { dag: "Za", pasaran: "Wg" }
    ],
    3: [
        { dag: "Zo", pasaran: "Po" },
        { dag: "Wo", pasaran: "Pa" },
        { dag: "Do", pasaran: "Wg" },
        { dag: "Za", pasaran: "Kl" }
    ],
    4: [
        { dag: "Zo", pasaran: "Wg" },
        { dag: "Ma", pasaran: "Pa" },
        { dag: "Do", pasaran: "Po" },
        { dag: "Vr", pasaran: "Lg" }
    ],
    5: [
        { dag: "Ma", pasaran: "Po" },
        { dag: "Di", pasaran: "Lg" },
        { dag: "Vr", pasaran: "Pa" },
        { dag: "Za", pasaran: "Pa" }
    ],
    6: [
        { dag: "Zo", pasaran: "Wg" },
        { dag: "Wo", pasaran: "Kl" },
        { dag: "Za", pasaran: "Lg" }
    ],
    7: [
        { dag: "Zo", pasaran: "Wg" },
        { dag: "Ma", pasaran: "Pa" },
        { dag: "Do", pasaran: "Po" }
    ],
    8: [
        { dag: "Ma", pasaran: "Pa" },
        { dag: "Di", pasaran: "Kl" },
        { dag: "Vr", pasaran: "Lg" }
    ],
    9: [
        { dag: "Di", pasaran: "Kl" },
        { dag: "Wo", pasaran: "Po" },
        { dag: "Za", pasaran: "Wg" }
    ],
    10: [
        { dag: "Zo", pasaran: "Pa" },
        { dag: "Wo", pasaran: "Po" },
        { dag: "Do", pasaran: "Lg" }
    ]
};

// Alle speciale dagen (gecombineerd)
const alleSpecialeDagen = {
    1: { 1: "HOSORO", [javaanseMaanden[0][1]]: "PANGENEP" },
    4: { 8: "PANGAPES" },
    5: { 15: "PANJEPI" },
    7: { 21: "PROLOJO MODJO" },
    8: { 7: "PAMUKAS", 12: "PAMUKAS II", 16: "KAHURIPAN" }
};

// Speciale dagen gebaseerd op maand, dag van de week en Pasaran
const specialeDagenCombinaties = [
    { maand: 7, dagVanDeWeek: "Vr", pasaran: "Kl", naam: "SRENGAT GUSTI" }
];

// Huidige Javaanse jaar en maand
let huidigJavaansJaar = 6449;
let huidigeJavaanseMaand = 1;

// DOM-elementen
const vorigeMaandBtn = document.getElementById('vorigeMaand');
const volgendeMaandBtn = document.getElementById('volgendeMaand');
const goToDateBtn = document.getElementById('goToDateBtn');
const datePicker = document.getElementById('datePicker');

// Event listeners
vorigeMaandBtn.addEventListener('click', vorigeMaand);
volgendeMaandBtn.addEventListener('click', volgendeMaand);
goToDateBtn.addEventListener('click', goToDate);

// Functie om het Gregoriaanse jaar te verkorten naar twee cijfers
function verkortJaar(datum) {
    const jaar = datum.getFullYear();
    return (jaar % 100).toString().padStart(2, '0');
}

// Functie om de Javaanse datum te berekenen op basis van Gregoriaanse datum
function converteerNaarJavaanseDatum(gregoriaanseDatum) {
    let referentieDatum, referentieJavaansJaar;

    // Bepaal welke referentiedatum het dichtst bij de geselecteerde datum ligt
    if (gregoriaanseDatum >= referentieDatum1) {
        referentieDatum = referentieDatum1;
        referentieJavaansJaar = referentieJavaansJaar1;
    } else {
        referentieDatum = referentieDatum2;
        referentieJavaansJaar = referentieJavaansJaar2;
    }

    const dagenVerschil = Math.floor((gregoriaanseDatum - referentieDatum) / (1000 * 60 * 60 * 24));
    let resterendeDagen = dagenVerschil;

    // Bepaal het Javaanse jaar
    const javaansJaar = referentieJavaansJaar + Math.floor(resterendeDagen / javaansJaarLengte);
    resterendeDagen = resterendeDagen % javaansJaarLengte;

    // Als resterendeDagen negatief is, corrigeer dan het Javaanse jaar en de resterende dagen
    if (resterendeDagen < 0) {
        javaansJaar--;
        resterendeDagen += javaansJaarLengte;
    }

    // Bepaal de Javaanse maand en dag
    let javaanseMaand = 1;
    let javaanseDag = 1;
    for (let i = 0; i < javaanseMaanden.length; i++) {
        if (resterendeDagen < javaanseMaanden[i][1]) {
            javaanseMaand = i + 1;
            javaanseDag = resterendeDagen + 1;
            break;
        }
        resterendeDagen -= javaanseMaanden[i][1];
    }

    return { javaansJaar, javaanseMaand, javaanseDag };
}

// Functie om de Gregoriaanse datum te berekenen op basis van Javaanse datum
function berekenGregoriaanseDatum(javaansJaar, javaanseMaand, javaanseDag) {
    let referentieDatum, referentieJavaansJaar;

    // Bepaal welke referentiedatum het dichtst bij het Javaanse jaar ligt
    if (javaansJaar >= referentieJavaansJaar1) {
        referentieDatum = referentieDatum1;
        referentieJavaansJaar = referentieJavaansJaar1;
    } else {
        referentieDatum = referentieDatum2;
        referentieJavaansJaar = referentieJavaansJaar2;
    }

    const jarenVerschil = javaansJaar - referentieJavaansJaar;
    let dagenVerschil = jarenVerschil * javaansJaarLengte;

    // Voeg de dagen van de voorgaande maanden toe
    for (let i = 0; i < javaanseMaand - 1; i++) {
        dagenVerschil += javaanseMaanden[i][1];
    }

    // Voeg de dagen van de huidige maand toe
    dagenVerschil += javaanseDag - 1;

    // Bereken de Gregoriaanse datum
    const gregoriaanseDatum = new Date(referentieDatum);
    gregoriaanseDatum.setDate(gregoriaanseDatum.getDate() + dagenVerschil);

    return gregoriaanseDatum;
}

// Functie om de dag van de week te bepalen
function bepaalDagVanDeWeek(datum) {
    const dagen = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
    return dagen[datum.getDay()];
}

// Functie om te controleren of een Javaanse dag speciaal is
function isSpecialeJavaanseDag(maand, dag) {
    return specialeJavaanseDagenPerMaand[maand]?.includes(dag) || false;
}

// Functie om te controleren of een dag en Pasaran-combinatie speciaal is
function isSpecialeDagPasaran(maand, dagVanDeWeek, pasaran) {
    const specialeDagen = specialeDagenPasaranPerMaand[maand] || [];
    return specialeDagen.some(
        (specialeDag) => specialeDag.dag === dagVanDeWeek && specialeDag.pasaran === pasaran
    );
}

// Functie om te controleren of een dag een speciale dag is
function isSpecialeDag(maand, dag) {
    return alleSpecialeDagen[maand]?.[dag] || null;
}

// Functie om de kalenderheader te markeren
function markeerKalenderHeader(maand) {
    const kalenderHeader = document.getElementById('kalenderHeader');
    const headerDagen = kalenderHeader.children;

    // Reset alle header-dagen
    for (let i = 0; i < headerDagen.length; i++) {
        headerDagen[i].classList.remove('speciale-header');
    }

    // Markeer de speciale header-dagen
    const specialeDagen = specialeDagenPasaranPerMaand[maand] || [];
    specialeDagen.forEach((specialeDag) => {
        const dagIndex = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"].indexOf(specialeDag.dag);
        if (dagIndex !== -1) {
            headerDagen[dagIndex].classList.add('speciale-header');
        }
    });
}

// Functie om de speciale dagen in de footer weer te geven
function toonSpecialeDagenFooter(specialeDagen) {
    const specialeDagenLijst = document.getElementById('specialeDagenLijst');
    specialeDagenLijst.innerHTML = "";

    specialeDagen.forEach((specialeDag) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${specialeDag.naam}: ${specialeDag.gregoriaanseDatum}`;
        specialeDagenLijst.appendChild(listItem);
    });
}

// Functie om de Javaanse kalender weer te geven
function toonJavaanseKalender() {
    const kalenderElement = document.getElementById('kalender');
    const javaansJaarElement = document.getElementById('javaansJaar');
    const huidigeMaandWeergave = document.getElementById('huidigeMaandWeergave');
    kalenderElement.innerHTML = "";

    // Toon het Javaanse jaartal bovenaan
    javaansJaarElement.textContent = `Koto: ${huidigJavaansJaar}`;

    // Toon de huidige Javaanse maand
    huidigeMaandWeergave.textContent = `${javaanseMaanden[huidigeJavaanseMaand - 1][0]}`;

    // Markeer de kalenderheader
    markeerKalenderHeader(huidigeJavaanseMaand);

    // Bepaal het aantal dagen in de Javaanse maand
    const dagenInMaand = javaanseMaanden[huidigeJavaanseMaand - 1][1];

    // Bepaal de Gregoriaanse startdatum van de Javaanse maand
    const startDatum = berekenGregoriaanseDatum(huidigJavaansJaar, huidigeJavaanseMaand, 1);

    // Bepaal de dag van de week van de eerste dag van de Javaanse maand
    const eersteDagVanDeWeek = startDatum.getDay();

    // Voeg lege vakjes toe voor de dagen vóór de eerste dag van de maand
    for (let i = 0; i < eersteDagVanDeWeek; i++) {
        const leegElement = document.createElement('div');
        leegElement.className = 'dag';
        kalenderElement.appendChild(leegElement);
    }

    // Huidige Gregoriaanse datum
    const huidigeDatum = new Date();
    const huidigeDag = huidigeDatum.getDate();
    const huidigeMaand = huidigeDatum.getMonth() + 1;
    const huidigJaar = huidigeDatum.getFullYear();

    // Lijst om speciale dagen op te slaan
    const specialeDagen = [];

    // Voeg de dagen van de Javaanse maand toe
    for (let dag = 1; dag <= dagenInMaand; dag++) {
        const gregoriaanseDatum = berekenGregoriaanseDatum(huidigJavaansJaar, huidigeJavaanseMaand, dag);
        const pasaran = bepaalPasaran(gregoriaanseDatum);
        const pasaranInfo = pasaranData.find(p => p.naam === pasaran);
        const pasaranWaarde = pasaranInfo?.waarde || 0;
        const verkortePasaran = pasaranInfo?.verkort || pasaran;
        const verkortGregoriaansJaar = verkortJaar(gregoriaanseDatum);
        const dagVanDeWeek = bepaalDagVanDeWeek(gregoriaanseDatum);

        // Controleer of dit de huidige dag is
        const isHuidigeDag =
            gregoriaanseDatum.getDate() === huidigeDag &&
            gregoriaanseDatum.getMonth() + 1 === huidigeMaand &&
            gregoriaanseDatum.getFullYear() === huidigJaar;

        // Controleer of dit een speciale Javaanse dag is
        const isSpecialeJavaanseDagVoorMaand = isSpecialeJavaanseDag(huidigeJavaanseMaand, dag);

        // Controleer of dit een speciale dag en Pasaran-combinatie is
        const isSpecialeDagPasaranVoorMaand = isSpecialeDagPasaran(huidigeJavaanseMaand, dagVanDeWeek, verkortePasaran);

        // Controleer of dit een speciale dag is
        const specialeDag = isSpecialeDag(huidigeJavaanseMaand, dag);

        // Controleer of dit een speciale combinatie is (maand, dag van de week, Pasaran)
        const specialeCombinatie = specialeDagenCombinaties.find(
            (combinatie) =>
                combinatie.maand === huidigeJavaanseMaand &&
                combinatie.dagVanDeWeek === dagVanDeWeek &&
                combinatie.pasaran === verkortePasaran
        );

        // Als het een speciale dag is, voeg deze toe aan de lijst
        if (specialeDag || specialeCombinatie) {
            specialeDagen.push({
                naam: specialeDag || specialeCombinatie.naam,
                gregoriaanseDatum: `${gregoriaanseDatum.getDate()}-${gregoriaanseDatum.getMonth() + 1}-${gregoriaanseDatum.getFullYear()}`
            });
        }

        const dagElement = document.createElement('div');
        dagElement.className = `dag ${isHuidigeDag ? 'huidige-dag' : ''} ${specialeDag || specialeCombinatie ? 'speciale-dag-geel' : ''}`;
        dagElement.innerHTML = `
            <strong class="${isSpecialeJavaanseDagVoorMaand ? 'speciale-dag' : ''}">${dag}</strong><br>
            <span class="${isSpecialeDagPasaranVoorMaand ? 'speciale-pasaran' : 'normale-pasaran'}">${verkortePasaran}</span> (${pasaranWaarde})<br>
            ${gregoriaanseDatum.getDate()}-${gregoriaanseDatum.getMonth() + 1}-${verkortGregoriaansJaar}
        `;
        kalenderElement.appendChild(dagElement);
    }

    // Toon de speciale dagen in de footer
    toonSpecialeDagenFooter(specialeDagen);
}

// Functie om de Pasaran te bepalen
function bepaalPasaran(datum) {
    const referentieDatumPasaran = new Date(2000, 0, 1);
    const dagenVerschil = Math.floor((datum - referentieDatumPasaran) / (1000 * 60 * 60 * 24));
    const pasaranIndex = (dagenVerschil % 5 + 5) % 5;
    const pasaran = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
    return pasaran[pasaranIndex];
}

// Functie om naar de volgende maand te gaan
function volgendeMaand() {
    if (huidigeJavaanseMaand < 10) {
        huidigeJavaanseMaand++;
    } else {
        huidigeJavaanseMaand = 1;
        huidigJavaansJaar++;
    }
    toonJavaanseKalender();
}

// Functie om naar de vorige maand te gaan
function vorigeMaand() {
    if (huidigeJavaanseMaand > 1) {
        huidigeJavaanseMaand--;
    } else {
        huidigeJavaanseMaand = 10;
        huidigJavaansJaar--;
    }
    toonJavaanseKalender();
}

// Functie om naar een specifieke datum te gaan
function goToDate() {
    const selectedDate = new Date(datePicker.value);

    if (isNaN(selectedDate.getTime())) {
        alert("Selecteer een geldige datum.");
        return;
    }

    const { javaansJaar, javaanseMaand } = converteerNaarJavaanseDatum(selectedDate);
    huidigJavaansJaar = javaansJaar;
    huidigeJavaanseMaand = javaanseMaand;
    toonJavaanseKalender();
}

// Initialiseer de kalender bij het laden van de pagina
document.addEventListener('DOMContentLoaded', () => {
    const huidigeDatum = new Date();
    const { javaansJaar, javaanseMaand } = converteerNaarJavaanseDatum(huidigeDatum);
    huidigJavaansJaar = javaansJaar;
    huidigeJavaanseMaand = javaanseMaand;
    toonJavaanseKalender();
});
