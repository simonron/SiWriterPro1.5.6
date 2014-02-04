var flexSpace = Titanium.UI.createButton({
	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var close = Titanium.UI.createButton({
	title : 'Done',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE
});

var close_main = Titanium.UI.createButton({
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
    items:[ flexSpace,close,flexSpace,],
    bottom:0,
    borderTop:true,
    borderBottom:false,
    zIndex : 10,
});

var Continue_Siwriting_main = Titanium.UI.iOS.createToolbar({
    items:[ flexSpace,close_main,flexSpace,],
    bottom:40,
    borderTop:true,
    borderBottom:false,
    zIndex : 10,
});


var bottomtoolbar = Titanium.UI.iOS.createToolbar({
    items:[flexSpace,sizer_switch_slider,sizer_switchlbl,flexSpace,btnChoosePhoto,flexSpace, btnTakePhoto, flexSpace,close_main,flexSpace ],
    bottom:0,
    borderTop:false,
    borderBottom:false,
    zIndex : 10,
}); 

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

help_BIGwindowSwitch.addEventListener('change', function(e) {
	help_BIGwindowSwitch.value=!help_BIGwindowSwitch.value;
	if (help_BIGwindowSwitch.value == 1) {
		smallHelpimages.image = '/images/BIGAllCodes2.png';
	} else {
		smallHelpimages.image = '/images/AllCodes.png';
	}
	Ti.API.info('****************** help_BIGwindowSwitch at line 200 now is '+help_BIGwindowSwitch.value);
});


Ti.App.addEventListener('sizer_switched_off', function(e) {
   sizer_switch_slider.value=false; 
});


 sizer_switch_slider.removeEventListener('change', function() {});



sizer_switch_slider.addEventListener('change', function(e) {
		Ti.API.info('sizer_switch slide value ' + sizer_switch_slider.value);
	Ti.App.fireEvent('sizer_switch_change', {slider: sizer_switch_slider.value}); 

});



help_lettersSwitch.removeEventListener('change', function(e, FPhelp) {});

help_lettersSwitch.addEventListener('change', function(e, FPhelp) {
	FPhelp = help_lettersSwitch.value;
	Ti.API.info('app:Switch value: ' + help_lettersSwitch.value);
	Ti.App.fireEvent('help_lettersSwitch_change');
});

help_windowSwitch.removeEventListener('change', help_WindowSwitcher);

help_windowSwitch.addEventListener('change', function(e) {
	
	if (help_windowSwitch.value == 1) {
	smallHelpView.show();
	view.height = 720;
} else {
	smallHelpView.hide();
	view.height = 720;
}

help_windowSwitch.value =!help_windowSwitch.value;
	Ti.API.info("help_windowSwitch.value= "+help_windowSwitch.value);	
	help_WindowSwitcher();
	help_windowSwitch.removeEventListener('change', help_WindowSwitcher);
});

function help_WindowSwitcher() {

	if (help_windowSwitch.value == true) {/******** SHOW HELP ******* ALL SMALL **/
		smallHelpView.show();
		if (orientation == "portrait") {
			view.width = "290";
		}
		if (orientation == "portrait") {
			view.height = "420";
		}

		if (orientation == "landscape") {
			view.width = "310";
		}

		if (orientation == "landscape") {
			view.height = "300";
		}
	}

	if (help_windowSwitch.value == false) {/******** HIDE HELP **** ALL BIG *****/
		smallHelpView.hide();
		if (orientation == "portrait") {
			view.width = "620";
		}
		if (orientation == "portrait") {
			view.height = "420";
		}
		if (orientation == "landscape") {
			view.height = "720";
		}
		if (orientation == "landscape") {
			view.width = "310";
		}
	}
}

