// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// draw ball
Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.fill();
}

// update location of each ball
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

var balls = [];
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  while(balls.length < 25) {
    var ball = new Ball(random(0, width),
                random(0, height),
                random(1, 7), random(1, 7),
                'rgb(' + random(0,255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
                random(10, 20));
    balls.push(ball);
  }

  for(var i = 0; i < balls.length; i++) {
	balls[i].checkCollision();
    balls[i].draw();
    balls[i].update();
    
  }

  requestAnimationFrame(loop);

}

loop();
