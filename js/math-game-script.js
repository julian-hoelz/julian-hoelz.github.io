const translations = {
    de: {
        title: "Rechenspiel für den Aktionstag",
        imageGallery: "Bildergalerie",
        imageGalleryHint: "Klicke die Bilder an, um sie groß und mit Beschreibungen angezeigt zu bekommen.",
        explanation: "Erklärung",
        explanationParagraph: "Am 13.11.2024 war Aktionstag im bbw Südhessen, meinem Ausbildungsbetrieb. Um denjenigen Schülern, die sich für die Informatik interessieren, einen Einblick in die Programmierung zu geben, hatte ich im Vorfeld dieses Rechenspiel programmiert. Das Ziel des Spiels ist es, in möglichst kurzer Zeit zehn Rechenaufgaben zu lösen. Wer besonders schnell ist, kann sich einen Platz auf der Bestenliste sichern.",
        language: "Sprache",
        toRepository: "Zum Repository",
        backToHomepage: "Zurück zur Startseite"
    },
    en: {
        title: "Maths Game for the Action Day",
        imageGallery: "Image Gallery",
        imageGalleryHint: "Click on the images to view them large and with descriptions.",
        explanation: "Explanation",
        explanationParagraph: "On 13th November 2024, there was an action day at bbw Südhessen, my training company. To give students interested in computer science a glimpse into programming, I programmed this maths game in advance. The goal of the game is to solve ten arithmetic problems in the shortest time possible. Those who are particularly fast can secure a spot on the leaderboard.",
        language: "Language",
        toRepository: "To the repository",
        backToHomepage: "Back to the homepage"
    },
    eo: {
        title: "Kalkulada ludo por la agotago",
        imageGallery: "Bildgalerio",
        imageGalleryHint: "Alklaku la bildojn por vidi ilin grandaj kaj kun priskriboj.",
        explanation: "Klarigo",
        explanationParagraph: "La 13-an de Novembro 2024 estis agotago en bbw Südhessen, mia staĝofirmao. Por doni al la lernejanoj, kiuj interesiĝas pri la informadiko, enrigardon en la programadon, mi antaŭe programis ĉi tiun kalkuladan ludon. La celo de la ludo estas solvi dek kalkulproblemojn en kiel eble malplej da tempo. Kiu estas aparte rapida, povas sekurigi lokon en la rangaro.",
        language: "Lingvo",
        toRepository: "Al la deponejo",
        backToHomepage: "Reen al la hejmpaĝo"
    }
}

const languageToButtonIndex = {
    "de": 0,
    "en": 1,
    "eo": 2
}

function openLightbox() {
    document.getElementById("lightbox").style.display = "block";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function changeSlide(n) {
    showSlides(currentSlideIndex += n);
}

function currentSlide(n) {
    showSlides(currentSlideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slides");
    if (n >= slides.length) {
        currentSlideIndex = 0;
    }
    if (n < 0) {
        currentSlideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[currentSlideIndex].style.display = "block";
}

function backToHomepage() {
    let href = "index.html";
    const urlParams = new URLSearchParams(location.search);
    const language = urlParams.get("lang");
    if (language)
        href += "?lang=" + language;
    location.href = href;
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
    document.getElementById("heading-image-gallery").textContent = translation.imageGallery;
    document.getElementById("paragraph-image-gallery-hint").textContent = translation.imageGalleryHint;
    document.getElementById("heading-explanation").textContent = translation.explanation;
    document.getElementById("paragraph-explanation").textContent = translation.explanationParagraph;
    document.getElementById("heading-language").textContent = translation.language;
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

let currentSlideIndex = 1;
showSlides(currentSlideIndex);
setLanguageOnLoad();