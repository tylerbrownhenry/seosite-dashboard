module.exports = function closeOnErr(amqpConn, err) {
     if (!err) {
          console.log('error', err);
          return false;
     }
     amqpConn.close();
     return true;
};
