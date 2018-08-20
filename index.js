'use strict';

var fs = require('fs');
var https = require('https'),
  token = "674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc",
  host = "api.telegram.org",
  path = "/bot" + token + "/getUpdates";

var webHookPath="https://salty-reaches-74004.herokuapp.com/674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc";
var setwebhook="/bot"+token+"/setwebhook?url="+webHookPath;

const serverOptions = {
  key: fs.readFileSync('./private.key'),
  cert: fs.readFileSync('./public.pem')
}

const options = {
  hostname: host,
  port: 443,
  path: setwebhook,
  method: 'GET'
};

// var request = https.request(options, (res) => {
//   res.on('data', (data) => {
//     var answer=JSON.parse(data)
//     console.log(answer);
//   });
// });
// request.end();

var server = https.createServer(serverOptions);
server.listen(8000);
server.on('request',(req, res) => {
  console.log(req);
  res.end('hello world\n');
});