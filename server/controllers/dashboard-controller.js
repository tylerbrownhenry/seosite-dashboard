'use strict';

var User = require('../models/user'),
     _ = require('underscore'),
     Request = require('../models/request'),
     Permission = require('../models/permissions'),
     Scan = require('../models/scan'),
     plans = User.getPlans(),
     fs = require('fs');
var path = require('path');

exports.getActivity = function (req, res, next) {
     console.log('get get it', req.user);

     Permission.findOne({
          label: req.user.stripe.plan
     }, function (err, permissions) {
          console.log('plan', permissions);
          if (permissions) {

               Request.find({
                    uid: req.user.uid
               }, function (err, data) {
                    console.log('Request data', data);
                    Scan.find({
                         uid: req.user.uid
                    }, function (err, data) {
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
                         console.log('test!!!!', scans);

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
                              user: req.user,
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

}

exports.getDefault = function (req, res, next) {

     console.log('YESSSSSSSS3');

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

     console.log('YESSSSSSSS333');

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
     // console.log('Request',Request);
     // var Request = mongoose.model('Request', {}, 'requests');
     // var Scan = mongoose.model('Scan', {}, 'scans');
     var uid = req.user.uid;

     Permission.findOne({
          label: req.user.stripe.plan
     }, function (err, permissions) {
          console.log('plan', permissions);
          if (permissions) {
               // res.render(req.render, {user: req.user,plan:plan});
               res.render(req.render, {
                    templates: templates,
                    permissions: permissions,
                    user: req.user,
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

exports.getBilling = function (req, res, next) {
     var form = {},
          error = null,
          formFlash = req.flash('form'),
          errorFlash = req.flash('error');
     console.log('YESSSSSSSS6', formFlash, errorFlash);

     if (formFlash.length > 0) {
          form.email = formFlash[0].email;
     }
     if (errorFlash.length > 0) {
          error = errorFlash[0];
     }

     res.render(req.render, {
          user: req.user,
          form: form,
          error: error,
          plans: plans
     });
};

exports.getProfile = function (req, res, next) {
     console.log('YESSSSSSSS88');
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
          user: req.user,
          form: form,
          error: error,
          plans: plans,
          User: User
     });
};
