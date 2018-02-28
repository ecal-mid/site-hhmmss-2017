var Starry = [];
var speed = 10;
var lastSecond;
var rad, x, y;

// points connectés (les uns à la suite des autres)
var connections = [];
// est-ce qu'on est à la toute première connection ? à réinitialiser chaque minute
var firstConnection = true;
// le dernier point qui a été connecté
var lastConnectedPoint;

// le fond sur lequel on dessine les traits
var bg;

function setup() {

  createCanvas(windowWidth,windowHeight);
  lastSecond = second();

  smooth();

  bg = createGraphics(width, height);
  bg.background(0);

  for (var i = 0; i < 50; i++) {
    Starry.push(new points());
  }
}

function draw() {
  background(0);

  image(bg, 0, 0, width, height);

  stroke(125, 125 + sin(radians(90+frameCount)) * 125, 125 + sin(radians(frameCount))*125);
  for(var i = 0; i < connections.length - 1; i++) {
    line(Starry[ connections[i] ].x, Starry[ connections[i] ].y,
         Starry[ connections[i + 1] ].x, Starry[ connections[i + 1] ].y);
  }


  for (var i = 0; i < Starry.length; i++) {
    Starry[i].drawr(255);
    Starry[i].bouger(1);
  }

  if(lastSecond != second()) {
    if(firstConnection) {
      for (var i = 0; i < Starry.length; i++) {
        for (var j = 0; j < Starry.length; j++) {
          if(i != j && dist(Starry[i].x, Starry[i].y, Starry[j].x, Starry[j].y) < 200) {
            connections.push(i);
            connections.push(j);
            Starry[i].figer();
            Starry[j].figer();
            lastConnectedPoint = j;
            firstConnection = false;
            break;
          }
        }
        if(!firstConnection) break;
      }
    } else {
      for (var i = 0; i < Starry.length; i++) {
        if(i != lastConnectedPoint && dist(Starry[lastConnectedPoint].x, Starry[lastConnectedPoint].y, Starry[i].x, Starry[i].y) < 500 && connections.indexOf(i) == -1) {
          connections.push(i);
          Starry[i].figer();
          lastConnectedPoint = i;
          break;
        }
      }
    }
    lastSecond = second();
  }

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
  this.immobile = false;

  points.prototype.drawr = function(opacite) {
    fill(255*sin(this.t));
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
  }

  points.prototype.bouger = function(speed) {
    if(!this.immobile) {
      this.x = this.x + (this.speedX * speed) * cos(millis()%20000 / this.path_lengthX );
      this.y = this.y + (this.speedY * speed) * sin(millis()%20000 / this.path_lengthY );
    }
      // console.log(this.x);
  }

  points.prototype.figer = function() {
    this.immobile = true;
  }
}
