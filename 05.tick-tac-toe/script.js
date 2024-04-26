const info = document.querySelector(".container__info");
const cells = document.querySelectorAll(".container__cell");
const resetButton = document.querySelector(".container__reset");

let winOptions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let startedPlayer = "X";
let currentPlayer = "X";
let isRunning = true;

cells.forEach((cell, id) => {
  cell.addEventListener("click", () => {
    if (!isRunning) {
      alert("Restart the game!");
      return;
    } else if (!cells[id].innerHTML) {
      cells[id].innerHTML = `
        <img
            class="container__cell-figure"
            src="./images/${currentPlayer === "X" ? "cross" : "circle"}.svg"
            width="40"
            height="40"
            alt="Cross"
            loading="lazy"
        />
      `;

      options[id] = currentPlayer;

      if (checkWinner()) {
        info.textContent = `The player ${currentPlayer} has won!`;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      info.textContent = `Player ${currentPlayer}'s Move`;
    }
  });
});

document.addEventListener("keypress", (e) => {
  if (e.key === "R") {
    resetAllCells();
  }
});

resetButton.addEventListener("click", resetAllCells);

function resetAllCells() {
  options = ["", "", "", "", "", "", "", "", ""];
  startedPlayer = startedPlayer === "X" ? "O" : "X";
  isRunning = true;
  currentPlayer = startedPlayer;
  cells.forEach((cell) => {
    cell.classList.remove("cell--winning");
    cell.innerHTML = "";
  });
  info.textContent = `Player ${currentPlayer}'s Move`;
}

function checkWinner() {
  for (let i = 0; i < winOptions.length; i++) {
    const condition = winOptions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (!cellA || !cellB || !cellC) {
      continue;
    } else if (cellA === cellB && cellA === cellC && cellB === cellC) {
      condition.forEach((id) => cells[id].classList.add("cell--winning"));
      isRunning = false;
      return currentPlayer;
    }
  }
}
