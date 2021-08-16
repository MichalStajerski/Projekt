const puzzleDifficulty = 6 // image will be divided in puzzleDifficulty*puzzleDifficulty, later can look to change rectangles
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
    let piece = {}
    piece.sx = xPos
    piece.sy = yPos
    pieces.push(piece)
    xPos += pieceWidth
    if (xPos >= puzzleWidth) {
      xPos = 0
      yPos += pieceHeight
    }
  }
  //show the user image to remember for 2 seconds then present the puzzle 
  setTimeout(()=>{
   shufflePuzzle()
  },2000)
 
}
function shufflePuzzle () {
  //shuffleArray(pieces)
  context.clearRect(0, 0, puzzleWidth, puzzleHeight) // sets the pixels in rect to transparent black
  let xPos = 0
  let yPos = 0
  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i] // takes every puzzle piece from puzzle
    piece.xPos = xPos
    piece.yPos = yPos
    context.translate(piece.xPos+pieceWidth,piece.yPos)
    context.rotate(90*Math.PI/180)
    context.drawImage(img, xPos, yPos, pieceWidth, pieceHeight, -xPos/1000, -yPos/1000,pieceWidth,pieceWidth)
    context.rotate(-(90*Math.PI/180))
    context.translate(-(piece.xPos+pieceWidth),-(piece.yPos))
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
  clickCounter++
  console.log('ckickCounter',clickCounter)
  // returns the current coordiantes of the place where event happened, our mouse position
  if (e.layerX || e.layerY == 0) { 
    mouse.x = e.layerX - canvas.offsetLeft 
    mouse.y = e.layerY - canvas.offsetTop
  } else if (e.offsetX || e.offsetY == 0) { 
    mouse.x = e.offsetX - canvas.offsetLeft
    mouse.y = e.layerY - canvas.offsetTop
  }
  mouse.y += 89 // added it cause without it often not the tiles that were clicked on got dragged but different one
  console.log('mouse.x,mouse.y', mouse.x, mouse.y)
  currentPiece = checkPieceClicked()
  console.log('currentPiece',currentPiece)
  if (currentPiece != null) {
    context.translate(currentPiece.xPos+pieceWidth,currentPiece.yPos+pieceHeight)
    context.rotate(180*Math.PI/180)
    context.drawImage(img, currentPiece.xPos, currentPiece.yPos, pieceWidth, pieceHeight, -currentPiece.xPos/1000, -currentPiece.yPos/1000,pieceWidth,pieceWidth)
    context.rotate(-(180*Math.PI/180))
    context.translate(-(currentPiece.xPos+pieceWidth),-(currentPiece.yPos+pieceHeight))
  }
}

function checkPieceClicked () {
  // checks upon our clicked piece and returns it to us
  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i]
    console.log('129',piece)
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
          context.restore()// we are done with using alpha property and restore them to what they were
        }
      }
    }
    //redraw the dragged piece
    context.save()
    context.drawImage(img, currentPiece.sx, currentPiece.sy, pieceWidth, pieceHeight, mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight)
    context.restore()
    context.strokeRect(mouse.x - (pieceWidth / 2), mouse.y - (pieceHeight / 2), pieceWidth, pieceHeight)
}

function pieceDropped(e){
  document.onmousemove = null;
  document.onmouseup = null;
  if(currentDropPiece != null){
      var tmp = {xPos:currentPiece.xPos,yPos:currentPiece.yPos};
      currentPiece.xPos = currentDropPiece.xPos;
      currentPiece.yPos = currentDropPiece.yPos;
      currentDropPiece.xPos = tmp.xPos;
      currentDropPiece.yPos = tmp.yPos;
  }
  checkAnswer();
}

function checkAnswer(){
  context.clearRect(0,0,puzzleWidth,puzzleHeight);
  var gameWin = true;
  var piece;
  for(let i = 0;i < pieces.length;i++){
      piece = pieces[i];
      context.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
      context.strokeRect(piece.xPos, piece.yPos, pieceWidth,pieceHeight);
      if(piece.xPos != piece.sx || piece.yPos != piece.sy){
          gameWin = false;
      }
  }
  if(gameWin){
      document.onmousedown = null,
      document.onmousemove = null,
      document.onmouseup = null,
      setTimeout(()=>   
      alert('victory'),500)
  }
}

window.onload = () => {
  img = new Image()
  img.addEventListener('load', onImage, false)
  img.src = './images/pipes.png'
}
