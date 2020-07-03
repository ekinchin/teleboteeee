import { sendMessage } from '../telegram';

export default {
  descripion: 'Погода',
  run: async (payload) => {
    const answer = 'В настоящий момент команда не работает';
    const result = await sendMessage(payload.chat.id, answer);
    return result;
  },
};

// import { URL } from 'url';
// import request from '../httpRequest';
// import YandexMap from '../yandexmap';
// import YandexWeather from '../yandexweather';

// const { TELEGRAM_TOKEN, WEATHER_TOKEN } = process.env;

// const telegramUrl = new URL('https://api.telegram.org');
// telegramUrl.pathname = `bot${TELEGRAM_TOKEN}/sendMessage`;

// const map = new YandexMap();
// const weather = new YandexWeather(WEATHER_TOKEN);

// export default {
//   descripion: 'Погода',
//   handler: async (chatId, data) => {
//     let city = 'Tyumen';
//     let lat = 57;
//     let lon = 65;
//     let answer = '';
//     if (data.message.text.split(' ')[1] !== undefined) {
//       [city, lon, lat] = await map.getLocation(data.message.text.split(' ')[1]);
//     }
//     if (lon !== 0 || lat !== 0) {
//       const [temp, tempFeel, wind] = await weather.getWeather(lon, lat);
//       answer = `Погода в: ${city}\n`
//         + `Текущая температура: ${temp}\n`
//         + `Ощущается как: ${tempFeel}\n`
//         + `Ветер: ${wind}`;
//     } else {
//       answer = 'Не удалось найти город';
//     }
//     await request(telegramUrl, { 'Content-Type': 'application/json' }, { method: 'sendMessage', chat_id: chatId, text: answer }, 'POST');
//   },
// };
