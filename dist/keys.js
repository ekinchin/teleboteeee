"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ca = exports.cert = exports.key = exports.port = exports.weather_token = exports.tlgrm_token = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export const { tlgrm_token, weather_token } = process.env;
const tlgrm_token = "1169016027:AAHNCk4vpni0pXmuYXyJc_lbQZpPnyxc4ZE";
exports.tlgrm_token = tlgrm_token;
const weather_token = "7ab945ce-6fae-40c7-8a29-91f5e672740c";
exports.weather_token = weather_token;
const port = 8443;
exports.port = port;

const key = _fs.default.readFileSync('/etc/letsencrypt/archive/storage.ekinchin.ru/privkey1.pem');

exports.key = key;

const cert = _fs.default.readFileSync('/etc/letsencrypt/archive/storage.ekinchin.ru/fullchain1.pem');

exports.cert = cert;

const ca = _fs.default.readFileSync('/etc/letsencrypt/archive/storage.ekinchin.ru/chain1.pem');

exports.ca = ca;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rZXlzLmpzIl0sIm5hbWVzIjpbInRsZ3JtX3Rva2VuIiwid2VhdGhlcl90b2tlbiIsInBvcnQiLCJrZXkiLCJmcyIsInJlYWRGaWxlU3luYyIsImNlcnQiLCJjYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBRUE7QUFDTyxNQUFNQSxXQUFXLEdBQUcsZ0RBQXBCOztBQUNBLE1BQU1DLGFBQWEsR0FBRyxzQ0FBdEI7O0FBQ0EsTUFBTUMsSUFBSSxHQUFHLElBQWI7OztBQUVBLE1BQU1DLEdBQUcsR0FBR0MsWUFBR0MsWUFBSCxDQUFnQiwyREFBaEIsQ0FBWjs7OztBQUNBLE1BQU1DLElBQUksR0FBR0YsWUFBR0MsWUFBSCxDQUFnQiw2REFBaEIsQ0FBYjs7OztBQUNBLE1BQU1FLEVBQUUsR0FBR0gsWUFBR0MsWUFBSCxDQUFnQix5REFBaEIsQ0FBWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5cbi8vIGV4cG9ydCBjb25zdCB7IHRsZ3JtX3Rva2VuLCB3ZWF0aGVyX3Rva2VuIH0gPSBwcm9jZXNzLmVudjtcbmV4cG9ydCBjb25zdCB0bGdybV90b2tlbiA9IFwiMTE2OTAxNjAyNzpBQUhOQ2s0dnBuaTBwWG11WVh5SmNfbGJRWnBQbnl4YzRaRVwiXG5leHBvcnQgY29uc3Qgd2VhdGhlcl90b2tlbiA9IFwiN2FiOTQ1Y2UtNmZhZS00MGM3LThhMjktOTFmNWU2NzI3NDBjXCJcbmV4cG9ydCBjb25zdCBwb3J0ID0gODQ0M1xuXG5leHBvcnQgY29uc3Qga2V5ID0gZnMucmVhZEZpbGVTeW5jKCcvZXRjL2xldHNlbmNyeXB0L2FyY2hpdmUvc3RvcmFnZS5la2luY2hpbi5ydS9wcml2a2V5MS5wZW0nKTtcbmV4cG9ydCBjb25zdCBjZXJ0ID0gZnMucmVhZEZpbGVTeW5jKCcvZXRjL2xldHNlbmNyeXB0L2FyY2hpdmUvc3RvcmFnZS5la2luY2hpbi5ydS9mdWxsY2hhaW4xLnBlbScpO1xuZXhwb3J0IGNvbnN0IGNhID0gZnMucmVhZEZpbGVTeW5jKCcvZXRjL2xldHNlbmNyeXB0L2FyY2hpdmUvc3RvcmFnZS5la2luY2hpbi5ydS9jaGFpbjEucGVtJyk7XG4iXX0=