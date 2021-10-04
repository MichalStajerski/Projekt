const timesClicked = correctAnswers = 0
const answers = []
let block = false
const imgs = ['Images/0.jpg', 'Images/1.jpg', 'Images/2.jpg', 'Images/3.jpg']
const alt = ['Bee', 'Bear', 'Dog', 'Parrot']
const audioTracks = ['Audio/Bee-noise.mp3', 'Audio/Large Black Bear Single Roar - QuickSounds.com.mp3', 'Audio/Dog-barking-multiple-sound-effect.mp3', 'Audio/Small Parrot Interior Constant Calls - QuickSounds.com.mp3']
let checkedalt = []
// altanswers is an array of alts for our images
let altanswers = [alt[answers[0]]]
let draw = true
console.log(altanswers)
let increment = 0
const i = 0

const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// function to show increment in progress bar after correct answer
function move () {
  if (increment < 100) {
    increment += 10
    const elem = document.getElementById('myBar')
    const width = elem.style.width = increment + '%'
    const id = setInterval(frame, 10)
    console.log(increment)
    function frame () {
      if (increment >= 100) {
        clearInterval(id)
      }
    }
  }
}

function checkAnswers (id) {
  if (block === false) {
    const a = document.getElementById(id).alt
    checkedalt.push(a)
    // sort array so the sequence of choosing correct answers won't affect the outcome, the only thing that matters is to choose correct answers
    // sorting only needed when we have more than one correct answer in our question for example: load 3 images and only by checking two of them we get the correct answer
    // in our case where there is only one correct answer it's not needed
    altanswers.sort()
    checkedalt.sort()

    if (JSON.stringify(altanswers) === JSON.stringify(checkedalt)) {
      console.log('block ' + block)
      // block our submit asnwer button after 10 questions

      for (let i = 0; i < checkedalt.length; i++) {
        const goodAnswers = checkedalt[i]
        move()
        draw = true
      }
      correctAnswers++
      // display how many correct asnwers we currently have
      document.getElementById('myCorrectAnswers').innerHTML = correctAnswers
      drawImgagesAndSound()
      if (correctAnswers === 10) {
        block = true
      }
    } else {
      document.getElementById('myCorrectAnswers').innerHTML = correctAnswers
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
    const ab = temp[random]
    console.log(ab)
    document.getElementById('audio').src = audioTracks[ab]
    altanswers = [alt[ab]]
  }
}
// returns array of random numbers between two numbers - our not repeating images
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
