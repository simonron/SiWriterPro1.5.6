			var keyState       = 0;
			var keysToUseState = 0;
			var symbol	=	0; // first click happens to hit k5
			var Key = 0;
			var Caps = 0;
			var Start=1;
			var delKey=0;
			var keyboardShown = false;
			var Num_lock=false;
			var Nums=0;
			var Caps=0;
			var Caps_lock=false;	
			var readKeys = false;
			var keyMap = [  //The array that holds he key codes that are sent to the screen as inner HTML content
				'_', // nothing pressed.
				'spc', //1
				'e', //2
				'i', //3
				'o', // 4 //
				'c',//5
				'a',//6
				'd',//7
				's', // 8 //
				'k', //9
				't',//10
				'r',//11
				'n', // 12
				'y',//13
				'.',//14
				'f',//15
				'u', // 16 //
				'h',  //17
				'v', //18
				'l',  // 19 
				'q', // 20//
				'z', //21
				'CR', // 22 
				"'",//23
				'g', // 24 //
				'j', //25
				',', //26
				'w', //27
				'b', // 28 //
				'x',//29
				'm',//30
				'p', // everything pressed (cancel).31
				
				
				'_', // nothing pressed.0 / 32
				'spc', //33
				'E', //
				'I', //
				'O', // 4 //36
				'C',
				'A',//
				'D',//
				'S', // 8 //40
				'K', //
				'T',//
				'R',
				'N', // 12 44
				'Y',//
				'!',//
				'F',//
				'U', // 16 //48
				'H',  //
				'V', //
				'L',  //  
				'Q', // 20//52
				'Z', //
				'CR', //  
				"'",
				'G', // 24 //56
				'J', //
				',', //
				'W', //
				'B', // 28 //60
				'X',
				'M',
				'P', // everything pressed (cancel).63
				
				//NUMBERS
				
				'_', // nothing pressed. 64
				'1', //1
				'€', //2
				'2', //3
				'⋅', // 4 //68
				'0',//5
				'',//6
				'3',//7
				'$', // 8 /72/104
				'', //9
				'∞',//10
				'',//11
				'', // 12  76
				'¥',//13
				'.',//14
				'4',//15
				'', // 16 //80
				'6',  //17
				'÷', //18
				'£',  // 19 
				'', // 20//84
				'¢', //21
				'CR', //22  
				'"',//23
				'§', // 24 //88
				'7', //25
				',', //26
				'9', //27
				'', // 28 //92
				'8',//29
				'',//30
				'5', // everything pressed (cancel).95
				
				//SYMBOLS
				
				'_', // nothing pressed. 96 
				'>:(', // 97
				'=', //98
				'<', //99
				' (-: ', // 4 //100
				'[', //101
				'@',//102
				'(',//103
				'$', // 8 //104
				'/', // 105
				'*',//106
				'&',//107
				'-', // 12  108
				'?',//109
				'.',//110
				'{',//111
				'^', // 16 //112
				'#',  //113
				'\\', //114
				'£',  // 115 
				']', // 20//116
				'%', //117
				'\n', //  118
				" :-0 ",//119
				'>', // 24 //120
				';', //121
				'º', //122
				':', //123
				')', // 28 //124
				'!',//125
				'}',//126
				'+'//127

			];

Ti.API.info("sw 161 Titanium.App.keyboardVisible="+Titanium.App.keyboardVisible);			


			var keyboardShown = false;
			var initialDownList = [];
			var activeTextContainer = null;
			
