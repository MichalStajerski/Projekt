/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	const __webpack_modules__ = ({

    /***/ './public/script.js':
    /*! **************************!*\
  !*** ./public/script.js ***!
  \**************************/
    /***/ () => {
      eval("const dragIndex = 0\r\nconst divIdsOrder = []\r\nconst clone = ''\r\n\r\nconst sentences = [\r\n  'تكون أو لا تكون',\r\n  'Proszę Państwa Pan Paweł będzie skakał',\r\n  'Jest tu jakiś cwaniak?',\r\n  'Najlepsze kasztany są na placu Pigal w Paryżu',\r\n  'Ryszard ty draniu oddaj rower'\r\n]\r\n\r\nconst parent = document.querySelector('#parent')\r\n\r\n/**\r\n * @function\r\n * @description Randomly changes order of objects in the array.\r\n * @param {Array} array - an array of objects to shuffle.\r\n * @returns {Array}\r\n */\r\nconst shuffleArray = (array) => array.sort(() => Math.random() - 0.5)\r\n\r\n/**\r\n * @function\r\n * @description Returns a random integer in a given range.\r\n * @param {int} min - bottom border of the range\r\n * @param {int} max - top border of the range\r\n * @returns {int}\r\n */\r\nconst getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min\r\n\r\n/**\r\n * @function\r\n * @description Draws one of the given sentences\r\n */\r\nconst drawnAnswer = getRandomIntInclusive(0, sentences.length - 1)\r\nconst words = sentences[drawnAnswer].trim().split(' ')\r\nconst wordsOrder = []\r\n\r\nfunction drawOrderOfWords () {\r\n  for (let i = 0; i < words.length; i++) {\r\n    wordsOrder.push(i)\r\n  }\r\n  shuffleArray(wordsOrder)\r\n}\r\n\r\n/**\r\n * @function\r\n * @description Writes words of the sentence into divs.\r\n */\r\nfunction insertWordIntoDiv (array) {\r\n  for (let i = 0; i < array.length; i++) {\r\n    document.querySelector('#word' + i).innerHTML = words[array[i]]\r\n  }\r\n}\r\n\r\n/**\r\n * @function\r\n * @description Builds the page layout, creates the sentence to correct.\r\n * @param {Array} array\r\n */\r\nfunction createLayout () {\r\n  for (let i = 0; i < words.length; i++) {\r\n    const word = document.createElement('div')\r\n    word.id = 'word' + i\r\n    word.className = 'droptarget'\r\n    parent.appendChild(word)\r\n  }\r\n\r\n  drawOrderOfWords()\r\n  insertWordIntoDiv(wordsOrder)\r\n\r\n  dragula([parent]) \r\n}\r\n\r\n/**\r\n * @function\r\n * @description Updates the array holding words' ID's.\r\n */\r\nfunction getWordsOrder () {\r\n  const wordOrder = parent.children\r\n  for (let i = 0; i <= wordOrder.length - 1; i++) {\r\n    divIdsOrder.push(wordOrder[i].id)\r\n  }\r\n}\r\n\r\n/**\r\n * @function\r\n * @description Checks answers and manages marking errors in the layout.\r\n */\r\nfunction checkAnswer () {\r\n  getWordsOrder()\r\n  let joinedWords = ''\r\n  for (let i = 0; i < divIdsOrder.length; i++) {\r\n    joinedWords += (!i ? '' : ' ') + document.querySelector('#' + divIdsOrder[i]).innerHTML\r\n  }\r\n  const finalSentence = joinedWords.split(' ')\r\n\r\n  if (joinedWords === sentences[drawnAnswer]) {\r\n   \r\n    for (const word of document.querySelectorAll('div.droptarget')) {\r\n      word.draggable = false\r\n      word.style.userSelect = 'none'\r\n      word.class = 'droptarget'\r\n      document.querySelector('#btnCheck').disabled = true\r\n    }\r\n    dragula([parent]),{\r\n      moves:  () => {\r\n        return false;\r\n      }\r\n    } \r\n    setTimeout(() => { alert('Correct') }, 100)\r\n  } else {\r\n    setTimeout(() => { alert('WrongAnswer') }, 100)\r\n  }\r\n\r\n  for (let i = 0; i < finalSentence.length; i++) {\r\n    document.querySelector('#' + divIdsOrder[i]).style.backgroundColor = finalSentence[i] !== words[i] ? 'red' : 'silver'\r\n  }\r\n\r\n  /**\r\n * @function\r\n * @description Clears our arrays to enable redoing the order of them\r\n */\r\n  finalSentence.splice(0, finalSentence.length)\r\n  divIdsOrder.splice(0, divIdsOrder.length) \r\n}\r\n\r\nconst checkButon = document.querySelector('#btnCheck')\r\ncheckButon.addEventListener('click', checkAnswer)\r\n\r\nwindow.onload = () => createLayout()\r\n\n\n//# sourceURL=webpack://my-webpack-project/./public/script.js?")
      /***/ }

    /******/ 	})
  /************************************************************************/
  /******/
  /******/ 	// startup
  /******/ 	// Load entry module and return exports
  /******/ 	// This entry module can't be inlined because the eval devtool is used.
  /******/ 	const __webpack_exports__ = {}
  /******/ 	__webpack_modules__['./public/script.js']()
/******/
/******/ })()
