var SiWriter = {};
var start = 1;
//orientation sensor flag
var orientation = "null";
//var oldOrientation="";
var saved_email_url_file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'SiWriter_default_email.txt');
var saved_file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'SiWriter.txt' + new Date);
var last_file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'SiWriter.txt' + new Date);
var previous_contents = saved_file.read();
var default_email = saved_email_url_file.read();
var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory);
//contentTyped = previous_contents;
var contentTyped = '';
var c = 0;
var trailer="";
var s = 0;
var Nums = 0;
var Caps = 0;
var DEL = 0;
var OS_EDIT = 0;
var help_windowSwitch = null;
var help_BIGwindowSwitch = false;
var help_windowSwitchSetting = null;
var Master_Setting_Big_Help = false;
var angle = {};
var orient = "";
var props = Titanium.App.Properties.listProperties();
var Last_Typed_Word = "!?!";
var Review_mode = 0;
var LRposP = 0;
var LRposL = 0;
var KV = false;
var temp = "";
var Toggle = false;
var Trigger = false;
var oldOrientation = "";
var Hide = true;
var setbutton = 0;
var oriCurrent = 'landscape';
Ti.API.info(props);

Ti.include('KS_email2.js');
Ti.include('buttons.js');
Ti.include('file_saver.js');
Ti.include('toolbar.js');
Ti.include('help.js');
Titanium.App.Properties.setString("version", Ti.App.version);

var foo = new Date();
var build_time = (foo.getDate() + "/" + foo.getMonth() + 1 + "/" + foo.getFullYear() + " " + foo.getHours() + ":" + foo.getMinutes() + ":" + foo.getSeconds());
build_label.text = build_time;
Titanium.App.Properties.setString("date_of_build", "\r" + new Date);

CheckEmailaddress();

//create a webview - of the HTML keypad - NB Background set in HTML file
var webview = Titanium.UI.createWebView({
	backgroundColor : 'transparent',
	url : 'Keypad.html',
	//width : 760,
	height : "60%",
	//left:14,
	disableBounce : true,
});

var txtViewDesc = Ti.UI.createTextArea({
	value : '',
	top : 10,
	backgroundColor : 'transparent',
	font : {
		fontSize : 16,
	},
	//editable: "NO",
	height : "96%",
});

var view = Ti.UI.createScrollView({
	backgroundImage : 'images/Sized_Screen_lighter.png',
	borderRadius : 10,
	top : 20,
	left : 20,
	height : 720,
	font : {
		fontSize : 10
	},
	opacity : 0.90,

});

//view.show();

var win1 = Titanium.UI.createWindow({// top section BG
	title : 'SiWriter 1' + new Date,
	backgroundImage : 'images/bg_image.png',
	height : "100%",
	bottom : 0,
});

/////////////////////////////////////HELP WINDOW SETUP//////////////////////////////
//
// var win2 = Titanium.UI.createWindow({// top section BG
// title : 'SiWriter.co.uk Help',
// backgroundImage : 'images/Sized_Screen_lighter.png',
// height : "100%",
// bottom : 0,
// });

/////////////////////////////////////////end help window  //////////////////////////
if (Titanium.Platform.displayCaps.platformWidth < Titanium.Platform.displayCaps.platformHeight) {
	orientation = 'portrait';
	Ti.API.info("Launched in PORTRAIT ");

} else {
	orientation = 'landscape';

	Ti.API.info("Launched in LANDSCAPE ");
}

///////////////////// INITIALISE //////////////////////////////////////////////////////////////
webview.removeEventListener('beforeload', function(e) {});


webview.addEventListener('beforeload', function(e) {
	webview.evalJS("var start='" + start + "';");
	webview.evalJS("var HTMLorientation='" + orientation + "';");
	var FPhelp = Titanium.App.Properties.getString("Master_Setting_Help_Tabs",true);
	webview.evalJS("var FPhelp='" + FPhelp + "';");
	start = 0;
});
/////////////////////////////////////////////////////////////////////////
/* var Cloud = require('ti.cloud');*/

