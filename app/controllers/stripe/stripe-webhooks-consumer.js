var utils = require('../../utils'),
     subscriptionController = require('../../controllers/subscriptions/subscription-controller');

module.exports = function (ref, cb) {

     var subObj = ref.stripeEvent.data.object;
     console.log('stripe-webhooks-consumer ref:', subObj, ref.stripeEvent);

     // http://benfoster.io/blog/stripe-failed-payments-how-to

     if (ref.stripeEvent.type === 'invoice.created') {
          console.log('stripe-webhook -> invoice.created');
          utils.fetchActivityByCustomer(subObj.customer).then(function (activity) {
               var emailContent = utils.formatEmailContent('invoice.created', {
                    amount_due: (subObj.amount_due / 100)
               });
               utils.sendEmail(emailContent.title, emailContent.text, activity.email, emailContent.subject, function (err) {
                    // cb(err)
               });
          });
     }
     if (ref.stripeEvent.type === 'invoice.payment_succeeded') {
          console.log('stripe-webhook -> invoice.payment_succeeded', subObj);
          subscriptionController.getSubscription(subObj.subscription, function (err, res) {
               // console.log('stripe-webhook -> invoice.payment_succeeded getSub err',err,'res')
               utils.findSubscription({
                    customerId: subObj.customer
               }, function (err, subscription) {
                    utils.updateSubscription({
                         customerId: subObj.customer
                    }, {
                         periodStart: subObj.period_start,
                         /* using some on subObj for input for unit tests, and because not all data is on the input */
                         periodEnd: subObj.period_end,
                         frequency: res.frequency,
                         cancelAtPeriodEnd: res.cancelAtPeriodEnd,
                         status: res.status
                    }, function (err) {
                         utils.checkActivity(subscription.oid, function (err, activity) {
                              var emailContent = utils.formatEmailContent('invoice.payment_succeeded', {
                                   periodStart: utils.formatDateFromEpoch(res.periodStart),
                                   periodEnd: utils.formatDateFromEpoch(res.periodEnd)
                              });
                              utils.sendEmail(emailContent.title, emailContent.text, activity.email, emailContent.subject, function (err) {
                                   if (typeof cb === 'function') {
                                        cb(err)
                                   }
                              });
                         })
                    });
               });
          });
     }
     if (ref.stripeEvent.type === 'invoice.payment_failed') {
          console.log('payment failed');
          utils.findSubscription({
               customerId: subObj.customer
          }, function (err, subscription) {
               console.log('subscription', subscription);
               utils.checkActivity(subscription.oid, function (err, activity) {
                    console.log('activity', activity);
                    if (subObj.next_payment_attempt !== null) {
                         var emailContent = utils.formatEmailContent('invoice.payment_failed', {
                              attempt_count: utils.formatDateFromEpoch(subObj.attempt_count),
                              next_payment_attempt: utils.formatDateFromEpoch(subObj.next_payment_attempt)
                         });
                         utils.sendEmail(emailContent.title, emailContent.text, activity.email, emailContent.subject, function (err) {
                              if (typeof cb === 'function') {
                                   cb(err)
                              }
                         });
                    } else {
                         /* Final payment failed */
                         utils.updateSubscription({
                              customerId: subObj.customer
                         }, {
                              periodStart: null,
                              /* using some on subObj for input for unit tests, and because not all data is on the input */
                              periodEnd: null,
                              frequency: null,
                              cancelAtPeriodEnd: null,
                              plan: 'free',
                              status: 'inactive'
                         }, function (err) {
                              utils.findSubscription({
                                   customerId: subObj.customer
                              }, function (err, subscription) {
                                   subscriptionController.cancelSubscription(subscription.subscriptionId, function (err, confirmation) {
                                     console.log('subscription called',err,confirmation);
                                        var emailContent = utils.formatEmailContent('invoice.payment_failed_last', {});
                                        utils.sendEmail(emailContent.title, emailContent.text, activity.email, emailContent.subject, function (err) {
                                             if (typeof cb === 'function') {
                                                  cb(err)
                                             }
                                        });
                                   },false);
                              });
                         })
                    }
               });
          });
     }
     if (ref.stripeEvent.type === 'invoice.payment_succeeded') {

     }
     if (ref.stripeEvent.type === 'invoice.payment_succeeded') {

     }
     if (ref.stripeEvent.type === 'invoice.payment_succeeded') {

     }

}
//       console.log('webhook -> invoice payment succeeded');
//       var subRef = {
//            subscriptionId: ref.subscriptionId
//       };
//       utils.findSubscription(subRef, function (err, subscription) {
//            if (err === null) {
//                 return cb(err);
//            }
//            utils.updateSubscription(subRef, {
//                 periodStart: ref.periodStart,
//                 periodEnd: ref.periodEnd
//            }, function (err) {
//                 if (err !== null) {
//                      return cb(err);
//                 }
//                 utils.checkActivity(subscription.oid, function (err, activity) {
//                      if (err) {
//                           var title = "Payment Processed";
//                           var text = "Your payment to SeoDr.com is complete. Date: " + ref.periodStart + ".  You next payment is due on" + ref.periodEnd;
//                           utils.sendEmail(title, text, activity.email, 'Thank you for your payment.', function (err) {
//                                req.flash('info', {
//                                     msg: 'An e-mail has been sent to ' + activity.email + ' with further instructions.'
//                                });
//                           })
//                           return cb(err);
//                      }
//                      return cb(null);
//                 });
//            });
//       });
//  }
//  /* 1 */
//  if (ref.type === 'customer.subscription.created') {
//       console.log('ref.data.object.plan', ref.data.object.plan);
//       utils.findSubscription(subRef, function (err, subscription) {
//            console.log('subscription', subscription);
//            if (err === null) {
//                 return cb(err);
//            }
//            utils.updateSubscription(subRef, {
//                 plan: ref.data.object.plan,
//                 periodStart: ref.periodStart,
//                 periodEnd: ref.periodEnd
//            }, function (err) {
//                 if (err !== null) {
//                      return cb(err);
//                 }
//                 utils.checkActivity(subscription.oid, function (err, activity) {
//                      if (err) {
//                           var title = "New Plan";
//                           var text = "You've updated your plan on SeoDr.com to " + ref.data.object.plan;
//                           utils.sendEmail(title, text, activity.email, 'Subscription Updated', function (err) {
//                                req.flash('info', {
//                                     msg: 'An e-mail has been sent to ' + activity.email + ' with further instructions.'
//                                });
//                           })
//                           return cb(err);
//                      }
//                      return cb(null);
//                 });
//            });
//       });
//  }
/* 1 */

