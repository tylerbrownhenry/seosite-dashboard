jQuery(function ($) {

     socket = io.connect(CURRENT_HOST);

     socket.on('disconnect', function () {
          $('.disconnected.alert').slideDown();
     });

     socket.on('connect', function () {
          $('.disconnected.alert').slideUp();
     });

     socket.on('statusUpdate/' + window.uid, function (update) {
         socket.emit('getUpdates', {
              uid: window.uid,
              apiToken: window.apiToken,
              currentPage: '/scan/'
         });
     });

     socket.on('updates/' + window.uid + '/' + window.apiToken, function (update) {
          console.log('UPDATE!', update);
          _.each(update.page,function(update){
              $('.updates').prepend("<tr style='background-color:#eee'><td>Status</td><td>RequestID:"+update.i_id+"</td><td>Status:"+update.status+'</td><td>Message:'+update.message+'</td></tr>');
          });
     });

     socket.emit('getScans', {
          uid: window.uid,
          apiToken: window.apiToken
     });

     socket.on('setScans/' + window.uid + '/' + window.apiToken, function (e) {
          console.log('scans', e);
          _.each(e.list, function (scan) {
            if(scan.url && scan.url.url){
              $('.updates').prepend("<tr class='"+scan.requestId+"'><td>Scan</td><!--<td>RequestID: "+scan.requestId+'</td>--><td>Url:'+scan.url.url+'</td><td>Completed:'+scan.completedTime+'</td><td><button>summary</button><button>resources</button><button>meta</button><button>links</button><button>issues</button><button>security</button></td></tr>');
            } else {
              $('.updates').prepend("<tr><td>Request</td><!--<td>RequestID: "+scan.requestId+'</td>--><td>Url:'+scan.url+'</td><td>Failed:'+ scan.failedReason +' Request Time:'+scan.requestDate+'</td><td></td></tr>');
            }
          });
     });
});
