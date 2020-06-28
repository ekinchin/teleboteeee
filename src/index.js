import https from 'https';
// import { URL } from 'url';
// import { EventEmitter } from 'events';
import {
  key, cert, ca, PORT,
} from './keys';
import { connect } from './telegram';

// import { construct } from './request';
// import YandexMap from './yandexmap';
// import YandexWeather from './yandexweather';

// const eventer = new EventEmitter();
// const map = new YandexMap();
// const weather = new YandexWeather(WEATHER_TOKEN);

// const telegramUrl = new URL('https://api.telegram.org');
// telegramUrl.pathname = `bot${TELEGRAM_TOKEN}/${CMD.sendMessage}`;

// const botCommands = {
//   '/start': {
//     descripion: 'Начать работу с ботом',
//     handler:
//     async (chatId, data) => {
//       const answer = `Hello, ${data.message.from.first_name}`;
//       await httpRequest(telegramUrl, { 'Content-Type': 'application/json' }, { method: CMD.sendMessage, chat_id: chatId, text: answer }, 'POST');
//     },
//   },
//   '/help': {
//     descripion: 'Помощь',
//     handler:
//     async (chatId) => {
//       const answer = '/start - поздороваться\n/weather - текущая погода\n/help - эта справка';
//       await httpRequest(telegramUrl, { 'Content-Type': 'application/json' }, { method: CMD.sendMessage, chat_id: chatId, text: answer }, 'POST');
//     },
//   },
//   '/weather': {
//     descripion: 'Погода',
//     handler:
//     async (chatId, data) => {
//       let city = 'Tyumen';
//       let lat = 57;
//       let lon = 65;
//       let answer = '';
//       if (data.message.text.split(' ')[1] !== undefined) {
//         [city, lon, lat] = await map.getLocation(data.message.text.split(' ')[1]);
//       }
//       if (lon !== 0 || lat !== 0) {
//         const [temp, tempFeel, wind] = await weather.getWeather(lon, lat);
//         answer = `Погода в: ${city}\n`
//         + `Текущая температура: ${temp}\n`
//         + `Ощущается как: ${tempFeel}\n`
//         + `Ветер: ${wind}`;
//       } else {
//         answer = 'Не удалось найти город';
//       }
//       await httpRequest(telegramUrl, { 'Content-Type': 'application/json' }, { method: CMD.sendMessage, chat_id: chatId, text: answer }, 'POST');
//     },
//   },
//   undefined: {
//     descripion: 'Неизвестная команда',
//     handler:
//     async (chatId) => {
//       const answer = 'Неизвестная команда, воспользуйтесь справкой /help';
//       await httpRequest(telegramUrl, { 'Content-Type': 'application/json' }, { method: CMD.sendMessage, chat_id: chatId, text: answer }, 'POST');
//     },
//   },
// };

// function reqParse(data) {
//   const dataParse = JSON.parse(data);
//   const entities = dataParse.message.entities[0] || '';
//   if (entities.type === 'bot_command') {
//     switch (dataParse.message.text.split(' ')[0].toLowerCase()) {
//       case '/start':
//       case '/help':
//       case '/weather':
//         eventer.emit(dataParse.message.text.split(' ')[0].toLowerCase(), dataParse.message.chat.id, dataParse);
//         break;
//       default:
//         eventer.emit('undefined', dataParse.message.chat.id);
//         break;
//     }
//   }
//   return 0;
// }

const server = https.createServer({
  key,
  cert,
  ca,
});
server.listen(PORT);
server.on('request', (request, response) => {
  let requestData = '';
  request.on('data', (data) => {
    requestData += data;
  });
  request.on('end', () => {
    // reqParse(requestData);
    response.end();
  });
});
server.on('listening', async () => {
  const result = await connect('https://storage.ekinchin.ru:8443');
  console.log(result);
});


// eventer.on('/weather', botCommands['/weather'].handler);
// eventer.on('/start', botCommands['/start'].handler);
// eventer.on('/help', botCommands['/help'].handler);
// eventer.on('undefined', botCommands.undefined.handler);


// const setWebHookUrl = new URL('https://api.telegram.org/');
// setWebHookUrl.pathname = `bot${TELEGRAM_TOKEN}/${CMD.setWebHook}`;
// setWebHookUrl.searchParams.append(
//   'url',
//   'https://storage.ekinchin.ru/',
// );
// // setWebHookUrl.searchParams.append(
// //  'certificate',
// //  public_key,
// // );

// httpRequest(setWebHookUrl, {}, 'GET').then((resolve) => {
//   console.log(resolve);
//   Server();
// });
