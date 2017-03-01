//var TO_SYS = "### <-- ";
//var FROM_SYS = "### --> ";
var SYS_TIME_SEC;
var TO_SYS = "###  ";
var FROM_SYS = "###  ";
var TO_SER = "SER <-- "
var FROM_SER = "SER --> "
var counter = 0;
var Data_Error_ignore = 0;
var ERROR_Num = 0;
var ERROR_Description = "undefined";
//#############################################################################
//#
//#
//#
//#############################################################################
function doConnect() {
    clearText();
       
    if(iot__local_STATUS === 1){
    	websocket = new WebSocket("ws://" + SERVER_IP + ":" + SERVER_PORT + "/");
    }
    websocket.onopen = function(evt) {
        onOpen(evt);
        Menu_Con_Connected();
        Menu_Text[0].text = xText[21]; //"Connected"
        W1._Text(xText[2]+iot__ROOM);
    };
    websocket.onclose = function(evt) {
        onClose(evt);
        Menu_Con_disconnect();
        Menu_Text[0].text = xText[6]; //"Disconnected"
        W1._Text(xText[2]);
    };
    websocket.onmessage = function(evt) {
        onMessage(evt);
    };
    websocket.onerror = function(evt) {
        onError(evt);
    };
}

function onOpen(evt) {
    counter = 0;
    Term_Text = "";
    Term_textarea1.value(Term_Text);
    TERMINAL("connected\n");
    info.announce(1, "", xText[4]);
    WSTEP = 0;
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
    SYS_STEP = 0;
    WSTEP = 0;
    websocket.close();
}

var TX_Counter = 0;

function websocket_send(Msg) {
    websocket.send(Msg);
    Menu_Text[2].text = TX_Counter++;
}

//#############################################################################
//#
//#
//#
//#############################################################################

document.write('<script type="text/javascript" src="js/websock/SAVE.js"></script>');
document.write('<script type="text/javascript" src="js/websock/Save_Devices.js"></script>');
document.write('<script type="text/javascript" src="js/websock/Save_Interconn.js"></script>');
document.write('<script type="text/javascript" src="js/websock/MyBase64.js"></script>');
document.write('<script type="text/javascript" src="js/websock/Save_CODE.js"></script>');
document.write('<script type="text/javascript" src="js/websock/Read_CODE.js"></script>');
document.write('<script type="text/javascript" src="js/websock/Save_InPut.js"></script>');
document.write('<script type="text/javascript" src="js/websock/Save_OutPut.js"></script>');
document.write('<script type="text/javascript" src="js/websock/CREATE_DEVICE.js"></script>');


document.write('<script type="text/javascript" src="js/websock/Save_OutPut_Config.js"></script>');
document.write('<script type="text/javascript" src="js/websock/Read_OutPut_Config.js"></script>');


//#############################################################################
//#
//#
//#
//#############################################################################

var RX_Counter = 0;

