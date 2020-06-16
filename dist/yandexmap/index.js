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

    if (answerParse.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found !== '0') {
      const cityParse = answerParse.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
      const lon = answerParse.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[0];
      const lat = answerParse.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[1];
    }

    this.urlMap.searchParams.delete('geocode', city);
    return [cityParse || 0, lon || 0, lat || 0];
  }

}

var _default = YandexMap;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy95YW5kZXhtYXAvaW5kZXguanMiXSwibmFtZXMiOlsiWWFuZGV4TWFwIiwiY29uc3RydWN0b3IiLCJ1cmxNYXAiLCJVUkwiLCJwYXRobmFtZSIsInNlYXJjaFBhcmFtcyIsImFwcGVuZCIsImdldExvY2F0aW9uIiwiY2l0eSIsImFuc3dlciIsImFuc3dlclBhcnNlIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2UiLCJHZW9PYmplY3RDb2xsZWN0aW9uIiwibWV0YURhdGFQcm9wZXJ0eSIsIkdlb2NvZGVyUmVzcG9uc2VNZXRhRGF0YSIsImZvdW5kIiwiY2l0eVBhcnNlIiwiZmVhdHVyZU1lbWJlciIsIkdlb09iamVjdCIsIkdlb2NvZGVyTWV0YURhdGEiLCJ0ZXh0IiwibG9uIiwiUG9pbnQiLCJwb3MiLCJzcGxpdCIsImxhdCIsImRlbGV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsTUFBTUEsU0FBTixDQUFnQjtBQUNkQyxFQUFBQSxXQUFXLEdBQUc7QUFDWixTQUFLQyxNQUFMLEdBQWMsSUFBSUMsUUFBSixDQUFRLGdDQUFSLENBQWQ7QUFDQSxTQUFLRCxNQUFMLENBQVlFLFFBQVosR0FBdUIsT0FBdkI7QUFDQSxTQUFLRixNQUFMLENBQVlHLFlBQVosQ0FBeUJDLE1BQXpCLENBQWdDLFFBQWhDLEVBQTBDLE1BQTFDO0FBQ0EsU0FBS0osTUFBTCxDQUFZRyxZQUFaLENBQXlCQyxNQUF6QixDQUFnQyxTQUFoQyxFQUEyQyxHQUEzQztBQUNEOztBQUVELFFBQU1DLFdBQU4sQ0FBa0JDLElBQWxCLEVBQXdCO0FBQ3RCLFNBQUtOLE1BQUwsQ0FBWUcsWUFBWixDQUF5QkMsTUFBekIsQ0FBZ0MsU0FBaEMsRUFBMkNFLElBQTNDO0FBQ0EsVUFBTUMsTUFBTSxHQUFHLE1BQU0sMEJBQVksS0FBS1AsTUFBakIsRUFBeUIsRUFBekIsRUFBNkIsSUFBN0IsRUFBbUMsS0FBbkMsQ0FBckI7QUFDQSxVQUFNUSxXQUFXLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXSCxNQUFYLENBQXBCOztBQUNBLFFBQ0VDLFdBQVcsQ0FBQ0csUUFBWixDQUFxQkMsbUJBQXJCLENBQ0dDLGdCQURILENBQ29CQyx3QkFEcEIsQ0FFR0MsS0FGSCxLQUVhLEdBSGYsRUFJRTtBQUNBLFlBQU1DLFNBQVMsR0FBR1IsV0FBVyxDQUFDRyxRQUFaLENBQXFCQyxtQkFBckIsQ0FBeUNLLGFBQXpDLENBQXVELENBQXZELEVBQ2ZDLFNBRGUsQ0FDTEwsZ0JBREssQ0FDWU0sZ0JBRFosQ0FDNkJDLElBRC9DO0FBRUEsWUFBTUMsR0FBRyxHQUFHYixXQUFXLENBQUNHLFFBQVosQ0FBcUJDLG1CQUFyQixDQUNUSyxhQURTLENBQ0ssQ0FETCxFQUNRQyxTQURSLENBQ2tCSSxLQURsQixDQUN3QkMsR0FEeEIsQ0FDNEJDLEtBRDVCLENBQ2tDLEdBRGxDLEVBQ3VDLENBRHZDLENBQVo7QUFFQSxZQUFNQyxHQUFHLEdBQUdqQixXQUFXLENBQUNHLFFBQVosQ0FBcUJDLG1CQUFyQixDQUNUSyxhQURTLENBQ0ssQ0FETCxFQUNRQyxTQURSLENBQ2tCSSxLQURsQixDQUN3QkMsR0FEeEIsQ0FDNEJDLEtBRDVCLENBQ2tDLEdBRGxDLEVBQ3VDLENBRHZDLENBQVo7QUFFRDs7QUFFRCxTQUFLeEIsTUFBTCxDQUFZRyxZQUFaLENBQXlCdUIsTUFBekIsQ0FBZ0MsU0FBaEMsRUFBMkNwQixJQUEzQztBQUNBLFdBQU8sQ0FBQ1UsU0FBUyxJQUFJLENBQWQsRUFBaUJLLEdBQUcsSUFBSSxDQUF4QixFQUEyQkksR0FBRyxJQUFJLENBQWxDLENBQVA7QUFDRDs7QUEzQmE7O2VBOEJEM0IsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVSTCB9IGZyb20gJ3VybCc7XG5pbXBvcnQgaHR0cFJlcXVlc3QgZnJvbSAnLi4vaHR0cFJlcXVlc3QnO1xuXG5jbGFzcyBZYW5kZXhNYXAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnVybE1hcCA9IG5ldyBVUkwoJ2h0dHBzOi8vZ2VvY29kZS1tYXBzLnlhbmRleC5ydScpO1xuICAgIHRoaXMudXJsTWFwLnBhdGhuYW1lID0gJy8xLngvJztcbiAgICB0aGlzLnVybE1hcC5zZWFyY2hQYXJhbXMuYXBwZW5kKCdmb3JtYXQnLCAnanNvbicpO1xuICAgIHRoaXMudXJsTWFwLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ3Jlc3VsdHMnLCAnMScpO1xuICB9XG5cbiAgYXN5bmMgZ2V0TG9jYXRpb24oY2l0eSkge1xuICAgIHRoaXMudXJsTWFwLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ2dlb2NvZGUnLCBjaXR5KTtcbiAgICBjb25zdCBhbnN3ZXIgPSBhd2FpdCBodHRwUmVxdWVzdCh0aGlzLnVybE1hcCwge30sIG51bGwsICdHRVQnKTtcbiAgICBjb25zdCBhbnN3ZXJQYXJzZSA9IEpTT04ucGFyc2UoYW5zd2VyKTtcbiAgICBpZiAoXG4gICAgICBhbnN3ZXJQYXJzZS5yZXNwb25zZS5HZW9PYmplY3RDb2xsZWN0aW9uXG4gICAgICAgIC5tZXRhRGF0YVByb3BlcnR5Lkdlb2NvZGVyUmVzcG9uc2VNZXRhRGF0YVxuICAgICAgICAuZm91bmQgIT09ICcwJ1xuICAgICkge1xuICAgICAgY29uc3QgY2l0eVBhcnNlID0gYW5zd2VyUGFyc2UucmVzcG9uc2UuR2VvT2JqZWN0Q29sbGVjdGlvbi5mZWF0dXJlTWVtYmVyWzBdXG4gICAgICAgIC5HZW9PYmplY3QubWV0YURhdGFQcm9wZXJ0eS5HZW9jb2Rlck1ldGFEYXRhLnRleHQ7XG4gICAgICBjb25zdCBsb24gPSBhbnN3ZXJQYXJzZS5yZXNwb25zZS5HZW9PYmplY3RDb2xsZWN0aW9uXG4gICAgICAgIC5mZWF0dXJlTWVtYmVyWzBdLkdlb09iamVjdC5Qb2ludC5wb3Muc3BsaXQoJyAnKVswXTtcbiAgICAgIGNvbnN0IGxhdCA9IGFuc3dlclBhcnNlLnJlc3BvbnNlLkdlb09iamVjdENvbGxlY3Rpb25cbiAgICAgICAgLmZlYXR1cmVNZW1iZXJbMF0uR2VvT2JqZWN0LlBvaW50LnBvcy5zcGxpdCgnICcpWzFdO1xuICAgIH1cblxuICAgIHRoaXMudXJsTWFwLnNlYXJjaFBhcmFtcy5kZWxldGUoJ2dlb2NvZGUnLCBjaXR5KTtcbiAgICByZXR1cm4gW2NpdHlQYXJzZSB8fCAwLCBsb24gfHwgMCwgbGF0IHx8IDBdO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFlhbmRleE1hcDtcbiJdfQ==