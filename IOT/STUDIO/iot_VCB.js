///////////////////////////////////////
var iot_Canvas;
var iot__ROOM = 0;
///////////////////////////////////////
var CREATOR_SQL = 1;
var CREATOR_LOCAL = 2;
var ENABLE = 1;
var DISABLE = 0;
var NEW_CONN = 2;
var SQL_CONN_ON = 1;
var SQL_CONN_OFF = 3;
///////////////////////////////////////
var iot__Device = [];
var iot__OutPut = [];
var iot__InPut = [];
var iot__Interconn = [];
///////////////////////////////////////
var iot__OutPut_SizeW = 14;
var iot__OutPut_SizeH = 10;
var iot__InPut_SizeW = 14;
var iot__InPut_SizeH = 10;
///////////////////////////////////////
var iot__Deviceice_SizeW = 62;
var iot__CanvasX = 0;
var iot__CanvasY = 0;
var iot__CanvasW = 2000;
var iot__CanvasH = 800;
///////////////////////////////////////
var iot__CODE = "";
////////////////////////////////////////////////////////
var iot__mousePressed_OutPut_Status = 0;
var iot__mousePressed_InPut_Status = 0;
var iot__mousePressed_OutPut_locked = 0;
var iot__mousePressed_InPut_locked = 0;
var iot__mousePressed_Interconn_Device_name = 0;
var iot__mousePressed_Interconn_Devise_name = 0;
var iot__mousePressed_Interconn_OutPut_index = 0;
var iot__mousePressed_Interconn_InPut_index = 0;
var iot__mousePressed_OutPut_InPut_Step = 0;
////////////////////////////////////////////////////////
var iot__Last_Selected_Device_name = 0;
var iot__Last_Selected_InPut_Index = 255;
var iot__Last_Selected_OutPut_Index = 255;
var iot__Selected_Device_name = 0;
var iot__GLOBAL_Lock = 0;
var _iot__Selected_Device_name;
var iot__InOut_Meneger;
////////////////////////////////////////////////////////
var Popup_window = 0;
var Popup_window_x = 0;
var Popup_window_y = 0;
var Popup_window_Device_OutPut_index = 0;
var Popup_window_Device_Device_name  = 0;
////////////////////////////////////////////////////////////////////////////
//
//   
//
//
//////////////////////////////////////////////////////////////////////////
function setup__VCB() {
    iot__InOut_Meneger = new OBJECT_iot__InOut_Meneger();
}
////////////////////////////////////////////////////////////////////////////
//
//   APIS
//
//////////////////////////////////////////////////////////////////////////
function API_iot_CREATE_Device_InPut(Device_name, InPut_Index, CREATOR, STATUS) {
    var Device_index = API_iot_GET__Device_Index(Device_name);
    if (Device_index !== -1) {
        if (typeof iot__InPut[Device_index][InPut_Index] === "undefined") {
            var Temp1 = iot__InPut[Device_index].length;
            for (var i = Temp1; i < InPut_Index + 1; i++) {
                iot__InPut[Device_index][i] = new OBJECT_iot__Device_InPut(Device_name, i, CREATOR, STATUS);
                TERMINAL(FROM_SYS + "CREATE INPUT :" + Device_name + " ("+InPut_Index+")"+'\n');
            }
            iot__Device[Device_index].Device_refresh = 1;
            redraw();
            return InPut_Index;
        } else {
        	TERMINAL(FROM_SYS + "UPDATE INPUT :" + Device_name + " ("+InPut_Index+")"+'\n');
        	iot__InPut[Device_index][InPut_Index].CREATOR = CREATOR_SQL;
        	iot__InPut[Device_index][InPut_Index].Status = 1;
            iot__Device[Device_index].Device_refresh = 1;
            redraw();
            return InPut_Index;
        }
    }
    return -1;
}
//////////////////////////////////////////////////////////////////////////
function API_iot_CREATE_Device_OutPut(Device_name, OutPut_Index, CREATOR, STATUS) {
    var Device_index = API_iot_GET__Device_Index(Device_name);
    if (Device_index !== -1) {
        if (typeof iot__OutPut[Device_index][OutPut_Index] === "undefined") {
            var Temp1 = iot__OutPut[Device_index].length;
            for (var i = Temp1; i < OutPut_Index + 1; i++) {
                iot__OutPut[Device_index][i] = new OBJECT_iot__Device_OutPut(Device_name, i, CREATOR, STATUS);
                TERMINAL(FROM_SYS + "CREATE OUTPUT :" + Device_name + " ("+OutPut_Index+")"+'\n');
            }
            iot__Device[Device_index].Device_refresh = 1;
            redraw();
            return OutPut_Index;
        } else {
        	TERMINAL(FROM_SYS + "UPDATE OUTPUT :" + Device_name + " ("+OutPut_Index+")"+'\n');
        	iot__OutPut[Device_index][OutPut_Index].CREATOR = CREATOR_SQL;
        	iot__OutPut[Device_index][OutPut_Index].Status = 1;
        	iot__Device[Device_index].Device_refresh = 1;
            redraw();
            return OutPut_Index;
        }
    }
    return -1;
}

function API_iot_DELETE_Device_OutPut(Device_name, OutPut_Index) {
    var Device_index = API_iot_GET__Device_Index(Device_name);
    if (Device_index !== -1) {
        if (typeof iot__OutPut[Device_index][OutPut_Index] !== "undefined") {
        	iot__OutPut[Device_index].splice(OutPut_Index, 1);
            TERMINAL(FROM_SYS + "DELETE OUTPUT :" + Device_name + " ("+OutPut_Index+")"+'\n');
            iot__Device[Device_index].Device_refresh = 1;
            redraw();
            return OutPut_Index;
        }
    }
    return -1;
}


function API_iot_DELETE_Device_InPut(Device_name, InPut_Index) {
    var Device_index = API_iot_GET__Device_Index(Device_name);
    if (Device_index !== -1) {
        if (typeof iot__InPut[Device_index][InPut_Index] !== "undefined") {
        	iot__InPut[Device_index].splice(InPut_Index, 1);
            TERMINAL(FROM_SYS + "DELETE INPUT :" + Device_name + " ("+InPut_Index+")"+'\n');
            iot__Device[Device_index].Device_refresh = 1;
            redraw();
            return InPut_Index;
        }
    }
    return -1;
}

