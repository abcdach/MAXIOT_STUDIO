




function dom__hide_all() {
    dom__Terminal.hide();
    dom__Filter.hide();
}



    var WebS_1;
    var WebS_2;
    var WebS_1_Text;
    var MED1_1;
    var MED1_2;
    var MED1_1_Text;
    var INFO_1;
    var INFO_1_Text;
    var SokDev_1;
    var SokDev_2;
    var SokDev_1_Text;
    var WebDev_1;
    var WebDev_2;
    var WebDev_1_Text;
    var VIDIV_1;
    var VIDIV_1_Text;
function OBJECT_Filter() {
    YYY = 0;
    XXX = 70;
    YYYY = 20;
    //////////////////////////////////////////////////////////////////
    WebS_1 = createInput(0,1,0);               
    WebS_1.attribute("type","checkbox");     
    WebS_1.position(XXX - 30, 100 +  YYY);
    WebS_1.attribute('checked', null);  
    WebS_1.value("on");
    WebS_1.value("off");

    WebS_2 =  createInput(0,1,0);               
    WebS_2.attribute("type","checkbox");     
    WebS_2.position(XXX, 100 + YYY);
    WebS_2.attribute('checked', null);  
    WebS_2.value("on");
    WebS_2.value("off");  
    
    WebS_1_Text = createP("Websocket client server");
    WebS_1_Text.position(XXX + 30, 100 + YYY - 15 );
    //WebS_1_Text.html("WebS");
    //////////////////////////////////////////////////////////////////
    YYY += YYYY;
    //////////////////////////////////////////////////////////////////
    MED1_1 =  createInput(0,1,0);               
    MED1_1.attribute("type","checkbox");     
    MED1_1.position(XXX - 30, 100 +  YYY);
    MED1_1.attribute('checked', null);  
    MED1_1.value("on");
    MED1_1.value("off");

    MED1_2 =  createInput(0,1,0);               
    MED1_2.attribute("type","checkbox");     
    MED1_2.position(XXX, 100 + YYY);
    MED1_2.attribute('checked', null);  
    MED1_2.value("on");
    MED1_2.value("off");  
    
    MED1_1_Text = createP("Mediator");
    MED1_1_Text.position(XXX + 30, 100 + YYY - 15 );
    //WebS_1_Text.html("WebS");
    //////////////////////////////////////////////////////////////////  
    YYY += YYYY;
    //////////////////////////////////////////////////////////////////
    INFO_1 =  createInput(0,1,0);               
    INFO_1.attribute("type","checkbox");     
    INFO_1.position(XXX - 30, 100 +  YYY);
    INFO_1.attribute('checked', null);  
    INFO_1.value("on");
    INFO_1.value("off");
    
    INFO_1_Text = createP("Info Server");
    INFO_1_Text.position(XXX + 30, 100 + YYY - 15 );
    //WebS_1_Text.html("WebS");
    //////////////////////////////////////////////////////////////////   
    YYY += YYYY;
    //////////////////////////////////////////////////////////////////
    SokDev_1 =  createInput(0,1,0);               
    SokDev_1.attribute("type","checkbox");     
    SokDev_1.position(XXX - 30, 100 +  YYY);
    SokDev_1.attribute('checked', null);  
    SokDev_1.value("on");
    SokDev_1.value("off");

    SokDev_2 =  createInput(0,1,0);               
    SokDev_2.attribute("type","checkbox");     
    SokDev_2.position(XXX, 100 + YYY);
    SokDev_2.attribute('checked', null);  
    SokDev_2.value("on");
    SokDev_2.value("off");  
    
    SokDev_1_Text = createP("Socket device server");
    SokDev_1_Text.position(XXX + 30, 100 + YYY - 15 );
    //WebS_1_Text.html("WebS");
    //////////////////////////////////////////////////////////////////   
    YYY += YYYY;
    //////////////////////////////////////////////////////////////////
    WebDev_1 =  createInput(0,1,0);               
    WebDev_1.attribute("type","checkbox");     
    WebDev_1.position(XXX - 30, 100 +  YYY);
    WebDev_1.attribute('checked', null);  
    WebDev_1.value("on");
    WebDev_1.value("off");

    WebDev_2 =  createInput(0,1,0);               
    WebDev_2.attribute("type","checkbox");     
    WebDev_2.position(XXX, 100 + YYY);
    WebDev_2.attribute('checked', null);  
    WebDev_2.value("on");
    WebDev_2.value("off");  
    
    WebDev_1_Text = createP("Websocket device server");
    WebDev_1_Text.position(XXX + 30, 100 + YYY - 15 );
    //WebS_1_Text.html("WebS");
    //////////////////////////////////////////////////////////////////  
    YYY += YYYY;
    //////////////////////////////////////////////////////////////////
    VIDIV_1 =  createInput(0,1,0);               
    VIDIV_1.attribute("type","checkbox");     
    VIDIV_1.position(XXX - 30, 100 +  YYY);
    VIDIV_1.attribute('checked', null);  
    VIDIV_1.value("on");
    VIDIV_1.value("off");  
    
    VIDIV_1_Text = createP("Virtual device");
    VIDIV_1_Text.position(XXX + 30, 100 + YYY - 15 );
    //WebS_1_Text.html("WebS");
    //////////////////////////////////////////////////////////////////     
    this.show = function() {
        dom__hide_all();
        
        WebS_1.show();
        WebS_2.show();
        WebS_1_Text.show();
        MED1_1.show();
        MED1_2.show();
        MED1_1_Text.show();
        INFO_1.show();
        INFO_1_Text.show();
        SokDev_1.show();
        SokDev_2.show();
        SokDev_1_Text.show();
        WebDev_1.show();
        WebDev_2.show();
        WebDev_1_Text.show();
        VIDIV_1.show();
        VIDIV_1_Text.show();
    };
    this.hide = function() {
        WebS_1.hide();
        WebS_2.hide();
        WebS_1_Text.hide();
        MED1_1.hide();
        MED1_2.hide();
        MED1_1_Text.hide();
        INFO_1.hide();
        INFO_1_Text.hide();
        SokDev_1.hide();
        SokDev_2.hide();
        SokDev_1_Text.hide();
        WebDev_1.hide();
        WebDev_2.hide();
        WebDev_1_Text.hide();
        VIDIV_1.hide();
        VIDIV_1_Text.hide();
    };
    

        
}









