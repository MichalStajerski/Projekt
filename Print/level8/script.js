// not working yet
let lowerLimit
let upperLimit
const select = document.getElementById('mySelect')
const constraints = []
let mod = []
let counter = 1
let counterarr = []



function countBackWardsByOneIteration () {
  if (upperLimit >= lowerLimit) {
    const option = document.createElement('option')
    for(let i =1;i<constraints.length;i+=2){
      mod.push(constraintForLowerLimitEqual(upperLimit,constraints[i]))
      if(constraintForLowerLimitEqual(upperLimit,constraints[i])==true){
        counter = i
        counterarr.push(counter)
      }
      console.log(mod)
      if(mod.includes(true) && countInArray(mod,true)>1){
        for(let i =0;i<counterarr.length;i++){
          if(!option.text.includes(constraints[counterarr[i]-1]))
          option.text += constraints[counterarr[i]-1]
        }
      }
      if(mod.includes(true) && countInArray(mod,true)==1){
        option.text = constraints[counter-1]
      }
      if(!mod.includes(true)){
        option.text = upperLimit
      }
    }
    counterarr = []
    mod = []
    select.add(option)
    upperLimit--
  }  
}

function countForwardsByOneIteration () {
  if(lowerLimit <= upperLimit){
    const option = document.createElement('option')    
    for(let i =1;i<constraints.length;i+=2){
      mod.push(constraintForLowerLimitEqual(lowerLimit,constraints[i]))
      if(constraintForLowerLimitEqual(lowerLimit,constraints[i])==true){
        counter = i
        counterarr.push(counter)
      }
      console.log(mod)
      if(mod.includes(true) && countInArray(mod,true)>1){
        for(let i =0;i<counterarr.length;i++){
          if(!option.text.includes(constraints[counterarr[i]-1]))
          option.text += constraints[counterarr[i]-1]
        }
      }
      if(mod.includes(true) && countInArray(mod,true)==1){
        option.text = constraints[counter-1]
      }
      if(!mod.includes(true)){
        option.text = lowerLimit
      }
    }
    counterarr = []
    mod = []
    select.add(option)
    lowerLimit++
  }
}  

  function constraintForLowerLimitEqual(lowerLimit,a){
    if(modulo(lowerLimit, a) == 0){
      return true
    }else{return false}
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

function countInArray(array, what) {
  return array.filter(item => item == what).length;
}