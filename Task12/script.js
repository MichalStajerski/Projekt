const color = ['#aa77cc', '#ccaa77', '#7777cc', '#77aacc', '#8f1340']
const label = ['gżegżółka', 'jaskółka', 'żaba', 'scieżka', 'durszlak']
const pieces = label.map(function (x) {
  return label.indexOf(x)
})
const ans = label.map(function (x) {
  return label.indexOf(x) + 1
})
const hasSameColor = (color1, color2) => color1 === color2
const arraysAreEqual = (a1, a2) => a1.length === a2.length && a1.every(el => a2.includes(el))
const button = document.getElementById('btnSpin')
const wheel = document.getElementById('wheel')
const answers = ['answer1', 'answer3']
const circles = []
const pickedAnswers = []
let drawnOptionClicked = false
shuffleArray(label)
shuffleArray(color)
shuffleArray(ans)
const stopAngel = [] // stop angels starting from label index 1(0...label.length)
const slices = label.length
const sliceDeg = Math.ceil(360 / slices)
let deg = 60
let speed = 15
const slowDownRand = 0
const ctx = document.getElementById('canvas').getContext('2d')
document.getElementById('canvas').width = 600
document.getElementById('canvas').height = 600
const width = document.getElementById('canvas').width // size
const center = width / 2 // center, since both height and width are the same
let isStopped = false
let lock = false

function rand (min, max) {
  return Math.random() * (max - min) + min
}

function oddEven (num) {
  return !!(num % 2)
}

function deg2rad (deg) { return deg * Math.PI / 180 }

function drawSlice (index, deg, color) {
  let sAngel
  let current = (index <= 0) ? deg : stopAngel[index - 1]
  if (oddEven(index)) {
    if (current <= 0) {
      sAngel = Math.abs(Math.floor(260 + sliceDeg + 10))
    } else {
      sAngel = Math.abs(Math.floor(current - sliceDeg + 10))
    }
    current = sAngel
    stopAngel.push(current)
  } else {
    if (current <= 0) {
      sAngel = Math.abs(Math.floor(260 + sliceDeg - 10))
    } else {
      sAngel = Math.abs(Math.floor(current - sliceDeg - 10))
    }
    current = sAngel
    stopAngel.push(current)
  }
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.moveTo(center, center)
  ctx.arc(center, center, center, deg2rad(deg), deg2rad(deg + sliceDeg), false)
  ctx.fill()
}

function drawText (deg, text) {
  ctx.save()
  ctx.translate(center, center)
  ctx.rotate(deg2rad(deg))
  ctx.textAlign = 'right'
  ctx.fillStyle = '#fff'
  ctx.font = '25px serif'
  ctx.fillText(text, 200, 10)
  ctx.restore()
}

// creates our wheel by drawing slices and implementing text into them
function drawImg () {
  ctx.clearRect(0, 0, width, width)
  for (let i = 0; i < slices; i++) {
    drawSlice(i, deg, color[i])
    drawText(deg + sliceDeg / 2, label[i])
    deg += sliceDeg
  }
}

function anim () {
  isStopped = true
  deg += speed
  deg %= 360

  // Speed up
  if (!isStopped && speed < 3) {
    speed = speed + 1 * 0.1
  }
  // Slow down
  if (isStopped) {
    if (!lock) {
      lock = true
    }
    // added this so the red cursor wont be always in the same position in the slice
    slowDownPace = rand(0.992, 0.998)
    speed = speed > 0.2 ? speed *= slowDownPace : 0
  }
  // Stop
  if (lock && !speed) {
    let ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg) // deg 2 Array Index
    ai = (slices + ai) % slices // Fix negative index
    pieces.splice(label.indexOf(label[ai]), 1)

    return setTimeout(() => {
      let circle
      ctx.clearRect(0, 0, width, width)
      for (let i = 0; i < slices; i++) {
        if (pieces.includes(i)) {
          drawSlice(i, deg, 'rgb(192,192,192)')
          circle = {
            id: i,
            color: 'rgb(192,192,192)',
            word: label[i]
          }
        } else {
          drawSlice(i, deg, color[i])
          circle = {
            id: i,
            color: color[i],
            word: label[i]
          }
        }
        circles.push(circle)
        drawText(deg + sliceDeg / 2, label[i])
        deg += sliceDeg
      }
    }, 200)
  }
  drawImg()
  // allows animation to diplay in a flunet manner
  window.requestAnimationFrame(anim)
}

function start () {
  anim()
  setTimeout(function () {
    drawImg()
  }, 3000)
  button.disabled = true
}

function shuffleArray (array) { // randomly shuffles our array
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

// changes colors written in rgb to hex notification
function rgbToHex (r, g, b) {
  if (r > 255 || g > 255 || b > 255) { throw 'Invalid color component' }
  return ((r << 16) | (g << 8) | b).toString(16)
}
// we will chceck if user clicked on the chosen slice with checking out the color of the pixel upon click
// if ti matches the one of the drawn slice we can move to the window with options to choose for user related to the word
// that the wheel of fortune indicated
// after draw only one splice will remain with it's original colorrest will turn grey
document.onmousedown = sliceClicked
function sliceClicked (e) {
  console.log('circle', circles)
  console.log('label', label)
  const pixel = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data
  const colorhex = '#' + ('000000' + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6)
  console.log(colorhex)
  // find a circle with the same colour
  circles.forEach(circle => {
    if (hasSameColor(colorhex, circle.color)) {
      alert('clicked on circle: ' + circle.word)
      drawnOptionClicked = true
      if (drawnOptionClicked) {
        wheel.remove()
        button.remove()
        answerLayout()
        document.onmousedown = null
      }
    }
  })
}

function answerLayout () {
  const body = document.getElementById('body')
  const container = document.createElement('div')
  container.className = 'container'
  for (let i = 0; i < ans.length; i++) { // using ans always draws answers in random order
    const box = document.createElement('div')
    box.className = 'box'
    box.innerHTML = 'answer' + ans[i]
    box.id = 'answer' + ans[i]
    box.onclick = () => boxClicked(box)// add on clikc funtion to div
    container.appendChild(box)
  }
  body.appendChild(container)
}

function boxClicked (box) {
  if (!box.style.borderColor) { // if the answer is not checked mark it's border in blue color
    box.style.borderColor = 'blue'
    pickedAnswers.push(box.id)// add answer
    console.log(pickedAnswers)
  } else {
    box.style.borderColor = null// upon reclicking the same answer revert it back to original state
    pickedAnswers.splice(pickedAnswers.indexOf(box.id), 1)// remove the answer
    console.log(pickedAnswers)
  }
  checkAnswers()
}
function checkAnswers () {
  const boxNum = document.querySelectorAll('.box').length
  if (arraysAreEqual(answers, pickedAnswers)) { // all correct answers
    answers.forEach(answer => {
      document.getElementById(answer).style.borderColor = 'green'
    })
    for (let i = 1; i < boxNum + 1; i++) {
      document.getElementById('answer' + i).onclick = null
    }
    setTimeout(() => {
      alert('Correct answers')
    }, 300)
  } else { // the mix of bad answers and good ones
    pickedAnswers.forEach(answer => {
      if (answers.includes(answer)) { // in case it's a good answer
        document.getElementById(answer).style.borderColor = 'green'
        document.getElementById(answer).onclick = null
      } else {
        document.getElementById(answer).style.borderColor = 'red'
        document.getElementById(answer).onclick = null
      }
    })
  }
}
drawImg()
