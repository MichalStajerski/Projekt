const puzzleDifficulty = 6 // image will be divided in puzzleDifficulty*puzzleDifficulty, later can look to change rectangles
// into actual puzzle shaped figures
const colors = {
  success: 'yellow',
  failure: 'grey'
}

const gameWon = false
let count = 0
let canvas
let context
let img
let pieces
let puzzleWidth
let puzzleHeight
let pieceWidth
let pieceHeight
let currentPiece // current piece that we are draggin
let mouse // will store coordiantes of the cursor when clicked it performs action
let clickCounter = 0

function onImage () {
  pieceWidth = Math.floor(img.width / puzzleDifficulty)
  pieceHeight = Math.floor(img.height / puzzleDifficulty)
  puzzleWidth = pieceWidth * puzzleDifficulty
  puzzleHeight = pieceHeight * puzzleDifficulty
  setCanvas()
  initPuzzle()
}

function setCanvas () {
  canvas = document.getElementById('canvas')
  context = canvas.getContext('2d')
  canvas.width = puzzleWidth
  canvas.height = puzzleHeight
  canvas.style.border = '1px solid black'
}
function initPuzzle () {
  pieces = [] // array that holds our pieces
  mouse = { x: 0, y: 0 } // holds the current positions of axes of mouse
  currentPiece = null // current piece that we drag
  currentDropPiece = null // current piece that is about to get drop down on
  context.drawImage(img, 0, 0, puzzleWidth, puzzleHeight, 0, 0, puzzleWidth, puzzleHeight)
  createPuzzlePiece()
  buildPieces()
}

function createPuzzlePiece () {
  context.fillStyle = '#000000'
  context.fillRect(100, puzzleHeight - 40, puzzleWidth - 200, 40)
  context.fillStyle = '#FFFFFF'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
}

function buildPieces () {
  let xPos = 0
  let yPos = 0
  for (let i = 0; i < puzzleDifficulty * puzzleDifficulty; i++) {
    const piece = {}
    piece.sx = xPos
    piece.sy = yPos
    pieces.push(piece)
    xPos += pieceWidth
    if (xPos >= puzzleWidth) {
      xPos = 0
      yPos += pieceHeight
    }
  }
  // show the user image to remember for 2 seconds then present the puzzle
  setTimeout(() => {
    shufflePuzzle()
  }, 1000)
}
function shufflePuzzle () {
  context.clearRect(0, 0, puzzleWidth, puzzleHeight) // sets the pixels in rect to transparent black
  let xPos = 0
  let yPos = 0
  let angle = 0
  const pieceClicked = 0
  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i] // takes every puzzle piece from puzzle
    piece.xPos = xPos
    piece.yPos = yPos
    piece.angle = angle
    piece.pieceClicked = pieceClicked

    context.save()
    context.translate(xPos + 63, yPos + 63.3)
    context.rotate((angle) * Math.PI / 180)
    context.drawImage(img, xPos, yPos, pieceWidth, pieceHeight, -(pieceWidth / 2), -(pieceHeight / 2), pieceWidth, pieceWidth)
    context.translate(-(xPos), -(yPos))
    context.restore()
    const angleDecider = getRandomIntInclusive(1, 4)
    switch (angleDecider) {
      case 1:
        angle = 0
        break
      case 2:
        angle = 90
        break
      case 3:
        angle = 180
        break
      case 4:
        angle = 270
        break
    }
    xPos += pieceWidth
    if (xPos >= puzzleWidth) { // sets to new row when we reach the end of an x axis of our canvas
      xPos = 0
      yPos += pieceHeight
    }
  }
}
document.onmousedown = onPuzzleClick
function onPuzzleClick (e) {
  clickCounter++
  console.log('ckickCounter', clickCounter)
  // returns the current coordiantes of the place where event happened, our mouse position
  if (e.layerX || e.layerY == 0) {
    mouse.x = e.layerX - canvas.offsetLeft
    mouse.y = e.layerY - canvas.offsetTop
  } else if (e.offsetX || e.offsetY == 0) {
    mouse.x = e.offsetX - canvas.offsetLeft
    mouse.y = e.layerY - canvas.offsetTop
  }

  console.log('mouse.x,mouse.y', mouse.x, mouse.y)
  mouse.y += 89
  currentPiece = checkPieceClicked()
  console.log('currentPiece', currentPiece)
  if (currentPiece != null) {
    context.save()
    context.translate(currentPiece.xPos + 63, currentPiece.yPos + 63.3)
    context.rotate((currentPiece.angle + 90) * Math.PI / 180)
    context.drawImage(img, currentPiece.xPos, currentPiece.yPos, pieceWidth, pieceHeight, -(pieceWidth / 2), -(pieceHeight / 2), pieceWidth, pieceWidth)
    context.translate(-(currentPiece.xPos), -(currentPiece.yPos))
    context.restore()
    currentPiece.angle += 90
    if (currentPiece.angle > 360) {
      currentPiece.angle = 90
      currentPiece.correct = false
    } else if (currentPiece.angle === 360) {
      currentPiece.correct = true
    }else if(currentPiece.angle !== 360){
      currentPiece.correct = false
    }
  }
  checkAnswer()
}

