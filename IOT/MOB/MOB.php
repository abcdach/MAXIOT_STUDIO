<?php include 'MOB_SQL.php';?>
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
var myDev = <?php echo $Dev;?>;	

var websocket_ip_0     = <?php echo "\"".$Internal_IP."\"";?>;
var websocket_port_0   = <?php echo "\"".$Internal_PORT."\"";?>;
var websocket_ip_1     = <?php echo "\"".$External_IP."\"";?>;
var websocket_port_1   = <?php echo "\"".$External_PORT."\"";?>;

$( document ).on( "pagecreate", function() {	
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
			e.stopImmediatePropagation();
			e.preventDefault();
			window.open ('index.php','_self',false); 
		});	
	//#--------------------------------------------	
		<?php include 'MOB_JAVA.php';?>
	//#--------------------------------------------	
		//////////////////////////////////////////////////////////////////////////
		//$('#name2').val("hiiiiiii");
		//$("#slider_1").val(50).slider("refresh");
		//$("#flip_0").val('1').flipswitch('refresh');
		//////////////////////////////////////////////////////////////////////////
		//var something = "<?php echo $OutPut_config; ?>";
		//something = Base64.decode(something);
		//var something = "ddddd";
		//TERMINAL( something ); 
		//////////////////////////////////////////////////////////////////////////
		websocket_device = <?php echo $Dev;?>;	
		websocket_START(); 	
});
//<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-icon-back ui-btn-icon-left ui-btn-icon-notext">Back</a>
</script>	
</head>
	<body>
		<div data-role="page" id="testpage">
			<div data-role="header">
				<h3><span id="MyHeader_Text">MAXILT</span></h3>  
				<div data-role="navbar">
					<ul>
						<li><a href="#" id="server_connect">Main</a></li>
						<li><a href="#" id="server_Disconnect">.</a></li>
						<li><a href="#" id="theme_Day" >Day</a></li>
						<li><a href="#" id="theme_Night" >Night</a></li>
					</ul>
				</div>
			</div>
			<div class="ui-content" role="main">				
				<form>	
					<?php include 'MOB_HTML.php';?>				
				</form>					
			</div>
		</div>
	</body>
</html>
