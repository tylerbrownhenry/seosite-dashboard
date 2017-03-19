"use strict";
var __cov__lEBqGPfKUWG$$H65irqeQ = (Function('return this'))();
if (!__cov__lEBqGPfKUWG$$H65irqeQ.__coverage__) { __cov__lEBqGPfKUWG$$H65irqeQ.__coverage__ = {}; }
__cov__lEBqGPfKUWG$$H65irqeQ = __cov__lEBqGPfKUWG$$H65irqeQ.__coverage__;
if (!(__cov__lEBqGPfKUWG$$H65irqeQ['app/controllers/api-callback-controller.js'])) {
   __cov__lEBqGPfKUWG$$H65irqeQ['app/controllers/api-callback-controller.js'] = {"path":"app/controllers/api-callback-controller.js","s":{"1":0,"2":1,"3":0,"4":0,"5":0},"b":{},"f":{"1":0},"fnMap":{"1":{"name":"callback","line":4,"loc":{"start":{"line":4,"column":0},"end":{"line":4,"column":34}}}},"statementMap":{"1":{"start":{"line":2,"column":0},"end":{"line":2,"column":65}},"2":{"start":{"line":4,"column":0},"end":{"line":9,"column":1}},"3":{"start":{"line":5,"column":5},"end":{"line":5,"column":32}},"4":{"start":{"line":6,"column":5},"end":{"line":8,"column":8}},"5":{"start":{"line":10,"column":0},"end":{"line":10,"column":26}}},"branchMap":{}};
}
__cov__lEBqGPfKUWG$$H65irqeQ = __cov__lEBqGPfKUWG$$H65irqeQ['app/controllers/api-callback-controller.js'];
__cov__lEBqGPfKUWG$$H65irqeQ.s['1']++;var sendStatus=require('../api-requests/callbacks').sendStatus;function callback(req,res,next){__cov__lEBqGPfKUWG$$H65irqeQ.f['1']++;__cov__lEBqGPfKUWG$$H65irqeQ.s['3']++;sendStatus(req,res,next);__cov__lEBqGPfKUWG$$H65irqeQ.s['4']++;res.json({message:'Ok'});}__cov__lEBqGPfKUWG$$H65irqeQ.s['5']++;module.exports=callback;