function setupKeys(){  // detects and acts on 'key' press.
				
				
				did("k0").onTouchDown = function(info){
					keyState |= (1<<0);
					$("#k0").addClass("chordKeyUp");
				};
				
				did("k0").onTouchUp = function(info){
					keyState &= ~(1<<0);
					$("#k0").removeClass("chordKeyUp");
				};
				did("k1").onTouchDown = function(info){
					keyState |= (1<<1);
					$("#k1").addClass("chordKeyUp");
				};
				
				did("k1").onTouchUp = function(info){
					keyState &= ~(1<<1);
					$("#k1").removeClass("chordKeyUp");
					//Ti.API.info("keyState="+keyState)
				};
				
				did("k2").onTouchDown = function(info){
					keyState |= (1<<2);
					$("#k2").addClass("chordKeyUp");
				};
				
				did("k2").onTouchUp = function(info){
					keyState &= ~(1<<2);
					$("#k2").removeClass("chordKeyUp");
				};
				
				did("k3").onTouchDown = function(info){
					keyState |= (1<<3);
					$("#k3").addClass("chordKeyUp");
				};
				
				did("k3").onTouchUp = function(info){
					keyState &= ~(1<<3);
					$("#k3").removeClass("chordKeyUp");
				};
				
				did("k4").onTouchDown = function(info){
					keyState |= (1<<4);
					$("#k4").addClass("chordKeyUp");
				};
				
				did("k4").onTouchUp = function(info){
					keyState &= ~(1<<4);
					$("#k4").removeClass("chordKeyUp");
				};
				
				// CAPS KEY CODES			
				did("k6").onTouchDown = function(info){
					$("#k6").addClass("chordKeyUp");
				};
				
				did("k6").onTouchUp = function(info){
					$("#k6").removeClass("chordKeyUp");
					$("#k6").addClass("CapsKeyUp");
								
					if (Caps==32){
					Caps_lock=!Caps_lock;
						if(Caps_lock==false){
							$("#k6").removeClass("CapsKeyUp");Caps=0;
						};
					}else{
						Caps=32;//Caps key
					};
					
					if ((Caps==32)&&(Caps_lock==true)){
						$("#k6").addClass("CapsKeyUpL");
					}else{$("#k6").removeClass("CapsKeyUpL");}
				
				if ((Nums==64)&&(Caps==32)){
						$("#Symbols").addClass("NumKeyUp");
					}else{$("#Symbols").removeClass("NumKeyUp");}
					
					
					if (((Nums==64)&&(Num_lock==true))  && ((Caps==32)&&(Caps_lock==true))){
						$("#Symbols").addClass("NumKeyUpL");
					}else{$("#Symbols").removeClass("NumKeyUpL");}		
					
				};
				
				
				// NUMS KEY CODES(*2)			

				did("k5").onTouchDown = function(info){
					$("#k5").addClass("chordKeyUp");
				};
				
				did("k5").onTouchUp = function(info){
					$("#k5").removeClass("chordKeyUp");
					$("#k5").addClass("NumKeyUp");
					
					if (Nums==64){
					Num_lock=!Num_lock;
						if(Num_lock==false){
							$("#k5").removeClass("NumKeyUp");Nums=0;
						};
					}else{
					Nums=64;//Number Shift
					};
					
					if ((Nums==64)&&(Num_lock==true)){
						$("#k5").addClass("NumKeyUpL");
					}else{$("#k5").removeClass("NumKeyUpL");}
				};	
			
			
				did("UpperNums").onTouchDown = function(info){
					$("#UpperNums").addClass("chordKeyUp");
				};
				
				did("UpperNums").onTouchUp = function(info){
					$("#UpperNums").removeClass("chordKeyUp");
					$("#UpperNums").addClass("NumKeyUp");
					
					if (Nums==64){
					Num_lock=!Num_lock;
						if(Num_lock==false){
							$("#UpperNums").removeClass("NumKeyUp");Nums=0;
						};
					}else{
					Nums=64;//Number Shift
					};
					
					if ((Nums==64)&&(Num_lock==true)){
						$("#UpperNums").addClass("NumKeyUpL");
					}else{$("#UpperNums").removeClass("NumKeyUpL");}
					
					if ((Nums==64)&&(Caps==32)){
						$("#Symbols").addClass("NumKeyUp");
					}else{$("#Symbols").removeClass("NumKeyUp");}
					
				if (((Nums==64)&&(Num_lock==true))  && ((Caps==32)&&(Caps_lock==true))){
						$("#Symbols").addClass("NumKeyUpL");
					}else{$("#Symbols").removeClass("NumKeyUpL");}			
					
				};	
				
				
				// SYMBOLS KEY CODES - for the single key
					did("Symbols").onTouchDown = function(info){
					$("#Symbols").addClass("chordKeyUp");
				};
				
				did("Symbols").onTouchUp = function(info){
					$("#Symbols").removeClass("chordKeyUp");
					$("#Symbols").addClass("NumKeyUp");
					//Caps bit
					$("#k6").removeClass("chordKeyUp");
					$("#k6").addClass("CapsKeyUp");
								
					if (Caps==32){
					Caps_lock=!Caps_lock;
						if(Caps_lock==false){
							$("#k6").removeClass("CapsKeyUp");Caps=0;
						};
					}else{
						Caps=32;//Caps key
					};
					
					if ((Caps==32)&&(Caps_lock==true)){
						$("#k6").addClass("CapsKeyUpL");
					}else{$("#k6").removeClass("CapsKeyUpL");}
					
					
					$("#UpperNums").removeClass("chordKeyUp");
					$("#UpperNums").addClass("NumKeyUp");
					
					if (Nums==64){
					Num_lock=!Num_lock;
						if(Num_lock==false){
							$("#UpperNums").removeClass("NumKeyUp");Nums=0;
						};
					}else{
					Nums=64;//Number Shift
					};
					
					if ((Nums==64)&&(Num_lock==true)){
						$("#UpperNums").addClass("NumKeyUpL");
					}else{$("#UpperNums").removeClass("NumKeyUpL");}
				
					if ((Nums==64)&&(Caps==32)){
						$("#Symbols").addClass("NumKeyUp");
					}else{$("#Symbols").removeClass("NumKeyUp");}
			
			
					if (((Nums==64)&&(Num_lock==true))  && ((Caps==32)&&(Caps_lock==true))){
						$("#Symbols").addClass("NumKeyUpL");
					}else{$("#Symbols").removeClass("NumKeyUpL");}
								
				};	
				
				
				
				
				
				
				
				
				
				
					// DEL KEY CODES			

				did("k7").onTouchDown = function(info){  // Set Delete flag
					$("#k7").addClass("chordKeyUp");
				};
				
				did("k7").onTouchUp = function(info){
					$("#k7").removeClass("chordKeyUp");
					DEL=1;
				};
			}
					

