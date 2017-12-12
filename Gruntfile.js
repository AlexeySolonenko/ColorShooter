'use strict';

module.exports = function(grunt) {
  // var concat = require('./grunt/concat.js');
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    
    //
    // CONCAT CONCAT CONCAT
    concat: {
      options: {
        // banner: '<%= banner %>',
        // stripBanners: true,
      },
      basic:{
        src: ['lib/<%= pkg.name %>.js','lib/*.js'],
        dest: 'dist/<%= pkg.name %>.js', 
      },
      css:{
        src: './app/src/css/*.css',
        dest: './app/tmp/css-concated.css'
      }
    },
    
    //
    // UGLIFY UGLIFY UGLIFY
    uglify: {
      options: {
        // banner: '<%= banner %>'
      },
      bundle1: {
        src: './app/tmp/bundle.min.js',
        dest: './bundle.min.js'
      },
    },
    
    
    // 
    // CSSMIN CSSMIN CSSMIN CSSMIN
    
    cssmin: {
      css1:{
        files:{
          './css.min.css':'./app/tmp/css-concated.css'
        }
      }
    },
    
    //
    // HTMLMIN   HTMLMIN  HTMLMIN
    htmlmin: {                                     // Task 
      dist: {                                      // Target 
        options: {                                 // Target options 
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files 
          './index.min.html': './app/src/index.html'     // 'destination': 'source' 
        }
      }
    },
      // BROWSERIFY BROWSERIFY BROWSERIFY
    browserify: {
      options: {

      },
      bundle1: {
        src: './app/src/js/index.js',
        dest: './app/tmp/bundle.min.js'
      }
  },
    //
    // WATCH WATCH WATCH WATCH WATCH 
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      prod: {
        files: ['./app/src/index.html','./app/src/js/*.js','./app/src/css/*.css'],
        tasks: ['concat:css', 'cssmin:css1', 'browserify:bundle1','uglify:bundle1','htmlmin:dist'  ]
      },
      dev:{
        files: ['./app/src/index.html','./app/src/js/*.js','./app/src/css/*.css'],
        tasks: ['concat:css', 'cssmin:css1', 'browserify:bundle1','copy:dev','htmlmin:dist'  ]
      }
    },

    
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
      },
      test: {
        src: './app/tmp/bundle.min.js',
        dest: './app/tmp/bundle1.js'
      },
    },
    
    copy: {
      dev: {
        src: './app/tmp/bundle.min.js',
        dest: './bundle.min.js'
      }
    },
    
    
    

  });
  
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browserify');
  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit', 'concat', 'uglify']);
  grunt.registerTask('prod', ['concat:css', 'cssmin:css1', 'browserify:bundle1','uglify:bundle1','htmlmin:dist'  ]);
  grunt.registerTask('dev', ['concat:css', 'cssmin:css1', 'browserify:bundle1','copy:dev','htmlmin:dist'  ])
};
