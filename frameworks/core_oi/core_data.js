// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

SC.mixin(CoreOI, {
  
  inboxFolder: function() {
    return CoreOI.store.find(CoreOI.Folder, CoreOI.INBOX_FOLDER_ID) ;
  }.property().cacheable(),
  
  user: function() {
    // kind of a hack, but it works for now
    return this.store.find(SC.Query.local('CoreOI.User')).firstObject() ;
  }.property().cacheable(),
  
  makeComingSoonFlash: function() {
    this.makeTipFlash("_Coming soon!".loc()) ;
  },
  
  makeGeneralFlash: function(msg) { this._makeFlash(msg, 'general'); },
  makeSuccessFlash: function(msg) { this._makeFlash(msg, 'success'); },
  makeErrorFlash:   function(msg) { this._makeFlash(msg, 'error'); },
  makeTipFlash:     function(msg) { this._makeFlash(msg, 'tip'); },
  
  /** @private */
  _makeFlash: function(msg, msgType) {
    // FIXME this is a layering violation; CoreOI should not depend on OI
    OI.flashController.addMessage(msg, msgType) ;
  }
  
});
