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

function sendHttpRequest(host, path){
  return new Promise((resolve,reject)=>{
    var options = {
      hostname: host,
      port: 443,
      path:path,
      method:'GET'
    };
    https.request(options, (res) => {
      var answer='';
      res.on('data', (data) => {
        answer+=data;
      });
      res.on('end',()=>{
        console.log(JSON.parse(answer));
        resolve(answer);
      });
      res.on('error',()=>{
        reject(answer);
      })
    }).end();
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

  server.on('request',(request, response) => {
    if(request.url==('/'+token)){
      console.log("Telegram request");
    }
    request.on('data',(data)=>{
      var request=JSON.parse(data);
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify({"method": "sendMessage", "text": request.message.text, "chat_id":request.message.chat.id}));
      response.end();
    });
  });
}

sendHttpRequest(telegram, "/bot"+token+"/"+CMD.setWebHook+"?url="+webHookPath)
.then(Server,(error)=>{
  console.log("ERROR",error);
});