
var R_InOut_Config_STEP = 0;
var R_InOut_Config_STEP_ENABLE = 0;
var R_InOut_Config_JSON = 0;

var R_InOut_Device;
var R_InOut_Index;
var R_InOut_Type;

var R_InOut_Config_DATA  = "";
var R_InOut_Config_LEN = 0;
var R_InOut_Config_START = 0;
var R_InOut_Config_END   = 0;
var R_InOut_Config_FRAME = 0;

var R_InOut_TimeOUT;
var R_InOut_SPEED = 15;

function Read_InOut_Config(Config_Device, Config_Index, Config_Type){
	R_InOut_Device = Config_Device;
	R_InOut_Index  = Config_Index;
	R_InOut_Type   = Config_Type;
    R_InOut_Config_STEP_ENABLE = 1;
    R_InOut_Config_STEP = 1;
    R_InOut_SPEED = 1;
    setTimeout(_R_InOut_Config, R_InOut_SPEED);
}

function _R_InOut_Config() {
    switch (R_InOut_Config_STEP) {
    case 0:
        break;
    case 1:
        clearText();
        TERMINAL("............................." + '\n');
        //////////////////////////////////////////////////////
        R_InOut_Config_DATA  = "";
        R_InOut_Config_LEN   = 0;
        R_InOut_Config_START = 0;
        R_InOut_Config_END   = 0;
        R_InOut_Config_FRAME = 0;
        //////////////////////////////////////////////////////
        var Msg = "{\"F\":\"12\",\"RE\":\"" + "255" + "\",\"DE\":\"" + R_InOut_Device + "\",\"IN\":\"" + R_InOut_Index + "\",\"TY\":\"" + R_InOut_Type + "\"}";
        TERMINAL(TO_SER + Msg + '\n');
        websocket_send(Msg);
        //////////////////////////////////////////////////////
        R_InOut_SPEED = 15;
        R_InOut_TimeOUT = 0;
        R_InOut_Config_STEP = 2;
        setTimeout(_R_InOut_Config, R_InOut_SPEED);
        break;
    case 2:
        R_InOut_TimeOUT++;
        if (R_InOut_TimeOUT === SYS_TimeOUT_LEN) {
            TERMINAL(FROM_SYS + "READ INOUT ERROR( TimeOUT )!!! DEV:" + R_InOut_Device + " INOUT:" +  R_InOut_Index + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +  R_InOut_Device + " INOUT:" +  R_InOut_Index + " READ INOUT  ERROR !!!", "Server response TimeOUT");
            ///////////////////////////////////////////////////
            R_InOut_Config_STEP = 255;// EXIT !!!
            setTimeout(_R_InOut_Config, R_InOut_SPEED);
            break;
        }
        setTimeout(_R_InOut_Config, R_InOut_SPEED);
        break;
    case 3:
    	R_InOut_SPEED = 1;
        if (SQL_RESPONSE === "OK") {
	        if (R_InOut_Config_LEN > 0) {
	            Read_OutPut_Config_Progress_Coefficient = R_InOut_Config_LEN / 100;
	            R_InOut_Config_STEP = 4;
	            setTimeout(_R_InOut_Config, R_InOut_SPEED);
	            break;
	        } else {
	        	info.announce(Info_Type_ok, "Devce: " + R_InOut_Device + " Index: " + R_InOut_Index, "UI Element Config is successfully read");
	            R_InOut_Config_STEP = 255;// EXIT !!!
	            setTimeout(_R_InOut_Config, R_InOut_SPEED);
	            break;
	        }             
        }
        if (SQL_RESPONSE === "ERROR") {      
        	TERMINAL(FROM_SYS + "READ INOUT SERVER ERROR !!! DEV:" + R_InOut_Device + " INOUT:" +  R_InOut_Index + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" + R_InOut_Device + " INOUT:" +  R_InOut_Index + " READ INOUT SERVER ERROR !!!",  "Server response with Error: " + ERROR_Num + "\n( "+ERROR_Description+" )");
            ////////////////////////////////////////////
            R_InOut_Config_STEP = 255;// EXIT !!!
            setTimeout(_R_InOut_Config, R_InOut_SPEED);
            break;
        }
        R_InOut_Config_STEP = 255;// EXIT !!!
        setTimeout(_R_InOut_Config, R_InOut_SPEED);
        break;
    case 4:
        R_InOut_Config_START += R_InOut_Config_END;
        Read_OutPut_Config_Progress_Value = R_InOut_Config_START / Read_OutPut_Config_Progress_Coefficient;
        DOM_WebMob_ELEM_Progress_value(Read_OutPut_Config_Progress_Value);
        if (R_InOut_Config_LEN === R_InOut_Config_START) {

            TERMINAL("............................." + '\n');
            TERMINAL(R_InOut_Config_DATA + '\n');
            TERMINAL("............................." + '\n');
            var R_InOut_Data = Base64.decode(R_InOut_Config_DATA);
            TERMINAL(R_InOut_Data + '\n');
            TERMINAL("............................." + '\n');    
            ////////////////////////////////////////////////////////
            
            
            DOM_WebMob_InOut_READ_Processing(R_InOut_Type, R_InOut_Data);
            
            
            ////////////////////////////////////////////////////////
            info.announce(Info_Type_ok, "Devce:v " + R_InOut_Device + " Index: " + R_InOut_Index, "UI Element Config is successfully read");
            R_InOut_Config_STEP = 255;// EXIT !!!
            setTimeout(_R_InOut_Config, R_InOut_SPEED);
            break;
        }
        //////////////////////////////////////////////////////
        var Temp1 = R_InOut_Config_LEN - R_InOut_Config_START;
        if (Temp1 > 80) {
            R_InOut_Config_END = 80;
        } else {
            R_InOut_Config_END = Temp1;
        }
        //////////////////////////////////////////////////////
        var Msg = "{\"F\":\"12\",\"RE\":\"" + R_InOut_Config_FRAME + "\",\"TE\":\"" + R_InOut_Config_END + "\"}";
        TERMINAL(TO_SER + Msg + '\n');
        websocket_send(Msg);
        //////////////////////////////////////////////////////
        R_InOut_Config_FRAME++;
        //////////////////////////////////////////////////////
        R_InOut_SPEED = 15;
        R_InOut_TimeOUT = 0;
        R_InOut_Config_STEP = 5;
        setTimeout(_R_InOut_Config, R_InOut_SPEED);
        break;
    case 5:
        R_InOut_TimeOUT++;
        if (R_InOut_TimeOUT === SYS_TimeOUT_LEN) {
            TERMINAL(FROM_SYS + "READ INOUT ERROR( TimeOUT )!!! DEV:" + R_InOut_Device + " INOUT:" +  R_InOut_Index + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +  R_InOut_Device + " INOUT:" +  R_InOut_Index + " READ INOUT  ERROR !!!", "Server response TimeOUT");
            ///////////////////////////////////////////////////
            R_InOut_Config_STEP = 255;// EXIT !!!
            setTimeout(_R_InOut_Config, R_InOut_SPEED);
            break;
        }
        setTimeout(_R_InOut_Config, R_InOut_SPEED);
        break;
    case 6:
    	R_InOut_SPEED = 1;
        if (SQL_RESPONSE === "OK") {
            TERMINAL(FROM_SYS + "OK" + '\n');
            R_InOut_Config_DATA = R_InOut_Config_DATA.concat(R_InOut_Config_JSON);
            R_InOut_Config_STEP = 4;
            setTimeout(_R_InOut_Config, R_InOut_SPEED);
            break;
        }
        if (SQL_RESPONSE === "ERROR") {      
        	TERMINAL(FROM_SYS + "READ INOUT SERVER ERROR !!! DEV:" + R_InOut_Device + " INOUT:" +  R_InOut_Index + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" + R_InOut_Device + " INOUT:" +  R_InOut_Index + " READ INOUT SERVER ERROR !!!",  "Server response with Error: " + ERROR_Num + "\n( "+ERROR_Description+" )");
            ////////////////////////////////////////////
            R_InOut_Config_STEP = 255;// EXIT !!!
            setTimeout(_R_InOut_Config, R_InOut_SPEED);
            break;
        }
        R_InOut_Config_STEP = 255;// EXIT !!!
        setTimeout(_R_InOut_Config, R_InOut_SPEED);
        break;
    case 255:
        R_InOut_Config_STEP_ENABLE = 0;
        R_InOut_Config_STEP = 0;
        setTimeout(_R_InOut_Config, R_InOut_SPEED);
        break;
    default:
        break;
    }
}

