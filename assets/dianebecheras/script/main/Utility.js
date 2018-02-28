function drawTriangle(p, img) { // dessine les trois points pour faire un triangle
  //texture(img1);
  triangle(p[0].x, p[0].y,
    p[1].x, p[1].y,
    p[2].x, p[2].y);
}

////////////////////////////////////////////////////////////////////////////////
function initialiseTriangle(p) { // initilise les valeurs pour les listes des trois points du triangle
  p = [];
  p[0] = new Point(-100, -100);
  p[1] = new Point(100, -100);
  p[2] = new Point(0, 50);
  return p;
}

////////////////////////////////////////////////////////////////////////////////
