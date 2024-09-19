// Öffnet die Lightbox
function openLightbox() {
    document.getElementById("lightbox").style.display = "block";
}

// Schließt die Lightbox
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

let currentSlideIndex = 1;
showSlides(currentSlideIndex);

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

// document.getElementById("asteroids-tile").addEventListener("click", function() {
//     window.location.href = "asteroids.html"; // Die URL, zu der du weiterleiten möchtest
// });
// document.getElementById("mastermind-tile").addEventListener("click", function() {
//     window.location.href = "mastermind.html"; // Die URL, zu der du weiterleiten möchtest
// });