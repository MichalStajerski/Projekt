// not working yet
let lowerLimit
let upperLimit
const select = document.getElementById('mySelect')
const constraints = []
let mod = []
let counter = 1



function countBackWardsByOneIteration () {
  if (upperLimit >= lowerLimit) {
    const option = document.createElement('option')
    for(let i =1;i<constraints.length;i+=2){
      mod.push(constraintForLowerLimitEqual(upperLimit,constraints[i]))
      if(constraintForLowerLimitEqual(upperLimit,constraints[i])==true){
        counter = i
      }
      console.log(mod)
      if(mod.includes(true) || countInArray(mod,true)>1){
        option.text = constraints[counter-1]
      }else{
        option.text = upperLimit
      }
    }
    mod = []
    select.add(option)
    upperLimit--
  }  
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
    for(let i =1;i<constraints.length;i+=2){
      mod.push(constraintForLowerLimitEqual(lowerLimit,constraints[i]))
      if(constraintForLowerLimitEqual(lowerLimit,constraints[i])==true){
        counter = i
      }
      console.log(mod)
      if(mod.includes(true) || countInArray(mod,true)>1){
        option.text = constraints[counter-1]
      }else{
        option.text = lowerLimit
      }
    }
    mod = []
    select.add(option)
    lowerLimit++
  }
}  
  function constraintForLowerLimitNotEqual(lowerLimit,a){
    if(modulo(lowerLimit, a) !== 0){
      return true
    }
  }

  function constraintForLowerLimitEqual(lowerLimit,a){
    if(modulo(lowerLimit, a) == 0){
      return true
    }else{return false}
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

function countInArray(array, what) {
  return array.filter(item => item == what).length;
}