'use strict';

var port = process.env.PORT;
var fs = require('fs');
var http = require('http');
var https = require('https');
var token = "674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc";
var telegram = "api.telegram.org";
var path = "/bot" + token + "/getUpdates";

var webHookPath="https://salty-reaches-74004.herokuapp.com/674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc";
var setWebhookCMD="/bot"+token+"/setwebhook?url="+webHookPath;


var webHooked=false;

const options = {
  hostname: telegram,
  port: 443,
  path: setWebhookCMD,
  method: 'GET'
};

var request = https.request(options, (res) => {
  res.on('data', (data) => {
    (JSON.parse(data).result==true)?webHooked=true:webHooked=false;
  });
});
request.end();

if(webHooked){
  var server = http.createServer();
  server.listen(port);
  server.on('request',(req, res) => {
    console.log(req);
    res.end('hello world\n');
  });
}else{
  console.log('not set webhook');
}
