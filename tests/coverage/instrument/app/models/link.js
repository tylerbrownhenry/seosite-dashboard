
var __cov_NBGOkUMuUsaryY6ZAXw5Sw = (Function('return this'))();
if (!__cov_NBGOkUMuUsaryY6ZAXw5Sw.__coverage__) { __cov_NBGOkUMuUsaryY6ZAXw5Sw.__coverage__ = {}; }
__cov_NBGOkUMuUsaryY6ZAXw5Sw = __cov_NBGOkUMuUsaryY6ZAXw5Sw.__coverage__;
if (!(__cov_NBGOkUMuUsaryY6ZAXw5Sw['app/models/link.js'])) {
   __cov_NBGOkUMuUsaryY6ZAXw5Sw['app/models/link.js'] = {"path":"app/models/link.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":37}},"2":{"start":{"line":3,"column":0},"end":{"line":51,"column":3}},"3":{"start":{"line":53,"column":0},"end":{"line":55,"column":3}}},"branchMap":{}};
}
__cov_NBGOkUMuUsaryY6ZAXw5Sw = __cov_NBGOkUMuUsaryY6ZAXw5Sw['app/models/link.js'];
__cov_NBGOkUMuUsaryY6ZAXw5Sw.s['1']++;var dynamoose=require('dynamoose');__cov_NBGOkUMuUsaryY6ZAXw5Sw.s['2']++;var linkSchema=new dynamoose.Schema({url:{type:String},site:{type:String},queueId:{type:String},found:{type:String,default:+new Date()},_id:{type:String,rangeKey:true},linkId:{type:String},uid:{type:String},requestId:{type:String,hashKey:true},status:{type:String,default:'pending'},__link:{type:Object},attrs:{type:Object},results:{type:Object}});__cov_NBGOkUMuUsaryY6ZAXw5Sw.s['3']++;module.exports=dynamoose.model('Link',linkSchema,{create:true});
