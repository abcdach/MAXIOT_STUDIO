//#--------------------------------------------------
//#     Menu component objects
//#--------------------------------------------------
var dom__Rooms;
////////////////////////
function OBJECT_DOM_Rooms() {
    

    ///////////////////////////////////////////////   
	DOM_Room_0_pic = createImg('pic/room/room_0.jpg');//Device
	DOM_Room_0_pic.style('width', '55px');
	DOM_Room_0_pic.mousePressed(dom__switch_room_0);
	DOM_Room_0x_pic = createImg('pic/room/room_0x.jpg');//Device
	DOM_Room_0x_pic.style('width', '55px');
	DOM_Room_0x_pic.mousePressed(dom__switch_room_0);
    ///////////////////////////////////////////////  
	DOM_Room_1_pic = createImg('pic/room/room_1.jpg');//Device
	DOM_Room_1_pic.style('width', '55px');
	DOM_Room_1_pic.mousePressed(dom__switch_room_1);
	DOM_Room_1x_pic = createImg('pic/room/room_1x.jpg');//Device
	DOM_Room_1x_pic.style('width', '55px');
	DOM_Room_1x_pic.mousePressed(dom__switch_room_1);
    ///////////////////////////////////////////////  
	DOM_Room_2_pic = createImg('pic/room/room_2.jpg');//Device
	DOM_Room_2_pic.style('width', '55px');
	DOM_Room_2_pic.mousePressed(dom__switch_room_2);
	DOM_Room_2x_pic = createImg('pic/room/room_2x.jpg');//Device
	DOM_Room_2x_pic.style('width', '55px');
	DOM_Room_2x_pic.mousePressed(dom__switch_room_2);
    ///////////////////////////////////////////////  
	DOM_Room_3_pic = createImg('pic/room/room_3.jpg');//Device
	DOM_Room_3_pic.style('width', '55px');
	DOM_Room_3_pic.mousePressed(dom__switch_room_3);
	DOM_Room_3x_pic = createImg('pic/room/room_3x.jpg');//Device
	DOM_Room_3x_pic.style('width', '55px');
	DOM_Room_3x_pic.mousePressed(dom__switch_room_3);
    ///////////////////////////////////////////////  
	
	
	
	
    this.show = function() {
        dom__hide_all();
        W2._Text(xText[30]); //"ROOMS" 
        //dom__W2_right_left_0(); dom__W2_Button_right.hide();
        dom__switch_rooms();
    };
    this.hide = function() {
    	
    	DOM_Room_0_pic.hide();
    	DOM_Room_0x_pic.hide();
    	DOM_Room_1_pic.hide();
    	DOM_Room_1x_pic.hide();
    	DOM_Room_2_pic.hide();
    	DOM_Room_2x_pic.hide();
    	DOM_Room_3_pic.hide();
    	DOM_Room_3x_pic.hide();
    	
    };
}


function dom__switch_rooms(){
	
	DOM_Room_0x_pic.show();
	DOM_Room_1x_pic.show();
	DOM_Room_2x_pic.show();
	DOM_Room_3x_pic.show();
	
	DOM_Room_0_pic.hide();
	DOM_Room_1_pic.hide();
	DOM_Room_2_pic.hide();
	DOM_Room_3_pic.hide();
	
    switch (iot__ROOM){
	    case 0:DOM_Room_0_pic.show();DOM_Room_0x_pic.hide();W1._Text(xText[2]+iot__ROOM);break;
	    case 1:DOM_Room_1_pic.show();DOM_Room_1x_pic.hide();W1._Text(xText[2]+iot__ROOM);break;
	    case 2:DOM_Room_2_pic.show();DOM_Room_2x_pic.hide();W1._Text(xText[2]+iot__ROOM);break;
	    case 3:DOM_Room_3_pic.show();DOM_Room_3x_pic.hide();W1._Text(xText[2]+iot__ROOM);break;
	    default:
	        break;
	} 
    Rooms_Enable();
}


function dom__switch_room_0(){ iot__ROOM = 0;dom__switch_rooms();}
function dom__switch_room_1(){ iot__ROOM = 1;dom__switch_rooms();}
function dom__switch_room_2(){ iot__ROOM = 2;dom__switch_rooms();}
function dom__switch_room_3(){ iot__ROOM = 3;dom__switch_rooms();}


