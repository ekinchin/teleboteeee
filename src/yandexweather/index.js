import { URL } from 'url';
import request from '../request';

const { WEATHER_TOKEN } = process.env;
const WWWWEATHER = 'https://api.weather.yandex.ru';

const getWeather = async (lat, lon) => {
  const url = new URL(WWWWEATHER);
  url.pathname = 'v2/informers';
  url.searchParams.append('lang', 'ru_RU');
  url.searchParams.append('lat', lat);
  url.searchParams.append('lon', lon);
  const headers = { 'X-Yandex-API-Key': WEATHER_TOKEN };
  const answer = await request(url, headers, 'GET')();
  return JSON.parse(answer);
};

export default getWeather;
