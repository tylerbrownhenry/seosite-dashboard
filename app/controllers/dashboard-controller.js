'use strict';
var _ = require('underscore'),
     Request = require('../models/request'),
     Permission = require('../models/permission'),
     Scan = require('../models/scan'),
     plans = require('../config/secrets').stripeOptions.planData,
     fs = require('fs'),
     path = require('path');

exports.getActivity = function (req, res) {
     console.log('dashboard-controller getActivity', req.user);
     var user = req.user[0];
     Permission.queryOne("label").eq(user.plan)
          .exec(function (err, permissions) {
               console.log('Permission queryOne', permissions);
               if (permissions) {
                    Request.queryOne("uid").eq(user.uid)
                         .exec(function (err, data) {
                              console.log('Request queryOne', data);
                              Scan.scan('uid').eq(user.uid)
                                   .exec(function (err, data) {
                                        console.log('Scan data', data);
                                        var scans = {
                                             message: '',
                                             list: []
                                        };
                                        if (err === null) {
                                             scans.message = 'Request found!';
                                             scans.list = data;
                                        } else {
                                             // requests.message = err;
                                        }
                                        var issues = {
                                             "meta": 0,
                                             "security": 0,
                                             "resources": 0,
                                             "links": 0,
                                             "tooManyLinks": 0
                                        };
                                        _.each(scans.list, function (request) {
                                             console.log('request', JSON.stringify(request));
                                             if (request && request.issues) {

                                                  issues.meta += request.issues.meta;
                                                  issues.security += request.issues.security;
                                                  issues.resources += request.issues.resources;
                                                  issues.links += request.issues.links;
                                                  issues.tooManyLinks += (request.issues.tooManyLinks === true) ? 1 : 0;
                                             }
                                        });

                                        res.render(req.render, {
                                             user: user,
                                             permissions: permissions,
                                             scans: scans,
                                             issues: issues
                                        });
                                   });
                         });

               } else {
                    res.render('errors', {
                         msg: 'We had problems locating your plan type, please try again later.'
                    });
               }
          });
};

exports.getDefault = function (req, res) {
     console.log('dashboard-controller Permission', user);
     var user = req.user[0];
     try {
          var templates = {
               template: fs.readFileSync(path.join(__dirname + '/../views/template.ejs'), 'utf-8'),
               requestLoop: fs.readFileSync(path.join(__dirname + '/../views/dashboard/request-loop.ejs'), 'utf-8'),
               requestRow: fs.readFileSync(path.join(__dirname + '/../views/dashboard/request-row.ejs'), 'utf-8'),
               contentLoop: fs.readFileSync(path.join(__dirname + '/../views/dashboard/content-loop.ejs'), 'utf-8')
               // template: require('fs').readFileSync('../views/request-loop.ejs', 'utf-8')
          };
     } catch (e) {
          console.log('e', e);
     }
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
     var permissions = {
          free: require('./../../app/api-requests/permissions/free'),
          paid: require('./../../app/api-requests/permissions/paid')
     };
     Permission.queryOne("label").eq(user.plan).exec(function (err, permissions) {
          console.log('Permission queryOne', permissions, err);
          if (permissions) {
               // res.render(req.render, {user: req.user,plan:plan});
               res.render(req.render, {
                    templates: templates,
                    permissions: permissions,
                    user: user,
                    form: form,
                    error: error,
                    plans: plans
               });
          } else {
               res.render('errors', {
                    msg: 'We had problems locating your plan type, please try again later.'
               });
          }
     });

};

exports.getBilling = function (req, res) {
     console.log('dashboard-controller getBilling', formFlash, errorFlash);
     var user = req.user[0];
     var form = {},
          error = null,
          formFlash = req.flash('form'),
          errorFlash = req.flash('error');
     if (formFlash.length > 0) {
          form.email = formFlash[0].email;
     }
     if (errorFlash.length > 0) {
          error = errorFlash[0];
     }
     res.render(req.render, {
          user: user,
          form: form,
          error: error,
          plans: plans
     });
};

exports.getProfile = function (req, res) {
     console.log('dashboard-controller getProfile', req.user, plans);
     var user = req.user[0];
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
          user: user,
          form: form,
          error: error,
          plans: plans
          // ,User: User
     });
};
