// 변수 및 연산자 작업
const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

// 입력한 값을 number 타입으로 변환
function getUserNumberInput() {
    return parseInt(usrInput.value);
}

// 더하기, 빼기 등 연산 후 결과 창에 출력
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`
    outputResult(currentResult, calcDescription);
}

function writeToLog(
    operationIdentifier,
    pervResult,
    operationNumber,
    newResult
) {
    const logEntry = {
        operation: operationIdentifier,
        pervResult: pervResult,
        number: operationNumber,
        result: newResult,
    };
    logEntries.push(logEntry);
    console.log(logEntries);
}

// 더하기
function add() {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult += enteredNumber;
    createAndWriteOutput('+', initialResult, enteredNumber);
    writeToLog('ADD', initialResult, enteredNumber, currentResult);
}

// 빼기
function subtract() {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult = currentResult - enteredNumber;
    createAndWriteOutput('-', initialResult, enteredNumber);
    writeToLog('SUBTRACT', initialResult, enteredNumber, currentResult);
}

// 곱하기
function multiply() {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult *= enteredNumber;
    createAndWriteOutput('*', initialResult, enteredNumber);
    writeToLog('MULTIPLY', initialResult, enteredNumber, currentResult);
}

// 나누기
function divide() {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult /= enteredNumber;
    createAndWriteOutput('/', initialResult, enteredNumber);
    writeToLog('DIVIDE', initialResult, enteredNumber, currentResult);
}

addBtn.addEventListener('click', add)
subtractBtn.addEventListener('click', subtract)
multiplyBtn.addEventListener('click', multiply)
divideBtn.addEventListener('click', divide)
