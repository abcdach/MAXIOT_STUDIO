


var My_LAT = 0;
var My_LON = 0;
var mymap = L.map('leafletmap');
mymap.setView([My_LAT,My_LON], 14);
var marker = L.marker([My_LAT,My_LON]).addTo(mymap);


L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
}).addTo(mymap);


$('.pure-button').on('click', function(){
	marker.setLatLng([My_LAT, My_LON]).update();		
	mymap.setView(new L.LatLng(My_LAT, My_LON),mymap.getZoom());
});

mymap.on('locationfound', onLocationFound);
function onLocationFound(e) {
    console.log(e); 
    L.marker(e.latlng).addTo(mymap);
}

$(document).ready(function()
{
		websocket_START();
});

function Print_Data_Stream_0(Data){ 

		//var temp = "41.7607,44.7904";
		$('#Text_S0').text(Data);
	//#--------------------------------------------------------------
		var GPS_Values = Data.split(',');
		My_LAT = GPS_Values[0];
		My_LON = GPS_Values[1];
	//#--------------------------------------------------------------
		marker.setLatLng([My_LAT, My_LON]).update();
		mymap.setView(new L.LatLng(My_LAT, My_LON),mymap.getZoom());
	//#--------------------------------------------------------------
}


function Print_Data_Stream_1(Data){ $('#Text_S1').text(Data);}
//function Print_Data_Stream_2(Data){ $('#Text_S2').text(Data);}















