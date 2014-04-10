//
//  user_finger_pads.js
//  SiWriterPro1.0.0
//
//  Created by Simon Anthony on 2014-01-25.
//  Copyright 2014 Simon Anthony. All rights reserved.
//
var HeightP = 0;
var WidthP = 0;
var GapP = 0;
var LRposP = 0;
var TwistP = 0;
var UpDwnP = 0;

var HeightL = 0;
var WidthL = 0;
var GapL = 0;
var LRposL = 0;
var LRposP = 0;
var TwistL = 0;
var UpDwnL = 0;

var Height = 0;
var Width = 0;
var Gap = 0;
var LRpos = 0;
var Twist = 0;
var UpDwn = 0;
var LRHL = 1;
var LRHP = 1;
var LRH = 1;

var	LRHpoffset = 0;
var	LRHloffset = 0;

//alert("HTMLorientation="+HTMLorientation);

var Hide = true;

var FPPdisplay = false;


defaults();
initialise();
do_update();

Ti.App.addEventListener('From_Settings_Twist', function(e) {
	Ti.API.info("Twist  sent by app=" + e.Twist);
	Twist = e.Twist;
	//alert("got one");
});

Ti.App.addEventListener('From_Settings_LRposP', function(e) {
	Ti.API.info("LRposP  sent by app=" + e.LRposP);
	LRposP = e.LRposP;
});

Ti.App.addEventListener('From_Settings_LRposL', function(e) {
	Ti.API.info("LRposL  sent by app=" + e.LRposL);
	LRposL = e.LRposL;
});
Ti.App.addEventListener('From_Settings_UpDwnL', function(e) {
	Ti.API.info("UpDwnL sent by app =" + e.UpDwnL);
	UpDwnL = e.UpDwnL;
});

Ti.App.addEventListener('From_Settings_UpDwnP', function(e) {
	Ti.API.info("UpDwnP sent by app =" + e.UpDwnP);
	UpDwnP = e.UpDwnP;
});

Ti.App.addEventListener('From_Settings_HeightP', function(e) {
	Ti.API.info("HeightP sent by app =" + e.HeightP);

	HeightP = e.HeightP;
});

Ti.App.addEventListener('From_Settings_HeightL', function(e) {
	Ti.API.info("HeightL sent by app =" + e.HeightL);

	HeightL = e.HeightL;
});

Ti.App.addEventListener('From_Settings_WidthP', function(e) {
	Ti.API.info("WidthP  sent by app=" + e.WidthP);
	WidthP = e.WidthP;
});
Ti.App.addEventListener('From_Settings_WidthL', function(e) {
	Ti.API.info("WidthL  sent by app=" + e.WidthL);
	WidthL = e.WidthL;
});

Ti.App.addEventListener('From_Settings_GapP', function(e) {
	Ti.API.info("GapP  sent by app=" + e.GapP);
	GapP = e.GapP;
});
Ti.App.addEventListener('From_Settings_GapL', function(e) {
	Ti.API.info("GapL  sent by app=" + e.GapL);
	GapL = e.GapL;
});

Ti.App.addEventListener('From_Settings_FPPDisplay', function(e) {
	Ti.API.info("FPPDisplay  sent by app=" + e.FPPDisplay);
	FPPDisplay = e.FPPDisplay;
});

Ti.App.addEventListener('From_Settings_FPhelp', function(e) {
	Ti.API.info("FPhelp  sent by app=" + e.FPhelp);
	FPhelp = e.FPhelp;
});

function defaults() {
	HeightP = 190;
	WidthP = 98;
	GapP = -2;
	LRposP = 2;
	TwistP = 0;
	UpDwnP = 140;
	LRHP = 1;
	LRHL = 1;
	LRH = 1;
	HeightL = 195;
	WidthL = 91;
	GapL = -3;
	LRposL = 0;
	TwistL = 0;
	UpDwnL = 305;
}

var reset = false;

var globalArrayP = [];
var globalArrayL = [];

$(document).ready(function() {
	initTouch(touchStart, touchEnd, touchCancel);
});
//hide_sizers();
adjust_pads();
//;

