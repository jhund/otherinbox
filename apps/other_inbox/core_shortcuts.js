// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('controllers/folders');

SC.mixin(OI, {
  
  // some statechart debugging key commands
  ctrl_s: function(evt) {
    // show all of the current state variables
    this.state.show() ;
  },
  
  ctrl_l: function(evt) {
    // toggle state entry logging on and off
    this.state.toggleProperty('log') ;
  },
  
  ctrl_t: function(evt) {
    // toggle state entry alerts on and off
    this.state.toggleProperty('alert') ;
  },
  
  ctrl_1: function(evt) {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          // select the Inbox folder
          OI.bodyPage.get('folderList').select(0, NO) ;
          this.goState('d', 1) ;
          this.goState('e', 1) ;
          return YES ;
        }
      }
      return NO ; // we didn't handle the event
    }
  },
  
  ctrl_2: function(evt) {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          // select the Saved folder
          OI.bodyPage.get('folderList').select(1, NO) ;
          this.goState('d', 1) ;
          this.goState('e', 1) ;
          return YES ;
        }
      }
      return NO ; // we didn't handle the event
    }
  },
  
  ctrl_3: function(evt) {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          // select the Sent folder
          OI.bodyPage.get('folderList').select(2, NO) ;
          this.goState('d', 1) ;
          this.goState('e', 1) ;
          return YES ;
        }
      }
      return NO ; // we didn't handle the event
    }
  },
  
  ctrl_4: function(evt) {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          // select the Deleted folder
          OI.bodyPage.get('folderList').select(3, NO) ;
          this.goState('d', 1) ;
          this.goState('e', 1) ;
          return YES ;
        }
      }
      return NO ; // we didn't handle the event
    }
  },
  
  ctrl_5: function(evt) {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          // select the Blocked folder
          OI.bodyPage.get('folderList').select(4, NO) ;
          this.goState('d', 1) ;
          this.goState('e', 1) ;
          return YES ;
        }
      }
      return NO ; // we didn't handle the event
    }
  },
  
  moveRight: function(sender, evt) {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          if (state.d === 1) {
            this.goState('d', 2) ;
            // select the first object if there is no selection
            if (OI.messagesController.get('length') > 0 &&
              OI.messagesController.get('selection').get('length') === 0) {
              OI.bodyPage.get('messageList').select(0, NO) ;
            }
            this.goState('f', 1) ;
            return YES ;
          }
        }
      }
      return NO ; // we didn't handle the event
    }
  },
  
  moveLeft: function(sender, evt) {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          if (state.d === 2) {
            this.goState('d', 1) ;
            this.goState('e', 1) ;
            return YES ;
          }
        }
      }
      return NO ; // we didn't handle the event
    }
  }
  
});
