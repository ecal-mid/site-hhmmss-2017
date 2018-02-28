var Starry = [];
var speed = 10;
var lastSecond;
var rad, x, y;

function setup() {

  createCanvas(windowWidth,windowHeight);
  lastSecond = second();

  smooth();

  for (var i = 0; i < 50; i++) {
    Starry.push(new points());
  //background(0);

  }
}

function draw() {
  //fill(0, 7);
  //rect(0, 0, width, height);
  background(0);
  for (var j=0;j<= 8; j++) {
    fill(255);
    //noStroke();
    //ellipse(random(windowWidth), random(windowHeight), random(1, 4), random(1, 4));
  }

  for (var i = 0; i < Starry.length; i++) {
    for (var j = 0; j < Starry.length; j++) {
      if(i != j && dist(Starry[i].x, Starry[i].y, Starry[j].x, Starry[j].y) < 200) {

        stroke(125, 125+sin(radians(90+i+frameCount))*125, 125+sin(radians(frameCount))*125);
        line(Starry[i].x, Starry[i].y, Starry[j].x, Starry[j].y);

    }
  }
    Starry[i].drawr(255);
    Starry[i].bouger(1);
  }

  if(lastSecond < second()) {
    Starry.push(new points());

    if(second() == 59) {
      Starry[i];
    //line(starryi.x, starryi.y, starryj.x, starryj.y);

    if(minute() == 60){
    backgroud(random(255), random(255), random(255));

    }
  }
}

      lastSecond = second();

}

function points(){

  this.size = random(2, 8);
  this.x = random(width);
  this.y = random(height);
  this.speedX = random(-5, 5);
  this.speedY = random(-3, 3);
  this.path_lengthX = random(100,4000);
  this.path_lengthY = random(100,4000);
  this.t = random(2*PI);
  this.dt = radians(random(0.1, 2));
  this.rad = random(0.5, 3);
  }

points.prototype.drawr = function(opacite) {

  fill(255*sin(this.t));
  noStroke();
  ellipse(this.x, this.y, this.size, this.size);
  fill(255);
  ellipse(this.x, this.y, this.size, this.size);
}

points.prototype.bouger = function(speed) {
    this.x = this.x + (this.speedX * speed) * cos(millis()%20000 / this.path_lengthX );
    this.y = this.y + (this.speedY * speed) * sin(millis()%20000 / this.path_lengthY );
    // console.log(this.x);
}
