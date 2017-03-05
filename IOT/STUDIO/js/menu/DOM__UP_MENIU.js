var Menu_Text = [];

function _Menu_Text(x, y, Text, Col) {
    this.x = x;
    this.y = y;
    this.text = Text;
    this.Col = Col;
    this.display = function() {
        fill(Col);
        noStroke();
        textAlign(CENTER);
        //stroke(255);
        textFont("Arial");
        textStyle(NORMAL);
        textSize(12);
        text(this.text, this.x, this.y);
    };
}

var con_002;
var con_003;
var con_004;
var line_1;
var line_2;
var term_1;
var term_2;

var rooms_1;

var mod_1;
var mod_2;
var con_p1;
var Inf_1;
var Opt_1;
var dom__W2_Button_right;
var dom__W2_Button_Left;

function Menu_init() {
    var MD = 10;
    ///////////////////////////////////////////////
    Menu_Text[0] = new _Menu_Text(65, 97 + MD, xText[6], 0); //"Disconnected"
    Menu_Text[1] = new _Menu_Text(151, 49 + 5 + MD, "0", 0);
    Menu_Text[2] = new _Menu_Text(151, 72 + 7 + MD, "0", 0);
    Menu_Text[3] = new _Menu_Text(151, 97 + MD, xText[7], 0); //"Packets"
    Menu_Text[4] = new _Menu_Text(230, 97 + MD, xText[8], 0); //"Terminal"
    Menu_Text[5] = new _Menu_Text(312, 97 + MD, xText[9], 0); //"Components"
    Menu_Text[7] = new _Menu_Text(389, 97 + MD, xText[31], 0); //"Rooms"
    ///////////////////////////////////////////////
    //con_001 = createImg('pic/con_001.png');
    //con_001.position(35, 35 + MD);
    //con_001.style('width', '70px');
    ///////////////////////////////////////////////
    con_002 = createImg('pic/1_con_002.png');
    con_002.position(28, 39 + MD);
    con_002.style('width', '75px');
    con_002.style('height', '40px');
    //con_002.mousePressed(Menu_Con_Connect);
    con_002.mousePressed(Menu_Con_Password);
    con_002.mouseOver(function(){con_002.style('width', '74px');});
    con_002.mouseOut (function(){con_002.style('width', '75px');});
    ///////////////////////////////////////////////
    con_003 = createImg('pic/1_con_003.png');
    con_003.position(28, 39 + MD)
    con_003.style('width', '75px');
    con_003.style('height', '40px');
    con_003.mouseOver(function(){con_003.style('width', '74px');});
    con_003.mouseOut (function(){con_003.style('width', '75px');});
    ///////////////////////////////////////////////
    con_004 = createImg('pic/1_con_004.png');
    con_004.position(28, 39 + MD)
    con_004.style('width', '75px');
    con_004.style('height', '40px');
    con_004.mousePressed(Menu_Con_disconnect);
    con_004.mouseOver(function(){con_004.style('width', '74px');});
    con_004.mouseOut (function(){con_004.style('width', '75px');});
    ///////////////////////////////////////////////
    line_1 = createImg('pic/line_1.png');
    line_1.position(113, 53 + MD);
    line_1.style('width', '80px');
    line_1.style('height', '17px');
    ///////////////////////////////////////////////
    line_2 = createImg('pic/line_2.png');
    line_2.position(113, 53 + MD);
    line_2.style('width', '80px');
    line_2.style('height', '17px');
    ///////////////////////////////////////////////
    term_1 = createImg('pic/term1_1.png');
    term_1.position(203, 30 + MD);
    term_1.style('width', '55px');
    //term_1.mouseOver(function(){term_1.style('width', '54px');});
    //term_1.mouseOut (function(){term_1.style('width', '55px');});
    ///////////////////////////////////////////////
    term_2 = createImg('pic/term2.png');
    term_2.position(203, 30 + MD);
    term_2.style('width', '55px');
    term_2.mousePressed(dom__Terminal.show);
    term_2.mouseOver(function(){term_2.style('width', '54px');});
    term_2.mouseOut (function(){term_2.style('width', '55px');});
    ///////////////////////////////////////////////
    mod_1 = createImg('pic/mod1.png');
    mod_1.position(285, 30 + MD);
    mod_1.style('width', '55px');
    //mod_1.mousePressed(dom__Terminal.show);
    ///////////////////////////////////////////////
    mod_2 = createImg('pic/mod2.png');
    mod_2.position(285, 30 + MD);
    mod_2.style('width', '55px');
    mod_2.mousePressed(dom__Components.show);
    mod_2.mouseOver(function(){mod_2.style('width', '54px');});
    mod_2.mouseOut (function(){mod_2.style('width', '55px');});
    ///////////////////////////////////////////////
    room_x = createImg('pic/room/room_x.jpg');
    room_x.position(364, 34 + MD);
    room_x.style('width', '50px');
    //room_x.mousePressed(dom__Rooms.show);    
    ///////////////////////////////////////////////
    room_0 = createImg('pic/room/room_0.jpg');
    room_0.position(364, 34 + MD);
    room_0.style('width', '50px');
    room_0.hide();
    room_0.mousePressed(dom__Rooms.show);
    room_0.mouseOver(function(){room_0.style('width', '49px');});
    room_0.mouseOut (function(){room_0.style('width', '50px');});
    ///////////////////////////////////////////////
    room_1 = createImg('pic/room/room_1.jpg');
    room_1.position(364, 34 + MD);
    room_1.style('width', '50px');
    room_1.hide();
    room_1.mousePressed(dom__Rooms.show);
    room_1.mouseOver(function(){room_1.style('width', '49px');});
    room_1.mouseOut (function(){room_1.style('width', '50px');});
    ///////////////////////////////////////////////   
    room_2 = createImg('pic/room/room_2.jpg');
    room_2.position(364, 34 + MD);
    room_2.style('width', '50px');
    room_2.hide();
    room_2.mousePressed(dom__Rooms.show);
    room_2.mouseOver(function(){room_2.style('width', '49px');});
    room_2.mouseOut (function(){room_2.style('width', '50px');});
    ///////////////////////////////////////////////     
    room_3 = createImg('pic/room/room_3.jpg');
    room_3.position(364, 34 + MD);
    room_3.style('width', '50px');
    room_3.hide();
    room_3.mousePressed(dom__Rooms.show); 
    room_3.mouseOver(function(){room_3.style('width', '49px');});
    room_3.mouseOut (function(){room_3.style('width', '50px');});
    ///////////////////////////////////////////////      
    
    
    
    /////////////////////////////////////////////// 
    Sav_000 = createImg('pic/Save_0.png');// virtula system board
    Sav_000.position(W1.X + W1.SizeW - 75, W1.Y + 23);
    Sav_000.style('width', '75px');
    ///////////////////////////////////////////////   
    Sav_001 = createImg('pic/Save_1.png');
    Sav_001.position(W1.X + W1.SizeW - 75, W1.Y + 23);
    Sav_001.style('width', '75px');
    Sav_001.mousePressed(doSave);
    Sav_001.hide();
    Sav_001.mouseOver(function(){Sav_001.style('width', '74px');});
    Sav_001.mouseOut (function(){Sav_001.style('width', '75px');});
    ///////////////////////////////////////////////
    Sav_002 = createImg('pic/Save_2.png');
    Sav_002.position(W1.X + W1.SizeW - 75, W1.Y + 23);
    Sav_002.style('width', '75px');;
    Sav_002.hide();
    Sav_002.mouseOver(function(){Sav_002.style('width', '74px');});
    Sav_002.mouseOut (function(){Sav_002.style('width', '75px');});
    ///////////////////////////////////////////////
    //Menu_Text[6] = new _Menu_Text(W1.X + W1.SizeW - 45+10, W1.Y +81 ,"save",100);
    ///////////////////////////////////////////////   
    Opt_1 = createImg('pic/options.png');
    Opt_1.position(W3.X + W3.SizeW - 68, W3.Y + 24);
    Opt_1.style('width', '60px');
    //Opt_1.style('height','40px');  
    Opt_1.mousePressed(dom__Options.show);
    Opt_1.show();
    Opt_1.mouseOver(function(){Opt_1.style('width', '59px');});
    Opt_1.mouseOut (function(){Opt_1.style('width', '60px');});
    ///////////////////////////////////////////////
    Menu_Text[6] = new _Menu_Text(W3.X + W3.SizeW - 38, 97 + MD, xText[20], 0); //"Options"
    ///////////////////////////////////////////////


    //##########################################################################
    dom__W2_Button_right = createImg('pic/Rig.png');
    dom__W2_Button_right.position(W2.X + W2.SizeW - 30, W2.Y + 22);
    dom__W2_Button_right.style('width', '25px');
    dom__W2_Button_right.mousePressed(dom__W2_right_left_1);
    dom__W2_Button_right.show();
    //////////////////////////////////////////////////
    dom__W2_Button_Left = createImg('pic/Lef.png');
    dom__W2_Button_Left.position(W2.X + W2.SizeW - 30, W2.Y + 22);
    dom__W2_Button_Left.style('width', '25px');
    dom__W2_Button_Left.mousePressed(dom__W2_right_left_0);
    dom__W2_Button_Left.hide();
    //##########################################################################
    Menu_Con_disconnected();
}

