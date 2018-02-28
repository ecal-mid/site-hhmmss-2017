function Randomizer(X, Y) {

  var x;
  var y;
  var angle;

  switch (hhmmss.getH()) {
    case 1:
    case 13:
      angle = corner * HALF_PI;
      x = X + diagonalScreenRadius * 1.5 * cos(angle);
      y = Y + diagonalScreenRadius * 1.5 * sin(angle);
      corner++;
      break;
    case 2:
    case 14:
      angle = corner * QUARTER_PI;
      x = X + diagonalScreenRadius * 1.5 * cos(angle);
      y = Y + diagonalScreenRadius * 1.5 * sin(angle);
      corner++;
      break;
    case 3:
    case 15:
      angle = random(TAU);
      x = X + diagonalScreenRadius * 1.5 * cos(angle);
      y = Y + diagonalScreenRadius * 1.5 * sin(angle);
      break;

    case 4:
    case 16:
      angle = map(hhmmss.getM(), 0, 59, -1, 1);

      x = X + diagonalScreenRadius * 1.5 * cos(angle);
      y = Y + diagonalScreenRadius * 1.5 * sin(angle);
      break;
    case 5:
    case 17:
      angle = map(hhmmss.getS(), 0, 59, -1, 1);

      x = X + diagonalScreenRadius * 1.5 * cos(angle);
      y = Y + diagonalScreenRadius * 1.5 * sin(angle);
      break;
    case 6:
    case 18:
      angle = round(map(hhmmss.getM(), 0, 59, 0, 3)) * HALF_PI;

      x = X + diagonalScreenRadius * 1.5 * cos(angle);
      y = Y + diagonalScreenRadius * 1.5 * sin(angle);
      break;
    case 7:
    case 19:
      angle = corner * PI;
      x = X + diagonalScreenRadius * 1.5 * cos(angle);
      y = Y + diagonalScreenRadius * 1.5 * sin(angle);
      corner++;
      break;
    case 8:
    case 20:
      angle = map(hhmmss.getS(), 0, 59, -1, 1);

      x = X + diagonalScreenRadius * 1.5 * cos(angle);
      y = Y + diagonalScreenRadius * 1.5 * sin(angle);
      break;
    case 9:
    case 21:
      x = random(X - width / 2, X + width / 2);
      y = Y - height / 2;
      break;
    case 10:
    case 22:
      x = X - width / 2;
      y = random(Y - height / 2, Y + height / 2);
      break;
    case 11:
    case 23:
      x = random(X - width / 2, X + width / 2);
      y = Y + height / 2;
      break;
    case 12:
    case 0:
      x = X + width / 2;
      y = random(Y - height / 2, Y + height / 2);

  }

  var position = createVector(x, y);
  
  return position;
}