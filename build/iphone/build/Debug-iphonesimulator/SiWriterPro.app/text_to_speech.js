'use strict';

var utterance = require('bencoding.utterance'),
	speech = utterance.createSpeech();

speech.addEventListener('started',function(d){
	Ti.API.info(JSON.stringify(d));
});
speech.addEventListener('completed',function(d){
	Ti.API.info(JSON.stringify(d));
});
speech.addEventListener('paused',function(d){
	Ti.API.info(JSON.stringify(d));
});
speech.addEventListener('canceled',function(d){
	Ti.API.info(JSON.stringify(d));
});
speech.addEventListener('continued',function(d){
	Ti.API.info(JSON.stringify(d));
});




//win1.add(playButton);

// playButton.addEventListener('click',function(){
// 	
	// if(speech.isSpeaking){
		// Ti.API.info("already speaking");
	// }
// 	
	// // speech.startSpeaking({
		// // text:last_word
	// // });	
			// Ti.UI.Clipboard.setText(contentTyped);
			// contentTyped = "";
			// txtViewDesc.value = contentTyped;
// });

var pauseButton = Ti.UI.createButton({
	bottom:10, title:"Pause", left:60, width:50, height:50
});
//win1.add(pauseButton);

pauseButton.addEventListener('click',function(){
	
	if(!speech.isSpeaking){
		Ti.API.info("Nothing to pause, press play first");
		return;
	}	
	speech.pauseSpeaking();	
});

var continueButton = Ti.UI.createButton({
	bottom:10, title:"Continue", left:110, width:80, height:50
});
//win1.add(continueButton);

continueButton.addEventListener('click',function(){
	
	if(speech.isSpeaking){
		Ti.API.info("Already speaking, nothing to continue");
		return;
	}	
	speech.continueSpeaking();	
});

var stopButton = Ti.UI.createButton({
	bottom:10, title:"Stop", left:190, width:50, height:50
});
//win1.add(stopButton);

stopButton.addEventListener('click',function(){
	
	if(!speech.isSpeaking){
		Ti.API.info("nothing to stop, press play first");
		return;
	}	
	speech.stopSpeaking();	
});

win1.addEventListener('open',function(){
	if(!utterance.isSupported()){
		alert("sorry you need iOS7 or greater");
	}
});

