//#--------------------------------------------------
//#     Menu WebMob_OutPut
//#--------------------------------------------------
var DOM_WebMob_P_Device;
var DOM_WebMob_P_Description;
var DOM_WebMob_INP_Device;
var DOM_WebMob_INP_Description;
var DOM_WebMob_P_OutPut;
var DOM_WebMob_INP_InOut_index;
var DOM_WebMob_IMG_SAVE_OutPut;
//var DOM_WebMob_IMG_READ_OutPut;
var DOM_WebMob_IMG_SAVE_InPut;
//var DOM_WebMob_IMG_READ_InPut;
var DOM_WebMob_SELECT_OutPut;
var DOM_WebMob_P_UIElement;
var DOM_WebMob_IMG_MOB_SIMUL;
var DOM_WebMob_ELEM_Progress;
var DOM_WebMob_OutPut_radio;
var DOM_WebMob_P_InPut;
var DOM_WebMob_SELECT_InPut;

var x111;
function OBJECT_DOM_WebMob_OutPut() {
	dom__WebMob_OutPut_UI_None = new OBJECT_DOM_WebMob_OutPut_UI_None();
	dom__WebMob_OutPut_UI_Flip_Switch = new OBJECT_DOM_WebMob_OutPut_UI_Flip_Switch();
	dom__WebMob_OutPut_UI_Slider = new OBJECT_DOM_WebMob_OutPut_UI_Slider();
	dom__WebMob_OutPut_UI_Button = new OBJECT_DOM_WebMob_OutPut_UI_Button();
    //////////////////////////////////////
	dom__WebMob_InPut_UI_None = new OBJECT_DOM_WebMob_InPut_UI_None();
	dom__WebMob_InPut_UI_Text_Input = new OBJECT_DOM_WebMob_InPut_UI_Text_Input();
    //////////////////////////////////////
	DOM_WebMob_P_Device = createP(xText[10]); //"Device:"
	DOM_WebMob_P_Device.style('font-size', '10pt');
	DOM_WebMob_P_Device.style('font-family', 'Arial');
	DOM_WebMob_P_Device.style('font-color', '100');;
	DOM_WebMob_P_Device.style('font-weight', 'bold');
	DOM_WebMob_P_Device.style('font-style', 'italic');
    //////////////////////////////////////       
    DOM_WebMob_INP_Device = createInput();
	DOM_WebMob_INP_Device.style('width', '60px');
	DOM_WebMob_INP_Device.style('textAlign', 'CENTER');
    //////////////////////////////////////	
    DOM_WebMob_P_Description = createP(xText[14]); //"Description:"
	DOM_WebMob_P_Description.style('font-size', '10pt');
	DOM_WebMob_P_Description.style('font-family', 'Arial');
	DOM_WebMob_P_Description.style('font-color', '#AAAAAA');
	DOM_WebMob_P_Description.style('font-weight', 'bold');
	DOM_WebMob_P_Description.style('font-style', 'italic');
    //////////////////////////////////////         
	DOM_WebMob_INP_Description = createInput();
	DOM_WebMob_INP_Description.style('width', '252px');
	DOM_WebMob_INP_Description.style('textAlign', 'CENTER');
    ////////////////////////////////////// 
	DOM_WebMob_P_OutPut = createP(xText[16]); //"Output:"
	DOM_WebMob_P_OutPut.style('font-size', '10pt');
	DOM_WebMob_P_OutPut.style('font-family', 'Arial');
	DOM_WebMob_P_OutPut.style('font-color', '100');
	DOM_WebMob_P_OutPut.style('font-weight', 'bold');
	DOM_WebMob_P_OutPut.style('font-style', 'italic');
    //////////////////////////////////////
	DOM_WebMob_P_InPut = createP(xText[28]); //"InPut:"
	DOM_WebMob_P_InPut.style('font-size', '10pt');
	DOM_WebMob_P_InPut.style('font-family', 'Arial');
	DOM_WebMob_P_InPut.style('font-color', '100');
	DOM_WebMob_P_InPut.style('font-weight', 'bold');
	DOM_WebMob_P_InPut.style('font-style', 'italic');
    //////////////////////////////////////
	DOM_WebMob_INP_InOut_index = createInput();
	DOM_WebMob_INP_InOut_index.style('width', '60px');
	DOM_WebMob_INP_InOut_index.style('textAlign', 'CENTER');
    ////////////////////////////////////// 
	DOM_WebMob_P_UIElement = createP(xText[27]); //"UI Element:"
	DOM_WebMob_P_UIElement.style('font-size', '10pt');
	DOM_WebMob_P_UIElement.style('font-family', 'Arial');
	DOM_WebMob_P_UIElement.style('font-color', '100');
	DOM_WebMob_P_UIElement.style('font-weight', 'bold');
	DOM_WebMob_P_UIElement.style('font-style', 'italic');
    //////////////////////////////////////
	DOM_WebMob_SELECT_OutPut = createSelect();
	DOM_WebMob_SELECT_OutPut.style('width', '110px');
	DOM_WebMob_SELECT_OutPut.style('height', '23px');
	DOM_WebMob_SELECT_OutPut.style('font-family', 'Arial');
	//-----------------------------------------------------
	DOM_WebMob_SELECT_OutPut.option('None','0');
	DOM_WebMob_SELECT_OutPut.option('Flip_Switch','1');
	DOM_WebMob_SELECT_OutPut.option('Slider','2');
	DOM_WebMob_SELECT_OutPut.option('Button','3');
	DOM_WebMob_SELECT_OutPut.changed(DOM_WebMob_SELECT_OutPut_Event);	
    //////////////////////////////////////
	DOM_WebMob_SELECT_InPut = createSelect();
	DOM_WebMob_SELECT_InPut.style('width', '110px');
	DOM_WebMob_SELECT_InPut.style('height', '23px');
	DOM_WebMob_SELECT_InPut.style('font-family', 'Arial');
	//-----------------------------------------------------
	DOM_WebMob_SELECT_InPut.option('None','0');
	DOM_WebMob_SELECT_InPut.option('Text_Input','1');
	//DOM_WebMob_SELECT_InPut.option('BBBB','2');
	//DOM_WebMob_SELECT_InPut.option('CCCC','3');
	DOM_WebMob_SELECT_InPut.changed(DOM_WebMob_SELECT_InPut_Event);	
    //////////////////////////////////////	
	DOM_WebMob_ELEM_Progress = createElement('progress', '0');
	DOM_WebMob_ELEM_Progress.style('width', (W2.SizeW - 125) + 'px');
	DOM_WebMob_ELEM_Progress.attribute("max", "100");
	DOM_WebMob_ELEM_Progress.attribute("value", "22");
	DOM_WebMob_ELEM_Progress.style('height', '10px');	
    //////////////////////////////////////
	DOM_WebMob_IMG_MOB_SIMUL = createImg('pic/mob/001.png');
	DOM_WebMob_IMG_MOB_SIMUL.style('width', '60px');
	DOM_WebMob_IMG_MOB_SIMUL.mousePressed(DOM_WebMob_IMG_MOB_SIMULile_screen_show);

    ////////////////////////////////////// 
	DOM_WebMob_IMG_SAVE_OutPut = createImg('pic/Save_1.png');
	DOM_WebMob_IMG_SAVE_OutPut.style('width', '65px');
	DOM_WebMob_IMG_SAVE_OutPut.mousePressed(DOM_WebMob_OutPut_SAVE_Processing);
    ////////////////////////////////////// 
	//DOM_WebMob_IMG_READ_OutPut = createImg('pic/1.png');
	//DOM_WebMob_IMG_READ_OutPut.style('width', '65px');
	//DOM_WebMob_IMG_READ_OutPut.mousePressed(DOM_WebMob_OutPut_READ);
    ////////////////////////////////////// 
    ////////////////////////////////////// 
	DOM_WebMob_IMG_SAVE_InPut = createImg('pic/Save_1.png');
	DOM_WebMob_IMG_SAVE_InPut.style('width', '65px');
	DOM_WebMob_IMG_SAVE_InPut.mousePressed(DOM_WebMob_InPut_SAVE_Processing);
    ////////////////////////////////////// 
	//DOM_WebMob_IMG_READ_InPut = createImg('pic/1.png');
	//DOM_WebMob_IMG_READOM_WebMob_IMG_READ_InPutD_InPut.style('width', '65px');
	//DOM_WebMob_IMG_READ_InPut.mousePressed(DOM_WebMob_InPut_READ);
    ////////////////////////////////////// 	

	this.show = function(Device_Name, OutPut_index, In_Out) {
		this.Device_Name = Device_Name;
		this.OutPut_index = OutPut_index;
		this.In_Out = In_Out;
		dom__hide_all();
	
		DOM_WebMob_ELEM_Progress.attribute("value", "0");
		DOM_WebMob_INP_Description.value("");

		DOM_WebMob_INP_Device.value(this.Device_Name);
		DOM_WebMob_INP_InOut_index.value(this.OutPut_index);
		
	
		if(this.In_Out === "InPut"){
			W2._Text(xText[29]); //"Device - InPut"
			dom__WebMob_InPut_UI_None.show();
			DOM_WebMob_SELECT_InPut.selected('0');
			
			DOM_WebMob_INP_Device.style('background-color', '#E0F7FF');
			DOM_WebMob_SELECT_OutPut.style('background-color', '#E0F7FF');
			DOM_WebMob_SELECT_InPut.style('background-color', '#E0F7FF');
			DOM_WebMob_INP_InOut_index.style('background-color', '#E0F7FF');
			DOM_WebMob_INP_Description.style('background-color', '#E0F7FF');			
		}
		if(this.In_Out === "OutPut"){
			W2._Text(xText[26]); //"Device - OutPut"
			dom__WebMob_OutPut_UI_None.show();
			DOM_WebMob_SELECT_OutPut.selected('0');
			
			DOM_WebMob_INP_Device.style('background-color', '#FFF1F1');
			DOM_WebMob_SELECT_OutPut.style('background-color', '#FFF1F1');
			DOM_WebMob_SELECT_InPut.style('background-color', '#FFF1F1');
			DOM_WebMob_INP_InOut_index.style('background-color', '#FFF1F1');
			DOM_WebMob_INP_Description.style('background-color', '#FFF1F1');
		}
		
		DOM_WebMob_P_Device.show();
		DOM_WebMob_P_Description.show();
		DOM_WebMob_INP_Device.show();
		DOM_WebMob_INP_Description.show();
		DOM_WebMob_INP_InOut_index.show();
		DOM_WebMob_P_UIElement.show();
		DOM_WebMob_ELEM_Progress.show();
		DOM_WebMob_IMG_MOB_SIMUL.show();
		
		if(this.In_Out === "InPut"){
			DOM_WebMob_P_InPut.show();
			DOM_WebMob_SELECT_InPut.show();
			DOM_WebMob_IMG_SAVE_InPut.show();
			//DOM_WebMob_IMG_READ_InPut.show();
		}
		if(this.In_Out === "OutPut"){
			DOM_WebMob_P_OutPut.show();
			DOM_WebMob_SELECT_OutPut.show();
			DOM_WebMob_IMG_SAVE_OutPut.show();
			//DOM_WebMob_IMG_READ_OutPut.show();
			DOM_WebMob_OutPut_READ();
		}	
		
		if(this.In_Out === "InPut"){
			DOM_WebMob_InPut_READ();
		}
		if(this.In_Out === "OutPut"){
			DOM_WebMob_OutPut_READ();
		}		
	};
	
	this.hide = function() {
		DOM_WebMob_P_Device.hide();
		DOM_WebMob_P_Description.hide();
		DOM_WebMob_INP_Device.hide();
		DOM_WebMob_INP_Description.hide();
		DOM_WebMob_P_OutPut.hide();
		DOM_WebMob_P_InPut.hide();
		DOM_WebMob_INP_InOut_index.hide();
		DOM_WebMob_SELECT_OutPut.hide();
		DOM_WebMob_SELECT_InPut.hide();
		DOM_WebMob_P_UIElement.hide();
		DOM_WebMob_ELEM_Progress.hide();
		DOM_WebMob_IMG_MOB_SIMUL.hide();
		DOM_WebMob_IMG_SAVE_OutPut.hide();
		//DOM_WebMob_IMG_READ_OutPut.hide();
		DOM_WebMob_IMG_SAVE_InPut.hide();
		//DOM_WebMob_IMG_READ_InPut.hide();
		
		dom__WebMob_UI_hide();
	};
}
//###############################################################
function DOM_WebMob_IMG_MOB_SIMULile_screen_show() {
	var Device_Name = DOM_WebMob_INP_Device.value();
	//var Data = "http://" + MyIP + "/iot/mob/123.php?Dev="+Device_Name;
	//var Data = "../MOB/index.php";
	var Data = "http://" + My_HOST + "/MAXIOT/MOB/MOB.php?Dev="+Device_Name
	info.announce(1, "", Data);
	Mobile_screen_show(Data);
}

