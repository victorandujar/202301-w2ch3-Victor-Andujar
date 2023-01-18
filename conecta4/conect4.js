const turnSeconds = document.querySelector(".seconds");
const gameTime = document.querySelector(".timer");
const playButton = document.querySelector(".play-game");
const endGameButton = document.querySelector(".end-game");
const playAgainButton = document.querySelector(".play-again");
const colorTurn = document.querySelector(".circle-turn");
const player = document.querySelector(".player-playing");
const winnerPlayer = document.querySelector(".winner-text");
const settings = document.querySelector(".settings");
const gameVsIa = document.querySelector(".vsIA");
const onevone = document.querySelector(".onevone");
const acceptButton = document.querySelector('.accept-button')
const welcomeSection = document.querySelector('.welcome')
const gameSection = document.querySelector('.game')

player.textContent = "";
winnerPlayer.textContent = "";
turnSeconds.textContent = 5;
gameTime.textContent = 60;

let timer;
let timerTurn;
let boardCircles;
let player1;
let player2;
let counterTurns = 0;
let position;
let managerCpuCircles = 0;

let gameOver = false;
let board = [];

const rows = 6;
const columns = 7;
let getColumn;
let getRow;
let getColumnAndRow;
let getRowCpu;
let getColumnCpu;
let checkRowTurn;
let checkColumnTurn;

let circleBelowCoordinates
let circleBelowId
let targetCircle
let getId
let circleBelowCheck

const setBoard = () => {
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let y = 0; y < columns; y++) {
      let circle = document.createElement("div");
      circle.id = `${i.toString()}-${y.toString()}`;
      circle.classList.add("circle");
      circle.classList.add("not-pressed");
      document.querySelector(".board-composition").append(circle);
      boardCircles = document.querySelectorAll(".circle");
      row.push(circle);
    }
    board.push(row);
  }
};

acceptButton.onclick = () => {
  welcomeSection.className = 'welcome hidden'
  gameSection.className = 'game'
}

settings.onclick = () => {
  gameVsIa.className = "vsIA";
  onevone.className = "onevone";
};


gameVsIa.onclick = () => {
  player1 = "Player 1";
  player2 = "CPU";
  gameVsIa.className = "vsIa hidden";
  onevone.className = "onevone hidden";
};

onevone.onclick = () => {
  player1 = "Player 1";
  player2 = "Player 2";
  gameVsIa.className = "vsIa hidden";
  onevone.className = "onevone hidden";
};

playButton.onclick = () => {
  if (player1 === undefined && player2 === undefined) {
    player1 = 'Player 1'
    player2 = 'CPU'
  };
  endGameButton.className = "end-game";
  playButton.className = "play-game hidden";
  settings.className = "settings hidden";
  gameVsIa.className = "vsIa hidden";
  onevone.className = "onevone hidden";
  player.textContent = player1;
  turnColor();
  gameTimer();
  turnTimer();
  gameManager()
};

endGameButton.onclick = () => {
  clearInterval(timer);
  clearInterval(timerTurn);
  endGameButton.className = "end-game hidden";
  playAgainButton.className = "play-again";
  winnerPlayer.textContent = "It's a tie noobs!";
  gameOver = true
  player.textContent = "";
  colorTurn.className = "circle-turn not-pressed";
};

playAgainButton.onclick = () => {
  gameTime.textContent = 60;
  playButton.className = "play-game";
  settings.className = "settings"
  playAgainButton.className = "play-again hidden";
  player.textContent = "";
  winnerPlayer.textContent = "";
  gameOver = false;
  colorTurn.className = "circle-turn not-pressed";
  turnSeconds.textContent = 5;
  for (let i in boardCircles) {
    boardCircles[i].className = "circle not-pressed";
  }
};

const turnColor = () => {
  if (gameOver) return
  if (player.textContent === player1) colorTurn.className = "circle-turn player1";
  if (player.textContent === player2) colorTurn.className = "circle-turn player2";
};

const gameTimer = () => {
  let setTimer = 59;
  timer = setInterval(() => {
    gameTime.textContent = setTimer;
    if (setTimer === 0) {
      gameOver = true
      clearInterval(timer);
      clearInterval(timerTurn);
      endGameButton.className = "end-game hidden";
      playAgainButton.className = "play-again";
      winnerPlayer.textContent = "It's a tie noobs!";
      player.textContent = ""
      colorTurn.className = "circle-turn not-pressed"
    }
    setTimer--;
  }, 1000);
  return timer;
};

