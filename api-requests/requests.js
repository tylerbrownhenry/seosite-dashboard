var http = require('http');
var querystring = require('querystring');

function requests(socket){
    
    socket.on('queue/page', function (data) {
        console.log('test');
            // exports.postApiCall = function(_req, _res, next){
            console.log('postApiCall-->',data);


        console.log('dfdsfs');

        var postData = querystring.stringify({
            "uid" : data.uid,
            "url" : data.url,
            "page" : data.page,
            "preClass": data.preClass,
            "token" : data.token,
            "options": JSON.stringify({
                "type": 'page',
                "filterLimit": 10,
                "digDepthLimit": 1,
                "excludeExternalLinks": false,
                "honorRobotExclusions": true,
                "excludedSchemes": false,
                "saveSelectors": false,
                "linkInformation": {
                    "selector": false,
                    "element": false,
                    "redirects": false,
                    "location": false,
                    "redirects": false,
                    "status": false,
                    "url": false,
                    "href": false,
                    "parent": false
                },
                "acceptedSchemes": ['http']
                })
            });
        console.log('postData',postData);

        var options = {
          hostname: process.env.API_HOST || 'localhost',
          // port: 21545,
          // path: '/api/v1/queue',
          path: '/api/',
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
          }
        };

    var req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });

    req.on('error', (e) => {
        /*
        WE need handle this error by reporting it back
        to the front end, otherwise the use will have 
        no idea what is going on if the server doesn't 
        respond at all
        */
      console.log(`problem with request: ${e.message}`,e);
    });

    // write data to request body
    req.write(postData);
    req.end();


    });
}

module.exports = requests;