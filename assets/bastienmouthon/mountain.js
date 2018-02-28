function Mountain() {
  this.r = 1
  this.mountainLow = 100;
  this.mountainHigh = 300;
  this.xoff = 0;
  this.yoff =  random(100);
  this.accident = 0.06;
  this.speed = 1;
  //







  Mountain.prototype.draw = function() {
    //
    //
    beginShape();
    this.xoff = this.yoff; // Option #1: 2D Noise

    // Iterate over horizontal pixels
    for (var x = 0; x <= width; x += 3) {

      // Calculate a y value according to noise, map to

      // Option #1: 2D Noise
      //var y = map(noise(xoff, yoff), 10, 21, 400, 500);

      // Option #2: 1D Noise
      var y = map(noise(this.xoff), 0, 1, this.mountainLow, this.mountainHigh);

      // Set the vertex
      vertex(x, y+this.r);
      // Increment x dimension for noise
      this.xoff += this.accident;

    }
    this.yoff+=0.01*this.speed;
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }
  Mountain.prototype.setHigh = function(h) {
    this.mountainHigh = 200+h*10;

  }
  Mountain.prototype.setAccident = function(v) {
    this.accident = v;
  }
  Mountain.prototype.setSpeed = function(v) {
    this.speed = v;
  }
}
