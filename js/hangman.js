const elements = {
    timer: document.querySelector('.game-timer'),
    letterboard: document.querySelector('.main__letter-board'),
    guessedLetters: document.querySelector('.main__guessed-letters-board'),
    gameMessage: document.querySelector('.game-message'),
    figure: document.querySelector('figure'),
  };
  
const originalWords = [
    'fiskmås', 'parameter', 'osthyvel',
    'tangentbord', 'skärmsläckare', 'fotboll',
    'variabel', 'javascript', 'programmering',
    'fiskpinne',
];

let words = [...originalWords];

const gameState = {};

const figure = {
    parts: ['scaffold', 'head', 'body', 'arms', 'legs'],
    clear: function () {
    this.parts.forEach((part) => {
        elements.figure.classList.remove(part);
    });
    },
};

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const [word] = words.splice(randomIndex, 1);
    if (!words.length) words = [...originalWords];
    return word;
}

function startNewGame() {
    gameState.word = [...getRandomWord()];
    gameState.correctLetters = Array(gameState.word.length).fill('');
    gameState.guessedLetters = [];
    gameState.guesses = 0;
    gameState.time = 60;

    gameState.timer = setInterval(() => {
    gameState.time -= 1;
    elements.timer.innerHTML = `<p>${gameState.time}</p>`;
    if (gameState.time === 0) renderMessage('loss');
    }, 1000);

    elements.timer.innerHTML = `<p>${gameState.time}</p>`;
    elements.gameMessage.classList.toggle('hidden');
    figure.clear();
    renderBoards();
}

function renderBoards() {
    elements.letterboard.innerHTML =
    gameState.correctLetters.reduce((string, letter) =>
        string += letter !== ''
        ? `<article class='letter-board__letter-slot'>${letter}</article>`
        : `<article class='letter-board__letter-slot'>_</article>`, '');

    elements.guessedLetters.innerHTML =
    gameState.guessedLetters.reduce((string, letter) =>
        string += gameState.correctLetters.includes(letter)
        ? `<span class='guessed-letter'>${letter}</span>`
        : `<span class='guessed-letter guessed-letter--wrong'>${letter}</span>`, '');
}

function renderMessage(type) {
    elements.gameMessage.classList.toggle('hidden');
    const button = `<button onclick='startNewGame()'>Spela igen!</button>`;

    if (type === 'win') {
    elements.gameMessage.innerHTML = `<p>Grattis, du vann!</p>${button}`;
    figure.clear();
    } else if (type === 'loss') {
    gameState.correctLetters = gameState.word;
    renderBoards();
    elements.gameMessage.innerHTML = `<p>Tyvärr, du förlorade!</p>${button}`;
    }

    clearInterval(gameState.timer);
}

document.addEventListener('keydown', (event) => {
    const isLetter = (letter) => !!letter.match(/^[a-zåäö]$/i);
    const guessedLetter = event.key.toLowerCase();

    if (isLetter(guessedLetter)
    && !gameState.guessedLetters.includes(guessedLetter)
    && gameState.guesses !== 5
    && gameState.time !== 0) {
    if (gameState.word.includes(guessedLetter)) {
        gameState.word.forEach((letter, index) => {
        if (letter === guessedLetter) gameState.correctLetters[index] = letter;
        });
    } else {
        elements.figure.classList.add(figure.parts[gameState.guesses++]);
    }

    gameState.guessedLetters.push(guessedLetter);

    if (gameState.correctLetters.join('') === gameState.word.join('')) {
        renderMessage('win');
    } else if (gameState.guesses === 5) {
        renderMessage('loss');
    }

    renderBoards();
    }
});

startNewGame();