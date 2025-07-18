import { 
    JAVANESE_MONTHS,
    SPECIALE_JAVAANSE_DAGEN,
    PASARAN_DATA
} from '../config/constants';
import { berekenGregoriaanseDatum, bepaalPasaran } from './dateConverter';

export function getCalendarData(javaansJaar, javaanseMaand) {
    const dagenInMaand = JAVANESE_MONTHS[javaanseMaand - 1][1];
    const startDatum = berekenGregoriaanseDatum(javaansJaar, javaanseMaand, 1);
    
    const specialeDagen = [];
    const dagen = [];
    
    for (let dag = 1; dag <= dagenInMaand; dag++) {
        const gregoriaanseDatum = berekenGregoriaanseDatum(javaansJaar, javaanseMaand, dag);
        const pasaran = bepaalPasaran(gregoriaanseDatum);
        const pasaranInfo = PASARAN_DATA.find(p => p.naam === pasaran);
        
        const dagData = {
            javaanseDag: dag,
            gregoriaanseDatum,
            pasaran: pasaranInfo,
            dagVanDeWeek: bepaalDagVanDeWeek(gregoriaanseDatum),
            isHuidigeDag: isCurrentDate(gregoriaanseDatum),
            isSpecialeJavaanseDag: SPECIALE_JAVAANSE_DAGEN[javaanseMaand]?.includes(dag) || false
        };
        
        dagen.push(dagData);
    }
    
    return {
        javaansJaar,
        javaanseMaand,
        maandNaam: JAVANESE_MONTHS[javaanseMaand - 1][0],
        dagen,
        eersteDagVanDeWeek: startDatum.getDay(),
        specialeDagen
    };
}

function bepaalDagVanDeWeek(datum) {
    const dagen = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
    return dagen[datum.getDay()];
}

function isCurrentDate(datum) {
    const vandaag = new Date();
    return (
        datum.getDate() === vandaag.getDate() &&
        datum.getMonth() === vandaag.getMonth() &&
        datum.getFullYear() === vandaag.getFullYear()
    );
}