//###############################################################
function DOM_WebMob_ELEM_Progress_value(Data) {
	DOM_WebMob_ELEM_Progress.attribute("value", Data);
}




//###############################################################
//#
//###############################################################
function DOM_WebMob_OutPut_READ() {
	var Config_Device = DOM_WebMob_INP_Device.value();
	var Config_Index  = DOM_WebMob_INP_InOut_index.value();
	Read_InOut_Config(Config_Device, Config_Index, "OUTPUT");
}
function DOM_WebMob_InPut_READ() {
	var Config_Device = DOM_WebMob_INP_Device.value();
	var Config_Index  = DOM_WebMob_INP_InOut_index.value();
	Read_InOut_Config(Config_Device, Config_Index, "INPUT");
}
//###############################################################
//#
//###############################################################
function DOM_WebMob_InOut_READ_Processing(Type, Data){
	
	
		var DE;
		var NU;
	//#-------------------------------------------
		var JSON_VALUE;
	    var JSON_PARSE = JSON.parse(Data);    
    //#-------------------------------------------
	    JSON_VALUE = JSON_PARSE.UI.DE;
	    if (typeof JSON_VALUE !== "undefined"){
	    	DE = JSON_VALUE;
	    } else {
	    	DE = "";
	    }
    //#-------------------------------------------
	    JSON_VALUE = JSON_PARSE.UI.NU;
	    if (typeof JSON_VALUE !== "undefined"){
	    	NU = JSON_VALUE;
	    } else {
	    	NU = "0";
	    }
    //#-------------------------------------------

	
	
	//#####################################
	if(Type === "OUTPUT"){
		switch (NU) {
			case "0": //None
				dom__WebMob_UI_hide();
				dom__WebMob_OutPut_UI_None.show();
				DOM_WebMob_INP_Description.value(DE);
				DOM_WebMob_SELECT_OutPut.selected('0');
				break;
			case "1": //Flip switch
				dom__WebMob_UI_hide();
				dom__WebMob_OutPut_UI_Flip_Switch.show();
				DOM_WebMob_INP_Description.value(DE);
				DOM_WebMob_SELECT_OutPut.selected('1');
				break;
			case "2": //Slider
				dom__WebMob_UI_hide();
				dom__WebMob_OutPut_UI_Slider.show();
				DOM_WebMob_INP_Description.value(DE);
				DOM_WebMob_SELECT_OutPut.selected('2');
				break;
			case "3": // Button
				dom__WebMob_UI_hide();
				dom__WebMob_OutPut_UI_Button.show();
				DOM_WebMob_INP_Description.value(DE);
				DOM_WebMob_SELECT_OutPut.selected('3');
				break;
			default:
				return;
		}
	}
	
	info.announce(1, Type, Data);
	//#####################################
	if(Type === "INPUT"){
		switch (NU) {
			case "0": //None
				dom__WebMob_UI_hide();
				dom__WebMob_InPut_UI_None.show();
				DOM_WebMob_INP_Description.value(DE);
				DOM_WebMob_SELECT_InPut.selected('0');
				break;
			case "1": //Text_Input
				dom__WebMob_UI_hide();
				dom__WebMob_InPut_UI_Text_Input.show();
				DOM_WebMob_INP_Description.value(DE);
				DOM_WebMob_SELECT_InPut.selected('1');
				break;
			default:
				return;
		}
	}	
}

