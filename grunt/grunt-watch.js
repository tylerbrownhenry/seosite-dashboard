module.exports = function (grunt) {
     grunt.loadNpmTasks('grunt-contrib-watch');
     grunt.config.merge({
          watch: {
               files: ['Gruntfile.js', './**/*.less', './app/amqp/**/*.js', './tests/**/*.js', './app/api-requests/**/*.js', './public/javascripts/app.js', './public/javascripts/render.js', './server/**/*.js'],
               tasks: ['less:development', 'jshint', 'express:dev'],
               express: {
                    files: ['**/*.js'],
                    tasks: ['express:dev'],
                    options: {
                         spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
                    }
               },
               test: {
                    files: ['Gruntfile.js', './**/*.less', './app/amqp/**/*.js', './tests/**/*.js', './app/api-requests/**/*.js', './public/javascripts/app.js', './public/javascripts/render.js', './server/**/*.js'],
                    tasks: ['mochaTest']
               }
          }
     });
}
