function Gear(x, y, ratio, chooseGear, motor) {
  this.x = x;
  this.y = y;
  this.motor = motor;
  this.c = 0;

  this.explodex;
  this.explodey;

  this.ratio = ratio;
  this.outSize = sizeGear * this.ratio;
  this.inSize = this.outSize - heightTeeth;
  var vertexNum = teeth * 8 * this.ratio;

  var speed;
  var angle;
  var distGear;

  var angle1;
  var angle2;
  var angle3 = 0;

  var longueur;

  this.intersections = 0;

  var g = ShapeGear(this.outSize, this.inSize, vertexNum);

  this.screwIt = false;
  this.screwx;
  this.screwy;
  this.screwc = 0;
  var s = Screw(floor(random(2)), 14);

  freeGears.push(gears.length);

  this.display = function() {

    if (this.screwIt && dist(this.screwx, this.screwy, this.x, this.y) > 0.1) {
      this.screwx = lerp(this.screwx, this.x, 0.1);
      this.screwy = lerp(this.screwy, this.y, 0.1);
    } else if (this.screwIt && this.screwc < 720) {
      this.screwc += 10;
    }

    if (this.motor == "motor") {
      this.c = speedGear;
    } else {
      this.c = -((gears[chooseGear].c * gears[chooseGear].ratio) / this.ratio) + angle2 + angle3 + 360 / vertexNum;
    }

    push();
    translate(this.x, this.y);
    rotate(radians(this.c));

    image(g, 0, 0);
    pop();

    if (this.screwIt) {
      push();
      translate(this.screwx, this.screwy);
      rotate(radians(this.screwc + this.c));
      image(s, 0, 0);
      pop();
    }

  }

  this.move = function() {

    distGear = dist(this.x, this.y, gears[chooseGear].x, gears[chooseGear].y);

    if (distGear > (this.outSize + gears[chooseGear].inSize) + 0.1) {

      angle1 = atan2(this.y - gears[chooseGear].y, this.x - gears[chooseGear].x);
      angle2 = degrees(atan2(gears[chooseGear].y - this.y, gears[chooseGear].x - this.x));
      longueur = angle1 * gears[chooseGear].outSize;
      angle3 = degrees(longueur / this.outSize);

      speed = (distGear - (this.outSize + gears[chooseGear].inSize)) / 10;
      angle = atan2(gears[chooseGear].y - this.y, gears[chooseGear].x - this.x);
      this.x += Math.cos(angle) * speed;
      this.y += Math.sin(angle) * speed;
    }
  }

  this.explode = function() {
      this.x = lerp(this.x, this.explodex, 0.01);
      this.y = lerp(this.y, this.explodey, 0.01);
  }
}