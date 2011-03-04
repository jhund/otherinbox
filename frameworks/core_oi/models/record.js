// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

CoreOI.Record = SC.Record.extend({
  
  // useIsoDate: NO here forces SC to use Date.parse instead
  updatedAt: SC.Record.attr(Date,{ useIsoDate: NO }),
  
  isUpdating: NO,
  pendingChanges: 0,
  
  isStale: function() {
    return this.get('pendingChanges') > 0;
  }.property('pendingChanges'),   // add a .cacheable() to the end of the property call, AND EVERYWHERE!!!!

  markForChange: function(updating) {
    // wrap this with begin property changes/end property changes instead of propertyWillChange
   
    this.set('isUpdating',updating) ;
    this.propertyWillChange('isStale') ; // can get rid of this
    if (updating) {
      this.incrementProperty('pendingChanges') ;
    } else {
      this.decrementProperty('pendingChanges') ;
    }
    this.propertyDidChange('isStale') ;
  }
  
});

CoreOI.Record.coreRecordType = null; // CoreOI.Record is an abstract superclass