const turnTimer = () => {
  let setTimer = 4;
  timerTurn = setInterval(() => {
    if (gameOver) {
      clearInterval(timerTurn)
      return
    }
    turnSeconds.textContent = setTimer;
    if (setTimer === 0) {
      if (player.textContent === player1 && player2 === 'CPU') {
        player.textContent = player2;
        turnSeconds.textContent = 5
        turnColor();
        playerVsCpu()
      }
      if (player.textContent === player1 && player2 === 'Player 2') {
        player.textContent = player2;
        turnColor();
        turnSeconds.textContent = 5
      }
      else if (player.textContent === player2 && player2 === 'Player 2') {
        player.textContent = player1;
        turnSeconds.textContent = 5
        turnColor();
      }
      managerCpuCircles = 0
      clearInterval(timerTurn);
      turnTimer();
    }
    setTimer--;
  }, 1000);
  return timerTurn;
};

const playerVsPlayer = () => {
  for (let i in boardCircles) {
    boardCircles[i].onclick = () => {
      if (gameOver) return;
      const coordinates = boardCircles[i].id.split("-");
      getRow = parseInt(coordinates[0]);
      getColumn = parseInt(coordinates[1]);

      getColumnAndRow = Array.from(boardCircles);
      const buttonsManagerColumn = getColumnAndRow.filter(
        (circle) =>
          circle.id.includes(`-${getColumn}`) &&
          circle.className === "circle not-pressed"
      );

      if (
        boardCircles[i].className === "circle player1" ||
        boardCircles[i].className === "circle player2"
      )
        return;

      if (player.textContent === "Player 1") {
        buttonsManagerColumn[buttonsManagerColumn.length - 1].className =
          "circle player1";
        const newCoordinates =
          buttonsManagerColumn[buttonsManagerColumn.length - 1].id.split("-");
        getRow = parseInt(newCoordinates[0]);
        player.textContent = "Player 2";
        clearInterval(timerTurn);
        turnSeconds.textContent = 5;
        turnColor();
        turnTimer();
        verticalCheck();
        horizontalCheck();
        diagonalUpToDownCheck();
        diagonalDownToUpCheck();
        counterTurns++;
        return;
      }
      if (player.textContent === "Player 2") {
        buttonsManagerColumn[buttonsManagerColumn.length - 1].className =
          "circle player2";
        const newCoordinates =
          buttonsManagerColumn[buttonsManagerColumn.length - 1].id.split("-");
        getRow = parseInt(newCoordinates[0]);
        player.textContent = "Player 1";
        clearInterval(timerTurn);
        turnSeconds.textContent = 5;
        turnColor();
        turnTimer();
        verticalCheck();
        horizontalCheck();
        diagonalUpToDownCheck();
        diagonalDownToUpCheck();
        counterTurns++;
        return;
      }
      if (counterTurns === 42) {
        clearInterval(timer);
        clearInterval(timerTurn);
        endGameButton.className = "end-game hidden";
        playAgainButton.className = "play-again";
        winnerPlayer.textContent = "It's a tie noobs!";
        player.textContent = ""
        colorTurn.className = "circle-turn not-pressed"
      }
    };
  }
};

const playerVsCpu = () => {
  for (let i in boardCircles) {
    if (gameOver) return;
    boardCircles[i].onclick = () => {
      managerCpuCircles = 0
      if (player.textContent === "Player 1") {
        const coordinates = boardCircles[i].id.split("-");
        getRow = +coordinates[0];
        getColumn = +coordinates[1];

        getColumnAndRow = Array.from(boardCircles);
        const buttonsManagerColumn = getColumnAndRow.filter(
          (circle) =>
            circle.id.includes(`-${getColumn}`) &&
            circle.className === "circle not-pressed"
        );

        if (boardCircles[i].className === "circle player1" ||
          boardCircles[i].className === "circle player2") return;

        buttonsManagerColumn[buttonsManagerColumn.length - 1].className = "circle player1";
        const newCoordinates = buttonsManagerColumn[buttonsManagerColumn.length - 1].id.split("-");
        getRow = parseInt(newCoordinates[0]);
        player.textContent = "CPU";
        clearInterval(timerTurn);
        turnSeconds.textContent = 5;
        turnColor();
        turnTimer();
        verticalCheck();
        horizontalCheck();
        diagonalUpToDownCheck();
        diagonalDownToUpCheck();
        playerVsCpu()
        counterTurns++;
      }
    }

    if (player.textContent === "CPU") {
      managerCpuCircles = 0
      if (gameOver) return;
      getColumnAndRow = Array.from(boardCircles);
      setTimeout(() => checkPlayer2WinPossibility(), 2000)
      setTimeout(() => checkPlayer1WinPossibility(), 2100)
      setTimeout(() => cpuRandomTurn(), 2200)
      setTimeout(() => turnTimer(), 2300);
      setTimeout(() => turnPlayerDisplayManagerForCpu(), 2300);
      setTimeout(() => clearInterval(timerTurn), 2200);
      setTimeout(() => turnColor(), 2300);
      setTimeout(() => verticalCheckCpu(), 2300);
      setTimeout(() => horizontalCheckCpu(), 2300);
      setTimeout(() => diagonalUpToDownCheck(), 2300)
      setTimeout(() => diagonalDownToUpCheck(), 2300)
      counterTurns++;
      return;
    }
  }
};

