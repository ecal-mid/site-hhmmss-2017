function Elastic(r1, x1, y1, r2, x2, y2, weight) {

  var perimetre = 2 * PI * r1;
  var perimetre2 = 2 * PI * r2;

  var g = r2 <= r1 ? 1 : -1;
  var a = atan2(y1 - y2, x1 - x2);
  var b = g * asin(abs(r2 - r1) / dist(x2, y2, x1, y1));

  var h = createGraphics((calculate(x1, x2, r1, r2) + weight) * 2 + 15, (calculate(y1, y2, r1, r2) + weight) * 2 + 15);

  h.drawingContext.shadowOffsetX = 0;
  h.drawingContext.shadowOffsetY = 0;
  h.drawingContext.shadowBlur = 15;
  h.drawingContext.shadowColor = "rgba(0,0,0,.4)";

  push();
  h.noFill();
  h.stroke(255);
  h.strokeWeight(weight*2);
  h.translate(h.width / 2, h.height / 2);
  h.beginShape();

  for (var i = a + b - HALF_PI; i <= a - b + HALF_PI; i += 0.1) {
    var j = ((x2 - x1) / 2) - (r2 + weight) * cos(i);
    var k = ((y2 - y1) / 2) - (r2 + weight) * sin(i);
    h.vertex(j, k);
  }

  for (i = a - b - HALF_PI; i <= a + b + HALF_PI; i += 0.1) {
    j = ((x1 - x2) / 2) + (r1 + weight) * cos(i);
    k = ((y1 - y2) / 2) + (r1 + weight) * sin(i);
    h.vertex(j, k);
  }

  h.endShape(CLOSE);
  pop();
  return h;
}

function calculate(x1, x2, r1, r2) {
  var number1 = (x1 - x2) / 2;
  var number2 = (x2 - x1) / 2;
  var dist1 = abs(number1 / abs(number1) * r1 + number1);
  var dist2 = abs(number2 / abs(number2) * r2 + number2);

  Dist = dist1 >= dist2 ? dist1 : dist2;
  return Dist;
}