module.exports = function (grunt) {
     grunt.loadNpmTasks('grunt-contrib-jshint');
     grunt.config.merge({
          jshint: {
               files: ['Gruntfile.js', './app/amqp/**/*.js', './app/api-requests/**/*.js', './public/javascripts/app.js', './server/**/*.js'],
               // files: ['Gruntfile.js', './assets/js/*.js','./src/js/*.js','./tests/**/*.js'],
               //  path: [
               //       './**/*.js'
               //  ],
               //  files: ['Gruntfile.js', './**/*.js'],
               node: true,
               options: {
                    jshintrc: '<%= baseDir %>.jshintrc',
                    //       reporterOutput: "",
                    globals: {
                         jQuery: true,
                         node: true
                    }
               }
          }
     });
};