//////////////////////////////////////////////////////////////////////////
function API_iot_DELETE__Interconn(Interconn_index, CREATOR) {
    if (CREATOR === CREATOR_LOCAL) {
        if (typeof iot__Interconn[Interconn_index] !== "undefined") {
            if (iot__Interconn[Interconn_index].CREATOR === CREATOR_SQL) {
                if (iot__Interconn[Interconn_index].Status === SQL_CONN_OFF) {

                    var Device_index_1 = iot__Interconn[Interconn_index].Device_index_1;
                    var Device_index_2 = iot__Interconn[Interconn_index].Device_index_2;
                    var OutPut_index = iot__Interconn[Interconn_index].OutPut_index;
                    var InPut_index = iot__Interconn[Interconn_index].InPut_index;
                    var iot__OutPut_Status = iot__OutPut[Device_index_1][OutPut_index].Status;
                    var iot__InPut_Status = iot__InPut[Device_index_2][InPut_index].Status;
                    if (iot__OutPut_Status === ENABLE && iot__InPut_Status === ENABLE) {
                        iot__Interconn[Interconn_index].Status = SQL_CONN_ON;
                    } else {

                        if (iot__OutPut_Status !== ENABLE) {
                            //iot__INFO_Text.text = "1 kavshirs ver daamyareba radgen mowyobiloba " + iot__Interconn[Interconn_index].Device_name_1 + "-is indexit " + OutPut_index + " gamosasvleli ganeitralebulia";
                        }
                        if (iot__InPut_Status !== ENABLE) {

                        }
                    }
                } else {
                    iot__Interconn[Interconn_index].Status = SQL_CONN_OFF;
                }
            }
            if (iot__Interconn[Interconn_index].CREATOR === CREATOR_LOCAL) {
                iot__Interconn.splice(Interconn_index, 1);
                //iot__INFO_Text.text = "axali kavshiri warmatebit waishala";
            }
            redraw();
            return 1;
        }
        return -1;
    }
    /////////////////////////////////////////////////////////////////
    if (CREATOR === CREATOR_SQL) {
        if (typeof iot__Interconn[Interconn_index] !== "undefined") {
            iot__Interconn.splice(Interconn_index, 1);
            redraw();
            return 1
        }
        return -1;
    }
}
//////////////////////////////////////////////////////////////////////////
function API_iot_CREATE__Interconn(Device_name_1, OutPut_index, Device_name_2, InPut_index, CREATOR) {
    var Interconn_Index = API_iot_GET__Interconn_Index(Device_name_1, OutPut_index, Device_name_2, InPut_index);
    var Device_index_1 = API_iot_GET__Device_Index(Device_name_1);
    var Device_index_2 = API_iot_GET__Device_Index(Device_name_2);
    ////////////////////////////////////////////////////////////////////////////
    if (CREATOR === CREATOR_SQL) {
        if (Interconn_Index === -1) {
            iot__Interconn.push(new OBJECT_iot__Device_Interconn(Device_name_1, OutPut_index, Device_name_2, InPut_index, CREATOR, 1));
            TERMINAL(FROM_SYS + "CREATE INTERCON: "+Device_name_1+"("+OutPut_index+") --> "+Device_name_2+"("+InPut_index+")"+'\n');
        } else {
        	TERMINAL(FROM_SYS + "UPDATE INTERCON: "+Device_name_1+"("+OutPut_index+") --> "+Device_name_2+"("+InPut_index+")"+'\n');
            iot__Interconn[Interconn_Index].Status = SQL_CONN_ON;
            iot__Interconn[Interconn_Index].CREATOR = CREATOR_SQL;
        }
        redraw();
        return 1;
    }
    ////////////////////////////////////////////////////////////////////////////
    if (CREATOR === CREATOR_LOCAL) {
        if (Interconn_Index === -1) {
            var iot__OutPut_Status = iot__OutPut[Device_index_1][OutPut_index].Status;
            var iot__InPut_Status = iot__InPut[Device_index_2][InPut_index].Status;
            var iot__OutPut_CREATOR = iot__OutPut[Device_index_1][OutPut_index].CREATOR;
            var iot__InPut_CREATOR = iot__InPut[Device_index_2][InPut_index].CREATOR;

            //iot__INFO_Text.text = "OutPut_CREATOR " + iot__OutPut_CREATOR + " OutPut_Status " + iot__OutPut_Status + " InPut_CREATOR " + iot__InPut_CREATOR + "  InPut_Status " + iot__InPut_Status;
            if ((iot__OutPut_CREATOR === CREATOR_SQL && iot__OutPut_Status === DISABLE) || (iot__InPut_CREATOR === CREATOR_SQL && iot__InPut_Status === DISABLE)) {
                /// INFO  /// 
            } else {
                iot__Interconn.push(new OBJECT_iot__Device_Interconn(Device_name_1, OutPut_index, Device_name_2, InPut_index, CREATOR, 2));
            }
        } else {
            if (iot__Interconn[Interconn_Index].CREATOR === CREATOR_SQL) {
                iot__Interconn[Interconn_Index].Status = SQL_CONN_ON;
                //iot__INFO_Text.text = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
            }
        }
        redraw();
        return 1;
    }
}

function API_iot_DELETE__INTERCON(D1, OU, D2, IN) {
	var Interconn_Index = API_iot_GET__Interconn_Index(D1, OU, D2, IN); 
    if(Interconn_Index !== -1){
    	TERMINAL(FROM_SYS + "DELETE INTERCON: "+D1+"("+OU+") --> "+D2+"("+IN+")"+'\n');
    	API_iot_DELETE__Interconn(Interconn_Index, CREATOR_SQL);
    	return 1;
    }
    return -1;
}












function API_iot_RESET() {
    iot__GLOBAL_Lock = 0;
    iot__anSelected();
    _iot__Selected_Device_name = 0;
    for (i = 0; i < iot__Device.length; i++) {
        iot__Device[i].Lock = 0;
        //for (ii = 0; ii < iot__OutPut[i].length; ii++) iot__OutPut[i][ii]._mousePressed();
        //for (ii = 0; ii < iot__InPut[i].length; ii++) iot__InPut[i][ii]._mousePressed();
    }
    redraw();
}
function API_iot_DELETE__Device(Device_Name) {
    var Device_index = API_iot_GET__Device_Index(Device_Name);
    if (Device_index !== -1) {
    	TERMINAL(FROM_SYS + "DELETE DEVICE: " + Device_Name + '\n');
        iot__Device.splice(Device_index, 1);
        iot__OutPut.splice(Device_index, 1);
        iot__InPut.splice(Device_index, 1);
        redraw();
        return 1;
    }
    return 0;
}
//////////////////////////////////////////////////////////////////////////
function API_iot_CREATE__Device(Device, x, y, Description, Type, Room) {
    var Device_index = API_iot_GET__Device_Index(Device);
    if (Device_index === -1) {
    	TERMINAL(FROM_SYS + "CREATE DEVICE " + "R(" + Room + ") D(" + Device +')\n');
        Device_index = iot__Device.length;
        iot__Device[Device_index] = new OBJECT_iot__Device(x, y, Device, Device_index, Description, Type, Room);
        iot__OutPut[Device_index] = [];
        iot__InPut[Device_index] = [];
    } else {
		TERMINAL(FROM_SYS + "UPDATE DEVICE :" + Device + '\n');
    	iot__Device[Device_index].x = x;
    	iot__Device[Device_index].y = y;
    	iot__Device[Device_index].Description = Description;
    	iot__Device[Device_index].Save_Status = 0;
    	//iot__Device[Device_index].Room = Room;
    }
    return Device_index;
}
//////////////////////////////////////////////////////////////////////////
function API_iot_GET__Device_Index(Device_name) {
    for (var i = 0; i < iot__Device.length; i++) {
        if (iot__Device[i].Device_name === Device_name) {
            return i;
        }
    }
    return -1;
}
//////////////////////////////////////////////////////////////////////////
function API_iot_GET__Device_InPut_Status(Device_name, InPut_index) {
    for (i = 0; i < iot__Interconn.length; i++) {
        if (iot__Interconn[i].Device_name_2 === Device_name && iot__Interconn[i].InPut_index === InPut_index) {
            return 1;
        }
    }
    return 0;
}
//////////////////////////////////////////////////////////////////////////
function API_iot_GET__Interconn_Index(Device_name_1, OutPut_index, Device_name_2, InPut_index) {
    for (i = 0; i < iot__Interconn.length; i++) {
        if (iot__Interconn[i].Device_name_1 === Device_name_1 && iot__Interconn[i].OutPut_index === OutPut_index && iot__Interconn[i].Device_name_2 === Device_name_2 && iot__Interconn[i].InPut_index === InPut_index) {
            return i;
        }
    }
    return -1;
}
//////////////////////////////////////////////////////////////////////////
function API_iot_SET__Device_Position(Device_name, x, y) {
    var Device_index = API_iot_GET__Device_Index(Device_name);
    if (Device_index !== -1) {
        iot__Device[Device_index].x = x;
        iot__Device[Device_index].y = y;
        return 1;
    }
    return -1;
}
//////////////////////////////////////////////////////////////////////////
function API_iot_CHANGE__Device_Description(Device_name, Description) {
    var Device_index = API_iot_GET__Device_Index(Device_name);
    if (Device_index !== -1) {
    	if(iot__Device[Device_index].Description !== Description){
        iot__Device[Device_index].Description = Description;
        iot__Device[Device_index].Save_Status = 1;
        info.announce(Info_Type_info, "Device " + Device_name + " Description has been changed" , "Don't forget to save changes !!!");
    	}
        return 1;
    }
    return -1;
}
//////////////////////////////////////////////////////////////////////////
function API_iot_CHANGE__Device_OnlineStatus(Device_name, OnlineStatus) {
    var Device_index = API_iot_GET__Device_Index(Device_name);
    if (Device_index !== -1) {
        iot__Device[Device_index].OnlineStatus = OnlineStatus;
        return 1;
    }
    return -1;
}

