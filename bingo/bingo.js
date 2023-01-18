const nameManager = () => {
  let yourName = prompt(
    `Bienvenido/a.\nPara empezar el juego, porfavor introduce tu nombre`
  );
  while (!yourName) {
    yourName = prompt("Debes introducir un nombre para continuar");
  }

  alert(
    `Hola ${yourName}, a continuación te mostramos el cartón. Que la suerte te acompañe!`
  );
  return yourName;
};

const userName = nameManager();

let numbers = [];
const getRandomNumber = () => {
  let randomNumber = Math.ceil(Math.random() * 99);
  while (numbers.includes(randomNumber)) {
    randomNumber = Math.ceil(Math.random() * 99);
  }

  numbers.push(randomNumber);
  return randomNumber;
};

const getBingoNumbers = () => [
  { number: getRandomNumber(), matched: false },
  { number: getRandomNumber(), matched: false },
  { number: getRandomNumber(), matched: false },
  { number: getRandomNumber(), matched: false },
  { number: getRandomNumber(), matched: false },

  { number: getRandomNumber(), matched: false },
  { number: getRandomNumber(), matched: false },
  { number: getRandomNumber(), matched: false },
  { number: getRandomNumber(), matched: false },
  { number: getRandomNumber(), matched: false },

  { number: getRandomNumber(), matched: false },
  { number: getRandomNumber(), matched: false },
  { number: getRandomNumber(), matched: false },
  { number: getRandomNumber(), matched: false },
  { number: getRandomNumber(), matched: false },
];

let userNumbers = [];
const getUserNumbers = () => {
  let bingoCard;
  let bingoNumbers;
  do {
    bingoNumbers = getBingoNumbers();
    userNumbers = [];
    for (const i in bingoNumbers) {
      userNumbers.push(bingoNumbers[i].number);
    }

    bingoCard = confirm(`${userName}, quieres estos números? ${userNumbers}`);
    if (bingoCard === true) {
      alert("Empieza el juego!");
    }
  } while (!bingoCard);

  return bingoNumbers;
};

let playingNumbers = getUserNumbers();

let everyTurnPoints = [1000];
let numberTurn;
let totalPoints;
const rankingAndPoints = () => {
  const players = [
    { name: "Bernat", points: 1090 },
    { name: "Jordi", points: 1150 },
    { name: "Carles", points: 940 },
    { name: "Laura", points: 1300 },
    { name: "Jasmina", points: 1200 },
    { name: "Pere", points: 850 },
    { name: "Arnau", points: 900 },
  ];

  const line = 50;
  const bingo = 200;
  const matched = 10;
  const unmatched = -5;

  let counter = 0;
  for (const i in playingNumbers) {
    if (numberTurn !== playingNumbers[i].number) {
      counter++;
    }
  }

  if (counter === playingNumbers.length) {
    everyTurnPoints.push(unmatched);
    const unmatchedText = `Turno fallido. El número no está en tu cartón. Pierdes ${unmatched} puntos.`;
    alert(unmatchedText);
  }

  for (const i in playingNumbers) {
    if (
      playingNumbers[i].matched === true &&
      playingNumbers[i].number === numberTurn
    ) {
      everyTurnPoints.push(matched);
      const matchedText = `Tienes un match. Sumas ${matched} puntos.`;
      alert(matchedText);
    }
  }

  counter = 0;
  for (const i in playingNumbers) {
    if (playingNumbers[i].matched === true) {
      counter++;
    }
  }

  if (counter === 5) {
    everyTurnPoints.push(line);
    const lineText = `Línea! Has conseguido ${line} puntos extras.`;
    alert(lineText);
  }

  if (counter === 10) {
    everyTurnPoints.push(line);
    const lineText = `Línea! Has conseguido ${line} puntos extras.`;
    alert(lineText);
  }

  if (counter === playingNumbers.length) {
    everyTurnPoints.push(bingo + line);
    const lineText = `Línea! Has conseguido ${line} puntos extras.`;
    alert(lineText);
    const bingoText = `BINGO!!!! Has conseguido ${bingo} puntos extras. El juego ha terminado. Enhorabuena!`;
    alert(bingoText);
  }

  const sum = () => {
    let acc = 0;
    for (let i = 0; i < everyTurnPoints.length; i++) {
      acc += everyTurnPoints[i];
    }

    return acc;
  };

  totalPoints = sum();
  alert(`${userName}, tienes ${totalPoints} puntos`);

  if (counter === playingNumbers.length) {
    const userPoints = { name: `${userName}`, points: `${totalPoints}` };
    players.push(userPoints);
    players.sort((a, b) => b.points - a.points);

    let rankingTable = `La tabla de puntuaciones es la siguiente:\n`;
    for (const i in players) {
      rankingTable = `${rankingTable} ${players[i].name}: ${players[i].points}\n`;
    }

    alert(rankingTable);
  }

  return players;
};

numbers = [];
let turnCounter = [];
let totalTurns;
const newTurn = () => {
  let bingoCard;
  numberTurn = getRandomNumber();
  alert(`El número premiado es: ${numberTurn}`);
  for (const i in playingNumbers) {
    if (playingNumbers[i].number === numberTurn) {
      playingNumbers[i].matched = true;
    }
  }

  bingoCard = playingNumbers.map((nums) => {
    if (nums.matched === true) {
      return "X";
    }

    return nums.number;
  });
  alert(
    `Así queda el cartón despúes de este turno, ${userName}:\n${bingoCard}`
  );
  rankingAndPoints();
  turnCounter.push(1);
  return playingNumbers;
};

let moreTurns;
const checkNewTurn = () => {
  moreTurns = confirm(`${userName} quieres jugar otro turno?`);
  if (moreTurns === true)
    do {
      newTurn();
      let counter = 0;
      for (const i in playingNumbers) {
        if (playingNumbers[i].matched === true) {
          counter++;
        }
      }

      if (counter === playingNumbers.length) {
        moreTurns = false;
        alert("No hay más turnos en esta partida");
        return;
      }

      moreTurns = confirm(`${userName} quieres jugar otro turno?`);
    } while (moreTurns === true);
  if (moreTurns === false) {
    const sum = () => {
      let acc = 0;
      for (let i = 0; i < turnCounter.length; i++) {
        acc += turnCounter[i];
      }

      return acc;
    };

    totalTurns = sum();
    const gameTurns = `Has necesitado ${totalTurns} turnos para terminar el juego.`;
    alert(gameTurns);
    const endGame = `${userName}, el juego ha terminado, tu puntuación es la siguiente: ${totalPoints}`;
    alert(endGame);
  }
};

const newGame = () => {
  if (moreTurns === false) {
    let newGame;
    do {
      newGame = confirm(`Quieres volver a jugar?`);
      if (newGame === true) {
        numbers = [];
        turnCounter = [];
        everyTurnPoints = [1000];
        totalPoints = 0;
        playingNumbers = getUserNumbers();
        newTurn();
        checkNewTurn();
      }
    } while (newGame === true);

    if (newGame === false) {
      alert(`Bye!`);
    }
  }
};

function bingo() {
  newTurn();
  checkNewTurn();
  newGame();
}

bingo();

// - Si cancelo els números pq em generi el cartró, només m'ho fa un cop.
// - Necessito que primer em digui que tinc un match, i després em mostri el cartró amb la X. Ara ho fa al revés.
