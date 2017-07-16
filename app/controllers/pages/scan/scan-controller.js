'use strict';
var _ = require('underscore'),
     Request = require('../../../models/request'),
     //  Permission = require('../../../models/permission'),
     permissions = {
          free: require('../../../api-requests/permissions/free'),
          paid: require('../../../api-requests/permissions/paid')
     },
     Scan = require('../../../models/scan'),
     Activity = require('../../../models/activity'),
     plans = require('../../../config/secrets').stripeOptions.planData,
     fs = require('fs'),
     utils = require('../../../utils'),
     path = require('path');

exports.getDefault = function (req, res) {
     console.log('dashboard-controller Permission',req);
     var user = req.user.identity;

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
          // permissions: permissions[user.plan],
          // activity: activity[0],
          user: user,
          form: form,
          error: error,
          // scans: scans,
          // plans: plans
     });
     return;

     utils.getScans(Request, Scan, user, function (err, scans) {
          console.log('scans', scans.list.length);
          if (err !== null) {
               res.render('errors', {
                    msg: 'We had problems locating your plan type, please try again later.'
               });
          }
          utils.findSomeBy(Activity, {
               oid: user.oid
          }, function (err, activity) {
               console.log('ACTIVITY', activity);
               if (activity) {
                    res.render(req.render, {
                         permissions: permissions[user.plan],
                         activity: activity[0],
                         user: user,
                         form: form,
                         error: error,
                         scans: scans,
                         plans: plans
                    });
               } else {
                    res.render('errors', {
                         msg: 'We had problems locating your history please try again later.'
                    });
               }
          });
     });

};
