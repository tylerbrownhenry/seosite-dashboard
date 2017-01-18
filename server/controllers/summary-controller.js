'use strict';

var User = require('../models/user'),
mongoose = require('mongoose'),
plans = User.getPlans();

var Request = mongoose.model('Request', {}, 'requestss');

exports.getDefault = function(req, res, next){
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
   Request.find({uid:req.user.uid},function(err,data){
        var requests = {message: '', list: []};
        if(err === null){
            requests.message = 'Request found!';
            requests.list = data;
        } else {
            requests.message = err;
        }
        console.log('reqe',requests);
        res.render(req.render, {user: req.user, form: form, error: error, plans: plans, requests: requests});
    });
};

