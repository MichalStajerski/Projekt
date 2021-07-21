//code is the same as in lvl4 since from the beginning i displayed results on the screen instead of terminal 
const upperLimit = 100
const select = document.getElementById('mySelect')
let counter  =1

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

function modulo(divident,divider){
    let scoreWithoutRestOfDivision = parseInt(divident / divider);  
    let dividentWithoutRestOfdivision = scoreWithoutRestOfDivision * divider;  
    return divident - dividentWithoutRestOfdivision;  
  }
