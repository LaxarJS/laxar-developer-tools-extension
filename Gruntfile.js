/* global module */

var path = require( 'path' );

module.exports = function( grunt ) {
   'use strict';

   grunt.initConfig( {
      'extension-dist-path': 'dist/laxar-developer-tools-web-extension',
      'widget-content-path': 'dist/laxar-developer-tools-web-extension/laxar-developer-tools-widget/content'
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   grunt.registerTask( 'dist', [ 'delete-unnecessary-widget-files', 'copy-source-files' ] );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   grunt.registerTask( 'delete-unnecessary-widget-files', function() {
      var widgetPath = 'dist/laxar-developer-tools-web-extension/laxar-developer-tools-widget/';
      var files = [
         '.gitignore',
         '.travis.yml',
         'content/.gitignore',
         'content/.jshintrc',
         'content/var/flows/main/dist/bundle.js.map',
         'content/var/flows/main/dist/default.theme.css.map',
         'content/node_modules',
         'spec',
         'content/includes/widgets/developer-toolbar-widget/spec',
         'content/includes/widgets/events-display-widget/spec',
         'content/includes/widgets/log-display-widget/spec',
         'content/includes/widgets/page-inspector-widget/spec'
      ];

      grunt.file.copy(
         path.resolve( widgetPath, 'content/bower_components/laxar-uikit/dist/themes/default.theme/fonts' ),
         path.resolve( widgetPath, 'tmp/fonts' )
      );
      grunt.file.delete( path.resolve( widgetPath, 'content/bower_components' ) );
      grunt.file.copy(
         path.resolve( widgetPath, 'tmp/fonts' ),
         path.resolve( widgetPath, 'content/bower_components/laxar-uikit/dist/themes/default.theme/fonts' )
      );
      grunt.file.delete( path.resolve( widgetPath, 'tmp' ) );
      files.forEach( function( filepath ) {
         grunt.file.delete( path.resolve( widgetPath, filepath ) );
      } );
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   grunt.registerTask( 'copy-source-files', function() {
      var files = [
         'activate-laxar-connection.js',
         'background.js',
         'createPanel.js',
         'devtools.html',
         'LICENSE',
         'manifest.json'
      ];

      files.forEach( function( filepath ) {
         grunt.file.copy(
            path.resolve( 'src/', filepath ),
            path.resolve( 'dist/laxar-developer-tools-web-extension/', filepath )
         );
      } );
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   grunt.registerTask( 'clean-dist', function() {
      var extensionDistPath = grunt.config.get( 'extension-dist-path' );
      grunt.file.delete( extensionDistPath );
      grunt.file.mkdir( extensionDistPath );
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   grunt.registerTask( 'copy-widget', function() {
      var extensionDistPath = grunt.config.get( 'extension-dist-path' );
      var widgetDistPath = path.resolve( extensionDistPath, 'laxar-developer-tools-widget' );
      var widgetSrcPath = 'src/laxar-developer-tools-widget/';
      grunt.file.copy( widgetSrcPath, widgetDistPath );
      grunt.file.delete( path.resolve( widgetDistPath, '.git' ) );

      var widgetContentPath = grunt.config.get( 'widget-content-path' );
      grunt.file.delete( path.resolve( widgetContentPath, 'bower_components' ) );
   } );


};
