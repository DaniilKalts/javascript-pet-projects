if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./service-worker.js").then(
      function (registration) {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        console.error("ServiceWorker registration failed: ", err);
      }
    );
  });
}

// Variables to Detect Direction of Touch
let touchStartX, touchStartY;

// Sounds
let eatingSound;

// Colors for the Game
const boardColor = "#1F1F1F";
const cellColor = "#363636";
const foodColor = "#E57373";
const snakeColor = "#81C784";

// Configuration of the Board
let blockSize = 30;
let rows = 18;
let columns = 18;
let board;
let context;

// Configuration of the Snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// Configuration of Velocity for the Snake
let velocityX = 0;
let velocityY = 0;

// Configuration of Snakes Body
let snakeBody = [];

// Configuration of Food
let foodX = blockSize * 10;
let foodY = blockSize * 10;

// Configuration Game Over Variables
const reloadGameButton = document.getElementById("reloadGameButton");
let gameOver = false;

// Configuration of Score
const scoreLabel = document.getElementById("scoreLabel");
let score = 0;

// Initialization of the Game
window.onload = () => {
  eatingSound = new Audio("./sounds/eating-sound.mp3");
  reloadGameButton.disabled = true;

  if (window.innerWidth <= 400) {
    blockSize = 25;
    rows = 12;
    columns = 12;
  } else if (window.innerWidth <= 575) {
    blockSize = 25;
    rows = 15;
    columns = 15;
  }

  snakeX = blockSize * 5;
  snakeY = blockSize * 5;
  foodX = blockSize * 10;
  foodY = blockSize * 10;

  board = document.getElementById("board");
  board.width = rows * blockSize;
  board.height = columns * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(updateBoard, 150);
  document.addEventListener("keyup", (e) => {
    if (e.code === "Space" && gameOver) {
      reloadGame();
    }
  });
  document.addEventListener("touchstart", touchStartHandler);
  document.addEventListener("touchend", touchEndHandler);
};

function placeFood() {
  foodX = Math.floor(Math.random() * rows) * blockSize;
  foodY = Math.floor(Math.random() * columns) * blockSize;
}

function changeDirection(e) {
  if (e.code === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.code === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  }
}

function updateBoard() {
  if (gameOver) {
    return;
  }

  context.fillStyle = boardColor;
  context.fillRect(0, 0, board.width, board.height);

  context.strokeStyle = cellColor;
  for (let y = 0; y < board.height; y += blockSize) {
    for (let x = 0; x < board.width; x += blockSize) {
      context.setLineDash([1, 1]);
      context.strokeRect(x, y, blockSize, blockSize);
    }
  }

  context.fillStyle = foodColor;
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX === foodX && snakeY === foodY) {
    score++;
    scoreLabel.textContent = `🍎 ${score}`;
    snakeBody.push([foodX, foodY]);
    placeFood();
    eatingSound.play();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = snakeColor;
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  context.fillStyle = "black";
  context.fillRect(
    snakeX + blockSize / 5,
    snakeY + 6,
    blockSize / 7,
    blockSize / 5
  );
  context.fillRect(
    snakeX + blockSize - blockSize / 3,
    snakeY + 6,
    blockSize / 7,
    blockSize / 5
  );

  // Game Over Conditions
  if (
    snakeX < 0 ||
    snakeX >= columns * blockSize ||
    snakeY < 0 ||
    snakeY >= rows * blockSize
  ) {
    gameOver = true;
    reloadGameButton.disabled = false;
    alert("The Game Is Over. Press Space to Reload the Page.");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
      reloadGameButton.disabled = false;
      alert("The Game Is Over. Press Space to Reload the Page.");
    }
  }
}

function reloadGame() {
  snakeX = blockSize * 5;
  snakeY = blockSize * 5;

  velocityX = 0;
  velocityY = 0;

  snakeBody = [];

  foodX = blockSize * 10;
  foodY = blockSize * 10;

  gameOver = false;
  reloadGameButton.disabled = true;

  scoreLabel.textContent = "🍎 0";
  score = 0;
}

function touchStartHandler(event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

function touchEndHandler(event) {
  let touchEndX = event.changedTouches[0].clientX;
  let touchEndY = event.changedTouches[0].clientY;

  let deltaX = touchEndX - touchStartX;
  let deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0 && velocityX !== -1) {
      velocityX = 1;
      velocityY = 0;
    } else if (deltaX < 0 && velocityX !== 1) {
      velocityX = -1;
      velocityY = 0;
    }
  } else {
    if (deltaY > 0 && velocityY !== -1) {
      velocityX = 0;
      velocityY = 1;
    } else if (deltaY < 0 && velocityY !== 1) {
      velocityX = 0;
      velocityY = -1;
    }
  }
}
