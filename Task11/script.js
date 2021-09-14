const canvas = document.createElement('canvas')
canvas.width = 600
canvas.height = 600
canvas.id = 'canvas'
canvas.className = 'canvas'
canvas.style.border = '5px solid #000000'
const ctx = canvas.getContext('2d')

const hasSameColor = (color1, color2) => color1 === color2 // checks if two colors are the same
const colors = {
  correctChoice: '#008000',
  wrongChoice: '#ff0000'
}
let score = 0
let fallTimer
let newCircle = 0
var objects = {
  number: [],
  centers: [], // array of locations
  sizes: [], // how big each circle is
  colors: [],
  time: 15,
  stepSize: [],
  moveDown: function () {
    const removals = []
    for (let i = 0; i < objects.number.length; i++) {
      objects.centers[i][1] = objects.centers[i][1] + objects.stepSize[i]
      if (objects.centers[i][0] > 600) { // if coordinate y surpasses 600 stop drawing circle
        removals.push(i)
      }
    }
    for (j = 0; j < removals.length; j++) { // delte all properties of a clicked object
      objects.centers.splice(removals[j], 1)
      objects.sizes.splice(removals[j], 1)
      objects.color.splice(removals[j], 1)
      objects.stepSize.splice(removals[j], 1)
      objects.number[i] = objects.number[i] - 1
    }
    objects.drawCircles()// after figuring out which circles not include into drawing
  },
  drawCircles: function () {
    for (i = 0; i < objects.number.length; i++) {
      ctx.beginPath()
      ctx.arc(objects.centers[i][0], objects.centers[i][1],
        objects.sizes[i], 0, 2 * Math.PI, false)
      ctx.fillStyle = objects.colors[i]
      ctx.fill()
    }
  }
}

function CreateLayout (startButton, body) {
  startButton.remove()
  const counter = document.createElement('div')
  counter.className = 'counter'
  const minutesLabel = document.createElement('label')
  minutesLabel.id = 'minutes'
  minutesLabel.innerHTML = '00' + ':'
  const secondsLabel = document.createElement('label')
  secondsLabel.id = 'seconds'
  secondsLabel.innerHTML = '00'
  counter.append(minutesLabel, secondsLabel)
  const scoreLabel = document.createElement('div')
  scoreLabel.id = 'scoreLabel'
  scoreLabel.className = 'scoreLabel'
  body.append(scoreLabel, counter, canvas)
  let totalSeconds = 0
  const time = setInterval(setTime, 1000)// we refresh it every sedond because that is the minimum value by which timer is supposed to change

  function setTime () {
    ++totalSeconds
    secondsLabel.innerHTML = pad(totalSeconds % 60)// modulo for seconds
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60)) + ':'
    console.log('minuteslabel', minutesLabel.innerHTML)
    if (minutesLabel.innerHTML === '01:') {
      clearInterval(fallTimer)// clears interval for drawing falling objects to stop fall of the objects
      clearInterval(time)// clears interval for timer to stop counting
      alert('Game Over!')
    }
  }
  function pad (val) {
    const valString = val + ''
    if (valString.length < 2) { // if we have one number value  of minutes or seconds
      return '0' + valString
    } else { // two number value
      return valString
    }
  }

  fallTimer = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height, 'white')
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.stroke()
    if (newCircle % objects.time == 0) {
      const xPos = getRandomIntInclusive(31, 569)// draws x position of canvas to drop the ball off
      objects.centers.push([xPos, 0])
      objects.sizes.push(30)// decides the size of balls
      let color = getRandomIntInclusive(0, 1)
      switch (color) {
        case 0:
          color = colors.correctChoice
          break
        case 1:
          color = colors.wrongChoice
          break
      }
      objects.colors.push(color)
      objects.stepSize.push(3)// stepsize decides the pace of falling down of objects
      objects.number.push(1)
    }
    newCircle++
    objects.moveDown()
  }, 40) // we draw our canvas every 40 miliseconds
}
// gets us a randomly drawn number between the two sepcified in the function
function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// changes colors written in rgb to hex notification
function rgbToHex (r, g, b) {
  if (r > 255 || g > 255 || b > 255) { throw 'Invalid color component' }
  return ((r << 16) | (g << 8) | b).toString(16)
}

function getMousePosition (canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  console.log('Coordinate x: ' + x, 'Coordinate y: ' + y)
}

canvas.onclick = clickCirlce
function clickCirlce (e) {
  console.log('passes')
  const pixel = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data // get the information about the pixel we clicked on
  const colorhex = '#' + ('000000' + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6)// converts the data of pixel into hex notification of color
  console.log('colorhex', colorhex)
  const scoreLabel = document.getElementById('scoreLabel')
  if (hasSameColor(colorhex, colors.correctChoice)) {
    ++score
    scoreLabel.innerHTML = score
    console.log('score', score)
  }
  getMousePosition(canvas, e)// gets the coordinates of the mouse in canvas upon click
}

window.onload = () => {
  const body = document.getElementById('body')
  const startButton = document.createElement('button')
  startButton.id = 'startButton'
  startButton.className = 'glow-on-hover button-center'
  startButton.innerHTML = 'Start'
  startButton.onclick = () => CreateLayout(startButton, body)
  body.appendChild(startButton)
}
// might need to change to pixi.js clicking on elements will be easier
// but since i already so far with this i will try to finish this without it, then i will redo it to learn pixi
