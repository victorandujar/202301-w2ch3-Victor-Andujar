const questions = [
  {
    letter: "a",
    answer: "abducir",
    status: 0,
    question:
      "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien",
  },
  {
    letter: "b",
    answer: "bingo",
    status: 0,
    question:
      "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso",
  },
  {
    letter: "c",
    answer: "churumbel",
    status: 0,
    question: "CON LA C. Niño, crío, bebé",
  },
  {
    letter: "d",
    answer: "diarrea",
    status: 0,
    question:
      "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida",
  },
  {
    letter: "e",
    answer: "ectoplasma",
    status: 0,
    question:
      "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación",
  },
  {
    letter: "f",
    answer: "facil",
    status: 0,
    question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad",
  },
  {
    letter: "g",
    answer: "galaxia",
    status: 0,
    question:
      "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas",
  },
  {
    letter: "h",
    answer: "harakiri",
    status: 0,
    question: "CON LA H. Suicidio ritual japonés por desentrañamiento",
  },
  {
    letter: "i",
    answer: "iglesia",
    status: 0,
    question: "CON LA I. Templo cristiano",
  },
  {
    letter: "j",
    answer: "jabali",
    status: 0,
    question:
      "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba",
  },
  {
    letter: "k",
    answer: "kamikaze",
    status: 0,
    question:
      "CON LA K. Persona que se juega la vida realizando una acción temeraria",
  },
  {
    letter: "l",
    answer: "licantropo",
    status: 0,
    question: "CON LA L. Hombre lobo",
  },
  {
    letter: "m",
    answer: "misantropo",
    status: 0,
    question:
      "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas",
  },
  {
    letter: "n",
    answer: "necedad",
    status: 0,
    question: "CON LA N. Demostración de poca inteligencia",
  },
  {
    letter: "ñ",
    answer: "señal",
    status: 0,
    question:
      "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.",
  },
  {
    letter: "o",
    answer: "orco",
    status: 0,
    question:
      "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien",
  },
  {
    letter: "p",
    answer: "protoss",
    status: 0,
    question:
      "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft",
  },
  {
    letter: "q",
    answer: "queso",
    status: 0,
    question:
      "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche",
  },
  { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor" },
  {
    letter: "s",
    answer: "stackoverflow",
    status: 0,
    question: "CON LA S. Comunidad salvadora de todo desarrollador informático",
  },
  {
    letter: "t",
    answer: "terminator",
    status: 0,
    question:
      "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984",
  },
  {
    letter: "u",
    answer: "unamuno",
    status: 0,
    question:
      "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914",
  },
  {
    letter: "v",
    answer: "vikingos",
    status: 0,
    question:
      "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa",
  },
  {
    letter: "w",
    answer: "sandwich",
    status: 0,
    question:
      "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso",
  },
  {
    letter: "x",
    answer: "botox",
    status: 0,
    question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética",
  },
  {
    letter: "y",
    answer: "peyote",
    status: 0,
    question:
      "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos",
  },
  {
    letter: "z",
    answer: "zen",
    status: 0,
    question:
      "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional",
  },
];

let userName = "";
const nameManager = () => {
  userName = prompt(
    `Bienvenido/a al Pasapalabra \nPara empezar el juego, porfavor introduce tu nombre`
  );
  while (!userName) {
    userName = prompt("Debes introducir un nombre para continuar");
  }

  alert(`Hola ${userName}, empieza el rosco!`);
};

const gameTimer = () => {
  const setTimer = new Date();
  setTimer.setSeconds(setTimer.getSeconds() + 130);
  return setTimer;
};

const gameManager = () => {
  let question = "";
  let answer = "";
  let endRound = "";
  let counter1 = 0;
  const gameOver =
    "El juego ha terminado. A continuación verás cuantas letras has acertado.\nHasta pronto.";
  const timer = gameTimer();

  do {
    for (const i in questions) {
      const currentTime = new Date();
      if (questions[i].status === 0) {
        question = questions[i].question;
        answer = questions[i].answer;
        counter1++;
        alert(question);
        let userAnswer = prompt("Escribe tu respuesta");
        while (!userAnswer) {
          userAnswer = prompt(
            `Debes introducir una respuesta o 'pasapalabra' para continuar.`
          );
        }

        if (userAnswer.toLocaleLowerCase() === "end") {
          return;
        }

        if (userAnswer.toLowerCase() === answer) {
          const correctAnswer = "Respuesta correcta";
          alert(correctAnswer);
          questions[i].status = 1;
        } else if (userAnswer === "pasapalabra") {
          const notAnswered =
            "Pasamos palabra.\nGuardamos la pregunta para la siguiente ronda.";
          alert(notAnswered);
        } else if (userAnswer !== answer && userAnswer !== "pasapalabra") {
          const wrongAnswer = `Respuesta incorrecta.\nLa respuesta correcta era: ${questions[i].answer}`;
          alert(wrongAnswer);
          questions[i].status = -1;
        }

        if (currentTime >= timer) {
          const endTimeMessage =
            "El tiempo se ha terminado.\nA continuación te mostramos cuantas letras has acertado.";
          alert(endTimeMessage);
          return;
        }

        const anotherTurn = confirm("¿Quieres jugar otro turno");
        if (anotherTurn === false) {
          alert("El juego ha terminado. Hasta pronto.");
          return;
        }
      }
    }

    let counter2 = 0;
    for (const i in questions) {
      if (questions[i].status === 0) counter2++;
    }

    if (counter2 === 0) {
      alert(gameOver);
    }

    if (counter2 >= 1) {
      endRound = confirm(
        `Hemos terminado esta ronda.\n¿Empezamos la siguiente, con las preguntas no respondidas?`
      );
      if (endRound === false) {
        alert(gameOver);
        return;
      }
    }
  } while (endRound === true);
};

const rankingAndPoints = () => {
  let lettersCorrect = "";
  const players = [
    { name: "Bernat", letters: 23 },
    { name: "Jordi", letters: 25 },
    { name: "Carles", letters: 20 },
    { name: "Laura", letters: 27 },
    { name: "Jasmina", letters: 26 },
    { name: "Pere", letters: 18 },
    { name: "Arnau", letters: 21 },
  ];

  let counter = 0;
  for (const i in questions) {
    if (questions[i].status === 1 || questions[i].status === -1) {
      counter++;
    }
  }

  const sum = () => {
    let acc = 0;
    for (const i in questions) {
      if (questions[i].status === 1) {
        acc += questions[i].status;
      }
    }

    return acc;
  };

  lettersCorrect = sum();
  alert(`${userName}, has acertado ${lettersCorrect} letras.\nHasta pronto.`);
  if (counter === questions.length) {
    const userPoints = { name: `${userName}`, letters: `${lettersCorrect}` };
    players.push(userPoints);
    players.sort((a, b) => b.letters - a.letters);

    let rankingTable = `La tabla de puntuaciones es la siguiente:\n`;
    for (const i in players) {
      rankingTable = `${rankingTable} ${players[i].name}: ${players[i].letters} letras\n`;
    }

    alert(rankingTable);
  }
};

const pasapalabra = () => {
  nameManager();
  gameManager();
  rankingAndPoints();
};

pasapalabra();
