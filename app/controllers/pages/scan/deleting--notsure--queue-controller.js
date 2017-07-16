'use strict';

var http = require('http'),
     querystring = require('querystring'),
     plans = require('../../../config/secrets').stripeOptions.planData;

exports.getHome = function (req, res) {
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
     res.render(req.render, {
          form: form,
          error: error,
          plans: plans
     });
};

exports.postApiCall = function (_req, _res) {
     console.log('postApiCall-->', _req.body.preClass);
     var postData = querystring.stringify({
          "email": _req.user.email,
          "url": _req.body.url,
          "token": _req.user.apiToken,
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
     console.log('postData', postData);
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
     var req = http.request(options, function (res) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
               consoel.log('chunk', chunk);
          });
          res.on('end', function () {
               console.log('No more data in response.');
          });
     });
     req.on('error', function (e) {
          consoel.log('e', e);
     });
     req.write(postData);
     req.end();
     _req.flash('success', {
          msg: 'Billing has been updated.'
     });
     _res.render(_req.redirect.success);
};
