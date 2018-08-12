'use strict';

const https = require('https'),
	token = "674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc",
	host = "api.telegram.org",
	path = "/bot" + token + "/getUpdates";

const options = {
  hostname: host,
  port: 443,
  path: path,
  method: 'GET'
};


const req = https.request(options, (res) => {
  console.log(res,"\n\n\n");

  res.on('data', (d) => {
    console.log("\n\n\n",d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();