module.exports = function (grunt) {
     grunt.loadNpmTasks('grunt-benchmark');
     grunt.initConfig({
          benchmark: {
               all: {
                    src: ['tests/benchmarks/*.js'],
                    dest: 'tests/benchmarks/results.json',
                    options: {
                         format: 'json'
                    }
               }
          }
     });
};
