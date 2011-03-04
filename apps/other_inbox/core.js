// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

OI = SC.Object.create(SC.Statechart, SC.CollectionViewDelegate, {
  
  // Application
  goStateA1: function() {
    // document.title delegated to state B
    
    // uses the same main pane as Sign Out, currently
    var pane = OI.bodyPage.get('mainPane') ;
    if (!pane.get('isAttached')) pane.append() ;
  },
  
  // Sign Out
  goStateA2: function() {
    document.title = "_OtherInbox - Sign Out".loc() ;
    
    // uses the same main pane as Application, currently
    var pane = OI.bodyPage.get('mainPane') ;
    if (!pane.get('isAttached')) pane.append() ;
    
    // FIXME need to show the sign out UI!
  },
  
  // Messages
  goStateB1: function() {
    // document.title is handled by the updateChrome() method:
    this.updateChrome() ; // make sure it runs when we switch here
  },
  
  // Receipts (placeholder)
  goStateB2: function() {
    document.title = "_OtherInbox - Receipts".loc() ;
    alert("goStateB1 not implemented.") ;
  },
  
  // Coupons (placeholder)
  goStateB3: function() {
    document.title = "_OtherInbox - Coupons".loc() ;
    alert("goStateB1 not implemented.") ;
  },
  
  // Calendar (placeholder)
  goStateB4: function() {
    document.title = "_OtherInbox - Calendar".loc() ;
    alert("goStateB1 not implemented.") ;
  },
  
  // Focus
  goStateC1: function() {
    // alert("goStateC1 not implemented.") ;
  },
  
  // Reload
  goStateC2: function() {
    alert("goStateC2 not implemented.") ;
  },
  
  // Error
  goStateC3: function() {
    alert("goStateC3 not implemented.") ;
  },
  
  // Mailbox (drag)
  goStateC4: function() {
    alert("goStateC4 not implemented.") ;
  },
  
  // Messages (drag)
  goStateC5: function() {
    alert("goStateC5 not implemented.") ;
  },
  
  // Mailboxes
  goStateD1: function() {
    // alert("entering goStateD1") ;
    OI.bodyPage.get('mailboxList').becomeFirstResponder() ;
  },
  
  // Messages
  goStateD2: function() {
    // alert("entering goStateD2") ;
    OI.bodyPage.get('messageList').becomeFirstResponder() ;
  },
  
  // Examine Folder Mailboxes (transient)
  goStateE1: function() {
    // var mailboxes = this.folderController.get('mailboxes') ;
    // if (!mailboxes) {
    //   this.goState('e', 2) ; // we're loading for sure!
    // } else {
    //   if (mailboxes.get('length') === 0) {
    //     if (mailboxes.get('queryKey').get('isLoading')) {
    //       this.goState('e', 2) ;
    //     } else {
    //       this.goState('e', 3) ;
    //     }
    //   } else {
    //     var guid = this.folderController.get('guid') ;
    //     var sel = this.selectedMailbox[guid] ;
    //     if (sel && mailboxes.indexOf(sel) !== -1) {
    //       // use previous selection
    //       OI.bodyPage.get('mailboxList').select(sel, NO) ;
    //     } else {
    //       // select the first mailbox (and remember that we did)
    //       this.selectedMailbox[guid] = mailboxes.firstObject() ;
    //       OI.bodyPage.get('mailboxList').select(0, NO) ;
    //     }
    //     this.goState('e', 4) ;
    //   }
    // }
  },
  
  // Loading Mailboxes
  goStateE2: function() {
    alert("goStateE2 not implemented.") ;
  },
  
  // Folder Has No Mailboxes
  goStateE3: function() {
    alert("goStateE3 not implemented.") ;
  },
  
  // Mailbox Selected
  goStateE4: function() {
    alert("goStateE4 not implemented.") ;
  },
  
  // Examine Mailbox Messages (transient)
  goStateF1: function() {
    // var messages = this.mailboxController.get('messages') ;
    // if (!messages || messages.get('queryKey').get('isLoading')) {
    //   this.goState('f', 2) ; // we're loading for sure!
    // } else {
    //   var guid = this.mailboxController.get('guid') ;
    //   if (this.prefetch) {
    //     if (this.mailboxController.get('unreadCount') === 0) {
    //       throw new Error("prefetch should be NO since mailbox %@ has no unread messages".fmt(guid)) ;
    //     }
    //     // set the previous selection to the first unread message, then select it
    //     var idx, obj, len = messages.get('length') ;
    //     for (idx=0; idx<len; ++idx) {
    //       obj = message.objectAt(idx) ;
    //       if (obj.get('isUnread')) break ;
    //     }
    //     if (idx === len) { // didn't find one but should have
    //       throw new Error("mailbox %% unreadCount does not match count of unread messages".fmt(guid)) ;
    //     }
    //     var sel = [messages[idx]] ;
    //     this.selectedMessages[guid] = sel ; // save as previous selection
    //     OI.bodyPage.get('messageList').select(idx, NO) ;
    //   } else if (OI.bodyPage.getPath('messageList.selection.length') === 0) {
    //     var sel = this.selectedMessages[guid] ;
    //     if (sel) {
    //       var newSel = [], idxSet = SC.IndexSet.create(),
    //           idx, obj, len = sel.get('length') ;
    //       for (idx=0; idx<len; ++idx) {
    //         obj = sel[idx] ;
    //         if (messages.indexOf(obj) !== -1) {
    //           newSel.push(obj) ;
    //           idxSet.add(idx, 1) ;
    //         }
    //       }
    //       if (newSel.length > 0) {
    //         this.selectedMessages[guid] = newSel ;
    //         OI.bodyPage.get('messageList').select(idxSet, NO) ;
    //       } else {
    //         this.selectedMessages[guid] = [messages.firstObject()] ;
    //         OI.bodyPage.get('messageList').select(0, NO) ;
    //       }
    //     } else {
    //       this.selectedMessages[guid] = [messages.firstObject()] ;
    //       OI.bodyPage.get('messageList').select(0, NO) ;
    //     }
    //     this.goState('f', 4) ;
    //   } else {
    //     var sel = OI.bodyPage.getPath('messageList.selection') ;
    //     var newSel = [] ;
    //     sel.forEach(function(obj) {
    //       newSel.push(obj) ;
    //     });
    //     this.selectedMessages[guid] = newSel ;
    //     // objects are already selected in the UI
    //     this.goState('f', 4) ;
    //   }
    // }
  },
  
  // Loading Messages
  goStateF2: function() {
    alert("goStateF2 not implemented.") ;
  },
  
  // No Selection
  goStateF3: function() {
    alert("goStateF3 not implemented.") ;
  },
  
  // Message Selected
  goStateF4: function() {
    console.log("goStateF4 not implemented.") ;
  }
  
});
