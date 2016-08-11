/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

/* global chrome */

chrome.devtools.panels.create(
   'LaxarJS',
   'laxar-developer-tools-widget/content/includes/widgets/developer-toolbar-widget/default.theme/images/title-icon.png',
   'laxar-developer-tools-widget/content/index.html',
   function( panel ) {
      'use strict';
      var REFRESH_DELAY_MS = 100;
      var getLaxarDeveloperToolsApiInterval;

      panel.onShown.addListener( function( panelWindow ) {

         panelWindow.addEventListener( 'widgetOutline', function() {
            chrome.devtools.inspectedWindow.eval(
               'axDeveloperToolsToggleWidgetOutline(' + JSON.stringify( chrome.runtime.id ) + ')' ,
               { useContentScriptContext: true }
            );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         panelWindow.addEventListener( 'toogleGrid', function( event ) {
            var gridSettings = event.detail;
            chrome.devtools.inspectedWindow.eval(
               'axDeveloperToolsToggleGrid( '+ gridSettings + ', ' +
                                            JSON.stringify( chrome.runtime.id ) + ' )',
               { useContentScriptContext: true }
            );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         getLaxarDeveloperToolsApiInterval = setInterval( function() {
            chrome.devtools.inspectedWindow.eval( 'axDeveloperToolsApi',
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
         if( getLaxarDeveloperToolsApiInterval ) {
            clearInterval( getLaxarDeveloperToolsApiInterval );
         }
      } );
   }
);
