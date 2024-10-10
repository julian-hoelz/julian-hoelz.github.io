const translations = {
    de: {
        title: "Primfaktorzerlegungsrechner",
        description: "Beschreibung",
        descriptionParagraph: "Mein Primfaktorzerlegungsrechner ist eine einfache Webanwendung, mit der du die Primfaktoren einer Zahl berechnen kannst. Jede natürliche Zahl größer als 1 hat eine einzigartige Multimenge an Primfaktoren, die du mit diesem Rechner finden kannst. Du kannst den Rechner über den unten stehenden Link ausprobieren.",
        link: "Link",
        linkParagraph: "Hier geht’s zu meinem",
        languages: "Sprachen",
        toRepository: "Zum Repository",
        backToHomepage: "Zurück zur Startseite"
    },
    en: {
        title: "Prime Factorisation Calculator",
        description: "Description",
        descriptionParagraph: "My prime factorisation calculator is a simple web application that allows you to calculate the prime factors of a number. Every natural number greater than 1 has a unique multiset of prime factors, which you can find using this calculator. You can try the calculator via the link below.",
        link: "Link",
        linkParagraph: "Here is the link to my",
        languages: "Languages",
        toRepository: "To the repository",
        backToHomepage: "Back to the homepage"
    },
    eo: {
        title: "Primfaktoriga kalkulilo",
        description: "Priskribo",
        descriptionParagraph: "Mia primfaktoriga kalkulilo estas simpla retaplikaĵo, per kiu vi povas kalkuli la primfaktorojn de nombro. Ĉiu natura nombro pli granda ol 1 havas unikan multaron da primfaktoroj, kiujn vi povas trovi per ĉi tiu kalkulilo. Vi povas elprovi la kalkulilon per la suba ligilo.",
        link: "Ligilo",
        linkParagraph: "Jen la ligilo al mia",
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
    const linkParagraph = `${translation.linkParagraph} <a href="pf-calculator/index.html" target="_blank">${translation.title}<a>.`;
    document.title = translation.title;
    document.getElementById("title").textContent = translation.title;
    document.getElementById("heading-description").textContent = translation.description;
    document.getElementById("paragraph-description").textContent = translation.descriptionParagraph;
    document.getElementById("heading-link").textContent = translation.link;
    document.getElementById("paragraph-link").innerHTML = linkParagraph;
    document.getElementById("heading-language").textContent = translation.languages;
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