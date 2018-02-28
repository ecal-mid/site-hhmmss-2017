function MM() {


        this.ScreenLimit = 100;

        this.x = random(this.ScreenLimit, width - this.ScreenLimit);
        this.y = random(this.ScreenLimit, height - this.ScreenLimit);

        this.newX = this.x;
        this.newY = this.y;

        this.offsetFrame = 0;

        console.log(this.ScreenLimit);


    this.showDot = function(C, B) {
        if(  hhmmss.getM() == 59 && hhmmss.getS() < 58 ){
            if(hhmmss.getS() == 0) {
                this.offsetFrame = frameCount;
            }
            this.s = map( frameCount - this.offsetFrame, 0, 3600, 6.5, 150 );
            if(this.s >= 150){
                this.s = 150;
            }
        }
        else if ( hhmmss.getM() == 59 && (  hhmmss.getS() >= 58 )){
            this.s*=.97;
            this.a*=.9;
        }
        else {
            this.s = 6.5;
            this.a = 255;
        }

        push();
        fill(C);
        strokeWeight(0.5);
        stroke(B);

        ellipse(this.x, this.y, this.s, this.s);
        pop();
    }

    this.showLine = function( posX, posY, C ) {
        push();
        strokeWeight(0.5);
        stroke(C, this.a);
        line(this.x, this.y, posX, posY);
        pop();
    }

    this.changePos = function(HHx, HHy, HHval) {

        if  ( hhmmss.getM() == 59 && hhmmss.getS() < 45){
            sL = this.ScreenLimit;
        } else if(hhmmss.getM() == 59 && hhmmss.getS() >= 45){
            sL = map(hhmmss.getS(), 45, 60, this.ScreenLimit, -this.ScreenLimit);
        }
        if(  hhmmss.getM() == 59 ){

            if ( HHval == "top" ){
                wid1 = map(  hhmmss.getS(), 0, 60, sL, HHx );
                wid2 = map(  hhmmss.getS(), 0, 60, width - sL, HHx );
                hei1 = sL;
                hei2 = map(  hhmmss.getS(), 0, 60, height - sL, sL );
            }

            else if ( HHval == "right" ){
                wid1 = map(  hhmmss.getS(), 0, 60, sL, width - sL );
                wid2 = width - sL;
                hei1 = map(  hhmmss.getS(), 0, 60, sL, HHy );
                hei2 = map(  hhmmss.getS(), 0, 60, height - sL, HHy );
            }

            else if ( HHval == "bottom" ){
                wid1 = map(  hhmmss.getS(), 0, 60, sL, HHx );
                wid2 = map(  hhmmss.getS(), 0, 60, width - sL, HHx );
                hei1 = map(  hhmmss.getS(), 0, 60, sL, height - sL );
                hei2 = height - sL;
            }


            else if ( HHval == "left" ){
                wid1 = sL;
                wid2 = map(  hhmmss.getS(), 0, 60, width - sL, sL );
                hei1 = map(  hhmmss.getS(), 0, 60, sL, HHy );
                hei2 = map(  hhmmss.getS(), 0, 60, height - sL, HHy );
            }

            this.newX = random(wid1, wid2 + .1);
            this.newY = random(hei1, hei2 + .1) ;

        }
        // else if (hhmmss.getM() == 59 && hhmmss.getS() >= 55){
        //     this.x = map(second(), 55, 60, this.x, HHx );
        //     this.y = map(second(), 55, 60, this.y, HHy );
        // }
        //en temps normal
        else {
        this.newX = random(this.ScreenLimit, width - this.ScreenLimit);
        this.newY = random(this.ScreenLimit, height - this.ScreenLimit);
        }


    }


    this.animate = function() {
            lrp = .05
            this.x += (this.newX - this.x)*lrp;
            this.y += (this.newY - this.y)*lrp;
    }
}
