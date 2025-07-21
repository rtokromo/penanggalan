import {
    referentieDatum1, referentieDatum2,
    referentieJavaansJaar1, referentieJavaansJaar2,
    javaansJaarLengte, javaanseMaanden
} from './constants.js';

// Converteer Gregoriaanse datum naar Javaanse datum
export function converteerNaarJavaanseDatum(gregoriaanseDatum) {
    let referentieDatum, referentieJavaansJaar;

    if (gregoriaanseDatum >= referentieDatum1) {
        referentieDatum = referentieDatum1;
        referentieJavaansJaar = referentieJavaansJaar1;
    } else {
        referentieDatum = referentieDatum2;
        referentieJavaansJaar = referentieJavaansJaar2;
    }

    const dagenVerschil = Math.floor((gregoriaanseDatum - referentieDatum) / (1000 * 60 * 60 * 24));
    let resterendeDagen = dagenVerschil;

    const javaansJaar = referentieJavaansJaar + Math.floor(resterendeDagen / javaansJaarLengte);
    resterendeDagen = resterendeDagen % javaansJaarLengte;

    if (resterendeDagen < 0) {
        javaansJaar--;
        resterendeDagen += javaansJaarLengte;
    }

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

// Converteer Javaanse datum naar Gregoriaanse datum
export function berekenGregoriaanseDatum(javaansJaar, javaanseMaand, javaanseDag) {
    let referentieDatum, referentieJavaansJaar;

    if (javaansJaar >= referentieJavaansJaar1) {
        referentieDatum = referentieDatum1;
        referentieJavaansJaar = referentieJavaansJaar1;
    } else {
        referentieDatum = referentieDatum2;
        referentieJavaansJaar = referentieJavaansJaar2;
    }

    const jarenVerschil = javaansJaar - referentieJavaansJaar;
    let dagenVerschil = jarenVerschil * javaansJaarLengte;

    for (let i = 0; i < javaanseMaand - 1; i++) {
        dagenVerschil += javaanseMaanden[i][1];
    }

    dagenVerschil += javaanseDag - 1;

    const gregoriaanseDatum = new Date(referentieDatum);
    gregoriaanseDatum.setDate(gregoriaanseDatum.getDate() + dagenVerschil);

    return gregoriaanseDatum;
}

// Bepaal de Pasaran voor een datum
export function bepaalPasaran(datum) {
    const referentieDatumPasaran = new Date(2000, 0, 1);
    const dagenVerschil = Math.floor((datum - referentieDatumPasaran) / (1000 * 60 * 60 * 24));
    const pasaranIndex = (dagenVerschil % 5 + 5) % 5;
    const pasaran = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
    return pasaran[pasaranIndex];
}
