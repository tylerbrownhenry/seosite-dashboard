var pubChannel = null;
var offlinePubQueue = [];
var errorHandler = require('./errorHandler');
var q = require('q');

/**
 * method to publish a message, will queue messages internally if the connection is down and resend later
 * @param  {String} exchange   name of rabbitMQ exchange to publish to
 * @param  {String} routingKey
 * @param  {Object|String} content    content of message to be published
 * @param  {Object} options    rabbitMQ options for the message
 * @return {promise}           promise object
 */
function publish(exchange, routingKey, content, options) {
     var promise = q.defer();
     var opts = (typeof options !== 'undefined') ? options : {};
     opts.persistent = true;
     try {
          pubChannel.publish(exchange, routingKey, content, opts, function (err) {
               if (err) {
                    console.error("[AMQP] publish", err);
                    offlinePubQueue.push([exchange, routingKey, content]);
                    pubChannel.connection.close();
                    promise.reject({
                         system: 'amqp',
                         status: 'warning',
                         message: 'An error occured while processing your request, added to queue while waiting for connection. More: ' + err
                    });
               } else {
                    promise.resolve();
               }
          });
     } catch (e) {
          console.error("[AMQP] publish", e.message);
          promise.reject({
               system: 'amqp',
               status: 'warning',
               message: 'An error occured while processing your request, added to queue while waiting for connection. More: ' + e.message
          });
          offlinePubQueue.push([exchange, routingKey, content]);
     }
     return promise.promise;
}
/**
 * initilizes rabbitMQ publisher
 * @param  {object} amqpConn rabbitMq connection object
 */
module.exports.start = function (amqpConn) {
     amqpConn.createConfirmChannel(function (err, ch) {
          if (errorHandler(amqpConn, err)) {
               return;
          }
          ch.on("error", function (err) {
               console.error("[AMQP] channel error", err.message);
          });
          ch.on("close", function () {
               console.log("[AMQP] channel closed");
          });
          pubChannel = ch;
          while (true) {
               var m = offlinePubQueue.shift();
               if (!m) {
                    break;
               }
               publish(m[0], m[1], m[2]);
          }
     });
};

module.exports.publish = publish;
