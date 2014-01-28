	function do_pad_LRpos() {

		Ti.API.info("variable update by user finger pads.js is :-LRpos =" + LRpos);

		if (HTMLorientation == 'portrait') {
			appContainer.style.margin = "0px 0px 0px " + LRposP + "px";
			LRpos = LRposP;
		}
		if (HTMLorientation == 'landscape') {
			appContainer.style.margin = "0px 0px 0px " + LRposL + "px";
			LRpos = LRposL;
		}
	};
	
	function do_pad_Gap() {

		k0.style.margin = "0px 0px 0px " + Gap + "px";
		k1.style.margin = "0px 0px 0px " + Gap + "px";
		k2.style.margin = "0px 0px 0px " + Gap + "px";
		k3.style.margin = "0px 0px 0px " + Gap + "px";
		k4.style.margin = "0px 0px 0px " + Gap + "px";
		k5.style.margin = "0px 0px 0px " + Gap + "px";
		k6.style.margin = "0px 0px 0px " + Gap + "px";

		Ti.API.info("variable update by user finger pads.js is :-Gap =" + Gap + " GapOffset = " + GapOffset);
		Ti.API.info("finger pads.js is :-Gap/10 =" + Gap / 10);

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

		// if ((Width > 300) || (Width < 0)) {
			// Width = 0;
		// }
		// Ti.API.info("finger pads.js is : Width = " + Width + " WidthP = " + WidthP + " WidthL = " + WidthL);

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

		Ti.API.info("UpDwnP = " + UpDwnP + " UpDwnL = " + UpDwnL + " HTMLorientation = " + HTMLorientation);

		Ti.API.info("UpDwn update by user finger pads.js is : UpDwn =" + UpDwn);
		if (HTMLorientation == 'portrait') {
			chordKeybaord.style.margin = UpDwnP + "px 0px 0px 0px";
			UpDwn = UpDwnP;
		}
		if (HTMLorientation == 'landscape') {
			chordKeybaord.style.margin = UpDwnL + "px 0px 0px 0px";
			UpDwn = UpDwnL;
		}

		Ti.API.info("HTMLorientation = " + HTMLorientation);

	}