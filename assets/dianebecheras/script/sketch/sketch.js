var balls = [];
var image1;
// parametres
var sizeRandomPoints = 200;
var svgH = hhmmss.getH();
var svgM = hhmmss.getM();
var svgS = hhmmss.getS();

function preload() {
}

function setup() {
  createCanvas(myW, myH, WEBGL);
  //myFace = new Face(0, 0, true);
  //img = loadImage("pattern/pattern_jourx025.jpg");
  //ortho(-width, width, -height, height, -10, 500);
  hChanged();
}

function draw() {
  checkChange();
  background(0);
  push();
  translate(-width / 2, -height / 2);
  for (var i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].draw();
  }
  pop();
  /*
  noTexture();
  stroke(0, 255, 0);
  strokeWeight(5);
  quad(0, 0,
    myW, 0,
    myW, myH,
    0, myH);*/

/*if(frameCount % 120 == 0 ) {
  balls[balls.length - 1].addFace();
}*/
/*if(frameCount % 240 == 0 ) {
  balls.push(new Ball(-300, -300));
}*/
}

function checkChange() {
  var h = hhmmss.getH();
  var m = hhmmss.getM();
  var s = hhmmss.getS();

  if (h != svgH) {
    svgH = h;
    hChanged();
  }
  if (m != svgM) {
    svgM = m;
    mChanged();
  }
  if (s != svgS) {
    svgS = s;
    sChanged();
  }
}
function hChanged() {
  console.log("HOUR !!!");
  if (balls.length != 0)
    balls[balls.length - 1].diminue = true;
  balls.push(new Ball(random(width / 4, 3 * width / 4), random(height / 4, 3 * height / 4)));
}
function mChanged() {
  //console.log("MIN !!!");
  if (balls.length > 0) {
    balls[balls.length - 1].addFace();
  }
}
function sChanged() {
  /*console.log("SEC !!!");*/
}
