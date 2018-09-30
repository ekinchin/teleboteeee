'use strict';

var http = require('http');
var https = require('https');
const url = require('url');

var EventEmitter = require('events').EventEmitter;
var eventer = new EventEmitter;

var CMD = {
	setWebHook:"setWebhook",
	getUpdates:"getUpdates",
	sendMessage:"sendMessage"
};

var token = "674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc";
const telegramUrl = new url.URL("https://api.telegram.org");
telegramUrl.pathname = 'bot'+token +"/"+CMD.sendMessage;

const weatherUrl = new url.URL("https://api.weather.yandex.ru");
weatherUrl.pathname="/v1/informers";
weatherUrl.searchParams.append('lang','ru_RU');
var weatherHeader = {'X-Yandex-API-Key': "40f0e52b-168d-40a4-ba38-0c2bf4d98726"};

const geoUrl = new url.URL("https://geocode-maps.yandex.ru");
geoUrl.pathname="/1.x";
geoUrl.searchParams.append('format','json');
geoUrl.searchParams.append('results','1');
//https://geocode-maps.yandex.ru/1.x/?format=json&results=1&geocode=%D1%82%D1%8E%D0%BC%D0%B5%D0%BD%D1%8C




var bot_commands={
	'/start':{
		descripion:'Начать работу с ботом',
		handler:
			(chat_id, data)=>{
				var answer="Hello, "+ data.message.from.first_name;
				sendJSONRequest(telegramUrl, {"method": CMD.sendMessage, "chat_id":chat_id, "text":answer});
			}
	},
	'/help':{
		descripion:'Помощь',
		handler:
			(chat_id, data)=>{
				var answer="/start - поздороваться\n/weather - текущая погода\n/help - эта справка";
				sendRequest(telegramUrl, {'Content-Type':'application/json'}, {"method": CMD.sendMessage, "chat_id":chat_id, "text":answer});
			}
	},
	'/weather':{
		descripion:'Погода',
		handler:
			(chat_id, data)=>{
				if(data.message.text.split(' ')[1]==undefined){
				weatherUrl.searchParams.delete('lat');
				weatherUrl.searchParams.delete('lon');
					weatherUrl.searchParams.append('lat', 57);
					weatherUrl.searchParams.append('lon', 65);
					sendHttpRequest(weatherUrl, weatherHeader)
					.then(
						(data)=>{
							data=JSON.parse(data);
							var answer="Текущая температура: " + data.fact.temp+'\n'
									+"Ощущается как: " + data.fact.feels_like+'\n'
									+"Ветер: " + data.fact.wind_speed;
							sendJSONRequest(telegramUrl, {"method": CMD.sendMessage, "chat_id":chat_id, "text":answer});
						},
						(error)=>{
							sendJSONRequest(telegramUrl, {"method": CMD.sendMessage, "chat_id":chat_id, "text":'Что-то не получилось :-('});
						}
					);
				}else{
					geoUrl.searchParams.delete('geocode');
					geoUrl.searchParams.append('geocode',data.message.text.split(' ')[1].toLowerCase());
					sendHttpRequest(geoUrl)
					.then(
						(data)=>{
							data=JSON.parse(data);
							console.log("геопарсинг",data);
							sendHttpRequest(weatherUrl, weatherHeader)
							.then(
								(data)=>{
									data=JSON.parse(data);
									var answer="Текущая температура: " + data.fact.temp+'\n'
											+"Ощущается как: " + data.fact.feels_like+'\n'
											+"Ветер: " + data.fact.wind_speed;
									sendJSONRequest(telegramUrl, {"method": CMD.sendMessage, "chat_id":chat_id, "text":answer});
								},
								(error)=>{
									sendJSONRequest(telegramUrl, {"method": CMD.sendMessage, "chat_id":chat_id, "text":'Что-то не получилось :-('});
								}
							);
						});
				}
		}
	},
	'undefined':{
		descripion:'Неизвестная команда',
		handler:
			(chat_id, data)=>{
				var answer="Неизвестная команда, воспользуйтесь справкой /help";
				sendJSONRequest(telegramUrl, {"method": CMD.sendMessage, "chat_id":chat_id, "text":answer});
			}
	},
	'/location':{
		descripion:'отработка получения локации',
		handler:(chat_id, data)=>{
			sendJSONRequest(telegramUrl, {"method": CMD.sendMessage, "chat_id":chat_id, "text":"клава", "reply_markup":{"keyboard":
																											[[{"text":"Отправить локейшн",
																											"request_location":true}]],
																											"resize_keyboard":true,
																											"selective":true
																										}})
			.then((data)=>{
				console.log(data);
			})
		}
	}
};

