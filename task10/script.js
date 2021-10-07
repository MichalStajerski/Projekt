let correctAnswers = 0
const answers = []
let block = false
const imgs = ['Images/0.jpg', 'Images/1.jpg', 'Images/2.jpg', 'Images/3.jpg']
const alt = ['Bee', 'Bear', 'Dog', 'Parrot']
const audioTracks = ['Audio/Bee-noise.mp3', 'Audio/Large Black Bear Single Roar - QuickSounds.com.mp3', 'Audio/Dog-barking-multiple-sound-effect.mp3', 'Audio/Small Parrot Interior Constant Calls - QuickSounds.com.mp3']
let checkedalt = []
// altanswers is an array of alts for our images
let altanswers = []
let draw = true
let increment = 0

const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const arraysAreEqual = (array1, array2) => array1.length === array2.length && array1.every(el => array2.includes(el))

// function to show increment in progress bar after correct answer
function move () {
  if (increment < 100) {
    increment += 10
    const elem = document.getElementById('myBar')
    elem.style.width = increment + '%'
    const id = setInterval(frame, 10)
    function frame () {
      if (increment >= 100) {
        clearInterval(id)
      }
    }
  }
}

function checkAnswers (id) {
  if (block === false) {
    const picture = document.getElementById(id).alt
    checkedalt.push(picture)

    if (arraysAreEqual(checkedalt, altanswers)) {
      move()
      draw = true
      correctAnswers++
      // display how many correct asnwers we currently have
      document.querySelector('#myCorrectAnswers').innerHTML = correctAnswers
      drawImgagesAndSound()
      correctAnswers === 10 ? block = true && setTimeout(() => { alert('Victory'), 100 }) : null
    } else {
      // don't draw new set of images and audio, lets the user change his asnwer
      draw = false
    }
    checkedalt = []
  }
}

function drawImgagesAndSound () {
  if (draw !== false) {
    // gets array with 3 random numbers
    const temp = getRandomArrayNumbers(3)
    console.log(temp)
    const random = Math.floor(Math.random() * temp.length)
    for (let i = 1; i <= temp.length; i++) {
      // writes new source and alt of images leaving the same id
      document.getElementById(i).src = imgs[temp[i - 1]]
      document.getElementById(i).alt = alt[temp[i - 1]]
      // draws one random audio matching one of the images that were drawn above
    }
    const answer = temp[random]
    console.log(answer)
    document.querySelector('#audio').src = audioTracks[answer]
    altanswers = [alt[answer]]
  }
}
// returns array of random numbers between two 0 and specified number - our not repeating images
function getRandomArrayNumbers (qt) {
  const indexSet = new Set()
  while (indexSet.size != qt) {
    indexSet.add(getRandomIntInclusive(0, imgs.length - 1))
  }
  return Array.from(indexSet)
}

window.onload = () => {
  drawImgagesAndSound()
}
