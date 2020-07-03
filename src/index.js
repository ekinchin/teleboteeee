import https from 'https';
import {
  key, cert, ca, PORT, HOSTNAME, TELEGRAM_TOKEN,
} from './keys';
import { connect } from './telegram';
import parse from './parser';
import commands from './commands';

const server = https.createServer({
  key,
  cert,
  ca,
});

server.listen(PORT);

server.on('listening', async () => {
  const result = await connect(`${HOSTNAME}:${PORT}/${TELEGRAM_TOKEN}`);
  // eslint-disable-next-line no-console
  console.log(result);
});

server.on('request', (request, response) => {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {
    if (request.url === `/${TELEGRAM_TOKEN}`) {
      const { command, ...payload } = parse(data);
      commands(command, payload);
    } else {
      response.setHeader('Content-Type', 'text/html');
      response.write('<h1>404<br>Page not found</h1>');
      response.statusCode = 404;
    }
    response.end();
  });
});
