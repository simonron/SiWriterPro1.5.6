var Height = 190;
var Width = 100;
var Gap = 0;
var LR_pos = 0;
var Hide = true;
var FPPdisplay = true;
var FPhelp = true;
var Twist = 0;
var value = 0;
var UpDwn = 0;

var LrOffset = 0;
var LrOffsetP = 0;
var LrOffsetL = 0;

var HTMLorientation = "portrait";

var UpDwn = 0;
var UdOffset = 0;
var UdOffsetP = 0;
var UdOffsetL = 0;

var HeightOffset = 0;
var HeightOffsetP = 0;
var HeightOffsetL = 0;

var WidthOffset = 0;
var WidthOffsetP = 0;
var WidthOffsetL = 0;

var Gap = 0;
var GapOffset = 0;
var GapOffsetP = 0;

var HeightOffsetL = 0;
var WidthOffsetL = 0;
var GapOffsetL = 0;
var reset = false;
//;

$(document).ready(function() {
	initTouch(touchStart, touchEnd, touchCancel);
});
hide_sizers();
//;

///////////////// FROM APP///////////////////////////////////////////

//  Ti.App.addEventListener("app:fromTitanium", function(e) {
// alert(e.message);//FROM APP
//      });

Ti.App.addEventListener("app:orientation", function(e) {
	Ti.API.info("webview heard app say " + e.orientation + " to webview");
	if (e.orientation == "portrait") {
		appContainer.style.padding = "0px 0px 0px 0px";
		//orientation = "portrait";
		LrOffset = LrOffsetP;
		// HeightOffset = HeightOffsetP;
		// WidthOffset = WidthOffsetP;
		// GapOffset = GapOffsetP;
		UdOffset = UdOffsetP;
	} else {
		if (e.orientation == "landscape") {
			appContainer.style.padding = "170px 0px 0px 0px";
			//orientation = "landscape";
			LrOffset = LrOffsetL;
			UdOffset = UdOffsetL;
			// HeightOffset = HeightOffsetL;
			// WidthOffset = WidthOffsetL;
			// GapOffset = GapOffsetL;
		}
	}

	var orientation = e.orientation;
	Ti.API.info("orientation_offset  CALLED " + orientation);
	Ti.API.info("UpDwn = " + UpDwn + " UdOffset= " + UdOffset + " UdOffsetP =" + UdOffsetP + " UdOffsetL= " + UdOffsetL);
	chordKeybaord.style.margin = UdOffset + UpDwn + "px 0px 0px 0px";
	webview.reload();
	//alert("orientation="+orientation)
});

////////////////////////////////////////////////////////////

////////////////////send to APP /////////////////////////////////
//Ti.App.fireEvent('app:fromWebView', { message: 'event fired from WebView, handled in Titanium' });
////////////////////////////////////////////////////////////

//webview.evalJS("var orientation='" + orientation + "';");
//var orientation = Titanium.App.Properties.getString(orientation);

Ti.App.addEventListener('From_Settings', function(e) {
	Ti.API.info('Display!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! = ' + e.Height);
	// if(e.message==true){sizers.style.display="block";Ti.API.info('TURNED ON');var Display=1;}
	// if(e.message==false){sizers.style.display="none";Ti.API.info('DISPLAY TURNED OFF');var Display=0;}
	Ti.API.info('DisplayWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW = ' + Display);
});
// webview.evalJS("var Twist='" + Twist + "';");
// webview.evalJS("var LR_pos='" + LR_pos + "';");
// webview.evalJS("var UpDwn='" + UpDwn + "';");
// webview.evalJS("var Height='" + Height + "';");
// webview.evalJS("var Width='" + Width + "';");
// webview.evalJS("var Gap='" + Gap + "';");
// webview.evalJS("var FPPDisplay='" + FPPDisplay + "';");
// webview.evalJS("var FPhelp='" + FPhelp + "';");

Ti.App.addEventListener('sizer_switch_change', function(e) {
	Hide = !Hide;
	if (Hide) {
		hide_sizers();
	} else {
		show_sizers();
	}
	Ti.API.info("@!$ Hide= " + Hide);
});

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
//Ti.API.info('START Ti.Display = '+Ti.Display);