const turnPlayerDisplayManagerForCpu = () => {
  if (gameOver) return
  player.textContent = 'Player 1'
  turnSeconds.textContent = 5
}

const getRandomCircle = () => {
  do {
    let getRandomNumber = Math.floor(Math.random() * 42)
    position = getColumnAndRow.find((circle, index) => {
      if (index === getRandomNumber) {
        return circle.className === "circle not-pressed";
      }
    });
  }
  while (position === undefined)
}

const cpuRandomTurn = () => {
  if (managerCpuCircles === 1) return
  if (gameOver) return
  getRandomCircle()
  const coordinates = position.id.split("-");
  getRowCpu = +coordinates[0];
  getColumnCpu = +coordinates[1];

  const buttonsManagerColumn = getColumnAndRow.filter(
    (circle) => circle.id.includes(`-${getColumnCpu}`) &&
      circle.className === "circle not-pressed"
  );
  buttonsManagerColumn[buttonsManagerColumn.length - 1].className = "circle player2";
  const newCoordinates = buttonsManagerColumn[buttonsManagerColumn.length - 1].id.split("-");
  getRowCpu = +newCoordinates[0];
}

const checkTargetCircleCpuTurn = () => {
  if (managerCpuCircles === 1) return
  getId = targetCircle.id.split('-')
  checkRowTurn = +getId[0];
  checkColumnTurn = +getId[1];
  circleBelowCoordinates = [[checkRowTurn + 1], [checkColumnTurn]]
  circleBelowId = circleBelowCoordinates.join('-')
  if (targetCircle.className !== 'circle not-pressed') return
  circleBelowCheck = getColumnAndRow.find((circle) => {
    return circle.id === circleBelowId
  })
  if (checkRowTurn === 5) {
    targetCircle.className = "circle player2"
    managerCpuCircles = 1
    getRowCpu = +getId[0]
    getColumnCpu = +getId[1]
    return
  }
  else if (circleBelowCheck.className !== 'circle not-pressed') {
    targetCircle.className = "circle player2"
    managerCpuCircles = 1
    getRowCpu = +getId[0]
    getColumnCpu = +getId[1]
    return
  }
}

const checkTargetCirclePossibleWinCpuTurn = () => {
  if (managerCpuCircles === 1) return
  getId = targetCircle.id.split('-')
  getRowCpu = +getId[0];
  getColumnCpu = +getId[1];
  circleBelowCoordinates = [[getRowCpu + 1], [getColumnCpu]]
  circleBelowId = circleBelowCoordinates.join('-')
  if (targetCircle.className !== 'circle not-pressed') return
  circleBelowCheck = getColumnAndRow.find((circle) => {
    return circle.id === circleBelowId
  })
  if (getRowCpu === 5) {
    targetCircle.className = "circle player2"
    managerCpuCircles = 1
    return
  }
  else if (circleBelowCheck.className !== 'circle not-pressed') {
    targetCircle.className = "circle player2"
    managerCpuCircles = 1
    return
  }
}

