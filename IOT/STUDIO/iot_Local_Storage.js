
var SERVER_IP;
var SERVER_PORT;
var My_HOST = "";

//var iot__Remote_IP;
//var iot__Remote_PORT;
var iot__local_STATUS = 0;
var iot__Remote_STATUS = 0;
function iot_LOCAL_STORAGE_READ(){
	clearText();
	My_HOST = document.location.host;	
	TERMINAL( "HOST : " + My_HOST + '\n');
	iot__local_STATUS  = 0;
	/////////////////////////////////////////////////////////////////	
	SERVER_IP    =  localStorage.getItem('Maxiot_IP');
	SERVER_PORT  =  localStorage.getItem('Maxiot_PORT');
	/////////////////////////////////////////////////////////////////
	if(SERVER_IP === null){
		SERVER_IP = My_HOST;	
	}	
	if(SERVER_PORT === null){
		SERVER_PORT = 3003
	}
	TERMINAL("SERVER IP    : " + SERVER_IP   + '\n');
	TERMINAL("SERVER PORT  : " + SERVER_PORT + '\n');
	dom__Options_Inp0.value(SERVER_IP);
	dom__Options_Inp1.value(SERVER_PORT);		
	iot__local_STATUS = 1;
	
}
function iot_LOCAL_STORAGE_WRITE(){	
	TERMINAL("WRITE LOCAL STORAGE :" + '\n');
	SERVER_IP    = dom__Options_Inp0.value();
	SERVER_PORT  = dom__Options_Inp1.value();
	TERMINAL("SERVER IP    : " + SERVER_IP    + '\n');
	TERMINAL("SERVER PORT  : " + SERVER_PORT  + '\n');
	localStorage.setItem('Maxiot_IP'   ,SERVER_IP);
	localStorage.setItem('Maxiot_PORT' ,SERVER_PORT);

	dom__Options_Inp0.style('background-color', '#FFF1F1');
	dom__Options_Inp1.style('background-color', '#FFF1F1');
	dom__Options_progress1.attribute("value", 0);
	window.setTimeout(partB,500);
}
function partB() {
	dom__Options_progress1.attribute("value", 100);
	dom__Options_Inp0.style('background-color', '#DAF7A6');
	dom__Options_Inp1.style('background-color', '#DAF7A6');
}
