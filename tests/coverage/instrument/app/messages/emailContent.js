
var __cov_QKwe5ZSdeCMzHjzEY1U1$Q = (Function('return this'))();
if (!__cov_QKwe5ZSdeCMzHjzEY1U1$Q.__coverage__) { __cov_QKwe5ZSdeCMzHjzEY1U1$Q.__coverage__ = {}; }
__cov_QKwe5ZSdeCMzHjzEY1U1$Q = __cov_QKwe5ZSdeCMzHjzEY1U1$Q.__coverage__;
if (!(__cov_QKwe5ZSdeCMzHjzEY1U1$Q['app/messages/emailContent.js'])) {
   __cov_QKwe5ZSdeCMzHjzEY1U1$Q['app/messages/emailContent.js'] = {"path":"app/messages/emailContent.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0]},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":28},"end":{"line":1,"column":41}}},"2":{"name":"(anonymous_2)","line":4,"loc":{"start":{"line":4,"column":2},"end":{"line":4,"column":18}}},"3":{"name":"(anonymous_3)","line":65,"loc":{"start":{"line":65,"column":11},"end":{"line":65,"column":30}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":9,"column":2}},"2":{"start":{"line":2,"column":1},"end":{"line":8,"column":3}},"3":{"start":{"line":5,"column":3},"end":{"line":5,"column":16}},"4":{"start":{"line":6,"column":3},"end":{"line":6,"column":65}},"5":{"start":{"line":11,"column":0},"end":{"line":62,"column":1}},"6":{"start":{"line":64,"column":0},"end":{"line":80,"column":2}},"7":{"start":{"line":66,"column":6},"end":{"line":68,"column":8}},"8":{"start":{"line":69,"column":6},"end":{"line":77,"column":7}},"9":{"start":{"line":70,"column":8},"end":{"line":70,"column":24}},"10":{"start":{"line":71,"column":8},"end":{"line":71,"column":56}},"11":{"start":{"line":72,"column":8},"end":{"line":72,"column":54}},"12":{"start":{"line":73,"column":8},"end":{"line":73,"column":60}},"13":{"start":{"line":74,"column":4},"end":{"line":74,"column":49}},"14":{"start":{"line":76,"column":8},"end":{"line":76,"column":58}},"15":{"start":{"line":78,"column":6},"end":{"line":78,"column":17}}},"branchMap":{"1":{"line":6,"type":"cond-expr","locations":[{"start":{"line":6,"column":59},"end":{"line":6,"column":60}},{"start":{"line":6,"column":63},"end":{"line":6,"column":64}}]},"2":{"line":6,"type":"binary-expr","locations":[{"start":{"line":6,"column":10},"end":{"line":6,"column":31}},{"start":{"line":6,"column":35},"end":{"line":6,"column":56}}]},"3":{"line":69,"type":"if","locations":[{"start":{"line":69,"column":6},"end":{"line":69,"column":6}},{"start":{"line":69,"column":6},"end":{"line":69,"column":6}}]}}};
}
__cov_QKwe5ZSdeCMzHjzEY1U1$Q = __cov_QKwe5ZSdeCMzHjzEY1U1$Q['app/messages/emailContent.js'];
__cov_QKwe5ZSdeCMzHjzEY1U1$Q.s['1']++;String.prototype.supplant=function(o){__cov_QKwe5ZSdeCMzHjzEY1U1$Q.f['1']++;__cov_QKwe5ZSdeCMzHjzEY1U1$Q.s['2']++;return this.replace(/{([^{}]*)}/g,function(a,b){__cov_QKwe5ZSdeCMzHjzEY1U1$Q.f['2']++;__cov_QKwe5ZSdeCMzHjzEY1U1$Q.s['3']++;var r=o[b];__cov_QKwe5ZSdeCMzHjzEY1U1$Q.s['4']++;return(__cov_QKwe5ZSdeCMzHjzEY1U1$Q.b['2'][0]++,typeof r==='string')||(__cov_QKwe5ZSdeCMzHjzEY1U1$Q.b['2'][1]++,typeof r==='number')?(__cov_QKwe5ZSdeCMzHjzEY1U1$Q.b['1'][0]++,r):(__cov_QKwe5ZSdeCMzHjzEY1U1$Q.b['1'][1]++,a);});};__cov_QKwe5ZSdeCMzHjzEY1U1$Q.s['5']++;var messages={'invoice.created':{text:'You have an upcoming payment to SeoDr.com in the amount of ${amount_due}',title:'Preparing for payment',subject:'Upcoming payment'},'invoice.payment_succeeded':{text:'We have processed your payment successfully. Your new subscription period is from {periodStart} to {periodEnd}.',title:'Thank you for your payment',subject:'Thank you for your payment'},'invoice.payment_failed':{text:'Your payment has failed, try updating your credit card in your account settings. The next payment attempt will occur on {next_payment_attempt}',title:'Payment Failed',subject:'Payment Failed'},'invoice.payment_failed_last':{text:'The final attempt for payment has failed. Your account has been suspended.',title:'Final Payment Failed, Account suspended',subject:'Payment Failed, Account suspended'},'user-sign-up':{title:'Thanks for signing up!',subject:'Thanks for signing up!',text:'Hello,<br><br>Thank you for signing up!<br><br>'},'card-added':{title:'Thanks for adding a card to your account',subject:'Thanks for adding a card to your account',text:'You\'ve added a credit card to your account'},'subscription-added':{title:'You\'ve subscribed to a plan',subject:'You\'ve subscribed to our {subscriptionId} plan\'',text:'You\'ve subscribed to our {subscriptionId} plan'},'subscription-cancelled-at-period-end':{title:'You\'ve cancelled your plan',subject:'You\'ve cancelled your {planName} plan\', it will end on {periodEnd}.',text:'You\'ve cancelled your {planName} plan, it will end on {periodEnd}'},'subscription-added-now':{title:'You\'ve subscribed to a plan',subject:'You\'ve cancelled your {planName} plan\', it will end immediately.',text:'You\'ve cancelled your {planName} plan, it will end immediately'},'sub-account-user-sign-up':{title:'A user has been added to your account',subject:'A user with the email: {email} has been added to your account.',text:'A user with the email: {email} has been added to your account.'}};__cov_QKwe5ZSdeCMzHjzEY1U1$Q.s['6']++;module.exports={process:function(key,input){__cov_QKwe5ZSdeCMzHjzEY1U1$Q.f['3']++;__cov_QKwe5ZSdeCMzHjzEY1U1$Q.s['7']++;var res={send:false};__cov_QKwe5ZSdeCMzHjzEY1U1$Q.s['8']++;if(messages[key]){__cov_QKwe5ZSdeCMzHjzEY1U1$Q.b['3'][0]++;__cov_QKwe5ZSdeCMzHjzEY1U1$Q.s['9']++;res.send=true;__cov_QKwe5ZSdeCMzHjzEY1U1$Q.s['10']++;res.title=messages[key].title.supplant(input);__cov_QKwe5ZSdeCMzHjzEY1U1$Q.s['11']++;res.text=messages[key].text.supplant(input);__cov_QKwe5ZSdeCMzHjzEY1U1$Q.s['12']++;res.subject=messages[key].subject.supplant(input);__cov_QKwe5ZSdeCMzHjzEY1U1$Q.s['13']++;console.log('res.subject',input,res.subject);}else{__cov_QKwe5ZSdeCMzHjzEY1U1$Q.b['3'][1]++;__cov_QKwe5ZSdeCMzHjzEY1U1$Q.s['14']++;console.log('Email template does not exist:',key);}__cov_QKwe5ZSdeCMzHjzEY1U1$Q.s['15']++;return res;}};