/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

/* global chrome */

const ICON_PATH = 'laxar-developer-tools-content/application/widgets/developer-toolbar-widget' +
                  '/default.theme/images/title-icon.png';

const CONTENT_PATH = 'laxar-developer-tools-content/index.html';

chrome.devtools.panels.create(
   'LaxarJS',
   ICON_PATH,
   CONTENT_PATH,

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
            const gridSettings = event.detail;
            chrome.devtools.inspectedWindow.eval(
               `axDeveloperToolsToggleGrid( ${gridSettings} )`,
               { useContentScriptContext: true }
            );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         getLaxarDeveloperToolsApiInterval = setInterval( () => {

            chrome.devtools.inspectedWindow.eval( 'laxarDeveloperToolsApi',
               ( axDeveloperToolsApi, isException ) => {
                  let event;
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

      panel.onHidden.addListener( () => {
         chrome.storage.local.clear( () => { } );
         if( getLaxarDeveloperToolsApiInterval ) {
            clearInterval( getLaxarDeveloperToolsApiInterval );
         }
      } );
   }
);
