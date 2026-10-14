
const moves = ["rock", "paper", "scissors"];

let lives = 3;
let score = 0;

let prediction = "";
let playerMove = "";
let computerMove = "";

let gameOver = false;

const livesDisplay = document.getElementById("lives");
const scoreDisplay = document.getElementById("score");
const resultDisplay = document.getElementById("result");

const predictionButtons = document.querySelectorAll(
  "#prediction-buttons .choice-button"
);

const moveButtons = document.querySelectorAll(
  "#move-buttons .choice-button"
);

const restartButton = document.getElementById("restart-button");

function updateStats() {
  livesDisplay.textContent = lives;
  scoreDisplay.textContent = score;
}

predictionButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (gameOver) return;

    prediction = button.dataset.move;

    predictionButtons.forEach(btn => {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");

    resultDisplay.innerHTML =
      `<p>Your prediction: <strong>${prediction.toUpperCase()}</strong></p>
       <p>Now choose your move!</p>`;
  });
});

moveButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (gameOver) return;

    if (prediction === "") {
      resultDisplay.innerHTML =
        "<p>Make a prediction before choosing your move!</p>";
      return;
    }

    playerMove = button.dataset.move;

    moveButtons.forEach(btn => {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");

    playRound();
  });
});


function getComputerMove() {
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}

function getWinner(player, computer) {
  if (player === computer) {
    return "draw";
  }

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  }

  return "lose";
}


function playRound() {
  if (gameOver) return;

  if (prediction === "") {
    resultDisplay.innerHTML =
      "<p>Predict the computer's move first!</p>";
    return;
  }

  // 1. Generate the computer's move
  computerMove = getComputerMove();

  // 2. Check whether the prediction was correct
  let roundMessage = "";

  if (prediction === computerMove) {
    score += 3;
    roundMessage += "Correct prediction! +3 bonus points! ";
  } else {
    roundMessage += "Wrong prediction! No bonus points. ";
  }

  // 3. Determine the round winner
  const winner = getWinner(playerMove, computerMove);

  if (winner === "win") {
    score += 1;
    roundMessage += "You won the round! +1 point!";
  } else if (winner === "lose") {
    lives -= 1;
    roundMessage += "You lost the round! -1 life.";
  } else {
    roundMessage += "It's a draw! No points or lives lost.";
  }

  // 4. Update the stats on screen
  updateStats();

  // 5. Show the round results
  resultDisplay.innerHTML = `
    <p>Your prediction: <strong>${prediction.toUpperCase()}</strong></p>
    <p>Your move: <strong>${playerMove.toUpperCase()}</strong></p>
    <p>Computer's move: <strong>${computerMove.toUpperCase()}</strong></p>
    <p>${roundMessage}</p>
  `;

  // 6. Check whether the game has ended
  if (lives <= 0) {
    gameOver = true;
    resultDisplay.innerHTML +=
      "<p><strong>GAME OVER!</strong> Click New Game to try again.</p>";
predictionButtons.forEach(button => {
    button.disabled = true;
  });

  moveButtons.forEach(button => {
    button.disabled = true;
  });
}

  // 7. Prepare for the next round
  prediction = "";

  predictionButtons.forEach(button => {
    button.classList.remove("selected");
  });

  moveButtons.forEach(button => {
    button.classList.remove("selected");
  });
}

function startGame() {
  lives = 3;
  score = 0;

  prediction = "";
  playerMove = "";
  computerMove = "";

  gameOver = false;

  updateStats();

  resultDisplay.innerHTML =
    "<p>Make a prediction to get started!</p>";

  predictionButtons.forEach(button => {
    button.disabled = false;
    button.classList.remove("selected");
  });

  moveButtons.forEach(button => {
    button.disabled = false;
    button.classList.remove("selected");
  });
}

restartButton.addEventListener("click", startGame);

startGame();

