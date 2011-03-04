// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

SC.mixin(OI, {
  
  tag: function(tag, enable) {
    alert("OI.tag() is not statechart-enabled. Skipping.") ;
    return ;
    
    var sel = OI.messagesController.get('selection');
    if (!sel || sel.get('length') < 1) { return; }
    
    var method = enable ? "post" : "delete";
    
    var ids = sel.map(function(msg) { return msg.get('guid'); }).join(',');  
    OI._batchUpdateMessages({ url: OI.TAG_URL.fmt(ids), tag: tag, method: method });
  },
  
  flushRecords: function() {
    alert("OI.flushRecords() is not statechart-enabled. Skipping.") ;
    return ;
    
    CoreOI.flushRecords() ;
  },
  
  openMessage: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          if (OI.messagesController.get('hasSingleSelection')) {
            var msg = OI.messagesController.get('selection').firstObject() ;
            window.open(msg.get('s3_html_url'), '_blank') ;
          }
        }
      }
    }
  },
  
  markAllAsRead: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          var selection = SC.SelectionSet.create() ;
          var messages = OI.mailboxController.get('messages') ;
          messages.forEach(function(message, index) {
            if (message.get('isUnread')) {
              selection.add(messages, index, 1) ;
            }
          });
          if (selection.get('length') > 0) {
            CoreOI.markSelectedMessagesAsRead(selection, YES) ;
          }
        }
      }
    }
  },
  
  markAllAsUnread: function() { 
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          var selection = SC.SelectionSet.create() ;
          var messages = OI.mailboxController.get('messages') ;
          messages.forEach(function(message, index) {
            if (!message.get('isUnread')) {
              selection.add(messages, index, 1) ;
            }
          });
          if (selection.get('length') > 0) {
            CoreOI.markSelectedMessagesAsRead(selection, NO) ;
          }
        }
      }
    }
  },
  
  markSelectedAsRead: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          var selection = SC.SelectionSet.create() ;
          var messages = OI.mailboxController.get('messages') ;
          OI.messagesController.get('selection').forEach(function(message, index) {
            if (message.get('isUnread')) {
              selection.add(messages, index, 1) ;
            }
          });
          if (selection.get('length') > 0) {
            CoreOI.markSelectedMessagesAsRead(selection, YES) ;
          }
        }
      }
    }
  },
  
  markSelectedAsUnread: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          var selection = SC.SelectionSet.create() ;
          var messages = OI.mailboxController.get('messages') ;
          OI.messagesController.get('selection').forEach(function(message, index) {
            if (!message.get('isUnread')) {
              selection.add(messages, index, 1) ;
            }
          });
          if (selection.get('length') > 0) {
            CoreOI.markSelectedMessagesAsRead(selection, NO) ;
          }
        }
      }
    }
  },
  
  deleteAll: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          var selection = SC.SelectionSet.create() ;
          var messages = OI.mailboxController.get('messages') ;
          selection.add(messages, 0, messages.get('length')) ;
          if (selection.get('length') > 0) {
            CoreOI.moveSelectedMessagesToFolder(selection, CoreOI.DELETED_FOLDER_ID) ;
          }
        }
      }
    }
  },
  
  deleteSelected: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          var selection = OI.messagesController.get('selection') ;
          if (selection.get('length') > 0) {
            CoreOI.moveSelectedMessagesToFolder(selection, CoreOI.DELETED_FOLDER_ID) ;
          }
        }
      }
    }
  },
  
  blockAll: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          var selection = OI.mailboxesController.get('selection') ;
          if (selection.get('length') === 1) {
            CoreOI.markMailboxAsBlocked(selection.firstObject(), YES) ;
          }
        }
      }
    }
  },
  
  // unblockAll: function() {
  //   var state = this.state ;
  //   if (state.a === 1) {
  //     if (state.b === 1) {
  //       if (state.c === 1) {
  //         var selection = OI.mailboxesController.get('selection') ;
  //         if (selection.get('length') === 1) {
  //           CoreOI.markMailboxAsBlocked(selection.firstObject(), NO) ;
  //         }
  //       }
  //     }
  //   }
  // },
  
  moveToInbox: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          var selection = OI.messagesController.get('selection') ;
          if (selection.get('length') > 0) {
            CoreOI.moveSelectedMessagesToFolder(selection, CoreOI.INBOX_FOLDER_ID) ;
          }
        }
      }
    }
  },
  
  compose: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          if (OI.messagesController.get('hasSingleSelection')) {
            var msg = OI.messagesController.get('selection').firstObject() ;
            window.open('/messages/new?reference_message_id=%@'.fmt(msg.get('guid')), '_blank') ;
          } else {
            window.open('/messages/new', '_blank') ;
          }
        }
      }
    }
  },
  
  reply: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          if (OI.messagesController.get('hasSingleSelection')) {
            var msg = OI.messagesController.get('selection').firstObject() ;
            window.open('/messages/new?reply=true&reference_message_id=%@'.fmt(msg.get('guid')), '_blank') ;
          }
        }
      }
    }
  },
  
  forward: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          if (OI.messagesController.get('hasSingleSelection')) {
            var msg = OI.messagesController.get('selection').firstObject() ;
            window.open('/messages/new?forward=true&reference_message_id=%@'.fmt(msg.get('guid')), '_blank') ;
          }
        }
      }
    }
  },
  
  openMessages: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        OI.goState('c', 1) ;
        OI.goState('d', 1) ;
        OI.goState('e', 1) ;
      }
    }
  },
  
  openCalendar: function() {
    if (OIState === 'Running') {
      window.open('/calendars', '_self') ;
    }
  },
  
  openReceipts: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (CoreOI.get('user').subscribesTo("ParsingService")) {
        window.open('/receipts', '_self') ;
      } else {
        CoreOI.makeComingSoonFlash() ;
      }
    }
  },
  
  openSettings: function() {
    if (OIState === 'Running') {
      window.open('/identity','_self') ;
    }
  },
  
  saveSelected: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          var selection = OI.messagesController.get('selection') ;
          if (selection.get('length') > 0) {
            CoreOI.moveSelectedMessagesToFolder(selection, CoreOI.SAVED_FOLDER_ID) ;
          }
        }
      }
    }
  },
  
  viewAsPlainText: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          if (OI.messagesController.get('hasSingleSelection')) {
            var msg = OI.messagesController.get('selection').firstObject() ;
            window.open('/messages/%@/plain'.fmt(msg.get('guid')), '_blank') ;
          }
        }
      }
    }
  },
  
  goToSignIn: function() {
    alert("OI.goToSignIn() is not statechart-enabled. Skipping.") ;
    return ;
    
    if (CoreOI.serverMode) {
      window.open('/signin','_self');
    } else {
      console.info("Signed out") ;
    }
  },
  
  newMailbox: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        window.open('/mailboxes/new', '_blank') ;
      }
    }
  },
  
  openAdmin: function() {
    var state = this.state ;
    if (state.a === 1) {
      window.open('/admin', '_self') ;
    }
  },
  
  makeNewInvitation: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        window.open('/invitations/new', '_blank', "height=430,width=796,status=no") ;
      }
    }
  },
  
  openHelp: function() {
    var state = this.state ;
    if (state.a === 1) {
      window.open('http://help.otherinbox.com/', '_blank') ;
    }
  }
  
  // undo: function() {
  //   alert("OI.undo() is not statechart-enabled. Skipping.") ;
  //   return ;
  //   
  //   CoreOI.undo() ;
  // }
  
});
