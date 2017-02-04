var overlay = $('.modal-overlay');
$('.modal-close,.modal-overlay').on('click',function(){
    $('.open-modal').removeClass('modal-show');
})
$('.modal-trigger').on('click', function( el, i ) {
    var modal = el.currentTarget.attributes['data-modal'].value;
    console.log('modal',el,modal);
  $('#'+modal).addClass('modal-show');

});



function drawWaterfall(element) {
    function timelineLabelColor(resources,id) {
        var width = 165;
        var height = 60;
        var end = 0;
        var start = moment(resources[0].start).unix();
        var colors = ['red', 'gray', 'blue', 'yellow', 'green', 'purple', 'violet']
        var timings = [];
        _.each(resources, function(resource) {
            var rStart = moment(resource.start).unix();
            if (start > rStart) {
                start = rStart;
            }
            var tt = {
                times: []
            };
            startOffset = rStart;
            var lastEndTime = (startOffset + resource.timings.ssl);
            _.each(_.keys(resource.timings), function(key, idx) {
                var endTime = (lastEndTime + resource.timings[key]);
                tt.times.push({
                    color: colors[idx],
                    starting_time: lastEndTime,
                    ending_time: endTime
                })
                lastEndTime = endTime

                if (endTime > end) {
                    end = endTime
                }
            });
            timings.push(tt);
        });
        var chart = d3.timeline()
            .stack()
            .showTimeAxis()
            .height(height)
            .itemHeight(height / timings.length)
            .itemMargin(0)
            .beginning(start)
            .ending(end)
            .margin({
                left: 0,
                right: 0,
                top: -height / timings.length,
                bottom: 0
            });
        var svg = d3.select("#"+id)
            .append("svg")
            .attr("width", width).attr('height', height)
            .datum(timings).call(chart);
    }
    return ;
    timelineLabelColor(JSON.parse($(element).attr('data')),$(element).attr('id'));
}

jQuery(function($) {
    /*
    We can do this more effectively as a data object in d3
    */
    var waterFalls = $('.waterfall-container');
    if(waterFalls.length === 0){
        return;
    }
    for (var i = 0; i < waterFalls.length; i++) {
        drawWaterfall(waterFalls[i]);
    }
});
















function drawGrade(id){

    var socket = '';
    var count = 0;

    var grades = $('.grade');
    var data = [];
    var results = [];
    if(grades.length === 0){
        return;
    }
    for (var i = 0; i < grades.length; i++) {
        data.push($(grades[i]).data())
    }

    var container = d3.selectAll('.grade').data(data)
    var svg = container
        .append("svg")
        .attr("height",109)
        .attr("width",100)
        .append("g")
        console.log('container',container,container.attr('data'));
    svg.append("g")
        .attr("class", "slices");

    var width = 100,
        height = 100,
        radius = Math.min(width, height) / 2;

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) {
            return d.value;
        });

    var arc = d3.svg.arc()
        .outerRadius(radius * 0.7)
        .innerRadius(radius * 0.55);

    var outerArc = d3.svg.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.append("text")
        .attr('y',13)
        .attr("class", "grade-letter loud-text")
        .text(function(e){
            return e.letter
        });

    var key = function(d){ return d.data.label; };

    var color = d3.scale.ordinal()
        .domain(["Passed", "Failed", "Not yet run"])
        .range(["#4CAF50", "#F44336", "#E0E0E0"]);

    function randomData (){
        var labels = color.domain();
        return labels.map(function(label){
            return { label: label, value: Math.random() }
        });
    }
    console.log('data',randomData());

    function change(data) {
        var data = [{
            label:'Passed',
            value: 0.1
        },{
            label:'Failed',
            value: 0.1
        },{
            label:'Not yet run',
            value: 0.1
        }];
        /* ------- PIE SLICES -------*/
        var slice = svg.select(".slices").selectAll("path.slice")
            .data(function(e){
                console.log('e',e);
                data[0].value = Math.random();
                data[1].value = Math.random();
                data[2].value = Math.random();
                return pie(data);
            }, key);

        slice.enter()
            .insert("path")
            .style("fill", function(d) { return color(d.data.label); })
            .attr("class", "slice");

        slice       
            .transition().duration(1000)
            .attrTween("d", function(d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    return arc(interpolate(t));
                };
            })

        slice.exit()
            .remove();
    };

    change(data);
}

jQuery(function($) {
drawGrade();
});

var count = 0;

var submittedWaiting = false;

function styleForm(form){
    $(form).addClass('loading');
    $('.row.header').after('<div class="row fancy"><div class="col-sm-4">Scan Initiated</div></div>')
    submittedWaiting = true;
}

function errorMessage(form,text){
    $(form).children('jsErrorMessage').text(text).show();
}

function onSubmit( form ){
    if(submittedWaiting){
        errorMessage(form,'You already have a run in progress, please wait for it to complete before starting another one.');
        return;
    }
    styleForm(form);

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
        saveCaptures: arr["save-captures"],
        saveScan: arr["save-scan"],
        checkLinks:arr["check-links"],
        checkResources:arr["check-resources"],
        checkSecurity:arr["check-security"],
        checkMeta:arr["check-meta"],
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
    socket.on('alert/' + window.uid,function(e){
        console.log('e',e);

        $('.loading').removeClass('loading');


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



