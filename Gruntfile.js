// GruntFile.js
'use strict';

module.exports = function(grunt)
{

  // load-grunt-tasks: Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // time-grunt: Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var properties =
  {
    app : 'app',
    dist : 'dist',
    deployFolder : '/var/www/appsgo'
  };

  // Define the configuration for all the tasks
  grunt.initConfig(
  {

    config : properties,

    // grunt-autoprefixer: Add vendor prefixed styles
    autoprefixer :
    {
      options :
      {
        browsers :
          [ 'last 1 version' ]
      },
      dist :
      {
        files :
          [
          {
            expand : true,
            cwd : '.tmp/styles/',
            src : '{,*/}*.css',
            dest : '.tmp/styles/'
          } ]
      }
    },

    // grunt-google-cdn: Replace Google CDN references
    cdnify :
    {
      dist :
      {
        html :
          [ '<%= config.dist %>/*.html' ]
      }
    },

    // grunt-contrib-clean: empties folders to start fresh
    clean :
    {
      dist : ['<%= config.dist %>'],
      server : ['.tmp']
    },

    // grunt-concurrent: Run some tasks in parallel to speed up the build
    // process
    concurrent :
    {
      server :
        [ 'copy:styles' ],
      test :
        [ 'copy:styles' ],
      dist :
        [ 'copy:styles', 'imagemin', 'svgmin' ]
    },

    // grunt-contrib-connect: The actual grunt server settings
    connect :
    {
      options :
      {
        port : 9000,
        hostname : 'localhost',
        livereload : 35729
      },

      livereload :
      {
        options :
        {
          open : true,
          middleware : function(connect)
          {
            return [connect.static('.tmp'),
               connect().use('/bower_components',
               connect.static('./bower_components')),
               connect.static(properties.app)
              ];
          }
        }
      },

      test :
      {
        options :
        {
          port : 9001,
          middleware : function(connect)
          {
            return [connect.static('.tmp'),
             connect().use('/bower_components',
             connect.static('./bower_components')),
             connect.static(properties.app)
            ];
          }
        }
      },

      dist :
      {
        options :
        {
          open : true,
          base : '<%= config.dist %>'
        }
      }
    },

    // grunt-contrib-copy: Copies remaining files to places other tasks can use
    copy :
    {
      dist :
      {
        files :
          [
              {
                expand : true,
                dot : true,
                cwd : '<%= config.app %>',
                dest : '<%= config.dist %>',
                src :
                  [ '*.{ico,png,txt}', '.htaccess', '*.html',
                      'views/{,*/}*.html', 'images/{,*/}*.{webp}', 'fonts/*',
                      'themes/*']
              },
              {
                expand : true,
                cwd : '.tmp/images',
                dest : '<%= config.dist %>/images',
                src :
                  [ 'generated/*' ]
              },
              {
                expand : true,
                cwd : 'bower_components/bootstrap/dist',
                src : 'fonts/*',
                dest : '<%= config.dist %>'
              } ]
      },
      styles :
      {
        expand : true,
        cwd : '<%= config.app %>/styles',
        dest : '.tmp/styles/',
        src : '{,*/}*.css'
      }
    },

    // grunt-filerev: Renames files for browser caching purposes
    filerev :
    {
      dist :
      {
        src :
          [ '<%= config.dist %>/scripts/{,*/}*.js',
              '<%= config.dist %>/styles/{,*/}*.css',
              '<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
              '<%= config.dist %>/styles/fonts/*' ]
      }
    },

    // grunt-contrib-htmlmin: Minify HTML
    htmlmin :
    {
      dist :
      {
        options :
        {
          collapseWhitespace : false,
          conservativeCollapse : false,
          collapseBooleanAttributes : true,
          removeCommentsFromCDATA : false,
          removeOptionalTags : true
        },
        files :
          [
          {
            expand : true,
            cwd : '<%= config.dist %>',
            src :
              [ '*.html', 'views/{,*/}*.html' ],
            dest : '<%= config.dist %>'
          } ]
      }
    },

    // grunt-contrib-imagemin: Minify images.
    imagemin :
    {
      dist :
      {
        files :
          [
          {
            expand : true,
            cwd : '<%= config.app %>/images',
            src : '{,*/}*.{png,jpg,jpeg,gif}',
            dest : '<%= config.dist %>/images'
          } ]
      }
    },

    // grunt-contrib-jshint: Make sure code styles are up to par and there are
    // no obvious mistakes
    jshint :
    {
      options :
      {
        jshintrc : '.jshintrc',
        laxbreak : true,
        reporter : require('jshint-stylish')
      },

      all :
      {
        src :
          [ 'Gruntfile.js',
            '<%= config.app %>/scripts/app.js',
            '<%= config.app %>/scripts/controllers/currency.js',
            '<%= config.app %>/scripts/controllers/iot.js',
            '<%= config.app %>/scripts/controllers/main.js',
            '<%= config.app %>/scripts/controllers/unit.js',
            '<%= config.app %>/scripts/services/utility.js'
//            '<%= config.app %>/scripts/highcharts-ng.js'
            ]
      },

      test :
      {
        options :
        {
          jshintrc : 'test/.jshintrc'
        },
        src :
          [ 'test/spec/{,*/}*.js' ]
      }
    },

    // grunt-karma: Test settings
    karma :
    {
      unit :
      {
        configFile : 'test/karma.conf.js',
        singleRun : true
      }
    },

    // grunt-ng-annotate: annotate tries to make the code safe for
    // minification automatically by using the Angular long form for
    // dependency injection.
    ngAnnotate :
    {
      dist :
      {
        files :
          [
          {
            expand : true,
            cwd : '.tmp/concat/scripts',
            src :
              [ '*.js', '!oldieshim.js' ],
            dest : '.tmp/concat/scripts'
          } ]
      }
    },

    // grunt-ssh (secret): don't keep passwords in source control
    secret : grunt.file.readJSON('secret.json'),

    // grunt-ssh (sftp): copy files to remote server
    sftp :
    {
      copy :
      {
        files :
        {
            './': '<%= config.dist %>/**'
        },
        options :
        {
          srcBasePath: '<%= config.dist %>/',
          path : '<%= config.deployFolder %>/',
          host : '<%= secret.host %>',
          port : '<%= secret.port %>',
          username : '<%= secret.username %>',
          password : '<%= secret.password %>',
          createDirectories: true,
          directoryPermissions: parseInt(755, 8),
          showProgress: true
        }
      }
    },

    // grunt-ssh: clean remote server files
    sshexec :
    {
      clean :
      {
        // command to run on Rubens' VM server (softlagos.com)
        command : 'cd <%= config.deployFolder %> && rm -fr *'
      },
      options :
      {
        host : '<%= secret.host %>',
        port : '<%= secret.port %>',
        username : '<%= secret.username %>',
        password : '<%= secret.password %>',
        showProgress : true
      }
    },

    // grunt-svgmin: Minify SVG using SVGO
    svgmin :
    {
      dist :
      {
        files :
          [
          {
            expand : true,
            cwd : '<%= config.app %>/images',
            src : '{,*/}*.svg',
            dest : '<%= config.dist %>/images'
          } ]
      }
    },

    // grunt-svn-export: SVN export the app sources to dist/src
    svn_export:
    {
      dev:
      {
        options:
        {
          bin: 'svn',
          repository: '<%= config.app %>',
          output: '<%= config.dist %>/src'
        }
      }
    },

    // grunt-usemin: Performs rewrites based on filerev and the useminPrepare
    // configuration
    usemin :
    {
      html :
        [ '<%= config.dist %>/{,*/}*.html' ],
      css :
        [ '<%= config.dist %>/styles/{,*/}*.css' ],
      options :
      {
        assetsDirs :
          [ '<%= config.dist %>', '<%= config.dist %>/images' ]
      }
    },

    // grunt-usemin: Reads HTML for usemin blocks to enable smart builds that
    // automatically concat, minify and revision files. Creates configurations
    // in memory so additional tasks can operate on them
    useminPrepare :
    {
      html : '<%= config.app %>/index.html',
      options :
      {
        dest : '<%= config.dist %>',
        flow :
        {
          html :
          {
            steps :
            {
              // grunt-contrib-concat : Concatenates JS files
              // grunt-contrib-uglify : Minify JS files.
              js :
                [ 'concat', 'uglifyjs' ],
              // grunt-contrib-cssmin: Compress CSS files
              css :
                [ 'cssmin' ]
            },
            post :
            {}
          }
        }
      }
    },

    // grunt-contrib-watch: Watches files for changes and runs tasks based on
    // the changed files
    watch :
    {
      bower :
      {
        files :
          [ 'bower.json' ],
        tasks :
          [ 'wiredep' ]
      },

      js :
      {
        files :
          [ '<%= config.app %>/scripts/{,*/}*.js' ],
        tasks :
          [ 'newer:jshint:all' ],
        options :
        {
          livereload : '<%= connect.options.livereload %>'
        }
      },

      jsTest :
      {
        files :
          [ 'test/spec/{,*/}*.js' ],
        tasks :
          [ 'newer:jshint:test', 'karma' ]
      },

      styles :
      {
        files :
          [ '<%= config.app %>/styles/{,*/}*.css' ],
        tasks :
          [ 'newer:copy:styles', 'autoprefixer' ]
      },

      gruntfile :
      {
        files :
          [ 'Gruntfile.js' ]
      },

      livereload :
      {
        options :
        {
          livereload : '<%= connect.options.livereload %>'
        },
        files :
          [ '<%= config.app %>/{,*/}*.html', '.tmp/styles/{,*/}*.css',
              '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}' ]
      }
    },

    // grunt-wiredep: Automatically inject Bower components into the app
    wiredep :
    {
      app :
      {
        src :
          [ '<%= config.app %>/index.html' ],
        ignorePath : /\.\.\//
      }
    }

  });

  grunt.registerTask('build',
    [ 'clean:dist', 'wiredep', 'useminPrepare', 'concurrent:dist',
        'autoprefixer', 'concat', 'ngAnnotate', 'copy:dist', 'cdnify',
        'cssmin', 'uglify', 'filerev', 'usemin', 'htmlmin' ]);

  grunt.registerTask('buildDev',
    [ 'clean:dist', 'wiredep', 'autoprefixer', 'ngAnnotate',
        'copy:dist', 'cdnify', 'filerev' ]);

  grunt.registerTask('default',
    [ 'newer:jshint', 'test', 'build' ]);

  grunt.registerTask('deploy',
    [ 'default', 'sshexec:clean', 'sftp:copy' ]);

//  grunt.registerTask('deploy',
//    [ 'default', 'sshexec:clean', 'svn_export:dev', 'sftp:copy' ]);

  grunt.registerTask('serve', 'Compile then start a connect web server',
    function(target)
    {
      if (target === 'dist')
      {
        return grunt.task.run([ 'build', 'connect:dist:keepalive' ]);
      }

      grunt.task.run(
        [ 'clean:server', 'wiredep', 'concurrent:server', 'autoprefixer',
            'connect:livereload', 'watch' ]);
    });

  grunt.registerTask('test',
    [ 'clean:server', 'concurrent:test', 'autoprefixer', 'connect:test'
        //'karma'
    ]);

};
