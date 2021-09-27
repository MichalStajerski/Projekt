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
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5) // shuffles our words in random order
/**
 * @function
 * @description Returns a random integer in a given range.
 * @param {int} min - bottom border of the range
 * @param {int} max - top border of the range
 * @returns {int}
 */
const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
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

function insertWordIntoDiv (array) {
  for (let i = 0; i < array.length; i++) {
    document.querySelector('#word' + i).innerHTML = words[array[i]]
  }
}

function drag (e) {
  e.dataTransfer.setData('text/plain', e.target.id)
}


function allowDrop (e) {
  e.preventDefault()
}

function drop (e) {
  e.preventDefault()
  clone = e.target.cloneNode(true)
  const data = e.dataTransfer.getData('text')
  // console.log('data', data)
  const nodelist = document.getElementById('parent').childNodes
  for (let i = 0; i < nodelist.length; i++) {
    if (nodelist[i].id === data) {
      dragIndex = i
    }
  }
  console.log('data',data)
  if (document.querySelector(`#${data}`) !== e.target) {
    document.querySelector('#parent').replaceChild(document.querySelector('#' + data), e.target)
    document.querySelector('#parent').insertBefore(clone, document.querySelector('#parent').childNodes[dragIndex])
  }
}


function dragstart_handler(ev) {
  console.log("dragStart");
  ev.dataTransfer.setData("text", ev.target.id);
 }

/**
 * @function
 * @param {Array} array
 */
function createLayout () {
  const sentenceContainer = document.querySelector('#parent')
  for (let i = 0; i < words.length; i++) {
    const word = document.createElement('div')
    word.id = 'word' + i
    word.className = 'droptarget'

    word.draggable = 'true'
    
    
    // word.addEventListener('ondragover', function(){
    //   e.preventDefault()
    // },false)
    
    // word.ondragover = () => {allowDrop()}
    word.setAttribute('ondragover', 'allowDrop(event)')
    word.setAttribute('ondragstart', 'drag(event)')
    // word.addEventListener('ondragstart', () => {dragstart_handler()})
    word.setAttribute('ondrop', 'drop(event)')
    sentenceContainer.appendChild(word)
  }

  drawOrderOfWords()
  insertWordIntoDiv(wordsOrder)
}

/**
 * @function 
 * @description Loops through all the child elements inside the parent div
 */
 function getWordsOrder () {
  const wordOrder = document.querySelector('#parent').children
  for (i = 0; i <= wordOrder.length - 1; i++) {
    divIdsOrder.push(wordOrder[i].id)
  }
}

/**
 * @function
 * @description 
 */
function checkAnswer () {
  getWordsOrder()
  let joinedWords = ''
  for (let i = 0; i < divIdsOrder.length; i++) {
    joinedWords += (!i ? '' : ' ') + document.querySelector('#' + divIdsOrder[i]).innerHTML
  }
  finalSentence = joinedWords.split(' ')
  
  if(joinedWords === sentences[drawnAnswer]) {
    for(let word of document.querySelectorAll('div.droptarget')) {
      word.draggable = false
      word.style.userSelect = 'none'
    }
    setTimeout(() => { alert('Correct') }, 100)
  } else {
    setTimeout(() => { alert('WrongAnswer') }, 100)
  }

  for (let i = 0; i < finalSentence.length; i++) {
    document.querySelector('#' + divIdsOrder[i]).style.backgroundColor = finalSentence[i] !== words[i] ? 'red' : 'silver'
  }
  finalSentence.splice(0, finalSentence.length)
  divIdsOrder.splice(0, divIdsOrder.length)
}

window.onload = createLayout()
