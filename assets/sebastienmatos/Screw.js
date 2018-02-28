function Screw(type, d) {
  var weight = random(0.2, 0.6);

  push();

  var g = createGraphics(d + 15, d + 15)
  g.drawingContext.shadowOffsetX = 0;
  g.drawingContext.shadowOffsetY = 0;
  g.drawingContext.shadowBlur = 15;
  g.drawingContext.shadowColor = "rgba(0,0,0,.3)";
  g.translate(g.width / 2, g.height / 2);
  g.noStroke();
  g.fill(255);

  if (type === 0) {


    g.ellipse(0, 0, d);
    g.arc(0, 0, d, d, 0, PI - weight, CHORD);
    g.rotate(PI);
    g.arc(0, 0, d, d, 0, PI - weight, CHORD);

  } else if (type === 1) {
    var r = d / 4;
    var edges = 2 * (floor(random(2, 4)));

    g.ellipse(0, 0, r * 2);

    g.beginShape();
    var number = 0.55228475;

    var x2 = d / 2;
    var y2 = d / 2 * number;

    g.vertex(0, -x2);
    g.bezierVertex(-y2, -x2, -x2, -y2, -x2, 0);
    g.bezierVertex(-x2, y2, -y2, x2, 0, x2);
    g.bezierVertex(y2, x2, x2, y2, x2, 0);
    g.bezierVertex(x2, -y2, y2, -x2, 0, -x2);

    g.beginContour();
    for (var i = 0; i < TAU; i += TAU / edges) {
      g.vertex(r * cos(i), r * sin(i));
    }
    g.endContour();
    g.endShape();
  }

  pop();

  return g;
}