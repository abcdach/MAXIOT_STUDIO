<?php include '../Config/MySQL.php';?>
<?php include '../Config/IP.php';?>
<?php
	class UI
	{
		public $INDEX;
		public $DEVICE;
	    public $DE;
	    public $NU;
	} 
	$OUTPUT_OBJECT[]   = new UI();
	$OUTPUT_OBJECT_COU = 0;
	$INPUT_OBJECT[]    = new UI();
	$INPUT_OBJECT_COU  = 0;
?>    
<?php
	$debug = 0;
	$Terminal = 0;
	
	if( $_GET["Dev"] == "" ){
		if($debug==1){echo "Dev: error<br>";}
		//exit();
	}else{
		$Dev = $_GET["Dev"];
	}
?>
<?php
	$conn = new mysqli($mysql_host,$mysql_user,$mysql_password,$mysql_dbname);
	if ($conn->connect_error){
		if($debug==1){echo "error: MySQL Connection failed<br>";}
		exit();
	} else {
		if($debug==1){echo "MySQL Connection established<br>";}
	}
?>
<?php  

	$sql = "SELECT * FROM `OUTPUT` WHERE `DEV_ID` = '".$Dev."';";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) 
	{
		while($row = $result->fetch_assoc()) 
		{
			$DEV_ID= $row["DEV_ID"];
			$ID = $row["ID"];
			$DESCRIPTION = $row["DESCRIPTION"];
			$DATA = $row["DATA"];
			
			if($debug==1){echo "<br>";}
			if($debug==1){echo "OutPut_DEV_ID : " . $DEV_ID . "<br>";}
			if($debug==1){echo "OutPut_ID : " . $ID . "<br>";}
			if($debug==1){echo "OutPut_DESCRIPTION : " . $DESCRIPTION . "<br>";}
			if($debug==1){echo "OutPut_DATA : " . base64_decode($DATA) . "<br>";}
			
			$json = base64_decode($DATA);
			$OUTPUT_OBJECT[(int)$ID] = json_decode($json);
			$OUTPUT_OBJECT[(int)$ID]->UI->INDEX  = $ID;
			$OUTPUT_OBJECT[(int)$ID]->UI->DEVICE = $DEV_ID;
			$OUTPUT_OBJECT_COU ++;
			
		}
	} else {
		if($debug==1){echo "error: MySQL !!!<br>";}
	}
?>
<?php  

	$sql = "SELECT * FROM `INPUT` WHERE `DEV_ID` = '".$Dev."';";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) 
	{
		while($row = $result->fetch_assoc()) 
		{
			$DEV_ID= $row["DEV_ID"];
			$ID = $row["ID"];
			$DESCRIPTION = $row["DESCRIPTION"];
			$DATA = $row["DATA"];
			
			if($debug==1){echo "<br>";}
			if($debug==1){echo "InPut_DE_ID : " . $DEV_ID . "<br>";}
			if($debug==1){echo "InPut_ID : " . $ID . "<br>";}
			if($debug==1){echo "InPut_DESCRIPTION : " . $DESCRIPTION . "<br>";}
			if($debug==1){echo "InPut_DATA : " . base64_decode($DATA) . "<br>";}
			
			$json = base64_decode($DATA);
			$INPUT_OBJECT[(int)$ID] = json_decode($json);
			$INPUT_OBJECT[(int)$ID]->UI->INDEX  = $ID;
			$INPUT_OBJECT[(int)$ID]->UI->DEVICE = $DEV_ID;
			$INPUT_OBJECT_COU ++;		
		}
	} else {
		if($debug==1){echo "error: MySQL !!!<br>";}
	}
	//echo $INPUT_OBJECT_COU;
	if($debug==1) exit();
?>

<?php
	$Temp_XXX = 0;

	if($Temp_XXX==1){
		$json = "{ \"UI\":{ \"DE\":\"Flip switch:\", \"NU\":\"1\", \"P0\":\"0\", \"P1\":\"Off\", \"P2\":\"1\", \"P3\":\"On\"      }}";
		$XXX[0] = json_decode($json);
		$XXX[0]->UI->INDEX = 0;
		$XXX[0]->UI->DEVICE = 42577;
		
		$json = "{ \"UI\":{ \"DE\":\"Slider:\", \"NU\":\"2\", \"P0\":\"0\", \"P1\":\"100\"} }";
		$XXX[1] = json_decode($json);	
		$XXX[1]->UI->INDEX = 1;
		$XXX[1]->UI->DEVICE = 42577;
		
		$json = "{ \"UI\":{ \"DE\":\"Button\", \"NU\":\"3\"}}";
		$XXX[2] = json_decode($json);
		$XXX[2]->UI->INDEX = 2;
		$XXX[2]->UI->DEVICE = 42577;
	}
	
	
	//echo $XXX[0] . "<br>";
	//echo $XXX[1] . "<br>";
	//exit();
?>


