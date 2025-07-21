import {
    javaanseMaanden,
    pasaranData,
    specialeJavaanseDagenPerMaand,
    specialeDagenPasaranPerMaand,
    alleSpecialeDagen,
    specialeDagenCombinaties
} from './constants.js';
import { berekenGregoriaanseDatum, bepaalPasaran } from './converter.js';

// Toon de Javaanse kalender
export function toonJavaanseKalender(huidigJavaansJaar, huidigeJavaanseMaand) {
    const kalenderElement = document.getElementById('kalender');
    const javaansJaarElement = document.getElementById('javaansJaar');
    const huidigeMaandWeergave = document.getElementById('huidigeMaandWeergave');
    kalenderElement.innerHTML = "";

    javaansJaarElement.textContent = `Koto: ${huidigJavaansJaar}`;
    huidigeMaandWeergave.textContent = `${javaanseMaanden[huidigeJavaanseMaand - 1][0]}`;

    markeerKalenderHeader(huidigeJavaanseMaand);

    const dagenInMaand = javaanseMaanden[huidigeJavaanseMaand - 1][1];
    const startDatum = berekenGregoriaanseDatum(huidigJavaansJaar, huidigeJavaanseMaand, 1);
    const eersteDagVanDeWeek = startDatum.getDay();

    for (let i = 0; i < eersteDagVanDeWeek; i++) {
        const leegElement = document.createElement('div');
        leegElement.className = 'dag';
        kalenderElement.appendChild(leegElement);
    }

    const huidigeDatum = new Date();
    const specialeDagen = [];

    for (let dag = 1; dag <= dagenInMaand; dag++) {
        const gregoriaanseDatum = berekenGregoriaanseDatum(huidigJavaansJaar, huidigeJavaanseMaand, dag);
        const pasaran = bepaalPasaran(gregoriaanseDatum);
        const pasaranInfo = pasaranData.find(p => p.naam === pasaran);
        const verkortePasaran = pasaranInfo?.verkort || pasaran;
        const dagVanDeWeek = bepaalDagVanDeWeek(gregoriaanseDatum);

        const isHuidigeDag = gregoriaanseDatum.toDateString() === huidigeDatum.toDateString();
        const isSpecialeJavaanseDagVoorMaand = isSpecialeJavaanseDag(huidigeJavaanseMaand, dag);
        const isSpecialeDagPasaranVoorMaand = isSpecialeDagPasaran(huidigeJavaanseMaand, dagVanDeWeek, verkortePasaran);
        const specialeDag = isSpecialeDag(huidigeJavaanseMaand, dag);
        const specialeCombinatie = specialeDagenCombinaties.find(
            c => c.maand === huidigeJavaanseMaand && c.dagVanDeWeek === dagVanDeWeek && c.pasaran === verkortePasaran
        );

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
            <span class="${isSpecialeDagPasaranVoorMaand ? 'speciale-pasaran' : 'normale-pasaran'}">${verkortePasaran}</span> (${pasaranInfo?.waarde || 0})<br>
            ${gregoriaanseDatum.getDate()}-${gregoriaanseDatum.getMonth() + 1}-${verkortJaar(gregoriaanseDatum)}
        `;
        kalenderElement.appendChild(dagElement);
    }

    toonSpecialeDagenFooter(specialeDagen);
}

// Hulpfunties (lokaal voor deze module)
function bepaalDagVanDeWeek(datum) {
    const dagen = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
    return dagen[datum.getDay()];
}

function verkortJaar(datum) {
    return (datum.getFullYear() % 100).toString().padStart(2, '0');
}

function isSpecialeJavaanseDag(maand, dag) {
    return specialeJavaanseDagenPerMaand[maand]?.includes(dag) || false;
}

function isSpecialeDagPasaran(maand, dagVanDeWeek, pasaran) {
    const specialeDagen = specialeDagenPasaranPerMaand[maand] || [];
    return specialeDagen.some(d => d.dag === dagVanDeWeek && d.pasaran === pasaran);
}

function isSpecialeDag(maand, dag) {
    return alleSpecialeDagen[maand]?.[dag] || null;
}

function markeerKalenderHeader(maand) {
    const kalenderHeader = document.getElementById('kalenderHeader');
    const headerDagen = kalenderHeader.children;

    for (let i = 0; i < headerDagen.length; i++) {
        headerDagen[i].classList.remove('speciale-header');
    }

    const specialeDagen = specialeDagenPasaranPerMaand[maand] || [];
    specialeDagen.forEach((specialeDag) => {
        const dagIndex = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"].indexOf(specialeDag.dag);
        if (dagIndex !== -1) {
            headerDagen[dagIndex].classList.add('speciale-header');
        }
    });
}

function toonSpecialeDagenFooter(specialeDagen) {
    const specialeDagenLijst = document.getElementById('specialeDagenLijst');
    specialeDagenLijst.innerHTML = "";

    specialeDagen.forEach((specialeDag) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${specialeDag.naam}: ${specialeDag.gregoriaanseDatum}`;
        specialeDagenLijst.appendChild(listItem);
    });
}
