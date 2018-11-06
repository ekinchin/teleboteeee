import { http } from 'http';
import { https } from 'https';
import { url } from 'url';
import { events } from 'events';
import { sendHttpRequest } from './httpRequest';

const eventer = new events.EventEmitter();

const CMD = {
  setWebHook: 'setWebhook',
  getUpdates: 'getUpdates',
  sendMessage: 'sendMessage',
};

const token = '674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc';
const telegramUrl = new url.URL('https://api.telegram.org');
telegramUrl.pathname = `bot${token}/${CMD.sendMessage}`;

async function sendHttpRequest_(urlReq, headers, dataReq, method) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: urlReq.hostname,
      port: 443,
      path: urlReq.pathname + urlReq.search,
    };
    options.method = method;
    options.headers = headers;

    const req = https.request(options, (res) => {
      let answer = '';
      res.on('data', (dataRes) => {
        answer += dataRes;
      });
      res.on('end', () => {
        resolve(answer);
      });
      res.on('error', () => {
        reject(answer);
      });
    });
    if (options.headers !== undefined) {
      if ('Content-Type' in options.headers) {
        if (options.headers['Content-Type'] === 'application/json') {
          req.write(JSON.stringify(dataReq));
        }
      }
    }
    req.end();
  });
}

const yaApi = {
  getLocation: async (city) => {
    const geoUrl = new url.URL('https://geocode-maps.yandex.ru');
    geoUrl.pathname = '/1.x/';
    geoUrl.searchParams.append('format', 'json');
    geoUrl.searchParams.append('results', '1');
    geoUrl.searchParams.append('geocode', city);

    const geoLocation = await sendHttpRequest(geoUrl, {}, null, 'GET');
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
    const weatherUrl = new url.URL('https://api.weather.yandex.ru');
    weatherUrl.pathname = '/v1/informers';
    weatherUrl.searchParams.append('lang', 'ru_RU');
    weatherUrl.searchParams.append('lat', lat);
    weatherUrl.searchParams.append('lon', lon);
    const weatherHeader = { 'X-Yandex-API-Key': '40f0e52b-168d-40a4-ba38-0c2bf4d98726' };

    let weather = await sendHttpRequest(weatherUrl, weatherHeader, null, 'GET');
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
      await sendHttpRequest(telegramUrl, { 'Content-Type': 'application/json' }, { method: CMD.sendMessage, chat_id: chatId, text: answer }, 'POST');
    },
  },
  '/help': {
    descripion: 'Помощь',
    handler:
    async (chatId) => {
      const answer = '/start - поздороваться\n/weather - текущая погода\n/help - эта справка';
      await sendHttpRequest(telegramUrl, { 'Content-Type': 'application/json' }, { method: CMD.sendMessage, chat_id: chatId, text: answer }, 'POST');
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
        [city, lon, lat] = await yaApi.getLocation(data.message.text.split(' ')[1]);
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
      await sendHttpRequest(telegramUrl, { 'Content-Type': 'application/json' }, { method: CMD.sendMessage, chat_id: chatId, text: answer }, 'POST');
    },
  },
  undefined: {
    descripion: 'Неизвестная команда',
    handler:
    async (chatId) => {
      const answer = 'Неизвестная команда, воспользуйтесь справкой /help';
      await sendHttpRequest(telegramUrl, { 'Content-Type': 'application/json' }, { method: CMD.sendMessage, chat_id: chatId, text: answer }, 'POST');
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


const setWebHookUrl = new url.URL('https://api.telegram.org/');
setWebHookUrl.pathname = `bot${token}${CMD.setWebHook}`;
setWebHookUrl.searchParams.append(
  'url',
  'https://teleboteeee.herokuapp.com/',
);

sendHttpRequest(setWebHookUrl, {}, null, 'GET').then(Server);
