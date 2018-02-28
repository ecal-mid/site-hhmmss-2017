function spawn() {

  if (!timerH) easeIn = 0;

  var z = floor(random(3));
  //z = 2;
  var chooseRatio;

  var randomPosition = random(TAU); //position to spawn is around circle

  //var x = gears[gears.length - 1].x + diagonalScreenRadius * 1.5 * cos(randomPosition); //spawn around circle with radius of diagonalScreenRadius
  //var y = gears[gears.length - 1].y + diagonalScreenRadius * 1.5 * sin(randomPosition);
  var newPosition = Randomizer(gears[gears.length - 1].x, gears[gears.length - 1].y);
  var x = newPosition.x;
  var y = newPosition.y;
  if (!screw) {
    var chosen = freeGears[floor(random(freeGears.length))]; //choose gear to intersect with

    if (gears[chosen].intersections >= maxIntersections - 1) { //remove from array if gear has enough intersections
      var index = freeGears.indexOf(chosen);
      freeGears.splice(index, 1);
    }

    gears[chosen].intersections++; //add one more intersection to the chosen gear
    gears[gears.length - 1].intersections++; //add the first intersection to new gear


    switch (z) {

      case 0:
      case 1:
        chooseRatio = (int(random(2, 10))) / heightTeeth; //new ratio
        gears.push(new Gear(x, y, chooseRatio, chosen, "notMotor")); //push new gear into array gears
        break;
      case 2:
        chooseRatio = (int(random(2, 10))) / heightTeeth; //new ratio
        gears.push(new Belt(x, y, chooseRatio, chosen, "notMotor")); //push new gear into array gears
    }
  } else {
    gears[gears.length - 1].screwx = x;
    gears[gears.length - 1].screwy = y;
    gears[gears.length - 1].screwIt = true;
  }
  screw = !screw;
}