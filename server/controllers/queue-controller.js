'use strict';

var User = require('../models/user'),
http = require('http'),
querystring = require('querystring'),
jwt    = require('jsonwebtoken'), // used to create, sign, and verify tokens
plans = User.getPlans();

exports.getHome = function(req, res, next){
  var form = {},
  error = null,
  formFlash = req.flash('form'),
  errorFlash = req.flash('error');

  if (formFlash.length) {
    form.email = formFlash[0].email;
  }
  if (errorFlash.length) {
    error = errorFlash[0];
  }
  res.render(req.render, {form: form, error: error, plans: plans});
};


exports.postApiCall = function(_req, _res, next){
    console.log('postApiCall-->',_req.body);

    console.log('dfdsfs');

    var postData = querystring.stringify({
        "email" : _req.user.email,
        "url" : _req.body.url,
        "token" : _req.user.apiToken,
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
      hostname: 'localhost',
      port: 3001,
      path: '/api/queue',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

// console.log('dfdsfs');
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

console.log('dfdsfs');
    req.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
    });

    // write data to request body
    req.write(postData);
    req.end();

// write data to request body
// req.write('data\n');
// req.write('data\n');
// req.end();

      _req.flash('success', { msg: 'Billing has been updated.' });
      _res.render(_req.redirect.success);
    // });
  // });
};
