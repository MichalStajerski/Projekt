const select = document.getElementById('mySelect')
let lowerLimit   
let upperLimit 
let storageArray = []
let option2 = document.createElement('option')

function countBackWardsByOneIteration() {
    if(upperLimit>=lowerLimit){
        var option = document.createElement('option')
        if(modulo(upperLimit,3)==0 && modulo(upperLimit,5)!=0){
            console.log('Fizz')
            option.text = 'Fizz'
        }
        if(modulo(upperLimit,5)==0 && modulo(upperLimit,3)!=0){
            option.text = 'Buzz'
            console.log('Buzz')
        }
        if(modulo(upperLimit,3)==0 && modulo(upperLimit,5)==0){
            option.text = 'FizzBuzz'
            console.log('FizzBuzz')
        }
        if(modulo(upperLimit,5)!=0 && modulo(upperLimit,3)!=0){
            option.text = upperLimit
            console.log(upperLimit)
        }
        select.add(option)
        upperLimit--  
        storageArray.push(option.text)
        localStorage.setItem('options',storageArray.slice(-1).pop())
        localStorage.setItem('upperLimit',upperLimit)
    }
}

function countForwardsByOneIteration(){ 
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
        localStorage.setItem('lowerLimit',lowerLimit)
        console.log(localStorage)     
    }
}
function submitValues(){
    lowerLimit = parseInt(document.getElementById('lowerLimit').value)
    upperLimit = parseInt(document.getElementById('upperLimit').value)
    localStorage.setItem('lowerLimit',lowerLimit)
    localStorage.setItem('upperLimit',upperLimit)
}

function modulo(divident,divider){
    let scoreWithoutRestOfDivision = parseInt(divident / divider);  
    let dividentWithoutRestOfdivision = scoreWithoutRestOfDivision * divider;  
    return divident - dividentWithoutRestOfdivision;  
}

window.onload = function(){  
    if(localStorage.getItem('options')!= null){
        option2.text =  localStorage.getItem('options')
        console.log('options',localStorage.getItem('options'))
        lowerLimit = parseInt(localStorage.getItem('lowerLimit'))
        upperLimit = parseInt(localStorage.getItem('upperLimit'))
        console.log('onloadlowerlimit',lowerLimit)
        select.add(option2)    
    }
}
