/////////////FUNCTIONS////////////////
/////////////FUNCTIONS////////////////
/////////////FUNCTIONS////////////////
/////////////FUNCTIONS////////////////
/////////////FUNCTIONS////////////////
/////////////FUNCTIONS////////////////
function checkInternet() {
	if (!Titanium.Network.getOnline()) {
		alert("You are not online");
		var dialog = Ti.UI.createAlertDialog({
			title : 'Sorry'
		}).show();
	}
}

function recover_settings() {

	Ti.API.info("recover_settings -STARTS");
	for (var c = 0; c < props.length; c++) {
		var value = Titanium.App.Properties.getString(props[c]);
		if (value == 0) {
			setting = false;
		}
		if (value == 1) {
			setting = true;
		}
		Titanium.API.info("!xxxx! " + props[c] + " = " + value);

		if (props[c] == "Master_Setting_Window_Switch") {
			help_windowSwitch.value = setting;
			Ti.App.fireEvent('FPhelp_setting', {
				FPhelp : setting
			});
			Ti.API.info("Master_Setting_Window_Switch = " + setting);
		}

		if (props[c] == "Master_Setting_Big_Help") {
			help_BIGwindowSwitch.value = setting;
			Ti.App.fireEvent('help_BIGwindowSwitch_setting', {
				help_BIGwindowSwitch : setting
			});
			Ti.API.info("Master_Setting_Big_Help = " + setting);

		}

		if (props[c] == "Master_Setting_Help_Tabs") {
			help_lettersSwitch.value = setting;
			Ti.App.fireEvent('Do_help_lettersSwitch', {
				FPhelp : setting
			});

			Ti.API.info("Master_Setting_Help_Tabs = " + setting);

		}

		if (props[c] == "TwistP") {
			var TwistP = value;
			Ti.App.fireEvent('From_Settings_Twist', {
				TwistP : TwistP
			});
			//alert("from setting one");
		}
		if (props[c] == "TwistL") {
			var TwistL = value;
			Ti.App.fireEvent('From_Settings_Twist', {
				TwistL : TwistL
			});
			//alert("from setting one");
		}

		if (props[c] == "LR_posP") {
			var LR_posP = value;
		}
		if (props[c] == "LR_posL") {
			var LR_posL = value;
		}

		if (props[c] == "recUpDwnP") {
			recUpDwnP = value;
			Ti.API.info("func:UpDwnP fired UpDwnP recovered " + recUpDwnP);
		}

		if (props[c] == "recUpDwnL") {
		    recUpDwnL = value;
			Ti.API.info("func:UpDwnL fired UpDwnL recovered " + recUpDwnL);
		}

		if (props[c] == "recHeightP") {
			recHeightP = value;
			//recHeightP = 200;
			//alert("functions line 86 recovered HeightP="+recHeightP);
			Ti.API.info("func:HeightP fired HeightP recovered " + recHeightP);
		}

		if (props[c] == "recHeightL") {
			recHeightL = value;
			//alert("functions line 93 recovered HeightL="+recHeightL);
			Ti.API.info("func:HeightL fired HeightL recovered " + recHeightL);

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
	if (start == 1) {
		Ti.App.fireEvent('app:initialise', {});
		start = false;
	};
	//DoOrientation();

}

function missedKeypad() {
	Ti.Media.vibrate();
	alert("missed");
}

function setup_buttons() {
	//alert("start");
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
	Ti.API.info("Titanium.Platform !!!!!! THIS IS ME !!!!!!!!!!!!!!!! = " + Model);
	Ti.API.info('-- FileSaver 157 --------------------static sensor----------------------------orientation: ' + orientation);

	return oriCurrent;

}

function getOrientation(o) {
	oldOrientation = orientation;
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
			return oldOrientation;
	}
}

function portrait() {
	buttonvariablesPortrait();
}

function landscape() {
	buttonvariablesLandscape();
}

function copyTextToClipboard() {
	//if(txtViewDesc.value==="_") {
	if (contentTyped == "_") {

		alert("Nothing to copy");
	} else {
		Ti.UI.Clipboard.setText(contentTyped);
	}
}

function saveCurrentText() {
	saved_file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'SiWriter ' + new Date);
	saved_file.write(save);
	// write to the file
}

