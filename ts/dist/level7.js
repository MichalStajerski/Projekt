var storageArray = [];
var select = document.getElementById('mySelect');
var lowerLimit;
var upperLimit;
//console.log('asd')
function modulo(divident, divider) {
    var scoreWithoutRestOfDivision = Math.floor(divident / divider);
    var dividentWithoutRestOfdivision = scoreWithoutRestOfDivision * divider;
    return divident - dividentWithoutRestOfdivision;
}
function countBackWardsByOneIteration() {
    if (lowerLimit <= upperLimit) {
        var option = document.createElement('option');
        if (modulo(upperLimit, 3) == 0 && modulo(upperLimit, 5) != 0) {
            console.log('Fizz');
            option.text = 'Fizz';
        }
        if (modulo(upperLimit, 5) == 0 && modulo(upperLimit, 3) != 0) {
            option.text = 'Buzz';
            console.log('Buzz');
        }
        if (modulo(upperLimit, 3) == 0 && modulo(upperLimit, 5) == 0) {
            option.text = 'FizzBuzz';
            console.log('FizzBuzz');
        }
        if (modulo(upperLimit, 5) != 0 && modulo(upperLimit, 3) != 0) {
            option.text = String(upperLimit);
            console.log(upperLimit);
        }
        select.innerHTML += option.value + '<br>';
        console.log(option);
        upperLimit--;
        storageArray.push(option.text);
    }
    else {
        setTimeout(function () {
            alert('Wrong values');
        }, 100);
    }
}
function countForwardsByOneIteration() {
    if (lowerLimit <= upperLimit) {
        var option = document.createElement('option');
        if (modulo(lowerLimit, 3) == 0 && modulo(lowerLimit, 5) != 0) {
            console.log('Fizz');
            option.text = 'Fizz';
        }
        if (modulo(lowerLimit, 5) == 0 && modulo(lowerLimit, 3) != 0) {
            option.text = 'Buzz';
            console.log('Buzz');
        }
        if (modulo(lowerLimit, 3) == 0 && modulo(lowerLimit, 5) == 0) {
            option.text = 'FizzBuzz';
            console.log('FizzBuzz');
        }
        if (modulo(lowerLimit, 5) != 0 && modulo(lowerLimit, 3) != 0) {
            option.text = String(lowerLimit);
            console.log(lowerLimit);
        }
        select.innerHTML += option.value + '<br>';
        console.log(option);
        lowerLimit++;
        storageArray.push(option.text);
    }
    else {
        setTimeout(function () {
            alert('Wrong values');
        }, 100);
    }
}
console.log(modulo(5, 2));
function submitValues() {
    lowerLimit = Number(document.getElementById('lowerLimit').value);
    upperLimit = Number(document.getElementById('upperLimit').value);
    console.log('lower and upper limit', lowerLimit, upperLimit);
}
