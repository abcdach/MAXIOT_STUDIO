<?php
function UI_HTML_INPUT_OBJECT($UI_OBJ) {
	switch ($UI_OBJ->UI->NU) {
		//////////////////////////////////////
		case "1": //Text Input:
			echo"
					
			<!-- TextInput -->			
			<div class=\"ui-field-contain\">
			<label for=\"name_".$UI_OBJ->UI->INDEX."\">".$UI_OBJ->UI->DE."</label>
			<input type=\"text\" name=\"text_".$UI_OBJ->UI->INDEX."\" id=\"text_".$UI_OBJ->UI->INDEX."\" value=\"\" >
			</div>
			<script>
			function Process_Stream_".$UI_OBJ->UI->INDEX."(Data){
				$('#text_".$UI_OBJ->UI->INDEX."').val(Data);
			}
			</script>";
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
function UI_HTML_OUTPUT_OBJECT($UI_OBJ) {
	switch ($UI_OBJ->UI->NU) {
		//////////////////////////////////////
		case "1": //Flip switch
			echo"
				
			<!-- Flip switch -->		
			<div class=\"ui-field-contain\">
				<label for=\"flip_".$UI_OBJ->UI->INDEX."\">".$UI_OBJ->UI->DE."</label>
				<select name=\"flip_".$UI_OBJ->UI->INDEX."\" id=\"flip_".$UI_OBJ->UI->INDEX."\" data-role=\"flipswitch\">
					<option value=\"".$UI_OBJ->UI->P0."\">".$UI_OBJ->UI->P1."</option>
					<option value=\"".$UI_OBJ->UI->P2."\">".$UI_OBJ->UI->P3."</option>
				</select>
			</div>
			<script>
			function PUT_Value_Object_".$UI_OBJ->UI->INDEX."(Data){
				if(Data != 0)Data='1';
				$('#flip_".$UI_OBJ->UI->INDEX."').val(Data).flipswitch(\"refresh\");
			}
			</script>";
			break;
		//////////////////////////////////////
		case "2": //Slider
			echo"
						
			<!-- Slider -->
			<div class=\"ui-field-contain\">
				<label for=\"slider_".$UI_OBJ->UI->INDEX."\">".$UI_OBJ->UI->DE."</label>
				<input type=\"range\" name=\"slider_".$UI_OBJ->UI->INDEX."\" id=\"slider_".$UI_OBJ->UI->INDEX."\" value=\"0\" min=\"".$UI_OBJ->UI->P0."\" max=\"".$UI_OBJ->UI->P1."\" data-highlight=\"true\">
			</div>
			<script>
			function PUT_Value_Object_".$UI_OBJ->UI->INDEX."(Data){
				$('#slider_".$UI_OBJ->UI->INDEX."').val(Data).slider(\"refresh\");			
			}
			</script>";
			break;
		/////////////////////////////////////
		case "3": //button
			echo"
				
			<!-- button -->
			<div class=\"ui-field-contain\">
			<button name=\"button_".$UI_OBJ->UI->INDEX."\" id=\"button_".$UI_OBJ->UI->INDEX."\" class=\"ui-btn ui-corner-all ui-shadow \">".$UI_OBJ->UI->DE."</button>
			</div>";
			break;
		//////////////////////////////////////
		default:
			return;
	}
	return;
}
?>
<?php	
for($x=0; $x<$INPUT_OBJECT_COU; $x++)
{
	UI_HTML_INPUT_OBJECT($INPUT_OBJECT[$x]);
}
?>
<?php	
for($x=0; $x<$OUTPUT_OBJECT_COU; $x++)
{
	UI_HTML_OUTPUT_OBJECT($OUTPUT_OBJECT[$x]);
}
?>
<?php	
if($Terminal==1)
{
	echo"
		
	<!-- Textarea -->
	<div class=\"ui-field-contain\">
		<label for=\"textarea2\">Textarea:</label>
		<textarea data-autogrow=\"false\" cols=\"40\" rows=\"10\" name=\"textarea2\" id=\"textarea2\" ></textarea>
	</div>";
}
?>





















