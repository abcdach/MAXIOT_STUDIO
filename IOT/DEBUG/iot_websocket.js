









var TO_SYS = "SYS <-- ";
var FROM_SYS = "SYS --> ";
var TO_SER = "SER <-- "
var FROM_SER = "SER --> "

//#############################################################################
//#
//#
//#
//#############################################################################
function doConnect() {

    clearText();
    
    
    
    websocket = new WebSocket("ws://10.0.0.100:3010/");
    websocket.onopen = function(evt) {
        onOpen(evt);
        Menu_Con_Connected();
    };
    websocket.onclose = function(evt) {
        onClose(evt);
        Menu_Con_disconnect();
        
        
        
    };
    websocket.onmessage = function(evt) {
        onMessage(evt);
    };
    websocket.onerror = function(evt) {
        onError(evt);
    };
}

function onOpen(evt) {
    Read_REG_STEP = 0;
    Read_REG();
    
    

    Term_Text = "";
    Term_textarea1.value(Term_Text);
    TERMINAL("connected\n");
}

function onClose(evt) {
    TERMINAL("disconnected\n");
}

function onError(evt) {
    TERMINAL('error: ' + evt.data + '\n');
    websocket.close();
}

function doSend(message) {
    TERMINAL("sent: " + message + '\n');
    websocket.send(message);
}

function TERMINAL(message) {
    Term_Text += message;
    Term_textarea1.value(Term_Text);
}

function sendText() {
    doSend("textis gadacema");
}

function clearText() {
    Term_Text = "";
    Term_textarea1.value(Term_Text);
}

function doDisconnect() {
    Read_REG_STEP = 0;
    websocket.close();
}

function websocket_send(Msg) {
    websocket.send(Msg);
}





var Read_REG_SPEED = 10;
var Read_REG_STEP = 0;
var Read_REG_FRAME = 0;
var Read_REG_STEP_ENABLE = 0;
var Read_REG_TEXT = 0;
var READ_INDEX = 0;
var COMM = 1;
function Read_REG() {
    setTimeout(_Read_REG, Read_REG_SPEED);
    Read_REG_STEP_ENABLE = 1;
    //Read_REG_STEP = 1;
    Read_REG_STEP = 4;
    READ_INDEX = 0;
}

function _Read_REG() {
    switch (Read_REG_STEP) {
    case 0:
        break;
    case 1:
        setTimeout(_Read_REG, Read_REG_SPEED);
        break;      
    case 2:
        setTimeout(_Read_REG, Read_REG_SPEED);
        break;;    
    case 3:
        setTimeout(_Read_REG, Read_REG_SPEED);
        break;   
        
        
        
        
        
    case 4:
        clearText();
        DATA1_NEW.splice(0, DATA1_NEW.length);
        var Msg = "{\"COMM\":\"" + 6 + "\",\"INDEX\":\"" + 0 + "\"}";
        websocket_send(Msg);
        DATA_COU = 0;
        Read_REG_STEP = 5;
        setTimeout(_Read_REG, Read_REG_SPEED);
        break;   
    
     case 5: 
        setTimeout(_Read_REG, 15);
        break;   
    
   
    case 6:
        DATA_PROSSES(); 
        Read_REG_STEP = 4;
        if(changed === 1){
            setTimeout(_Read_REG, 800);
        } else {
            setTimeout(_Read_REG, 800);
        }
        
        break;      

 
 
 
 
 
    default:
        break;
    }
}

var DATA_COU = 0;

var COUNTER_NEW = 0;
var COUNTER_OLD = 0;

var DATA1_NEW = [];
var DATA2_NEW = [];
var DATA3_NEW = [];
var DATA4_NEW = [];
var DATA5_NEW = [];

var DATA1_OLD = [];
var DATA2_OLD = [];
var DATA3_NEW = [];
var DATA4_NEW = [];


var COU = 0;


var changed = 0;


