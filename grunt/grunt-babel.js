module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-babel');
  grunt.initConfig({
      babel: {
          options: {
              sourceMap: true,
              presets: ['es2015']
          },
          dist: {
              files: {
                  'dest/app.js': 'src/app.js'
              }
          }
      }
  });
  grunt.registerTask('default', ['babel']);
};
