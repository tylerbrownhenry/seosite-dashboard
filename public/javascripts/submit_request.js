var count = 0;
var submittedWaiting = false;

// function styleForm(form, tempId) {
    //  $(form).addClass('loading');
    //  $('.row.header').after('<div class="row js_temp_request_' + tempId + ' loading-temp"><div class="col-sm-4">Scan Initiated</div></div>');
    //  submittedWaiting = true;
// }


$('.runTestScans').on('click',function(){
    /* Running Test Scans */
    var arr = {
      uid: window.uid,
      url: '',
      page: '/dashboard',
      type: 'page',
      token: window.apiToken,
      saveCaptures: true,
      saveScan: true,
      checkLinks: true,
      checkResources: true,
      checkSecurity: true,
      checkMeta: true
    }

    var links = [
      'http://httpstat.us/500',
      'http://httpstat.us/200',
      'http://httpstat.us/400',
      'http://badssl.com',
      'http://example.com:81',
      'http://requestb.in/zkq9m0zk'
    ];

    _.each(links,function(link){
      arr.url = link;
      socket.emit('queue/page',arr);
    });
    console.log('onSubmit');
    return false;
});

function onSubmit(form) {
     console.log('onSubmit');

    //  $(form).addClass('loading waiting-callback');
     //
    //  if (submittedWaiting) {
    //       errorMessage(form, 'You already have a run in progress, please wait for it to complete before starting another one.');
    //       return false;
    //  }

     var data = $(form).serializeArray();
     var arr = {};
     $.map(data, function (n) {
          arr[n['name']] = n['value'];
     });
    //  count++;
    //  console.log('onSubmit', arr.request, arr);
    //  sentMessages[count] = arr.url;
     socket.emit('queue/' + arr.request, {
          // temp_id: count,
          uid: arr.uid,
          url: arr.url,
          page: arr.page,
          type: arr.type,
          token: arr.token,
          saveCaptures: arr["save-captures"],
          saveScan: arr["save-scan"],
          checkLinks: arr["check-links"],
          checkResources: arr["check-resources"],
          checkSecurity: arr["check-security"],
          checkMeta: arr["check-meta"]
     });
    //  styleForm(form, count);
     return false; //don't submit
}
