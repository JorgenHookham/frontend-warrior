'use strict';

module.exports = function (grunt) {
  [
    'grunt-contrib-clean',
    'grunt-contrib-compress',
    'grunt-contrib-connect',
    'grunt-contrib-copy',
    'grunt-contrib-jasmine',
    'grunt-contrib-jshint',
    'grunt-contrib-sass',
    'grunt-contrib-watch',
    'grunt-open'
  ].forEach(grunt.loadNpmTasks);

  var sassFiles = [{
    expand: true,
    cwd: 'app/sass/',
    src: ['**/*.{sass,scss}'],
    dest: '.tmp/styles/',
    ext: '.css'
  }];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'app/js/**/*.js',
        '!app/js/vendor/**/*.js',
        'test/**/*.js'
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
          middleware: function (connect) {
            var path = require('path');
            return [
              connect.static(path.resolve('app')),
              connect.static(path.resolve('.tmp'))
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001
        }
      }
    },
    jasmine: {
      shell: {
        options: {
          specs: ['test/specs/**/*_spec.js'],
          vendor: ['app/js/vendor/**/*.js'],
          outfile: 'test/index.html'
        },
        src: ['app/js/**/*.js', '!app/js/vendor/**/*.js']
      }
    },
    watch: {
      sass: {
        files: ['app/sass/*.{sass,scss}'],
        tasks: ['sass:dev']
      }
    },
    open: {
      server: {
        path: 'http://localhost:9000/'
      },
      test: {
        path: 'http://localhost:9001/test'
      }
    },
    clean: {
      all: ['.tmp', '.grunt', 'test/index.html']
    },
    copy: {
      release: {
        files: [{
          expand: true,
          cwd: 'app',
          dest: 'build',
          src: ['*.html', 'js/**/*', 'images/**/*']
        }, {
          expand: true,
          cwd: '.tmp',
          dest: 'build',
          src: ['styles/*']
        }]
      }
    },
    compress: {
      release: {
        options: {
          archive: '<%= pkg.name %>-<%= pkg.version %>.tar.gz'
        },
        files: [{
          expand: true,
          cwd: 'build',
          src: ['**/*']
        }]
      }
    }
  });

  grunt.registerTask('server', 'Run a server', [
    'jshint',
    'sass:dev',
    'connect:server',
    'open:server',
    'watch'
  ]);

  grunt.registerTask('test', 'Run tests in the console', [
    'jshint',
    'jasmine'
  ]);

  grunt.registerTask('test:browser', 'Run tests in a browser', [
    'jshint',
    'jasmine:shell:build',
    'connect:test',
    'open:test',
    'watch'
  ]);

  grunt.registerTask('version', 'Shows version number', function () {
    var pkg = grunt.file.readJSON('package.json');
    console.log(pkg.name, pkg.version);
  })
};