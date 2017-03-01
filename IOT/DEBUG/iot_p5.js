///////////////////////////////////////////////
var W1;
var W2;
var W3;
///////////////////////////////////////////////
function OBJECT_Window_frame(X, Y, SizeW, SizeH, Grid, BorderH, xtextSize, xtextPos) {
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
}




var INFO_width = [];
var INFO_Delta = [];
function INFO_GRID(){
    
    var XX = 345;
    var YY = 135;
    var YYY = YY - 5;
    var cc = 0;
    
    

    
    INFO_width[cc] = 15; INFO_Delta[cc] = 0; INFO_Text[cc] = new _INFO_Text(XX + INFO_Delta[cc]+INFO_width[cc]/2+5,YYY, "nm", 0);cc++;
    INFO_width[cc] = 40; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 7;INFO_Text[cc] = new _INFO_Text(XX + INFO_Delta[cc]+INFO_width[cc]/2+5,YYY, "Dev", 0); cc++; 
    INFO_width[cc] = 15; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 7;INFO_Text[cc] = new _INFO_Text(XX + INFO_Delta[cc]+INFO_width[cc]/2+5,YYY, "ind", 0); cc++;
    INFO_width[cc] = 15; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 7;INFO_Text[cc] = new _INFO_Text(XX + INFO_Delta[cc]+INFO_width[cc]/2+5,YYY, "use", 0); cc++;
    INFO_width[cc] = 15; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 7;INFO_Text[cc] = new _INFO_Text(XX + INFO_Delta[cc]+INFO_width[cc]/2+5,YYY, "typ", 0); cc++;
    INFO_width[cc] = 25; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 7;INFO_Text[cc] = new _INFO_Text(XX + INFO_Delta[cc]+INFO_width[cc]/2+5,YYY, "X", 0); cc++;
    INFO_width[cc] = 25; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 7;INFO_Text[cc] = new _INFO_Text(XX + INFO_Delta[cc]+INFO_width[cc]/2+5,YYY, "Y", 0); cc++;
    INFO_width[cc] = 80; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 7;INFO_Text[cc] = new _INFO_Text(XX + INFO_Delta[cc]+INFO_width[cc]/2+5,YYY, "name text", 0); cc++;
    ///////////////////////////////////////////////////////////////
    var r = 8;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 15; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    ///////////////////////////////////////////////////////////////
    r = 8;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 15; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    ///////////////////////////////////////////////////////////////
    r = 8;
    INFO_width[cc] = 40; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 15; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = 40; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 12; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = 40; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 12; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = 40; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 12; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    ///////////////////////////////////////////////////////////////
    r = 8;
    INFO_width[cc] = 40; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 15; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = 40; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 12; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = 40; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 12; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    INFO_width[cc] = 40; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 12; cc++;
    INFO_width[cc] = r; INFO_Delta[cc] = INFO_width[cc-1] + INFO_Delta[cc-1] + 5; cc++;
    ///////////////////////////////////////////////////////////////
    
    //INFO_Text[0] = new _INFO_Text(XX + INFO_Inp1_Delta+13, YY - 5, "num", 0);
    //INFO_Text[1] = new _INFO_Text(XX + INFO_Inp2_Delta+20, YY - 5, "Dev", 0);
    //INFO_Text[2] = new _INFO_Text(XX + INFO_Inp3_Delta+13, YY - 5, "ind", 0);
    //INFO_Text[3] = new _INFO_Text(XX + INFO_Inp4_Delta+13, YY - 5, "user", 0);
    //INFO_Text[4] = new _INFO_Text(XX + INFO_Inp5_Delta+13, YY - 5, "type", 0);
    //INFO_Text[5] = new _INFO_Text(XX + INFO_Inp6_Delta+13, YY - 5, "X", 0);
    //INFO_Text[6] = new _INFO_Text(XX + INFO_Inp7_Delta+13, YY - 5, "Y", 0);
    //INFO_Text[7] = new _INFO_Text(XX + INFO_Inp8_Delta+28, YY - 5, "name text", 0);
    //INFO_Text[8] = new _INFO_Text(XX + INFO_Inp9_Delta+13, YY - 5, "NUM", 0);

  
    for (var ii = 0; ii < cc; ii++) { // xazebi
        for (var i = 0; i < 17; i++) { // xazebi

            INFO_IN[i][ii] = createInput();
            INFO_IN[i][ii].style('width', INFO_width[ii] + 'px');
            INFO_IN[i][ii].position(XX + INFO_Delta[ii], YY + i*25);

        }
    }
    
    
   
    
}


function setup() {

   
    W1 = new OBJECT_Window_frame(330, 122, 800, 550, 1, 20, 13, 15);
    W2 = new OBJECT_Window_frame(15, 122, 300, 450, 0, 20, 13, 15);
    W3 = new OBJECT_Window_frame(15, 15, W1.X + W1.SizeW - 15, W1.Y - 35 + 10, 0, 20, 13, 15);
    ///////////////////////////////////////////////////////
    setup__menu();
   
    

}
///////////////////////////////////////////////
function draw() {   
}
/////////////////////////////////////////