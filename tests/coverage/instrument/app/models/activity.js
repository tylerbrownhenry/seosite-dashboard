
var __cov_ckthsV8aHvKpAX2D_$Chzw = (Function('return this'))();
if (!__cov_ckthsV8aHvKpAX2D_$Chzw.__coverage__) { __cov_ckthsV8aHvKpAX2D_$Chzw.__coverage__ = {}; }
__cov_ckthsV8aHvKpAX2D_$Chzw = __cov_ckthsV8aHvKpAX2D_$Chzw.__coverage__;
if (!(__cov_ckthsV8aHvKpAX2D_$Chzw['app/models/activity.js'])) {
   __cov_ckthsV8aHvKpAX2D_$Chzw['app/models/activity.js'] = {"path":"app/models/activity.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":37}},"2":{"start":{"line":3,"column":0},"end":{"line":40,"column":3}},"3":{"start":{"line":41,"column":0},"end":{"line":43,"column":3}}},"branchMap":{}};
}
__cov_ckthsV8aHvKpAX2D_$Chzw = __cov_ckthsV8aHvKpAX2D_$Chzw['app/models/activity.js'];
__cov_ckthsV8aHvKpAX2D_$Chzw.s['1']++;var dynamoose=require('dynamoose');__cov_ckthsV8aHvKpAX2D_$Chzw.s['2']++;var activitySchema=new dynamoose.Schema({'oid':{type:String,hashKey:true},'email':{type:String},'request-month-reset':{type:String,default:+new Date()},'request-day-reset':{type:String,default:+new Date()},'request-all-count':{type:Number,default:0},'request-day-count':{type:Number,default:0},'request-month-count':{type:Number,default:0}},{'throughput':{read:15,write:5},'timestamps':{createdAt:'createdTs',updatedAt:'updatedTs'}});__cov_ckthsV8aHvKpAX2D_$Chzw.s['3']++;module.exports=dynamoose.model('Activity',activitySchema,{create:true});
