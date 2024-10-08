// Öffnet die Lightbox
function openLightbox() {
    document.getElementById("lightbox").style.display = "block";
}

// Schließt die Lightbox
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Ändert das aktuelle Bild
function changeSlide(n) {
    showSlides(currentSlideIndex += n);
}

// Setzt das angezeigte Bild auf ein bestimmtes Bild
function currentSlide(n) {
    showSlides(currentSlideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slides");

    // Wenn n größer als die Anzahl der Bilder ist, gehe zum ersten Bild
    if (n >= slides.length) {
        currentSlideIndex = 0;
    }

    // Wenn n kleiner als 1 ist, gehe zum letzten Bild
    if (n < 0) {
        currentSlideIndex = slides.length - 1;
    }

    // Alle Bilder verstecken
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Nur das aktuelle Bild anzeigen
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

let currentSlideIndex = 1;
showSlides(currentSlideIndex);