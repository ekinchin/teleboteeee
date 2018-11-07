import http from 'http';
import { URL } from 'url';
import { EventEmitter } from 'events';
import httpRequest from './httpRequest';
import Yandexmap from './yandexmap';

const eventer = new EventEmitter();

const CMD = {
  setWebHook: 'setWebhook',
  getUpdates: 'getUpdates',
  sendMessage: 'sendMessage',
};

const token = '674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc';
const telegramUrl = new URL('https://api.telegram.org');
telegramUrl.pathname = `bot${token}/${CMD.sendMessage}`;

const map = new Yandexmap();

const yaApi = {
  getLocation: async (city) => {
    const geoUrl = new URL('https://geocode-maps.yandex.ru');
    geoUrl.pathname = '/1.x/';
    geoUrl.searchParams.append('format', 'json');
    geoUrl.searchParams.append('results', '1');
    geoUrl.searchParams.append('geocode', city);

    const geoLocation = await httpRequest(geoUrl, {}, null, 'GET');
    const geoLocationParse = JSON.parse(geoLocation);
    let cityParse;
    let lon;
    let lat;
    if (
      geoLocationParse.response.GeoObjectCollection
        .metaDataProperty.GeocoderResponseMetaData
        .found !== '0'
    ) {
      cityParse = geoLocationParse.response.GeoObjectCollection.featureMember[0]
        .GeoObject.metaDataProperty.GeocoderMetaData.text;
      [lon, lat] = geoLocationParse.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
    }
    return [cityParse || city, lon || 0, lat || 0];
  },
  getWeather: async (lon, lat) => {
    const weatherUrl = new URL('https://api.weather.yandex.ru');
    weatherUrl.pathname = '/v1/informers';
    weatherUrl.searchParams.append('lang', 'ru_RU');
    weatherUrl.searchParams.append('lat', lat);
    weatherUrl.searchParams.append('lon', lon);
    const weatherHeader = { 'X-Yandex-API-Key': '40f0e52b-168d-40a4-ba38-0c2bf4d98726' };

    let weather = await httpRequest(weatherUrl, weatherHeader, null, 'GET');
    weather = JSON.parse(weather);
    return [weather.fact.temp, weather.fact.feels_like, weather.fact.wind_speed];
  },
};

const botCommands = {
  '/start': {
    descripion: 'Начать работу с ботом',
    handler:
    async (chatId, data) => {
      const answer = `Hello, ${data.message.from.first_name}`;
      await httpRequest(telegramUrl, { 'Content-Type': 'application/json' }, { method: CMD.sendMessage, chat_id: chatId, text: answer }, 'POST');
    },
  },
  '/help': {
    descripion: 'Помощь',
    handler:
    async (chatId) => {
      const answer = '/start - поздороваться\n/weather - текущая погода\n/help - эта справка';
      await httpRequest(telegramUrl, { 'Content-Type': 'application/json' }, { method: CMD.sendMessage, chat_id: chatId, text: answer }, 'POST');
    },
  },
  '/weather': {
    descripion: 'Погода',
    handler:
    async (chatId, data) => {
      let city = 'Tyumen';
      let lat = 57;
      let lon = 65;
      let answer = '';
      if (data.message.text.split(' ')[1] !== undefined) {
        [city, lon, lat] = await map.getLocation(data.message.text.split(' ')[1]);
      }
      if (lon !== 0 || lat !== 0) {
        const [temp, tempFeel, wind] = await yaApi.getWeather(lon, lat);
        answer = `Погода в: ${city}\n`
        + `Текущая температура: ${temp}\n`
        + `Ощущается как: ${tempFeel}\n`
        + `Ветер: ${wind}`;
      } else {
        answer = 'Не удалось найти город';
      }
      await httpRequest(telegramUrl, { 'Content-Type': 'application/json' }, { method: CMD.sendMessage, chat_id: chatId, text: answer }, 'POST');
    },
  },
  undefined: {
    descripion: 'Неизвестная команда',
    handler:
    async (chatId) => {
      const answer = 'Неизвестная команда, воспользуйтесь справкой /help';
      await httpRequest(telegramUrl, { 'Content-Type': 'application/json' }, { method: CMD.sendMessage, chat_id: chatId, text: answer }, 'POST');
    },
  },
};

function reqParse(data) {
  const dataParse = JSON.parse(data);
  const entities = dataParse.message.entities[0] || '';
  if (entities.type === 'bot_command') {
    switch (dataParse.message.text.split(' ')[0].toLowerCase()) {
      case '/start':
      case '/help':
      case '/weather':
        eventer.emit(dataParse.message.text.split(' ')[0].toLowerCase(), dataParse.message.chat.id, dataParse);
        break;
      default:
        eventer.emit('undefined', dataParse.message.chat.id);
        break;
    }
  }
  return 0;
}

async function Server() {
  const server = http.createServer();
  server.listen(process.env.PORT);
  server.on('request', (request, response) => {
    let requestData = '';
    request.on('data', (data) => {
      requestData += data;
    });
    request.on('end', () => {
      reqParse(requestData);
      response.end();
    });
  });
}

eventer.on('/weather', botCommands['/weather'].handler);
eventer.on('/start', botCommands['/start'].handler);
eventer.on('/help', botCommands['/help'].handler);
eventer.on('undefined', botCommands.undefined.handler);


const setWebHookUrl = new URL('https://api.telegram.org/');
setWebHookUrl.pathname = `bot${token}${CMD.setWebHook}`;
setWebHookUrl.searchParams.append(
  'url',
  'https://teleboteeee.herokuapp.com/',
);
httpRequest(setWebHookUrl, {}, null, 'GET').then(Server);
