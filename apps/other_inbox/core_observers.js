// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('controllers/mailboxes');
sc_require('controllers/messages');

SC.mixin(OI, {
  
  registerStatechartObservers: function() {
    var fun = this.folderSelectionDidChange ;
    OI.foldersController.addObserver('selection', this, fun) ;
    
    this.__mailboxesControllers__ = {} ;
    this.__messagesControllers__ = {} ;
    
    this.folderSelectionDidChange() ;
  },
  
  folderSelectionDidChange: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          // must set up selection content observing dynamically
          var sel = this.foldersController.get('selection'),
              old = this.__observedFolderControllerSelection__ ;
          if (old === sel) return ;
          var fun = this.folderSelectionContentDidChange ;
          if (old) old.removeObserver('[]', this, fun) ;
          if (sel) sel.addObserver('[]', this, fun) ;
          this.__observedFolderControllerSelection__ = sel ;
          this.folderSelectionContentDidChange() ;
        }
      }
    }
  },
  
  folderSelectionContentDidChange: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          var folder = this.foldersController.getPath('selection.firstObject') ;
          if (!folder) return ;
          else {
            var guid = folder.get('guid') ;
            // make active the mailboxes controller for the folder, creating it if needed
            var controller = this.__mailboxesControllers__[guid] ;
            if (!controller) {
              controller = this.__mailboxesControllers__[guid] = OI.MailboxesController.create({
                content: folder.get('mailboxes')
              })
            }
            this.set('mailboxesController', controller) ;
            
            // set up the mailboxes controller observing dynamically
            var fun = this.mailboxSelectionDidChange ;
            var fun2 = this.mailboxesDidChange ;
            var old = this.__observedMailboxController__ ;
            if (old !== controller) {
              if (old) {
                old.removeObserver('selection', this, fun) ;
                old.removeObserver('length', this, fun2) ;
                old.removeObserver('[]', this, fun2) ;
              }
              controller.addObserver('selection', this, fun) ;
              controller.removeObserver('length', this, fun2) ;
              controller.removeObserver('[]', this, fun2) ;
              this.__observedMailboxController__ = controller ;
              this.mailboxesDidChange() ;
              this.mailboxSelectionDidChange() ;
            }
            
            var old = this.__observedFolder__ ,
                now = this.foldersController.getPath('selection.firstObject') ;
            if (old !== now) {
              this.__observedFolder__ = now ;
              this.goState('d', 1) ;
              this.goState('e', 1) ;
            }
          }
        }
      }
    }
  },
  
  mailboxesDidChange: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          if (state.d === 1) {
            if (state.e === 2 || state.e === 3) {
              this.goState('e', 1) ;
            }
          }
        }
      }
    }
  },
  
  mailboxSelectionDidChange: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          // must set up selection content observing dynamically
          var sel = this.mailboxesController.get('selection'),
              old = this.__observedMailboxControllerSelection__ ;
          if (old === sel) return ;
          var fun = this.mailboxSelectionContentDidChange ;
          if (old) old.removeObserver('[]', this, fun) ;
          if (sel) sel.addObserver('[]', this, fun) ;
          this.__observedMailboxControllerSelection__ = sel ;
          this.mailboxSelectionContentDidChange() ;
        }
      }
    }
  },
  
  mailboxSelectionContentDidChange: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          var mailbox = this.mailboxesController.getPath('selection.firstObject') ;
          if (!mailbox) return ;
          else {
            var guid = mailbox.get('guid') ;
            // make active the messages controller for the mailbox, creating it if needed
            var controller = this.__messagesControllers__[guid] ;
            if (!controller) {
              controller = this.__messagesControllers__[guid] = OI.MessagesController.create({
                content: mailbox.get('messages')
              })
            }
            this.set('messagesController', controller) ;
            
            // set up the mailboxes controller observing dynamically
            var fun = this.messageSelectionDidChange ;
            var fun2 = this.messagesDidChange ;
            var old = this.__observedMessageController__ ;
            if (old !== controller) {
              if (old) {
                old.removeObserver('selection', this, fun) ;
                old.removeObserver('length', this, fun2) ;
                old.removeObserver('[]', this, fun2) ;
              }
              controller.addObserver('selection', this, fun) ;
              controller.removeObserver('length', this, fun2) ;
              controller.removeObserver('[]', this, fun2) ;
              this.__observedMessageController__ = controller ;
              this.messagesDidChange() ;
              this.messageSelectionDidChange() ;
            }
          }
        }
      }
    }
  },
  
  messagesDidChange: function() {
    // nothing to do for now...
  },
  
  messageSelectionDidChange: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          // must set up selection content observing dynamically
          var sel = this.messagesController.get('selection'),
              old = this.__observedMessageControllerSelection__ ;
          if (old === sel) return ;
          var fun = this.mailboxSelectionContentDidChange ;
          if (old) old.removeObserver('[]', this, fun) ;
          if (sel) sel.addObserver('[]', this, fun) ;
          this.__observedMessageControllerSelection__ = sel ;
          this.messageSelectionContentDidChange() ;
        }
      }
    }
  },
  
  messageSelectionContentDidChange: function() {
    var state = this.state ;
    if (state.a === 1) {
      if (state.b === 1) {
        if (state.c === 1) {
          // nothing to do for now...
        }
      }
    }
  }
  
});
