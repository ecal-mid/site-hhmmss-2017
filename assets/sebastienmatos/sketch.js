var gears = [];
var freeGears = [];
var maxIntersections = 1;

var diagonalScreenRadius; //get the size of the screen to spawn gears outside
var randomPosition = 1; //position to spawn

var sizeGear = 30,
  teeth = 15,
  heightTeeth = 5;

var c = 0;
var speedGear = 0;

var timerS = true;
var timer10s = true;

var oldTimeM;
var timerM = false;

var oldTimeH;
var timerH = false;

var timelapse = 5;

var cam;
var easeIn = 0;

var bigBelt = false;
var screw = true;

var middleX = 0,
  middleY = 0;

var Scale = 1;
var currentScale = 1;

var explosion = false;


var corner=0;

function setup() {

  //pixelDensity(1);

  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  diagonalScreenRadius = sqrt(sq(width) + sq(height)) / 2; //set the diagonal

  gears.push(new Gear(0, 0, 2, 0, "motor"));

  fill(255);
  noStroke();

  cam = createVector(width / 2, height / 2);

  oldTimeH = hhmmss.getH();
  
  oldTimeM = hhmmss.getM(); 

}

function draw() {
  var pos = createVector(-(gears[gears.length - 1].x - width / 2), -(gears[gears.length - 1].y - height / 2));
  if (timerH) pos.set(width / 2 - middleX, height / 2 - middleY);

  if (hhmmss.getH() !== oldTimeH) {
    timerH = true;

    setTimeout(function() {
      explosion = true;
      for (var i of gears) {
        i.explodex = i.x + (i.x / abs(i.x)) * (width / Scale) * 2;
        i.explodey = i.y + (i.y / abs(i.y)) * (height / Scale) * 2;
      }
      gears[0].explodex = gears[0].x + (width / Scale) * 2;
      gears[0].explodey = gears[0].y + (height / Scale) * 2;
    }, 5000);

    setTimeout(function() {
      gears = [];
      freeGears = [];
      gears.push(new Gear(0, 0, 2, 0, "motor"));
      screw = true;

      explosion = false;
      timerH = false;
    }, 10000);
  }

  if (explosion) {
    for (var i of gears) {
      i.explode();
      pos.set(width / 2, height / 2);
    }
  }


  oldTimeH = hhmmss.getH();

  if (timerH && !explosion) {
    fov();

  } else if (!explosion) {
    Scale = 1;
  }

  if (gears.length > 1) {
    easeIn = lerp(easeIn, 0.03, 0.005);
    easeIn = constrain(easeIn, 0, 0.03);
    cam = p5.Vector.lerp(cam, pos, easeIn);
  }

  if (hhmmss.getM() !== oldTimeM) {
    timerM = true;
    setTimeout(function() {
      timerM = false;
    }, 5000);
  }

  if (timerM || timerH) {
    speedGear += 2;
  }

  oldTimeM = hhmmss.getM();

  push();

  background(0);


  translate(width / 2, height / 2);
  currentScale = lerp(currentScale, Scale, 0.1);
  scale(currentScale);
  translate(-width / 2, -height / 2);

  translate(cam.x, cam.y);

  for (var gear of gears) {
    if (!timerH) gear.move();
    gear.display();
    gear.col -= 0.02;
  }

  if (hhmmss.getS() % 1 === 0 && timerS && !timerM) {
    speedGear += 2;
    timerS = false;
    setTimeout(function() {
      timerS = true;
    }, 1000);
  }

  if (hhmmss.getS() % timelapse === 0 && timer10s && !timerH) {
    spawn();
    timer10s = false;
    setTimeout(function() {
      timer10s = true;
    }, 1000);
  }

}

function mousePressed() {
  spawn();
}

function fov() {
  var biggestX = Math.max.apply(Math, gears.map(function(o) {
    return o.x;
  }))
  var smallestX = Math.min.apply(Math, gears.map(function(o) {
    return o.x;
  }))

  var biggestY = Math.max.apply(Math, gears.map(function(o) {
    return o.y;
  }))
  var smallestY = Math.min.apply(Math, gears.map(function(o) {
    return o.y;
  }))

  var bigWidth = dist(biggestX, 0, smallestX, 0);
  var bigHeight = dist(0, biggestY, 0, smallestY);

  var biggest = bigWidth > bigHeight ? bigWidth : bigHeight;

  var canvas = biggest == bigWidth ? width : height;

  Scale = canvas / (biggest + 300);

  middleX = biggestX - bigWidth / 2;
  middleY = biggestY - bigHeight / 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  diagonalScreenRadius = sqrt(sq(width) + sq(height)) / 2; //reset the diagonal
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  diagonalScreenRadius = sqrt(sq(width) + sq(height)) / 2; //reset the diagonal
}