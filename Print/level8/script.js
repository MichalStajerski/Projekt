// TODO functions share much of the logic can look to merge them in one and cut down on doubling the code
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

function countBackWards () {
  if (upperLimit >= lowerLimit) {
    const option = document.createElement('option')
    function combineModulosCase (array, i) {
      if (!option.text.includes(constraints[array[i] - 1])) {
        option.text += constraints[array[i] - 1]
      }
      i++
      if (i < array.length) {
        combineModulosCase(counterarr, i)
      }
    }
    function countBackwards (i) {
      moduloBool.push(constraintForLowerLimitEqual(upperLimit, constraints[i]))
      if (constraintForLowerLimitEqual(upperLimit, constraints[i]) == true) {
        counter = i
        counterarr.push(counter)
      }
      console.log('mod', moduloBool)
      if (moduloBool.includes(true) && countInArray(moduloBool, true) > 1) {
        combineModulosCase(counterarr, 1)
      }
      if (moduloBool.includes(true) && countInArray(moduloBool, true) == 1) {
        option.text = constraints[counter - 1]
      }
      if (!moduloBool.includes(true)) {
        option.text = upperLimit
      }
      if (i < constraints.length) {
        countBackwards(i + 2)
      }
    }
    countBackwards(1)

    counterarr = []
    moduloBool = []
    select.add(option)
    upperLimit--
    storageArray.push(option.text)
    localStorage.setItem('options', storageArray.slice(-1).pop())
    localStorage.setItem('upperLimit', upperLimit)
  }
}

function countForwards () {
  if (lowerLimit <= upperLimit) {
    const option = document.createElement('option')
    function combineModulosCase (array, i) {
      if (!option.text.includes(constraints[array[i] - 1])) {
        option.text += constraints[array[i] - 1]
      }
      i++
      if (i < array.length) {
        combineModulosCase(counterarr, i)
      }
    }

    function actionCountForwad (i) {
      moduloBool.push(constraintForLowerLimitEqual(lowerLimit, constraints[i]))
      if (constraintForLowerLimitEqual(lowerLimit, constraints[i])) {
        counter = i
        counterarr.push(counter)
        console.log('counterarr', counterarr)
      }
      console.log(moduloBool)
      if (moduloBool.includes(true) && countInArray(moduloBool, true) > 1) {
        combineModulosCase(counterarr, 0)
      }
      if (moduloBool.includes(true) && countInArray(moduloBool, true) == 1) {
        option.text = constraints[counter - 1]
      }
      if (!moduloBool.includes(true)) {
        option.text = lowerLimit
      }
      if (i < constraints.length) {
        actionCountForwad(i + 2)
      }
    }
    actionCountForwad(1)

    counterarr = []
    moduloBool = []
    select.add(option)
    lowerLimit++
    storageArray.push(option.text)
    localStorage.setItem('options', storageArray.slice(-1).pop())
    localStorage.setItem('lowerLimit', lowerLimit)
  }
}

function constraintForLowerLimitEqual (lowerLimit, a) {
  if (modulo(lowerLimit, a) == 0) {
    return true
  } else { return false }
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

function countInArray (array, what) {
  return array.filter(item => item == what).length
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
    select.add(option2)
  }
}
