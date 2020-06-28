"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ca = exports.cert = exports.key = exports.PORT = exports.WEATHER_TOKEN = exports.TELEGRAM_TOKEN = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  TELEGRAM_TOKEN,
  WEATHER_TOKEN,
  PORT
} = process.env;
exports.PORT = PORT;
exports.WEATHER_TOKEN = WEATHER_TOKEN;
exports.TELEGRAM_TOKEN = TELEGRAM_TOKEN;

const key = _fs.default.readFileSync('cert/privkey1.pem');

exports.key = key;

const cert = _fs.default.readFileSync('cert/fullchain1.pem');

exports.cert = cert;

const ca = _fs.default.readFileSync('cert/chain1.pem');

exports.ca = ca;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rZXlzLmpzIl0sIm5hbWVzIjpbIlRFTEVHUkFNX1RPS0VOIiwiV0VBVEhFUl9UT0tFTiIsIlBPUlQiLCJwcm9jZXNzIiwiZW52Iiwia2V5IiwiZnMiLCJyZWFkRmlsZVN5bmMiLCJjZXJ0IiwiY2EiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUVPLE1BQU07QUFBRUEsRUFBQUEsY0FBRjtBQUFrQkMsRUFBQUEsYUFBbEI7QUFBaUNDLEVBQUFBO0FBQWpDLElBQTBDQyxPQUFPLENBQUNDLEdBQXhEOzs7OztBQUVBLE1BQU1DLEdBQUcsR0FBR0MsWUFBR0MsWUFBSCxDQUFnQixtQkFBaEIsQ0FBWjs7OztBQUNBLE1BQU1DLElBQUksR0FBR0YsWUFBR0MsWUFBSCxDQUFnQixxQkFBaEIsQ0FBYjs7OztBQUNBLE1BQU1FLEVBQUUsR0FBR0gsWUFBR0MsWUFBSCxDQUFnQixpQkFBaEIsQ0FBWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5cbmV4cG9ydCBjb25zdCB7IFRFTEVHUkFNX1RPS0VOLCBXRUFUSEVSX1RPS0VOLCBQT1JUIH0gPSBwcm9jZXNzLmVudjtcblxuZXhwb3J0IGNvbnN0IGtleSA9IGZzLnJlYWRGaWxlU3luYygnY2VydC9wcml2a2V5MS5wZW0nKTtcbmV4cG9ydCBjb25zdCBjZXJ0ID0gZnMucmVhZEZpbGVTeW5jKCdjZXJ0L2Z1bGxjaGFpbjEucGVtJyk7XG5leHBvcnQgY29uc3QgY2EgPSBmcy5yZWFkRmlsZVN5bmMoJ2NlcnQvY2hhaW4xLnBlbScpO1xuIl19