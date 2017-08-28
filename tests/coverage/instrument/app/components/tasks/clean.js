
var __cov__e7Lzl0E8wLFDkMVj9uA4g = (Function('return this'))();
if (!__cov__e7Lzl0E8wLFDkMVj9uA4g.__coverage__) { __cov__e7Lzl0E8wLFDkMVj9uA4g.__coverage__ = {}; }
__cov__e7Lzl0E8wLFDkMVj9uA4g = __cov__e7Lzl0E8wLFDkMVj9uA4g.__coverage__;
if (!(__cov__e7Lzl0E8wLFDkMVj9uA4g['app/components/tasks/clean.js'])) {
   __cov__e7Lzl0E8wLFDkMVj9uA4g['app/components/tasks/clean.js'] = {"path":"app/components/tasks/clean.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":12,"loc":{"start":{"line":12,"column":17},"end":{"line":12,"column":36}}}},"statementMap":{"1":{"start":{"line":5,"column":0},"end":{"line":9,"column":1}},"2":{"start":{"line":12,"column":0},"end":{"line":14,"column":2}},"3":{"start":{"line":13,"column":2},"end":{"line":13,"column":65}}},"branchMap":{}};
}
__cov__e7Lzl0E8wLFDkMVj9uA4g = __cov__e7Lzl0E8wLFDkMVj9uA4g['app/components/tasks/clean.js'];
__cov__e7Lzl0E8wLFDkMVj9uA4g.s['1']++;var del=require('del'),config=require('./config/user'),tasks=require('./config/tasks');__cov__e7Lzl0E8wLFDkMVj9uA4g.s['2']++;module.exports=function(callback){__cov__e7Lzl0E8wLFDkMVj9uA4g.f['1']++;__cov__e7Lzl0E8wLFDkMVj9uA4g.s['3']++;return del([config.paths.clean],tasks.settings.del,callback);};
