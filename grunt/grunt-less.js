module.exports = function (grunt) {
     grunt.loadNpmTasks('grunt-contrib-less');
     grunt.config.merge({
          less: {
               development: {
                    options: {
                         paths: './public/*',
                         yuicompress: true
                    },
                    files: {
                         './public/stylesheets/style.css': './public/stylesheets/style.less'
                    }
               },
               production: {
                    options: {
                         paths: ['./public/stylesheets/'],
                         plugins: [
                              new(require('less-plugin-autoprefix'))({
                                   browsers: ["last 2 versions"]
                              }),
                              new(require('less-plugin-clean-css'))()
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
     });
};
