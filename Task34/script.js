const numLeters = 7
const numNumbers = 7
let numAnswers = 5
const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const colors = {
  default: 'lightgrey',
  selected: 'orange',
  correct: 'green'
}
const clickedsquares = []
const answers = []
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
      } else {
        square.id = 'square' + rowIndex
      }
      square.className = 'square'
      square.style.backgroundColor = colors.default
      col.appendChild(square)
    }
    layout.appendChild(col)
  }
  const asnwerBoard = document.getElementById('answerBoard')

  for(let i = 0; i < answers.length; i++){
    const answer = document.createElement('div')
    answer.id = 'answer'
    answer.className ='answer'
    answer.innerHTML = answers[i]
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
      const answersDelte = answers.indexOf(square.id)
      const clickedSquaresDelete = clickedsquares.indexOf(square.id)
      // and it deletes the asnwer so only the remaining correct ones remain
      answers.splice(answersDelte, 1)
      clickedsquares.splice(clickedSquaresDelete, 1)
      square.onclick = () => null // if correct we can'y uncheck the answe
      console.log('clickedsquares', clickedsquares)
    }
  }
  if (!answers.length && !clickedsquares.length) {
    setTimeout(() => {
      canMarkSquare = false
      alert('Victory')
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
      const index = clickedsquares.indexOf(square.id)
      clickedsquares.splice(index, 1)
    }
    console.log('clickedSquares', clickedsquares)
    checkAnswers(square)
  }
}
 
function drawAnswers (numAnswers) {
  //first we need to decide number of coordinates to find
  //that number is related to the difficulty lvl so i assume its a fixed number accrding to each lvl 
  //so i wont imlpement here any algorithm to deduce that number based on the surface of the board we are given
  

  //conditions here are similar to task14 so maybe can be reimplemnted in that or similar way until better solution comes up  
  while(numAnswers > 0){
    let decider = getRandomIntInclusive(0,1)
    switch(decider){
      case 0: //one sqaure as an answer 
      let letter = alphabet[getRandomIntInclusive(0,numLeters-1)]
      let number = getRandomIntInclusive(1,numNumbers)
      answers.push(letter+number)
      console.log('answers after push',answers)
      numAnswers--
      break;
      case 1://inline set of answers
        console.log('passed')
        //in columns
        //need to make sure not more than 5 answers are being drawn
        let length = getRandomIntInclusive(1,numAnswers)
        let startSquareLetter = alphabet[getRandomIntInclusive(0,numLeters-1)]
        let startSquareNumber  = getRandomIntInclusive(0,numNumbers)
        while(startSquareNumber+length>numNumbers){//prevents from getting drawing answers that are byond numNumbers
          startSquareNumber  = getRandomIntInclusive(0,Math.floor(numNumbers/2))
        }
        let startSquare = startSquareLetter+startSquareNumber
        
        
        answers.push(startSquare)
          for(let i =1;i<length;i++){
            answers.push(startSquareLetter+(startSquareNumber+ i))
          }
          console.log('length',length)
          numAnswers -= length
          console.log(numAnswers)
      break;
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
}
