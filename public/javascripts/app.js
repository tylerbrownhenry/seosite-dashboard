var socket = '';
var count = 0;
function onSubmit( form ){
  var data = $(form).serializeArray(); //  <-----------
    var arr = {};

    $.map(data, function(n, i){
        arr[n['name']] = n['value'];
    });
    console.log('arr.request');
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

    socket = io.connect('http://localhost:3000');

    socket.on('back', function(){ 
        console.log('test!!!!');
    });
    socket.on('disconnect', function(){
        $('.parentAlert').slideDown();
    });

    socket.on('connect', function(){
        $('.parentAlert').slideUp();
        /* Move this somewhere else */
    });

    socket.on('alert/' + uid,function(e){
            console.log('e',e);

            if(e.eventType === 'requestUpdate'){
                if($('#'+e.page).length === 0){
                    $('#info').slideDown().text(e.message);
                } else {
                    var requestItem = $('#request_'+e.item);
                    if(requestItem.length === 0){
                        var pendingItem = $('#request-container .'+e.preClass);
                        if(pendingItem.length === 1){
                        return    pendingItem.attr('id',e.item).removeClass(e.preClass).addClass(e.postClass);
                        }
                        
                    } 
                    $('#request-container .list').prepend('<li class="'+e.postClass+'" id="'+e.item+'">'+e.message+'</li>')
                }
            } else if(e.eventType === 'requestError') {
                if(e.item){
                    var requestItem = $('#request_'+e.item);
                    if(requestItem.length === 0){
                        // var pendingItem = $('#request-container');
                        // if(pendingItem.length === 1){
                        //     return pendingItem.attr('id',e.item).removeClass(e.preClass).addClass(e.postClass);
                        // }
                    }
                }
                var arr = JSON.parse(e.message);
                for (var i = arr.length - 1; i >= 0; i--) {
                    var error = $(arr[i].parent + ' .error');
                    error.slideDown()
                    error.children('.message-bold').text(arr[i].title);
                    error.children('.message-text').text(arr[i].message);
                    // error.children('.message-hint').attr('title',arr[i].hint).tooltip();
                }
            } 
        });

    $('.jsDisabled ').hide();
    $('.jsEnabled ').show();
    
});