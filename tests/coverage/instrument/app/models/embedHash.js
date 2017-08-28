
var __cov_Kh8Po_p7bZEdvhhc6yZMWQ = (Function('return this'))();
if (!__cov_Kh8Po_p7bZEdvhhc6yZMWQ.__coverage__) { __cov_Kh8Po_p7bZEdvhhc6yZMWQ.__coverage__ = {}; }
__cov_Kh8Po_p7bZEdvhhc6yZMWQ = __cov_Kh8Po_p7bZEdvhhc6yZMWQ.__coverage__;
if (!(__cov_Kh8Po_p7bZEdvhhc6yZMWQ['app/models/embedHash.js'])) {
   __cov_Kh8Po_p7bZEdvhhc6yZMWQ['app/models/embedHash.js'] = {"path":"app/models/embedHash.js","s":{"1":0,"2":0,"3":0,"4":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":27}},"2":{"start":{"line":2,"column":0},"end":{"line":2,"column":37}},"3":{"start":{"line":4,"column":0},"end":{"line":24,"column":3}},"4":{"start":{"line":26,"column":0},"end":{"line":26,"column":63}}},"branchMap":{}};
}
__cov_Kh8Po_p7bZEdvhhc6yZMWQ = __cov_Kh8Po_p7bZEdvhhc6yZMWQ['app/models/embedHash.js'];
__cov_Kh8Po_p7bZEdvhhc6yZMWQ.s['1']++;require('dotenv').config();__cov_Kh8Po_p7bZEdvhhc6yZMWQ.s['2']++;var dynamoose=require('dynamoose');__cov_Kh8Po_p7bZEdvhhc6yZMWQ.s['3']++;var embedHashSchema=new dynamoose.Schema({_id:{type:String,hashKey:true},oid:{type:String,rangeKey:true},name:{type:String},active:{type:Boolean}},{throughput:{read:15,write:5}});__cov_Kh8Po_p7bZEdvhhc6yZMWQ.s['4']++;module.exports=dynamoose.model('EmbedHash',embedHashSchema);
