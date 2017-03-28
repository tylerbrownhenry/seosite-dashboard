
var __cov_pcNnvS3uLz4pKy62ETZ1$Q = (Function('return this'))();
if (!__cov_pcNnvS3uLz4pKy62ETZ1$Q.__coverage__) { __cov_pcNnvS3uLz4pKy62ETZ1$Q.__coverage__ = {}; }
__cov_pcNnvS3uLz4pKy62ETZ1$Q = __cov_pcNnvS3uLz4pKy62ETZ1$Q.__coverage__;
if (!(__cov_pcNnvS3uLz4pKy62ETZ1$Q['app/models/schema/user.js'])) {
   __cov_pcNnvS3uLz4pKy62ETZ1$Q['app/models/schema/user.js'] = {"path":"app/models/schema/user.js","s":{"1":0,"2":0,"3":0,"4":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":37}},"2":{"start":{"line":2,"column":0},"end":{"line":2,"column":46}},"3":{"start":{"line":3,"column":0},"end":{"line":68,"column":3}},"4":{"start":{"line":70,"column":0},"end":{"line":70,"column":28}}},"branchMap":{}};
}
__cov_pcNnvS3uLz4pKy62ETZ1$Q = __cov_pcNnvS3uLz4pKy62ETZ1$Q['app/models/schema/user.js'];
__cov_pcNnvS3uLz4pKy62ETZ1$Q.s['1']++;var dynamoose=require('dynamoose');;__cov_pcNnvS3uLz4pKy62ETZ1$Q.s['2']++;var secrets=require('../../config/secrets');__cov_pcNnvS3uLz4pKy62ETZ1$Q.s['3']++;var userSchema=new dynamoose.Schema({email:{type:String,unique:true,lowercase:true},password:String,isAdmin:{type:Boolean,default:false},role:{type:String,default:'org_admin'},oid:{type:String,hashKey:true},uid:{type:String,hashKey:true},name:{type:String,default:''},gender:{type:String,default:''},location:{type:String,default:''},website:{type:String,default:''},picture:{type:String,default:''},plan:{type:String,default:secrets.stripeOptions.defaultPlan},last4:{type:String},customerId:{type:String},subscriptionId:{type:String},apiToken:{type:String},resetPasswordToken:{type:String},resetPasswordExpires:{type:Date}});__cov_pcNnvS3uLz4pKy62ETZ1$Q.s['4']++;module.exports=userSchema;
