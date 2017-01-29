module.exports = function(grunt) {

  grunt.initConfig({
    /* JavaScript Syntax Checker */
    jshint: {
      // files: ['Gruntfile.js', './assets/js/*.js','./src/js/*.js','./tests/**/*.js'],
      files: ['Gruntfile.js', './**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    /* Live Reload */
    watch: {
      // files: ['<%= jshint.files %>','./**/*.less'],
      files: ['Gruntfile.js','./views/**/*.html','./**/*.js','./**/*.ejs','./**/*.less'],
      // tasks: ['jshint','less'],
      tasks: ['less'],
      karma: {
        files: ['tests/**/*.js','assets/js/*.js'],
        tasks: ['karma:unit'] //NOTE the :run flag
      },
       options: {
            livereload: {
             host: 'localhost',
              port: 35729
            }
        }

    },
      express: {
          dev: {
            options: {
              script: 'server.js',
              port: 3000,
              livereload: true
            }
          }
    },
    /* Unit Tests */
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },
        src: ['tests/**/*.spec.js']
      }
    },
    /* CSS Compiler */
    less: {
      development: {
        options: {
          paths: ['./public/stylesheets/'],
          yuicompress: true
        },
        files: {
          'style.css': 'style.less'
        }
      },
      production: {
        options: {
          paths: ['./public/stylesheets/css'],
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
            new (require('less-plugin-clean-css'))()
          ]
          // ,
          // modifyVars: {
          //   imgPath: '"http://mycdn.com/path/to/images"',
          //   bgColor: 'red'
          // }
        },
        files: {
          './public/stylesheets/style.css': './public/stylesheets/style.less'
        }
      }
    }
    /* Browser Tests */
    // karma: {
    //   unit: {
    //     configFile: 'karma.conf.js',
    //     runnerPort: 9999,
    //     singleRun: true,
    //     browsers: ['PhantomJS']
    //   }
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mocha-test');
  // grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('start', ['express:dev','less:development','watch']);
  grunt.registerTask('default', 'watch', function(){
    var tasks = ['express:dev'];
    // var tasks = ['less:production','jshint',/*'mochaTest:test',*/'watch','express'];
    grunt.option('force', true);
    grunt.task.run(tasks);
  });
};