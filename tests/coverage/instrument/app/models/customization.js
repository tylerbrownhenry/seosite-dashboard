
var __cov_I$Ih$wR680KiGfKlIOcb7w = (Function('return this'))();
if (!__cov_I$Ih$wR680KiGfKlIOcb7w.__coverage__) { __cov_I$Ih$wR680KiGfKlIOcb7w.__coverage__ = {}; }
__cov_I$Ih$wR680KiGfKlIOcb7w = __cov_I$Ih$wR680KiGfKlIOcb7w.__coverage__;
if (!(__cov_I$Ih$wR680KiGfKlIOcb7w['app/models/customization.js'])) {
   __cov_I$Ih$wR680KiGfKlIOcb7w['app/models/customization.js'] = {"path":"app/models/customization.js","s":{"1":0,"2":0,"3":0,"4":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":27}},"2":{"start":{"line":2,"column":0},"end":{"line":2,"column":37}},"3":{"start":{"line":3,"column":0},"end":{"line":22,"column":3}},"4":{"start":{"line":24,"column":0},"end":{"line":24,"column":71}}},"branchMap":{}};
}
__cov_I$Ih$wR680KiGfKlIOcb7w = __cov_I$Ih$wR680KiGfKlIOcb7w['app/models/customization.js'];
__cov_I$Ih$wR680KiGfKlIOcb7w.s['1']++;require('dotenv').config();__cov_I$Ih$wR680KiGfKlIOcb7w.s['2']++;var dynamoose=require('dynamoose');__cov_I$Ih$wR680KiGfKlIOcb7w.s['3']++;var customizationSchema=new dynamoose.Schema({oid:{type:String,hashKey:true},logo:{type:String},css:{type:String},emailCss:{type:String}},{throughput:{read:15,write:5}});__cov_I$Ih$wR680KiGfKlIOcb7w.s['4']++;module.exports=dynamoose.model('Customization',customizationSchema);
