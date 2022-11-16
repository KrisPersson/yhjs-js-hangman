
import { elements } from "./index.js"
import { gameState, words, originalWords, figure } from "./gamedata.js"


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
    const button = `<button class='play-again-btn'>Spela igen!</button>`;
  
    if (type === 'win') {
      elements.gameMessage.innerHTML = `<p>Grattis, du vann!</p>${button}`;
      figure.clear();
    } else if (type === 'loss') {
      gameState.correctLetters = gameState.word;
      renderBoards();
      elements.gameMessage.innerHTML = `<p>Tyvärr, du förlorade!</p>${button}`;
    }
    document.querySelector(".play-again-btn").addEventListener('click', startNewGame)
  
    clearInterval(gameState.timer);
  }

  export { startNewGame, renderBoards, renderMessage }