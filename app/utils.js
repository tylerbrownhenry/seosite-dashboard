var bcrypt = require('bcrypt-nodejs'),
     crypto = require('crypto'),
     User = require('./models/user'),
     q = require('Q'),
     moment = require('moment'),
     emailContent = require('./emailContent'),
     Subscription = require('./models/subscription'),
     Email = require('./models/email'),
     _ = require('underscore'),
     Activity = require('./models/activity'),
     _console = require('./console'),
     ejs = require('ejs'),
     secrets = require('./config/secrets');
nodemailer = require('nodemailer'),
     mailgunApiTransport = require('nodemailer-mailgunapi-transport'),
     PasswordResetToken = require('./models/passwordResetToken'),
     Permission = require('./models/permission');

function encrypt(password, callback) {
     bcrypt.genSalt(10, function (err, salt) {
          if (err) {
               if (typeof callback === 'function') {
                    return callback(err);
               }
          }
          bcrypt.hash(password, salt, null, function (err, hash) {
               if (err) {
                    if (typeof callback === 'function') {
                         return callback(err);
                    }
               } else {
                    if (typeof callback === 'function') {
                         callback(null, hash);
                    }
               }
          });
     });
}

function formatDateFromEpoch(time) {
     return moment.unix(time).format('YYYY-MM-DD');
}

