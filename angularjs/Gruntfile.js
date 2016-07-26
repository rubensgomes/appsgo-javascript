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
    // do not copy index.html because it is being handled by string-replace
    // For deployment builds:
    // - do not copy main.css because it is being handled by usemin
    copy :
    {
      serve :
      {
        files : [{
          expand : true,
          cwd : '<%= config.app %>',
          dest : '<%= config.dist %>',
          src : [ '*.{html,ico,txt}',
                  '!index.html',
                  'images/{,*/}*.{jpg,png}',
                  'scripts/{,*/}*.js',
                  'styles/{,*/}*.css',
                  'themes/{,*/}*.{css,gif,jpg,png}',
                  'views/{,*/}*.html']
         }]
      },
      deploy :
      {
        files : [{
          expand : true,
          dot : true,
          cwd : '<%= config.app %>',
          dest : '<%= config.dist %>',
          src : [ '*.{html,ico,txt}',
                  '!index.html',
                  '.htaccess',
                  'images/{,*/}*.{jpg,png}',
                  'styles/{,*/}*.{css}',
                  '!styles/main.css',
                  'themes/{,*/}*.{css,gif,jpg,png}',
                  'views/{,*/}*.html']
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
      serve :
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
        tasks : [ 'newer:jshint:all' ],
        options :
        {
          livereload : '<%= connect.server.options.livereload %>'
        }
      },
      configFiles :
      {
        files : [ 'Gruntfile.js' ],
        options :
        {
          reload : true
        }
      },
      livereload :
      {
        files : [ '<%= config.app %>/{,*/}*.html',
                  '.tmp/styles/{,*/}*.css',
                  '<%= config.app %>/images/{,*/}*.{gif,jpg,png}' ],
        options :
        {
          livereload : '<%= connect.server.options.livereload %>'
        }
      }
    }

  });

  // build used to start local server
  grunt.registerTask('localBuild',
      [ 'clean',
          'string-replace:serve',
          'copy:serve']);

  // build used for deployment
  grunt.registerTask('deployBuild',
      [ 'clean',
          'useminPrepare',
          'string-replace:deploy',
          'copy:deploy',
          'concat:generated',
          'cssmin:generated',
          'uglify:generated',
          'filerev',
          'usemin']);

  grunt.registerTask('deploy',
      [ 'deployBuild', 'sshexec:clean', 'sftp:copy' ]);

  grunt.registerTask('serve',
      [ 'localBuild', 'connect:server', 'watch' ]);

};
