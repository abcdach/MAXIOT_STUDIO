
var dom__Mobile_screen;
var DOM_Mobile_screen;
var DOM_Mobile_screen_DIV;
var DOM_Mobile_screen_iframe;
function OBJECT_DOM_Mobile_screen(){
	
    ///////////////////////////////////////////////   
	DOM_Mobile_screen_pic = createImg('pic/exit/004.png');
	DOM_Mobile_screen_pic.style('width', '23px');
	DOM_Mobile_screen_pic.mousePressed(DOM_Mobile_screen_hide);
    ///////////////////////////////////////////////
    DOM_Mobile_screen_DIV = createDiv("");
    DOM_Mobile_screen_DIV.id("wrap");
    //DOM_Mobile_screen_DIV.style('width', '360px');
    ///////////////////////////////////////////////
    DOM_Mobile_screen_iframe  = createElement('iframe');
    DOM_Mobile_screen_iframe.id("frame");
    DOM_Mobile_screen_iframe.attribute("src", "../MOV/");
    //DOM_Mobile_screen_iframe.attribute("src", "http://10.0.0.100/iot/mowe/");
    //DOM_Mobile_screen_iframe.attribute("width", "324");
    //DOM_Mobile_screen_iframe.attribute("height", "474");
    DOM_Mobile_screen_DIV.child(DOM_Mobile_screen_iframe);

    
  this.show = function(Data) {
	W4.show = 1;
	DOM_Mobile_screen_pic.show();
	DOM_Mobile_screen_DIV.show();
	dom__W2_right_left_0();
	DOM_Mobile_screen_iframe.attribute("src", Data);

  };
  this.hide = function() {
	  DOM_Mobile_screen_DIV.hide();
	  DOM_Mobile_screen_pic.hide();
  };
}
function DOM_Mobile_screen_hide(){
	  W4.show = 0;
	  DOM_Mobile_screen_pic.hide();
	  dom__W2_right_left_0();
	  DOM_Mobile_screen_DIV.hide();
}
function Mobile_screen_show(Data){
	dom__Mobile_screen.show(Data);	
}
function Mobile_screen_refresh(Data){
	DOM_Mobile_screen_iframe.attribute("src", Data);
}










