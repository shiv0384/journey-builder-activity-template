define([
    'postmonger'
], function (
    Postmonger 
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
	$(window).ready(onRender);
	connection.on('initActivity', initialize);
	 connection.on('requestedTokens', onGetTokens);
	
	       
	 connection.on('clickedNext', save);
	 function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
 
    }
	function initialize(data) {
       var phone="{{Contact.Attribute.SmsJourney.PhoneNumber}}"
        var phonemsgdata={
				"strMobileNumber":phone,
				"strTxtMsg":"Test message for sms"
				};
	  console.log(phonemsgdata);
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
    }
	function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

	function save() {
		 phonemsgdata['metaData'].isConfigured = true;
       console.log(phonemsgdata);
	connection.trigger('updateActivity', phonemsgdata);
	console.log("sent");
	}

});
