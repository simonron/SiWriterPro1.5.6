var help_BIGwindowSwitch = Ti.UI.createSwitch({
  value:false, // mandatory property for iOS 
  top:670,
  left:20,
  titleOn:"Large Letter Code guide map displayed in writing area",
  titleOff:"Small Letter Code guide map is displayed",
  });

var help_BIGwindowSwitchLbl = Ti.UI.createLabel({
  color:"#000000",
  font: { fontSize:16 },
  text: 'Large Letter code map?',
  top:700,
  left:80,
});


var sizer_switch = Ti.UI.createSwitch({
  value:false, // mandatory property for iOS 
  top:530,
  left:20,
  titleOn:"Pad position trim options displayed in writing area",
  titleOff:"Pad position trim options are not displayed",
  });

var sizer_switchlbl = Ti.UI.createLabel({
  color:"#000000",
  font: { fontSize:16 },
  text: 'Alter Pad positions ?',
});






var help_windowSwitch = Ti.UI.createSwitch({
  value:false, // mandatory property for iOS 
  top:740,
  left:20,
  titleOn:"Letter Code guide map displayed in writing area",
  titleOff:"Letter Code guide map is not displayed",
  });

var help_windowSwitchLbl = Ti.UI.createLabel({
  color:"#000000",
  font: { fontSize:16 },
  text: 'Letter code map?',
  top:770,
  left:80,
});





var help_lettersSwitch = Ti.UI.createSwitch({
  value:false, // mandatory property for iOS 
  top:800,
  left:20,
  titleOn:"Letter Code guide hints above finger pads are on",
  titleOff:"Letter Code guide hints above finger pads are off",
  color:"#000000",
});

var help_lettersSwitchLbl = Ti.UI.createLabel({
  color:"#000000",
  font: { fontSize:16 },
  top:830,
  left:80,
  text: 'Finger pad code hints ?',
});





 var btnChoosePhoto = Ti.UI.createButton({
        width: 220,
        height: 35,
  font: { fontSize:16 },
        left:20,
        top:900,
        borderWidth:1,
        borderRadius:16,
        title: 'Select a background photo',
        color: '#000000',
        top: (Ti.Platform.displayCaps.platformHeight / 2),
        visible: true
    });

 var btnTakePhoto = Ti.UI.createButton({
        width: 220,
        height: 35,
  font: { fontSize:16 },
        borderWidth:1,
        borderRadius:16,
        title: 'Take a photo',
        color: '#000000',
        top: (Ti.Platform.displayCaps.platformHeight / 2),
        visible: true
    });
    

//if (landscape) {
  //  var horientation = 'landscape';
    ///////////landscape////////////
    ///////////landscape////////////
    ///////////landscape////////////
    ///////////landscape////////////
    ///////////landscape////////////
    ///////////landscape////////////
    ///////////landscape////////////
    ///////////landscape////////////
    ///////////landscape////////////
    ///////////landscape////////////
    ///////////landscape////////////
    ///////////landscape////////////
   ///alert("L"); 
help_BIGwindowSwitchLbl.top =160;
help_BIGwindowSwitchLbl.left =80;
//help_BIGwindowSwitchLbl.display ="none";

//help_windowSwitchLbl.display ="none";
help_windowSwitchLbl.top =630;
help_windowSwitchLbl.left =80;

help_lettersSwitchLbl.top =550;
help_lettersSwitchLbl.left =80;

sizer_switchlbl.top = 725;
sizer_switchlbl.left = 80; 

  
    
////////portrait////////
////////portrait////////
////////portrait////////
////////portrait////////
////////portrait////////
////////portrait////////
////////portrait////////
////////portrait////////
////////portrait////////
////////portrait////////
////////portrait////////
////////portrait////////
   //alert("p"); 

help_BIGwindowSwitchLbl.top =700;
help_BIGwindowSwitchLbl.left =80;

help_windowSwitchLbl.top =770;
help_windowSwitchLbl.left =80;

help_lettersSwitchLbl.top =830;
help_lettersSwitchLbl.left =80;
 
sizer_switchlbl.top =630;
sizer_switchlbl.left = 80; 


   
