import { sendMessage } from '../telegram';
import getWeather from '../yandexweather';

const commandState = {
  ready: 'READY',
  waitLocation: 'WAITING_LOCATION',
  waitWeather: 'WAITING_WEATHER',
};

const locationRequest = async (payload) => {
  // eslint-disable-next-line camelcase
  const reply_markup = {
    reply_markup: {
      keyboard: [[{
        text: 'отдайте координаты',
        request_location: true,
        request_contact: false,
      }, {
        text: 'не отдам!',
        request_location: false,
        request_contact: false,
      }]],
      one_time_keyboard: true,
    },
  };
  const result = await sendMessage(payload.chat.id, 'Запрос местоположения', reply_markup);
  return result;
};

const weatherRequest = async (chatId, lat, lon) => {
  let answer = '';
  if (lat && lon) {
    const weather = await getWeather(lat, lon);
    const { fact } = weather;
    // eslint-disable-next-line camelcase
    const { temp, feels_like, wind_speed } = fact;
    // eslint-disable-next-line camelcase
    answer = `Текущая температура ${temp}, ощущается как ${feels_like}, скорость ветра ${wind_speed}`;
  } else {
    answer = 'Без координат не получится узнать погоду';
  }
  const result = await sendMessage(chatId, answer);
  return result;
};

const init = () => ({
  description: 'Погода',
  run: async (payload, context) => {
    const { state, ...prevContext } = context;
    const { location } = payload;
    const { latitude, longitude } = location || { undefined };
    switch (state) {
      case commandState.ready:
      case undefined:
        await locationRequest(payload);
        return {
          ...prevContext,
          state: commandState.waitLocation,
          commandDone: false,
        };
      case commandState.waitLocation:
        await weatherRequest(payload.chat.id, latitude, longitude);
        break;
      default:
        break;
    }
    return {
      ...prevContext,
      state: commandState.ready,
      commandDone: true,
    };
  },
});

export default init();
