var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var User = require('./models/user');

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

function findUser(args, callback) {
     try {
          User.get(args, function (err) {
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

function updateUser(args, updates, callback) {
     try {
          User.update(args, updates, function (err) {
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

function deleteUser(uid, callback) {
     try {
          User.delete({
               uid: uid
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
     } catch (err) {
          if (typeof callback === 'function') {
               return callback({
                    message: 'There was an issue deleting user'
               });
          }
     }
}

function findBy(model, args, cb) {
     try {
          model.get(args, function (err) {
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
          return callback({
               message: 'There was an issue finding' + model
          });
     }
}

function deleteBy(model, args, cb) {
     try {
          model.delete({
               uid: uid
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
     } catch (err) {
          return callback({
               message: 'There was an issue deleting user'
          });
     }
}

module.exports.encrypt = encrypt;
module.exports.findBy = findBy;
module.exports.gravatar = gravatar;
module.exports.findUser = findUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