function API_iot_CHANGE__INPUT_Description(DEVICE_ID, INPUT_INDEX, DESCRIPTION) {
    var DEVICE_INDEX = API_iot_GET__Device_Index(DEVICE_ID);
    if (DEVICE_INDEX !== -1) {
        iot__InPut[DEVICE_INDEX][INPUT_INDEX].Description = DESCRIPTION;   
        return 1;
    }
    return -1;
}
function API_iot_CHANGE__OUTPUT_Description(DEVICE_ID, OUTPUT_INDEX, DESCRIPTION) {
    var DEVICE_INDEX = API_iot_GET__Device_Index(DEVICE_ID);
    if (DEVICE_INDEX !== -1) {
        iot__OutPut[DEVICE_INDEX][OUTPUT_INDEX].Description = DESCRIPTION;   
        return 1;
    }
    return -1;
}
function API_iot_CHANGE__OUTPUT_UNIX_TIME(DEVICE_ID, OUTPUT_INDEX, UNIX_TIME) {
    var DEVICE_INDEX = API_iot_GET__Device_Index(DEVICE_ID);
    if (DEVICE_INDEX !== -1) {
        iot__OutPut[DEVICE_INDEX][OUTPUT_INDEX].UNIX_TIME = UNIX_TIME;   
        return 1;
    }
    return -1;
}
//////////////////////////////////////////////////////////////////////////
function API_iot_PUT__OutPut_DATA(Device_name, OutPut_Index, DATA) {
    var Device_index = API_iot_GET__Device_Index(Device_name);
    if (typeof iot__OutPut[Device_index][OutPut_Index] === "undefined") {
        API_iot_CREATE_Device_OutPut(Device_name, OutPut_Index,CREATOR_LOCAL,0);       
    }
    iot__OutPut[Device_index][OutPut_Index].DATA = DATA;
    iot__OutPut[Device_index][OutPut_Index].DATA_STATUS = 1;
    iot__Device[Device_index].OnlineStatus = 1;
}




