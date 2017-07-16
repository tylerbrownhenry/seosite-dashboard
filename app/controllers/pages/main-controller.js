'use strict';
var plans = require('../../config/secrets').stripeOptions.planData;
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
