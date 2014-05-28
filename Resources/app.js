Ti.include('variables.js');
Ti.include('functions.js');
Ti.include('js/mmp_datetime.min.js');

recover_settings();

webview.addEventListener('beforeload', function(e) {
	
	//alert("yes");
	webview.evalJS("var start='" + start + "';");
	Ti.API.info("start = "+start);
	webview.evalJS("var HTMLorientation='" + orientation + "';");
	var FPhelp = Titanium.App.Properties.getString("Master_Setting_Help_Tabs", true);
	webview.evalJS("var FPhelp='" + FPhelp + "';");
	
	webview.evalJS("var HeightP=" + recHeightP + ";");
	webview.evalJS("var HeightL=" + recHeightL + ";");
	
	webview.evalJS("var UpDwnP=" + recUpDwnP + ";");
	webview.evalJS("var UpDwnL=" + recUpDwnL + ";");

	webview.evalJS("var GapP=" + recGapP + ";");
	webview.evalJS("var GapL=" + recGapL + ";");

	webview.evalJS("var LRposP=" + recLRposP + ";");
	webview.evalJS("var LRposL=" + recLRposL + ";");

	webview.evalJS("var WidthP=" + recWidthP + ";");
	webview.evalJS("var WidthL=" + recWidthL + ";");
	start = 0;
});


if (Titanium.Platform.displayCaps.platformWidth < Titanium.Platform.displayCaps.platformHeight) {
	orientation = 'portrait';
} else {
	orientation = 'landscape';
}
Ti.API.info(" !!!!!!!!!!!!!!!!!!!!!!! Launched in  " + orientation);

help_WindowSwitcher();
///////////////////// INITIALISE //////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
/* var Cloud = require('ti.cloud');*/

//////////////////////////TO WEBVIEW from App demo/////////////////////////////


////////////////////////////////////////////////////////////

////////////////////FROM WEBVIEWW DEMO///////////////////////
//Ti.App.addEventListener('app:fromWebView', function(e) {alert(e.message);});//from webview
////////////////////////////////////////////////////////////
//Ti.App.removeEventListener('app:sizer_switch', function(e) {
//});

//alert("here?");
//
//("and here?");

Ti.App.removeEventListener('Handedness', function(e) {
});
DoOrientation();
//alert("once?");

Ti.App.addEventListener('Handedness', function(e) {
	LRH = e.LRH;

	Ti.API.info(" HHHHHHHHHHHHHHHHHHH Handedness at App.js 61 = " + LRH);
	set_orientation_variables(orientation);
});
Ti.App.fireEvent('app:initialise', {});
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
//recover_settings();

Ti.App.addEventListener('app:HeightP', function(e) {
	HeightP = e.HeightP;
	Titanium.App.Properties.setString("recHeightP", HeightP);
	//alert("dynamically altered HeightP event from fp = "+HeightP);
	Ti.API.info("dynamically altered HeightP event from fp = " + HeightP);
});

Ti.App.addEventListener('app:HeightL', function(e) {
	HeightL = e.HeightL;
	Titanium.App.Properties.setString("recHeightL", HeightL);
	//alert("dynamically altered HeightL event from fp = "+HeightL);
	Ti.API.info("dynamically altered HeightL event from fp = " + HeightL);
});

Ti.App.addEventListener('app:UpDwnP', function(e) {
	UpDwnP = e.UpDwnP;
	Titanium.App.Properties.setString("recUpDwnP", UpDwnP);
	Ti.API.info("dynamically altered UpDwnP event from fp = " + UpDwnP);
});

Ti.App.addEventListener('app:UpDwnL', function(e) {
	UpDwnL = e.UpDwnL;
	Titanium.App.Properties.setString("recUpDwnL", UpDwnL);
	Ti.API.info("dynamically altered UpDwnL event from fp = " + UpDwnL);
});


Ti.App.addEventListener('app:UpDwnP', function(e) {
	UpDwnP = e.UpDwnP;
	Titanium.App.Properties.setString("recUpDwnP", UpDwnP);
	Ti.API.info("dynamically altered UpDwnP event from fp = " + UpDwnP);
});

Ti.App.addEventListener('app:UpDwnL', function(e) {
	UpDwnL = e.UpDwnL;
	Titanium.App.Properties.setString("recUpDwnL", UpDwnL);
	Ti.API.info("dynamically altered UpDwnL event from fp = " + UpDwnL);
});


Ti.App.addEventListener('app:GapP', function(e) {
	GapP = e.GapP;
	Titanium.App.Properties.setString("recGapP", GapP);
	Ti.API.info("dynamically altered recGapP event from fp = " + GapP);
});

Ti.App.addEventListener('app:GapL', function(e) {
	GapL = e.GapL;
	Titanium.App.Properties.setString("recGapL", GapL);
	Ti.API.info("dynamically altered recGapL event from fp = " + GapL);
});


