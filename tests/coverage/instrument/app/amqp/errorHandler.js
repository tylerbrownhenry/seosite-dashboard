
var __cov_LF1xVggmDSp7RGXgbqBDzg = (Function('return this'))();
if (!__cov_LF1xVggmDSp7RGXgbqBDzg.__coverage__) { __cov_LF1xVggmDSp7RGXgbqBDzg.__coverage__ = {}; }
__cov_LF1xVggmDSp7RGXgbqBDzg = __cov_LF1xVggmDSp7RGXgbqBDzg.__coverage__;
if (!(__cov_LF1xVggmDSp7RGXgbqBDzg['app/amqp/errorHandler.js'])) {
   __cov_LF1xVggmDSp7RGXgbqBDzg['app/amqp/errorHandler.js'] = {"path":"app/amqp/errorHandler.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0},"b":{"1":[0,0]},"f":{"1":0},"fnMap":{"1":{"name":"closeOnErr","line":7,"loc":{"start":{"line":7,"column":17},"end":{"line":7,"column":52}}}},"statementMap":{"1":{"start":{"line":7,"column":0},"end":{"line":14,"column":2}},"2":{"start":{"line":8,"column":5},"end":{"line":11,"column":6}},"3":{"start":{"line":9,"column":10},"end":{"line":9,"column":36}},"4":{"start":{"line":10,"column":10},"end":{"line":10,"column":23}},"5":{"start":{"line":12,"column":5},"end":{"line":12,"column":22}},"6":{"start":{"line":13,"column":5},"end":{"line":13,"column":17}}},"branchMap":{"1":{"line":8,"type":"if","locations":[{"start":{"line":8,"column":5},"end":{"line":8,"column":5}},{"start":{"line":8,"column":5},"end":{"line":8,"column":5}}]}}};
}
__cov_LF1xVggmDSp7RGXgbqBDzg = __cov_LF1xVggmDSp7RGXgbqBDzg['app/amqp/errorHandler.js'];
__cov_LF1xVggmDSp7RGXgbqBDzg.s['1']++;module.exports=function closeOnErr(amqpConn,err){__cov_LF1xVggmDSp7RGXgbqBDzg.f['1']++;__cov_LF1xVggmDSp7RGXgbqBDzg.s['2']++;if(!err){__cov_LF1xVggmDSp7RGXgbqBDzg.b['1'][0]++;__cov_LF1xVggmDSp7RGXgbqBDzg.s['3']++;console.log('error',err);__cov_LF1xVggmDSp7RGXgbqBDzg.s['4']++;return false;}else{__cov_LF1xVggmDSp7RGXgbqBDzg.b['1'][1]++;}__cov_LF1xVggmDSp7RGXgbqBDzg.s['5']++;amqpConn.close();__cov_LF1xVggmDSp7RGXgbqBDzg.s['6']++;return true;};
