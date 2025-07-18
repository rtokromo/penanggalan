export function renderCalendar(calendarData) {
    const app = document.getElementById('app');
    app.innerHTML = `
        <header class="calendar-header"></header>
        <main class="calendar-grid"></main>
        <footer class="calendar-footer"></footer>
    `;
    
    renderHeader(calendarData);
    renderGrid(calendarData);
    renderFooter(calendarData);
}

function renderHeader({ monthName, javaneseYear }) {
    // Header render logica
}

function renderGrid({ days, firstDayOfWeek }) {
    // Kalender grid render logica
}
