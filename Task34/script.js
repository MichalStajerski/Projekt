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
        col.id = 'col'+colIndex
        for (let rowIndex = 0; rowIndex <= (numNumbers+1); rowIndex++) {
            const square = document.createElement('div')
            if(rowIndex > 0  && rowIndex <=numNumbers&& colIndex>0&& colIndex <= numLeters){
                square.id= alphabet[colIndex-1]+rowIndex
                console.log(square.id)
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
    console.log('next',document.getElementById('col1').children[0])
}
function fillSignsForLayout(){
    for(let i =1;i<numNumbers+1;i++){
        document.getElementById('col0').children[i].innerHTML = i
        document.getElementById('col'+(numNumbers+1)).children[i].innerHTML = i
    }
    for(let i = 1; i<numLeters+1;i++){
        document.getElementById('col'+i).children[0].innerHTML = alphabet[i-1]
        document.getElementById('col'+i).children[numNumbers+1].innerHTML =alphabet[i-1]
        
    }
}


createlayout()
fillSignsForLayout()

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