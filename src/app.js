import { renderCalendar } from './modules/domRenderer';
import { getCalendarMonth } from './modules/calendarService';
import { setupEventHandlers } from './modules/eventHandlers';

class JavaneseCalendarApp {
    constructor() {
        this.state = {
            javaneseYear: 6449,
            javaneseMonth: 1
        };
    }
    
    init() {
        this.render();
        setupEventHandlers(this);
    }
    
    render() {
        const calendarData = getCalendarMonth(
            this.state.javaneseYear, 
            this.state.javaneseMonth
        );
        renderCalendar(calendarData);
    }
    
    nextMonth() {
        // Maand navigatie logica
        this.render();
    }
}

const app = new JavaneseCalendarApp();
app.init();
