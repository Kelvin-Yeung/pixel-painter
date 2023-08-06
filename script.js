const board = document.querySelector(".container");
const changeSize = document.querySelector("button");

function createGrid(size) {
  for (let i = 0; i < size * size; ++i) {
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    const square = document.createElement("div");
    square.classList.add("element");
    board.appendChild(square);
    board.addEventListener("mouseover", addFilled);
  }
}

function removeGrid() {
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
}

function addFilled(event) {
  event.target.classList.add("filled");
}

changeSize.addEventListener("click", () => {
  let size = prompt("What size do you want the grid to be?", 16);
  removeGrid()
  createGrid(size);
});

window.onload = createGrid(16);