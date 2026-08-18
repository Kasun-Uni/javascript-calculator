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