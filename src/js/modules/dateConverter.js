import { 
    REFERENCE_DATES,
    REFERENCE_JAVAANSE_YEARS,
    JAVANESE_YEAR_LENGTH,
    JAVANESE_MONTHS
} from '../config/constants';

export function converteerNaarJavaanseDatum(gregoriaanseDatum) {
    let referentieDatum, referentieJavaansJaar;

    if (gregoriaanseDatum >= REFERENCE_DATES.MODERN) {
        referentieDatum = REFERENCE_DATES.MODERN;
        referentieJavaansJaar = REFERENCE_JAVAANSE_YEARS.MODERN;
    } else {
        referentieDatum = REFERENCE_DATES.CLASSIC;
        referentieJavaansJaar = REFERENCE_JAVAANSE_YEARS.CLASSIC;
    }

    const dagenVerschil = Math.floor((gregoriaanseDatum - referentieDatum) / (1000 * 60 * 60 * 24));
    let resterendeDagen = dagenVerschil;

    const javaansJaar = referentieJavaansJaar + Math.floor(resterendeDagen / JAVANESE_YEAR_LENGTH);
    resterendeDagen = resterendeDagen % JAVANESE_YEAR_LENGTH;

    if (resterendeDagen < 0) {
        javaansJaar--;
        resterendeDagen += JAVANESE_YEAR_LENGTH;
    }

    let javaanseMaand = 1;
    let javaanseDag = 1;
    
    for (let i = 0; i < JAVANESE_MONTHS.length; i++) {
        if (resterendeDagen < JAVANESE_MONTHS[i][1]) {
            javaanseMaand = i + 1;
            javaanseDag = resterendeDagen + 1;
            break;
        }
        resterendeDagen -= JAVANESE_MONTHS[i][1];
    }

    return { javaansJaar, javaanseMaand, javaanseDag };
}

export function berekenGregoriaanseDatum(javaansJaar, javaanseMaand, javaanseDag) {
    let referentieDatum, referentieJavaansJaar;

    if (javaansJaar >= REFERENCE_JAVAANSE_YEARS.MODERN) {
        referentieDatum = REFERENCE_DATES.MODERN;
        referentieJavaansJaar = REFERENCE_JAVAANSE_YEARS.MODERN;
    } else {
        referentieDatum = REFERENCE_DATES.CLASSIC;
        referentieJavaansJaar = REFERENCE_JAVAANSE_YEARS.CLASSIC;
    }

    const jarenVerschil = javaansJaar - referentieJavaansJaar;
    let dagenVerschil = jarenVerschil * JAVANESE_YEAR_LENGTH;

    for (let i = 0; i < javaanseMaand - 1; i++) {
        dagenVerschil += JAVANESE_MONTHS[i][1];
    }

    dagenVerschil += javaanseDag - 1;

    const gregoriaanseDatum = new Date(referentieDatum);
    gregoriaanseDatum.setDate(gregoriaanseDatum.getDate() + dagenVerschil);

    return gregoriaanseDatum;
}

export function bepaalPasaran(datum) {
    const referentieDatumPasaran = new Date(2000, 0, 1);
    const dagenVerschil = Math.floor((datum - referentieDatumPasaran) / (1000 * 60 * 60 * 24));
    const pasaranIndex = (dagenVerschil % 5 + 5) % 5;
    const pasaran = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
    return pasaran[pasaranIndex];
}
