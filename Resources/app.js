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
var LRposP=0;
var LRposL=0;
var KV=false;
var temp="";
var Toggle=false;
var Trigger=false;
var oldOrientation="";

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
Titanium.App.Properties.setString("date_of_build","\r"+new Date);


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
	opacity:0.90,

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
if(Titanium.Platform.displayCaps.platformWidth<Titanium.Platform.displayCaps.platformHeight){
 orientation='portrait';
    Ti.API.info("Launched in PORTRAIT ");    
 
} else {
  orientation='landscape';

    Ti.API.info("Launched in LANDSCAPE ");   
}

///////////////////// INITIALISE //////////////////////////////////////////////////////////////
webview.addEventListener('beforeload',function(e)
{
webview.evalJS("var start='" + start + "';");
webview.evalJS("var HTMLorientation='" + orientation + "';");
start=0;
});
/////////////////////////////////////////////////////////////////////////
/* var Cloud = require('ti.cloud');*/

var SiWriter_helpView = Titanium.UI.createWebView({
	backgroundColor : 'transparent',
	url : 'help.html',
	width : "100%",
	height : "100%",
	bottom : 0,
	  zIndex :0,
});

//////////////////////////TO WEBVIEW from App demo/////////////////////////////
//Ti.App.fireEvent('app:reset', { reset_pads: 'reset_pads' });

////////////////////////////////////////////////////////////

////////////////////FROM WEBVIEWW DEMO///////////////////////
//Ti.App.addEventListener('app:fromWebView', function(e) {alert(e.message);});//from webview
////////////////////////////////////////////////////////////
Ti.App.removeEventListener('app:sizer_switch', function(e) {});

Ti.App.addEventListener('app:sizer_switch', function(e) {
	sizer_switch.value=false;
	Ti.App.fireEvent('sizer_switch_change');
			// Play a device vibration.
   Ti.Media.vibrate();
	//alert(e.sizer_switch);
	});//from webview


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
win1.add(webview);
win1.add(view);
win1.add(b3);
// Ti.API.info("app 118 Titanium.App.keyboardVisible test ?");			
// 
// Ti.API.info("app 161 Titanium.App.keyboardVisible="+Titanium.App.keyboardVisible);			

Ti.App.removeEventListener('do_reset', function(e) {});

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



//help_windowSwitch.addEventListener('change', function(e) {
//	help_WindowSwitcher();
//});

help_BIGwindowSwitch.addEventListener('change', function(e) {
	if (help_BIGwindowSwitch.value == 1) {
		smallHelpimages.image = '/images/BIGAllCodes2.png';
	} else {
		smallHelpimages.image = '/images/AllCodes.png';
	}
	//Ti.API.info('****************** help_BIGwindowSwitch at line 1229 now is '+help_BIGwindowSwitch.value);
});

//Ti.Gesture.removeEventListener('orientationchange',function(){});

//**********************ORIENTATION CHANGE SENSOR************************//
Ti.Gesture.addEventListener('orientationchange', function(e) {
//alert(e.orientation);
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
	Ti.API.info('-- App Line 336 ---------------------------------------------------------orientation: ' + orientation);
	return orientation;
});
//******************END***ORIENTATION CHANGE SENSOR*********************//
sizer_switch.removeEventListener('change', function(e, hide) {});

sizer_switch.addEventListener('change', function(e, hide) {
	Ti.App.fireEvent('sizer_switch_change');
});


help_lettersSwitch.removeEventListener('change', function(e, FPhelp) {});

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



/////////////////////////////////////////TEXT MANAGEMENT////////////////////////////////////////

Ti.include('newtext.js');
//////////////////////////////////////END TEXT MANAGEMENT////////////////////////////////////////

//////////////////////////////////////BG IMAGE MANAGEMENT////////////////////////////////////////
btnChoosePhoto.removeEventListener('click', function(e) {});

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

btnTakePhoto.removeEventListener('click', function(e) {});


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
