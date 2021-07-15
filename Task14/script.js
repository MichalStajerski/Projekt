// for now set of answers is hardcoded
// need to fill remaining boxes with random letters from alphabet
// for now only logic behind checking asnwers is implemented and creating board
var numberOfColumns = 7
var numberOfRows = 7
var backgroundColorForTiles = '#ddd'
var intId = 0
var words = ['cat','dog','ape','egg']
const answers =[[3,4,5],[28,29,30],[30,37,44],[15,22,29]]
var chars = []
const checked = []

var array = [1,2,3,4]
var item = 4

var index = array.indexOf(item);
array.splice(index, 1);


// var t = []
var xd = 'hello'
window.onload = function () {
  createTiles()
  // drawLettersForsquares()
}

function clickedTile (id) {
    const object = document.getElementById(id)
    // marks in blue color after click
    if (object.style.backgroundColor !== 'blue') {
      object.style.backgroundColor = 'blue'
      // adds answer
      
      checked.push(Number(id))
      // checked.sort()
      checked.sort(function (a, b) {
        return a - b
      })
      
      //console.log('array checked after click: ' + checked)
      checkAnswer(checked)
    } else {
      // unclicks to usual color
      object.style.backgroundColor = backgroundColorForTiles
      // removes answerd by value
      let index = checked.indexOf(Number(id));
      checked.splice(index, 1);
      checked.sort(function (a, b) {
        return a - b
      })
      checkAnswer(checked)
      //console.log('array rechecked after click: ' + checked)
    }
  }

// creates our front
function createTiles () {
  const container = document.getElementById('container')
  container.innerHTML = ''// don't want any extra boxes when you call this function again
  console.log(numberOfRows)
    for(let i =0;i<numberOfRows;i++){
      var row = document.createElement('div')
      row.className = 'row'
      container.appendChild(row)
    for(let j = 0;j<numberOfColumns;j++){
      const box = document.createElement('div')
      box.id = (i*7)+j
      
      box.className = 'box'// assign class
      box.onclick = function() {clickedTile(box.id)};
      const content = document.createTextNode(randomCharacter())
      box.appendChild(content)
      row.appendChild(box)
    }
  }
}

function checkAnswer (checked) {
  console.log(checked)
  for (let i = 0; i < answers.length; i++) {
    console.log('asnwer: ', answers[i])
    if (JSON.stringify(checked)==JSON.stringify(answers[i])) {
      for (let j = 0; j < checked.length; j++) {
        console.log("passed")
        const marked = document.getElementById(checked[j])
        marked.style.backgroundColor = 'green'
        // blocks onclick after correct word was found
        marked.onclick = null

        //logic for words that share the same letter, we remove the letter from other answers
        for (let e = 0; e < answers.length; e++) {
          if (i !== e) {
            if(answers[i].includes(checked[j])&& answers[e].includes(checked[j])){
              let index = checked.indexOf(checked[j]);
              answers[e].splice(index, 1);
              // answers[e].remove(checked[j])
            }
          }
        }
      }
        // resets our array of answers after positive check so we can look for other answers
        checked.splice(0, checked.length)
    }  
  }    
}


// remove from array by value
// Array.prototype.remove = function () {
//   let what; const a = arguments; let L = a.length; let ax
//   while (L && this.length) {
//     what = a[--L]
//     while ((ax = this.indexOf(what)) !== -1) {
//       this.splice(ax, 1)
//     }
//   }
//   return this
// }
//random char to fill squares outside of answers
function randomCharacter(){
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
  return randomCharacter
}
// function drawLettersForsquares(){
//     for(let i =0;i<words.length;i++){
//         t.push(answers[i])
//         chars = words[i].
//         console.log(chars)
//     }   
//     console.log(t)
// }
//TODO

//DONE
//settattribute to null,zmienic nazyw funkcji na bardziej intuicyjne, wyciagnac zmienne np. kolor do gory
//funkcja clickedTile przed createTiles, zamiast settatrubute onclick uzyc referencja 
//tworzenie layoutu po liczbie kolumn i wierszy nie po ilosci kafelek,
//usunac remove, zamienic liste na tablice int,
