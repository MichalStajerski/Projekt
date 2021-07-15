// for now set of answers is hardcoded
// need to fill remaining boxes with random letters from alphabet
// for now only logic behind checking asnwers is implemented and creating board
var numberOfColumns = 7
var numberOfRows = 7
var backgroundColorForTiles = '#ddd'
var words = ['cat','dog','ape','egg']
var a = '3,4,5'
const answers = [{ answer: '3,4,5' }, { answer: '8,15,22' }, { answer: '35,36,37' }, { answer: '34,41,48' }]
console.log(answers[0].answer)
var t = []
var split = []
var chars = []
const checked = []
window.onload = function () {
  createTiles()
  drawLettersForsquares()
}

function clickedTile (id) {
    const object = document.getElementById(id)
    // marks in blue color after click
    if (object.style.backgroundColor !== 'blue') {
      object.style.backgroundColor = 'blue'
      // adds answer
      checked.push(id)
      checked.sort(function (a, b) {
        return a - b
      })
      checked.join()
      console.log('array checked after click: ' + checked)
      checkAnswer(checked)
    } else {
      // unclicks to usual color
      object.style.backgroundColor = backgroundColorForTiles
      // removes answerd sdsd
      checked.remove(id)
      checked.sort(function (a, b) {
        return a - b
      })
      checked.join()
      checkAnswer(checked)
      console.log('array rechecked after click: ' + checked)
    }
  }

// creates our front
function createTiles () {
  const container = document.getElementById('container')
  container.innerHTML = ''// don't want any extra boxes when you call this function again
  const NumberOfSquares = 49

  for (let i = 0; i < NumberOfSquares; i++) {
    if (i % 7 === 0) {
      var row = document.createElement('div')
      row.className = 'row'
      container.appendChild(row)
    }
    const box = document.createElement('div')
    box.id = i
    box.className = 'box'// assign class
    box.setAttribute('onclick', 'clickedTile(id)')
    const content = document.createTextNode(randomCharacter())
    box.appendChild(content)
    row.appendChild(box)
  }
}

function checkAnswer (checked) {
  console.log(checked.join())
  for (let i = 0; i < answers.length; i++) {
    console.log('asnwer: ' + answers[i].answer)
    if (checked.join() === answers[i].answer) {
      for (let j = 0; j < checked.length; j++) {
        const marked = document.getElementById(checked[j])
        marked.style.backgroundColor = 'green'
        // blocks onclick after correct word was found
        marked.onclick = null
        // for now logic behind checking words that cross throgh one another
        // we are looking for letters that are common in at least two answers and then we delete this letter from ther answers
        // so they only require remaining leeters for correct marking instead of box with onclicked blocked
        // need to look for a prettier way to write that logic
        for (let e = 0; e < answers.length; e++) {
          if (i !== e) {
            if (answers[i].answer.includes(checked[j]) && answers[e].answer.includes(checked[j])) {
              if (answers[e].answer.includes(',' + checked[j] + ',')) {
                answers[e].answer = answers[e].answer.replace(checked[j] + ',', '')
              }
              if (answers[e].answer.endsWith(',' + checked[j])) {
                answers[e].answer = answers[e].answer.replace(',' + checked[j], '')
              }
              if (answers[e].answer.startsWith(checked[j] + ',')) {
                answers[e].answer = answers[e].answer.replace(checked[j] + ',', '')
              }
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
//random char to fill squares outside of answers
function randomCharacter(){
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
  return randomCharacter
}
function drawLettersForsquares(){
    for(let i =0;i<words.length;i++){
        t.push(answers[i].answer.split(','))
        chars = words[i].split('')
        console.log(chars)
    }   
    console.log(t)
}
//TODO
//usunac remove, zamiast settatrubute onclick to referencja, 
//zamienic liste na tablice int, tworzenie layoutu po liczbie kolumn i wierszy nie po ilosci kafelek

//DONE
//settattribute to null,zmienic nazyw funkcji na bardziej intuicyjne, wyciagnac zmienne np. kolor do gory
//funkcja clickedTile przed createTiles
