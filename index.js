'use strict';

// var fs = require('fs');
var https = require('https'),
  token = "674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc",
  host = "api.telegram.org",
  path = "/bot" + token + "/getUpdates";

var webHookPath="https://salty-reaches-74004.herokuapp.com/674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc";
var setwebhook="/bot"+token+"/setwebhook?url="+webHookPath;

const serverOptions = {
  key: fs.readFileSync('public.pem'),
  cert: fs.readFileSync('private.pem')
}

const options = {
  hostname: host,
  port: 443,
  path: setwebhook,
  method: 'GET'
};

var request = https.request(options, (res) => {
  res.on('data', (data) => {
    var answer=JSON.parse(data)
    console.log(answer);
  });
});
request.end();

var server = https.createServer(serverOptions);
serve.listen();
server.on('request',(request, result)=>{
  console.log(parseJSON(request));
})