import { converteerNaarJavaanseDatum } from './converter.js';
import { toonJavaanseKalender } from './calendarRenderer.js';

// Huidige Javaanse jaar en maand
let huidigJavaansJaar = 6449;
let huidigeJavaanseMaand = 1;

// Initialiseer de kalender
document.addEventListener('DOMContentLoaded', () => {
    const huidigeDatum = new Date();
    const { javaansJaar, javaanseMaand } = converteerNaarJavaanseDatum(huidigeDatum);
    huidigJavaansJaar = javaansJaar;
    huidigeJavaanseMaand = javaanseMaand;
    toonJavaanseKalender(huidigJavaansJaar, huidigeJavaanseMaand);
});

// Event handlers
document.getElementById('vorigeMaand').addEventListener('click', () => {
    if (huidigeJavaanseMaand > 1) {
        huidigeJavaanseMaand--;
    } else {
        huidigeJavaanseMaand = 10;
        huidigJavaansJaar--;
    }
    toonJavaanseKalender(huidigJavaansJaar, huidigeJavaanseMaand);
});

document.getElementById('volgendeMaand').addEventListener('click', () => {
    if (huidigeJavaanseMaand < 10) {
        huidigeJavaanseMaand++;
    } else {
        huidigeJavaanseMaand = 1;
        huidigJavaansJaar++;
    }
    toonJavaanseKalender(huidigJavaansJaar, huidigeJavaanseMaand);
});

document.getElementById('goToDateBtn').addEventListener('click', () => {
    const selectedDate = new Date(document.getElementById('datePicker').value);
    if (isNaN(selectedDate.getTime())) {
        alert("Selecteer een geldige datum.");
        return;
    }
    const { javaansJaar, javaanseMaand } = converteerNaarJavaanseDatum(selectedDate);
    huidigJavaansJaar = javaansJaar;
    huidigeJavaanseMaand = javaanseMaand;
    toonJavaanseKalender(huidigJavaansJaar, huidigeJavaanseMaand);
});
