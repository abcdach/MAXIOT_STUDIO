///////////////////////////////////////
var iot_Canvas;
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
var iot__OutPut_SizeW = 13;
var iot__OutPut_SizeH = 10;
var iot__InPut_SizeW = 13;
var iot__InPut_SizeH = 10;
///////////////////////////////////////
var iot__Deviceice_SizeW = 60;
var iot__CanvasX = 0;
var iot__CanvasY = 0;
var iot__CanvasW = 1700;
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
var iot__Selected_Device_name = 0;
var iot__GLOBAL_Lock = 0;
var _iot__Selected_Device_name;
var iot__InOut_Meneger;
////////////////////////////////////////////////////////////////////////////
//
//   
//
//
//////////////////////////////////////////////////////////////////////////
function setup__VCB(){
    iot__InOut_Meneger = new OBJECT_iot__InOut_Meneger();
}
////////////////////////////////////////////////////////////////////////////
//
//   APIS
//
//
//////////////////////////////////////////////////////////////////////////
function API_iot_CREATE_Device_InPut(Device_name, InPut_Index) {
    var Device_index = API_iot_GET__Device_Index(Device_name);
    if (Device_index !== -1) {
        if (typeof iot__InPut[Device_index][InPut_Index] === "undefined") {
            var Temp1 = iot__InPut[Device_index].length;
            for (var i = Temp1; i < InPut_Index + 1; i++) {
                iot__InPut[Device_index][i] = new OBJECT_iot__Device_InPut(Device_name, i, CREATOR_SQL, 1);
            }
            iot__Device[Device_index].Device_refresh = 1;
            redraw();
            return InPut_Index;
        } else {
            iot__Device[Device_index].Device_refresh = 1;
            redraw();
            return InPut_Index;
        }
    }
    return -1;
}
//////////////////////////////////////////////////////////////////////////
function API_iot_CREATE_Device_OutPut(Device_name, OutPut_Index) {
    var Device_index = API_iot_GET__Device_Index(Device_name);
    if (Device_index !== -1) {
        if (typeof iot__OutPut[Device_index][OutPut_Index] === "undefined") {
            var Temp1 = iot__OutPut[Device_index].length;
            for (var i = Temp1; i < OutPut_Index + 1; i++) {
                iot__OutPut[Device_index][i] = new OBJECT_iot__Device_OutPut(Device_name, i, CREATOR_SQL, 1);
            }
            iot__Device[Device_index].Device_refresh = 1;
            redraw();
            return OutPut_Index;
        } else {
            iot__Device[Device_index].Device_refresh = 1;
            redraw();
            return OutPut_Index;
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
        } else {
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
//////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////
function API_iot_DELETE__Device(Device_Name) {
    var Device_index = API_iot_GET__Device_Index(Device_Name);
    if (Device_index !== -1) {
        iot__Device.splice(Device_index, 1);
        iot__OutPut.splice(Device_index, 1);
        iot__InPut.splice(Device_index, 1);
        redraw();
        return 1;
    }
    return 0;
}
//////////////////////////////////////////////////////////////////////////
function API_iot_CREATE__Device(Device_name, x, y, Name_Text, Type) {
    var Device_index = API_iot_GET__Device_Index(Device_name);
    if (Device_index === -1) {
        Device_index = iot__Device.length;
        iot__Device[Device_index] = new OBJECT_iot__Device(x, y, Device_name, Device_index, Name_Text, Type);
        iot__OutPut[Device_index] = [];
        iot__InPut[Device_index] = [];
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
function API_iot_PUT__OutPut_DATA(Device_name, OutPut_Index, DATA) {
    var Device_index = API_iot_GET__Device_Index(Device_name);
    if (typeof iot__OutPut[Device_index][OutPut_Index] === "undefined") {
        API_iot_CREATE_Device_OutPut(Device_name, OutPut_Index);
        iot__OutPut[Device_index][OutPut_Index].CREATOR = CREATOR_LOCAL;
        iot__OutPut[Device_index][OutPut_Index].Status = 0;
    }
    iot__OutPut[Device_index][OutPut_Index].DATA = DATA;
    iot__OutPut[Device_index][OutPut_Index].DATA_STATUS = 1;
    //return -1;
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
            this.x1 = this.x + this.SizeW / 2 + 2;
            this.y1 = this.y + this.SizeH / 2 + this.ellipse_size / 2 + 1 + 0;

            this.x2 = this.x + this.SizeW / 2 - this.ellipse_size + 1;
            this.y2 = this.y + this.SizeH / 2 + this.ellipse_size / 2 + 1 + 0;

            this.x3 = this.x - this.SizeW / 2 - 2;
            this.y3 = this.y + this.SizeH / 2 + this.ellipse_size / 2 + 1 + 0;

            this.x4 = this.x - this.SizeW / 2 + this.ellipse_size - 1;
            this.y4 = this.y + this.SizeH / 2 + this.ellipse_size / 2 + 1 + 0;





            this.x5 = this.x;
            this.y5 = this.y + this.SizeH / 2 + this.ellipse_size / 2 + 1;




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
            if (d < (this.ellipse_size / 2)) { //DELETE OBJECT!!!!
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

            if (iot__Device[Device_Index].Device_Delete_Status === 0) {
                //OUTPUT DEL #################################################
                var d = dist(mouseX, mouseY, this.x1, this.y1);
                if (d < (this.ellipse_size / 2)) { //w+
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
                if (d < (this.ellipse_size / 2)) {
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
                if (d < (this.ellipse_size / 2)) {
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
                if (d < (this.ellipse_size / 2)) {
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
                //this.io_Enable = 1;
            }
        }
    };
}
///////////////////////////////////////////////////////////////////////
function OBJECT_iot__Device(x, y, Device_Name, Device_Index, Device_Name_Text, Device_Type) {
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
    this.Device_Name_Text = Device_Name_Text; //
    this.mousePressed_Delta_X = 0;
    this.mousePressed_Delta_Y = 0;
    this.mouseStatus = 0;


    this._display = function(X, Y) {
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
        var del = this.SizeH / (this.OutPut_couter + 1);
        var start = (this.y + Y) - this.SizeH / 2;
        for (var i = 0; i < this.OutPut_couter; i++) {
            iot__OutPut[this.Device_Index][i].x = this.x + X + (this.SizeW / 2 + iot__OutPut_SizeW / 2);
            iot__OutPut[this.Device_Index][i].y = start + del + i * del;
        }
        // InPut refrese
        del = this.SizeH / (this.InPut_couter + 1);
        start = (this.y + Y) - this.SizeH / 2;
        for (i = 0; i < this.InPut_couter; i++) {
            iot__InPut[this.Device_Index][i].x = this.x + X - (this.SizeW / 2 + iot__InPut_SizeW / 2);
            iot__InPut[this.Device_Index][i].y = start + del + i * del;
        }
        /////////////////////////////////////////////////////////////////
        noStroke();
        fill(30, 40);
        rect(this.x + 4 + X, this.y + 4 + Y, this.SizeW, this.SizeH, 5);
        /////////////////////////////////////////////////////////////////
        if (this.Lock === 1) {
            stroke(0);
            fill(235);
            rect(this.x + X, this.y + Y, this.SizeW, this.SizeH, 5);
            iot__InOut_Meneger.x = this.x + X + 1;
            iot__InOut_Meneger.y = this.y + Y + 1;
            iot__InOut_Meneger.SizeW = this.SizeW;
            iot__InOut_Meneger.SizeH = this.SizeH;
        } else {
            stroke(0);
            fill(250);
            rect(this.x + X, this.y + Y, this.SizeW, this.SizeH, 5);
        }
        // save status
        if (this.Save_Status === 0) {} else {
            Sav_000.hide();
            Sav_001.show();
            //Sav_002.hide();
            //Menu_Text[6].text = "Save !!!";
            noStroke();
            stroke(242, 115, 30);
            star(this.x + X + this.SizeW / 2 - 8, this.y + Y - this.SizeH / 2 + 9, 3, 6, 10);
        }
        // Draw OutPut
        for (ii = 0; ii < iot__OutPut[this.Device_Index].length; ii++) {
            iot__OutPut[this.Device_Index][ii]._display();
        }
        // Draw InPut
        for (ii = 0; ii < iot__InPut[this.Device_Index].length; ii++) {
            iot__InPut[this.Device_Index][ii]._display();
        }
        // Device_Delete_Status
        if (this.Device_Delete_Status === 1) {
            textSize(12);
            textStyle(BOLD);
            textAlign(CENTER);
            noStroke();
            fill(0, 102, 153);
            text("Deleted", this.x + X, this.y + Y + 5);
        }
        ///////////////////////////////////////////
        if (this.Device_Type === 0) {
            textSize(15);
            textStyle(BOLD);
            //textAlign(CENTER);
            textAlign(RIGHT);
            //textAlign(LEFT);
            noStroke();
            fill(91, 108, 64);
            //text("Deleted", this.x + X, this.y + Y + 5);- this.SizeW / 2 - 0
            text("S/A", this.x + X - this.SizeW / 2 + 30, this.y + Y - this.SizeH / 2 + 17);
        }
        if (this.Device_Type === 1) {
            textSize(15);
            textStyle(BOLD);
            //textAlign(CENTER);
            textAlign(RIGHT);
            //textAlign(LEFT);
            noStroke();
            fill(222, 122, 66);
            //text("Deleted", this.x + X, this.y + Y + 5);- this.SizeW / 2 - 0
            text("Me", this.x + X - this.SizeW / 2 + 25, this.y + Y - this.SizeH / 2 + 17);
        }
        ///////////////////////////////////////////
        textSize(12);
        textStyle(BOLD);
        textAlign(CENTER);
        noStroke();
        fill(0, 102, 153);
        text(this.Device_name, this.x + X, this.y + Y - this.SizeH / 2 - 3);







        //        var XX = this.x - (mouseX - W1.X);
        //        var YY = this.y - (mouseY - W1.Y);
        //        
        //        if(   Math.abs(XX) < this.SizeW / 2    ){
        //            XXX = 1;
        //        }else{
        //            XXX = 0;
        //        }
        //        if(   Math.abs(YY) < this.SizeH / 2    ){
        //            YYY = 1;
        //        }else{
        //            YYY = 0;
        //        }        
        //
        //        textSize(12);
        //        textStyle(BOLD);
        //        textAlign(CENTER);
        //        noStroke();
        //        fill(0, 102, 153);
        //        text("X: "+XX + "  #" + this.mouseStatus + " DX:"+ this.mousePressed_Delta_X, this.x + X - this.SizeW / 2 + 25, this.y + Y - this.SizeH / 2 - 40);
        //        text("Y: "+YY + "  #" + this.mouseStatus + " DY:"+ this.mousePressed_Delta_Y, this.x + X - this.SizeW / 2 + 25, this.y + Y - this.SizeH / 2 - 20);
        //        
    };
    this._mousePressed = function(X, Y) {

        this.mousePressed_Delta_X = this.x - (mouseX - X);
        this.mousePressed_Delta_Y = this.y - (mouseY - Y);
        var XX;
        var YY;
        if (Math.abs(this.mousePressed_Delta_X) < this.SizeW / 2) {
            XX = 1;
        } else {
            XX = 0;
        }
        if (Math.abs(this.mousePressed_Delta_Y) < this.SizeH / 2) {
            YY = 1;
        } else {
            YY = 0;
        }
        if (XX === 1 && YY === 1) {
            this.mouseStatus = 1;
        }
        //////////////////////////////////////////////////
        if (this.mouseStatus === 1) {
            cursor(MOVE);
            if (iot__GLOBAL_Lock === 0) {
                iot__GLOBAL_Lock = 1;
                this.Lock = 1;
                iot__Selected(this.Device_name);
                iot__InOut_Meneger.io_Enable = this.Device_Delete_Status;
                dom__Device.show(this.x, this.y, this.Device_name, this.Device_Index, this.Device_Name_Text, this.Device_Type);
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
        if (this.mouseStatus === 1) {
            cursor(ARROW);
            this.mousePressed_Delta_X = 0;
            this.mousePressed_Delta_Y = 0;
            this.mouseStatus = 0;
        }
    }
    this._mouseDragged = function(X, Y, W, H) {
        if (this.mouseStatus === 1) {
            var XX1, XX2, YY1, YY2;
            var X1 = (mouseX - X) + this.SizeW / 2 + iot__OutPut_SizeW + this.mousePressed_Delta_X + 10;
            var X2 = (mouseX - X) - this.SizeW / 2 - iot__InPut_SizeW + this.mousePressed_Delta_X - 10;
            var Y1 = (mouseY - Y) + this.SizeH / 2 + this.mousePressed_Delta_Y + 20;
            var Y2 = (mouseY - Y) - this.SizeH / 2 + this.mousePressed_Delta_Y - 40;
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
                this.x = W - (this.SizeW / 2 + iot__OutPut_SizeW + 10);
            } else if (XX2 === 0) {
                this.x = (this.SizeW / 2 + iot__InPut_SizeW + 10);
            }
            //////////////////////////////////////////////////
            if (YY1 === 1 && YY2 === 1) {
                this.y = mouseY - Y + this.mousePressed_Delta_Y;
            } else if (YY1 === 0) {
                this.y = H - (this.SizeH / 2 + 20);
            } else if (YY2 === 0) {
                this.y = (this.SizeH / 2 + 40);
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
        text(this.InPut_index, this.x - this.SizeW / 2, this.y - this.SizeH / 2);
        //textAlign(LEFT);text(this.InPut_index, this.x + this.SizeW/2+1  , this.y  );
    };
    this._mousePressed = function() {
        var d = dist(mouseX, mouseY, this.x, this.y);
        if (d < (this.SizeW / 2)) {
            iot__mousePressed_InPut_Status = 1;
            iot__mousePressed_Interconn_Devise_name = this.Device_name;
            iot__mousePressed_Interconn_InPut_index = this.InPut_index;
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

        textSize(10);
        textStyle(BOLD);
        //textAlign(RIGHT);//LEFT RIGHT
        //textFont(fontItalic);
        noStroke();
        //fill(255, 130, 0);//this.SizeW this.SizeH/2
        textAlign(LEFT);
        text(this.OutPut_index, this.x + this.SizeW / 2, this.y - this.SizeH / 2);

        //DATA
        fill(255, 0, 0);
        //fill(88, 60, 100);
        textAlign(RIGHT);
        text(this.DATA, this.x - this.SizeW / 2 - 3, this.y + this.SizeH / 2 - 1);


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
        ellipse(this.x + this.SizeW / 2 + 4, this.y + 4, 4, 4);

    };
    this._mousePressed = function() {
        var d = dist(mouseX, mouseY, this.x, this.y);
        if (d < (this.SizeW / 2)) {
            iot__mousePressed_OutPut_Status = 1;
            iot__mousePressed_Interconn_Device_name = this.Device_name;
            iot__mousePressed_Interconn_OutPut_index = this.OutPut_index;
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
        this.Device_index_1 = API_iot_GET__Device_Index(this.Device_name_1)
        this.Device_index_2 = API_iot_GET__Device_Index(this.Device_name_2)

        if (typeof iot__OutPut[this.Device_index_1][this.OutPut_index] !== "undefined" && typeof iot__InPut[this.Device_index_2][this.InPut_index] !== "undefined") {
            this.x1 = iot__OutPut[this.Device_index_1][this.OutPut_index].x + iot__OutPut_SizeW / 2 + 1;
            this.y1 = iot__OutPut[this.Device_index_1][this.OutPut_index].y;
            this.x2 = iot__InPut[this.Device_index_2][this.InPut_index].x - iot__InPut_SizeW / 2;
            this.y2 = iot__InPut[this.Device_index_2][this.InPut_index].y;
            this.aa = Math.abs((this.x2 - this.x1) / 2);
            if (this.aa < 50) this.aa = 50; // isartan shemogunvis regulireba
            strokeWeight(2);
            noFill();

            switch (this.Status) {
            case SQL_CONN_ON:
                stroke(0);
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

    if (iot__mousePressed_OutPut_Status === 1) {
        iot__mousePressed_OutPut_locked = 1;
    }
    if (iot__mousePressed_InPut_Status === 1) {
        iot__mousePressed_InPut_locked = 1;
    }
    if (iot__mousePressed_OutPut_InPut_Step === 0) {
        if (iot__mousePressed_OutPut_Status === 1 || iot__mousePressed_InPut_Status === 1) {
            iot__mousePressed_OutPut_InPut_Step = 1;
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
                }
            } else {
                API_iot_DELETE__Interconn(Interconn_Index, CREATOR_LOCAL);
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
    iot__InOut_Meneger._display();
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
function mouseDragged__VCB(){
    var i;
    for (var i = 0; i < iot__Device.length; i++) {
        iot__Device[i]._mouseDragged(W1.X, W1.Y, W1.SizeW, W1.SizeH);
    }
} 
///////////////////////////////////////////////