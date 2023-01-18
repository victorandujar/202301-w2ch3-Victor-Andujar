const display = document.getElementById("result");
const allNumbers = document.querySelectorAll("button.number");
const allOperators = document.querySelectorAll("button.operator");
const equalButton = document.getElementById("equal");
const eraseButton = document.getElementById("reset");
const rootButton = document.getElementById("root");
const commaButton = document.getElementById("comma");
display.textContent = "";
let number1 = "";
let number2 = "";
let operatorSaver = "";
let numbers = "";

const getNumbers = () => {
  allNumbers.forEach((number) => {
    number.onclick = () => {
      display.textContent += number.textContent;
    };
  });
};

const getOperators = () => {
  allOperators.forEach((operator) => {
    operator.onclick = () => {
      if (display.textContent.includes(operator.textContent)) {
        return;
      }

      display.textContent += operator.textContent;
      operatorSaver = operator.textContent;
    };
  });
};

const deleteContent = () => {
  eraseButton.onclick = () => {
    display.textContent = "";
    operatorSaver = "";
    number1 = "";
    number2 = "";
  };
};

const rootOperation = () => {
  rootButton.onclick = () => {
    number1 = Number(display.textContent);
    display.textContent = Math.sqrt(number1);
    if (isNaN(number1)) {
      display.textContent = "Syntax Error";
    }
  };

  return rootButton;
};

const getCommaButton = () => {
  commaButton.onclick = () => {
    if (operatorSaver) {
      numbers = display.textContent.split(operatorSaver);
      number1 = numbers[0];
      number2 = numbers[1];
      if (number2.includes(commaButton.textContent)) {
        return;
      }
    }

    if (!operatorSaver) {
      number1 = display.textContent;
      if (number1.includes(commaButton.textContent)) {
        return;
      }
    }

    display.textContent += commaButton.textContent;
  };
};

const calculate = () => {
  let result;
  numbers = display.textContent.split(operatorSaver);
  number1 = Number(numbers[0]);
  number2 = Number(numbers[1]);

  if (operatorSaver === "x") {
    result = number1 * number2;
  }

  if (operatorSaver === "+") {
    result = number1 + number2;
  }

  if (operatorSaver === "-") {
    result = number1 - number2;
  }

  if (operatorSaver === "÷") {
    result = number1 / number2;
  }

  return result;
};

const getEqualButton = () => {
  equalButton.onclick = () => {
    display.textContent = calculate();
    if (isNaN(number1) || isNaN(number2)) {
      display.textContent = "Syntax Error";
    }
  };
};

const calculator = () => {
  getNumbers();
  getOperators();
  deleteContent();
  rootOperation();
  getCommaButton();
  getEqualButton();
};

calculator();
