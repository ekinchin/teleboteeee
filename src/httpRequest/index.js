import https from 'https';

const httpRequest = async (url, headers, data, method) => new Promise((resolve, reject) => {
  const options = {
    hostname: url.hostname,
    port: 443,
    path: url.pathname + url.search,
  };
  options.method = method;
  options.headers = headers;

  const req = https.request(options, (res) => {
    let answer = '';
    res.on('data', (dataRes) => {
      answer += dataRes;
    });
    res.on('end', () => {
      const { ok } = JSON.parse(answer);
      ok ? resolve (answer) : reject (answer);
    });
    res.on('error', () => {
      console.log('reject', answer);
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

export default httpRequest;
