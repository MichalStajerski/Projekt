// TODO get rid of for and present words and dividers in div, add  localStorage for this level
let lowerLimit
let upperLimit
const select = document.getElementById('mySelect')
const constraints = []
let mod = []
let counter = 1
let counterarr = []
let test = 1

const insteadOfLoop = (array) => array.map(el=>el)


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
  }else{
    setTimeout(() => {
      alert('Wrong values')
    }, 100)
  }
}

function countForwardsByOneIteration () {
  if(lowerLimit <= upperLimit){
    const option = document.createElement('option') 
    console.log('insteadofLoop',insteadOfLoop(constraints)) 
    function action(i){
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
      if(i<constraints.length){
        action(i+2)
      }
    }
    action(test)

    counterarr = []
    mod = []
    select.add(option)
    lowerLimit++
  }else{
    setTimeout(() => {
      alert('Wrong values')
    }, 100)
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
  console.log('loweLimit',lowerLimit)
  console.log('uppperLimit',upperLimit)
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

//instead of going by loop through each element we can use map and defined function f that will make changes to each item for example
//will use recursive version to swap all the loops
// const arr = [2,3]
// const iterate = (a1) => a1.map(res => res )
// console.log(iterate(arr))

// console.log(map(f,arr,4))
// function map(f, a,divider) {
//   if (a.length === 0) { return []; }
//   return [f(a[0],divider)].concat(map(f, a.slice(1),divider));
// }
// function f(item){
//   if(!option.text.includes(constraints[counterarr[item]-1]))
//   return option.text += constraints[counterarr[item]-1]
// }
// function f(item,divider){
//   if(constraintForLowerLimitEqual(item,divider)==true){
//     return item+' => jest podzielne przez '+divider
//   }else{
//     return item+' => nie jest podzielne przez '+divider
//   }
// }