//////////////////////////////////////////////////////////////////////////
//
//   OBJECTS
//
//
//////////////////////////////////////////////////////////////////////////
function OBJECT_iot__InOut_Meneger(x, y, SizeW, SizeH) {
    this.x = x;
    this.y = y;
    this.SizeH = SizeW;
    this.SizeW = SizeH;

    this.io_Enable = 1;
    this.ellipse_size = 15;
    this.x1;
    this.y1;
    this.x2;
    this.y2;
    this.x3;
    this.y3;
    this.x4;
    this.y4;
    this.x5;
    this.y5;

    this._display = function() {
        if (iot__Selected_Device_name !== 0) {

            //////////////////////////////////////////////////
            this.x1 = this.x + parseInt(this.SizeW / 2) + 2;
            this.y1 = this.y + parseInt(this.SizeH / 2) + this.ellipse_size / 2 + 1 + 0;

            this.x2 = this.x + parseInt(this.SizeW / 2) - this.ellipse_size + 1;
            this.y2 = this.y + parseInt(this.SizeH / 2) + parseInt(this.ellipse_size / 2) + 1 + 0;

            this.x3 = this.x - parseInt(this.SizeW / 2) - 2;
            this.y3 = this.y + parseInt(this.SizeH / 2) + parseInt(this.ellipse_size / 2) + 1 + 0;

            this.x4 = this.x - parseInt(this.SizeW / 2) + this.ellipse_size - 1;
            this.y4 = this.y + parseInt(this.SizeH / 2) + parseInt(this.ellipse_size / 2) + 1 + 0;

            this.x5 = this.x;
            this.y5 = this.y + parseInt(this.SizeH / 2) + parseInt(this.ellipse_size / 2) + 1;

            noStroke();

            if (this.io_Enable === 0) {
                ////////////////////////////////////////////////
                fill(255, 0, 0, 70);
                // witeli +
                rect(this.x1, this.y1, this.ellipse_size, this.ellipse_size, 3);
                // witeli -
                rect(this.x2, this.y2, this.ellipse_size, this.ellipse_size, 3);
                ////////////////////////////////////////////////
                fill(0, 0, 255, 70);
                // witeli +
                rect(this.x3, this.y3, this.ellipse_size, this.ellipse_size, 3);
                // witeli -
                rect(this.x4, this.y4, this.ellipse_size, this.ellipse_size, 3);
                ////////////////////////////////////////////////
            }


            fill(205, 155, 151);
            rect(this.x5, this.y5, this.ellipse_size, this.ellipse_size, 3);
            ////////////////////////////////////////////////           
            textSize(12);
            textStyle(BOLD);
            textAlign(CENTER);
            noStroke();
            fill(255);

            if (this.io_Enable === 0) {
                text("-", this.x1, this.y1 + 3);
                text("+", this.x2, this.y2 + 4);
                text("+", this.x3, this.y3 + 4);
                text("-", this.x4, this.y4 + 3);
                text("D", this.x5, this.y5 + 4);
            } else {
                text("", this.x1, this.y1 + 3);
                text("", this.x2, this.y2 + 4);
                text("", this.x3, this.y3 + 4);
                text("", this.x4, this.y4 + 3);
                text("E", this.x5, this.y5 + 4);
            }
        }
    };

    this._mousePressed = function() {
        if (_iot__Selected_Device_name !== 0) {
            var Device_Index = API_iot_GET__Device_Index(_iot__Selected_Device_name);
            //DEVICE DEL #################################################
            var d = dist(mouseX, mouseY, this.x5, this.y5);
            if (d < (parseInt(this.ellipse_size / 2))) { //DELETE OBJECT!!!!
                iot__Device[Device_Index].Save_Status = 1;
                iot__Device[Device_Index].Lock = 1;
                iot__GLOBAL_Lock = 1;
                iot__Selected(_iot__Selected_Device_name);
                var i;
                var ii;
                ////////////////////////////////////////////////////////////////////
                var Device_Delete_Status = iot__Device[Device_Index].Device_Delete_Status;
                if (Device_Delete_Status === 0) {
                    iot__Device[Device_Index].Device_Delete_Status = 1;
                    this.io_Enable = 1;
                    for (i = 0; i < iot__OutPut[Device_Index].length; i++) {
                        if (iot__OutPut[Device_Index][i].CREATOR === CREATOR_SQL) {
                            //----------------------------------------------------
                            iot__OutPut[Device_Index][i].Status = DISABLE;
                            //----------------------------------------------------
                            for (ii = 0; ii < iot__Interconn.length; ii++) {
                                var D1 = iot__Interconn[ii].Device_index_1;
                                var OU = iot__Interconn[ii].OutPut_index;
                                if (D1 === Device_Index && OU === i) {
                                    if (iot__Interconn[ii].CREATOR === CREATOR_SQL) {
                                        iot__Interconn[ii].Status = SQL_CONN_OFF;
                                    }
                                    if (iot__Interconn[ii].CREATOR === CREATOR_LOCAL) {
                                        iot__Interconn.splice(ii, 1);
                                    }
                                }
                            }
                            //---------------------------------------------------- 
                        }
                        if (iot__OutPut[Device_Index][i].CREATOR === CREATOR_LOCAL) {
                            //----------------------------------------------------
                            for (var ii = 0; ii < iot__Interconn.length; ii++) {
                                var D1 = iot__Interconn[ii].Device_index_1;
                                var OU = iot__Interconn[ii].OutPut_index;
                                if (D1 === Device_Index && OU === i) {
                                    iot__Interconn.splice(ii, 1);
                                }
                            }
                            //----------------------------------------------------
                            iot__OutPut[Device_Index].splice(i, 1);
                            i--;
                            //----------------------------------------------------
                        }
                    }
                    //##############################################################
                    for (i = 0; i < iot__InPut[Device_Index].length; i++) {
                        if (iot__InPut[Device_Index][i].CREATOR === CREATOR_SQL) {
                            //----------------------------------------------------
                            iot__InPut[Device_Index][i].Status = DISABLE;
                            //----------------------------------------------------
                            for (var ii = 0; ii < iot__Interconn.length; ii++) {
                                if (iot__Interconn[ii].Device_index_2 === Device_Index && iot__Interconn[ii].InPut_index === i) {
                                    if (iot__Interconn[ii].CREATOR === CREATOR_SQL) {
                                        iot__Interconn[ii].Status = SQL_CONN_OFF;
                                    }
                                    if (iot__Interconn[ii].CREATOR === CREATOR_LOCAL) {
                                        iot__Interconn.splice(ii, 1);
                                    }
                                }
                            }
                            //----------------------------------------------------
                        }
                        if (iot__InPut[Device_Index][i].CREATOR === CREATOR_LOCAL) {
                            //----------------------------------------------------
                            for (var ii = 0; ii < iot__Interconn.length; ii++) {
                                var D2 = iot__Interconn[ii].Device_index_2;
                                var IN = iot__Interconn[ii].InPut_index;
                                if (D2 === Device_Index && IN === i) {
                                    iot__Interconn.splice(ii, 1);
                                }
                            }
                            //----------------------------------------------------
                            iot__InPut[Device_Index].splice(i, 1);
                            i--;
                            //----------------------------------------------------
                        }
                    }
                } else {
                    iot__Device[Device_Index].Device_Delete_Status = 0;
                    this.io_Enable = 0;
                    ////////////////////////////////////////////////////////////////////
                    for (i = 0; i < iot__OutPut[Device_Index].length; i++) {
                        if (iot__OutPut[Device_Index][i].CREATOR === CREATOR_SQL) {
                            //----------------------------------------------------
                            iot__OutPut[Device_Index][i].Status = ENABLE;
                            //----------------------------------------------------
                            for (var ii = 0; ii < iot__Interconn.length; ii++) {
                                var D1 = iot__Interconn[ii].Device_index_1;
                                var OU = iot__Interconn[ii].OutPut_index;
                                var D2 = iot__Interconn[ii].Device_index_2;
                                var IN = iot__Interconn[ii].InPut_index;
                                if (D1 === Device_Index && OU === i) {
                                    if (iot__InPut[D2][IN].Status === ENABLE) {
                                        iot__Interconn[ii].Status = SQL_CONN_ON;
                                    }
                                }
                            }
                            //----------------------------------------------------
                        }
                    }
                    ////////////////////////////////////////////////////////////////////
                    for (i = 0; i < iot__InPut[Device_Index].length; i++) {
                        if (iot__InPut[Device_Index][i].CREATOR === CREATOR_SQL) {
                            //----------------------------------------------------
                            iot__InPut[Device_Index][i].Status = ENABLE;
                            //----------------------------------------------------
                            for (var ii = 0; ii < iot__Interconn.length; ii++) {
                                var D1 = iot__Interconn[ii].Device_index_1;
                                var OU = iot__Interconn[ii].OutPut_index;
                                var D2 = iot__Interconn[ii].Device_index_2;
                                var IN = iot__Interconn[ii].InPut_index;
                                if (D2 === Device_Index && IN === i) {
                                    if (iot__OutPut[D1][OU].Status === ENABLE) {
                                        iot__Interconn[ii].Status = SQL_CONN_ON;
                                    }
                                }
                            }
                            //----------------------------------------------------
                        }
                    }
                }
                ////////////////////////////////////////////////////////////////////
                return 1;
            }

            if(Device_Index != -1){
                if (iot__Device[Device_Index].Device_Delete_Status === 0) {
                    //OUTPUT DEL #################################################
                    var d = dist(mouseX, mouseY, this.x1, this.y1);
                    if (d < (parseInt(this.ellipse_size / 2))) { //w+
                        iot__Device[Device_Index].Save_Status = 1;
                        iot__Device[Device_Index].Lock = 1;
                        iot__GLOBAL_Lock = 1;
                        iot__Selected(_iot__Selected_Device_name);
                        ////////////////////////////////////////////////////////////////////
                        var index = iot__OutPut[Device_Index].length - 1;
                        if (index !== -1) {
                            if (iot__OutPut[Device_Index][index].CREATOR === CREATOR_LOCAL) {
                                //----------------------------------------------------
                                for (var i = 0; i < iot__Interconn.length; i++) {
                                    var D1 = iot__Interconn[i].Device_index_1;
                                    var OU = iot__Interconn[i].OutPut_index;
                                    if (D1 === Device_Index && OU === index) {
                                        iot__Interconn.splice(i, 1);
                                    }
                                }
                                //----------------------------------------------------
                                iot__OutPut[Device_Index].splice(index, 1);
                                //----------------------------------------------------
                            }
                            ////////////////////////////////////////////////////////////////////
                            if (typeof iot__OutPut[Device_Index][index] !== "undefined") {
                                if (iot__OutPut[Device_Index][index].CREATOR === CREATOR_SQL) {
                                    for (i = 0; i < iot__OutPut[Device_Index].length; i++) {
                                        if (iot__OutPut[Device_Index][index].Status === ENABLE) {
                                            //----------------------------------------------------
                                            iot__OutPut[Device_Index][index].Status = DISABLE;
                                            //----------------------------------------------------
                                            for (var ii = 0; ii < iot__Interconn.length; ii++) {
                                                if (iot__Interconn[ii].Device_index_1 === Device_Index && iot__Interconn[ii].OutPut_index === index) {
                                                    if (iot__Interconn[ii].CREATOR === CREATOR_SQL) {
                                                        iot__Interconn[ii].Status = SQL_CONN_OFF;
                                                    }
                                                    if (iot__Interconn[ii].CREATOR === CREATOR_LOCAL) {
                                                        iot__Interconn.splice(ii, 1);
                                                    }
                                                }
                                            }
                                            //----------------------------------------------------
                                            break;
                                        }
                                        index--;
                                    }
                                }
                            }
                        }
                        return 1;
                    }
                    //OUTPUT CRI #################################################
                    var d = dist(mouseX, mouseY, this.x2, this.y2);
                    if (d < (parseInt(this.ellipse_size / 2))) {
                        iot__Device[Device_Index].Save_Status = 1;
                        iot__Device[Device_Index].Lock = 1;
                        iot__GLOBAL_Lock = 1;
                        iot__Selected(_iot__Selected_Device_name);
                        //////////////////////////////////////////////////////
                        for (i = 0; i < iot__OutPut[Device_Index].length; i++) {
                            if (iot__OutPut[Device_Index][i].Status === DISABLE) {
                                if (iot__OutPut[Device_Index][i].CREATOR === CREATOR_SQL) {
                                    //----------------------------------------------------
                                    iot__OutPut[Device_Index][i].Status = ENABLE;
                                    //----------------------------------------------------
                                    for (var ii = 0; ii < iot__Interconn.length; ii++) {
                                        var D1 = iot__Interconn[ii].Device_index_1;
                                        var OU = iot__Interconn[ii].OutPut_index;
                                        if (D1 === Device_Index && OU === i) {
                                            iot__Interconn[ii].Status = SQL_CONN_ON;
                                        }
                                    }
                                    //----------------------------------------------------
                                    return 1;
                                }
                            }
                        }
                        //////////////////////////////////////////////////////
                        var index = iot__OutPut[Device_Index].length;
                        iot__OutPut[Device_Index].push(new OBJECT_iot__Device_OutPut(_iot__Selected_Device_name, index, CREATOR_LOCAL, DISABLE));
                        //////////////////////////////////////////////////////
                        return 1;
                    }
                    //INPUT DEL ##################################################
                    var d = dist(mouseX, mouseY, this.x4, this.y4);
                    if (d < (parseInt(this.ellipse_size / 2))) {
                        iot__Device[Device_Index].Save_Status = 1;
                        iot__Device[Device_Index].Lock = 1;
                        iot__GLOBAL_Lock = 1;
                        iot__Selected(_iot__Selected_Device_name);
                        ////////////////////////////////////////////////////////////////////
                        var index = iot__InPut[Device_Index].length - 1;
                        if (index !== -1) {
                            if (iot__InPut[Device_Index][index].CREATOR === CREATOR_LOCAL) {
                                //----------------------------------------------------
                                for (var i = 0; i < iot__Interconn.length; i++) {
                                    var D2 = iot__Interconn[i].Device_index_2;
                                    var IN = iot__Interconn[i].InPut_index;
                                    if (D2 === Device_Index && IN === index) {
                                        iot__Interconn.splice(i, 1);
                                    }
                                }
                                //----------------------------------------------------
                                iot__InPut[Device_Index].splice(index, 1);
                                //----------------------------------------------------
                            }
                        }
                        ////////////////////////////////////////////////////////////////////
                        if (typeof iot__InPut[Device_Index][index] !== "undefined") {
                            if (iot__InPut[Device_Index][index].CREATOR === CREATOR_SQL) {
                                for (i = 0; i < iot__InPut[Device_Index].length; i++) {
                                    if (iot__InPut[Device_Index][index].Status === ENABLE) {
                                        iot__InPut[Device_Index][index].Status = DISABLE;
                                        //////////////////////////////////////////////////////
                                        for (var ii = 0; ii < iot__Interconn.length; ii++) {
                                            //----------------------------------------------------
                                            var D2 = iot__Interconn[ii].Device_index_2;
                                            var IN = iot__Interconn[ii].InPut_index;
                                            //----------------------------------------------------
                                            if (D2 === Device_Index && IN === index) {
                                                if (iot__Interconn[ii].CREATOR === CREATOR_SQL) {
                                                    iot__Interconn[ii].Status = SQL_CONN_OFF;
                                                }
                                                if (iot__Interconn[ii].CREATOR === CREATOR_LOCAL) {
                                                    iot__Interconn.splice(ii, 1);
                                                }
                                            }
                                            //----------------------------------------------------
                                        }
                                        //////////////////////////////////////////////////////
                                        break;
                                    }
                                    index--;
                                }
                            }
                        }
                        return 1;
                    }
                    //INPUT CRI ##################################################
                    var d = dist(mouseX, mouseY, this.x3, this.y3);
                    if (d < (parseInt(this.ellipse_size / 2))) {
                        iot__Device[Device_Index].Save_Status = 1;
                        iot__Device[Device_Index].Lock = 1;
                        iot__GLOBAL_Lock = 1;
                        iot__Selected(_iot__Selected_Device_name);
                        //////////////////////////////////////////////////////
                        for (i = 0; i < iot__InPut[Device_Index].length; i++) {
                            if (iot__InPut[Device_Index][i].Status === DISABLE) {
                                if (iot__InPut[Device_Index][i].CREATOR === CREATOR_SQL) {
                                    //----------------------------------------------------
                                    iot__InPut[Device_Index][i].Status = ENABLE;
                                    //----------------------------------------------------
                                    for (var ii = 0; ii < iot__Interconn.length; ii++) {
                                        var D2 = iot__Interconn[ii].Device_index_2;
                                        var IN = iot__Interconn[ii].InPut_index;
                                        if (D2 === Device_Index && IN === i) {
                                            iot__Interconn[ii].Status = SQL_CONN_ON;
                                        }
                                    }
                                    //----------------------------------------------------
                                    return 1;
                                }
                            }
                        }
                        //////////////////////////////////////////////////////
                        var index = iot__InPut[Device_Index].length;
                        iot__InPut[Device_Index].push(new OBJECT_iot__Device_InPut(_iot__Selected_Device_name, index, CREATOR_LOCAL, DISABLE));
                        //////////////////////////////////////////////////////
                        return 1;
                    }
                    //############################################################
                } else {
                }
            }
        }
    };
}
///////////////////////////////////////////////////////////////////////
function OBJECT_iot__Device(x, y, Device_Name, Device_Index, Description, Device_Type, Room) {
    //this.Device_refresh = 1;
    this.Lock = 0;
    this.x = x;
    this.y = y;
    this.SizeH = 70;
    this.SizeW = iot__Deviceice_SizeW;
    this.Device_Index = Device_Index;
    this.Device_name = Device_Name;
    this.InPut_couter = 0;
    this.OutPut_couter = 0;
    this.Save_Status = 0;
    this.STREAMING_Status = 0;
    this.Device_Delete_Status = 0;
    this.Device_Type = Device_Type; // Defines object is sensor/action(0) or mediator(1)
    //this.Device_Name_Text = Device_Name_Text; //
    this.mousePressed_Delta_X = 0;
    this.mousePressed_Delta_Y = 0;
    this.mouseStatus = 0;
    this.Description = Description;
    this.OnlineStatus = 0;
    this.Room = Room;

    this._display = function(X, Y) {
    	 strokeWeight(1);
		
		
    	if(this.Room !== iot__ROOM) return 0;
    	
        this.Device_Index = API_iot_GET__Device_Index(this.Device_name)
        /////////////////////////////////////////////////////////////////
        this.OutPut_couter = iot__OutPut[this.Device_Index].length;
        this.InPut_couter = iot__InPut[this.Device_Index].length;
        // Device refresh
        if (this.InPut_couter === 0 && this.OutPut_couter === 0) {
            this.SizeH = 40 + iot__OutPut_SizeH * 2;
        } else if (this.InPut_couter > this.OutPut_couter) {
            this.SizeH = 40 + this.InPut_couter * iot__OutPut_SizeH * 2;
        } else if (this.InPut_couter <= this.OutPut_couter) {
            this.SizeH = 40 + this.OutPut_couter * iot__OutPut_SizeH * 2;
        }
        // OutPut refresh
        var del = parseInt(this.SizeH / (this.OutPut_couter + 1));
        var start = (this.y + Y) - parseInt(this.SizeH / 2);
        for (var i = 0; i < this.OutPut_couter; i++) {
            iot__OutPut[this.Device_Index][i].x = this.x + X + (parseInt(this.SizeW / 2) + parseInt(iot__OutPut_SizeW / 2));
            iot__OutPut[this.Device_Index][i].y = start + del + i * del;
        }
        // InPut refrese
        del = parseInt(this.SizeH / (this.InPut_couter + 1));
        start = (this.y + Y) - parseInt(this.SizeH / 2);
        for (i = 0; i < this.InPut_couter; i++) {
            iot__InPut[this.Device_Index][i].x = this.x + X - (parseInt(this.SizeW / 2) + parseInt(iot__InPut_SizeW / 2));
            iot__InPut[this.Device_Index][i].y = start + del + i * del;
        }
        /////////////////////////////////////////////////////////////////
        noStroke();
        fill(130, 40);
        rect(this.x + 4 + X, this.y + 4 + Y, this.SizeW, this.SizeH, 5);
        /////////////////////////////////////////////////////////////////
        
        
        strokeWeight(1);
        stroke(0);
        if (this.Lock === 1) {          
            fill(235);
            rect(this.x + X, this.y + Y, this.SizeW, this.SizeH, 5);
            iot__InOut_Meneger.x = this.x + X + 1;
            iot__InOut_Meneger.y = this.y + Y + 1;
            iot__InOut_Meneger.SizeW = this.SizeW;
            iot__InOut_Meneger.SizeH = this.SizeH;
        } else {
            if(this.Device_Type === 2) fill(241,251,255);
            if(this.Device_Type === 1) fill(245,250,245);
            if(this.Device_Type === 0) fill(250);
            rect(this.x + X, this.y + Y, this.SizeW, this.SizeH, 5);
        }
        strokeWeight(1);
        //////////////////////////////////////////////////////
        // save status
        if (this.Save_Status === 0) {} else {
            Sav_000.hide();
            Sav_001.show();
            noStroke();
            stroke(242, 115, 30);
            star(this.x + X - parseInt(this.SizeW / 2) + 9, this.y + Y + parseInt(this.SizeH / 2) -9, 3, 6, 10);
        }
        /////////////////////////////////////////////////////////
        // Draw InPut
        for (ii = 0; ii < iot__InPut[this.Device_Index].length; ii++) {
            iot__InPut[this.Device_Index][ii]._display();
        }
        //////////////////////////////////////////////////////////
        // Device_Delete_Status
        if (this.Device_Delete_Status === 1) {
            textSize(12);textStyle(BOLD);textAlign(CENTER); noStroke();
            fill(0, 102, 153);
            text("Deleted", this.x + X, this.y + Y + 5);
        }
        //warwerebi
        if (this.Device_Type === 0) {
            textSize(14);textStyle(BOLD);textAlign(RIGHT);noStroke();
            fill(91, 108, 64);
            text("De", this.x + X - parseInt(this.SizeW / 2) + 22, this.y + Y - parseInt(this.SizeH / 2) + 14);
        }
        if (this.Device_Type === 1) {
        	textSize(14);textStyle(BOLD);textAlign(RIGHT);noStroke();
            fill(222, 122, 66);
            text("Me", this.x + X - parseInt(this.SizeW / 2) + 23, this.y + Y - parseInt(this.SizeH / 2) + 14);
        }
        if (this.Device_Type === 2) {
            textSize(14);
            textStyle(BOLD);
            textAlign(RIGHT);
            noStroke();
            fill(100, 100, 255);
            text("We", this.x + X - parseInt(this.SizeW / 2) + 24, this.y + Y - parseInt(this.SizeH / 2) + 14);
        }
        ///////////////////////////////////////////
        // Device_name
        textSize(12);textStyle(BOLD);textAlign(RIGHT);noStroke();
        if (this.Device_name === iot__Last_Selected_Device_name) fill('red'); else fill(0);
        text(this.Device_name, this.x + X + parseInt(this.SizeW/2) -3, this.y + Y - parseInt(this.SizeH / 2) + 14);
        ///////////////////////////////////////////////////////////////////
        // Description
		//this.Description = this.x;
        //if (this.Description === "undefined"){this.Description=""}
        if (this.Description !== ""){
        	fill(0);
            textSize(12);
            //textStyle(BOLD);
            textStyle(NORMAL);
            textStyle(ITALIC);
            textAlign(CENTER);
            
            noStroke();
            //fill(242, 115, 30);
            fill(20, 20, 20);
            //if (this.OnlineStatus === 1) fill(242, 115, 30);
            //if (this.OnlineStatus === 0) fill(20, 20, 20);
            
        	text(this.Description, this.x + X, this.y + Y - parseInt(this.SizeH / 2) - 4);
        }

        ///////////////////////////////////////////    
        // Draw OutPut
        for (ii = 0; ii < iot__OutPut[this.Device_Index].length; ii++) {
            iot__OutPut[this.Device_Index][ii]._display();
        } 
        
        
        
        
        
        
    };
    this._mousePressed = function(X, Y) {
    	if(this.Room !== iot__ROOM) return 0;
        this.mousePressed_Delta_X = this.x - (mouseX - X);
        this.mousePressed_Delta_Y = this.y - (mouseY - Y);
        var XX;
        var YY;
        if (Math.abs(this.mousePressed_Delta_X) < parseInt(this.SizeW / 2)) {
            XX = 1;
        } else {
            XX = 0;
        }
        if (Math.abs(this.mousePressed_Delta_Y) < parseInt(this.SizeH / 2)) {
            YY = 1;
        } else {
            YY = 0;
        }
        if (XX === 1 && YY === 1) {
            this.mouseStatus = 1;
        }
        //////////////////////////////////////////////////dom__DE
        if (this.mouseStatus === 1) {
            cursor(MOVE);
            if (iot__GLOBAL_Lock === 0) {
                iot__GLOBAL_Lock = 1;
                this.Lock = 1;
                iot__Selected(this.Device_name);
                iot__Last_Selected_Device_name = this.Device_name;
                
                iot__Last_Selected_InPut_Index = 255;
                iot__Last_Selected_OutPut_Index = 255;
                
                
                iot__InOut_Meneger.io_Enable = this.Device_Delete_Status;
                if (this.Device_Type === 0) dom__DE.show(this.x, this.y, this.Device_name, this.Device_Index, this.Description, this.Device_Type);
                if (this.Device_Type === 1) dom__ME.show(this.x, this.y, this.Device_name, this.Device_Index, this.Description, this.Device_Type);
                if (this.Device_Type === 2) dom__WE.show(this.x, this.y, this.Device_name, this.Device_Index, this.Description, this.Device_Type);
                return 1;
            }
        } else {
            if (this.Lock === 1) {
                iot__GLOBAL_Lock = 0;
                this.Lock = 0;
                iot__anSelected();
            }
        }
        return 0;
    };
    this._mouseReleased = function() {
    	if(this.Room !== iot__ROOM) return 0;
        if (this.mouseStatus === 1) {
            cursor(ARROW);
            this.mousePressed_Delta_X = 0;
            this.mousePressed_Delta_Y = 0;
            this.mouseStatus = 0;
        }
    }
    this._mouseDragged = function(X, Y, W, H) {
    	if(this.Room !== iot__ROOM) return 0;
        if (this.mouseStatus === 1) {
            var XX1, XX2, YY1, YY2;
            var X1 = (mouseX - X) + parseInt(this.SizeW / 2) + iot__OutPut_SizeW + this.mousePressed_Delta_X + 10;
            var X2 = (mouseX - X) - parseInt(this.SizeW / 2) - iot__InPut_SizeW + this.mousePressed_Delta_X - 10;
            var Y1 = (mouseY - Y) + parseInt(this.SizeH / 2) + this.mousePressed_Delta_Y + 20;
            var Y2 = (mouseY - Y) - parseInt(this.SizeH / 2) + this.mousePressed_Delta_Y - 40;
            //////////////////////////////////////////////////
            if (X1 < W) XX1 = 1;
            else XX1 = 0;
            if (X2 > 0) XX2 = 1;
            else XX2 = 0;
            if (Y1 < H) YY1 = 1;
            else YY1 = 0;
            if (Y2 > 0) YY2 = 1;
            else YY2 = 0;
            //////////////////////////////////////////////////
            if (XX1 === 1 && XX2 === 1) {
                this.x = mouseX - X + this.mousePressed_Delta_X;
            } else if (XX1 === 0) {
                this.x = W - (parseInt(this.SizeW / 2) + iot__OutPut_SizeW + 10);
            } else if (XX2 === 0) {
                this.x = (parseInt(this.SizeW / 2) + iot__InPut_SizeW + 10);
            }
            //////////////////////////////////////////////////
            if (YY1 === 1 && YY2 === 1) {
                this.y = mouseY - Y + this.mousePressed_Delta_Y;
            } else if (YY1 === 0) {
                this.y = H - (parseInt(this.SizeH / 2) + 20);
            } else if (YY2 === 0) {
                this.y = (parseInt(this.SizeH / 2) + 40);
            }
            //////////////////////////////////////////////////
            this.Save_Status = 1;
        }
    };
}
///////////////////////////////////////////////////////////////////////