Ti.API.info("LRH !!!!!!!!!!!!!!!!!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" + LRH);

do_pad_fphelp(FPhelp);

Ti.App.removeEventListener('Do_help_lettersSwitch', function() {
});

Ti.App.addEventListener('sizer_switch_change', function(e) {

	Hide = !e.slider;
	Ti.API.info("slider" + e.slider);
	if (Hide) {
		sizers.style.display = "none";
	} else {
		sizers.style.display = "block";
		// if (LRH == -1) {
		// sizerholder.style.margin = "0px 0px 0px 30px";
		// } else {
		// sizerholder.style.margin = "0px 0px 0px 81px";
		// }
	}
	Ti.API.info("@!$ Hide= " + Hide);
});

///////////////// FROM APP///////////////////////////////////////////
Ti.App.removeEventListener('initialise', function(e) {
});

Ti.App.addEventListener('initialise', function(e) {
	//Ti.API.info("initialise recieved !!!!!!!!!!!!!!!!!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	Ti.API.info("initialise recieved  LRH !!!!!!!!!!!!!!!!!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" + LRH);

	//recover_settings -For Next ENDSrecover_settings -For Next ENDSalert("start app"+start);
	//initialise();
});

Ti.App.removeEventListener("app:orientation", function(e) {
});
Ti.App.addEventListener("app:orientation", function(e) {
	Ti.API.info("!!!!!!!!app:orientation!!!!!!!!!");
	HTMLorientation = e.orientation;
	initialise();
	// if (LRH == 1) {
	// Ti.API.info("ufp line 264 LRH="+LRH);
	// do_righthanded(1);
	// } else {
	// do_lefthanded(-1);
	// }
	do_update();
});

function initialise() {

	Ti.API.info("initialise heard app INITIALLY say " + HTMLorientation + " to webview!!");
	globalArrayL = [{
		HeightL : HeightL
	}, {
		WidthL : WidthL
	}, {
		TwistL : TwistL
	}, {
		UpDwnL : UpDwnL
	}, {
		LRposL : LRposL
	}, {
		GapL : GapL
	}];

	globalArrayP = [{
		HeightP : HeightP
	}, {
		WidthP : WidthP
	}, {
		TwistP : TwistP
	}, {
		UpDwnP : UpDwnP
	}, {
		LRposP : LRposP
	}, {
		GapP : GapP
	}];

	if (HTMLorientation == "portrait") {
		//appContainer.style.padding = "70px 0px 0px 0px";

		UpDwn = UpDwnP;
		Height = HeightP;
		Gap = GapP;
		Width = WidthP;
		LRpos = LRposP;
		Twist - TwistP;
	}

	if (HTMLorientation == "landscape") {
		//appContainer.style.padding = "170px 0px 0px 0px";
		UpDwn = UpDwnL;
		Height = HeightL;
		Gap = GapL;
		Width = WidthL;
		LRpos = LRposL;
		Twist - TwistL;

	}
	//Ti.API.info("orientation_offset  CALLED " + orientation);
	//Ti.API.info("UpDwn = " + UpDwn + " UdOffset= " + UdOffset + " UdOffsetP =" + UdOffsetP + " UdOffsetL= " + UdOffsetL);
	//	chordKeyboard_id.style.margin = UdOffset + UpDwn + "px 0px 0px 0px";
	//	webview.reload();
	//alert("orientation="+orientation)

	Ti.API.info('!!!!!!!!!globalArrayP!!!!!!!!!!!!!!!!');
	Ti.API.info(globalArrayP[0]);
	Ti.API.info(globalArrayP[1]);
	Ti.API.info(globalArrayP[2]);
	Ti.API.info(globalArrayP[3]);
	Ti.API.info(globalArrayP[4]);
	Ti.API.info(globalArrayP[5]);

	Ti.API.info('!!!!!!!!globalArrayL!!!!!!!!!!!!!!');
	Ti.API.info(globalArrayL[0]);
	Ti.API.info(globalArrayL[1]);
	Ti.API.info(globalArrayL[2]);
	Ti.API.info(globalArrayL[3]);
	Ti.API.info(globalArrayL[4]);
	Ti.API.info(globalArrayL[5]);

	Ti.API.info("after update HTML orientation = " + HTMLorientation);

}

