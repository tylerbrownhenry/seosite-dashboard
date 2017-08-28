
var __cov_b3bnFpqPVWTxN1PC7TLe8g = (Function('return this'))();
if (!__cov_b3bnFpqPVWTxN1PC7TLe8g.__coverage__) { __cov_b3bnFpqPVWTxN1PC7TLe8g.__coverage__ = {}; }
__cov_b3bnFpqPVWTxN1PC7TLe8g = __cov_b3bnFpqPVWTxN1PC7TLe8g.__coverage__;
if (!(__cov_b3bnFpqPVWTxN1PC7TLe8g['app/models/dashboardStyle.js'])) {
   __cov_b3bnFpqPVWTxN1PC7TLe8g['app/models/dashboardStyle.js'] = {"path":"app/models/dashboardStyle.js","s":{"1":0,"2":0,"3":0,"4":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":27}},"2":{"start":{"line":2,"column":0},"end":{"line":2,"column":37}},"3":{"start":{"line":3,"column":0},"end":{"line":28,"column":3}},"4":{"start":{"line":30,"column":0},"end":{"line":30,"column":63}}},"branchMap":{}};
}
__cov_b3bnFpqPVWTxN1PC7TLe8g = __cov_b3bnFpqPVWTxN1PC7TLe8g['app/models/dashboardStyle.js'];
__cov_b3bnFpqPVWTxN1PC7TLe8g.s['1']++;require('dotenv').config();__cov_b3bnFpqPVWTxN1PC7TLe8g.s['2']++;var dynamoose=require('dynamoose');__cov_b3bnFpqPVWTxN1PC7TLe8g.s['3']++;var embedHashSchema=new dynamoose.Schema({_id:{type:String,rangeKey:true},oid:{type:String,hashKey:true},created:{type:Date,default:new Date()},name:{type:String},status:{type:String,default:'active:embed'}},{throughput:{read:15,write:5}});__cov_b3bnFpqPVWTxN1PC7TLe8g.s['4']++;module.exports=dynamoose.model('EmbedHash',embedHashSchema);
