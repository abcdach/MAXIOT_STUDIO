<?php
function UI_JAVA_INPUT_OBJECT($UI_OBJ) {
	 

	switch ($UI_OBJ->UI->NU) {
		//////////////////////////////////////
		case "1": //Text Input
			break;
		//////////////////////////////////////
		case "2":
			break;
		/////////////////////////////////////
		case "3":
			break;
		//////////////////////////////////////
		default:
			return;
	}
	return;
}
?>
<?php
function UI_JAVA_OUTPUT_OBJECT($UI_OBJ) {

	switch ($UI_OBJ->UI->NU) {
		//////////////////////////////////////
		case "1": //Flip switch
			echo"

			$( \"#flip_".$UI_OBJ->UI->INDEX."\" ).on( \"change\", function( event ) {
				var Value = $(\"#flip_".$UI_OBJ->UI->INDEX."\").val();
				var Msg = \"{\\\"N\\\":\\\"0\\\",\\\"T\\\":\\\"0\\\",\\\"S\\\":\\\"".$UI_OBJ->UI->INDEX."\\\",\\\"V\\\":\\\"\"+Value+\"\\\"}\";
				//if(websocket_status === 1) 
			websocket_send(Msg);
			});";
			break;
		//////////////////////////////////////
		case "2": //Slider
			echo"
					
			$( \"#slider_".$UI_OBJ->UI->INDEX."\").on('slidestop', function( event ) {
				var Value = $(\"#slider_".$UI_OBJ->UI->INDEX."\").slider().val();
				var Msg = \"{\\\"N\\\":\\\"0\\\",\\\"T\\\":\\\"0\\\",\\\"S\\\":\\\"".$UI_OBJ->UI->INDEX."\\\",\\\"V\\\":\\\"\"+Value+\"\\\"}\";
				//if(websocket_status === 1) 
					websocket_send(Msg);
			});";
			break;
		/////////////////////////////////////
		case "3": // Button
			echo"
					
			var button_".$UI_OBJ->UI->INDEX."_Value = 0;
			$(\"#button_".$UI_OBJ->UI->INDEX."\").click(function (e) {
				e.stopImmediatePropagation();
				e.preventDefault();
				var Value = button_".$UI_OBJ->UI->INDEX."_Value;
				if ( Value === 0 ){
					button_".$UI_OBJ->UI->INDEX."_Value = 1;
				} else {
					button_".$UI_OBJ->UI->INDEX."_Value = 0;
				}
				var Msg = \"{\\\"N\\\":\\\"0\\\",\\\"T\\\":\\\"0\\\",\\\"S\\\":\\\"".$UI_OBJ->UI->INDEX."\\\",\\\"V\\\":\\\"\"+Value+\"\\\"}\";
				//if(websocket_status === 1) 
						websocket_send(Msg);
			});";
			break;
		//////////////////////////////////////
		default:
			return;
	}
	return;
}
?>
<?php
for($x=0; $x<$OUTPUT_OBJECT_COU; $x++)
{
	UI_JAVA_OUTPUT_OBJECT($OUTPUT_OBJECT[$x]);
}	
?>



