
function OBJECT_DOM_Template() {	
	this.show = function(x, y, Device_Name, Device_Index, Device_Name_Text, Device_Type) {
		this.x = x;
		this.y = y; 
		this.Device_Name = Device_Name;
		this.Device_Index = Device_Index;;
		this.Device_Name_Text = Device_Name_Text;
		this.Device_Type = Device_Type;
	
		dom__hide_all();
		W2._Text(xText[11]); //"Device - Sensor/Action "
	};	
	this.hide = function() {
		  
	};
}
//#####
dom__Selected = 0;
dom__Selected_Device = 1;
dom__Selected_Mediator1 = 2;
dom__Selected_Terminal = 3;
dom__Selected_Components = 4;
dom__Selected_Options = 5;
//#####
function dom__hide_all() {
    dom__Terminal.hide();
    dom__ME.hide();
    dom__Components.hide();
    dom__Options.hide();
    dom__WE.hide();
    dom__DE.hide();
    //dom__Mobile_screen.hide();
    dom__WebMob_Output.hide();
    dom__Rooms.hide();
    dom__Connect.hide();
}

document.write('<script type="text/javascript" src="js/menu/DOM__UP_MENIU.js"></script>');
document.write('<script type="text/javascript" src="js/menu/DOM__Options.js"></script>');
document.write('<script type="text/javascript" src="js/menu/DOM__Component.js"></script>');
document.write('<script type="text/javascript" src="js/menu/DOM__Terminal.js"></script>');
document.write('<script type="text/javascript" src="js/menu/DOM__Rooms.js"></script>');
document.write('<script type="text/javascript" src="js/menu/DOM__DE.js"></script>');
document.write('<script type="text/javascript" src="js/menu/DOM__ME.js"></script>');
document.write('<script type="text/javascript" src="js/menu/DOM__WE.js"></script>');
document.write('<script type="text/javascript" src="js/menu/DOM__WE_InOut.js"></script>');
document.write('<script type="text/javascript" src="js/menu/DOM__WE_MobSIM.js"></script>');
document.write('<script type="text/javascript" src="js/menu/DOM__Connect.js"></script>');

var dom__WebMob_Output;
function setup__menu() {
	dom__Mobile_screen = new OBJECT_DOM_Mobile_screen();
	dom__Terminal = new OBJECT_Terminal();
	Terminal_Data_Packets = new OBJECT_Terminal_Data_Packets(100,100);
	dom__ME = new OBJECT__DOM__ME(); dom__ME.put_code("Python Code");
	dom__DE = new OBJECT__DOM__DE();
	dom__Components = new OBJECT_DOM_Components();
	dom__Options = new OBJECT_DOM_Options();
	dom__WE = new OBJECT__DOM__WE();
	dom__WebMob_Output = new OBJECT_DOM_WebMob_OutPut();
	dom__Rooms = new OBJECT_DOM_Rooms();
	dom__Connect = new OBJECT_DOM_Connect();
	
	Menu_init();
	dom__hide_all();
	dom__Mobile_screen.hide();
	dom__W2_right_left_0();
	dom__ME_progress1_value(0);
	dom__Connect.show(); 
}

function draw__menu() {
	var i = 0;
	for (i = 0; i < Menu_Text.length; i++) {
		Menu_Text[i].display();
	}
}

