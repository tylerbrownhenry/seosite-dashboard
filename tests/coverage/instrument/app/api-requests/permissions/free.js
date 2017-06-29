
var __cov_q1hH3RHSBuj3f058H9UMOw = (Function('return this'))();
if (!__cov_q1hH3RHSBuj3f058H9UMOw.__coverage__) { __cov_q1hH3RHSBuj3f058H9UMOw.__coverage__ = {}; }
__cov_q1hH3RHSBuj3f058H9UMOw = __cov_q1hH3RHSBuj3f058H9UMOw.__coverage__;
if (!(__cov_q1hH3RHSBuj3f058H9UMOw['app/api-requests/permissions/free.js'])) {
   __cov_q1hH3RHSBuj3f058H9UMOw['app/api-requests/permissions/free.js'] = {"path":"app/api-requests/permissions/free.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":58}},"2":{"start":{"line":3,"column":0},"end":{"line":21,"column":2}},"3":{"start":{"line":22,"column":0},"end":{"line":22,"column":44}}},"branchMap":{}};
}
__cov_q1hH3RHSBuj3f058H9UMOw = __cov_q1hH3RHSBuj3f058H9UMOw['app/api-requests/permissions/free.js'];
__cov_q1hH3RHSBuj3f058H9UMOw.s['1']++;var Permission=require('../../models/index').permission;__cov_q1hH3RHSBuj3f058H9UMOw.s['2']++;var permission={label:'free',limits:{monthly:{request:100},daily:{request:5}},restrictions:{type:{page:true},captures:false,links:false,security:false}};__cov_q1hH3RHSBuj3f058H9UMOw.s['3']++;module.exports=new Permission(permission);
