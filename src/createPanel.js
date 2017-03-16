/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

/* global chrome */

const ICON_PATH = 'laxar-developer-tools-widget/content/widgets/developer-toolbar-widget/' +
                'default.theme/images/title-icon.png';

const WIDGET_CONTENT_PATH = 'laxar-developer-tools-widget/content/debug.html';

chrome.devtools.panels.create(
   'LaxarJS',
   ICON_PATH,
   WIDGET_CONTENT_PATH,

   panel => {
      'use strict';
      const REFRESH_DELAY_MS = 200;
      let getLaxarDeveloperToolsApiInterval;

      panel.onShown.addListener( panelWindow => {

         panelWindow.addEventListener( 'widgetOutline', () => {
            chrome.devtools.inspectedWindow.eval(
               'axDeveloperToolsToggleWidgetOutline()',
               { useContentScriptContext: true }
            );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         panelWindow.addEventListener( 'toogleGrid', event => {
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
                     chrome.storage.local.set( { 'laxar-developer-tools': { lastAccess: Date.now() } } );
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
