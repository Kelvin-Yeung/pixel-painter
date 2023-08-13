const MIN_SIZE = 1;
const MAX_SIZE = 50;
const DEFAULT_SIZE = 16;
const canvas = document.querySelector(".container");
const lightBtns = document.querySelector(".lightshades");
const darkBtns = document.querySelector(".darkshades");
const sizeButton = document.querySelector("button");
let drawing = false;
let colour = "blue";

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
    canvas.addEventListener("mousedown", paintCanvas);
    canvas.addEventListener("mouseover", paintCanvas);
  }
}

function createColourBtns() {
  // Learn how to error handle in JS
  let rgbvals = [255, 255, 255, 128, 0, 0, 0, 0, 0, 128, 255, 255];
  for (let i = 0; i < 12; ++i) { 
    for (let j = 0; j < 5; ++j) {
      let lightRed = rgbvals[i] + (j * 51);
      let lightGreen = rgbvals[(i + 8) % 12] + (j * 51);
      let lightBlue = rgbvals[(i + 4) % 12] + (j * 51);
      const btn = document.createElement("button");
      btn.style.type = "button";
      btn.style.width = "30px";
      btn.style.height = "30px";
      btn.style.borderRadius = "50%";
      btn.style.backgroundColor = "rgb(" + Math.min(lightRed, 255) + ',' + Math.min(lightGreen, 255) + ',' + Math.min(lightBlue, 255) + ')';
      btn.addEventListener("click", (event) => {
        colour = event.target.style.backgroundColor;
      });
      lightBtns.appendChild(btn);
      console.log("Red: " + lightRed);
      console.log("Blue: " + lightBlue);
      console.log("Green: " + lightGreen);
    }
  }
}

function createColourBtns2() {
  // Learn how to error handle in JS
  let rgbvals = [255, 255, 255, 128, 0, 0, 0, 0, 0, 128, 255, 255];
  for (let i = 0; i < 12; ++i) { 
    for (let j = 4; j > 0; --j) {
      let red = rgbvals[i] - (j * 51);
      let green = rgbvals[(i + 8) % 12] - (j * 51);
      let blue = rgbvals[(i + 4) % 12] - (j * 51);
      const btn = document.createElement("button");
      btn.style.type = "button";
      btn.style.width = "30px";
      btn.style.height = "30px";
      btn.style.borderRadius = "50%";
      btn.style.backgroundColor = "rgb(" + Math.max(red, 0) + ',' + Math.max(green, 0) + ',' + Math.max(blue, 0) + ')';
      btn.addEventListener("click", (event) => {
        colour = event.target.style.backgroundColor;
      });
      darkBtns.appendChild(btn);
      console.log("Red: " + red);
      console.log("Blue: " + green);
      console.log("Green: " + blue);
    }
  }
}

createColourBtns();
createColourBtns2();

function destroyCanvas() {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
}

function paintCanvas(event) {
  if (drawing || event.type === "mousedown") {
    event.target.style.backgroundColor = colour;
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