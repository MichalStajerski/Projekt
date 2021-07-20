const numRows = 7
const numCols = 7
const colors = {
  selected: 'blue',
  normal: '#ddd',
  success: 'green'
}
const words = ['dog', 'ape', 'cat', 'dice']

const splitWords = words.map(function (x) {
  for (let i = 0; i < words.length; i++) {
    return x.split('')
  }
})

const takenSquares = []
const answers = []
const arraysAreEqualLength = (a1, a2) => a1.length === a2.length
const arraysAreEqual = (a1, a2) => a1.length === a2.length && a1.every(el => a2.includes(el))

console.log('splitwords', splitWords)
/**
 * @type string[]
 */
const clickedTiles = []
let temp = []
window.onload = function () {
  drawSquaresForWords()
  createTiles()
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
    clickedTiles.sort(function (a, b) {
      return a - b
    })
    checkAnswer(clickedTiles)
  } else {
    // unclicks to usual color
    tile.style.backgroundColor = colors.normal
    // removes answerd by value
    const index = clickedTiles.indexOf(id)
    clickedTiles.splice(index, 1)
    clickedTiles.sort(function (a, b) {
      return a - b
    })
    checkAnswer(clickedTiles)
  }
}

// creates our front
function createTiles () {
  const container = document.getElementById('container')
  container.innerHTML = ''// don't want any extra boxes when you call this function again
  console.log(numRows)
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
    console.log('answer: ', answers[i])
    // Tried to use arraysAreEqual but checking stoped working need to look into that
    if (arraysAreEqual(clickedTiles, answers[i])) {
      for (let j = 0; j < clickedTiles.length; j++) {
        const marked = document.getElementById(clickedTiles[j])
        marked.style.backgroundColor = colors.success
        // blocks onclick after correct word was found
        marked.onclick = null
        // deletes tiles from answer array
        for (let k = 0; k < answers.length; k++) {
          answers[k].remove(clickedTiles[j])
        }
      }
      // resets our array of answers after positive check so we can look for other answers
      console.log('answersLength', answers.length)
      clickedTiles.splice(0, clickedTiles.length)
    }
  }
}

// random char to fill squares outside of answers
function randomCharacter () {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
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
  const numWords = words.length
  for (let i = 0; i < numWords; i++) {
    const wordLength = words[i].length

    let startSquare = getRandomIntInclusive(0, 48)

    console.log('wordslength', wordLength)
    const direction = getRandomIntInclusive(0, 1)
    // vertical allignment of word
    if (!direction) {
      for (let i = 1; i < wordLength; i++) {
        while (conditionsVertical(startSquare, wordLength, numCols)) {
          startSquare = getRandomIntInclusive(0, 48)
        }
      }
      if (startSquare + (wordLength - 1) * numRows < 48) {
        for (let j = 0; j < wordLength; j++) {
          takenSquares.push(startSquare + (numRows * j))
          temp.push(startSquare + (numRows * j))
        }
        answers.splice(i, 0, temp)
        temp = []
      } else {
        for (let j = 0; j < wordLength; j++) {
          takenSquares.push(startSquare - (numRows * j))
          temp.push(startSquare - (numRows * j))
        }
        answers.splice(i, 0, temp)
        temp = []
      }
      answers[i].sort(function (a, b) {
        return a - b
      })
    } else { // horizontal allignment of word
      for (let i = 1; i < wordLength; i++) {
        while (conditionsHorizontal(startSquare, wordLength, numRows)) {
          startSquare = getRandomIntInclusive(0, 48)
        }
      }
      console.log('startsquare', startSquare)
      for (let j = 0; j < wordLength; j++) {
        takenSquares.push(startSquare + j)
        temp.push(startSquare + j)
      }
      answers.splice(i, 0, temp)
      temp = []

      answers[i].sort(function (a, b) {
        return a - b
      })
    }
  }
  console.log('answers', answers)
  console.log('takensquares', takenSquares)
}

function drawLettersForsquares (square) {
  const merged = [].concat.apply([], answers)
  const merged2 = [].concat.apply([], splitWords)
  console.log('merged2', merged2)
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
function conditionsHorizontal (startSquare, wordLength, modulo) {
  for (let i = 0; i < wordLength; i++) {
    if ((startSquare + i) % modulo === 6 || takenSquares.includes(startSquare + i) || startSquare + wordLength - 1 > numRows * numCols - 1) {
      return true
    }
  }
}
// checks squares up and down in comparison with takenSquares array
function conditionsVertical (startSquare, wordLength, numRows) {
  for (let i = 0; i < wordLength; i++) {
    if (takenSquares.includes(startSquare + (numRows * i)) || takenSquares.includes(startSquare - (numRows * i))) {
      return true
    }
  }
}