const checkPlayer1WinPossibility = () => {
  if (managerCpuCircles === 1) return
  if (gameOver) return
  const checkColumn = getColumnAndRow.filter((circle) =>
    circle.id.includes(`-${getColumn}`)
  );

  for (let i = checkColumn.length - 1; i >= 0; i--) {
    if (checkColumn[i].className === "circle player1" &&
      checkColumn[(+i) - 1] &&
      checkColumn[(+i) - 1].className === "circle player1" &&
      checkColumn[(+i) - 2] &&
      checkColumn[(+i) - 2].className === "circle player1" &&
      checkColumn[(+i) - 3]) {
      if (checkColumn[(+i) - 3].className !== 'circle not-pressed') return
      checkColumn[(+i) - 3].className = "circle player2"
      managerCpuCircles = 1
      getId = checkColumn[(+i) - 3].id.split('-')
      getRowCpu = +getId[0];
      getColumnCpu = +getId[1];
      return
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].className === "circle player1" &&
        board[i][j + 1] &&
        board[i][j + 1].className === "circle player1" &&
        board[i][j + 2] &&
        board[i][j + 2].className === "circle player1" &&
        board[i][j + 3]) {
        targetCircle = board[i][j + 3]
        checkTargetCircleCpuTurn()
      }
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = board[i].length - 1; j >= 0; j--) {
      if (board[i][j].className === "circle player1" &&
        board[i][j - 1] &&
        board[i][j - 1].className === "circle player1" &&
        board[i][j - 2] &&
        board[i][j - 2].className === "circle player1" &&
        board[i][j - 3]) {
        targetCircle = board[i][j - 3]
        checkTargetCircleCpuTurn()
      }
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].className === "circle player1" &&
        board[i][j + 1] &&
        board[i][j + 1].className === "circle player1" &&
        board[i][j + 2] &&
        board[i][j + 3] &&
        board[i][j + 3].className === "circle player1") {
        targetCircle = board[i][j + 2]
        checkTargetCircleCpuTurn()
      }
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = board[i].length - 1; j >= 0; j--) {
      if (board[i][j].className === "circle player1" &&
        board[i][j - 1] &&
        board[i][j - 1].className === "circle player1" &&
        board[i][j - 2] &&
        board[i][j - 3] &&
        board[i][j - 3].className === "circle player1") {
        targetCircle = board[i][j - 2]
        checkTargetCircleCpuTurn()
      }
    }
  }
  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = board[i].length - 1; j >= 0; j--) {
      if (board[i][j].className === "circle player1" &&
        board[i - 1] &&
        board[i - 1][j - 1] &&
        board[i - 1][j - 1].className === "circle player1" &&
        board[i - 2] &&
        board[i - 2][j - 2] &&
        board[i - 2][j - 2].className === "circle player1" &&
        board[i - 3] && board[i - 3][j - 3]) {
        if (managerCpuCircles === 1) return
        targetCircle = board[i - 3][j - 3]
        getId = targetCircle.id.split('-')
        checkRowTurn = +getId[0];
        checkColumnTurn = +getId[1];
        circleBelowCoordinates = [[checkRowTurn + 1], [checkColumnTurn]]
        circleBelowId = circleBelowCoordinates.join('-')
        if (targetCircle.className !== 'circle not-pressed') return
        circleBelowCheck = getColumnAndRow.find((circle) => {
          return circle.id === circleBelowId
        })
        if (circleBelowCheck.className !== 'circle not-pressed') {
          targetCircle.className = "circle player2"
          managerCpuCircles = 1
          getRowCpu = +getId[0]
          getColumnCpu = +getId[1]
          return
        }
      }
      if (board[i][j].className === "circle not-pressed" &&
        board[i - 1] &&
        board[i - 1][j - 1] &&
        board[i - 1][j - 1].className === "circle player1" &&
        board[i - 2] &&
        board[i - 2][j - 2] &&
        board[i - 2][j - 2].className === "circle player1" &&
        board[i - 3] && board[i - 3][j - 3] &&
        board[i - 3][j - 3].className === "circle player1") {
        targetCircle = board[i][j]
        getId = targetCircle.id.split('-')
        checkRowTurn = +getId[0];
        checkColumnTurn = +getId[1];
        circleBelowCoordinates = [[checkRowTurn + 1], [checkColumnTurn]]
        circleBelowId = circleBelowCoordinates.join('-')
        if (targetCircle.className !== 'circle not-pressed') return
        circleBelowCheck = getColumnAndRow.find((circle) => {
          return circle.id === circleBelowId
        })
        if (checkRowTurn === 5) {
          targetCircle.className = "circle player2"
          managerCpuCircles = 1
          getRowCpu = +getId[0]
          getColumnCpu = +getId[1]
          return
        }
        else if (circleBelowCheck.className !== 'circle not-pressed') {
          targetCircle.className = "circle player2"
          managerCpuCircles = 1
          getRowCpu = +getId[0]
          getColumnCpu = +getId[1]
          return
        }
      }
    }
  }
  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].className === "circle player1" &&
        board[i - 1] &&
        board[i - 1][j + 1] &&
        board[i - 1][j + 1].className === "circle player1" &&
        board[i - 2] &&
        board[i - 2][j + 2] &&
        board[i - 2][j + 2].className === "circle player1" &&
        board[i - 3] && board[i - 3][j + 3]) {
        if (managerCpuCircles === 1) return
        targetCircle = board[i - 3][j + 3]
        getId = targetCircle.id.split('-')
        checkRowTurn = +getId[0];
        checkColumnTurn = +getId[1];
        circleBelowCoordinates = [[checkRowTurn + 1], [checkColumnTurn]]
        circleBelowId = circleBelowCoordinates.join('-')
        if (targetCircle.className !== 'circle not-pressed') return
        circleBelowCheck = getColumnAndRow.find((circle) => {
          return circle.id === circleBelowId
        })
        if (circleBelowCheck.className !== 'circle not-pressed') {
          targetCircle.className = "circle player2"
          managerCpuCircles = 1
          getRowCpu = +getId[0]
          getColumnCpu = +getId[1]
          return
        }
      }
      if (board[i][j].className === "circle not-pressed" &&
        board[i - 1] &&
        board[i - 1][j + 1] &&
        board[i - 1][j + 1].className === "circle player1" &&
        board[i - 2] &&
        board[i - 2][j + 2] &&
        board[i - 2][j + 2].className === "circle player1" &&
        board[i - 3] && board[i - 3][j + 3] &&
        board[i - 3][j + 3].className === "circle player1") {
        targetCircle = board[i][j]
        getId = targetCircle.id.split('-')
        checkRowTurn = +getId[0];
        checkColumnTurn = +getId[1];
        circleBelowCoordinates = [[checkRowTurn + 1], [checkColumnTurn]]
        circleBelowId = circleBelowCoordinates.join('-')
        if (targetCircle.className !== 'circle not-pressed') return
        circleBelowCheck = getColumnAndRow.find((circle) => {
          return circle.id === circleBelowId
        })
        if (checkRowTurn === 5) {
          targetCircle.className = "circle player2"
          managerCpuCircles = 1
          getRowCpu = +getId[0]
          getColumnCpu = +getId[1]
          return
        }
        else if (circleBelowCheck.className !== 'circle not-pressed') {
          targetCircle.className = "circle player2"
          managerCpuCircles = 1
          getRowCpu = +getId[0]
          getColumnCpu = +getId[1]
          return
        }
      }
    }
  }
}

