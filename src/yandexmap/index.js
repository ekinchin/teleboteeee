import { URL } from 'url';
import httpRequest from '../httpRequest';


class YandexMap {
  constructor() {
    this.urlMap = new URL('https://geocode-maps.yandex.ru');
    this.urlMap.pathname = '/1.x/';
    this.urlMap.searchParams.append('format', 'json');
    this.urlMap.searchParams.append('results', '1');
  }

  async getLocation(city) {
    this.urlMap.searchParams.append('geocode', city);
    const geoLocation = await httpRequest(this.urlMap, {}, null, 'GET');
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
    this.urlMap.searchParams.delete('geocode', city);
    return [cityParse || city, lon || 0, lat || 0];
  }
}

export default YandexMap;
