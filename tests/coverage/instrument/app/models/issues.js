
var __cov_raLCRDo78DIwVpwwcFGR2Q = (Function('return this'))();
if (!__cov_raLCRDo78DIwVpwwcFGR2Q.__coverage__) { __cov_raLCRDo78DIwVpwwcFGR2Q.__coverage__ = {}; }
__cov_raLCRDo78DIwVpwwcFGR2Q = __cov_raLCRDo78DIwVpwwcFGR2Q.__coverage__;
if (!(__cov_raLCRDo78DIwVpwwcFGR2Q['app/models/issues.js'])) {
   __cov_raLCRDo78DIwVpwwcFGR2Q['app/models/issues.js'] = {"path":"app/models/issues.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":37}},"2":{"start":{"line":3,"column":0},"end":{"line":40,"column":3}},"3":{"start":{"line":42,"column":0},"end":{"line":42,"column":56}}},"branchMap":{}};
}
__cov_raLCRDo78DIwVpwwcFGR2Q = __cov_raLCRDo78DIwVpwwcFGR2Q['app/models/issues.js'];
__cov_raLCRDo78DIwVpwwcFGR2Q.s['1']++;var dynamoose=require('dynamoose');__cov_raLCRDo78DIwVpwwcFGR2Q.s['2']++;var issueSchema=new dynamoose.Schema({tooManyLinks:{type:Boolean,default:false},noIssues:{type:Boolean,default:false},sitemap:{type:Boolean,default:false},robots:{type:Boolean,default:false},links:{type:Number,default:0},resources:{type:Number,default:0},security:{type:Number,default:0},meta:{type:Number,default:0},requestId:{type:String,hashKey:true}});__cov_raLCRDo78DIwVpwwcFGR2Q.s['3']++;module.exports=dynamoose.model('Issues',issueSchema);
