
var __cov_d3t3EeTIuLkj$6cdHsZhAQ = (Function('return this'))();
if (!__cov_d3t3EeTIuLkj$6cdHsZhAQ.__coverage__) { __cov_d3t3EeTIuLkj$6cdHsZhAQ.__coverage__ = {}; }
__cov_d3t3EeTIuLkj$6cdHsZhAQ = __cov_d3t3EeTIuLkj$6cdHsZhAQ.__coverage__;
if (!(__cov_d3t3EeTIuLkj$6cdHsZhAQ['app/models/passwordResetToken.js'])) {
   __cov_d3t3EeTIuLkj$6cdHsZhAQ['app/models/passwordResetToken.js'] = {"path":"app/models/passwordResetToken.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":37}},"2":{"start":{"line":3,"column":0},"end":{"line":20,"column":3}},"3":{"start":{"line":21,"column":0},"end":{"line":23,"column":3}}},"branchMap":{}};
}
__cov_d3t3EeTIuLkj$6cdHsZhAQ = __cov_d3t3EeTIuLkj$6cdHsZhAQ['app/models/passwordResetToken.js'];
__cov_d3t3EeTIuLkj$6cdHsZhAQ.s['1']++;var dynamoose=require('dynamoose');__cov_d3t3EeTIuLkj$6cdHsZhAQ.s['2']++;var passwordResetTokenSchema=new dynamoose.Schema({uid:{type:String},token:{type:String,hashKey:true},expires:{type:String,default:+new Date()}},{throughput:{read:1,write:1}});__cov_d3t3EeTIuLkj$6cdHsZhAQ.s['3']++;module.exports=dynamoose.model('PasswordResetToken',passwordResetTokenSchema,{create:true});
