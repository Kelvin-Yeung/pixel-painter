const MIN_SIZE = 1;
const MAX_SIZE = 50;
const DEFAULT_SIZE = 32;
const canvas = document.querySelector(".container");
const lightBtns = document.querySelector(".lightshades");
const darkBtns = document.querySelector(".darkshades");

// Right side buttons
const gridBtn = document.querySelector("#grid");
const musicBtn = document.querySelector("#music");
const saveBtn = document.querySelector("#save");
const clearBtn = document.querySelector("#clear");
const sizeBtn = document.querySelector("#size");

let drawing = false;
let colour = "black";

function createCanvas(size) {
  if (size < MIN_SIZE || size > MAX_SIZE) {
    alert("Please enter a size between 1 and 50.");
    return;
  }
  canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; ++i) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    canvas.appendChild(pixel);
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
    }
  }
}

function createColourBtns2() {
  // Learn how to error handle in JS and fix styling
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
    }
  }
}

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

musicBtn.addEventListener("click", () => {
  const audio = document.querySelector("audio");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

grid.addEventListener("click", () => {
  for (const pixel of canvas.children) {
    console.log(canvas);
    if (pixel.style.border == "0.1px solid") {
      pixel.style.border = "0";
    } else {
      pixel.style.border = "0.1px solid";
    }
  }
});

sizeBtn.addEventListener("click", () => {
  let size = prompt("What size do you want the grid to be?");
  destroyCanvas();
  createCanvas(size);
});

saveBtn.addEventListener("click", () => {
  domtoimage.toJpeg(canvas).then((dataURL) => {
    let link = document.createElement('a');
    link.download = 'my-image-name.jpeg';
    link.href = dataURL;
    link.click();
  })
  .catch((error) => {
    console.error("BAD", error);
  });
});

window.addEventListener("mousedown", () => {drawing = true;});
window.addEventListener("mouseup", () => {drawing = false;});
createCanvas(DEFAULT_SIZE);
createColourBtns();
createColourBtns2();