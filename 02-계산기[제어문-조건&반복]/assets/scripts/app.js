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

// 계산 결과
function calculateResult(calculationType) {
    if (
        calculationType !== 'ADD' &&
        calculationType !== 'SUBTRACT' &&
        calculationType !== 'MULTIPLY' &&
        calculationType !== 'DIVIDE' ||
        !enteredNumber
    ) {
        return;
    }

    // if (
    //     calculationType === 'ADD' ||
    //     calculationType === 'SUBTRACT' ||
    //     calculationType === 'MULTIPLY' ||
    //     calculationType === 'DIVIDE' 
    // ) {
        const enteredNumber = getUserNumberInput();
        const initialResult = currentResult;
        let mathOperator;
        if (calculationType === 'ADD') {
            currentResult += enteredNumber;
            mathOperator = '+';
        } else if (calculationType === 'SUBTRACT') {
            currentResult -= enteredNumber;
            mathOperator = '-';
        } else if (calculationType === 'MULTIPLY') {
            currentResult *= enteredNumber;
            mathOperator = '*';
        } else if (calculationType === 'DIVIDE') {
            currentResult /= enteredNumber;
            mathOperator = '/';
        }
    
        createAndWriteOutput('+', initialResult, enteredNumber);
        writeToLog('ADD', initialResult, enteredNumber, currentResult);
    // }
}

// 더하기
function add() {
    calculateResult('ADD')
}

// 빼기
function subtract() {
    calculateResult('SUBTRACT')
}

// 곱하기
function multiply() {
    calculateResult('MULTIPLY')
}

// 나누기
function divide() {
    calculateResult('DIVIDE')
}

addBtn.addEventListener('click', add)
subtractBtn.addEventListener('click', subtract)
multiplyBtn.addEventListener('click', multiply)
divideBtn.addEventListener('click', divide)
