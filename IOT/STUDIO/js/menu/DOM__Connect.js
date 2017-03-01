//#--------------------------------------------------
//#     Menu Options
//#--------------------------------------------------

var dom__Connect_P0;
var dom__Connect_Inp0;
var dom__Connect_Con;
var dom__Connect_Logo;
function OBJECT_DOM_Connect() {
    //////////////////////////////////////
    dom__Connect_P0 = createP("Password");
    dom__Connect_P0.style('font-size', '10pt');
    dom__Connect_P0.style('font-family', 'Arial');
    dom__Connect_P0.style('font-color', '100');;
    dom__Connect_P0.style('font-weight', 'bold');
    dom__Connect_P0.style('font-style', 'italic');
    //////////////////////////////////////          
    dom__Connect_Inp0 = createInput('type');//"local IP:"
    dom__Connect_Inp0.attribute("type", "password");
    dom__Connect_Inp0.style('width', '140px');
    dom__Connect_Inp0.style('textAlign', 'CENTER');
    dom__Connect_Inp0.style('background-color', '#DAF7A6');       
    ///////////////////////////////////////////////   
    dom__Connect_Con = createImg('pic/cone.png');
    dom__Connect_Con.style('width', '60px');
    dom__Connect_Con.mousePressed(Menu_Con_Connect);
    /////////////////////////////////////////////// 
    dom__Connect_Logo = createImg('pic/max_2.png');
    dom__Connect_Logo.style('width', '200px');
    //dom__Connect_Con.mousePressed(Menu_Con_Connect);
    /////////////////////////////////////////////// 
    this.show = function() {
        dom__hide_all();
        W2._Text("Connection");
        dom__Connect_P0.show();
        dom__Connect_Inp0.show();
        dom__Connect_Con.show();
        dom__Connect_Logo.show();
    };
    this.hide = function() {
        dom__Connect_P0.hide();
        dom__Connect_Inp0.hide();
        dom__Connect_Con.hide();
        dom__Connect_Logo.hide();
    };
}



