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
    const answer = await httpRequest(this.urlMap, {}, null, 'GET');
    const answerParse = JSON.parse(answer);
    const cityParse = answerParse.response.GeoObjectCollection.featureMember[0]
      .GeoObject.metaDataProperty.GeocoderMetaData.text || 0;
    const location = answerParse.response.GeoObjectCollection.featureMember[0]
      .GeoObject.Point.pos || '';
    const [lon, lat] = location.split(' ') || [0, 0];
    /*
    if (
      geoLocationParse.response.GeoObjectCollection
        .metaDataProperty.GeocoderResponseMetaData
        .found !== '0'
    ) {
      cityParse = geoLocationParse.response.GeoObjectCollection.featureMember[0]
        .GeoObject.metaDataProperty.GeocoderMetaData.text;
      [lon, lat] = geoLocationParse.response.GeoObjectCollection
        .featureMember[0].GeoObject.Point.pos.split(' ');
    }
    */
    this.urlMap.searchParams.delete('geocode', city);
    return [cityParse, lon, lat];
  }
}

export default YandexMap;
