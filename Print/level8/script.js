// not working yet
let lowerLimit
let upperLimit
const select = document.getElementById('mySelect')
const constraints = []
let counter = 0



function countBackWardsByOneIteration () {
  if (upperLimit >= lowerLimit) {
    const option = document.createElement('option')
    if (modulo(upperLimit, 3) == 0 && modulo(upperLimit, 5) != 0) {
      console.log('Fizz')
      option.text = 'Fizz'
    }
    if (modulo(upperLimit, 5) == 0 && modulo(upperLimit, 3) != 0) {
      option.text = 'Buzz'
      console.log('Buzz')
    }
    if (modulo(upperLimit, 3) == 0 && modulo(upperLimit, 5) == 0) {
      option.text = 'FizzBuzz'
      console.log('FizzBuzz')
    }
    if (modulo(upperLimit, 5) != 0 && modulo(upperLimit, 3) != 0) {
      option.text = upperLimit
      console.log(upperLimit)
    }
    select.add(option)
  }
  upperLimit--
}

function iterateForward(){
  if(lowerLimit <= upperLimit){
    const option = document.createElement('option')
    for(let i = 0;i<constraints.length-1;i+=2){
      if(modulo(lowerLimit,constraints[i+1]==0)){
        option.text = constraints[i]
      }else{
        option.text = lowerLimit
      }
      select.add(option)    
    }
  lowerLimit++
  }
}

function countForwardsByOneIteration () {
  if(lowerLimit <= upperLimit){
    const option = document.createElement('option')
    for(let i = 0;i<constraints.length;i+=2){
      if(modulo(lowerLimit,constraints[i+1]==0)){
        option.text = constraints[i]
      }
      select.add(option)    
    }
  lowerLimit++
  }
}
function submitValues () {
  lowerLimit = parseInt(document.getElementById('lowerLimit').value)
  upperLimit = parseInt(document.getElementById('upperLimit').value)
}
function submitWordsAndDivisors () {
  constraints.push(document.getElementById('word').value)
  constraints.push(parseInt(document.getElementById('divisor').value))
  console.log(constraints)
}

function modulo (divident, divider) {
  const scoreWithoutRestOfDivision = parseInt(divident / divider)
  const dividentWithoutRestOfdivision = scoreWithoutRestOfDivision * divider
  return divident - dividentWithoutRestOfdivision
}

