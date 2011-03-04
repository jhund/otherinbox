// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

SC.mixin(CoreOI, {
  
  undoManager: SC.UndoManager.create(),
  
  pushUndo: function(url, options, method) {
    alert("CoreOI.pushUndo() is not statechart-enabled. Skipping.") ;
    return ;
    
    var options = SC.clone(options) ;
    var currentFolder = OI.folderController.get('content') ;
    
    if (currentFolder) {
      options.message_status_id = currentFolder.get('guid') ;
      options.undo = YES ; // for troubleshooting purposes
      
      var notifyParams = {
        completionFunction:function(request, source, params) {
          if (!OIXHR.requestIsSuccessful(request)) {
            console.warn("Auto-refresh failed due to: '%@'".fmt(request.get('rawResponse')));
          } else {
            var futureFolder = OI.folderController.get('content') ;
            
            if (futureFolder == currentFolder) {
              currentFolder.reload() ;
            } else {
              // OI.foldersController.set('selection',futureFolder);
            }
          }
      }};
      
      var undoFunction = function() {
        switch (method) {
          case 'post':
            OIXHR.sendPost(url, options, notifyParams) ;
            break ;
          case 'put':
            OIXHR.sendPut(url, options, notifyParams) ;
            break ;
          case 'delete':
            OIXHR.sendDelete(url, options, notifyParams) ;
            break ;
        }
      };
      
      this.undoManager.registerUndo(undoFunction,'') ;
    }
  },
  
  undo: function() {
    alert("CoreOI.undo() is not statechart-enabled. Skipping.") ;
    return ;
    
    this.undoManager.undo() ;
  }
  
});
