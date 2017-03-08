var overlay = $('.modal-overlay');
$('.modal-close,.modal-overlay').on('click', function () {
     $('.open-modal').removeClass('modal-show');
})
$('.modal-trigger').on('click', function (el, i) {
     var modal = el.currentTarget.attributes['data-modal'].value;
     console.log('modal', el, modal);
     $('#' + modal).addClass('modal-show');

});

$('.test').on('click', function () {
     console.log(requestList.addElement());
});

function drawWaterFalls() {
     console.log('drawWaterfalls baby!');
     var waterFalls = $('.waterfall-container');
     if (waterFalls.length === 0) {
          return;
     }
     for (var i = 0; i < waterFalls.length; i++) {
          drawWaterfall(waterFalls[i]);
     }
}

function drawWaterfall(element) {
     var data = $(element).attr('data');
     if (!data || $(element).hasClass('js_drawn')) {
          return;
     }
     $(element).addClass('js_drawn');

     function timelineLabelColor(resources, id) {
          var width = 165;
          var height = 60;
          var end = 0;
          var start = moment(resources[0].start).unix();
          var colors = ['red', 'gray', 'blue', 'yellow', 'green', 'purple', 'violet']
          var timings = [];
          _.each(resources, function (resource) {
               var rStart = moment(resource.start).unix();
               if (start > rStart) {
                    start = rStart;
               }
               var tt = {
                    times: []
               };
               startOffset = rStart;
               var lastEndTime = (startOffset + resource.timings.ssl);
               _.each(_.keys(resource.timings), function (key, idx) {
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
          var svg = d3.select("#" + id)
               .append("svg")
               .attr("width", width).attr('height', height)
               .datum(timings).call(chart);
     }
     timelineLabelColor(JSON.parse(data), $(element).attr('id'));
}

jQuery(function ($) {
     drawWaterFalls();
     /*
     We can do this more effectively as a data object in d3
     */
});

function drawGrade(id) {

     var socket = '';
     var count = 0;

     var grades = $('.grade');
     var data = [];
     var results = [];
     if (grades.length === 0) {
          return;
     }
     for (var i = 0; i < grades.length; i++) {
          data.push($(grades[i]).data())
     }

     var container = d3.selectAll('.grade').data(data)
     var svg = container
          .append("svg")
          .attr("height", 109)
          .attr("width", 100)
          .append("g")
     console.log('container', container, container.attr('data'));
     svg.append("g")
          .attr("class", "slices");

     var width = 100,
          height = 100,
          radius = Math.min(width, height) / 2;

     var pie = d3.layout.pie()
          .sort(null)
          .value(function (d) {
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
          .attr('y', 13)
          .attr("class", "grade-letter loud-text")
          .text(function (e) {
               return e.letter
          });

     var key = function (d) {
          return d.data.label;
     };

     var color = d3.scale.ordinal()
          .domain(["Passed", "Failed", "Not yet run"])
          .range(["#4CAF50", "#F44336", "#E0E0E0"]);

     function randomData() {
          var labels = color.domain();
          return labels.map(function (label) {
               return {
                    label: label,
                    value: Math.random()
               }
          });
     }
     console.log('data', randomData());

     function change(data) {
          var data = [{
               label: 'Passed',
               value: 0.1
          }, {
               label: 'Failed',
               value: 0.1
          }, {
               label: 'Not yet run',
               value: 0.1
          }];
          /* ------- PIE SLICES -------*/
          var slice = svg.select(".slices").selectAll("path.slice")
               .data(function (e) {
                    console.log('e', e);
                    data[0].value = Math.random();
                    data[1].value = Math.random();
                    data[2].value = Math.random();
                    return pie(data);
               }, key);

          slice.enter()
               .insert("path")
               .style("fill", function (d) {
                    return color(d.data.label);
               })
               .attr("class", "slice");

          slice
               .transition().duration(1000)
               .attrTween("d", function (d) {
                    this._current = this._current || d;
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function (t) {
                         return arc(interpolate(t));
                    };
               })

          slice.exit()
               .remove();
     };

     change(data);
}

jQuery(function ($) {
     drawGrade();

});

var count = 0;

var submittedWaiting = false;

function styleForm(form, tempId) {
     $(form).addClass('loading');
     $('.row.header').after('<div class="row js_temp_request_' + tempId + ' loading-temp"><div class="col-sm-4">Scan Initiated</div></div>')
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
     console.log('onSubmit');
     var arr = {};
     $.map(data, function (n, i) {
          arr[n['name']] = n['value'];
     });
     count++;
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
          $("input[name=plan]:radio").change(function (e) {
               if (this.value == 'free') {
                    cardWrapper.hide();
               } else {
                    cardWrapper.show();
               }
          });
          if ($("input:radio[name=plan]:checked").val() == 'free') {
               cardWrapper.hide();
          }
     }

     cardForm.submit(function (e) {
          e.preventDefault();

          var cardNum,
               cardMonth,
               cardYear,
               cardCVC;

          if (cardForm.find("input:radio[name=plan]:checked").val() != 'free') {
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

     // socket = io.connect('http://localhost:3000 ');
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
                    }
               }
               if (message.status === 'complete' || message.status === 'failed') {
                    /* do this as an array */
                    /* do this as an array */
                    /* do this as an array */
                    /* do this as an array */
                    /* do this as an array */
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
                    // message.temp_id
                    // $('.form-error').text('')
               } else {
                    item.updateItems(message);

               }
          });

          var pages = {};
          _.each(e.app, function (message) {
               if (typeof pages[message.page] === 'undefined') {
                    pages[message.page] = 1
               } else {
                    pages[message.page]++
               }
          });
          _.each(_.keys(pages), function (key) {
               console.log('.js_page_' + key);
               $('.js_page_' + key).addClass('notification').children('.js_count').text(pages[key]);
          })
     });

     socket.on('showAlerts/' + window.uid, function (e) {
          console.log('showAlerts', e);
          // $('.loading').removeClass('loading');

          // if(e.eventType === 'requestUpdate'){

          item.updateItems(data);

          // } else if(e.eventType === 'requestError') {
          //     if(e.item){
          //         var requestItem = $('#request_'+e.item);
          //         if(requestItem.length === 0){
          //             return $('#request-container>.list').prepend('<li class="'+e.postClass+'" id="request_'+e.item+'">'+e.message+'</li>')
          //         } else {
          //             console.log('here3');
          //             return requestItem.attr('id',e.item).removeClass(e.preClass).addClass(e.postClass).text(e.message);
          //         }
          //     }
          //     var arr = JSON.parse(e.message);
          //     for (var i = arr.length - 1; i >= 0; i--) {
          //         var error = $(arr[i].parent + ' .error');
          //         error.slideDown()
          //         error.children('.message-bold').text(arr[i].title);
          //         error.children('.message-text').text(arr[i].message);
          //     }
          // }

     });
     $('.jsDisabled ').hide();
     $('.jsEnabled ').show();

     socket.emit('getScans', {
          uid: window.uid,
          apiToken: window.apiToken
     });
     socket.on('setScans/' + window.uid + '/' + window.apiToken, function (e) {
          console.log('scans', e);
          _.each(e.list, function (scan) {
               item.updateItems(scan);
          })
     });

});

function _r(schema) {
     console.log('implement this!');
     /* Find... */
}

function incomingAlert(data) {
     var resp = {
          uid: data.uid,
          page: data.page,
          message: data.message,
          /* "Error!" || "Scan Started" */
          type: data.type,
          /* request || link || resouce ... */

          status: data.status || 'info',
          /* error || warning || info || success' */
          progress: data.progress || 'init',
          /* init || started || almost || completed || failed */
          loadingSelector: null,
          alertSelector: null,
          saved: false
     }
     if (data.i_id) {
          /* Item is saved in the database, likely has more information */
          resp.saved = true
          resp.i_id = data.i_id;
          resp.alertSelector = '.js_' + data.type + '_' + data.i_id;

          if (data.temp_id)
               resp.temp_id = data.temp_id;
          resp.loadingSelector = '.js_temp_' + data.type + '_' + data.temp_id;
     }
     return resp;
}

function loadingMessage(elem, _class, message) {
     /* Maybe do a timeout so that can see the messages progress? */
     // var alertClasses = 'error warning info success';
     // elem.children('.js_message').removeClass(alertClasses).addClass(_class).text(message);
}

function createContentElem(alert) {
     console.log('templates', alert);
     item.updateItems(alert);
     // var elem = ejs.render(templates.contentLoop,
     //     { locals:
     //         {
     //             scan:alert
     //         }
     //      });
     // $('#'+ alert.type +'_loop').prepend(elem);
     /* Implement... */
     // compile = ejs.template('loop-container');
     // compile.append...
     // loadingElem = new Element...
}

function addContent(data, contentElem) {
     console.log('addContent');

     item.updateItems(data);
     /* Implement... */
     // var elem = ejs.render(templates.requestRow,{locals:{scan:data}});
     // contentElem.children('.content').html(elem);
     // drawGrade();

     // var waterFall = contentElem.children('.waterfall-container');
     // if(waterFalls.length === 0){
     //     return;
     // }
     // drawWaterfall(waterFalls[i]);

     // drawWaterfalls(contentElem.children('.waterfall_container'))
     // var template = ejs.template('request-loop');
     // elem.children('.content').html(template);
     // reRenderCharts();
}

function processAlert(alert) {
     // console.log('%c processAlert '+JSON.stringify(alert),'background: #00f;color: #ffffff');
     // var contentElem = $(alert.loadingSelector);
     // var alertElem = $(alert.alertSelector);
     // console.log('contentElem',contentElem,alert.loadingSelector,alertElem);

     // if(contentElem.length !== 0){
     //     console.log('%c Changing loading message for alert','background: #0f0;color: #ffffff');
     //     loadingMessage(contentElem,alert.status,alert.message);
     // } else if(alertElem.length === 0){
     //     console.log('%c Creating Content Element For Alert','background: #f00;color: #ffffff');
     //     contentElem = createContentElem(alert);
     // }
     // if(alert.saved === true){
     //     console.log('%c -> Item alerting about has information','background: #f00;color: #ffffff');
     //     if(typeof alertElem === 'undefined'){
     //         console.log('%c -> Item alerting about has information','background: #f00;color: #ffffff');
     //         alertElem = contentElem.addClass('js_'+ alert.type + '_' + alert.i_id);
     //     }
     //     loadRequestData(alert,alertElem,contentElem);
     // }
}

function loadRequestData(alert) {

     console.log('loadRequestData alert', alert);
     loadingMessage(elem, 'info', 'loading data...');
     console.log('here');
     if (alert.status === 'complete' || alert.status === 'failed') {

          socket.emit('get:scan', alert);
          // var ref = refType[alert.type];
          //     /* Implement... */
          // _r(schemas[alert.type]).find({
          //     uid: alert.uid,
          //     [ref]:alert.i_id
          // },function(e,data){
          //     console.log('e',e,'data',data);
          //     if(e){
          //         loadingMessage(elem,'error',e);
          //     } else {
          //         /* Implement... */
          //         if(alert.progress === 'complete'){
          // addContent(alert);
          //                 elem.removeClass('loading').addClass('loaded new');
          //             })
          //         }
          //     }
          // })
     } else {
          console.log('Cannot find data type:');
     }
}
