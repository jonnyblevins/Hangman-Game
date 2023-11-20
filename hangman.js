let isNode = false;
let windowObject = null;
let documentObject = null;

if (typeof window === 'undefined') {
    const jsdom = require('jsdom');
    const { JSDOM } = jsdom;
    const { window } = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    global.window = window;
    global.document = window.document;
    isNode = true;
} else {
    windowObject = window;
    documentObject = document;
}

// Actual Hangman game logic
const words = ['javascript', 'hangman', 'developer', 'coding'];
let chosenWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = '_'.repeat(chosenWord.length);
let remainingAttempts = 6;

const wordDisplay = isNode ? document.createElement('div') : document.getElementById('word-display');
const letterInput = isNode ? document.createElement('input') : document.getElementById('letter-input');
const message = isNode ? document.createElement('p') : document.getElementById('message');

if (isNode) {
    wordDisplay.setAttribute('id', 'word-display');
    letterInput.setAttribute('id', 'letter-input');
    message.setAttribute('id', 'message');
}

if (!isNode) {
    wordDisplay.textContent = guessedWord;
}

function guessLetter() {
    const letter = isNode ? letterInput.value.toLowerCase() : letterInput.value.toLowerCase();
    if (!letter.match(/^[a-z]$/)) {
        message.textContent = 'That is not a letter!';
        return;
    }

    if (chosenWord.includes(letter)) {
        guessedWord = guessedWord.split('').map((char, index) => {
            if (chosenWord[index] === letter) {
                return letter;
            } else {
                return char;
            }
        }).join('');

        wordDisplay.textContent = guessedWord;
    } else {
        remainingAttempts--;
        message.textContent = `Wrong. Remaining attempts: ${remainingAttempts}`;
    }

    if (guessedWord === chosenWord) {
        message.textContent = 'Nice work!';
        if (!isNode) {
            letterInput.disabled = true;
        }
    } else if (remainingAttempts === 0) {
        message.textContent = `Game over! The word was "${chosenWord}".`;
        if (!isNode) {
            letterInput.disabled = true;
        }
    }

    letterInput.value = '';
}

// For Node.js, log the output
if (isNode) {
    console.log('Word Display:', wordDisplay.textContent);
    console.log('Message:', message.textContent);
}