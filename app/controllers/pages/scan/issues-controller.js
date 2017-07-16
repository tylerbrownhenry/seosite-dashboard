'use strict';

'use strict';

var Request = require('../../../models/index').request,
     plans = require('../../../config/secrets').stripeOptions.planData;

exports.getDefault = function (req, res) {
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
    //  console.log('here');
    //  Request.batchGet({
    //       uid: uid
    //  }, function (err, data) {
    //       console.log('here');
    //       var requests = {
    //            message: '',
    //            list: []
    //       };
    //       if (err === null) {
    //            requests.message = 'Request found!';
    //            requests.list = data;
    //       } else {
    //            requests.message = err;
    //       }

          // var linkCursor = Link.collection.find({"uid":uid,"results.broken":true,"results.internal":true});
          // var linkCursor = Link.collection.find({
          //      "uid": uid,
          //      "results.content-type": {
          //           $regex: /javascript/i
          //      }
          // });
          // var linkCursor = Link.collection.find({"uid":uid});
          // var numberOfJavaScriptLinks = 0;
          // var links = [];
          // linkCursor.count().then(function (e) {
          //      numberOfJavaScriptLinks = e;
          //      console.log(e);
          // });
          // // https://docs.mongodb.com/manual/reference/method/#js-query-cursor-methods
          // linkCursor.forEach(function (res) {
          //      console.log('this', res);
          //      links.push(res);
          // });
          res.render(req.render, {
               user: req.user,
               form: form,
               error: error,
              //  plans: plans,
              //  requests: requests,
              //  links: links
          });

          // var broadcastAll = require('../../app/api-requests/callbacks').broadcastAll

          // broadcastAll(requests)
    //  });

};
