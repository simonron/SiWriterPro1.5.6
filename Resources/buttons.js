Ti.include('KS_email2.js');
Ti.include('file_saver.js');
Ti.include('help.js');
LRH =20;

Ti.App.removeEventListener('Handedness', function(e){});

Ti.App.addEventListener('Handedness', function(e) {
	Ti.API.info("Handednes  sent by user_fingers=" + e.LRH);
	LRH = e.LRH;
	//alert("LRH"+LRH);
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
});

var openWebsiteButton = Titanium.UI.createButton({
	title : "Open SiWriter's website",
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

getOrientation();

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

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////////portrait//////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

function buttonvariablesPortrait() {

	writeFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'saved_BGimageP.png');
	image = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + 'saved_BGimageP.png');
	win1.backgroundImage = image.nativePath;

	if (!writeFile.exists()) {
		win1.backgroundImage = 'images/bg_image.png';
	}

	webview.height = "60%", PrivacyTitle.left = 442;
	PrivacyTitle.bottom = 60;
	build_label.left = 450;
	build_label.bottom = 95;
	version_label.left = 450;
	version_label.bottom = 30;

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

if (LRH==-1) {
	buttonvariablesLandscape_LHp();
	}

}

/////////////////PORTRAIT Left Handed/////////////////////
/////////////////PORTRAIT Left Handed/////////////////////
/////////////////PORTRAIT Left Handed/////////////////////
/////////////////PORTRAIT Left Handed/////////////////////
/////////////////PORTRAIT Left Handed/////////////////////
/////////////////PORTRAIT Left Handed/////////////////////
/////////////////PORTRAIT Left Handed/////////////////////

function buttonvariablesLandscape_LHp() {


	webview.right = 0;
	webview.left = 0;
	webview.width = 750;
	PrivacyTitle.left = 20;
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
	webview.height = "100%", PrivacyTitle.left = 682;
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


if (LRH==-1) {
	buttonvariablesLandscape_LH();
	}

}



/////////////////Landscape Left Handed/////////////////////
/////////////////Landscape Left Handed/////////////////////
/////////////////Landscape Left Handed/////////////////////
/////////////////Landscape Left Handed/////////////////////
/////////////////Landscape Left Handed/////////////////////
/////////////////Landscape Left Handed/////////////////////

function buttonvariablesLandscape_LH() {

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
	webview.width = 850;
	//LRposL=-130;
	PrivacyTitle.left = 20;
	version_label.left = 20;
}
