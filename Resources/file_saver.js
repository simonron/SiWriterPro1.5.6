function recover_settings(){
	//alert("got here?");

	Ti.API.info("recover_settings -STARTS");
for (var c = 0; c < props.length; c++) {
	var value = Titanium.App.Properties.getString(props[c]);
	if (value == 0) {
		setting = false;
	}
	if (value == 1) {
		setting = true;
	}
	Titanium.API.info(props[c] + " = " + value);

	if (props[c] == "TwistP") {
		var TwistP = value;
			Ti.App.fireEvent('From_Settings_Twist', {TwistP:TwistP});
			//alert("from setting one");
	}
	if (props[c] == "TwistL") {
		var TwistL = value;
			Ti.App.fireEvent('From_Settings_Twist', {TwistL:TwistL});
			//alert("from setting one");
	}


	if (props[c] == "LR_posP") {
		var LR_posP = value;
	}
	if (props[c] == "LR_posL") {
		var LR_posL = value;
	}
	if (props[c] == "UpDwnL") {
		var UpDwnL = value;

	}
	if (props[c] == "UpDwnP") {
		var UpDwnP = value;
	}

	if (props[c] == "HeightP") {
		var HeightP = value;
				//alert("HeightP="+HeightP);

	}

	if (props[c] == "HeightL") {
		var HeightL = value;
		alert("HeightL="+HeightL);
	}


	if (props[c] == "WidthP") {
		var WidthP = value;
	}

	if (props[c] == "WidthL") {
		var WidthL = value;
	}

	if (props[c] == "GapP") {
		var GapP = value;
	}

	if (props[c] == "GapL") {
		var GapL = value;
	}

	if (props[c] == "FPPDisplay") {
		var FPPDisplay = value;
	}

	if (props[c] == "FPhelp") {
		var FPhelp = value;
	}
}

Ti.API.info("recover_settings -For Next ENDS");

DoOrientation();
//satic sensor



Ti.API.info("recover_settings -Orientation ends");

// //Ti.App.fireEvent('app:fromTitanium', { message: 'event fired from Titanium, handled in WebView' });
Ti.API.info("HeightLllllllllllllllllllllllll as sent by APP Settings = "+HeightL);
Ti.API.info("HeightPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP as sent by APP Settings = "+HeightP);
//Ti.API.info("HHHHHHHHHHHHHHHHHHHHHHHHHHHeight as sent by APP Settings = "+Height);
// 
// webview.addEventListener('beforeload', function(e)// sends to webview
// {
	// webview.evalJS("var Twist='" + Twist + "';");
	// webview.evalJS("var LR_pos='" + HeightP + "';");
	// webview.evalJS("var UpDwn='" + UpDwn + "';");
	// webview.evalJS("var Height='" + Height + "';");
	// webview.evalJS("var Width='" + Width + "';");
	// webview.evalJS("var Gap='" + Gap + "';");
	// webview.evalJS("var FPPDisplay='" + FPPDisplay + "';");
	// webview.evalJS("var FPhelp='" + FPhelp + "';");
// });

Ti.API.info("recover_settings -ENDS anfter sending to web");
} //  END OF RECOVERED SETTINGS



function missedKeypad() {
	Ti.Media.vibrate();
	alert("missed");
}


function View_Size() {
	Size = txtViewDesc.value.length;
	var remainder = Size % 28;
	Size = ((Size - remainder) / 28) * 28;
	Size = Size + 35;
	txtViewDesc.top = 30;
	txtViewDesc.height = 355 + Size;
}

function setup_buttons() {
}

function DoOrientation() {//-static sensor---

	var pWidth = Ti.Platform.displayCaps.platformWidth;
	var pHeight = Ti.Platform.displayCaps.platformHeight;

	if (pWidth > pHeight) {
		var oriCurrent = 'landscape';
		orientation = 'landscape';
	} else {
		var oriCurrent = 'portrait';
		orientation = 'portrait';
	}
	if (oriCurrent == "portrait") {
		portrait();
	}
	if (oriCurrent == "landscape") {
		landscape();
	}
	var Model = Titanium.Platform.getModel();
	Ti.API.info("Titanium.Platform !!!!!!!!!!!!!!!!!!!!!! = " + Model);
	Ti.API.info('-- FileSaver 42 --------------------static sensor----------------------------orientation: ' + orientation);

	return oriCurrent;

}

function getOrientation(o) {
	switch (o) {
		case Titanium.UI.PORTRAIT: {
			return 'portrait';
		}
		case Titanium.UI.UPSIDE_PORTRAIT: {
			return 'portrait';
		}
		case Titanium.UI.LANDSCAPE_LEFT: {
			return 'landscape';
		}
		case Titanium.UI.LANDSCAPE_RIGHT: {
			return 'landscape';
		}
		default :
			return (o);
	}
}

function portrait() {
	buttonvariablesPortrait();
}

function landscape() {
	buttonvariablesLandscape();
}

function saveCurrentText() {
	saved_file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'SiWriter ' + new Date);
	saved_file.write(save);
	// write to the file
}