//#--------------------------------------------------
//#     Menu Terminal
//#--------------------------------------------------
var Term_Inp2;
var Term_Text;
var Term_textarea1;
var dom__Terminal;

var OBJECT_X = 20;
var OBJECT_Y = 100;

function OBJECT_Terminal() {
    var MD = -10;
    XX = OBJECT_X;
    YY = OBJECT_Y;
    
    //////////////////////////////////////
    Term_Inp2_P1 = createP(xText[18]);
    Term_Inp2_P1.hide();
    Term_Inp2_P1.style('font-size', '10pt');
    Term_Inp2_P1.style('font-family', 'Arial');
    Term_Inp2_P1.style('font-color', '100');
    Term_Inp2_P1.style('font-weight', 'bold');
    Term_Inp2_P1.style('font-style', 'italic')
    Term_Inp2_P1.position(XX + 10, YY + MD);
    Term_Inp2_P1.hide();
    ////////////////////////////////////// 
    Term_Inp2 = createInput();
    Term_Inp2.style('width', '275px');
    Term_Inp2.position(XX + 10, YY + 30 + MD);
    Term_Inp2.hide();
    //////////////////////////////////////
    Term_textarea1 = createElement('textarea', 'im an h2 p5.element!');
    Term_textarea1.style('width', '275px');
    Term_textarea1.style('height', '320px');
    Term_textarea1.position(XX + 10, YY + 80 + MD);
    Term_textarea1.hide();
    ////////////////////////////////////// 
    this.show = function() {
        dom__hide_all();
        
        Term_Inp2.show();
        Term_textarea1.show();
        //Term_Inp2_P1.show();
        //Term_Inp2_P2.show();
    };
    this.hide = function() {
        Term_Inp2.hide();
        Term_textarea1.hide();
        Term_Inp2_P1.hide();
        //Term_Inp2_P2.hide();
    };
}

//#--------------------------------------------------
//#     Menu Device
//#--------------------------------------------------



