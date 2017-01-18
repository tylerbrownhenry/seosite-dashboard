var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var sh = require("shorthash");
var jwt = require('jsonwebtoken');
var secrets = require('../config/secrets');

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

function createToken(email){
    return jwt.sign(email, secrets.apiToken, {
        expiresIn: 14 * 24 * 3600000 // expires in 2 weeks
        
    });
}

  // login
  passport.use('login', new LocalStrategy({
      usernameField: 'email',
      passReqToCallback : true
    },
    function(req, email, password, done) {

      User.findOne({ 'email' :  email },
        function(err, user) {
          if (err) return done(err);
          if (!user){
            return done(null, false, req.flash('error', 'User not found'));
          }
          user.comparePassword(password, function(err, isMatch) {
            if (isMatch) {
              var time = 14 * 24 * 3600000;
              req.session.cookie.maxAge = time; //2 weeks
              req.session.cookie.expires = new Date(Date.now() + time);
              req.session.touch();
              user.update({$set:{apiToken: createToken(user.uid)}});
              return done(null, user, req.flash('success', 'Successfully logged in.'));
            /* Generate Token */



            } else {
              return done(null, false, req.flash('error', 'Invalid Password'));
            }
          });
        }
      );
    })
  );

  passport.use('signup', new LocalStrategy({
      usernameField: 'email',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      var findOrCreateUser = function(){
        User.findOne({ email: req.body.email }, function(err, existingUser) {
          if (existingUser) {
            req.flash('form', {
              email: req.body.email
            });
            return done(null, false, req.flash('error', 'An account with that email address already exists.'));
          }
          // edit this portion to accept other properties when creating a user.
          var uid = sh.unique(req.body.email);
          var user = new User({
            apiToken: createToken(uid),
            email: req.body.email,
            uid: sh.unique(req.body.email),
            password: req.body.password // user schema pre save task hashes this password
          });

          user.save(function(err) {
            if (err) return done(err, false, req.flash('error', 'Error saving user.'));
            var time = 14 * 24 * 3600000;
            req.session.cookie.maxAge = time; //2 weeks
            req.session.cookie.expires = new Date(Date.now() + time);
            req.session.touch();
            return done(null, user, req.flash('success', 'Thanks for signing up!!'));
          });
        });
      };

      process.nextTick(findOrCreateUser);

    })
  );
};