function OBJECT_iot__Device_InPut(Device_name, InPut_index, CREATOR, Status) {
    this.locked_1 = false;
    this.x = 0;
    this.y = 0;
    this.SizeW = iot__InPut_SizeW;
    this.SizeH = iot__InPut_SizeH;
    this.InPut_index = InPut_index;
    this.Device_name = Device_name;
    this.Status = Status;
    this.CREATOR = CREATOR;
    this.Description = "";

    this._display = function() {
        noStroke();
        fill(30, 40);
        rect(this.x + 4, this.y + 4, this.SizeW - 6, this.SizeH);
        stroke(0);
        if ((iot__mousePressed_Interconn_Devise_name === this.Device_name) && (iot__mousePressed_Interconn_InPut_index === this.InPut_index)) {
            fill(0, 0, 0);
        } else {
            if (this.Status === 1) {
                fill(0, 0, 255);
            } else {
                if (this.CREATOR === CREATOR_LOCAL) {
                    fill(242, 115, 30);
                }
                if (this.CREATOR === CREATOR_SQL) {
                    fill(200);
                };
            }
        }
        rect(this.x, this.y, this.SizeW, this.SizeH);

        textSize(10);
        textStyle(BOLD);
        textAlign(LEFT);
        //textFont(fontItalic);
        noStroke();
        //fill(255, 130, 0);//this.SizeW this.SizeH/2
        textAlign(RIGHT);
        text(this.InPut_index, this.x - parseInt(this.SizeW / 2), this.y - parseInt(this.SizeH / 2));
        //textAlign(LEFT);text(this.InPut_index, this.x + this.SizeW/2+1  , this.y  );
        
        
        //if (this.Device_name === iot__Last_Selected_Device_name) {
        //	if( this.InPut_index === iot__Last_Selected_InPut_Index){
	    //        stroke('red');
	    //        noFill();
	    //       rect(this.x, this.y, iot__InPut_SizeW, iot__InPut_SizeW+4);
        //	}
        //}
        
        
    };
    this._mousePressed = function() {
        var d = dist(mouseX, mouseY, this.x, this.y);
        if (d < (parseInt(this.SizeW / 2))) {
            iot__mousePressed_InPut_Status = 1;
            iot__mousePressed_Interconn_Devise_name = this.Device_name;
            iot__mousePressed_Interconn_InPut_index = this.InPut_index;
            
            
            var Device_Index = API_iot_GET__Device_Index(this.Device_name)
            var Device_Type = iot__Device[Device_Index].Device_Type;
            if (Device_Type === 2) dom__WebMob_Output.show( this.Device_name, this.InPut_index, "InPut",this.Status );
            
            info.announce(1, xText[10] + " " +this.Device_name + " " + xText[28] + " " + this.InPut_index, "");
            Popup_window = 0;
            
            
            iot__Last_Selected_Device_name = this.Device_name;
            iot__Last_Selected_InPut_Index = this.InPut_index;
            iot__Last_Selected_OutPut_Index = 255;
        }
    };
}
///////////////////////////////////////////////////////////////////////
function OBJECT_iot__Device_OutPut(Device_name, OutPut_index, CREATOR, Status) {
    this.locked_1 = false;
    this.x = 0;
    this.y = 0;
    this.SizeW = iot__OutPut_SizeW;
    this.SizeH = iot__OutPut_SizeH;
    this.OutPut_index = OutPut_index;
    this.Device_name = Device_name;
    this.Status = Status;
    this.CREATOR = CREATOR;
    this.DATA = 0;
    this.DATA_STATUS = 0;
    this.Popup_window = 0;
    this.Description = "";
    this.UNIX_TIME = 0;


    
    this._display = function() {
        noStroke();
        fill(30, 40);
        rect(this.x + 4, this.y + 4, this.SizeW, this.SizeH);
        stroke(0);
        if ((iot__mousePressed_Interconn_Device_name === this.Device_name) && (iot__mousePressed_Interconn_OutPut_index === this.OutPut_index)) {
            fill(0, 0, 0);
        } else {
            if (this.Status === 1) {
                fill(255, 0, 0);
            } else {
                if (this.CREATOR === CREATOR_LOCAL) {
                    fill(242, 115, 30);
                }
                if (this.CREATOR === CREATOR_SQL) {
                    fill(200);
                }
            }

        }
        rect(this.x, this.y, this.SizeW, this.SizeH);

        // textebi
        textSize(10);
        textStyle(BOLD);
        noStroke();
        textAlign(LEFT);
        text(this.OutPut_index, this.x + parseInt(this.SizeW / 2), this.y - parseInt(this.SizeH / 2));

        //DATA
        var Data_Text = this.DATA;
        var Data_Text_length = Data_Text.length;
        if(Data_Text_length > 10){ // teqstis sigrdzis shezgudva
        	Data_Text = Data_Text.substr(0, 7) + " ..";
        }
        
        fill(255, 0, 0);
        textAlign(RIGHT);
        text(Data_Text, this.x - parseInt(this.SizeW / 2) - 3, this.y + parseInt(this.SizeH / 2) - 1);


        noStroke();
        if (this.DATA_STATUS === 1) {
            //fill(91, 108, 64);
            fill(0, 200, 0);
            this.DATA_STATUS = 0;
        } else {
            fill(255);
        }
        //rect(this.x+this.SizeW/2-1, this.y, 2, 4);
        //rect(this.x , this.y , this.SizeW/3, this.SizeH-2);
        ellipse(this.x + parseInt(this.SizeW / 2) + 4, this.y + 4, 4, 4);
        
        
        //##################################################
        // output infos gamodzaxeba - daxatva ...
        if (this.Device_name === iot__Last_Selected_Device_name) {
        	if( this.OutPut_index === iot__Last_Selected_OutPut_Index){
        		noStroke();
	            fill(255, 0, 0, 70);
	            rect(this.x+20, this.y-15, 15, 15,3);
	            
	            textSize(12);
	            textStyle(BOLD);
	            textAlign(CENTER);
	            noStroke();
	            fill(255);
	            text("I", this.x+20, this.y -15+4);  
        	}
        }

        
        
        

    };
    this._mousePressed = function() {
    	
    	// info - menus gamochera
        if (this.Device_name === iot__Last_Selected_Device_name) {
        	if( this.OutPut_index === iot__Last_Selected_OutPut_Index){
             
                var di = dist(mouseX, mouseY, this.x+20, this.y-15);
                if (di < (15 / 2)) {
                    info.announce(1, xText[10] + " " +this.Device_name + " " + xText[16] + " " + this.OutPut_index, "info"); 
                               
                    // monishnuli gamomyvanis shenarchuneba
                    iot__mousePressed_OutPut_Status = 1;
                    iot__mousePressed_Interconn_Device_name = this.Device_name;
                    iot__mousePressed_Interconn_OutPut_index = this.OutPut_index;
                    iot__Last_Selected_Device_name = this.Device_name;
                    iot__Last_Selected_OutPut_Index = this.OutPut_index;
                    iot__Last_Selected_InPut_Index = 255;
                    
                    ///////////////////////////////////////////////////////                    
                    Popup_window_Device_OutPut_index = this.OutPut_index;
                    Popup_window_Device_Device_name  = this.Device_name;
                    Popup_window_x = this.x+20;
                    Popup_window_y = this.y-35;
                    if(Popup_window === 0){  	
                    	Popup_window = 1;
                    } else {
                    	Popup_window = 0;
                    }
                    ///////////////////////////////////////////////////////
                
                }
        	}
        }   	
    	
    	
    	// gamosasvlelze dachera
        var d = dist(mouseX, mouseY, this.x, this.y);
        if (d < (parseInt(this.SizeW / 2))) {
            iot__mousePressed_OutPut_Status = 1;
            iot__mousePressed_Interconn_Device_name = this.Device_name;
            iot__mousePressed_Interconn_OutPut_index = this.OutPut_index;
            
            var Device_Index = API_iot_GET__Device_Index(this.Device_name)
            var Device_Type = iot__Device[Device_Index].Device_Type;
            if (Device_Type === 2) dom__WebMob_Output.show( this.Device_name, this.OutPut_index, "OutPut", this.Status);
        
            info.announce(1, xText[10] + " " +this.Device_name + " " + xText[16] + " " + this.OutPut_index, "");
            Popup_window = 0;
            
            iot__Last_Selected_Device_name = this.Device_name;
            iot__Last_Selected_OutPut_Index = this.OutPut_index;
            iot__Last_Selected_InPut_Index = 255;
        }
    };
}
///////////////////////////////////////////////////////////////////////
function OBJECT_iot__Device_Interconn(Device_name_1, OutPut_index, Device_name_2, InPut_index, CREATOR, Status) {
    this.Device_name_1 = Device_name_1;
    this.Device_index_1 = 0;
    this.OutPut_index = OutPut_index;
    this.Device_name_2 = Device_name_2;
    this.Device_index_2 = 0;
    this.InPut_index = InPut_index;
    this.Status = Status;
    this.CREATOR = CREATOR;

    //this.Device_refresh = 1;
    this.x1 = 0;
    this.x2 = 0;
    this.y1 = 0;
    this.y2 = 0;
    this.aa = 0;

    this._display = function() {    	
        this.Device_index_1 = API_iot_GET__Device_Index(this.Device_name_1);
        this.Device_index_2 = API_iot_GET__Device_Index(this.Device_name_2);
        if(iot__Device[this.Device_index_1].Room !== iot__ROOM)return 0;
        if(iot__Device[this.Device_index_2].Room !== iot__ROOM)return 0;
        
        if (typeof iot__OutPut[this.Device_index_1][this.OutPut_index] !== "undefined" && typeof iot__InPut[this.Device_index_2][this.InPut_index] !== "undefined") {
            this.x1 = iot__OutPut[this.Device_index_1][this.OutPut_index].x + parseInt(iot__OutPut_SizeW / 2) + 1;
            this.y1 = iot__OutPut[this.Device_index_1][this.OutPut_index].y;
            this.x2 = iot__InPut[this.Device_index_2][this.InPut_index].x - parseInt(iot__InPut_SizeW / 2);
            this.y2 = iot__InPut[this.Device_index_2][this.InPut_index].y;
            this.aa = Math.abs(parseInt((this.x2 - this.x1) / 2));
            if (this.aa < 50) this.aa = 50; // isartan shemogunvis regulireba
            strokeWeight(2);
            noFill();

            switch (this.Status) {  //isris statusis mixedvit feri
            case SQL_CONN_ON:
                stroke(0);
                
            	if (this.Device_name_2 === iot__Last_Selected_Device_name) {
            		if( this.InPut_index === iot__Last_Selected_InPut_Index){
            			stroke(255, 0, 0);
            		}
            	}
            	if (this.Device_name_1 === iot__Last_Selected_Device_name) {
            		if( this.OutPut_index === iot__Last_Selected_OutPut_Index){
            			stroke(255, 0, 0);
            		}
            	}
                break;
            case NEW_CONN:
                stroke(242, 115, 30);
                break;
            case SQL_CONN_OFF:
                stroke(200);
                break;
            default:
                break;
            }
            bezier(this.x1 + 1, this.y1, this.x1 + this.aa, this.y1, this.x2 - this.aa, this.y2, this.x2 - 3, this.y2);
            triangle(this.x2 - 7, this.y2 + 3, this.x2 - 7, this.y2 - 3, this.x2 - 2, this.y2);
        }
    };
}
//////////////////////////////////////////////////////////////////////////
//
//   
//
//
/////////////////////////////////////////////////////////////////////////////
function star(x, y, radius1, radius2, npoints) {
    var angle = TWO_PI / npoints;
    var halfAngle = angle / 2.0;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a) * radius2;
        var sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}
