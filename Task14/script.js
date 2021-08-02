const numRows = 7
const numCols = 7
const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const colors = {
  selected: 'blue',
  normal: '#ddd',
  success: 'green'
}
const words = ['dog', 'ape', 'cat','dice']
const takenSquares = []
const answers = []
// instead of random so we will not draw from squares that are already taken
const arrayForDraw = []
for (let i = 0; i < numCols * numRows - 1; i++) {
  arrayForDraw.push(i)
}
var MAX_CHAR = 26
const v = Array(alphabet).map(function (x){
  return (x.split(''))
})

const arraysAreEqual = (a1, a2) => a1.length === a2.length && a1.every(el => a2.includes(el))
const randomArrayElement = (array) => Math.floor(Math.random() * array.length)
const descByLengthOfElementInArray = (a1) => a1.sort((el1, el2) => el2.length - el1.length)
const haveSameLetter = (w1,w2,el) => w1.includes(el) && w2.includes(el)
descByLengthOfElementInArray(words)
const splitWords = words.map(function (x) {
  return x.split('')
})
let text = ''
let canCross = true

/**
 * @type int[]
 */
const clickedTiles = []
let temp = []
window.onload = function () {
  drawSquaresForWords()
  createLayout()
  console.log('asnwers', answers)
}

/**
 *
 * @param {string} id
 */
function tileClicked (tile, id) {
  // marks in blue color after click
  if (tile.style.backgroundColor !== colors.selected) {
    tile.style.backgroundColor = colors.selected
    // adds answer
    clickedTiles.push(id)
  } else {
    // unclicks to usual color
    tile.style.backgroundColor = colors.normal
    // removes answerd by value
    const index = clickedTiles.indexOf(id)
    clickedTiles.splice(index, 1)
  }
  clickedTiles.sort(function (a, b) {
    return a - b
  })
  checkAnswer(clickedTiles)
}

function drawBoard () {
  const board = document.getElementById('board')
  board.className = 'board'
  const titleForBoard = document.createElement('div')
  titleForBoard.innerHTML = 'Search for words: <br>'
  board.appendChild(titleForBoard)
  for (let i = 0; i < words.length; i++) {
    const searchedAnswer = document.createElement('div')
    searchedAnswer.id = words[i]
    searchedAnswer.innerHTML = words[i]
    board.appendChild(searchedAnswer)
  }
}

// creates our front
function createLayout () {
  drawBoard()
  const container = document.getElementById('container')
  container.innerHTML = ''// don't want any extra boxes when you call this function again
  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    const row = document.createElement('div')
    row.className = 'row'
    for (let colIndex = 0; colIndex < numCols; colIndex++) {
      const tile = document.createElement('div')
      tile.className = 'box'
      tile.id = (rowIndex * numCols + colIndex)
      tile.onclick = () => tileClicked(tile, rowIndex * numCols + colIndex)
      row.appendChild(tile)
    }
    container.appendChild(row)
  }
  drawLettersForsquares()
}

function checkAnswer (clickedTiles) {
  console.log(clickedTiles)
  for (let i = 0; i < answers.length; i++) {
    if (arraysAreEqual(clickedTiles, answers[i])) {
      for (let j = 0; j < clickedTiles.length; j++) {
        const marked = document.getElementById(clickedTiles[j])
        marked.style.backgroundColor = colors.success
        // blocks onclick after correct word was found
        marked.onclick = null
        // changing class so there is no more box hover tranition on good answers
        marked.className = 'boxNoHover'
        // deletes tiles from answer array
        for (let k = 0; k < answers.length; k++) {
          answers[k].remove(clickedTiles[j])
        }
        // i place the text together so i can get the id for board to cross out
        text += document.getElementById(clickedTiles[j]).innerHTML
      }
      //document.getElementById(text).setAttribute('style', 'color: green;text-decoration: line-through;')
      //text = ''
      // delete alert after good answer
      answers.splice(i, 1)
      // when there are no more answers show alert
      if (!answers.length) {
        setTimeout(() => {
          alert('Victory')
          // blocks all the tiles after win
          for (let i = 0; i < numCols * numRows; i++) {
            document.getElementById(i).onclick = null
            document.getElementById(i).className = 'boxNoHover'
          }
        }, 100)
      }
      // resets our array of answers after positive check so we can look for other answers
      clickedTiles.splice(0, clickedTiles.length)
    }
  }
}

// random char to fill squares outside of answers
function randomCharacter () {
  const randomCharacter = alphabet[randomArrayElement(alphabet)]
  return randomCharacter
}
// remove from array by value
Array.prototype.remove = function () {
  let what; const a = arguments; let L = a.length; let ax
  while (L && this.length) {
    what = a[--L]
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1)
    }
  }
  return this
}
function drawSquaresForWords () {
 if(canCross===true){
  const cross =[actionForCrossSearch()]
  // const direction = getRandomIntInclusive(0,1)
  console.log(cross)
  const startSquare = randomArrayElement(arrayForDraw)
  // console.log('cross8',cross[0][8])
  horiDrawCross(startSquare,cross[0][7],0)
  verticalDraw(startSquare,cross[0][8],1)
  
  // words.remove(words[0])
  // words.remove(words[1])
  canCross = false
 }
  const numWords = words.length
  for (let i = 2; i < numWords; i++) {
    const wordLength = words[i].length
    // using array instead of getRandom so we won't draw squares that are already taken
    const startSquare = randomArrayElement(arrayForDraw)
    const direction = getRandomIntInclusive(0, 1)
    // vertical allignment of word
    if (!direction) {
      verticalDraw(startSquare, wordLength, i)
    } else { // horizontal allignment of word
      horizontalDraw(startSquare, wordLength, i)
    }
  }
}

