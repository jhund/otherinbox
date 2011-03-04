// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

SC.mixin(OI, {
  
  updateChrome: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        var user = CoreOI.get('user') ;
        var inboxFolder = CoreOI.get('inboxFolder') ;
        
        if (inboxFolder) {
          var dockBadge, primaryDomainName, titleParts = [] ;
          var count = inboxFolder.get('count');
          
          if (count === '0' || count === null) {
            dockBadge = null ;
          } else {
            dockBadge = count ;
            titleParts.push('(%@)'.fmt(count)) ;
          }
          
          primaryDomainName = user.get('primaryDomainName') ;
          
          if (primaryDomainName) {
            titleParts.push(primaryDomainName) ;
          } else {
            titleParts.push('OtherInbox') ;
          }
          
          document.title = titleParts.join(' ') ;
          
          if (window.fluid) { window.fluid.dockBadge = count; }
        }
      }
    }
  },
  
  registerChromeObservers: function() {
    var updateChrome = this.updateChrome ;
    
    // these are the properties we use in our updateChrome() method, so start
    // observing them now for changes...
    CoreOI.get('inboxFolder').addObserver('count', this, updateChrome) ;
    CoreOI.get('user').addObserver('primaryDomainName', this, updateChrome) ;
  }
  
});
