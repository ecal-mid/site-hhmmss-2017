var Starry = [];
var speed = 10;
var lastSecond;
var second;
var minute;
var lastHour;
var hour;
var offsetMillis;

var strokeW = 1 ;
var colors;

var backgroundC;

function setup() {

  createCanvas(windowWidth,windowHeight);
  lastSecond = hhmmss.getS();
  lastHour = hhmmss.getH();

  colors = [
    color(0,31,76,3),
    color(59,52,0,3),
    color(0,40,0,3),
    color(50,0,0,3),
    color(34,23,81,3),
    color(39,0,105,3)
  ];

  var index = floor(random(colors.length));

  backgroundC = colors[index];

  background(backgroundC.rgba[0], backgroundC.rgba[1], backgroundC.rgba[2], 255);

  for (var i = 0; i < 60; i++) {
    Starry.push(new points());

    //background(0);
  }
}

function draw() {
  // background(backgroundC);
  fill(backgroundC.rgba[0], backgroundC.rgba[1], backgroundC.rgba[2], hhmmss.getS() == 59 ? 40 : backgroundC.rgba[3]);
  rect(0, 0, windowWidth, windowHeight);

  for (var i = 0; i < Starry.length; i++) {
    for (var j = 0; j < Starry.length; j++) {
      if(i != j && dist(Starry[i].x, Starry[i].y, Starry[j].x, Starry[j].y) < map(hhmmss.getS(), 0, 60, 200, 5)) {

        stroke(125, 125+sin(radians(90+i+frameCount))*125, 125+sin(radians(frameCount))*125);

        strokeWeight(strokeW);
        line(Starry[i].x, Starry[i].y, Starry[j].x, Starry[j].y);

      //  map(); --> transparence

      }
    }
    Starry[i].bouger(1);
  }

  if(lastSecond != hhmmss.getS()) {
    offset = hhmmss.getMillis();

    Starry.push(new points());
    stroke(255);

    if(hhmmss.getS() == 59) {
      Starry = [];
      for (var i = 0; i < 60; i++) {
        Starry.push(new points());

        //console.log(minute());
      }
    }

    //fill(0,0,50, 100);
    //rect(-1, -1, width + 2, height + 2);

    lastSecond = hhmmss.getS();
  }

  if(lastHour != hhmmss.getH()) {
    var index = floor(random(colors.length));

    backgroundC = colors[index];

    lastHour = hhmmss.getH();
  }

  if(hhmmss.getS() >= 58) {
    // background(backgroundC.rgba[0], backgroundC.rgba[1], backgroundC.rgba[2], 255);
    noStroke();
    fill(backgroundC.rgba[0], backgroundC.rgba[1], backgroundC.rgba[2], map(hhmmss.getS() + (hhmmss.getMillis() - offset) / 1000, 58, 60, 0, 255));
    rect(0, 0, width, height);
  }
}

function points(){

  this.size = 0;
  this.x = random(width);
  this.y = random(height);
  this.speedX = random(-1, 1);
  this.speedY = random(-.15, .15);
  this.path_lengthX = random(1000,4000);
  this.path_lengthY = random(1000,4000);
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
