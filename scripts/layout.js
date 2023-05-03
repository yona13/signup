function resize() {
    if (scaleToggle) {
        imageBlock.setAttribute("style", "width: 70%");
        container.className = "container";
        arrowPrompt.className += " invisible";
    } else {
        console.log("not normal")
        imageBlock.setAttribute("style", "width: 100%");
        container.className = "container-tall";
        arrowPrompt.className = "scroll-down"
    }
}

const b = document.body;
const imageBlock = document.querySelector(".image-block");
const container = document.querySelector(".container");
const arrowPrompt = document.querySelector(".scroll-down");
const scales = [1, 2];
let scaleToggle = true;

if (b.clientHeight > (scales[scaleToggle ? 0 : 1] * b.clientWidth)) {
    scaleToggle = false;
}
resize();

window.addEventListener('resize', (event) => {
    console.log(`W: ${b.clientWidth}; H: ${b.clientHeight};`);
    if (b.clientHeight > (scales[scaleToggle ? 0 : 1] * b.clientWidth)) {
        console.log("Taller than wide;");
        scaleToggle = false;
    }
    else {
        console.log("Wider than tall;");
        scaleToggle = true;
    }

    resize();
});