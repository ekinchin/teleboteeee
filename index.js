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

function sendHttpRequest(host, path) {
  var options = {
    hostname: host,
    port: 443,
    path:path,
    method:'GET'
  };
  var request = https.request(options, (res) => {
    res.on('data', (data) => {
      return data;
    });
  });
  request.end();
}

/*function setWebHook(telegram, token, webhookpath, command) {
  return new Promise((resolve,reject)=>{
    var path="/bot"+token+"/"+command+"?url="+webhookpath;
    var data = sendHttpRequest(telegram,path);
    var result=JSON.parse(data).result;
    (result==true)?resolve(result):reject(result);
  });
}
*/
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

function reqParse(){

}

function botResponse(){

}

function Server(){
  console.log("OK, starting server....")
  var server = http.createServer();
  server.listen(process.env.PORT);
  server.on('request',(req, res) => {
    if(req.url==('/'+token)){
      console.log("Telegram request");
    }
    req.on('data',(data)=>{
      var request=JSON.parse(data);
      console.log(request.message.chat.id);
      console.log(request.message.text);
      console.log(request.message.entities);

      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({"method": "sendMessage", "text": "hello", "chat_id":request.message.chat.id
      }));
    });
  });
}

var prmSetWebHook = setWebHook(telegram, token, webHookPath, CMD.setWebHook);
prmSetWebHook.then(Server,
  (error)=>{
    console.log("ERROR",error);
  });