const checkPlayer2WinPossibility = () => {
  if (gameOver) return
  const checkColumn = getColumnAndRow.filter((circle) =>
    circle.id.includes(`-${getColumnCpu}`)
  );

  for (let i = checkColumn.length - 1; i >= 0; i--) {
    if (managerCpuCircles === 1) return
    if (checkColumn[i].className === "circle player2" &&
      checkColumn[(+i) - 1] &&
      checkColumn[(+i) - 1].className === "circle player2" &&
      checkColumn[(+i) - 2] &&
      checkColumn[(+i) - 2].className === "circle player2" &&
      checkColumn[(+i) - 3]) {
      if (checkColumn[(+i) - 3].className !== 'circle not-pressed') return
      checkColumn[(+i) - 3].className = "circle player2"
      managerCpuCircles = 1
      getId = checkColumn[(+i) - 3].id.split('-')
      getRowCpu = +getId[0];
      getColumnCpu = +getId[1];
      return
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].className === "circle player2" &&
        board[i][j + 1] &&
        board[i][j + 1].className === "circle player2" &&
        board[i][j + 2] &&
        board[i][j + 2].className === "circle player2" &&
        board[i][j + 3]) {
        targetCircle = board[i][j + 3]
        checkTargetCirclePossibleWinCpuTurn()
      }
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = board[i].length - 1; j >= 0; j--) {
      if (board[i][j].className === "circle player2" &&
        board[i][j - 1] &&
        board[i][j - 1].className === "circle player2" &&
        board[i][j - 2] &&
        board[i][j - 2].className === "circle player2" &&
        board[i][j - 3]) {
        targetCircle = board[i][j - 3]
        checkTargetCirclePossibleWinCpuTurn()
      }
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].className === "circle player2" &&
        board[i][j + 1] &&
        board[i][j + 1].className === "circle player2" &&
        board[i][j + 2] &&
        board[i][j + 3] &&
        board[i][j + 3].className === "circle player2") {
        targetCircle = board[i][j + 2]
        checkTargetCirclePossibleWinCpuTurn()
      }
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = board[i].length - 1; j >= 0; j--) {
      if (board[i][j].className === "circle player2" &&
        board[i][j - 1] &&
        board[i][j - 1].className === "circle player2" &&
        board[i][j - 2] &&
        board[i][j - 3] &&
        board[i][j - 3].className === "circle player2") {
        targetCircle = board[i][j - 2]
        checkTargetCirclePossibleWinCpuTurn()
      }
    }
  }
  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = board[i].length - 1; j >= 0; j--) {
      if (board[i][j].className === "circle player2" &&
        board[i - 1] &&
        board[i - 1][j - 1] &&
        board[i - 1][j - 1].className === "circle player2" &&
        board[i - 2] &&
        board[i - 2][j - 2] &&
        board[i - 2][j - 2].className === "circle player2" &&
        board[i - 3] && board[i - 3][j - 3]) {
        if (managerCpuCircles === 1) return
        targetCircle = board[i - 3][j - 3]
        getId = targetCircle.id.split('-')
        getRowCpu = +getId[0];
        getColumnCpu = +getId[1];
        circleBelowCoordinates = [[getRowCpu + 1], [getColumnCpu]]
        circleBelowId = circleBelowCoordinates.join('-')
        circleBelowCheck = getColumnAndRow.find((circle) => {
          return circle.id === circleBelowId
        })
        if (board[i - 3][j - 3].className !== 'circle not-pressed') return
        if (circleBelowCheck.className !== 'circle not-pressed') {
          targetCircle.className = "circle player2"
          managerCpuCircles = 1
          return
        }
      }
      if (board[i][j].className === "circle not-pressed" &&
        board[i - 1] &&
        board[i - 1][j - 1] &&
        board[i - 1][j - 1].className === "circle player2" &&
        board[i - 2] &&
        board[i - 2][j - 2] &&
        board[i - 2][j - 2].className === "circle player2" &&
        board[i - 3] && board[i - 3][j - 3] &&
        board[i - 3][j - 3].className === "circle player2") {
        targetCircle = board[i][j]
        getId = targetCircle.id.split('-')
        getRowCpu = +getId[0];
        getColumnCpu = +getId[1];
        circleBelowCoordinates = [[getRowCpu + 1], [getColumnCpu]]
        circleBelowId = circleBelowCoordinates.join('-')
        circleBelowCheck = getColumnAndRow.find((circle) => {
          return circle.id === circleBelowId
        })
        if (getRowCpu === 5) {
          targetCircle.className = "circle player2"
          managerCpuCircles = 1
          return
        }
        else if (circleBelowCheck.className !== 'circle not-pressed') {
          targetCircle.className = "circle player2"
          managerCpuCircles = 1
          return
        }
      }
    }
  }
  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].className === "circle player2" &&
        board[i - 1] &&
        board[i - 1][j + 1] &&
        board[i - 1][j + 1].className === "circle player2" &&
        board[i - 2] &&
        board[i - 2][j + 2] &&
        board[i - 2][j + 2].className === "circle player2" &&
        board[i - 3] && board[i - 3][j + 3]) {
        if (managerCpuCircles === 1) return
        targetCircle = board[i - 3][j + 3]
        getId = targetCircle.id.split('-')
        getRowCpu = +getId[0];
        getColumnCpu = +getId[1];
        circleBelowCoordinates = [[getRowCpu + 1], [getColumnCpu]]
        circleBelowId = circleBelowCoordinates.join('-')
        circleBelowCheck = getColumnAndRow.find((circle) => {
          return circle.id === circleBelowId
        })
        if (board[i - 3][j + 3].className !== 'circle not-pressed') return
        if (circleBelowCheck.className !== 'circle not-pressed') {
          targetCircle.className = "circle player2"
          managerCpuCircles = 1
          return
        }
      }
      if (board[i][j].className === "circle not-pressed" &&
        board[i - 1] &&
        board[i - 1][j + 1] &&
        board[i - 1][j + 1].className === "circle player2" &&
        board[i - 2] &&
        board[i - 2][j + 2] &&
        board[i - 2][j + 2].className === "circle player2" &&
        board[i - 3] && board[i - 3][j + 3] &&
        board[i - 3][j + 3].className === "circle player2") {
        targetCircle = board[i][j]
        getId = targetCircle.id.split('-')
        getRowCpu = +getId[0];
        getColumnCpu = +getId[1];
        circleBelowCoordinates = [[getRowCpu + 1], [getColumnCpu]]
        circleBelowId = circleBelowCoordinates.join('-')
        circleBelowCheck = getColumnAndRow.find((circle) => {
          return circle.id === circleBelowId
        })
        if (getRowCpu === 5) {
          targetCircle.className = "circle player2"
          managerCpuCircles = 1
          return
        }
        else if (circleBelowCheck.className !== 'circle not-pressed') {
          targetCircle.className = "circle player2"
          managerCpuCircles = 1
          return
        }
      }
    }
  }
}

