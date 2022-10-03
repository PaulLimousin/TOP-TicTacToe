"use strict";

// Players
const Player = (playerNumber) => {
  let _avatar = "";
  let _playerScore = 0;
  const getPlayerNumber = () => {
    return playerNumber;
  };
  const setPlayerAvatar = (avatar) => {
    _avatar = avatar;
  };
  const getPlayerAvatar = () => {
    return _avatar;
  };
  const setPlayerScore = (playerScore) => {
    _playerScore = playerScore;
  };
  const getPlayerScore = () => {
    return _playerScore;
  };

  return {
    getPlayerNumber,
    setPlayerAvatar,
    getPlayerAvatar,
    setPlayerScore,
    getPlayerScore,
  };
};

// Gameboard
const gameBoard = (() => {
  const player1 = Player("player1");
  const player2 = Player("player2");
  const _board = ["", "", "", "", "", "", "", "", ""];
  let _gameMode = "";
  let _iaDifficulty = "";
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
    _gameMode = "";
    _gameMode = mode;
  };
  const getGameMode = () => {
    return _gameMode;
  };
  const setIADifficulty = (difficulty) => {
    _iaDifficulty = difficulty;
  };
  const getIADifficulty = () => {
    return _iaDifficulty;
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
    checkForAWinner();
    if (getWInnerIs() != "") {
      setTimeout(displayController.displayWinnerContent, 200);
      setTimeout(updatePlayerScore, 200);
      setTimeout(displayController.updatePlayerScoreDisplay, 200);
    }
    setTimeout(() => {
      if (getWInnerIs() !== "") {
        return;
      }
      let _gameFinished = true;
      for (let i = 0; i < _board.length; i++) {
        if (_board[i] === "") {
          _gameFinished = false;
        }
      }
      if (_gameFinished === true) {
        return;
      }
      let computerChoice;
      switch (gameBoard.getIADifficulty()) {
        case "easy":
          computerChoice = computerEasyPlay();
          break;
        case "normal":
          computerChoice = computerNormalPlay();
          break;
        case "hard":
          computerChoice = computerHardPlay();
          break;
      }

      setBoardValues(computerChoice, "player2");
      setPlayerTurn(player1.getPlayerNumber());
      displayController.updateGameBoardDisplay(computerChoice);
      checkForAWinner();
      if (getWInnerIs() != "") {
        setTimeout(displayController.displayWinnerContent, 200);
        setTimeout(updatePlayerScore, 200);
        setTimeout(displayController.updatePlayerScoreDisplay, 200);
      }
    }, 500);
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
      setTimeout(updatePlayerScore, 200);
      setTimeout(displayController.updatePlayerScoreDisplay, 200);
    }
  };
  const computerEasyPlay = () => {
    let computerChoice;
    do {
      computerChoice = Math.floor(Math.random() * 9);
    } while (getBoardValues(computerChoice) !== "");
    return computerChoice;
  };
  const computerNormalPlay = () => {
    let computerChoice;

    // Défendre et attaquer
    // Ligne 1
    if (
      getBoardValues(0) === getBoardValues(1) &&
      getBoardValues(0) != "" &&
      getBoardValues(2) === ""
    ) {
      computerChoice = 2;
      return computerChoice;
    } else if (
      getBoardValues(1) === getBoardValues(2) &&
      getBoardValues(1) != "" &&
      getBoardValues(0) === ""
    ) {
      computerChoice = 0;
      return computerChoice;
    } else if (
      getBoardValues(0) === getBoardValues(2) &&
      getBoardValues(0) != "" &&
      getBoardValues(1) === ""
    ) {
      computerChoice = 1;
      return computerChoice;
    }
    // Ligne 2
    if (
      getBoardValues(3) === getBoardValues(4) &&
      getBoardValues(3) != "" &&
      getBoardValues(5) === ""
    ) {
      computerChoice = 5;
      return computerChoice;
    } else if (
      getBoardValues(4) === getBoardValues(5) &&
      getBoardValues(4) != "" &&
      getBoardValues(3) === ""
    ) {
      computerChoice = 3;
      return computerChoice;
    } else if (
      getBoardValues(3) === getBoardValues(5) &&
      getBoardValues(3) != "" &&
      getBoardValues(4) === ""
    ) {
      computerChoice = 4;
      return computerChoice;
    }
    // Ligne 3
    if (
      getBoardValues(6) === getBoardValues(7) &&
      getBoardValues(6) != "" &&
      getBoardValues(8) === ""
    ) {
      computerChoice = 8;
      return computerChoice;
    } else if (
      getBoardValues(7) === getBoardValues(8) &&
      getBoardValues(7) != "" &&
      getBoardValues(6) === ""
    ) {
      computerChoice = 6;
      return computerChoice;
    } else if (
      getBoardValues(6) === getBoardValues(8) &&
      getBoardValues(6) != "" &&
      getBoardValues(7) === ""
    ) {
      computerChoice = 7;
      return computerChoice;
    }
    // Colonne 1
    if (
      getBoardValues(0) === getBoardValues(3) &&
      getBoardValues(0) != "" &&
      getBoardValues(6) === ""
    ) {
      computerChoice = 6;
      return computerChoice;
    } else if (
      getBoardValues(3) === getBoardValues(6) &&
      getBoardValues(3) != "" &&
      getBoardValues(0) === ""
    ) {
      computerChoice = 0;
      return computerChoice;
    } else if (
      getBoardValues(0) === getBoardValues(6) &&
      getBoardValues(0) != "" &&
      getBoardValues(3) === ""
    ) {
      computerChoice = 3;
      return computerChoice;
    }
    // Colonne 2
    if (
      getBoardValues(1) === getBoardValues(4) &&
      getBoardValues(1) != "" &&
      getBoardValues(7) === ""
    ) {
      computerChoice = 7;
      return computerChoice;
    } else if (
      getBoardValues(1) === getBoardValues(7) &&
      getBoardValues(1) != "" &&
      getBoardValues(4) === ""
    ) {
      computerChoice = 4;
      return computerChoice;
    } else if (
      getBoardValues(4) === getBoardValues(7) &&
      getBoardValues(4) != "" &&
      getBoardValues(1) === ""
    ) {
      computerChoice = 1;
      return computerChoice;
    }
    // Colonne 3
    if (
      getBoardValues(2) === getBoardValues(5) &&
      getBoardValues(2) != "" &&
      getBoardValues(8) === ""
    ) {
      computerChoice = 8;
      return computerChoice;
    } else if (
      getBoardValues(2) === getBoardValues(8) &&
      getBoardValues(2) != "" &&
      getBoardValues(5) === ""
    ) {
      computerChoice = 5;
      return computerChoice;
    } else if (
      getBoardValues(5) === getBoardValues(8) &&
      getBoardValues(5) != "" &&
      getBoardValues(2) === ""
    ) {
      computerChoice = 2;
      return computerChoice;
    }
    // Diagonale 1
    if (
      getBoardValues(0) === getBoardValues(4) &&
      getBoardValues(0) != "" &&
      getBoardValues(8) === ""
    ) {
      computerChoice = 8;
      return computerChoice;
    } else if (
      getBoardValues(0) === getBoardValues(8) &&
      getBoardValues(0) != "" &&
      getBoardValues(4) === ""
    ) {
      computerChoice = 4;
      return computerChoice;
    } else if (
      getBoardValues(4) === getBoardValues(8) &&
      getBoardValues(4) != "" &&
      getBoardValues(0) === ""
    ) {
      computerChoice = 0;
      return computerChoice;
    }
    // Diagonale 2
    if (
      getBoardValues(2) === getBoardValues(4) &&
      getBoardValues(2) != "" &&
      getBoardValues(6) === ""
    ) {
      computerChoice = 6;
      return computerChoice;
    } else if (
      getBoardValues(2) === getBoardValues(6) &&
      getBoardValues(2) != "" &&
      getBoardValues(4) === ""
    ) {
      computerChoice = 4;
      return computerChoice;
    } else if (
      getBoardValues(4) === getBoardValues(6) &&
      getBoardValues(4) != "" &&
      getBoardValues(2) === ""
    ) {
      computerChoice = 2;
      return computerChoice;
    }

    // Mettre un pion au centre
    if (getBoardValues(4) === "") {
      computerChoice = 4;
      return computerChoice;
    }
    // Mettre un pion sur les cotés
    if (
      getBoardValues(0) === "" ||
      getBoardValues(2) === "" ||
      getBoardValues(6) === "" ||
      getBoardValues(8) === ""
    ) {
      do {
        let randomCornerChoice = Math.floor(Math.random() * 4);
        if (randomCornerChoice === 0) {
          computerChoice = 0;
        } else if (randomCornerChoice === 1) {
          computerChoice = 2;
        } else if (randomCornerChoice === 2) {
          computerChoice = 6;
        } else if (randomCornerChoice === 3) {
          computerChoice = 8;
        }
      } while (getBoardValues(computerChoice) !== "");
      return computerChoice;
    }

    // Dernière possibilité
    do {
      computerChoice = Math.floor(Math.random() * 9);
    } while (getBoardValues(computerChoice) !== "");
    return computerChoice;
  };
  const computerHardPlay = () => {};
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
  const updatePlayerScore = () => {
    if (_winnerIs === "player1") {
      let newScore = player1.getPlayerScore() + 1;
      player1.setPlayerScore(newScore);
    } else if (_winnerIs === "player2") {
      let newScore = player2.getPlayerScore() + 1;
      player2.setPlayerScore(newScore);
    }
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
    player1.setPlayerScore(0);
    player2.setPlayerScore(0);
    displayController.updatePlayerScoreDisplay();
    setGameMode("");
    setIADifficulty("");
  };
  return {
    player1,
    player2,
    setGameMode,
    getGameMode,
    setIADifficulty,
    getIADifficulty,
    getBoardValues,
    setBoardValues,
    getPlayerTurn,
    setPlayerTurn,
    getWinnerBoxes,
    playMultiplayerTurn,
    playSoloTurn,
    checkForAWinner,
    getWInnerIs,
    updatePlayerScore,
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
  const _iaDifficultyContainer = document.querySelector(
    "#iaDifficultyContainer"
  );
  const _easyButton = document.querySelector("#easyButton");
  const _normalButton = document.querySelector("#normalButton");
  const _hardButton = document.querySelector("#hardButton");
  const _confirmAvatarChoiceButton = document.querySelector(
    "#confirmAvatarChoiceButton"
  );
  const _gameContainer = document.querySelector("#gameContainer");
  const _player1ScoreContainer = document.querySelector(
    "#player1ScoreContainer"
  );
  const _player2ScoreContainer = document.querySelector(
    "#player2ScoreContainer"
  );
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
  const updatePlayerScoreDisplay = () => {
    _player1ScoreContainer.textContent = gameBoard.player1.getPlayerScore();
    _player2ScoreContainer.textContent = gameBoard.player2.getPlayerScore();
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
      _iaDifficultyContainer.classList.remove("notDisplay");
    });
    _multiButton.addEventListener("click", () => {
      gameBoard.setGameMode("multi");
      _multiButton.classList.remove("notSelected");
      _multiButton.classList.add("gameModeButtonSelected");
      _soloButton.classList.remove("gameModeButtonSelected");
      _soloButton.classList.add("notSelected");
      _iaDifficultyContainer.classList.add("notDisplay");
    });
    _easyButton.addEventListener("click", () => {
      gameBoard.setIADifficulty("easy");
      _easyButton.classList.remove("notSelected");
      _easyButton.classList.add("iaDifficultybuttonSelected");
      _normalButton.classList.remove("iaDifficultybuttonSelected");
      _normalButton.classList.add("notSelected");
      _hardButton.classList.remove("iaDifficultybuttonSelected");
      _hardButton.classList.add("notSelected");
    });
    _normalButton.addEventListener("click", () => {
      gameBoard.setIADifficulty("normal");
      _normalButton.classList.remove("notSelected");
      _normalButton.classList.add("iaDifficultybuttonSelected");
      _easyButton.classList.remove("iaDifficultybuttonSelected");
      _easyButton.classList.add("notSelected");
      _hardButton.classList.remove("iaDifficultybuttonSelected");
      _hardButton.classList.add("notSelected");
    });
    _hardButton.addEventListener("click", () => {
      gameBoard.setIADifficulty("hard");
      _hardButton.classList.remove("notSelected");
      _hardButton.classList.add("iaDifficultybuttonSelected");
      _easyButton.classList.remove("iaDifficultybuttonSelected");
      _easyButton.classList.add("notSelected");
      _normalButton.classList.remove("iaDifficultybuttonSelected");
      _normalButton.classList.add("notSelected");
    });
    _confirmAvatarChoiceButton.addEventListener("click", () => {
      if (
        gameBoard.player1.getPlayerAvatar() != "" &&
        gameBoard.player2.getPlayerAvatar() != "" &&
        gameBoard.getGameMode() != ""
      ) {
        if (
          gameBoard.getGameMode() === "solo" &&
          gameBoard.getIADifficulty() === ""
        ) {
          return;
        }
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
      _iaDifficultyContainer.classList.add("notDisplay");
      _easyButton.classList.remove("iaDifficultybuttonSelected");
      _easyButton.classList.remove("notSelected");
      _normalButton.classList.remove("iaDifficultybuttonSelected");
      _normalButton.classList.remove("notSelected");
      _hardButton.classList.remove("iaDifficultybuttonSelected");
      _hardButton.classList.remove("notSelected");
      _refreshGameBoardDisplay();
    });
  };
  _listenersSettings();
  return {
    getBoxes,
    updateGameBoardDisplay,
    displayWinnerContent,
    updatePlayerScoreDisplay,
  };
})();
