
var Python_Base64_Max_Len = 2040;

var encodedString = "";
var decodedString = "";

var Save_CODE_TEXT_Progress_Coefficient = 0;
var Save_CODE_TEXT_Progress_Value = 0;
var Save_CODE_STEP = 0;
var Save_CODE_STEP_ENABLE = 0;
var Save_CODE_TEXT = 0;
var Save_CODE_TEXT_Len = 0;
var Save_CODE_TEXT_Start = 0;
var Save_CODE_TEXT_End = 0;
var Save_CODE_TEXT_FRAME = 0;
var Save_CODE_TEXT_EXIT = 0;
var Save_CODE_SPEED = 0;
var Save_CODE_TimeOUT = 0;

function Save_CODE() {
	Save_CODE_SPEED = 1;
    Save_CODE_TEXT = dom__ME.get_code();
    clearText();
    Save_CODE_STEP_ENABLE = 1;
    Save_CODE_STEP = 1;
    setTimeout(_Save_CODE, Save_CODE_SPEED); 
}

function _Save_CODE() {
    switch (Save_CODE_STEP) {
    case 0:
        break;
    case 1:
        API_iot_RESET();
        ///////////////////////////////////////////////
        TERMINAL("............................." + '\n');
        TERMINAL(Save_CODE_TEXT + '\n');
        TERMINAL(".............................x" + '\n');
        encodedString = Base64.encode(Save_CODE_TEXT);
        console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"
        TERMINAL(encodedString + '\n');
        TERMINAL("............................." + '\n');
        Save_CODE_TEXT_Len = encodedString.length;
        TERMINAL("Python_Base64_Len:" + Save_CODE_TEXT_Len + '\n');
        
       
        if (Save_CODE_TEXT_Len > Python_Base64_Max_Len){	
        	TERMINAL("Error !!!! Python_Base64_Len > "+Python_Base64_Max_Len + '\n');       
        	info.announce(Info_Type_error, "DEV:" +  CODE_Mediator1_Name + " MEDIATOR PYTHON CODE LENGTH ERROR !!!", "Python Base64 Length("+Save_CODE_TEXT_Len+") > "+Python_Base64_Max_Len);       	
        	Save_CODE_STEP = 0;
            setTimeout(_Save_CODE, Save_CODE_SPEED);
            break;
        }

        Save_CODE_TEXT_Progress_Coefficient = Save_CODE_TEXT_Len / 100;
        decodedString = Base64.decode(encodedString);
        TERMINAL(decodedString + '\n');
        TERMINAL("............................." + '\n');
        ///////////////////////////////////////////////
        Save_CODE_TEXT_Start = 0;
        Save_CODE_TEXT_End   = 0;
        Save_CODE_TEXT_EXIT  = 0;
        Save_CODE_TEXT_FRAME = 0;
        ///////////////////////////////////////////////
        Save_CODE_STEP = 2;
        setTimeout(_Save_CODE, Save_CODE_SPEED);
        break
    case 2:
        Save_CODE_TEXT_Start += Save_CODE_TEXT_End;
        Save_CODE_TEXT_Progress_Value = Save_CODE_TEXT_Start / Save_CODE_TEXT_Progress_Coefficient;
        dom__ME_progress1_value(Save_CODE_TEXT_Progress_Value);
        if (Save_CODE_TEXT_Len === Save_CODE_TEXT_Start) {
            var Msg = "{\"F\":\"11\",\"W\":\"" + "255" + "\",\"T\":\"" + CODE_Mediator1_Name + "\"}";
            TERMINAL(TO_SER + Msg + '\n');
            websocket_send(Msg);
            Save_CODE_TEXT_EXIT = 1;
            Save_CODE_STEP = 3;
            Save_CODE_TimeOUT = 0;
            setTimeout(_Save_CODE, Save_CODE_SPEED);
            break;
        }
        var Temp1 = Save_CODE_TEXT_Len - Save_CODE_TEXT_Start;
        if (Temp1 > 80) {
            Save_CODE_TEXT_End = 80;
        } else {
            Save_CODE_TEXT_End = Temp1;
        }
        var Temp2 = encodedString.substr(Save_CODE_TEXT_Start, Save_CODE_TEXT_End);
        var Msg = "{\"F\":\"11\",\"W\":\"" + Save_CODE_TEXT_FRAME + "\",\"T\":\"" + Temp2 + "\"}";
        TERMINAL(TO_SER + Msg + '\n');
        websocket_send(Msg);
        Save_CODE_TEXT_FRAME++;
        ///////////////////////////////////////////////
        Save_CODE_SPEED = 15;
        Save_CODE_TimeOUT = 0;
        Save_CODE_STEP = 3;
        setTimeout(_Save_CODE, Save_CODE_SPEED);
        break;
    case 3:
        Save_CODE_TimeOUT++;
        if (Save_CODE_TimeOUT === SYS_TimeOUT_LEN) {
            TERMINAL(FROM_SYS + "WRITE MEDIATOR PYTHON CODE ERROR( TimeOUT )!!! DEV:" + CODE_Mediator1_Name+'\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +  CODE_Mediator1_Name + " WRITE MEDIATOR PYTHON CODE ERROR !!!", "Server response TimeOUT");
            ////////////////////////////////////////////
            Save_CODE_STEP = 255;// EXIT!!!
            setTimeout(_Save_CODE, Save_CODE_SPEED);
            break;
        }
        setTimeout(_Save_CODE, Save_CODE_SPEED);
        break;
    case 4:
    	Save_CODE_SPEED = 1;
        if (SQL_RESPONSE === "OK") {       
	        if (Save_CODE_TEXT_EXIT === 1) {
	            Save_CODE_STEP = 5;
	            setTimeout(_Save_CODE, Save_CODE_SPEED);
	            break;
	        } else {
	            Save_CODE_STEP = 2;
	            setTimeout(_Save_CODE, Save_CODE_SPEED);
	            break;
	        }            
        }
        if (SQL_RESPONSE === "ERROR") {      
            TERMINAL(FROM_SYS + "WRITE MEDIATOR PYTHON CODE SERVER ERROR !!! DEV:" + CODE_Mediator1_Name+'\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +  CODE_Mediator1_Name + " WRITE MEDIATOR PYTHON CODE SERVER ERROR !!!",  "Server response with Error: " + ERROR_Num + "\n( "+ERROR_Description+" )");
            ////////////////////////////////////////////
        	Read_CODE_STEP = 255; // EXIT !!!!
        	setTimeout(_Read_CODE, Read_CODE_SPEED);
        	break;    
        }
        Save_CODE_STEP = 255;// EXIT!!!
        setTimeout(_Save_CODE, Save_CODE_SPEED);
        break;
    case 5:
        Save_CODE_STEP = 6;
        setTimeout(_Save_CODE, 2500);
        break;
    case 6:
    	info.announce(Info_Type_ok, "Mediator: " + CODE_Mediator1_Name, "Python Code is successfully saved "+Save_CODE_TEXT_Len+" Byte ( MAX = " + Python_Base64_Max_Len + " )");
        Save_CODE_STEP = 0;
        setTimeout(_Save_CODE, Save_CODE_SPEED);
        break;
    case 255:// EXIT!!!
        Save_CODE_STEP_ENABLE = 0;
        Save_CODE_STEP = 0;
        setTimeout(_Save_CODE, Save_CODE_SPEED);
        break;
    default:
        break;
    }
}