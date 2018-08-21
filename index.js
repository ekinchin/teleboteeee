'use strict';

var http = require('http');
var https = require('https');

var token = "674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc";
var telegram = "api.telegram.org";

var webHookPath="https://salty-reaches-74004.herokuapp.com/674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc";

var CMD = {
  setWebHook:"setwebhook",
  getUpdates:"getUpdates"
};

function setWebHook(telegram, token, webhookpath, command) {
  return new Promise((resole,reject)=>{
    var options = {
      hostname: telegram,
      port: 443,
      path:"/bot"+token+"/"+command+"?url="+webhookpath,
      method: 'GET'
    };
    console.log(options);
    var request = https.request(options, (res) => {
      res.on('data', (data) => {
        result=JSON.parse(data).result
        (result==true)?resolve(result):reject(result);
      });
    });
  });
}

function Server(){
   var server = http.createServer();
  server.listen(port);
  server.on('request',(req, res) => {
    console.log(req);
    res.end('hello world\n');
}

var prmSetWebHook = setWebHook(telegram, token, webHookPath, CMD.setWebHook);
prmSetWebHook.then(Server,
  (error)=>{
    console.log("ERROR",error);
  }
);
