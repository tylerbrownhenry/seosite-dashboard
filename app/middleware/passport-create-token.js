var jwt = require('jsonwebtoken'),
secrets = require('../config/secrets');

/**
 * creates a hash based on an email
 * @param  {String} email an email address
 * @return {String}       an encoded string
 */
function createToken(email) {
     email = JSON.stringify(email);
     console.log('test passport createToken', email, secrets.apiToken);
     return jwt.sign(email, secrets.apiToken, {
          expiresIn: '14d' // expires in 2 weeks
     });
}
module.exports = createToken;
