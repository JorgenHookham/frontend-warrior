'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');

  var sassFiles = [{
    expand: true,
    cwd: 'app/sass/',
    src: ['**/*.{sass,scss}'],
    dest: '.tmp/styles/',
    ext: '.css'
  }]

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'app/js/**/*.js',
        '!app/js/vendor/**/*.js'
      ]
    },
    sass: {
      options: {
        cacheLocation: '.tmp/.sass-cache'
      },
      dev: {
        options: {
          style: 'expanded',
          lineComments: true
        },
        files: sassFiles
      },
      prod: {
        options: {
          style: 'compressed'
        },
        files: sassFiles
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'app',
          keepalive: true,
          middleware: function (connect, options) {
            var path = require('path');
            return [
              connect.static(path.resolve('app')),
              connect.static(path.resolve('.tmp'))
            ]
          }
        }
      }
    }
  });
};