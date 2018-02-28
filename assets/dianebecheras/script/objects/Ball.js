function Ball(x, y) {
  this.x = x;
  this.y = y;

  console.log(x, y);
  //
  this.faces = [];
  this.points = [];
  //
  this.points.push(new Point(0, 0));
  this.points.push(new Point(0, 0));
  this.points.push(new Point(0, 0));

  this.r1 = random(80, 200);
  this.r2 = random(80, 200);

  this.diminue = false;
  this.s = 1;

  // this.points.push(new Point(this.points[this.points.length - 1].pos.x, this.points[this.points.length - 1].pos.y));
  // this.points.push(new Point(this.points[this.points.length - 1].pos.x, this.points[this.points.length - 1].pos.y));
  //
  this.faces.push(new Face(this.points[0], this.points[1], this.points[2]));
  /////////declaration des variable pour face///////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //this.p = new Point; // position



  //////initialisation des variables pour face//////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////



  //////fonction pour face//////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  this.move = function() {
    if (this.diminue == true) {
      if (this.s > 0.1)
        this.s -= 0.00001; // taille minim de la ball et vitesse de reduction
    }
    this.x = noise(frameCount / 3000.0 + this.r1) * width;
    this.y = noise(frameCount / 3000.0 + this.r2) * height;
    //////////this.x = mouseX;
    //////////this.y = mouseY;
    for (var i = 0; i < this.points.length; i++) {
      this.points[i].move(this.x, this.y);
    }
  }

  this.draw = function() {
    push();
    translate(this.x, this.y);
    scale(this.s);
    // ellipse(0, 0, 10, 10);

    for (var i = 0; i < this.faces.length; i++) {
      this.faces[i].draw();
    }
    pop();

  }

  this.addFace = function() {
    this.points.push(new Point(this.points[this.points.length - 1].pos.x, this.points[this.points.length - 1].pos.y));
    var index = this.points.length - 1;
    this.faces.push(new Face(this.points[index], this.points[index - 1], this.points[index - 2]));
  }

}
