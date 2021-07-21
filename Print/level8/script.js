//not working yet
let lowerLimit  
let upperLimit 
const select = document.getElementById('mySelect')
let constraints = []

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
        for(let i = 0;i<constraints.length;i++){
            if(modulo(i,2)==0){
                if(modulo(lowerLimit,constraints[i+1])==0){
                    option.text = constraints[i]
                }else{
                    option.text = lowerLimit
                }
            }
        }
        select.add(option)
    }
    lowerLimit++
}
function submitValues(){
    lowerLimit = parseInt(document.getElementById('lowerLimit').value)
    upperLimit = parseInt(document.getElementById('upperLimit').value)
}
function submitWordsAndDivisors(){
    constraints.push(document.getElementById('word').value)
    constraints.push(parseInt(document.getElementById('divisor').value))
    console.log(constraints)
}

function modulo(divident,divider){
    let scoreWithoutRestOfDivision = parseInt(divident / divider);  
    let dividentWithoutRestOfdivision = scoreWithoutRestOfDivision * divider;  
    return divident - dividentWithoutRestOfdivision;  
  }
