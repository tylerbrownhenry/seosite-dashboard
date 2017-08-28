
var __cov_nD2NJOgpTj7OapZaf61qqw = (Function('return this'))();
if (!__cov_nD2NJOgpTj7OapZaf61qqw.__coverage__) { __cov_nD2NJOgpTj7OapZaf61qqw.__coverage__ = {}; }
__cov_nD2NJOgpTj7OapZaf61qqw = __cov_nD2NJOgpTj7OapZaf61qqw.__coverage__;
if (!(__cov_nD2NJOgpTj7OapZaf61qqw['app/models/subscription.js'])) {
   __cov_nD2NJOgpTj7OapZaf61qqw['app/models/subscription.js'] = {"path":"app/models/subscription.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":2,"column":44}},"2":{"start":{"line":4,"column":0},"end":{"line":46,"column":3}},"3":{"start":{"line":48,"column":0},"end":{"line":50,"column":3}}},"branchMap":{}};
}
__cov_nD2NJOgpTj7OapZaf61qqw = __cov_nD2NJOgpTj7OapZaf61qqw['app/models/subscription.js'];
__cov_nD2NJOgpTj7OapZaf61qqw.s['1']++;var dynamoose=require('dynamoose'),secrets=require('../config/secrets');__cov_nD2NJOgpTj7OapZaf61qqw.s['2']++;var subscriptionSchema=new dynamoose.Schema({customerId:{type:String,hashKey:true},subscriptionId:{type:String},oid:{type:String},plan:{type:String,default:secrets.stripeOptions.defaultPlan},last4:{type:String},activeUntil:{type:Date},created:{type:Date},frequency:{type:String},cancelAtPeriodEnd:{type:Boolean},canceledAt:{type:Number},status:{type:String},periodStart:{type:Number},periodEnd:{type:Number}});__cov_nD2NJOgpTj7OapZaf61qqw.s['3']++;module.exports=dynamoose.model('Subscription',subscriptionSchema,{create:true});
