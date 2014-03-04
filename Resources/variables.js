Ti.include('functions.js');

var SiWriter = {};
var newrelic = require('ti.newrelic'); newrelic.start("AAa87e12dc1aaa9ad6b224c1072f4faa3515fc52d2");
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

function set_orientation_variables(orientation){
	// Ti.App.fireEvent('app:orientation', {
		// orientation : orientation
	// });

	if (orientation == "portrait") {
		portrait();
	}
	if (orientation == "landscape") {
		landscape();
	}
}

////////////portrait//////////////////
////////////portrait//////////////////
////////////portrait//////////////////
////////////portrait//////////////////
////////////portrait//////////////////



function buttonvariablesPortrait() {

	writeFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'saved_BGimageP.png');
	image = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + 'saved_BGimageP.png');
	win1.backgroundImage = image.nativePath;

	if (!writeFile.exists()) {
		win1.backgroundImage = 'images/bg_image.png';
	}

	webview.height = "100%"; 
	webview.top = "40%";
	PrivacyTitle.left = 442;
	PrivacyTitle.bottom = 40;
	build_label.left = 450;
	build_label.bottom = 95;
	version_label.left = 450;
	version_label.bottom = 10;

	aTrailer.left = 20;
	aTrailer.top = 450;

	smallHelpView.top = 20;
	smallHelpView.left = 330;
	smallHelpView.height = 420;
	smallHelpView.contentHeight = 'auto';
	smallHelpimages.width = 300;

	settingsButton.left = 648;
	settingsButton.top = 446;

	helpButton.left = 665;
	helpButton.top = 80;

	copyButton.left = 665;
	copyButton.top = 140;

	pasteButton.left = 665;
	pasteButton.top = 200;

	clearButton.left = 665;
	clearButton.top = 260;

	timeStampButton.left = 665;
	timeStampButton.top = 320;

	emailButton.left = 665;
	emailButton.top = 380;


	


	view.left = "20";

	help_WindowSwitcher();

	txtViewDesc.width = "94%";
	//txtViewDesc.height = "96%";
	txtViewDesc.font.backgroundColor = '#fee';
	webview.left = "14";
	webview.background = "url(images/Sized_AgendA_bg_bottom.png)";
	webview.bottom = "0";
	top_view.top = "450";
	/* email window */
	top_view.left = "330";
	 Ti.API.info(" HHHHHH PORTRAIT HHHHHHHHHHHHH Handedness at butt.js 271 = "+LRH);

if (LRH==-1) {//Left hand mode
	LH_buttonvariablesPortrait();
	}

}

function LH_buttonvariablesPortrait(){
	PrivacyTitle.left = 14;	
	version_label.left = 20;
}

/////////////////Landscape/////////////////////
/////////////////Landscape/////////////////////
/////////////////Landscape/////////////////////
/////////////////Landscape/////////////////////
/////////////////Landscape/////////////////////
/////////////////Landscape/////////////////////
/////////////////Landscape/////////////////////
/////////////////Landscape/////////////////////

function buttonvariablesLandscape() {
	webview.height = "110%"; 
	webview.top = "-30px";
	PrivacyTitle.left = 682;
	PrivacyTitle.bottom = 40;
	version_label.left = 690;
	build_label.left = 690;
	build_label.bottom = 70;
	version_label.left = 690;
	version_label.bottom = 10;

	aTrailer.left = 345;
	aTrailer.top = 130;
	/* email window */
	top_view.top = 130;
	top_view.left = 695;

	writeFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'saved_BGimageL.png');
	image = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + 'saved_BGimageL.png');
	win1.backgroundImage = image.nativePath;
	if (!writeFile.exists()) {
		win1.backgroundImage = 'images/bg_image.png';
	}

	smallHelpView.top = 330;
	smallHelpView.left = 20;
	smallHelpView.height = 420;
	smallHelpView.contentHeight = 'auto';
	smallHelpimages.width = 300;

	settingsButton.left = 345;
	settingsButton.top = 79;
		
	helpButton.left = 925;
	helpButton.top = 75;

	copyButton.left = 834;
	copyButton.top = 75;

	pasteButton.left = 741;
	pasteButton.top = 75;

	clearButton.left = 649;
	clearButton.top = 75;

	timeStampButton.left = 556;
	timeStampButton.top = 75;

	emailButton.left = 461;
	emailButton.top = 75;



	////Display Screen view///
	view.left = 20;
	help_WindowSwitcher();

	txtViewDesc.width = "94%";
	//txtViewDesc.height = "96%";

	webview.left = 330;
	webview.background = "none";
	webview.background = "transparent";
	webview.bottom = 0;

