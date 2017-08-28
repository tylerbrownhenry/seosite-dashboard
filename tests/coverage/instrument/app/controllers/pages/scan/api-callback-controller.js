"use strict";
var __cov_ijUPtpnX1qKC$amn0vE9kg = (Function('return this'))();
if (!__cov_ijUPtpnX1qKC$amn0vE9kg.__coverage__) { __cov_ijUPtpnX1qKC$amn0vE9kg.__coverage__ = {}; }
__cov_ijUPtpnX1qKC$amn0vE9kg = __cov_ijUPtpnX1qKC$amn0vE9kg.__coverage__;
if (!(__cov_ijUPtpnX1qKC$amn0vE9kg['app/controllers/pages/scan/api-callback-controller.js'])) {
   __cov_ijUPtpnX1qKC$amn0vE9kg['app/controllers/pages/scan/api-callback-controller.js'] = {"path":"app/controllers/pages/scan/api-callback-controller.js","s":{"1":0,"2":1,"3":0,"4":0,"5":0},"b":{},"f":{"1":0},"fnMap":{"1":{"name":"callback","line":4,"loc":{"start":{"line":4,"column":0},"end":{"line":4,"column":34}}}},"statementMap":{"1":{"start":{"line":2,"column":0},"end":{"line":2,"column":71}},"2":{"start":{"line":4,"column":0},"end":{"line":9,"column":1}},"3":{"start":{"line":5,"column":5},"end":{"line":5,"column":32}},"4":{"start":{"line":6,"column":5},"end":{"line":8,"column":8}},"5":{"start":{"line":10,"column":0},"end":{"line":10,"column":26}}},"branchMap":{}};
}
__cov_ijUPtpnX1qKC$amn0vE9kg = __cov_ijUPtpnX1qKC$amn0vE9kg['app/controllers/pages/scan/api-callback-controller.js'];
__cov_ijUPtpnX1qKC$amn0vE9kg.s['1']++;var sendStatus=require('../../../api-requests/callbacks').sendStatus;function callback(req,res,next){__cov_ijUPtpnX1qKC$amn0vE9kg.f['1']++;__cov_ijUPtpnX1qKC$amn0vE9kg.s['3']++;sendStatus(req,res,next);__cov_ijUPtpnX1qKC$amn0vE9kg.s['4']++;res.json({message:'Ok'});}__cov_ijUPtpnX1qKC$amn0vE9kg.s['5']++;module.exports=callback;
