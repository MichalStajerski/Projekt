const storageArray: string[] = []
const select =  (<HTMLInputElement>document.getElementById('mySelect'))

let lowerLimit :number 
let upperLimit :number 
//console.log('asd')

function modulo (divident: number, divider :number) : number {
    const scoreWithoutRestOfDivision = Math.floor(divident / divider)
    const dividentWithoutRestOfdivision = scoreWithoutRestOfDivision * divider
    return divident - dividentWithoutRestOfdivision
}

function countBackWardsByOneIteration(){
  if (lowerLimit <= upperLimit) {
    const option = document.createElement('option')
    if (modulo(upperLimit, 3) == 0 && modulo(upperLimit, 5) != 0) {
      console.log('Fizz')
      option.text = 'Fizz'
    }
    if (modulo(upperLimit, 5) == 0 && modulo(upperLimit, 3) != 0) {
       option.text = 'Buzz'
       console.log('Buzz')
    }
    if (modulo(upperLimit, 3) == 0 && modulo(upperLimit, 5) == 0) {
       option.text = 'FizzBuzz'
      console.log('FizzBuzz')
    }
    if (modulo(upperLimit, 5) != 0 && modulo(upperLimit, 3) != 0) {
      option.text = String(upperLimit)
      console.log(upperLimit)
    }
    select.innerHTML += option.value+'<br>'
    console.log(option)
    upperLimit--
    storageArray.push(option.text)
  } else {
    setTimeout(() => {
      alert('Wrong values')
    }, 100)
  }
}

function countForwardsByOneIteration () {
  if (lowerLimit <= upperLimit) {
    const option = document.createElement('option')
    if (modulo(lowerLimit, 3) == 0 && modulo(lowerLimit, 5) != 0) {
      console.log('Fizz')
      option.text = 'Fizz'
    }
    if (modulo(lowerLimit, 5) == 0 && modulo(lowerLimit, 3) != 0) {
      option.text = 'Buzz'
      console.log('Buzz')
    }
    if (modulo(lowerLimit, 3) == 0 && modulo(lowerLimit, 5) == 0) {
      option.text = 'FizzBuzz'
      console.log('FizzBuzz')
    }
    if (modulo(lowerLimit, 5) != 0 && modulo(lowerLimit, 3) != 0) {
      option.text = String(lowerLimit)
      console.log(lowerLimit)
    }
    select.innerHTML += option.value+'<br>'
    console.log(option)
    lowerLimit++
    storageArray.push(option.text)
  } else {
    setTimeout(() => {
      alert('Wrong values')
    }, 100)
  }
}

console.log(modulo(5,2))

function submitValues () {
    lowerLimit = Number((<HTMLInputElement>document.getElementById('lowerLimit')).value)
    upperLimit =Number((<HTMLInputElement>document.getElementById('upperLimit')).value)
    console.log('lower and upper limit', lowerLimit,upperLimit)
}