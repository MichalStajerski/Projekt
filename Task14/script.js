const numRows = 7
const numCols = 7
const colors = {
  selected : 'blue',
  normal: '#ddd',
  success: 'green'
}

/**
 * @type string[]
 */
const words = ['cat', 'dog', 'ape', 'egg']
const answerss = [
  {fields:[3, 4, 5]},
  {fields:[28, 29, 30]},
  {fields:[30, 37, 44]},
  {fields:[15, 22, 29]},
]
const answers = [[ 4, 5, 6], [28, 29, 30], [30, 37, 44], [15, 22, 29]]

/**
 * @type string[]
 */
var chars = []
const clickedTiles = []
var intID = 0;

var t = []
window.onload = function () {
  createTiles()
}

/**
 * 
 * @param {string} id 
 */
function clickedTile (id) {
  const object = document.getElementById(id)
  // marks in blue color after click
  if (object.style.backgroundColor !== colors.selected) {
    object.style.backgroundColor = colors.selected
    // adds answer

    clickedTiles.push(Number(id))
    // clickedTiles.sort()
    clickedTiles.sort(function (a, b) {
      return a - b
    })

    // console.log('array clickedTiles after click: ' + clickedTiles)
    checkAnswer(clickedTiles)
  } else {
    // unclicks to usual color
    object.style.backgroundColor = colors.normal
    // removes answerd by value
    const index = clickedTiles.indexOf(Number(id))
    clickedTiles.splice(index, 1)
    clickedTiles.sort(function (a, b) {
      return a - b
    })
    checkAnswer(clickedTiles)
    // console.log('array reclickedTiles after click: ' + cclickedTiles)
  }
}

// creates our front
function createTiles () {
  const container = document.getElementById('container')
  container.innerHTML = ''// don't want any extra boxes when you call this function again
  console.log(numRows)
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement('div')
    row.className = 'row'
    container.appendChild(row)
    for (let j = 0; j < numCols; j++) {
      const box = document.createElement('div')
      box.id = (i * 7) + j
      box.className = 'box'// assign class
      intID = box.id
      box.onclick = function () { clickedTile(box.id) }
      const content = document.createTextNode(drawLettersForsquares(intID))
      box.appendChild(content)
      row.appendChild(box)
    }
  }
}

function checkAnswer (clickedTiles) {
  console.log(clickedTiles)
  for (let i = 0; i < answers.length; i++) {
    console.log('asnwer: ', answers[i])
    if (JSON.stringify(clickedTiles) == JSON.stringify(answers[i])) {
      for (let j = 0; j < clickedTiles.length; j++) {
        console.log('passed')
        const marked = document.getElementById(clickedTiles[j])
        marked.style.backgroundColor = colors.success
        // blocks onclick after correct word was found
        marked.onclick = null

        // logic for words that share the same letter, we remove the letter from other answers
        for (let e = 0; e < answers.length; e++) {
          if (i !== e) {
            if (answers[i].includes(clickedTiles[j]) && answers[e].includes(clickedTiles[j])) {
              //remove functions is still used here cause split failed to work, will change so its not needed
              answers[e].remove(clickedTiles[j])
            }
          }
        }
      }
      // resets our array of answers after positive check so we can look for other answers
      clickedTiles.splice(0, clickedTiles.length)
    }
  }
}

// random char to fill squares outside of answers
function randomCharacter () {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
  return randomCharacter
}
// remove from array by value
Array.prototype.remove = function () {
  let what; const a = arguments; let L = a.length; let ax
  while (L && this.length) {
    what = a[--L]
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1)
    }
  }
  return this
}
function drawLettersForsquares(intID){
  if(intID<49){
    //console.log("id",intID)
    var merged = [].concat.apply([], answers);
    console.log(merged)
    console.log('id',Number(intID))
    for(let j = 0;j<merged.length;j++){
      console.log('merged j',merged[j])
      if(merged.includes(Number(intID))){
        console.log("Jest")
        return 'xdd'    
      }else{
        return randomCharacter()
      }
    }
  }
}
  // console.log(merged)
  // // if()
  //   for(let i =0;i<words.length;i++){
  //       t.push(answers[i])
  //       chars = words[i].split('')
  //       console.log(chars)
  //   }
  //   console.log("t",t)

// TODO

// DONE
// settattribute to null,zmienic nazyw funkcji na bardziej intuicyjne, wyciagnac zmienne np. kolor do gory
// funkcja clickedTile przed createTiles, zamiast settatrubute onclick uzyc referencja
// tworzenie layoutu po liczbie kolumn i wierszy nie po ilosci kafelek,
// usunac remove, zamienic liste na tablice int,