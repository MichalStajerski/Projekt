const numLeters = 3
const numNumbers = 3
const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const colors = {
    default : 'lightgrey',
    selected : 'orange',
    correct : 'green',
}
let clickedsquares = []
let answers  = ['c2','c1']
let canMarkSquare = true

function createLayout(){
    const layout = document.getElementById('layout')
    for (let colIndex = 0; colIndex <= (numLeters+1); colIndex++) {
        const col = document.createElement('div')
        col.id = 'col'+colIndex
        for (let rowIndex = 0; rowIndex <= (numNumbers+1); rowIndex++) {
            const square = document.createElement('div')
            if(rowIndex > 0  && rowIndex <=numNumbers&& colIndex>0&& colIndex <= numLeters){
                square.id= alphabet[colIndex-1]+rowIndex
                square.onclick = () => squareClicked(square)
            }else{
                square.id = 'square'+rowIndex
            }
          square.className = 'square'      
          square.style.backgroundColor = colors.default
          col.appendChild(square)
        }
        layout.appendChild(col)
        
    }
    fillSignsForLayout()
    console.log('next',document.getElementById('col1').children[0])
}
function fillSignsForLayout(){
    for(let i =1;i<numNumbers+1;i++){
        document.getElementById('col0').children[i].innerHTML = i//first column except first and last
        document.getElementById('col'+(numNumbers+1)).children[i].innerHTML = i//last column except first and last
    }
    for(let i = 1; i<numLeters+1;i++){
        document.getElementById('col'+i).children[0].innerHTML = alphabet[i-1]//first row except first and last element
        document.getElementById('col'+i).children[numNumbers+1].innerHTML =alphabet[i-1]//last row except first and last element
        
    }
}



function checkAnswers(square){
    for(let i = 0; i < clickedsquares.length;i++){
        if(answers.includes(square.id)){
            square.style.backgroundColor = colors.correct
            let answersDelte = answers.indexOf(square.id)
            let clickedSquaresDelete = clickedsquares.indexOf(square.id)
            //and it deletes the asnwer so only the remaining correct ones remain
            answers.splice(answersDelte,1)
            clickedsquares.splice(clickedSquaresDelete,1)
            square.onclick = () => null //if correct we can'y uncheck the answe
            console.log('clickedsquares',clickedsquares)
        }
    }
    if(!answers.length && !clickedsquares.length )setTimeout(()=>{
        canMarkSquare =false
        alert('Victory')
    },500)
    console.log('answers',answers)
}

function squareClicked(square){
    if(canMarkSquare!=false){
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
        console.log('clickedSquares',clickedsquares)
        checkAnswers(square)
    }
}

function drawAnswers(){

}

function getRandomIntInclusive (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

window.onload = () => {
    createLayout()
  }