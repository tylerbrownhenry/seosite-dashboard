"use strict";
var __cov_Yuityha4wPTxnK3R5J8Vrg = (Function('return this'))();
if (!__cov_Yuityha4wPTxnK3R5J8Vrg.__coverage__) { __cov_Yuityha4wPTxnK3R5J8Vrg.__coverage__ = {}; }
__cov_Yuityha4wPTxnK3R5J8Vrg = __cov_Yuityha4wPTxnK3R5J8Vrg.__coverage__;
if (!(__cov_Yuityha4wPTxnK3R5J8Vrg['app/models/plugins/actions-stripe.js'])) {
   __cov_Yuityha4wPTxnK3R5J8Vrg['app/models/plugins/actions-stripe.js'] = {"path":"app/models/plugins/actions-stripe.js","s":{"1":0,"2":1,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":1,"24":0,"25":0,"26":0,"27":0,"28":0,"29":1,"30":0,"31":0,"32":0,"33":0,"34":0,"35":0,"36":0,"37":1,"38":0,"39":0,"40":0,"41":0,"42":0,"43":1,"44":0,"45":0,"46":0,"47":0,"48":0,"49":0,"50":0,"51":0,"52":0,"53":0,"54":0,"55":0,"56":0,"57":0,"58":1,"59":0,"60":0,"61":0,"62":0,"63":0,"64":0,"65":0,"66":0,"67":0,"68":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0],"7":[0,0],"8":[0,0],"9":[0,0],"10":[0,0],"11":[0,0],"12":[0,0],"13":[0,0],"14":[0,0],"15":[0,0],"16":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0},"fnMap":{"1":{"name":"setPlan","line":8,"loc":{"start":{"line":8,"column":0},"end":{"line":8,"column":47}}},"2":{"name":"(anonymous_2)","line":10,"loc":{"start":{"line":10,"column":31},"end":{"line":10,"column":60}}},"3":{"name":"(anonymous_3)","line":16,"loc":{"start":{"line":16,"column":20},"end":{"line":16,"column":35}}},"4":{"name":"(anonymous_4)","line":24,"loc":{"start":{"line":24,"column":30},"end":{"line":24,"column":42}}},"5":{"name":"(anonymous_5)","line":34,"loc":{"start":{"line":34,"column":61},"end":{"line":34,"column":76}}},"6":{"name":"createCustomer","line":57,"loc":{"start":{"line":57,"column":0},"end":{"line":57,"column":34}}},"7":{"name":"(anonymous_7)","line":60,"loc":{"start":{"line":60,"column":8},"end":{"line":60,"column":33}}},"8":{"name":"preSave","line":70,"loc":{"start":{"line":70,"column":0},"end":{"line":70,"column":38}}},"9":{"name":"(anonymous_9)","line":75,"loc":{"start":{"line":75,"column":31},"end":{"line":75,"column":46}}},"10":{"name":"updateStripeEmail","line":83,"loc":{"start":{"line":83,"column":0},"end":{"line":83,"column":50}}},"11":{"name":"(anonymous_11)","line":91,"loc":{"start":{"line":91,"column":8},"end":{"line":91,"column":23}}},"12":{"name":"setCard","line":96,"loc":{"start":{"line":96,"column":0},"end":{"line":96,"column":54}}},"13":{"name":"(anonymous_13)","line":98,"loc":{"start":{"line":98,"column":23},"end":{"line":98,"column":48}}},"14":{"name":"(anonymous_14)","line":116,"loc":{"start":{"line":116,"column":15},"end":{"line":116,"column":30}}},"15":{"name":"cancelStripe","line":135,"loc":{"start":{"line":135,"column":0},"end":{"line":135,"column":38}}},"16":{"name":"(anonymous_16)","line":139,"loc":{"start":{"line":139,"column":17},"end":{"line":139,"column":29}}},"17":{"name":"(anonymous_17)","line":141,"loc":{"start":{"line":141,"column":13},"end":{"line":141,"column":28}}}},"statementMap":{"1":{"start":{"line":3,"column":0},"end":{"line":6,"column":12}},"2":{"start":{"line":8,"column":0},"end":{"line":55,"column":1}},"3":{"start":{"line":9,"column":5},"end":{"line":9,"column":41}},"4":{"start":{"line":10,"column":5},"end":{"line":22,"column":7}},"5":{"start":{"line":11,"column":10},"end":{"line":13,"column":11}},"6":{"start":{"line":12,"column":15},"end":{"line":12,"column":30}},"7":{"start":{"line":14,"column":10},"end":{"line":14,"column":27}},"8":{"start":{"line":15,"column":10},"end":{"line":15,"column":48}},"9":{"start":{"line":16,"column":10},"end":{"line":21,"column":13}},"10":{"start":{"line":17,"column":15},"end":{"line":19,"column":16}},"11":{"start":{"line":18,"column":20},"end":{"line":18,"column":35}},"12":{"start":{"line":20,"column":15},"end":{"line":20,"column":31}},"13":{"start":{"line":24,"column":5},"end":{"line":31,"column":7}},"14":{"start":{"line":25,"column":10},"end":{"line":30,"column":12}},"15":{"start":{"line":33,"column":5},"end":{"line":54,"column":6}},"16":{"start":{"line":34,"column":10},"end":{"line":39,"column":13}},"17":{"start":{"line":35,"column":15},"end":{"line":37,"column":16}},"18":{"start":{"line":36,"column":20},"end":{"line":36,"column":35}},"19":{"start":{"line":38,"column":15},"end":{"line":38,"column":36}},"20":{"start":{"line":42,"column":10},"end":{"line":53,"column":11}},"21":{"start":{"line":44,"column":15},"end":{"line":50,"column":17}},"22":{"start":{"line":52,"column":15},"end":{"line":52,"column":36}},"23":{"start":{"line":57,"column":0},"end":{"line":68,"column":1}},"24":{"start":{"line":58,"column":5},"end":{"line":67,"column":8}},"25":{"start":{"line":61,"column":10},"end":{"line":63,"column":11}},"26":{"start":{"line":62,"column":15},"end":{"line":62,"column":30}},"27":{"start":{"line":65,"column":10},"end":{"line":65,"column":40}},"28":{"start":{"line":66,"column":10},"end":{"line":66,"column":32}},"29":{"start":{"line":70,"column":0},"end":{"line":81,"column":1}},"30":{"start":{"line":71,"column":5},"end":{"line":71,"column":41}},"31":{"start":{"line":72,"column":5},"end":{"line":74,"column":6}},"32":{"start":{"line":73,"column":10},"end":{"line":73,"column":34}},"33":{"start":{"line":75,"column":5},"end":{"line":80,"column":8}},"34":{"start":{"line":76,"column":10},"end":{"line":78,"column":11}},"35":{"start":{"line":77,"column":15},"end":{"line":77,"column":32}},"36":{"start":{"line":79,"column":10},"end":{"line":79,"column":21}},"37":{"start":{"line":83,"column":0},"end":{"line":94,"column":1}},"38":{"start":{"line":84,"column":5},"end":{"line":84,"column":41}},"39":{"start":{"line":85,"column":5},"end":{"line":88,"column":6}},"40":{"start":{"line":86,"column":10},"end":{"line":86,"column":22}},"41":{"start":{"line":89,"column":5},"end":{"line":93,"column":8}},"42":{"start":{"line":92,"column":10},"end":{"line":92,"column":18}},"43":{"start":{"line":96,"column":0},"end":{"line":133,"column":1}},"44":{"start":{"line":97,"column":5},"end":{"line":97,"column":41}},"45":{"start":{"line":98,"column":5},"end":{"line":122,"column":7}},"46":{"start":{"line":99,"column":10},"end":{"line":101,"column":11}},"47":{"start":{"line":100,"column":15},"end":{"line":100,"column":30}},"48":{"start":{"line":103,"column":10},"end":{"line":105,"column":11}},"49":{"start":{"line":104,"column":15},"end":{"line":104,"column":40}},"50":{"start":{"line":107,"column":10},"end":{"line":107,"column":88}},"51":{"start":{"line":109,"column":10},"end":{"line":121,"column":18}},"52":{"start":{"line":117,"column":20},"end":{"line":119,"column":21}},"53":{"start":{"line":118,"column":25},"end":{"line":118,"column":40}},"54":{"start":{"line":120,"column":20},"end":{"line":120,"column":36}},"55":{"start":{"line":123,"column":5},"end":{"line":132,"column":6}},"56":{"start":{"line":124,"column":10},"end":{"line":126,"column":26}},"57":{"start":{"line":128,"column":10},"end":{"line":131,"column":26}},"58":{"start":{"line":135,"column":0},"end":{"line":147,"column":1}},"59":{"start":{"line":136,"column":5},"end":{"line":146,"column":6}},"60":{"start":{"line":137,"column":10},"end":{"line":143,"column":13}},"61":{"start":{"line":140,"column":15},"end":{"line":140,"column":20}},"62":{"start":{"line":142,"column":15},"end":{"line":142,"column":30}},"63":{"start":{"line":145,"column":10},"end":{"line":145,"column":15}},"64":{"start":{"line":149,"column":0},"end":{"line":149,"column":33}},"65":{"start":{"line":150,"column":0},"end":{"line":150,"column":43}},"66":{"start":{"line":151,"column":0},"end":{"line":151,"column":33}},"67":{"start":{"line":152,"column":0},"end":{"line":152,"column":53}},"68":{"start":{"line":153,"column":0},"end":{"line":153,"column":33}}},"branchMap":{"1":{"line":11,"type":"if","locations":[{"start":{"line":11,"column":10},"end":{"line":11,"column":10}},{"start":{"line":11,"column":10},"end":{"line":11,"column":10}}]},"2":{"line":17,"type":"if","locations":[{"start":{"line":17,"column":15},"end":{"line":17,"column":15}},{"start":{"line":17,"column":15},"end":{"line":17,"column":15}}]},"3":{"line":33,"type":"if","locations":[{"start":{"line":33,"column":5},"end":{"line":33,"column":5}},{"start":{"line":33,"column":5},"end":{"line":33,"column":5}}]},"4":{"line":35,"type":"if","locations":[{"start":{"line":35,"column":15},"end":{"line":35,"column":15}},{"start":{"line":35,"column":15},"end":{"line":35,"column":15}}]},"5":{"line":42,"type":"if","locations":[{"start":{"line":42,"column":10},"end":{"line":42,"column":10}},{"start":{"line":42,"column":10},"end":{"line":42,"column":10}}]},"6":{"line":61,"type":"if","locations":[{"start":{"line":61,"column":10},"end":{"line":61,"column":10}},{"start":{"line":61,"column":10},"end":{"line":61,"column":10}}]},"7":{"line":72,"type":"if","locations":[{"start":{"line":72,"column":5},"end":{"line":72,"column":5}},{"start":{"line":72,"column":5},"end":{"line":72,"column":5}}]},"8":{"line":72,"type":"binary-expr","locations":[{"start":{"line":72,"column":9},"end":{"line":72,"column":20}},{"start":{"line":72,"column":24},"end":{"line":72,"column":39}}]},"9":{"line":76,"type":"if","locations":[{"start":{"line":76,"column":10},"end":{"line":76,"column":10}},{"start":{"line":76,"column":10},"end":{"line":76,"column":10}}]},"10":{"line":85,"type":"if","locations":[{"start":{"line":85,"column":5},"end":{"line":85,"column":5}},{"start":{"line":85,"column":5},"end":{"line":85,"column":5}}]},"11":{"line":99,"type":"if","locations":[{"start":{"line":99,"column":10},"end":{"line":99,"column":10}},{"start":{"line":99,"column":10},"end":{"line":99,"column":10}}]},"12":{"line":103,"type":"if","locations":[{"start":{"line":103,"column":10},"end":{"line":103,"column":10}},{"start":{"line":103,"column":10},"end":{"line":103,"column":10}}]},"13":{"line":107,"type":"cond-expr","locations":[{"start":{"line":107,"column":38},"end":{"line":107,"column":60}},{"start":{"line":107,"column":63},"end":{"line":107,"column":87}}]},"14":{"line":117,"type":"if","locations":[{"start":{"line":117,"column":20},"end":{"line":117,"column":20}},{"start":{"line":117,"column":20},"end":{"line":117,"column":20}}]},"15":{"line":123,"type":"if","locations":[{"start":{"line":123,"column":5},"end":{"line":123,"column":5}},{"start":{"line":123,"column":5},"end":{"line":123,"column":5}}]},"16":{"line":136,"type":"if","locations":[{"start":{"line":136,"column":5},"end":{"line":136,"column":5}},{"start":{"line":136,"column":5},"end":{"line":136,"column":5}}]}}};
}
__cov_Yuityha4wPTxnK3R5J8Vrg = __cov_Yuityha4wPTxnK3R5J8Vrg['app/models/plugins/actions-stripe.js'];
__cov_Yuityha4wPTxnK3R5J8Vrg.s['1']++;var secrets=require('../../config/secrets').stripeOptions,utils=require('../../utils'),Stripe=require('stripe'),stripe;function setPlan(user,plan,stripe_token,cb){__cov_Yuityha4wPTxnK3R5J8Vrg.f['1']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['3']++;stripe=new Stripe(options.apiKey);__cov_Yuityha4wPTxnK3R5J8Vrg.s['4']++;var subscriptionHandler=function(err,subscription){__cov_Yuityha4wPTxnK3R5J8Vrg.f['2']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['5']++;if(err){__cov_Yuityha4wPTxnK3R5J8Vrg.b['1'][0]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['6']++;return cb(err);}else{__cov_Yuityha4wPTxnK3R5J8Vrg.b['1'][1]++;}__cov_Yuityha4wPTxnK3R5J8Vrg.s['7']++;user.plan=plan;__cov_Yuityha4wPTxnK3R5J8Vrg.s['8']++;user.subscriptionId=subscription.id;__cov_Yuityha4wPTxnK3R5J8Vrg.s['9']++;user.save(function(err){__cov_Yuityha4wPTxnK3R5J8Vrg.f['3']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['10']++;if(err){__cov_Yuityha4wPTxnK3R5J8Vrg.b['2'][0]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['11']++;return cb(err);}else{__cov_Yuityha4wPTxnK3R5J8Vrg.b['2'][1]++;}__cov_Yuityha4wPTxnK3R5J8Vrg.s['12']++;return cb(null);});};__cov_Yuityha4wPTxnK3R5J8Vrg.s['13']++;var createSubscription=function(){__cov_Yuityha4wPTxnK3R5J8Vrg.f['4']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['14']++;stripe.customers.createSubscription(user.customerId,{plan:plan},subscriptionHandler);};__cov_Yuityha4wPTxnK3R5J8Vrg.s['15']++;if(stripe_token){__cov_Yuityha4wPTxnK3R5J8Vrg.b['3'][0]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['16']++;setCard(user.customerId,user.email,stripe_token,function(err){__cov_Yuityha4wPTxnK3R5J8Vrg.f['5']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['17']++;if(err){__cov_Yuityha4wPTxnK3R5J8Vrg.b['4'][0]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['18']++;return cb(err);}else{__cov_Yuityha4wPTxnK3R5J8Vrg.b['4'][1]++;}__cov_Yuityha4wPTxnK3R5J8Vrg.s['19']++;createSubscription();});}else{__cov_Yuityha4wPTxnK3R5J8Vrg.b['3'][1]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['20']++;if(user.subscriptionId){__cov_Yuityha4wPTxnK3R5J8Vrg.b['5'][0]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['21']++;stripe.customers.updateSubscription(user.customerId,user.subscriptionId,{plan:plan},subscriptionHandler);}else{__cov_Yuityha4wPTxnK3R5J8Vrg.b['5'][1]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['22']++;createSubscription();}}};function createCustomer(user,cb){__cov_Yuityha4wPTxnK3R5J8Vrg.f['6']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['24']++;stripe.customers.create({email:user.email},function(err,customer){__cov_Yuityha4wPTxnK3R5J8Vrg.f['7']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['25']++;if(err){__cov_Yuityha4wPTxnK3R5J8Vrg.b['6'][0]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['26']++;return cb(err);}else{__cov_Yuityha4wPTxnK3R5J8Vrg.b['6'][1]++;}__cov_Yuityha4wPTxnK3R5J8Vrg.s['27']++;user.customerId=customer.id;__cov_Yuityha4wPTxnK3R5J8Vrg.s['28']++;return cb(null,user);});};function preSave(options,user,next){__cov_Yuityha4wPTxnK3R5J8Vrg.f['8']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['30']++;stripe=new Stripe(options.apiKey);__cov_Yuityha4wPTxnK3R5J8Vrg.s['31']++;if((__cov_Yuityha4wPTxnK3R5J8Vrg.b['8'][0]++,!user.isNew)||(__cov_Yuityha4wPTxnK3R5J8Vrg.b['8'][1]++,user.customerId)){__cov_Yuityha4wPTxnK3R5J8Vrg.b['7'][0]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['32']++;return next(null,user);}else{__cov_Yuityha4wPTxnK3R5J8Vrg.b['7'][1]++;}__cov_Yuityha4wPTxnK3R5J8Vrg.s['33']++;user.createCustomer(user,function(err){__cov_Yuityha4wPTxnK3R5J8Vrg.f['9']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['34']++;if(err){__cov_Yuityha4wPTxnK3R5J8Vrg.b['9'][0]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['35']++;return next(err);}else{__cov_Yuityha4wPTxnK3R5J8Vrg.b['9'][1]++;}__cov_Yuityha4wPTxnK3R5J8Vrg.s['36']++;next(null);});};function updateStripeEmail(customerId,email,cb){__cov_Yuityha4wPTxnK3R5J8Vrg.f['10']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['38']++;stripe=new Stripe(secrets.apiKey);__cov_Yuityha4wPTxnK3R5J8Vrg.s['39']++;if(!customerId){__cov_Yuityha4wPTxnK3R5J8Vrg.b['10'][0]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['40']++;return cb();}else{__cov_Yuityha4wPTxnK3R5J8Vrg.b['10'][1]++;}__cov_Yuityha4wPTxnK3R5J8Vrg.s['41']++;stripe.customers.update(customerId,{email:email},function(err){__cov_Yuityha4wPTxnK3R5J8Vrg.f['11']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['42']++;cb(err);});};function setCard(customerId,email,stripe_token,cb){__cov_Yuityha4wPTxnK3R5J8Vrg.f['12']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['44']++;stripe=new Stripe(secrets.apiKey);__cov_Yuityha4wPTxnK3R5J8Vrg.s['45']++;var cardHandler=function(err,customer){__cov_Yuityha4wPTxnK3R5J8Vrg.f['13']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['46']++;if(err){__cov_Yuityha4wPTxnK3R5J8Vrg.b['11'][0]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['47']++;return cb(err);}else{__cov_Yuityha4wPTxnK3R5J8Vrg.b['11'][1]++;}__cov_Yuityha4wPTxnK3R5J8Vrg.s['48']++;if(!customerId){__cov_Yuityha4wPTxnK3R5J8Vrg.b['12'][0]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['49']++;customerId=customer.id;}else{__cov_Yuityha4wPTxnK3R5J8Vrg.b['12'][1]++;}__cov_Yuityha4wPTxnK3R5J8Vrg.s['50']++;var card=customer.cards?(__cov_Yuityha4wPTxnK3R5J8Vrg.b['13'][0]++,customer.cards.data[0]):(__cov_Yuityha4wPTxnK3R5J8Vrg.b['13'][1]++,customer.sources.data[0]);__cov_Yuityha4wPTxnK3R5J8Vrg.s['51']++;utils.updateUser({customerId:customerId},{$PUT:{last4:card.last4}},function(err){__cov_Yuityha4wPTxnK3R5J8Vrg.f['14']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['52']++;if(err){__cov_Yuityha4wPTxnK3R5J8Vrg.b['14'][0]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['53']++;return cb(err);}else{__cov_Yuityha4wPTxnK3R5J8Vrg.b['14'][1]++;}__cov_Yuityha4wPTxnK3R5J8Vrg.s['54']++;return cb(null);});};__cov_Yuityha4wPTxnK3R5J8Vrg.s['55']++;if(customerId){__cov_Yuityha4wPTxnK3R5J8Vrg.b['15'][0]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['56']++;stripe.customers.update(customerId,{card:stripe_token},cardHandler);}else{__cov_Yuityha4wPTxnK3R5J8Vrg.b['15'][1]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['57']++;stripe.customers.create({email:email,card:stripe_token},cardHandler);}};function cancelStripe(customerId,cb){__cov_Yuityha4wPTxnK3R5J8Vrg.f['15']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['59']++;if(customerId){__cov_Yuityha4wPTxnK3R5J8Vrg.b['16'][0]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['60']++;stripe.customers.del(customerId).then(function(){__cov_Yuityha4wPTxnK3R5J8Vrg.f['16']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['61']++;cb();},function(err){__cov_Yuityha4wPTxnK3R5J8Vrg.f['17']++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['62']++;return cb(err);});}else{__cov_Yuityha4wPTxnK3R5J8Vrg.b['16'][1]++;__cov_Yuityha4wPTxnK3R5J8Vrg.s['63']++;cb();}};__cov_Yuityha4wPTxnK3R5J8Vrg.s['64']++;module.exports.preSave=preSave;__cov_Yuityha4wPTxnK3R5J8Vrg.s['65']++;module.exports.cancelStripe=cancelStripe;__cov_Yuityha4wPTxnK3R5J8Vrg.s['66']++;module.exports.setCard=setCard;__cov_Yuityha4wPTxnK3R5J8Vrg.s['67']++;module.exports.updateStripeEmail=updateStripeEmail;__cov_Yuityha4wPTxnK3R5J8Vrg.s['68']++;module.exports.setPlan=setPlan;