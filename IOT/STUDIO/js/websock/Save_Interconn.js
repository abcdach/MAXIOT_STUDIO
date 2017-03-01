
var INTER__Len = 0;
var INTER__D1 = 0;
var INTER__D2 = 0;
var INTER__OU = 0;
var INTER__IN = 0;


function UPDATE_Interconn() {
    switch (SYS_STEP) {
    case 0:
        break;
    case 1:
        INTER__Len = iot__Interconn.length;
        if (INTER__Len === 0) {
            Save_STEP++; break; // EXIT!!!            
        }
        SYS_COU = 0;
        SYS_STEP++;break       
    case 2:         
        if (INTER__Len === 0) {
            Save_STEP++; break; // EXIT!!!              
        } else {
        	INTER__Len --;
            if (iot__Interconn[INTER__Len].CREATOR === CREATOR_LOCAL) {
                //////////////////////////////////////////////////
            	INTER__D1 = iot__Interconn[INTER__Len].Device_name_1;
            	INTER__OU = iot__Interconn[INTER__Len].OutPut_index; 
            	INTER__D2 = iot__Interconn[INTER__Len].Device_name_2;
            	INTER__IN = iot__Interconn[INTER__Len].InPut_index;
            	var Msg = "{\"F\":\"8\",\"D1\":\"" + INTER__D1 + "\",\"OU\":\"" + INTER__OU + "\",\"D2\":\"" + INTER__D2 + "\",\"IN\":\"" + INTER__IN + "\"}";
            	
                //TERMINAL(TO_SER + Msg + '\n');
                websocket_send(Msg);
                //////////////////////////////////////////////////
                SYS_STEP = 3;
                SYS_TimeOUT = 0;
                SYS_SPEED = 15;
                break;
            }
        }
        SYS_COU++;
        break;
    case 3:
        SYS_TimeOUT++;
        if (SYS_TimeOUT === SYS_TimeOUT_LEN) {
            TERMINAL(FROM_SYS + "UPDATE INTERCONN ERROR( TimeOUT )!!! DEV:" +INTER__D1+" OUT:"+INTER__OU+" - DEV:" +INTER__D2+" IN:"+INTER__IN + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +INTER__D1+" OUT:"+INTER__OU+" - DEV:" +INTER__D2+" IN:"+INTER__IN+"    UPDATE INTERCONN ERROR !!!", "Server response TimeOUT");
            Save_STEP++; break; // EXIT !!!!
        }
        break;
    case 4:
        if (SQL_RESPONSE === "OK") {
        	API_iot_CREATE__Interconn(INTER__D1, INTER__OU, INTER__D2, INTER__IN, CREATOR_SQL);
            SYS_STEP = 5;break;
        }
        if (SQL_RESPONSE === "ERROR") {
            TERMINAL(FROM_SYS + "UPDATE INTERCONN SERVER ERROR !!! DEV:" +INTER__D1+" OUT:"+INTER__OU+" - DEV:" +INTER__D2+" IN:"+INTER__IN + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +INTER__D1+" OUT:"+INTER__OU+" - DEV:" +INTER__D2+" IN:"+INTER__IN+"    UPDATE INTERCONN ERROR !!!", "Server response with Error: " + ERROR_Num + "\n( "+ERROR_Description+" )");
            Save_STEP++; break; // EXIT !!!!
        }
        Save_STEP++; break; // EXIT!!! 
    case 5:
    	SYS_STEP = 2;break;
    	SYS_SPEED = 1;
    	break;
    default:
        break;
    }
}









function DELETE_Interconn() {
    switch (SYS_STEP) {
    case 0:
        break;
    case 1:
        INTER__Len = iot__Interconn.length;
        if (INTER__Len === 0) {
            Save_STEP++; break; // EXIT!!!            
        }
        SYS_COU = 0;
        SYS_STEP++;break       
    case 2:         
        if (INTER__Len === 0) {
            Save_STEP++; break; // EXIT!!!  
             
        } else {
        	INTER__Len --;
            if (iot__Interconn[INTER__Len].CREATOR === CREATOR_SQL && iot__Interconn[INTER__Len].Status === 3) {
                //////////////////////////////////////////////////
            	INTER__D1 = iot__Interconn[INTER__Len].Device_name_1;
            	INTER__OU = iot__Interconn[INTER__Len].OutPut_index; 
            	INTER__D2 = iot__Interconn[INTER__Len].Device_name_2;
            	INTER__IN = iot__Interconn[INTER__Len].InPut_index;
                var Msg = "{\"F\":\"9\",\"D1\":\"" + INTER__D1 + "\",\"OU\":\"" + INTER__OU + "\",\"D2\":\"" + INTER__D2 + "\",\"IN\":\"" + INTER__IN + "\"}";
                websocket_send(Msg);
                SYS_STEP = 3;
                SYS_TimeOUT = 0;
                SYS_SPEED = 15;
                break;
            }                 
        }
        SYS_COU++;
        break;
    case 3:
        SYS_TimeOUT++;
        if (SYS_TimeOUT === SYS_TimeOUT_LEN) {
            TERMINAL(FROM_SYS + "DELETE INTERCONN ERROR( TimeOUT )!!! DEV:" +INTER__D1+" OUT:"+INTER__OU+" - DEV:" +INTER__D2+" IN:"+INTER__IN + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +INTER__D1+" OUT:"+INTER__OU+" - DEV:" +INTER__D2+" IN:"+INTER__IN+"    DELETE INTERCONN ERROR !!!", "Server response TimeOUT");
            Save_STEP++; break; // EXIT !!!!
        }
        break;
    case 4:
        if (SQL_RESPONSE === "OK") {
            API_iot_DELETE__INTERCON(INTER__D1, INTER__OU, INTER__D2, INTER__IN);
            SYS_STEP = 5;break;
        }
        if (SQL_RESPONSE === "ERROR") {
            TERMINAL(FROM_SYS + "DELETE INTERCONN SERVER ERROR !!! DEV:" +INTER__D1+" OUT:"+INTER__OU+" - DEV:" +INTER__D2+" IN:"+INTER__IN + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +INTER__D1+" OUT:"+INTER__OU+" - DEV:" +INTER__D2+" IN:"+INTER__IN+"    DELETE INTERCONN ERROR !!!", "Server response with Error: " + ERROR_Num + "\n( "+ERROR_Description+" )");
            Save_STEP++; break; // EXIT !!!!
        }
        Save_STEP++; break; // EXIT!!!  
    case 5:
    	SYS_SPEED = 1;
    	SYS_STEP = 2;break;
    	break;
    default:
        break;
    }
}

