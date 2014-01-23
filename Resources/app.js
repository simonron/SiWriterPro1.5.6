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
var s = 0;
var Nums = 0;
var Caps = 0;
//var blockLen=750;
var DEL = 0;
var OS_EDIT = 0;
var help_windowSwitch = false;
var help_BIGwindowSwitch = false;
var help_windowSwitchSetting = false;
var Master_Setting_Big_Help = false;
var angle = {};
var orient = "";
var props = Titanium.App.Properties.listProperties();
var Last_Typed_Word = "!?!";
var Review_mode = 0;
var LR_posP=0;
var LR_posL=0;
var KV=false;
var temp="";
var Toggle=false;
var Trigger=false;

Ti.API.info(props);

Ti.include('KS_email2.js');
Ti.include('buttons.js');
Ti.include('file_saver.js');
Ti.include('help.js');
Titanium.App.Properties.setString("version", Ti.App.version);

var foo = new Date();

var build_time = (foo.getDate() + "/" + foo.getMonth() + 1 + "/" + foo.getFullYear() + " " + foo.getHours() + ":" + foo.getMinutes() + ":" + foo.getSeconds());

build_label.title = build_time;

CheckEmailaddress();

//create a webview - of the HTML keypad - NB Background set in HTML file
var webview = Titanium.UI.createWebView({
	backgroundColor : 'transparent',
	url : 'Keypad.html',
	width : 760,
	height : "100%",
	bottom : 0,
	left:14,
	disableBounce : true,
});

var txtViewDesc = Ti.UI.createTextArea({
	value : '',
	top : 20,
	backgroundColor : 'transparent',
	font : {
		fontSize : 16,
	},
	//editable: "NO",
	height : "86%",
});

var view = Ti.UI.createScrollView({
	backgroundImage : 'images/Sized_Screen_lighter.png',
	borderRadius : 10,
	top : 20,
	left : 20,
	height : "98%",
	font : {
		fontSize : 10
	},
});

//view.show();

var win1 = Titanium.UI.createWindow({// top section BG
	title : 'SiWriter 1' + new Date,
	backgroundImage : 'images/bg_image.png',
	height : "100%",
	bottom : 0,
});

/////////////////////////////////////HELP WINDOW SETUP//////////////////////////////

var win2 = Titanium.UI.createWindow({// top section BG
	title : 'SiWriter.co.uk Help',
	backgroundImage : 'images/Sized_Screen_lighter.png',
	height : "100%",
	bottom : 0,
});

/////////////////////////////////////////end help window  //////////////////////////

/* var Cloud = require('ti.cloud');*/

var SiWriter_helpView = Titanium.UI.createWebView({
	backgroundColor : 'transparent',
	url : 'help.html',
	width : "100%",
	height : "100%",
	bottom : 0,
});

		if(Titanium.App.keyboardVisible){
			 KV=1;
			Ti.API.info('Keyboad in use'+KV);
			}

//////////////////////////TO WEBVIEW from App demo/////////////////////////////
//Ti.App.fireEvent('app:fromTitanium', { message: 'event fired from Titanium, handled in WebView' });


////////////////////////////////////////////////////////////

////////////////////FROM WEBVIEWW DEMO///////////////////////
Ti.App.addEventListener('app:fromWebView', function(e) {alert(e.message);});//from webview
////////////////////////////////////////////////////////////


//alert("here?");
recover_settings();
//("and here?");

DoOrientation();
// SETS INITIAL SCREEN DISPLAY positions.
removeChildrens(win1);
// can do without ?
removeChildrens(win2);
// can do without ?

help_LettersSwitch();
help_bigWindowSwitch();

win2.add(SiWriter_helpView);
win2.add(help_windowSwitch);
win2.add(help_BIGwindowSwitch);
win2.add(help_lettersSwitch);
win2.add(help_BIGwindowSwitchLbl);
win2.add(help_windowSwitchLbl);
win2.add(help_lettersSwitchLbl);
win1.add(smallHelpView);
win2.add(btnChoosePhoto);
win2.add(btnTakePhoto);
win2.add(sizer_switch);
win2.add(sizer_switchlbl);

////////////////////////////////////////////////////////////////////////////////////////////////
Ti.App.fireEvent('app:orientation', { orientation: orientation });// helps to get height offset right.

