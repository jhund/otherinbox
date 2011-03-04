// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*globals SC CoreOI OI Refresher*/
// see loading.rhtml for the main() function

// we want to manage this ourselves, once the startup Ajax has finished
SC.removeLoading = NO ;

function enterApplication() {
  var params = { 
    completionFunction: function() {
      if (OI._initialFlashRecords) {
        OI._parseFlashMessages(OI._initialFlashRecords) ;
      }
      
      CoreOI.startRefreshTimer() ;
      CoreOI.startFlushTimer() ;
      CoreOI.startPerformanceTimer() ;
    }
  };
  
  // var json = SC.json.decode(OIRequest.responseText) ;
  var json = {
    currentAt: Date.now()
  };
  Refresher.processJson(json, params, YES) ;
  
  // set up controllers
  var folders = CoreOI.store.find(SC.Query.create({
    recordType: CoreOI.Folder,
    orderBy: 'order ASC'
  }));
  OI.foldersController.set('content', folders) ;
  
  var user = CoreOI.get('user') ;
  OI.userController.set('content', user) ;
  
  // install our chrome updating function to run when necessary
  OI.registerChromeObservers() ;
  
  // let's get our SproutCore app running for real!
  OI.goState('a', 1) ;
  OI.goState('b', 1) ;
  OI.goState('c', 1) ;
  OI.goState('d', 1) ;
  OI.goState('e', 1) ;
  
  // give our statechart a chance to respond to controller changes
  OI.registerStatechartObservers() ;
}
