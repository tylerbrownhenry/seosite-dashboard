
/* Creating, Adding A Credit Card, Add A Subscription, Update Subscription, and Deleting User */
// req.user.email = 'me@tyler2131232brownherny.com';
// req.user.uid = 'uLLIp';
// req.user.oid = 'Z1o2OsV';
// req.body = req.user;
// var newPlan = 'monthlycorporate';
// user = req.user;
// shortHandDeleteUser(req,function () {
//      createUser(req,function (err,res) {
//           console.log('createUser');
//           addACreditCard(user, cardNum,function (res) {
//                if (res === true) {
//                     console.warn('createUser addACreditCard success');
//                } else {
//                     console.warn('createUser addACreditCard failed');
//                }
//                addASubscription(newPlan, function (res) {
//                     utils.findSubscription({
//                          customerId: user.customerId
//                     }, function (err, res) {
//                          console.log('FIND', res);
//                          if (res.last4 && res.plan === newPlan) {
//                               console.log('findSubscription updated');
//                               checkIfStripeUserExists(res, function (res) {
//                                    console.log('userPlan is updated in stripe as well', res);
//                                    newPlan = 'annualbusiness';
//                                    addASubscription(newPlan, function (res) {
//                                         utils.findSubscription({
//                                              customerId: user.customerId
//                                         }, function (err, res) {
//                                              console.log('FIND', res);
//                                              if (res.last4 && res.plan === newPlan) {
//                                                   console.log('findSubscription updated');
//                                                   checkIfStripeUserExists(res, function (res) {
//                                                        if (res === true) {
//                                                             console.log('userPlan is updated in stripe as well', res);
//                                                             console.warn('createUser addACreditCard success');
//                                                             /* Bad Credit Card Number */
//                                                             cardNum = 4000000000000341;
//                                                             addACreditCard(user,cardNum, function (res) {
//                                                                  if (res === true) {
//                                                                       console.warn('createUser addACreditCard success');
//                                                                       newPlan = 'annualcorporate';
//                                                                       addASubscription(newPlan, function (res) {
//                                                                            console.log('addASubscription failure res', res, typeof res);
//                                                                            if (res.code === 'card_declined') {
//                                                                                 console.log('Card Declined as expected');
//                                                                                 utils.findSubscription({
//                                                                                      customerId: user.customerId
//                                                                                 }, function (err, res) {
//                                                                                      console.log('FIND', res);
//                                                                                      if (res.last4 === '0341' && res.plan !== newPlan) {
//                                                                                           console.log('plan not updated as expected');
//                                                                                           checkIfStripeUserExists(res, function (res) {
//                                                                                                if (res === false) {
//                                                                                                     console.log('stripe user not updated as expected')
//                                                                                                     console.log('everything good');
//                                                                                                     cardNum = 4242424242424242;
//                                                                                                     addACreditCard(user, cardNum,function (res) {
//                                                                                                          if (res === true) {
//                                                                                                               addASubscription(newPlan, function (res) {
//                                                                                                                    console.log('FIND2 ', res);
//                                                                                                                    utils.findSubscription({
//                                                                                                                         customerId: user.customerId
//                                                                                                                    }, function (err, res) {
//                                                                                                                         if (res.last4 === '4242' && res.plan === newPlan) {
//                                                                                                                              console.log('plan was updated as expected');
//                                                                                                                              console.log('GREAT!');
//                                                                                                                         } else {
//                                                                                                                              console.warn('plan was not updated as expected');
//                                                                                                                         }
//                                                                                                                    });
//                                                                                                               },false,user)
//                                                                                                          } else {
//                                                                                                               console.warn('createUser addACreditCard failed');
//                                                                                                          }
//                                                                                                     });
//                                                                                                } else {
//                                                                                                     console.log('stripe user updated not as expected')
//                                                                                                }
//                                                                                           }, function (res) {
//                                                                                                console.log('stripe plans 2', res.subscriptions.data, newPlan);
//                                                                                                var found = false;
//                                                                                                _.each(res.subscriptions.data, function (plan) {
//                                                                                                     if (plan.plan.id === newPlan) {
//                                                                                                          found = true;
//                                                                                                     }
//                                                                                                     console.log('plan', plan.plan.id, newPlan);
//                                                                                                });
//                                                                                                return found;
//                                                                                           });
//                                                                                      } else {
//                                                                                           console.warn('plan was updated not as expected');
//                                                                                      }
//                                                                                 });
//                                                                            } else {
//                                                                                 console.warn('Card Not Declined as expected');
//                                                                            }
//                                                                       },false,user);
//                                                                  } else {
//                                                                       console.warn('createUser addACreditCard failed');
//                                                                  }
//                                                             });
//                                                        } else {
//                                                             console.warn('userPLan was not updated as expected');
//                                                        }
//                                                        //  console.log('FINISHED');
//                                                        //  shortHandDeleteUser(req,function () {});
//
//                                                   }, function (res) {
//                                                        return res.subscriptions.data[0].plan.id === newPlan;
//                                                   });
//                                              } else {
//                                                   console.console.warn();
//                                                   ('findSubscription not updated');
//                                              }
//                                         });
//                                    },false,user)
//                               }, function (res) {
//                                    console.log('stripe plans 1', res.subscriptions.data.length);
//                                    return res.subscriptions.data[0].plan.id === newPlan;
//                               });
//                          } else {
//                               console.warn('findSubscription not updated');
//                          }
//                     });
//                },false,user)
//           })
//      });
// });