Ti.App.addEventListener('app:LRposP', function(e) {
	LRposP = e.LRposP;
	Titanium.App.Properties.setString("recLRposP", LRposP);
	Ti.API.info("dynamically altered recLRposP event from fp = " + LRposP);
});

Ti.App.addEventListener('app:LRposL', function(e) {
	LRposL = e.LRposL;
	Titanium.App.Properties.setString("recLRposL", LRposL);
	Ti.API.info("dynamically altered recLRposL event from fp = " + LRposL);
});


Ti.App.addEventListener('app:WidthP', function(e) {
	WidthP = e.WidthP;
	Titanium.App.Properties.setString("recWidthP", WidthP);
	Ti.API.info("dynamically altered recWidthP event from fp = " + WidthP);
});

Ti.App.addEventListener('app:WidthL', function(e) {
	WidthL = e.WidthL;
	Titanium.App.Properties.setString("recWidthL", WidthL);
	Ti.API.info("dynamically altered recWidthL event from fp = " + WidthL);
});

//webview.add(testButton);

Ti.App.removeEventListener('do_reset', function(e) {
});

Ti.App.addEventListener('do_reset', function(e) {
	getOrientation();
	Titanium.App.Properties.setString("email_to_setting", aTextField.value);

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

//get_MasterSettings();

//**********************ORIENTATION CHANGE SENSOR************************//
Ti.Gesture.removeEventListener('orientationchange', function(e) {
});

Ti.Gesture.addEventListener('orientationchange', function(e) {
	//alert(e.orientation);
	orientation = getOrientation(e.orientation);
	//win1.remove(webview);

	//win1.add(webview);

	Ti.App.fireEvent('app:orientation', {
		orientation : orientation
	});

	Ti.API.info('-- App Line 311 ---------------------------------orientation: ' + orientation);
	Ti.API.info(" HHHHHHHHHHHHHHHHHHH Handedness at App.js 119 = " + LRH);
	set_orientation_variables(orientation);
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

Ti.App.removeEventListener('webviewEvent', function(e) {
});

Ti.App.addEventListener('webviewEvent', function(e) {

	////***********************///DELETE sensor//

	if (e.text == "\b_") {
		e.text = "";
		contentTyped = contentTyped.slice(0, -1);
		whole_sentance = whole_sentance.slice(0, -1);
		trailer = trailer.slice(0, -1);
		txtViewDesc.value = contentTyped + "_";
	}
	//************************/END////DELETE sensor//
	//////////////////////MAGIC BIT////add apple keyboard text and allows full editing//////////////////////
	if (contentTyped.length != txtViewDesc.value.length - 1) {( contentTyped = txtViewDesc.value);
	};

	////////////////END MAGIC BIT///////////////////////////
	if (speech_slider.value == true) {
		if (word_sentance_slider.value == true) {
			whole_sentance = whole_sentance + e.text;
		}
	}
	contentTyped = contentTyped + e.text;

	if (!Titanium.App.keyboardVisible) {
		txtViewDesc.value = contentTyped + "_";
	}

	// trailer = contentTyped.slice(-23);
	// Ti.API.info('trailer: ' + trailer);

	trailer = trailer.slice(-23) + e.text;
	aTrailer.value = trailer + "_";

	if (speech_slider.value == true) {
		if (word_sentance_slider.value == true) {
			ws = "sentance";
		} else {
			ws = "word";
		}

		do_speech(ws, e.text, whole_sentance);
	}

	switch(e.text) {
		case ".":
		case "!":
		case "?":
			whole_sentance = "";

	};

});

//////////////////////////////////////END TEXT MANAGEMENT////////////////////////////////////////
//////////////////////////////////////END TEXT MANAGEMENT////////////////////////////////////////
//////////////////////////////////////END TEXT MANAGEMENT////////////////////////////////////////

settingsButton.removeEventListener('click', function() {
});

settingsButton.addEventListener('click', function() {
	if (setbutton == 0) {
		setbutton = 1;
		win1.add(toolbar);
		//win1.add(Continue_Siwriting_main);
		win1.add(bottomtoolbar);
		if (speech_slider.value) {
			win1.add(speech_toolbar);
		} else {
			win1.remove(speech_toolbar);
		}
		return;
	}

	if (setbutton == 1) {
		setbutton = 0;
		win1.remove(toolbar);
		win1.remove(bottomtoolbar);
		//if(win1.speech_toolbar(exists)){win1.remove(speech_toolbar);};
		win1.remove(speech_toolbar);
	}

});

speech_slider.addEventListener('change', function() {
	if (speech_slider.value) {
		win1.add(speech_toolbar);
	} else {
		win1.remove(speech_toolbar);
	}
});

//win3.add(SiWriter_help_win);

btnChoosePhoto.removeEventListener('click', function(e) {
});

btnChoosePhoto.addEventListener('click', function(e) {
	Titanium.Media.openPhotoGallery({
		success : function(event) {
			Ti.API.debug('Our type was: ' + event.mediaType);
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				image = event.media;
				saveBackgroundImage(image);
			}
		},
		cancel : function() {
		},
		error : function(err) {
			Ti.API.error(err);
		},
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
	});
});

btnTakePhoto.removeEventListener('click', function(e) {
});

btnTakePhoto.addEventListener('click', function(e) {
	Titanium.Media.showCamera({
		//we got something
		success : function(event) {
			//getting media
			var image = event.media;

			//checking if it is photo
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				//we may create image view with contents from image variable
				//or simply save path to image
				Ti.App.Properties.setString("image", image.nativePath);
				saveBackgroundImage(image);
			}
		},
		cancel : function() {
			//do somehting if user cancels operation
		},
		error : function(error) {
			//error happend, create alert
			var a = Titanium.UI.createAlertDialog({
				title : 'Camera'
			});
			//set message
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Device does not have camera');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			// show alert
			a.show();
		},
		allowImageEditing : true,
		saveToPhotoGallery : true
	});
});

help_BIGwindowSwitch.addEventListener('change', function(e) {
	//help_BIGwindowSwitch.value=!help_BIGwindowSwitch.value;
	if (help_BIGwindowSwitch.value == 1) {
		smallHelpimages.image = '/images/BIGAllCodes2.png';
	} else {
		smallHelpimages.image = '/images/AllCodes.png';
	}
	Ti.API.info('****************** help_BIGwindowSwitch at line 200 now is ' + help_BIGwindowSwitch.value);
});

Ti.App.addEventListener('sizer_switched_off', function(e) {
	sizer_switch_slider.value = false;
});

sizer_switch_slider.removeEventListener('change', function() {
});

Ti.App.addEventListener('help_switched_off', function(e) {
	help_lettersSwitch.value = false;
});

sizer_switch_slider.addEventListener('change', function(e) {
	Ti.API.info('sizer_switch slide value ' + sizer_switch_slider.value);
	Ti.App.fireEvent('sizer_switch_change', {
		slider : sizer_switch_slider.value
	});

});

//Ti.API.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

HBWS = Titanium.App.Properties.getString("Master_Setting_Big_Help");
Ti.API.info("Titanium.App.Properties.getString(Master_Setting_Big_Help); from app is " + HBWS);
help_BIGwindowSwitch.value = HBWS;

HelpWS = Titanium.App.Properties.getString("Master_Setting_Window_Switch");
Ti.API.info("Titanium.App.Properties.getString(Master_Setting_Window_Switch); from app is " + HelpWS);
help_windowSwitch.value = HelpWS;

//help_windowSwitch.value=true;

help_lettersSwitch.removeEventListener('change', function(e, FPhelp) {
});

help_lettersSwitch.addEventListener('change', function(e) {
	//Ti.API.info('xxxxxxxxxxxhelp_lettersSwitch = ' + help_lettersSwitch.value);
	Ti.App.fireEvent('help_lettersSwitch_change', {
		FPhelp : help_lettersSwitch.value
	});
	Ti.API.info('help_lettersSwitch = ' + help_lettersSwitch.value);
});

help_windowSwitch.removeEventListener('change', help_WindowSwitcher);

help_windowSwitch.addEventListener('change', function(e) {
	Ti.API.info("help_windowSwitch.value= " + help_windowSwitch.value);

	if (help_windowSwitch.value == 1) {
		smallHelpView.show();
		view.height = 720;
	} else {
		smallHelpView.hide();
		view.height = 720;
	}
	help_WindowSwitcher();
});

//////////////////BUTTONS////////////////
//////////////////BUTTONS////////////////
//////////////////BUTTONS////////////////
//////////////////BUTTONS////////////////
//////////////////BUTTONS////////////////
//////////////////BUTTONS////////////////

//LRH =1;// 1 means right handed, -1 means left handed

// Ti.App.removeEventListener('Handedness', function(e){});
//
// Ti.App.addEventListener('Handedness', function(e) {
// Ti.API.info("Handednes at BUTTONS 9 sent by user_fingers=" + e.LRH);
// LRH = e.LRH;
// });

////////////END /BUTTONS////////////////
////////////END /BUTTONS////////////////
////////////END /BUTTONS////////////////
////////////END /BUTTONS////////////////
////////////END /BUTTONS////////////////
////////////END /BUTTONS////////////////
////////////END /BUTTONS////////////////

/////////////////////////////////////HELP WINDOW SETUP//////////////////////////////
//
// var win2 = Titanium.UI.createWindow({// top section BG
// title : 'SiWriter.co.uk Help',
// backgroundImage : 'images/Sized_Screen_lighter.png',
// height : "100%",
// bottom : 0,
// });

/////////////////////////////////////////end help window  //////////////////////////
//Ti.include('speech_to_text.js');
Ti.include('text_to_speech.js');

