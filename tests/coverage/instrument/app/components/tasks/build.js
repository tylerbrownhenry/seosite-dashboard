
var __cov_axNZ81EE3L_Bxkdpywk1sA = (Function('return this'))();
if (!__cov_axNZ81EE3L_Bxkdpywk1sA.__coverage__) { __cov_axNZ81EE3L_Bxkdpywk1sA.__coverage__ = {}; }
__cov_axNZ81EE3L_Bxkdpywk1sA = __cov_axNZ81EE3L_Bxkdpywk1sA.__coverage__;
if (!(__cov_axNZ81EE3L_Bxkdpywk1sA['app/components/tasks/build.js'])) {
   __cov_axNZ81EE3L_Bxkdpywk1sA['app/components/tasks/build.js'] = {"path":"app/components/tasks/build.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0]},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":26,"loc":{"start":{"line":26,"column":17},"end":{"line":26,"column":36}}}},"statementMap":{"1":{"start":{"line":5,"column":0},"end":{"line":16,"column":1}},"2":{"start":{"line":20,"column":0},"end":{"line":22,"column":1}},"3":{"start":{"line":21,"column":2},"end":{"line":21,"column":37}},"4":{"start":{"line":23,"column":0},"end":{"line":23,"column":37}},"5":{"start":{"line":26,"column":0},"end":{"line":50,"column":2}},"6":{"start":{"line":28,"column":2},"end":{"line":28,"column":36}},"7":{"start":{"line":30,"column":2},"end":{"line":33,"column":3}},"8":{"start":{"line":31,"column":4},"end":{"line":31,"column":86}},"9":{"start":{"line":32,"column":4},"end":{"line":32,"column":13}},"10":{"start":{"line":36,"column":2},"end":{"line":39,"column":3}},"11":{"start":{"line":37,"column":4},"end":{"line":37,"column":28}},"12":{"start":{"line":38,"column":4},"end":{"line":38,"column":11}},"13":{"start":{"line":41,"column":2},"end":{"line":43,"column":3}},"14":{"start":{"line":42,"column":4},"end":{"line":42,"column":28}},"15":{"start":{"line":45,"column":2},"end":{"line":45,"column":33}},"16":{"start":{"line":46,"column":2},"end":{"line":46,"column":26}},"17":{"start":{"line":47,"column":2},"end":{"line":47,"column":29}},"18":{"start":{"line":49,"column":2},"end":{"line":49,"column":31}}},"branchMap":{"1":{"line":20,"type":"if","locations":[{"start":{"line":20,"column":0},"end":{"line":20,"column":0}},{"start":{"line":20,"column":0},"end":{"line":20,"column":0}}]},"2":{"line":30,"type":"if","locations":[{"start":{"line":30,"column":2},"end":{"line":30,"column":2}},{"start":{"line":30,"column":2},"end":{"line":30,"column":2}}]},"3":{"line":36,"type":"if","locations":[{"start":{"line":36,"column":2},"end":{"line":36,"column":2}},{"start":{"line":36,"column":2},"end":{"line":36,"column":2}}]},"4":{"line":36,"type":"binary-expr","locations":[{"start":{"line":36,"column":5},"end":{"line":36,"column":24}},{"start":{"line":36,"column":28},"end":{"line":36,"column":48}}]},"5":{"line":41,"type":"if","locations":[{"start":{"line":41,"column":2},"end":{"line":41,"column":2}},{"start":{"line":41,"column":2},"end":{"line":41,"column":2}}]}}};
}
__cov_axNZ81EE3L_Bxkdpywk1sA = __cov_axNZ81EE3L_Bxkdpywk1sA['app/components/tasks/build.js'];
__cov_axNZ81EE3L_Bxkdpywk1sA.s['1']++;var gulp=require('gulp-help')(require('gulp')),runSequence=require('run-sequence'),config=require('./config/user'),install=require('./config/project/install'),tasks=[];__cov_axNZ81EE3L_Bxkdpywk1sA.s['2']++;if(config.rtl){__cov_axNZ81EE3L_Bxkdpywk1sA.b['1'][0]++;__cov_axNZ81EE3L_Bxkdpywk1sA.s['3']++;require('./collections/rtl')(gulp);}else{__cov_axNZ81EE3L_Bxkdpywk1sA.b['1'][1]++;}__cov_axNZ81EE3L_Bxkdpywk1sA.s['4']++;require('./collections/build')(gulp);__cov_axNZ81EE3L_Bxkdpywk1sA.s['5']++;module.exports=function(callback){__cov_axNZ81EE3L_Bxkdpywk1sA.f['1']++;__cov_axNZ81EE3L_Bxkdpywk1sA.s['6']++;console.info('Building Semantic');__cov_axNZ81EE3L_Bxkdpywk1sA.s['7']++;if(!install.isSetup()){__cov_axNZ81EE3L_Bxkdpywk1sA.b['2'][0]++;__cov_axNZ81EE3L_Bxkdpywk1sA.s['8']++;console.error('Cannot find semantic.json. Run "gulp install" to set-up Semantic');__cov_axNZ81EE3L_Bxkdpywk1sA.s['9']++;return 1;}else{__cov_axNZ81EE3L_Bxkdpywk1sA.b['2'][1]++;}__cov_axNZ81EE3L_Bxkdpywk1sA.s['10']++;if((__cov_axNZ81EE3L_Bxkdpywk1sA.b['4'][0]++,config.rtl===true)||(__cov_axNZ81EE3L_Bxkdpywk1sA.b['4'][1]++,config.rtl==='Yes')){__cov_axNZ81EE3L_Bxkdpywk1sA.b['3'][0]++;__cov_axNZ81EE3L_Bxkdpywk1sA.s['11']++;gulp.start('build-rtl');__cov_axNZ81EE3L_Bxkdpywk1sA.s['12']++;return;}else{__cov_axNZ81EE3L_Bxkdpywk1sA.b['3'][1]++;}__cov_axNZ81EE3L_Bxkdpywk1sA.s['13']++;if(config.rtl=='both'){__cov_axNZ81EE3L_Bxkdpywk1sA.b['5'][0]++;__cov_axNZ81EE3L_Bxkdpywk1sA.s['14']++;tasks.push('build-rtl');}else{__cov_axNZ81EE3L_Bxkdpywk1sA.b['5'][1]++;}__cov_axNZ81EE3L_Bxkdpywk1sA.s['15']++;tasks.push('build-javascript');__cov_axNZ81EE3L_Bxkdpywk1sA.s['16']++;tasks.push('build-css');__cov_axNZ81EE3L_Bxkdpywk1sA.s['17']++;tasks.push('build-assets');__cov_axNZ81EE3L_Bxkdpywk1sA.s['18']++;runSequence(tasks,callback);};