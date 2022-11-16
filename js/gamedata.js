import { elements } from "./index.js"
import { originalWords } from "./words.js"

  
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