var pageScan = require('./requests/pageScan'),
     PageScanOptions = require('./requests/pageScanOptions');

/**
 * initalizes listerners for front-end requests
 * @param  {Object} socket connection Object for socket.io
 */
function requests(socket) {
     socket.on('queue/page', function (data) {
          console.log('requests.js queue/page -->', data);
          var options = new PageScanOptions(data);
          pageScan(options).then(function (response) {
              console.log('requests.js queue/page --> success', response);
              socket.emit('update/'+data.token+'/'+data.uid,response);
          }).catch(function (error) {
              console.log('requests.js queue/page --> error', error);
              socket.emit('update/'+data.token+'/'+data.uid,error);
          });
     });
}

module.exports = requests;
