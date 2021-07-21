const upperLimit = 100
const select = document.getElementById('mySelect')

for(let i =1;i<=upperLimit;i++){
    var option = document.createElement('option')
    if(i%3==0&& i%5!=0){
        option.text = 'Fizz'
        console.log('Fizz')
    }
    if(i%5==0 && i%3!=0){
        option.text = 'Buzz'
        console.log('Buzz')
    }
    if(i%3==0 && i%5==0){
        option.text = 'FizzBuzz'
        console.log('FizzBuzz')
    }
    if(i%3!=0 && i%5!=0){
        option.text = i
        console.log(i)
    }
    select.add(option)
}