function saveBackgroundImage(image) {
	DoOrientation();

	if ( oriCurrent = "portrait") {
		var BG_Image_Message = Titanium.UI.createAlertDialog({
			title : 'Background image'
		});
		BG_Image_Message.setMessage('Portrait background updated. \n Use a small file for best results.\n Now, close and re-open SiWriter');
	}

	if ( oriCurrent = "landscape") {
		var BG_Image_Message = Titanium.UI.createAlertDialog({
			title : 'Background image'
		});
		BG_Image_Message.setMessage('Landscape background updated. \n Use a small file for best results.\n Now, close and re-open SiWriter');
	}

	if (writeFile.exists()) {
		delete writefile;
		BG_Image_Message.show();
	}

	writeFile.write(image);
	DoOrientation();
}

function viewLastText() {
}

function copyTextToClipboard() {
	//if(txtViewDesc.value==="_") {
	if (contentTyped == "_") {

		alert("Nothing to copy");
	} else {
		Ti.UI.Clipboard.setText(contentTyped);
	}
}

function clearTextFromClipboard() {
	var dialog = Ti.UI.createAlertDialog({
		title : 'Do you really want to clear the text ?',
		buttonNames : ['Yes', 'No']
	});

	dialog.addEventListener('click', function(e) {
		if (e.index == 0) {
			Ti.UI.Clipboard.setText(contentTyped);
			contentTyped = "_";
			txtViewDesc.value = contentTyped;
			//win1.remove(ReviewButton);
		}
	});
	dialog.show();
};

function pasteTextFromClipboard() {
	if (Ti.UI.Clipboard.getText()) {
		//txtViewDesc.value = txtViewDesc.value + Ti.UI.Clipboard.getText()+"_";
		contentTyped = contentTyped + Ti.UI.Clipboard.getText() + "_";
		txtViewDesc.value = contentTyped;
	} else {
		alert("Nothing to paste");
	}
}

function timeStamp() {
	contentTyped=txtViewDesc.value;
	contentTyped = contentTyped.substring(0, contentTyped.length - 1) + "\r" + new Date + "\n\n";
	txtViewDesc.value = contentTyped;
}

function settingsButtonAction() {
	win2.add(returnButton);
	win2.add(openWebsiteButton);
	win2.open();
}

function returnButtonAction() {
	win2.close();
	win1.open();

	updateSettings();

	win2.remove(returnButton);
	win2.remove(openWebsiteButton);
	getOrientation();

	Titanium.App.Properties.setString("email_to_setting", aTextField.value);
	Ti.App.fireEvent('webviewEvent', {
		text : "  "
	});
	win2.close();
	win1.open();
}

function updateSettings() {
	help_WindowSwitcher();
	help_bigWindowSwitch();
	help_LettersSwitch();
}

function openWebsiteButtonAction() {
	Ti.Platform.openURL("http://SiWriter.co.uk");
}

function removeChildrens(objeto) {
	for (i in objeto.children) {
		var child = objeto.children[0];
		removeChildrens(child);
		objeto.remove(child);
		child = null;
	}
}

function help_bigWindowSwitch() {
	if (help_BIGwindowSwitch.value == 1) {
		smallHelpimages.image = '/images/BIGAllCodes2.png';
	} else {
		smallHelpimages.image = '/images/AllCodes.png';
	}
}

function help_WindowSwitcher() {

	if (help_windowSwitch.value == true) {/******** SHOW HELP ******* ALL SMALL **/
		smallHelpView.show();
		blockLen = 300;
		if (orientation == "portrait") {
			view.width = "290";
		}
		if (orientation == "portrait") {
			view.height = "420";
		}
		if (orientation == "landscape") {
			view.height = "280";
		}
		if (orientation == "landscape") {
			view.width = "310";
		}
	}

	if (help_windowSwitch.value == false) {/******** HIDE HELP **** ALL BIG *****/
		smallHelpView.hide();
		blockLen = 750;
		if (orientation == "portrait") {
			view.width = "620";
		}
		if (orientation == "portrait") {
			view.height = "420";
		}
		if (orientation == "landscape") {
			view.height = "700";
		}
		if (orientation == "landscape") {
			view.width = "310";
		}
	}
}

function help_LettersSwitch() {
	// if(help_lettersSwitch.value) {
	// webview.url = 'Keypad.html';
	// }else {
	// webview.url = 'Keypad_no_help.html';
	// }

	if (help_lettersSwitch.value) {

	} else {

	}

}

function get_MasterSettings() {
	for (var c = 0; c < props.length; c++) {
		var value = Titanium.App.Properties.getString(props[c]);
		if (value == 0) {
			setting = false;
		}
		if (value == 1) {
			setting = true;
		}
		Titanium.API.info(props[c] + " = " + value);
		if (props[c] == "email_to_setting") {
			aTextField.value = value;
		}
		if (props[c] == "Master_Setting_Window_Switch") {
			help_windowSwitch.value = setting;
		}

		if (props[c] == "Master_Setting_Big_Help") {
			help_BIGwindowSwitch.value = setting;
		}

		if (props[c] == "Master_Setting_Help_Tabs") {
			help_lettersSwitch.value = setting;
		}

		// if (props[c] == "Height") {
			// var Height = value;
		// }
// 
		// if (props[c] == "Width") {
			// var Width = value;
		// }
// 
		// if (props[c] == "pos") {
			// var pos = value;
		// }
// 
		// if (props[c] == "Gap") {
			// var Gap = value;
		// }

		if (props[c] == "FPPDisplay") {
			var FPPDisplay = value;
		}

		if (props[c] == "FPhelp") {
			var FPhelp = value;
		}

	}
}