var stats = new Stats();
stats.showPanel(0);  // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom);



var Short = 20;
var nShort = 230;          // square per ligne
var num = Short * nShort;  // square per screen
var Long = 27;
var nLong = Math.floor(num / Long);

if (window.innerWidth > window.innerHeight) {
  Line = Short;
  nLine = nShort;
  Column = Long;
  nColumn = nLong;
} else {
  Line = Long;
  nLine = nLong;
  Column = Short;
  nColumn = nShort;
}



var couleur = [];
couleur[7] = new THREE.Color('rgb(30, 144, 255)');   // bleu
couleur[0] = new THREE.Color('rgb(255, 255, 255)');  // blanc
couleur[10] = new THREE.Color('rgb(255, 62, 150)');  // rose
couleur[2] = new THREE.Color('rgb(72, 209, 204)');   // turquoise
couleur[6] = new THREE.Color('rgb(0, 201, 87)');     // vert
couleur[1] = new THREE.Color('rgb(255, 215, 0)');    // jaune-orange
couleur[3] = new THREE.Color('rgb(255, 127, 0)');    // orange
couleur[4] = new THREE.Color('rgb(255, 69, 0)');     // rouge
couleur[5] = new THREE.Color('rgb(125, 125, 125)');  // gris moyen
couleur[8] = new THREE.Color('rgb(127, 0, 255)');    // violet
couleur[9] = new THREE.Color('rgb(0, 139, 139)');    // dark sian
couleur[11] = new THREE.Color('rgb(0, 0, 200)');     // dark blue



var date = new Date();
var hour = date.getHours();
var lastMillis;
var millis;
var lastHour = hour;

var halfW = window.innerWidth / 2;
var halfH = window.innerHeight / 2;

var mesh = [];

var scene = new THREE.Scene();
scene.background = couleur[hour % 12];
var camera = new THREE.OrthographicCamera(
    window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / -2,
    window.innerHeight / 2, 1, 1000);


var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

var animation = Math.floor(Math.random() * 6);
// var animation = 5;
var lastAnimation = animation;



var date = new Date();
var material = new THREE.ShaderMaterial({
  uniforms: {
    numRect: {value: num},
    sec: {value: date.getTime() % 60000},
    rot: {value: 0},
    PI: {value: Math.PI},
    r: {value: couleur[hour % 12].r},
    g: {value: couleur[hour % 12].g},
    b: {value: couleur[hour % 12].b},
    minute: {value: date.getMinutes()},


    screen: {value: [window.innerWidth * 0.5, window.innerHeight * 0.5]}
  },
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('fragmentShader').textContent,
  side: THREE.DoubleSide,
  transparent: true
});

