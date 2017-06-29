
var __cov_g$1s7GLIDFhn4D3$BTMcFg = (Function('return this'))();
if (!__cov_g$1s7GLIDFhn4D3$BTMcFg.__coverage__) { __cov_g$1s7GLIDFhn4D3$BTMcFg.__coverage__ = {}; }
__cov_g$1s7GLIDFhn4D3$BTMcFg = __cov_g$1s7GLIDFhn4D3$BTMcFg.__coverage__;
if (!(__cov_g$1s7GLIDFhn4D3$BTMcFg['app/api-requests/permissions/paid.js'])) {
   __cov_g$1s7GLIDFhn4D3$BTMcFg['app/api-requests/permissions/paid.js'] = {"path":"app/api-requests/permissions/paid.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":58}},"2":{"start":{"line":3,"column":0},"end":{"line":21,"column":2}},"3":{"start":{"line":22,"column":0},"end":{"line":22,"column":44}}},"branchMap":{}};
}
__cov_g$1s7GLIDFhn4D3$BTMcFg = __cov_g$1s7GLIDFhn4D3$BTMcFg['app/api-requests/permissions/paid.js'];
__cov_g$1s7GLIDFhn4D3$BTMcFg.s['1']++;var Permission=require('../../models/index').permission;__cov_g$1s7GLIDFhn4D3$BTMcFg.s['2']++;var permission={label:'paid',limits:{monthly:{request:1000},daily:{request:1000}},restrictions:{type:{page:true},captures:true,links:true,security:true}};__cov_g$1s7GLIDFhn4D3$BTMcFg.s['3']++;module.exports=new Permission(permission);
