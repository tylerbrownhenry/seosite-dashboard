
var __cov_W78X6Zx62e_EprC_9K3xlA = (Function('return this'))();
if (!__cov_W78X6Zx62e_EprC_9K3xlA.__coverage__) { __cov_W78X6Zx62e_EprC_9K3xlA.__coverage__ = {}; }
__cov_W78X6Zx62e_EprC_9K3xlA = __cov_W78X6Zx62e_EprC_9K3xlA.__coverage__;
if (!(__cov_W78X6Zx62e_EprC_9K3xlA['app/components/tasks/config/user.js'])) {
   __cov_W78X6Zx62e_EprC_9K3xlA['app/components/tasks/config/user.js'] = {"path":"app/components/tasks/config/user.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0},"b":{"1":[0,0],"2":[0,0]},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":5,"column":0},"end":{"line":22,"column":1}},"2":{"start":{"line":29,"column":0},"end":{"line":37,"column":1}},"3":{"start":{"line":31,"column":2},"end":{"line":31,"column":47}},"4":{"start":{"line":34,"column":2},"end":{"line":36,"column":3}},"5":{"start":{"line":35,"column":4},"end":{"line":35,"column":51}},"6":{"start":{"line":40,"column":0},"end":{"line":43,"column":1}},"7":{"start":{"line":50,"column":0},"end":{"line":50,"column":36}},"8":{"start":{"line":57,"column":0},"end":{"line":57,"column":28}}},"branchMap":{"1":{"line":34,"type":"if","locations":[{"start":{"line":34,"column":2},"end":{"line":34,"column":2}},{"start":{"line":34,"column":2},"end":{"line":34,"column":2}}]},"2":{"line":40,"type":"cond-expr","locations":[{"start":{"line":41,"column":4},"end":{"line":41,"column":30}},{"start":{"line":42,"column":4},"end":{"line":42,"column":43}}]}}};
}
__cov_W78X6Zx62e_EprC_9K3xlA = __cov_W78X6Zx62e_EprC_9K3xlA['app/components/tasks/config/user.js'];
__cov_W78X6Zx62e_EprC_9K3xlA.s['1']++;var extend=require('extend'),fs=require('fs'),path=require('path'),requireDotFile=require('require-dot-file'),defaults=require('./defaults'),config=require('./project/config'),gulpConfig={},userConfig;__cov_W78X6Zx62e_EprC_9K3xlA.s['2']++;try{__cov_W78X6Zx62e_EprC_9K3xlA.s['3']++;userConfig=requireDotFile('semantic.json');}catch(error){__cov_W78X6Zx62e_EprC_9K3xlA.s['4']++;if(error.code==='MODULE_NOT_FOUND'){__cov_W78X6Zx62e_EprC_9K3xlA.b['1'][0]++;__cov_W78X6Zx62e_EprC_9K3xlA.s['5']++;console.error('No semantic.json config found');}else{__cov_W78X6Zx62e_EprC_9K3xlA.b['1'][1]++;}}__cov_W78X6Zx62e_EprC_9K3xlA.s['6']++;gulpConfig=!userConfig?(__cov_W78X6Zx62e_EprC_9K3xlA.b['2'][0]++,extend(true,{},defaults)):(__cov_W78X6Zx62e_EprC_9K3xlA.b['2'][1]++,extend(false,{},defaults,userConfig));__cov_W78X6Zx62e_EprC_9K3xlA.s['7']++;config.addDerivedValues(gulpConfig);__cov_W78X6Zx62e_EprC_9K3xlA.s['8']++;module.exports=gulpConfig;