///////////////////////////////////////////////////////////////////////
function iot__interactive_interconnection_processing() {

    if (iot__mousePressed_OutPut_Status === 1) {	// gamoichira gamosasvlelis dachera
        iot__mousePressed_OutPut_locked = 1;  		// daafiqsira es dachera
    }
    if (iot__mousePressed_InPut_Status === 1) {		// gamoichira shesasvlelis dachera
        iot__mousePressed_InPut_locked = 1;			// daafiqsira dachera
    }
    if (iot__mousePressed_OutPut_InPut_Step === 0) {
        if (iot__mousePressed_OutPut_Status === 1 || iot__mousePressed_InPut_Status === 1) {
            iot__mousePressed_OutPut_InPut_Step = 1;	// shesasvleli sa gamosavlels dacheri dafiqsireba
        }
    } else if (iot__mousePressed_OutPut_InPut_Step === 1) {
        if (iot__mousePressed_OutPut_locked === 1 && iot__mousePressed_InPut_locked === 1) {
            //////////////////////////////////////////////////////////
            var Interconn_Index = API_iot_GET__Interconn_Index(
            iot__mousePressed_Interconn_Device_name, iot__mousePressed_Interconn_OutPut_index, iot__mousePressed_Interconn_Devise_name, iot__mousePressed_Interconn_InPut_index);

            if (Interconn_Index === -1) {
                if (API_iot_GET__Device_InPut_Status(iot__mousePressed_Interconn_Devise_name, iot__mousePressed_Interconn_InPut_index) === 0) {
                    API_iot_CREATE__Interconn(
                    iot__mousePressed_Interconn_Device_name, iot__mousePressed_Interconn_OutPut_index, iot__mousePressed_Interconn_Devise_name, iot__mousePressed_Interconn_InPut_index, CREATOR_LOCAL);
                    Sav_000.hide();
                    Sav_001.show();
                }
            } else {
                API_iot_DELETE__Interconn(Interconn_Index, CREATOR_LOCAL);
                Sav_000.hide();
                Sav_001.show();
            }
            //////////////////////////////////////////////////////////
            iot__mousePressed_OutPut_Status = 0;
            iot__mousePressed_InPut_Status = 0;
        }
    }
    if (iot__mousePressed_OutPut_Status === 0 && iot__mousePressed_InPut_Status === 0) {
        iot__mousePressed_OutPut_InPut_Step = 0;
        iot__mousePressed_OutPut_locked = 0;
        iot__mousePressed_InPut_locked = 0;
        iot__mousePressed_Interconn_Device_name = 0;
        iot__mousePressed_Interconn_OutPut_index = 0;
        iot__mousePressed_Interconn_Devise_name = 0;
        iot__mousePressed_Interconn_InPut_index = 0;
    }
}








