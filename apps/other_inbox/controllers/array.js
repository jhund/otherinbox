// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

OI.ArrayController = SC.ArrayController.extend({
  
  _computeNextSelection: function(previousSelection) {
    var currentSelection = this.get('selection');
    
    if (currentSelection && currentSelection.length == 1 && currentSelection[0] != previousSelection[0]) {
      // recompute the adjacent object to select if this one gets deleted
      var nextSelection;
      currentSelection = currentSelection.objectAt(0);
      
      var currentGuid = currentSelection.get('guid');
      var currentPosition,idx;
      var objs = this.get('arrangedObjects');
      var length = objs.get('length');
      
      for (idx=0;idx<length;idx++) {
        if (currentGuid == objs.objectAt(idx).get('guid')) {
          nextSelection = objs.objectAt(idx+1) || objs.objectAt(idx-1);
          break;
        }
      }
      this.set('nextSelection',[nextSelection]);
    }
  }
  
});