Ti.API.info(" HHHHHHHHH LANDSACPE HHHHHHHHHH Handedness at variables.js 218 = "+LRH);

if (LRH==-1) {//left hand Landscape
	LH_buttonvariablesLandscape();
		PrivacyTitle.left = 122;
	version_label.left = 130;
	}

}



/////////////////Landscape Left Handed/////////////////////
/////////////////Landscape Left Handed/////////////////////
/////////////////Landscape Left Handed/////////////////////
/////////////////Landscape Left Handed/////////////////////
/////////////////Landscape Left Handed/////////////////////
/////////////////Landscape Left Handed/////////////////////

function LH_buttonvariablesLandscape() {

LHw=670;
	smallHelpView.left = 20+LHw;
	view.left = 20+LHw;

LH=330;
	build_label.left = 690-LH;
	aTrailer.left = 345-LH;
	top_view.left = 705-LH;
	settingsButton.left = 345-LH;
	helpButton.left = 925-LH;
	copyButton.left = 834-LH;
	pasteButton.left = 741-LH;
	clearButton.left = 649-LH;
	timeStampButton.left = 556-LH;
	emailButton.left = 461-LH;
	help_WindowSwitcher();
	webview.right = 0;
	webview.left = -40;
	//webview.width = 850;
	//LRposL=-130;
	PrivacyTitle.left = 14;
	version_label.left = 20;
}
////////////END /BUTTONS////////////////
////////////END /BUTTONS////////////////
////////////END /BUTTONS////////////////


var win3 = Titanium.UI.createWindow({// top section BG
	title : 'SiWriter.co.uk Help',
	backgroundImage : 'images/Sized_Screen_lighter.png',
	height : "100%",
	bottom : 0,
});


var settingsButton = Titanium.UI.createButton({
	title : 'Settings',
	width : 100,
	height : 34,
	backgroundImage : 'images/long_thin_button.png',
	borderRadius : 15,
});



var smallHelpimages = Ti.UI.createImageView({//help screen on win 1
	//image:'/images/AllCodes.png',
	borderRadius : 10,
	contentHeight : 'auto',
	showVerticalScrollIndicator : true,
});

var top_view = Ti.UI.createView({/* email window */
	height : 25,
	width : 310,
	borderRadius : 15,
	keyboardType : Ti.UI.KEYBOARD_EMAIL,
	returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	backgroundImage : 'images/Small_Screen.png',

});

// Create a TextField.
var aTextField = Ti.UI.createTextField({ });
/* email window */
aTextField.value = "Outgoing email address here";

var aTrailer = Ti.UI.createTextField({/* preview mini text window */
	left : 190,
	top : 495,
	width : 290,
	borderRadius : 10,
	backgroundColor : '#ffffff',
	opacity : '0.7',
	paddingTop : 8,
	paddingBottom : 4,
	paddingLeft : 6,
	paddingRight : 6,
	editable : false,
});

aTrailer.value = "Mini view of main text area";

var smallHelpView = Ti.UI.createScrollView({
	borderRadius : 10,
	width : 310, //doesn't change with orientation'
	contentHeight : 'auto',
	backgroundImage : 'images/help_bg.png',
	Zindex:2000,
});

var openWebsiteButton = Titanium.UI.createButton({
	title : "Open SiWriter's website",
	width : 240,
	height : 34,
	borderRadius : 15,
	backgroundImage : 'images/long_thin_button.png',
});



var testButton = Titanium.UI.createButton({
	title : "testButton",
	width : 240,
	height : 34,
	borderRadius : 15,
	backgroundImage : 'images/long_thin_button.png',
});


var copyButton = Titanium.UI.createButton({
	title : 'Copy',
	width : 80,
	height : 40,
	right : 20,
	top : 40,
	backgroundImage : 'images/mini_key.png',
	borderRadius : 20,
});

var helpButton = Titanium.UI.createButton({
	title : 'Help',
	width : 80,
	height : 40,
	right : 20,
	top : 80,
	backgroundImage : 'images/mini_key.png',
	borderRadius : 20,
});

