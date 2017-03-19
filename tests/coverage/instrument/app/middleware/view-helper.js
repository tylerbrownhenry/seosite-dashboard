"use strict";
var __cov_QN9PJ2XwodbSbmbUcq$ouw = (Function('return this'))();
if (!__cov_QN9PJ2XwodbSbmbUcq$ouw.__coverage__) { __cov_QN9PJ2XwodbSbmbUcq$ouw.__coverage__ = {}; }
__cov_QN9PJ2XwodbSbmbUcq$ouw = __cov_QN9PJ2XwodbSbmbUcq$ouw.__coverage__;
if (!(__cov_QN9PJ2XwodbSbmbUcq$ouw['app/middleware/view-helper.js'])) {
   __cov_QN9PJ2XwodbSbmbUcq$ouw['app/middleware/view-helper.js'] = {"path":"app/middleware/view-helper.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0},"b":{},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":5,"loc":{"start":{"line":5,"column":17},"end":{"line":5,"column":43}}}},"statementMap":{"1":{"start":{"line":3,"column":0},"end":{"line":3,"column":43}},"2":{"start":{"line":5,"column":0},"end":{"line":9,"column":2}},"3":{"start":{"line":6,"column":5},"end":{"line":6,"column":32}},"4":{"start":{"line":7,"column":5},"end":{"line":7,"column":58}},"5":{"start":{"line":8,"column":5},"end":{"line":8,"column":12}}},"branchMap":{}};
}
__cov_QN9PJ2XwodbSbmbUcq$ouw = __cov_QN9PJ2XwodbSbmbUcq$ouw['app/middleware/view-helper.js'];
__cov_QN9PJ2XwodbSbmbUcq$ouw.s['1']++;var secrets=require('../config/secrets');__cov_QN9PJ2XwodbSbmbUcq$ouw.s['2']++;module.exports=function(req,res,next){__cov_QN9PJ2XwodbSbmbUcq$ouw.f['1']++;__cov_QN9PJ2XwodbSbmbUcq$ouw.s['3']++;res.locals.path=req.path;__cov_QN9PJ2XwodbSbmbUcq$ouw.s['4']++;res.locals.googleAnalytics=secrets.googleAnalytics;__cov_QN9PJ2XwodbSbmbUcq$ouw.s['5']++;next();};
