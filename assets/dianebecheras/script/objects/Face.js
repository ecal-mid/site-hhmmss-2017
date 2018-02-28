function Face(p1, p2, p3) {
  this.r = floor(random(1, 27));
  //this.r = 11;
  if (hhmmss.getH() > 0 && hhmmss.getH() <= 8) {
    this.img = loadImage("pattern/pattern_nuit/pattern_nuit" + this.r + ".jpg");
  } else {
    this.img = loadImage("pattern/pattern_jour/pattern_jour" + this.r + ".jpg");
  }



  /////////declaration des variable pour face///////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  this.p1 = p1;
  this.p2 = p2;
  this.p3 = p3;
  //this.img = img;

  //////initialisation des variables pour face//////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /*if (isFirst) {
    this.p = initialiseTriangle(); //initilise les valeurs pour les listes des trois points du triangle
  }*/

  //////fonction pour face//////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //texture(img);
  this.draw = function() { // dessine les trois points pour faire un triangle
    texture(this.img);
    triangle(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y, p3.pos.x, p3.pos.y);
  }
}
