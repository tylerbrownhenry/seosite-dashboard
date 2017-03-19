var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var stripeCustomer = require('./plugins/stripe-customer');
var secrets = require('../config/secrets');
var timestamps = require('mongoose-timestamp');

var userSchema = new mongoose.Schema({
     email: {
          type: String,
          unique: true,
          lowercase: true
     },
     password: String,
     isAdmin: {
          type: Boolean,
          default: false
     },
     role: {
          type: String,
          default: 'org_admin'
     },
     oid: {
          type: String
     },
     uid: String,
     activity: {
          requests: {
               daily: {
                    refreshed: {
                         type: Date,
                         default: Date.now()
                    },
                    count: {
                         type: Number,
                         default: 0
                    },
               },
               monthly: {
                    refreshed: {
                         type: Date,
                         default: Date.now()
                    },
                    count: {
                         type: Number,
                         default: 0
                    },
               },
          },
          pages: {
               daily: {
                    refreshed: {
                         type: Date,
                         default: Date.now()
                    },
                    count: {
                         type: Number,
                         default: 0
                    },
               },
               monthly: {
                    refreshed: {
                         type: Date,
                         default: Date.now()
                    },
                    count: {
                         type: Number,
                         default: 0
                    },
               },
          },
          sites: {
               daily: {
                    refreshed: {
                         type: Date,
                         default: Date.now()
                    },
                    count: {
                         type: Number,
                         default: 0
                    },
               },
               monthly: {
                    refreshed: {
                         type: Date,
                         default: Date.now()
                    },
                    count: {
                         type: Number,
                         default: 0
                    },
               },
          },
          captures: {
               daily: {
                    refreshed: {
                         type: Date,
                         default: Date.now()
                    },
                    count: {
                         type: Number,
                         default: 0
                    },
               },
               monthly: {
                    refreshed: {
                         type: Date,
                         default: Date.now()
                    },
                    count: {
                         type: Number,
                         default: 0
                    },
               },
          },
          resources: {
               daily: {
                    refreshed: {
                         type: Date,
                         default: Date.now()
                    },
                    count: {
                         type: Number,
                         default: 0
                    },
               },
               monthly: {
                    refreshed: {
                         type: Date,
                         default: Date.now()
                    },
                    count: {
                         type: Number,
                         default: 0
                    },
               },
          },
          links: {
               daily: {
                    refreshed: {
                         type: Date,
                         default: Date.now()
                    },
                    count: {
                         type: Number,
                         default: 0
                    },
               },
               monthly: {
                    refreshed: {
                         type: Date,
                         default: Date.now()
                    },
                    count: {
                         type: Number,
                         default: 0
                    },
               },
          }
     },
     profile: {
          name: {
               type: String,
               default: ''
          },
          gender: {
               type: String,
               default: ''
          },
          location: {
               type: String,
               default: ''
          },
          website: {
               type: String,
               default: ''
          },
          picture: {
               type: String,
               default: ''
          }
     },
     apiToken: String,
     resetPasswordToken: String,
     resetPasswordExpires: Date
});

var stripeOptions = secrets.stripeOptions;

userSchema.plugin(timestamps);
userSchema.plugin(stripeCustomer, stripeOptions);

/**
 * Hash the password for security.
 * "Pre" is a Mongoose middleware that executes before each user.save() call.
 */

userSchema.pre('save', function (next) {
     var user = this;

     if (!user.isModified('password')) {
          return next();
     }

     bcrypt.genSalt(10, function (err, salt) {
          if (err) {
               return next(err);
          }

          bcrypt.hash(user.password, salt, null, function (err, hash) {
               if (err) {
                    return next(err);
               }
               user.password = hash;
               next();
          });
     });
});

/**
 * Validate user's password.
 * Used by Passport-Local Strategy for password validation.
 */

userSchema.methods.comparePassword = function (candidatePassword, cb) {
     bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
          if (err) {
               return cb(err);
          }
          cb(null, isMatch);
     });
};

userSchema.methods.getRequests = function () {
     console.log('get request called!');
};

/**
 * Get URL to a user's gravatar.
 * Used in Navbar and Account Management page.
 */

userSchema.methods.gravatar = function (size) {
     if (!size) {
          size = 200;
     }

     if (!this.email) {
          return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
     }

     var md5 = crypto.createHash('md5').update(this.email).digest('hex');
     return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

module.exports = mongoose.model('User', userSchema);