//////////////////////////////////////////////////////////////////////////
//
//   
//
//
//////////////////////////////////////////////////////////////////////////
function iot__Selected(Device_name) {
    iot__Selected_Device_name = Device_name;
    info.announce(0, "Device: " + Device_name + " Selected", "");
}
///////////////////////////////////////////////////////////////////////
function iot__anSelected() {
    iot__Selected_Device_name = 0;
}
//////////////////////////////////////////////////////////////////////////
//
//   
//
//
//////////////////////////////////////////////////////////////////////////
function draw__VCB() {
    var i = 0;
    for (i = 0; i < iot__Device.length; i++) {
        	iot__Device[i]._display(W1.X, W1.Y);
    }
    for (i = 0; i < iot__Interconn.length; i++) {
    	iot__Interconn[i]._display();
    }
    
    
    
   if( Popup_window === 1){
	   
	   
	    var DEVICE_INDEX = API_iot_GET__Device_Index(Popup_window_Device_Device_name);
	    var OUTPUT_INDEX = Popup_window_Device_OutPut_index;
	    if (DEVICE_INDEX !== -1) {
	    	var _UNIX_TIME	 = iot__OutPut[DEVICE_INDEX][OUTPUT_INDEX].UNIX_TIME;
	    	var _DATA		 = iot__OutPut[DEVICE_INDEX][OUTPUT_INDEX].DATA;
	    	var _Description = iot__OutPut[DEVICE_INDEX][OUTPUT_INDEX].Description;   
	    	////////////////////////////////////////////////////////
	    	
	    	
	    	if ( _Description === "undefined"){
	    		//_Description = Popup_window_Device_Device_name+"("+Popup_window_Device_OutPut_index+")";
	    		_Description = iot__Device[DEVICE_INDEX].Description+" ("+Popup_window_Device_OutPut_index+")";
	    	}else{
	    		_Description = iot__Device[DEVICE_INDEX].Description+" ("+_Description+")";
	    	}
	    	_Description =_Description + " = " + _DATA;
	    		
	    	var _Time_Delta = "";
	    	if(_UNIX_TIME===0){
	    		_TIME = "...";
	    		_Time_Delta = "...";
	    	}else{
	    		_TIME = TIME_UNIX_TO_GMT(_UNIX_TIME);
	    		_Time_Delta = Time_Delta(SYS_TIME_SEC,_UNIX_TIME);
	    	}
	    	
	    	var _DATA_Len = _DATA.length + 2;
	    	var _Description_Len = _Description.length + 2;
	    	var _TIME_Len = _TIME.length + 2;
	    	
	    	var Popup_w = 0;
	    	if(_DATA_Len > _Description_Len){	
	    		if(_DATA_Len > _TIME_Len){
	    			Popup_w = _DATA_Len * 9;
	    		}else{
	    			Popup_w = _TIME_Len * 9;
	    		}
	    	} else {
	    		if(_Description_Len > _TIME_Len){
	    			Popup_w = _Description_Len * 9;
	    		}else{
	    			Popup_w = _TIME_Len * 9;
	    		}
	    	}
	    	
	
	    	textSize(14);
	        
	        textAlign(CENTER);

        	noStroke();
        	fill(200,150);
        	rect(Popup_window_x, Popup_window_y-1, Popup_w+8+12, 29+44,3); 
       	
        	strokeWeight(1);
        	noStroke();
            fill(245,230);
            rect(Popup_window_x, Popup_window_y-1, Popup_w+12, 20+44,3);

            fill('blue');
            fill('red');
            fill(0);
            noStroke();
            text(_Description, Popup_window_x, Popup_window_y - 17+5); 	
            
            textStyle(NORMAL);
            noStroke();
            fill(255, 100, 0);
            text(_TIME, Popup_window_x, Popup_window_y +2+5);
            text(_Time_Delta, Popup_window_x, Popup_window_y +16+5); 	    	
	
	    }  	    	
	    	
	    	
	    	
	    }


	   
	   
	   
 
    
    
    
    iot__InOut_Meneger._display();
}



