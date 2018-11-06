"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _https = _interopRequireDefault(require("https"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const httpRequest = async (url, headers, data, method) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search
    };
    options.method = method;
    options.headers = headers;

    const req = _https.default.request(options, res => {
      let answer = '';
      res.on('data', dataRes => {
        answer += dataRes;
      });
      res.on('end', () => {
        resolve(answer);
      });
      res.on('error', () => {
        reject(answer);
      });
    });

    if (options.headers !== undefined) {
      if ('Content-Type' in options.headers) {
        if (options.headers['Content-Type'] === 'application/json') {
          req.write(JSON.stringify(data));
        }
      }
    }

    req.end();
  });
};

var _default = httpRequest;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9odHRwUmVxdWVzdC9pbmRleC5qcyJdLCJuYW1lcyI6WyJodHRwUmVxdWVzdCIsInVybCIsImhlYWRlcnMiLCJkYXRhIiwibWV0aG9kIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvcHRpb25zIiwiaG9zdG5hbWUiLCJwb3J0IiwicGF0aCIsInBhdGhuYW1lIiwic2VhcmNoIiwicmVxIiwiaHR0cHMiLCJyZXF1ZXN0IiwicmVzIiwiYW5zd2VyIiwib24iLCJkYXRhUmVzIiwidW5kZWZpbmVkIiwid3JpdGUiLCJKU09OIiwic3RyaW5naWZ5IiwiZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQSxNQUFNQSxXQUFXLEdBQUcsT0FBT0MsR0FBUCxFQUFZQyxPQUFaLEVBQXFCQyxJQUFyQixFQUEyQkMsTUFBM0IsS0FBb0M7QUFDdEQsU0FBTyxJQUFJQyxPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ3RDLFVBQU1DLE9BQU8sR0FBRztBQUNkQyxNQUFBQSxRQUFRLEVBQUVSLEdBQUcsQ0FBQ1EsUUFEQTtBQUVkQyxNQUFBQSxJQUFJLEVBQUUsR0FGUTtBQUdkQyxNQUFBQSxJQUFJLEVBQUVWLEdBQUcsQ0FBQ1csUUFBSixHQUFlWCxHQUFHLENBQUNZO0FBSFgsS0FBaEI7QUFLQUwsSUFBQUEsT0FBTyxDQUFDSixNQUFSLEdBQWlCQSxNQUFqQjtBQUNBSSxJQUFBQSxPQUFPLENBQUNOLE9BQVIsR0FBa0JBLE9BQWxCOztBQUVBLFVBQU1ZLEdBQUcsR0FBR0MsZUFBTUMsT0FBTixDQUFjUixPQUFkLEVBQXdCUyxHQUFELElBQVM7QUFDMUMsVUFBSUMsTUFBTSxHQUFHLEVBQWI7QUFDQUQsTUFBQUEsR0FBRyxDQUFDRSxFQUFKLENBQU8sTUFBUCxFQUFnQkMsT0FBRCxJQUFhO0FBQzFCRixRQUFBQSxNQUFNLElBQUlFLE9BQVY7QUFDRCxPQUZEO0FBR0FILE1BQUFBLEdBQUcsQ0FBQ0UsRUFBSixDQUFPLEtBQVAsRUFBYyxNQUFNO0FBQ2xCYixRQUFBQSxPQUFPLENBQUNZLE1BQUQsQ0FBUDtBQUNELE9BRkQ7QUFHQUQsTUFBQUEsR0FBRyxDQUFDRSxFQUFKLENBQU8sT0FBUCxFQUFnQixNQUFNO0FBQ3BCWixRQUFBQSxNQUFNLENBQUNXLE1BQUQsQ0FBTjtBQUNELE9BRkQ7QUFHRCxLQVhXLENBQVo7O0FBWUEsUUFBSVYsT0FBTyxDQUFDTixPQUFSLEtBQW9CbUIsU0FBeEIsRUFBbUM7QUFDakMsVUFBSSxrQkFBa0JiLE9BQU8sQ0FBQ04sT0FBOUIsRUFBdUM7QUFDckMsWUFBSU0sT0FBTyxDQUFDTixPQUFSLENBQWdCLGNBQWhCLE1BQW9DLGtCQUF4QyxFQUE0RDtBQUMxRFksVUFBQUEsR0FBRyxDQUFDUSxLQUFKLENBQVVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlckIsSUFBZixDQUFWO0FBQ0Q7QUFDRjtBQUNGOztBQUNEVyxJQUFBQSxHQUFHLENBQUNXLEdBQUo7QUFDRCxHQTdCTSxDQUFQO0FBOEJELENBL0JEOztlQWlDZXpCLFciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaHR0cHMgZnJvbSAnaHR0cHMnO1xuXG5jb25zdCBodHRwUmVxdWVzdCA9IGFzeW5jICh1cmwsIGhlYWRlcnMsIGRhdGEsIG1ldGhvZCk9PntcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgaG9zdG5hbWU6IHVybC5ob3N0bmFtZSxcbiAgICAgIHBvcnQ6IDQ0MyxcbiAgICAgIHBhdGg6IHVybC5wYXRobmFtZSArIHVybC5zZWFyY2gsXG4gICAgfTtcbiAgICBvcHRpb25zLm1ldGhvZCA9IG1ldGhvZDtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSBoZWFkZXJzO1xuXG4gICAgY29uc3QgcmVxID0gaHR0cHMucmVxdWVzdChvcHRpb25zLCAocmVzKSA9PiB7XG4gICAgICBsZXQgYW5zd2VyID0gJyc7XG4gICAgICByZXMub24oJ2RhdGEnLCAoZGF0YVJlcykgPT4ge1xuICAgICAgICBhbnN3ZXIgKz0gZGF0YVJlcztcbiAgICAgIH0pO1xuICAgICAgcmVzLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoYW5zd2VyKTtcbiAgICAgIH0pO1xuICAgICAgcmVzLm9uKCdlcnJvcicsICgpID0+IHtcbiAgICAgICAgcmVqZWN0KGFuc3dlcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICgnQ29udGVudC1UeXBlJyBpbiBvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPT09ICdhcHBsaWNhdGlvbi9qc29uJykge1xuICAgICAgICAgIHJlcS53cml0ZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmVxLmVuZCgpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGh0dHBSZXF1ZXN0OyJdfQ==