var Starry = [];
var speed = 10;

var lastSecond;
var second;
var minute;
var hour;

var strokeW = 1 ;

function setup() {
  createCanvas(windowWidth,windowHeight);
  lastSecond = second();

  for (var i = 0; i < 60; i++) {
    Starry.push(new points());

    background(0);
  }
}

function draw() {
fill(54,0,62,3);
rect(0, 0, windowWidth, windowHeight);

  for (var i = 0; i < Starry.length; i++) {
    for (var j = 0; j < Starry.length; j++) {
      if(i != j && dist(Starry[i].x, Starry[i].y, Starry[j].x, Starry[j].y) < map(second(), 0, 60, 200, 5)) {

        stroke(125, 125+sin(radians(90+i+frameCount))*125, 125+sin(radians(frameCount))*125);

        strokeWeight(strokeW);
        line(Starry[i].x, Starry[i].y, Starry[j].x, Starry[j].y);

      //  map(); --> transparence

    }
  }
    // Starry[i].drawr(255);
    Starry[i].bouger(1);
  }

  if(lastSecond != second()) {
    Starry.push(new points());
    stroke(255);

    if(second() == 59) {
      Starry = [];
      for (var i = 0; i < 60; i++) {
        Starry.push(new points());
        background(0);


        console.log(minute());

      }

    }

    //fill(0,0,50, 100);
    //rect(-1, -1, width + 2, height + 2);

    lastSecond = second();
  }
}

function points(){

  this.size = 0;
  this.x = random(width);
  this.y = random(height);
  this.speedX = random(-1, 1);
  this.speedY = random(-.1, .1);
  this.path_lengthX = random(10,4000);
  this.path_lengthY = random(10,4000);
  this.t = random(2*PI);
  this.dt = radians(random(0.1, 2));
  }

points.prototype.drawr = function(opacite) {

  fill(random(0,255));
  strokeWeight(5);
  ellipse(this.x, this.y, this.size, this.size);

  ellipse(this.x, this.y, this.size, this.size);
}

points.prototype.bouger = function(speed) {
    this.x = this.x + (this.speedX * speed) * cos(millis()%20000 / this.path_lengthX );
    this.y = this.y + (this.speedY * speed) * sin(millis()%20000 / this.path_lengthY );
    // console.log(this.x);
}
