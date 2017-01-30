var http = require('http');
var querystring = require('querystring');

function requests(socket){
    
    socket.on('queue/page', function (data) {
        console.log('postApiCall-->',data);

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
    var options = {
      hostname: process.env.API_HOST || 'localhost',
      path: '/api/v1/queue',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    if(process.env.NODE_ENV === 'dev' && process.env.API_HOST_PORT){
        options.port = process.env.API_HOST_PORT;
    }

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