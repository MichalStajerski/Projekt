const upperLimit = 100
const select = document.getElementById('mySelect')
let lowerLimit  =1
let storageArray = []
var option2 = document.createElement('option')
let localStoragebool = false

function countForwardsByOneIteration(){ 
    for(let i = 0;i<1;i++){
        if(lowerLimit<=upperLimit){
            var option = document.createElement('option')
            if(modulo(lowerLimit,3)==0 && modulo(lowerLimit,5)!=0){
                console.log('Fizz')
                option.text = 'Fizz'
            }
            if(modulo(lowerLimit,5)==0 && modulo(lowerLimit,3)!=0){
                option.text = 'Buzz'
                console.log('Buzz')
            }
            if(modulo(lowerLimit,3)==0 && modulo(lowerLimit,5)==0){
                option.text = 'FizzBuzz'
                console.log('FizzBuzz')
            }
            if(modulo(lowerLimit,5)!=0 && modulo(lowerLimit,3)!=0){
                option.text = lowerLimit
                console.log(lowerLimit)
            }
            select.add(option)
            lowerLimit++
            storageArray.push(option.text)
            localStorage.setItem('options',storageArray.slice(-1).pop())
            localStorage.setItem('lastIndex',lowerLimit)
            console.log(localStorage)
            localStoragebool = true
        }
    }
}

function modulo(divident,divider){
    let scoreWithoutRestOfDivision = parseInt(divident / divider);  
    let dividentWithoutRestOfdivision = scoreWithoutRestOfDivision * divider;  
    return divident - dividentWithoutRestOfdivision;  
  }

window.onload = function(){  
    if(localStorage.getItem('options')!= null){
        option2.text =  localStorage.getItem('options')
        lowerLimit = parseInt(localStorage.getItem('lastIndex'))
        select.add(option2)    
    }
}

