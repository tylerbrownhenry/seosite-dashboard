'use strict';

var User = require('../models/user'),
_ = require('underscore'),
Request = require('../models/request'),
Scan = require('../models/scan'),
plans = User.getPlans();

exports.getDefault = function(req, res, next){
    console.log('YESSSSSSSS3',req.user);
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

    Scan.find({uid:req.user.uid},function(err,data){
        // console.log('data',data);
        var scans = {message: '', list: []};
        if(err === null){
            scans.message = 'Request found!';
            scans.list = data;
        } else {
            scans.message = err;
        }
        console.log('YESSSSSSSS3',req.user);
        res.render(req.render, {user: req.user, form: form, error: error, plans: plans, scans: scans});
    });

};

exports.getBilling = function(req, res, next){
  var form = {},
  error = null,
  formFlash = req.flash('form'),
  errorFlash = req.flash('error');
    console.log('YESSSSSSSS6',formFlash,errorFlash);

  if (formFlash.length > 0) {
    form.email = formFlash[0].email;
  }
  if (errorFlash.length > 0) {
    error = errorFlash[0];
  }

  res.render(req.render, {user: req.user, form: form, error: error, plans: plans});
};

exports.getProfile = function(req, res, next){
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

  res.render(req.render, {user: req.user, form: form, error: error, plans: plans, User: User});
};