function DOM_WebMob_OutPut_SAVE_Processing() {

	var DE = DOM_WebMob_INP_Description.value();
	var NU = DOM_WebMob_SELECT_OutPut.value();
	var P_Data  = "";
	var P_Velue = "";
	var P_Count = 0;
	var Data = "";
    var Device = DOM_WebMob_INP_Device.value();
    var Index  = DOM_WebMob_INP_InOut_index.value();
	
switch (NU) {
	//////////////////////////////////////
	case "0": //None
		Data = "{ \"UI\":{ \"DE\":\""+DE+"\", \"NU\":\""+NU+"\""+P_Data+"}}";
		Save_InOut_Config(Device, Index, "OUTPUT", Data);
		break;
	case "1": //Flip switch
		//-------------------------------------------------------------------------
			P_Velue = "0";   P_Data += ", \"P"+P_Count+"\":\""+P_Velue+"\"";P_Count++;
			P_Velue = "Off"; P_Data += ", \"P"+P_Count+"\":\""+P_Velue+"\"";P_Count++;
			P_Velue = "1";   P_Data += ", \"P"+P_Count+"\":\""+P_Velue+"\"";P_Count++;
			P_Velue = "On";  P_Data += ", \"P"+P_Count+"\":\""+P_Velue+"\"";P_Count++;
		//-------------------------------------------------------------------------
			Data = "{ \"UI\":{ \"DE\":\""+DE+"\", \"NU\":\""+NU+"\""+P_Data+"}}";
			Save_InOut_Config(Device, Index, "OUTPUT", Data);
		//-------------------------------------------------------------------------
		break;
	case "2": //Slider
			P_Velue = "0";   P_Data += ", \"P"+P_Count+"\":\""+P_Velue+"\"";P_Count++; // min
			P_Velue = "100"; P_Data += ", \"P"+P_Count+"\":\""+P_Velue+"\"";P_Count++; // max
		//-------------------------------------------------------------------------
			Data = "{ \"UI\":{ \"DE\":\""+DE+"\", \"NU\":\""+NU+"\""+P_Data+"}}";
			Save_InOut_Config(Device, Index, "OUTPUT", Data);
		break;
	case "3": // Button
			Data = "{ \"UI\":{ \"DE\":\""+DE+"\", \"NU\":\""+NU+"\""+P_Data+"}}";
			Save_InOut_Config(Device, Index, "OUTPUT", Data);
		break;
	default:
		return;
}
	info.announce(1, "", Data);
}


