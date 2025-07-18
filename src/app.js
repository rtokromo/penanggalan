import { getCalendarData } from './modules/calendarService';
import { renderCalendar } from './modules/domRenderer';
import { setupEventHandlers } from './modules/eventHandlers';

class JavaneseCalendar {
    constructor() {
        this.state = {
            javaansJaar: 6449,
            javaanseMaand: 1
        };
    }
    
    init() {
        this.toonHuidigeMaand();
        setupEventHandlers(this);
    }
    
    toonHuidigeMaand() {
        const calendarData = getCalendarData(this.state.javaansJaar, this.state.javaanseMaand);
        renderCalendar(calendarData);
    }
    
    volgendeMaand() {
        if (this.state.javaanseMaand < 10) {
            this.state.javaanseMaand++;
        } else {
            this.state.javaanseMaand = 1;
            this.state.javaansJaar++;
        }
        this.toonHuidigeMaand();
    }
    
    vorigeMaand() {
        if (this.state.javaanseMaand > 1) {
            this.state.javaanseMaand--;
        } else {
            this.state.javaanseMaand = 10;
            this.state.javaansJaar--;
        }
        this.toonHuidigeMaand();
    }
    
    gaNaarMaand(javaansJaar, javaanseMaand) {
        this.state.javaansJaar = javaansJaar;
        this.state.javaanseMaand = javaanseMaand;
        this.toonHuidigeMaand();
    }
}

// Initialiseer de applicatie
document.addEventListener('DOMContentLoaded', () => {
    const calendar = new JavaneseCalendar();
    calendar.init();
});
