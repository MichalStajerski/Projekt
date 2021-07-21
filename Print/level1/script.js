const upperLimit = 100
const select = document.getElementById('mySelect')
for(let i =1;i<=upperLimit;i++){
    var option = document.createElement('option')
    if(modulo(i,3)==0 && modulo(i,5)!=0){
        console.log('Fizz')
        option.text = 'Fizz'
    }
    if(modulo(i,5)==0 && modulo(i,3)!=0){
        option.text = 'Buzz'
        console.log('Buzz')
    }
    if(modulo(i,3)==0 && modulo(i,5)==0){
        option.text = 'FizzBuzz'
        console.log('FizzBuzz')
    }
    if(modulo(i,3)!=0 && modulo(i,5)!=0){
        option.text = i
        console.log(i)
    }
    select.add(option)
}

//so for example we want to get 7%2 => modulo(7,2)
//thanks to aprse scoreWithoutRestOfDivision will be equal to 3
//then we multiply it by divider => 3*2
//and return 7 - 6
function modulo(divident,divider){
    let scoreWithoutRestOfDivision = parseInt(divident / divider);  
    let dividentWithoutRestOfdivision = scoreWithoutRestOfDivision * divider;  
    return divident - dividentWithoutRestOfdivision;  
  }