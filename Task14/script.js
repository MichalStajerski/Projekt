//TODO: now that word crossing works the words aren't being crossed out when share char since previously 
//we were building up the id of div from letters in checked tlies now after one word is srossed out we miss the needed letter for 
//the other one
//currently one word can only cross with different one, a scenario where one word would be crossing for example with three words would nedd 
//implmentation
//afeter that implement the changes to electron version of this app   
const numRows = 7
const numCols = 7
const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const colors = {
  selected: 'blue',
  normal: '#ddd',
  success: 'green'
}
const words = ['dog', 'cat', 'ape', 'dice']
const takenSquares = []
const answers = []
let crossArray = []
let available = []
for(let i =0;i<words.length;i++){
available[i] = i
}
// instead of random so we will not draw from squares that are already taken
const arrayForDraw = []
for (let i = 0; i < numCols * numRows - 1; i++) {
  arrayForDraw.push(i)
}

let v = Array(alphabet).map(function (x) {
  return (x.split(''))
})
//reduces to array of elements instead of array of arrays
v = [].concat.apply([], v)

const arraysAreEqual = (a1, a2) => a1.length === a2.length && a1.every(el => a2.includes(el))
const randomArrayElement = (array) => Math.floor(Math.random() * array.length)
const descByLengthOfElementInArray = (a1) => a1.sort((el1, el2) => el2.length - el1.length)
const haveSameLetter = (w1, w2, el) => w1.includes(el) && w2.includes(el)
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
  titleForBoard.innerHTML = 'Search for words:'
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
      //need to change crossing put words, implemented taht logic previously when words were drawn in a way that they never crossed 
      //so it worked back then

      // document.getElementById(text).setAttribute('style', 'color: green;text-decoration: line-through;')
      //text = ''

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
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
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
  //returns table with values
  actionForCrossSearch()
  //here i don't reduce to array instead of array of arrays for now beacuse later maybe we will have a set of words with common char
  //instead of one find  
  //returns undefined when there are no mathces
  if (canCross === true && crossArray[0] !== undefined) {
    // const direction = getRandomIntInclusive(0,1)
    console.log(crossArray)
    const startSquare = randomArrayElement(arrayForDraw)
    let pairOfWords = getRandomIntInclusive(0,crossArray.length-1)
    console.log('word1 & word2: ',crossArray[pairOfWords][0],crossArray[pairOfWords][1])
    // console.log('cross8',cross[0][8])
    const firstWord = words.indexOf(crossArray[pairOfWords][0])
    words.remove(crossArray[pairOfWords][0])
    words.remove(crossArray[pairOfWords][1])
    horizontalDrawCross(startSquare, crossArray[pairOfWords][7], 0,pairOfWords)
    //console.log('an place', answers[pairOfWords][crossArray[pairOfWords][3]])
    canCross = false
  }
  const numWords = words.length
  //value of i is either 2 when tjere are 2 matches for crossing words so we exclude them or 0 when every words has qnique letters
  for (let i = 0; i < numWords; i++) {
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
    tile.innerHTML = 'answer'
  }
  // else draw random letters for others squares
  for (let i = 0; i < numRows * numCols; i++) {
    if (!merged.includes(i)) {
      tileId = i.toString()
      const tile = document.getElementById(tileId)
      tile.innerHTML = (randomCharacter())
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
    if (takenSquares.includes(startSquare + (numRows * i)) || takenSquares.includes(startSquare - (numRows * i)) || startSquare + (wordLength - 1) * numRows > 48) {
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
  for (let j = 0; j < wordLength; j++) {
    arrayForDraw.remove(startSquare + (numRows * j))
    takenSquares.push(startSquare + (numRows * j))
    temp.push(startSquare + (numRows * j))
  }
  answers.push(temp)
  temp = []

  answers[i].sort(function (a, b) {
    return a - b
  })
}

function verticalDraw (startSquare, wordLength, i) {
  for (let i = 1; i < wordLength; i++) {
    while (conditionsVertical(startSquare, wordLength, numRows)) {
      startSquare = randomArrayElement(arrayForDraw)
    }//moving our second word vertically so the letters match correctly
  } if (crossArray[0] !== undefined && startSquare != answers[0][crossArray[i][3]] - crossArray[i][4]) {
    arrayForDraw.remove(answers[0][crossArray[i][3]] - crossArray[i][4])
    takenSquares.push(answers[0][crossArray[i][3]] - crossArray[i][4])
  }
  for (let j = 0; j < wordLength; j++) {
    arrayForDraw.remove(startSquare + j)
    takenSquares.push(startSquare + j)
    temp.push(startSquare + j)
  }
  answers.push(temp)
  //answers.splice(i, 0, temp)
  temp = []

  answers[i].sort(function (a, b) {
    return a - b
  })
}
//excess of code, another function probably isn't needed, need to simplify this/just use horiontal
function horizontalDrawCross (startSquare, wordLength, i,pairOfWords) {
  for (let i = 1; i < wordLength; i++) {
    while (conditionsHorizontal(startSquare, wordLength, numCols)) {
      startSquare = randomArrayElement(arrayForDraw)
    }
  }
  for (let j = 0; j < wordLength; j++) {
    if (j != crossArray[i][3]) {
      arrayForDraw.remove(startSquare + (numRows * j))
      takenSquares.push(startSquare + (numRows * j))
    }
    temp.push(startSquare + (numRows * j))
  }
  //answers.splice(i, 0, temp)
  answers[i] = temp
  temp = []

  answers[i].sort(function (a, b) {
    return a - b
  })
  console.log(answers)
  console.log('square',answers[i][crossArray[i][3]] - crossArray[i][4])
  console.log('square without sub',crossArray[i][3])
  console.log('final square',answers[i][crossArray[pairOfWords][3]])
  console.log('word length', crossArray[pairOfWords][8])
  const secondWord = words.indexOf(crossArray[pairOfWords][1])
  verticalDraw(answers[i][crossArray[pairOfWords][3]] - crossArray[pairOfWords][4], crossArray[pairOfWords][8],1 )
}

//function returns words with common char, this char, indexes at which char is existing in said words,indexes at which words are placed in words array
//and finally lenghth of two words
//function always returns one pair of words so crossed words will be the same for now unelss we change letters so it finds other matches
function actionForCrossSearch () {
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (j !== i) {
        for (let k = 0; k < v.length; k++) {
          if (haveSameLetter(words[i], words[j], v[k])) {
            console.log('indexes of words', i, j)
            crossArray.push([words[i], words[j], v[k], words[i].indexOf(v[k]), words[j].indexOf(v[k]), i, j, words[i].length, words[j].length])
          }
        }
      }
    }
  }
}