function checkPieceClicked () {
  // checks upon our clicked piece and returns it to us
  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i]
    // adding constraints so we get in the end the correct puzzle piece chosen
    if (mouse.x > piece.xPos && mouse.x < (piece.xPos + pieceWidth) && mouse.y > piece.yPos && mouse.y < (piece.yPos + pieceHeight)) {
      // we specify the coordiantes of the tile that is the end and isnt supposed to rotate
      if (piece.xPos !== 375 || piece.yPos !== 375) {
        return piece
      } else {
        piece.correct = true
      }
    }
  }
  return null // in case we dont get any piece
}

function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function drawStar (cx, cy, spikes, outerRadius, innerRadius, color) {
  let rot = Math.PI / 2 * 3
  let x = cx
  let y = cy
  const step = Math.PI / spikes

  contextRight.strokeSyle = '#000'
  contextRight.beginPath()
  contextRight.moveTo(cx, cy - outerRadius)
  for (i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius
    y = cy + Math.sin(rot) * outerRadius
    contextRight.lineTo(x, y)
    rot += step

    x = cx + Math.cos(rot) * innerRadius
    y = cy + Math.sin(rot) * innerRadius
    contextRight.lineTo(x, y)
    rot += step
  }
  contextRight.lineTo(cx, cy - outerRadius)
  contextRight.closePath()
  contextRight.lineWidth = 5
  contextRight.strokeStyle = 'black'
  contextRight.stroke()
  contextRight.fillStyle = color
  contextRight.fill()
}

function checkAnswer () {
  for(let i = 0;i <pieces.length;i++){
    pieces[i].angle === 0 ? pieces[i].correct = true : null
    pieces[i].correct === true ? count++ : null
  }
  console.log('pieces',pieces)
  console.log('count',count)
  let starNum = 3
  clickCounter <= 45 ? starNum = 3 : null
  clickCounter <= 55 && clickCounter > 45 ? starNum = 2 : null
  clickCounter > 55 ? starNum = 1 : null
  canvasRight = document.getElementById('scoreBoard')
  contextRight = canvasRight.getContext('2d')
  if(clickCounter>60){
    for (let i = 1; i < 3 + 1; i++) {
      drawStar(75 * i, 100, 5, 30, 15, colors.failure)
    }
    alert('You lose!')
    document.onmousedown = null
  }
  if (count === 35) {
   
    for (let i = 1; i < starNum + 1; i++) {
      drawStar(75 * i, 100, 5, 30, 15, colors.success)
    }
    document.onmousedown = null
    setTimeout(()=>{
      alert('You win!')
    },200)
  }else count = 0
}

window.onload = () => {
  img = new Image()
  img.addEventListener('load', onImage, false)
  img.src = './images/pipes.png'
}

// DONE: beacause canvas doesn not allow me to draw stars and then only fill them with according color based on the number moves we made
// i will change drawing stars after the game is done or lost, then i will just draw only the number of stars that are meant to be filled
// in case user loses, all stars will be drawn but they will be empty without yellow fill signifying 0 stars achieved

// TODO :
