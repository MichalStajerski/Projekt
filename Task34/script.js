const numLeters = 3
const numNumbers = 3
const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const colors = {
    default : 'lightgrey',
    selected : 'orange',
    correct : 'green',
    wrong : 'red'
}
let clickedsquares = []
let answers  = ['c2','c1','c3']
const checkAnswer = (el1, el2) => el1.length === el2.length && el1.any(el => el2.includes(el))

function createlayout(){
    const layout = document.getElementById('layout')
    for (let colIndex = 0; colIndex <= (numLeters+1); colIndex++) {
        const col = document.createElement('div')
        col.className = 'col'+colIndex
        for (let rowIndex = 0; rowIndex <= (numNumbers+1); rowIndex++) {
            const square = document.createElement('div')
            if(rowIndex > 0  && rowIndex <=numNumbers&& colIndex>0&& colIndex <= numLeters){
                square.id= alphabet[colIndex-1]+rowIndex
                console.log(square.id)
                square.onclick = () => squareClicked(square)
            }
          square.className = 'square'      
          square.style.backgroundColor = colors.default
          col.appendChild(square)
        }
        layout.appendChild(col)
    }
}
function fillSignsForLayout(){
    for(let i =0;i<numNumbers;i++){
        document.getElementById()
    }
}


createlayout()

function checkAnswers(){
    for(let i = 0; i < clickedsquares.length;i++){
        if(answers.includes(clickedsquares[i])){
            document.getElementById(clickedsquares[i]).style.backgroundColor = colors.correct
        }
    }
}

function squareClicked(square){
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
    checkAnswers()
}

function drawAnswers(){

}

function getRandomIntInclusive (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}