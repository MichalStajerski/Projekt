var canvas = document.getElementById( "myCanvas" );
var context = canvas.getContext( "2d" );
var width = 900;
var height = 600;
let counter = 0
let lastColor = 0
let timeCounter = 0

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
console.log('colorsLength',colors.length)

var ball = {
    x: 100,
    y: 100,
    radius: 25,
    xSpeed: 2,
    ySpeed: 2,
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

var timer = setInterval(() => {
    let time = document.getElementById('timer')
    time.innerHTML= timeCounter
    timeCounter+=1
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
        counter++
    }
    
    // left
    if ( ball.x - ball.radius <= 0 ) {
    	ball.x = ball.radius;
        ball.xSpeed = -ball.xSpeed;
        lastColor = Math.floor(Math.random()*colors.length)
        draw( context,colors[lastColor],ball.x,ball.y,ball.radius);
        counter++
    }
    
    // down
    if ( ball.y + ball.radius >= height ) {
    	ball.y = height - ball.radius;
        ball.ySpeed = -ball.ySpeed;
        lastColor = Math.floor(Math.random()*colors.length)
        draw( context,colors[lastColor],ball.x,ball.y,ball.radius);
        counter++
    }
    
    // up
    if ( ball.y - ball.radius <= 0 ) {
    	ball.y = ball.radius;
        ball.ySpeed = -ball.ySpeed;
        lastColor = Math.floor(Math.random()*colors.length)
        draw( context,colors[lastColor],ball.x,ball.y,ball.radius);
        counter++
    }
    console.log('counter=> ',counter)
    draw( context,colors[lastColor],ball.x,ball.y,ball.radius);
    if(timeCounter>=5){
        clearInterval(action)
        clearInterval(timer)
    }
}
