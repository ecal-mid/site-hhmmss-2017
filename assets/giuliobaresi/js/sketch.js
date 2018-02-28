
$(window).on("resize", function() {
    resizeCanvas(windowWidth, windowHeight);
});


var cx, cy;
var sR;
var mR;
var hR;
var milliSeconds;


var stopMinute = false;
var hideall = false;

var mms = [];
var hhs;


// // // //

function setup() {


    noCursor();



    createCanvas(windowWidth, windowHeight);

    var radius = min(width, height) / 4;
    sR = radius * 0.72;
    mR = radius * 0.60;
    hR = radius*2;


    cx = width / 2;
    cy = height / 2;

    hhs = new HH(0, 255);

    //nombre d'éléments minutes correspond au nombre de minutes actuelles au lancement
    for (var i = 0; i < 60; i++) {
        mms[i] = new MM();

    }
}
var C = 0;
var B = 0;

//-------------------------------------------------------------------------------

function draw() {


    var d = new Date();
    milliSeconds = d.getMilliseconds();



    //fading to inverted color depending of time evolution:

    if ( hhmmss.getH() >= 8 &&  hhmmss.getH() < 17) {
        C -= .5;
        if (C <= 0){
            C = 0;
        }

        B +=.5;
        if(B >= 255){
        B = 255;
            }

    } else {
        C += .5;
        if (C >= 255){
            C = 255;
        }

        B -=.5;
        if(B <= 0){
        B = 0;
            }
    }

    //
    background(B);
    //

    if ( hhmmss.getS() % 2 === 0 && stopMinute === false) {
        stopMinute = true;
        if ( hhmmss.getS() % 2 === 0) {
            for (var j = 0; j <  hhmmss.getM(); j++) {
                mms[j].changePos(hhs.x, hhs.y, hhs.HHval);
            }
            }
    }

    if ( hhmmss.getS() % 2 !== 0 && stopMinute === true) {
        stopMinute = false;
    }


    // ici on affiche les vecteurs !
    //vecteurs de l'heure du lancement du programme :

    for (var j = 0; j <  hhmmss.getM(); j++) {

        mms[j].animate();
        mms[j].showDot(C, B);
        mms[j].showLine(hhs.x, hhs.y ,C);
        if ( hhmmss.getM() == 59 &&  hhmmss.getS() == 59 &&  hhmmss.getS() == 60) {
            j = 0;
        }
    }
    hhs.show(C, B);
    hhs.move();
    hhs.resize();
    //hhs.move hhmmss.getH();


}



//
