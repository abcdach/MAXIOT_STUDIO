//#--------------------------------------------------
//#     Menu Mediator1
//#--------------------------------------------------
var dom__ME;
var CODE_Mediator1_Name = 0;
var CODE_TEXT_ID;
var CODE_Editor;
//////////////////////////////////////
var dom__ME_P3;
var dom__ME_P4;
var dom__ME_Inp1;
var dom__ME_Inp2;
var dom__ME_P5;
var dom__ME_Sav_0;
var dom__ME_Sav_1;
var dom__ME_Sav_2;
var dom__ME_progress1;

function OBJECT__DOM__ME() {
    //////////////////////////////////////
    dom__ME_P3 = createP(xText[15]); //"Name:"
    dom__ME_P3.style('font-size', '10pt');
    dom__ME_P3.style('font-family', 'Arial');
    dom__ME_P3.style('font-color', '100');;
    dom__ME_P3.style('font-weight', 'bold');
    dom__ME_P3.style('font-style', 'italic')
    //////////////////////////////////////       
    dom__ME_P4 = createP(xText[14]); //"Description:"
    dom__ME_P4.style('font-size', '10pt');
    dom__ME_P4.style('font-family', 'Arial');
    dom__ME_P4.style('font-color', '#AAAAAA');
    dom__ME_P4.style('font-weight', 'bold');
    dom__ME_P4.style('font-style', 'italic')
    //////////////////////////////////////         
    dom__ME_Inp1 = createInput();
    dom__ME_Inp1.style('width', '60px');
    dom__ME_Inp1.style('textAlign', 'CENTER');
    dom__ME_Inp1.style('background-color', '#DAF7A6');
    //////////////////////////////////////
    dom__ME_Inp2 = createInput();
    dom__ME_Inp2.style('width', '199px');
    dom__ME_Inp2.style('textAlign', 'CENTER');
    dom__ME_Inp2.style('background-color', '#DAF7A6');
    //////////////////////////////////////     
	//dom__ME_Save_Descr = createImg('pic/Save_1.png'); //"Description:"
	//dom__ME_Save_Descr.style('width', '38px');
	//dom__ME_Save_Descr.mousePressed(dom__ME_Change_Device_Description);
    ///////////////////////////////////////////////	 
    dom__ME_P5 = createP(xText[13]); //"Python Code:"
    dom__ME_P5.style('font-size', '10pt');
    dom__ME_P5.style('font-family', 'Arial');
    dom__ME_P5.style('font-color', '#AAAAAA');
    dom__ME_P5.style('font-weight', 'bold');
    dom__ME_P5.style('font-style', 'italic')
    ///////////////////////////////////////////////   
    dom__ME_Sav_0 = createImg('pic/Save_0.png');
    dom__ME_Sav_0.style('width', '65px');
    dom__ME_Sav_0.mousePressed(doSave);
    ///////////////////////////////////////////////   
    dom__ME_Sav_1 = createImg('pic/Save_1.png');
    dom__ME_Sav_1.style('width', '65px');
    dom__ME_Sav_1.mousePressed(Save_CODE);
    ///////////////////////////////////////////////
    dom__ME_Sav_2 = createImg('pic/Save_2.png');
    dom__ME_Sav_2.style('width', '65px');
    //////////////////////////////////////////////////
    dom__ME_progress1 = createElement('progress', '0');
    dom__ME_progress1.style('width', (W2.SizeW - 115) + 'px');
    dom__ME_progress1.attribute("max", "100");
    dom__ME_progress1.attribute("value", "22");
    dom__ME_progress1.style('height', '10px');
    //##########################################################################
    div0 = createDiv('');
    div0.position(W2.X + 10, W2.Y + 101);
    div0.style('width', W2.X + W2.SizeW - 35 + 'px');
    var f = document.getElementById('CodeMir');
    div0.child(f);
    CODE_TEXT_ID = document.getElementById('code');
    CODE_TEXT_ID.value = "...";
    //////////////////////////////////////////////////   
    CODE_Editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        mode: {
            name: "python",
            version: 3,
            singleLineStringErrors: false
        },
        lineNumbers: true,
        indentUnit: 4,
        matchBrackets: true
    });
    //##########################################################################
    this.put_code = function(data) {
        CODE_Editor.getDoc().setValue(data);
    };
    this.get_code = function() {
        return CODE_Editor.getValue();
    };

    this.show = function(x, y, Device_Name, Device_Index, Device_Name_Text, Device_Type) {
      this.x = x;
        this.y = y;
        this.Device_Name = Device_Name;
        this.Device_Index = Device_Index;;
        this.Device_Name_Text = Device_Name_Text;
        this.Device_Type = Device_Type;

        dom__hide_all();
        //dom__W2_right_left_0(); dom__W2_Button_right.show();
        W2._Text(xText[12]); //"Device - Mediator "
        dom__ME_Inp1.value(this.Device_Name);
        CODE_Mediator1_Name = this.Device_Name;
        dom__ME_Inp2.value(this.Device_Name_Text);
        dom__ME_P3.show();
        dom__ME_P4.show();
        dom__ME_Inp1.show();
        dom__ME_Inp2.show();
        //dom__ME_Save_Descr.show();
        dom__ME_P5.show();
        div0.show();
        dom__ME_Sav_1.show();
        dom__ME_progress1.show();
        Read_CODE();
    };
    this.hide = function() {
        dom__ME_P3.hide();
        dom__ME_P4.hide();
        dom__ME_Inp1.hide();
        dom__ME_Inp2.hide();
        //dom__ME_Save_Descr.hide();
        dom__ME_P5.hide();
        div0.hide();
        dom__ME_progress1.hide();
        dom__ME_Sav_0.hide();
        dom__ME_Sav_1.hide();
        dom__ME_Sav_2.hide();
    };
}

function dom__ME_progress1_value(Data) {
    dom__ME_progress1.attribute("value", Data);
}
//###############################################################
//function dom__ME_Change_Device_Description() {
//	var Device_Name = Number(dom__ME_Inp1.value());
//	var Description = dom__ME_Inp2.value();
//	API_iot_CHANGE__Device_Description(Device_Name,Description);
//}
