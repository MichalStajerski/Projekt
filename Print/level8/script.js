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
    for(let i = 1;i<constraints.length;i+=2)
    switch(i){
      case i : 
        if(modulo(lowerLimit,constraints[i])==0){
          option.text = constraints[i-1]
        }
      break;
    }
    select.add(option)
    lowerLimit++
  }
}

function countForwardsByOneIteration () {
  if(lowerLimit <= upperLimit){
    const option = document.createElement('option')
    for(let i = 1;i<constraints.length;i+=2)
    switch(i){
      case i : 
        if(modulo(lowerLimit,constraints[i])==0){
          option.text = constraints[i-1]
        }
      break;
    }
    select.add(option)
    lowerLimit++
  }  
    
}
  
  //why the code below does not work?
  // if(lowerLimit <= upperLimit){
  //   const option = document.createElement('option')
  //   for(let i = 1;i<constraints.length;i=i+2){
  //     switch(modulo(lowerLimit,constraints[i])){
  //       case 0 :  
  //         option.text = constraints[i-1]
  //       break;
  //       default:
  //         option.text = lowerLimit
  //     }
  //   }
  //   select.add(option)
  //   lowerLimit++
  // }
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



