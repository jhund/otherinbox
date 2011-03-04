// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

sc_require('core_timer');

SC.mixin(CoreOI, {
  
  autoRefresh: function(timer) {
   // need to wrap this function since SC.Timer calls autoRefresh with the 
   // timer object, which we don't want to pass to CoreOI.refresh
    CoreOI.refresh() ;
  },
  
  refresh: function(folder,mailbox) {    
    alert("OI.refresh() is not statechart-enabled. Skipping.") ;
    return ;
    
    folder = folder || OI.folderController.get('content') ;
    
    if (folder && !folder.get('isLoading')) {
      var parameters = {
        folder_updated_at: folder.get('lastUpdatedAt').toJSON()
      };
      
      mailbox = mailbox || OI.mailboxController.get('content') ;
      
      if (mailbox) {
        if (mailbox.get('isLoading')) {
          return ;
        } else {
          mailbox.set('isLoading', YES) ;
          parameters.mailbox_id = mailbox.get('guid') ;
          parameters.mailbox_updated_at = mailbox.get('lastUpdatedAt').toJSON() ;
        }
      } else {
        parameters.folder_id = folder.get('guid') ;
      }
      
      CoreOI.pauseRefreshTimer() ;
      folder.set('isLoading', YES) ;
      
      var lastUpdatedAt, notifyParams = {
        completionFunction: CoreOI._completeRefresh,
        mailbox: mailbox,
        folder: folder
      };
      
      Refresher.sendRefreshRequest(params, notifyParams) ;
    }
  },
  
  _completeRefresh: function(request, source, params) {
    alert("OI._completeRefresh() is not statechart-enabled. Skipping.") ;
    return ;
    
    var mailbox = params.mailbox ;
    
    if (mailbox) {
      mailbox.set('isLoading', NO) ;
    }
    
    var folder = params.folder ;
    
    if (folder) {
      folder.set('isLoading', NO) ;
    }
    
    CoreOI.unpauseRefreshTimer() ;
    
    if (!OIXHR.requestIsSuccessful(request)) {
      console.warn("Auto-refresh failed due to: '%@'".fmt(request.get('rawResponse'))) ;
    }
  }
  
});
