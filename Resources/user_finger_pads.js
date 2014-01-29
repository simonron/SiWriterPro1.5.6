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
var TwistL = 0;
var UpDwnL = 0;

var Height = 0;
var Width = 0;
var Gap = 0;
var LRpos = 0;
var Twist = 0;
var UpDwn = 0;

//alert("HTMLorientation="+HTMLorientation);

var Hide = true;

var FPPdisplay = true;
var FPhelp = true;
var LrOffset = 0;
var LrOffsetP = 0;
var LrOffsetL = 0;
defaults();
initialise();
do_update();

function defaults() {
	HeightP = 190;
	WidthP = 98;
	GapP = -2;
	LRposP = -6;
	TwistP = 0;
	UpDwnP = 550;

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
hide_sizers();
adjust_pads();
//;

///////////////// FROM APP///////////////////////////////////////////
Ti.App.removeEventListener('initialise', function(e) {});

Ti.App.addEventListener('initialise', function(e) {
	Ti.API.info("initialise recieved !!!!!!!!!!!!!!!!!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

	//recover_settings -For Next ENDSrecover_settings -For Next ENDSalert("start app"+start);
	//initialise();
});

Ti.App.removeEventListener("app:orientation", function(e) {});
Ti.App.addEventListener("app:orientation", function(e) {
	Ti.API.info("!!!!!!!!app:orientation!!!!!!!!!");
	HTMLorientation = e.orientation;
	initialise();
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
	//		Ti.API.info("orientation_offset  CALLED " + orientation);
	//Ti.API.info("UpDwn = " + UpDwn + " UdOffset= " + UdOffset + " UdOffsetP =" + UdOffsetP + " UdOffsetL= " + UdOffsetL);
	//	chordKeybaord.style.margin = UdOffset + UpDwn + "px 0px 0px 0px";
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
		LRpos = LRposP;
		Twist - TwistP;
		chordKeybaord.style.margin = UpDwn + "px 0px 0px 0px";
		appContainer.style.margin = "0px 0px 0px " + LRposP + "px";
		document.getElementById("finger_pads").setAttribute("style", "-webkit-transform:rotate(" + TwistP + "deg)");
		do_pad_height();
		do_pad_width();
		do_pad_Gap();
	}

	if (HTMLorientation == 'landscape') {
		UpDwn = UpDwnL;
		Height = HeightL;
		Gap = GapL;
		Width = WidthL;
		LRpos = LRposL;
		Twist - TwistL;
		adjust_pads();
		chordKeybaord.style.margin = UpDwn + "px 0px 0px 0px";
		appContainer.style.margin = "0px 0px 0px " + LRposL + "px";
		document.getElementById("finger_pads").setAttribute("style", "-webkit-transform:rotate(" + TwistL + "deg)");
		do_pad_height();
		do_pad_width();
		do_pad_Gap();

	}


	Ti.API.info("update done");

};

////////////////////send to APP /////////////////////////////////
//Ti.App.fireEvent('app:fromWebView', { message: 'event fired from WebView, handled in Titanium' });
////////////////////////////////////////////////////////////
Ti.App.removeEventListener('sizer_switch_change', function(e) {});

Ti.App.addEventListener('sizer_switch_change', function(e) {
	Hide = !Hide;
	if (Hide) {
		hide_sizers();
	} else {
		show_sizers();
	}
	Ti.API.info("@!$ Hide= " + Hide);
});

Ti.App.removeEventListener('help_lettersSwitch_change', function(e) {});

Ti.App.addEventListener('help_lettersSwitch_change', function(e) {
	FPhelp = !FPhelp;
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
		hide_sizers();
		Ti.App.fireEvent('app:sizer_switch', {
			sizer_switch : false
		});
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
			document.getElementById("finger_pads").setAttribute("style", "-webkit-transform:rotate(" + 0 + "deg)");
			defaults();
			do_update();
		};

		Ti.API.info("pad data rest");

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

	//////////////// LRpos LEFT RIGHT      ///////////////
	/////////////////       LEFT RIGHT      ///////////////
	/////////////////       LEFT RIGHT      ///////////////

	did("amountP").onTouchDown = function(info) {
		if (HTMLorientation == 'portrait') {
			LRposP += 4;
			LRpos = LRposP;
		} else {
			LRposL += 4;
			LRpos = LRposL;
		};
		do_pad_LRpos();
	};

	did("DamountP").onTouchDown = function(info) {
		if (HTMLorientation == 'portrait') {
			LRposP -= 4;
			LRpos = LRposP;
		} else {
			LRposL -= 4;
			LRpos = LRposL;
		};
		do_pad_LRpos();
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
		//		do_save_pad_state_h(Height);
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

function get_user_settings() {}
	// Ti.API.info("get_user_settings CALLED");
// 
	// Ti.App.addEventListener('From_Settings_Twist', function(e) {
		// Ti.API.info("Twist  sent by app=" + e.Twist);
		// Twist = e.Twist;
		// alert("got one");
	// });
// 
	// Ti.App.addEventListener('From_Settings_LRposP', function(e) {
		// Ti.API.info("LRposP  sent by app=" + e.LRposP);
		// LRposP = e.LRposP;
	// });
// 
	// Ti.App.addEventListener('From_Settings_LRposL', function(e) {
		// Ti.API.info("LRposL  sent by app=" + e.LRposL);
		// LRposL = e.LRposL;
	// });
	// Ti.App.addEventListener('From_Settings_UpDwnL', function(e) {
		// Ti.API.info("UpDwnL sent by app =" + e.UpDwnL);
		// UpDwnL = e.UpDwnL;
	// });
// 
	// Ti.App.addEventListener('From_Settings_UpDwnP', function(e) {
		// Ti.API.info("UpDwnP sent by app =" + e.UpDwnP);
		// UpDwnP = e.UpDwnP;
	// });
// 
	// Ti.App.addEventListener('From_Settings_HeightP', function(e) {
		// Ti.API.info("HeightP sent by app =" + e.HeightP);
// 
		// HeightP = e.HeightP;
	// });
// 
	// Ti.App.addEventListener('From_Settings_HeightL', function(e) {
		// Ti.API.info("HeightL sent by app =" + e.HeightL);
// 
		// HeightL = e.HeightL;
	// });
// 
	// Ti.App.addEventListener('From_Settings_WidthP', function(e) {
		// Ti.API.info("WidthP  sent by app=" + e.WidthP);
		// WidthP = e.WidthP;
	// });
	// Ti.App.addEventListener('From_Settings_WidthL', function(e) {
		// Ti.API.info("WidthL  sent by app=" + e.WidthL);
		// WidthL = e.WidthL;
	// });
// 
	// Ti.App.addEventListener('From_Settings_GapP', function(e) {
		// Ti.API.info("GapP  sent by app=" + e.GapP);
		// GapP = e.GapP;
	// });
	// Ti.App.addEventListener('From_Settings_GapL', function(e) {
		// Ti.API.info("GapL  sent by app=" + e.GapL);
		// GapL = e.GapL;
	// });
// 
	// Ti.App.addEventListener('From_Settings_FPPDisplay', function(e) {
		// Ti.API.info("FPPDisplay  sent by app=" + e.FPPDisplay);
		// FPPDisplay = e.FPPDisplay;
	// });
// 
	// Ti.App.addEventListener('From_Settings_FPhelp', function(e) {
		// Ti.API.info("FPhelp  sent by app=" + e.FPhelp);
		// FPhelp = e.FPhelp;
	// });
	// Ti.API.info("get_user_settings ENDED OK");
// 
// }

function do_pad_LRpos() {
	if (HTMLorientation == 'portrait') {
		LRpos = LRposP;		
		appContainer.style.margin = "0px 0px 0px " + LRpos + "px";
	}
	if (HTMLorientation == 'landscape') {
		LRpos = LRposL;
		appContainer.style.margin = "0px 0px 0px " + LRpos + "px";
	}
	Ti.API.info("LRpos finger pads.js is : LRpos =" + LRpos +" LRposP =" + LRposP +"LRposL =" + LRposL);
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
}

function do_pad_updwn() {

	if (HTMLorientation == 'portrait') {
		UpDwn = UpDwnP;
		chordKeybaord.style.margin = UpDwn + "px 0px 0px 0px";
	}
	if (HTMLorientation == 'landscape') {
		UpDwn = UpDwnL;
		chordKeybaord.style.margin = UpDwn + "px 0px 0px 0px";
	}

}
