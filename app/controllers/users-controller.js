'use strict';
     var stripeActions = require('../models/plugins/actions-stripe'),
     utils = require('../utils');

exports.getProfile = function (req, res) {
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
          user: req.user,
          form: form,
          error: error
     });
};

// Updates generic profile information

exports.postProfile = function (req, res, next) {
     req.assert('email', 'Email is not valid').isEmail();
     req.assert('name', 'Name is required').notEmpty();
     console.log('USER checking if uid exists', req.user);
     var errors = req.validationErrors();

     if (errors) {
          req.flash('errors', errors);
          return res.redirect(req.redirect.failure);
     }

     if (req.body.email !== req.user[0].email) {
          utils.findUser({
               email: req.body.email
          }, function (err, existingUser) {
               if (existingUser) {
                    req.flash('errors', {
                         msg: 'An account with that email address already exists.'
                    });
                    return res.redirect(req.redirect.failure);
               } else {
                    utils.findUser({
                         uid: req.user[0].uid
                    }, function (err, user) {
                         if (err) {
                              return next(err);
                         }
                         user[0].email = req.body.email || '';
                         user[0].name = req.body.name || '';
                         user[0].gender = req.body.gender || '';
                         user[0].location = req.body.location || '';
                         user[0].website = req.body.website || '';

                         user[0].save(function (err) {
                              if (err) {
                                   return next(err);
                              }
                              stripeActions.updateStripeEmail(user[0].customerId, user[0].email, function (err) {
                                   if (err) {
                                        return next(err);
                                   }
                                   req.flash('success', {
                                        msg: 'Profile information updated.'
                                   });
                                   res.redirect(req.redirect.success);
                              });
                         });
                    });
               }
          });
     } else {
          utils.findUser({
               uid: req.user[0].uid
          }, function (err, user) {
               console.log('user', user);
               if (err) {
                    return next(err);
               }
               user[0].name = req.body.name || '';
               user[0].gender = req.body.gender || '';
               user[0].location = req.body.location || '';
               user[0].website = req.body.website || '';
               //  utils.update{uid:req.user[]}
               user[0].save(function (err) {
                    if (err) {
                         return next(err);
                    }
                    stripeActions.updateStripeEmail(user[0].customerId, user[0].email, function (err) {
                         if (err) {
                              return next(err);
                         }
                         req.flash('success', {
                              msg: 'Profile information updated.'
                         });
                         res.redirect(req.redirect.success);
                    });
               });
          });
     }
};

// Removes account

exports.deleteAccount = function (req, res, next) {
     console.log('req', req.user[0]);
     utils.findUser({
               uid: req.user[0].uid
          },
          function (err, user) {
               if (err) {
                    return next(err);
               }
               console.log('user', user);
               stripeActions.cancelStripe(user[0].customerId, function (err) {
                    console.log('err', err);
                    if (err) {
                         return next(err);
                    }
                    utils.deleteUser(user[0].uid, function (err, user) {
                         if (err) {
                              return next(err);
                         }

                         req.logout();
                         req.flash('info', {
                              msg: 'Your account has been deleted.'
                         });
                         res.redirect(req.redirect.success);
                    });
               });
          });
};

// Adds or updates a users card.

exports.postBilling = function (req, res, next) {
     console.log('USER checking if uid exists', req.user);
     var stripeToken = req.body.stripeToken;
     if (!stripeToken) {
          req.flash('errors', {
               msg: 'Please provide a valid card.'
          });
          return res.redirect(req.redirect.failure);
     }

     utils.findUser({
          uid: req.user.uid
     }, function (err, user) {
          if (err) {
               return next(err);
          }

          stripeActions.setCard(user.customerId, user.email, stripeToken, function (err) {
               if (err) {
                    if (err.code && err.code === 'card_declined') {
                         req.flash('errors', {
                              msg: 'Your card was declined. Please provide a valid card.'
                         });
                         return res.redirect(req.redirect.failure);
                    }
                    req.flash('errors', {
                         msg: 'An unexpected error occurred.'
                    });
                    return res.redirect(req.redirect.failure);
               }
               req.flash('success', {
                    msg: 'Billing has been updated.'
               });
               res.redirect(req.redirect.success);
          });
     });
};

exports.postPlan = function (req, res, next) {
     console.log('USER checking if uid exists', req.user, 'req.body.stripeToken', req.body.stripeToken);
     var user = req.user[0];
     var plan = req.body.plan;
     var stripeToken = null;

     if (plan) {
          plan = plan.toLowerCase();
     }

     if (user.plan === plan) {
          req.flash('info', {
               msg: 'The selected plan is the same as the current plan.'
          });
          return res.redirect(req.redirect.success);
     }

     if (req.body.stripeToken) {
          stripeToken = req.body.stripeToken;
     }

     if (!user.last4 && !req.body.stripeToken) {
          req.flash('errors', {
               msg: 'Please add a card to your account before choosing a plan.'
          });
          return res.redirect(req.redirect.failure);
     }

     utils.findUser({
          uid: user.uid
     }, function (err, user) {
          if (err) {
               return next(err);
          }

          stripeActions.setPlan(user[0], plan, user[0].uid, stripeToken, function (err) {
               var msg;
               console.log('err', err);
               if (err) {
                    if (err.code && err.code === 'card_declined') {
                         msg = 'Your card was declined. Please provide a valid card.';
                    } else if (err && err.message) {
                         msg = err.message;
                    } else {
                         msg = 'An unexpected error occurred.';
                    }

                    req.flash('errors', {
                         msg: msg
                    });
                    return res.redirect(req.redirect.failure);
               }
               req.flash('success', {
                    msg: 'Plan has been updated.'
               });
               res.redirect(req.redirect.success);
          });
     });
};
