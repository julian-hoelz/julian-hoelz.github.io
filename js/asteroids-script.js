const translations = {
    de: {
        headingGameplayVideo: "Gameplay-Video",
        headingGameDescription: "Spielbeschreibung",
        headingAboutThisClone: "Über diesen Klon",
        headingLanguage: "Sprache",
        paragraphGameDescription1: "Asteroids ist ein Arcade-Spiel, in dem man ein Raumschiff um Asteroiden herumnavigiert und auf sie schießt. Wenn sie getroffen werden, zerbrechen sie in kleinere Stücke und verschwinden schließlich. Gelegtentlich tauchen fliegende Untertassen auf, die auf einen schießen, was die Herausforderung erhöht. Punkte sammelt man, indem man Asteroiden und fliegende Untertassen mit Kugeln trifft.",
        paragraphGameDescription2: "Kannst du meinen Highscore (11.280) knacken?",
        paragraphAboutThisClone: "Wenn du meinen Asteroids-Klon herunterlädst, wirst du vermutlich bemerken, dass das Spielerlebnis zwar ähnlich ist, aber einiges anders gelöst wurde als im Original. Asteroiden z. B. werden zufällig generiert, anstatt wiederkehrende Muster aufzuweisen.",
        toRepositoryButton: "Zum Repository",
        backToHomepageButton: "Zurück zur Startseite"
    },
    en: {
        headingGameplayVideo: "Gameplay Video",
        headingGameDescription: "Game Description",
        headingAboutThisClone: "About This Clone",
        headingLanguage: "Language",
        paragraphGameDescription1: "Asteroids is an arcade game where you navigate a spaceship around asteroids and shoot at them. When hit, they break into smaller pieces and eventually disappear. Occasionally, flying saucers appear and shoot at you, increasing the challenge. You score points by hitting asteroids and flying saucers with bullets.",
        paragraphGameDescription2: "Can you beat my high score of 11,280?",
        paragraphAboutThisClone: "If you download my Asteroids clone, you’ll probably notice that while the gameplay is similar, some aspects have been handled differently from the original. For example, asteroids are generated randomly rather than following recurring patterns.",
        toRepositoryButton: "To the repository",
        backToHomepageButton: "Back to the homepage"
    },
    eo: {
        headingGameplayVideo: "Ludada filmeto",
        headingGameDescription: "Ludpriskribo",
        headingAboutThisClone: "Pri tiu ĉi kopio",
        headingLanguage: "Lingvo",
        paragraphGameDescription1: "Asteroids estas videoludeja ludo, en kiu oni navigas per kosmoŝipo ĉirkaŭ asteroidoj kaj pafas al ili. Kiam ili estas trafataj, ili rompiĝas en pli malgrandajn pecojn kaj fine malaperas. Fojfoje aperas nifoj, kiuj pafas al oni, kio pliigas la defion. Poentojn oni gajnas trafante asteroidojn kaj nifojn per kugloj.",
        paragraphGameDescription2: "Ĉu vi povas superi mian rekordon (11.280)?",
        paragraphAboutThisClone: "Se vi elŝutos mian Asteroids-kopion, vi verŝajne rimarkos, ke, kvankam la ludimpreso estas simila, kelkaj aferoj estis solvitaj malsame ol en la originalo. Ekzemple, asteroidoj generiĝas hazarde anstataŭ sekvi ripetiĝantajn ŝablonojn.",
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
    document.getElementById("heading-gameplay-video").textContent = translation.headingGameplayVideo;
    document.getElementById("heading-game-description").textContent = translation.headingGameDescription;
    document.getElementById("heading-about-this-clone").textContent = translation.headingAboutThisClone;
    document.getElementById("heading-language").textContent = translation.headingLanguage;
    document.getElementById("paragraph-game-description-1").textContent = translation.paragraphGameDescription1;
    document.getElementById("paragraph-game-description-2").textContent = translation.paragraphGameDescription2;
    document.getElementById("paragraph-about-this-clone").textContent = translation.paragraphAboutThisClone;
    document.getElementById("button-to-repository").textContent = translation.toRepositoryButton;
    document.getElementById("button-back-to-homepage").textContent = translation.backToHomepageButton;
}

function addToUrl(key, value) {
    const currentUrl = new URL(location.href);
    currentUrl.searchParams.set(key, value);
    history.replaceState({}, "", currentUrl);
}

setLanguageOnLoad();