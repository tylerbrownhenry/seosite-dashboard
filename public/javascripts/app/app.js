var submitForm,socket;
console.log('ONE',socket);
jQuery(function ($) {
  console.log('TWO');
     socket = io.connect(CURRENT_HOST);

     submitForm = function (form) {
          var data = $(form).serializeArray();
          var arr = {};
          $.map(data, function (n) {
               arr[n['name']] = n['value'];
          });
          console.log('form',form,arr);
          socket.emit('queue/' + arr.request, {
               uid: arr.uid,
               url: arr.url,
               page: arr.page,
               token: arr.token,
               /* Options */
               type: arr.type,
               captures: arr["save-captures"],
               links: arr["check-links"],
               security: arr["check-security"],
          });
          return false;
     }
     console.log('TWO');
});
