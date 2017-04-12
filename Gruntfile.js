/* global module */

/* global require */
const path = require( 'path' );


module.exports = function( grunt ) {
   'use strict';

   grunt.initConfig( {
      'extension-dist-path': 'dist',
      'extension-src-path': 'src',
      'extension-content-path': 'laxar-developer-tools-content'
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   grunt.registerTask(
      'dist',
      [
         'clean-dist',
         'copy-source-files',
         'delete-unnecessary-content-files'
      ]
   );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   grunt.registerTask( 'copy-source-files', () => {
      const distPath = grunt.config.get( 'extension-dist-path' );
      const srcPath = grunt.config.get( 'extension-src-path' );
      grunt.file.copy( srcPath, distPath );
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   grunt.registerTask( 'delete-unnecessary-content-files', () => {
      const distPath = grunt.config.get( 'extension-dist-path' );
      const contentPath = grunt.config.get( 'extension-content-path' );

      const files = [
         '.babelrc',
         '.git',
         '.editorconfig',
         '.eslintrc.json',
         '.gitignore',
         '.travis.yml',
         'CHANGELOG.md',
         'CONTRIBUTING.md',
         'karma.config.js',
         'LICENSE-MIT',
         'package.json',
         'README.md',
         'webpack.config.js',
         'spec-output',
         'node_modules',
         'debug.html',
         'application/widgets/developer-toolbar-widget/spec',
         'application/widgets/events-display-widget/spec',
         'application/widgets/host-connctor-widget/spec',
         'application/widgets/log-display-widget/spec',
         'application/widgets/page-inspector-widget/spec'
      ];
      files.forEach( filePath => {
         if( grunt.file.exists( path.resolve( distPath, contentPath, filePath ) ) ) {
            const fullPathToFile = path.resolve( distPath, contentPath, filePath );
            grunt.log.writeln( `Deleting file ${fullPathToFile}` );
            grunt.file.delete( fullPathToFile );
         }
      } );
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   /*
    *  Delete the dist output and create an empty dist directory for further creations of dist version
    */

   grunt.registerTask( 'clean-dist', () => {
      const extensionDistPath = grunt.config.get( 'extension-dist-path' );
      grunt.file.delete( extensionDistPath );
      grunt.file.mkdir( extensionDistPath );
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   /*
    *  Some node module in the laxar developer tools content application
    *  have test files with prevent chrome to load the extension
    */
   grunt.registerTask( 'clean-src', () => {
      const files = [
         'src/laxar-developer-tools-content/node_modules/eventsource/test/key.pem',
         'src/laxar-developer-tools-content/node_modules/public-encrypt/test/test_key.pem',
         'src/laxar-developer-tools-content/node_modules/public-encrypt/test/test_rsa_pubkey.pem',
         'src/laxar-developer-tools-content/node_modules/public-encrypt/test/test_rsa_privkey.pem'
      ];
      files.forEach( path => grunt.file.delete( path ) );
   } );

};
