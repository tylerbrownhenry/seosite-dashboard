
var socket = '';
var count = 0;





function onSubmit( form ){
  var data = $(form).serializeArray(); //  <-----------
    console.log('onSubmit');
    var arr = {};
    $.map(data, function(n, i){
        arr[n['name']] = n['value'];
    });
    count++;
    socket.emit('queue/'+ arr.request, {
        preClass: 'request_temp_id_'+count,
        token: arr.token,
        uid: arr.uid,
        url: arr.url,
        page: arr.page
    });
    return false; //don't submit
}

jQuery(function($) {
    /* Billing */
  var cardWrapper = $('#cardWrapper'),
  cardForm = $('#cardForm'),
  formError = $('#cardFormError'),
  cardFormBtn = cardForm.find('button');

  if(cardWrapper.length > 0){
    $("input[name=plan]:radio").change(function (e) {
      if(this.value == 'free'){
        cardWrapper.hide();
      } else {
        cardWrapper.show();
      }
    });
    if($("input:radio[name=plan]:checked").val() == 'free'){
      cardWrapper.hide();
    }
  }

  cardForm.submit(function(e) {
    e.preventDefault();

    var cardNum,
    cardMonth,
    cardYear,
    cardCVC;

    if(cardForm.find("input:radio[name=plan]:checked").val() != 'free'){
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
      }, function(status, response) {
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

    // socket = io.connect('http://localhost:3000');
    socket = io.connect(CURRENT_HOST);

    socket.on('back', function(){ 
        console.log('test!!!!');
    });
    socket.on('disconnect', function(){
        $('.disconnected.alert').slideDown();
    });

    socket.on('connect', function(){
        $('.disconnected.alert').slideUp();
    });

    socket.on('broadcastAll/',function(e){
        console.log('e',e);
    });
    socket.on('alert/' + uid,function(e){
        console.log('e',e);

        if(e.eventType === 'requestUpdate'){
            if($('#'+e.page).length === 0){
                $('#info').slideDown().text(e.message);
            } else {
                console.log('here1');
                var requestItem = $('#request_'+e.item);
                if(requestItem.length === 0){
                    return $('#request-container>.list').prepend('<li class="'+e.postClass+'" id="request_'+e.item+'">'+e.message+'</li>')
                } else {
                    console.log('here3');
                    return requestItem.attr('id',e.item).removeClass(e.preClass).addClass(e.postClass).text(e.message);
                }
            }
        } else if(e.eventType === 'requestError') {
            if(e.item){
                var requestItem = $('#request_'+e.item);
                if(requestItem.length === 0){
                    return $('#request-container>.list').prepend('<li class="'+e.postClass+'" id="request_'+e.item+'">'+e.message+'</li>')
                } else {
                    console.log('here3');
                    return requestItem.attr('id',e.item).removeClass(e.preClass).addClass(e.postClass).text(e.message);
                }
            }
            var arr = JSON.parse(e.message);
            for (var i = arr.length - 1; i >= 0; i--) {
                var error = $(arr[i].parent + ' .error');
                error.slideDown()
                error.children('.message-bold').text(arr[i].title);
                error.children('.message-text').text(arr[i].message);
            }
        } 
    });
    $('.jsDisabled ').hide();
    $('.jsEnabled ').show();
    
});






// $("#p").click(function() {


// function createIssue(req, res) {
  // var Http = require('machinepack-http');
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  // var http = require('http');
  // http.sendHttpRequest({
  //   url: '/rest/api/2/issue/',
  //   baseUrl: 'https://milmerry.atlassian.net',
  //   method: 'post',
  //   params: {
  //     "fields": {
  //       "project": {
  //         "key": "TASC"
  //       },
  //       "summary": "REST ye merry gentlemen.",
  //       "description": "Creating of an issue using project keys and issue type names using the REST API",
  //       "issuetype": {
  //         "name": "Bug"
  //       }
  //     }
  //   },
  //   headers: {
  //     "Authorization": "Basic dHlsZXJAbWlsbWVycnkuY29tOjFsdnpCOGNVakhHVmppcEh4VWdD"
  //   },
  // }).exec({
  //   serverError: function(result) {
  //     res.send("server error" + JSON.stringify(result))
  //   },
  //   success: function(result) {
  //     res.send("issue has been created succefly");
  //   },
  // });
// }
// createIssue();
// });



