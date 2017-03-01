


var My_LAT = 41.7607;
var My_LON = 44.7704;
var mymap = L.map('leafletmap');
mymap.setView([My_LAT,My_LON], 14);
var marker = L.marker([My_LAT,My_LON]).addTo(mymap);



//marker.bindPopup("<b>GPS DATA</b>").openPopup();

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
}).addTo(mymap);


//var lat = (e.latlng.lat);
//var lng = (e.latlng.lng);
//marker.setLatLng([lat, lng]).update(); 

$('.pure-button').on('click', function(){
  //mymap.locate({setView: true, maxZoom: 15});
    //mymap.setView(new L.LatLng(0, 0),14);
	//marker.setLatLng([41.7607, 44.7704]).update();
	//marker.bindPopup("<b>Hello world!</b><br>ddddddd").openPopup();
	//marker.bindPopup("<b>GPS DATA</b>").openPopup();
	marker.setLatLng([My_LAT, My_LON]).update();		
	mymap.setView(new L.LatLng(My_LAT, My_LON),mymap.getZoom());
});





mymap.on('locationfound', onLocationFound);
function onLocationFound(e) {
    console.log(e); 
    // e.heading will contain the user's heading (in degrees) if it's available, and if not it will be NaN. This would allow you to point a marker in the same direction the user is pointed. 
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