function saveBackgroundImage(image) {
	DoOrientation();

	if (orientation == "portrait") {
		var BG_Image_Message = Titanium.UI.createAlertDialog({
			title : 'Background image'
		});
		BG_Image_Message.setMessage('Portrait background updated.');
	}

	if (orientation == "landscape") {
		var BG_Image_Message = Titanium.UI.createAlertDialog({
			title : 'Background image'
		});
		BG_Image_Message.setMessage('Background image updated.');
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

function pasteTextFromClipboard() {
	if (Ti.UI.Clipboard.getText()) {
		//txtViewDesc.value = txtViewDesc.value + Ti.UI.Clipboard.getText()+"_";
		contentTyped = contentTyped + Ti.UI.Clipboard.getText() + "_";
		txtViewDesc.value = contentTyped;
	} else {
		alert("Nothing to paste");
	}
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

	dialog.removeEventListener('click', function(e) {
	});

	dialog.addEventListener('click', function(e) {
		if (e.index == 0) {
			Ti.UI.Clipboard.setText(contentTyped);
			contentTyped = "";
			txtViewDesc.value = contentTyped;
			//win1.remove(ReviewButton);
			trailer = "";
			aTrailer.value = trailer;
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
	contentTyped = txtViewDesc.value;
	getDate();
	contentTyped = contentTyped.substring(0, contentTyped.length - 1) + "\r" + Now + "\n\n";
	txtViewDesc.value = contentTyped;
}

function getDate() {
	// var dateObj = new MMPDate("Year         : YYYY, YYY<br/>\
	// Month        : MMMMM, MMMM, MMM<br/>\
	// Day          : DDDDD, DDDD<br/>\
	// Date         : DDD<br/>\
	// Hour         : HHHH, HHH<br/>\
	// Minute       : mmm<br/>\
	// Second       : sss<br/>\
	// Milli Second : lll");
	// //document.getElementById("datetime").innerHTML = dateObj.FormattedDate();

	var dateObj = new MMPDate("DDDDD, MMMMM DDD at HHHH:mmm:sss");
	Now = dateObj.FormattedDate();
}

function close_main() {
	Ti.API.info("close main triggered");

	updateSettings();
	//win2.remove(openWebsiteButton);
	getOrientation();

	Titanium.App.Properties.setString("email_to_setting", aTextField.value);
	Ti.App.fireEvent('webviewEvent', {
		text : "  "
	});

}

function updateSettings() {
	help_WindowSwitcher();
	help_bigWindowSwitch();
	//Ti.App.fireEvent('help_lettersSwitch_change');
	Ti.API.info("settings updated line 246 FS");
}

function openWebsiteButtonAction() {
	checkInternet();
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

// function get_MasterSettings() {
// for (var c = 0; c < props.length; c++) {
// var value = Titanium.App.Properties.getString(props[c]);
// if (value == 0) {
// setting = false;
// }
// if (value == 1) {
// setting = true;
// }
// Titanium.API.info(props[c] + " = " + value);
// if (props[c] == "email_to_setting") {
// aTextField.value = value;
// }
//
//
// if (props[c] == "WidthP") {
// var WidthP = value;
// }
// if (props[c] == "WidthL") {
// var WidthL = value;
// }
//
//
// if (props[c] == "GapP") {
// var GapP = value;
// }
// if (props[c] == "GapL") {
// var GapL = value;
// }
//
// if (props[c] == "HeightP") {
// var HeightP = value;
// }
// if (props[c] == "HeightL") {
// var HeightL = value;
// }
//
//
// if (props[c] == "posP") {
// var posP = value;
// }
// if (props[c] == "posL") {
// var posL = value;
// }
//
// if (props[c] == "FPPDisplay") {
// var FPPDisplay = value;
// }
//
// if (props[c] == "FPhelp") {
// //var FPhelp = value;
// }
//
// }
// }

function help_WindowSwitcher() {

	if (help_windowSwitch.value == true) {/******** SHOW HELP ******* ALL SMALL **/
		smallHelpView.show();
		if (orientation == "portrait") {
			view.width = "290";
			view.height = "420";
		} else {
			view.width = "310";
			view.height = "300";
		}
	} else {/******** HIDE HELP **** ALL BIG *****/
		smallHelpView.hide();
		if (orientation == "portrait") {
			view.width = "620";
			view.height = "420";
		} else {
			view.height = "720";
			view.width = "310";
		}
	}

	Ti.API.info("Orientation = " + orientation + " view.width = " + view.width + " help_windowSwitch.value = " + help_windowSwitch.value);
}

function do_speech(ws, letter, whole_sentance) {
	var n = trailer.lastIndexOf(" ");
	var l = trailer.length;

	if (ws == "word") {
		LW = l - n;
		OldWord = last_word;
		last_word = trailer.slice(-LW);
		if (last_word == " ") {
			SpeakWord = OldWord;
		} else {
			SpeakWord = "";
		}
		Ti.API.info("last_word + n = " + n + " " + last_word + " SW " + SpeakWord);

		if (SpeakWord != "") {
			speech.startSpeaking({
				text : SpeakWord
			});
		}
	} else {

		Ti.API.info("whole_sentance = " + whole_sentance);

		switch(letter) {
			case ".":
			case "!":
			case "?":
				speech.startSpeaking({
					text : whole_sentance
				});
				whole_sentance = "";
		}
	}
}

//////////////////////////END FUNCTIONS/////////////////////////
//////////////////////////END FUNCTIONS/////////////////////////
//////////////////////////END FUNCTIONS/////////////////////////
//////////////////////////END FUNCTIONS/////////////////////////
//////////////////////////END FUNCTIONS/////////////////////////
//////////////////////////END FUNCTIONS/////////////////////////
//////////////////////////END FUNCTIONS/////////////////////////
//////////////////////////END FUNCTIONS/////////////////////////
//////////////////////////END FUNCTIONS/////////////////////////
//////////////////////////END FUNCTIONS/////////////////////////
//////////////////////////END FUNCTIONS/////////////////////////
//////////////////////////END FUNCTIONS/////////////////////////
//////////////////////////END FUNCTIONS/////////////////////////
//////////////////////////END FUNCTIONS/////////////////////////