function Time_Delta(Time1,Time2) {	
	var Time3 = Time1 - Time2;
	//Time3 = 86400+3600+60+5;
	
	var D = parseInt(Time3/86400);
	Time3 = Time3 - (D*86400);
	var H = parseInt(Time3/3600);
	Time3 = Time3 - (H*3600);
	var M = parseInt(Time3/60);
	var S = Time3 - (M*60);	
	
    var _D = D.toString();
    var _H = H.toString();
    var _M = M.toString();
    var _S = S.toString();
    if(_H.length===1)_H="0"+_H;
    if(_M.length===1)_M="0"+_M;
    if(_S.length===1)_S="0"+_S;
	
    return _D+" Day "+_H+":"+_M+":"+_S; 
}

//////////////////////////////////////////////////////////////////////////
//
//   
//
//
//////////////////////////////////////////////////////////////////////////
function mousePressed__VCB() {
    var i;
    var ii;
    iot__mousePressed_OutPut_Status = 0;
    iot__mousePressed_InPut_Status = 0;
    for (i = 0; i < iot__Device.length; i++) {
			for (ii = 0; ii < iot__OutPut[i].length; ii++) iot__OutPut[i][ii]._mousePressed();
			for (ii = 0; ii < iot__InPut[i].length; ii++) iot__InPut[i][ii]._mousePressed();
    }
    iot__interactive_interconnection_processing();
    //////////////////////////////////////////////////////
    iot__GLOBAL_Lock = 0;
    for (var i = 0; i < iot__Device.length; i++) {
        iot__Device[i].Lock = 0;
    }
    var xxx = iot__Device.length - 1;
    for (var i = 0; i < iot__Device.length; i++) {
    	
	        iot__Selected_Device_name = 0;
	        if (iot__Device[xxx - i]._mousePressed(W1.X, W1.Y) === 1) {
	        		_iot__Selected_Device_name = iot__Selected_Device_name;
	            break;
	        }
	        iot__InOut_Meneger._display();
    	
    }
    iot__InOut_Meneger._mousePressed();
}
///////////////////////////////////////////////
function mouseReleased__VCB() {
    var i;
    for (i = 0; i < iot__Device.length; i++) {
    		iot__Device[i]._mouseReleased();
    }
}
///////////////////////////////////////////////
function mouseDragged__VCB() {
    var i;
    for (var i = 0; i < iot__Device.length; i++) {
    		iot__Device[i]._mouseDragged(W1.X, W1.Y, W1.SizeW, W1.SizeH);
    }
}
///////////////////////////////////////////////







