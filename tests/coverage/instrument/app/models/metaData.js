
var __cov_3I57pb$VUgtP0mJL0jsCow = (Function('return this'))();
if (!__cov_3I57pb$VUgtP0mJL0jsCow.__coverage__) { __cov_3I57pb$VUgtP0mJL0jsCow.__coverage__ = {}; }
__cov_3I57pb$VUgtP0mJL0jsCow = __cov_3I57pb$VUgtP0mJL0jsCow.__coverage__;
if (!(__cov_3I57pb$VUgtP0mJL0jsCow['app/models/metaData.js'])) {
   __cov_3I57pb$VUgtP0mJL0jsCow['app/models/metaData.js'] = {"path":"app/models/metaData.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":37}},"2":{"start":{"line":3,"column":0},"end":{"line":31,"column":3}},"3":{"start":{"line":33,"column":0},"end":{"line":33,"column":61}}},"branchMap":{}};
}
__cov_3I57pb$VUgtP0mJL0jsCow = __cov_3I57pb$VUgtP0mJL0jsCow['app/models/metaData.js'];
__cov_3I57pb$VUgtP0mJL0jsCow.s['1']++;var dynamoose=require('dynamoose');__cov_3I57pb$VUgtP0mJL0jsCow.s['2']++;var metaDataSchema=new dynamoose.Schema({type:{type:String},element:{type:String},found:{type:Boolean,default:false},message:{type:String},text:{type:String},keywords:{type:Object},_id:{type:String,rangeKey:true},requestId:{type:String,hashKey:true}});__cov_3I57pb$VUgtP0mJL0jsCow.s['3']++;module.exports=dynamoose.model('MetaData',metaDataSchema);