////////////////////////////////////////////////////////////
function do_update() {

	//appContainer.style.margin = UpDwn+"px 0px 0px " + LRpos + "px";

	if (HTMLorientation == 'portrait') {
		UpDwn = UpDwnP;
		Height = HeightP;
		Gap = GapP;
		Width = WidthP;
		LRpos = LRposP + LRHpoffset;
		Twist - TwistP;
		sizerholder.style.top = "72px";
		chordKeyboard_id.style.margin = UpDwn + "px 0px 0px 0px";
		appContainer.style.margin = "0px 0px 0px " + LRposP + "px";
		document.getElementById("finger_pads").setAttribute("style", "-webkit-transform:translateX(" + LRpos + "px) scale(" + LRH + ",1) rotate(" + TwistP + "deg)");
		do_pad_height();
		do_pad_width();
		do_pad_Gap();
		Ti.App.fireEvent('Handedness', {
			LRH : LRH
		});
		sizerholder.style.left = "10px";

	}

	if (HTMLorientation == 'landscape') {
		UpDwn = UpDwnL;
		Height = HeightL;
		Gap = GapL;
		Width = WidthL;
		LRpos = LRposL + LRHloffset;
		Twist - TwistL;
		adjust_pads();
		sizerholder.style.top = "270px";
		chordKeyboard_id.style.margin = UpDwn + "px 0px 0px 0px";
		appContainer.style.margin = "0px 0px 0px " + LRposL + "px";
		document.getElementById("finger_pads").setAttribute("style", "-webkit-transform:translateX(" + LRpos + "px) scale(" + LRH + ",1) rotate(" + TwistL + "deg)");
		do_pad_height();
		do_pad_width();
		do_pad_Gap();
		Ti.App.fireEvent('Handedness', {
			LRH : LRH
		});
		if (LRH == -1) {
			sizerholder.style.left = "-820px";
		} else {
			sizerholder.style.left = "10px";
		}

	}

	Ti.API.info("update done");
	//////////////

};

////////////////////send to APP /////////////////////////////////
//Ti.App.fireEvent('app:fromWebView', { message: 'event fired from WebView, handled in Titanium' });
////////////////////////////////////////////////////////////
Ti.App.removeEventListener('sizer_switch_change', function(e) {
});

Ti.App.removeEventListener('help_lettersSwitch_change', function(e) {
});

Ti.App.addEventListener('help_lettersSwitch_change', function(e) {
	FPhelp = e.FPhelp;
	Ti.API.info('SW- Switch FPhelp: ' + FPhelp);
	do_pad_fphelp(FPhelp);
});

setupKeys();
get_user_settings();
//main loop ! ??
adjust_pads();
drawHelpers();
focusTFC(this);
set_pad_data();
// end loop

