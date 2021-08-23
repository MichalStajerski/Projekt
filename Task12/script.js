const color = ['#ca7', '#7ac', '#77c', '#8f1340', '#a7c']
const label = ['gżegżółka', 'jaskółka', 'żaba', 'scieżka', 'durszlak']
const pieces = label.map(function (x) {
  return label.indexOf(x)
})
var circles = [];
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
    console.log('deg ' + deg)
    console.log('slicedeg ' + sliceDeg)
    console.log('calc ' + Math.floor(((360 - 208 - 90) % 360) / sliceDeg))
    let ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg) // deg 2 Array Index
    ai = (slices + ai) % slices // Fix negative index
    console.log('pieces before splice', pieces)
    console.log('109', label.indexOf(label[ai]))
    pieces.splice(label.indexOf(label[ai]), 1)
    console.log('ai',ai)
    console.log('pieces after splice', pieces)
    console.log('sl',slices)

    return setTimeout(() => {
      let circle
      ctx.clearRect(0, 0, width, width)
      for (let i = 0; i < slices; i++) {
        if (pieces.includes(i)) {
          drawSlice(i, deg, 'rgb(192,192,192)')
          circle = {
            id: i,
            color :'rgb(192,192,192)'
          }
        } else {
          drawSlice(i, deg, color[i])
          circle = {
            id: i,
            color : color[i]
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

let mouse = {x:0,y:0}
let canvas = document.getElementById('canvas')

function hasSameColor(color, circle) {
  if(circle.color === color){
    return true
  }
}


// we will chceck if user clicked on the chosen slice with checking out the color of the pixel upon click
//if ti matches the one of the drawn slice we can move to the window with options to choose for user related to the word
//that the wheel of fortune indicated
 document.onmousedown = sliceClicked
function sliceClicked(e){
  console.log('circle',circles)

  const mousePos = {
    x: e.clientX - canvas.offsetTop,
    y: e.clientY - canvas.offsetLeft
  };
  // get pixel under cursor
  const pixel = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;

  const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
  console.log(color)
  // find a circle with the same colour
  circles.forEach(circle => {
    if (hasSameColor(color, circle)) {
      alert('click on circle: ' + circle.id);
    }
  });

//   if(e.layerX || e.layerY == 0){
//     mouse.x = e.layerX - canvas.offsetLeft
//     mouse.y = e.layerY - canvas.offsetTop
//   }else if(e.offsetX || e.offsetY == 0){
//     mouse.x = e.layerX - canvas.offsetLeft
//     mouse.y = e.layerY - canvas.offsetTop
//   }
//   console.log('mouse.x,mouse.y', mouse.x, mouse.y)
// }
}

drawImg()