function onMessage(evt) {
    Menu_Text[1].text = RX_Counter++;

    //TERMINAL('$$$ ' + evt.data + '\n');
   // Term_Inp2.value(evt.data);
    Terminal_Data_Packets.text = evt.data;
    var JSON_VALUE;
    var JSON_PARSE = JSON.parse(evt.data);
    ////////////////////////////////////////////////////////////////
    JSON_VALUE = JSON_PARSE.C;
    ////////////////////////////////////////////////////////////////
    if (typeof JSON_VALUE !== "undefined") {
        //#--------------------------------------------------------------
        var C_Val = Number(JSON_VALUE);
        var D_Val = 0;
        var S_Val = 0;
        var V_Val = "";
        var T_Val = 0;
        //#--------------------------------------------------------------
        JSON_VALUE = JSON_PARSE.D;
        if (typeof JSON_VALUE === "undefined") return 1;
        D_Val = Number(JSON_VALUE);
        //#########################################################
        if (C_Val === 0) {// Data channel    
            //#--------------------------------------------------------------
            	JSON_VALUE = JSON_PARSE.S;
            	if (typeof JSON_VALUE === "undefined") return 1;
            	S_Val = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            	JSON_VALUE = JSON_PARSE.V;
            	if (typeof JSON_VALUE === "undefined") return 1;
            	V_Val = JSON_VALUE;
            //#--------------------------------------------------------------  
        		API_iot_PUT__OutPut_DATA(D_Val, S_Val, V_Val);
        		API_iot_CHANGE__OUTPUT_UNIX_TIME(D_Val, S_Val, SYS_TIME_SEC); 
        }
        //#########################################################
        if (C_Val === 2) { // Error channel
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.V;
            if (typeof JSON_VALUE === "undefined") return 1;
            V_Val = JSON_VALUE;
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.T;
            if (typeof JSON_VALUE !== "undefined") T_Val = Number(JSON_VALUE);
        	//*********************************************************************
            //**
        	//*********************************************************************
            if (Data_Error_ignore === 0) {
            	if(T_Val===0){
            		info.announce(Info_Type_error, "Device: " + D_Val + " error !!!", V_Valy);
            	}
            	if(T_Val===1){
            		info.announce(Info_Type_error, "Device: " + D_Val + " error !!!", Base64.decode(V_Val));	
            	}
            }
        }
        //#########################################################
        if (C_Val === 3) { // info channel
            //JSON_VALUE = JSON_PARSE.N;
            //if (typeof JSON_VALUE !== "undefined"){
            //    switch (Number(JSON_VALUE)) {
            //    case 20:
            //    	API_iot_CHANGE__Device_Description(D_Val, V_Val);
            //        break;
            //    default:
            //        break;
            //    }    
            //}
        }
        //#########################################################
        if (C_Val === 4) { // CHANGE_DEVICE_Description
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.V;
            if (typeof JSON_VALUE === "undefined") return 1;
            V_Val = JSON_VALUE;
        	//*********************************************************************
            //**
        	//*********************************************************************
            
            API_iot_CHANGE__Device_Description(D_Val, V_Val);
            API_iot_CHANGE__Device_OnlineStatus(D_Val, 1);
        }
        //#########################################################
        if (C_Val === 5) { // DEVICE DE DISCONECTED
            API_iot_CHANGE__Device_OnlineStatus(D_Val, 0);
        }
        //#########################################################
        if (C_Val === 6) { // CHANGE_INPUT_Description
        	JSON_VALUE = JSON_PARSE.V;
        	if (typeof JSON_VALUE === "undefined") return 1;
        	V_Val = JSON_VALUE;
        	
        	JSON_VALUE = JSON_PARSE.IN;
        	if (typeof JSON_VALUE === "undefined") return 1;
        	var IN_Val = JSON_VALUE;
              
        	TERMINAL("INPUT:"+D_Val+"("+IN_Val+") DESCRIP:" + V_Val + '\n');
        	API_iot_CHANGE__INPUT_Description(D_Val, IN_Val, V_Val);
        }
        //#########################################################
        if (C_Val === 7) { // CHANGE_OUTPUT_Description
        	JSON_VALUE = JSON_PARSE.V;
        	if (typeof JSON_VALUE === "undefined") return 1;
        	V_Val = JSON_VALUE;
        	
        	JSON_VALUE = JSON_PARSE.IN;
        	if (typeof JSON_VALUE === "undefined") return 1;
        	var OUT_Val = JSON_VALUE;
              
        	TERMINAL("OUTPUT:"+D_Val+"("+OUT_Val+") DESCRIP:" + V_Val + '\n');
        	API_iot_CHANGE__OUTPUT_Description(D_Val, OUT_Val, V_Val);
        }
        //#########################################################
        return 1;
    }

    
    
    //#############################################################
    JSON_VALUE = JSON_PARSE.F;
    if (typeof JSON_VALUE !== "undefined") {	
        switch (Number(JSON_VALUE)){
        case 0:
            break;
        case 1://CREATE DEVICE
        	//TERMINAL(FROM_SER + evt.data + '\n');
            //#--------------------------------------------------------------
        	JSON_VALUE = JSON_PARSE.D;
            if (typeof JSON_VALUE === "undefined") return 1;
            var D_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.X;
            if (typeof JSON_VALUE === "undefined") return 1;
            var X_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.Y;
            if (typeof JSON_VALUE === "undefined") return 1;
            var Y_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.I;
            if (typeof JSON_VALUE === "undefined") return 1;
            var I_Vel = JSON_VALUE;
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.T;
            if (typeof JSON_VALUE === "undefined") return 1;
            var T_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.R;
            if (typeof JSON_VALUE === "undefined") return 1;
            var R_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            API_iot_CREATE__Device(D_Vel, X_Vel, Y_Vel, I_Vel, T_Vel, R_Vel);
            //#--------------------------------------------------------------         	
        	break;
        case 2://CREATE INPUT
        	//TERMINAL(FROM_SER + evt.data + '\n');
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.D;
            if (typeof JSON_VALUE === "undefined") return 1;
            var D_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.S;
            if (typeof JSON_VALUE === "undefined") return 1;
            var S_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.V;
            if (typeof JSON_VALUE === "undefined") return 1;
            var V_Vel = JSON_VALUE;
            //#--------------------------------------------------------------
            API_iot_CREATE_Device_InPut(D_Vel, S_Vel, CREATOR_SQL, 1);
            API_iot_CHANGE__INPUT_Description(D_Vel,S_Vel,V_Vel);
            //#--------------------------------------------------------------  
            break;
        case 3://CREATE OUTPUT
        	//TERMINAL(FROM_SER + evt.data + '\n');
        	//#-------------------------------------------------------------- 
            JSON_VALUE = JSON_PARSE.D;
            if (typeof JSON_VALUE === "undefined") return 1;
            var D_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.S;
            if (typeof JSON_VALUE === "undefined") return 1;
            var S_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.V;
            if (typeof JSON_VALUE === "undefined") return 1;
            var V_Vel = JSON_VALUE;
            //#--------------------------------------------------------------
            API_iot_CREATE_Device_OutPut(D_Vel, S_Vel, CREATOR_SQL, 1);
            API_iot_CHANGE__OUTPUT_Description(D_Vel,S_Vel,V_Vel);
            //#--------------------------------------------------------------
            break;
        case 4://CREATE Interconn
        	//TERMINAL(FROM_SER + evt.data + '\n');
        	//#-------------------------------------------------------------- 
            JSON_VALUE = JSON_PARSE.D1;
            if (typeof JSON_VALUE === "undefined") return 1;
            var D1_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.OU;
            if (typeof JSON_VALUE === "undefined") return 1;
            var OU_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.D2;
            if (typeof JSON_VALUE === "undefined") return 1;
            var D2_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.IN;
            if (typeof JSON_VALUE === "undefined") return 1;
            var IN_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            API_iot_CREATE__Interconn(D1_Vel, OU_Vel, D2_Vel, IN_Vel, CREATOR_SQL);
          //#--------------------------------------------------------------
            break;
        case 5://Read Mediator code
        	TERMINAL(FROM_SER + evt.data + '\n');
        	//#-------------------------------------------------------------- 
            JSON_VALUE = JSON_PARSE.R;
        	if (typeof JSON_VALUE === "undefined") return 1;
            Read_CODE_FRAME = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.T;
            if (typeof JSON_VALUE === "undefined") return 1;
            if (Read_CODE_FRAME === 255) {            
                iot__CODE_Len  = Number(JSON_VALUE);
            } else {
                Read_CODE_TEXT = JSON_VALUE;
            }
            //#--------------------------------------------------------------
        	break;
        case 6://Read web mob sensor code
        	TERMINAL(FROM_SER + evt.data + '\n');
        	//#-------------------------------------------------------------- 
            JSON_VALUE = JSON_PARSE.R;
            if (typeof JSON_VALUE === "undefined") return 1;
            var xxx = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.T;
            if (typeof JSON_VALUE === "undefined") return 1;
            if (xxx === 255) {                   
                R_InOut_Config_LEN = Number(JSON_VALUE);
            } else {
                R_InOut_Config_JSON = JSON_VALUE;
            }
        	break;
        case 7://DELETE DEVICE
        	//TERMINAL(FROM_SER + evt.data + '\n');
        	//#-------------------------------------------------------------- 
            JSON_VALUE = JSON_PARSE.D;
            if (typeof JSON_VALUE === "undefined") return 1;
            var Device = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            API_iot_DELETE__Device(Device);
            //#--------------------------------------------------------------
        	break;
        case 8://
        	break;
        	
        	
//        case 9://INFO
//        	TERMINAL(FROM_SER + evt.data + '\n');
//        	//#-------------------------------------------------------------- 
//            JSON_VALUE = JSON_PARSE.i;
//            if (typeof JSON_VALUE === "undefined") return 1;
//            if (JSON_VALUE === "CONFIGURATION COMPLETED") {
//                setTimeout(myTimer, STREAM_TIME);
//                STREAM_COU = 0;
//                WSTEP = 1;
//            }
//        	break;
        	
        case 9://CONFIGURATION COMPLETED
        	//#-------------------------------------------------------------- 
	        	TERMINAL("###  " + "CONFIGURATION COMPLETED !!!" + '\n');
	            setTimeout(myTimer, STREAM_TIME);
	            STREAM_COU = 0;
	            WSTEP = 1;
            //#-------------------------------------------------------------- 
        	break;       	
        case 10://Response
        	//#--------------------------------------------------------------
	        	//TERMINAL(FROM_SER + evt.data + '\n');
	        	JSON_VALUE = JSON_PARSE.V;
	            if (typeof JSON_VALUE === "undefined") return 1;
	            SQL_RESPONSE = JSON_VALUE;
        	//#--------------------------------------------------------------
            	ERROR_Num = 0;
            	ERROR_Description = "undefined";
	            JSON_VALUE = JSON_PARSE.N;
	            if (typeof JSON_VALUE !== "undefined"){
	            	ERROR_Num = Number(JSON_VALUE);
	            }
	            JSON_VALUE = JSON_PARSE.G;
	            if (typeof JSON_VALUE !== "undefined"){
	            	ERROR_Description = JSON_VALUE;
	            }
            //#-------------------------------------------------------------- 
	            if (WSTEP                      === 2)   WSTEP++;
	            if (SYS_BUSY                   === 1)   SYS_STEP++;
	            if (Save_CODE_STEP_ENABLE      === 1)	Save_CODE_STEP++;
	            if (Read_CODE_STEP_ENABLE      === 1)	Read_CODE_STEP++;
	            if (S_InOut_Config_STEP_ENABLE === 1)	S_InOut_Config_STEP ++;
	            if (R_InOut_Config_STEP_ENABLE === 1)	R_InOut_Config_STEP ++;
	            if (CREATE_DEVICE_BUSY         === 1)	CREATE_DEVICE_STEP ++;
        	//#--------------------------------------------------------------
        	break;
        case 11://DELETE_OutPut
        	//TERMINAL(FROM_SER + evt.data + '\n');
        	//#-------------------------------------------------------------- 
            JSON_VALUE = JSON_PARSE.D;
            if (typeof JSON_VALUE === "undefined") return 1;
            var D_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.I;
            if (typeof JSON_VALUE === "undefined") return 1;
            var I_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            API_iot_DELETE_Device_OutPut(D_Vel, I_Vel);
            //#--------------------------------------------------------------
        	break;
        case 12://DELETE_InPut
        	//TERMINAL(FROM_SER + evt.data + '\n');
        	//#-------------------------------------------------------------- 
            JSON_VALUE = JSON_PARSE.D;
            if (typeof JSON_VALUE === "undefined") return 1;
            var D_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.I;
            if (typeof JSON_VALUE === "undefined") return 1;
            var I_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            API_iot_DELETE_Device_InPut(D_Vel, I_Vel);
            //#--------------------------------------------------------------
        	break;
        case 13://DELETE Interconn
        	//TERMINAL(FROM_SER + evt.data + '\n');
        	//#-------------------------------------------------------------- 
            JSON_VALUE = JSON_PARSE.D1;
            if (typeof JSON_VALUE === "undefined") return 1;
            var D1_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.OU;
            if (typeof JSON_VALUE === "undefined") return 1;
            var OU_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.D2;
            if (typeof JSON_VALUE === "undefined") return 1;
            var D2_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.IN;
            if (typeof JSON_VALUE === "undefined") return 1;
            var IN_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            API_iot_DELETE__INTERCON(D1_Vel, OU_Vel, D2_Vel, IN_Vel);
            //#--------------------------------------------------------------
        	break;
        case 14://START_STREAMING
        	break;
        case 15://STOP_STREAMING
        	break;
        case 16://SYS_TIME_SEC
        	JSON_VALUE = JSON_PARSE.I;
            if (typeof JSON_VALUE === "undefined") return 1;
            SYS_TIME_SEC = Number(JSON_VALUE);
            //#--------------------------------------------------------------
        	//TERMINAL("TIME: " + TIME_UNIX_TO_GMT(SYS_TIME_SEC) + '\n');
        	//#--------------------------------------------------------------
        	break;
        	
        case 17://OutPut_DATA 
         //#--------------------------------------------------------------
        	 JSON_VALUE = JSON_PARSE.D;
             if (typeof JSON_VALUE === "undefined") return 1;
             var D_Vel = Number(JSON_VALUE);
         //#--------------------------------------------------------------
        	 JSON_VALUE = JSON_PARSE.S;
        	 if (typeof JSON_VALUE === "undefined") return 1;
        	 var S_Val = Number(JSON_VALUE);
         //#--------------------------------------------------------------
        	 JSON_VALUE = JSON_PARSE.I;
        	 if (typeof JSON_VALUE === "undefined") return 1;
        	 var I_Val = JSON_VALUE;
         //#--------------------------------------------------------------  
    		 API_iot_PUT__OutPut_DATA(D_Vel, S_Val, I_Val);     
    		 //TERMINAL("OutPut_DATA  : "+D_Vel+" "+S_Val+" "+I_Val+'\n');
    		 break;
  	
        case 18://OUTPUT_UNIX_TIME
        	//#-------------------------------------------------------------- 
            JSON_VALUE = JSON_PARSE.D;
            if (typeof JSON_VALUE === "undefined") return 1;
            var D_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.S;
            if (typeof JSON_VALUE === "undefined") return 1;
            var S_Vel = Number(JSON_VALUE);
            //#--------------------------------------------------------------
            JSON_VALUE = JSON_PARSE.I;
            if (typeof JSON_VALUE === "undefined") return 1;
            var I_Vel = Number(JSON_VALUE);
          //#--------------------------------------------------------------
        	API_iot_CHANGE__OUTPUT_UNIX_TIME(D_Vel, S_Vel, I_Vel); 
            //TERMINAL("OUTPUT_UNIX_TIME  : "+D_Vel+" "+S_Vel+" "+I_Vel+'\n');
        	break;	
        	
        default:
            break;
        }
    } 
}