function adjust_pads() {

	/////////////////     CLOSE      ///////////////////
	/////////////////     CLOSE      ///////////////////
	/////////////////     CLOSE      ///////////////////

	did("close_display").onTouchDown = function(info) {
		//Ti.App.fireEvent('sizer_switched_off');
		Ti.App.fireEvent('sizer_switched_off', {
			slider : false
		});
		Ti.API.info("sizer_switched_off triggered");

	};

	/////////////////     RESET      ///////////////////
	/////////////////     RESET      ///////////////////
	/////////////////     RESET      ///////////////////

	did("reset_pads").onTouchDown = function(info) {
		var r = confirm("'Do you really want to reset the finger pad positions?'");
		if (r == true) {
			Twist = 0;
			TwistL = 0;
			TwistP = 0;
			LRHP = 1;
			LRHL = 1;
			LRH = 1;
			document.getElementById("finger_pads").setAttribute("style", "-webkit-transform:translateX(" + LRpos + "px) scale(" + LRH + ",1) rotate(" + Twist + "deg)");
			flip_helper_text();
			defaults();
			do_update();
		};

		Ti.API.info("pad data rest");

	};

	/////////////////       HANDED      ///////////////////
	/////////////////       HANDED      ///////////////////
	/////////////////       HANDED      ///////////////////

	did("Lhanded").onTouchDown = function(info) {
		if (LRH != -1) {
			LRH = -1;
			do_lefthanded(LRH);
			do_update();
		}
	};

	did("Rhanded").onTouchDown = function(info) {
		if (LRH != 1) {
			LRH = 1;
			do_righthanded(LRH);
			do_update();
		}
	};

	/////////////////       TWIST      ///////////////////
	/////////////////       TWIST      ///////////////////
	/////////////////       TWIST      ///////////////////

	did("amountT").onTouchDown = function(info) {
		if (HTMLorientation == 'portrait') {
			TwistP -= 3;
			Twist = TwistP;
			twist(Twist);
		} else {
			TwistL -= 3;
			Twist = TwistL;
			twist(Twist);
		}

		Ti.API.info("finger pads.js is : Twist = " + Twist + " TwistP = " + TwistP + " TwistL = " + TwistL);
	};

	did("DamountT").onTouchDown = function(info) {

		if (HTMLorientation == 'portrait') {
			TwistP += 3;
			Twist = TwistP;
			twist(Twist);
		} else {
			TwistL += 3;
			Twist = TwistL;
			twist(Twist);
		}
		Ti.API.info("finger pads.js is : Twist = " + Twist + " TwistP = " + TwistP + " TwistL = " + TwistL);

	};

	///////////////////////////////////////////////////////

	///////////////// LRpos LEFT RIGHT      ///////////////
	/////////////////       LEFT RIGHT      ///////////////
	/////////////////       LEFT RIGHT      ///////////////

	did("amountP").onTouchDown = function(info) {
		if (HTMLorientation == 'portrait') {
			LRposP += 4;
			LRpos = LRposP + LRHpoffset;
		} else {
			LRposL += 4;
			LRpos = LRposL + LRHloffset;
		};
		Ti.API.info(orientation + "+++++++++++++++++++LRposL =" + LRposL);
		do_pad_LRpos();
		Ti.API.info(orientation + "+++++++++++++++++++LRposL =" + LRposL);
	};

	did("DamountP").onTouchDown = function(info) {
		if (HTMLorientation == 'portrait') {
			LRposP -= 4;
			LRpos = LRposP + LRHpoffset;
		} else {
			LRposL -= 4;
			LRpos = LRposL + LRHloffset;
		};
		Ti.API.info(orientation + "--------------------LRposL =" + LRposL);

		do_pad_LRpos();
		Ti.API.info(orientation + "--------------------LRposL =" + LRposL);

	};

	///////////////////////////////////////////////////////

	/////////////////     UP Down      ///////////////////
	/////////////////     UP Down      ///////////////////
	/////////////////     UP Down      ///////////////////

	did("amountU").onTouchDown = function(info) {
		if (HTMLorientation == 'portrait') {
			UpDwnP -= 5;
			UpDwn = UpDwnP;
		} else {
			UpDwnL -= 5;
			UpDwn = UpDwnL;
		};
		do_pad_updwn();

	};

	did("DamountU").onTouchDown = function(info) {
		if (HTMLorientation == 'portrait') {
			UpDwnP += 5;
			UpDwn = UpDwnP;
		} else {
			UpDwnL += 5;
			UpDwn = UpDwnL;
		};
		do_pad_updwn();

	};

	///////////////////////////////////////////////////////

	/////////////////       Height      ///////////////////
	/////////////////       Height      ///////////////////
	/////////////////       Height      ///////////////////

	did("amountH").onTouchDown = function(info) {

		if (HTMLorientation == 'portrait') {
			HeightP += 4;
			Height = HeightP;
		} else {
			HeightL += 4;
			Height = HeightL;
		};
		do_pad_height();
		//do_save_pad_state_h(Height);
	};
	did("DamountH").onTouchDown = function(info) {
		if (HTMLorientation == 'portrait') {
			HeightP -= 4;
			Height = HeightP;
		} else {
			HeightL -= 4;
			Height = HeightL;
		};
		do_pad_height();
	};

	//////////////////////////////////////////////////////

	/////////////////       Width      ///////////////////
	/////////////////       Width      ///////////////////
	/////////////////       Width      ///////////////////

	did("amountW").onTouchDown = function(info) {
		if (HTMLorientation == 'portrait') {
			WidthP += 2;
			Width = WidthP;
		} else {
			WidthL += 2;
			Width = WidthL;
		};
		do_pad_width();
		//do_save_pad_state_w(Width);
	};

	did("DamountW").onTouchDown = function(info) {
		if (HTMLorientation == 'portrait') {
			WidthP -= 2;
			Width = WidthP;
		} else {
			WidthL -= 2;
			Width = WidthL;
		};
		do_pad_width();
	};

	////////////////////////////////////////////////////

	/////////////////       Gap      ///////////////////
	/////////////////       Gap      ///////////////////
	/////////////////       Gap      ///////////////////

	did("amountS").onTouchDown = function(info) {
		if (HTMLorientation == 'portrait') {
			GapP += 1;
			Gap = GapP;
		} else {
			GapL += 1;
			Gap = GapL;
		};
		do_pad_Gap();
		//do_save_pad_state_g(Gap);
	};

	did("DamountS").onTouchDown = function(info) {
		if (HTMLorientation == 'portrait') {
			GapP -= 1;
			Gap = GapP;
		} else {
			GapL -= 1;
			Gap = GapL;
		};
		do_pad_Gap();
	};

	///////////////////////////////////////////////////////
	Ti.API.info("RESET at end of Pads update//////////////////" + reset);

}

