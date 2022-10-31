const gameTimerEl = document.querySelector(".game-timer");
const letterBoardEl = document.querySelector(".main__letter-board");
const guessedLetterBoardEl = document.querySelector(
  ".main__guessed-letters-board"
);

const originalWords = [
  "fiskmås",
  "parameter",
  "osthyvel",
  "tangentbord",
  "skärmsläckare",
  "fotboll",
  "variabel",
  "javascript",
  "programmering",
  "fiskpinne",
];

let words = [...originalWords];
let wordArr;

let guessedWord = [];
let guessedLetters = [];

let failures = 0;
let timer;
let gameTimer = 60;

const model = ["scaffold", "head", "body", "arms", "legs"];

function getRandomWord() {
  let randomIndex = Math.floor(Math.random() * words.length);
  let word = words.splice(randomIndex, 1)[0];
  if (!words.length) words = [...originalWords];
  return word;
}

function startNewGame() {
  wordArr = [...getRandomWord()];
  guessedWord = Array(wordArr.length).fill("");
  guessedLetters = [];
  failures = 0;
  gameTimer = 60;
  gameTimerEl.innerHTML = `<p>${gameTimer}</p>`;

  timer = setInterval(() => {
    gameTimer -= 1;
    gameTimerEl.innerHTML = `<p>${gameTimer}</p>`;

    if (gameTimer === 0) {
      renderWinOrLoss("loss")
    }
  }, 1000);

  document.querySelector(".game-message").innerHTML = "";
  document.querySelector(".game-message").classList.toggle("hidden");

  model.forEach((part) => {
    document.querySelector("figure").classList.remove(part);
  });

  renderBoards();
  console.log(wordArr);
}

startNewGame();

function renderBoards() {
  letterBoardEl.innerHTML = guessedWord.reduce(
    (acc, v) =>
      (acc += !v.length
        ? `<article class='letter-board__letter-slot'>_</article>`
        : `<article class='letter-board__letter-slot'>${v}</article>`),
    ""
  );

  guessedLetterBoardEl.innerHTML = guessedLetters.reduce(
    (acc, v) =>
      guessedWord.includes(v)
        ? (acc += `<span class='guessed-letter'>${v}</span>`)
        : (acc += `<span class='guessed-letter guessed-letter--wrong'>${v}</span>`),
    ""
  );
}

function renderWinOrLoss(type) {
  if (type === "win") {
    document.querySelector(".game-message").classList.toggle("hidden");
    document.querySelector(".game-message").innerHTML = `
      <p>Grattis, du vann!</p>
      <button onclick="startNewGame()">Spela igen!</button>
    `;

    model.forEach((part) => {
      document.querySelector("figure").classList.remove(part);
    });
  } else if (type === "loss") {
    document.querySelector(".game-message").classList.toggle("hidden");
    document.querySelector(".game-message").innerHTML = `
      <p>Tyvärr, du förlorade!</p>
      <button onclick="startNewGame()">Spela igen!</button>
    `;
  }

  clearInterval(timer);
}

document.addEventListener("keydown", (event) => {
  const isLetter = (letter) => !!letter.match(/^[a-zåäö]$/i);
  const guessedLetter = event.key.toLowerCase();

  if (
    isLetter(guessedLetter) &&
    !guessedLetters.includes(guessedLetter) &&
    failures <= 4 &&
    gameTimer !== 0
  ) {
    if (wordArr.includes(guessedLetter)) {
      wordArr.forEach((letter, i) => {
        if (letter === guessedLetter) guessedWord[i] = letter;
      });
    } else {
      document.querySelector("figure").classList.add(model[failures]);
      failures += 1;
    }

    guessedLetters.push(guessedLetter);

    renderBoards();

    if (guessedWord.join("") === wordArr.join("")) {
      renderWinOrLoss("win");
    } else if (failures > 4) {
      renderWinOrLoss("loss");
    }
  }
});

