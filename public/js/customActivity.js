define([
    'postmonger'
], function (
    Postmonger 
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

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
	var deFields = [];
function requestedInteractionHandler (settings) {
		try {
			eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
			$('#select-entryevent-defkey').val(eventDefinitionKey);

			if (settings.triggers[0].type === 'SalesforceObjectTriggerV2' &&
					settings.triggers[0].configurationArguments &&
					settings.triggers[0].configurationArguments.eventDataConfig) {

				// This workaround is necessary as Salesforce occasionally returns the eventDataConfig-object as string
				if (typeof settings.triggers[0].configurationArguments.eventDataConfig === 'stirng' ||
							!settings.triggers[0].configurationArguments.eventDataConfig.objects) {
						settings.triggers[0].configurationArguments.eventDataConfig = JSON.parse(settings.triggers[0].configurationArguments.eventDataConfig);
				}

				settings.triggers[0].configurationArguments.eventDataConfig.objects.forEach((obj) => {
					deFields = deFields.concat(obj.fields.map((fieldName) => {
						return obj.dePrefix + fieldName;
					}));
				});

				deFields.forEach((option) => {
					$('#select-id-dropdown').append($('<option>', {
						value: option,
						text: option
					}));
				});

				$('#select-id').hide();
				$('#select-id-dropdown').show();
			} else {
				$('#select-id-dropdown').hide();
				$('#select-id').show();
			}
		} catch (e) {
			console.error(e);
			$('#select-id-dropdown').hide();
			$('#select-id').show();
		}
	}
    function save() {
       
              payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "FirstName": "{{Contact.Attribute.sendSmsData.FirstName}}",
            "LastName": "{{Contact.Attribute.sendSmsData.LastName}}",
            "PhoneNumber": "{{Contact.Attribute.sendSmsData.PhoneNumber}}",
             "EmailAddress": "{{Contact.Attribute.sendSmsData.EmailAddress}}"
           
        }];
       
        payload['metaData'].isConfigured = true;
	    debugger;
        var d1={
					"strMobileNumber":"8452881510",
					"strTxtMsg":"Dear shiv SMS for without click with journey "
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
			 connection.trigger('updateActivity', payload);
		 },
		 error:function(res){
		 console.log("Error");
		 
		 } 

		 });
      
       
    }
connection.on('requestedInteraction', requestedInteractionHandler);

});