function TIME_UNIX_TO_GMT(UNIX_TIME) {
    var TT = new Date(UNIX_TIME * 1000);
    
    var TT_getFullYear  =   TT.getFullYear().toString();
    var TT_getMonth		=   (TT.getMonth()+1).toString();
    var TT_getDate		=   TT.getDate().toString();
    var TT_getHours		=   TT.getHours().toString();
    var TT_getMinutes	= 	TT.getMinutes().toString();
    var TT_getSeconds	= 	TT.getSeconds().toString();
    if(TT_getMonth.length===1)TT_getMonth="0"+TT_getMonth;
    if(TT_getDate.length===1)TT_getDate="0"+TT_getDate;
    if(TT_getHours.length===1)TT_getHours="0"+TT_getHours;
    if(TT_getMinutes.length===1)TT_getMinutes="0"+TT_getMinutes;
    if(TT_getSeconds.length===1)TT_getSeconds="0"+TT_getSeconds;
    return TT_getFullYear+"/"+TT_getMonth+"/"+TT_getDate+" "+TT_getHours+":"+TT_getMinutes+":"+TT_getSeconds;
}





var WSTEP = 0;
var STREAM_COU = 0;
var STREAM_TIME = 25;
var TimeOut = 0;

function myTimer() {
    switch (WSTEP) {
    case 0:
        break;
    case 1:
        if (typeof iot__Device[STREAM_COU] === "undefined") {
            STREAM_COU = 0; // gatvlilia ertxel gvlazze
            setTimeout(myTimer, STREAM_TIME);
            break;
        } else {
            if (iot__Device[STREAM_COU].STREAMING_Status === 0) {
                var Msg = "{\"F\":\"14\",\"D\":\"" + iot__Device[STREAM_COU].Device_name + "\"}";
                websocket_send(Msg);
                WSTEP++;
                TERMINAL("###  START_STREAMING_FROM :" + iot__Device[STREAM_COU].Device_name + '\n');
                TimeOut = 0;
                setTimeout(myTimer, STREAM_TIME);
                break;
            } else {
                STREAM_COU++;
                setTimeout(myTimer, STREAM_TIME);
                break;
            }
        }
        break;
    case 2:
        TimeOut++;
        setTimeout(myTimer, STREAM_TIME);
        break;
    case 3:
        iot__Device[STREAM_COU].STREAMING_Status = 1;
        STREAM_COU++;
        WSTEP = 1;
        setTimeout(myTimer, STREAM_TIME);
        break;
    case 4:
        break;
    default:
        break;
    }
}



