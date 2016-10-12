/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

/* global chrome */

var ICON_PATH = 'laxar-developer-tools-widget/content/includes/widgets/developer-toolbar-widget/' +
                'default.theme/images/title-icon.png';

var WIDGET_CONTENT_PATH ='laxar-developer-tools-widget/content/index.html';

chrome.devtools.panels.create(
   'LaxarJS',
   ICON_PATH,
   WIDGET_CONTENT_PATH,

   function( panel ) {
      'use strict';
      var REFRESH_DELAY_MS = 100;
      var getLaxarDeveloperToolsApiInterval;

      panel.onShown.addListener( function( panelWindow ) {
         chrome.storage.local.set( { 'laxar-developer-tools': 'activate' }, function() { } );
         chrome.devtools.inspectedWindow.eval( 'laxarDeveloperToolsExtensionLoaded', function( value ) {
            value = true;
         } );

         panelWindow.addEventListener( 'widgetOutline', function() {
            chrome.devtools.inspectedWindow.eval(
               'axDeveloperToolsToggleWidgetOutline()',
               { useContentScriptContext: true }
            );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         panelWindow.addEventListener( 'toogleGrid', function( event ) {
            var gridSettings = event.detail;
            chrome.devtools.inspectedWindow.eval(
               'axDeveloperToolsToggleGrid( '+ gridSettings + ' )',
               { useContentScriptContext: true }
            );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         getLaxarDeveloperToolsApiInterval = setInterval( function() {
            chrome.devtools.inspectedWindow.eval( 'laxarDeveloperToolsApi',
               function( axDeveloperToolsApi, isException ) {
                  var event;
                  if( isException ) {
                     event = new CustomEvent( 'message', {
                        detail: JSON.stringify( { text: 'noLaxarDeveloperToolsApi' } )
                     } );
                     panelWindow.dispatchEvent( event );
                  }
                  else {
                     event = new CustomEvent( 'message', {
                        detail: JSON.stringify( axDeveloperToolsApi )
                     } );
                     panelWindow.dispatchEvent( event );
                  }
               }
            );
         }, REFRESH_DELAY_MS );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      panel.onHidden.addListener( function() {
         chrome.storage.local.clear( function() { } );
         if( getLaxarDeveloperToolsApiInterval ) {
            clearInterval( getLaxarDeveloperToolsApiInterval );
         }
      } );
   }
);
