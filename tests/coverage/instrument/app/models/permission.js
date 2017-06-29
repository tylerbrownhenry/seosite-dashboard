"use strict";
var __cov_rDjGN_u6n7sO5EGoyo$CwQ = (Function('return this'))();
if (!__cov_rDjGN_u6n7sO5EGoyo$CwQ.__coverage__) { __cov_rDjGN_u6n7sO5EGoyo$CwQ.__coverage__ = {}; }
__cov_rDjGN_u6n7sO5EGoyo$CwQ = __cov_rDjGN_u6n7sO5EGoyo$CwQ.__coverage__;
if (!(__cov_rDjGN_u6n7sO5EGoyo$CwQ['app/models/permission.js'])) {
   __cov_rDjGN_u6n7sO5EGoyo$CwQ['app/models/permission.js'] = {"path":"app/models/permission.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"fnMap":{},"statementMap":{"1":{"start":{"line":2,"column":0},"end":{"line":2,"column":37}},"2":{"start":{"line":3,"column":0},"end":{"line":52,"column":3}},"3":{"start":{"line":54,"column":0},"end":{"line":56,"column":3}}},"branchMap":{}};
}
__cov_rDjGN_u6n7sO5EGoyo$CwQ = __cov_rDjGN_u6n7sO5EGoyo$CwQ['app/models/permission.js'];
__cov_rDjGN_u6n7sO5EGoyo$CwQ.s['1']++;var dynamoose=require('dynamoose');__cov_rDjGN_u6n7sO5EGoyo$CwQ.s['2']++;var permissionSchema=new dynamoose.Schema({label:{type:String,hashKey:true},limits:{monthly:{requests:{type:Number,default:30}},daily:{requests:{type:Number,default:3}}},restrictions:{type:{page:{type:Boolean,default:true}},captures:{type:Boolean,default:false},links:{type:Boolean,default:false},security:{type:Boolean,default:false}}},{throughput:{read:15,write:5},timestamps:{createdAt:'createdTs',updatedAt:'updatedTs'}});__cov_rDjGN_u6n7sO5EGoyo$CwQ.s['3']++;module.exports=dynamoose.model('Permission',permissionSchema,{create:true});
