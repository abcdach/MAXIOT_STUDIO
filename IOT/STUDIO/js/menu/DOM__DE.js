var dom__DE_P3;
var dom__DE_P4;
//var dom__DE_Inp1;
//var dom__DE_Inp2;
var dom__DE_Logo;
function OBJECT__DOM__DE() {

	
    //////////////////////////////////////
	dom__DE_P3 = createP(xText[15]); //"Name:"
	dom__DE_P3.style('font-size', '10pt');
	dom__DE_P3.style('font-family', 'Arial');
	dom__DE_P3.style('font-color', '100');;
	dom__DE_P3.style('font-weight', 'bold');
	dom__DE_P3.style('font-style', 'italic')
    //////////////////////////////////////       
    dom__DE_P4 = createP(xText[14]); //"Description:"
	dom__DE_P4.style('font-size', '10pt');
	dom__DE_P4.style('font-family', 'Arial');
	dom__DE_P4.style('font-color', '#AAAAAA');
	dom__DE_P4.style('font-weight', 'bold');
	dom__DE_P4.style('font-style', 'italic')
    //////////////////////////////////////         
    dom__DE_Inp1 = createInput(); //"Name:"
	dom__DE_Inp1.style('width', '60px');
	dom__DE_Inp1.style('textAlign', 'CENTER');
	dom__DE_Inp1.style('background-color', '#DAF7A6');
    //////////////////////////////////////
	dom__DE_Inp2 = createInput(); //"Description:"
	dom__DE_Inp2.style('width', '165px');
	dom__DE_Inp2.style('textAlign', 'CENTER');
	dom__DE_Inp2.style('background-color', '#DAF7A6');
    ////////////////////////////////////// 
	//dom__DE_Save_Descr = createImg('pic/Save_1.png'); //"Description:"
	//dom__DE_Save_Descr.style('width', '38px');
	//dom__DE_Save_Descr.mousePressed(dom__DE_Change_Device_Description);
    ///////////////////////////////////////////////	 
	dom__DE_Logo = createImg('pic/max_4.png');
	dom__DE_Logo.style('width', '200px');
    //////////////////////////////////////
	
	
    this.show = function(x, y, Device_Name, Device_Index, Device_Name_Text, Device_Type) {
        this.x = x;
        this.y = y;
        this.Device_Name = Device_Name;
        this.Device_Index = Device_Index;;
        this.Device_Name_Text = Device_Name_Text;
        this.Device_Type = Device_Type;

        dom__hide_all();
        //dom__W2_right_left_0(); dom__W2_Button_right.hide();
        W2._Text(xText[11]); //"Device - Sensor/Action "
        
        
        dom__DE_Inp1.value(this.Device_Name);
        dom__DE_Inp2.value(this.Device_Name_Text);
        dom__DE_P3.show();
        dom__DE_P4.show();
        dom__DE_Inp1.show();
        dom__DE_Inp2.show();
        //dom__DE_Save_Descr.show();
        dom__DE_Logo.show();
        
    };
    this.hide = function() {
    	
        dom__DE_P3.hide();
        dom__DE_P4.hide();
        dom__DE_Inp1.hide();
        dom__DE_Inp2.hide();
        dom__DE_Logo.hide();
        //dom__DE_Save_Descr.hide();
    };
}
//###############################################################
//function dom__DE_Change_Device_Description() {
//	var Device_Name = Number(dom__DE_Inp1.value());
//	var Description = dom__DE_Inp2.value();
//	API_iot_CHANGE__Device_Description(Device_Name,Description);
//}
