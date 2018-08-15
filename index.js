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

  var request = https.request(options, (res) => {
    //console.log('statusCode:', res.statusCode);
    //console.log('headers:', res.headers);
    res.on('data', (data) => {
      process.stdout.write(data);
      answer=JSON.parse(data)
      console.log(answer.ok, '\n',answer.result);
    });
  });

  request.on('error', (e) => {
    console.error(e);
  });
  request.end();


