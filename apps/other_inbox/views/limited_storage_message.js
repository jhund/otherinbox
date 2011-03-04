// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('core');

OI.LimitedStorageMessageView = SC.LabelView.extend({
  render: function(context) {
    context.push("Showing messages from the last 30 days. "+
		 "<a href='%@' style='color: white;background-color: transparent;'>"+
		 "Please upgrade</a> to view all of your messages.".fmt(CoreOI.purchaseServiceURL('PremiumService')));
  }
});