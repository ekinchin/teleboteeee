"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = require("url");

var _httpRequest = _interopRequireDefault(require("../httpRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Yandexmap {
  constructor() {
    this.urlMap = new _url.URL('https://geocode-maps.yandex.ru');
    this.urlMap.pathname = '/1.x/';
    this.urlMap.searchParams.append('format', 'json');
    this.urlMap.searchParams.append('results', '1');
  }

  async getLocation(city) {
    this.urlMap.searchParams.append('geocode', city);
    const geoLocation = await (0, _httpRequest.default)(this.urlMap, {}, null, 'GET');
    const geoLocationParse = JSON.parse(geoLocation);
    let cityParse;
    let lon;
    let lat;

    if (geoLocationParse.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found !== '0') {
      cityParse = geoLocationParse.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
      [lon, lat] = geoLocationParse.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
    }

    this.urlMap.searchParams.delete('geocode', city);
    return [cityParse || city, lon || 0, lat || 0];
  }

}

var _default = Yandexmap;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy95YW5kZXhtYXAvaW5kZXguanMiXSwibmFtZXMiOlsiWWFuZGV4bWFwIiwiY29uc3RydWN0b3IiLCJ1cmxNYXAiLCJVUkwiLCJwYXRobmFtZSIsInNlYXJjaFBhcmFtcyIsImFwcGVuZCIsImdldExvY2F0aW9uIiwiY2l0eSIsImdlb0xvY2F0aW9uIiwiZ2VvTG9jYXRpb25QYXJzZSIsIkpTT04iLCJwYXJzZSIsImNpdHlQYXJzZSIsImxvbiIsImxhdCIsInJlc3BvbnNlIiwiR2VvT2JqZWN0Q29sbGVjdGlvbiIsIm1ldGFEYXRhUHJvcGVydHkiLCJHZW9jb2RlclJlc3BvbnNlTWV0YURhdGEiLCJmb3VuZCIsImZlYXR1cmVNZW1iZXIiLCJHZW9PYmplY3QiLCJHZW9jb2Rlck1ldGFEYXRhIiwidGV4dCIsIlBvaW50IiwicG9zIiwic3BsaXQiLCJkZWxldGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUdBLE1BQU1BLFNBQU4sQ0FBZ0I7QUFDZEMsRUFBQUEsV0FBVyxHQUFHO0FBQ1osU0FBS0MsTUFBTCxHQUFjLElBQUlDLFFBQUosQ0FBUSxnQ0FBUixDQUFkO0FBQ0EsU0FBS0QsTUFBTCxDQUFZRSxRQUFaLEdBQXVCLE9BQXZCO0FBQ0EsU0FBS0YsTUFBTCxDQUFZRyxZQUFaLENBQXlCQyxNQUF6QixDQUFnQyxRQUFoQyxFQUEwQyxNQUExQztBQUNBLFNBQUtKLE1BQUwsQ0FBWUcsWUFBWixDQUF5QkMsTUFBekIsQ0FBZ0MsU0FBaEMsRUFBMkMsR0FBM0M7QUFDRDs7QUFFRCxRQUFNQyxXQUFOLENBQWtCQyxJQUFsQixFQUF3QjtBQUN0QixTQUFLTixNQUFMLENBQVlHLFlBQVosQ0FBeUJDLE1BQXpCLENBQWdDLFNBQWhDLEVBQTJDRSxJQUEzQztBQUNBLFVBQU1DLFdBQVcsR0FBRyxNQUFNLDBCQUFZLEtBQUtQLE1BQWpCLEVBQXlCLEVBQXpCLEVBQTZCLElBQTdCLEVBQW1DLEtBQW5DLENBQTFCO0FBQ0EsVUFBTVEsZ0JBQWdCLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXSCxXQUFYLENBQXpCO0FBQ0EsUUFBSUksU0FBSjtBQUNBLFFBQUlDLEdBQUo7QUFDQSxRQUFJQyxHQUFKOztBQUNBLFFBQ0VMLGdCQUFnQixDQUFDTSxRQUFqQixDQUEwQkMsbUJBQTFCLENBQ0dDLGdCQURILENBQ29CQyx3QkFEcEIsQ0FFR0MsS0FGSCxLQUVhLEdBSGYsRUFJRTtBQUNBUCxNQUFBQSxTQUFTLEdBQUdILGdCQUFnQixDQUFDTSxRQUFqQixDQUEwQkMsbUJBQTFCLENBQThDSSxhQUE5QyxDQUE0RCxDQUE1RCxFQUNUQyxTQURTLENBQ0NKLGdCQURELENBQ2tCSyxnQkFEbEIsQ0FDbUNDLElBRC9DO0FBRUEsT0FBQ1YsR0FBRCxFQUFNQyxHQUFOLElBQWFMLGdCQUFnQixDQUFDTSxRQUFqQixDQUEwQkMsbUJBQTFCLENBQThDSSxhQUE5QyxDQUE0RCxDQUE1RCxFQUErREMsU0FBL0QsQ0FBeUVHLEtBQXpFLENBQStFQyxHQUEvRSxDQUFtRkMsS0FBbkYsQ0FBeUYsR0FBekYsQ0FBYjtBQUNEOztBQUNELFNBQUt6QixNQUFMLENBQVlHLFlBQVosQ0FBeUJ1QixNQUF6QixDQUFnQyxTQUFoQyxFQUEyQ3BCLElBQTNDO0FBQ0EsV0FBTyxDQUFDSyxTQUFTLElBQUlMLElBQWQsRUFBb0JNLEdBQUcsSUFBSSxDQUEzQixFQUE4QkMsR0FBRyxJQUFJLENBQXJDLENBQVA7QUFDRDs7QUExQmE7O2VBNkJEZixTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVVJMIH0gZnJvbSAndXJsJztcbmltcG9ydCBodHRwUmVxdWVzdCBmcm9tICcuLi9odHRwUmVxdWVzdCc7XG5cblxuY2xhc3MgWWFuZGV4bWFwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy51cmxNYXAgPSBuZXcgVVJMKCdodHRwczovL2dlb2NvZGUtbWFwcy55YW5kZXgucnUnKTtcbiAgICB0aGlzLnVybE1hcC5wYXRobmFtZSA9ICcvMS54Lyc7XG4gICAgdGhpcy51cmxNYXAuc2VhcmNoUGFyYW1zLmFwcGVuZCgnZm9ybWF0JywgJ2pzb24nKTtcbiAgICB0aGlzLnVybE1hcC5zZWFyY2hQYXJhbXMuYXBwZW5kKCdyZXN1bHRzJywgJzEnKTtcbiAgfVxuXG4gIGFzeW5jIGdldExvY2F0aW9uKGNpdHkpIHtcbiAgICB0aGlzLnVybE1hcC5zZWFyY2hQYXJhbXMuYXBwZW5kKCdnZW9jb2RlJywgY2l0eSk7XG4gICAgY29uc3QgZ2VvTG9jYXRpb24gPSBhd2FpdCBodHRwUmVxdWVzdCh0aGlzLnVybE1hcCwge30sIG51bGwsICdHRVQnKTtcbiAgICBjb25zdCBnZW9Mb2NhdGlvblBhcnNlID0gSlNPTi5wYXJzZShnZW9Mb2NhdGlvbik7XG4gICAgbGV0IGNpdHlQYXJzZTtcbiAgICBsZXQgbG9uO1xuICAgIGxldCBsYXQ7XG4gICAgaWYgKFxuICAgICAgZ2VvTG9jYXRpb25QYXJzZS5yZXNwb25zZS5HZW9PYmplY3RDb2xsZWN0aW9uXG4gICAgICAgIC5tZXRhRGF0YVByb3BlcnR5Lkdlb2NvZGVyUmVzcG9uc2VNZXRhRGF0YVxuICAgICAgICAuZm91bmQgIT09ICcwJ1xuICAgICkge1xuICAgICAgY2l0eVBhcnNlID0gZ2VvTG9jYXRpb25QYXJzZS5yZXNwb25zZS5HZW9PYmplY3RDb2xsZWN0aW9uLmZlYXR1cmVNZW1iZXJbMF1cbiAgICAgICAgLkdlb09iamVjdC5tZXRhRGF0YVByb3BlcnR5Lkdlb2NvZGVyTWV0YURhdGEudGV4dDtcbiAgICAgIFtsb24sIGxhdF0gPSBnZW9Mb2NhdGlvblBhcnNlLnJlc3BvbnNlLkdlb09iamVjdENvbGxlY3Rpb24uZmVhdHVyZU1lbWJlclswXS5HZW9PYmplY3QuUG9pbnQucG9zLnNwbGl0KCcgJyk7XG4gICAgfVxuICAgIHRoaXMudXJsTWFwLnNlYXJjaFBhcmFtcy5kZWxldGUoJ2dlb2NvZGUnLCBjaXR5KTtcbiAgICByZXR1cm4gW2NpdHlQYXJzZSB8fCBjaXR5LCBsb24gfHwgMCwgbGF0IHx8IDBdO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFlhbmRleG1hcDtcbiJdfQ==