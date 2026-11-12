let namePlayer1 = prompt("Digite o nome do jogador 1");
let namePlayer2 = prompt("Digite o nome do jogador 2");

let scorePlayer1 = document.querySelector("#scorePlayer1");
let scorePlayer2 = document.querySelector("#scorePlayer2");
const player = {
  player1: {
    name: namePlayer1,
    victoryCount: 0,
    scorePlayer: scorePlayer1,
  },
  player2: {
    name: namePlayer2,
    victoryCount: 0,
    scorePlayer: scorePlayer2,
  },
};

scorePlayer1.textContent = `${player.player1.name}: ${player.player1.victoryCount}`;
scorePlayer2.textContent = `${player.player2.name}: ${player.player2.victoryCount}`;

let playerCurrent = document.querySelector("#nameCurrent");
playerCurrent.textContent = namePlayer1;

function registerWin(player) {
  player.victoryCount++;
  player.scorePlayer.textContent = `${player.name}: ${player.victoryCount}`;
}
const sectionTicTacToe = document.querySelector("#sectionTicTacToe");
const btnNextPlay = document.querySelector("#nextPlay");

let lastStartingPlayer = "player1";
const board = Array.from(document.querySelectorAll(".column"));
const winPosibility = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const resultDiv = document.querySelector("#result");
// const board = rowsArr.map((row) => {
//   return Array.from(row.querySelectorAll(".column"));
// });

let gameOver = false;
board.forEach((column) => {
  column.addEventListener("click", toMark);
});

let lastColumn = null;
let move = false;

function toMark(ev) {
  if (gameOver) {
    return;
  }
  const column = ev.currentTarget;

  if (sectionTicTacToe.dataset.currentPlayer === "player1") {
    if (lastColumn != null && column.dataset.value === "") {
      lastColumn.dataset.value = "";
      lastColumn.textContent = "";
    }
    if (column.dataset.value === "") {
      column.textContent = "X";
      column.dataset.value = "X";
      lastColumn = column;
      move = true;
    }
  } else {
    if (lastColumn != null && column.dataset.value === "") {
      lastColumn.dataset.value = "";
      lastColumn.textContent = "";
    }
    if (column.dataset.value === "") {
      column.textContent = "O";
      column.dataset.value = "O";
      lastColumn = column;
      move = true;
    }
  }
  if (move) {
    const result = gameCheck();
    if (result != undefined) {
      resultDiv.textContent = result;
      gameOver = true;
      resetRound();
    }
  }
}
btnNextPlay.addEventListener("click", () => {
  if (gameOver) {
    return;
  }
  if (sectionTicTacToe.dataset.currentPlayer === "player1" && move === true) {
    sectionTicTacToe.dataset.currentPlayer = "player2";
    lastColumn = null;
    move = false;
    playerCurrent.textContent = namePlayer2;
  } else if (
    sectionTicTacToe.dataset.currentPlayer === "player2" &&
    move === true
  ) {
    sectionTicTacToe.dataset.currentPlayer = "player1";
    lastColumn = null;
    move = false;
    playerCurrent.textContent = namePlayer1;
  }
});

let winningCombination;
function gameCheck() {
  const winX = winPosibility.some((posibility) => {
    const verific = posibility.every((n) => {
      if (board[n].dataset.value == "X") {
        return board[n].dataset.value == "X";
      }
    });
    if (verific) {
      winningCombination = posibility;
      return true;
    }
  });

  let winO = false;
  if (winX === false) {
    winO = winPosibility.some((posibility) => {
      const verific = posibility.every((n) => {
        if (board[n].dataset.value == "O") {
          return board[n].dataset.value == "O";
        }
      });
      if (verific) {
        winningCombination = posibility;
        return true;
      }
    });
  }
  if (winX) {
    winningCombination.forEach((elemento) => {
      board[elemento].classList.add("winnerPossibility");
    });
    registerWin(player.player1);
    return `${namePlayer1} Venceu!`;
  } else if (winO) {
    winningCombination.forEach((elemento) => {
      board[elemento].classList.add("winnerPossibility");
    });
    registerWin(player.player2);
    return `${namePlayer2} Venceu!`;
  }

  const draw = board.every((n) => {
    return n.dataset.value !== "";
  });

  if (draw) {
    return "Empate";
  }
}

function resetRound() {
  board.forEach((column) => {
    column.dataset.value = "";
    column.textContent = "";
  });

  if (lastStartingPlayer === "player1") {
    playerCurrent.textContent = namePlayer2;
    sectionTicTacToe.dataset.currentPlayer = "player2";
    lastStartingPlayer = "player2";
  } else {
    playerCurrent.textContent = namePlayer1;
    sectionTicTacToe.dataset.currentPlayer = "player1";
    lastStartingPlayer = "player1";
  }
  gameOver = false;
}