win1.add(webview);
win1.add(view);
Ti.API.info("app 118 Titanium.App.keyboardVisible test ?xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");			

Ti.API.info("app 161 Titanium.App.keyboardVisible="+Titanium.App.keyboardVisible);			

Ti.App.addEventListener('do_reset', function(e) {
	getOrientation();
	Ti.App.fireEvent('app:orientation', { orientation: orientation });// helps to get height offset right.
	Titanium.App.Properties.setString("email_to_setting", aTextField.value);
	help_WindowSwitcher();
	help_LettersSwitch();
	help_bigWindowSwitch();
	Ti.App.fireEvent('webviewEvent', {
		text : "  "
	});
});

Ti.App.addEventListener('Twist', function(e) {
	Ti.API.info("Twist  recieved from web, by app.js line THEN added to SETTINGS THEN added to SETTINGS: 179=" + e.Twist);
	Titanium.App.Properties.setString("Twist", e.Twist);
});

Ti.App.addEventListener('LR_posP', function(e) {
	Ti.API.info("LR_posP  recieved from web, by app.js line THEN added to SETTINGS: 197=" + e.LR_posP);
	Titanium.App.Properties.setString("LR_posP", e.LR_posP);
});

Ti.App.addEventListener('LR_posL', function(e) {
	Ti.API.info("LR_posL  recieved from web, by app.js line THEN added to SETTINGS: 197=" + e.LR_posL);
 Titanium.App.Properties.setString("LR_posL", e.LR_posL);
});

Ti.App.addEventListener('UpDwnP', function(e) {
	Ti.API.info("UpDwnP recieved from web, by app.js line THEN added to SETTINGS: 204 =" + e.UpDwnP);
	Titanium.App.Properties.setString("UpDwnP", e.UpDwnP);
});

Ti.App.addEventListener('UpDwnL', function(e) {
	Ti.API.info("UpDwnL recieved from web, by app.js line THEN added to SETTINGS: 204 =" + e.UpDwnL);
 Titanium.App.Properties.setString("UpDwnL", e.UpDwnL);
});

Ti.App.addEventListener('HeightP', function(e) {
	Ti.API.info("HeightP recieved from web, by app.js line THEN added to SETTINGS: 197 =" + e.HeightP);
	Titanium.App.Properties.setString("HeightP", e.HeightP);
});

Ti.App.addEventListener('HeightL', function(e) {
	Ti.API.info("HeightL recieved from web, by app.js line THEN added to SETTINGS: 197 =" + e.HeightL);
 Titanium.App.Properties.setString("HeightL", e.HeightL);
});

Ti.App.addEventListener('WidthP', function(e) {
	Ti.API.info("WidthP  recieved from web, by app.js line THEN added to SETTINGS: 203=" + e.WidthP);
	Titanium.App.Properties.setString("WidthP", e.WidthP);
});

Ti.App.addEventListener('WidthL', function(e) {
	Ti.API.info("WidthL  recieved from web, by app.js line THEN added to SETTINGS: 203=" + e.WidthL);
 Titanium.App.Properties.setString("WidthL", e.WidthL);
});

Ti.App.addEventListener('GapP', function(e) {
	Ti.API.info("GapP  recieved from web, by app.js line THEN added to SETTINGS: 288=" + e.GapP);
	Titanium.App.Properties.setString("GapP", e.GapP);
});

Ti.App.addEventListener('GapL', function(e) {
	Ti.API.info("GapL  recieved from web, by app.js line THEN added to SETTINGS: 288=" + e.GapL);
 Titanium.App.Properties.setString("GapL", e.GapL);
});

Ti.App.addEventListener('FPPDisplay', function(e) {
	Ti.API.info("FPPDisplay  recieved from web, by app.js line THEN added to SETTINGS: 297=" + e.FPPDisplay);
	Titanium.App.Properties.setString("FPPDisplay", e.FPPDisplay);
});

Ti.App.addEventListener('FPhelp', function(e) {
	Ti.API.info("FPhelp  recieved from web, by app.js line THEN added to SETTINGS: 302=" + e.FPhelp);
	Titanium.App.Properties.setString("FPhelp", e.FPhelp);
});


help_WindowSwitcher();
win1.open();
view.show();
win1.add(settingsButton);
win1.add(copyButton);
win1.add(clearButton);
win1.add(emailButton);