function do_righthanded(LRH) {
	Ti.API.info("ufp line 424 do_righthanded called. LRH=" + LRH);
	LRHpoffset = 0;
	LRHloffset = 0;
	// Ti.App.fireEvent('Handedness', {
	// LRH : 1
	// });

	// RIGHT HANDED - Default
	blank_helper_text();
	Ti.App.fireEvent('help_switched_off', {
		slider : false
	});
	if (HTMLorientation == 'portrait') {
		document.getElementById("finger_pads").setAttribute("style", "-webkit-transform:translateX(" + LRpos + "px) scale(" + LRH + ",1) rotate(" + TwistP + "deg)");
		LRHP = 1;
		//Right handed Portrait
		LRH = LRHP;
		handed(LRH);
		LRHpoffset = 0;
	} else {
		LRHL = 1;
		//Right handed Landscape
		LRH = LRHL;
		handed(LRH);
		LRHloffset = 0;
	}
	document.getElementById("finger_pads").setAttribute("style", "-webkit-transform:translateX(" + LRpos + "px) scale(" + LRH + ",1) rotate(" + TwistL + "deg)");
	flip_helper_text();
	Ti.API.info("Handedness in UFP.js 429 is : LRHP = " + LRHP + " LRHL = " + LRHL + " LRH = " + LRH);
	Ti.API.info("RIGHT HANDED Handedness in UFP.js 430 is : LRHloffset = " + LRHloffset + " LRHpoffset = " + LRHpoffset);
	do_save_pad_state_lrh(LRH);
	//do_update();
};

