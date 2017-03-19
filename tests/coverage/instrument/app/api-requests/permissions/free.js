
var __cov_q1hH3RHSBuj3f058H9UMOw = (Function('return this'))();
if (!__cov_q1hH3RHSBuj3f058H9UMOw.__coverage__) { __cov_q1hH3RHSBuj3f058H9UMOw.__coverage__ = {}; }
__cov_q1hH3RHSBuj3f058H9UMOw = __cov_q1hH3RHSBuj3f058H9UMOw.__coverage__;
if (!(__cov_q1hH3RHSBuj3f058H9UMOw['app/api-requests/permissions/free.js'])) {
   __cov_q1hH3RHSBuj3f058H9UMOw['app/api-requests/permissions/free.js'] = {"path":"app/api-requests/permissions/free.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":58}},"2":{"start":{"line":3,"column":0},"end":{"line":56,"column":2}},"3":{"start":{"line":58,"column":0},"end":{"line":58,"column":43}}},"branchMap":{}};
}
__cov_q1hH3RHSBuj3f058H9UMOw = __cov_q1hH3RHSBuj3f058H9UMOw['app/api-requests/permissions/free.js'];
__cov_q1hH3RHSBuj3f058H9UMOw.s['1']++;var Permission=require('../../models/index').permission;__cov_q1hH3RHSBuj3f058H9UMOw.s['2']++;var permission={label:'free',limits:{monthly:{page:100,site:0,requests:100,links:0,captures:0},daily:{page:5,site:0,requests:5,links:0,captures:0}},restrictions:{type:{site:false,page:true},captures:false,filterLimit:1,digDepthLimit:0,excludeExternalLinks:{canDisable:false},honorRobotExclusions:{canDisable:false},excludedSchemes:{canUse:false},saveSelectors:{canEnable:false},linkInformation:{selector:false,element:false,redirects:false,location:false,status:false,url:true,href:true,parent:false},acceptedSchemes:{http:true,https:false}}};__cov_q1hH3RHSBuj3f058H9UMOw.s['3']++;module.exports=new Permission(permission);
