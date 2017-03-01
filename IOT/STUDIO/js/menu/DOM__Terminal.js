//#--------------------------------------------------
//#     Menu Terminal
//#--------------------------------------------------
var Term_Text;
var dom__Terminal;
var div0;
//////////////////////////////////////////////
var Term_Inp2_P1;
var Term_Inp2_P2;
var Term_Inp2;
var Term_textarea1;

var Terminal_Data_Packets;

function OBJECT_Terminal_Data_Packets(x, y){
    this.x = x;
    this.y = y;
    this.enable = 0;
    this.text = "";
    this.text_len = 0;
    
    this.draw = function() {  
    	if(this.enable === 0){
		    Data_Text = this.text;	 	
			var Data_Text_length = Data_Text.length;
		    if(Data_Text_length > this.text_len){
		    	Data_Text = Data_Text.substr(0, this.text_len-2) + "...";
		    }	
			
		    textStyle(NORMAL);
		    textAlign(LEFT);
		    fill(0);
		    noStroke();;  
		    textSize(14);
			text(Data_Text, this.x, this.y);
    	}
    }
}

function OBJECT_Terminal() {
    //////////////////////////////////////
    Term_Inp2_P1 = createP(xText[18]); //"Data Packets:"
    Term_Inp2_P1.style('font-size', '10pt');
    Term_Inp2_P1.style('font-family', 'Arial');
    Term_Inp2_P1.style('font-color', '100');
    Term_Inp2_P1.style('font-weight', 'bold');
    Term_Inp2_P1.style('font-style', 'italic');
    //////////////////////////////////////
    Term_Inp2_P2 = createP(xText[17]); //"Command Packets:"
    Term_Inp2_P2.style('font-size', '10pt');
    Term_Inp2_P2.style('font-family', 'Arial');
    Term_Inp2_P2.style('font-color', '100');
    Term_Inp2_P2.style('font-weight', 'bold');
    Term_Inp2_P2.style('font-style', 'italic');
    ////////////////////////////////////// 
    Term_Inp2 = createInput();
    //////////////////////////////////////
    Term_textarea1 = createElement('textarea', 'im an h2 p5.element!');
    Term_textarea1.style('height', '320px');
    Term_textarea1.show();
    ////////////////////////////////////// 
    this.show = function() {
        dom__hide_all();
        //dom__W2_right_left_0(); dom__W2_Button_right.show();
        W2._Text(xText[8]); //"Terminal"
        //Term_Inp2.show();
        Term_textarea1.show();
        Term_Inp2_P1.show();
        Term_Inp2_P2.show();
        Terminal_Data_Packets.enable = 0;
    };
    this.hide = function() {
        Term_Inp2.hide();
        Term_textarea1.hide();
        Term_Inp2_P1.hide();
        Term_Inp2_P2.hide();
        Terminal_Data_Packets.enable = 1;
    };
}

