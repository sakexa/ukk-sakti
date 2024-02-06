let display = document.getElementById('display');
let historyDisplay = document.getElementById('history-display');
let currentOperand = '';
let history = [];
const maxHistoryLength = 1; // Atur maksimum panjang riwayat

function initializeCalculator() {
    display.value = '0';
    currentOperand = '';
    updateDisplay();
}

function appendToDisplay(value) {
    if (display.value === '0' || display.value === 'undefined') {
        display.value = '';
    }
    display.value += value;
    currentOperand = display.value;
}

function clearLastDigit() {
    if (display.value !== undefined && display.value.length > 0) {
        display.value = display.value.slice(0, -1);
        currentOperand = display.value;
    }
}

function clearDisplay() {
    display.value = '0';
    currentOperand = '';
}

function compute() {
    try {
        const result = eval(currentOperand);
        currentOperand = result;

        // Menyimpan riwayat operasi jika operasi baru
        if (display.value !== currentOperand) {
            history.push({ expression: display.value, result: result });

            // Batasi panjang riwayat
            if (history.length > maxHistoryLength) {
                history.shift(); // Hapus elemen pertama
            }
        }
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
    }
}

function updateDisplay() {
    let displayText = '';

    // Tampilkan riwayat operasi di dalam historyDisplay
    historyDisplay.innerHTML = '';
    for (let i = 0; i < history.length; i++) {
        const historyItem = document.createElement('div');
        historyItem.className = 'history';
        historyItem.textContent = `${history[i].expression} = ${history[i].result}`;
        historyDisplay.appendChild(historyItem);
    }

    // Tampilkan nilai display utama
    display.value = currentOperand;
}

function handleKeyPress(event) {
    const keyPressed = event.key;

    if (/[0-9\.+\-*/]/.test(keyPressed)) {
        appendToDisplay(keyPressed);
    } else if (keyPressed === 'Enter' || keyPressed === '=') {
        compute();
    } else if (keyPressed === 'Backspace') {
        clearLastDigit();
    } else if (keyPressed.toLowerCase() === 'c') {
        clearDisplay();
    }
}

document.addEventListener('keydown', handleKeyPress);

initializeCalculator();
