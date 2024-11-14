const translations = {
    de: {
        title: "Rechenspiel für den Aktionstag",
        imageGallery: "Bildergalerie",
        imageGalleryHint: "Klicke die Bilder an, um sie groß und mit Beschreibungen angezeigt zu bekommen.",
        explanation: "Erklärung",
        explanationParagraph: "Am 13.11.2024 war Aktionstag im bbw Südhessen, meinem Ausbildungsbetrieb. Um denjenigen Schülern, die sich für die Informatik interessieren, einen Einblick in die Programmierung zu geben, hatte ich im Vorfeld dieses Rechenspiel programmiert. Das Ziel des Spiels ist es, in möglichst kurzer Zeit zehn Rechenaufgaben zu lösen. Wer besonders schnell ist, kann sich einen Platz auf der Bestenliste sichern.",
        language: "Sprache",
        toRepository: "Zum Repository",
        backToHomepage: "Zurück zur Startseite",
        description1: "Hier zeige ich einer Gruppe von Schülern und einer Lehrerin den Titelbildschirm meines Rechenspiels.",
        description2: "Auf diesem Foto erkläre ich der Gruppe, wie sie mein Spiel spielen können. Man muss zehn Rechenaufgaben lösen und jeweils die richtige Antwortmöglichkeit auswählen.",
        description3: "Hier habe ich zu Demonstrationszwecken fünf Aufgaben gelöst. Gleich lasse ich die Gruppe ans Smartboard, damit sie die restlichen Aufgaben lösen können.",
        description4: "Hier lösen zwei Schüler die restlichen Aufgaben des Durchgangs. Oben rechts sieht man die Stoppuhr ticken.",
        description5: "Auf diesem Foto haben die Schüler sich mit 10/10 richtigen Antworten in 50,82 Sekunden Platz 6 auf der Bestenliste gesichtert. Der eine gibt gerade sein Namenskürzel ein, das später in der Bestenliste angezeigt werden wird.",
        description6: "Hier zeige ich der Gruppe ihre Platzierung auf der Bestenliste."
    },
    en: {
        title: "Maths Game for the Action Day",
        imageGallery: "Image Gallery",
        imageGalleryHint: "Click on the images to view them large and with descriptions.",
        explanation: "Explanation",
        explanationParagraph: "On 13th November 2024, there was an action day at bbw Südhessen, my training company. To give students interested in computer science a glimpse into programming, I programmed this maths game in advance. The goal of the game is to solve ten arithmetic problems in the shortest time possible. Those who are particularly fast can secure a spot on the leaderboard.",
        language: "Language",
        toRepository: "To the repository",
        backToHomepage: "Back to the homepage",
        description1: "Here, I am showing a group of students and a teacher the title screen of my maths game.",
        description2: "In this photo, I am explaining to the group how to play my game. The participants must solve ten arithmetic problems and select the correct answer for each one.",
        description3: "Here, I have solved five problems as a demonstration. Shortly, I will let the group use the smartboard to solve the remaining problems.",
        description4: "Here, two students are solving the remaining problems of the round. In the top right corner, you can see the stopwatch ticking.",
        description5: "In this photo, the students secured 6th place on the leaderboard with 10/10 correct answers in 50.82 seconds. One of them is currently entering their initials, which will later be displayed on the leaderboard.",
        description6: "Here, I’m showing the group their ranking on the leaderboard."
    },
    eo: {
        title: "Kalkulludo por la agotago",
        imageGallery: "Bildgalerio",
        imageGalleryHint: "Alklaku la bildojn por vidi ilin grandaj kaj kun priskriboj.",
        explanation: "Klarigo",
        explanationParagraph: "La 13-an de Novembro 2024 estis agotago en bbw Südhessen, mia staĝofirmao. Por doni al la lernejanoj, kiuj interesiĝas pri la informadiko, enrigardon en la programadon, mi antaŭe programis ĉi tiun kalkulludon. La celo de la ludo estas solvi dek kalkulproblemojn en kiel eble malplej da tempo. Kiu estas aparte rapida, povas sekurigi lokon en la rangotabelo.",
        language: "Lingvo",
        toRepository: "Al la deponejo",
        backToHomepage: "Reen al la hejmpaĝo",
        description1: "Ĉi tie mi montras al grupo de lernantoj kaj instruistino la titolan ekranon de mia kalkulludo.",
        description2: "En ĉi tiu foto, mi klarigas al la grupo kiel ludi mian ludon. Oni devas solvi dek matematikajn taskojn kaj elekti la ĝustan respondon por ĉiu.",
        description3: "Ĉi tie mi solvis kvin taskojn por demonstro. Baldaŭ mi lasos la grupon uzi la inteligentan tabulon, por ke ili povu solvi la ceterajn taskojn.",
        description4: "Ĉi tie, du lernantoj solvas la ceterajn taskojn de la rondo. Supre dekstre, vi povas vidi la klikhorloĝon tiktaki.",
        description5: "En ĉi tiu foto, la lernantoj atingis 10/10 ĝustajn respondojn en 50,82 sekundoj, sekurigante la 6-an lokon en la rangotabelo. Unu el ili nun enigas siajn inicialojn, kiuj poste estos montrataj en la rangotabelo.",
        description6: "Ĉi tie mi montras al la grupo ĝian pozicion en la rangotabelo."
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
    for (let i = 1; i <= 6; i++) {
        document.getElementById("description-" + i).textContent = translation["description" + i];
    }
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