function gravatar(size, email) {
     if (!size) {
          size = 200;
     }

     if (!email) {
          return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
     }

     var md5 = crypto.createHash('md5').update(email).digest('hex');
     return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

/**
 * updates a user's/organization's activity
 * @param  {String}   oid      organization ID
 * @param  {String}   type     activity group type [page||site||sumamry||issues...]
 * @param  {Function} callback callback accepts two paramaters, err and activity data
 */
function updateActivity(oid, type, callback) {
     _console.log('utils.js: updateActivity', oid);
     var updates = {
          $ADD: {}
     };
     updates['$ADD'][type + '-day-count'] = 1;
     updates['$ADD'][type + '-month-count'] = 1;
     Activity.update({
          oid: oid
     }, updates, function (err) {
          if (err) {
               if (typeof callback === 'function') {
                    return callback(err);
               }
          }
          if (typeof callback === 'function') {
               return callback(null);
          }
     });
}

function updateActivityEmail(oid, email, callback) {
     var updates = {
          $ADD: {}
     };
     Activity.update({
          oid: oid
     }, {
          email: email
     }, function (err) {
          if (err) {
               if (typeof callback === 'function') {
                    return callback(err);
               }
          }
          if (typeof callback === 'function') {
               return callback(null);
          }
     });
}

/**
 * finds a password reset token
 * @param  {String}   token    random hash
 * @param  {Function} callback callback accepts two paramaters, err and activity data
 */
function findPasswordResetToken(token, callback) {
     PasswordResetToken.get({
          token: token,
     }, function (err, resp) {
          _console.log('utils.js: findPasswordResetToken', resp, err);
          if (err) {
               if (typeof callback === 'function') {
                    return callback(err);
               }
          }
          if (typeof callback === 'function') {
               return callback(null, resp);
          }
     });
}

/**
 * updates a password reset token
 * @param  {String}   uid      user ID
 * @param  {String}   token    random hash
 * @param  {String}   expires  when token is no longer valid
 * @param  {Function} callback callback accepts two paramaters, err and activity data
 */
function savePasswordResetToken(opts, callback) {
     _console.log('utils.js savePasswordResetToken', opts);
     PasswordResetToken.update({
          token: opts.token,
     }, {
          uid: opts.uid,
          expires: opts.expires
     }, function (err) {
          _console.log('utils.js savePasswordResetToken: err', err);
          if (err) {
               if (typeof callback === 'function') {
                    return callback(err);
               }
          }
          if (typeof callback === 'function') {
               return callback(null);
          }
     });
}

/**
 * checks a user's/organization's activity
 * @param  {String}   oid      organization ID
 * @param  {Function} callback callback accepts two paramaters, err and activity data
 */
function checkActivity(oid, callback) {
     Activity.get({
          oid: oid
     }, function (err, activity) {
          if (err) {
               if (typeof callback === 'function') {
                    return callback(err);
               }
          }
          if (typeof callback === 'function') {
               _console.log('utils.js checkActivity: activity:', activity);
               return callback(null, activity);
          }
     });
}

/**
* finds an email
* @param  {String}   email
* @param  {Function} callback callback accepts two paramaters, err and email data
*/
function findEmail(email, callback) {
    Email.get({
         email: email
    }, function (err, email) {
         if (err) {
              if (typeof callback === 'function') {
                   return callback(err);
              }
         }
         if (typeof callback === 'function') {
              _console.log('utils.js findEmail: email:', email);
              return callback(null, email);
         }
    });
}

/**
* saves an email
* @param  {Object}   data object with email,oid,and uid as properties
* @param  {Function} callback callback accepts two paramaters, err and email data
*/
function saveEmail(data, callback) {
  var email = new Email(data);
    email.save(function (err, email) {
         if (err) {
              if (typeof callback === 'function') {
                   return callback(err);
              }
         }
         if (typeof callback === 'function') {
              _console.log('utils.js saveEmail: email:', email);
              return callback(null, email);
         }
    });
}

/**
* deletes an email
* @param  {String}   email
* @param  {Function} callback callback accepts two paramaters, err and email
*/
function deleteEmail(email, callback) {
    Email.delete({
         email: email
    }, function (err, email) {
         if (err) {
              if (typeof callback === 'function') {
                   return callback(err);
              }
         }
         if (typeof callback === 'function') {
              _console.log('utils.js deleteEmail: email:', email);
              return callback(null, email);
         }
    });
}


function findUserByUid(uid, callback) {
     User.get({
          uid: uid
     }, function (err, user) {
          if (err) {
               if (typeof callback === 'function') {
                    return callback(err);
               }
          }
          if (typeof callback === 'function') {
               _console.log('utils.js findUserByOid: user:', user);
               return callback(null, user);
          }
     })
}

/**
 * finds permission in dynamoose
 * @param  {String}   plan     plan label [free||pro]
 * @param  {Function} callback callback accepts two paramaters, err and premission data
 */
function checkPermissions(plan, callback) {
     Permission.get({
          label: plan
     }, function (err, permission) {
          if (err) {
               if (typeof callback === 'function') {
                    return callback(err);
               }
          }
          if (typeof callback === 'function') {
               return callback(null, permission);
          }
     });
}

/**
 * checks a user's/organization's activity, and if over the request type based on their plan
 * @param  {String}   oid       organization ID
 * @param  {String}   plan     plan label [free||pro]
 * @param  {String}   type     type of request to check
 * @param  {Function} callback callback accepts two paramaters, err and decision as a Boolean
 */
function checkAvailActivity(oid, permission, type, callback) {
     checkActivity(oid, function (err, activity) {
          if (err) {
               return callback(err);
          }
          // checkPermissions(plan, function (err, permission) {
          if (err) {
               return callback(err);
          }
          _console.log("utils.js checkAvailActivity activity[type + '-day-count']", activity[type + '-day-count']);
          _console.log("utils.js checkAvailActivity permission.limits.daily[type]", permission.limits.daily[type]);
          _console.log("utils.js checkAvailActivity pe", type);

          var dailyAvail = (activity[type + '-day-count'] < permission.limits.daily[type]);
          var monthlyAvail = (activity[type + '-month-count'] < permission.limits.monthly[type]);
          var decision = (dailyAvail === true && monthlyAvail === true);
          callback(null, decision);
          // })
     })
}

/**
 * finds a user in dynamo
 * @param  {Object}   args     identifier(s) for the user
 * @param  {Function} callback callback accepts two paramaters, err and user data
 */
function findUser(args, callback) {
     try {
          _console.log('utils.js findUser: args:', args)
          User.scan(args).exec(function (err, user) {
               if (err) {
                    if (typeof callback === 'function') {
                         return callback(err);
                    }
               } else {
                    if (typeof callback === 'function') {
                         return callback(null, user);
                    }
               }
          });
     } catch (err) {
          if (typeof callback === 'function') {
               return callback({
                    message: 'There was an issue finding user'
               });
          }
     }
}

/**
 * finds and returns a user in dynamo
 * @param  {Object}   args     identifier(s) for the user
 * @param  {Function} callback callback accepts two paramaters, err and user data
 */
function findOneUser(args, callback) {
     try {
          _console.log('utils.js findOneUser args:', args)
          User.get(args, function (err, user) {
               console.log('user', user, 'err', err);
               if (err) {
                    if (typeof callback === 'function') {
                         return callback(err);
                    }
               } else {
                    if (typeof callback === 'function') {
                         return callback(null, user);
                    }
               }
          });
     } catch (err) {
          console.log('utils.js findOneUser err', err);
          if (typeof callback === 'function') {
               return callback({
                    message: 'There was an issue finding user'
               });
          }
     }
}

/**
 * update a user in dynamo
 * @param  {Object}   args     identifier(s) for the user
 * @param  {Object}   updates  what and how to update
 * @param  {Function} callback callback accepts one paramater, err
 */
function updateUser(args, updates, callback) {
     try {
          User.update(args, updates, function (err) {
               _console.log('utils.js updateUser', err, callback);
               if (err) {
                    if (typeof callback === 'function') {
                         return callback(err);
                    }
               }
               if (typeof callback === 'function') {
                    return callback(null);
               }
          });
     } catch (err) {
          if (typeof callback === 'function') {
               return callback({
                    message: 'There was an issue updating user'
               });
          }
     }
}

/**
 * update a subscription in dynamo
 * @param  {Object}   oid     identifier(s) for the subscription
 * @param  {Object}   updates  what and how to update
 * @param  {Function} callback callback accepts one paramater, err
 */
function updateSubscription(request, updates, callback) {
     _console.log('utils.js updateSubscription');
     try {
          if (typeof request === 'string') {
               request = {
                    customerId: request
               };
          }
          Subscription.update(request, updates, function (err) {
               _console.log('utils.js updateSubscription: Subscription.update err:', err);
               if (err) {
                    if (typeof callback === 'function') {
                         return callback(err);
                    }
               }
               if (typeof callback === 'function') {
                    return callback(null);
               }
          });
     } catch (err) {
          _console.log('utils.js updateSubscription: err', err);
          if (typeof callback === 'function') {
               return callback({
                    message: 'There was an issue updating subscription'
               });
          }
     }
}

/**
 * find a subscription in dyanmo table
 * @param  {Object}   args  identifier(s) for item
 * @param  {Function} cb    callback accepts two paramaters, err and item data
 */
function findSubscription(args, cb) {
     try {
          Subscription.get(args, function (err, subscription) {
               _console.log('utils.js findSubscription Subscription.get', subscription)
               if (err) {
                    if (typeof cb === 'function') {
                         return cb(err);
                    }
               } else {
                    if (typeof cb === 'function') {
                         return cb(null, subscription);
                    }
               }
          });
     } catch (err) {
          _console.log('utils.js findSubscription Subscription.get err', err);
          if (typeof cb === 'function') {
               return cb({
                    message: 'There was an issue finding subscription'
               });
          }
     }
}

/**
 * deletes an item from dynamo
 * @param  {Object}   model dynamoDb model
 * @param  {Object}   opts  identifier for item
 * @param  {Function} cb    callback accepts one paramaters, err
 */
function deleteItem(model, opts, cb) {
     try {
          model.delete(opts, function (err) {
               if (err) {
                    if (typeof cb === 'function') {
                         return cb(err);
                    }
               }
               if (typeof cb === 'function') {
                    return cb(null);
               }
          });
     } catch (err) {
          if (typeof cb === 'function') {
               return cb({
                    message: 'There was an issue deleting item'
               });
          }
     }
}

/**
 * deletes a user from dynamo
 * @param  {String}   uid user ID
 * @param  {Function} cb    callback accepts one paramaters, err
 */
function deleteUser(uid, cb) {
     try {
          User.delete({
               uid: uid
          }, function (err) {
               if (err) {
                    if (typeof cb === 'function') {
                         return cb(err);
                    }
               }
               if (typeof cb === 'function') {
                    return cb(null);
               }
          });
     } catch (err) {
          if (typeof cb === 'function') {
               return cb({
                    message: 'There was an issue deleting user'
               });
          }
     }
}

/**
 * find an item in dyanmo table
 * @param  {String}   model dynamoose model
 * @param  {Object}   args  identifier(s) for item
 * @param  {Function} cb    callback accepts two paramaters, err and item data
 */
function findBy(model, args, cb) {
     try {
          model.get(args, function (err, item) {
               if (err) {
                    if (typeof cb === 'function') {
                         return cb(err);
                    }
               } else {
                    if (typeof cb === 'function') {
                         return cb(null, item);
                    }
               }
          });
     } catch (err) {
          if (typeof cb === 'function') {
               return cb({
                    message: 'There was an issue finding' + model
               });
          }
     }
}

function getAllUsers(callback) {
     User.scan().exec()
          .then(callback)
          .catch(callback);
}

function getAllItems(model, args, callback) {
     model.scan(args).exec()
          .then(function (res) {
               callback(null, res);
          }).catch(function (err) {
               callback(err)
          });
}

function deleteItems(model, args, callback) {
     model.batchDelete(args, function (err, res) {
          callback(err, res);
     });
}

function getScans(Request, Scan, e, callback) {
     _console.log('utils.js getScans', e, callback);
     findSomeBy(Request, {
          uid: e.uid
     }, function (err, data) {
          if (err !== null) {
               callback(err);
          }
          _console.log('utils.js getScans findSomeBy:Request data:', data);
          var requests = data;
          findSomeBy(Scan, {
               uid: e.uid
          }, function (err, data) {
               if (err !== null) {
                    callback(err);
               }
               _console.log('utils.js getScans findSomeBy:Scan data:', data);
               var scans = {
                    message: '',
                    list: []
               };
               if (err === null) {
                    scans.message = 'Request found!';
                    scans.list = _.uniq(_.union(data, requests), false, function (item) {
                         return item.requestId;
                    });
               } else {
                    scans.message = err;
               }
               scans.list.sort(function (a, b) {
                    return a.requestDate - b.requestDate;
               });
               callback(null, scans);
          });
     });
}

/**
 * finds item(s) in dyanmo table
 * @param  {String}   model dynamoose model
 * @param  {Object}   args  identifier(s) for item
 * @param  {Function} cb    callback accepts two paramaters, err and item data
 */
function findSomeBy(model, args, cb) {
     try {
          model.scan(args, function (err, item) {
               if (err) {
                    if (typeof cb === 'function') {
                         return cb(err);
                    }
               } else {
                    if (typeof cb === 'function') {
                         return cb(null, item);
                    }
               }
          });
     } catch (err) {
          if (typeof cb === 'function') {
               return cb({
                    message: 'There was an issue finding' + model
               });
          }
     }
}

/**
 * delete an item from a dynamo table
 * @param  {String}   model dynamoose model
 * @param  {Object}   args  identifier(s) for item
 * @param  {Function} cb     callback accepts one paramaters, err
 */
function deleteBy(model, args, cb) {
     try {
          model.delete(args, function (err) {
               if (err) {
                    if (typeof callback === 'function') {
                         return callback(err);
                    }

               }
               if (typeof callback === 'function') {
                    return callback(null);
               }
          });
     } catch (err) {
          return callback({
               message: 'There was an issue deleting user'
          });
     }
}

function findSubscriptionByCustomer(customerId) {
     var promise = q.defer();
//      Customer.get({
//           customerId: customerId
//      }, function (err, res) {
// console.log('findSubscriptionByCustomer res:',res);
//           if (err === null) {
               findSubscription({
                    customerId: customerId
               }, function (err, subscription) {
                    if (err === null) {
                         promise.resolve(subscription)
                    } else {
                         promise.reject(err);
                    }
               });
    //       } else {
    //            promise.reject(err);
    //       }
    //  });
    return promise.promise;
};

function fetchActivityByCustomer(customerId) {
     var promise = q.defer();
     _console.log('utils.js fetchActivityByCustomer');
     findSubscriptionByCustomer(customerId).then(function (subscription) {
          checkActivity(subscription.oid, function (err, activity) {
               if (err === null) {
                    promise.resolve(activity);
               } else {
                    promise.reject(err);
               }
          });
     }).catch(function (err) {
          promise.reject(err);
     });
};

function formatEmailContent(key, input) {
     return emailContent.process(key, input);
}

/**
 * wrapper for sending an email
 * @param  {String}   title   title for email message
 * @param  {String}   text    body text of email
 * @param  {String}   email   email to send email to
 * @param  {String}   subject subject line for email
 * @param  {Function} cb      callback
 */
function sendEmail(title, text, email, subject, cb) {

     var transporter = nodemailer.createTransport(mailgunApiTransport(secrets.mailgun));
     var path = require('path');
     var Styliner = require('styliner');
     var styliner = new Styliner(__dirname + '/email');
     var p = path.join(__dirname + '/email/layout.ejs');
     ejs.renderFile(p, {
          title: title,
          text: text
     }, function (e, html) {
          styliner.processHTML(html)
               .then(function (processedSource) {
                    var mailOptions = {
                         to: email,
                         from: 'noreply@myseodr.com',
                         subject: subject,
                         html: processedSource
                    };
                    transporter.sendMail(mailOptions, cb);
               })
     });
}

module.exports.encrypt = encrypt;
module.exports.findBy = findBy;
module.exports.sendEmail = sendEmail;
module.exports.findSomeBy = findSomeBy;
module.exports.updateActivity = updateActivity;
// module.exports.findActivity = findActivity;
module.exports.updateActivityEmail = updateActivityEmail;
module.exports.checkActivity = checkActivity;
module.exports.formatEmailContent = formatEmailContent;
module.exports.checkAvailActivity = checkAvailActivity;
module.exports.gravatar = gravatar;
module.exports.getAllItems = getAllItems;
module.exports.deleteItems = deleteItems;
module.exports.savePasswordResetToken = savePasswordResetToken;
module.exports.fetchActivityByCustomer = fetchActivityByCustomer;
module.exports.findSubscriptionByCustomer = findSubscriptionByCustomer;
module.exports.findPasswordResetToken = findPasswordResetToken;
module.exports.findUser = findUser; /* When not searching by email */
module.exports.findUserByUid = findUserByUid; /* When not searching by email */
module.exports.findOneUser = findOneUser;
module.exports.updateUser = updateUser;
module.exports.updateSubscription = updateSubscription;
module.exports.findSubscription = findSubscription;
module.exports.deleteItem = deleteItem;
module.exports.formatDateFromEpoch = formatDateFromEpoch;
module.exports.getScans = getScans;
module.exports.findEmail = findEmail;
module.exports.saveEmail = saveEmail;
module.exports.deleteEmail = deleteEmail;
module.exports.getAllUsers = getAllUsers;

/* Smoke Covered */
module.exports.deleteUser = deleteUser;
