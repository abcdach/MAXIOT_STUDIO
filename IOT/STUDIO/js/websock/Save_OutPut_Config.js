
var S_InOut_Config_Base64 = "";

var S_InOut_Config_Base64_LEN = 0;
var S_InOut_Config_START = 0;
var S_InOut_Config_END = 0;
var S_InOut_Config_FRAME = 0;
var S_InOut_Config_EXIT = 0;

var S_InOut_Config_Progress_Coefficient = 0;
var S_InOut_Config_Progress_Value = 0;

var S_InOut_Config_STEP = 0;
var S_InOut_Config_STEP_ENABLE = 0;

var S_InOut_Config;
var S_InOut_Device;
var S_InOut_Index;
var S_InOut_Type;

var S_InOut_TimeOUT;
var S_InOut_SPEED = 15;

function Save_InOut_Config( Device, Index, Type, Data ) {
    info.announce(Info_Type_some, "", "");
    clearText();
    
    S_InOut_Config = Data;
    S_InOut_Device = Device;
    S_InOut_Index  = Index;
    S_InOut_Type   = Type;
    
    TERMINAL("Device_Name:" + S_InOut_Device + " OutPut_index:" + S_InOut_Index + '\n');

    S_InOut_Config_STEP_ENABLE = 1;
    S_InOut_Config_STEP = 1;
    S_InOut_SPEED = 1;
    setTimeout(_S_InOut_Config, S_InOut_SPEED);
}

function _S_InOut_Config() {
    switch (S_InOut_Config_STEP) {
    case 0:
        break;
    case 1:
        clearText();
        API_iot_RESET();

        TERMINAL("............................." + '\n');
        TERMINAL(S_InOut_Config + '\n');
        TERMINAL(".............................x" + '\n');
        S_InOut_Config_Base64 = Base64.encode(S_InOut_Config);
        console.log(S_InOut_Config_Base64);
        TERMINAL(S_InOut_Config_Base64 + '\n');
        TERMINAL("............................." + '\n');
        S_InOut_Config_Base64_LEN = S_InOut_Config_Base64.length;
        TERMINAL("S_InOut_Config_Base64_LEN:" + S_InOut_Config_Base64_LEN + '\n');
        S_InOut_Config_Progress_Coefficient = S_InOut_Config_Base64_LEN / 100;
        TERMINAL(Base64.decode(S_InOut_Config_Base64) + '\n');
        TERMINAL("............................." + '\n');

        S_InOut_Config_START = 0;
        S_InOut_Config_END   = 0;
        S_InOut_Config_EXIT  = 0;
        S_InOut_Config_FRAME = 0;
        S_InOut_Config_STEP  = 2;
        setTimeout(_S_InOut_Config, S_InOut_SPEED);
        
        break
    case 2:
        S_InOut_Config_START += S_InOut_Config_END;
        S_InOut_Config_Progress_Value = S_InOut_Config_START / S_InOut_Config_Progress_Coefficient;
        DOM_WebMob_ELEM_Progress_value(S_InOut_Config_Progress_Value);
        ////////////////////////////////////////////
        if (S_InOut_Config_Base64_LEN === S_InOut_Config_START) {
            var Msg = "{\"F\":\"13\",\"SA\":\"" + "255" + "\",\"DE\":\"" + S_InOut_Device + "\",\"IN\":\"" + S_InOut_Index + "\",\"TY\":\"" + S_InOut_Type + "\"}";
            TERMINAL(TO_SER + Msg + '\n');
            websocket_send(Msg);
            S_InOut_Config_EXIT = 1;
            ////////////////////////////////////////////
            S_InOut_SPEED = 15;
            S_InOut_Config_STEP = 3;
            S_InOut_TimeOUT = 0;
            setTimeout(_S_InOut_Config, S_InOut_SPEED);
            break;
        }
        var Temp1 = S_InOut_Config_Base64_LEN - S_InOut_Config_START;
        if (Temp1 > 80) {
            S_InOut_Config_END = 80;
        } else {
            S_InOut_Config_END = Temp1;
        }
        var Temp2 = S_InOut_Config_Base64.substr(S_InOut_Config_START, S_InOut_Config_END);
        var Msg = "{\"F\":\"13\",\"SA\":\"" + S_InOut_Config_FRAME + "\",\"TE\":\"" + Temp2 + "\"}";
        TERMINAL(TO_SER + Msg + '\n');
        websocket_send(Msg);
        S_InOut_Config_FRAME++;
        S_InOut_TimeOUT = 0;
        S_InOut_Config_STEP = 3;
        setTimeout(_S_InOut_Config, S_InOut_SPEED);
        break;
    case 3:
        S_InOut_TimeOUT++;
        if (S_InOut_TimeOUT === SYS_TimeOUT_LEN) {
            TERMINAL(FROM_SYS + "SAVE INOUT ERROR( TimeOUT )!!! DEV:" + S_InOut_Device + " INOUT:" +  S_InOut_Index + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +  S_InOut_Device + " INOUT:" +  S_InOut_Index + " SAVE INOUT  ERROR !!!", "Server response TimeOUT");
            ///////////////////////////////////////////////////
            S_InOut_Config_STEP = 255;// EXIT !!!
            setTimeout(_S_InOut_Config, S_InOut_SPEED);
            break;
        }
        setTimeout(_S_InOut_Config, S_InOut_SPEED);
        break;
    case 4:
    	S_InOut_SPEED = 1;
        if (SQL_RESPONSE === "OK") {
            TERMINAL(FROM_SYS + "OK" + '\n');
            if (S_InOut_Config_EXIT === 1) {
                info.announce(Info_Type_ok, "Devce: " + S_InOut_Device + " Index: " + S_InOut_Index, "UI Element Config is successfully saved");
                var MobSIM_Data = "http://" + MyIP + "/iot/mob/123.php?Dev="+DOM_WebMob_INP_Device.value();
                Mobile_screen_refresh(MobSIM_Data); 
                /////////////////////////////////////////
                S_InOut_Config_STEP = 255;// EXIT !!!
                setTimeout(_S_InOut_Config, S_InOut_SPEED);
            } else {
                S_InOut_Config_STEP = 2;
                setTimeout(_S_InOut_Config, S_InOut_SPEED);
                break;
            }            
        }
        if (SQL_RESPONSE === "ERROR") {      
        	TERMINAL(FROM_SYS + "SAVE INOUT SERVER ERROR !!! DEV:" + S_InOut_Device + " INOUT:" +  S_InOut_Index + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" + S_InOut_Device + " INOUT:" +  S_InOut_Index + " SAVE INOUT SERVER ERROR !!!",  "Server response with Error: " + ERROR_Num + "\n( "+ERROR_Description+" )");
            ////////////////////////////////////////////
            R_InOut_Config_STEP = 255;// EXIT !!!
            setTimeout(_R_InOut_Config, R_InOut_SPEED);
            break;
        }
        S_InOut_Config_STEP = 255;// EXIT !!!
        setTimeout(_S_InOut_Config, S_InOut_SPEED);
        break;
    case 255:// EXIT !!!
        S_InOut_Config_STEP_ENABLE = 0;
        S_InOut_Config_STEP = 0;
        setTimeout(_S_InOut_Config, S_InOut_SPEED);
        break;
    default:
        break;
    }
}