/** Subscription can be changed with a bad credit card, but same billing cycle, will not charge again immediately. **/
// req.user.email = 'subscription@gmail.com';
// req.user.uid = '19oykW';
// req.user.oid = 'Z3qntw';
// req.body = req.user;
// newPlan = 'monthlybusiness';
// user = req.user;
// cardNum = 4242424242424242;
// var customerId,subscriptionId;
// shortHandDeleteUser(req,function () {
//      createUser(req,function (err,res) {
//           console.log('createUser', user);
//           addACreditCard(user,cardNum,function (res) {
//                if (res === true) {
//                     console.warn('createUser addACreditCard success');
//                     addASubscription(newPlan, function (res) {
//                          utils.findSubscription({
//                               customerId: user.customerId
//                          }, function (err, res) {
//                               console.log('findSubscription res', res);
//                               customerId = res.customerId;
//                               subscriptionId = res.subscriptionId;
//                               checkIfStripeUserExists(res, function (res) {
//                                 console.warn('plan was updated as expected',res);
//                                    if (res === true) {
//                                         newPlan = 'monthlycorporate';
//                                         cardNum = 4000000000000341;
//                                         addACreditCard(user,cardNum, function (res) {
//                                              if (res === true) {
//                                                   addASubscription(newPlan, function (res) {
//                                                             user.customerId = customerId;
//                                                             user.subscriptionId = subscriptionId
//                                                             checkIfStripeUserExists(user, function (res) {
//                                                                  console.log('res', res);
//                                                                  console.log('DONE!', res === false);
//                                                                  shortHandDeleteUser(req,function () {});
//                                                             }, function (res) {
//                                                               console.log('res',res.sources);
//                                                                  var found = false;
//                                                                  _.each(res.subscriptions.data, function (plan) {
//                                                                       if (plan.plan.id === newPlan) {
//                                                                            found = true;
//                                                                       }
//                                                                       console.log('plan', plan.plan.id, newPlan);
//                                                                  });
//                                                                  return found;
//                                                             });
//                                                   }, true);
//                                              } else {
//                                                   console.warn('createUser addACreditCard failed');
//                                              }
//                                         });
//                                    } else {
//                                         console.log('plan not updated not as expected');
//                                    }
//                               }, function (res) {
//                                    console.log('res--');
//                                    subscriptionId = res.subscriptions.data[0].id;
//                                    return true;
//                               });
//                          });
//                     },false,user);
//                } else {
//                     console.warn('createUser addACreditCard failed');
//                }
//           });
//      });
// });

/** Subscription can be changed with a bad credit card, but same billing cycle, will not charge again immediately. **/
// req.user.email = 'subscription@gmail.com';
// req.user.uid = '19oykW';
// req.user.oid = 'Z3qntw';
// req.user.uid = 'ZBhQwO',
//      req.user.oid = '1wHzOc',
//      req.user.email = 'tyler@milmerry.com';
// req.body = req.user;
// newPlan = 'monthlybusiness';
// user = req.user;
// cardNum = 4242424242424242;
// var customerId, subscriptionId;
// utils.deleteUser(req.user.uid, function (err, res) {
//      createUser(req,function (err,res) {
//        console.log('createUser HERE');
//           addACreditCard(user,cardNum,function (res) {
//             console.log('addACreditCard HERE');
//                addASubscription(user.customerId, function (res) {
//                     utils.findSubscriptionByCustomer(user.customerId).then(function (res) {
//                          console.log('findSubscription --> RES', res)
//                     });
//                },false,user);
//           });
//      });
// });