var ReviewButton = Titanium.UI.createButton({
	title : 'Review',
	width : 80,
	height : 40,

	backgroundImage : 'images/mini_key.png',
	borderRadius : 20,
	enabled : false,

});

var clearButton = Titanium.UI.createButton({
	title : 'Clear',
	width : 80,
	height : 40,

	backgroundImage : 'images/mini_key.png',
	borderRadius : 20,

});

var saveButton = Titanium.UI.createButton({
	title : 'Save',
	width : 80,
	height : 40,
	backgroundImage : 'images/mini_key.png',
	borderRadius : 20,

});

var emailButton = Titanium.UI.createButton({
	title : 'e-mail',
	width : 80,
	height : 40,
	backgroundImage : 'images/mini_key.png',
	borderRadius : 20,

});

var facebookButton = Titanium.UI.createButton({
	title : "Facebook",
	width : 80,
	height : 40,
	backgroundImage : 'images/mini_key.png',
	borderRadius : 20,
});

var pasteButton = Titanium.UI.createButton({
	title : "Paste",
	width : 80,
	height : 40,
	backgroundImage : 'images/mini_key.png',
	borderRadius : 20,
});

var timeStampButton = Titanium.UI.createButton({
	title : "Time",
	width : 80,
	height : 40,
	backgroundImage : 'images/smaller_button.png',
	borderRadius : 20,
});



var PrivacyTitle = Ti.UI.createLabel({
	color : '#900',
	font : {
		fontSize : 30
	},
	shadowColor : '#777',
	shadowOffset : {
		x : 1,
		y : 2
	},
	text : 'SiWriter.co.uk',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : Ti.UI.SIZE,
	height : Ti.UI.SIZE,
	bottom : 40,
});

var version_label = Ti.UI.createLabel({
	color : '#900',
	text : "Pro Version " + Ti.App.version,
	color : "#000",
	font : {
		fontSize : 18
	},
	bottom : 10, //doesn't change with orientation'
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : Ti.UI.SIZE,
	height : Ti.UI.SIZE,
});

var build_label = Ti.UI.createLabel({
	color : '#900',
	color : "#000",
	font : {
		fontSize : 18
	},
});

Titanium.App.Properties.setString("version", Ti.App.version);

var foo = new Date();
var build_time = (foo.getDate() + "/" + foo.getMonth() + 1 + "/" + foo.getFullYear() + " " + foo.getHours() + ":" + foo.getMinutes() + ":" + foo.getSeconds());
build_label.text = build_time;
Titanium.App.Properties.setString("date_of_build", "\r" + new Date);

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
	zIndex : 3,
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
	zIndex : 2,

});

//view.show();

var win1 = Titanium.UI.createWindow({// top section BG
	title : 'SiWriter 1' + new Date,
	backgroundImage : 'images/bg_image.png',
	height : "100%",
	bottom : 0,
});

var LRH =1;


var SiWriter_helpView = Titanium.UI.createWebView({
	backgroundColor : 'transparent',
	url : 'help.html',
	width : "100%",
	height : "100%",
	bottom : 0,
	zIndex : 0,
});


var win3 = Titanium.UI.createWindow({// top section BG
	title : 'SiWriter.co.uk Help',
	backgroundImage : 'images/Sized_Screen_lighter.png',
	height : "100%",
	bottom : 0,
});

var SiWriter_help_win = Titanium.UI.createWebView({
	backgroundColor : 'transparent',
	url : 'help.html',
	width : "100%",
	height : "100%",
	bottom : 0,
	zIndex : 0,
});

/////////////////TOOLBAR//////////////////
/////////////////TOOLBAR//////////////////
/////////////////TOOLBAR//////////////////
/////////////////TOOLBAR//////////////////
/////////////////TOOLBAR//////////////////
/////////////////TOOLBAR//////////////////



