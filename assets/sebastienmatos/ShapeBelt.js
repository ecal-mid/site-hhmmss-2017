function ShapeBelt(X) {

  var R = X;

  var r = constrain(int(random(10, 15)), 0, R);
  var d = int(random(r / 2, r));
  var divisions = constrain(int(random(2, 7)), 0, floor(TAU / (d / r) - 1));

  var ANGLE1 = 2 * asin(d / (2 * R)),
    ANGLE0 = (TAU - divisions * ANGLE1) / divisions;

  var ANGLE2 = asin(d / (2 * R));
  var ANGLE3 = asin((sin(ANGLE2) / r) * R) - ANGLE2;

  //pixelDensity
  var g = createGraphics(R*2+15, R*2+15);
  g.drawingContext.shadowOffsetX = 0;
  g.drawingContext.shadowOffsetY = 0;
  g.drawingContext.shadowBlur = 15;
  g.drawingContext.shadowColor = "rgba(0,0,0,.4)";

  push();
  g.noStroke();
  g.translate((g.width / 2), (g.height / 2));
  g.beginShape();

  var number = 0.55228475;
  var x2 = R;
  var y2 = R * number;

  vertex(0, -x2);
  bezierVertex(y2, -x2, x2, -y2, x2, 0);
  bezierVertex(x2, y2, y2, x2, 0, x2);
  bezierVertex(-y2, x2, -x2, y2, -x2, 0);
  bezierVertex(-x2, -y2, -y2, -x2, 0, -x2);

  for (var a = 0; a < divisions; a++) {
    g.beginContour();
    for (i = (a + 1) * ANGLE0 + a * ANGLE1; i > a * ANGLE0 + a * ANGLE1; i -= 0.01) {
      var x = R*.9 * cos(i);
      var y = R*.9 * sin(i);
      g.vertex(x, y);
    }

    for (i = (a * ANGLE0 + a * ANGLE1) + ANGLE3; i < ((a + 1) * ANGLE0 + a * ANGLE1) - ANGLE3; i += 0.01) {
      x = r * cos(i);
      y = r * sin(i);
      g.vertex(x, y);

    }
    g.endContour(CLOSE);
  }

  x2 = r * .5;
  y2 = r * .5 * number;

  g.beginContour();
  g.vertex(0, -x2);
  g.bezierVertex(-y2, -x2, -x2, -y2, -x2, 0);
  g.bezierVertex(-x2, y2, -y2, x2, 0, x2);
  g.bezierVertex(y2, x2, x2, y2, x2, 0);
  g.bezierVertex(x2, -y2, y2, -x2, 0, -x2);

  g.endContour();

  g.endShape(CLOSE);
  pop();


  return g;
}