const puzzleDifficulty = 5; //image will be divided in puzzleDifficulty*puzzleDifficulty
var canvas;
var context;
var img;
var pieces;
var puzzleWidth;
var puzzleHeight;
var pieceWidth;
var pieceHeight;
var currentPiece;
var currentDropPiece;
var mouse;


function onImage(e){
    pieceWidth = Math.floor(img.width /puzzleDifficulty)
    pieceHeight = Math.floor(img.height /puzzleDifficulty)
    puzzleWidth = pieceWidth *puzzleDifficulty;
    puzzleHeight = pieceHeight *puzzleDifficulty;
    setCanvas();
    initPuzzle();
}

window.onload =function(){
    img = new Image();
    img.addEventListener('load',onImage,false);
    img.src = "C:/Users/m9185/Projekt/Task4/images/zamek-sulkowskich.jpg";
}