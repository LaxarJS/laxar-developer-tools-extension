chrome.runtime.onMessage.addListener( function( request ) {
   if( request.active ) {
      chrome.pageAction.show( request.id );
   }
   else {
      chrome.pageAction.hide( request.id );
   }
} )
