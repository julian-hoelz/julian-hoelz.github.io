const translations = {
    de: {
        title: "Conways Spiel des Lebens",
        headingExplanation: "Erklärung",
        paragraphExplanation: "Conways Spiel des Lebens ist eigentlich kein Spiel, sondern ein zellulärer Automat. Es besteht aus einem Gitter, in dem es „lebende“ und „tote“ Zellen gibt. Die Anzahl der lebenden Nachbarzellen einer Zelle bestimmt, ob sie in der nächsten Generation leben wird. Die genauen Regeln kannst du auf <a href='https://de.wikipedia.org/wiki/Conways_Spiel_des_Lebens' target='_blank'>Wikipedia</a> nachlesen.",
        headingLink: "Link",
        gol: "Spiel des Lebens",
        paragraphLinkBeforeLink: "Hier geht’s zu meiner Implementation von Conways ",
        paragraphLinkAfterLink: ".",
        languages: "Sprachen",
        toRepository: "Zum Repository",
        backToHomepage: "Zurück zur Startseite"
    },
    en: {
        title: "Conway’s Game of Life",
        headingExplanation: "Explanation",
        paragraphExplanation: "Conway’s Game of Life is not actually a game, but a cellular automaton. It consists of a grid containing “living” and “dead” cells. The number of living neighbouring cells determines whether a given cell will be alive in the next generation. You can read the exact rules on <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' target='_blank'>Wikipedia</a>.",
        headingLink: "Link",
        gol: "Game of Life",
        paragraphLinkBeforeLink: "Here is the link to my implementation of Conway’s ",
        paragraphLinkAfterLink: ".",
        languages: "Languages",
        toRepository: "To the repository",
        backToHomepage: "Back to the homepage"
    },
    eo: {
        title: "La ludo de la vivo far Conway",
        headingExplanation: "Klarigo",
        paragraphExplanation: "La ludo de la vivo far Conway efektive ne estas ludo, sed ĉela aŭtomato. Ĝi konsistas el krado, en kiu estas “vivantaj” kaj “mortaj” ĉeloj. La nombro de vivantaj najbaraj ĉeloj de ĉelo determinas, ĉu ĝi vivos en la sekva generacio. La ekzaktajn regulojn vi povas trovi en <a href='https://eo.wikipedia.org/wiki/La_vivo_(ludo)' target='_blank'>Vikipedio</a>.",
        headingLink: "Ligilo",
        gol: "la ludo de la vivo",
        paragraphLinkBeforeLink: "Jen la ligilo al mia realigo de ",
        paragraphLinkAfterLink: " far Conway.",
        languages: "Lingvoj",
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
    const paragraphLink = `${translation.paragraphLinkBeforeLink}<a href='game-of-life/index.html' target='_blank'>${translation.gol}</a>${translation.paragraphLinkAfterLink}`;
    document.title = translation.title;
    document.getElementById("title").textContent = translation.title;
    document.getElementById("heading-explanation").textContent = translation.headingExplanation;
    document.getElementById("paragraph-explanation").innerHTML = translation.paragraphExplanation;
    document.getElementById("heading-link").textContent = translation.headingLink;
    document.getElementById("paragraph-link").innerHTML = paragraphLink;
    document.getElementById("heading-languages").textContent = translation.languages;
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