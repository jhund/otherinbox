// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

sc_require('lib/oi_xhr');
sc_require('lib/refresher');

SC.mixin(CoreOI, {
  
  markSelectedMessagesAsRead: function(selection, flag) {
    if (!selection || flag === undefined) return ;
    if (!selection.isSelectionSet) return ; // invalid input
    
    var len = selection.get('length') ;
    if (len === 0) return ; // nothing to do
    
    if (flag) len = -len ;
    
    var firstMessage = selection.firstObject() ;
    if (!firstMessage.instanceOf(CoreOI.Message)) return ; // invalid input
    
    var mailbox = firstMessage.get('mailbox') ;
    if (!mailbox) return ;
    
    var folder = mailbox.get('folder') ;
    if (!folder) return ;
    
    // TODO: once incremental loading is implemented, we'll want a different
    // action so that we don't have to pull messages into the client just
    // to get their guid to send back to the server...
    var url = this.BATCH_UPDATE_URL ;
    var params = {
      message_ids: selection.mapProperty('guid').join(','),
      mailbox_id: mailbox.get('guid'),
      mailbox_updated_at: mailbox.get('updatedAt').toJSON(),
      folder_updated_at: folder.get('updatedAt').toJSON(),
      read: flag,
      advanced: true,
      user_updated_at: CoreOI.lastUpdatedAt.toJSON(),
      authenticity_token: CoreOI._rails_auth_token
    };
    
    //
    // 1. simulate the expected response...
    //
    var hash, val, storeKey,
        status = SC.Record.READY_CLEAN, store = this.store, c ;
    
    // an inbox folder should have its count key decremented by len
    if (folder.get('guid') === this.INBOX_FOLDER_ID) {
      storeKey = folder.get('storeKey') ;
      hash = store.readEditableDataHash(storeKey) ;
      val = new Number(hash.count) ;
      val = val + len ;
      hash.count = val.toString() ;
      store.writeDataHash(storeKey, hash, status) ;
      store.dataHashDidChange(storeKey, null, NO) ;
    }
    
    // the mailbox should have its unreadCount key decremented by len
    storeKey = mailbox.get('storeKey') ;
    hash = store.readEditableDataHash(storeKey) ;
    val = new Number(hash.unreadCount) ;
    val = val + len ;
    hash.unreadCount = val.toString() ;
    store.writeDataHash(storeKey, hash, status) ;
    store.dataHashDidChange(storeKey, null, NO) ;
    
    // each message should now have its unread key set to false
    selection.forEach(function(message) {
      storeKey = message.get('storeKey') ;
      hash = store.readEditableDataHash(storeKey) ;
      hash.unread = flag ? '0' : '1' ;
      store.writeDataHash(storeKey, hash, status) ;
      store.dataHashDidChange(storeKey, null, NO) ;
    });
    
    //
    // 2. ask the server to make it so...
    //
    var ary = mailbox._messages, query ;
    if (ary) query = ary.get('queryKey') ;
    
    SC.Request.putUrl(this._appendQueryString(url, params))
      .notify(this, this._response, {
        query: query,
        selection: selection,
        mailbox: mailbox,
        folder: folder,
        read: flag
      })
      .set('isJSON', YES)
      .send() ;
  },
  
  moveSelectedMessagesToFolder: function(selection, folderId) {
    if (!selection || folderId === undefined) return ;
    if (!selection.isSelectionSet) return ; // invalid input
    
    var len = selection.get('length') ;
    if (len === 0) return ; // nothing to do
    
    var firstMessage = selection.firstObject() ;
    if (!firstMessage.instanceOf(CoreOI.Message)) return ; // invalid input
    
    var mailbox = firstMessage.get('mailbox') ;
    if (!mailbox) return ;
    
    var folder = mailbox.get('folder') ;
    if (!folder) return ;
    
    // TODO: once incremental loading is implemented, we'll want a different
    // action so that we don't have to pull messages into the client just
    // to get their guid to send back to the server...
    var url = this.BATCH_UPDATE_URL ;
    var params = {
      message_ids: selection.mapProperty('guid').join(','),
      mailbox_id: mailbox.get('guid'),
      mailbox_updated_at: mailbox.get('updatedAt').toJSON(),
      folder_updated_at: folder.get('updatedAt').toJSON(),
      message_status_id: folderId,
      advanced: true,
      user_updated_at: CoreOI.lastUpdatedAt.toJSON(),
      authenticity_token: CoreOI._rails_auth_token
    };
    
    //
    // 1. simulate the expected response...
    //
    var hash, val, storeKey,
        status = SC.Record.READY_CLEAN, store = this.store, c ;
    
    // moving *from* an inbox folder should decrement its count key by the
    // number of unread messages being moved
    if (folder.get('guid') === this.INBOX_FOLDER_ID) {
      storeKey = folder.get('storeKey') ;
      hash = store.readEditableDataHash(storeKey) ;
      val = new Number(hash.count) ;
      selection.forEach(function(message) {
        if (message.get('isUnread')) --val ;
      });
      hash.count = val.toString() ;
      store.writeDataHash(storeKey, hash, status) ;
      store.dataHashDidChange(storeKey, null, NO) ;
      
    // moving *to* an inbox folder should increment its count key by the
    // number of unread messages being moved
    } else if (folderId === this.INBOX_FOLDER_ID) {
      storeKey = folder.get('storeKey') ;
      hash = store.readEditableDataHash(storeKey) ;
      val = new Number(hash.count) ;
      selection.forEach(function(message) {
        if (message.get('isUnread')) ++val ;
      });
      hash.count = val.toString() ;
      store.writeDataHash(storeKey, hash, status) ;
      store.dataHashDidChange(storeKey, null, NO) ;
    }
    
    status = SC.Record.EMPTY ;
    
    // the mailbox should be reset if it is now empty
    if (mailbox.getPath('messages.length') === len) {
      storeKey = mailbox.get('storeKey') ;
      store.removeDataHash(storeKey, status) ;
      store.dataHashDidChange(storeKey, null, NO) ;
    }
    
    // each message should be reset as well (they'll be updated when the
    // server returns)
    selection.forEach(function(message) {
      storeKey = message.get('storeKey') ;
      store.removeDataHash(storeKey, status) ;
      store.dataHashDidChange(storeKey, null, NO) ;
    });
    
    //
    // 2. ask the server to make it so...
    //
    var ary = folder._mailboxes, query ;
    if (ary) query = ary.get('queryKey') ;
    
    SC.Request.putUrl(this._appendQueryString(url, params))
      .notify(this, this._response, {
        query: query,
        selection: selection,
        mailbox: mailbox,
        folder: folder,
        moveTo: folderId
      })
      .set('isJSON', YES)
      .send() ;
  },
  
  markMailboxAsBlocked: function(mailbox, flag) {
    if (!mailbox || flag === undefined) return ;
    
    var messages = mailbox.get('messages') ;
    
    var folder = mailbox.get('folder') ;
    if (!folder) return ;
    
    var url = this.STATE_CHANGE_URL.fmt(mailbox.get('guid')) ;
    var params = {
      mailbox_id: mailbox.get('guid'),
      mailbox_updated_at: mailbox.get('updatedAt').toJSON(),
      folder_updated_at: folder.get('updatedAt').toJSON(),
      commit: flag ? 'block' : 'unblock',
      advanced: true,
      user_updated_at: CoreOI.lastUpdatedAt.toJSON(),
      authenticity_token: CoreOI._rails_auth_token
    };
    
    //
    // 1. simulate the expected response...
    //
    var hash, val, storeKey,
        status = SC.Record.READY_CLEAN, store = this.store, c ;
    
    // blocking *from* an inbox folder should decrement its count key by the 
    // number of unread messages in the mailbox being blocked
    if (folder.get('guid') === this.INBOX_FOLDER_ID) {
      storeKey = folder.get('storeKey') ;
      hash = store.readEditableDataHash(storeKey) ;
      val = new Number(hash.count) ;
      messages.forEach(function(message) {
        if (message.get('isUnread')) --val ;
      });
      hash.count = val.toString() ;
      store.writeDataHash(storeKey, hash, status) ;
      store.dataHashDidChange(storeKey, null, NO) ;
      
    // unblocking a mailbox moves all its messages *to* the inbox folder, so
    // we should should increment its count key by the number of unread 
    // messages in the mailbox being unblocked
    } else if (!flag) {
      storeKey = folder.get('storeKey') ;
      hash = store.readEditableDataHash(storeKey) ;
      val = new Number(hash.count) ;
      messages.forEach(function(message) {
        if (message.get('isUnread')) ++val ;
      });
      hash.count = val.toString() ;
      store.writeDataHash(storeKey, hash, status) ;
      store.dataHashDidChange(storeKey, null, NO) ;
    }
    
    status = SC.Record.EMPTY ;
    
    // the mailbox should be reset because it is now empty
    storeKey = mailbox.get('storeKey') ;
    store.removeDataHash(storeKey, status) ;
    store.dataHashDidChange(storeKey, null, NO) ;
    
    // each message should be reset as well (they'll be updated when the
    // server returns)
    messages.forEach(function(message) {
      storeKey = message.get('storeKey') ;
      store.removeDataHash(storeKey, status) ;
      store.dataHashDidChange(storeKey, null, NO) ;
    });
    
    //
    // 2. ask the server to make it so...
    //
    var ary = folder._mailboxes, query ;
    if (ary) query = ary.get('queryKey') ;
    
    SC.Request.putUrl(this._appendQueryString(url, params))
      .notify(this, this._response, {
        query: query,
        mailbox: mailbox,
        folder: folder,
        commit: flag ? 'block' : 'unblock'
      })
      .set('isJSON', YES)
      .send() ;
  },
  
  flushRecords: function() {
    alert("CoreOI.flushRecords() is not statechart-enabled. Skipping.") ;
    return ;
  },
  
  /**
    After 12 hours, we need to reload the application because the server
    doesn't keep transaction-time info older than 14 hours. This is the 
    method called by the timer that ensures that.
  */
  reloadApplication: function() {
    alert("CoreOI.reloadApplication() is not statechart-enabled. Skipping.") ;
    return ;
    
    window.location.reload() ;
  },
  
  /** @private */
  _response: function(request, userData) {
    var json = request.get('response') ;
    Refresher.processJson(json, {
      query: userData.query
    });
  },
  
  /** @private */
  _appendQueryString: function(url, params) {
    // very simple, does not handle arrays or objects, just takes a hashes of simple values
    var name, queryString = [] ;
    for (name in params) {
      if (params.hasOwnProperty(name)) {
        queryString.push("%@=%@".fmt(name,params[name]));
      }
    }
    return [url, queryString.join('&')].join('?') ;
  }
  
});