function focusTFC(el){ // gives focus something to change content display - ie key tops
				if(keyboardShown){
					return;
				}
				activeTextContainer = el;
				$(".textCursor").html("&nbsp;");
				$(".tfcSelected").removeClass("tfcSelected");
				$(el).children(".textCursor").html("_");
				$(el).addClass("tfcSelected");
				
				$(".chordKey").stop().css({opacity: 1}).fadeIn(250, function(){
					keyboardShown = true;
					processKeyDown();
				});
				$(".chordKey").each(function(index, el){
					el.onTouchUp(null);
				});


				$(".chordKeyx").stop().css({opacity: 1}).fadeIn(250, function(){
					keyboardShown = true;
					processKeyDown();
				});
				$(".chordKeyx").each(function(index, el){
					el.onTouchUp(null);
				});
							
				drawHelpers();
			}

function unselectAllTFC(){

			}
			
function getTotalKeysDown(){
				var count = 0;
				for(var i=0; i<8; i++){
					if((keyState & (0x0001<<i)) == 0){ // swap for inversion
						count++;
					}
				}
					//Ti.API.info("count="+count)

				return count; 
			}
			
function resetKeysToUseState(){
				keysToUseState = 0;
	
			}
			
function setWindshield(html){
				$("#kWindshield").html(html);
			};
			