function drawLettersForsquares () {
  const merged = [].concat.apply([], answers)
  const merged2 = [].concat.apply([], splitWords)
  console.log('merged2', merged2)
  console.log('merged', merged)
  // for drawn answers write letters from array merged2
  for (let i = 0; i < merged.length; i++) {
    const tileId = merged[i].toString()
    const tile = document.getElementById(tileId)
    const content = document.createTextNode(merged2[i])
    tile.appendChild(content)
  }
  // else draw random letters for others squares
  for (let i = 0; i < numRows * numCols; i++) {
    if (!merged.includes(i)) {
      tileId = i.toString()
      const tile = document.getElementById(tileId)
      content = document.createTextNode(randomCharacter())
      tile.appendChild(content)
    }
  }
}

function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
// for now i left the conditions like this to check if its working, needs changing horizontal words will never reach last column even
// if its not going to cross to the next row
function conditionsVertical (startSquare, wordLength, modulo) {
  for (let i = 0; i < wordLength; i++) {
    if ((startSquare + i) % modulo === 6 || takenSquares.includes(startSquare + i) || startSquare + wordLength - 1 > numRows * numCols - 1) {
      return true
    }
  }
}
// checks squares up and down in comparison with takenSquares array
function conditionsHorizontal (startSquare, wordLength, numRows) {
  for (let i = 0; i < wordLength; i++) {
    if (takenSquares.includes(startSquare + (numRows * i)) || takenSquares.includes(startSquare - (numRows * i))) {
      return true
    }
  }
}

function horizontalDraw (startSquare, wordLength, i) {
  for (let i = 1; i < wordLength; i++) {
    while (conditionsHorizontal(startSquare, wordLength, numCols)) {
      startSquare = randomArrayElement(arrayForDraw)
    }
  }
  if (startSquare + (wordLength - 1) * numRows < 48) {
    for (let j = 0; j < wordLength; j++) {
      arrayForDraw.remove(startSquare + (numRows * j))
      takenSquares.push(startSquare + (numRows * j))
      temp.push(startSquare + (numRows * j))
    }
    answers.splice(i, 0, temp)
    temp = []
  } else {
    for (let j = 0; j < wordLength; j++) {
      arrayForDraw.remove(startSquare - (numRows * j))
      takenSquares.push(startSquare - (numRows * j))
      temp.push(startSquare - (numRows * j))
    }
    answers.splice(i, 0, temp)
    temp = []
  }
  answers[i].sort(function (a, b) {
    return a - b
  })
}

function verticalDraw (startSquare, wordLength, i) {
  for (let i = 1; i < wordLength; i++) {
    while (conditionsVertical(startSquare, wordLength, numRows)) {
      startSquare = randomArrayElement(arrayForDraw)
    }
  }
  for (let j = 0; j < wordLength; j++) {
    arrayForDraw.remove(startSquare + j)
    takenSquares.push(startSquare + j)
    temp.push(startSquare + j)
  }
  answers.splice(i, 0, temp)
  temp = []

  answers[i].sort(function (a, b) {
    return a - b
  })
}

function horiDrawCross (startSquare, wordLength, i) {
  for (let i = 1; i < wordLength; i++) {
    while (conditionsHorizontal(startSquare, wordLength, numCols)) {
      startSquare = randomArrayElement(arrayForDraw)
    }
  }
  if (startSquare + (wordLength - 1) * numRows < 48) {
    for (let j = 0; j < wordLength; j++) {
      if(j!=0){
        arrayForDraw.remove(startSquare + (numRows * j))
        takenSquares.push(startSquare + (numRows * j))
      }
      temp.push(startSquare + (numRows * j))
    }
    answers.splice(i, 0, temp)
    temp = []
  } else {
    for (let j = 0; j < wordLength; j++) {
      arrayForDraw.remove(startSquare - (numRows * j))
      if(j!=0){
        takenSquares.push(startSquare - (numRows * j))
      }
      temp.push(startSquare - (numRows * j))
    }
    answers.splice(i, 0, temp)
    temp = []
  }
  answers[i].sort(function (a, b) {
    return a - b
  })
}


function serchForwordswithCommonLetter(w1,w2,letter){
  if(haveSameLetter(w1,w2,letter)){
      console.log("word 1 and word 2, letter",w1,w2,letter)
      console.log('index1 and index2',w1.indexOf(letter),w2.indexOf(letter))
      return true
  }
}

function actionForCrossSearch(){
  for(let i=0;i<words.length;i++){
      for(let j =0;j<words.length;j++){
          if(j!==i){
              for(let k = 0;k<v[0].length;k++){
                  if(serchForwordswithCommonLetter(words[i],words[j],v[0][k])){
                      console.log('indexy words',i,j)
                      return [words[i],words[j],v[0][k],words[i].indexOf(v[0][k]),words[j].indexOf(v[0][k]),i,j,words[i].length,words[j].length]
                  }
              }
          }
      }
  }
}



// function indexOfCommonchar (w1, w2) {
//   for(let i =0;i<v.length;i++){
//     if(haveSameLetter(w1,w2,v[0][i])){
//       return w1,w2,v[0][i]
//     }
//   }
// }
// function wordsAndindexesOfcommonChar () {
//   console.log(words[0],words[1])
//   console.log('twostrings',anythingInCommon(words[0],words[1]))
//   for (let i = 0; i < words.length; i++) {
//     for (let j = 0; j < words.length; j++) {
//       if(i!=j){
//         if(indexOfCommonchar(words[i],words[j])){
//           return(indexOfCommonchar(words[i], words[j]))
//         } 
//       }   
//     }
//   }
// }
