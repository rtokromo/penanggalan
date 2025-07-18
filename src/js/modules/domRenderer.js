import { 
    SPECIALE_JAVAANSE_DAGEN,
    PASARAN_DATA
} from '../config/constants';

export function renderCalendar(calendarData) {
    updateMonthDisplay(calendarData);
    renderCalendarHeader();
    renderCalendarDays(calendarData);
}

function updateMonthDisplay({ maandNaam, javaansJaar }) {
    document.getElementById('huidigeMaandWeergave').textContent = maandNaam;
    document.getElementById('javaansJaar').textContent = `Koto: ${javaansJaar}`;
}

function renderCalendarHeader() {
    const header = document.getElementById('kalenderHeader');
    header.innerHTML = `
        <div>DOT (5)</div>
        <div>GOT (4)</div>
        <div>GOS (3)</div>
        <div>JOS (7)</div>
        <div>JOH (8)</div>
        <div>HOD (6)</div>
        <div>WOR (9)</div>
    `;
}

function renderCalendarDays({ dagen, eersteDagVanDeWeek }) {
    const kalenderElement = document.getElementById('kalender');
    kalenderElement.innerHTML = '';
    
    // Voeg lege vakjes toe voor de eerste week
    for (let i = 0; i < eersteDagVanDeWeek; i++) {
        kalenderElement.appendChild(createEmptyDayElement());
    }
    
    // Voeg dagen toe
    dagen.forEach(dag => {
        kalenderElement.appendChild(createDayElement(dag));
    });
}

function createEmptyDayElement() {
    const element = document.createElement('div');
    element.className = 'dag';
    return element;
}

function createDayElement(dagData) {
    const {
        javaanseDag,
        gregoriaanseDatum,
        pasaran,
        dagVanDeWeek,
        isHuidigeDag,
        isSpecialeJavaanseDag
    } = dagData;
    
    const verkortJaar = gregoriaanseDatum.getFullYear() % 100;
    const dagElement = document.createElement('div');
    
    dagElement.className = `dag ${isHuidigeDag ? 'huidige-dag' : ''}`;
    dagElement.innerHTML = `
        <strong class="${isSpecialeJavaanseDag ? 'speciale-dag' : ''}">${javaanseDag}</strong><br>
        <span class="normale-pasaran">${pasaran.verkort}</span> (${pasaran.waarde})<br>
        ${gregoriaanseDatum.getDate()}-${gregoriaanseDatum.getMonth() + 1}-${verkortJaar}
    `;
    
    return dagElement;
}
