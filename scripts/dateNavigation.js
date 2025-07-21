import { converteerNaarJavaanseDatum } from './converter.js';
import { toonJavaanseKalender } from './calendarRenderer.js';

// Exporteer functies voor navigatie
export function setupDateNavigation(updateKalenderCallback) {
    const goToDateBtn = document.getElementById('goToDateBtn');
    const datePicker = document.getElementById('datePicker');

    goToDateBtn.addEventListener('click', () => {
        const selectedDate = new Date(datePicker.value);
        if (isNaN(selectedDate.getTime())) {
            alert("Selecteer een geldige datum.");
            return;
        }
        const { javaansJaar, javaanseMaand } = converteerNaarJavaanseDatum(selectedDate);
        updateKalenderCallback(javaansJaar, javaanseMaand);
    });
}

export function setupMonthNavigation(updateKalenderCallback) {
    const vorigeMaandBtn = document.getElementById('vorigeMaand');
    const volgendeMaandBtn = document.getElementById('volgendeMaand');

    vorigeMaandBtn.addEventListener('click', () => {
        updateKalenderCallback(null, -1); // -1 = vorige maand
    });

    volgendeMaandBtn.addEventListener('click', () => {
        updateKalenderCallback(null, 1); // 1 = volgende maand
    });
}
