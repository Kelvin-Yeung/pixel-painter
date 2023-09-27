/* Pixel Painter */

const MIN_SIZE = 1;
const MAX_SIZE = 50;
const DEFAULT_SIZE = 32;
const RGB_VALS = [255, 255, 255, 128, 0, 0, 0, 0, 0, 128, 255, 255];
let drawing = false;
let currentColour = "black";

/* Left Side Buttons */

const canvas = document.querySelector(".container");
const lightBtns = document.querySelector(".lightshades");
const darkBtns = document.querySelector(".darkshades");
const grayBtns = document.querySelector(".grayshades");

/* Right Side Buttons */

const gridBtn = document.querySelector("#grid");
const musicBtn = document.querySelector("#music");
const saveBtn = document.querySelector("#save");
const clearBtn = document.querySelector("#clear");
const sizeBtn = document.querySelector("#size");
const applyBtn = document.querySelector("#apply");

/* Canvas */

function paintCanvas(event) {
  if (drawing || event.type === "mousedown") {
    event.target.style.backgroundColor = currentColour;
  }
}

function createCanvas(size, is_bordered) {
  canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; ++i) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    if (is_bordered) {
      pixel.style.border = "0.1px solid";
    }
    canvas.appendChild(pixel);
    canvas.addEventListener("mousedown", paintCanvas);
    canvas.addEventListener("mouseover", paintCanvas);
  }
}

/* Buttons */

function createLightBtns() {
  for (let i = 0; i < 12; ++i) { 
    for (let j = 0; j < 5; ++j) {
      // Traverse through the RGB_VALS array to determine each button's RGB value
      const red = RGB_VALS[i] + (j * 51);
      const green = RGB_VALS[(i + 8) % 12] + (j * 51);
      const blue = RGB_VALS[(i + 4) % 12] + (j * 51);
      const btn = document.createElement("button");
      btn.style.type = "button";
      btn.style.width = "30px";
      btn.style.height = "30px";
      btn.style.borderRadius = "50%";
      btn.style.backgroundColor = "rgb(" + Math.min(red, 255) + ',' + Math.min(green, 255) + ',' + Math.min(blue, 255) + ')';
      btn.addEventListener("click", (event) => {
        currentColour = event.target.style.backgroundColor;
      });
      lightBtns.appendChild(btn);
    }
  }
}

function createDarkBtns() {
  for (let i = 0; i < 12; ++i) { 
    for (let j = 4; j > 0; --j) {
      const red = RGB_VALS[i] - (j * 51);
      const green = RGB_VALS[(i + 8) % 12] - (j * 51);
      const blue = RGB_VALS[(i + 4) % 12] - (j * 51);
      const btn = document.createElement("button");
      btn.style.type = "button";
      btn.style.width = "30px";
      btn.style.height = "30px";
      btn.style.borderRadius = "50%";
      btn.style.backgroundColor = "rgb(" + Math.max(red, 0) + ',' + Math.max(green, 0) + ',' + Math.max(blue, 0) + ')';
      btn.addEventListener("click", (event) => {
        currentColour = event.target.style.backgroundColor;
      });
      darkBtns.appendChild(btn);
    }
  }
}

function createGrayBtns() {
  for (let i = 0; i < 9; ++i) {
    const shade = (255 / 8) * i;
    const btn = document.createElement("button");
    btn.style.type = "button";
    btn.style.width = "30px";
    btn.style.height = "30px";
    btn.style.borderRadius = "50%";
    btn.style.backgroundColor = "rgb(" + shade + ',' + shade + ',' + shade + ')';
    btn.addEventListener("click", (event) => {
      currentColour = event.target.style.backgroundColor;
    });
    grayBtns.appendChild(btn);
  }
}

function destroyCanvas() {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
}

/* Painting Features */

gridBtn.addEventListener("click", () => {
  for (const pixel of canvas.children) {
    console.log(canvas);
    if (pixel.style.border == "0.1px solid") {
      pixel.style.border = "0";
    } else {
      pixel.style.border = "0.1px solid";
    }
  }
});

musicBtn.addEventListener("click", () => {
  const audio = document.querySelector("audio");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

saveBtn.addEventListener("click", () => {
  domtoimage.toJpeg(canvas).then((dataURL) => {
    const link = document.createElement('a');
    link.download = 'my-image-name.jpeg';
    link.href = dataURL;
    link.click();
  })
  .catch((error) => {
    console.error("ERROR: ", error);
  });
});

clearBtn.addEventListener("click", () => {
  for (const pixel of canvas.children) {
    pixel.style.backgroundColor = "white";
  }
})

sizeBtn.addEventListener('input', function (event) {
  const text = document.querySelector(".slidecontainer p");
  const pixelSize = event.target.value;
  text.textContent = `${pixelSize}x${pixelSize}`;
});

let timerId = null;
applyBtn.addEventListener("click", () => {
  let is_bordered = false;
  if (canvas.firstElementChild.style.border === "0.1px solid") {
    is_bordered = true;
  }
  const size = sizeBtn.value;
  destroyCanvas();
  createCanvas(size, is_bordered);

  const fading = document.querySelector("#fading");
  fading.style.opacity = 1;

  if (timerId) {
    return;
  }

  timerId = setTimeout(() => {
    console.log(timerId);
    fading.style.opacity = "0";
    timerId = null;
  }, 2000);
});

/* On Startup Function Calls */

window.addEventListener("mousedown", () => {drawing = true;});
window.addEventListener("mouseup", () => {drawing = false;});
createCanvas(DEFAULT_SIZE, false);
createLightBtns();
createDarkBtns();
createGrayBtns();
