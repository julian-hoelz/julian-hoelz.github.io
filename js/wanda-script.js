const translations = {
    de: {
        imageGallery: "Bildergalerie",
        imageGalleryHint: "Klicke die Bilder an, um sie groß und mit Beschreibungen angezeigt zu bekommen.",
        description: "Beschreibung",
        descriptionParagraph: "Als erste Abschlussprojekt-Übung in meiner Ausbildung habe ich diese Webanwendung für meine Ausbildungsgruppe entwickelt. Meine Ausbildungskollegen und ich können darin unsere Ausbildungsnachweise anlegen, und mein Ausbilder kann sie annehmen oder ablehnen. Der Name Wanda steht für „<b>W</b>eb<b>an</b>wendung für <b>d</b>igitale <b>A</b>usbildungsnachweise“.",
        languages: "Sprachen",
        toRepository: "Zum Repository",
        backToHomepage: "Zurück zur Startseite",
        description1: "Dies ist meine Ausbildungsnachweis-Liste in Wanda.",
        description2: "Auf dieser Seite kann ein Auszubildender einen Ausbildungsnachweis bearbeiten.",
        description3: "Auf dieser Seite kann ein Auszubildender einen bereits eingereichten Ausbildungsnachweis ansehen.",
        description4: "Dies ist die Seite, auf der Auszubildende einen neuen Ausbildungsnachweis anlegen können.",
        description5: "Dies sind die Einstellungen in Wanda.",
        description6: "Auf dieser Seite kann ein Benutzer sein Passwort ändern.",
        description7: "Dies sind die Listen der neu eingereichten und bereits geprüften Ausbildungsnachweise, die hier dem Demo-Ausbilder angezeigt werden.",
        description8: "Auf dieser Seite kann der Ausbilder einen Ausbildungsnachweis prüfen und annehmen oder ablehnen.",
        description9: "Auf dieser Seite kann der Ausbilder einen geprüften Ausbildungsnachweis ansehen und noch Anmerkungen hinzufügen."
    },
    en: {
        imageGallery: "Image Gallery",
        imageGalleryHint: "Click on the images to view them large and with descriptions.",
        description: "Description",
        descriptionParagraph: "As the first final project exercise in my training, I developed this German web application for my training group. My fellow trainees and I can create our training records in it, and my instructor can accept or reject them. The name Wanda stands for “<b>W</b>eb<b>an</b>wendung für <b>d</b>igitale <b>A</b>usbildungsnachweise” (Web Application for Digital Training Records).",
        languages: "Languages",
        toRepository: "To the repository",
        backToHomepage: "Back to the homepage",
        description1: "This is my training record list in Wanda.",
        description2: "On this page, an apprentice can edit a training record.",
        description3: "On this page, an apprentice can view a previously submitted training record.",
        description4: "This is the page where apprentices can create a new training record.",
        description5: "These are the settings in Wanda.",
        description6: "On this page, a user can change their password.",
        description7: "These are the lists of newly submitted and already reviewed training records, displayed here for the demo instructor.",
        description8: "On this page, the instructor can review a training record and either accept or reject it.",
        description9: "On this page, the instructor can view a reviewed training record and add comments."
    },
    eo: {
        imageGallery: "Bildgalerio",
        imageGalleryHint: "Alklaku la bildojn por vidi ilin grandaj kaj kun priskriboj.",
        description: "Priskribo",
        descriptionParagraph: "Kiel la unua finprojekta ekzerco en mia staĝo, mi disvolvis ĉi tiun germanan retaplikaĵon por mia staĝogrupo. Miaj staĝokolegoj kaj mi povas krei niajn staĝoraportojn en ĝi, kaj mia staĝestro povas akcepti aŭ malakcepti ilin. La nomo Wanda staras por “<b>W</b>eb<b>an</b>wendung für <b>d</b>igitale <b>A</b>usbildungsnachweise” (Retaplikaĵo por ciferecaj staĝoraportoj).",
        languages: "Lingvoj",
        toRepository: "Al la deponejo",
        backToHomepage: "Reen al la hejmpaĝo",
        description1: "Ĉi tio estas mia staĝoraporta listo en Wanda.",
        description2: "Sur ĉi tiu paĝo, staĝanto povas prilabori staĝoraporton.",
        description3: "Sur ĉi tiu paĝo, staĝanto povas rigardi jam submetitan staĝoraporton.",
        description4: "Ĉi tio estas la paĝo, sur kiu staĝantoj povas krei novan staĝoraporton.",
        description5: "Ĉi tio estas la agordoj en Wanda.",
        description6: "Sur ĉi tiu paĝo, uzanto povas ŝanĝi sian pasvorton.",
        description7: "Ĉi tio estas la listoj de la nove submetitaj kaj de la jam kontrolitaj staĝoraportoj, ĉi tie montrataj al la demonstra staĝestro.",
        description8: "Sur ĉi tiu paĝo, la staĝestro povas kontroli staĝoraporton kaj aŭ akcepti aŭ malakcepti ĝin.",
        description9: "Sur ĉi tiu paĝo, la staĝestro povas rigardi kontrolitan staĝoraporton kaj aldoni komentojn."
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
    document.getElementById("heading-image-gallery").textContent = translation.imageGallery;
    document.getElementById("paragraph-image-gallery-hint").textContent = translation.imageGalleryHint;
    document.getElementById("heading-description").textContent = translation.description;
    document.getElementById("paragraph-description").innerHTML = translation.descriptionParagraph;
    document.getElementById("heading-languages").textContent = translation.languages;
    document.getElementById("paragraph-to-repository").textContent = translation.toRepository;
    document.getElementById("button-back-to-homepage").textContent = translation.backToHomepage;
    for (let i = 1; i <= 9; i++) {
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