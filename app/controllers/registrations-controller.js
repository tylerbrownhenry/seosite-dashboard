'use strict';
var passport = require('passport');

// Show Registration Page
exports.getSignup = function (req, res) {
     console.log('getSignup');
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
     res.render('signup', {
          form: form,
          error: error
     });
};

exports.postSignup = function (req, res, next) {
     console.log('postSignup');
     req.assert('email', 'Please sign up with a valid email.').isEmail();
     req.assert('password', 'Password must be at least 6 characters long').len(6);

     var errors = req.validationErrors();

     if (errors) {
          req.flash('errors', errors);
          req.flash('form', {
               email: req.body.email
          });
          return res.redirect('/signup');
     }
     // calls next middleware to authenticate with passport
     console.log('postSignup',req.body.timezone);
     passport.authenticate('signup', {
          successRedirect: '/dashboard',
          failureRedirect: '/signup',
          failureFlash: true
     })(req, res, next);
};
