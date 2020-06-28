"use strict";

var _https = _interopRequireDefault(require("https"));

var _keys = require("./keys");

var _telegram = require("./telegram");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { URL } from 'url';
// import { EventEmitter } from 'events';
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
const server = _https.default.createServer({
  key: _keys.key,
  cert: _keys.cert,
  ca: _keys.ca
});

server.listen(_keys.PORT);
server.on('request', (request, response) => {
  let requestData = '';
  request.on('data', data => {
    requestData += data;
  });
  request.on('end', () => {
    // reqParse(requestData);
    response.end();
  });
});
server.on('listening', async () => {
  console.log(`server listenong on ${_keys.PORT} port`);
  const result = await (0, _telegram.connect)('https://storage.ekinchin.ru:8443');
  console.log(result);
}); // eventer.on('/weather', botCommands['/weather'].handler);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJzZXJ2ZXIiLCJodHRwcyIsImNyZWF0ZVNlcnZlciIsImtleSIsImNlcnQiLCJjYSIsImxpc3RlbiIsIlBPUlQiLCJvbiIsInJlcXVlc3QiLCJyZXNwb25zZSIsInJlcXVlc3REYXRhIiwiZGF0YSIsImVuZCIsImNvbnNvbGUiLCJsb2ciLCJyZXN1bHQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBR0E7O0FBR0E7Ozs7QUFMQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLE1BQU1BLE1BQU0sR0FBR0MsZUFBTUMsWUFBTixDQUFtQjtBQUNoQ0MsRUFBQUEsR0FBRyxFQUFIQSxTQURnQztBQUVoQ0MsRUFBQUEsSUFBSSxFQUFKQSxVQUZnQztBQUdoQ0MsRUFBQUEsRUFBRSxFQUFGQTtBQUhnQyxDQUFuQixDQUFmOztBQUtBTCxNQUFNLENBQUNNLE1BQVAsQ0FBY0MsVUFBZDtBQUNBUCxNQUFNLENBQUNRLEVBQVAsQ0FBVSxTQUFWLEVBQXFCLENBQUNDLE9BQUQsRUFBVUMsUUFBVixLQUF1QjtBQUMxQyxNQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQUYsRUFBQUEsT0FBTyxDQUFDRCxFQUFSLENBQVcsTUFBWCxFQUFvQkksSUFBRCxJQUFVO0FBQzNCRCxJQUFBQSxXQUFXLElBQUlDLElBQWY7QUFDRCxHQUZEO0FBR0FILEVBQUFBLE9BQU8sQ0FBQ0QsRUFBUixDQUFXLEtBQVgsRUFBa0IsTUFBTTtBQUN0QjtBQUNBRSxJQUFBQSxRQUFRLENBQUNHLEdBQVQ7QUFDRCxHQUhEO0FBSUQsQ0FURDtBQVVBYixNQUFNLENBQUNRLEVBQVAsQ0FBVSxXQUFWLEVBQXVCLFlBQVk7QUFDakNNLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFhLHVCQUFzQlIsVUFBSyxPQUF4QztBQUNBLFFBQU1TLE1BQU0sR0FBRyxNQUFNLHVCQUFRLGtDQUFSLENBQXJCO0FBQ0FGLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxNQUFaO0FBQ0QsQ0FKRCxFLENBT0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGh0dHBzIGZyb20gJ2h0dHBzJztcbi8vIGltcG9ydCB7IFVSTCB9IGZyb20gJ3VybCc7XG4vLyBpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IHtcbiAga2V5LCBjZXJ0LCBjYSwgUE9SVCxcbn0gZnJvbSAnLi9rZXlzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICcuL3RlbGVncmFtJztcblxuLy8gaW1wb3J0IHsgY29uc3RydWN0IH0gZnJvbSAnLi9yZXF1ZXN0Jztcbi8vIGltcG9ydCBZYW5kZXhNYXAgZnJvbSAnLi95YW5kZXhtYXAnO1xuLy8gaW1wb3J0IFlhbmRleFdlYXRoZXIgZnJvbSAnLi95YW5kZXh3ZWF0aGVyJztcblxuLy8gY29uc3QgZXZlbnRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbi8vIGNvbnN0IG1hcCA9IG5ldyBZYW5kZXhNYXAoKTtcbi8vIGNvbnN0IHdlYXRoZXIgPSBuZXcgWWFuZGV4V2VhdGhlcihXRUFUSEVSX1RPS0VOKTtcblxuLy8gY29uc3QgdGVsZWdyYW1VcmwgPSBuZXcgVVJMKCdodHRwczovL2FwaS50ZWxlZ3JhbS5vcmcnKTtcbi8vIHRlbGVncmFtVXJsLnBhdGhuYW1lID0gYGJvdCR7VEVMRUdSQU1fVE9LRU59LyR7Q01ELnNlbmRNZXNzYWdlfWA7XG5cbi8vIGNvbnN0IGJvdENvbW1hbmRzID0ge1xuLy8gICAnL3N0YXJ0Jzoge1xuLy8gICAgIGRlc2NyaXBpb246ICfQndCw0YfQsNGC0Ywg0YDQsNCx0L7RgtGDINGBINCx0L7RgtC+0LwnLFxuLy8gICAgIGhhbmRsZXI6XG4vLyAgICAgYXN5bmMgKGNoYXRJZCwgZGF0YSkgPT4ge1xuLy8gICAgICAgY29uc3QgYW5zd2VyID0gYEhlbGxvLCAke2RhdGEubWVzc2FnZS5mcm9tLmZpcnN0X25hbWV9YDtcbi8vICAgICAgIGF3YWl0IGh0dHBSZXF1ZXN0KHRlbGVncmFtVXJsLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSwgeyBtZXRob2Q6IENNRC5zZW5kTWVzc2FnZSwgY2hhdF9pZDogY2hhdElkLCB0ZXh0OiBhbnN3ZXIgfSwgJ1BPU1QnKTtcbi8vICAgICB9LFxuLy8gICB9LFxuLy8gICAnL2hlbHAnOiB7XG4vLyAgICAgZGVzY3JpcGlvbjogJ9Cf0L7QvNC+0YnRjCcsXG4vLyAgICAgaGFuZGxlcjpcbi8vICAgICBhc3luYyAoY2hhdElkKSA9PiB7XG4vLyAgICAgICBjb25zdCBhbnN3ZXIgPSAnL3N0YXJ0IC0g0L/QvtC30LTQvtGA0L7QstCw0YLRjNGB0Y9cXG4vd2VhdGhlciAtINGC0LXQutGD0YnQsNGPINC/0L7Qs9C+0LTQsFxcbi9oZWxwIC0g0Y3RgtCwINGB0L/RgNCw0LLQutCwJztcbi8vICAgICAgIGF3YWl0IGh0dHBSZXF1ZXN0KHRlbGVncmFtVXJsLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSwgeyBtZXRob2Q6IENNRC5zZW5kTWVzc2FnZSwgY2hhdF9pZDogY2hhdElkLCB0ZXh0OiBhbnN3ZXIgfSwgJ1BPU1QnKTtcbi8vICAgICB9LFxuLy8gICB9LFxuLy8gICAnL3dlYXRoZXInOiB7XG4vLyAgICAgZGVzY3JpcGlvbjogJ9Cf0L7Qs9C+0LTQsCcsXG4vLyAgICAgaGFuZGxlcjpcbi8vICAgICBhc3luYyAoY2hhdElkLCBkYXRhKSA9PiB7XG4vLyAgICAgICBsZXQgY2l0eSA9ICdUeXVtZW4nO1xuLy8gICAgICAgbGV0IGxhdCA9IDU3O1xuLy8gICAgICAgbGV0IGxvbiA9IDY1O1xuLy8gICAgICAgbGV0IGFuc3dlciA9ICcnO1xuLy8gICAgICAgaWYgKGRhdGEubWVzc2FnZS50ZXh0LnNwbGl0KCcgJylbMV0gIT09IHVuZGVmaW5lZCkge1xuLy8gICAgICAgICBbY2l0eSwgbG9uLCBsYXRdID0gYXdhaXQgbWFwLmdldExvY2F0aW9uKGRhdGEubWVzc2FnZS50ZXh0LnNwbGl0KCcgJylbMV0pO1xuLy8gICAgICAgfVxuLy8gICAgICAgaWYgKGxvbiAhPT0gMCB8fCBsYXQgIT09IDApIHtcbi8vICAgICAgICAgY29uc3QgW3RlbXAsIHRlbXBGZWVsLCB3aW5kXSA9IGF3YWl0IHdlYXRoZXIuZ2V0V2VhdGhlcihsb24sIGxhdCk7XG4vLyAgICAgICAgIGFuc3dlciA9IGDQn9C+0LPQvtC00LAg0LI6ICR7Y2l0eX1cXG5gXG4vLyAgICAgICAgICsgYNCi0LXQutGD0YnQsNGPINGC0LXQvNC/0LXRgNCw0YLRg9GA0LA6ICR7dGVtcH1cXG5gXG4vLyAgICAgICAgICsgYNCe0YnRg9GJ0LDQtdGC0YHRjyDQutCw0Lo6ICR7dGVtcEZlZWx9XFxuYFxuLy8gICAgICAgICArIGDQktC10YLQtdGAOiAke3dpbmR9YDtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGFuc3dlciA9ICfQndC1INGD0LTQsNC70L7RgdGMINC90LDQudGC0Lgg0LPQvtGA0L7QtCc7XG4vLyAgICAgICB9XG4vLyAgICAgICBhd2FpdCBodHRwUmVxdWVzdCh0ZWxlZ3JhbVVybCwgeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sIHsgbWV0aG9kOiBDTUQuc2VuZE1lc3NhZ2UsIGNoYXRfaWQ6IGNoYXRJZCwgdGV4dDogYW5zd2VyIH0sICdQT1NUJyk7XG4vLyAgICAgfSxcbi8vICAgfSxcbi8vICAgdW5kZWZpbmVkOiB7XG4vLyAgICAgZGVzY3JpcGlvbjogJ9Cd0LXQuNC30LLQtdGB0YLQvdCw0Y8g0LrQvtC80LDQvdC00LAnLFxuLy8gICAgIGhhbmRsZXI6XG4vLyAgICAgYXN5bmMgKGNoYXRJZCkgPT4ge1xuLy8gICAgICAgY29uc3QgYW5zd2VyID0gJ9Cd0LXQuNC30LLQtdGB0YLQvdCw0Y8g0LrQvtC80LDQvdC00LAsINCy0L7RgdC/0L7Qu9GM0LfRg9C50YLQtdGB0Ywg0YHQv9GA0LDQstC60L7QuSAvaGVscCc7XG4vLyAgICAgICBhd2FpdCBodHRwUmVxdWVzdCh0ZWxlZ3JhbVVybCwgeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sIHsgbWV0aG9kOiBDTUQuc2VuZE1lc3NhZ2UsIGNoYXRfaWQ6IGNoYXRJZCwgdGV4dDogYW5zd2VyIH0sICdQT1NUJyk7XG4vLyAgICAgfSxcbi8vICAgfSxcbi8vIH07XG5cbi8vIGZ1bmN0aW9uIHJlcVBhcnNlKGRhdGEpIHtcbi8vICAgY29uc3QgZGF0YVBhcnNlID0gSlNPTi5wYXJzZShkYXRhKTtcbi8vICAgY29uc3QgZW50aXRpZXMgPSBkYXRhUGFyc2UubWVzc2FnZS5lbnRpdGllc1swXSB8fCAnJztcbi8vICAgaWYgKGVudGl0aWVzLnR5cGUgPT09ICdib3RfY29tbWFuZCcpIHtcbi8vICAgICBzd2l0Y2ggKGRhdGFQYXJzZS5tZXNzYWdlLnRleHQuc3BsaXQoJyAnKVswXS50b0xvd2VyQ2FzZSgpKSB7XG4vLyAgICAgICBjYXNlICcvc3RhcnQnOlxuLy8gICAgICAgY2FzZSAnL2hlbHAnOlxuLy8gICAgICAgY2FzZSAnL3dlYXRoZXInOlxuLy8gICAgICAgICBldmVudGVyLmVtaXQoZGF0YVBhcnNlLm1lc3NhZ2UudGV4dC5zcGxpdCgnICcpWzBdLnRvTG93ZXJDYXNlKCksIGRhdGFQYXJzZS5tZXNzYWdlLmNoYXQuaWQsIGRhdGFQYXJzZSk7XG4vLyAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgZGVmYXVsdDpcbi8vICAgICAgICAgZXZlbnRlci5lbWl0KCd1bmRlZmluZWQnLCBkYXRhUGFyc2UubWVzc2FnZS5jaGF0LmlkKTtcbi8vICAgICAgICAgYnJlYWs7XG4vLyAgICAgfVxuLy8gICB9XG4vLyAgIHJldHVybiAwO1xuLy8gfVxuXG5jb25zdCBzZXJ2ZXIgPSBodHRwcy5jcmVhdGVTZXJ2ZXIoe1xuICBrZXksXG4gIGNlcnQsXG4gIGNhLFxufSk7XG5zZXJ2ZXIubGlzdGVuKFBPUlQpO1xuc2VydmVyLm9uKCdyZXF1ZXN0JywgKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gIGxldCByZXF1ZXN0RGF0YSA9ICcnO1xuICByZXF1ZXN0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICByZXF1ZXN0RGF0YSArPSBkYXRhO1xuICB9KTtcbiAgcmVxdWVzdC5vbignZW5kJywgKCkgPT4ge1xuICAgIC8vIHJlcVBhcnNlKHJlcXVlc3REYXRhKTtcbiAgICByZXNwb25zZS5lbmQoKTtcbiAgfSk7XG59KTtcbnNlcnZlci5vbignbGlzdGVuaW5nJywgYXN5bmMgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhgc2VydmVyIGxpc3Rlbm9uZyBvbiAke1BPUlR9IHBvcnRgKTtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY29ubmVjdCgnaHR0cHM6Ly9zdG9yYWdlLmVraW5jaGluLnJ1Ojg0NDMnKTtcbiAgY29uc29sZS5sb2cocmVzdWx0KTtcbn0pO1xuXG5cbi8vIGV2ZW50ZXIub24oJy93ZWF0aGVyJywgYm90Q29tbWFuZHNbJy93ZWF0aGVyJ10uaGFuZGxlcik7XG4vLyBldmVudGVyLm9uKCcvc3RhcnQnLCBib3RDb21tYW5kc1snL3N0YXJ0J10uaGFuZGxlcik7XG4vLyBldmVudGVyLm9uKCcvaGVscCcsIGJvdENvbW1hbmRzWycvaGVscCddLmhhbmRsZXIpO1xuLy8gZXZlbnRlci5vbigndW5kZWZpbmVkJywgYm90Q29tbWFuZHMudW5kZWZpbmVkLmhhbmRsZXIpO1xuXG5cbi8vIGNvbnN0IHNldFdlYkhvb2tVcmwgPSBuZXcgVVJMKCdodHRwczovL2FwaS50ZWxlZ3JhbS5vcmcvJyk7XG4vLyBzZXRXZWJIb29rVXJsLnBhdGhuYW1lID0gYGJvdCR7VEVMRUdSQU1fVE9LRU59LyR7Q01ELnNldFdlYkhvb2t9YDtcbi8vIHNldFdlYkhvb2tVcmwuc2VhcmNoUGFyYW1zLmFwcGVuZChcbi8vICAgJ3VybCcsXG4vLyAgICdodHRwczovL3N0b3JhZ2UuZWtpbmNoaW4ucnUvJyxcbi8vICk7XG4vLyAvLyBzZXRXZWJIb29rVXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoXG4vLyAvLyAgJ2NlcnRpZmljYXRlJyxcbi8vIC8vICBwdWJsaWNfa2V5LFxuLy8gLy8gKTtcblxuLy8gaHR0cFJlcXVlc3Qoc2V0V2ViSG9va1VybCwge30sICdHRVQnKS50aGVuKChyZXNvbHZlKSA9PiB7XG4vLyAgIGNvbnNvbGUubG9nKHJlc29sdmUpO1xuLy8gICBTZXJ2ZXIoKTtcbi8vIH0pO1xuIl19