// var win = Titanium.UI.createWindow({
    // backgroundColor : '#fff'
// });
//  
// var txtViewDesc = Titanium.UI.createTextArea({
    // color : '#333',
    // backgroundColor : '#ddd',
    // borderRadius : 5,
    // value : 'Press the Microphone Button!',
    // height : 300,
    // width : 300,
    // top : 10,
    // visible : true
// });
// win.add(txtViewDesc);
 
// load custom module for base64 encoding
// http://blog.clearlyinnovative.com/post/9546524557/titanium-appcelerator-quickie-base64encode-ios-module
//var utils = require('com.clearlyinnovative.utils');
 
// load custom module for base64 encoding
// http://blog.clearlyinnovative.com/post/9546524557/titanium-appcelerator-quickie-base64encode-ios-module
//var utils = require('com.clearlyinnovative.utils');
//Ti.API.info("module is => " + utils);

// remove line breaks
function removeNL(s) {
    return s.replace(/(\r\n|\n|\r)/gm, "");
}
 
function sendData(file) {
 
    var f = Ti.Filesystem.getFile(file.path);
 var encoded_audio = Titanium.Utils.base64encode(f.read());
  
    var data_to_send = {
        "apikey" : "developerdemokeydeveloperdemokey",
        "action" : "recognize",
        "freeform" : "1",
        "content-type" : "audio/x-wav",
        "output" : "json",
        "audio" : removeNL(String(encoded_audio))
    };
 
    var data_string = JSON.stringify(data_to_send);
    xhr = Titanium.Network.createHTTPClient();
    xhr.setRequestHeader("Content-Type", "text/plain; charset=utf-8");
    xhr.open("POST", "http://api.ispeech.org/api/json");
    xhr.send(data_string);
 
    xhr.onload = function() {
        var result = JSON.parse(this.responseText);
        if(result.text == null) {
            txtViewDesc.value = "Please try again!";
        } else {
            txtViewDesc.value = result.text;
        }
        Ti.API.info(this.responseText);
    };
}
 
 
Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAY_AND_RECORD;
var recording = Ti.Media.createAudioRecorder();
recording.compression = Ti.Media.AUDIO_FORMAT_LINEAR_PCM;
recording.format = Ti.Media.AUDIO_FILEFORMAT_WAVE;
 
Ti.Media.addEventListener('recordinginput', function(e) {
    Ti.API.info('Input availability changed: ' + e.available);
    if(!e.available && recording.recording) {
        b1.fireEvent('click', {});
    }
});
var file;
var sound;
 
var button = Titanium.UI.createButton({
    title:'Start Recording',
    width : 128,
    height : 128,
    bottom : 10,
    left :200,
});
button.addEventListener('click', function() {
    if(recording.recording) {
        button.title = 'Start Recording';
        file = recording.stop();
        Ti.Media.stopMicrophoneMonitor();       
        sendData(file);
    } else {
        if(!Ti.Media.canRecord) {
            Ti.UI.createAlertDialog({
                title : 'Error!',
                message : 'No audio recording hardware is currently connected.'
            }).show();
            return;
        }
        button.title = "Stop Recording";
        recording.start();
        Ti.Media.startMicrophoneMonitor();
 
    }
});
win1.add(button);
 