function adjust_pads() {
	/////////////////     CLOSE      ///////////////////
	/////////////////     CLOSE      ///////////////////
	/////////////////     CLOSE      ///////////////////

	did("close_display").onTouchDown = function(info) {
		hide_sizers();
		sizer_switch.value = false;
	};

	/////////////////     RESET      ///////////////////
	/////////////////     RESET      ///////////////////
	/////////////////     RESET      ///////////////////

	did("reset_pads").onTouchDown = function(info) {

		Ti.API.info("/?????????????????/////////////////////" + reset);

		LR_pos = 0;
		do_pad_LR_pos();

		Height = 190;
		do_pad_height();

		Width = 100;
		do_pad_width();

		UpDwn = 0;
		UdOffsetP = 40;
		UdOffsetL = 170;
		do_pad_updwn();

		Gap = 6;
		GapOffset = 0;
		do_pad_Gap();

		Twist = 0;
		document.getElementById("finger_pads").setAttribute("style", "-webkit-transform:rotate(" + Twist + "deg)");

		// do_save_pad_state_p(LR_pos);
		// do_save_pad_state_h(Height);
		// do_save_pad_state_w(Width);
		// do_save_pad_state_g(Gap);
		// do_save_pad_state_t(Twist);
		// do_save_pad_state_u(UpDwn);
		// do_save_pad_state_fpp(FPPDisplay);
		// do_save_pad_state_fph(FPhelp);

		Ti.API.info("reset_pad_data positions RESET");
		alert("SiWriter reset to defaults");
		//webview.reload();

		Ti.API.info("pad data rest");

	};

	/////////////////       TWIST      ///////////////////
	/////////////////       TWIST      ///////////////////
	/////////////////       TWIST      ///////////////////

	did("amountT").onTouchDown = function(info) {
		Twist -= 1;

		twist_right(Twist);
		Ti.API.info("reset condition               bbbbbbbbbbbbbbbb             " + reset);

		do_save_pad_state_t(Twist);
		//Ti.API.info("Twist worked "+Twist);
		Ti.API.info("variable update by user finger pads.js is :-Twist =" + Twist);
		Ti.API.info("reset condition               ccccccccccccccccccccc             " + reset);

	};

	did("DamountT").onTouchDown = function(info) {

		Twist += 1;
		twist_left(Twist);
		do_save_pad_state_t(Twist);
		//Ti.API.info("Twist worked "+Twist);
		Ti.API.info("variable update by user finger pads.js is :-Twist =" + Twist);

	};

	///////////////////////////////////////////////////////

	//////////////// LR_pos LEFT RIGHT      ///////////////
	/////////////////       LEFT RIGHT      ///////////////
	/////////////////       LEFT RIGHT      ///////////////

	did("amountP").onTouchDown = function(info) {
		LR_pos += 1;
		do_pad_LR_pos();
		//alert("R");
		do_save_pad_state_p(LR_pos);
	};

	did("DamountP").onTouchDown = function(info) {
		LR_pos -= 1;
		do_pad_LR_pos();
		//alert("L");
		do_save_pad_state_p(LR_pos);
	};

	function do_pad_LR_pos() {
		//;
		if (LR_pos < -300) {
			LR_pos = -300;
		}
		if (LR_pos > 300) {
			LR_pos = 300;
		}
		//if(reset==true){LR_pos=0;}
		Ti.API.info("LR_pos = " + LR_pos + " LrOffset= " + LrOffset + " LrOffsetP =" + LrOffsetP + " LrOffsetL= " + LrOffsetL);

		appContainer.style.margin = "0px 0px 0px " + LR_pos + LrOffset + "px";
		Ti.API.info("variable update by user finger pads.js is :-LR_pos =" + LR_pos);
	};

	///////////////////////////////////////////////////////

	/////////////////     UP Down      ///////////////////
	/////////////////     UP Down      ///////////////////
	/////////////////     UP Down      ///////////////////

	did("amountU").onTouchDown = function(info) {
		UpDwn -= 5;
		do_pad_updwn();
		//alert("U");
		//do_save_pad_state_u(UpDwn);
	};

	did("DamountU").onTouchDown = function(info) {
		UpDwn += 5;
		do_pad_updwn();
		//alert("D");
		//do_save_pad_state_u(UpDwn);
	};

	function do_pad_updwn() {
		Ti.API.info("UpDwn update by user finger pads.js is : UpDwn =" + UpDwn);
		Ti.API.info("UdOffset update by user finger pads.js is : UdOffset =" + UdOffset);

		//;
		chordKeybaord.style.margin = UdOffset + UpDwn + "px 0px 0px 0px";
		//alert("orientation="+orientation);

	}

	///////////////////////////////////////////////////////

	/////////////////       Height      ///////////////////
	/////////////////       Height      ///////////////////
	/////////////////       Height      ///////////////////

	did("amountH").onTouchDown = function(info) {
		Height += 1;
		do_pad_height();
		do_save_pad_state_h(Height);
	};

	did("DamountH").onTouchDown = function(info) {
		Height -= 1;
		do_pad_height();
		do_save_pad_state_h(Height);
	};

	function do_pad_height() {

		//;
		Ti.API.info("do_pad_height after orient =" + Height);

		k0.style.height = Height + HeightOffset + "px";
		k1.style.height = Height + HeightOffset + "px";
		k2.style.height = Height + HeightOffset + "px";
		k3.style.height = Height + HeightOffset + "px";
		k4.style.height = Height + HeightOffset + "px";
		k5.style.height = (Height * 0.25) + HeightOffset + "px";
		k6.style.height = Height + HeightOffset + "px";
		k7.style.height = (Height * 0.5) + HeightOffset + "px";
		UpperNums.style.height = (Height * 0.5) + HeightOffset + "px";
		Symbols.style.height = (Height * 0.5) + HeightOffset + "px";

		Ti.API.info("variable update by user finger pads.js is :-height =" + Height);
	}

	//////////////////////////////////////////////////////

	/////////////////       Width      ///////////////////
	/////////////////       Width      ///////////////////
	/////////////////       Width      ///////////////////

	did("amountW").onTouchDown = function(info) {
		Width += 1;
		do_pad_width();
		do_save_pad_state_w(Width);
	};

	did("DamountW").onTouchDown = function(info) {
		Width -= 1;
		do_pad_width();
		do_save_pad_state_w(Width);
	};

	function do_pad_width() {
		//;

		k0.style.width = Width + WidthOffset + "px";
		k1.style.width = Width + WidthOffset + "px";
		k2.style.width = Width + WidthOffset + "px";
		k3.style.width = Width + WidthOffset + "px";
		k4.style.width = Width + WidthOffset + "px";
		k5.style.width = (2 * Width) + WidthOffset + "px";
		k6.style.width = Width + WidthOffset + "px";
		k7.style.width = Width + WidthOffset + "px";
		UpperNums.style.width = Width + WidthOffset + "px";
		Symbols.style.width = Width + WidthOffset + "px";

		if ((Width > 300) || (Width < 0)) {
			Width = 0;
		}
		Ti.API.info("variable update by user finger pads.js is :-Width =" + Width);

	}

	////////////////////////////////////////////////////

	/////////////////       Gap      ///////////////////
	/////////////////       Gap      ///////////////////
	/////////////////       Gap      ///////////////////

	did("amountS").onTouchDown = function(info) {
		Gap += 1;
		do_pad_Gap();
		do_save_pad_state_g(Gap);
	};

	did("DamountS").onTouchDown = function(info) {
		Gap -= 1;
		do_pad_Gap();
		do_save_pad_state_g(Gap);
	};

	function do_pad_Gap() {

        k0.style.margin = "0px 0px 0px " + Gap  + "px";
		k1.style.margin = "0px 0px 0px " + Gap  + "px";
		k2.style.margin = "0px 0px 0px " + Gap  + "px";
		k3.style.margin = "0px 0px 0px " + Gap  + "px";
		k4.style.margin = "0px 0px 0px " + Gap  + "px";
		k5.style.margin = "0px 0px 0px " + Gap  + "px";
		k6.style.margin = "0px 0px 0px " + Gap  + "px";


		Ti.API.info("variable update by user finger pads.js is :-Gap =" + Gap + " GapOffset = " + GapOffset);
		Ti.API.info("finger pads.js is :-Gap/10 =" + Gap/10);




	}

	///////////////////////////////////////////////////////
	Ti.API.info("/?????????????????/////////////////////" + reset);

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

	Ti.API.info("SW line 464 do_pad_fphelp:-" + FPhelp);
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

function do_save_pad_state_pP(LR_posP) {
	Ti.App.fireEvent('LR_posP', {
		LR_posP : LR_pos
	});
	Ti.API.info("LR_posP variable sent as fired event by User_FingerPads.js  " + LR_posP);
}

function do_save_pad_state_pL(LR_posL) {
	Ti.App.fireEvent('LR_posL', {
		LR_posL : LR_posL
	});
	Ti.API.info("LR_posL variable sent as fired event by User_FingerPads.js  " + LR_posL);
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

function get_user_settings() {
	Ti.API.info("get_user_settings CALLED");

	Ti.App.addEventListener('From_Settings_Twist', function(e) {
		Ti.API.info("Twist  sent by app=" + e.Twist);
		Twist = e.Twist;
		alert("got one");
	});

	Ti.App.addEventListener('From_Settings_LR_posP', function(e) {
		Ti.API.info("LR_posP  sent by app=" + e.LR_posP);
		LR_posP = e.LR_posP;
	});

	Ti.App.addEventListener('From_Settings_LR_posL', function(e) {
		Ti.API.info("LR_posL  sent by app=" + e.LR_posL);
		LR_posL = e.LR_posL;
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
	Ti.API.info("get_user_settings ENDED OK");

}
