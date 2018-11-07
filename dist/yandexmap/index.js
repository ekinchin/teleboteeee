"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = require("url");

var _httpRequest = _interopRequireDefault(require("../httpRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class YandexMap {
  constructor() {
    this.urlMap = new _url.URL('https://geocode-maps.yandex.ru');
    this.urlMap.pathname = '/1.x/';
    this.urlMap.searchParams.append('format', 'json');
    this.urlMap.searchParams.append('results', '1');
  }

  async getLocation(city) {
    this.urlMap.searchParams.append('geocode', city);
    const answer = await (0, _httpRequest.default)(this.urlMap, {}, null, 'GET');
    const answerParse = JSON.parse(answer);
    const cityParse = answer.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text || 0;
    const location = answer.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos || '';
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

var _default = YandexMap;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy95YW5kZXhtYXAvaW5kZXguanMiXSwibmFtZXMiOlsiWWFuZGV4TWFwIiwiY29uc3RydWN0b3IiLCJ1cmxNYXAiLCJVUkwiLCJwYXRobmFtZSIsInNlYXJjaFBhcmFtcyIsImFwcGVuZCIsImdldExvY2F0aW9uIiwiY2l0eSIsImFuc3dlciIsImFuc3dlclBhcnNlIiwiSlNPTiIsInBhcnNlIiwiY2l0eVBhcnNlIiwicmVzcG9uc2UiLCJHZW9PYmplY3RDb2xsZWN0aW9uIiwiZmVhdHVyZU1lbWJlciIsIkdlb09iamVjdCIsIm1ldGFEYXRhUHJvcGVydHkiLCJHZW9jb2Rlck1ldGFEYXRhIiwidGV4dCIsImxvY2F0aW9uIiwiUG9pbnQiLCJwb3MiLCJsb24iLCJsYXQiLCJzcGxpdCIsImRlbGV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsTUFBTUEsU0FBTixDQUFnQjtBQUNkQyxFQUFBQSxXQUFXLEdBQUc7QUFDWixTQUFLQyxNQUFMLEdBQWMsSUFBSUMsUUFBSixDQUFRLGdDQUFSLENBQWQ7QUFDQSxTQUFLRCxNQUFMLENBQVlFLFFBQVosR0FBdUIsT0FBdkI7QUFDQSxTQUFLRixNQUFMLENBQVlHLFlBQVosQ0FBeUJDLE1BQXpCLENBQWdDLFFBQWhDLEVBQTBDLE1BQTFDO0FBQ0EsU0FBS0osTUFBTCxDQUFZRyxZQUFaLENBQXlCQyxNQUF6QixDQUFnQyxTQUFoQyxFQUEyQyxHQUEzQztBQUNEOztBQUVELFFBQU1DLFdBQU4sQ0FBa0JDLElBQWxCLEVBQXdCO0FBQ3RCLFNBQUtOLE1BQUwsQ0FBWUcsWUFBWixDQUF5QkMsTUFBekIsQ0FBZ0MsU0FBaEMsRUFBMkNFLElBQTNDO0FBQ0EsVUFBTUMsTUFBTSxHQUFHLE1BQU0sMEJBQVksS0FBS1AsTUFBakIsRUFBeUIsRUFBekIsRUFBNkIsSUFBN0IsRUFBbUMsS0FBbkMsQ0FBckI7QUFDQSxVQUFNUSxXQUFXLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXSCxNQUFYLENBQXBCO0FBQ0EsVUFBTUksU0FBUyxHQUFHSixNQUFNLENBQUNLLFFBQVAsQ0FBZ0JDLG1CQUFoQixDQUFvQ0MsYUFBcEMsQ0FBa0QsQ0FBbEQsRUFDZkMsU0FEZSxDQUNMQyxnQkFESyxDQUNZQyxnQkFEWixDQUM2QkMsSUFEN0IsSUFDcUMsQ0FEdkQ7QUFFQSxVQUFNQyxRQUFRLEdBQUdaLE1BQU0sQ0FBQ0ssUUFBUCxDQUFnQkMsbUJBQWhCLENBQW9DQyxhQUFwQyxDQUFrRCxDQUFsRCxFQUNkQyxTQURjLENBQ0pLLEtBREksQ0FDRUMsR0FERixJQUNTLEVBRDFCO0FBRUEsVUFBTSxDQUFDQyxHQUFELEVBQU1DLEdBQU4sSUFBYUosUUFBUSxDQUFDSyxLQUFULENBQWUsR0FBZixLQUF1QixDQUFDLENBQUQsRUFBSSxDQUFKLENBQTFDO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFZQSxTQUFLeEIsTUFBTCxDQUFZRyxZQUFaLENBQXlCc0IsTUFBekIsQ0FBZ0MsU0FBaEMsRUFBMkNuQixJQUEzQztBQUNBLFdBQU8sQ0FBQ0ssU0FBRCxFQUFZVyxHQUFaLEVBQWlCQyxHQUFqQixDQUFQO0FBQ0Q7O0FBL0JhOztlQWtDRHpCLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVUkwgfSBmcm9tICd1cmwnO1xuaW1wb3J0IGh0dHBSZXF1ZXN0IGZyb20gJy4uL2h0dHBSZXF1ZXN0JztcblxuY2xhc3MgWWFuZGV4TWFwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy51cmxNYXAgPSBuZXcgVVJMKCdodHRwczovL2dlb2NvZGUtbWFwcy55YW5kZXgucnUnKTtcbiAgICB0aGlzLnVybE1hcC5wYXRobmFtZSA9ICcvMS54Lyc7XG4gICAgdGhpcy51cmxNYXAuc2VhcmNoUGFyYW1zLmFwcGVuZCgnZm9ybWF0JywgJ2pzb24nKTtcbiAgICB0aGlzLnVybE1hcC5zZWFyY2hQYXJhbXMuYXBwZW5kKCdyZXN1bHRzJywgJzEnKTtcbiAgfVxuXG4gIGFzeW5jIGdldExvY2F0aW9uKGNpdHkpIHtcbiAgICB0aGlzLnVybE1hcC5zZWFyY2hQYXJhbXMuYXBwZW5kKCdnZW9jb2RlJywgY2l0eSk7XG4gICAgY29uc3QgYW5zd2VyID0gYXdhaXQgaHR0cFJlcXVlc3QodGhpcy51cmxNYXAsIHt9LCBudWxsLCAnR0VUJyk7XG4gICAgY29uc3QgYW5zd2VyUGFyc2UgPSBKU09OLnBhcnNlKGFuc3dlcik7XG4gICAgY29uc3QgY2l0eVBhcnNlID0gYW5zd2VyLnJlc3BvbnNlLkdlb09iamVjdENvbGxlY3Rpb24uZmVhdHVyZU1lbWJlclswXVxuICAgICAgLkdlb09iamVjdC5tZXRhRGF0YVByb3BlcnR5Lkdlb2NvZGVyTWV0YURhdGEudGV4dCB8fCAwO1xuICAgIGNvbnN0IGxvY2F0aW9uID0gYW5zd2VyLnJlc3BvbnNlLkdlb09iamVjdENvbGxlY3Rpb24uZmVhdHVyZU1lbWJlclswXVxuICAgICAgLkdlb09iamVjdC5Qb2ludC5wb3MgfHwgJyc7XG4gICAgY29uc3QgW2xvbiwgbGF0XSA9IGxvY2F0aW9uLnNwbGl0KCcgJykgfHwgWzAsIDBdO1xuICAgIC8qXG4gICAgaWYgKFxuICAgICAgZ2VvTG9jYXRpb25QYXJzZS5yZXNwb25zZS5HZW9PYmplY3RDb2xsZWN0aW9uXG4gICAgICAgIC5tZXRhRGF0YVByb3BlcnR5Lkdlb2NvZGVyUmVzcG9uc2VNZXRhRGF0YVxuICAgICAgICAuZm91bmQgIT09ICcwJ1xuICAgICkge1xuICAgICAgY2l0eVBhcnNlID0gZ2VvTG9jYXRpb25QYXJzZS5yZXNwb25zZS5HZW9PYmplY3RDb2xsZWN0aW9uLmZlYXR1cmVNZW1iZXJbMF1cbiAgICAgICAgLkdlb09iamVjdC5tZXRhRGF0YVByb3BlcnR5Lkdlb2NvZGVyTWV0YURhdGEudGV4dDtcbiAgICAgIFtsb24sIGxhdF0gPSBnZW9Mb2NhdGlvblBhcnNlLnJlc3BvbnNlLkdlb09iamVjdENvbGxlY3Rpb25cbiAgICAgICAgLmZlYXR1cmVNZW1iZXJbMF0uR2VvT2JqZWN0LlBvaW50LnBvcy5zcGxpdCgnICcpO1xuICAgIH1cbiAgICAqL1xuICAgIHRoaXMudXJsTWFwLnNlYXJjaFBhcmFtcy5kZWxldGUoJ2dlb2NvZGUnLCBjaXR5KTtcbiAgICByZXR1cm4gW2NpdHlQYXJzZSwgbG9uLCBsYXRdO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFlhbmRleE1hcDtcbiJdfQ==