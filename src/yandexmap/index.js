import httpRequest from './httpRequest'

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