function processKeyDown(){
				if(!keyboardShown){
					return;	
				}
				
				console.log(keyState);
		
				var dn = getTotalKeysDown();
					
				if(readKeys){ 
					if(dn == 8){
						var TextFocusArea = $(activeTextContainer).children(".textField")[0];
						// SEND THE KEY!
						var s = getKeyToUse(keysToUseState);
						// reset the keysToUse.
						
						resetKeysToUseState();
						drawHelpers();
						if(s == 'spc'){
							s = ' ';
						}
												
						if(s == 'CR'){
							s = '\n';
						}
						
// *************** DELETE SECTION *****************************
	if(DEL==1){ s='\b_';	
									
		//TextFocusArea.innerHTML = TextFocusArea.innerHTML.substring(0, TextFocusArea.innerHTML.length-2);
		//does html del					
	//s="\b\b\b\b";
	DEL=0;
	//("!!");
	//Ti.App.fireEvent('webviewEvent', {text: s}); 
		//sends update chrd letters to JAVASCRIPT SIWRITER OUTPUT text area 
	
							
				}
// *************** END DELETE SECTION *****************************
						
						
if(s != "_" && s != "..."){ //if buttons are released and they have something to say - send it...
	

	Ti.App.fireEvent('webviewEvent', {text: s});//carat symbol(no longer) added

		//webviewEvent(s+"_");
		//Ti.App.fireEvent('webviewEvent', {text: s});//NO carat symbol

		
		////////last key action held or reset here/////////
				Nums=0;Caps=0; 
				if(symbol==1) {symbol=0;}; 
					$("#k6").removeClass("CapsKeyUp");
				    $("#k5").removeClass("NumKeyUp");
					$("#UpperNums").removeClass("NumKeyUp");
					$("#Symbols").removeClass("NumKeyUp");			
			if(Num_lock==true) {Nums=64;$("#k5").addClass("NumKeyUp");}
			if(Num_lock==true) {Nums=64;$("#UpperNums").addClass("NumKeyUp");}
			
			if(Caps_lock==true){Caps=32;$("#k6").addClass("CapsKeyUp");}
			
			if((Caps_lock==true)&&(Num_lock==true)){
				Caps=32;$("#k6").addClass("CapsKeyUp");
				Nums=64;$("#k5").addClass("NumKeyUp");
				$("#Symbols").addClass("NumKeyUp");	
				}else{$("#Symbols").removeClass("NumKeyUp");}
			
		// ***************clears green state of buttons *****************************
}
	}	
				}
				
				else  {
				
					if(dn == 8){
						//setWindshield("Ready.");
						resetKeysToUseState();
						readKeys = true;
						drawHelpers();
						$(".chordKey").removeClass("chordKeyWaiting");
						$(".chordKeyx").removeClass("chordKeyWaiting");
					}else{
						//setWindshield("Waiting for user...("+dn+"/8)");
					}
				}
				

					
			}

	////////////////////////////END MAIN SECTION/////////////////////////////////


			function processKeyUp(){
				//console.log(keyState);
				if(getTotalKeysDown() == 0){
					//setWindshield("Waiting for user...");
					resetKeysToUseState();
					readKeys = false;
					drawHelpers();
					$(".chordKeyUp").removeClass("chordKeyUp"); // changes 'key' visual state
					$(".chordKey").addClass("chordKeyWaiting"); // changes 'key' visual state
					$(".chordKeyx").addClass("chordKeyWaiting"); // changes 'key' visual state

				}else{
					for(var i=0; i<8; i++){
						if((keyState & (0x0001<<i)) != 0){ // swap for inversion
							keysToUseState |= (0x0001<<i);// determines the chord code
						}
					}
					

								
//Ti.API.info('**********************************//setWindshield='+setWindshield);

					drawHelpers();
				}
			}
						

