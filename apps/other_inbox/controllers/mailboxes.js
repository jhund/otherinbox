// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

OI.MailboxesController = OI.ArrayController.extend({
  
  allowsEmptySelection: NO,
  allowsMultipleSelection: NO,
  // contentBinding: 'OI.folderController.mailboxes'
  // contentNotLoaded: YES // ,
  
  // if the current selection was deleted, try and automatically select the next mailbox 
  // (instead of defaulting to the first mailbox); also autoselect any mailbox specified in the URL route
  
  // controllerWillBeginSelecting: function(controller, newSelection) {
  //   if (this.get('contentNotLoaded')) {
  //     var ary = this.get('arrangedObjects');
  //     var ret;
  //     
  //     if (ary && ary.get('length') > 0) {
  //       if (OI.startupMailboxName) {
  //         ret = OI.Mailbox.find({ name: OI.startupMailboxName });
  //       } else if (OI.startupMailbox) {
  //         ret = OI.startupMailbox;
  //       } else {
  //         ret = ary.objectAt(0);
  //       }
  //       
  //       if (ret) {
  //         newSelection = [ret];
  //         this.set('contentNotLoaded',false);
  //         OI.startupMailboxName = OI.startupMailbox = null;
  //       }
  //     }
  //   } else {
  //     var currentSelection = this.get('selection');
  //   
  //     // check and see if the current selection has been deleted from SC.Store. If so, select the precomputed
  //     // next mailbox
  //     
  //     if (currentSelection && currentSelection.length == 1) {
  //       if (!OI.Mailbox.find(currentSelection.objectAt(0).get('guid'))) {
  //         newSelection = this.get('nextSelection');
  //       }
  //     }
  //   }
  // 
  //   return newSelection;
  // },
  
  // controllerDidEndSelecting: function(controller, previousSelection) {
  //   this._computeNextSelection(previousSelection);
  // },
    
  // Validates drops of messages onto mailboxes.  You can drop messages onto the currently-selected mailbox
  // based on code from the Photos SproutCore sample app
  
  // collectionViewValidateDrop: function(view, drag, dropOperation, proposedInsertionIndex, proposedDragOperation) {
  //   var ret;
  //       
  //   switch(dropOperation) {
  //     
  //     // this is the parameter passed in when the collection view just wants
  //     // to know if the data types provided by the drag are supported.
  //     case SC.DROP_ANY:
  //       ret = drag.hasDataType(OI.MESSAGE_TYPE) ? SC.DRAG_ANY : SC.DRAG_NONE ;
  //       break ;
  //       
  //     // This parameter is called when the collection view thinks we might
  //     // want to drop the item ON a view.
  //     case SC.DROP_ON:
  //       ret = drag.hasDataType(OI.MESSAGE_TYPE) ? SC.DRAG_MOVE : SC.DRAG_NONE ;
  //       
  //       if (ret !== SC.DRAG_NONE) {
  //         var content = this.objectAt(proposedInsertionIndex) ;
  //         var sel = this.get('selection') || [] ;
  // 
  //         // if there is no object at index, do not allow.
  //         if (!content) {
  //           ret = SC.DRAG_NONE;
  //         // do not allow dragging messages to the selected mailbox
  //         } else if (sel.indexOf(content) >= 0) {
  //           ret = SC.DRAG_NONE;
  //         }
  //       }
  //       
  //       break;
  //       
  //     default:
  //       ret = SC.DRAG_NONE ;
  //   }
  //   
  //   return ret;
  // },
  // 
  // // Called by the collection view when the user releases the drop.  Note that
  // // this must already be validated to be called so we don't need to check again.
  // 
  // collectionViewAcceptDrop: function(view, drag, dropOperation, proposedInsertionIndex, dragOperation) {
  //   var msgs = OI.messagesController.get('selection');
  //   var new_mailbox = this.objectAt(proposedInsertionIndex);
  // 
  //   if (dropOperation === SC.DROP_ON && new_mailbox && msgs && msgs.length > 0) { 
  //     OI._batchUpdateMailbox(OI.BATCH_UPDATE_URL,{ message_ids: CoreOI._getMessageIds(msgs), new_mailbox_id: new_mailbox.get('guid') });
  //     
  //     return SC.DRAG_MOVE;
  //   } else {
  //     return SC.DRAG_NONE;
  //   }
  // }
  //   
  
});

// this shouldn't be required, but a bug (in SC) means we need it there for now
OI.mailboxesController = OI.MailboxesController.create({
  contentBinding: 'OI.folderController.mailboxes'
});
