const puzzleDifficulty = 3 // image will be divided in puzzleDifficulty*puzzleDifficulty, later can look to change rectangles
// into actual puzzle shaped figures
let canvas
let context
let img
let pieces
let puzzleWidth
let puzzleHeight
let pieceWidth
let pieceHeight
let currentPiece // current piece that we are draggin
let currentDropPiece // piece that the currently dgraged piece will be droped upon
let mouse // will store coordiantes of the cursor when clicked it performs action

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
  let piece
  let xPos = 0
  let yPos = 0
  for (let i = 0; i < puzzleDifficulty * puzzleDifficulty; i++) {
    piece = {}
    piece.sx = xPos
    piece.sy = yPos
    pieces.push(piece)
    xPos += pieceWidth
    if (xPos >= puzzleWidth) {
      xPos = 0
      yPos += pieceHeight
    }
  }
  document.onmousedown = shufflePuzzle
}
function shufflePuzzle () {
  shuffleArray(pieces)
  context.clearRect(0, 0, puzzleWidth, puzzleHeight) // sets the pixels in rect to transparent black
  let xPos = 0
  let yPos = 0
  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i] // takes every puzzle piece from puzzle
    piece.xPos = xPos
    piece.yPos = yPos
    context.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, xPos, yPos, pieceWidth, pieceHeight)
    context.strokeRect(xPos, yPos, pieceWidth, pieceHeight)
    xPos += pieceWidth
    if (xPos >= puzzleWidth) { // sets to new row when we reach the end of an x axis of our canvas
      xPos = 0
      yPos += pieceHeight
    }
  }
  document.onmousedown = onPuzzleClick
}
function shuffleArray (array) { // randomly shuffles our array
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

function onPuzzleClick (e) {
  if (e.layerX || e.layerY == 0) { // e.layerX returns the current coordiante of the place where event happened, our mouse position
    mouse.x = e.layerX - canvas.offsetLeft // offsetLeft read-only property returns the number of pixels that the upper left corner of the current element is offset to the left within the HTMLElement.offsetParent node
    mouse.y = e.layerY - canvas.offsetTop
  } else if (e.offsetX || e.offsetX == 0) { // offsetX read-only property of the MouseEvent interface provides the offset in the X coordinate of the mouse pointer between that event and the padding edge of the target node
    mouse.x = e.offsetX - canvas.offsetLeft
    mouse.y = e.layerY - canvas.offsetTop
  }
  mouse.y += 100 // added it cause without it often not the tiles that were clicked on got dragged but different one
  console.log('mouse.x,mouse.y', mouse.x, mouse.y)
  currentPiece = checkPieceClicked()
  if (currentPiece != null) {
    context.clearRect(currentPiece.xPos, currentPiece.yPos, pieceWidth, pieceHeight)
    context.save()
    context.drawImage(img, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight)
    context.restore()
    document.onmousemove = updatePuzzle
  }
}

function checkPieceClicked () {
  // checks upon our clicked piece and returns it to us
  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i]
    console.log(piece)
    // adding constraints so we get in the end the correct puzzle piece chosen
    if (mouse.x > piece.xPos && mouse.x < (piece.xPos + pieceWidth) && mouse.y > piece.yPos && mouse.y < (piece.yPos + pieceHeight)) {
      return piece
    }
  }
  return null // in case we dont get any piece 
}

function updatePuzzle (e) {
    currentDropPiece = null
    if (e.layerX || e.layerY == 0) {
      mouse.x = e.layerX - canvas.offsetLeft
      mouse.y = e.layerY - canvas.offsetTop
    } else if (e.offsetX || e.offsetY == 0) {
      mouse.x = e.offsetX - canvas.offsetLeft
      mouse.y = e.offsetY - canvas.offsetTop
    }
    context.clearRect(0, 0, puzzleWidth, puzzleHeight)
    for (i = 0; i < pieces.length; i++) {
      const piece = pieces[i]
      if (piece == currentPiece) {
        continue
      }
      context.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight)
      context.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight)
      if (currentDropPiece == null) {
        if (mouse.x > piece.xPos && mouse.x < (piece.xPos + pieceWidth) && mouse.y > piece.yPos && mouse.y < (piece.yPos + pieceHeight)) {
          currentDropPiece = piece
          context.save()
          context.globalAlpha = 0.3 // makes the puzzle piece that we are about to drop our currently dragged piece upon less transparent
          context.fillRect(currentDropPiece.xPos, currentDropPiece.yPos, pieceWidth, pieceHeight)
          context.restore()
        }
      }
    }
    context.save()
    context.drawImage(img, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight)
    context.restore()
    context.strokeRect(mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight)
}
//TODO finish function for dropping puzzle piece then write algorithm for checking if the puzzle is completed
//center canvas - but not through css since the clicking on puzzle pices wont move  
//for now the puzzle is being made after clicks, need to change so that user can see photo for a set period of time
//then photo disapears and he gets puzzle pieces that need to be reshuffled so we receive the original image
//might as well add a set of pictures and a method to draw them from images folder
function dropPuzzlePice(){

}
function checkAnwer(){

}
let a = 3
let b = 7
a = a ^ b
console.log('a1',a)
b = a ^ b
console.log('b',b)
a = a ^ b
console.log('a2',a)
  
window.onload = function () {
  img = new Image()
  img.addEventListener('load', onImage, false)
  img.src = './images/zamek-sulkowskich.jpg'
}
