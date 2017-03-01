
var InPut__DEVICE_NUM = 0;
var InPut__INPUT_NUM = 0;
var InPut__INPUT_NUM_MEM = 0;
var InPut__DEVICE_NAME = 0;
var InPut__STATUS = 0;

function UPDATE_InPut() {
    switch (SYS_STEP) {
    case 0:
        break;
    case 1:
    	InPut__DEVICE_NUM = iot__Device.length;
        if (InPut__DEVICE_NUM === 0) {
            Save_STEP++; break; // EXIT!!!            
        }
        SYS_STEP++;
        break;
    case 2:
		if(InPut__DEVICE_NUM === 0){
			Save_STEP++; break; // EXIT !!!!
		}
		InPut__DEVICE_NUM -- ;
		InPut__INPUT_NUM = iot__InPut[InPut__DEVICE_NUM].length; 
		InPut__INPUT_NUM_REV = 0;
		InPut__DEVICE_NAME = iot__Device[InPut__DEVICE_NUM].Device_name;
		SYS_STEP++;
		break;       
    case 3:
    	if(InPut__INPUT_NUM !== 0){
    		InPut__INPUT_NUM -- ;		
    		SYS_STEP = 4;break; 
    	} else {
    		SYS_STEP = 2;break;	
    	}
    case 4:  		  	
   	if (iot__InPut[InPut__DEVICE_NUM][InPut__INPUT_NUM_REV].CREATOR === CREATOR_LOCAL) {   		
           var Msg = "{\"F\":\"6\",\"D\":\"" + InPut__DEVICE_NAME + "\",\"I\":\"" + InPut__INPUT_NUM_REV + "\"}";	
           websocket_send(Msg)
           SYS_SPEED = 15;
           SYS_TimeOUT = 0;        
           SYS_STEP = 5; break; 	
  	}
    	InPut__INPUT_NUM_REV ++;
    	SYS_STEP = 3;
		break; 	
    case 5:
        SYS_TimeOUT++;
        if (SYS_TimeOUT === SYS_TimeOUT_LEN){
            TERMINAL(FROM_SYS + "UPDATE INPUT ERROR( TimeOUT )!!! DEV:"+InPut__DEVICE_NAME+" IN:"+InPut__INPUT_NUM_REV + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +InPut__DEVICE_NAME+" IN:"+InPut__INPUT_NUM_REV+" UPDATE INPUT ERROR !!!", "Server response TimeOUT");
            Save_STEP++; break; // EXIT !!!!
        }	 	
		break;	
    case 6:	
        if (SQL_RESPONSE === "OK"){
        	API_iot_CREATE_Device_InPut(InPut__DEVICE_NAME, InPut__INPUT_NUM_REV, CREATOR_SQL, 1);
        	InPut__INPUT_NUM_REV ++;
            SYS_STEP = 7;break;
        }
        if (SQL_RESPONSE === "ERROR"){
            TERMINAL(FROM_SYS + "UPDATE INPUT SERVER ERROR !!! DEV:"+InPut__DEVICE_NAME+" IN:"+InPut__INPUT_NUM_REV + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +InPut__DEVICE_NAME+" IN:"+InPut__INPUT_NUM_REV+" UPDATE INPUT ERROR !!!", "Server response with Error: " + ERROR_Num + "\n( "+ERROR_Description+" )");
            Save_STEP++; break; // EXIT !!!!
        }
        Save_STEP++; break; // EXIT !!!!
    case 7:
    	SYS_SPEED = 1;
    	SYS_STEP = 3;break;
        break;      
    case 8:
        break;        
    case 9:
        break; 
    case 10:
        break;               
    default:
        break;
    }
        
}        
 




function DELETE_InPut() {
    switch (SYS_STEP) {
    case 0:
        break;
    case 1:
    	InPut__DEVICE_NUM = iot__Device.length;
        if (InPut__DEVICE_NUM === 0) {
            TERMINAL(FROM_SYS + "Nothing to do !!!" + '\n');
            Save_STEP++; break; // EXIT!!!            
        }
        SYS_STEP++;
        break;     
    case 2:
    	if(InPut__DEVICE_NUM === 0){
    		Save_STEP++; break;// EXIT !!!
    	}
    	InPut__DEVICE_NUM -- ; 	
    	InPut__INPUT_NUM = iot__InPut[InPut__DEVICE_NUM].length; 
    	InPut__DEVICE_NAME = iot__Device[InPut__DEVICE_NUM].Device_name;
        SYS_STEP++;break;      
    case 3:   	
    	if(InPut__INPUT_NUM !== 0){
    		InPut__INPUT_NUM -- ;		
    		SYS_STEP = 4;break; 
    	} else {
    		SYS_STEP = 2;break;	
    	}
    case 4:
    	if (iot__InPut[InPut__DEVICE_NUM][InPut__INPUT_NUM].CREATOR === CREATOR_SQL) {
    		InPut__STATUS = iot__InPut[InPut__DEVICE_NUM][InPut__INPUT_NUM].Status;
    		if( InPut__STATUS === 0 ){		
	            var Msg = "{\"F\":\"7\",\"D\":\"" + InPut__DEVICE_NAME + "\",\"I\":\"" + InPut__INPUT_NUM + "\"}";
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
            TERMINAL(FROM_SYS + "DELETE INPUT ERROR( TimeOUT )!!! DEV:"+InPut__DEVICE_NAME+" IN:"+InPut__INPUT_NUM + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +InPut__DEVICE_NAME+" IN:"+InPut__INPUT_NUM+" DELETE INPUT ERROR !!!", "Server response TimeOUT");
            Save_STEP++; break; // EXIT !!!!
        }	 	
		break;;  
    case 6:
        if (SQL_RESPONSE === "OK") {
        	API_iot_DELETE_Device_InPut(InPut__DEVICE_NAME, InPut__INPUT_NUM);
            SYS_STEP = 7;break;
        }
        if (SQL_RESPONSE === "ERROR") {
            TERMINAL(FROM_SYS + "DELETE INPUT SERVER ERROR !!! DEV:"+InPut__DEVICE_NAME+" IN:"+InPut__INPUT_NUM + '\n');
            TERMINAL(FROM_SYS + "STOP AND EXIT !!!" + '\n');
            info.announce(Info_Type_error, "DEV:" +InPut__DEVICE_NAME+" IN:"+InPut__INPUT_NUM+" DELETE INPUT ERROR !!!", "Server response with Error: " + ERROR_Num + "\n( "+ERROR_Description+" )");
            Save_STEP++; break; // EXIT !!!!
        }
        Save_STEP++; break;// EXIT !!!
    case 7:
    	SYS_SPEED = 1;
    	SYS_STEP = 3;break;
        break;      
    case 8:
        break;        
    case 9:
        break; 
    case 10:
        break;        
    default:
        break;
    }
        
} 



