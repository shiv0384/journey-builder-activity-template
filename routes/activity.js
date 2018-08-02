'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var util = require('util');
var http = require('https');
var axios = require('axios');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
       // alert("Save");
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {

        var aArgs = req.body.inArguments;
        var oArgs = {};
        for (var i=0; i<aArgs.length; i++) {
            for (var key in aArgs[i]) {
                oArgs[key] = aArgs[i][key];
          console.log('oArgs[key]:'+oArgs[key]);
            }
        }
        console.log('>>>>> req.body: ' + req.body );
        console.log('>>>>> req.body.inArguments: ' + req.body.inArguments );

        var phone = oArgs.phone;
        var email = oArgs.email;

        console.log('>>>>> phone: ' + phone );
        console.log('>>>>> email: ' + email );

let data = ({
            "destinations": [{
                                "correlationId": "MyCorrelationId",
                                "destination": "5511*********"
                            },
                            {
                                "correlationId": "MyCorrelationId",
                                "destination": "5511*********"
                            }],
            "message": {
                "messageText": "<Message here>",
            },

         });

    axios({
      method: 'post',
      url: "https://api-messaging.movile.com/v1/whatsapp/send",
      data: data,
      headers: {'UserName': 'test@test.com.br',
                'AuthenticationToken': '_token_here_',
                'Content-Type': 'application/json'}
    }).then( (res) => {
        console.log("Success -->" , res);
    } )
    .catch( (error) => {
        console.log("Erro --> ", error);
    } );

};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
   // alert("Publish");
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );

    logData(req);
    res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
   // alert("Validate");
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Validate');
};
