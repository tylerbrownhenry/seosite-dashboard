
var __cov_yXB6iOVEHTLLx8olDp5LcQ = (Function('return this'))();
if (!__cov_yXB6iOVEHTLLx8olDp5LcQ.__coverage__) { __cov_yXB6iOVEHTLLx8olDp5LcQ.__coverage__ = {}; }
__cov_yXB6iOVEHTLLx8olDp5LcQ = __cov_yXB6iOVEHTLLx8olDp5LcQ.__coverage__;
if (!(__cov_yXB6iOVEHTLLx8olDp5LcQ['app/models/email.js'])) {
   __cov_yXB6iOVEHTLLx8olDp5LcQ['app/models/email.js'] = {"path":"app/models/email.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":2,"column":0},"end":{"line":2,"column":37}},"2":{"start":{"line":4,"column":0},"end":{"line":18,"column":3}},"3":{"start":{"line":20,"column":0},"end":{"line":22,"column":3}}},"branchMap":{}};
}
__cov_yXB6iOVEHTLLx8olDp5LcQ = __cov_yXB6iOVEHTLLx8olDp5LcQ['app/models/email.js'];
__cov_yXB6iOVEHTLLx8olDp5LcQ.s['1']++;var dynamoose=require('dynamoose');__cov_yXB6iOVEHTLLx8olDp5LcQ.s['2']++;var emailSchema=new dynamoose.Schema({email:{type:String,hashKey:true},uid:{type:String},customerId:{type:String},oid:{type:String}});__cov_yXB6iOVEHTLLx8olDp5LcQ.s['3']++;module.exports=dynamoose.model('Email',emailSchema,{create:true});
