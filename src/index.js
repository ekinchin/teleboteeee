import https from 'https';
import {
  key, cert, ca, PORT, HOSTNAME, TELEGRAM_TOKEN,
} from './keys';
import { connect } from './telegram';

const server = https.createServer({
  key,
  cert,
  ca,
});

server.listen(PORT);

server.on('listening', async () => {
  const result = await connect(`${HOSTNAME}:${PORT}/${TELEGRAM_TOKEN}`);
  console.log(result);
});

server.on('request', (request, response) => {
  let requestData = '';
  request.on('data', (data) => {
    requestData += data;
  });
  request.on('end', () => {
    if (request.url === `/${TELEGRAM_TOKEN}`) {
    // reqParse(requestData);
    } else {
      response.setHeader('Content-Type', 'text/html');
      response.write('<h1>404<br>Page not found</h1>');
      response.statusCode = 404;
    }
    response.end();
  });
});
