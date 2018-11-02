"use strict";

var http = require("http");
var https = require("https");
const url = require("url");

var EventEmitter = require("events").EventEmitter;
var eventer = new EventEmitter;

var CMD = {
	setWebHook:"setWebhook",
	getUpdates:"getUpdates",
	sendMessage:"sendMessage"
};

var token = "674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc";
const telegramUrl = new url.URL("https://api.telegram.org");
telegramUrl.pathname = "bot"+token +"/"+CMD.sendMessage;

const weatherUrl = new url.URL("https://api.weather.yandex.ru");
weatherUrl.pathname="/v1/informers";
weatherUrl.searchParams.append("lang","ru_RU");
var weatherHeader = {"X-Yandex-API-Key": "40f0e52b-168d-40a4-ba38-0c2bf4d98726"};

const geoUrl = new url.URL("https://geocode-maps.yandex.ru");
geoUrl.pathname="/1.x/";
geoUrl.searchParams.append("format","json");
geoUrl.searchParams.append("results","1");

const yaApi={
	getLocation:async (city)=>{
		const geoUrl = new url.URL("https://geocode-maps.yandex.ru");
		geoUrl.pathname="/1.x/";
		geoUrl.searchParams.append("format","json");
		geoUrl.searchParams.append("results","1");

		const geoLocation = await sendHttpRequest(geoUrl,{},null,"GET");
		const geoLocationParse = JSON.parse(geoLocation);
		let cityParse = undefined;
		let lon = undefined;
		let lat = undefined;
		if(geoLocationParse.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found!=0){
			cityParse = geoLocationParse.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
			console.log(cityParse);
			[lon, lat] = geoLocationParse.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ");
		}
		console.log(lon, lat);
		return [cityParse||city, lon||0, lat||0];
	}
}

const bot_commands={
	"/start":{
		descripion:"Начать работу с ботом",
		handler:
			async (chat_id, data)=>{
				var answer="Hello, "+ data.message.from.first_name;
				sendHttpRequest(telegramUrl, {"Content-Type":"application/json"}, {"method": CMD.sendMessage, "chat_id":chat_id, "text":answer}, "POST");
			}
	},
	"/help":{
		descripion:"Помощь",
		handler:
			async (chat_id)=>{
				var answer="/start - поздороваться\n/weather - текущая погода\n/help - эта справка";
				sendHttpRequest(telegramUrl, {"Content-Type":"application/json"}, {"method": CMD.sendMessage, "chat_id":chat_id, "text":answer}, "POST");
			}
	},
	"/weather":{
		descripion:"Погода",
		handler:
			async (chat_id, data)=>{
				let city = "Tyumen";
				let lat = 57;
				let lon = 65;
				let answer = "";

				weatherUrl.searchParams.delete("lat");
				weatherUrl.searchParams.delete("lon");

				if(data.message.text.split(" ")[1]==undefined){
					weatherUrl.searchParams.append("lat", 57);
					weatherUrl.searchParams.append("lon", 65);
				}else{
					[city, lon, lat] = await yaApi.getLocation(data.message.text.split(" ")[1]);
					console.log(city, lon, lat);
					weatherUrl.searchParams.append("lat", lat);
					weatherUrl.searchParams.append("lon", lon);
				}

				if(lat!==0 && lon!==0){
					let weather = await sendHttpRequest(weatherUrl, weatherHeader, null, "GET");
					weather=JSON.parse(weather);
					answer = "Погода в: " + city +"\n"
								+"Текущая температура: " + weather.fact.temp+"\n"
								+"Ощущается как: " + weather.fact.feels_like+"\n"
								+"Ветер: " + weather.fact.wind_speed;
				}else{
					answer = "Не удалось найти город";
				}
				await sendHttpRequest(telegramUrl, {"Content-Type":"application/json"}, {"method": CMD.sendMessage, "chat_id":chat_id, "text":answer}, "POST");
			}
	},
	"undefined":{
		descripion:"Неизвестная команда",
		handler:
			async (chat_id)=>{
				var answer="Неизвестная команда, воспользуйтесь справкой /help";
				await sendHttpRequest(telegramUrl, {"Content-Type":"application/json"}, {"method": CMD.sendMessage, "chat_id":chat_id, "text":answer}, "POST");
			}
	},
};

async function sendHttpRequest(url, headers, data, method){
	return new Promise((resolve,reject)=>{
		var options = {
			hostname: url.hostname,
			port: 443,
			path:url.pathname+url.search
		};
		options.method=method;
		options.headers=headers;

		const req = https.request(options, (res) => {
			var answer="";
			res.on("data", (data) => {
				answer+=data;
			});
			res.on("end",()=>{
				resolve(answer);
			});
			res.on("error",()=>{
				reject(answer);
			});
		});
		if(options.headers!=undefined){
			if("Content-Type" in  options.headers){
				if(options.headers["Content-Type"]=="application/json"){
					req.write(JSON.stringify(data));
				}
			}
		}
		req.end();
	});
}

function reqParse(data){
	data=JSON.parse(data);
	var text = data.message.text;
	var entities={};
	(data.message.entities==undefined)?null:entities = data.message.entities[0];
	if(entities.type=="bot_command"){
		switch(text.split(" ")[0].toLowerCase()) {
		case "/start":
		case "/help":
		case "/weather":
			eventer.emit(text.split(" ")[0].toLowerCase(),data.message.chat.id, data);
			break;
		default:
			eventer.emit("undefined",data.message.chat.id);
			break;
		}
	}
	return 0;
}

async function Server(){
	var server = http.createServer();
	server.listen(process.env.PORT);
	server.on("request",(request, response) => {
		var requestData="";
		request.on("data",(data)=>{
			requestData+=data;
		});
		request.on("end",()=>{
			reqParse(requestData);
			response.end();
		});
	});
}

eventer.on("/weather",bot_commands["/weather"].handler);
eventer.on("/start",bot_commands["/start"].handler);
eventer.on("/help",bot_commands["/help"].handler);
eventer.on("undefined",bot_commands["undefined"].handler);

const setWebHookUrl = new url.URL("https://api.telegram.org");
setWebHookUrl.pathname = "bot"+token + CMD.setWebHook;
setWebHookUrl.searchParams.append("url","https://salty-reaches-74004.herokuapp.com/674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc");

sendHttpRequest(setWebHookUrl,{},null,"GET")
	.then(Server);
