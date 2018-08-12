'use strict';

const https = require('https'),
	token = "674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc",
	host = "https://api.telegram.org",
	path = "/bot" + token + "/getUpdates",
	proxy = "https://104.139.71.127:58366";
  // hostname: '45.55.184.96',
  // port: 3128,
const options = {
  host: host,
  path: path
};


const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();