//###############################################################
//# InPut
//###############################################################
function DOM_WebMob_InPut_SAVE_Processing() {

	var DE = DOM_WebMob_INP_Description.value();
	var NU = DOM_WebMob_SELECT_InPut.value();
	var P_Data  = "";
	var P_Velue = "";
	var P_Count = 0;
	var Data = "";
    var Device = DOM_WebMob_INP_Device.value();
    var Index  = DOM_WebMob_INP_InOut_index.value();	
	
switch (NU) {
	case "0": //None
		Data = "{ \"UI\":{ \"DE\":\""+DE+"\", \"NU\":\""+NU+"\""+P_Data+"}}";
		Save_InOut_Config(Device, Index, "INPUT", Data);
		break;
	case "1": //Text_Input
		Data = "{ \"UI\":{ \"DE\":\""+DE+"\", \"NU\":\""+NU+"\""+P_Data+"}}";
		Save_InOut_Config(Device, Index, "INPUT", Data);
		break;
	default:
		return;
}
	info.announce(1, "", Data);
}



//###############################################################

function DOM_WebMob_SELECT_OutPut_Event() {
	var item = DOM_WebMob_SELECT_OutPut.value();
	if(item === "0"){
		dom__WebMob_UI_hide();
		dom__WebMob_OutPut_UI_None.show();
	}
	if(item === "1"){
		dom__WebMob_UI_hide();
		dom__WebMob_OutPut_UI_Flip_Switch.show();
	}
	if(item === "2"){
		dom__WebMob_UI_hide();
		dom__WebMob_OutPut_UI_Slider.show();
	}
	if(item === "3"){
		dom__WebMob_UI_hide();
		dom__WebMob_OutPut_UI_Button.show();
	}
}
//###############################################################

