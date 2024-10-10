const translations = {
    de: {
        title: "Mastermind in der Konsole",
        headingGameDescription: "Spielbeschreibung",
        headingHowToPlay: "So kannst du es spielen",
        headingLanguage: "Sprache",
        paragraphGameDescription1: "Das Ziel des Spiels ist es, den Code, den der Computer zu Beginn des Spiels zufällig generiert, zu knacken. Dazu hat man sieben Versuche.",
        paragraphGameDescription2: "Der Code besteht aus vier Kugeln, welche jeweils eine von sechs möglichen Farben haben. Beim Knacken des Codes helfen rote und weiße Stecknadeln.",
        paragraphGameDescription3: "Eine rote Stecknadel bedeutet, dass eine Farbe korrekt und an der korrekten Position ist. Eine weiße Stecknadel bedeutet, dass eine Farbe korrekt, aber nicht an der korrekten Position ist.",
        paragraphHowToPlay: "Klone das GitHub-Repository. Öffne in dem Ordner ein Terminal und gib <code>python mastermind.py</code> ein. Nun startet das Spiel. Gib <code>/help</code> ein, um eine umfassende Spielanleitung angezeigt zu bekommen. Nach dem Lesen der Spielanleitung bist du spielbereit!",
        toRepository: "Zum Repository",
        backToHomepage: "Zurück zur Startseite"
    },
    en: {
        title: "Mastermind in the Console",
        headingGameDescription: "Game Description",
        headingHowToPlay: "How to Play",
        headingLanguage: "Language",
        paragraphGameDescription1: "The goal of the game is to crack the code that the computer randomly generates at the start of the game. You have seven attempts to do so.",
        paragraphGameDescription2: "The code consists of four balls, each of which has one of six possible colours. Red and white pins help you crack the code.",
        paragraphGameDescription3: "A red pin means that a colour is correct and in the correct position. A white pin means that a colour is correct but not in the correct position.",
        paragraphHowToPlay: "Clone the GitHub repository. Open a terminal in that folder and type <code>python mastermind.py</code>. The game will start. Type <code>/help</code> to display a comprehensive game guide. After reading the guide, you’ll be ready to play!",
        toRepository: "To the repository",
        backToHomepage: "Back to the homepage"
    },
    eo: {
        title: "Mastermind en la terminalo",
        headingGameDescription: "Ludpriskribo",
        headingHowToPlay: "Kiel ludi",
        headingLanguage: "Lingvo",
        paragraphGameDescription1: "La celo de la ludo estas fendi la kodon, kiun generas la komputilo hazarde ĉe la komenco de la ludo. Por tio, oni havas sep provojn.",
        paragraphGameDescription2: "La kodo konsistas el kvar globoj, kiuj havas po unu el ses eblaj koloroj. Al la fendado de la kodo helpas ruĝaj kaj blankaj ŝtiftoj.",
        paragraphGameDescription3: "Ruĝa ŝtifto signifas, ke koloro estas ĝusta kaj en la ĝusta pozicio. Blanka ŝtifto signifas, ke koloro estas ĝusta, sed ne en la ĝusta pozicio.",
        paragraphHowToPlay: "Klonu la GitHub-deponejon. Malfermu terminalon en tiu dosierujo kaj enigu <code>python mastermind.py</code>. Nun la ludo komenciĝos. Enigu <code>/help</code> por ricevi ampleksajn ludinstrukciojn. Post legado de la ludinstrukcioj, vi estos preta ludi!",
        toRepository: "Al la deponejo",
        backToHomepage: "Reen al la hejmpaĝo"
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
    document.title = translation.title;
    document.getElementById("title").textContent = translation.title;
    document.getElementById("heading-game-description").textContent = translation.headingGameDescription;
    document.getElementById("heading-how-to-play").textContent = translation.headingHowToPlay;
    document.getElementById("heading-language").textContent = translation.headingLanguage;
    document.getElementById("paragraph-game-description-1").textContent = translation.paragraphGameDescription1;
    document.getElementById("paragraph-game-description-2").textContent = translation.paragraphGameDescription2;
    document.getElementById("paragraph-game-description-3").textContent = translation.paragraphGameDescription3;
    document.getElementById("paragraph-how-to-play").innerHTML = translation.paragraphHowToPlay;
    document.getElementById("paragraph-to-repository").textContent = translation.toRepository;
    document.getElementById("button-back-to-homepage").textContent = translation.backToHomepage;
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