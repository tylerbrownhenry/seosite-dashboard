
var __cov_ZeTBi1GMyNLVtEsCX_3jwA = (Function('return this'))();
if (!__cov_ZeTBi1GMyNLVtEsCX_3jwA.__coverage__) { __cov_ZeTBi1GMyNLVtEsCX_3jwA.__coverage__ = {}; }
__cov_ZeTBi1GMyNLVtEsCX_3jwA = __cov_ZeTBi1GMyNLVtEsCX_3jwA.__coverage__;
if (!(__cov_ZeTBi1GMyNLVtEsCX_3jwA['app/models/security.js'])) {
   __cov_ZeTBi1GMyNLVtEsCX_3jwA['app/models/security.js'] = {"path":"app/models/security.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":37}},"2":{"start":{"line":3,"column":0},"end":{"line":17,"column":3}},"3":{"start":{"line":19,"column":0},"end":{"line":19,"column":61}}},"branchMap":{}};
}
__cov_ZeTBi1GMyNLVtEsCX_3jwA = __cov_ZeTBi1GMyNLVtEsCX_3jwA['app/models/security.js'];
__cov_ZeTBi1GMyNLVtEsCX_3jwA.s['1']++;var dynamoose=require('dynamoose');__cov_ZeTBi1GMyNLVtEsCX_3jwA.s['2']++;var securitySchema=new dynamoose.Schema({type:{type:String},message:{type:String},text:{type:String},requestId:{type:String,hashKey:true}});__cov_ZeTBi1GMyNLVtEsCX_3jwA.s['3']++;module.exports=dynamoose.model('Security',securitySchema);
