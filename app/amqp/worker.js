var errorHandler = require('./errorHandler');
var sendStatus = require('../api-requests/callbacks').sendStatus;

/**
 * handler for messages
 * @param  {Object} msg message received from rabbitMQ
 * @param  {Object} ch  rabbitMQ channel
 */
function processUpdates(msg, ch) {
     ch.ack(msg);
     sendStatus(JSON.parse(msg.content));
}
/**
 * initilizes rabbitMQ consumer
 * @param  {object} amqpConn rabbitMq connection object
 */
module.exports.start = function (amqpConn) {

     /**
      * initalize consumer
      * @param  {String} assertName
      * @param  {Function} queueFunc  function to run on message
      * @param  {String} queueName  name of queue message belongs to
      * @param  {Object} ack       object with ack function on it
      * @param  {Object} ch         rabbitMQ channel
      * @return {[type]}            [description]
      */
     function init(assertName, queueFunc, queueName, ack, ch) {
          ch.assertQueue(queueName, {
               durable: true
          }, function (err) {
               if (errorHandler(amqpConn, err)) {
                    return;
               }
               if (ack) {
                    ch.consume(assertName, queueFunc, {
                         noAck: false
                    });
               } else {
                    ch.consume(assertName, queueFunc);
               }
          });
     }

     amqpConn.createChannel(function (err, ch) {
          if (errorHandler(amqpConn, err)) {
              console.log('test?');
               return; /* Restart or something? */
          }
          ch.on("drain", function (err) {
               console.error("[AMQP] channel drgain", err);
          });
          ch.on("error", function (err) {
               console.error("[AMQP] channel error", err); /* Restart or something? */
          });
          ch.on("close", function () {
               console.log("[AMQP] channel closed");
          });
          ch.prefetch(10);
          init('update', function (e) {
               processUpdates(e, ch)
          }, 'update', true, ch);
     });
};
