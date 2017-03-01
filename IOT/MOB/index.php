<?php include '../Config/MySQL.php';?>

<?php
	class UI{
		public $Index;
		public $DEVICE_ID;	
		public $DEVICE_DESCRIPTION;
	} 
	$DEVICE_OBJECT[] = new UI();
	$DEVICE_OBJECT_COU = 0;
	$debug = 0;


if($debug==1){echo $localIP."<br>";}

	$conn = new mysqli($mysql_host,$mysql_user,$mysql_password,$mysql_dbname);
	if ($conn->connect_error){
		if($debug==1){echo "error: MySQL Connection failed<br>";}
		exit();
	} else {
		if($debug==1){echo "MySQL Connection established<br>";}
	}

	$sql = "SELECT * FROM `DEVICE` WHERE `TYPE` = '2';";
	
	$result = $conn->query($sql);
	if ($result->num_rows > 0){
		while($row = $result->fetch_assoc()){
			$DEVICE_ID = $row["ID"];
			$DEVICE_DESCRIPTION = $row["DESCRIPTION"];
			
			if($debug==1){echo "<br>";}
			if($debug==1){echo "DEVICE_ID: " . $DEVICE_ID . "<br>";}
			if($debug==1){echo "DEVICE_DESCRIPTION : " . $DEVICE_DESCRIPTION . "<br>";}

			$DEVICE_OBJECT[(int)$DEVICE_OBJECT_COU]->UI->Index  = $DEVICE_OBJECT_COU;
			$DEVICE_OBJECT[(int)$DEVICE_OBJECT_COU]->UI->DEVICE_ID  = $DEVICE_ID;
			$DEVICE_OBJECT[(int)$DEVICE_OBJECT_COU]->UI->DEVICE_DESCRIPTION  = $DEVICE_DESCRIPTION;			
			$DEVICE_OBJECT_COU ++;
		}
	} else { if($debug==1){echo "error: MySQL !!!<br>";}}
	//exit();
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>MAXIOT</title>
	<link rel="stylesheet" href="css/themes/default/jquery.mobile-1.4.5.min.css">
	<link rel="shortcut icon" href="favicon.ico">
	<script src="js/jquery.js"></script>
	<script src="js/jquery.mobile-1.4.5.min.js"></script>
	<link type="text/css" href="css/main.css" rel="stylesheet" />
	<script src="js/MyBase64.js"></script>
	<script src="js/WebSocket.js"></script>
	<script src="js/main.js"></script>
<script>
$( document ).on( "pagecreate", function() {
	//#--------------------------------------------
		//if (java && java.net)
		//ip = ''+java.net.InetAddress.getLocalHost().getHostAddress();
		//else ip = 'unknown';
	
	//#--------------------------------------------
		MyHeader_wText("MAXIOT");
	//#--------------------------------------------
		$("#theme_Day").click(function (e) {
			e.stopImmediatePropagation();
			e.preventDefault();			    
			theme_Selector("a");
		});	
	//#--------------------------------------------	
		$("#theme_Night").click(function (e) {
			e.stopImmediatePropagation();
			e.preventDefault();	
			theme_Selector("b");   
		});			
	//#--------------------------------------------
		$("#server_connect").click(function (e) {
			e.stopImmediatePropagation();
			e.preventDefault();
			window.open ('index.php','_self',false); 
		});	
	//#--------------------------------------------
		$("#server_Disconnect").click(function (e) {
			//e.stopImmediatePropagation();
			//e.preventDefault();
		});	
	//#--------------------------------------------	
		<?php
			function UI_JAVA_DEVICE_OBJECT($UI_OBJ) {
				echo"
					
				$(\"#button_".$UI_OBJ->UI->Index."\").click(function (e) {
					e.stopImmediatePropagation();
					e.preventDefault();
					window.open ('MOB.php?Dev=".$UI_OBJ->UI->DEVICE_ID."','_self',false);
				});";
				return;
			}
			for($x=0; $x<$DEVICE_OBJECT_COU; $x++) UI_JAVA_DEVICE_OBJECT($DEVICE_OBJECT[$x]);
		?>
	//#--------------------------------------------			
});
</script>	
</head>
<body>
<div data-role="page" id="testpage">
	<div data-role="header">
		<h3><span id="MyHeader_Text"><?php echo $Dev;?></span></h3>  
		<div data-role="navbar">
			<ul>
				<li><a href="#" id="server_connect">Main</a></li>
				<li><a href="#" id="server_Disconnect">.</a></li>
				<li><a href="#" id="theme_Day" >Day</a></li>
				<li><a href="#" id="theme_Night" >Night</a></li>
			</ul>
		</div>
	</div><!-- /header -->
	<div class="ui-content" role="main">			
<form>	
<?php
function UI_HTML_DEVICE_OBJECT($UI_OBJ) {
	echo"
		
	<!-- button -->
	<div class=\"ui-field-contain\">
	<button name=\"button_".$UI_OBJ->UI->Index."\" id=\"button_".$UI_OBJ->UI->Index."\" class=\"ui-btn ui-corner-all ui-shadow \">".$UI_OBJ->UI->DEVICE_DESCRIPTION." (".$UI_OBJ->UI->DEVICE_ID.")</button>
	</div>";
	return;
}
for($x=0; $x<$DEVICE_OBJECT_COU; $x++)
{
	UI_HTML_DEVICE_OBJECT($DEVICE_OBJECT[$x]);
}
?>
</form>			
</div>
</div><!-- /page -->
</body>
</html>