function DOM_WebMob_SELECT_InPut_Event() {
	var item = DOM_WebMob_SELECT_InPut.value();
	if(item === "0"){
		dom__WebMob_UI_hide();
		dom__WebMob_InPut_UI_None.show();
	}
	if(item === "1"){
		dom__WebMob_UI_hide();
		dom__WebMob_InPut_UI_Text_Input.show();
	}
	if(item === "2"){
	}
	if(item === "3"){
	}
}
//###############################################################





function dom__WebMob_UI_hide(){
	dom__WebMob_OutPut_UI_None.hide();
	dom__WebMob_OutPut_UI_Flip_Switch.hide();
	dom__WebMob_OutPut_UI_Slider.hide();
	dom__WebMob_OutPut_UI_Button.hide();
	///////////////////////////////
	dom__WebMob_InPut_UI_None.hide();
	dom__WebMob_InPut_UI_Text_Input.hide();
}



//#######################################################################
//#	OutPut UI
//#######################################################################
var dom__WebMob_OutPut_UI_None;
var dom__WebMob_OutPut_UI_Flip_Switch;
var dom__WebMob_OutPut_UI_Slider;
var dom__WebMob_OutPut_UI_Button;


function OBJECT_DOM_WebMob_OutPut_UI_None() {
	
	DOM_WebMob_OutPut_UI_None_IMG = createImg('pic/ui/0.png');
	DOM_WebMob_OutPut_UI_None_IMG.style('width', '215px');
	
	this.show = function(Device_Name, OutPut_index) {
		DOM_WebMob_OutPut_UI_None_IMG.show();
	}	
	this.hide = function() {
		DOM_WebMob_OutPut_UI_None_IMG.hide();
	}
}

