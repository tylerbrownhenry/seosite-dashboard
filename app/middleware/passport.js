var LocalStrategy = require('passport-local').Strategy,
     User = require('./../models/user'),
     Activity = require('./../models/user'),
     Subscription = require('./../models/subscription'),
     utils = require('./../utils'),
     sh = require("shorthash"),
     secrets = require('../config/secrets'),
     bcrypt = require('bcrypt-nodejs'),
     crypto = require('crypto'),
     findOrCreateUser = require('./passport-create-user'),
     createToken = require('./passport-create-token');

/**
 * compares the encrypts the input password with the saved password
 * @param  {String}   candidatePassword user entered content for a password
 * @param  {String}   currentPassword   the encrypted hash of the original password
 * @param  {Function} cb                callback function, accepts two parameters
 */
function comparePassword(candidatePassword, currentPassword, cb) {
     console.log('candidatePassword', candidatePassword, 'currentPassword', currentPassword);
     bcrypt.compare(candidatePassword, currentPassword, function (err, isMatch) {
          if (err) {
               return cb(err);
          }
          cb(null, isMatch);
     });
};

module.exports = function (passport) {

     passport.serializeUser(function (user, done) {
          console.log('test passport serializeUser', user, done);
          done(null, user);
     });

     passport.deserializeUser(function (input, done) {
          console.log('make sure UID:', input, 'EXISTS');
          if(input && input[0]){
            input = input[0];
          }
          utils.findOneUser({
                  uid: input.uid
               },
               function (err, user) {
                   console.log('user',user);
                    if (err || !user) {
                         done(err);
                    } else {
                         utils.findBy(Subscription, {
                              customerId: user.customerId
                         }, function (err, subscription) {
                              console.log('user found!', user, err);
                              if (err || !subscription) {
                                   done(err);
                              } else {
                                   done(err, {
                                        identity: user,
                                        subscription: subscription
                                   });
                              }
                         });
                    }
               });
     });

     // login
     passport.use('login', new LocalStrategy({
               usernameField: 'email',
               passReqToCallback: true
          },
          function (req, email, password, done) {
               console.log('test passport login', req);

               utils.findUser({
                         'email': email
                    },
                    function (err, data) {
                         console.log('-->user', data);
                         if (err) {
                              return done(err);
                         }
                         if (!data || !data[0]) {
                              return done(null, false, req.flash('error', 'User not found'));
                         }
                         var user = data[0];

                         comparePassword(password, user.password,
                              function (err, isMatch) {
                                   console.log('err', err, 'isMatch', isMatch);
                                   if (isMatch) {
                                        var time = 14 * 24 * 3600000;
                                        var time = 14 * 24 * 3600000;
                                        req.session.cookie.maxAge = time; //2 weeks
                                        req.session.cookie.expires = new Date(Date.now() + time);
                                        req.session.touch();
                                        utils.updateUser({
                                             'email': email
                                        }, {
                                             $PUT: {
                                                  apiToken: createToken(user.uid)
                                             }
                                        });
                                        return done(null, user, req.flash('success', 'Successfully logged in.'));
                                   } else {
                                        return done(null, false, req.flash('error', 'Invalid Password'));
                                   }
                              });
                    }
               );
          }));

     passport.use('signup', new LocalStrategy({
               usernameField: 'email',
               passReqToCallback: true
          },
          function (req, email, password, done) {
               console.log('test passport signup ', password, 'req', req.body, password);
               process.nextTick(function () {
                    findOrCreateUser(req, email, password, null, done)
               });
          }));
}