//#--------------------------------------------------
//#     Menu UP meniu
//#--------------------------------------------------
//var con_001;
var con_002;
var con_003;
var con_004;
var line_1;
var term_1;
var term_2;
var mod_1;
var mod_2;
var con_p1;
//var Inf_1;
var Opt_1;


//    Term_Inp2_P2 = createP(xText[17]);//"Command Packets:"
//    //Term_Inp2_P2.style('width', '288px');
//    Term_Inp2_P2.hide();
//    Term_Inp2_P2.style('font-size', '10pt');
//    Term_Inp2_P2.style('font-family', 'Arial');
//    Term_Inp2_P2.style('font-color', '100');
//    //Term_Inp2_P2.style('textAlign','CENTER');
//    Term_Inp2_P2.style('font-weight', 'bold');
//    Term_Inp2_P2.style('font-style', 'italic')
//    Term_Inp2_P2.position(



function Menu_init() {
    var MD = - 10;


    WebS_1_Text = createP("1333333");
    WebS_1_Text.style('font-size', '10pt');
    WebS_1_Text.position(135, 27 + MD);
    //WebS_1_Text.html("WebS");


    ///////////////////////////////////////////////
    con_002 = createImg('pic/1_con_002.png');
    con_002.position(35, 39 + MD);
    con_002.style('width', '75px');
    con_002.style('height', '40px');
    con_002.mousePressed(Menu_Con_Connect);;
    ///////////////////////////////////////////////
    con_003 = createImg('pic/1_con_003.png');
    con_003.position(35, 39 + MD)
    con_003.style('width', '75px');
    con_003.style('height', '40px');   
    ///////////////////////////////////////////////
    con_004 = createImg('pic/1_con_004.png');
    con_004.position(35, 39 + MD)
    con_004.style('width', '75px');
    con_004.style('height', '40px');
    con_004.mousePressed(Menu_Con_disconnect);
    ///////////////////////////////////////////////
    line_1 = createImg('pic/line_1.png');
    line_1.position(120, 53 + MD);
    line_1.style('width', '80px');
    line_1.style('height', '17px');
    ///////////////////////////////////////////////
    term_1 = createImg('pic/term1.png');
    term_1.position(210, 30 + MD);
    term_1.style('width', '55px');
    term_1.mousePressed( dom__Terminal.show);
    ///////////////////////////////////////////////
    term_2 = createImg('pic/term2.png');
    term_2.position(210, 30 + MD);
    term_2.style('width', '55px');
    term_2.mousePressed( dom__Terminal.show);
    ///////////////////////////////////////////////
    mod_1 = createImg('pic/mod1.png');
    mod_1.position(280, 30 + MD);
    mod_1.style('width', '55px');
    mod_1.mousePressed(dom__Filter.show);
    ///////////////////////////////////////////////
    mod_2 = createImg('pic/mod2.png');
    mod_2.position(280, 30 + MD);
    mod_2.style('width', '55px');
    mod_2.mousePressed(dom__Filter.show);
    /////////////////////////////////////////////// 

    Menu_Con_disconnected();

}

    
    
    
function Menu_Con_hide() {
    con_002.hide();
    con_003.hide();
    con_004.hide();
    term_1.hide();
    term_2.hide();
    mod_1.hide();
    mod_2.hide();
}

function Menu_Con_Connect() {
    Menu_Con_hide()
    con_003.show();
    term_1.show();
    mod_1.show();
    doConnect();
}

function Menu_Con_disconnected() {
    Menu_Con_hide()
    con_002.show();
    term_1.show();
    mod_1.show();
}

function Menu_Con_Connected() {
    Menu_Con_hide()
    con_004.show();
    term_2.show();
    mod_2.show();
}

function Menu_Con_disconnect() {
    Menu_Con_disconnected()
    doDisconnect();

    RX_Counter = 0;
    TX_Counter = 0;
}
//#--------------------------------------------------
//#     
//#--------------------------------------------------

function setup__menu(){
    dom__Terminal = new OBJECT_Terminal(10, 10);
    dom__Terminal.hide()
    dom__Filter = new OBJECT_Filter();
    dom__Filter.show()
    Menu_init();
}


















