const color = ['#ca7', '#7ac', '#77c', '#aac', '#a7c', '#ac7', '#caa']
const label = ['gzegzolka', 'jaskolka', 'zaba', 'sciezka', 'durszlak']
const stopAngel = [] // stop angels starting from label index 1(0...label.length)
const slices = label.length
const sliceDeg = 360 / slices
let deg = 60
let speed = 2
let slowDownRand = 0
const ctx = document.getElementById('canvas').getContext('2d')
document.getElementById('canvas').width = 600
document.getElementById('canvas').height = 600
const width = document.getElementById('canvas').width // size
const center = width / 2 // center
// var center = 150;
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
  stopAngel.push
  ctx.beginPath()
  console.log(ctx)
  ctx.fillStyle = color
  ctx.moveTo(center, center)
  ctx.arc(center, center, center, deg2rad(deg), deg2rad(deg + sliceDeg), false)
  ctx.lineTo(center, center)
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
  // drawSliceOut();
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

  // Increment speed
  if (!isStopped && speed < 3) {
    speed = speed + 1 * 0.1
  }
  // Decrement Speed
  if (isStopped) {
    if (!lock) {
      lock = true
    }
    speed = speed > 0.4 ? speed *= 0.997 : 0
  }
  // Stopped!
  if (lock && !speed) {
    console.log('deg ' + deg)
    console.log('slicedeg ' + sliceDeg)
    console.log('calc ' + Math.floor(((360 - 208 - 90) % 360) / sliceDeg))
    let ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg) // deg 2 Array Index
    console.log(slices)
    ai = (slices + ai) % slices // Fix negative index
    return alert('You got:\n' + label[ai]) // Get Array Item from end Degree
    ctx.arc(150, 150, 150, 8.85131263511415, 9.748910536139757)
    ctx.fill()
    deg = 208
    drawImg()
  }

  drawImg()
  window.requestAnimationFrame(anim)
}

function start () {
  anim()
  const ele = document.getElementById('canvas')
  ele.classList.add('spin-wheel')
  setTimeout(function () {
    ele.classList.remove('spin-wheel')
    // deg= stopAngel[5];
    drawImg()
  }, 3000)
}

drawImg()
