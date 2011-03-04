// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

SC.mixin(OI, {
  
  purchaseServiceURL: function(serviceName) {
    alert("OI.purchaseServiceURL() is not statechart-enabled. Skipping.") ;
    return ;
    
    return "https://%@/purchases/new?service=%@".fmt(window.location.host, serviceName) ;
  },
  
  dateToLongDateString: function(date) {
    return date.format("MMM dd, yyyy hh:mm a");
  },
  
  dateToShortDateString: function(date) {
    return date.format("MMM dd, yyyy");
  }
  
});
