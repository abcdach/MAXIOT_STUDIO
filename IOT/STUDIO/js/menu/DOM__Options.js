//#--------------------------------------------------
//#     Menu Options
//#--------------------------------------------------
var dom__Options;
var dom__Options_P0;
var dom__Options_P1;
var dom__Options_P2;
var dom__Options_P3;
var dom__Options_Inp0;
var dom__Options_Inp1;
var dom__Options_Inp2;
var dom__Options_Inp3;
var dom__Options_Sav1;
var dom__Options_progress1;
function OBJECT_DOM_Options() {
	
    //////////////////////////////////////
    dom__Options_P0 = createP(xText[32]); //"local IP:"
    dom__Options_P0.style('font-size', '10pt');
    dom__Options_P0.style('font-family', 'Arial');
    dom__Options_P0.style('font-color', '100');;
    dom__Options_P0.style('font-weight', 'bold');
    dom__Options_P0.style('font-style', 'italic')
    ////////////////////////////////////// 
    dom__Options_P1 = createP(xText[33]); //"local PORT:"
    dom__Options_P1.style('font-size', '10pt');
    dom__Options_P1.style('font-family', 'Arial');
    dom__Options_P1.style('font-color', '100');;
    dom__Options_P1.style('font-weight', 'bold');
    dom__Options_P1.style('font-style', 'italic')
    ////////////////////////////////////// 	
    //dom__Options_P2 = createP(xText[34]); //"Remote IP:"
    //dom__Options_P2.style('font-size', '10pt');
    //dom__Options_P2.style('font-family', 'Arial');
    //dom__Options_P2.style('font-color', '100');;
    //dom__Options_P2.style('font-weight', 'bold');
    //dom__Options_P2.style('font-style', 'italic')
    ////////////////////////////////////// 	
   // dom__Options_P3 = createP(xText[35]); //"Remote PORT:"
    //dom__Options_P3.style('font-size', '10pt');
    //dom__Options_P3.style('font-family', 'Arial');
    //dom__Options_P3.style('font-color', '100');;
    //dom__Options_P3.style('font-weight', 'bold');
    //dom__Options_P3.style('font-style', 'italic')
    ////////////////////////////////////// 	
    
    
    //////////////////////////////////////         
    dom__Options_Inp0 = createInput();//"local IP:"
    dom__Options_Inp0.style('width', '140px');
    dom__Options_Inp0.style('textAlign', 'CENTER');
    dom__Options_Inp0.style('background-color', '#DAF7A6');
    //////////////////////////////////////         
    dom__Options_Inp1 = createInput();//"local PORT:"
    dom__Options_Inp1.style('width', '70px');
    dom__Options_Inp1.style('textAlign', 'CENTER');
	dom__Options_Inp1.style('background-color', '#DAF7A6');
    //////////////////////////////////////         
    //dom__Options_Inp2 = createInput();//"Remote IP:"
    //dom__Options_Inp2.style('width', '140px');
    //dom__Options_Inp2.style('textAlign', 'CENTER');    
    //////////////////////////////////////         
    //dom__Options_Inp3 = createInput();//"Remote PORT:"
    //dom__Options_Inp3.style('width', '70px');
    //dom__Options_Inp3.style('textAlign', 'CENTER');    
    
    
    ///////////////////////////////////////////////   
    dom__Options_Sav1 = createImg('pic/Save_1.png');
    dom__Options_Sav1.style('width', '38px');
    dom__Options_Sav1.mousePressed(iot_LOCAL_STORAGE_WRITE);
    ///////////////////////////////////////////////
    
    dom__Options_progress1 = createElement('progress', '0');
    dom__Options_progress1.style('width',235 + 'px');
    dom__Options_progress1.attribute("max", "100");
    dom__Options_progress1.attribute("value", "100");
    dom__Options_progress1.style('height', '10px');    
    
    ///////////////////////////////////////////////

    
    
    
    this.show = function() {
        dom__hide_all();      
        W2._Text(xText[20]); //"Options"
        //dom__W2_right_left_0(); dom__W2_Button_right.hide();

        dom__Options_P0.show();
        dom__Options_P1.show();
        //dom__Options_P2.show();
        //dom__Options_P3.show();
        dom__Options_Inp0.show();
        dom__Options_Inp1.show();
        //dom__Options_Inp2.show();
        //dom__Options_Inp3.show();
        dom__Options_Sav1.show();
        dom__Options_progress1.show();
    };
    this.hide = function() {
    	dom__Options_P0.hide();
    	dom__Options_P1.hide();
    	//dom__Options_P2.hide();
    	//dom__Options_P3.hide();
    	dom__Options_Inp0.hide();
    	dom__Options_Inp1.hide();
    	//dom__Options_Inp2.hide();
    	//dom__Options_Inp3.hide();
    	dom__Options_Sav1.hide();
    	dom__Options_progress1.hide();
    };
      
    
    
    
}