function sendJSONRequest(url, data){
	return new Promise((resolve,reject)=>{
		var options = {
			hostname: url.hostname,
			port: 443,
			path:url.pathname+url.search,
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			}
		};
		console.log(options);
		const req = https.request(options, (res) => {
			var answer='';
			res.on('data', (data) => {
				answer+=data;
			});
			res.on('end',()=>{
        		resolve(answer);
    		});
			res.on('error',()=>{
        		reject(answer);
    		})
		});
		req.write(JSON.stringify(data));
		req.end();
	});
}

function sendHttpRequest(url, header){
	return new Promise((resolve,reject)=>{
		var options = {
			hostname: url.hostname,
			port: 443,
			path:url.pathname+url.search,
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
				resolve(answer);
			});
			res.on('error',()=>{
				reject(answer);
			})
		}).end();
	});
}

function sendRequest(url, headers, data){
	return new Promise((resolve,reject)=>{
		var options = {
			hostname: url.hostname,
			port: 443,
			path:url.pathname+url.search,
			method:'GET'
		};
		console.log(headers);

		const req = https.request(options, (res) => {
			var answer='';
			res.on('data', (data) => {
				answer+=data;
			});
			res.on('end',()=>{
        		resolve(answer);
    		});
			res.on('error',()=>{
        		reject(answer);
    		})
		});
		if(options.headers!=undefined){
			if('Content-Type' in  options.headers) (options.headers['Content-Type']=='application/json')?req.write(JSON.stringify(data)):null;
		}
		req.end();
	});
}

function reqParse(data){
	data=JSON.parse(data);
	var text = data.message.text;
	var entities={};
	(data.message.entities==undefined)?null:entities = data.message.entities[0];
	if(entities.type=='bot_command'){
		switch(text.split(' ')[0].toLowerCase()) {
			case '/start':
			case '/help':
			case '/location':
			case '/weather':
				eventer.emit(text.split(' ')[0].toLowerCase(),data.message.chat.id, data);
				break;
			default:
				eventer.emit('undefined',data.message.chat.id, data);
				break;
		};
	}
	return 0;
}

function Server(){
	console.log("OK, starting server....")
	var server = http.createServer();
	server.listen(process.env.PORT);
	server.on('request',(request, response) => {
		var requestData='';
		request.on('data',(data)=>{
			requestData+=data;
		});
		request.on('end',()=>{
			reqParse(requestData);
			response.end();
		});
	});
}

eventer.on('/weather',bot_commands['/weather'].handler);
eventer.on('/start',bot_commands['/start'].handler);
eventer.on('/help',bot_commands['/help'].handler);
eventer.on('/location',bot_commands['/location'].handler);
eventer.on('undefined',bot_commands['undefined'].handler);

const setWebHookUrl = new url.URL("https://api.telegram.org");
setWebHookUrl.pathname = 'bot'+token + CMD.setWebHook;
setWebHookUrl.searchParams.append('url',"https://salty-reaches-74004.herokuapp.com/674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc");

sendRequest(setWebHookUrl,{})
.then(Server,(error)=>{
	console.log("ERROR",error);
});