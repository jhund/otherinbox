// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

SC.mixin(OI, {
  
  didBecomeFirstResponder: function(responder) {
    var state = this.state ;
    if (responder === OI.bodyPage.get('folderList')) {
      if (state.a === 1) {
        if (state.b === 1) {
          if (state.c === 1) {
            this.goState('d', 1) ;
            this.goState('e', 1) ;
          }
        }
      }
    } else if (responder === OI.bodyPage.get('messageList')) {
      if (state.a === 1) {
        if (state.b === 1) {
          if (state.c === 1) {
            if (state.d === 1) {
              this.goState('d', 2) ;
              this.goState('f', 1) ;
            }
          }
        }
      }
    }
  },
  
  willLoseFirstResponder: function(responder) {
    // nothing for now
  }
  
});
