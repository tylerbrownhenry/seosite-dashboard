module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-react');
  grunt.initConfig({
      react: {
        files: {
          expand: true,
          cwd: 'app/react',
          src: ['**/*.jsx'],
          dest: 'public/javascripts/react',
          ext: '.js'
        }
      }
  });
};