const verticalCheck = () => {
  const checkColumn = getColumnAndRow.filter((circle) =>
    circle.id.includes(`-${getColumn}`)
  );

  for (let i in checkColumn) {
    if (checkColumn[i].className === "circle player1" &&
      checkColumn[(+i) + 1] &&
      checkColumn[(+i) + 1].className === "circle player1" &&
      checkColumn[(+i) + 2] &&
      checkColumn[(+i) + 2].className === "circle player1" &&
      checkColumn[(+i) + 3] &&
      checkColumn[(+i) + 3].className === "circle player1") {

      gameOver = true;
      winnerPlayer.textContent = "Player 1 wins!";
      clearInterval(timer);
      clearInterval(timerTurn);
      endGameButton.className = "end-game hidden";
      playAgainButton.className = "play-again";
      player.textContent = "";
      colorTurn.className = "circle-turn not-pressed";
    }
  }
  for (let i in checkColumn) {
    if (checkColumn[i].className === "circle player2" &&
      checkColumn[(+i) + 1] &&
      checkColumn[(+i) + 1].className === "circle player2" &&
      checkColumn[(+i) + 2] &&
      checkColumn[(+i) + 2].className === "circle player2" &&
      checkColumn[(+i) + 3] &&
      checkColumn[(+i) + 3].className === "circle player2") {

      gameOver = true;
      winnerPlayer.textContent = "Player 2 wins!";
      clearInterval(timer);
      clearInterval(timerTurn);
      endGameButton.className = "end-game hidden";
      playAgainButton.className = "play-again";
      player.textContent = "";
      colorTurn.className = "circle-turn not-pressed";
    }
  }
};

