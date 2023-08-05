const board = document.querySelector(".container");

function createGrid(size) {
  for (let i = 0; i < size * size; ++i) {
    const square = document.createElement("div");
    square.classList.add("element");
    board.appendChild(square);
  }
}

function addFilled(event) {
  event.target.classList.add("filled");
}

createGrid(16);
const grid = document.querySelectorAll(".element");
for (const block of grid) {
  block.addEventListener("mouseenter", addFilled);
}
