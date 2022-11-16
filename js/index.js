import { startNewGame, renderBoards, renderMessage } from "./functions.js"
import { gameState, figure } from "./gamedata.js";


const elements = {
  timer: document.querySelector('.game-timer'),
  letterboard: document.querySelector('.main__letter-board'),
  guessedLetters: document.querySelector('.main__guessed-letters-board'),
  gameMessage: document.querySelector('.game-message'),
  figure: document.querySelector('figure'),
};


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

export { elements } 
