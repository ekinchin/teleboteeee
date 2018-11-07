import { URL } from 'url';
import httpRequest from '../httpRequest';

class YandexWeather {
  constructor(token) {
    this.urlWeather = new URL('https://api.weather.yandex.ru');
    this.urlWeather.pathname = '/v1/informers';
    this.urlWeather.searchParams.append('lang', 'ru_RU');
    this.headerWeather = { 'X-Yandex-API-Key': token };
  }

  async getWeather(lon, lat) {
    this.urlWeather.searchParams.append('lat', lat);
    this.urlWeather.searchParams.append('lon', lon);
    let weather = await httpRequest(this.urlWeather, this.headerWeather, null, 'GET');
    weather = JSON.parse(weather);
    this.urlWeather.searchParams.delete('lat', lat);
    this.urlWeather.searchParams.delete('lon', lon);
    return [weather.fact.temp, weather.fact.feels_like, weather.fact.wind_speed];
  }
}

export default YandexWeather;
