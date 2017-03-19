'use strict';

exports.isAuthenticated = function (req, res, next) {
     if (req.isAuthenticated()) {
          return next();
     }

     res.redirect(req.redirect.auth);
};

exports.isUnauthenticated = function (req, res, next) {
     if (!req.isAuthenticated()) {
          return next();
     }

     res.redirect(req.redirect.auth);
};

exports.apiIsUnauthenticated = function (req, res, next) {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
     // res.header('Access-Control-Allow-Headers', 'accept, content-type, application/x-www-form-urlencoded, x-www-form-urlencoded, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
     res.header('Access-Control-Allow-Headers', '*');
     // if (!req.isAuthenticated()){
     return next();
     // }
     // res.redirect(req.redirect.auth);
};
