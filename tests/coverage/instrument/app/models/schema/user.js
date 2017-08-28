
var __cov_pcNnvS3uLz4pKy62ETZ1$Q = (Function('return this'))();
if (!__cov_pcNnvS3uLz4pKy62ETZ1$Q.__coverage__) { __cov_pcNnvS3uLz4pKy62ETZ1$Q.__coverage__ = {}; }
__cov_pcNnvS3uLz4pKy62ETZ1$Q = __cov_pcNnvS3uLz4pKy62ETZ1$Q.__coverage__;
if (!(__cov_pcNnvS3uLz4pKy62ETZ1$Q['app/models/schema/user.js'])) {
   __cov_pcNnvS3uLz4pKy62ETZ1$Q['app/models/schema/user.js'] = {"path":"app/models/schema/user.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":2,"column":42}},"2":{"start":{"line":4,"column":0},"end":{"line":60,"column":3}},"3":{"start":{"line":62,"column":0},"end":{"line":62,"column":28}}},"branchMap":{}};
}
__cov_pcNnvS3uLz4pKy62ETZ1$Q = __cov_pcNnvS3uLz4pKy62ETZ1$Q['app/models/schema/user.js'];
__cov_pcNnvS3uLz4pKy62ETZ1$Q.s['1']++;var dynamoose=require('dynamoose'),secrets=require('../../config/secrets');__cov_pcNnvS3uLz4pKy62ETZ1$Q.s['2']++;var userSchema=new dynamoose.Schema({email:{type:String,unique:true,lowercase:true},status:{type:String,default:'active'},password:String,isAdmin:{type:Boolean,default:false},customerId:{type:String},timezone:{type:String},role:{type:String,default:'org_admin'},oid:{type:String},uid:{type:String,hashKey:true},name:{type:String,default:''},gender:{type:String,default:''},location:{type:String,default:''},website:{type:String,default:''},picture:{type:String,default:''},created:{type:String,default:+new Date()}});__cov_pcNnvS3uLz4pKy62ETZ1$Q.s['3']++;module.exports=userSchema;
