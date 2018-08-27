'use strict';

var http = require('http');
var https = require('https');

var token = "674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc";
var telegram = "api.telegram.org";
var webHookPath="https://salty-reaches-74004.herokuapp.com/674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc";

var weatherToken = "40f0e52b-168d-40a4-ba38-0c2bf4d98726";
var weatherHost = "https://api.weather.yandex.ru";
var weatherPath = "/v1/informers&lat=57&lon=65&lang=ru_RU";
var weatherHeader = {'X-Yandex-API-Key': weatherToken};

var CMD = {
  setWebHook:"setwebhook",
  getUpdates:"getUpdates"
};

var bot_commands={
	'/start':{
		descripion:'Начать работу с ботом';
		handler:()=>{};
	},
	'/help':{
		descripion:'Помощь';
		handler:()=>{};
	},
	'/weather':{
		descripion:'Погода';
		handler:()=>{
		var prmWeather = sendHttpRequest(weatherHost, weatherPath, weatherHeader)
			.then((data)=>{
  				console.log("ERROR",data);
			}
			,(error)=>{
  				console.log("ERROR",error);
			});

		};
	}
};


function sendHttpRequest(host, path,header){
  return new Promise((resolve,reject)=>{
    var options = {
      hostname: host,
      port: 443,
      path:path,
      method:'GET'
    };
    if(header!=undefined){
    	options.headers=header;
    }
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

function reqParse(data){
  data=JSON.parse(data);
  var text = data.message.text;
  var entities={};
  (data.message.entities==undefined)?null:entities = data.message.entities[0];
  var answer = {"method": "sendMessage", "chat_id":data.message.chat.id, "text":''};

  if(entities.type.toLowerCase()=='bot_command'){
    switch(text.split(' ')[0].toLowerCase()) {
      case '/start':
        answer["text"]="Hello, "+data.message.from.first_name;
        break;
      case '/help':
        answer["text"]="Я еще маленький и ничего не умею";
        break;
      default:
        answer["text"]="Я не знаю такой команды, "+data.message.from.first_name;
        break;
    }
  }else{
    return 0;
  }
  console.log(answer);
  return JSON.stringify(answer);
//JSON.stringify({"method": "sendMessage", "text": request, "chat_id":request.message.chat.id})
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
      var result=reqParse(data);
      if(result!=0){
        response.setHeader('Content-Type', 'application/json');
        response.write(result);
      }
      response.end();
    });
  });
}

sendHttpRequest(telegram, "/bot"+token+"/"+CMD.setWebHook+"?url="+webHookPath)
.then(Server,(error)=>{
  console.log("ERROR",error);
});