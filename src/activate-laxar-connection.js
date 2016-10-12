/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

/* global chrome */

chrome.storage.local.get( 'laxar-developer-tools', function( item ) {
   'use strict';
   if( item[ 'laxar-developer-tools' ] === 'activate' ) {
      document.documentElement.setAttribute( 'data-laxar-developer-tools-extension', '' );
   }
} );