function DATA_PROSSES() {
    
    
    
    
   
    
    
    
    
    
    
    
    var COU_NEW = DATA1_NEW.length;
    var COU_OLD = DATA1_OLD.length;
    
    if(COU_OLD>COU_NEW){
        COU = COU_OLD;
    } else {
        COU = COU_NEW;
    }
 

    changed = 0;
    for (var i = 0; i < COU; i++) {

        var NEW_1 = DATA1_NEW[i];
        var NEW_2 = DATA2_NEW[i];
        var OLD_1 = DATA1_OLD[i];
        //var OLD_2 = DATA2_OLD[i];

        if (typeof OLD_1 === "undefined") {

            OLD_1 = NEW_1;
            
            var size = 12;
            var score = 0.5;
            var myText = "";
            var myText_X = 0;
            var myText_Y = 0;
            var font_size = 12;
            
            var img_height = "24px";
            var img_width = "24px";
            var img_y = "-12px";
            var img_x = "-12px";
            var img = "pic2/001.png";
            
            var img_h_server = 70;
            var img_w_server = 70;
            var img_h_user = 40;
            var img_w_user = 40;
            
            
            var img_h_Device = 45;
            var img_w_Device = 45;
            
             var img_h_rrr = 20;
            var img_w_rrr = 20;      
            
            var Type = 0;
          
            switch (DATA3_NEW[i]) {
            case 0:
                size = 45;
                score = 0;
                myText_X = 0;
                myText_Y = 0;
                font_size = 17;
                myText = "CORE";
                
                var img_h = 100;
                var img_w = 100;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/002.png";
                break;
            case 1://websoket serveri 
                size = 30;
                score = 1;
                font_size = 14;
                myText = "STUDIO";
                
                
                var img_h = img_h_server;
                var img_w = img_w_server;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/x001.png";
                break;      
            case 11:
                size = 20;
                score = 3;
                font_size = 13;
                myText = DATA4_NEW[i];
                //myText = "";
                
                var img_h = img_h_user;
                var img_w = img_w_user;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/y001.png";
                break;;    
            case 111:
                size = 7;
                score = 2;
                myText_X = 0;
                myText_Y -= size + 10;
                font_size = 10;
                myText = DATA4_NEW[i];
                
                var img_h = img_h_rrr;
                var img_w = img_w_rrr;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/r001.png";
                break;
            case 2:// info
                size = 30;
                score = 1;
                font_size = 14;
                myText = "INFO";
                
                var img_h = img_h_server;
                var img_w = img_w_server;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/x001.png";
                break;      
            case 22:
                size = 20;
                score = 3;
                font_size = 13;
                myText = DATA4_NEW[i];
                //myText = "";
                
                var img_h = img_h_user;
                var img_w = img_w_user;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/y001.png";
                break;
            case 3: // vidiv
                size = 30;
                score = 1;
                font_size = 14;
                myText = "ViDIV";
                
                var img_h = img_h_server;
                var img_w = img_w_server;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/x001.png";
                break;      
            case 33: 
                size = 20;
                score = 4;
                font_size = 13;
                myText = DATA4_NEW[i];
                
                var img_h = img_h_Device;
                var img_w = img_w_Device;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/z001.png";
                break;
            case 4://mediator
                size = 30;
                score = 1;
                font_size = 14;
                myText = "ME";
                
                var img_h = img_h_server;
                var img_w = img_w_server;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/x001.png";
                break;      
            case 44:
                size = 20;
                score = 4;
                font_size = 13;
                myText = DATA4_NEW[i];
                
                var img_h = img_h_Device;
                var img_w = img_w_Device;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/z001.png";
                break;;    
            case 444:
                size = 7;
                score = 2;
                myText_X = 0;
                myText_Y -= size + 10;
                font_size = 10;
                myText = DATA4_NEW[i]+"("+DATA5_NEW[i]+")";
                
                var img_h = img_h_rrr;
                var img_w = img_w_rrr;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/r001.png";
                break;
                
            case 5:// soket sserveri
                size = 30;
                score = 1;
                font_size = 14;
                myText = "DE";
                
                var img_h = img_h_server;
                var img_w = img_w_server;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/x001.png";
                break;      
            case 55:
                size = 20;
                score = 4;
                font_size = 13;
                myText = DATA4_NEW[i];
                
                var img_h = img_h_Device;
                var img_w = img_w_Device;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/z001.png";
                break;;    
            case 555:
                size = 7;
                score = 2;
                myText_X = 0;
                myText_Y -= size + 10;
                font_size = 10;
                myText = DATA4_NEW[i]+"("+DATA5_NEW[i]+")";
                
                var img_h = img_h_rrr;
                var img_w = img_w_rrr;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/r001.png";
                break;             
                
            case 7:// websoket sensor
                size = 30;
                score = 1;
                font_size = 14;
                myText = "WE";
                
                var img_h = img_h_server;
                var img_w = img_w_server;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/x001.png";
                break;      
            case 77:
                size = 20;
                score = 4;
                font_size = 13;
                myText = DATA4_NEW[i];
                break;;    
            case 777:
                size = 7;
                score = 2;
                myText_X = 0;
                myText_Y -= size + 10;
                font_size = 10;
                myText = DATA4_NEW[i]+"("+DATA5_NEW[i]+")";
                
                var img_h = img_h_rrr;
                var img_w = img_w_rrr;
                img_height = img_h+"px";
                img_width =  img_w+"px";
                img_y = "-"+img_h/2+"px";
                img_x = "-"+img_w/2+"px";
                img = "pic2/r001.png";
                break;              
            default:
                break;
            }
  
            
            DATA1_OLD[i] = OLD_1;
            nodes[i] = {"id": OLD_1, "size": size, "color": score, "myText": myText,
                "myText_X": myText_X, "myText_Y": myText_Y, "font_size": font_size,
                "img": img, "img_x": img_x, "img_y": img_y, "img_width": img_width, "img_height": img_height, "Type": Type};
            
            var ii = FINDE_NODE(NEW_2);
            if (ii !== -1){
                links[i] = {source: nodes[i], target: nodes[ii]};
            }
            
           // start();
           changed = 1;

        }
        else if (typeof NEW_1 === "undefined") {
            nodes.splice(i, 1);
            links.splice(i, 1);
            DATA1_OLD.splice(i, 1);
            changed = 1;
            COU --;
            i --;
        }
        else if (NEW_1 !== OLD_1) {
            nodes.splice(i, 1);
            links.splice(i, 1);
            DATA1_OLD.splice(i, 1);
            changed = 1;
            COU --;
            i --;
        }       

    }   
    
    if(changed === 1){
        start();
    }
}

