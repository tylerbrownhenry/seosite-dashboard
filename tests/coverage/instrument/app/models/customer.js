
var __cov_2PvhuYBJmnG9aUnHh26x1Q = (Function('return this'))();
if (!__cov_2PvhuYBJmnG9aUnHh26x1Q.__coverage__) { __cov_2PvhuYBJmnG9aUnHh26x1Q.__coverage__ = {}; }
__cov_2PvhuYBJmnG9aUnHh26x1Q = __cov_2PvhuYBJmnG9aUnHh26x1Q.__coverage__;
if (!(__cov_2PvhuYBJmnG9aUnHh26x1Q['app/models/customer.js'])) {
   __cov_2PvhuYBJmnG9aUnHh26x1Q['app/models/customer.js'] = {"path":"app/models/customer.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":37}},"2":{"start":{"line":3,"column":0},"end":{"line":14,"column":3}},"3":{"start":{"line":16,"column":0},"end":{"line":18,"column":3}}},"branchMap":{}};
}
__cov_2PvhuYBJmnG9aUnHh26x1Q = __cov_2PvhuYBJmnG9aUnHh26x1Q['app/models/customer.js'];
__cov_2PvhuYBJmnG9aUnHh26x1Q.s['1']++;var dynamoose=require('dynamoose');__cov_2PvhuYBJmnG9aUnHh26x1Q.s['2']++;var customerSchema=new dynamoose.Schema({customerId:{type:String,hashKey:true},subscriptionId:{type:String},oid:{type:String}});__cov_2PvhuYBJmnG9aUnHh26x1Q.s['3']++;module.exports=dynamoose.model('Customer',customerSchema,{create:true});
