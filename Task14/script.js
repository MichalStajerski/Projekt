// for now set of answers is hardcoded
// need to fill remaining boxes with random letters from alphabet
// for now only logic behind checking asnwers is implemented and creating board
const answers = [{ answer: '3,4' }, { answer: '28,29,30' }, { answer: '30,37,44' }, { answer: '15,22,29' }]
console.log(answers[0].answer)

const checked = []
window.onload = function () {
  size()
}
// creates out front
function size () {
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
    box.setAttribute('onclick', 'clicked(id)')
    const content = document.createTextNode('A')
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
        marked.setAttribute('onclick', '')
        // for now logic behind checking words that cross throgh one another
        // we are looking for letters that are common in at least two asnwers and then we delete this letter from ather answers
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

function clicked (id) {
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
    object.style.backgroundColor = '#ddd'
    // removes nswer
    checked.remove(id)
    checked.sort(function (a, b) {
      return a - b
    })
    checked.join()
    checkAnswer(checked)
    console.log('array rechecked after click: ' + checked)
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
