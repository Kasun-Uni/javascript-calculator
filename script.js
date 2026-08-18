let firstNumber = null;
let operator = null;
let secondNumber = null;

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

const display = document.querySelector("#display");
const clearBtn = document.querySelector(".clear");

function clearAll() {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  display.textContent = "0";
}

clearBtn.addEventListener("click", clearAll);
const digitButtons = document.querySelectorAll(".digit, .decimal");
let currentInput = "0";
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function inputDigit(digit) {
  if (shouldResetDisplay) {
    currentInput = "";
    shouldResetDisplay = false;
  }

  if (digit === "." && currentInput.includes(".")) {
    return; // prevent multiple decimals
  }

  if (currentInput === "0" && digit !== ".") {
    currentInput = digit;
  } else {
    currentInput += digit;
  }

  updateDisplay();
}

digitButtons.forEach(button => {
  button.addEventListener("click", () => {
    inputDigit(button.textContent === "." ? "." : button.textContent);
  });
});

const operatorButtons = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");

function roundResult(num) {
  return Math.round(num * 100000) / 100000;
}

function handleOperator(selectedOperator) {
  const inputValue = parseFloat(currentInput);

  if (operator && !shouldResetDisplay) {
    // there's a pending operation waiting - evaluate it first
    const result = operate(operator, firstNumber, inputValue);
    if (typeof result === "string") {
      display.textContent = result; // error message
      firstNumber = null;
      operator = null;
      shouldResetDisplay = true;
      return;
    }
    currentInput = String(roundResult(result));
    updateDisplay();
    firstNumber = roundResult(result);
  } else {
    firstNumber = inputValue;
  }

  shouldResetDisplay = true;
  operator = selectedOperator;
}

operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    handleOperator(button.dataset.operator);
  });
});

equalsBtn.addEventListener("click", () => {
  if (operator === null || shouldResetDisplay) {
    return; // nothing to calculate
  }

  secondNumber = parseFloat(currentInput);
  const result = operate(operator, firstNumber, secondNumber);

  if (typeof result === "string") {
    display.textContent = result; // divide by 0 error
  } else {
    currentInput = String(roundResult(result));
    updateDisplay();
  }

  firstNumber = typeof result === "string" ? null : roundResult(result);
  operator = null;
  shouldResetDisplay = true;
});