
var __cov_zyI9mPAEhQE71Zb04wawjw = (Function('return this'))();
if (!__cov_zyI9mPAEhQE71Zb04wawjw.__coverage__) { __cov_zyI9mPAEhQE71Zb04wawjw.__coverage__ = {}; }
__cov_zyI9mPAEhQE71Zb04wawjw = __cov_zyI9mPAEhQE71Zb04wawjw.__coverage__;
if (!(__cov_zyI9mPAEhQE71Zb04wawjw['app/models/resource.js'])) {
   __cov_zyI9mPAEhQE71Zb04wawjw['app/models/resource.js'] = {"path":"app/models/resource.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":37}},"2":{"start":{"line":3,"column":0},"end":{"line":62,"column":3}},"3":{"start":{"line":64,"column":0},"end":{"line":64,"column":61}}},"branchMap":{}};
}
__cov_zyI9mPAEhQE71Zb04wawjw = __cov_zyI9mPAEhQE71Zb04wawjw['app/models/resource.js'];
__cov_zyI9mPAEhQE71Zb04wawjw.s['1']++;var dynamoose=require('dynamoose');__cov_zyI9mPAEhQE71Zb04wawjw.s['2']++;var resourceSchema=new dynamoose.Schema({url:{type:String},hostname:{type:String},timings:{type:Object},mainPage:{type:Boolean},css:{type:Object},server:{type:String},start:{type:String,default:+new Date()},duration:{type:Number,default:0},cached:{type:Boolean,default:false},gzip:{type:Boolean,default:false},minified:{type:Boolean,default:false},bodySize:{type:String},type:{type:String},cleanType:{type:String},_id:{type:String,rangeKey:true},requestId:{type:String,hashKey:true},status:{type:Number}});__cov_zyI9mPAEhQE71Zb04wawjw.s['3']++;module.exports=dynamoose.model('Resource',resourceSchema);
