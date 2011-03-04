// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

sc_require('core');
sc_require('models/record');

// define record attributes FOR EVRYTHING

CoreOI.Flash = CoreOI.Record.extend({

  isUpdating: null,
  
  init: function() { this._messageQueue = []; this._lastUpdatedAt = null; },
  
  firstMessage: function () {
    if ( this._messageQueue.length > 0 ) { return this._messageQueue[0]; }
    else { return null; }
  }.property(),

  addMessage: function(text,type) {
    var msg = CoreOI.FlashMessage.create({ message: text, messageType: type });
    this.propertyWillChange('firstMessage');
    this._messageQueue.push(msg);
    this.propertyDidChange('firstMessage');
  },
  
  removeFirstMessage: function() {
    if (this._messageQueue.length > 0) {
      this.propertyWillChange('firstMessage');
      this._messageQueue.shiftObject();
      this.propertyDidChange('firstMessage');
    }
  }
  
  // fetchFlashMessages: function() {
  //   var that = this;
  //   var url = '/flash_records';
  //   if (this._lastUpdatedAt) { url += '&last_updated_at=' + this._lastUpdatedAt.toJSON(); }
  // 
  //   if (CoreOI.serverMode && (this._lastUpdatedAt === null || this._lastUpdatedAt < CoreOI.User.lastUpdatedAt)) {
  //     CoreOI.executeAjax(url, {
  //       method: 'get',
  //       onSuccess: function(transport) {
  //         var now = new Date();
  //         CoreOI.User.lastUpdatedAt = now;
  //         that.lastUpdatedAt = now;
  // 
  //         var ary = CoreOI.jsonHashesToRecords(transport.responseText, CoreOI.FlashMessage);
  //         that.propertyWillChange('firstMessage');
  //         this._messageQueue = ary;
  //         that.propertyDidChange('firstMessage');
  //       }
  //     });
  // 
  //   } else {
  //     this.propertyWillChange('firstMessage');
  //     var newMessages = CoreOI.FlashMessage.findAll();
  //     var len = newMessages.length;
  //     var msgs = this._messageQueue;
  //     for ( var idx = 0; idx < len; idx++ ) {
  //       msgs.push(newMessages[idx]);
  //     }
  //     this.propertyDidChange('firstMessage');
  //   }
  //   
  // }
      
});