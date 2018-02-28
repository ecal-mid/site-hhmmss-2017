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
var adverbs = ["SLOW", "FAST", "ALOT", "HIGH", "LOW", "OLD", "HARD"];
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

//slower time for wait moments
var newTime = 3.5;

function preload() {
  //font = loadFont("./SixCaps.ttf");
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

  bgColors[0] = color(253, 247, 194);

  bgColors[1] = color(222, 157, 194);

  bgColors[2] = color(160, 199, 155);

  bgColors[3] = color(239, 202, 143);

  bgColors[4] = color(104, 150, 242);

  bgColors[5] = color(221, 152, 123);

  bgColors[6] = color(13, 240, 240);

  bgColors[7] = color(110, 174, 111);

  bgColors[8] = color(213, 24, 209);

  bgColors[9] = color(205, 91, 28);

  bgColors[10] = color(0, 0, 255);

  bgColors[11] = color(0, 255, 0);

  bgColors[12] = color(255, 237, 0);

  bgColors[13] = color(255, 0, 0);

  for(i = 1; i < 13; i++) {
    bgColors[12+i] = bgColors[12-i];
  }
}
function draw() {
  var nowTime = new Date();
  var now = (hhmmss.getM()%2)*60000 + hhmmss.getS()*1000 + hhmmss.getMillis();
  nowTester =  nowTime;

  //defining background color
  var exactSeconds = hhmmss.getH() * 3600 + hhmmss.getM()*60 + hhmmss.getS() + hhmmss.getMillis()/1000 + 5;
  console.log(exactSeconds);
  if(exactSeconds%3600 > 10)  {
    backgroundColor = bgColors[floor(exactSeconds/3600)];
  }
  else {
    if (exactSeconds%3600 < newTime) {
      var percent = 0.1;
    }
    else if (exactSeconds%3600 < (10-newTime)) {
      var percent = (exactSeconds%3600 - newTime) / (10 - 2*newTime);
    }
    else {
      var percent = 1;
    }
    var newColor = color(
      lerp(red(bgColors[(24 + floor(exactSeconds/3600)-1)%24]), red(bgColors[floor(exactSeconds/3600)]), percent),
      lerp(green(bgColors[(24 + floor(exactSeconds/3600)-1)%24]), green(bgColors[floor(exactSeconds/3600)]), percent),
      lerp(blue(bgColors[(24 + floor(exactSeconds/3600)-1)%24]), blue(bgColors[floor(exactSeconds/3600)]), percent)
    );
    backgroundColor = newColor;
  }

  rowColors[1] = backgroundColor;
  background(backgroundColor);

  //drawing text on background
  drawBackground((hhmmss.getH() * 60 + hhmmss.getM()) * 60 + hhmmss.getS() + hhmmss.getMillis()/1000);

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
    minuteArray[i].updateRow(hhmmss.getS() + hhmmss.getMillis()/1000);
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
  if(_ss < 55 && _ss > 5) {
    if(newss < 5) {
      this.xstart = -(2*width*this.speed-width)/2 * (Math.cos(Math.PI*newss/5) - 1);
    }
    else {
      this.xstart = -(2*width*this.speed+width)/2 * (Math.cos(Math.PI*(newss-5)/5) - 1) + (2*width*this.speed-width);
    }
  }
  else {
    var realss = (_ss+5)%60;
    if(this.nn%2 == 0) {
      var dir = -1;
    }
    else {
      var dir = 1;
    }
    switch(abs(this.speed)) {
      case 1 :
        var tempSpeed = 1;
        break;
      case 2 :
        var tempSpeed = 1;
        break;
      case 3 :
        var tempSpeed = 3;
        break;
      case 4 :
        var tempSpeed = 5;
        break;
    }
    if(realss < newTime) {
      this.xstart = tempSpeed*dir*width/2 * (Math.cos(Math.PI*realss/newTime) - 1) + width;
    }
    else if(realss > (10-newTime)) {
      this.xstart = tempSpeed*dir*width/2 * (Math.cos(Math.PI*(realss-(10-newTime))/newTime) - 1);
    }
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
        if(floor(_nn/3600) == 23) {
          currentIndex = 3;
        }
        else if(floor(_nn/3600) == 11) {
          currentIndex = 2;
        }
        else {
          currentIndex = 1;
        }
      }
      else {
        currentIndex = 0;
      }
      allCurrentsAreFalse();
      current[0] = true;
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
      allCurrentsAreFalse();
      current[1] = true;
    }
  }
  else if(realTime < 30) {
    if (current[2]) {
      currentImage = adverbsImg[currentIndex];
    }
    else {
      currentIndex = floor(random(0, adverbsImg.length));
      currentImage = adverbsImg[currentIndex];
      allCurrentsAreFalse();
      current[2] = true;
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
      allCurrentsAreFalse();
      current[4] = true;
    }
  }
  else if(realTime < 60) {
    if (current[5]) {
      currentImage = adverbsImg[currentIndex];
    }
    else {
      currentIndex = floor(random(0, adverbsImg.length));
      currentImage = adverbsImg[currentIndex];
      allCurrentsAreFalse();
      current[5] = true;
    }
  }
  image(currentImage, 20, 20, width-40, height-40);

}
function allCurrentsAreFalse() {
  for(i = 0; i < current.length; i++) {
    current[i] = false;
  }
}
