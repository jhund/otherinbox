// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

sc_require('models/record');

CoreOI.User = CoreOI.Record.extend({
  
  canTag: function() {
    return this.subscribesTo('TaggingService');
  }.property('subscriptions').cacheable(),
  
  cannotSeeAllMessages: function() {
    return !this.subscribesTo('PremiumService');
  }.property('subscriptions').cacheable(),
  
  subscribesTo: function(sub) {
    var subs = this.get('subscriptions');
    if (subs) {
      var i=subs.length;
      while (i--) {
        if (subs[i] == sub) {
          return YES ;
        }
      }
    }
    return NO ;
  }
  
});