const verticalCheckCpu = () => {
  const checkColumn = getColumnAndRow.filter((circle) =>
    circle.id.includes(`-${getColumnCpu}`)
  );

  for (let i in checkColumn) {
    if (checkColumn[i].className === "circle player2" &&
      checkColumn[(+i) + 1] &&
      checkColumn[(+i) + 1].className === "circle player2" &&
      checkColumn[(+i) + 2] &&
      checkColumn[(+i) + 2].className === "circle player2" &&
      checkColumn[(+i) + 3] &&
      checkColumn[(+i) + 3].className === "circle player2") {

      gameOver = true;
      winnerPlayer.textContent = "Cpu wins!";
      clearInterval(timer);
      clearInterval(timerTurn);
      endGameButton.className = "end-game hidden";
      playAgainButton.className = "play-again";
      player.textContent = "";
      colorTurn.className = "circle-turn not-pressed";
    }
  }
}

const horizontalCheck = () => {
  const checkRow = getColumnAndRow.filter((circle) =>
    circle.id.includes(`${getRow}-`)
  );

  for (let i in checkRow) {
    if (checkRow[i].className === "circle player1" &&
      checkRow[(+i) + 1] &&
      checkRow[(+i) + 1].className === "circle player1" &&
      checkRow[(+i) + 2] &&
      checkRow[(+i) + 2].className === "circle player1" &&
      checkRow[(+i) + 3] &&
      checkRow[(+i) + 3].className === "circle player1") {

      gameOver = true;
      winnerPlayer.textContent = "Player 1 wins!";
      clearInterval(timer);
      clearInterval(timerTurn);
      endGameButton.className = "end-game hidden";
      playAgainButton.className = "play-again";
      player.textContent = "";
      colorTurn.className = "circle-turn not-pressed";
    }
  }
  for (let i in checkRow) {
    if (checkRow[i].className === "circle player2" &&
      checkRow[(+i) + 1] &&
      checkRow[(+i) + 1].className === "circle player2" &&
      checkRow[(+i) + 2] &&
      checkRow[(+i) + 2].className === "circle player2" &&
      checkRow[(+i) + 3] &&
      checkRow[(+i) + 3].className === "circle player2") {

      gameOver = true;
      winnerPlayer.textContent = "Player 2 wins!";
      clearInterval(timer);
      endGameButton.className = "end-game hidden";
      playAgainButton.className = "play-again";
      player.textContent = "";
      colorTurn.className = "circle-turn not-pressed";
    }
  }
};