var SiWriter_helpView = Titanium.UI.createWebView({
	backgroundColor : 'transparent',
	url : 'help.html',
	width : "100%",
	height : "100%",
	bottom : 0,
	zIndex : 0,
});

//////////////////////////TO WEBVIEW from App demo/////////////////////////////
//Ti.App.fireEvent('app:reset', { reset_pads: 'reset_pads' });

////////////////////////////////////////////////////////////

////////////////////FROM WEBVIEWW DEMO///////////////////////
//Ti.App.addEventListener('app:fromWebView', function(e) {alert(e.message);});//from webview
////////////////////////////////////////////////////////////
//Ti.App.removeEventListener('app:sizer_switch', function(e) {
//});

//alert("here?");
recover_settings();
//("and here?");

DoOrientation();
// SETS INITIAL SCREEN DISPLAY positions.
removeChildrens(win1);
// can do without ?
removeChildrens(win3);
// can do without ?

//help_LettersSwitch();
help_bigWindowSwitch();


win1.add(smallHelpView);


////////////////////////////////////////////////////////////////////////////////////////////////
win1.add(webview);
win1.add(view);

DoOrientation();
Ti.App.removeEventListener('do_reset', function(e) {
});

Ti.App.addEventListener('do_reset', function(e) {
	getOrientation();
	Titanium.App.Properties.setString("email_to_setting", aTextField.value);
	help_WindowSwitcher();
	help_LettersSwitch();
	help_bigWindowSwitch();
	Ti.App.fireEvent('webviewEvent', {
		text : ""
	});

});

help_WindowSwitcher();
win1.open();
view.show();
win1.add(settingsButton);
win1.add(helpButton);
win1.add(clearButton);
win1.add(emailButton);
win1.add(copyButton);
win1.add(pasteButton);
win1.add(timeStampButton);
top_view.add(aTextField);
win1.add(top_view);

top_view.add(aTrailer);
win1.add(aTrailer);
win1.add(version_label);
//win1.add(build_label);
win1.add(PrivacyTitle);

if (help_windowSwitch.value == 1) {
	smallHelpView.show();
	view.height = 720;
} else {
	smallHelpView.hide();
	view.height = 720;
}

help_WindowSwitcher();
smallHelpView.add(smallHelpimages);

emailButton.removeEventListener('click', emailCurrentText);
clearButton.removeEventListener('click', clearTextFromClipboard);
ReviewButton.removeEventListener('click', viewLastText);
timeStampButton.removeEventListener('click', timeStamp);
copyButton.removeEventListener('click', copyTextToClipboard);
pasteButton.removeEventListener('click', pasteTextFromClipboard);
openWebsiteButton.removeEventListener('click', openWebsiteButtonAction);

help_BIGwindowSwitch.removeEventListener('change', help_bigWindowSwitch);

emailButton.addEventListener('click', emailCurrentText);
clearButton.addEventListener('click', clearTextFromClipboard);
ReviewButton.addEventListener('click', viewLastText);
timeStampButton.addEventListener('click', timeStamp);
copyButton.addEventListener('click', copyTextToClipboard);
pasteButton.addEventListener('click', pasteTextFromClipboard);
openWebsiteButton.addEventListener('click', openWebsiteButtonAction);

help_BIGwindowSwitch.addEventListener('change', help_bigWindowSwitch);

helpButton.removeEventListener('click', function() {
});

var a = Titanium.UI.createAnimation();
a.height = Ti.UI.FILL;
a.width = Ti.UI.FILL;
a.duration = 300;

helpButton.addEventListener('click', function() {
	win3.add(Continue_Siwriting);
	win3.add(SiWriter_help_win);
	a.height = Ti.UI.FILL;
	a.width = Ti.UI.FILL;
	a.duration = 300;
	win3.open(a);
});

