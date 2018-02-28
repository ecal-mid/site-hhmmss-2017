
var vX = 3;
var vY = 3;


function HH() {
    this.a = 255;

    this.move = function() {
        //on map aussi les minutes et les secondes pour plus de précision
        var offScreen = 8;
        //first round from 00:00 to 12:00
        if(  hhmmss.getM() !== 0 ) {
            if ( hhmmss.getH() >= 0 && ( hhmmss.getH() < 2 && (  hhmmss.getM() > 0 &&  hhmmss.getM() <= 60 ) &&  hhmmss.getS() <= 60)) {
            this.x = map( hhmmss.getH() +  hhmmss.getM()/60 +  hhmmss.getS() / (60 * 60), 0, 2, -offScreen, width + offScreen);
            this.y = -offScreen;
            this.HHval = "top";
            } else if ( hhmmss.getH() >= 2 && ( hhmmss.getH() < 6 && (  hhmmss.getM() > 0 &&  hhmmss.getM() <= 60 ) &&  hhmmss.getS() <= 60)) {
            this.x = width + offScreen;
            this.y = map( hhmmss.getH() +  hhmmss.getM()/60 +  hhmmss.getS() / (60 * 60), 2, 6, -offScreen, height + offScreen );
            this.HHval = "right";

            } else if ( hhmmss.getH() >= 6 && ( hhmmss.getH() < 8 && (  hhmmss.getM() > 0 &&  hhmmss.getM() <= 60 ) &&  hhmmss.getS() <= 60)) {
            this.x = map( hhmmss.getH() +  hhmmss.getM()/60 +  hhmmss.getS() / (60 * 60), 6, 8, width + offScreen, -offScreen);
            this.y = height + offScreen;
            this.HHval = "bottom";

            } else if ( hhmmss.getH() >= 8 && ( hhmmss.getH() < 12 && (  hhmmss.getM() > 0 &&  hhmmss.getM() <= 60 ) &&  hhmmss.getS() <= 60)) {
            this.x = -offScreen;
            this.y = map( hhmmss.getH() +  hhmmss.getM()/60 +  hhmmss.getS() / (60 * 60), 8, 12, height + offScreen, -offScreen);
            this.HHval = "left";
            }

            //second round from 12:00 to 00:00

            else if ( hhmmss.getH() >= 12 && ( hhmmss.getH() < 14 && (  hhmmss.getM() > 0 &&  hhmmss.getM() <= 60 ) &&  hhmmss.getS() <= 60)) {
            this.x = map( hhmmss.getH() +  hhmmss.getM()/60 +  hhmmss.getS() / (60 * 60), 12, 14, -offScreen, width + offScreen);
            this.y = -offScreen;
            this.HHval = "top";
            }
            else if ( hhmmss.getH() >= 14 && ( hhmmss.getH() < 18 && (  hhmmss.getM() > 0 &&  hhmmss.getM() <= 60 ) &&  hhmmss.getS() <= 60)) {
            this.x = width + offScreen;
            this.y = map( hhmmss.getH() +  hhmmss.getM() / 60 +  hhmmss.getS() / (60 * 60), 14, 18, -offScreen, height + offScreen);
            this.HHval = "right";
            }
            else if ( hhmmss.getH() >= 18 && ( hhmmss.getH() < 20 && (  hhmmss.getM() > 0 &&  hhmmss.getM() <= 60 ) &&  hhmmss.getS() <= 60)) {
            this.x = map( hhmmss.getH() +  hhmmss.getM()/60 +  hhmmss.getS() / (60 * 60), 18, 20, width + offScreen, -offScreen);
            this.y = height + offScreen;
            this.HHval = "bottom";
            }

            else if (  hhmmss.getH() >= 20 && (  hhmmss.getH() < 24 && (  hhmmss.getM() > 0 &&  hhmmss.getM() <= 60 ) &&  hhmmss.getS() <= 60 ) ) {
            this.x = - offScreen;
            this.y = map(  hhmmss.getH() +  hhmmss.getM()/60 +  hhmmss.getS() / (60 * 60), 20, 24, height + offScreen, -offScreen );
            this.HHval = "left";
            }
        }
    }

    this.resize = function() {

        if( hhmmss.getM() == 59 ){
            this.K = constrain(this.K - 1/(60*55), 0, 200);
        }

        else if ( hhmmss.getM() == 0 && hhmmss.getS() >= 10){
            this.newK = 1;
            this.K +=(this.newK - this.K)*.01;
        }

        else if ( hhmmss.getM() == 0 && hhmmss.getS() < 10){
            this.newK = 1;
            this.K +=(this.newK - this.K)*.01;
        }

        else{
            this.K = 1;

        }
        this.s = sin(frameCount/60)*15*this.K + 200*this.K;
    }

    this.moveHour = function(){

        if(  hhmmss.getM() == 0 ) {
            if( this.x >= windowWidth || this.x <= 0 ){
                vX *= -1;
            }
            if( this.y <= 0 || this.y >= windowHeight){
                vY *= -1;
            }

            this.x += vX;
            this.y += vY;
        }
    }

    this.show = function(C, B) {

        fill(B);
        stroke(C);
        ellipse(this.x, this.y, this.s, this.s);

        if(hhmmss.getM() == 0){
            if(hhmmss.getS() >= 58){
                this.a = constrain(this.a*0.95,0,255);
            } else{ this.a = 255;}
            col = C;
            fill(col, this.a);
            noStroke();
            ellipse(this.x, this.y, this.s, this.s);
        }
    }
}
