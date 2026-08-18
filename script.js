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