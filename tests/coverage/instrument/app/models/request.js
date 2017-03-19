
var __cov_xm5DagacqWL5QAeR7nIfkA = (Function('return this'))();
if (!__cov_xm5DagacqWL5QAeR7nIfkA.__coverage__) { __cov_xm5DagacqWL5QAeR7nIfkA.__coverage__ = {}; }
__cov_xm5DagacqWL5QAeR7nIfkA = __cov_xm5DagacqWL5QAeR7nIfkA.__coverage__;
if (!(__cov_xm5DagacqWL5QAeR7nIfkA['app/models/request.js'])) {
   __cov_xm5DagacqWL5QAeR7nIfkA['app/models/request.js'] = {"path":"app/models/request.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":37}},"2":{"start":{"line":2,"column":0},"end":{"line":43,"column":3}},"3":{"start":{"line":44,"column":0},"end":{"line":44,"column":60}}},"branchMap":{}};
}
__cov_xm5DagacqWL5QAeR7nIfkA = __cov_xm5DagacqWL5QAeR7nIfkA['app/models/request.js'];
__cov_xm5DagacqWL5QAeR7nIfkA.s['1']++;var dynamoose=require('dynamoose');__cov_xm5DagacqWL5QAeR7nIfkA.s['2']++;var requestSchema=new dynamoose.Schema({id:{type:String,hashKey:true},retries:{type:Number},uid:{type:String},url:{type:String},requestDate:{type:Date},options:{type:Object},processes:{type:Number},status:{type:String},failedReason:{type:String},response:{type:Object}},{throughput:{read:15,write:5},timestamps:{createdAt:'createdTs',updatedAt:'updatedTs'}});__cov_xm5DagacqWL5QAeR7nIfkA.s['3']++;module.exports=dynamoose.model('Requests',requestSchema);