function getKeyToUse(n){// function Looks at chord number and looks up then returns actal ascii character 

Key=Caps+Nums+n;
   		
			 if (Start==1){
			 	Start=0;
				Key = 0;
				n=32;
				$("#k6").removeClass("CapsKeyUp");
				$("#k5").removeClass("NumKeyUp");
				$("#UpperNums").removeClass("NumKeyUp");
				$("#Symbols").removeClass("NumKeyUp");
			 }
//////////////////////////////////////decides what to send////////////////////////////////////////////////////////////////////////////////////////		

				return keyMap[Math.min(keyMap.length-1, Math.max(0, Caps+Nums+n))]; 
				//return keyMap[Math.min(keyMap.length-1, Math.max(0, Key))]; 	

//////////////////////////////////////decides what to send////////////////////////////////////////////////////////////////////////////////////////		
}
					
function drawHelpers(){   //    Puts text on the 'keys' to show what they will return when pressed.
				//console.log("drawing helpers.");
				
				if(readKeys){
					
					var s = getKeyToUse(keysToUseState);
					if(s == 'spc'){
						s = '&rarr;';
					}
					if(s == 'CR'){
						s = '&darr;';
					}
					if(s == 'DEL'){
						s = '/b2';
					}

					if(DEL == 1){
						s = '/b1';
					}

	//Ti.API.info("s="+s); 
					$(activeTextContainer).children(".textCursor").html(s);
				}
				else 
				{
					$(activeTextContainer).children(".textCursor").html("*");
				}	


				for(var i=0; i<5; i++){
					if(!readKeys){
						$("#h"+i).html("...");
						continue;
					}
					
					var modKeyState = keysToUseState;
					if((modKeyState & (0x0001<<i)) == 0){
						// key has not been released yet...
						
						// 2 fingers...
						modKeyState = modKeyState | (0x0001<<i);
						var s = getKeyToUse(modKeyState);
						var html = "<b>"+s+"</b>";
						for(var j=1; j<5; j++){
							if(j != i && (modKeyState & (0x0001<<j)) == 0){
								var modKeyState2 = modKeyState | (0x0001<<j);
								s = getKeyToUse(modKeyState2);
								if(s != "..."){
									html += " "+s;
								}
							}
						}
						// 3 fingers...
						modKeyState = keysToUseState | (0x0001<<i);
						for(var j=1; j<5; j++){
							if(j != i && (modKeyState & (0x0001<<j)) == 0){
								var modKeyState2 = modKeyState | (0x0001<<j);
								for(var k=j+1; k<5; k++){
									if(k != i && k != j && (modKeyState2 & (0x0001<<k)) == 0){
										var modKeyState3 = modKeyState2 | (0x0001<<k);
										s = getKeyToUse(modKeyState3);
										if(s != "..."){
											html += " "+s;
										}
									}
								}
							}
						}
						// 4 fingers...
						modKeyState = keysToUseState | (0x0001<<i);
						for(var j=1; j<5; j++){
							if(j != i && (modKeyState & (0x0001<<j)) == 0){
								var modKeyState2 = modKeyState | (0x0001<<j);
								for(var k=j+1; k<5; k++){
									if(k != i && k != j && (modKeyState2 & (0x0001<<k)) == 0){
										var modKeyState3 = modKeyState2 | (0x0001<<k);
										for(var m=k+1; m<5; m++){
											if(m != i && m != j && m != k && (modKeyState3 & (0x0001<<m)) == 0){
												var modKeyState4 = modKeyState3 | (0x0001<<m);
												s = getKeyToUse(modKeyState4);
												if(s != "..."){
													html += " "+s;
												}
											}
										}	
									}
								}
							}
						}
						// write it :)
						$("#h"+i).html(html);
					}else{
						var s = getKeyToUse(keysToUseState);
						var html = "<b>"+s+"</b>";
						$("#h"+i).html(html);
					}
				}
			}
			
				/***************************************************************************************************/
	

			function touchStart(e){
				processKeyUp();
			}

			function touchEnd(e){
			processKeyDown();
			}
			
			function touchCancel(e){
			touchEnd(e);
			}
			


