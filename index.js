/*
'use strict';

const https = require('https'),
	token = "674082318:AAG4e5AXQu_SbJkYSVji4chwaiggtGrMLBc",
	host = "https://api.telegram.org",
	path = "/bot" + token + "/getUpdates",
	proxy = "https://104.139.71.127:58366";
  // hostname: '45.55.184.96',
  // port: 3128,
const options = {
  hostname: '104.139.71.127',
  port: 58366,
  path: host+path,
  method: 'GET',
  headers: {
        Host: "api.telegram.org"
    }
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
req.end();*/


var Http = require('http');
var Tls = require('tls');

var req = Http.request({
    host: '192.168.5.8',
    port: 3128,
    method: 'CONNECT',
    path: 'twitter.com:443',
});

req.on('connect', function (res, socket, head) {
    var cts = Tls.connect({
    host: 'twitter.com',
    socket: socket
    }, function () {
        cts.write('GET / HTTP/1.1rnHost: twitter.comrnrn');
    });

    cts.on('data', function (data) {
        console.log(data.toString());
    });
});

req.end();