const horizontalCheckCpu = () => {
  const checkRow = getColumnAndRow.filter((circle) =>
    circle.id.includes(`${getRowCpu}-`)
  );
  for (let i in checkRow) {
    if (checkRow[i].className === "circle player2" &&
      checkRow[(+i) + 1] &&
      checkRow[(+i) + 1].className === "circle player2" &&
      checkRow[(+i) + 2] &&
      checkRow[(+i) + 2].className === "circle player2" &&
      checkRow[(+i) + 3] &&
      checkRow[(+i) + 3].className === "circle player2") {

      gameOver = true;
      winnerPlayer.textContent = "Cpu wins!";
      clearInterval(timer);
      endGameButton.className = "end-game hidden";
      playAgainButton.className = "play-again";
      player.textContent = "";
      colorTurn.className = "circle-turn not-pressed";
    }
  }
}

const diagonalUpToDownCheck = () => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].className === "circle player1" &&
        board[i + 1] &&
        board[i + 1][j + 1] &&
        board[i + 1][j + 1].className === "circle player1" &&
        board[i + 2] &&
        board[i + 2][j + 2] &&
        board[i + 2][j + 2].className === "circle player1" &&
        board[i + 3] &&
        board[i + 3][j + 3] &&
        board[i + 3][j + 3].className === "circle player1") {

        gameOver = true;
        winnerPlayer.textContent = "Player 1 wins!";
        clearInterval(timer);
        endGameButton.className = "end-game hidden";
        playAgainButton.className = "play-again";
        player.textContent = "";
        colorTurn.className = "circle-turn not-pressed";
      }
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].className === "circle player2" &&
        board[i + 1] &&
        board[i + 1][j + 1] &&
        board[i + 1][j + 1].className === "circle player2" &&
        board[i + 2] &&
        board[i + 2][j + 2] &&
        board[i + 2][j + 2].className === "circle player2" &&
        board[i + 3] &&
        board[i + 3][j + 3] &&
        board[i + 3][j + 3].className === "circle player2") {

        gameOver = true;
        if (player2 === 'Player 2') winnerPlayer.textContent = "Player 2 wins!";
        if (player2 === 'CPU') winnerPlayer.textContent = "Cpu wins!";
        clearInterval(timer);
        endGameButton.className = "end-game hidden";
        playAgainButton.className = "play-again";
        player.textContent = "";
        colorTurn.className = "circle-turn not-pressed";
      }
    }
  }
};

const diagonalDownToUpCheck = () => {
  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].className === "circle player1" &&
        board[i - 1] &&
        board[i - 1][j + 1] &&
        board[i - 1][j + 1].className === "circle player1" &&
        board[i - 2] &&
        board[i - 2][j + 2] &&
        board[i - 2][j + 2].className === "circle player1" &&
        board[i - 3] &&
        board[i - 3][j + 3] &&
        board[i - 3][j + 3].className === "circle player1") {

        gameOver = true;
        winnerPlayer.textContent = "Player 1 wins!";
        clearInterval(timer);
        endGameButton.className = "end-game hidden";
        playAgainButton.className = "play-again";
        player.textContent = "";
        colorTurn.className = "circle-turn not-pressed";
      }
    }
  }
  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].className === "circle player2" &&
        board[i - 1] &&
        board[i - 1][j + 1] &&
        board[i - 1][j + 1].className === "circle player2" &&
        board[i - 2] &&
        board[i - 2][j + 2] &&
        board[i - 2][j + 2].className === "circle player2" &&
        board[i - 3] &&
        board[i - 3][j + 3] &&
        board[i - 3][j + 3].className === "circle player2") {

        gameOver = true;
        if (player2 === 'Player 2') winnerPlayer.textContent = "Player 2 wins!";
        if (player2 === 'CPU') winnerPlayer.textContent = "Cpu wins!";
        clearInterval(timer);
        endGameButton.className = "end-game hidden";
        playAgainButton.className = "play-again";
        player.textContent = "";
        colorTurn.className = "circle-turn not-pressed";
      }
    }
  }
};

const gameManager = () => {
  if (player1 === "Player 1" && player2 === "Player 2") playerVsPlayer();
  if (player1 === "Player 1" && player2 === "CPU") playerVsCpu();

};

const conecta4Game = () => {
  setBoard();
  turnColor();
  gameManager();
};

conecta4Game();