module.exports = function (grunt) {
     grunt.loadNpmTasks('grunt-jsdoc');
     grunt.initConfig({
          jsdoc: {
              //  dist: {
                    src: ['Gruntfile.js', './app/**/*.js', './public/javascripts/app.js', 'README.md'],
                    options: {
                         destination: 'doc',
                         //template : "node_modules/ink-docstrap/template",
                         template: "node_modules/minami",
                         // template: "node_modules/docdash",
                         configure: ".jsdoc.conf.json"
                    }
              //  }
          }
     });
};
