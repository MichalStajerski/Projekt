const numLeters = 15
const numNumbers = 13
const numAnswers = 13
const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const colors = {
  default: 'lightgrey',
  selected: 'orange',
  correct: 'green'
}
const clickedsquares = []
const answers = []
const answersForRead = []
const takenSquares = []
let canMarkSquare = true
const w = window.innerWidth
const h = window.innerHeight
console.log('width&height', w, h)

function createLayout () {
  const layout = document.getElementById('layout')
  for (let colIndex = 0; colIndex <= (numLeters + 1); colIndex++) {
    const col = document.createElement('div')
    col.id = 'col' + colIndex
    for (let rowIndex = 0; rowIndex <= (numNumbers + 1); rowIndex++) {
      const square = document.createElement('div')
      if (rowIndex > 0 && rowIndex <= numNumbers && colIndex > 0 && colIndex <= numLeters) {
        square.id = alphabet[colIndex - 1] + rowIndex
        square.onclick = () => squareClicked(square)
        square.className = 'square'
      } else {
        square.id = 'square' + rowIndex
        square.className = 'squareNoHover'
      }
      square.style.backgroundColor = colors.default
      col.appendChild(square)
    }
    layout.appendChild(col)
  }
  const asnwerBoard = document.getElementById('answerBoard')

  for (let i = 0; i < answersForRead.length; i++) {
    const answer = document.createElement('div')
    answer.id = 'answer'
    answer.className = 'answer'
    answer.innerHTML = answersForRead[i]
    asnwerBoard.appendChild(answer)
  }

  fillSignsForLayout()
}
function fillSignsForLayout () {
  for (let i = 1; i < numNumbers + 1; i++) {
    document.getElementById('col0').children[i].innerHTML = i// first column except first and last
    document.getElementById('col' + (numLeters + 1)).children[i].innerHTML = i// last column except first and last
  }
  for (let i = 1; i < numLeters + 1; i++) {
    document.getElementById('col' + i).children[0].innerHTML = alphabet[i - 1]// first row except first and last element
    document.getElementById('col' + i).children[numNumbers + 1].innerHTML = alphabet[i - 1]// last row except first and last element
  }
}

function checkAnswers (square) {
  for (let i = 0; i < clickedsquares.length; i++) {
    if (answers.includes(square.id)) {
      square.style.backgroundColor = colors.correct
      // and it deletes the asnwer so only the remaining correct ones remain
      answers.splice(answers.indexOf(square.id), 1)
      clickedsquares.splice(clickedsquares.indexOf(square.id), 1)
      square.onclick = () => null // if correct we can't uncheck the answer
      console.log('clickedsquares', clickedsquares)
    }
  }
  if (!answers.length && !clickedsquares.length) {
    setTimeout(() => {
      canMarkSquare = false
      alert('Victory')
      document.location.reload(true)
    }, 500)
  }
  console.log('answers', answers)
}

function squareClicked (square) {
  if (canMarkSquare != false) {
    if (square.style.backgroundColor !== colors.selected) {
      square.style.backgroundColor = colors.selected
      // adds answer
      clickedsquares.push(square.id)
    } else {
      // unclicks to usual color
      square.style.backgroundColor = colors.default
      // removes answerd by value
      clickedsquares.splice(clickedsquares.indexOf(square.id), 1)
    }
    console.log('clickedSquares', clickedsquares)
    checkAnswers(square)
  }
}

function drawAnswers (numAnswers) {
  // first we need to decide number of coordinates to find
  // that number is related to the difficulty lvl so i assume its a fixed number accrding to each lvl
  // so i wont imlpement here any algorithm to deduce that number based on the surface of the board we are given

  while (numAnswers > 0) {
    const decider = getRandomIntInclusive(0, 2)
    let letter = alphabet[getRandomIntInclusive(0, numLeters - 1)]
    let number = getRandomIntInclusive(1, numNumbers)
    const length = getRandomIntInclusive(1, numAnswers)
    switch (decider) {
      case 0: // one sqaure as an answer
        while (takenSquares.includes(letter + number) && number > numNumbers) {
          letter = alphabet[getRandomIntInclusive(0, numLeters - 1)]
          number = getRandomIntInclusive(1, numNumbers)
        }
        answers.push(letter + number)
        answersForRead.push(letter + number)
        takenSquares.push(letter + number)
        numAnswers--
        break
      case 1:// inline set of answers in columns
        // need to make sure not more than 5 answers are being drawn
        while (number + length > numNumbers || takenSquares.includes(letter + number)) { // prevents from getting drawing answers that are byond numNumbers
          number = getRandomIntInclusive(1, Math.floor(numNumbers / 2))
          letter = alphabet[getRandomIntInclusive(0, numLeters - 1)]
        }
        answers.push(letter + number)
        takenSquares.push(letter + number)
        for (let i = 1; i < length; i++) {
          answers.push(letter + (number + i))
          takenSquares.push(letter + (number + i))
          if (i === length - 1) {
            answersForRead.push(letter + number + '=>' + letter + (number + i))
          }
        }
        numAnswers -= length
        break
      case 2:
      // in rows
        while (alphabet.indexOf(letter) + length > numLeters || takenSquares.includes(letter + number)) { // prevents from getting drawing answers that are beyond numLetters
          letter = alphabet[getRandomIntInclusive(0, numLeters)]
          number = getRandomIntInclusive(1, Math.floor(numNumbers / 2))
        }
        answers.push(letter + number)
        takenSquares.push(letter + number)
        for (let i = alphabet.indexOf(letter) + 1; i < alphabet.indexOf(letter) + length; i++) {
          answers.push(alphabet[i] + number)
          takenSquares.push(alphabet[i] + number)
          if (i === alphabet.indexOf(letter) + length - 1) {
            answersForRead.push(letter + number + '=>' + alphabet[i] + number)
          }
        }
        numAnswers -= length
        break
    }
  }
}

function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

window.onload = () => {
  drawAnswers(numAnswers)
  createLayout()
  // based on the number of letters and words we deduct the size of squaers so they always fit - we choose the larger number
  var elements = document.getElementsByClassName('square')
  // we determine the largest number between the two and continue with calculating the size value based on that naumber
  const largerElement = numNumbers > numLeters ? numNumbers : numLeters
  // based on the largerElement we set divident accrding to height or width of window, same goes for divider
  const divident = largerElement === numNumbers ? 837 : 1707
  const divider = largerElement === numNumbers ? 1.3 : 2.2
  const size = divident / (divider * largerElement)

  console.log('size', size)
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.width = (size + 'px')
    elements[i].style.height = (size + 'px')
  }

  var elements = document.getElementsByClassName('squareNoHover')
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.width = (size + 'px')
    elements[i].style.height = (size + 'px')
  }
}