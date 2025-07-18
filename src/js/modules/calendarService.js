import { JAVANESE_MONTHS } from '../config/constants';
import { convertToJavaneseDate, convertToGregorianDate } from './dateConverter';

export function getCalendarMonth(javaneseYear, javaneseMonth) {
    const daysInMonth = JAVANESE_MONTHS[javaneseMonth - 1][1];
    const startDate = convertToGregorianDate(javaneseYear, javaneseMonth, 1);
    
    return {
        monthName: JAVANESE_MONTHS[javaneseMonth - 1][0],
        days: Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const date = convertToGregorianDate(javaneseYear, javaneseMonth, day);
            return {
                day,
                date,
                isCurrent: isCurrentDate(date),
                isSpecial: isSpecialDay(javaneseMonth, day)
            };
        }),
        firstDayOfWeek: startDate.getDay()
    };
}
