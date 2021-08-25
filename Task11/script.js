const canvas = document.createElement('canvas')
canvas.width = 600
canvas.height = 600
canvas.id = 'canvas'
canvas.className = 'canvas'
canvas.style.border = '5px solid #000000'
const ctx = canvas.getContext('2d')

const colorCombos = '0123456789ABCDEF'
let fallTimer
let newCircle = 0
var objects = {
  number: 0,
  centers: [], // array of locations
  sizes: [], // how big each circle is
  colors: [],
  time: 15,
  stepSize: [],
  moveDown: function () {
    const removals = []
    for (let i = 0; i < objects.number; i++) {
      objects.centers[i][1] = objects.centers[i][1] + objects.stepSize[i]
      if (objects.centers[i][0] > 600) {
        removals.push(i)
      }
    }
    for (j = 0; j < removals.length; j++) {
      objects.centers.splice(removals[j], 1)
      objects.sizes.splice(removals[j], 1)
      objects.color.splice(removals[j], 1)
      objects.stepSize.splice(removals[j], 1)
      objects.number = objects.number - 1
    }
    objects.drawCircles()
  },
  drawCircles: function () {
    for (i = 0; i < objects.number; i++) {
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
  body.append(counter, canvas)
  let totalSeconds = 0
  setInterval(setTime, 1000)// we refresh it every sedond because that is the minimum value by which timer is supposed to change

  function setTime () {
    ++totalSeconds
    secondsLabel.innerHTML = pad(totalSeconds % 60)// modulo for seconds
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60)) + ':'
    // console.log('minuteslabel',minutesLabel.innerHTML)
    // if(minutesLabel.innerHTML === '01:'){
    //   alert('Game Over!')
    // }
  }
  function pad (val) {
    const valString = val + ''
    if (valString.length < 2) { // if we have one number value or two number value
      return '0' + valString
    } else {
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
      objects.sizes.push(30)// decides thr size of balls
      let myColor = '#'
      for (let i  = 0; i < 6; i++) {
        myColor = myColor + colorCombos[Math.floor(Math.random(0, 1) * 16)]
      }
      objects.colors.push(myColor)
      objects.stepSize.push(3)// stepsize decides the pace of falling down of objects
      objects.number++
    }
    newCircle++
    objects.moveDown()
  }, 40)
}

function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  console.log("Coordinate x: " + x, 
              "Coordinate y: " + y);
}

canvas.addEventListener("mousedown", function(e)
{
  // getMousePosition(canvas, e)
  ctx.clearRect(0,0, canvas.width, canvas.height)
});

// document.onclick = clickCirlce()

function clickCirlce(e){
  console.log('passes')
  ctx.clearRect(0,0, canvas.width, canvas.height)
  objects.number--
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