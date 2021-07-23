// code is the same as in lvl4 since from the beginning i displayed results on the screen instead of terminal
const upperLimit = 100
const select = document.getElementById('mySelect')
let lowerLimit = 1
const storageArray = []
const option2 = document.createElement('option')

function countForwardsByOneIteration () {
  if (lowerLimit <= upperLimit) {
    const option = document.createElement('option')
    if (modulo(lowerLimit, 3) == 0 && modulo(lowerLimit, 5) != 0) {
      console.log('Fizz')
      option.text = 'Fizz'
    }
    if (modulo(lowerLimit, 5) == 0 && modulo(lowerLimit, 3) != 0) {
      option.text = 'Buzz'
      console.log('Buzz')
    }
    if (modulo(lowerLimit, 3) == 0 && modulo(lowerLimit, 5) == 0) {
      option.text = 'FizzBuzz'
      console.log('FizzBuzz')
    }
    if (modulo(lowerLimit, 5) != 0 && modulo(lowerLimit, 3) != 0) {
      option.text = lowerLimit
      console.log(lowerLimit)
    }
    select.add(option)
    lowerLimit++
    storageArray.push(option.text)
    localStorage.setItem('options', storageArray.slice(-1).pop())
    localStorage.setItem('lastIndex', lowerLimit)
    console.log(localStorage)
  }else{
    setTimeout(() => {
      alert('Wrong values')
    }, 100)
  }
}

function modulo (divident, divider) {
  const scoreWithoutRestOfDivision = parseInt(divident / divider)
  const dividentWithoutRestOfdivision = scoreWithoutRestOfDivision * divider
  return divident - dividentWithoutRestOfdivision
}

window.onload = function () {
  if (localStorage.getItem('options') != null) {
    option2.text = localStorage.getItem('options')
    lowerLimit = parseInt(localStorage.getItem('lastIndex'))
    select.add(option2)
  }
}
