"use strict";

// Players
const Player = (playerNumber) => {
  let _avatar = "";
  const getPlayerNumber = () => {
    return playerNumber;
  };
  const setPlayerAvatar = (avatar) => {
    _avatar = avatar;
  };
  const getPlayerAvatar = () => {
    return _avatar;
  };

  return { getPlayerNumber, setPlayerAvatar, getPlayerAvatar };
};

// Gameboard
const gameBoard = (() => {
  const _board = ["", "", "", "", "", "", "", "", ""];
  const player1 = Player("player1");
  const player2 = Player("player2");
  let winnerIs = "";
  let _playerTurn = player1.getPlayerNumber();

  const _searchWinnerInArrayGameBoard = (number1, number2, number3) => {
    if (
      (_board[number1] != "") &
      (_board[number2] != "") &
      (_board[number3] != "")
    ) {
      if (
        (_board[number1] === _board[number2]) &
        (_board[number2] === _board[number3]) &
        (_board[number1] === _board[number3])
      ) {
        winnerIs = _board[number1];
        console.log(winnerIs);
      }
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
    setPlayerTurn("player1");
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
  const _gameModeChoiceContainer = document.querySelector(
    "#gameModeChoiceContainer"
  );
  const _soloButton = document.querySelector("#soloButton");
  const _multiButton = document.querySelector("#multiButton");
  const _multiplayerAvatarChoiceContainer = document.querySelector(
    "#multiplayerAvatarChoiceContainer"
  );
  const _avatarChoicesPlayer1 = document.querySelectorAll(
    ".avatarChoicePlayer1"
  );
  const _avatarChoicesPlayer2 = document.querySelectorAll(
    ".avatarChoicePlayer2"
  );
  const _confirmAvatarChoiceButton = document.querySelector(
    "#confirmAvatarChoiceButton"
  );
  const _gameContainer = document.querySelector("#gameContainer");
  const _replayButton = document.querySelector("#replayButton");

  const _updateGameBoardDisplay = (index) => {
    if (gameBoard.getBoardValues(index) === "player1") {
      const playerAvatar = document.createElement("img");
      playerAvatar.classList.add("avatarImage");
      switch (gameBoard.player1.getPlayerAvatar()) {
        case "knight":
          playerAvatar.setAttribute("src", "images/knight.png");
          break;
        case "wizard":
          playerAvatar.setAttribute("src", "images/wizard.png");
          break;
        case "bowman":
          playerAvatar.setAttribute("src", "images/bowman.png");
      }
      _boxes[index].appendChild(playerAvatar);
    } else if (gameBoard.getBoardValues(index) === "player2") {
      const playerAvatar = document.createElement("img");
      playerAvatar.classList.add("avatarImage");
      switch (gameBoard.player2.getPlayerAvatar()) {
        case "knight":
          playerAvatar.setAttribute("src", "images/knight.png");
          break;
        case "wizard":
          playerAvatar.setAttribute("src", "images/wizard.png");
          break;
        case "bowman":
          playerAvatar.setAttribute("src", "images/bowman.png");
      }
      _boxes[index].appendChild(playerAvatar);
    }
  };
  const _refreshGameBoardDisplay = () => {
    for (let i = 0; i < _boxes.length; i++) {
      if (_boxes[i].lastChild != null) {
        _boxes[i].lastChild.remove();
      }
    }
  };
  const _listenersSettings = () => {
    _multiButton.addEventListener("click", () => {
      _gameModeChoiceContainer.classList.add("notDisplay");
      _multiplayerAvatarChoiceContainer.classList.remove("notDisplay");
    });
    for (let i = 0; i < _avatarChoicesPlayer1.length; i++) {
      _avatarChoicesPlayer1[i].addEventListener("click", () => {
        if (
          _avatarChoicesPlayer1[i].dataset.avatar ===
          gameBoard.player2.getPlayerAvatar()
        ) {
          return;
        }
        for (let i = 0; i < _avatarChoicesPlayer1.length; i++) {
          _avatarChoicesPlayer1[i].classList.remove("selectedPlayer1");
          _avatarChoicesPlayer1[i].classList.add("notSelected");
        }
        _avatarChoicesPlayer1[i].classList.add("selectedPlayer1");
        _avatarChoicesPlayer1[i].classList.remove("notSelected");
        gameBoard.player1.setPlayerAvatar(
          _avatarChoicesPlayer1[i].dataset.avatar
        );
      });
    }
    for (let i = 0; i < _avatarChoicesPlayer2.length; i++) {
      _avatarChoicesPlayer2[i].addEventListener("click", () => {
        if (
          _avatarChoicesPlayer2[i].dataset.avatar ===
          gameBoard.player1.getPlayerAvatar()
        ) {
          return;
        }
        for (let i = 0; i < _avatarChoicesPlayer2.length; i++) {
          _avatarChoicesPlayer2[i].classList.remove("selectedPlayer2");
          _avatarChoicesPlayer2[i].classList.add("notSelected");
        }
        _avatarChoicesPlayer2[i].classList.add("selectedPlayer2");
        _avatarChoicesPlayer2[i].classList.remove("notSelected");
        gameBoard.player2.setPlayerAvatar(
          _avatarChoicesPlayer2[i].dataset.avatar
        );
      });
    }
    _confirmAvatarChoiceButton.addEventListener("click", () => {
      _multiplayerAvatarChoiceContainer.classList.add("notDisplay");
      _gameContainer.classList.remove("notDisplay");
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
        if (gameBoard.getPlayerTurn() === "player1") {
          gameBoard.setBoardValues(index, "player1");
          gameBoard.setPlayerTurn(gameBoard.player2.getPlayerNumber());
        } else {
          gameBoard.setBoardValues(index, "player2");
          gameBoard.setPlayerTurn(gameBoard.player1.getPlayerNumber());
        }
        _updateGameBoardDisplay(_boxes[i].dataset.index);

        gameBoard.checkForAWinner();
      });
    }
    _replayButton.addEventListener("click", () => {
      gameBoard.resetGame();
      _refreshGameBoardDisplay();
    });
  };
  _listenersSettings();
})();