var meshes = [];
var vertOrder = [0, 1, 3, 1, 2, 3];
var uvOrder = [[0, 0], [1, 0], [1, 1], [0, 1]];
for (var i = 0; i < 6; i++) {
  // Geometry creation
  var geom = new THREE.BufferGeometry();
  var vert = [];
  var norm = [];
  var uvs = [];
  var index = [];

  // Start pos
  var pos = new THREE.Vector3(0, 0, 0);
  var signX = 1;

  switch (i) {
    case 0:
      pos.x = -0.5 * window.innerWidth;
      pos.y = 0.5 * window.innerHeight;
      break;
    case 1:
      pos.x = -0.5 * window.innerWidth;
      pos.y = -0.5 * window.innerHeight;
      break;

    case 2:
      pos.x = -0.5 * window.innerWidth;
      pos.y = -0.5 * window.innerHeight;
      break;

    case 3:
      pos.x = 0.5 * window.innerWidth;
      pos.y = -0.5 * window.innerHeight;
      break;

    case 4:
      pos.x = 0;
      pos.y = 0;
      break;

    case 5:
      pos.x = 0.5;
      pos.y = 0;
      break;
  }

  // Create rects
  for (var j = 0; j < num; j++) {
    // Fill index

    // console.log('j%   ' + j % nColumn);
    // console.log('nC -1    ' + nColumn - 1);
    for (var k = 0; k < 6; k++) {
      index.push(j * 4 + vertOrder[k]);
    }

    // Definir la position du rect
    switch (i) {
      case 0:
        if (j % nLine == nLine - 1) {
          signX *= -1;
          pos.y -= (window.innerHeight / ((num / nLine) - 1));
        } else {
          pos.x += signX * (window.innerWidth / (nLine - 1));
        }
        break;
      case 1:
        if (j % nLine == nLine - 1) {
          signX *= -1;
          pos.y += (window.innerHeight / ((num / nLine) - 1));
        } else {
          pos.x += signX * (window.innerWidth / (nLine - 1));
        }
        break;

      case 2:
        if (j % nColumn == nColumn - 1) {
          signX *= -1;
          pos.x += (window.innerWidth / ((num / nColumn) - 1));
        } else {
          pos.y += signX * (window.innerHeight / (nColumn - 1));
        }
        break;

      case 3:
        if (j % nColumn == nColumn - 1) {
          signX *= -1;
          pos.x -= (window.innerWidth / ((num / nColumn) - 1));
        } else {
          pos.y += signX * (window.innerHeight / (nColumn - 1));
        }
        break;


      case 4:
        pos.x = Math.cos(j * 0.015) * (halfW / num) * j;
        pos.y = Math.sin(j * 0.015) * (halfH / num) * j;

        break;

      case 5:
        pos.x = Math.cos(j * 0.015) * (halfW - (halfW / num * j));
        pos.y = Math.sin(j * 0.015) * (halfH - (halfH / num * j));

        break;
    }


    for (var k = 0; k < 4; k++) {
      // Ajouter les vertices du rect
      vert.push(pos.x, pos.y, k);
      uvs.push(uvOrder[k][0], uvOrder[k][1]);
      // Ajouter l'index du rect
      norm.push(j, 0, 0);
    }
  }

  // Setup the geometry
  geom.setIndex(new THREE.BufferAttribute(new Uint16Array(index), 1));
  geom.addAttribute(
      'position', new THREE.BufferAttribute(new Float32Array(vert), 3));
  geom.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
  geom.addAttribute(
      'normal', new THREE.BufferAttribute(new Float32Array(norm), 3));

  // Create a new mesh and store it in an array
  var mesh = new THREE.Mesh(geom, material);
  meshes.push(mesh);
}

scene.add(meshes[animation]);

function render() {
  var time = document.querySelector('#txt');

  var r = Math.floor(couleur[hour % 12].r * 255);
  var g = Math.floor(couleur[hour % 12].g * 255);
  var b = Math.floor(couleur[hour % 12].b * 255);
  time.style.color = 'rgb(' + r + ',' + g + ',' + b + ')';

  var date = new Date();
  millis = date.getTime() % 60000;
  hour = date.getHours();

  material.uniforms.sec.value = date.getTime() % 60000;
  material.uniforms.rot.value += 0.03;



  if (millis < lastMillis) {
    scene.remove(meshes[animation]);
    animation = Math.floor(Math.random() * 6);  // 2 = animation number
    console.log(animation);
    if (animation == lastAnimation) {
      animation = (animation + 1) % 2;
    }
    scene.add(meshes[animation]);
    lastAnimation = animation;
  }

  lastMillis = millis;
  material.uniforms.minute.value = date.getMinutes();
  if (hour != lastHour) {
    scene.background = couleur[hour % 12];
    material.uniforms.r.value = couleur[hour % 12].r;
    material.uniforms.g.value = couleur[hour % 12].g;
    material.uniforms.b.value = couleur[hour % 12].b;
  }

  lastHour = hour;



  stats.begin();
  renderer.render(scene, camera);
  stats.end();
  requestAnimationFrame(render);
}

render();
