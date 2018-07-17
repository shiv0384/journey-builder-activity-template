define([
    'postmonger'
], function(
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var payload = {};
    var lastStepEnabled = false;
	var steps = [ // initialize to the same value as what's set in config.json for consistency
				{ "label": "Configure Activity", "key": "Configure Activity" },
        
				];
	var currentStep = steps[0].key;

    $(window).ready(onRender);
	connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    
	
	connectin.on('clickedNext',save);
	function onRender(){
	//jb will respond the first time ready is called with initactivity
	connection.trigger('ready')
	connection.trigger('requestTokens');
	connection.trigger('requestEndpoints');
	}
	function initialize(data) {
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log(inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }
	function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }
	function save() {
	//sms code through in jquery
	var d1={
					"strMobileNumber":"8452881510",
					"strTxtMsg":"Text message for open data source "
		 };
		   var d2=$("#email").val();
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
		   data: JSON.stringify(d1),
	     beforeSend : function( xhr ) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + tokendata);
			},
		 success:function(result,status){
		 alert(result);
		 },
		 error:function(res){
		 alert("Error");
		 
		 } 

		 });	
	//--------------------------------
          payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
			"firstName": "{{Contact.Attribute.SendSmsTestData.FirstName}}",
			"lastName": "{{Contact.Attribute.SendSmsTestData.EmailAddress}}",
            		"phoneNumber": "{{Contact.Attribute.SendSmsTestData.PhoneNumber}}"
        }];
        
        payload['metaData'].isConfigured = true;

        console.log(payload);
        connection.trigger('updateActivity', payload);
    }


});
	
