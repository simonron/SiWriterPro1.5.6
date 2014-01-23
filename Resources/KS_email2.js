
function CheckEmailaddress(){
current_email=aTextField.value;
}

function emailCurrentText() {  
  	 emailButton.removeEventListener('click', emailCurrentText);
  	 emailButton.addEventListener('click', emailCurrentText);
  var emailDialog = Titanium.UI.createEmailDialog();
emailDialog.subject = "SiWriter "+new Date;
emailDialog.toRecipients = [aTextField.value];

emailDialog.messageBody = "Message written: "+new Date +"\n\n\n"+txtViewDesc.value;
        emailDialog.setHtml(false);
        emailDialog.setBarColor('#336699');

    emailDialog.removeEventListener('complete',function(email){});
    emailDialog.addEventListener('complete',function(email)
    {
        if (email.result == emailDialog.SENT)
        {
           alert("message was sent");      
        }else{
            alert("message was not sent.");
        }
    });
    emailDialog.open();
    }
