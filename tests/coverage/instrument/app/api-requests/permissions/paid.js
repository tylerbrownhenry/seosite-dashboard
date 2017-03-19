
var __cov_g$1s7GLIDFhn4D3$BTMcFg = (Function('return this'))();
if (!__cov_g$1s7GLIDFhn4D3$BTMcFg.__coverage__) { __cov_g$1s7GLIDFhn4D3$BTMcFg.__coverage__ = {}; }
__cov_g$1s7GLIDFhn4D3$BTMcFg = __cov_g$1s7GLIDFhn4D3$BTMcFg.__coverage__;
if (!(__cov_g$1s7GLIDFhn4D3$BTMcFg['app/api-requests/permissions/paid.js'])) {
   __cov_g$1s7GLIDFhn4D3$BTMcFg['app/api-requests/permissions/paid.js'] = {"path":"app/api-requests/permissions/paid.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":58}},"2":{"start":{"line":3,"column":0},"end":{"line":56,"column":2}},"3":{"start":{"line":58,"column":0},"end":{"line":58,"column":44}}},"branchMap":{}};
}
__cov_g$1s7GLIDFhn4D3$BTMcFg = __cov_g$1s7GLIDFhn4D3$BTMcFg['app/api-requests/permissions/paid.js'];
__cov_g$1s7GLIDFhn4D3$BTMcFg.s['1']++;var Permission=require('../../models/index').permission;__cov_g$1s7GLIDFhn4D3$BTMcFg.s['2']++;var permission={label:'paid',limits:{monthly:{requests:1000,links:1000,captures:1000},daily:{requests:100,links:100,captures:100}},restrictions:{type:{page:true},captures:true,filterLimit:10,digDepthLimit:100,excludeExternalLinks:{canDisable:true},honorRobotExclusions:{canDisable:true},excludedSchemes:{canUse:true},saveSelectors:{canEnable:true},linkInformation:{selector:true,element:true,location:true,redirects:true,status:true,url:true,href:true,parent:true},acceptedSchemes:{http:true,https:true}}};__cov_g$1s7GLIDFhn4D3$BTMcFg.s['3']++;module.exports=new Permission(permission);
