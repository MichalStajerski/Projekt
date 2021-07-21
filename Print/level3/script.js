const upperLimit = 100
const select = document.getElementById('mySelect')
let lowerLimit  =1
// let state = document.getElementById('mySelect')

var tabelaContent = document.getElementById('mySelect')
localStorage.setItem('selectContent',tabelaContent);

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
            // state = document.getElementById('mySelect')
        }
    }
    
}
function modulo(divident,divider){
    let scoreWithoutRestOfDivision = parseInt(divident / divider);  
    let dividentWithoutRestOfdivision = scoreWithoutRestOfDivision * divider;  
    return divident - dividentWithoutRestOfdivision;  
  }

  window.onload = function(){   
    window.localStorage.setItem('state', JSON.stringify(this.state));
    // localStorage.setItem( 'myState', state );
    // state = localStorage.getItem('myState')
  }
