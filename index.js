'use strict';

var port = process.env.PORT;
var fs = require('fs');
var http = require('http');
var https = require('https');
var token = "674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc";
var telegram = "api.telegram.org";
var path = "/bot" + token + "/getUpdates";

var webHookPath="https://salty-reaches-74004.herokuapp.com/674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc";
var setwebhook="/bot"+token+"/setwebhook?url="+webHookPath;

const options = {
  hostname: telegram,
  port: 443,
  path: setwebhook,
  method: 'GET'
};

var request = https.request(options, (res) => {
  res.on('data', (data) => {
    var answer=JSON.parse(data)
    console.log(answer);
    (answer.ok==true)?console.log("URAAAA"):console.log('FAIL');
  });
});
request.end();

var server = http.createServer();
server.listen(port);
server.on('request',(req, res) => {
  console.log(req);
  res.end('hello world\n');
});