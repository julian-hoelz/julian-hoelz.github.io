const ascii_chars = '@%#*+=-:. ';

let image;

function filePickedEvent(event) {
    const file = event.target.files[0];
    const placeholder = document.getElementById("placeholder");
    const imagePreview = document.getElementById("image-preview");
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            image = e.target.result;
            console.log(image);
            imagePreview.src = image;
        };
        imagePreview.classList.remove('hidden');
        placeholder.classList.add('hidden');
        reader.readAsDataURL(file);
    } else {
        imagePreview.classList.add('hidden');
        placeholder.classList.remove('hidden');
    }
}

function generateAscii() {
    const outputWidth = parseInt(document.getElementById("output-width-input").value);
    const invert = document.getElementById("invert-checkbox").checked;
    const charWidth = parseInt(document.getElementById("char-width-input").value);
    const charHeight = parseInt(document.getElementById("char-height-input").value);
    const ascii = imageToAscii(outputWidth, invert, charWidth, charHeight);
    const output = document.getElementById("output");
    output.textContent = ascii;
}

function imageToAscii(outputWidth, invert, charWidth, charHeight) {

}