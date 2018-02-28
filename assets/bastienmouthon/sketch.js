var yoff = 0.5; // 2nd dimension of perlin noise
var m1;
var m2;
var m3;
var mountains = new Array();

var myBg = new colorManager();

var th;
var tm;
var ts;
/*
myBg.hourStep(1);

myBg.secondStep();

background(myBg.myColor);

myBg.setColorByTime(20, 40, 12);
*/
var oldS = -1;
var oldM = -1;
var oldH = -1;

function setup() {
  createCanvas(displayWidth, displayHeight);

  m1 = new Mountain();
  m2 = new Mountain();
  m3 = new Mountain();

  //   for (var i = 0; i < 3; i++) {
  // mountains.push(new Mountain());
  // }
}

function draw() {
  th = hhmmss.getH();
  tm = hhmmss.getM();
  ts = hhmmss.getS();
  checkTime();

  // if(th == 23) {
  //   var = 0
  // } else {
  //   var = th + 1;
  // }

  var r = lerp(myBg.hourColors[th][0], myBg.hourColors[th == 23 ? 0 : th + 1][0], (tm * 60 + ts) / 3600);
  var g = lerp(myBg.hourColors[th][1], myBg.hourColors[th == 23 ? 0 : th + 1][1], (tm * 60 + ts) / 3600);
  var b = lerp(myBg.hourColors[th][2], myBg.hourColors[th == 23 ? 0 : th + 1][2], (tm * 60 + ts) / 3600);

  colorBackground = color(r, g, b);
  background(colorBackground);

var r1 = lerp(myBg.mountColors[th][0], myBg.mountColors[th == 23 ? 0 : th + 1][0], (tm * 60 + ts) / 3600);
var g1 = lerp(myBg.mountColors[th][1], myBg.mountColors[th == 23 ? 0 : th + 1][1], (tm * 60 + ts) / 3600);
var b1 = lerp(myBg.mountColors[th][2], myBg.mountColors[th == 23 ? 0 : th + 1][2], (tm * 60 + ts) / 3600);


  colorshape = color(r1,g1,b1, 130);
  fill(colorshape);
  noStroke();


  var accident1 = lerp(myBg.mountColors[th][0], myBg.mountColors[th == 23 ? 0 : th + 1][0], (tm * 60 + ts) /360);

m1.accident = accident1*0.00005;
m2.accident = accident1*0.00005;
m3.accident = accident1*0.00005;




var positionmount1 = lerp(myBg.mountPosition1[th][0], myBg.mountPosition1[th == 23 ? 0 : th + 1][0], (tm * 60 + ts) /3600);
var positionmount2 = lerp(myBg.mountPosition2[th][0], myBg.mountPosition2[th == 23 ? 0 : th + 1][0], (tm * 60 + ts) /3600);
var positionmount3 = lerp(myBg.mountPosition3[th][0], myBg.mountPosition3[th == 23 ? 0 : th + 1][0], (tm * 60 + ts) /3600);


m1.r = 200*positionmount1
m2.r = 150*positionmount2
m3.r = 250*positionmount3




  for (var i = 0; i < mountains.length; i++) {
    mountains[i].draw();
  }
  m1.draw();
  m2.draw();
  m3.draw();
  //
  //
}
function checkTime() {
  if(th != oldH) {
    oldH = th;
    hourChanged();
  }
  if(tm != oldM) {
    oldM = tm;
    minuteChanged();
  }
  if(ts != oldS) {
    oldS = ts;
    secondChanged();
  }
}

function hourChanged() {

  //console.log("HOUR CHANGED !!!");
}
function minuteChanged() {


  m1.speed = random(-115,115);
  m3.speed = random(-110,110);
  m2.speed = random(-11,11);


   console.log("MIN CHANGED !!!");

}
function secondChanged() {
  // console.log("SEC CHANGED !!!");


m1.speed = random(-5,5);
m3.speed = random(-10,10);
m2.speed = random(-1,1);

}
