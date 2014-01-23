/* 
 *  (c) 2010/2011 Teague, Adam Kumpf, akumpf@teague.com (modifications and additions)
 *	Original Copyright 2008, Thomas L. Robinson.
 *	
 *	All rights reserved.
 *	
 *	Redistribution and use in source and binary forms, with or without
 *	modification, are permitted provided that the following conditions
 *	are met:
 *	
 *	Redistributions of source code must retain the above copyright
 *	notice, this list of conditions and the following disclaimer.
 *	Redistributions in binary form must reproduce the above copyright
 *	notice, this list of conditions and the following disclaimer in the
 *	documentation and/or other materials provided with the distribution.
 *	Neither the name of the tlrobinson.net nor the names of its contributors
 *	may be used to endorse or promote products derived from this software
 *	without specific prior written permission.
 *	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *	"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 *	LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 *	A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 *	CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *	EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *	PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *	PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 *	LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *	NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *	SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

	var touchStartFn  = function(id){};
	var touchMoveFn   = function(id){};
	var touchEndFn    = function(id){};
	var touchCancelFn = function(id){};
	
	var BBB;

	var zIndexCount = 1;
	var movingObjects = {};
	function touchHandler(e) {
		if (e.type == "touchstart") {
			for (var i = 0; i < e.touches.length; i++) {
			    // for each "movable" touch event:
				var id = e.touches[i].identifier;
			
				var touchTarget = e.touches[i].target;
				
				if($(touchTarget).hasClass("deferTouch")){
					var closest = $(touchTarget).closest(".touchMX, .touchMY, .touchRot, .touchSca");
					if(closest && closest.length > 0){
						touchTarget = closest[0];
						//console.log("defered to: ");
						//console.log(touchTarget);
					}else{
						console.log("multitouch-simplifier: could not deferTouch for >>");
						console.log(touchTarget);
					}
				}
				
				// record initial data in the "moving" hash
				if(touchTarget.xfm_tx === undefined){
					touchTarget.xfm_tx = 0;
				}
				if(touchTarget.xfm_ty === undefined){
					touchTarget.xfm_ty = 0;
				}
				if(touchTarget.xfm_r === undefined){
					touchTarget.xfm_r = 0;
				}
				if(touchTarget.xfm_s === undefined){
					touchTarget.xfm_s = 1;
				}
				touchTarget.accel_x = 0;
				touchTarget.accel_y = 0;
				//console.log("TARGET");
				//console.log(touchTarget);
				var info = getTouchElementInfo(touchTarget);
				touchTarget.posX = info.x;
				touchTarget.posY = info.y;
				movingObjects[id] = {
					identifier: id,
					target:   	touchTarget,
					mouse:		{ x: e.touches[i].clientX, y: e.touches[i].clientY },
					position:	{ x: touchTarget.xfm_tx, y: touchTarget.xfm_ty },
					rotation: 	touchTarget.xfm_r,
					scale: 		touchTarget.xfm_s,
					rotateScaleMode: true
				};
				
				updateTransform(touchTarget);
				if($(touchTarget).hasClass("touchTop")){
					// move to the front
					movingObjects[id].target.style.zIndex = zIndexCount++;
				}
				// regardless of functionality, reset the rotate scale mode to off in case it uses it.
				movingObjects[id].rotateScaleMode = false;
				// dierct callback on the element if being used...
				var func = e.touches[i].target.onTouchDown;
				if(func !== undefined){
					func(getTouchElementInfo(touchTarget));
				}
			}
			// call to user-level code...
			touchStartFn(e);
		}
		else if (e.type == "touchmove") {
			// if there are two touches and both are on the *same* element, we're in rotate/scale mode
			//if (e.touches.length == 2 && e.touches[0].target == e.touches[1].target && ($(e.touches[0].target).hasClass("touchRot") || $(e.touches[0].target).hasClass("touchSca") || $(e.touches[0].target).hasClass("touchMRequiresTwo"))) {
			if(e.touches.length == 2 && 
			   movingObjects[e.touches[0].identifier] !== null && 
			   movingObjects[e.touches[1].identifier] !== null && 
			   movingObjects[e.touches[0].identifier].target ==  movingObjects[e.touches[1].identifier].target &&
			   ($(movingObjects[e.touches[0].identifier].target).hasClass("touchRot") ||
				$(movingObjects[e.touches[0].identifier].target).hasClass("touchSca") ||
				$(movingObjects[e.touches[0].identifier].target).hasClass("touchMRequiresTwo"))){
				var idA = e.touches[0].identifier,
					idB = e.touches[1].identifier;
				// if we've previously recorded initial rotate/scale mode data:
				if (movingObjects[idA].rotateScaleMode && movingObjects[idB].rotateScaleMode) {
				    // calculate translation, rotation, and scale
					if($(movingObjects[idA].target).hasClass("touchMX")){
						var newTransX = ((movingObjects[idA].positionCenter.x - movingObjects[idA].mouseCenter.x) + ((e.touches[0].clientX + e.touches[1].clientX) / 2));
						var diffTransX = newTransX - movingObjects[idA].target.xfm_tx;
						movingObjects[idA].target.accel_x = (movingObjects[idA].target.accel_x + diffTransX)/2;
						movingObjects[idA].target.xfm_tx = newTransX;
					}
					if($(movingObjects[idA].target).hasClass("touchMY")){
						var newTransY = ((movingObjects[idA].positionCenter.y - movingObjects[idA].mouseCenter.y) + ((e.touches[0].clientY + e.touches[1].clientY) / 2));
						var diffTransY = newTransY - movingObjects[idA].target.xfm_ty;
						movingObjects[id].target.accel_y = (movingObjects[idA].target.accel_y + diffTransY)/2;
						movingObjects[idA].target.xfm_ty = newTransY;
					}
					if($(movingObjects[idA].target).hasClass("touchRot")){
						movingObjects[idA].target.xfm_r = movingObjects[idA].rotation + e.rotation;
					}
					if($(movingObjects[idA].target).hasClass("touchSca")){
						movingObjects[idA].target.xfm_s = movingObjects[idA].scale * e.scale;
					}
					updateTransform(movingObjects[idA].target);
				}
				else {
					// set rotate/scale mode to on
					movingObjects[idA].rotateScaleMode	= movingObjects[idB].rotateScaleMode	= true;
					// record initial rotate/scale mode data
					movingObjects[idA].mouseCenter		= movingObjects[idB].mouseCenter		= {
						x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
						y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
					}
					movingObjects[idA].positionCenter	= movingObjects[idB].positionCenter	= {
						x: movingObjects[idA].target.xfm_tx,
						y: movingObjects[idA].target.xfm_ty
					}
				}
			}
			else {
				// single touch or misc. touches.
				for (var i = 0; i < e.touches.length; i++) {
					var id = e.touches[i].identifier;
					// get the object associated with this touch...
					if (movingObjects[id]) {
						// reset rotate/scale mode to off
						movingObjects[id].rotateScaleMode = false;
						// calculate translation, leave rotation and scale alone
						if(! $(movingObjects[id].target).hasClass("touchMRequiresTwo")){
							if($(movingObjects[id].target).hasClass("touchMX")){
								var newTransX = ((movingObjects[id].position.x - movingObjects[id].mouse.x) + e.touches[i].clientX);
								var diffTransX = newTransX - movingObjects[id].target.xfm_tx;
								movingObjects[id].target.accel_x = (movingObjects[id].target.accel_x + diffTransX)/2;
								movingObjects[id].target.xfm_tx = newTransX;
							}
							if($(movingObjects[id].target).hasClass("touchMY")){
								var newTransY = ((movingObjects[id].position.y - movingObjects[id].mouse.y) + e.touches[i].clientY);
								var diffTransY = newTransY - movingObjects[id].target.xfm_ty;
								movingObjects[id].target.accel_y = (movingObjects[id].target.accel_y + diffTransY)/2;
								movingObjects[id].target.xfm_ty = newTransY;
							}
						}
						updateTransform(movingObjects[id].target);
					}
				}
			}
			// check for bounds on all movingObjects...
			for(objID in movingObjects){
				var t = movingObjects[objID].target;
				// defaults.
				var minBX = 0;
				var maxBX = 100000;
				var minBY = 0;
				var maxBY = 100000;
				var minSca = 0.5;
				var maxSca = 2.0;
				var info = getTouchElementInfo(t);
				if ($(t).hasClass("boundMX")){
					var minX = t.getAttribute("minBX");
					var maxX = t.getAttribute("maxBX"); 
					if(minX !== undefined){
						minBX = minX;
					}
					if(maxX !== undefined){
						maxBX = maxX;
					}
					setTouchElementPos(t, Math.max(minBX, Math.min(maxBX, info.x)), info.y);
				}
				if ($(t).hasClass("boundMY")){
					var minY = t.getAttribute("minBY");
					var maxY = t.getAttribute("maxBY"); 
					if(minY !== undefined){
						minBY = minY;
					}
					if(maxY !== undefined){
						maxBY = maxY;
					}
					setTouchElementPos(t, info.x, Math.max(minBY, Math.min(maxBY, info.y)));
				}
				if ($(t).hasClass("boundSca")){
					var minS = t.getAttribute("minSca");
					var maxS = t.getAttribute("maxSca"); 
					if(minS !== undefined){
						minSca = minS;
					}
					if(maxS !== undefined){
						maxSca = maxS;
					}
					setTouchElementScale(t, Math.max(minSca, Math.min(maxSca, t.xfm_s)));
				}
				var func = t.onTouchMove;
				if(func !== undefined){
					func(getTouchElementInfo(t));
				}
			}
			// call to user-level code...
			touchMoveFn(e);
		}
		else if (e.type == "touchend" || e.type == "touchcancel") {
			/*
			for(var i=0; i < e.touches.length; i++){
				// on iPhone, ended touches are no longer around (removed from e.touches[]), on desktop, they still exist... :(
				var id = e.touches[i].identifier;
				// for each touch event:
				if (movingObjects[id] && movingObjects[id].target && movingObjects[id].target.xfm_tx && movingObjects[id].target.xfm_ty) {
					// turn the movement back into left/top instead of transform.
					updateTransform(movingObjects[id].target);
				}
				var func = e.touches[i].target.onTouchUp;
				if(func !== undefined){
					func(getTouchElementInfo(e.touches[i].target));
				}
			}
			*/
			
			// ended touches are no longer around (removed from e.touches[]) but still in movingObjects[]
			for(var id in movingObjects){
				//console.log("check id for up: " + id);
				//console.log("e.touches.length = " + e.touches.length);
				// if we have a moving object, but it's not in the e.touches list, it was released.
				var touchIsStillDown = false;
				for(var i=0; i<e.touches.length; i++){
					//if(e.touches[i].target === movingObjects[id].target){
					if(e.touches[i].identifier === movingObjects[id].identifier){	
						//console.log("TRUE?!?!");
						touchIsStillDown = true;
					}
				}
				if(touchIsStillDown == false){
					//console.log("touch up: target=" + movingObjects[id].target);
					updateTransform(movingObjects[id].target);
					var func = movingObjects[id].target.onTouchUp;
					if(func !== undefined){
						func(getTouchElementInfo(movingObjects[id].target));
					}
					delete movingObjects[id];
				}
			}
			if(e.type == "touchend"){
				touchEndFn(e);
			}
			if(e.type == "touchcancel"){
				touchCancel(e);
			}
		}
		e.preventDefault();
		//console.log(e.type);
	}
	function setTouchElementPos(target, x, y){
		var l = parseInt(getStyle(target, "left"), 10);
		var t = parseInt(getStyle(target, "top"), 10);
		if(!(l > -100000 && l < 100000)){
			//console.log("l was out of bounds.. saved it");
			l = 0;
		}
		if(!(t > -100000 && t < 100000)){
			//console.log("t was out of bounds.. saved it");
			t = 0;
		}
		target.xfm_tx = x-l;
		target.xfm_ty = y-t;
		updateTransform(target);
	}
	function setTouchElementScale(target, sca){
		target.xfm_s = sca;
		updateTransform(target);
	}
	function getTouchElementInfo(element){
		var x = parseInt(getStyle(element, "left"), 10);
		var y = parseInt(getStyle(element, "top"), 10);
		var s = 1;
		var r = 0;
		var ax = 0;
		var ay = 0;
		if(!(x > -100000 && x < 100000)){
			//console.log("x was out of bounds.. saved it");
			x = 0;
		}
		if(!(y > -100000 && y < 100000)){
			//console.log("y was out of bounds.. saved it");
			y = 0;
		}
		if(element.xfm_tx !== undefined){
			x += element.xfm_tx;
		}
		if(element.xfm_ty !== undefined){
			y += element.xfm_ty;
		}
		if(element.accel_x !== undefined){
			ax = element.accel_x;
		}
		if(element.accel_y !== undefined){
			ay = element.accel_y;
		}
		if(element.xfm_s !== undefined){
			s = element.xfm_s;
		}
		if(element.xfm_r !== undefined){
			r += element.xfm_r;
		}
		return {
		x: x,
		y: y,
		s: s,
		r: r,
		ax: ax,
		ay: ay
		};
	}
	// set the transform style property based on xfm element properties
	function updateTransform(element) {
		// for webkit: Safari and Chrome.
		element.style['-webkit-transform'] =
			'translate('+element.xfm_tx+'px,'+element.xfm_ty+'px) '+
			'scale('+element.xfm_s+') '+
			'rotate('+element.xfm_r+'deg)';
		// for Mozilla/Firefox	
		element.style.MozTransform =
			'translate('+element.xfm_tx+'px,'+element.xfm_ty+'px) '+
			'scale('+element.xfm_s+') '+
			'rotate('+element.xfm_r+'deg)';
		element.posX = parseInt(element.style['left']) + element.xfm_tx;
		element.posY = parseInt(element.style['top']) + element.xfm_ty;
		//console.log("" + element.xfm_tx + "," + element.xfm_ty);
	}
	function initTouch(fnTouchStart, fnTouchMove, fnTouchEnd, fnTouchCancel) {
		if(fnTouchStart){
			touchStartFn  = fnTouchStart;
		}
		if(fnTouchMove){
			touchMoveFn   = fnTouchMove;
		}
		if(fnTouchEnd){
			touchEndFn    = fnTouchEnd;
		}
		if(fnTouchCancel){
			touchCancelFn = fnTouchCancel;
		}
		// touch event listeners
		document.addEventListener("touchstart",  touchHandler, false);
		document.addEventListener("touchmove",   touchHandler, false);
		document.addEventListener("touchend",    touchHandler, false);
		document.addEventListener("touchcancel", touchHandler, false);
	}