function do_lefthanded(LRH) {
	LRHpoffset = -196;
	LRHloffset = -450;
	Ti.API.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ufp line 614 do_lefthanded called. LRH=" + LRH);
	Ti.API.info("ufp line 615 HTMLorientation = " + HTMLorientation);
	Ti.API.info("ufp line 615 orientation = " + orientation);

	// Ti.App.fireEvent('Handedness', {
	// LRH : -1
	// });
	LRH = -1;
	// LEFT HANDED
	blank_helper_text();
	Ti.App.fireEvent('help_switched_off', {
		slider : false
	});
	if (orientation * -1 != 90) {
		HTMLorientation = "portrait";

		LRHP = -1;
		//alert("HTMLorientation = "+HTMLorientation);
		//LEFT handed Portrait
		LRH = LRHP;
		Ti.API.info("LEFT handed Portrait UFP.js 630 is : LRHP = " + LRHP + " LRHL = " + LRHL + " LRH = " + LRH);
		Ti.API.info("LEFT handed Portrait in UFP.js 631 is : LRHloffset = " + LRHloffset + " LRHpoffset = " + LRHpoffset);
		document.getElementById("finger_pads").setAttribute("style", "-webkit-transform:translateX(" + LRpos + "px) scale(" + LRH + ",1) rotate(" + TwistP + "deg)");
	} else {
		//HTMLorientation="landscape";
		//alert("LEFT handed Landscape");
		Ti.API.info("LEFT handed Landscape in UFP.js 634 is : LRHloffset = " + LRHloffset + " LRHpoffset = " + LRHpoffset);
		//alert("2");
		LRHL = -1;
		//LEFT handed Landscape
		LRH = LRHL + LRHloffset;
	}
	document.getElementById("finger_pads").setAttribute("style", "-webkit-transform:translateX(" + LRpos + "px) scale(" + LRH + ",1) rotate(" + TwistL + "deg)");
	document.getElementById("h0").setAttribute("style", "-webkit-transform:scale(-1,1);");
	document.getElementById("h1").setAttribute("style", "-webkit-transform:scale(-1,1);");
	document.getElementById("h2").setAttribute("style", "-webkit-transform:scale(-1,1);");
	document.getElementById("h3").setAttribute("style", "-webkit-transform:scale(-1,1);");
	document.getElementById("h4").setAttribute("style", "-webkit-transform:scale(-1,1);");
	document.getElementById("h5").setAttribute("style", "-webkit-transform:scale(-1,1);");
	document.getElementById("h6").setAttribute("style", "-webkit-transform:scale(-1,1);");
	document.getElementById("h7").setAttribute("style", "-webkit-transform:scale(-1,1);");
	document.getElementById("hsymbols").setAttribute("style", "-webkit-transform:scale(-1,1);");
	document.getElementById("hunums").setAttribute("style", "-webkit-transform:scale(-1,1);");
	Ti.API.info("Handedness in UFP.js 648 is : LRHP = " + LRHP + " LRHL = " + LRHL + " LRH = " + LRH);
	Ti.API.info("LEFT HANDED Handedness in UFP.js 649 is : LRHloffset = " + LRHloffset + " LRHpoffset = " + LRHpoffset);

	do_save_pad_state_lrh(LRH);
	//do_update();
};

function do_pad_fppdisplay() {
	if (FPPDisplay) {
		sizers.style.display = "none";
	}
	if (!FPPDisplay) {
		sizers.style.display = "block";
	}
	do_save_pad_state_fpp(FPPDisplay);
};

function do_pad_fphelp(FPhelp) {

	if (!FPhelp) {
		blank_helper_text();
	}

	if (FPhelp) {
		h0.style.display = "block";
		h1.style.display = "block";
		h2.style.display = "block";
		h3.style.display = "block";
		h4.style.display = "block";
		h5.style.display = "block";
		h6.style.display = "block";
		h7.style.display = "block";
		hsymbols.style.display = "block";
		hunums.style.display = "block";
	}

	Ti.API.info("ufp line 464 do_pad_fphelp:-" + FPhelp);
	do_save_pad_state_fph(FPhelp);
				if ((FPhelp) == true){
					//alert("False ? FPhelp ="+FPhelp);
				$("#k0").addClass("chordKeywLG");
				$("#k1").addClass("chordKeywLG");
				$("#k2").addClass("chordKeywLG");
				$("#k3").addClass("chordKeywLG");
				$("#k4").addClass("chordKeywLG");
			} else {
				//alert("true ? FPhelp ="+FPhelp);

				$("#k0").removeClass("chordKeywLG");				
				$("#k1").removeClass("chordKeywLG");				
				$("#k2").removeClass("chordKeywLG");				
				$("#k3").removeClass("chordKeywLG");				
				$("#k4").removeClass("chordKeywLG");					
			}	
};

