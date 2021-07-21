let counter  
let upperLimit 
const select = document.getElementById('mySelect')

function countBackWardsByOneIteration() {
    if(upperLimit>=counter){
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
    if(counter<=upperLimit){
        var option = document.createElement('option')
        if(modulo(counter,3)==0 && modulo(counter,5)!=0){
            console.log('Fizz')
            option.text = 'Fizz'
        }
        if(modulo(counter,5)==0 && modulo(counter,3)!=0){
            option.text = 'Buzz'
            console.log('Buzz')
        }
        if(modulo(counter,3)==0 && modulo(counter,5)==0){
            option.text = 'FizzBuzz'
            console.log('FizzBuzz')
        }
        if(modulo(counter,5)!=0 && modulo(counter,3)!=0){
            option.text = counter
            console.log(counter)
        }
        select.add(option)
    }
    counter++
}
function submitValues(){
    counter = parseInt(document.getElementById('lowerLimit').value)
    upperLimit = parseInt(document.getElementById('upperLimit').value)

}

function modulo(divident,divider){
    let scoreWithoutRestOfDivision = parseInt(divident / divider);  
    let dividentWithoutRestOfdivision = scoreWithoutRestOfDivision * divider;  
    return divident - dividentWithoutRestOfdivision;  
  }
