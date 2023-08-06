const DEFAULT_SIZE = 16;
const MIN_SIZE = 1;
const MAX_SIZE = 50;
const canvas = document.querySelector(".container");
const sizeButton = document.querySelector("button");
let drawing = false;

function createCanvas(size) {
  if (size < MIN_SIZE || size > MAX_SIZE) {
    alert("Please enter a size between 1 and 99.");
    return;
  }
  canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; ++i) {
    const square = document.createElement("div");
    square.classList.add("pixel");
    canvas.appendChild(square);
    canvas.addEventListener("mouseover", paintCanvas);
  }
}

function destroyCanvas() {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
}

function paintCanvas(event) {
  if (drawing) {
    event.target.style.backgroundColor = "blue";
  }
}

sizeButton.addEventListener("click", () => {
  let size = prompt("What size do you want the grid to be?");
  destroyCanvas()
  createCanvas(size);
});

window.addEventListener("mousedown", () => {drawing = true;});
window.addEventListener("mouseup", () => {drawing = false;});
window.onload = createCanvas(DEFAULT_SIZE);