/*1*/
// if (ref.type === 'customer.source.created' || ref.type === 'customer.source.updated') {
//      var subRef = {
//           subscriptionId: ref.subscriptionId
//      };
//      utils.findSubscription(subRef, function (err, subscription) {
//           if (err === null) {
//                return cb(err);
//           }
//           utils.updateSubscription(subRef, {
//                last4: ref.data.data.object.last4
//           }, function (err) {
//                if (err !== null) {
//                     return cb(err);
//                }
//                utils.checkActivity(subscription.oid, function (err, activity) {
//                     if (err) {
//                          var title = "Payment Source Updated";
//                          var text = "You've updated your paymenet method on SeoDr.com";
//                          utils.sendEmail(title, text, activity.email, 'Thank you for updating your payment method', function (err) {
//                               req.flash('info', {
//                                    msg: 'An e-mail has been sent to ' + activity.email + ' with further instructions.'
//                               });
//                          })
//                          return cb(err);
//                     }
//                     return cb(null);
//                });
//
//           });
//      });
// }

// Find the customer subscription using the Stripe identifier (included in the event payload).
// Retrieve the subscription details from the Stripe API.
// Update our subscription's CurrentPeriodStart and CurrentPeriodEnd with the Stripe subscription's period_start and period_end.
// Create a customer invoice using the details from the Stripe event.

// }
