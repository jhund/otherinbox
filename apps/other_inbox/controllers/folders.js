// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

OI.foldersController = SC.ArrayController.create({
  
  allowsEmptySelection: NO,
  allowsMultipleSelection: NO,
  
  _routeObserver: function() {
    var sel = this.get('selection');
    
    if (sel) {
      var folder = sel.get('firstObject') ;
      
      if (folder) {
        SC.routes.set('location', folder.get('name')) ;
      }
    }
  }.observes('selection')
  
});
