
var __cov_NpwClBjZ2PGHLAe73XzDtg = (Function('return this'))();
if (!__cov_NpwClBjZ2PGHLAe73XzDtg.__coverage__) { __cov_NpwClBjZ2PGHLAe73XzDtg.__coverage__ = {}; }
__cov_NpwClBjZ2PGHLAe73XzDtg = __cov_NpwClBjZ2PGHLAe73XzDtg.__coverage__;
if (!(__cov_NpwClBjZ2PGHLAe73XzDtg['app/components/tasks/build/javascript.js'])) {
   __cov_NpwClBjZ2PGHLAe73XzDtg['app/components/tasks/build/javascript.js'] = {"path":"app/components/tasks/build/javascript.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0},"b":{"1":[0,0]},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"(anonymous_1)","line":42,"loc":{"start":{"line":42,"column":17},"end":{"line":42,"column":36}}},"2":{"name":"(anonymous_2)","line":70,"loc":{"start":{"line":70,"column":15},"end":{"line":70,"column":26}}}},"statementMap":{"1":{"start":{"line":5,"column":0},"end":{"line":37,"column":1}},"2":{"start":{"line":40,"column":0},"end":{"line":40,"column":41}},"3":{"start":{"line":42,"column":0},"end":{"line":77,"column":2}},"4":{"start":{"line":44,"column":2},"end":{"line":48,"column":3}},"5":{"start":{"line":50,"column":2},"end":{"line":50,"column":38}},"6":{"start":{"line":52,"column":2},"end":{"line":55,"column":3}},"7":{"start":{"line":53,"column":4},"end":{"line":53,"column":79}},"8":{"start":{"line":54,"column":4},"end":{"line":54,"column":11}},"9":{"start":{"line":58,"column":2},"end":{"line":75,"column":3}},"10":{"start":{"line":71,"column":6},"end":{"line":71,"column":42}},"11":{"start":{"line":72,"column":6},"end":{"line":72,"column":44}},"12":{"start":{"line":73,"column":6},"end":{"line":73,"column":17}}},"branchMap":{"1":{"line":52,"type":"if","locations":[{"start":{"line":52,"column":2},"end":{"line":52,"column":2}},{"start":{"line":52,"column":2},"end":{"line":52,"column":2}}]}}};
}
__cov_NpwClBjZ2PGHLAe73XzDtg = __cov_NpwClBjZ2PGHLAe73XzDtg['app/components/tasks/build/javascript.js'];
__cov_NpwClBjZ2PGHLAe73XzDtg.s['1']++;var gulp=require('gulp'),console=require('better-console'),fs=require('fs'),chmod=require('gulp-chmod'),flatten=require('gulp-flatten'),gulpif=require('gulp-if'),plumber=require('gulp-plumber'),print=require('gulp-print'),rename=require('gulp-rename'),replace=require('gulp-replace'),uglify=require('gulp-uglify'),config=require('../config/user'),tasks=require('../config/tasks'),install=require('../config/project/install'),globs=config.globs,assets=config.paths.assets,output=config.paths.output,source=config.paths.source,banner=tasks.banner,comments=tasks.regExp.comments,log=tasks.log,settings=tasks.settings;__cov_NpwClBjZ2PGHLAe73XzDtg.s['2']++;require('../collections/internal')(gulp);__cov_NpwClBjZ2PGHLAe73XzDtg.s['3']++;module.exports=function(callback){__cov_NpwClBjZ2PGHLAe73XzDtg.f['1']++;__cov_NpwClBjZ2PGHLAe73XzDtg.s['4']++;var stream,compressedStream,uncompressedStream;__cov_NpwClBjZ2PGHLAe73XzDtg.s['5']++;console.info('Building Javascript');__cov_NpwClBjZ2PGHLAe73XzDtg.s['6']++;if(!install.isSetup()){__cov_NpwClBjZ2PGHLAe73XzDtg.b['1'][0]++;__cov_NpwClBjZ2PGHLAe73XzDtg.s['7']++;console.error('Cannot build files. Run "gulp install" to set-up Semantic');__cov_NpwClBjZ2PGHLAe73XzDtg.s['8']++;return;}else{__cov_NpwClBjZ2PGHLAe73XzDtg.b['1'][1]++;}__cov_NpwClBjZ2PGHLAe73XzDtg.s['9']++;gulp.src(source.definitions+'/**/'+globs.components+'.js').pipe(plumber()).pipe(flatten()).pipe(replace(comments.license.in,comments.license.out)).pipe(gulp.dest(output.uncompressed)).pipe(gulpif(config.hasPermission,chmod(config.permission))).pipe(print(log.created)).pipe(uglify(settings.uglify)).pipe(rename(settings.rename.minJS)).pipe(gulp.dest(output.compressed)).pipe(gulpif(config.hasPermission,chmod(config.permission))).pipe(print(log.created)).on('end',function(){__cov_NpwClBjZ2PGHLAe73XzDtg.f['2']++;__cov_NpwClBjZ2PGHLAe73XzDtg.s['10']++;gulp.start('package compressed js');__cov_NpwClBjZ2PGHLAe73XzDtg.s['11']++;gulp.start('package uncompressed js');__cov_NpwClBjZ2PGHLAe73XzDtg.s['12']++;callback();});};