win1.add(pasteButton);
win1.add(timeStampButton);
top_view.add(aTextField);
win1.add(top_view);

top_view.add(aTrailer);
win1.add(aTrailer);
win1.add(version_label);
win1.add(build_label);
win1.add(PrivacyTitle);
if (help_windowSwitch.value == 1) {
	smallHelpView.show();
} else {
	smallHelpView.hide();
}

help_WindowSwitcher();
smallHelpView.add(smallHelpimages);

//Button1.addEventListener('click', function(e) {
//	Ti.App.fireEvent('app:fromTitanium', { message: 'event fired from Titanium, handled in WebView' });
//});

emailButton.removeEventListener('click', emailCurrentText);
clearButton.removeEventListener('click', clearTextFromClipboard);
ReviewButton.removeEventListener('click', viewLastText);
timeStampButton.removeEventListener('click', timeStamp);
copyButton.removeEventListener('click', copyTextToClipboard);
pasteButton.removeEventListener('click', pasteTextFromClipboard);
settingsButton.removeEventListener('click', settingsButtonAction);
returnButton.removeEventListener('click', returnButtonAction);
openWebsiteButton.removeEventListener('click', openWebsiteButtonAction);

help_windowSwitch.removeEventListener('change', help_WindowSwitcher);
help_lettersSwitch.removeEventListener('change', help_LettersSwitch);
help_BIGwindowSwitch.removeEventListener('change', help_bigWindowSwitch);

emailButton.addEventListener('click', emailCurrentText);
clearButton.addEventListener('click', clearTextFromClipboard);
ReviewButton.addEventListener('click', viewLastText);
timeStampButton.addEventListener('click', timeStamp);
copyButton.addEventListener('click', copyTextToClipboard);
pasteButton.addEventListener('click', pasteTextFromClipboard);
settingsButton.addEventListener('click', settingsButtonAction);

returnButton.addEventListener('click', returnButtonAction);
openWebsiteButton.addEventListener('click', openWebsiteButtonAction);

help_windowSwitch.addEventListener('change', help_WindowSwitcher);
help_BIGwindowSwitch.addEventListener('change', help_bigWindowSwitch);
help_lettersSwitch.addEventListener('change', help_LettersSwitch);

get_MasterSettings();

help_windowSwitch.addEventListener('change', function(e) {
	help_WindowSwitcher();
});

help_BIGwindowSwitch.addEventListener('change', function(e) {
	if (help_BIGwindowSwitch.value == 1) {
		smallHelpimages.image = '/images/BIGAllCodes2.png';
	} else {
		smallHelpimages.image = '/images/AllCodes.png';
	}
	//Ti.API.info('****************** help_BIGwindowSwitch at line 1229 now is '+help_BIGwindowSwitch.value);
});

//**********************ORIENTATION CHANGE SENSOR************************//
Ti.Gesture.addEventListener('orientationchange', function(e) {

	orientation = getOrientation(e.orientation);
//win1.remove(webview);

	//win1.add(webview);
				
Ti.App.fireEvent('app:orientation', { orientation: orientation });

	if (orientation == "portrait") {
		portrait();
	}
	if (orientation == "landscape") {
		landscape();
	}
	Ti.API.info('-- App Line 306 ---------------------------------------------------------orientation: ' + orientation);
	return orientation;
});
//******************END***ORIENTATION CHANGE SENSOR*********************//

sizer_switch.addEventListener('change', function(e, hide) {
	Ti.App.fireEvent('sizer_switch_change');
});

help_lettersSwitch.addEventListener('change', function(e, FPhelp) {
	Ti.API.info('app:Switch value: ' + help_lettersSwitch.value);
	Ti.App.fireEvent('help_lettersSwitch_change');
	FPhelp = help_lettersSwitch.value;
});

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

if (start == 1) {
	Ti.App.fireEvent('orientationchange', {
		id : 0
	});
	start = 0;
	setup_buttons();
};

/////////////////////////////////////////TEXT MANAGEMENT////////////////////////////////////////

Ti.include('newtext.js');

//////////////////////////////////////END TEXT MANAGEMENT////////////////////////////////////////

//////////////////////////////////////BG IMAGE MANAGEMENT////////////////////////////////////////

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

/////////////////////////////////END BG IMAGE MANAGEMENT////////////////////////////////////////
