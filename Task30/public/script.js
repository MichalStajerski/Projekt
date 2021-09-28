let dragIndex = 0
const divIdsOrder = []
let clone = ''

const sentences = [
  'Dziś jest bardzo pochmurny dzień',
  'Proszę Państwa Pan Paweł będzie skakał',
  'Jest tu jakiś cwaniak?',
  'Najlepsze kasztany są na placu Pigal w Paryżu',
  'Ryszard ty draniu oddaj rower'
]

/**
 * @function
 * @description Randomly changes order of objects in the array.
 * @param {Array} array - an array of objects to shuffle.
 * @returns {Array}
 */
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5)

/**
 * @function
 * @description Returns a random integer in a given range.
 * @param {int} min - bottom border of the range
 * @param {int} max - top border of the range
 * @returns {int}
 */
const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

/**
 * @function
 * @description Draws one of the given sentences
 */
const drawnAnswer = getRandomIntInclusive(0, sentences.length - 1)
const words = sentences[drawnAnswer].split(' ')
const wordsOrder = []
// console.log('words', words)

function drawOrderOfWords () {
  for (let i = 0; i < words.length; i++) {
    wordsOrder.push(i)
  }
  shuffleArray(wordsOrder)
}

/**
 * @function
 * @description Writes words of the sentence into divs.
 */
function insertWordIntoDiv (array) {
  for (let i = 0; i < array.length; i++) {
    document.querySelector('#word' + i).innerHTML = words[array[i]]
  }
}

/**
 * @function
 * @description Builds the page layout, creates the sentence to correct.
 * @param {Array} array
 */
function createLayout () {
  const sentenceContainer = document.querySelector('#parent')
  for (let i = 0; i < words.length; i++) {
    const word = document.createElement('div')
    word.id = 'word' + i
    word.className = 'droptarget'
    sentenceContainer.appendChild(word)
  }

  drawOrderOfWords()
  insertWordIntoDiv(wordsOrder)

  dragula([document.querySelector('#parent')]);
}

/**
 * @function
 * @description Updates the array holding words' ID's.
 */
function getWordsOrder () {
  const wordOrder = document.querySelector('#parent').children
  for (let i = 0; i <= wordOrder.length - 1; i++) {
    divIdsOrder.push(wordOrder[i].id)
  }
}

/**
 * @function
 * @description Checks answers and manages marking errors in the layout.
 */
function checkAnswer () {
  getWordsOrder()
  let joinedWords = ''
  for (let i = 0; i < divIdsOrder.length; i++) {
    joinedWords += (!i ? '' : ' ') + document.querySelector('#' + divIdsOrder[i]).innerHTML
  }
  let finalSentence = joinedWords.split(' ')

  if (joinedWords === sentences[drawnAnswer]) {
    for (const word of document.querySelectorAll('div.droptarget')) {
      word.draggable = false
      word.style.userSelect = 'none'
      document.querySelector('#btnCheck').disabled = true
    }
    setTimeout(() => { alert('Correct') }, 100)
  } 
    else {
    setTimeout(() => { alert('WrongAnswer') }, 100)
  }

  for (let i = 0; i < finalSentence.length; i++) {
    document.querySelector('#' + divIdsOrder[i]).style.backgroundColor = finalSentence[i] !== words[i] ? 'red' : 'silver'
  }
  
  /**
 * @function
 * @description Clears our arrays to enable redoing the order of them
 */
  finalSentence.splice(0, finalSentence.length)
  divIdsOrder.splice(0, divIdsOrder.length)
}

const checkButon = document.querySelector('#btnCheck')
checkButon.addEventListener('click',checkAnswer)

window.onload = () => createLayout()