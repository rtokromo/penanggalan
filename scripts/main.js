import { converteerNaarJavaanseDatum } from './converter.js';
import { toonJavaanseKalender } from './calendarRenderer.js';
import { setupDateNavigation, setupMonthNavigation } from './dateNavigation.js';

// Huidige Javaanse jaar en maand (state)
let huidigJavaansJaar = 6449;
let huidigeJavaanseMaand = 1;

/**
 * Callback voor het bijwerken van de kalender.
 * @param {number|null} javaansJaarDelta - Nieuw Javaans jaar (bij "Go To Date") of null (bij maand-navigatie).
 * @param {number} maandDelta - Delta (-1 = vorige maand, 1 = volgende maand) of nieuwe maand (bij "Go To Date").
 */
function updateKalender(javaansJaarDelta, maandDelta) {
    if (javaansJaarDelta !== null) {
        // "Go To Date": direct naar specifiek jaar/maand gaan
        huidigJavaansJaar = javaansJaarDelta;
        huidigeJavaanseMaand = maandDelta;
    } else {
        // Maand-navigatie (← → knoppen)
        if (maandDelta === -1 && huidigeJavaanseMaand === 1) {
            // Vorige maand (vanaf maand 1 naar maand 10)
            huidigeJavaanseMaand = 10;
            huidigJavaansJaar--;
        } else if (maandDelta === 1 && huidigeJavaanseMaand === 10) {
            // Volgende maand (vanaf maand 10 naar maand 1)
            huidigeJavaanseMaand = 1;
            huidigJavaansJaar++;
        } else {
            // Normale maandwisseling
            huidigeJavaanseMaand += maandDelta;
        }
    }
    // Render de kalender met de nieuwe state
    toonJavaanseKalender(huidigJavaansJaar, huidigeJavaanseMaand);
}

// Initialisatie bij het laden van de pagina
document.addEventListener('DOMContentLoaded', () => {
    // Stel de kalender in op de huidige datum
    const huidigeDatum = new Date();
    const { javaansJaar, javaanseMaand } = converteerNaarJavaanseDatum(huidigeDatum);
    huidigJavaansJaar = javaansJaar;
    huidigeJavaanseMaand = javaanseMaand;
    toonJavaanseKalender(huidigJavaansJaar, huidigeJavaanseMaand);

    // Stel navigatie-eventlisteners in
    setupDateNavigation(updateKalender);    // "Go To Date"-knop
    setupMonthNavigation(updateKalender);   // ← → maandknoppen
});
