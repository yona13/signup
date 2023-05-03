/* Variables */
const b = document.body;
const imageBlock = document.querySelector(".image-block");
const container = document.querySelector(".container");
const arrowPrompt = document.querySelector(".scroll-down");
const scales = [1, 2];
let scaleToggle = true;

/* Resize if needed */
if (b.clientHeight > (scales[scaleToggle ? 0 : 1] * b.clientWidth)) {
    scaleToggle = false;
}
resize();

/* Add Resize Event Listner to Window */
window.addEventListener('resize', (event) => {
    if (b.clientHeight > (scales[scaleToggle ? 0 : 1] * b.clientWidth))
        scaleToggle = false;
    else
        scaleToggle = true;

    resize();
});

/**
 * Resize Function
 * 
 * Resizes elements in markup to fit window
 */
function resize() {
    if (scaleToggle) {
        imageBlock.setAttribute("style", "width: 70%");
        container.className = "container";
        arrowPrompt.className += " invisible";
    } else {
        imageBlock.setAttribute("style", "width: 100%");
        container.className = "container-tall";
        arrowPrompt.className = "scroll-down"
    }
}