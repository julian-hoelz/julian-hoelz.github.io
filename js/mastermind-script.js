const translations = {
    de: {
        title: "Mastermind in der Konsole",
        headingGameDescription: "Spielbeschreibung",
        headingHowToPlay: "So kannst du es spielen",
        headingLanguage: "Sprache",
        paragraphGameDescription1: "Das Ziel des Spiels ist es, den Code, den der Computer zu Beginn des Spiels zufällig generiert, zu knacken. Dazu hat man sieben Versuche.",
        paragraphGameDescription2: "Der Code besteht aus vier Kugeln, welche jeweils eine von sechs Farben haben. Beim Knacken des Codes helfen rote und weiße Stecknadeln.",
        paragraphGameDescription3: "Eine rote Stecknadel bedeutet, dass eine Farbe korrekt und an der korrekten Position ist. Eine weiße Stecknadel bedeutet, dass eine Farbe korrekt, aber nicht an der korrekten Position ist.",
        paragraphHowToPlay: "Klone das GitHub-Repository. Öffne in dem Ordner ein Terminal und gib <code>python mastermind.py</code> ein. Nun startet das Spiel. Gib <code>/hilfe</code> ein, um eine umfassende Spielanleitung angezeigt zu bekommen. Nach dem Lesen der Spielanleitung bist du spielbereit!",
        toRepositoryButton: "Zum Repository",
        backToHomepageButton: "Zurück zur Startseite"
    },
    en: {
        title: "Mastermind in the Console",
        headingGameDescription: "Game Description",
        headingHowToPlay: "How to Play",
        headingLanguage: "Language",
        paragraphGameDescription1: "Translation missing.",
        paragraphGameDescription2: "Translation missing.",
        paragraphGameDescription3: "Translation missing.",
        paragraphHowToPlay: "Translation missing.",
        toRepositoryButton: "To the repository",
        backToHomepageButton: "Back to the homepage"
    },
    eo: {
        title: "Mastermind en la terminalo",
        headingGameDescription: "Ludpriskribo",
        headingHowToPlay: "Kiel ludi",
        headingLanguage: "Lingvo",
        paragraphGameDescription1: "Mankas la traduko.",
        paragraphGameDescription2: "Mankas la traduko.",
        paragraphGameDescription3: "Mankas la traduko.",
        paragraphHowToPlay: "Mankas la traduko.",
        toRepositoryButton: "Al la deponejo",
        backToHomepageButton: "Reen al la hejmpaĝo"
    }
}

const languageToButtonIndex = {
    "de": 0,
    "en": 1,
    "eo": 2
}

function setLanguageOnLoad() {
    const urlParams = new URLSearchParams(location.search);
    let language = urlParams.get("lang");
    if (!language || !Object.keys(translations).find(key => key.includes(language))) {
        language = "de";
    }
    setLanguage(language, false);
    document.documentElement.lang = language;
}

function setLanguage(language, addLangToUrl) {
    const index = languageToButtonIndex[language];
    const langs = document.getElementsByClassName("language");
    for (const lang of langs) {
        lang.classList.remove("active");
    }
    langs[index].classList.add("active");
    applyLanguage(language);
    if (addLangToUrl) {
        addToUrl("lang", language);
    }
}

function applyLanguage(language) {
    const translation = translations[language];
    document.getElementById("title").textContent = translation.title;
    document.getElementById("heading-game-description").textContent = translation.headingGameDescription;
    document.getElementById("heading-how-to-play").textContent = translation.headingHowToPlay;
    document.getElementById("heading-language").textContent = translation.headingLanguage;
    document.getElementById("paragraph-game-description-1").textContent = translation.paragraphGameDescription1;
    document.getElementById("paragraph-game-description-2").textContent = translation.paragraphGameDescription2;
    document.getElementById("paragraph-game-description-3").textContent = translation.paragraphGameDescription3;
    document.getElementById("paragraph-how-to-play").innerHTML = translation.paragraphHowToPlay;
    // document.getElementById("button-to-repository").textContent = translation.toRepositoryButton;
    document.getElementById("button-back-to-homepage").textContent = translation.backToHomepageButton;
}

function addToUrl(key, value) {
    const currentUrl = new URL(location.href);
    currentUrl.searchParams.set(key, value);
    history.replaceState({}, "", currentUrl);
}

function backToHomepage() {
    let href = "index.html";
    const urlParams = new URLSearchParams(location.search);
    const language = urlParams.get("lang");
    if (language)
        href += "?lang=" + language;
    location.href = href;
}

setLanguageOnLoad();