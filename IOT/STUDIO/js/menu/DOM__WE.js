
//#--------------------------------------------------
//#     Menu Web Mobile Sensor
//#--------------------------------------------------
var div_QR;
var qrcode;
var dom__WE_QR;
var dom__WE_TUN;
var dom__WE_P3;
var dom__WE_P4;
var dom__WE_Inp1;
var dom__WE_Inp2;
var dom__WE_Save_Descr;
var WE_DEV_ID;
function OBJECT__DOM__WE() {
	
    //////////////////////////////////////
	dom__WE_P3 = createP(xText[15]); //"Name:"
	dom__WE_P3.style('font-size', '10pt');
	dom__WE_P3.style('font-family', 'Arial');
	dom__WE_P3.style('font-color', '100');;
	dom__WE_P3.style('font-weight', 'bold');
	dom__WE_P3.style('font-style', 'italic')
    //////////////////////////////////////       
    dom__WE_P4 = createP(xText[14]); //"Description:"
	dom__WE_P4.style('font-size', '10pt');
	dom__WE_P4.style('font-family', 'Arial');
	dom__WE_P4.style('font-color', '#AAAAAA');
	dom__WE_P4.style('font-weight', 'bold');
	dom__WE_P4.style('font-style', 'italic')
    //////////////////////////////////////         
    dom__WE_Inp1 = createInput(); //"Name:"
	dom__WE_Inp1.style('width', '60px');
	dom__WE_Inp1.style('textAlign', 'CENTER');
    //////////////////////////////////////
	dom__WE_Inp2 = createInput(); //"Description:"
	dom__WE_Inp2.style('width', '165px');
	dom__WE_Inp2.style('textAlign', 'CENTER');
    ////////////////////////////////////// 
	dom__WE_Save_Descr = createImg('pic/Save_1.png'); //"Description:"
	dom__WE_Save_Descr.style('width', '38px');
	dom__WE_Save_Descr.mousePressed(dom__WE_Change_Device_Description);
    ///////////////////////////////////////////////	
	
	

    //////////////////////////////////////
	dom__WE_mob = createImg('pic/mob/001.png');
	dom__WE_mob.style('width', '60px');
	dom__WE_mob.mousePressed(dom__WE_MOB_SIMUL_show);
    ///////////////////////////////////////////////
	dom__WE_QR = createImg('pic/qr/004.png');
	dom__WE_QR.style('width', '40px');
	dom__WE_QR.mousePressed(dom__WE_MOB_SIMUL_show);
    ///////////////////////////////////////////////	
	dom__WE_TUN = createImg('pic/tun/005.png');
	dom__WE_TUN.style('width', '40px');
	dom__WE_TUN.mousePressed(dom__WE_MOB_SIMUL_show);
    ///////////////////////////////////////////////	

	
	
	
    div_QR = createDiv("");
    div_QR.id("qrcode");

    qrcode = new QRCode(document.getElementById("qrcode"), {
	width : 150,
	height : 150
    });
    
    
    this.show = function(x, y, Device_Name, Device_Index, Device_Name_Text, Device_Type) {
        this.x = x;
        this.y = y;
        this.Device_Name = Device_Name;
        this.Device_Index = Device_Index;;
        this.Device_Name_Text = Device_Name_Text;
        this.Device_Type = Device_Type;

        dom__hide_all();
        W2._Text(xText[22]); //"Device - Mobile Web"
        
        WE_DEV_ID = this.Device_Name;
        //QR CODE
    	var Data = "http://" + SERVER_IP + "/IOT/MOB/MOB.php?Dev="+WE_DEV_ID
    	//Mobile_screen_show(Data);
        
        qrcode.makeCode(Data);
        div_QR.show();
        
        dom__WE_Inp1.value(this.Device_Name);
        dom__WE_Inp2.value(this.Device_Name_Text);
        
        dom__WE_mob.show();
        dom__WE_P3.show();
        dom__WE_P4.show();
        dom__WE_Inp1.show();
        dom__WE_Inp2.show();
        dom__WE_Save_Descr.show();
        //dom__WE_QR.show();
        //dom__WE_TUN.show();
        
    };
    this.hide = function() {
        
        div_QR.hide();
        dom__WE_mob.hide();
        dom__WE_P3.hide();
        dom__WE_P4.hide();
        dom__WE_Inp1.hide();
        dom__WE_Inp2.hide();
        dom__WE_Save_Descr.hide();
        dom__WE_QR.hide();
        dom__WE_TUN.hide();
        
    };
}
//###############################################################
function dom__WE_MOB_SIMUL_show() {
	var Device_Name = dom__WE_Inp1.value();
	var Data = "http://" + SERVER_IP + "/IOT/MOB/MOB.php?Dev="+Device_Name;
	info.announce(1, "", Data);
	Mobile_screen_show(Data);
}
//###############################################################
function dom__WE_Change_Device_Description() {
	var Device_Name = Number(dom__WE_Inp1.value());
	var Description = dom__WE_Inp2.value();
	API_iot_CHANGE__Device_Description(Device_Name,Description);
	doSave();
}




