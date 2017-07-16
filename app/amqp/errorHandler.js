/**
 * error handler
 * @param  {Object} amqpConn
 * @param  {Error|String} err
 * @return {Boolean}
 */
module.exports = function closeOnErr(amqpConn, err) {
     if (!err) {
          console.log('error', err);
          return false;
     }
     amqpConn.close();
     return true;
};