function Rooms_Enable(){
	room_0.hide();
	room_1.hide();
	room_2.hide();
	room_3.hide();
	room_x.hide();
    switch (iot__ROOM){
	    case 0:room_0.show();break;
	    case 1:room_1.show();break;
	    case 2:room_2.show();break;
	    case 3:room_3.show();break;
	    default:
	        break;
	}
}
function Rooms_Disable() {
	room_0.hide();
	room_1.hide();
	room_2.hide();
	room_3.hide();
	room_x.show();
}

function Menu_Con_hide() {
    //con_001.hide();
    con_002.hide();
    con_003.hide();
    con_004.hide();
    term_1.hide();
    term_2.hide();
    mod_1.hide();
    mod_2.hide();
    line_1.hide();
    line_2.hide();
}
function Menu_Con_Password(){
	dom__Connect.show();
}
function Menu_Con_Connect() {
    Menu_Con_hide()
    con_003.show();
    term_1.show();
    line_2.show();
    mod_1.show();
    Menu_Text[0].text = xText[5];
    //dom__Terminal.show();
    doConnect();
    
}
function Menu_Con_disconnected() {	
    Menu_Con_hide()
    con_002.show();
    term_1.show();
    line_2.show();
    mod_1.show();  
    dom__Connect.show();
}
function Menu_Con_Connected() {	
    Menu_Con_hide()
    con_004.show();
    term_2.show();
    line_1.show();
    mod_2.show();
    Rooms_Enable();
    dom__Terminal.show();
}
function Menu_Con_disconnect() {
    Menu_Con_disconnected()
    doDisconnect();
    Rooms_Disable();
    
    //dom__Connect.show();
    info.announce(3, "", "Communication with MAXIOT server is closed");
    
    RX_Counter = 0;
    TX_Counter = 0;
    var i;
    iot__Interconn.splice(0, iot__Interconn.length);
    for (i = 0; i < iot__Device.length; i++) {
        iot__OutPut[i].splice(0, iot__OutPut.length);
        iot__InPut[i].splice(0, iot__InPut.length);
   }
    iot__Device.splice(0, iot__Device.length);
    
    
  
    
}
