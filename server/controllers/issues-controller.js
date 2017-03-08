'use strict';

var User = require('../models/user'),
     mongoose = require('mongoose'),
     plans = User.getPlans();

// var Request = mongoose.model('Request', {}, 'requests');

var mongoose = require('mongoose');

var linkSchema = new mongoose.Schema({
     url: {
          type: String
     },
     site: {
          type: String
     },
     queueId: {
          type: String
     },
     found: {
          type: Date
     },
     _id: {
          type: String
     },
     uid: {
          type: String
     },
     requestId: {
          type: String
     },
     scanned: {
          type: Date
     },
     status: {
          type: String,
          default: 'pending'
     },
     __link: {
          type: Object
     },
     results: {
          type: Object
     }
});

// var Link = mongoose.model('Link', linkSchema, 'links ');

exports.getDefault = function (req, res, next) {
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
     var uid = req.user.uid;
     Request.find({
          uid: req.user.uid
     }, function (err, data) {
          var requests = {
               message: '',
               list: []
          };
          if (err === null) {
               requests.message = 'Request found!';
               requests.list = data;
          } else {
               requests.message = err;
          }
          res.render(req.render, {
               user: req.user,
               form: form,
               error: error,
               plans: plans,
               requests: requests
          });
     });

     // var linkCursor = Link.collection.find({"uid":uid,"results.broken":true,"results.internal":true});
     var linkCursor = Link.collection.find({
          "uid": uid,
          "results.content-type": {
               $regex: /javascript/i
          }
     });
     // var linkCursor = Link.collection.find({"uid":uid});

     linkCursor.count().then(function (e) {
          console.log(e)
     });
     // https://docs.mongodb.com/manual/reference/method/#js-query-cursor-methods
     linkCursor.forEach(function (res) {
          console.log('this', res);
     });

};
