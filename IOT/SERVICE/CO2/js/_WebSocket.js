

var websocket;
var websocket_status = 0;
function doConnect() {
	//TERMINAL_CLEAR();
	PING();
	TERMINAL("123");
    //websocket = new WebSocket("ws://10.0.0.100:3002/");
    websocket = new WebSocket("ws://149.3.111.194:4002/");
    websocket.onopen = function(evt) {
        onOpen(evt);
    };
    websocket.onclose = function(evt) {
        onClose(evt); 
    };
    websocket.onmessage = function(evt) {
        onMessage(evt);
    };
    websocket.onerror = function(evt) {
        onError(evt);
    };
}

function onOpen(evt) {
    TERMINAL("Connected\n");
    //MyHeader_wText("Connected\n");
    websocket_status = 1;
}

function onClose(evt) {
    TERMINAL("Disconnected\n");
    //MyHeader_wText("Disconnected\n");
    websocket_status = 0;
}

function onError(evt) {
    TERMINAL('error: ' + evt.data + '\n');
    websocket_status = 0;
    websocket.close();
}

function doSend(message) {
    TERMINAL("sent: " + message + '\n');
    websocket.send(message);
}
function sendText() {
    //doSend("textis gadacema");
}
function doDisconnect() {
	websocket_status = 0;
    websocket.close();
}
function websocket_send(Msg) {
    websocket.send(Msg);
}











//#############################################################################
//#
//#
//#
//#############################################################################
var JSON_VALUE;
var JSON_PARSE;
var JSON_DATA = [];
function onMessage(evt) {
	Print_Data_Stream_7(evt.data);
	JSON_PARSE = JSON.parse(evt.data);  
	JSON_VALUE = JSON_PARSE.C;
	if (typeof JSON_VALUE !== "undefined") {
		var C_VALUE = Number(JSON_VALUE);
		if (C_VALUE === 0) {
			//#--------------------------------------------------------------	   	  
				var DATA = [];
			//#--------------------------------------------------------------	  
    	  	  	JSON_VALUE = JSON_PARSE.IN;
	          	if (typeof JSON_VALUE === "undefined") return 1;
	          	DATA[0] = Number(JSON_VALUE);
            //#--------------------------------------------------------------
	          	JSON_VALUE = JSON_PARSE.V;
	          	if (typeof JSON_VALUE === "undefined") return 1;
	          	DATA[3] = JSON_VALUE;
           //#--------------------------------------------------------------	
		  	  //  JSON_VALUE = JSON_PARSE.T;
	          //	if (typeof JSON_VALUE !== "undefined"){
			  //	if(JSON_VALUE === "1"){
			  //		DATA[3] = "hahaha :)";
			  //	}					
			  //  }
				
          //#--------------------------------------------------------------			  
	    		switch (DATA[0]) {
		    		case 0: if (typeof Print_Data_Stream_0 !== "undefined") Print_Data_Stream_0(DATA[3]);break;
		    		case 1: if (typeof Print_Data_Stream_1 !== "undefined") Print_Data_Stream_1(DATA[3]);break;
		    		case 2: if (typeof Print_Data_Stream_2 !== "undefined") var DEC = Base64.decode(DATA[3]);Print_Data_Stream_2(DEC);break;
		    		case 3: if (typeof Print_Data_Stream_3 !== "undefined") Print_Data_Stream_3(DATA[3]);break;
		    		case 4: if (typeof Print_Data_Stream_4 !== "undefined") Print_Data_Stream_4(DATA[3]);break;
					case 5: if (typeof Print_Data_Stream_5 !== "undefined") Print_Data_Stream_5(DATA[3]);break;
		    		case 6: if (typeof Print_Data_Stream_6 !== "undefined") Print_Data_Stream_6(DATA[3]);break;
		    		case 7: if (typeof Print_Data_Stream_7 !== "undefined") Print_Data_Stream_7(DATA[3]);break;
		    		default: return;
		    	}	  
	       //#--------------------------------------------------------------	  	    	      	   

      }

      //##########################################################################
      
      
      if (C_VALUE === 1) {
    	  JSON_VALUE = JSON_PARSE.N;
    	  if (typeof JSON_VALUE !== "undefined") {
    	      switch (Number(JSON_VALUE)) {
    	      case 0:
    	          break;
    	      case 1://"Welcome"
    	    	  TERMINAL("-> " + evt.data  + '\n');
    	          //var Msg = "{\"C\":\"1\",\"N\":\"10\",\"i\":\"42577\"}";
    	    	  var Msg = "{\"C\":\"1\",\"N\":\"10\",\"i\":\"3532\"}";
    	          websocket_send(Msg);
    	          TERMINAL("<- " + Msg + '\n');
    	          break;
    	      case 2:
    	    	  TERMINAL("-> " + evt.data  + '\n');
    	          break;
    	      case 3:
    	    	  TERMINAL("-> " + evt.data  + '\n');
    	          break;
    	      case 4://"Device is already in system"
    	    	  TERMINAL("-> " + evt.data  + '\n');
    	          doDisconnect();
    	          break;
    	      case 5:
    	    	  TERMINAL("-> " + evt.data  + '\n');
    	          break;
    	      case 6:
    	    	  TERMINAL("-> " + evt.data  + '\n');
    	          //Read_REG();
    	          break;
    	      case 7://"Json error"
    	    	  TERMINAL("-> " + evt.data  + '\n');
    	          doDisconnect();
    	          break;
    	      case 8:
    	          break;
    	      case 9:
    	          break;;
    	      default:
    	          break;
    	      }
    	  }
      }	   
	}
	return 1;
}




function PING() {

	if(websocket_status===1){
		var Msg ="{\"C\":\"1\",\"D\":\""+"42577"+"\",\"N\":\"255\",\"i\":\"PING\"}";
		//TERMINAL(FROM_SEN + Msg + '\n');			
		websocket_send(Msg);
	}
	setTimeout(PING, 3000);	
}





