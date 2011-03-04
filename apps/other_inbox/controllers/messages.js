// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('controllers/array');

OI.MessagesController = OI.ArrayController.extend({
  
  allowsEmptySelection: YES,
  allowsMultipleSelection: YES,
  // contentBinding: 'OI.mailboxController.messages',
  // _autoLoadedMessage: null,
  
  // _isChanging: NO,
  // _readTimer: null,
  
  // _contentNotLoaded: YES,
  
  hasSingleSelection: function() {
    var sel = this.get('selection');
    return sel && sel.get('length') === 1;
  }.property('selection'),
  
  // Returns the _intersection_ of selected tags for all of the selected messages.
  activeTags: function() {
    var sel = this.get('selection');
    var tags = {};
    
    if (sel) { 
      sel.forEach(function(msg) {
        var msgTags = msg.get('tagList');
        
        if (msgTags) {
          var list = msgTags.split(/,\s*/);
          var idx = list.length;
          while (idx--) {
            tags[list[idx]] = true;
          }
        }
      });
    }
  
    return tags;
  }.property('selection') ,
  
  // if the current selection was deleted, try and automatically select the next message
  // (instead of defaulting to the first message); also autoselect any message specified in the URL route
  
  // controllerWillBeginSelecting: function(controller, newSelection) {
  //   if (this._contentNotLoaded) {
  //     var ary = this.get('arrangedObjects');
  //     var ret;
  // 
  //     if (ary && ary.get('length') > 0) {
  // 
  //       if (OI.startupMessageGuid) {
  //         ret = OI.Message.find(OI.startupMessageGuid);
  //       } else {
  //         ret = ary.objectAt(0);
  //       }
  // 
  //       if (ret) {
  //         newSelection = [ret];
  //         this._contentNotLoaded = false;
  //       }
  //     }
  //   } else {
  //     var currentSelection = this.get('selection');
  // 
  //     // check and see if the current selection has been deleted from SC.Store. If so, select the precomputed
  //     // next mailbox
  // 
  //     if (currentSelection && currentSelection.length == 1) {
  //       if (!OI.Message.find(currentSelection.objectAt(0).get('guid'))) {
  //         newSelection = this.get('nextSelection');
  //       }
  //     }
  //   }
  // 
  //   return newSelection;
  // },
  // 
  // controllerDidEndSelecting: function(controller, previousSelection) {
  //   this._computeNextSelection(previousSelection);
  // },

  // contentObserver: function() {
  //   // can't do this with 'allowsEmptySelection: false' because we need to keep track of automatic vs. manual selections
  //   var sel = this.get('selection');
  //
  //   if (sel && sel.get('length') < 1) {
  //     var objects = Array.from(this.get('arrangedObjects')) ;
  //     if (objects.get('length') > 0) {
  //
  //       sel = objects.objectAt(0);
  //
  //       this._autoLoadedMessage = sel;
  //       this.set('selection',[sel]);
  //
  //       if (sel.get('isUnread')) {
  //         var that = this;
  //
  //         // we automatically selected this message, so wait for 3 seconds before marking it as read
  //
  //         that._readTimer = SC.Timer.schedule({
  //           interval: 3000,
  //           action: function() {
  //             that._cancelMarkAsReadTimer();
  //             OI._batchUpdateMessages({ messages: [sel], read: true, dontMarkForChange: true });
  //           },
  //           repeats: NO
  //         });
  //       }
  //     }
  //   }
  // }.observes('content'),
  //
  // selectionObserver: function() {
  //  var sel = this.get('selection');
  //
  //   if (sel && sel.get('length') > 1) {
  //     this._cancelMarkAsReadTimer();
  //   } else if (sel.length == 1) {
  //     sel = sel.objectAt(0);
  //
  //     if (sel != this._autoLoadedMessage && sel.get('isUnread') && !sel.get('dontMarkAsRead')) {
  //       this._cancelMarkAsReadTimer();
  //       OI._batchUpdateMessages({ messages: [sel], read: true, dontMarkForChange: true });
  //     }
  //   }
  // }.observes('selection'),

  // Enables dragging to mailboxes

  collectionViewDragDataTypes: function(view) {
    return [OI.MESSAGE_TYPE];
  },

  // Provide the actual message data for dragging

  collectionViewDragDataForType: function(view, dataType, drag) {
    return (dataType === OI.MESSAGE_TYPE) ? this.get('selection') : null;
  },

  someSelectedUnread: function() {
    var sel = this.get('selection');
    var ret = false;
    
    if (sel) { 
      ret = sel.someProperty('isUnread',true);
    }
    
    return ret;
  }.property('selection'),

  noneSelectedUnread: function() {
    return !this.get('someSelectedUnread');
  }.property('someSelectedUnread'),

  _cancelMarkAsReadTimer: function() {
    if (this._readTimer) {
      this._readTimer.invalidate();
      this._readTimer = null;
        this._autoLoadedMessage = null;
    }
  }

});


// this shouldn't be required, but a bug (in SC) means we need it there for now
OI.messagesController = OI.MessagesController.create({
  contentBinding: 'OI.mailboxController.messages'
});