function do_save_pad_state_fph(FPhelp) {
	Ti.App.fireEvent('FPhelp', {
		FPhelp : FPhelp
	});
	Ti.API.info("fphelp variable sent as fired event by User_FingerPads.js  " + FPhelp);
}

function do_save_pad_state_hP(HeightP) {
	Ti.App.fireEvent('HeightP', {
		HeightP : HeightP
	});
	Ti.API.info("heightP variable sent as fired event by User_FingerPads.js  " + HeightP);
}

function do_save_pad_state_hL(HeightL) {
	Ti.App.fireEvent('HeightL', {
		HeightL : HeightL
	});
	Ti.API.info("HeightL variable sent as fired event by User_FingerPads.js  " + HeightL);
}

function do_save_pad_state_wP(WidthP) {
	Ti.App.fireEvent('WidthP', {
		WidthP : WidthP
	});
	Ti.API.info("widthp variable sent as fired event by User_FingerPads.js  " + WidthP);
}

function do_save_pad_state_wL(WidthL) {
	Ti.App.fireEvent('WidthL', {
		WidthL : WidthL
	});
	Ti.API.info("widthL variable sent as fired event by User_FingerPads.js  " + WidthL);
}

function do_save_pad_state_gP(GapP) {
	Ti.App.fireEvent('GapP', {
		GapP : GapP
	});
	Ti.API.info("GapP variable sent as fired event by User_FingerPads.js  " + GapP);
}

function do_save_pad_state_gL(GapL) {
	Ti.App.fireEvent('GapL', {
		GapL : GapL
	});
	Ti.API.info("GapL variable sent as fired event by User_FingerPads.js  " + GapL);
}

function do_save_pad_state_fpp(FPPDisplay) {
	Ti.App.fireEvent('FPPDisplay', {
		FPPDisplay : FPPDisplay
	});
}

function do_save_pad_state_pP(LRposP) {
	Ti.App.fireEvent('LRposP', {
		LRposP : LRpos
	});
	Ti.API.info("LRposP variable sent as fired event by User_FingerPads.js  " + LRposP);
}

function do_save_pad_state_pL(LRposL) {
	Ti.App.fireEvent('LRposL', {
		LRposL : LRposL
	});
	Ti.API.info("LRposL variable sent as fired event by User_FingerPads.js  " + LRposL);
}

function do_save_pad_state_lrh(LRH) {
}

// Ti.App.fireEvent('Handedness', {
// LRH : LRH
// });
// Ti.API.info("LRH SEEN AT BUTTONS fired event by User_FingerPads.js  " + LRH);
// }

function do_save_pad_state_t(Twist) {
	Ti.App.fireEvent('Twist', {
		Twist : Twist
	});
	Ti.API.info("Twist variable sent as fired event by User_FingerPads.js  " + Twist);
}

function do_save_pad_state_uP(UpDwnP) {
	Ti.App.fireEvent('UpDwnP', {
		UpDwnP : UpDwnP
	});
	Ti.API.info("UpDwnP variable sent as fired event by User_FingerPads.js  " + UpDwnP);
}

function do_save_pad_state_uL(UpDwnL) {
	Ti.App.fireEvent('UpDwnL', {
		UpDwnL : UpDwnL
	});
	Ti.API.info("UpDwnL variable sent as fired event by User_FingerPads.js  " + UpDwnL);
}

function get_user_settings() {
	Ti.API.info("get_user_settings CALLED");

	Ti.API.info("get_user_settings ENDED OK");

}

function do_pad_LRpos() {
	if (HTMLorientation == 'portrait') {
		Twist = TwistP;
		LRpos = LRposP + LRHpoffset;
		//finger_pads.style.margin = "0px 0px 0px " + LRpos + "px";
	}
	if (HTMLorientation == 'landscape') {
		Twist = TwistL;
		LRpos = LRposL + LRHloffset;
		//finger_pads.style.margin = "0px 0px 0px " + LRpos + "px";

	}
	Ti.API.info("[UFP 817] LRpos do_pad_LRpos finger pads.js is : LRpos = " + LRpos + " LRposP =" + LRposP + " LRposL =" + LRposL + " LRHpoffset = " + LRHpoffset + " LRHloffset = " + LRHloffset);
	Ti.API.info("[UFP 818] LHR is : = " + LRH);

	document.getElementById("finger_pads").setAttribute("style", "-webkit-transform:translateX(" + LRpos + "px) scale(" + LRH + ",1) rotate(" + Twist + "deg)");

	//do_save_pad_state_t(Twist);

};

