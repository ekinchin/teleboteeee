import https from 'https';
import querystring from 'querystring';

const requestBase = (url, options, data, resolve, reject) => {
  const req = https.request(url, options, (res) => {
    let answer = '';
    res.on('data', (dataRes) => {
      answer += dataRes;
    });
    res.on('end', () => {
      resolve(answer);
    });
    res.on('error', (e) => {
      reject(e);
    });
  });
  if (data) {
    const postData = querystring.stringify(data);
    req.write(postData);
  }
  req.end();
};

const request = (url, headers, method, data) => {
  const options = {
    headers,
    method,
  };
  return (newData = data, newUrl = url) => new Promise(
    (resolve, reject) => requestBase(newUrl, options, newData, resolve, reject),
  );
};

export default request;
