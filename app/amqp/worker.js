var errorHandler = require('./errorHandler');

function init(assertName, queueFunc, queueName, ack) {
     ch.assertQueue(queueName, {
          durable: true
     }, function (err) {
          if (errorHandler(amqpConn, err)) {
               console.log('amqpConn', amqpConn, 'err', err); /* Restart or something? */
               return;
          }
          console.log('queue' + assertName);
          if (ack) {
               ch.consume(assertName, queueFunc, {
                    noAck: false
               });
          } else {
               ch.consume(assertName, queueFunc);

          }
     });
}

function processAlerts(msg) {
     ch.ack(msg);
}

module.exports.start = function (amqpConn) {
     amqpConn.createChannel(function (err, ch) {
          console.log('ch', ch);
          if (errorHandler(amqpConn, err)) {
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

          init('alerts', processAlerts, 'alerts');

     });
};
