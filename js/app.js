//Globals
let prevOperand = "";
let actualOperand = "";
let operator;

//DOM Elements
const calculatorScreen = document.querySelector(".calculator__screen");
const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector("[data-equals]");

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

const updateScreen = () => {
  calculatorScreen.innerHTML = actualOperand;
};

const updateOperand = (number) => {
  if (number === "." && actualOperand.includes(".")) {
    return;
  }

  actualOperand += number;
  updateScreen();
};

const prepareOperation = (op) => {
  if (!actualOperand) return;
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
    case "*":
      result = multiply(firstOperand, secondOperand);
      break;
    case "÷":
      result = divide(firstOperand, secondOperand);
      break;
  }
  actualOperand = result;
  operator = undefined;
  prevOperand = "";
  updateScreen();
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
