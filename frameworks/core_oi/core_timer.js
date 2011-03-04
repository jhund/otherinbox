// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

SC.mixin(CoreOI, {
  
  pauseRefreshTimer: function() {
    alert("CoreOI.pauseRefreshTimer() is not statechart-enabled. Skipping.") ;
    return ;
    
    if (CoreOI._autoRefreshTimer) {
      CoreOI._autoRefreshTimer.set('isPaused', YES) ;
    }
  },
  
  unpauseRefreshTimer: function() {
    alert("CoreOI.unpauseRefreshTimer() is not statechart-enabled. Skipping.") ;
    return ;
    
    if (CoreOI._autoRefreshTimer) {
      CoreOI._autoRefreshTimer.set('isPaused', NO) ;
    }
  },
  
  startRefreshTimer: function() {
    alert("CoreOI.startRefreshTimer() is not statechart-enabled. Skipping.") ;
    return ;
    
    // start the auto refresh timer to run once every 60 seconds, starting 60 
    // seconds from now
    CoreOI._autoRefreshTimer = SC.Timer.schedule({
      target: CoreOI, action: 'autoRefresh',
      interval: 60000,
      repeats: YES
    });
  },
  
  startFlushTimer: function() {
    alert("CoreOI.startFlushTimer() is not statechart-enabled. Skipping.") ;
    return ;
    
    // clear out our cache of messages every 12 hours, as the database only 
    // keeps 14 hours of logs
    CoreOI._performanceReportTimer = SC.Timer.schedule({
      target: CoreOI, action: 'reloadApplication',
      interval: 43200000,
      repeats: YES
    });
  },
  
  startPerformanceTimer: function() {
    alert("CoreOI.startPerformanceTimer() is not statechart-enabled. Skipping.") ;
    return ;
    
    // run the performance reporter every 60 seconds, starting 60 seconds from
    // now
    CoreOI._performanceReportTimer = SC.Timer.schedule({
      target: CoreOI, action: 'sendPerformanceReports', 
      interval: 120000,
      repeats: YES
    });
  }
  
});
