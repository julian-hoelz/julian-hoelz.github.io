const translations = {
    de: {
        title: "Mein Asteroids-Klon",
        headingGameplayVideo: "Gameplay-Video",
        headingGameDescription: "Spielbeschreibung",
        headingHowToPlay: "So kannst du es spielen",
        headingAboutThisClone: "Über diesen Klon",
        headingLanguage: "Sprache",
        paragraphGameDescription: "Asteroids ist ein Arcade-Spiel, in dem man ein Raumschiff um Asteroiden herumnavigiert und auf sie schießt. Wenn sie getroffen werden, zerbrechen sie in kleinere Stücke und verschwinden schließlich. Gelegentlich tauchen fliegende Untertassen auf, die auf einen schießen, was die Herausforderung erhöht. Punkte sammelt man, indem man Asteroiden und fliegende Untertassen mit Kugeln trifft.",
        paragraphHowToPlay: "Klone das GitHub-Repository. Öffne in dem Ordner ein Terminal und gib <code>python asteroids.py</code> ein. Nun startet das Spiel. Drücke die Entertaste, um loszuspielen. Das Raumschiff steuerst du mit den Pfeilstasten oder WASD. Schießen kannst du mit der Leertaste. Viel Spaß beim Spielen!",
        paragraphAboutThisClone: "Wenn du meinen Asteroids-Klon herunterlädst, wirst du vermutlich bemerken, dass das Spielerlebnis zwar ähnlich ist, aber einiges anders gelöst wurde als im Original. Zum Beispiel werden Asteroiden zufällig generiert, anstatt wiederkehrende Muster aufzuweisen.",
        toRepository: "Zum Repository",
        backToHomepageButton: "Zurück zur Startseite"
    },
    en: {
        title: "My Asteroids Clone",
        headingGameplayVideo: "Gameplay Video",
        headingGameDescription: "Game Description",
        headingHowToPlay: "How to Play",
        headingAboutThisClone: "About This Clone",
        headingLanguage: "Language",
        paragraphGameDescription: "Asteroids is an arcade game where you navigate a spaceship around asteroids and shoot at them. When hit, they break into smaller pieces and eventually disappear. Occasionally, flying saucers appear and shoot at you, increasing the challenge. You score points by hitting asteroids and flying saucers with bullets.",
        paragraphHowToPlay: "Clone the GitHub repository. Open a terminal in that folder and type <code>python asteroids.py</code> to start the game. Press the Enter key to start playing. You can control the spaceship using the arrow keys or WASD. Use the spacebar to shoot. Have fun playing!",
        paragraphAboutThisClone: "If you download my Asteroids clone, you’ll probably notice that while the gameplay is similar, some aspects have been handled differently from the original. For example, asteroids are generated randomly rather than following recurring patterns.",
        toRepository: "To the repository",
        backToHomepageButton: "Back to the homepage"
    },
    eo: {
        title: "Mia Asteroids-kopio",
        headingGameplayVideo: "Ludada filmeto",
        headingGameDescription: "Ludpriskribo",
        headingHowToPlay: "Kiel ludi",
        headingAboutThisClone: "Pri tiu ĉi kopio",
        headingLanguage: "Lingvo",
        paragraphGameDescription: "Asteroids estas videoludeja ludo, en kiu oni navigas per kosmoŝipo ĉirkaŭ asteroidoj kaj pafas al ili. Kiam ili estas trafataj, ili rompiĝas en pli malgrandajn pecojn kaj fine malaperas. Fojfoje aperas nifoj, kiuj pafas al oni, kio pliigas la defion. Poentojn oni gajnas trafante asteroidojn kaj nifojn per kugloj.",
        paragraphHowToPlay: "Klonu la GitHub-deponejon. Malfermu terminalon en tiu dosierujo kaj enigu <code>python asteroids.py</code>. Nun la ludo komenciĝos. Premu la enigoklavon por ekludi. Vi povas stiri la kosmoŝipon per la sagoklavoj aŭ WASD. Vi povas pafi per la spacetoklavo. Amuziĝu ludante!",
        paragraphAboutThisClone: "Se vi elŝutos mian Asteroids-kopion, vi verŝajne rimarkos, ke, kvankam la ludimpreso estas simila, kelkaj aferoj estis solvitaj malsame ol en la originalo. Ekzemple, asteroidoj generiĝas hazarde anstataŭ sekvi ripetiĝantajn ŝablonojn.",
        toRepository: "Al la deponejo",
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
    document.title = translation.title;
    document.getElementById("title").textContent = translation.title;
    document.getElementById("heading-gameplay-video").textContent = translation.headingGameplayVideo;
    document.getElementById("heading-game-description").textContent = translation.headingGameDescription;
    document.getElementById("heading-how-to-play").textContent = translation.headingHowToPlay;
    document.getElementById("heading-about-this-clone").textContent = translation.headingAboutThisClone;
    document.getElementById("heading-language").textContent = translation.headingLanguage;
    document.getElementById("paragraph-game-description").textContent = translation.paragraphGameDescription;
    document.getElementById("paragraph-how-to-play").innerHTML = translation.paragraphHowToPlay;
    document.getElementById("paragraph-about-this-clone").textContent = translation.paragraphAboutThisClone;
    document.getElementById("paragraph-to-repository").textContent = translation.toRepository;
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