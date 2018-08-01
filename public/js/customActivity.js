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



function save() { //SAVE FUNCTION
    console.log('save');
    connection.trigger('requestSchema'); //NOT SHOWN IN CONSOLE

    console.log("DE NAME " + deName);
    payload['arguments'] = payload['arguments'] || {};
    payload['arguments'].execute = payload['arguments'].execute || {};

    payload['arguments'].execute.inArguments = [{
        "phoneNumber": "{{Contact.Attribute."+ deName +".[\"PhoneNumber\"]}}",
        "EmailAddress": "{{Contact.Attribute." + deName +".EmailAddress}}"
  
    }];

    payload['metaData'] = payload['metaData'] || {};
    payload['metaData'].isConfigured = true;
    //console.log(JSON.stringify(payload));
    connection.trigger('updateActivity', payload);
}

connection.on('requestedSchema', function (data) {    //CONNECTION ON
    // save schema
    console.log('*** Schema ***', JSON.stringify(data['schema']));
    let schema = JSON.stringify(data['schema']);
});
connection.on('initActivity', initialize);
connection.on('clickedNext', onClickedNext);
connection.on('clickedBack', onClickedBack);
connection.on('gotoStep', onGotoStep);
});
