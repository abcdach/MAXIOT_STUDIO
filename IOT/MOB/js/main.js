function theme_Selector(themeClass) {
	$( "#testpage" ).removeClass( "ui-page-theme-a ui-page-theme-b" ).addClass( "ui-page-theme-" + themeClass );
	$( "#ui-body-test" ).removeClass( "ui-body-a ui-body-b" ).addClass( "ui-body-" + themeClass );
	$( "#ui-bar-test, #ui-bar-form" ).removeClass( "ui-bar-a ui-bar-b" ).addClass( "ui-bar-" + themeClass );
	$( ".ui-collapsible-content" ).removeClass( "ui-body-a ui-body-b" ).addClass( "ui-body-" + themeClass );
	$( ".theme" ).text( themeClass );	
}
function MyHeader_wText( Text ) {
	$("#MyHeader_Text").text(Text);
}
//var Term_Text = "";
//function TERMINAL( message ) {
//	var Termin = 0;
//	if ( Termin === 1){
//		Term_Text += message;
//		$('#textarea2').val( Term_Text );
//		var psconsole = $('#textarea2');
//		if(psconsole.length) psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());
//	}
//}
//function TERMINAL_CLEAR() {
//	Term_Text = "";
//	$('#textarea2').val( Term_Text );
//}

//function PING() {
//
//	if(websocket_status===1){
//		var Msg ="{\"C\":\"1\",\"D\":\""+myDev+"\",\"N\":\"255\",\"i\":\"PING\"}";
//		//TERMINAL(FROM_SEN + Msg + '\n');			
//		websocket_send(Msg);
//	}
//	setTimeout(PING, 3000);	
//}



