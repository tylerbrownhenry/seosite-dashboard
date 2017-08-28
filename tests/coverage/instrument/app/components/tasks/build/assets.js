
var __cov_NSXzk11NEio_Nq0oWB$2mA = (Function('return this'))();
if (!__cov_NSXzk11NEio_Nq0oWB$2mA.__coverage__) { __cov_NSXzk11NEio_Nq0oWB$2mA.__coverage__ = {}; }
__cov_NSXzk11NEio_Nq0oWB$2mA = __cov_NSXzk11NEio_Nq0oWB$2mA.__coverage__;
if (!(__cov_NSXzk11NEio_Nq0oWB$2mA['app/components/tasks/build/assets.js'])) {
   __cov_NSXzk11NEio_Nq0oWB$2mA['app/components/tasks/build/assets.js'] = {"path":"app/components/tasks/build/assets.js","s":{"1":0,"2":0,"3":0,"4":0},"b":{},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":25,"loc":{"start":{"line":25,"column":17},"end":{"line":25,"column":36}}}},"statementMap":{"1":{"start":{"line":5,"column":0},"end":{"line":23,"column":1}},"2":{"start":{"line":25,"column":0},"end":{"line":35,"column":2}},"3":{"start":{"line":27,"column":2},"end":{"line":27,"column":34}},"4":{"start":{"line":30,"column":2},"end":{"line":33,"column":3}}},"branchMap":{}};
}
__cov_NSXzk11NEio_Nq0oWB$2mA = __cov_NSXzk11NEio_Nq0oWB$2mA['app/components/tasks/build/assets.js'];
__cov_NSXzk11NEio_Nq0oWB$2mA.s['1']++;var gulp=require('gulp'),chmod=require('gulp-chmod'),gulpif=require('gulp-if'),config=require('../config/user'),tasks=require('../config/tasks'),globs=config.globs,assets=config.paths.assets,output=config.paths.output,source=config.paths.source,log=tasks.log;__cov_NSXzk11NEio_Nq0oWB$2mA.s['2']++;module.exports=function(callback){__cov_NSXzk11NEio_Nq0oWB$2mA.f['1']++;__cov_NSXzk11NEio_Nq0oWB$2mA.s['3']++;console.info('Building assets');__cov_NSXzk11NEio_Nq0oWB$2mA.s['4']++;return gulp.src(source.themes+'/**/assets/**/*.*').pipe(gulpif(config.hasPermission,chmod(config.permission))).pipe(gulp.dest(output.themes));};
