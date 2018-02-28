function Point(x, y) {
  this.pos = createVector(random(-sizeRandomPoints, sizeRandomPoints), random(-sizeRandomPoints, sizeRandomPoints));
  //console.log(x + " " + y + " HEHE: " + this.pos);
  this.initPos = createVector(0, 0);
  this.initPos.x = this.pos.x;
  this.initPos.y = this.pos.y;
  this.r1 = random(80, 2000);
  this.r2 = random(80, 2000);
  this.t = 0;
  this.departPos = createVector(x, y);
  //
  this.move = function(offsetX, offsetY) {
    this.not = 1 - this.t;
    this.n = createVector(noise(frameCount / 100.0 + this.r1) * 50 - 25, noise(frameCount / 100.0 + this.r2) * 50 - 25); // noise
    //////////this.n = createVector(0, 0);
    //this.n = createVector(random(-10, 10), random(-10, 10)); // noise
    //console.log(this.n);
    //this.n = createVector(random(-10, 10), random(-10, 10));

    //this.pos = this.initPos.add(this.n);
    //this.initPos = this.pos;
    //this.pos.add(this.n);
    this.pos.x = this.departPos.x + (this.initPos.x + this.n.x) * this.t;
    if (this.pos.x + offsetX < 0)
      this.pos.x = 0 - offsetX;
    if (this.pos.x + offsetX > myW)
      this.pos.x = myW - offsetX;

    this.pos.y = this.departPos.y + (this.initPos.y + this.n.y) * this.t;
    if (this.pos.y + offsetY < 0)
      this.pos.y = 0 - offsetY;
    if (this.pos.y + offsetY > myH)
      this.pos.y = myH - offsetY;

    //this.pos.x += ((this.initPos.x + this.vel.x) - this.pos.x) * .1;
    //this.pos.y += ((this.initPos.y + this.vel.y) - this.pos.y) * .1;
    //this.pos.add(this.vel);
    if (this.t < 1) {
      this.t += 1 / (30 * 30);
    }
  }
}
