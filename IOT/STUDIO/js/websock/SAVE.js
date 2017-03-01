//#---------------------------------------------------------------------------
//#     SAVE
//#---------------------------------------------------------------------------
var SYS_STEP = 0;
var SYS_BUSY = 0;
var SYS_TimeOUT = 0;
var SQL_RESPONSE;
var SYS_SPEED = 15;
var SYS_COU;
var SYS_OBJ_NUM;
var SYS_CREATE_INTERCONN;
var SYS_DELETE_INTERCONN;
var OutPut_COU = 0;
var InPut_COU = 0;
var Device_X = 0;
var Device_Y = 0;
var Device_Name = 0;
var Device_Name_Text = 0;
var Device_Type = 0;


var SYS_TimeOUT_LEN = 150; // taimautebis sigrdze

///////////////////////////////////
function doSave() {
    if (SYS_BUSY === 0) {
        SYS_BUSY = 1;
        SYS_SPEED = 1;
        Save_STEP = 1;
        setTimeout(Save, SYS_SPEED);
        //document.myform.outputtext.value = "";
        Term_Text = "";
        Term_textarea1.value(Term_Text);
    }
}
///////////////////////////////////
var Save_STEP = 0;

function Save() {
    switch (Save_STEP) {
    case 0:
        break;
    case 1:
    	info.announce(Info_Type_some, "SAVE", "Virtual system board elements");
    	dom__Terminal.show();
        Sav_001.hide()
        Sav_002.show();
        Sav_000.hide();
        cursor(WAIT);
        API_iot_RESET();
        ///////////////////////////
        SYS_STEP = 1;SYS_SPEED = 1;Save_STEP++;
        setTimeout(Save, SYS_SPEED);
        break
        

    //###########################################    
    case 2:
    	TERMINAL(FROM_SYS + "OUTPUT...." + '\n');
    	SYS_STEP = 1;SYS_SPEED = 1;Save_STEP++;
        setTimeout(Save, SYS_SPEED);
        break;
    case 3:
    	UPDATE_OutPut();
        setTimeout(Save, SYS_SPEED);
        break;
    case 4:
        SYS_STEP = 1;SYS_SPEED = 1;Save_STEP++;
        setTimeout(Save, SYS_SPEED);
        break;
    case 5:
    	DELETE_OutPut();
        setTimeout(Save, SYS_SPEED);
        break;        
        
    //###########################################     
    case 6:
    	TERMINAL(FROM_SYS + "INPUT...." + '\n');    	
    	SYS_STEP = 1;SYS_SPEED = 1;Save_STEP++;
        setTimeout(Save, SYS_SPEED);
        break;
    case 7:
    	UPDATE_InPut();
        setTimeout(Save, SYS_SPEED);
        break;
    case 8:
        SYS_STEP = 1;SYS_SPEED = 1;Save_STEP++;
        setTimeout(Save, SYS_SPEED);
        break;
    case 9:
    	DELETE_InPut();
        setTimeout(Save, SYS_SPEED);
        break;       
       
        
        
    //########################################### 
    case 10:
    	TERMINAL(FROM_SYS + "INTERCONN...." + '\n');
    	SYS_STEP = 1;SYS_SPEED = 1;Save_STEP++;
        setTimeout(Save, SYS_SPEED);
    	break;
    case 11:
    	UPDATE_Interconn(); setTimeout(Save, SYS_SPEED);
        break;
    case 12:
        SYS_STEP = 1;SYS_SPEED = 1;Save_STEP++;
        setTimeout(Save, SYS_SPEED);
        break;
    case 13:
    	DELETE_Interconn(); setTimeout(Save, SYS_SPEED);
        break;        
        
        
        
    //###########################################          
    case 14:
    	TERMINAL(FROM_SYS + "DEVICE...." + '\n');
    	SYS_STEP = 1;SYS_SPEED = 1;Save_STEP++;
        setTimeout(Save, SYS_SPEED);
        break;
    case 15:
    	UPDATE_Devices();
        setTimeout(Save, SYS_SPEED);
        break;
    case 16:
    	SYS_STEP = 1;SYS_SPEED = 1;Save_STEP++;
        setTimeout(Save, SYS_SPEED);
        break;
    case 17:
    	DELETE_Devices();
        setTimeout(Save, SYS_SPEED);
        break;
    //###########################################   
    case 18:
    	TERMINAL(FROM_SYS + "FINISHED...." + '\n');
        Sav_001.hide();
        Sav_002.hide();
        Sav_000.show();
        //Menu_Text[6].text = "Saved";
        SYS_BUSY = 0;
        Save_STEP = 0;
        setTimeout(Save, SYS_SPEED);
        cursor(ARROW);
        break;
    case 19:
        break;
    case 20:
        break;
    case 21:
        break;
    default:
        break;
    }
}
