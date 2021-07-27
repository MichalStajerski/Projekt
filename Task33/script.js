const canvas = document.getElementById('myCanvas')
const context = canvas.getContext('2d')
const width = 900
const height = 600
let counterOfHits = 0
let lastColor
let timeCounter = 0
context.strokeRect(0, 0, width, height)
const drawDirection = (num1, num2) => (num2 == 0) ? num1 : -num1
const colors = ['black', 'blue', 'red', 'green', 'pink', 'yellow', 'brown', 'orange', 'gray']

const ball = {
  // draws random position of our ball within boundaries
  x: randomIntFromInterval(25, 875),
  y: randomIntFromInterval(25, 575),
  radius: 25,
  xSpeed: 0,
  ySpeed: 0
}
function draw (ctx, color, x, y, radius) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.fillStyle = color
  ctx.fill()
}
function move (ball) {
  ball.x += ball.xSpeed
  ball.y += ball.ySpeed
}
function start (chosenSpeed) {
  ball.xSpeed = chosenSpeed
  ball.ySpeed = chosenSpeed

  const timer = setInterval(() => {
    const time = document.getElementById('timer')
    time.innerHTML = 'Timer: ' + timeCounter
    timeCounter++
  }, 1000)

  const action = setInterval(() => {
    doAction()
  }, 10)

  function doAction () {
    context.clearRect(0, 0, width, height)
    context.strokeRect(0, 0, width, height)

    move(ball)

    // right
    if (ball.x + ball.radius >= width) {
      ball.x = width - ball.radius
      ball.xSpeed = -ball.xSpeed
      lastColor = Math.floor(Math.random() * colors.length)
      draw(context, colors[lastColor], ball.x, ball.y, ball.radius)
      counterOfHits++
    }

    // left
    if (ball.x - ball.radius <= 0) {
      ball.x = ball.radius
      ball.xSpeed = -ball.xSpeed
      lastColor = Math.floor(Math.random() * colors.length)
      draw(context, colors[lastColor], ball.x, ball.y, ball.radius)
      counterOfHits++
    }

    // up
    if (ball.y + ball.radius >= height) {
      ball.y = height - ball.radius
      ball.ySpeed = -ball.ySpeed
      lastColor = Math.floor(Math.random() * colors.length)
      draw(context, colors[lastColor], ball.x, ball.y, ball.radius)
      counterOfHits++
    }

    // down
    if (ball.y - ball.radius <= 0) {
      ball.y = ball.radius
      ball.ySpeed = -ball.ySpeed
      lastColor = Math.floor(Math.random() * colors.length)
      draw(context, colors[lastColor], ball.x, ball.y, ball.radius)
      counterOfHits++
    }
    console.log('counterOfHits=> ', counterOfHits)
    draw(context, colors[lastColor], ball.x, ball.y, ball.radius)
    if (timeCounter > 10) {
      clearInterval(action)
      clearInterval(timer)
    }
  }
}

function submitAnswer () {
  const asnwer = parseInt(document.getElementById('submittedAnswer').value)
  if (asnwer === counterOfHits) {
    alert('Victory')
  } else alert('Wrong Answer')
}

function setPace (id) {
  document.getElementById('Slow').disabled = 'true'
  document.getElementById('Medium').disabled = 'true'
  document.getElementById('Fast').disabled = 'true'
  const direction = randomIntFromInterval(0, 1)

  switch (id) {
    case 'Slow':
      start(drawDirection(3, direction))
      break
    case 'Medium':
      start(drawDirection(6, direction))
      break
    case 'Fast':
      start(drawDirection(9, direction))
      break
  }
}

function randomIntFromInterval (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
