let dragindex = 0
const dropindex = 0
let divIdsOrder = []
let clone = ''
const answers = [
  'Dzis jest bardzo pochmurny dzien',
  'Prosze Panstwa Pan Pawel bedzie skakal',
  'Jest tu jakis cwaniak',
  'Najlepsze kasztany sa na placu Pigal w Paryzu',
  'Ryszard ty draniu oddaj rower'
]

const drawnAnswer = getRandomIntInclusive(0, 4)
const words = answers[drawnAnswer].split(' ')
const order = []
console.log('words', words)

function drag (e) {
  e.dataTransfer.setData('text', e.target.id)
}

function drop (e) {
  e.preventDefault()
  clone = e.target.cloneNode(true)
  const data = e.dataTransfer.getData('text')
  const nodelist = document.getElementById('parent').childNodes
  for (let i = 0; i < nodelist.length; i++) {
    if (nodelist[i].id == data) {
      dragindex = i
    }
  }
  if (document.getElementById(data) !== e.target) {
    document.getElementById('parent').replaceChild(document.getElementById(data), e.target)
    document.getElementById('parent').insertBefore(clone, document.getElementById('parent').childNodes[dragindex])
    findElementID()
  }
}

function allowDrop (e) {
  e.preventDefault()
}

function drawOrderOfWords () {
  for (let i = 0; i < words.length; i++) {
    order.push(i)
  }
  shuffleArray(order)
}

function insertWordIntoDiv (array) {
  for (let i = 0; i < array.length; i++) {
    document.getElementById('word' + i).innerHTML = words[array[i]]
  }
}

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

function createLayout (array) {
  const container = document.getElementById('parent')
  for (let i = 0; i < array.length; i++) {
    const word = document.createElement('div')
    word.id = 'word' + i
    word.className = 'droptarget'
    word.draggable = 'true'
    word.setAttribute('ondragstart', 'drag(event)')
    word.setAttribute('ondrop', 'drop(event)')
    word.setAttribute('ondragover', 'allowDrop(event)')
    container.appendChild(word)
  }
}

function checkAnswer () {
  let joinedWords = ''
  for (let i = 0; i < divIdsOrder.length; i++) {
    joinedWords += ' ' + document.getElementById(divIdsOrder[i]).innerHTML
  }
  //deletes the firsr space 
  joinedWords = joinedWords.trim()
  if (joinedWords === answers[drawnAnswer]) {
    setTimeout(() => {
      alert('Correct')
    }, 100)
  } else {
    setTimeout(() => {
      alert('Wrong answer')
    }, 100)
  }
  const finalSentence = []
  const comparison = []
  for (let i = 0; i < divIdsOrder.length; i++) {
    finalSentence.push(document.getElementById(divIdsOrder[i]).innerHTML) 
    document.getElementById(divIdsOrder[i]).draggable = false;
  }
  for (let i = 0; i < finalSentence.length; i++) {
    if (finalSentence[i] !== words[i]) {
      comparison.push(i)
    }
  }
  if (comparison.length !== 0) {
    for (let i = 0; i < comparison.length; i++) {
      document.getElementById(divIdsOrder[comparison[i]]).style.backgroundColor = 'red'
    }
  }
  divIdsOrder = []
  document.getElementById('btnCheck').disabled = true
}

function findElementID () {
  const wordOrder = document.getElementById('parent').children
  divIdsOrder = []
  // Loop through all the child elements inside the parent div.
  for (i = 0; i <= wordOrder.length - 1; i++) {
    divIdsOrder.push(wordOrder[i].id)
  }
  console.log(divIdsOrder)
}
//returns us a randolmy chosen number between two that we specify
function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

window.onload = function () {
  createLayout(words)
  drawOrderOfWords()
  insertWordIntoDiv(order)
}
