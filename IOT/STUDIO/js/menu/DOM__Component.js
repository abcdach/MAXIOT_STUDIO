//#--------------------------------------------------
//#     Menu component objects
//#--------------------------------------------------
var dom__Components;
////////////////////////
var Compon_but1;
var Compon_but2;
var Compon_but3;
function OBJECT_DOM_Components() {
    
	
    //////////////////////////////////////
    Term_Compon_P0 = createP("Component ID ( 100 - 99999 )"); //Device
    Term_Compon_P0.style('font-size', '10pt');
    Term_Compon_P0.style('font-family', 'Arial');
    Term_Compon_P0.style('font-color', '100');
    Term_Compon_P0.style('font-weight', 'bold');
    //Term_Compon_P0.style('font-style', 'italic');
    Term_Compon_P0.style('color', 'rgb(120, 120, 120)');
    //////////////////////////////////////
	
    //////////////////////////////////////         
    dom__Compon_Inp1 = createInput();
    dom__Compon_Inp1.style('width', '230px');
    dom__Compon_Inp1.style('textAlign', 'CENTER');
    dom__Compon_Inp1.style('background-color', '#E0F7FF');//blue
    dom__Compon_Inp1.changed(dom__Compon_Inp1_changed);
    
    //////////////////////////////////////
    
    //////////////////////////////////////////////////
    dom__Compon_progress1 = createElement('progress', '0');
    dom__Compon_progress1.style('width', '237px');
    dom__Compon_progress1.attribute("max", "100");
    dom__Compon_progress1.attribute("value", "22");
    dom__Compon_progress1.style('height', '10px');
    dom__Compon_progress1.attribute("value", 0);
    //////////////////////////////////////
	
    //////////////////////////////////////
    Term_Compon_P10 = createP("Component list"); //Component
    Term_Compon_P10.style('font-size', '12pt');
    Term_Compon_P10.style('font-family', 'Arial');
    Term_Compon_P10.style('font-color', '100');
    Term_Compon_P10.style('font-weight', 'bold');
    Term_Compon_P10.style('color', 'rgb(162, 162, 162)');
    //Term_Compon_P0.style('font-style', 'italic');
    //////////////////////////////////////	

    ///////////////////////////////////////////////   
	DOM_Compon_web_1_pic = createImg('pic/Dev/0.png');//Device
	DOM_Compon_web_1_pic.style('width', '70px');
	DOM_Compon_web_1_pic.mousePressed(do_CREATE_DEVICE_0);
	DOM_Compon_web_1_pic.mouseOver(DOM_Compon_web_1_pic_mouseOver);
	DOM_Compon_web_1_pic.mouseOut(DOM_Compon_web_1_pic_mouseOut);
    ///////////////////////////////////////////////   
	DOM_Compon_web_2_pic = createImg('pic/Dev/1.png'); //Mediator
	DOM_Compon_web_2_pic.style('width', '70px');
	DOM_Compon_web_2_pic.mousePressed(do_CREATE_DEVICE_1);
	DOM_Compon_web_2_pic.mouseOver(DOM_Compon_web_2_pic_mouseOver);
	DOM_Compon_web_2_pic.mouseOut(DOM_Compon_web_2_pic_mouseOut);
    ///////////////////////////////////////////////   
	DOM_Compon_web_3_pic = createImg('pic/Dev/2.png');//Web-Mob
	DOM_Compon_web_3_pic.style('width', '70px');
	DOM_Compon_web_3_pic.mousePressed(do_CREATE_DEVICE_2);
	DOM_Compon_web_3_pic.mouseOver(DOM_Compon_web_3_pic_mouseOver);
	DOM_Compon_web_3_pic.mouseOut(DOM_Compon_web_3_pic_mouseOut);
    //////////////////////////////////////

    //////////////////////////////////////
    Term_Compon_P1 = createP("Device"); //Device
    Term_Compon_P1.style('font-size', '10pt');
    Term_Compon_P1.style('font-family', 'Arial');
    Term_Compon_P1.style('font-color', '100');
    Term_Compon_P1.style('font-weight', 'bold');
    //Term_Compon_P1.style('font-style', 'italic');
    Term_Compon_P1.style('color', 'rgb(120, 120, 120)');
    //////////////////////////////////////
    Term_Compon_P2 = createP("Mediator"); //Mediator
    Term_Compon_P2.style('font-size', '10pt');
    Term_Compon_P2.style('font-family', 'Arial');
    Term_Compon_P2.style('font-color', '100');
    Term_Compon_P2.style('font-weight', 'bold');
    //Term_Compon_P2.style('font-style', 'italic');
    Term_Compon_P2.style('color', 'rgb(120, 120, 120)');
    ////////////////////////////////////// 	
    Term_Compon_P3 = createP("Web-Mob"); //Web-Mob
    Term_Compon_P3.style('font-size', '10pt');
    Term_Compon_P3.style('font-family', 'Arial');
    Term_Compon_P3.style('font-color', '100');
    Term_Compon_P3.style('font-weight', 'bold');
    //Term_Compon_P3.style('font-style', 'italic');
    Term_Compon_P3.style('color', 'rgb(120, 120, 120)');
    ////////////////////////////////////// 

    //////////////////////////////////////////
    Compon_but1 = createButton('DEVICE');
    Compon_but1.position(19, 19);
    Compon_but1.style('width', '160px');
    Compon_but1.style('height', '30px');
    Compon_but1.mousePressed(do_CREATE_DEVICE_0);
    //////////////////////////////////////////
    Compon_but2 = createButton('MEDIATOR');
    Compon_but2.position(19, 19);
    Compon_but2.style('width', '160px');
    Compon_but2.style('height', '30px');
    Compon_but2.mousePressed(do_CREATE_DEVICE_1);
    //////////////////////////////////////////
    Compon_but3 = createButton('WEB');
    Compon_but3.position(19, 19);
    Compon_but3.style('width', '160px');
    Compon_but3.style('height', '30px');
    Compon_but3.mousePressed(do_CREATE_DEVICE_2);
    //////////////////////////////////////////
    myDiv = createDiv('this is some text');
    myDiv.id("www");
    



    this.show = function() {
        dom__hide_all();
        //dom__W2_right_left_0(); dom__W2_Button_right.hide();
        W2._Text(xText[19]); //"Components"
        //////////////////////////
        //Compon_but1.show();
        //Compon_but2.show();
        //Compon_but3.show();
        DOM_Compon_web_1_pic.show();
        DOM_Compon_web_2_pic.show();
        DOM_Compon_web_3_pic.show();
        Term_Compon_P1.show();
        Term_Compon_P2.show();
        Term_Compon_P3.show();
        dom__Compon_Inp1.show();
        Term_Compon_P0.show();
        Term_Compon_P10.show();
        dom__Compon_progress1.show();
    };
    this.hide = function() {
        Compon_but1.hide();
        Compon_but2.hide();
        Compon_but3.hide();
        DOM_Compon_web_1_pic.hide();
        DOM_Compon_web_2_pic.hide();
        DOM_Compon_web_3_pic.hide();
        Term_Compon_P1.hide();
        Term_Compon_P2.hide();
        Term_Compon_P3.hide();
        dom__Compon_Inp1.hide();
        Term_Compon_P0.hide();
        Term_Compon_P10.hide();
        dom__Compon_progress1.hide();
    };
}
function dom__Compon_Inp1_changed(){
	//dom__Compon_Inp1.style('background-color', '#FFF1F1');
}

function DOM_Compon_web_1_pic_mouseOver() { //device
	DOM_Compon_web_1_pic.style('width', '72px');
}
function DOM_Compon_web_1_pic_mouseOut() { //device
	DOM_Compon_web_1_pic.style('width', '70px');
}
function DOM_Compon_web_2_pic_mouseOver() { //device
	DOM_Compon_web_2_pic.style('width', '72px');
}
function DOM_Compon_web_2_pic_mouseOut() { //device
	DOM_Compon_web_2_pic.style('width', '70px');
}
function DOM_Compon_web_3_pic_mouseOver() { //device
	DOM_Compon_web_3_pic.style('width', '72px');
}
function DOM_Compon_web_3_pic_mouseOut() { //device
	DOM_Compon_web_3_pic.style('width', '70px');
}


