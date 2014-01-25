Ti.App.addEventListener('webviewEvent', function(e) {

	////***********************///DELETE sensor//
	if (e.text == "\b_") {
		e.text = "";
		contentTyped = contentTyped.slice(0, -1);
		txtViewDesc.value = contentTyped + "";
	} else {
		//************************/END////DELETE sensor//
		//////////////////////MAGIC BIT////add apple keyboard text and allows full editing//////////////////////
		if (contentTyped.length!= txtViewDesc.value.length){(contentTyped=txtViewDesc.value);};
		
		////////////////END MAGIC BIT///////////////////////////

		contentTyped = contentTyped + e.text;
		e.text = "";

		if (!Titanium.App.keyboardVisible) {
			txtViewDesc.value = contentTyped + "";
		}
	};


	trailer = contentTyped.slice(-24);
	Ti.API.info('trailer: ' + trailer);
	aTrailer.value = trailer;


});


Ti.App.addEventListener('missed_keypad_end', function(e) {
	alert("MISSED");
	Ti.API.info('MISSED');

	//Vibrate( 0, 100, 10);
	Ti.Media.vibrate();
});
