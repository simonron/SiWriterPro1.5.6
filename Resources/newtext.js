Ti.App.addEventListener('webviewEvent', function(e) {

	////***********************///DELETE sensor//
	if (e.text == "\b_") {
		e.text = "";
		contentTyped = contentTyped.slice(0, -1);
		txtViewDesc.value = contentTyped + "_";
	} else {
		//************************/END////DELETE sensor//
		/////////////////////////////////////////////

		// if (Titanium.App.keyboardVisible) {
			// Ti.API.info('KV inside = ' + KV);
			// KV = true;
			// Toggle = true;
			// temp = txtViewDesc.value;
			// Ti.API.info('temp inside = ' + temp);
			// if (KV == true) {//Ti.App.fireEvent('webviewEvent', {text: ""});
				// if (txtViewDesc.value != contentTyped) {
					// contentTyped = txtViewDesc.value;
				// }
				// contentTyped = temp;
				// KV = false;
				// e.text = "";
				// txtViewDesc.value = contentTyped;
				// Trigger=1;
				// Ti.API.info('INSIDE Trigger = ' + Trigger);
// 
			// }
		// }


Ti.API.info('OUTSIDE Trigger = ' + Trigger);
		Ti.API.info('OUTSIDE txtViewDesc.value = ' + txtViewDesc.value);

		Ti.API.info('OUTSIDE contentTyped = ' + contentTyped);
		if (contentTyped.length!= txtViewDesc.value.length){contentTyped=txtViewDesc.value;};
		//contentTyped = txtViewDesc.value;
		
		//
		// if(txtViewDesc.value != contentTyped){contentTyped=txtViewDesc.value.slice(0,-1);}
		// if(Trigger==1){
		 
		 // if((txtViewDesc.value).slice(0,-1) != contentTyped){contentTyped=(txtViewDesc.value);}
		// Toggle=false;
		 // }


		//if((KV==true)&&(!Titanium.App.keyboardVisible)){contentTyped=temp;txtViewDesc.value=contentTyped;KV=false;}
		Ti.API.info('temp outside = ' + temp);
		Ti.API.info('KV outside = ' + KV);

		///////////////////////////////////////////

		contentTyped = contentTyped + e.text;
		e.text = "";

		if (!Titanium.App.keyboardVisible) {
			txtViewDesc.value = contentTyped + "";
		}
	};
	//-----------AGENDA PAD TEXT ADDed here letter by letter-"
	//content +=e.text; /// creates actual stored typed text
	//txtViewDesc.value+=e.text;

	trailer = contentTyped.slice(-11);
	Ti.API.info('trailer: ' + trailer);
	aTrailer.value = trailer;
	//if(contentTyped!=txtViewDesc.value){}

	//}

});
// end event listener

//webview.addEventListener('touchstart',function(e) {
//if (Review_mode=1){contentTyped=txtViewDesc.value; Review_mode=0;}

//Ti.Media.vibrate();
//});

Ti.App.addEventListener('missed_keypad_end', function(e) {
	//alert("MISSED");
	Ti.API.info('MISSED');

	//Vibrate( 0, 100, 10);
	//Ti.Media.vibrate();

});
