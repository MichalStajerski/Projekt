const upperLimit = 100
const select = document.getElementById('mySelect')
let lowerLimit = 1

function countForwardsByOneIteration () {
  for (let i = 0; i < 1; i++) {
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
        option.text = lowerLimit
        console.log(lowerLimit)
      }
      select.add(option)
      lowerLimit++
    }
  }
}
function modulo (divident, divider) {
  const scoreWithoutRestOfDivision = parseInt(divident / divider)
  const dividentWithoutRestOfdivision = scoreWithoutRestOfDivision * divider
  return divident - dividentWithoutRestOfdivision
}
