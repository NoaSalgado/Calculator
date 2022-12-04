//Globals
let prevOperand = "";
let actualOperand = "";
let operator;

//DOM Elements
const calculatorScreen = document.querySelector(".calculator__screen");
const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector("[data-equals]");
const clearBtn = document.querySelector("[data-clear]");
const clearAllBtn = document.querySelector("[data-all-clear]");

const add = (prev, actual) => prev + actual;
const subract = (prev, actual) => prev - actual;
const multiply = (prev, actual) => prev * actual;
const divide = (prev, actual) => {
  if (actual === 0) {
    return "Error";
  } else {
    return prev / actual;
  }
};
const getPercentage = (operand) => {
  const percentage = Number(operand) / 100;
  actualOperand = percentage.toString();
  updateScreen();
};

const updateScreen = () => {
  calculatorScreen.innerHTML = actualOperand;
};

const updateOperand = (number) => {
  if (number === "." && actualOperand.includes(".")) {
    return;
  }

  if (actualOperand.length > 9) {
    return;
  }

  actualOperand += number;
  updateScreen();
};

const prepareOperation = (op) => {
  if (actualOperand === "") return;

  if (op === "%") {
    getPercentage(actualOperand);
    return;
  }

  if (actualOperand.length > 12) {
    actualOperand = "";
    return;
  }
  if (prevOperand !== "") {
    operate();
  }
  operator = op;
  prevOperand = actualOperand;
  actualOperand = "";
};

const operate = () => {
  if (prevOperand === "") return;

  let result;
  const firstOperand = Number(prevOperand);
  const secondOperand = Number(actualOperand);

  switch (operator) {
    case "+":
      result = add(firstOperand, secondOperand);
      break;
    case "-":
      result = subract(firstOperand, secondOperand);
      break;
    case "x":
      result = multiply(firstOperand, secondOperand);
      break;
    case "÷":
      result = divide(firstOperand, secondOperand);
      break;
  }

  actualOperand = result.toString();

  if (actualOperand.length > 12) {
    actualOperand = `${actualOperand.slice(0, 11)}...`;
  }

  operator = undefined;
  prevOperand = "";
  updateScreen();
};

const deleteNumber = () => {
  actualOperand = actualOperand.slice(0, actualOperand.length - 1);
  updateScreen();
};

const clearAll = () => {
  prevOperand = "";
  actualOperand = 0;
  operator = undefined;
  updateScreen();
};

const manageKeyboardKeys = (e) => {
  if (
    (e.key >= 0 && e.key <= 9) ||
    (e.code.match(/[0-9]/) && e.key !== "/" && e.key !== "%")
  ) {
    updateOperand(e.code.charAt(e.code.length - 1));
  } else if (e.key === ".") {
    updateOperand(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "%") {
    prepareOperation(e.key);
  } else if (e.key === "*") {
    prepareOperation("x");
  } else if (e.key === "/") {
    prepareOperation("÷");
  } else if (e.key === "Enter" || e.key === "=") {
    operate();
  } else if (e.code === "Backspace") {
    deleteNumber();
  } else if (e.code === "Escape") {
    clearAll();
  }
};

//Events
window.addEventListener("load", updateScreen);

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => updateOperand(btn.innerText));
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    prepareOperation(btn.innerHTML);
  });
});

equalsBtn.addEventListener("click", operate);

clearBtn.addEventListener("click", deleteNumber);

clearAllBtn.addEventListener("click", clearAll);

window.addEventListener("keydown", (e) => {
  console.log(e);
  manageKeyboardKeys(e);
});
