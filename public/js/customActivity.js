debugger;
        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "phoneNumber": "{{Contact.Attribute.SmsJourney.PhoneNumber}}",
             "emailAddress": "{{Contact.Attribute.SmsJourney.EmailAddress}}"
           
        }];
	    
	  var phone="8452881510";
        var phonemsgdata={
				"strMobileNumber":phone,
				"strTxtMsg":"Test message for sms"
				};
	  console.log(phonemsgdata);
	     console.log(phone);
	    alert(phonemsgdata);
				debugger;
				var tokendata;
				$.ajax({

				url:"https://login.salesforce.com/services/oauth2/token?client_id=3MVG9sG9Z3Q1RlbeZ3x_5JrzSFxlATWV7amV.1PtetznXcMooCQBQHBf6YgcAQDJtSy317Zpo4kevq_65cbGI&client_secret=5906482776105122251&username=pavani.jidagam@opensms.com&password=Appshark7&grant_type=password ",
				method:"post",
				dataType:"json",
				cache:false,
				async:false,
				success:function(result){
				tokendata= result.access_token;
				},
				error:function(){
				console.log("error");
				} 

				});
				//Value of the text box 
				$.ajax({
				url: "https://appsharkopenmsg-developer-edition.na24.force.com/services/apexrest/OpenSMSPro/MarketingCloudSendSMS",
				method: "post",
				async: false,
				contentType: "application/json",	
				data: JSON.stringify(phonemsgdata),
				beforeSend : function( xhr ) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + tokendata);
				},
				success:function(result,status){
				connection.trigger('ready');	 
				},
				error:function(res){
				console.log("Error");

				} 

				});
       
		    
   

