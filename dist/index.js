"use strict";

var _http = _interopRequireDefault(require("http"));

var _https = _interopRequireDefault(require("https"));

var _url = _interopRequireDefault(require("url"));

var _events = _interopRequireDefault(require("events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const eventer = new _events.default.EventEmitter();
const CMD = {
  setWebHook: 'setWebhook',
  getUpdates: 'getUpdates',
  sendMessage: 'sendMessage'
};
const token = '674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc';
const telegramUrl = new _url.default.URL('https://api.telegram.org');
telegramUrl.pathname = `bot${token}/${CMD.sendMessage}`;

async function sendHttpRequest(urlReq, headers, dataReq, method) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: urlReq.hostname,
      port: 443,
      path: urlReq.pathname + urlReq.search
    };
    options.method = method;
    options.headers = headers;

    const req = _https.default.request(options, res => {
      let answer = '';
      res.on('data', dataRes => {
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
  getLocation: async city => {
    const geoUrl = new _url.default.URL('https://geocode-maps.yandex.ru');
    geoUrl.pathname = '/1.x/';
    geoUrl.searchParams.append('format', 'json');
    geoUrl.searchParams.append('results', '1');
    geoUrl.searchParams.append('geocode', city);
    const geoLocation = await sendHttpRequest(geoUrl, {}, null, 'GET');
    const geoLocationParse = JSON.parse(geoLocation);
    let cityParse;
    let lon;
    let lat;

    if (geoLocationParse.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found !== '0') {
      cityParse = geoLocationParse.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
      [lon, lat] = geoLocationParse.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
    }

    return [cityParse || city, lon || 0, lat || 0];
  },
  getWeather: async (lon, lat) => {
    const weatherUrl = new _url.default.URL('https://api.weather.yandex.ru');
    weatherUrl.pathname = '/v1/informers';
    weatherUrl.searchParams.append('lang', 'ru_RU');
    weatherUrl.searchParams.append('lat', lat);
    weatherUrl.searchParams.append('lon', lon);
    const weatherHeader = {
      'X-Yandex-API-Key': '40f0e52b-168d-40a4-ba38-0c2bf4d98726'
    };
    let weather = await sendHttpRequest(weatherUrl, weatherHeader, null, 'GET');
    weather = JSON.parse(weather);
    return [weather.fact.temp, weather.fact.feels_like, weather.fact.wind_speed];
  }
};
const botCommands = {
  '/start': {
    descripion: 'Начать работу с ботом',
    handler: async (chatId, data) => {
      const answer = `Hello, ${data.message.from.first_name}`;
      await sendHttpRequest(telegramUrl, {
        'Content-Type': 'application/json'
      }, {
        method: CMD.sendMessage,
        chat_id: chatId,
        text: answer
      }, 'POST');
    }
  },
  '/help': {
    descripion: 'Помощь',
    handler: async chatId => {
      const answer = '/start - поздороваться\n/weather - текущая погода\n/help - эта справка';
      await sendHttpRequest(telegramUrl, {
        'Content-Type': 'application/json'
      }, {
        method: CMD.sendMessage,
        chat_id: chatId,
        text: answer
      }, 'POST');
    }
  },
  '/weather': {
    descripion: 'Погода',
    handler: async (chatId, data) => {
      let city = 'Tyumen';
      let lat = 57;
      let lon = 65;
      let answer = '';

      if (data.message.text.split(' ')[1] !== undefined) {
        [city, lon, lat] = await yaApi.getLocation(data.message.text.split(' ')[1]);
      }

      if (lon !== 0 || lat !== 0) {
        const [temp, tempFeel, wind] = await yaApi.getWeather(lon, lat);
        answer = `Погода в: ${city}\n` + `Текущая температура: ${temp}\n` + `Ощущается как: ${tempFeel}\n` + `Ветер: ${wind}`;
      } else {
        answer = 'Не удалось найти город';
      }

      await sendHttpRequest(telegramUrl, {
        'Content-Type': 'application/json'
      }, {
        method: CMD.sendMessage,
        chat_id: chatId,
        text: answer
      }, 'POST');
    }
  },
  undefined: {
    descripion: 'Неизвестная команда',
    handler: async chatId => {
      const answer = 'Неизвестная команда, воспользуйтесь справкой /help';
      await sendHttpRequest(telegramUrl, {
        'Content-Type': 'application/json'
      }, {
        method: CMD.sendMessage,
        chat_id: chatId,
        text: answer
      }, 'POST');
    }
  }
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
  const server = _http.default.createServer();

  server.listen(process.env.PORT);
  server.on('request', (request, response) => {
    let requestData = '';
    request.on('data', data => {
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
const setWebHookUrl = new _url.default.URL('https://api.telegram.org/');
setWebHookUrl.pathname = `bot${token}${CMD.setWebHook}`;
setWebHookUrl.searchParams.append('url', 'https://teleboteeee.herokuapp.com/');
sendHttpRequest(setWebHookUrl, {}, null, 'GET').then(Server);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sIm5hbWVzIjpbImV2ZW50ZXIiLCJldmVudHMiLCJFdmVudEVtaXR0ZXIiLCJDTUQiLCJzZXRXZWJIb29rIiwiZ2V0VXBkYXRlcyIsInNlbmRNZXNzYWdlIiwidG9rZW4iLCJ0ZWxlZ3JhbVVybCIsInVybCIsIlVSTCIsInBhdGhuYW1lIiwic2VuZEh0dHBSZXF1ZXN0IiwidXJsUmVxIiwiaGVhZGVycyIsImRhdGFSZXEiLCJtZXRob2QiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9wdGlvbnMiLCJob3N0bmFtZSIsInBvcnQiLCJwYXRoIiwic2VhcmNoIiwicmVxIiwiaHR0cHMiLCJyZXF1ZXN0IiwicmVzIiwiYW5zd2VyIiwib24iLCJkYXRhUmVzIiwidW5kZWZpbmVkIiwid3JpdGUiLCJKU09OIiwic3RyaW5naWZ5IiwiZW5kIiwieWFBcGkiLCJnZXRMb2NhdGlvbiIsImNpdHkiLCJnZW9VcmwiLCJzZWFyY2hQYXJhbXMiLCJhcHBlbmQiLCJnZW9Mb2NhdGlvbiIsImdlb0xvY2F0aW9uUGFyc2UiLCJwYXJzZSIsImNpdHlQYXJzZSIsImxvbiIsImxhdCIsInJlc3BvbnNlIiwiR2VvT2JqZWN0Q29sbGVjdGlvbiIsIm1ldGFEYXRhUHJvcGVydHkiLCJHZW9jb2RlclJlc3BvbnNlTWV0YURhdGEiLCJmb3VuZCIsImZlYXR1cmVNZW1iZXIiLCJHZW9PYmplY3QiLCJHZW9jb2Rlck1ldGFEYXRhIiwidGV4dCIsIlBvaW50IiwicG9zIiwic3BsaXQiLCJnZXRXZWF0aGVyIiwid2VhdGhlclVybCIsIndlYXRoZXJIZWFkZXIiLCJ3ZWF0aGVyIiwiZmFjdCIsInRlbXAiLCJmZWVsc19saWtlIiwid2luZF9zcGVlZCIsImJvdENvbW1hbmRzIiwiZGVzY3JpcGlvbiIsImhhbmRsZXIiLCJjaGF0SWQiLCJkYXRhIiwibWVzc2FnZSIsImZyb20iLCJmaXJzdF9uYW1lIiwiY2hhdF9pZCIsInRlbXBGZWVsIiwid2luZCIsInJlcVBhcnNlIiwiZGF0YVBhcnNlIiwiZW50aXRpZXMiLCJ0eXBlIiwidG9Mb3dlckNhc2UiLCJlbWl0IiwiY2hhdCIsImlkIiwiU2VydmVyIiwic2VydmVyIiwiaHR0cCIsImNyZWF0ZVNlcnZlciIsImxpc3RlbiIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwicmVxdWVzdERhdGEiLCJzZXRXZWJIb29rVXJsIiwidGhlbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLE9BQU8sR0FBRyxJQUFJQyxnQkFBT0MsWUFBWCxFQUFoQjtBQUVBLE1BQU1DLEdBQUcsR0FBRztBQUNWQyxFQUFBQSxVQUFVLEVBQUUsWUFERjtBQUVWQyxFQUFBQSxVQUFVLEVBQUUsWUFGRjtBQUdWQyxFQUFBQSxXQUFXLEVBQUU7QUFISCxDQUFaO0FBTUEsTUFBTUMsS0FBSyxHQUFHLCtDQUFkO0FBQ0EsTUFBTUMsV0FBVyxHQUFHLElBQUlDLGFBQUlDLEdBQVIsQ0FBWSwwQkFBWixDQUFwQjtBQUNBRixXQUFXLENBQUNHLFFBQVosR0FBd0IsTUFBS0osS0FBTSxJQUFHSixHQUFHLENBQUNHLFdBQVksRUFBdEQ7O0FBRUEsZUFBZU0sZUFBZixDQUErQkMsTUFBL0IsRUFBdUNDLE9BQXZDLEVBQWdEQyxPQUFoRCxFQUF5REMsTUFBekQsRUFBaUU7QUFDL0QsU0FBTyxJQUFJQyxPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ3RDLFVBQU1DLE9BQU8sR0FBRztBQUNkQyxNQUFBQSxRQUFRLEVBQUVSLE1BQU0sQ0FBQ1EsUUFESDtBQUVkQyxNQUFBQSxJQUFJLEVBQUUsR0FGUTtBQUdkQyxNQUFBQSxJQUFJLEVBQUVWLE1BQU0sQ0FBQ0YsUUFBUCxHQUFrQkUsTUFBTSxDQUFDVztBQUhqQixLQUFoQjtBQUtBSixJQUFBQSxPQUFPLENBQUNKLE1BQVIsR0FBaUJBLE1BQWpCO0FBQ0FJLElBQUFBLE9BQU8sQ0FBQ04sT0FBUixHQUFrQkEsT0FBbEI7O0FBRUEsVUFBTVcs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QUFSLENBQVcsS0FBWCxFQUFrQixNQUFNO0FBQ3RCa0QsTUFBQUEsUUFBUSxDQUFDZ0IsV0FBRCxDQUFSO0FBQ0EvQyxNQUFBQSxRQUFRLENBQUNiLEdBQVQ7QUFDRCxLQUhEO0FBSUQsR0FURDtBQVVEOztBQUVEcEMsT0FBTyxDQUFDOEIsRUFBUixDQUFXLFVBQVgsRUFBdUJ1QyxXQUFXLENBQUMsVUFBRCxDQUFYLENBQXdCRSxPQUEvQztBQUNBdkUsT0FBTyxDQUFDOEIsRUFBUixDQUFXLFFBQVgsRUFBcUJ1QyxXQUFXLENBQUMsUUFBRCxDQUFYLENBQXNCRSxPQUEzQztBQUNBdkUsT0FBTyxDQUFDOEIsRUFBUixDQUFXLE9BQVgsRUFBb0J1QyxXQUFXLENBQUMsT0FBRCxDQUFYLENBQXFCRSxPQUF6QztBQUNBdkUsT0FBTyxDQUFDOEIsRUFBUixDQUFXLFdBQVgsRUFBd0J1QyxXQUFXLENBQUNyQyxTQUFaLENBQXNCdUMsT0FBOUM7QUFHQSxNQUFNMEIsYUFBYSxHQUFHLElBQUl4RixhQUFJQyxHQUFSLENBQVksMkJBQVosQ0FBdEI7QUFDQXVGLGFBQWEsQ0FBQ3RGLFFBQWQsR0FBMEIsTUFBS0osS0FBTSxHQUFFSixHQUFHLENBQUNDLFVBQVcsRUFBdEQ7QUFDQTZGLGFBQWEsQ0FBQ3hELFlBQWQsQ0FBMkJDLE1BQTNCLENBQ0UsS0FERixFQUVFLG9DQUZGO0FBS0E5QixlQUFlLENBQUNxRixhQUFELEVBQWdCLEVBQWhCLEVBQW9CLElBQXBCLEVBQTBCLEtBQTFCLENBQWYsQ0FBZ0RDLElBQWhELENBQXFEVixNQUFyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IGh0dHBzIGZyb20gJ2h0dHBzJztcbmltcG9ydCB1cmwgZnJvbSAndXJsJztcbmltcG9ydCBldmVudHMgZnJvbSAnZXZlbnRzJztcblxuY29uc3QgZXZlbnRlciA9IG5ldyBldmVudHMuRXZlbnRFbWl0dGVyKCk7XG5cbmNvbnN0IENNRCA9IHtcbiAgc2V0V2ViSG9vazogJ3NldFdlYmhvb2snLFxuICBnZXRVcGRhdGVzOiAnZ2V0VXBkYXRlcycsXG4gIHNlbmRNZXNzYWdlOiAnc2VuZE1lc3NhZ2UnLFxufTtcblxuY29uc3QgdG9rZW4gPSAnNjc0MDgyMzE4OkFBRzRlNUFYUXVfU2JKa1lTVmppNGNod2FpZ2d0R3JNTEJjJztcbmNvbnN0IHRlbGVncmFtVXJsID0gbmV3IHVybC5VUkwoJ2h0dHBzOi8vYXBpLnRlbGVncmFtLm9yZycpO1xudGVsZWdyYW1VcmwucGF0aG5hbWUgPSBgYm90JHt0b2tlbn0vJHtDTUQuc2VuZE1lc3NhZ2V9YDtcblxuYXN5bmMgZnVuY3Rpb24gc2VuZEh0dHBSZXF1ZXN0KHVybFJlcSwgaGVhZGVycywgZGF0YVJlcSwgbWV0aG9kKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIGhvc3RuYW1lOiB1cmxSZXEuaG9zdG5hbWUsXG4gICAgICBwb3J0OiA0NDMsXG4gICAgICBwYXRoOiB1cmxSZXEucGF0aG5hbWUgKyB1cmxSZXEuc2VhcmNoLFxuICAgIH07XG4gICAgb3B0aW9ucy5tZXRob2QgPSBtZXRob2Q7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gaGVhZGVycztcblxuICAgIGNvbnN0IHJlcSA9IGh0dHBzLnJlcXVlc3Qob3B0aW9ucywgKHJlcykgPT4ge1xuICAgICAgbGV0IGFuc3dlciA9ICcnO1xuICAgICAgcmVzLm9uKCdkYXRhJywgKGRhdGFSZXMpID0+IHtcbiAgICAgICAgYW5zd2VyICs9IGRhdGFSZXM7XG4gICAgICB9KTtcbiAgICAgIHJlcy5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlKGFuc3dlcik7XG4gICAgICB9KTtcbiAgICAgIHJlcy5vbignZXJyb3InLCAoKSA9PiB7XG4gICAgICAgIHJlamVjdChhbnN3ZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKG9wdGlvbnMuaGVhZGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoJ0NvbnRlbnQtVHlwZScgaW4gb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICAgICAgICByZXEud3JpdGUoSlNPTi5zdHJpbmdpZnkoZGF0YVJlcSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJlcS5lbmQoKTtcbiAgfSk7XG59XG5cbmNvbnN0IHlhQXBpID0ge1xuICBnZXRMb2NhdGlvbjogYXN5bmMgKGNpdHkpID0+IHtcbiAgICBjb25zdCBnZW9VcmwgPSBuZXcgdXJsLlVSTCgnaHR0cHM6Ly9nZW9jb2RlLW1hcHMueWFuZGV4LnJ1Jyk7XG4gICAgZ2VvVXJsLnBhdGhuYW1lID0gJy8xLngvJztcbiAgICBnZW9Vcmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnZm9ybWF0JywgJ2pzb24nKTtcbiAgICBnZW9Vcmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgncmVzdWx0cycsICcxJyk7XG4gICAgZ2VvVXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ2dlb2NvZGUnLCBjaXR5KTtcblxuICAgIGNvbnN0IGdlb0xvY2F0aW9uID0gYXdhaXQgc2VuZEh0dHBSZXF1ZXN0KGdlb1VybCwge30sIG51bGwsICdHRVQnKTtcbiAgICBjb25zdCBnZW9Mb2NhdGlvblBhcnNlID0gSlNPTi5wYXJzZShnZW9Mb2NhdGlvbik7XG4gICAgbGV0IGNpdHlQYXJzZTtcbiAgICBsZXQgbG9uO1xuICAgIGxldCBsYXQ7XG4gICAgaWYgKFxuICAgICAgZ2VvTG9jYXRpb25QYXJzZS5yZXNwb25zZS5HZW9PYmplY3RDb2xsZWN0aW9uXG4gICAgICAgIC5tZXRhRGF0YVByb3BlcnR5Lkdlb2NvZGVyUmVzcG9uc2VNZXRhRGF0YVxuICAgICAgICAuZm91bmQgIT09ICcwJ1xuICAgICkge1xuICAgICAgY2l0eVBhcnNlID0gZ2VvTG9jYXRpb25QYXJzZS5yZXNwb25zZS5HZW9PYmplY3RDb2xsZWN0aW9uLmZlYXR1cmVNZW1iZXJbMF1cbiAgICAgICAgLkdlb09iamVjdC5tZXRhRGF0YVByb3BlcnR5Lkdlb2NvZGVyTWV0YURhdGEudGV4dDtcbiAgICAgIFtsb24sIGxhdF0gPSBnZW9Mb2NhdGlvblBhcnNlLnJlc3BvbnNlLkdlb09iamVjdENvbGxlY3Rpb24uZmVhdHVyZU1lbWJlclswXS5HZW9PYmplY3QuUG9pbnQucG9zLnNwbGl0KCcgJyk7XG4gICAgfVxuICAgIHJldHVybiBbY2l0eVBhcnNlIHx8IGNpdHksIGxvbiB8fCAwLCBsYXQgfHwgMF07XG4gIH0sXG4gIGdldFdlYXRoZXI6IGFzeW5jIChsb24sIGxhdCkgPT4ge1xuICAgIGNvbnN0IHdlYXRoZXJVcmwgPSBuZXcgdXJsLlVSTCgnaHR0cHM6Ly9hcGkud2VhdGhlci55YW5kZXgucnUnKTtcbiAgICB3ZWF0aGVyVXJsLnBhdGhuYW1lID0gJy92MS9pbmZvcm1lcnMnO1xuICAgIHdlYXRoZXJVcmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnbGFuZycsICdydV9SVScpO1xuICAgIHdlYXRoZXJVcmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnbGF0JywgbGF0KTtcbiAgICB3ZWF0aGVyVXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ2xvbicsIGxvbik7XG4gICAgY29uc3Qgd2VhdGhlckhlYWRlciA9IHsgJ1gtWWFuZGV4LUFQSS1LZXknOiAnNDBmMGU1MmItMTY4ZC00MGE0LWJhMzgtMGMyYmY0ZDk4NzI2JyB9O1xuXG4gICAgbGV0IHdlYXRoZXIgPSBhd2FpdCBzZW5kSHR0cFJlcXVlc3Qod2VhdGhlclVybCwgd2VhdGhlckhlYWRlciwgbnVsbCwgJ0dFVCcpO1xuICAgIHdlYXRoZXIgPSBKU09OLnBhcnNlKHdlYXRoZXIpO1xuICAgIHJldHVybiBbd2VhdGhlci5mYWN0LnRlbXAsIHdlYXRoZXIuZmFjdC5mZWVsc19saWtlLCB3ZWF0aGVyLmZhY3Qud2luZF9zcGVlZF07XG4gIH0sXG59O1xuXG5jb25zdCBib3RDb21tYW5kcyA9IHtcbiAgJy9zdGFydCc6IHtcbiAgICBkZXNjcmlwaW9uOiAn0J3QsNGH0LDRgtGMINGA0LDQsdC+0YLRgyDRgSDQsdC+0YLQvtC8JyxcbiAgICBoYW5kbGVyOlxuICAgIGFzeW5jIChjaGF0SWQsIGRhdGEpID0+IHtcbiAgICAgIGNvbnN0IGFuc3dlciA9IGBIZWxsbywgJHtkYXRhLm1lc3NhZ2UuZnJvbS5maXJzdF9uYW1lfWA7XG4gICAgICBhd2FpdCBzZW5kSHR0cFJlcXVlc3QodGVsZWdyYW1VcmwsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LCB7IG1ldGhvZDogQ01ELnNlbmRNZXNzYWdlLCBjaGF0X2lkOiBjaGF0SWQsIHRleHQ6IGFuc3dlciB9LCAnUE9TVCcpO1xuICAgIH0sXG4gIH0sXG4gICcvaGVscCc6IHtcbiAgICBkZXNjcmlwaW9uOiAn0J/QvtC80L7RidGMJyxcbiAgICBoYW5kbGVyOlxuICAgIGFzeW5jIChjaGF0SWQpID0+IHtcbiAgICAgIGNvbnN0IGFuc3dlciA9ICcvc3RhcnQgLSDQv9C+0LfQtNC+0YDQvtCy0LDRgtGM0YHRj1xcbi93ZWF0aGVyIC0g0YLQtdC60YPRidCw0Y8g0L/QvtCz0L7QtNCwXFxuL2hlbHAgLSDRjdGC0LAg0YHQv9GA0LDQstC60LAnO1xuICAgICAgYXdhaXQgc2VuZEh0dHBSZXF1ZXN0KHRlbGVncmFtVXJsLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSwgeyBtZXRob2Q6IENNRC5zZW5kTWVzc2FnZSwgY2hhdF9pZDogY2hhdElkLCB0ZXh0OiBhbnN3ZXIgfSwgJ1BPU1QnKTtcbiAgICB9LFxuICB9LFxuICAnL3dlYXRoZXInOiB7XG4gICAgZGVzY3JpcGlvbjogJ9Cf0L7Qs9C+0LTQsCcsXG4gICAgaGFuZGxlcjpcbiAgICBhc3luYyAoY2hhdElkLCBkYXRhKSA9PiB7XG4gICAgICBsZXQgY2l0eSA9ICdUeXVtZW4nO1xuICAgICAgbGV0IGxhdCA9IDU3O1xuICAgICAgbGV0IGxvbiA9IDY1O1xuICAgICAgbGV0IGFuc3dlciA9ICcnO1xuICAgICAgaWYgKGRhdGEubWVzc2FnZS50ZXh0LnNwbGl0KCcgJylbMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBbY2l0eSwgbG9uLCBsYXRdID0gYXdhaXQgeWFBcGkuZ2V0TG9jYXRpb24oZGF0YS5tZXNzYWdlLnRleHQuc3BsaXQoJyAnKVsxXSk7XG4gICAgICB9XG4gICAgICBpZiAobG9uICE9PSAwIHx8IGxhdCAhPT0gMCkge1xuICAgICAgICBjb25zdCBbdGVtcCwgdGVtcEZlZWwsIHdpbmRdID0gYXdhaXQgeWFBcGkuZ2V0V2VhdGhlcihsb24sIGxhdCk7XG4gICAgICAgIGFuc3dlciA9IGDQn9C+0LPQvtC00LAg0LI6ICR7Y2l0eX1cXG5gXG4gICAgICAgICsgYNCi0LXQutGD0YnQsNGPINGC0LXQvNC/0LXRgNCw0YLRg9GA0LA6ICR7dGVtcH1cXG5gXG4gICAgICAgICsgYNCe0YnRg9GJ0LDQtdGC0YHRjyDQutCw0Lo6ICR7dGVtcEZlZWx9XFxuYFxuICAgICAgICArIGDQktC10YLQtdGAOiAke3dpbmR9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFuc3dlciA9ICfQndC1INGD0LTQsNC70L7RgdGMINC90LDQudGC0Lgg0LPQvtGA0L7QtCc7XG4gICAgICB9XG4gICAgICBhd2FpdCBzZW5kSHR0cFJlcXVlc3QodGVsZWdyYW1VcmwsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LCB7IG1ldGhvZDogQ01ELnNlbmRNZXNzYWdlLCBjaGF0X2lkOiBjaGF0SWQsIHRleHQ6IGFuc3dlciB9LCAnUE9TVCcpO1xuICAgIH0sXG4gIH0sXG4gIHVuZGVmaW5lZDoge1xuICAgIGRlc2NyaXBpb246ICfQndC10LjQt9Cy0LXRgdGC0L3QsNGPINC60L7QvNCw0L3QtNCwJyxcbiAgICBoYW5kbGVyOlxuICAgIGFzeW5jIChjaGF0SWQpID0+IHtcbiAgICAgIGNvbnN0IGFuc3dlciA9ICfQndC10LjQt9Cy0LXRgdGC0L3QsNGPINC60L7QvNCw0L3QtNCwLCDQstC+0YHQv9C+0LvRjNC30YPQudGC0LXRgdGMINGB0L/RgNCw0LLQutC+0LkgL2hlbHAnO1xuICAgICAgYXdhaXQgc2VuZEh0dHBSZXF1ZXN0KHRlbGVncmFtVXJsLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSwgeyBtZXRob2Q6IENNRC5zZW5kTWVzc2FnZSwgY2hhdF9pZDogY2hhdElkLCB0ZXh0OiBhbnN3ZXIgfSwgJ1BPU1QnKTtcbiAgICB9LFxuICB9LFxufTtcblxuZnVuY3Rpb24gcmVxUGFyc2UoZGF0YSkge1xuICBjb25zdCBkYXRhUGFyc2UgPSBKU09OLnBhcnNlKGRhdGEpO1xuICBjb25zdCBlbnRpdGllcyA9IGRhdGFQYXJzZS5tZXNzYWdlLmVudGl0aWVzWzBdIHx8ICcnO1xuICBpZiAoZW50aXRpZXMudHlwZSA9PT0gJ2JvdF9jb21tYW5kJykge1xuICAgIHN3aXRjaCAoZGF0YVBhcnNlLm1lc3NhZ2UudGV4dC5zcGxpdCgnICcpWzBdLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIGNhc2UgJy9zdGFydCc6XG4gICAgICBjYXNlICcvaGVscCc6XG4gICAgICBjYXNlICcvd2VhdGhlcic6XG4gICAgICAgIGV2ZW50ZXIuZW1pdChkYXRhUGFyc2UubWVzc2FnZS50ZXh0LnNwbGl0KCcgJylbMF0udG9Mb3dlckNhc2UoKSwgZGF0YVBhcnNlLm1lc3NhZ2UuY2hhdC5pZCwgZGF0YVBhcnNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBldmVudGVyLmVtaXQoJ3VuZGVmaW5lZCcsIGRhdGFQYXJzZS5tZXNzYWdlLmNoYXQuaWQpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIFNlcnZlcigpIHtcbiAgY29uc3Qgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoKTtcbiAgc2VydmVyLmxpc3Rlbihwcm9jZXNzLmVudi5QT1JUKTtcbiAgc2VydmVyLm9uKCdyZXF1ZXN0JywgKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgbGV0IHJlcXVlc3REYXRhID0gJyc7XG4gICAgcmVxdWVzdC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICByZXF1ZXN0RGF0YSArPSBkYXRhO1xuICAgIH0pO1xuICAgIHJlcXVlc3Qub24oJ2VuZCcsICgpID0+IHtcbiAgICAgIHJlcVBhcnNlKHJlcXVlc3REYXRhKTtcbiAgICAgIHJlc3BvbnNlLmVuZCgpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZXZlbnRlci5vbignL3dlYXRoZXInLCBib3RDb21tYW5kc1snL3dlYXRoZXInXS5oYW5kbGVyKTtcbmV2ZW50ZXIub24oJy9zdGFydCcsIGJvdENvbW1hbmRzWycvc3RhcnQnXS5oYW5kbGVyKTtcbmV2ZW50ZXIub24oJy9oZWxwJywgYm90Q29tbWFuZHNbJy9oZWxwJ10uaGFuZGxlcik7XG5ldmVudGVyLm9uKCd1bmRlZmluZWQnLCBib3RDb21tYW5kcy51bmRlZmluZWQuaGFuZGxlcik7XG5cblxuY29uc3Qgc2V0V2ViSG9va1VybCA9IG5ldyB1cmwuVVJMKCdodHRwczovL2FwaS50ZWxlZ3JhbS5vcmcvJyk7XG5zZXRXZWJIb29rVXJsLnBhdGhuYW1lID0gYGJvdCR7dG9rZW59JHtDTUQuc2V0V2ViSG9va31gO1xuc2V0V2ViSG9va1VybC5zZWFyY2hQYXJhbXMuYXBwZW5kKFxuICAndXJsJyxcbiAgJ2h0dHBzOi8vdGVsZWJvdGVlZWUuaGVyb2t1YXBwLmNvbS8nLFxuKTtcblxuc2VuZEh0dHBSZXF1ZXN0KHNldFdlYkhvb2tVcmwsIHt9LCBudWxsLCAnR0VUJykudGhlbihTZXJ2ZXIpO1xuIl19