const numLeters = 6
const numNumbers = 6
const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const colors = {
    default : 'lightgrey',
    selected : 'orange',
    correct : 'green',
    wrong : 'red'
}

let letter = alphabet[4]
let clickedsquares = []

console.log('letter',letter)
function createlayout(){
    const layout = document.getElementById('layout')
    for (let rowIndex = 1; rowIndex <= numLeters; rowIndex++) {
        const col = document.createElement('div')
        col.className = 'col'
        for (let colIndex = 0; colIndex < numNumbers; colIndex++) {
          const square = document.createElement('div')
          square.id= alphabet[colIndex]+rowIndex
          console.log(square.id)
          square.className = 'square'
          square.onclick = () => squareClicked(square)
          square.style.backgroundColor = colors.default
          col.appendChild(square)
        }
        layout.appendChild(col)
    }
}
createlayout()


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
}