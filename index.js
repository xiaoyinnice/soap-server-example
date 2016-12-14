var soap = require('soap');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var port = 51515;

var wsdl = fs.readFileSync('resources/soap.wsdl', 'utf8');

var service = {
    Hello_Service: {
        Hello_Port: {
            sayHello: function(args) {
                console.log(args.firstName.$value);
                var result = "Hello, " + args.firstName.$value;
                return {
                    greeting: result
                };
            }
        }
    }
};

//express server example
var app = express();
//body parser middleware are supported (optional)
app.use(bodyParser.raw({
    type: function() {
        return true;
    },
    limit: '5mb'
}));
app.listen(port, function() {
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, '/SayHello', service, wsdl);
});

console.log("Start soap server on port " + port + " ...");
