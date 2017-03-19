var http = require('http');
var _ = require('underscore');
var querystring = require('querystring');
var pageScan = require('./requests/pageScan');
var PageScanOptions = require('./requests/pageScanOptions');

function deleteCapture(filename, data) {
     var postData = querystring.stringify({
          "uid": data.uid,
          "filename": filename,
          "token": data.token,
          "options": JSON.stringify({
               "type": 'capture',
               "delete": {
                    "captures": true
               }
          })
     });

     var options = {
          hostname: process.env.API_HOST || 'localhost',
          path: '/api/v1/deleteCaptures',
          method: 'POST',
          headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Content-Length': Buffer.byteLength(postData)
          }
     };

     if (process.env.NODE_ENV === 'dev' && process.env.API_HOST_PORT) {
          options.port = process.env.API_HOST_PORT;
     }

     var req = http.request(options, function (res) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
               console.log(chunk);
          });
          res.on('end', function () {
               console.log('No more data in response.');
          });
     });

     req.on('error', function (e) {
          /*
          WE need handle this error by reporting it back
          to the front end, otherwise the use will have
          no idea what is going on if the server doesn't
          respond at all
          */
          console.log('problem with request' + e.message);
     });

     // write data to request body
     req.write(postData);
     req.end();
}

function requests(socket) {

     socket.on('deleteCaptures', function (data) {
          _.each(_.keys(data.captures), function (key) {
               if (data.captures[key] !== null) {
                    deleteCapture(data.captures[key], data.data);
               }
          });
     });

     socket.on('queue/page', function (data) {
          console.log('postApiCall-->', data);

          var options = new PageScanOptions(data);
          pageScan(options);
          // var options = {
          //      hostname: process.env.API_HOST || 'localhost',
          //      path: '/api/v1/queue',
          //      method: 'POST',
          //      headers: {
          //           'Content-Type': 'application/x-www-form-urlencoded',
          //           'Content-Length': Buffer.byteLength(postData)
          //      }
          // };
          // if (process.env.NODE_ENV === 'dev' && process.env.API_HOST_PORT) {
          //      options.port = process.env.API_HOST_PORT;
          // }
          //
          // var req = http.request(options, (res) => {
          //      console.log(`STATUS: ${res.statusCode}`);
          //      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
          //      res.setEncoding('utf8');
          //      res.on('data', (chunk) => {
          //           console.log(`BODY: ${chunk}`);
          //      });
          //      res.on('end', () => {
          //           console.log('No more data in response.');
          //      });
          // });

          // req.on('error', (e) => {
          /*
          WE need handle this error by reporting it back
          to the front end, otherwise the use will have
          no idea what is going on if the server doesn't
          respond at all
          */
          //      console.log(`problem with request: ${e.message}`, e);
          // });

          // write data to request body
          // req.write(postData);
          // req.end();

     });
}

module.exports = requests;
