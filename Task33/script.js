var canvas = document.getElementById( "myCanvas" );
var context = canvas.getContext( "2d" );
var width = 900;
var height = 600;
let counterOfHits = 0
let lastColor
let timeCounter = 0
context.strokeRect( 0, 0, width, height );


// const colors = {
//     color: 'blue',
//     color: 'red',
//     color: 'green',
//     color: 'pink',
//     color: 'yellow',
//     color: 'brown',
//     color: 'orange',
//     color: 'gray'
// }
const colors = ['black','blue','red','green','pink','yellow','brown','orange','gray']

var ball = {
    x: randomIntFromInterval(25,875),
    y: randomIntFromInterval(25,575),
    radius: 25,
    xSpeed: 0,
    ySpeed: 0,
}
function draw( ctx,color,x,y,radius ) {
    ctx.beginPath();
    ctx.arc( x, y, radius, 0, 2*Math.PI );
    ctx.fillStyle = color;
    ctx.fill();
}
function move(ball) {
    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;
}
function start(chosenSpeed,test){
    ball.xSpeed =chosenSpeed
    ball.ySpeed =test

    var timer = setInterval(() => {
        let time = document.getElementById('timer')
        time.innerHTML = 'Timer: '+ timeCounter
        timeCounter++
        
    }, 1000);
      
    var action = setInterval(() => {
        doAction()
    }, 10);
    
    function doAction(){
        context.clearRect( 0, 0, width, height );
        context.strokeRect( 0, 0, width, height );
        
        move(ball);
        
        // right 
        if ( ball.x + ball.radius >= width ) {
            ball.x = width - ball.radius;
            ball.xSpeed = -ball.xSpeed;
            lastColor = Math.floor(Math.random()*colors.length)
            draw( context,colors[lastColor],ball.x,ball.y,ball.radius);
            counterOfHits++
        }
        
        // left
        if ( ball.x - ball.radius <= 0 ) {
            ball.x = ball.radius;
            ball.xSpeed = -ball.xSpeed;
            lastColor = Math.floor(Math.random()*colors.length)
            draw( context,colors[lastColor],ball.x,ball.y,ball.radius);
            counterOfHits++
        }
        
        // up
        if ( ball.y + ball.radius >= height ) {
            ball.y = height - ball.radius;
            ball.ySpeed = -ball.ySpeed;
            lastColor = Math.floor(Math.random()*colors.length)
            draw( context,colors[lastColor],ball.x,ball.y,ball.radius);
            counterOfHits++
        }
        
        // down
        if ( ball.y - ball.radius <= 0 ) {
            ball.y = ball.radius;
            ball.ySpeed = -ball.ySpeed;
            lastColor = Math.floor(Math.random()*colors.length)
            draw( context,colors[lastColor],ball.x,ball.y,ball.radius);
            counterOfHits++
        }
        console.log('counterOfHits=> ',counterOfHits)
        draw( context,colors[lastColor],ball.x,ball.y,ball.radius);
        if(timeCounter>10){
            clearInterval(action)
            clearInterval(timer)
        }
    }
}

function submitAnswer(){
    const asnwer = parseInt(document.getElementById('submittedAnswer').value)
    if(asnwer===counterOfHits){
        alert('Victory')
    }else alert('Wrong Answer')
}

function setPace(id){
    document.getElementById('Slow').disabled = 'true'
    document.getElementById('Medium').disabled = 'true'
    document.getElementById('Fast').disabled = 'true'
    switch(id){
        case 'Slow':
            start(3,randomIntFromInterval(1,3))
        break;
        case 'Medium':
            start(8,randomIntFromInterval(4,8))
        break;
        case 'Fast':
            start(13,randomIntFromInterval(8,13))
        break;
    }
}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
