// a single file that includes a set of common javascript libraries...

var TEAGUE_PROTO_VER = "12.02.07";

function includeJavaScript(jsFile)
{
  document.write('<script src="' + jsFile + '"></scr'+'ipt>'); 
}


/* So we can mix debug code in and not worry... */
/*if (!window.console) {
    window.console = {
	log: function () {},
	group: function () {},
	error: function () {},
	warn: function () {},
	groupEnd: function () {}
    };
}
*/
// super helpful for getting/setting styles directly.
function getStyle(el, style) {
	if(!document.getElementById) return;
	var value = el.style[style];
	if(!value)
		if(document.defaultView)
			value = document.defaultView.getComputedStyle(el, "").getPropertyValue(style);
		else if(el.currentStyle)
			value = el.currentStyle[style];
	return value;
}
function setStyle(el, style, value) {
	el.style[style] = value;
}
// sugared syntax for: document.getElementById(elName);
function did(elName){
	var el = document.getElementById(elName);
	if(el === null || el === undefined){
		console.warn("did: Tried to get undefined element. Name=" + elName);
	}
	return el;
}

// add files like this...
//includeJavaScript("./js/javascript-Lib.js");

// JQuery: tons of helpful functions, although the syntax can get a bit funky.. $("search pattern"), etc.
// includeJavaScript("./js/jquery-1.9.1.js");

// allow multitouch based on mouse events (works with iphone, safari, and chrome).
// includeJavaScript("./js/multitouch-fake.js");

// simplify multitouch using classes and handling common touch functionality.
includeJavaScript("./js/multitouch-simplifier.js");

// HTML5 utils
includeJavaScript("./js/h5utils.js");

// Google Maps API
//includeJavaScript("http://maps.google.com/maps/api/js?sensor=false");

// simplified navigation functionality
//includeJavaScript("./js/nav-simplifier.js");

//console.log("Loaded TeagueProto.js >> version " + TEAGUE_PROTO_VER);