close.removeEventListener('click', function() {
});
close.addEventListener('click', function() {
	win3.remove(Continue_Siwriting);
	win3.remove(SiWriter_help_win);
	a.height = 0;
	a.width = Ti.UI.FILL;
	;
	win3.close(a);
	help_WindowSwitcher();

});

close_main.removeEventListener('click', function() {});

close_main.addEventListener('click', function() {
	Ti.API.info("Continue_Siwriting_main clicked");
	win1.remove(bottomtoolbar);
	//win1.remove(Continue_Siwriting_main);
	win1.remove(toolbar);
	setbutton = 0;
});

get_MasterSettings();



//**********************ORIENTATION CHANGE SENSOR************************//
Ti.Gesture.removeEventListener('orientationchange', function(e) {});

Ti.Gesture.addEventListener('orientationchange', function(e) {
	//alert(e.orientation);
	orientation = getOrientation(e.orientation);
	//win1.remove(webview);

	//win1.add(webview);

	Ti.App.fireEvent('app:orientation', {
		orientation : orientation
	});

	if (orientation == "portrait") {
		portrait();
	}
	if (orientation == "landscape") {
		landscape();
	}
	Ti.API.info('-- App Line 336 ---------------------------------------------------------orientation: ' + orientation);
	return orientation;
});
//******************END***ORIENTATION CHANGE SENSOR*********************//

CheckEmailaddress();
//getEmail();
if (aTextField.value == "") {
	aTextField.value = "Set a default email";
};

//the screen*********************************************************
view.add(txtViewDesc);
//the screen*********************************************************
view.show();

var copy = "";

/////////////////////////////////////////TEXT MANAGEMENT////////////////////////////////////////
/////////////////////////////////////////TEXT MANAGEMENT////////////////////////////////////////
/////////////////////////////////////////TEXT MANAGEMENT////////////////////////////////////////

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


//////////////////////////////////////END TEXT MANAGEMENT////////////////////////////////////////
//////////////////////////////////////END TEXT MANAGEMENT////////////////////////////////////////
//////////////////////////////////////END TEXT MANAGEMENT////////////////////////////////////////

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
		Titanium.API.info(props[c] + " = " + value);

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
			alert("HeightL=" + HeightL);
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
		Ti.App.fireEvent('initialise');
		start = false;
	};
	DoOrientation();

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

	if (oriCurrent == "portrait") {
		var BG_Image_Message = Titanium.UI.createAlertDialog({
			title : 'Background image'
		});
		BG_Image_Message.setMessage('Portrait background updated.');
	}

	if (oriCurrent == "landscape") {
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
	contentTyped = txtViewDesc.value;
	contentTyped = contentTyped.substring(0, contentTyped.length - 1) + "\r" + new Date + "\n\n";
	txtViewDesc.value = contentTyped;
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
	Ti.App.fireEvent('help_lettersSwitch_change');
	Ti.API.info("settings updated line 246 FS");
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
			//var FPhelp = value;
		}

	}
}



var SiWriter_help_win = Titanium.UI.createWebView({
	backgroundColor : '#FFF',
	url : 'help.html',
	width : "100%",
	height : "100%",
	bottom : 0,
	zIndex : 0,
});

settingsButton.removeEventListener('click', function() {});

settingsButton.addEventListener('click', function() {
	if (setbutton == 0) {
		setbutton = 1;
		win1.add(toolbar);
		//win1.add(Continue_Siwriting_main);
		win1.add(bottomtoolbar);
	return;
	}
	
	if (setbutton == 1) {
		setbutton = 0;
		win1.remove(toolbar);
		win1.remove(bottomtoolbar);
	}

});

//win3.add(SiWriter_help_win);

var win3 = Titanium.UI.createWindow({// top section BG
	title : 'SiWriter.co.uk Help',
	backgroundImage : 'images/Sized_Screen_lighter.png',
	height : "100%",
	bottom : 0,
});

