
var OutPut__DEVICE_NUM = 0;
var OutPut__OUTPUT_NUM = 0;
var OutPut__OUTPUT_NUM_MEM = 0;
var OutPut__DEVICE_NAME = 0;
var OutPut__STATUS = 0;

function UPDATE_OutPut() {
    switch (SYS_STEP) {
    case 0:
        break;
    case 1:
    	OutPut__DEVICE_NUM = iot__Device.length;
        if (OutPut__DEVICE_NUM === 0) {
            Save_STEP++; break; // EXIT!!!            
        }
        SYS_STEP++;
        break;
    case 2:
    	if(OutPut__DEVICE_NUM === 0){
    		Save_STEP++; break// EXIT !!!! 
    	}
    	OutPut__DEVICE_NUM -- ;
    	OutPut__OUTPUT_NUM = iot__OutPut[OutPut__DEVICE_NUM].length; 
    	OutPut__OUTPUT_NUM_REV = 0;
    	OutPut__DEVICE_NAME = iot__Device[OutPut__DEVICE_NUM].Device_name;   	
      SYS_STEP++;
      break;       
    case 3:
    	if(OutPut__OUTPUT_NUM !== 0){
    		OutPut__OUTPUT_NUM -- ;		
    		SYS_STEP = 4;break; 
    	} else {
    		SYS_STEP = 2;break;	
    	}
    case 4:  	
    	if (iot__OutPut[OutPut__DEVICE_NUM][OutPut__OUTPUT_NUM_REV].CREATOR === CREATOR_LOCAL) {    		
            var Msg = "{\"F\":\"4\",\"D\":\"" + OutPut__DEVICE_NAME + "\",\"I\":\"" + OutPut__OUTPUT_NUM_REV + "\"}";
            websocket_send(Msg)
            SYS_SPEED = 15;
            SYS_TimeOUT = 0;      
            SYS_STEP = 5;break; 	
    	}
    	OutPut__OUTPUT_NUM_REV ++;
    	SYS_STEP = 3;
		break; 	
    case 5:
        SYS_TimeOUT++;
        if (SYS_TimeOUT === SYS_TimeOUT_LEN){
            TERMINAL(FROM_SYS + "UPDATE OUTPUT ERROR( TimeOUT )!!! DEV:"+OutPut__DEVICE_NAME+" OUT:"+OutPut__OUTPUT_NUM_REV + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +OutPut__DEVICE_NAME+" OUT:"+OutPut__OUTPUT_NUM_REV+" UPDATE OUTPUT ERROR !!!", "Server response TimeOUT");
            Save_STEP++; break; // EXIT !!!!
        }	 	
		break;	
    case 6: 
        if (SQL_RESPONSE === "OK"){
        	API_iot_CREATE_Device_OutPut(OutPut__DEVICE_NAME, OutPut__OUTPUT_NUM_REV, CREATOR_SQL, 1);
        	OutPut__OUTPUT_NUM_REV ++;
            SYS_STEP = 7;break;
        }
        if (SQL_RESPONSE === "ERROR"){
            TERMINAL(FROM_SYS + "UPDATE OUTPUT SERVER ERROR !!! DEV:"+OutPut__DEVICE_NAME+" OUT:"+OutPut__OUTPUT_NUM_REV + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +OutPut__DEVICE_NAME+" OUT:"+OutPut__OUTPUT_NUM_REV+" UPDATE OUTPUT ERROR !!!", "Server response with Error: " + ERROR_Num + "\n( "+ERROR_Description+" )");
            Save_STEP++; break; // EXIT !!!!
        }
        Save_STEP++; break// EXIT !!!!
    case 7:
    	SYS_SPEED = 1;
    	SYS_STEP = 3;break;
        break;                     
    default:
        break;
    }
        
}        
 




function DELETE_OutPut() {
    switch (SYS_STEP) {
    case 0:
        break;
    case 1:
    	OutPut__DEVICE_NUM = iot__Device.length;
        if (OutPut__DEVICE_NUM === 0) {
            Save_STEP++; break; // EXIT!!!            
        }
        SYS_STEP++;
        break;     
    case 2:
    	if(OutPut__DEVICE_NUM === 0){
    		Save_STEP++; break// EXIT !!!! 
    	}
    	OutPut__DEVICE_NUM -- ; 	
    	OutPut__OUTPUT_NUM = iot__OutPut[OutPut__DEVICE_NUM].length; 
    	OutPut__DEVICE_NAME = iot__Device[OutPut__DEVICE_NUM].Device_name;
        SYS_STEP++;break;      
    case 3:   	
    	if(OutPut__OUTPUT_NUM !== 0){
    		OutPut__OUTPUT_NUM -- ;		
    		SYS_STEP = 4;break; 
    	} else {
    		SYS_STEP = 2;break;	
    	}
    case 4:
    	if (iot__OutPut[OutPut__DEVICE_NUM][OutPut__OUTPUT_NUM].CREATOR === CREATOR_SQL) {
    		OutPut__STATUS = iot__OutPut[OutPut__DEVICE_NUM][OutPut__OUTPUT_NUM].Status;
    		if( OutPut__STATUS === 0 ){		
	            var Msg = "{\"F\":\"5\",\"D\":\"" + OutPut__DEVICE_NAME + "\",\"I\":\"" + OutPut__OUTPUT_NUM + "\"}";
	            websocket_send(Msg)
	            SYS_SPEED = 15;
	            SYS_TimeOUT = 0;
	            SYS_STEP = 5;break; 		
    		}		
    	}
    	SYS_STEP = 3;break; 
    case 5:
        SYS_TimeOUT++;
        if (SYS_TimeOUT === SYS_TimeOUT_LEN) {
            TERMINAL(FROM_SYS + "DELETE OUTPUT ERROR( TimeOUT )!!! DEV:"+OutPut__DEVICE_NAME+" OUT:"+OutPut__OUTPUT_NUM + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +OutPut__DEVICE_NAME+" OUT:"+OutPut__OUTPUT_NUM+" DELETE OUTPUT ERROR !!!", "Server response TimeOUT");
            Save_STEP++; break; // EXIT !!!!
        }	 	
		break;;  
    case 6:	
        if (SQL_RESPONSE === "OK") {
        	API_iot_DELETE_Device_OutPut(OutPut__DEVICE_NAME, OutPut__OUTPUT_NUM);
            SYS_STEP = 7;break;
        }
        if (SQL_RESPONSE === "ERROR") {
            TERMINAL(FROM_SYS + "DELETE OUTPUT SERVER ERROR!!! DEV:"+OutPut__DEVICE_NAME+" OUT:"+OutPut__OUTPUT_NUM + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +OutPut__DEVICE_NAME+" OUT:"+OutPut__OUTPUT_NUM+" DELETE OUTPUT ERROR !!!", "Server response with Error: " + ERROR_Num + "\n( "+ERROR_Description+" )");
            Save_STEP++; break; // EXIT !!!!
        }
        Save_STEP++; break// EXIT !!!!
    case 7:
    	SYS_SPEED = 1;
    	SYS_STEP = 3;break;
        break;              
    default:
        break;
    }
        
} 