var flexSpace = Titanium.UI.createButton({
	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var close = Titanium.UI.createButton({
	title : 'Done',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE
});


var help_BIGwindowSwitch = Ti.UI.createSwitch({
	value : false, // mandatory property for iOS
	top : 670,
	left : 20,
	titleOn : "Large Letter Code guide map displayed in writing area",
	titleOff : "Small Letter Code guide map is displayed",
});

var help_BIGwindowSwitchLbl = Ti.UI.createLabel({
	color : "#000000",
	font : {
		fontSize : 16
	},
	text : 'Large Letter Code map?',
	top : 700,
	left : 80,
});

var sizer_switch_slider = Ti.UI.createSwitch({
	value : false, // mandatory property for iOS
	titleOn : "Pad position trim options displayed in writing area",
	titleOff : "Pad position trim options are not displayed",
});

var sizer_switchlbl = Ti.UI.createLabel({
	text : 'Alter Pad positions ?',
});

var help_windowSwitch = Ti.UI.createSwitch({ //'Letter code map'
	value : false, // mandatory property for iOS
	titleOn : "Letter Code guide map displayed in writing area",
	titleOff : "Letter Code guide map is not displayed",
});

var help_windowSwitchLbl = Ti.UI.createLabel({
	text : 'Letter Code map?',
});

var help_lettersSwitch = Ti.UI.createSwitch({
	value : false, // mandatory property for iOS
	titleOn : "Letter Code guide hints above finger pads are on",
	titleOff : "Letter Code guide hints above finger pads are off",
	color : "#000000",
});

var help_lettersSwitchLbl = Ti.UI.createLabel({
	color : "#000000",
	font : {
		fontSize : 16
	},
	text : 'Finger Pad code hints ?',
});

var btnChoosePhoto = Ti.UI.createButton({
	width : 220,
	height : 35,
	font : {
		fontSize : 16
	},
	left : 20,
	top : 900,
	borderWidth : 1,
	borderRadius : 16,
	title : 'Select a background photo',
	color : '#000000',
	top : (Ti.Platform.displayCaps.platformHeight / 2),
	visible : true
});

var btnTakePhoto = Ti.UI.createButton({
	width : 220,
	height : 35,
	font : {
		fontSize : 16
	},
	borderWidth : 1,
	borderRadius : 16,
	title : 'Take a photo',
	color : '#000000',
	top : (Ti.Platform.displayCaps.platformHeight / 2),
	visible : true
});




var CyKey = Titanium.UI.createButton({
title :"Cykey site",
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,

});
	CyKey.addEventListener("click", function() {
		Ti.API.info("Opening Cykey");
Ti.Platform.openURL("https://sites.google.com/site/cykeybellaire/cykey-home-page");
	});

var SiWriter = Titanium.UI.createButton({
title :"SiWriter site",
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE

});
	SiWriter.addEventListener("click", function() {
		Ti.API.info("Opening SiWriter");
Ti.Platform.openURL("http://www.siwriter.co.uk/");
	});

var Facebook = Titanium.UI.createButton({
title :"Facebook",
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE

});

Facebook.addEventListener("click", function() {
	Ti.API.info("Opening Facebook");
	Ti.Platform.openURL("https://www.facebook.com/SiWriter");
}); 


// create and add toolbar
var toolbar = Titanium.UI.iOS.createToolbar({
	items : [help_BIGwindowSwitch, help_BIGwindowSwitchLbl, flexSpace, help_windowSwitch, help_windowSwitchLbl, flexSpace,help_lettersSwitch,help_lettersSwitchLbl ],
	top : 20,
	height:50,
	borderTop : false,
	borderBottom : true,
	zIndex : 10,
});

var Continue_Siwriting = Titanium.UI.iOS.createToolbar({
    items:[ flexSpace,SiWriter,flexSpace,Facebook,flexSpace,CyKey,flexSpace,close,flexSpace],
    bottom:14,
    borderTop:true,
    borderBottom:false,
    zIndex : 10,
});


var close_main = Titanium.UI.createButton({
	title : 'Done',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE
});

close_main.removeEventListener('click', function() {});

close_main.addEventListener('click', function() {
	Ti.API.info("Continue_Siwriting_main clicked");
	win1.remove(bottomtoolbar);
	win1.remove(toolbar);
	close_main();
	setbutton = 0;
});

var bottomtoolbar = Titanium.UI.iOS.createToolbar({
    items:[flexSpace,sizer_switch_slider,sizer_switchlbl,flexSpace,btnChoosePhoto,flexSpace, btnTakePhoto, flexSpace,close_main,flexSpace ],
    bottom:0,
    borderTop:false,
    borderBottom:false,
    zIndex : 10,
}); 


///////////////END TOOLBAR//////////////////
///////////////END TOOLBAR//////////////////
///////////////END TOOLBAR//////////////////
///////////////END TOOLBAR//////////////////
///////////////END TOOLBAR//////////////////
///////////////END TOOLBAR//////////////////
///////////////END TOOLBAR//////////////////

