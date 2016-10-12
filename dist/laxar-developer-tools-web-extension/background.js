/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

 /* global chrome */

chrome.runtime.onMessage.addListener( function( request ) {
   'use strict';
   if( request.active ) {
      chrome.pageAction.show( request.id );
   }
   else {
      chrome.pageAction.hide( request.id );
   }
} );
