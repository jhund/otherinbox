// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

sc_require('core');
sc_require('models/record');

CoreOI.FlashMessage = CoreOI.Record.extend({

  init: function() {
    this.storeKey = SC.Store.generateStoreKey();
  }
  
});