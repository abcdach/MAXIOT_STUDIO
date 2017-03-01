///////////////////////////////////////////////
var W1;
var W2;
var W3;
var W4;
var W5;
///////////////////////////////////////////////
function OBJECT_Window_frame(show, X, Y, SizeW, SizeH, Grid, BorderH, xtextSize, xtextPos) {
	this.show = show;
	this.X = X;
    this.Y = Y;
    this.SizeW = SizeW;
    this.SizeH = SizeH;
    this.Grid = Grid;
    this.mousePressed_Delta_X = 20;
    this.mousePressed_Delta_Y = 10;
    this.mouseStatus = 0;
    this.BorderH = BorderH;
    this.text = "";
    this.xtextSize = xtextSize;
    this.xtextPos = xtextPos;
    

    this.draw = function() {
        //------------------------------------------------------------------
        // Shadow
        //------------------------------------------------------------------
        var x0 = this.SizeW / 2 + this.X;
        var y0 = this.SizeH / 2 + this.Y;

        var r = 2;
        var tolshina = 1;

        var ww = this.SizeW;
        var hh = this.SizeH;

        var c1 = color(100);
        var c2 = color(235);

        noStroke();
        for (var i = tolshina; i > 0; i--) {
            //inter = map(i, 0, tolshina - 1, 0, 1);
            //c = lerpColor(c1, c2, inter);
            fill(c2);
            rect(x0, y0, ww + 5 * i, hh + 5 * i, r + i);
        }
        //------------------------------------------------------------------
        stroke(118, 163, 188);
        fill(255);
        rect(this.SizeW / 2 + this.X, this.SizeH / 2 + this.Y, this.SizeW, this.SizeH, 2);
        line(this.X, this.BorderH + 1 + this.Y, this.SizeW + this.X, this.BorderH + 1 + this.Y);
        //------------------------------------------------------------------
        if (this.Grid === 1) {
            var i = 0;
            var cell = 1;
            stroke(245);
            if (cell === 1) {
                for (i = 1; i < this.SizeW / 15; i++) {
                    line(i * 15 + this.X, this.BorderH + 3 + this.Y, i * 15 + this.X, this.SizeH + this.Y - 3);
                }
                for (i = 1; i < this.SizeH / 15 - 2; i++) {
                    line(2 + this.X, i * 15 + this.Y + this.BorderH, this.SizeW + this.X - 2, i * 15 + this.Y + this.BorderH);
                }
            }
        }
        //------------------------------------------------------------------
        var x0 = this.X + 1;
        var y0 = this.Y + 1;
        var w = this.SizeW - 2;
        var h = this.BorderH;

        var c1 = color(184, 224, 245); //verhniy tsvet
        var c2 = color(159, 197, 219); //nizhniy tsvet
        var inter;
        var c;

        for (var i = 0; i < h; i++) {
            inter = map(i, 0, h - 1, 0, 1);
            c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x0, y0 + i, x0 + w, y0 + i);
        }

        textSize(this.xtextSize);
        textStyle(BOLD);
        textAlign(LEFT);
        noStroke();
        fill(0, 102, 153);
        text(this.text, this.X + 10, this.Y + this.xtextPos);
    };
    this._Text = function(text) {
        this.text = text;
    }
    this._mousePressed = function() {

        this.mousePressed_Delta_X = mouseX - this.X;
        this.mousePressed_Delta_Y = mouseY - this.Y;

        var XX;
        var YY;
        if (Math.abs(this.mousePressed_Delta_X) < this.SizeW / 2) {
            XX = 1;
        } else {
            XX = 0;
        }
        if (Math.abs(this.mousePressed_Delta_Y) < this.SizeH / 2) {
            YY = 1;
        } else {
            YY = 0;
        }
    };
    this._mouseReleased = function() {
        if (this.mouseStatus === 1) {
            this.mousePressed_Delta_X = 0;
            this.mousePressed_Delta_Y = 0;
            this.mouseStatus = 0;
        }
    };
    this._mouseDragged = function() {
        if (this.mouseStatus === 1) {
            this.X = mouseX - this.mousePressed_Delta_X;
            this.Y = mouseY - this.mousePressed_Delta_Y;
        }
    };
}
///////////////////////////////////////////////
function setup() {
	
    ///////////////////////////////////////////////////////
    setTimeout(iot__Timer, 1000);
    cursor(ARROW);
    ellipseMode(CENTER);
    rectMode(CENTER);
    ///////////////////////////////////////////////////////
    frameRate(1);
    ///////////////////////////////////////////////////////
    iot_Canvas = createCanvas(iot__CanvasW, iot__CanvasH);
    iot_Canvas.position(iot__CanvasX, iot__CanvasY);
    ///////////////////////////////////////////////////////
    W1 = new OBJECT_Window_frame(1, 330, 122, 800, 500, 1, 20, 13, 15);// virtula system board
    W2 = new OBJECT_Window_frame(1, 15, 122, 300, 500, 0, 20, 13, 15);
    W3 = new OBJECT_Window_frame(1, 15, 15, W1.X + W1.SizeW - 15, W1.Y - 35 + 10, 0, 20, 13, 15);
    W4 = new OBJECT_Window_frame(0, W2.X + W2.SizeW + 15 , 122, 330, 500, 0, 20, 13, 15);
    W5 = new OBJECT_Window_frame(1, W1.X + W1.SizeW + 15 , 122, 100, 500, 0, 20, 13, 15);
    ///////////////////////////////////////////////////////
    setup__info();
    setup__menu();
    setup__VCB();
    //////////////////////////////////////////////////
    W1._Text(xText[2]);
    W3._Text(xText[3]);
    W4._Text(xText[23]);
    W5._Text(xText[30]);
    //////////////////////////////////////////////////
    //noLoop();
    
    //loop();
    
    iot_LOCAL_STORAGE_READ();
    return 0;
}
///////////////////////////////////////////////
var W4show_Ch = 0;
//var mm_CC = 0;
function draw() {
    ///////////////////////////////////////////////
    background(245);
    ///////////////////////////////////////////////
    //var t0 = performance.now();
    ///////////////////////////////////////////////
    if (W1.show === 1) W1.draw();
    if (W2.show === 1) W2.draw();
    if (W3.show === 1) W3.draw();
    if (W4.show === 1) W4.draw();
    if (W5.show === 0) W5.draw();
    ///////////////////////////////////////////////
    

    ///////////////////////////////////////////////
    draw__info();
    draw__menu();
    draw__VCB();
    Terminal_Data_Packets.draw();
    ///////////////////////////////////////////////  
    //var t1 = performance.now();
    ///////////////////////////////////////////////   
    //loop();
    //info.announce(1, Terminal_Data_Packets.text_len, xText[4]);
    //mm_CC++;
}
///////////////////////////////////////////////
function iot__Timer() {
    setTimeout(iot__Timer, 250);
    redraw();
}
///////////////////////////////////////////////
function mousePressed() {
    loop();

    W1._mousePressed();
    W2._mousePressed();
    
    mousePressed__VCB();
}
///////////////////////////////////////////////
function mouseReleased() {
    mouseReleased__VCB();
    W1._mouseReleased();
    W2._mouseReleased();
    noLoop();
}
///////////////////////////////////////////////
function mouseDragged() {
    mouseDragged__VCB();
    W1._mouseDragged();
    W2._mouseDragged();
}
///////////////////////////////////////////////