function FINDE_NODE(NODE) {
    for (var i = 0; i < DATA1_NEW.length; i++){
        if(NODE === DATA1_NEW[i]) return i;
    }
    return -1;
}

//#############################################################################
//#
//#
//#
//#############################################################################
var JSON_FRAME_Counter = 0;
var JSON_VALUE;
var JSON_PARSE;
var JSON_DATA = [];
function onMessage(evt) {
    JSON_FRAME_Counter ++; 
    WebS_1_Text.html(JSON_FRAME_Counter);
    
    //Menu_Text[1].text = JSON_FRAME_Counter ++; 
    //TERMINAL(FROM_SER + evt.data + '\n');
    Term_Inp2.value(evt.data);
    ////////////////////////////////////////////////////////////////
    JSON_PARSE = JSON.parse(evt.data);
    ////////////////////////////////////////////////////////////////
    JSON_VALUE = JSON_PARSE.COMM;
    ////////////////////////////////////////////////////////////////
    if (typeof JSON_VALUE !== "undefined") {
        switch (Number(JSON_VALUE)) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            COMM_PROSSES_2();
            break;
        default:
            break;
        }
    }
    return 1;
}
var _WebS_1 = 0;
var _WebS_2 = 0;
var _MED1_1 = 0;
var _MED1_2 = 0;
var _INFO_1 = 0;
var _SokDev_1 = 0;
var _SokDev_2 = 0;
var _WebDev_1 = 0;
var _WebDev_2 = 0;
var _VIDIV_1 = 0;
function COMM_PROSSES_2() {
    ////////////////////////////////////////////////////////////////
    JSON_VALUE = JSON_PARSE.INDEX;
    ////////////////////////////////////////////////////////////////
    if (typeof JSON_VALUE !== "undefined") {
        //#--------------------------------------------------------------
            JSON_DATA[0] = Number(JSON_VALUE);
        //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.d0;
            if (typeof JSON_VALUE !== "undefined")JSON_DATA[1] = Number(JSON_VALUE);
        //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.d1;
            if (typeof JSON_VALUE !== "undefined")JSON_DATA[2] = Number(JSON_VALUE);
        //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.d2;
            if (typeof JSON_VALUE !== "undefined")JSON_DATA[3] = Number(JSON_VALUE);
        //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.d3;
            if (typeof JSON_VALUE !== "undefined")JSON_DATA[4] = Number(JSON_VALUE);
        //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.d4;
            if (typeof JSON_VALUE !== "undefined")JSON_DATA[5] = Number(JSON_VALUE);
        //#--------------------------------------------------------------
        //TERMINAL(FROM_SER + JSON_DATA[0] + " rrrrrr "+ JSON_DATA[1] + '\n');
        if(JSON_DATA[1] === -1){
             Read_REG_STEP = 6;
             

            ////////////////////////////////////////////////
            if (!WebS_1.elt.checked){
                _WebS_1 = 1;
            } else _WebS_1 = 0;
            if (!WebS_2.elt.checked){
                _WebS_2 = 1;
            } else _WebS_2 = 0;           
            ////////////////////////////////////////////////
            if (!MED1_1.elt.checked){
                _MED1_1 = 1;
            } else _MED1_1 = 0; 
            if (!MED1_2.elt.checked){
                _MED1_2 = 1;
            } else _MED1_2 = 0;        
            ////////////////////////////////////////////////
            if (!INFO_1.elt.checked){
                _INFO_1 = 1;
            } else _INFO_1 = 0;        
            ////////////////////////////////////////////////
            if (!SokDev_1.elt.checked){
                _SokDev_1 = 1;
            } else _SokDev_1 = 0; 
            if (!SokDev_2.elt.checked){
                _SokDev_2 = 1;
            } else _SokDev_2 = 0;         
            ////////////////////////////////////////////////
            if (!WebDev_1.elt.checked){
                _WebDev_1 = 1;
            } else _WebDev_1 = 0; 
            if (!WebDev_2.elt.checked){
                _WebDev_2 = 1;
            } else _WebDev_2 = 0;         
            ////////////////////////////////////////////////
            if (!VIDIV_1.elt.checked){
                _VIDIV_1 = 1;
            } else _VIDIV_1 = 0; 
             
             
             
        }else{
            
            ////////////////////////////////////////////////
            if (_WebS_1){
                if(JSON_DATA[3]===1) return;
                if(JSON_DATA[3]===11) return;
                if(JSON_DATA[3]===111) return;
            } 
            if (_WebS_2){
                if(JSON_DATA[3]===111) return;
            }           
            ////////////////////////////////////////////////
            if (_MED1_1){
                if(JSON_DATA[3]===4) return;
                if(JSON_DATA[3]===44) return;
                if(JSON_DATA[3]===444) return;
            } 
            if (_MED1_2){
                if(JSON_DATA[3]===444) return;
            }        
            ////////////////////////////////////////////////
            if (_INFO_1){
                if(JSON_DATA[3]===2) return;
                if(JSON_DATA[3]===22) return;
            }        
            ////////////////////////////////////////////////
            if (_SokDev_1){
                if(JSON_DATA[3]===5) return;
                if(JSON_DATA[3]===55) return;
                if(JSON_DATA[3]===555) return;
            } 
            if (_SokDev_2){
                if(JSON_DATA[3]===555) return;
            }         
            ////////////////////////////////////////////////
            if (_WebDev_1){
                if(JSON_DATA[3]===7) return;
                if(JSON_DATA[3]===77) return;
                if(JSON_DATA[3]===777) return;
            } 
            if (_WebDev_2){
                if(JSON_DATA[3]===777) return;
            }         
            ////////////////////////////////////////////////
            if (_VIDIV_1){
                if(JSON_DATA[3]===3) return;
                if(JSON_DATA[3]===33) return;
                if(JSON_DATA[3]===333) return;
            } 
//            if (!VIDIV_2.elt.checked){
//                if(JSON_DATA[3]===111) return;
//            } 
            
            
            
         
            
            TERMINAL(JSON_DATA[0] + "-"+ JSON_DATA[1] + "-"+ JSON_DATA[2] + "-"+ JSON_DATA[3] +  "-"+ JSON_DATA[4] + "-"+ JSON_DATA[5] + '\n');

            DATA1_NEW[DATA_COU] = JSON_DATA[1];
            DATA2_NEW[DATA_COU] = JSON_DATA[2];
            DATA3_NEW[DATA_COU] = JSON_DATA[3];
            DATA4_NEW[DATA_COU] = JSON_DATA[4];
            DATA5_NEW[DATA_COU] = JSON_DATA[5];
            DATA_COU ++;

            
       
        }
    }     
}


































