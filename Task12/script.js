const color = ['#aa77cc', '#ccaa77', '#7777cc', '#77aacc', '#8f1340']
const label = ['gżegżółka', 'jaskółka', 'żaba', 'scieżka', 'durszlak']
const pieces = label.map(function (x) {
  return label.indexOf(x)
})
const circles = []
shuffleArray(label)
shuffleArray(color)
console.log('label', label)
console.log('pieces', pieces)
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
const center = width / 2 // center
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

function drawImg () {
  ctx.clearRect(0, 0, width, width)
  for (let i = 0; i < slices; i++) {
    drawSlice(i, deg, color[i])
    drawText(deg + sliceDeg / 2, label[i])
    deg += sliceDeg
  }
  console.log('Stop Angel ' + stopAngel)
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
            word:label[i]
          }
        } else {
          drawSlice(i, deg, color[i])
          circle = {
            id: i,
            color: color[i],
            word:label[i]
          }
        }
        circles.push(circle)
        drawText(deg + sliceDeg / 2, label[i])
        deg += sliceDeg
      }
    }, 200)
  }
  drawImg()
  window.requestAnimationFrame(anim)
}

function start () {
  anim()
  setTimeout(function () {
    drawImg()
  }, 3000)
  const button = document.getElementById('btnSpin')
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

const mouse = { x: 0, y: 0 }
const canvas = document.getElementById('canvas')

function hasSameColor (color, circle) {
  if (circle.color === color) {
    return true
  }
}

//changes colors written in rgb to hex notification
function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255)
      throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}
// we will chceck if user clicked on the chosen slice with checking out the color of the pixel upon click
// if ti matches the one of the drawn slice we can move to the window with options to choose for user related to the word
// that the wheel of fortune indicated
// after draw only one splice will remain with it's original colorrest will turn grey
document.onmousedown = sliceClicked
function sliceClicked (e) {
  console.log('circle', circles)
  console.log('label',label)
  var pixel = canvas.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data;
  var colorhex = "#" + ("000000" + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6);
  console.log(colorhex)
  // find a circle with the same colour
  circles.forEach(circle => {
    if (hasSameColor(colorhex, circle)) {
      alert('click on circle: ' + circle.id)
    }
  })
}

drawImg()
