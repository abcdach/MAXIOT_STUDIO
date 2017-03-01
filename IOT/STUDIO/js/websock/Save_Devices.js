var Type_of_action = "";

var DEVICE__DEVICE_LEN = 0;

function UPDATE_Devices() {
    switch (SYS_STEP) {
    case 0:
        break;
    case 1:
        DEVICE__DEVICE_LEN = iot__Device.length;
        if (DEVICE__DEVICE_LEN === 0) {
            TERMINAL(FROM_SYS + "Nothing to do !!!" + '\n');
            Save_STEP++; break; // EXIT!!!  
            break;
        }
        SYS_STEP++;
        break;
    case 2:         
        if (DEVICE__DEVICE_LEN === 0 ){
            Save_STEP++;break; // EXIT!!!   
        }
        DEVICE__DEVICE_LEN --;
        if (iot__Device[DEVICE__DEVICE_LEN].Save_Status !== 1)break;     
        if (iot__Device[DEVICE__DEVICE_LEN].Device_Delete_Status === 0) {
            //////////////////////////////////////////////////
            Device_X = round(iot__Device[DEVICE__DEVICE_LEN].x);
            Device_Y = round(iot__Device[DEVICE__DEVICE_LEN].y);
            Device_Name = iot__Device[DEVICE__DEVICE_LEN].Device_name;
            Device_Description = iot__Device[DEVICE__DEVICE_LEN].Description;
            Device_Type = iot__Device[DEVICE__DEVICE_LEN].Device_Type;
            var Msg = "{\"F\":\"2\",\"D\":\"" + Device_Name + "\",\"X\":\"" + Device_X + "\",\"Y\":\"" + Device_Y + "\",\"I\":\"" + Device_Description + "\",\"T\":\"" + Device_Type + '\"}';
            websocket_send(Msg);
            //////////////////////////////////////////////////
            SYS_SPEED = 15; SYS_TimeOUT = 0;
            SYS_STEP = 3; break;
        }
        break;
    case 3:
        SYS_TimeOUT++;
        if (SYS_TimeOUT === SYS_TimeOUT_LEN) {
            TERMINAL(FROM_SYS + "UPDATE DEVICE ERROR( TimeOUT )!!! DEV:" + Device_Name + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" + Device_Name + " UPDATE DEVICE ERROR !!!", "Server response TimeOUT");
            Save_STEP++; break; // EXIT !!!!
        }
        break;
    case 4:
        if (SQL_RESPONSE === "OK"){
        	API_iot_CREATE__Device(Device_Name, Device_X, Device_Y, Device_Description, Device_Type);
            SYS_STEP = 5;break;
        }
        if (SQL_RESPONSE === "ERROR") {
            TERMINAL(FROM_SYS + "UPDATE DEVICE SEVER ERROR !!! DEV:" + Device_Name + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" + Device_Name + " UPDATE DEVICE ERROR !!!", "Server response with Error: " + ERROR_Num + "\n( "+ERROR_Description+" )");
            Save_STEP++; break; // EXIT !!!!
        }
        Save_STEP++;break; // EXIT!!!
    case 5:
    	SYS_SPEED = 1;
    	SYS_STEP = 2;break;
        break
    default:
        break;
    }
}










function DELETE_Devices() {
    switch (SYS_STEP) {
    case 0:
        break;
    case 1:
        DEVICE__DEVICE_LEN = iot__Device.length;
        if (DEVICE__DEVICE_LEN === 0) {
            TERMINAL(FROM_SYS + "Nothing to do !!!" + '\n');
            Save_STEP++; break; // EXIT!!!  
            break;
        }
        SYS_STEP++;
        break;
    case 2:         
        if (DEVICE__DEVICE_LEN === 0 ){
            Save_STEP++;break; // EXIT!!!   
        }
        DEVICE__DEVICE_LEN --;
        if (iot__Device[DEVICE__DEVICE_LEN].Save_Status !== 1)break; 
        if (iot__Device[DEVICE__DEVICE_LEN].Device_Delete_Status === 1){
            //////////////////////////////////////////////////
            Device_Name = iot__Device[DEVICE__DEVICE_LEN].Device_name;   
            var Msg = "{\"F\":\"3\",\"D\":\"" + Device_Name + '\"}';
            websocket_send(Msg);
            //////////////////////////////////////////////////          
            SYS_SPEED = 15; SYS_TimeOUT = 0;
            SYS_STEP = 3; break;
        }
        break;
    case 3:
        SYS_TimeOUT++;
        if (SYS_TimeOUT === SYS_TimeOUT_LEN) {
            TERMINAL(FROM_SYS + "DELETE DEVICE ERROR( TimeOUT )!!! DEV:"+Device_Name + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" + Device_Name + " DELETE DEVICE ERROR !!!", "Server response TimeOUT");
            Save_STEP++; break; // EXIT !!!!
        }
        break;
    case 4:
        if (SQL_RESPONSE === "OK"){ 
            API_iot_DELETE__Device(Device_Name);
            SYS_STEP = 2;break;
        }
        if (SQL_RESPONSE === "ERROR") {
            TERMINAL(FROM_SYS + "DELETE DEVICE SEVER ERROR !!! DEV:" + Device_Name + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" + Device_Name + " DELETE DEVICE ERROR !!!", "Server response with Error: " + ERROR_Num + "\n( "+ERROR_Description+" )");
            Save_STEP++; break; // EXIT !!!! 
        }
        Save_STEP++;break; // EXIT!!!  
    case 5:
    	SYS_SPEED = 1;
    	SYS_STEP = 2;break;
        break;
    default:
        break;
    }
}
