//####
var dom__W2_right_left_STATUS = 0;
var Lef_Rig = 250;
function dom__W2_right_left_1(){
	dom__W2_right_left(1);
}
function dom__W2_right_left_0(){
	dom__W2_right_left(0);	
}
function dom__W2_right_left( value ) {

  if (value === 1) {
		dom__W2_right_left_STATUS = 1;
		W2.SizeW = 300 + Lef_Rig;  
      if (W4.show === 1){
      	W4.X = W2.X + W2.SizeW + 15 ;
      	W1.X = W4.X + W4.SizeW + 15 ;
      	W5.X = W1.X + W1.SizeW + 15 ;
      } else {
      	W1.X = W2.X + W2.SizeW + 15;
      	W5.X = W1.X + W1.SizeW + 15 ;
      }
      dom__W2_Button_right.hide();
      W3.SizeW = W1.X + W1.SizeW - 15;
      dom__W2_Button_Left.position(W2.X + W2.SizeW - 30, W2.Y + 22);
      dom__W2_Button_Left.show();
  } else {
  	dom__W2_right_left_STATUS = 1;
      W2.SizeW = 300;
      if (W4.show === 1){
      	W4.X = W2.X + W2.SizeW + 15;
      	W1.X = W4.X + W4.SizeW + 15;
      	W5.X = W1.X + W1.SizeW + 15;
      } else {
      	W1.X = W2.X + W2.SizeW + 15;
      	W5.X = W1.X + W1.SizeW + 15;
      }
      dom__W2_Button_Left.hide();
      dom__W2_Button_right.position(W2.X + W2.SizeW - 30, W2.Y + 22);
      dom__W2_Button_right.show();
      W3.SizeW = W1.X + W1.SizeW - 15;
  }

  // terminal ################################
  Term_Inp2_P1.position(W2.X + 10, W2.Y + 18);
  Term_Inp2_P2.position(W2.X + 10, W2.Y + 68);
  Term_Inp2.position(W2.X + 10, W2.Y + 48);
  Term_Inp2.style('width', (W2.SizeW - 25) + 'px');
  Term_textarea1.position(W2.X + 10, W2.Y + 98);
  Term_textarea1.style('width', (W2.SizeW - 25) + 'px');
  Terminal_Data_Packets.x = W2.X + 10;
  Terminal_Data_Packets.y = W2.Y + 68;
  Terminal_Data_Packets.text_len = 44;
  // Components ##############################
  Compon_but1.position(W2.X + 10, W2.Y + 140);
  Compon_but2.position(W2.X + 10, W2.Y + 180);
  Compon_but3.position(W2.X + 10, W2.Y + 220);
  Term_Compon_P0.position(W2.X + 30, W2.Y + 29+3);
  dom__Compon_Inp1.position(W2.X + 30, W2.Y + 60+3);
  dom__Compon_progress1.position(W2.X + 30, W2.Y + 60+27);
  Term_Compon_P10.position(W2.X + 90, W2.Y + 100);
  
  var T1 = 25;var T2 = 90;var T3 = 140;var T4 = T3 + 50;
  DOM_Compon_web_1_pic.position(W2.X + T1, W2.Y + T3);T1+=T2;
  DOM_Compon_web_2_pic.position(W2.X + T1, W2.Y + T3);T1+=T2;
  DOM_Compon_web_3_pic.position(W2.X + T1, W2.Y + T3);T1+=T2;
  
  Term_Compon_P1.position(W2.X + 35, W2.Y + T4);
  Term_Compon_P2.position(W2.X + 120, W2.Y + T4);
  Term_Compon_P3.position(W2.X + 207, W2.Y + T4);

  // WE #######################################
  dom__WE_P3.position(W2.X + 10, W2.Y + 18);
  dom__WE_P4.position(W2.X + 85, W2.Y + 18);
  dom__WE_Inp1.position(W2.X + 10, W2.Y + 50);
  dom__WE_Inp2.position(W2.X + 85, W2.Y + 50);
  dom__WE_Save_Descr.position(W2.X + 260, W2.Y + 49);
  div_QR.position(W2.X + (W2.SizeW - 150)/2 , W2.Y + (W2.SizeH - 20 - 150)/2  );

  dom__WE_QR.position(W2.X + W2.SizeW - 101, W4.Y + W2.SizeH - 50);
  dom__WE_TUN.position(W2.X + W2.SizeW - 155, W4.Y + W2.SizeH - 50);
  dom__WE_mob.position(W2.X + W2.SizeW - 60, W4.Y + W2.SizeH - 85);
  dom__WE_P5.position(W2.X + W2.SizeW - 165, W2.Y + W2.SizeH-40);
  // DE #######################################
  dom__DE_P3.position(W2.X + 10, W2.Y + 18);
  dom__DE_P4.position(W2.X + 85, W2.Y + 18);
  dom__DE_Inp1.position(W2.X + 10, W2.Y + 50);
  dom__DE_Inp2.position(W2.X + 85, W2.Y + 50);  
  //dom__DE_Save_Descr.position(W2.X + 260, W2.Y + 49);
  dom__DE_Logo.position(W2.X+W2.SizeW/2-100, W1.Y+230);
  //mediator1 #################################
  dom__ME_P3.position(W2.X + 10, W2.Y + 18);
  dom__ME_P4.position(W2.X + 85, W2.Y + 18);
  dom__ME_Inp1.position(W2.X + 10, W2.Y + 50);
  dom__ME_Inp2.position(W2.X + 85, W2.Y + 50);
  dom__ME_P5.position(W2.X + 10, W2.Y + 68);
  dom__ME_Sav_0.position(W2.X + W2.SizeW - 70, W2.Y + W2.SizeH - 50);
  dom__ME_Sav_1.position(W2.X + W2.SizeW - 70, W2.Y + W2.SizeH - 50);
  dom__ME_Sav_2.position(W2.X + W2.SizeW - 70, W2.Y + W2.SizeH - 50);
  dom__ME_progress1.position(W2.X + 105, W2.Y + 66 + 18);
  div0.style('width', W2.X + W2.SizeW - 35 + 'px');
  dom__ME_Sav_0.position(W2.X + W2.SizeW - 70, W2.Y + W2.SizeH - 50);
  dom__ME_Sav_1.position(W2.X + W2.SizeW - 70, W2.Y + W2.SizeH - 50);
  dom__ME_Sav_2.position(W2.X + W2.SizeW - 70, W2.Y + W2.SizeH - 50);
  Sav_000.position(W1.X + W1.SizeW - 75, W1.Y + 23);
  Sav_001.position(W1.X + W1.SizeW - 75, W1.Y + 23);
  Sav_002.position(W1.X + W1.SizeW - 75, W1.Y + 23);
  dom__ME_progress1.style('width', (W2.SizeW - 115) + 'px'); 
  // Mobile screen #############################
  DOM_Mobile_screen_pic.position(W4.X + W4.SizeW - 25, W4.Y - 1);
  DOM_Mobile_screen_DIV.position(W4.X+2, W4.Y + 23);
  // WebMob_OutPut #############################
  DOM_WebMob_P_Device.position(W2.X + 10, W2.Y + 18);//device
  DOM_WebMob_INP_Device.position(W2.X + 10, W2.Y + 50); 
  DOM_WebMob_P_Description.position(W2.X + 10, W2.Y + 18+50);//discripsheni 
  DOM_WebMob_INP_Description.position(W2.X + 10, W2.Y + 50+50);
  DOM_WebMob_P_OutPut.position(W2.X + 85, W2.Y + 18 + 0);//indexi
  DOM_WebMob_P_InPut.position(W2.X + 85, W2.Y + 18 + 0);//indexi
  DOM_WebMob_INP_InOut_index.position(W2.X + 85, W2.Y + 50 + 0);
  DOM_WebMob_P_UIElement.position(W2.X + 160, W2.Y  + 18 + 0);//componentis archeva
  DOM_WebMob_SELECT_OutPut.position(W2.X + 160, W2.Y + 50 + 0);
  DOM_WebMob_SELECT_InPut.position(W2.X + 160, W2.Y + 50 + 0);
 
  DOM_WebMob_ELEM_Progress.position(W2.X + 95, W2.Y + 18+50+17);
  
  //DOM_WebMob_IMG_MOB_SIMUL.position(W2.X + W2.SizeW - 60, W4.Y + W2.SizeH - 65);
   
  DOM_WebMob_IMG_MOB_SIMUL.position(W2.X + W2.SizeW - 60, W4.Y + W2.SizeH - 85);
  DOM_WebMob_P5.position(W2.X + W2.SizeW - 165, W2.Y + W2.SizeH-40);//!!!!!!
  
  
  DOM_WebMob_IMG_SAVE_OutPut.position(W2.X + 222, W2.Y + 18+50+50+15);
  DOM_WebMob_IMG_SAVE_InPut.position(W2.X + 222, W2.Y + 18+50+50+15);
  
  DOM_WE_P1.position(W2.X+W2.SizeW/2-125+20, W2.Y + 90+30);
  DOM_WE_P2.position(W2.X+W2.SizeW/2-125, W2.Y + 90+45);
  DOM_WE_Logo.position(W2.X+W2.SizeW/2-100, W1.Y+230);
  ///////////////////////////////////////////////////////////////////////////
  DOM_WebMob_OutPut_UI_None_IMG.position(W2.X + 5, W2.Y + 130);
  DOM_WebMob_OutPut_UI_Flip_Switch_IMG.position(W2.X + 5, W2.Y + 130);
  DOM_WebMob_OutPut_UI_Slider_IMG.position(W2.X + 5, W2.Y + 130);
  DOM_WebMob_OutPut_UI_Button_IMG.position(W2.X + 5, W2.Y + 130);
  ///////////////////////////////////////////////////////////////////////////
  DOM_WebMob_InPut_UI_None_IMG.position(W2.X + 5, W2.Y + 130);
  DOM_WebMob_InPut_UI_Text_Input_IMG.position(W2.X + 5, W2.Y + 130);
  //#########################################################################
  DOM_Room_0_pic.position(W2.X + 15, W2.Y + 45);
  DOM_Room_0x_pic.position(W2.X + 15, W2.Y + 45);
  
  DOM_Room_1_pic.position(W2.X + 15, W2.Y + 45 + 65);
  DOM_Room_1x_pic.position(W2.X + 15, W2.Y + 45 + 65);
  
  DOM_Room_2_pic.position(W2.X + 15, W2.Y + 45 + 65*2);
  DOM_Room_2x_pic.position(W2.X + 15, W2.Y + 45 + 65*2); 
  
  DOM_Room_3_pic.position(W2.X + 15, W2.Y + 45 + 65*3);
  DOM_Room_3x_pic.position(W2.X + 15, W2.Y + 45 + 65*3);
  //#########################################################################
  var ofs = 10;  
  dom__Options_P0.position(W2.X + 15, W2.Y + 23+ofs);//"local IP:"
  dom__Options_P1.position(W2.X + 172, W2.Y + 23+ofs);//"local PORT:"
  dom__Options_Inp0.position(W2.X + 15, W2.Y + 53+ofs);//"local IP:"
  dom__Options_Inp1.position(W2.X + 172, W2.Y + 53+ofs);//"local PORT:"  
  dom__Options_Sav1.position(W2.X + 258, W2.Y + 53+ofs);  
  dom__Options_progress1.position(W2.X + 15, W2.Y + 80+ofs);
  //#########################################################################
  ofs = 10;  
  dom__Connect_P0.position(W2.X + 35+10, W2.Y + 53+ofs);//"local IP:"
  dom__Connect_Inp0.position(W2.X + 35+10, W2.Y + 83+ofs);//"local IP:"
  dom__Connect_Con.position(W2.X + 195+10, W2.Y + 55+ofs);
  //dom__Connect_Con.position(W2.X + 193, W2.Y + 58+ofs);
  //dom__Connect_Logo.position(W2.X, W2.Y);
  dom__Connect_Logo.position(W2.X+W2.SizeW/2-100, W1.Y+190);
  //#########################################################################
}

