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
				{ "label": "Step 1", "key": "step1" },
        
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
          payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
			"firstName": "{{Contact.Attribute.PostcardJourney.FirstName}}",
			"lastName": "{{Contact.Attribute.PostcardJourney.EmailAddress}}",
            "phoneNumber": "{{Contact.Attribute.PostcardJourney.PhoneNumber}}"
        }];
        
        payload['metaData'].isConfigured = true;

        console.log(payload);
        connection.trigger('updateActivity', payload);
    }


});
	
