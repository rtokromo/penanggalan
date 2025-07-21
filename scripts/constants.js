// Referentiedatums
export const referentieDatum1 = new Date(2023, 7, 5); // 5 augustus 2023 (Javaans jaar 6449, dag 1)
export const referentieDatum2 = new Date(1975, 11, 20); // 20 december 1975 (Javaans jaar 6400, dag 1)
export const referentieJavaansJaar1 = 6449;
export const referentieJavaansJaar2 = 6400;

// Lengte van een Javaans jaar in dagen
export const javaansJaarLengte = 355;

// Javaanse maanden en hun lengte
export const javaanseMaanden = [
    ["Koso Soworo (1)", 36],
    ["Pobo (2)", 35],
    ["Mono (3)", 36],
    ["Somo (4)", 35],
    ["Poko (5)", 36],
    ["Bowoko (6)", 35],
    ["Pono (7)", 36],
    ["Woko (8)", 35],
    ["Sono (9)", 36],
    ["Noto (10)", 35]
];

// Pasaran data
export const pasaranData = [
    { naam: "Kliwon", waarde: 8, verkort: "Kl" },
    { naam: "Legi", waarde: 5, verkort: "Lg" },
    { naam: "Pahing", waarde: 9, verkort: "Pa" },
    { naam: "Pon", waarde: 7, verkort: "Po" },
    { naam: "Wage", waarde: 4, verkort: "Wg" }
];

// Speciale Javaanse dagen per maand
export const specialeJavaanseDagenPerMaand = {
    1: [1, 11, 21, 31],
    2: [2, 12, 22, 32],
    3: [3, 13, 23, 33],
    4: [4, 14, 24, 34],
    5: [5, 15, 25, 35],
    6: [6, 16, 26],
    7: [7, 17, 27],
    8: [8, 18, 28],
    9: [9, 19, 29],
    10: [10, 20, 30]
};

// Speciale dagen en Pasaran-combinaties per maand
export const specialeDagenPasaranPerMaand = {
    // ... (zelfde als in de originele code)
};

// Alle speciale dagen (gecombineerd)
export const alleSpecialeDagen = {
    // ... (zelfde als in de originele code)
};

// Speciale dagen gebaseerd op maand, dag van de week en Pasaran
export const specialeDagenCombinaties = [
    { maand: 7, dagVanDeWeek: "Vr", pasaran: "Kl", naam: "SRENGAT GUSTI" }
];
