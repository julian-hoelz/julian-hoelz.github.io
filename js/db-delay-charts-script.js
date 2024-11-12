const linkToApiEndpoint = "https://developers.deutschebahn.com/db-api-marketplace/apis/product/timetables";

const translations = {
    de: {
        title: "DB-Verspätungsdiagramme",
        chartGallery: "Diagrammgalerie",
        chartGalleryHint: "Klicke die Bilder an, um sie groß und mit Beschreibungen angezeigt zu bekommen.",
        description: "Beschreibung",
        dbApi: "DB-API",
        descriptionParagraph1BeforeLink: "Für eine Bewerbung um ein Praktikum bei der Deutschen Bahn habe ich Python-Skripte entwickelt, die Verspätungsdaten für den Frankfurter Hauptbahnhof über die ",
        descriptionParagraph1AfterLink: " abfragen und in Diagrammform visualisieren.",
        descriptionParagraph2: "Da die API nur Daten für den aktuellen Tag bereitstellt, richtete ich ein Skript auf einem Raspberry Pi ein, das die Daten kontinuierlich im Hintergrund sammelte.",
        descriptionParagraph3: "Als Verspätungsdaten für eine Woche gesammelt waren, zog ich sie auf mein lokales System und entwickelte daraufhin die Skripte, die die oben gezeigten Diagramme generieren.",
        language: "Sprache",
        toRepository: "Zum Repository",
        backToHomepage: "Zurück zur Startseite",
        description1: "Abb. 1: Hier sind die Anzahlen von Fahrplanänderungen am 29.10.2024 geplottet. Duplikate werden noch mitgezählt.",
        description2: "Abb. 2: Auch hier sind die Anzahlen von Fahrplanänderungen am 29.10.2024 geplottet, nur dass Duplikate nicht mehr mitgezählt werden.",
        description3: "Abb. 3: Dieses Diagramm zeigt alle Verspätungen am 31.10.2024. Wie man leicht erkennen kann, überschreiten nur wenige Verspätungen die 20-Minuten-Marke.",
        description4: "Abb. 4: Dieses Diagramm stellt die durchschnittlichen Verspätungen am 31.10.2024 in Intervallen von 15 Minuten dar. Hierfür habe ich die in Abb. 3 dargestellten Verspätungen aggregiert und dadurch die Verspätungskurve geglättet."
    },
    en: {
        title: "DB Delay Charts",
        chartGallery: "Chart Gallery",
        chartGalleryHint: "Click on the images to view them large and with descriptions.",
        description: "Description",
        dbApi: "DB API",
        descriptionParagraph1BeforeLink: "For an internship application at Deutsche Bahn, I developed Python scripts that query delay data for Frankfurt Central Station using the ",
        descriptionParagraph1AfterLink: " and visualize it in graphical form.",
        descriptionParagraph2: "Since the API only provides data for the current day, I set up a script on a Raspberry Pi to continuously collect the data in the background.",
        descriptionParagraph3: "After gathering a week’s worth of delay data, I transferred it to my local system and developed scripts that generate the charts shown above.",
        language: "Language",
        toRepository: "To the repository",
        backToHomepage: "Back to the homepage",
        description1: "Fig. 1: This plot shows the numbers of schedule changes on October 29, 2024. Duplicates are still included in the count.",
        description2: "Fig. 2: This plot also shows the numbers of schedule changes on October 29, 2024, but duplicates are no longer included in the count.",
        description3: "Fig. 3: This chart displays all delays on October 31, 2024. As can be easily observed, only a few delays exceed the 20-minute mark.",
        description4: "Fig. 4: This chart shows the average delays on October 31, 2024, in 15-minute intervals. For this, I aggregated the delays shown in Fig. 3, thereby smoothing the delay curve."
    },
    eo: {
        title: "DB-malfruodiagramoj",
        chartGallery: "Diagramgalerio",
        chartGalleryHint: "Alklaku la bildojn por vidi ilin grandaj kaj kun priskriboj.",
        description: "Priskribo",
        dbApi: "DB-API",
        descriptionParagraph1BeforeLink: "Por kandidatiĝo por staĝo ĉe Deutsche Bahn, mi disvolvis Python-skriptojn, kiuj petas la ",
        descriptionParagraph1AfterLink: " pri malfruodatumoj por la Frankfurta ĉefa stacidomo kaj prezentas ilin en diagramoj.",
        descriptionParagraph2: "Ĉar la API disponigas nur datumojn por la aktuala tago, mi starigis skripton sur Raspberry Pi, kiu konstante kolektis la datumojn en la fono.",
        descriptionParagraph3: "Kiam malfruodatumoj por unu semajno estis kolektitaj, mi transmetis ilin en mian lokan sistemon kaj sekve disvolvis la skriptojn, kiuj generas la supre montratajn diagramojn.",
        language: "Lingvo",
        toRepository: "Al la deponejo",
        backToHomepage: "Reen al la hejmpaĝo",
        description1: "Fig. 1: Ĉi tiu diagramo montras la nombrojn de horarŝanĝoj la 29.10.2024. Duplikatoj estas ankoraŭ enkalkulitaj.",
        description2: "Fig. 2: Ankaŭ ĉi tiu diagramo montras la nombrojn de horarŝanĝoj la 29.10.2024, nur ke duplikatoj ne plu estas enkalkulitaj.",
        description3: "Fig. 3: Ĉi tiu diagramo montras ĉiujn malfruojn la 31.10.2024. Kiel facile videblas, nur malmultaj malfruoj superas la 20-minutan markon.",
        description4: "Fig. 4: Ĉi tiu diagramo montras la averaĝajn malfruojn la 31.10.2024 en intervaloj de 15 minutoj. Por tio, mi agregis la malfruojn montritajn en fig. 3 kaj tiel glatigis la malfruokurbon."
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
    const ankerTagApiEndpointLink = '<a href="' + linkToApiEndpoint + '" target="_blank">' + translation.dbApi + "</a>";
    const descriptionParagraph1 = translation.descriptionParagraph1BeforeLink + ankerTagApiEndpointLink + translation.descriptionParagraph1AfterLink;
    document.title = translation.title;
    document.getElementById("title").textContent = translation.title;
    document.getElementById("heading-chart-gallery").textContent = translation.chartGallery;
    document.getElementById("paragraph-chart-gallery-hint").textContent = translation.chartGalleryHint;
    document.getElementById("heading-description").textContent = translation.description;
    document.getElementById("paragraph-description-1").innerHTML = descriptionParagraph1;
    document.getElementById("paragraph-description-2").textContent = translation.descriptionParagraph2;
    document.getElementById("paragraph-description-3").textContent = translation.descriptionParagraph3;
    document.getElementById("heading-language").textContent = translation.language;
    document.getElementById("paragraph-to-repository").textContent = translation.toRepository;
    document.getElementById("button-back-to-homepage").textContent = translation.backToHomepage;
    for (let i = 1; i <= 4; i++) {
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