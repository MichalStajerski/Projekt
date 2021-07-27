let lowerLimit
let upperLimit
const select = document.getElementById('mySelect')
let constraints = []
let moduloBool = []
let counter = 1
let counterarr = []
const storageArray = []
const option2 = document.createElement('option')
const parseEverySecond = (a1) => a1.every(x => modulo(a1.indexOf(x), 2) != 0, x = parseInt(x))
const moduloBoolean = (num1,num2) => (modulo(num1,num2)===0) ? true : false
const countElementsInArray = (ar,el) => ar.filter(item => item == el).length
// used instead of for loop
function combineModulosCase (array, i, option) {
  if (!option.text.includes(constraints[array[i] - 1])) {
    option.text += constraints[array[i] - 1]
  }
  i++
  if (i < array.length) {
    combineModulosCase(counterarr, i, option)
  }
}

function countForwardsOrBackwards (decider) {
  if (decider === 'backwards') {
    limit = upperLimit
  } else {
    limit = lowerLimit
  }
  if (upperLimit >= lowerLimit) {
    const option = document.createElement('option')
    function count (limit, i) {
      moduloBool.push(moduloBoolean(limit, constraints[i]))
      if (moduloBoolean(limit, constraints[i]) == true) {
        counter = i
        counterarr.push(counter)
      }
      console.log('mod', moduloBool)
      if (moduloBool.includes(true) && countElementsInArray(moduloBool, true) > 1) {
        combineModulosCase(counterarr, 1, option)
      }
      if (moduloBool.includes(true) && countElementsInArray(moduloBool, true) == 1) {
        option.text = constraints[counter - 1]
      }
      if (!moduloBool.includes(true)) {
        option.text = limit
      }
      if (i < constraints.length) {
        count(limit, i + 2)
      }
    }
    count(limit, 1)

    counterarr = []
    moduloBool = []
    select.innerHTML += option.value+'<br>'
    if (decider === 'backwards') {
      upperLimit--
      storageArray.push(option.text)
      localStorage.setItem('options', storageArray.slice(-1).pop())
      localStorage.setItem('upperLimit', upperLimit)
    } else {
      lowerLimit++
      storageArray.push(option.text)
      localStorage.setItem('options', storageArray.slice(-1).pop())
      localStorage.setItem('lowerLimit', lowerLimit)
    }
  }
}
function submitValues () {
  lowerLimit = parseInt(document.getElementById('lowerLimit').value)
  upperLimit = parseInt(document.getElementById('upperLimit').value)
  localStorage.setItem('lowerLimit', lowerLimit)
  localStorage.setItem('upperLimit', upperLimit)
}
function submitWordsAndDivisors () {
  constraints.push(document.getElementById('word').value)
  constraints.push(parseInt(document.getElementById('divisor').value))
  localStorage.setItem('constraints', constraints)
  const moduloBoard = document.getElementById('moduloBoard')
  moduloBoard.innerHTML += document.getElementById('word').value + '==>' + document.getElementById('divisor').value + '<br>'
  console.log(constraints)
}

function modulo (divident, divider) {
  const scoreWithoutRestOfDivision = parseInt(divident / divider)
  const dividentWithoutRestOfdivision = scoreWithoutRestOfDivision * divider
  return divident - dividentWithoutRestOfdivision
}

window.onload = function () {
  if (localStorage.getItem('options') != null) {
    option2.text = localStorage.getItem('options')
    console.log('options', localStorage.getItem('options'))
    lowerLimit = parseInt(localStorage.getItem('lowerLimit'))
    upperLimit = parseInt(localStorage.getItem('upperLimit'))
    constraints = localStorage.getItem('constraints').split(',')

    function parseEverySecondElementToInt (array, i) {
      array[i] = parseInt(array[i])
      i += 2
      if (array.length > i) {
        parseEverySecondElementToInt(constraints, i)
      }
    }
    parseEverySecondElementToInt(constraints, 1)
    console.log(constraints)
    select.innerHTML += option2.value+'<br>' 
  }
}
