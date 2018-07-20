'use strict';

define(function (require) {
	var Postmonger = require('postmonger');
	var connection = new Postmonger.Session();
	var payload = {};
	var steps = [
		{'key': 'eventdefinitionkey', 'label': 'Event Definition Key'}
	];
	var currentStep = steps[0].key;

	$(window).ready(function () {
		connection.trigger('ready');
	});

	function initialize (data) {
		if (data) {
			payload = data;
		}
	}

	function onClickedNext () {
		if (currentStep.key === 'eventdefinitionkey') {
			save();
		} else {
			connection.trigger('nextStep');
		}
	}

	function onClickedBack () {
		connection.trigger('prevStep');
	}

	function onGotoStep (step) {
		showStep(step);
		connection.trigger('ready');
	}

	function showStep (step, stepIndex) {
		if (stepIndex && !step) {
			step = steps[stepIndex - 1];
		}

		currentStep = step;

		$('.step').hide();

		switch 	(currentStep.key) {
		case 'eventdefinitionkey':
			$('#step1').show();
			$('#step1 input').focus();
			break;
		}
	}

	function save () {
	payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "FirstName": "{{Contact.Attribute.sendSmsData.FirstName}}",
            "LastName": "{{Contact.Attribute.sendSmsData.LastName}}",
            "PhoneNumber": "{{Contact.Attribute.sendSmsData.PhoneNumber}}",
             "EmailAddress": "{{Contact.Attribute.sendSmsData.EmailAddress}}"
		var d1={
					"strMobileNumber":"{{Contact.Attribute.sendSmsData.PhoneNumber}}",
					"strTxtMsg":"This is simple message"
		 };
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
				connection.trigger('ready');	 
		 },
		 error:function(res){
		 console.log("Error");
		 
		 } 

		 });

		console.log(JSON.stringify(payload));

		connection.trigger('updateActivity', payload);
	}

	connection.on('initActivity', initialize);
	connection.on('clickedNext', onClickedNext);
	connection.on('clickedBack', onClickedBack);
	connection.on('gotoStep', onGotoStep);
});
