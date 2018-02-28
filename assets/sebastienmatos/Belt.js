function Belt(x, y, ratio, chooseGear) {

  var xorigin = x;
  var yorigin = y;
  var corigin = 0;
  var ratioOrigin = ratio;
  var outSizeOrigin = sizeGear * ratioOrigin;
  var inSizeOrigin = outSizeOrigin - heightTeeth;

  var vertexNum = (teeth * 8) * ratioOrigin;

  var randomDist = random(100, 200);
  var randomAngle = random(TAU);

  this.x = xorigin + randomDist * cos(randomAngle);
  this.y = yorigin + randomDist * sin(randomAngle);
  this.c = 0;
  this.ratio = bigBelt ? (int(random(2, 3))) / heightTeeth : (int(random(2, 4))) / heightTeeth;
  bigBelt = !bigBelt;

  this.explodex;
  this.explodey;

  this.outSize = sizeGear * this.ratio;
  this.inSize = this.outSize - heightTeeth;

  this.notMoving = false;

  var BeltSize = this.outSize * 2;
  var elasticWeight = random(1, 2);

  var vertexNum2 = teeth * 8 * this.ratio;

  var speed;
  var angle;
  var distGear;

  var angle1 = atan2(yorigin - gears[chooseGear].y, xorigin - gears[chooseGear].x);
  var angle2 = degrees(atan2(gears[chooseGear].y - yorigin, gears[chooseGear].x - xorigin));
  var longueur = angle1 * gears[chooseGear].outSize;
  var angle3 = degrees(longueur / outSizeOrigin);

  this.intersections = 0;

  var g = ShapeBelt(outSizeOrigin);
  var g2 = ShapeBelt(BeltSize);
  var g3 = ShapeGear(this.outSize, this.inSize, vertexNum2);
  var g4 = Elastic(BeltSize, this.x, this.y, outSizeOrigin, xorigin, yorigin, elasticWeight);

  this.screwIt = false;
  this.screwx;
  this.screwy;
  this.screwc = 0;
  var s = Screw(floor(random(2)), 14);

  freeGears.push(gears.length);

  this.display = function() {
    if (this.screwIt && dist(this.screwx, this.screwy, xorigin, yorigin) > 0.1) {
      this.screwx = lerp(this.screwx, xorigin, 0.1);
      this.screwy = lerp(this.screwy, yorigin, 0.1);
    } else if (this.screwIt && this.screwc < 720) {
      this.screwc += 10;
    }


    corigin = gears[chooseGear].c;
    this.c = corigin / (BeltSize / outSizeOrigin);

    push();
    translate(xorigin, yorigin);
    rotate(radians(corigin));
    image(g, 0, 0);
    pop();

    push();
    translate(this.x, this.y);
    rotate(radians(this.c));
    image(g2, 0, 0);
    image(g3, 0, 0);
    pop();

    push();
    translate(this.x, this.y);
    translate((xorigin - this.x) / 2, (yorigin - this.y) / 2);
    image(g4, 0, 0);
    pop();

    if (this.screwIt) {
      push();
      translate(this.screwx, this.screwy);
      push();
      rotate(radians(this.screwc + corigin));
      image(s, 0, 0);
      pop();
      translate(this.x - xorigin, this.y - yorigin);
      rotate(radians(this.screwc + corigin));
      image(s, 0, 0);
      pop();
    }
  }

  this.move = function() {

    if (dist(xorigin, yorigin, gears[chooseGear].x, gears[chooseGear].y) > 1) {

      xorigin = lerp(xorigin, gears[chooseGear].x, 0.1);
      yorigin = lerp(yorigin, gears[chooseGear].y, 0.1);

      this.x = xorigin + randomDist * cos(randomAngle);
      this.y = yorigin + randomDist * sin(randomAngle);
    }
  }

  this.explode = function() {
    this.x = lerp(this.x, this.explodex, 0.01);
    this.y = lerp(this.y, this.explodey, 0.01);
    xorigin = lerp(xorigin, this.explodex, 0.01);
    yorigin = lerp(yorigin, this.explodey, 0.01);
  }
}