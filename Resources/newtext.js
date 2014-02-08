Ti.App.removeEventListener('webviewEvent', function(e) {});

Ti.App.addEventListener('webviewEvent', function(e) {

	////***********************///DELETE sensor//
	if (e.text == "\b_") {
		e.text = "";
		contentTyped = contentTyped.slice(0, -1);
		trailer=trailer.slice(0, -1);
		txtViewDesc.value = contentTyped + "_";
	} 
		//************************/END////DELETE sensor//
		//////////////////////MAGIC BIT////add apple keyboard text and allows full editing//////////////////////
		if (contentTyped.length!= txtViewDesc.value.length-1){(contentTyped=txtViewDesc.value);};
		
		////////////////END MAGIC BIT///////////////////////////

		contentTyped = contentTyped + e.text ;
		

		if (!Titanium.App.keyboardVisible) {
			txtViewDesc.value = contentTyped + "_";
		}
	


	// trailer = contentTyped.slice(-23);
	// Ti.API.info('trailer: ' + trailer);
	
	trailer = trailer.slice(-23) + e.text;
	
	aTrailer.value = trailer + "_";


});


