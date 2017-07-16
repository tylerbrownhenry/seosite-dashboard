'use strict';
var _ = require('underscore'),
     Request = require('../../models/request'),
     Permission = require('../../models/permission'),
     User = require('../../models/user'),
     Scan = require('../../models/scan'),
     plans = require('../../config/secrets').stripeOptions.planData,
     fs = require('fs'),
     utils = require('../../utils'),
     path = require('path');

exports.getActivity = function (req, res) {
     console.log('dashboard-controller getActivity', req.user);
     var user = req.user.identity;
     var subscription = req.user.subscription;
    //  utils.findSomeBy(Permission, {
    //       label: subscription.plan
    //  }, function (err, permissions) {
    //       console.log('Permission queryOne', permissions);
    //       if (permissions) {
    //            utils.findSomeBy(Request, {
    //                      uid: user.uid
    //                 },
    //                 function (err, data) {
    //                      console.log('Request queryOne', data);
    //                      utils.findSomeBy({
    //                                uid: user.uid
    //                           },
    //                           function (err, data) {
    //                                console.log('Scan data', data);
    //                                var scans = {
    //                                     message: '',
    //                                     list: []
    //                                };
    //                                if (err === null) {
    //                                     scans.message = 'Request found!';
    //                                     scans.list = data;
    //                                } else {
    //                                     // requests.message = err;
    //                                }
    //                                var issues = {
    //                                     "meta": 0,
    //                                     "security": 0,
    //                                     "resources": 0,
    //                                     "links": 0,
    //                                     "tooManyLinks": 0
    //                                };
    //                                _.each(scans.list, function (request) {
    //                                     console.log('request', JSON.stringify(request));
    //                                     if (request && request.issues) {
     //
    //                                          issues.meta += request.issues.meta;
    //                                          issues.security += request.issues.security;
    //                                          issues.resources += request.issues.resources;
    //                                          issues.links += request.issues.links;
    //                                          issues.tooManyLinks += (request.issues.tooManyLinks === true) ? 1 : 0;
    //                                     }
    //                                });

                                   res.render(req.render, {
                                        user: user,
                                        // subscription: subscription,
                                        // permissions: permissions[0],
                                        // scans: scans,
                                        // issues: issues
                                   });
                              // });
    //                 });
     //
    //       } else {
    //            res.render('errors', {
    //                 msg: 'We had problems locating your plan type, please try again later.'
    //            });
    //       }
    //  });
};

exports.getDefault = function (req, res) {
     console.log('dashboard-controller Permission', user);
     var user = req.user.identity;
     var subscription = req.user.subscription;

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
    //  var permissions = {
    //       free: require('./../../../../app/api-requests/permissions/free'),
    //       paid: require('./../../../../app/api-requests/permissions/paid')
    //  };
    //  utils.findSomeBy(Permission, {
    //       label: user.plan
    //  }, function (err, permissions) {
    //       console.log('Permission queryOne -->', permissions, err);
    //       if (permissions) {
               res.render(req.render, {
                    // templates: templates,
                    // permissions: permissions[0],
                    user: user,
                    subscription: subscription,
                    form: form,
                    error: error,
                    plans: plans
               });
    //       } else {
    //            res.render('errors', {
    //                 msg: 'We had problems locating your plan type, please try again later.'
    //            });
    //       }
    //  });

};

exports.getBilling = function (req, res) {
     console.log('dashboard-controller getBilling', req.user,'plans',plans);
     var user = req.user.identity;
     var subscription = req.user.subscription;
     var form = {},
          error = null,
          formFlash = req.flash('form'),
          errorFlash = req.flash('error');
     if (formFlash.length > 0) {
         consoel.log('test2');
          form.email = formFlash[0].email;
     }
     if (errorFlash.length > 0) {
         consoel.log('test24');
          error = errorFlash[0];
     }
     res.render(req.render, {
          user: user,
          subscription: subscription,
          form: form,
          error: error,
          plans: plans
     });
};

exports.getProfile = function (req, res) {
     console.log('dashboard-controller getProfile', req.user.identity, plans);
     var user = req.user.identity;
     var subscription = req.user.subscription;
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
          subscription: subscription,
          form: form,
          error: error,
          plans: plans
          // ,User: User
     });
};

exports.getUsers = function (req, res) {
     var user = req.user.identity;
     var subscription = req.user.subscription;
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
     console.log('req--', req.user.identity);
     utils.findSomeBy(User, {
          oid: user.oid
     }, function (err, users) {
          //            console.log('Permission queryOne', permissions);
          if (users) {}
          res.render(req.render, {
               user: user,
               users: users,
               subscription: subscription,
               form: form,
               error: error
          });
     });
};

exports.checkAdmin = function(){
  var user = req.user.identity;
  var subscription = req.user.subscription;



  // if(req.user.identitiy){
  //   console.log
  // }
  // var form = {},
  //      error = null,
  //      formFlash = req.flash('form'),
  //      errorFlash = req.flash('error');
  // if (formFlash.length) {
  //      form.email = formFlash[0].email;
  // }
  // if (errorFlash.length) {
  //      error = errorFlash[0];
  // }
  // console.log('req--', req.user.identity);
  // utils.findSomeBy(User, {
  //      oid: user.oid
  // }, function (err, users) {
  //      //            console.log('Permission queryOne', permissions);
  //      if (users) {}
       res.render(req.render, {
            user: user,
            subscription: subscription
            // users: users,
            // form: form,
            // error: error
       });
  // });
}
