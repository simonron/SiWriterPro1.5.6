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
webview.addEventListener('beforeload', function(e) {
	webview.evalJS("var start='" + start + "';");
	webview.evalJS("var HTMLorientation='" + orientation + "';");
	var FPhelp = Titanium.App.Properties.getString("Master_Setting_Help_Tabs");
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

// win2.add(SiWriter_helpView);
// win2.add(help_windowSwitch);
// win2.add(help_BIGwindowSwitch);
// win2.add(help_lettersSwitch);
// win2.add(help_BIGwindowSwitchLbl);
// win2.add(help_windowSwitchLbl);
// win2.add(help_lettersSwitchLbl);
win1.add(smallHelpView);
// win2.add(btnChoosePhoto);
// win2.add(btnTakePhoto);
// win2.add(sizer_switch);
// win2.add(sizer_switchlbl);

////////////////////////////////////////////////////////////////////////////////////////////////
win1.add(webview);
win1.add(view);
// Ti.API.info("app 118 Titanium.App.keyboardVisible test ?");
//
// Ti.API.info("app 161 Titanium.App.keyboardVisible="+Titanium.App.keyboardVisible);
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
win1.add(build_label);
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

//Continue_Siwriting_main.removeEventListener('click', function(){});
close_main.addEventListener('click', function() {
	Ti.API.info("Continue_Siwriting_main clicked");
	win1.remove(bottomtoolbar);
	//win1.remove(Continue_Siwriting_main);
	win1.remove(toolbar);
	setbutton = 0;
});

get_MasterSettings();

//help_windowSwitch.addEventListener('change', function(e) {
//	help_WindowSwitcher();
//});

//Ti.Gesture.removeEventListener('orientationchange',function(){});

//**********************ORIENTATION CHANGE SENSOR************************//
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

Ti.include('newtext.js');
//////////////////////////////////////END TEXT MANAGEMENT////////////////////////////////////////

//////////////////////////////////////BG IMAGE MANAGEMENT////////////////////////////////////////

/////////////////////////////////END BG IMAGE MANAGEMENT////////////////////////////////////////
