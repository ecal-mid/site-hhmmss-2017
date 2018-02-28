var minuteArray = [];
var nowTester;

//settings
var defaultHeight = 20;
var speeds = [1, 2, 3, 4];

// color definitions
var rowColors = [];
var backgroundColor;
var bgColors = [];

//image creating ressources
var orders = ["EAT", "SLEEP", "JUMP", "PARTY", "WORK", "GET", "DRINK", "WAKE", "READ", "LIVE", "DIE"];
var adverbs = ["SLOW", "FAST", "ALOT", "HIGH", "LOW", "YOUNG", "OLD", "HARD"];
var markers = ["WAIT", "HOUR", "DAY", "NIGHT", "AND"];
var margin = 10;
var ordersImg = [];
var adverbsImg = [];
var markersImg = [];
var font;


//current variables
var current =  [false, false, false, false, false, false];
var currentImage;
var currentIndex = 0;

function preload() {
  font = loadFont("./SixCaps.ttf");
}

function setup() {
  // uncomment this line to make the canvas the full size of the window
  var myCanvas = createCanvas(windowHeight*9/16, windowHeight);
  //var myCanvas = createCanvas(1080, 1920);
  myCanvas.parent("canvasDiv");
  frameRate(60);
  noStroke();

  defaultHeight = height/60;

  for(i = 0; i < 60; i++) {
    minuteArray[i] = new SecondsRow(i);
  }
  //------------------------------
  //image setup
  for(j = 0; j < orders.length; j++) {
    var temp = createGraphics(width*3, height, P2D);
    temp.fill(0).stroke(0);
    temp.textSize(temp.height*0.9);
    temp.textFont('Six Caps');
    temp.textAlign(CENTER);
    temp.text(orders[j], temp.width/2, temp.height*0.905);
    temp.stroke(0).noFill();
    temp.rect(0, 0, temp.width, temp.height);
    ordersImg[j] = createGraphics(height/2, height);
    copy(temp, temp.width*0.2, temp.height/7.4, temp.width*0.6, temp.height/1.27, 0, 0, ordersImg[j].width, ordersImg[j].height);
  }
  for(j = 0; j < adverbs.length; j++) {
    var temp = createGraphics(width*3, height, P2D);
    temp.fill(0).stroke(0);
    temp.textSize(temp.height*0.9);
    temp.textFont('Six Caps');
    temp.textAlign(CENTER);
    temp.text(adverbs[j], temp.width/2, temp.height*0.905);
    temp.stroke(0).noFill();
    temp.rect(0, 0, temp.width, temp.height);
    adverbsImg[j] = createGraphics(height/2, height);
    copy(temp, temp.width*0.2, temp.height/7.4, temp.width*0.6, temp.height/1.27, 0, 0, adverbsImg[j].width, adverbsImg[j].height);
  }
  for(j = 0; j < markers.length; j++) {
    var temp = createGraphics(width*3, height, P2D);
    temp.fill(0).stroke(0);
    temp.textSize(temp.height*0.9);
    temp.textFont('Six Caps');
    temp.textAlign(CENTER);
    temp.text(markers[j], temp.width/2, temp.height*0.905);
    temp.stroke(0).noFill();
    temp.rect(0, 0, temp.width, temp.height);
    markersImg[j] = createGraphics(height/2, height);
    copy(temp, temp.width*0.2, temp.height/7.4, temp.width*0.6, temp.height/1.27, 0, 0, markersImg[j].width, markersImg[j].height);
  }
  //-------------

  backgroundColor = "rgb(224, 5, 0)";

  rowColors[0] = "rgb(0, 0, 0)";
  rowColors[1] = backgroundColor;

  bgColors[0] = color(186, 3, 3);
  bgColors[1] = color(255, 247, 33);
  bgColors[2] = color(33, 195, 255);
  bgColors[3] = color(78, 255, 107);
  bgColors[4] = color(237, 122, 255);
  bgColors[5] = color(255, 165, 122);
  bgColors[6] = color(122, 249, 255);
  bgColors[7] = color(161, 170, 255);
  bgColors[8] = color(192, 255, 189);
  bgColors[9] = color(189, 255, 250);
  bgColors[10] = color(253, 237, 213);
  bgColors[11] = color(213, 225, 253);
  bgColors[11] = color(241, 253, 238);
  bgColors[12] = color(255, 255, 255);
}
function draw() {
  var nowTime = new Date();
  var now = (nowTime.getMinutes()%2)*60000 + nowTime.getSeconds()*1000 + nowTime.getMilliseconds();
  nowTester =  nowTime;
  hourPercentage = nowTime.getMinutes()*1000 + nowTime.getSeconds()*1000/60;
  //defining background color
  if(nowTime.getHours() < 12) {
    backgroundColor = lerpColor(bgColors[nowTime.getHours()], bgColors[nowTime.getHours() + 1], hourPercentage/60000);
  }
  else {
    backgroundColor = lerpColor(bgColors[24 - nowTime.getHours()], bgColors[24 - nowTime.getHours() - 1], hourPercentage/60000);
  }
  rowColors[1] = backgroundColor;
  background(backgroundColor);

  //drawing text on background
  drawBackground((nowTime.getHours() * 60 + nowTime.getMinutes()) * 60 + nowTime.getSeconds() + nowTime.getMilliseconds()/1000);

  //drawing lines
  push();
  translate(0, ((now)%60000-60000)*defaultHeight/1000);
  for(i = 0; i < 60; i++) {
    minuteArray[i].printRow();
  }
  pop();
  push();
  translate(0, ((now)%60000)*defaultHeight/1000);
  for(i = 0; i < 60; i++) {
    minuteArray[i].printRow();
    minuteArray[i].updateRow(nowTime.getSeconds() + nowTime.getMilliseconds()/1000);
  }
  pop();
}
function SecondsRow(_nn) {
  if(random(0, 1) > 0.5)
    this.speed = speeds[floor(random(0, speeds.length))];
  else
    this.speed = -speeds[floor(random(0, speeds.length))];
  this.xstart = 0;
  this.nn = _nn;
}
SecondsRow.prototype.printRow = function() {
  this.y = this.nn * defaultHeight;
  fill(rowColors[this.nn%2]);
  rect(this.xstart%(2*width)+ width, this.y, width, defaultHeight);
  rect(this.xstart%(2*width)-(2*width) + width, this.y, width, defaultHeight);
  rect(this.xstart%(2*width)+(2*width) + width, this.y, width, defaultHeight);
}
SecondsRow.prototype.updateRow = function(_ss) {
  newss = _ss%10;
  if(newss < 5) {
    this.xstart = -(2*width*this.speed-width)/2 * (Math.cos(Math.PI*newss/5) - 1);
  }
  else {
    this.xstart = -(2*width*this.speed+width)/2 * (Math.cos(Math.PI*(newss-5)/5) - 1) + (2*width*this.speed-width);
  }
}
function drawBackground(_nn) {
  var realTime = (_nn+5)%60;
  if(realTime < 10) {
    if (current[0]) {
      currentImage = markersImg[currentIndex];
    }
    else {
      if(floor(_nn/60)%60 == 59 || floor(_nn/60)%60 == 0) {
        if(floor(_nn/3600) == 23 || floor(_nn/3600) == 0) {
          currentIndex = 3;
        }
        else if(floor(_nn/3600) == 11 || floor(_nn/3600) == 12) {
          currentIndex = 2;
        }
        else {
          currentIndex = 1;
        }
      }
      else {
        currentIndex = 0;
      }
      current[0] = true;
      current[5] = false;
      currentImage = markersImg[currentIndex];
    }

  }
  else if(realTime < 20) {
    if (current[1]) {
      currentImage = ordersImg[currentIndex];
    }
    else {
      currentIndex = floor(random(0, ordersImg.length));
      currentImage = ordersImg[currentIndex];
      current[1] = true;
      current[0] = false;
    }
  }
  else if(realTime < 30) {
    if (current[2]) {
      currentImage = adverbsImg[currentIndex];
    }
    else {
      currentIndex = floor(random(0, adverbsImg.length));
      currentImage = adverbsImg[currentIndex];
      current[2] = true;
      current[1] = false;
    }
  }
  else if(realTime < 40) {
    currentImage = markersImg[4];
  }
  else if(realTime < 50) {
    if (current[4]) {
      currentImage = ordersImg[currentIndex];
    }
    else {
      currentIndex = floor(random(0, ordersImg.length));
      currentImage = ordersImg[currentIndex];
      current[4] = true;
      current[2] = false;
    }
  }
  else if(realTime < 60) {
    if (current[5]) {
      currentImage = adverbsImg[currentIndex];
    }
    else {
      currentIndex = floor(random(0, adverbsImg.length));
      currentImage = adverbsImg[currentIndex];
      current[5] = true;
      current[4] = false;
    }
  }
  image(currentImage, 20, 20, width-40, height-40);

}