function OBJECT_DOM_WebMob_OutPut_UI_Flip_Switch() {
	
	DOM_WebMob_OutPut_UI_Flip_Switch_IMG = createImg('pic/ui/1.png');
	DOM_WebMob_OutPut_UI_Flip_Switch_IMG.style('width', '215px');
	
	this.show = function(Device_Name, OutPut_index) {
		DOM_WebMob_OutPut_UI_Flip_Switch_IMG.show();
	}
	this.hide = function() {
		DOM_WebMob_OutPut_UI_Flip_Switch_IMG.hide();
	}
}


function OBJECT_DOM_WebMob_OutPut_UI_Slider() {

	DOM_WebMob_OutPut_UI_Slider_IMG = createImg('pic/ui/2.png');
	DOM_WebMob_OutPut_UI_Slider_IMG.style('width', '215px');
	
	this.show = function(Device_Name, OutPut_index) {
		DOM_WebMob_OutPut_UI_Slider_IMG.show();
	}
	this.hide = function() {
		DOM_WebMob_OutPut_UI_Slider_IMG.hide();
	}
}


function OBJECT_DOM_WebMob_OutPut_UI_Button() {
	
	DOM_WebMob_OutPut_UI_Button_IMG = createImg('pic/ui/3.png');
	DOM_WebMob_OutPut_UI_Button_IMG.style('width', '215px');
	
	this.show = function(Device_Name, OutPut_index) {
		DOM_WebMob_OutPut_UI_Button_IMG.show();
	}	
	this.hide = function() {
		DOM_WebMob_OutPut_UI_Button_IMG.hide();
	}
}



//#######################################################################
//#	InPut UI
//#######################################################################
var dom__WebMob_InPut_UI_None;
var dom__WebMob_InPut_UI_Text_Input;

function OBJECT_DOM_WebMob_InPut_UI_None() {
	
	DOM_WebMob_InPut_UI_None_IMG = createImg('pic/ui/0.png');
	DOM_WebMob_InPut_UI_None_IMG.style('width', '215px');
	
	this.show = function(Device_Name, OutPut_index) {
		DOM_WebMob_InPut_UI_None_IMG.show();
	}	
	this.hide = function() {
		DOM_WebMob_InPut_UI_None_IMG.hide();
	}
}
function OBJECT_DOM_WebMob_InPut_UI_Text_Input() {
	
	DOM_WebMob_InPut_UI_Text_Input_IMG = createImg('pic/ui/4.png');
	DOM_WebMob_InPut_UI_Text_Input_IMG.style('width', '215px');
	
	this.show = function(Device_Name, OutPut_index) {
		DOM_WebMob_InPut_UI_Text_Input_IMG.show();
	}	
	this.hide = function() {
		DOM_WebMob_InPut_UI_Text_Input_IMG.hide();
	}
}


