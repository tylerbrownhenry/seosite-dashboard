"use strict";
var __cov_7phNC7w4xRrY76zs_0iH_A = (Function('return this'))();
if (!__cov_7phNC7w4xRrY76zs_0iH_A.__coverage__) { __cov_7phNC7w4xRrY76zs_0iH_A.__coverage__ = {}; }
__cov_7phNC7w4xRrY76zs_0iH_A = __cov_7phNC7w4xRrY76zs_0iH_A.__coverage__;
if (!(__cov_7phNC7w4xRrY76zs_0iH_A['app/controllers/pages/main-controller.js'])) {
   __cov_7phNC7w4xRrY76zs_0iH_A['app/controllers/pages/main-controller.js'] = {"path":"app/controllers/pages/main-controller.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0},"b":{"1":[0,0],"2":[0,0]},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":3,"loc":{"start":{"line":3,"column":18},"end":{"line":3,"column":38}}}},"statementMap":{"1":{"start":{"line":2,"column":0},"end":{"line":2,"column":67}},"2":{"start":{"line":3,"column":0},"end":{"line":20,"column":2}},"3":{"start":{"line":4,"column":5},"end":{"line":7,"column":42}},"4":{"start":{"line":9,"column":5},"end":{"line":11,"column":6}},"5":{"start":{"line":10,"column":10},"end":{"line":10,"column":42}},"6":{"start":{"line":12,"column":5},"end":{"line":14,"column":6}},"7":{"start":{"line":13,"column":10},"end":{"line":13,"column":32}},"8":{"start":{"line":15,"column":5},"end":{"line":19,"column":8}}},"branchMap":{"1":{"line":9,"type":"if","locations":[{"start":{"line":9,"column":5},"end":{"line":9,"column":5}},{"start":{"line":9,"column":5},"end":{"line":9,"column":5}}]},"2":{"line":12,"type":"if","locations":[{"start":{"line":12,"column":5},"end":{"line":12,"column":5}},{"start":{"line":12,"column":5},"end":{"line":12,"column":5}}]}}};
}
__cov_7phNC7w4xRrY76zs_0iH_A = __cov_7phNC7w4xRrY76zs_0iH_A['app/controllers/pages/main-controller.js'];
__cov_7phNC7w4xRrY76zs_0iH_A.s['1']++;var plans=require('../../config/secrets').stripeOptions.planData;__cov_7phNC7w4xRrY76zs_0iH_A.s['2']++;exports.getHome=function(req,res){__cov_7phNC7w4xRrY76zs_0iH_A.f['1']++;__cov_7phNC7w4xRrY76zs_0iH_A.s['3']++;var form={},error=null,formFlash=req.flash('form'),errorFlash=req.flash('error');__cov_7phNC7w4xRrY76zs_0iH_A.s['4']++;if(formFlash.length){__cov_7phNC7w4xRrY76zs_0iH_A.b['1'][0]++;__cov_7phNC7w4xRrY76zs_0iH_A.s['5']++;form.email=formFlash[0].email;}else{__cov_7phNC7w4xRrY76zs_0iH_A.b['1'][1]++;}__cov_7phNC7w4xRrY76zs_0iH_A.s['6']++;if(errorFlash.length){__cov_7phNC7w4xRrY76zs_0iH_A.b['2'][0]++;__cov_7phNC7w4xRrY76zs_0iH_A.s['7']++;error=errorFlash[0];}else{__cov_7phNC7w4xRrY76zs_0iH_A.b['2'][1]++;}__cov_7phNC7w4xRrY76zs_0iH_A.s['8']++;res.render(req.render,{form:form,error:error,plans:plans});};
