
const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

// Display the number you click
function enterNumber(number) {
    if (display.value === "Error") {
        display.value = number;
        waitingForSecondNumber = false;
        return;
    }

    if (waitingForSecondNumber) {
        display.value = number;
        waitingForSecondNumber = false;
    } else {
        display.value =
            display.value === "0"
                ? number
                : display.value + number;
    }
}

// Choose +, -, *, or /
function chooseOperator(nextOperator) {
    const currentNumber = Number(display.value);

    if (!Number.isFinite(currentNumber)) return;

    if (operator && !waitingForSecondNumber) {
        calculate();
    }

    firstNumber = Number(display.value);
    operator = nextOperator;
    waitingForSecondNumber = true;
}

// Calculate the answer
function calculate() {
    if (operator === null || firstNumber === null) return;

    const secondNumber = Number(display.value);
    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            result = secondNumber === 0
                ? "Error"
                : firstNumber / secondNumber;
            break;

        default:
            return;
    }

    if (result === "Error" || !Number.isFinite(result)) {
        display.value = "Error";
    } else {
        display.value = String(Number(result.toPrecision(10)));
    }

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;
}

// Reset everything
function clearCalculator() {
    display.value = "0";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
}

// Listen for button clicks
buttons.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button) return;

    const { number, action, value } = button.dataset;

    if (number !== undefined) {
        enterNumber(number);
        return;
    }

    switch (action) {
        case "clear":
            clearCalculator();
            break;

        case "delete":
            if (waitingForSecondNumber || display.value === "Error") {
                display.value = "0";
                waitingForSecondNumber = false;
            } else {
                display.value = display.value.slice(0, -1) || "0";
            }
            break;

        case "decimal":
            if (waitingForSecondNumber || display.value === "Error") {
                display.value = "0.";
                waitingForSecondNumber = false;
            } else if (!display.value.includes(".")) {
                display.value += ".";
            }
            break;

        case "operator":
            chooseOperator(value);
            break;

        case "equals":
            calculate();
            break;
    }
});
