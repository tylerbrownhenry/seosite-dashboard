"use strict";
var __cov_Wx5u1$Re2dKBQduchHHXcg = (Function('return this'))();
if (!__cov_Wx5u1$Re2dKBQduchHHXcg.__coverage__) { __cov_Wx5u1$Re2dKBQduchHHXcg.__coverage__ = {}; }
__cov_Wx5u1$Re2dKBQduchHHXcg = __cov_Wx5u1$Re2dKBQduchHHXcg.__coverage__;
if (!(__cov_Wx5u1$Re2dKBQduchHHXcg['app/controllers/summary-controller.js'])) {
   __cov_Wx5u1$Re2dKBQduchHHXcg['app/controllers/summary-controller.js'] = {"path":"app/controllers/summary-controller.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0]},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"(anonymous_1)","line":6,"loc":{"start":{"line":6,"column":21},"end":{"line":6,"column":41}}},"2":{"name":"(anonymous_2)","line":22,"loc":{"start":{"line":22,"column":8},"end":{"line":22,"column":29}}}},"statementMap":{"1":{"start":{"line":3,"column":0},"end":{"line":4,"column":65}},"2":{"start":{"line":6,"column":0},"end":{"line":68,"column":2}},"3":{"start":{"line":7,"column":5},"end":{"line":10,"column":42}},"4":{"start":{"line":12,"column":5},"end":{"line":14,"column":6}},"5":{"start":{"line":13,"column":10},"end":{"line":13,"column":42}},"6":{"start":{"line":15,"column":5},"end":{"line":17,"column":6}},"7":{"start":{"line":16,"column":10},"end":{"line":16,"column":32}},"8":{"start":{"line":18,"column":5},"end":{"line":18,"column":28}},"9":{"start":{"line":19,"column":5},"end":{"line":19,"column":25}},"10":{"start":{"line":20,"column":5},"end":{"line":66,"column":8}},"11":{"start":{"line":23,"column":10},"end":{"line":23,"column":30}},"12":{"start":{"line":24,"column":10},"end":{"line":27,"column":12}},"13":{"start":{"line":28,"column":10},"end":{"line":33,"column":11}},"14":{"start":{"line":29,"column":15},"end":{"line":29,"column":51}},"15":{"start":{"line":30,"column":15},"end":{"line":30,"column":36}},"16":{"start":{"line":32,"column":15},"end":{"line":32,"column":38}},"17":{"start":{"line":44,"column":10},"end":{"line":44,"column":25}},"18":{"start":{"line":54,"column":10},"end":{"line":61,"column":13}}},"branchMap":{"1":{"line":12,"type":"if","locations":[{"start":{"line":12,"column":5},"end":{"line":12,"column":5}},{"start":{"line":12,"column":5},"end":{"line":12,"column":5}}]},"2":{"line":15,"type":"if","locations":[{"start":{"line":15,"column":5},"end":{"line":15,"column":5}},{"start":{"line":15,"column":5},"end":{"line":15,"column":5}}]},"3":{"line":28,"type":"if","locations":[{"start":{"line":28,"column":10},"end":{"line":28,"column":10}},{"start":{"line":28,"column":10},"end":{"line":28,"column":10}}]}}};
}
__cov_Wx5u1$Re2dKBQduchHHXcg = __cov_Wx5u1$Re2dKBQduchHHXcg['app/controllers/summary-controller.js'];
__cov_Wx5u1$Re2dKBQduchHHXcg.s['1']++;var Request=require('../models/index').request,plans=require('../config/secrets').stripeOptions.planData;__cov_Wx5u1$Re2dKBQduchHHXcg.s['2']++;exports.getDefault=function(req,res){__cov_Wx5u1$Re2dKBQduchHHXcg.f['1']++;__cov_Wx5u1$Re2dKBQduchHHXcg.s['3']++;var form={},error=null,formFlash=req.flash('form'),errorFlash=req.flash('error');__cov_Wx5u1$Re2dKBQduchHHXcg.s['4']++;if(formFlash.length){__cov_Wx5u1$Re2dKBQduchHHXcg.b['1'][0]++;__cov_Wx5u1$Re2dKBQduchHHXcg.s['5']++;form.email=formFlash[0].email;}else{__cov_Wx5u1$Re2dKBQduchHHXcg.b['1'][1]++;}__cov_Wx5u1$Re2dKBQduchHHXcg.s['6']++;if(errorFlash.length){__cov_Wx5u1$Re2dKBQduchHHXcg.b['2'][0]++;__cov_Wx5u1$Re2dKBQduchHHXcg.s['7']++;error=errorFlash[0];}else{__cov_Wx5u1$Re2dKBQduchHHXcg.b['2'][1]++;}__cov_Wx5u1$Re2dKBQduchHHXcg.s['8']++;var uid=req.user.uid;__cov_Wx5u1$Re2dKBQduchHHXcg.s['9']++;console.log('here');__cov_Wx5u1$Re2dKBQduchHHXcg.s['10']++;Request.batchGet({uid:uid},function(err,data){__cov_Wx5u1$Re2dKBQduchHHXcg.f['2']++;__cov_Wx5u1$Re2dKBQduchHHXcg.s['11']++;console.log('here');__cov_Wx5u1$Re2dKBQduchHHXcg.s['12']++;var requests={message:'',list:[]};__cov_Wx5u1$Re2dKBQduchHHXcg.s['13']++;if(err===null){__cov_Wx5u1$Re2dKBQduchHHXcg.b['3'][0]++;__cov_Wx5u1$Re2dKBQduchHHXcg.s['14']++;requests.message='Request found!';__cov_Wx5u1$Re2dKBQduchHHXcg.s['15']++;requests.list=data;}else{__cov_Wx5u1$Re2dKBQduchHHXcg.b['3'][1]++;__cov_Wx5u1$Re2dKBQduchHHXcg.s['16']++;requests.message=err;}__cov_Wx5u1$Re2dKBQduchHHXcg.s['17']++;var links=[];__cov_Wx5u1$Re2dKBQduchHHXcg.s['18']++;res.render(req.render,{user:req.user,form:form,error:error,plans:plans,requests:requests,links:links});});};
