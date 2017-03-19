$('.modal-close,.modal-overlay').on('click', function () {
     $('.open-modal').removeClass('modal-show');
});
$('.modal-trigger').on('click', function (el) {
     var modal = el.currentTarget.attributes['data-modal'].value;
     console.log('modal', el, modal);
     $('#' + modal).addClass('modal-show');

});

var count = 0;
var submittedWaiting = false;

function styleForm(form, tempId) {
     $(form).addClass('loading');
     $('.row.header').after('<div class="row js_temp_request_' + tempId + ' loading-temp"><div class="col-sm-4">Scan Initiated</div></div>');
     submittedWaiting = true;
}

function errorMessage(form, text) {
     $(form).children('jsErrorMessage').text(text).show();
}
var sentMessages = {};

function onSubmit(form) {

     console.log('onSubmit');

     console.log('onSubmit');

     $(form).addClass('loading waiting-callback');

     if (submittedWaiting) {
          errorMessage(form, 'You already have a run in progress, please wait for it to complete before starting another one.');
          return false;
     }

     var data = $(form).serializeArray(); //  <-----------
     var arr = {};
     $.map(data, function (n) {
          arr[n['name']] = n['value'];
     });
     count++;
     console.log('onSubmit', arr.request, arr);
     sentMessages[count] = arr.url;
     socket.emit('queue/' + arr.request, {
          temp_id: count,
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
     styleForm(form, count);
     return false; //don't submit
}

jQuery(function ($) {
     /* Billing */
     var cardWrapper = $('#cardWrapper'),
          cardForm = $('#cardForm'),
          formError = $('#cardFormError'),
          cardFormBtn = cardForm.find('button');

     if (cardWrapper.length > 0) {
          $("input[name=plan]:radio").change(function () {
               if (this.value === 'free') {
                    cardWrapper.hide();
               } else {
                    cardWrapper.show();
               }
          });
          if ($("input:radio[name=plan]:checked").val() === 'free') {
               cardWrapper.hide();
          }
     }

     cardForm.submit(function (e) {
          e.preventDefault();

          var cardNum,
               cardMonth,
               cardYear,
               cardCVC;

          if (cardForm.find("input:radio[name=plan]:checked").val() !== 'free') {
               cardFormBtn.prop('disabled', true);

               cardNum = $('#card-num').val();
               cardMonth = $('#card-month').val();
               cardYear = $('#card-year').val();
               cardCVC = $('#card-cvc').val();

               Stripe.card.createToken({
                    number: cardNum,
                    exp_month: cardMonth,
                    exp_year: cardYear,
                    cvc: cardCVC
               }, function (status, response) {
                    if (response.error) {
                         formError.find('p').text(response.error.message);
                         formError.removeClass('hidden');
                         cardForm.find('button').prop('disabled', false);
                    } else {
                         var token = response.id;
                         cardForm.append($('<input type="hidden" name="stripeToken" />').val(token));
                         cardForm.get(0).submit();
                    }

               });

               return false;
          }
     });

     socket = io.connect(CURRENT_HOST);

     socket.on('deleteCallBack', function (data) {
          /* Requires user token and uid */
          socket.emit('deleteCaptures', data);
     });

     socket.on('back', function () {
          console.log('test!!!!');
     });
     socket.on('disconnect', function () {
          $('.disconnected.alert').slideDown();
     });

     socket.on('connect', function () {
          $('.disconnected.alert').slideUp();
          if (true) {
               console.log('REMOVE THIS TO GET TO WORK AGAIN');
               return;
          }
          socket.emit('getAlerts', {
               uid: window.uid,
               token: window.apiToken,
               currentPage: window.currentPage
          });
     });

     socket.on('broadcastAll/', function (e) {
          console.log('e', e);
     });

     socket.on('alert/' + window.uid, function (e) {
          /* Checking that someone is listening that might be interested... */
          console.log('e', e);
          console.log('were listening!');
          socket.emit('getAlerts', {
               uid: window.uid,
               token: window.apiToken,
               currentPage: window.currentPage
          });
     });

     socket.on('render:scan:' + window.uid + '/' + window.apiToken, function (e) {
          console.log('woo ha!', e);
          if (e && e.data) {
               e.data.highlight = true;
               item.updateItems(e.data);
          }
     });

     socket.on('alerts/' + window.uid, function (e) {
          console.log('these are alerts', e);
          _.each(e.page, function (message) {
               if (typeof message.temp_id !== 'undefined') {
                    /* Most likely already saved, can get url */
                    /* Get url from somewhere! */
                    $('.js_temp_request_' + message.temp_id).remove();
                    submittedWaiting = false;
                    message.url = {
                         url: sentMessages[message.temp_id]
                    };
               }
               if (message.status === 'complete' || message.status === 'failed') {
                    /* do this as an array */
                    socket.emit('get:scan', {
                         message: message,
                         uid: window.uid,
                         apiToken: window.apiToken
                    });
               } else if (message.status === 'error') {
                    var messages = JSON.parse(message.message);
                    _.each(messages, function (message) {
                         var alert = $(message.parent).children('.alert').clone();
                         alert.children('.message-text').text(message.message);
                         alert.prependTo(message.parent).show();
                    });
               } else {
                    item.updateItems(message);

               }
          });

          var pages = {};
          _.each(e.app, function (message) {
               if (typeof pages[message.page] === 'undefined') {
                    pages[message.page] = 1;
               } else {
                    pages[message.page]++;
               }
          });
          _.each(_.keys(pages), function (key) {
               console.log('.js_page_' + key);
               $('.js_page_' + key).addClass('notification').children('.js_count').text(pages[key]);
          });
     });

     socket.on('showAlerts/' + window.uid, function () {
          item.updateItems(data);
     });

     $('.jsDisabled ').hide();
     $('.jsEnabled ').show();
     if (true) {
          console.log('remove this to get to work');
          return;
     }
     socket.emit('getScans', {
          uid: window.uid,
          apiToken: window.apiToken
     });
     socket.on('setScans/' + window.uid + '/' + window.apiToken, function (e) {
          console.log('scans', e);
          _.each(e.list, function (scan) {
               item.updateItems(scan);
          });
     });

});

if (onSubmit) {

}
