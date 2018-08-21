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
  return new Promise((resolve,reject)=>{
    console.log("Set WebHook");
    var options = {
      hostname: telegram,
      port: 443,
      path:"/bot"+token+"/"+command+"?url="+webhookpath,
      method: 'GET'
    };
    var request = https.request(options, (res) => {
      res.on('data', (data) => {
        var result=JSON.parse(data).result;
        console.log(result);
        (result==true)?resolve(result):reject(result);
      });
    });
    request.end();
  });
}

function Server(){
  console.log("OK, starting server....")
  var server = http.createServer();
  server.listen(process.env.PORT);
  server.on('request',(req, res) => {
    console.log('WebHook request URL: %s', req.url);
    console.log('WebHook request headers: %j', req.headers);
    if(req.url==('/'+token)){
      console.log("Telegram request");
    }
    req.on('data',(data)=>{
      data=JSON.parse(data);
      console.log(data,'\n');
      console.log(data.message.chat.id);
      console.log(data.message.text);
      console.log(data.message.entities);
    });
    res.end();
  });
}

var prmSetWebHook = setWebHook(telegram, token, webHookPath, CMD.setWebHook);
prmSetWebHook.then(Server,
  (error)=>{
    console.log("ERROR",error);
  }
  );
