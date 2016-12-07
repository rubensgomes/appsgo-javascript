/*
 * GruntFile.js
 *
 * @author: Rubens Gomes
 */

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
    deployFolder : '/var/www/rubens-gomes/appsgo'
  };

  // Define the configuration for all the tasks
  grunt.initConfig(
  {

    config : properties,

    // grunt-contrib-clean: empties dist folder to start fresh
    clean :
    {
      options: { force: true },
      folder : ['.tmp', '<%= config.dist %>']
    },

    // grunt-contrib-connect: the local grunt server settings
    connect :
    {
      server :
      {
          options :
          {
            base : '<%= config.dist %>',
            debug: true,
            port : 9000,
            hostname : 'localhost',
            livereload : 35729,
            open : true
          }
      }
    },

    // grunt-contrib-copy: Copies HTML, CSS and image files to dist folder
    copy :
    {
      scripts : // used prior to start server locally
      {
          files:[{
            expand : true,
            cwd : '<%= config.app %>',
            dest : '<%= config.dist %>',
            src : [ 'scripts/**/*.js' ]
          }]
      },
      css_html_images:
      {
          files: [{
            expand : true,
            cwd : '<%= config.app %>',
            dest : '<%= config.dist %>',
            // do not copy index.html, it is being handled by string-replace
            src : [ '**/*.{css,html,txt,gif,jpg,png,ico}',
                    '!index.html']
          }]
      },
      deploy_all : // deploy all files
      {
        files : [{
          expand : true,
          cwd : '<%= config.app %>',
          dest : '<%= config.dist %>',
          // do not copy index.html, it is being handled by string-replace
          src : [ '**/*.{js,css,html,txt,gif,jpg,png,ico}',
                  '!index.html']
        }],
      },
      deploy_min : // deploy all files minified
      {
        files : [{
          expand : true,
          cwd : '<%= config.app %>',
          dest : '<%= config.dist %>',
          // do not copy index.html, it is being handled by string-replace
          // do not copy main.css, it is being handled by usemin
          src : [ '**/*.{css,html,txt,gif,jpg,png,ico}',
                  '!index.html',
                  '!styles/main.css']
        }]
      }
    },

    // grunt-filerev: Renames files for browser caching purposes
    filerev :
    {
      dist :
      {
        src :[ '<%= config.dist %>/scripts/{,*/}*.js',
               '<%= config.dist %>/styles/{,*/}*.css',
               '<%= config.dist %>/images/{,*/}*.{gif,jpg,png}']
      }
    },

    // grunt-contrib-jshint: Checks javascript coding styles.
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
        src : [ 'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js',
                '!<%= config.app %>/scripts/third-party/{,*/}*.js']
      }
    },

    // grunt-ssh (secret): don't keep passwords in source control
    secret : grunt.file.readJSON('secret.json'),

    // grunt-string-replace: replace @@BASE@@ in the index.html file
    'string-replace' :
    {
      local :
      {
        files: [{
          src: '<%= config.app %>/index.html',
          dest: '<%= config.dist %>/index.html'
        }],
        options: {
          replacements: [{
            pattern: '@@BASE@@',
            replacement: 'http://localhost:9000/'
          },{
            pattern: '@@CONTEXT_PATH@@',
            replacement: '/'
          }]
        }
      },
      deploy:
      {
        files: [{
          src: '<%= config.app %>/index.html',
          dest: '<%= config.dist %>/index.html'
        }],
        options: {
          replacements: [{
            pattern: '@@BASE@@',
            replacement: 'http://www.rubens-gomes.com/appsgo/'
          },{
            pattern: '@@CONTEXT_PATH@@',
            replacement: '/appsgo/'
          }]
        }
      }
    },

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
        // command to run on Rubens' VM server
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

    // grunt-usemin: Reads HTML for usemin blocks to enable smart builds that
    // automatically concat, minify and revision files.
    useminPrepare :
    {
      html : '<%= config.app %>/index.html',
      options :
      {
        dest : '<%= config.dist %>'
      }
    },

    // grunt-usemin: rewrites based on filerev and useminPrepare configuration
    usemin :
    {
      html : [ '<%= config.dist %>/{,*/}*.html' ],
      options :
      {
        assetsDirs : [ '<%= config.dist %>' ]
      }
    },

    // grunt-contrib-watch: Watches files for changes, runs tasks based on
    // the changed files, and reload server.
    watch :
    {
      scripts :
      {
        files : [ '<%= config.app %>/scripts/{,*/}*.js' ],
        tasks : [ 'newer:jshint:all', 'newer:copy:scripts' ],
        options :
        {
          livereload : '<%= connect.server.options.livereload %>'
        }
      },
      config_files :
      {
        files : [ 'Gruntfile.js' ],
        options :
        {
          reload : true
        }
      },
      css_html_images :
      {
        files : [ '<%= config.app %>/{,*/}*.{css,html,gif,jpg,png}' ],
        tasks : [  'newer:copy:css_html_images' ],
        options :
        {
          livereload : '<%= connect.server.options.livereload %>'
        }
      }
    }
  });

  // build used to start local server
  grunt.registerTask('build',
      [ 'clean',
          'string-replace:local',
          'copy:scripts',
          'copy:css_html_images']);

  // run server locally
  grunt.registerTask('serve',
      [ 'build',
        'connect:server',
        'watch' ]);

  // deployment build all files in clean state (no minification)
  grunt.registerTask('deployAllBuild',
      [ 'clean',
          'string-replace:deploy',
          'copy:deploy_all' ]);
  grunt.registerTask('deploy',
      [ 'deployAllBuild',
          'sshexec:clean',
          'sftp:copy' ]);

  // deployment build with files minified
  grunt.registerTask('deployMinBuild',
      [ 'clean',
          'useminPrepare',
          'string-replace:deploy',
          'copy:deploy_min',
          'concat:generated',
          'cssmin:generated',
          'uglify:generated',
          'filerev',
          'usemin' ]);
  grunt.registerTask('deployMin',
      [ 'deployMinBuild',
          'sshexec:clean',
          'sftp:copy' ]);
};
