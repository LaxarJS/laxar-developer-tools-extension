/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

/* global chrome */

chrome.storage.onChanged.addListener( function( changes ) {
   'use strict';
   var newValue = changes[ 'laxar-developer-tools' ] && changes[ 'laxar-developer-tools' ].newValue;
   if( newValue && newValue.lastAccess ) {
      document.documentElement.setAttribute( 'data-laxar-developer-tools-extension', newValue.lastAccess );
   }
} );
