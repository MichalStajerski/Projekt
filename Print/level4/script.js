const upperLimit = 100
const select = document.getElementById('mySelect')
let lowerLimit  =1

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

function modulo(divident,divider){
    let scoreWithoutRestOfDivision = parseInt(divident / divider);  
    let dividentWithoutRestOfdivision = scoreWithoutRestOfDivision * divider;  
    return divident - dividentWithoutRestOfdivision;  
  }