function do_pad_Gap() {

	k0.style.margin = "0px 0px 0px " + Gap + "px";
	k1.style.margin = "0px 0px 0px " + Gap + "px";
	k2.style.margin = "0px 0px 0px " + Gap + "px";
	k3.style.margin = "0px 0px 0px " + Gap + "px";
	k4.style.margin = "0px 0px 0px " + Gap + "px";
	k5.style.margin = "0px 0px 0px " + Gap + "px";
	k6.style.margin = "0px 0px 0px " + Gap + "px";

	// Ti.API.info("variable update by user finger pads.js is :-Gap =" + Gap + " GapOffset = " + GapOffset);
	// Ti.API.info("finger pads.js is :-Gap/10 =" + Gap / 10);

}

function do_pad_width() {
	k0.style.width = Width + "px";
	k1.style.width = Width + "px";
	k2.style.width = Width + "px";
	k3.style.width = Width + "px";
	k4.style.width = Width + "px";
	k5.style.width = (2 * Width) + "px";
	k6.style.width = Width + "px";
	k7.style.width = Width + "px";
	UpperNums.style.width = Width + "px";
	Symbols.style.width = Width + "px";
}

function do_pad_height() {
	Ti.API.info("do_pad_height after orient =" + Height);
	k0.style.height = Height + "px";
	k1.style.height = Height + "px";
	k2.style.height = Height + "px";
	k3.style.height = Height + "px";
	k4.style.height = Height + "px";
	k5.style.height = (Height * 0.25) + "px";
	k6.style.height = Height + "px";
	k7.style.height = (Height * 0.5) + "px";
	UpperNums.style.height = (Height * 0.5) + "px";
	Symbols.style.height = (Height * 0.5) + "px";

	Ti.API.info("variable update by user finger pads.js is :-height =" + Height);

	if (Height < 0) {

	}
}

function do_pad_updwn() {

	if (HTMLorientation == 'portrait') {
		UpDwn = UpDwnP;
		chordKeyboard_id.style.margin = UpDwn + "px 0px 0px 0px";
	}
	if (HTMLorientation == 'landscape') {
		UpDwn = UpDwnL;
		chordKeyboard_id.style.margin = UpDwn + "px 0px 0px 0px";
	}

}

function flip_helper_text() {
	document.getElementById("h0").setAttribute("style", "-webkit-transform:scale(1,1);");
	document.getElementById("h1").setAttribute("style", "-webkit-transform:scale(1,1);");
	document.getElementById("h2").setAttribute("style", "-webkit-transform:scale(1,1);");
	document.getElementById("h3").setAttribute("style", "-webkit-transform:scale(1,1);");
	document.getElementById("h4").setAttribute("style", "-webkit-transform:scale(1,1);");
	document.getElementById("h5").setAttribute("style", "-webkit-transform:scale(1,1);");
	document.getElementById("h6").setAttribute("style", "-webkit-transform:scale(1,1);");
	document.getElementById("h7").setAttribute("style", "-webkit-transform:scale(1,1);");
	document.getElementById("hsymbols").setAttribute("style", "-webkit-transform:scale(1,1);");
	document.getElementById("hunums").setAttribute("style", "-webkit-transform:scale(1,1);");
}

function blank_helper_text() {
	h0.style.display = "none";
	h1.style.display = "none";
	h2.style.display = "none";
	h3.style.display = "none";
	h4.style.display = "none";
	h5.style.display = "none";
	h6.style.display = "none";
	h7.style.display = "none";
	hsymbols.style.display = "none";
	hunums.style.display = "none";
}

