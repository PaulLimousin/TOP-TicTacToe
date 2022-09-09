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
  const player1 = Player("player1");
  const player2 = Player("player2");
  const _board = ["", "", "", "", "", "", "", "", ""];
  let _gameMode = "";
  let _winnerIs = "";
  let _winnerBoxes = [];
  let _playerTurn = player1.getPlayerNumber();

  const _setWinnerBoxes = (number1, number2, number3) => {
    _winnerBoxes.push(number1);
    _winnerBoxes.push(number2);
    _winnerBoxes.push(number3);
  };
  const getWinnerBoxes = () => {
    return _winnerBoxes;
  };
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
        _winnerIs = _board[number1];
        _setWinnerBoxes(number1, number2, number3);
      }
    }
  };
  const setGameMode = (mode) => {
    _gameMode = mode;
  };
  const getGameMode = () => {
    return _gameMode;
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
  const playSoloTurn = (i) => {
    if (
      getBoardValues(displayController.getBoxes()[i].dataset.index) !== "" ||
      getWInnerIs() !== ""
    ) {
      return;
    }
    let index = displayController.getBoxes()[i].dataset.index;
    setBoardValues(index, "player1");
    setPlayerTurn(player2.getPlayerNumber());
    displayController.updateGameBoardDisplay(
      displayController.getBoxes()[i].dataset.index
    );

    setTimeout(() => {
      let computerChoice = computerPlay();
      setBoardValues(computerChoice, "player2");
      setPlayerTurn(player1.getPlayerNumber());
      displayController.updateGameBoardDisplay(computerChoice);
      checkForAWinner();
      if (getWInnerIs() != "") {
        setTimeout(displayController.displayWinnerContent, 200);
      }
    }, 2000);
  };
  const playMultiplayerTurn = (i) => {
    if (
      getBoardValues(displayController.getBoxes()[i].dataset.index) !== "" ||
      getWInnerIs() !== ""
    ) {
      return;
    }
    let index = displayController.getBoxes()[i].dataset.index;
    if (getPlayerTurn() === "player1") {
      setBoardValues(index, "player1");
      setPlayerTurn(player2.getPlayerNumber());
    } else {
      setBoardValues(index, "player2");
      setPlayerTurn(player1.getPlayerNumber());
    }
    displayController.updateGameBoardDisplay(
      displayController.getBoxes()[i].dataset.index
    );
    checkForAWinner();
    if (getWInnerIs() != "") {
      setTimeout(displayController.displayWinnerContent, 200);
    }
  };
  const computerPlay = () => {
    return 0;
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
    return _winnerIs;
  };
  const getWInnerIs = () => {
    return _winnerIs;
  };
  const replayGame = () => {
    for (let i = 0; i < _board.length; i++) {
      _board[i] = "";
    }
    _winnerIs = "";
    _winnerBoxes = [];
    setPlayerTurn("player1");
  };
  const resetGame = () => {
    replayGame();
    player1.setPlayerAvatar("");
    player2.setPlayerAvatar("");
    setGameMode("");
  };
  return {
    player1,
    player2,
    setGameMode,
    getGameMode,
    getBoardValues,
    setBoardValues,
    getPlayerTurn,
    setPlayerTurn,
    getWinnerBoxes,
    playMultiplayerTurn,
    playSoloTurn,
    checkForAWinner,
    getWInnerIs,
    replayGame,
    resetGame,
  };
})();

// Display Controller
const displayController = (() => {
  const _boxes = document.querySelectorAll(".box");
  const _avatarSelectionContainer = document.querySelector(
    ".avatarSelectionContainer"
  );
  const _avatarChoicesPlayer1 = document.querySelectorAll(
    ".avatarChoicePlayer1"
  );
  const _avatarChoicesPlayer2 = document.querySelectorAll(
    ".avatarChoicePlayer2"
  );
  const _soloButton = document.querySelector("#soloButton");
  const _multiButton = document.querySelector("#multiButton");
  const _confirmAvatarChoiceButton = document.querySelector(
    "#confirmAvatarChoiceButton"
  );
  const _gameContainer = document.querySelector("#gameContainer");
  const _replayButton = document.querySelector("#replayButton");
  const _resetButton = document.querySelector("#_resetButton");

  const getBoxes = () => {
    return _boxes;
  };
  const updateGameBoardDisplay = (index) => {
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

  const displayWinnerContent = () => {
    let winnerBoxes = gameBoard.getWinnerBoxes();
    for (let i = 0; i < 3; i++) {
      _boxes[winnerBoxes[i]].lastChild.classList.add("winImage");
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
    _soloButton.addEventListener("click", () => {
      gameBoard.setGameMode("solo");
      _soloButton.classList.remove("notSelected");
      _soloButton.classList.add("gameModeButtonSelected");
      _multiButton.classList.remove("gameModeButtonSelected");
      _multiButton.classList.add("notSelected");
    });
    _multiButton.addEventListener("click", () => {
      gameBoard.setGameMode("multi");
      _multiButton.classList.remove("notSelected");
      _multiButton.classList.add("gameModeButtonSelected");
      _soloButton.classList.remove("gameModeButtonSelected");
      _soloButton.classList.add("notSelected");
    });
    _confirmAvatarChoiceButton.addEventListener("click", () => {
      if (
        gameBoard.player1.getPlayerAvatar() != "" &&
        gameBoard.player2.getPlayerAvatar() != "" &&
        gameBoard.getGameMode() != ""
      ) {
        _avatarSelectionContainer.classList.add("notDisplay");
        _gameContainer.classList.remove("notDisplay");
      }
    });
    for (let i = 0; i < _boxes.length; i++) {
      _boxes[i].addEventListener("click", () => {
        if (gameBoard.getGameMode() === "solo") {
          if (gameBoard.getPlayerTurn() === "player2") {
            return;
          }
          gameBoard.playSoloTurn(i);
        } else if (gameBoard.getGameMode() === "multi") {
          gameBoard.playMultiplayerTurn(i);
        }
      });
    }
    _replayButton.addEventListener("click", () => {
      gameBoard.replayGame();
      _refreshGameBoardDisplay();
    });
    _resetButton.addEventListener("click", () => {
      gameBoard.resetGame();
      _gameContainer.classList.add("notDisplay");
      _avatarSelectionContainer.classList.remove("notDisplay");
      for (let i = 0; i < _avatarChoicesPlayer1.length; i++) {
        _avatarChoicesPlayer1[i].classList.remove("selectedPlayer1");
        _avatarChoicesPlayer1[i].classList.remove("notSelected");
      }
      for (let i = 0; i < _avatarChoicesPlayer2.length; i++) {
        _avatarChoicesPlayer2[i].classList.remove("selectedPlayer2");
        _avatarChoicesPlayer2[i].classList.remove("notSelected");
      }
      _soloButton.classList.remove("notSelected");
      _soloButton.classList.remove("gameModeButtonSelected");
      _multiButton.classList.remove("gameModeButtonSelected");
      _multiButton.classList.remove("notSelected");
      _refreshGameBoardDisplay();
    });
  };
  _listenersSettings();
  return { getBoxes, updateGameBoardDisplay, displayWinnerContent };
})();
