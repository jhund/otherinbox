// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('controllers/messages');

SC.mixin(OI, {
  
  collectionViewSelectionForProposedSelection: function(view, sel) {
    var state = this.state ;
    if (view === OI.bodyPage.get('messageList')) {
      if (state.a === 1) {
        if (state.b === 1) {
          if (state.c === 1) {
            if (state.d === 2) {
              if (sel.get('length') === 1) {
                var obj = sel.firstObject() ;
                if (obj.get('isUnread')) {
                    CoreOI.markSelectedMessagesAsRead(sel, YES) ;
                }
              }
            }
          }
        }
      }
    }
    return sel ; // always allow selections
  }
  
});
