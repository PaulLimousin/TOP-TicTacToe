"use strict";

// Players
const Player = (sign) => {
  const getSign = () => {
    return sign;
  };
  return { getSign };
};

// Gameboard
const gameBoard = (() => {
  const _board = ["", "", "", "", "", "", "", "", ""];
  const player1 = Player("x");
  const player2 = Player("o");
  let winnerIs = "";
  let _playerTurn = player1.getSign();

  const _searchWinnerInArrayGameBoard = (number1, number2, number3) => {
    if (
      (_board[number1] === _board[number2]) &
      (_board[number2] === _board[number3]) &
      (_board[number1] === _board[number3])
    ) {
      winnerIs = _board[number1];
    }
  };

  const getBoardValues = (index) => {
    return _board[index];
  };
  const setBoardValues = (index, value) => {
    _board[index] = value;
  };
  const getPlayerTurn = () => {
    return _playerTurn;
  };
  const setPlayerTurn = (player) => {
    _playerTurn = player;
  };
  const checkForAWinner = () => {
    _searchWinnerInArrayGameBoard(0, 1, 2);
    _searchWinnerInArrayGameBoard(3, 4, 5);
    _searchWinnerInArrayGameBoard(6, 7, 8);
    _searchWinnerInArrayGameBoard(0, 3, 6);
    _searchWinnerInArrayGameBoard(1, 4, 7);
    _searchWinnerInArrayGameBoard(2, 5, 8);
    _searchWinnerInArrayGameBoard(0, 4, 8);
    _searchWinnerInArrayGameBoard(2, 4, 6);
    return winnerIs;
  };
  const getWInnerIs = () => {
    return winnerIs;
  };
  const resetGame = () => {
    for (let i = 0; i < _board.length; i++) {
      _board[i] = "";
      winnerIs = "";
    }
  };
  return {
    player1,
    player2,
    getBoardValues,
    setBoardValues,
    getPlayerTurn,
    setPlayerTurn,
    checkForAWinner,
    getWInnerIs,
    resetGame,
  };
})();

// Display Controller
const displayController = (() => {
  const _boxes = document.querySelectorAll(".box");
  const replayButton = document.querySelector("#replayButton");
  const introContainer = document.querySelector("#introContainer");
  const soloButton = document.querySelector("#soloButton");
  const multiButton = document.querySelector("#multiButton");
  const gameContainer = document.querySelector("#gameContainer");

  const _displayMultiGameBoard = () => {
    introContainer.classList.add("notDisplay");
    gameContainer.classList.remove("notDisplay");
  };
  const _updateGameBoardDisplay = () => {
    for (let i = 0; i < _boxes.length; i++) {
      _boxes[i].textContent = gameBoard.getBoardValues(i);
    }
  };

  multiButton.addEventListener("click", () => {
    _displayMultiGameBoard();
  });
  for (let i = 0; i < _boxes.length; i++) {
    _boxes[i].addEventListener("click", () => {
      if (
        gameBoard.getBoardValues(_boxes[i].dataset.index) !== "" ||
        gameBoard.getWInnerIs() !== ""
      ) {
        return;
      }
      let index = _boxes[i].dataset.index;
      if (gameBoard.getPlayerTurn() === "x") {
        gameBoard.setBoardValues(index, "x");
        gameBoard.setPlayerTurn(gameBoard.player2.getSign());
      } else {
        gameBoard.setBoardValues(index, "o");
        gameBoard.setPlayerTurn(gameBoard.player1.getSign());
      }
      _updateGameBoardDisplay();
      console.log(gameBoard.checkForAWinner());
    });
  }
  replayButton.addEventListener("click", () => {
    gameBoard.resetGame();
    _updateGameBoardDisplay();
  });
})();
