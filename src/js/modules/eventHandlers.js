import { converteerNaarJavaanseDatum } from './dateConverter';

export function setupEventHandlers(calendarApp) {
    document.getElementById('vorigeMaand').addEventListener('click', () => {
        calendarApp.vorigeMaand();
    });
    
    document.getElementById('volgendeMaand').addEventListener('click', () => {
        calendarApp.volgendeMaand();
    });
    
    document.getElementById('goToDateBtn').addEventListener('click', () => {
        const datePicker = document.getElementById('datePicker');
        const selectedDate = new Date(datePicker.value);
        
        if (isNaN(selectedDate.getTime())) {
            alert("Selecteer een geldige datum.");
            return;
        }
        
        const { javaansJaar, javaanseMaand } = converteerNaarJavaanseDatum(selectedDate);
        calendarApp.gaNaarMaand(javaansJaar, javaanseMaand);
    });
}
