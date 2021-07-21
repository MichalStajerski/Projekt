let lowerLimit  
let upperLimit 
const select = document.getElementById('mySelect')

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
    }
    upperLimit--  
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
    }
    lowerLimit++
}
function submitValues(){
    lowerLimit = parseInt(document.getElementById('lowerLimit').value)
    upperLimit = parseInt(document.getElementById('upperLimit').value)
}

function modulo(divident,divider){
    let scoreWithoutRestOfDivision = parseInt(divident / divider);  
    let dividentWithoutRestOfdivision = scoreWithoutRestOfDivision * divider;  
    return divident - dividentWithoutRestOfdivision;  
}
