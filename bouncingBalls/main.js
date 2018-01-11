// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

//var pAvailableBalls = document.createElement('p');
//pAvailable.textContent = '25';
//body.appendChild(pAvailable);



// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// Shape constructor
function Shape(x, y, velX, velY, exists) {
  this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.exists = exists;
}

// Ball constructor is inherited from Shape constructor
function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);
	
	this.color = color;
	this.size = size;
}

// draw ball method in Ball protoype property
Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.fill();
}

// update location of each ball method in Ball prototype property
Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }
  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

// check collision method in Ball prototype property
Ball.prototype.checkCollision = function() {
  var distance;
  for(var i=0; i<balls.length; i++) {
    if(balls[i] === this) {
      continue;
    } else {
      var dx = this.x - balls[i].x;
      var dy = this.y - balls[i].y;
      distance = Math.sqrt(dx*dx + dy*dy);
      if(distance <= (this.size + balls[i].size)) {
			  this.velX = -(this.velX);
				this.velY = -(this.velY);
				balls[i].velX = -(balls[i].velX);
				balls[i].velY = -(balls[i].velY);
				this.x += this.velX;
				this.y += this.velY;
				balls[i].x += balls[i].velX;
				balls[i].y += balls[i].velY;
        this.color = balls[i].color = 'rgb(' + random(0,255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
      }
    }
  }
}

function EvilCircle(x, y, velX, velY, exists, size, color) {
  Shape.call(this, x, y, velX, velY, exists);
	
	this.color = color;
	this.size = size;
}

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
	ctx.strokeStyle = 'white';
	ctx.stroke();
}

EvilCircle.prototype.catchDetect = function(ball) {
	
	var dx = ball.x - this.x;
	var dy = ball.y - this.y;
	var distance = Math.sqrt(dx*dx + dy*dy);
  if(distance <= (ball.size + this.size)) {
	  ball.exists = 'false';
	}
}

var balls = [];
var numberOfBalls = 25;
function loop() {

	var existsNumber = 25;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  while(balls.length < 25) {
    var ball = new Ball(random(0, width),
                random(0, height),
                random(1, 7), random(1, 7),
								'true',
                'rgb(' + random(0,255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
                random(10, 20));
    balls.push(ball);
  }
	var evilOne = new EvilCircle(90,
                90,
                0, 0,
								'true',
								10,
								'white');
								
	evilOne.draw();

	
  for(var i = 0; i < balls.length; i++) {
		if(balls[i].exists === 'true'){
			balls[i].draw();
		}   
    balls[i].update();
    balls[i].checkCollision();
		evilOne.catchDetect(balls[i]);
		if(balls[i].exists === 'false') {
		  existsNumber--;
			if(existsNumber == 0) {
			  alert("Refresh to restart game!");
			}
		}
  }

  requestAnimationFrame(loop);

}

loop();
