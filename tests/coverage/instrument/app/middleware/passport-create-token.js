
var __cov_DFR4tS7maoFa7m1eVTYnog = (Function('return this'))();
if (!__cov_DFR4tS7maoFa7m1eVTYnog.__coverage__) { __cov_DFR4tS7maoFa7m1eVTYnog.__coverage__ = {}; }
__cov_DFR4tS7maoFa7m1eVTYnog = __cov_DFR4tS7maoFa7m1eVTYnog.__coverage__;
if (!(__cov_DFR4tS7maoFa7m1eVTYnog['app/middleware/passport-create-token.js'])) {
   __cov_DFR4tS7maoFa7m1eVTYnog['app/middleware/passport-create-token.js'] = {"path":"app/middleware/passport-create-token.js","s":{"1":0,"2":1,"3":0,"4":0},"b":{},"f":{"1":0},"fnMap":{"1":{"name":"createToken","line":9,"loc":{"start":{"line":9,"column":0},"end":{"line":9,"column":28}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":2,"column":39}},"2":{"start":{"line":9,"column":0},"end":{"line":13,"column":1}},"3":{"start":{"line":10,"column":5},"end":{"line":12,"column":8}},"4":{"start":{"line":14,"column":0},"end":{"line":14,"column":29}}},"branchMap":{}};
}
__cov_DFR4tS7maoFa7m1eVTYnog = __cov_DFR4tS7maoFa7m1eVTYnog['app/middleware/passport-create-token.js'];
__cov_DFR4tS7maoFa7m1eVTYnog.s['1']++;var jwt=require('jsonwebtoken'),secrets=require('../config/secrets');function createToken(email){__cov_DFR4tS7maoFa7m1eVTYnog.f['1']++;__cov_DFR4tS7maoFa7m1eVTYnog.s['3']++;return jwt.sign({email:email},secrets.apiToken,{expiresIn:'14d'});}__cov_DFR4tS7maoFa7m1eVTYnog.s['4']++;module.exports=createToken;
