import { elements } from "./index.js"

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

  
  export { originalWords, words, gameState, figure }