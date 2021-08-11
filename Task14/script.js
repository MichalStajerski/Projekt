const numRows = 7
const numCols = 7
const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const colors = {
  selected: 'blue',
  normal: '#ddd',
  success: 'green'
}
const words = ['dog', 'cat', 'ape', 'dice']
const wordsAfterCrossingShuffle = []
const takenSquares = []
const answers = []
const crossArray = []
// instead of random so we will not draw from squares that are already taken
const arrayForDraw = []
for (let i = 0; i < numCols * numRows - 1; i++) {
  arrayForDraw.push(i)
}

let v = Array(alphabet).map(function (x) {
  return (x.split(''))
})
// reduces to array of elements instead of array of arrays
v = [].concat.apply([], v)

const arraysAreEqual = (a1, a2) => a1.length === a2.length && a1.every(el => a2.includes(el))
const randomArrayElement = (array) => Math.floor(Math.random() * array.length)
const descByLengthOfElementInArray = (a1) => a1.sort((el1, el2) => el2.length - el1.length)
const haveSameLetter = (w1, w2, el) => w1.includes(el) && w2.includes(el)
const arrayhHasDuplicate = (a1) => new Set(a1).size !== a1.length
descByLengthOfElementInArray(words)

let text = ''
let canCross = true
/**
 * @type int[]
 */
const clickedTiles = []
let pairOfWords = 0
let temp = []
let toRemove = 0

window.onload = () => {
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
  for (let i = 0; i < wordsAfterCrossingShuffle.length; i++) {
    const searchedAnswer = document.createElement('div')
    searchedAnswer.id = wordsAfterCrossingShuffle[i]
    searchedAnswer.innerHTML = wordsAfterCrossingShuffle[i]
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
      // if we check a word that is being crossed with another we remove the letter that is being shared between them from id
      console.log('canCross before ',canCross)
      console.log('xddd',arrayhHasDuplicate([].concat.apply([], answers)))
      if(canCross ===true){
        text === wordsAfterCrossingShuffle[0] ? document.getElementById(crossArray[pairOfWords][1]).id = crossArray[pairOfWords][1].replace(crossArray[pairOfWords][2], '') : false
        text === wordsAfterCrossingShuffle[1] ? document.getElementById(crossArray[pairOfWords][0]).id = crossArray[pairOfWords][0].replace(crossArray[pairOfWords][2], '') : false
      }
     
      document.getElementById(text).setAttribute('style', 'color: green;text-decoration: line-through;')
      text = ''

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
  // returns table with values
  actionForCrossSearch()
  if (canCross === true && crossArray[0] !== undefined) {
    console.log(crossArray)
    const startSquare = randomArrayElement(arrayForDraw)
    pairOfWords = getRandomIntInclusive(0, crossArray.length - 1)
    wordsAfterCrossingShuffle.push(crossArray[pairOfWords][0], crossArray[pairOfWords][1])
    words.remove(crossArray[pairOfWords][0])
    words.remove(crossArray[pairOfWords][1])
    horizontalDrawCross(startSquare, crossArray[pairOfWords][7], 0, pairOfWords)
  }
  console.log('words', words)
  const numWords = words.length
  for (let i = 0; i < numWords; i++) {
    const wordLength = words[i].length
    wordsAfterCrossingShuffle.push(words[i])
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
  const splitWords = wordsAfterCrossingShuffle.map(function (x) {
    return x.split('')
  })

  const merged = [].concat.apply([], answers)
  const merged2 = [].concat.apply([], splitWords)
  console.log('merged2', merged2)
  console.log('merged', merged)
  console.log('arrayhasDuplicate', arrayhHasDuplicate([].concat.apply([], answers)))
  // for drawn answers write letters from array merged2
  for (let i = 0; i < merged.length; i++) {
    const tileId = merged[i].toString()
    const tile = document.getElementById(tileId)
    tile.innerHTML = merged2[i]
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
    if ((startSquare + i) % modulo === 6 || takenSquares.includes(startSquare + i) || startSquare < 0 || startSquare + wordLength - 1 > numRows * numCols - 1) {
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
    }// moving our second word vertically so the letters match correctly
  } if (crossArray[0] !== undefined && startSquare != answers[0][crossArray[i][3]] - crossArray[i][4]) {
    arrayForDraw.remove(answers[0][crossArray[i][3]] - crossArray[i][4])
    takenSquares.push(answers[0][crossArray[i][3]] - crossArray[i][4])
    // now remove the shared square for future draws
    arrayForDraw.remove(toRemove)
    takenSquares.push(toRemove)
  }
  for (let j = 0; j < wordLength; j++) {
    arrayForDraw.remove(startSquare + j)
    takenSquares.push(startSquare + j)
    temp.push(startSquare + j)
  }
  answers.push(temp)
  temp = []

  answers[i].sort(function (a, b) {
    return a - b
  })
}
// excess of code, another function probably isn't needed, need to simplify this/just use horiontal
function horizontalDrawCross (startSquare, wordLength, i, pairOfWords) {
  for (let i = 1; i < wordLength; i++) {
    while (conditionsHorizontal(startSquare, wordLength, numCols)) {
      startSquare = randomArrayElement(arrayForDraw)
      canCross === false
    }
  }
  for (let j = 0; j < wordLength; j++) {
    // do not place a square that is being shared by two words so upon checking on conditions in verticalDraw it can pass
    if (j != crossArray[pairOfWords][3]) {
      arrayForDraw.remove(startSquare + (numRows * j))
      takenSquares.push(startSquare + (numRows * j))
      // save the shared square to variable and remove it after finding squares for two words, so it does won't be used in other draws
    } else toRemove = startSquare + (numRows * j)

    temp.push(startSquare + (numRows * j))
  }
  console.log('takenSquares', takenSquares)
  answers[i] = temp
  temp = []

  answers[i].sort(function (a, b) {
    return a - b
  })
  // answers[i][crossArray[pairOfWords][3]] - crossArray[pairOfWords][4] positions us on a right square for crossing
  verticalDraw(answers[i][crossArray[pairOfWords][3]] - crossArray[pairOfWords][4], crossArray[pairOfWords][8], 1)
}

// function returns words with common char, this char, indexes at which char is existing in said words,indexes at which words are placed in words array
// and finally lenghth of two words
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
