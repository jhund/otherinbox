// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('views/action_button');

OI.AnchorButtonView = OI.ActionButtonView.extend({
  
  isEnabled: YES,
  
  render: function(context, firstTime) {
    context.push(this.get('value'));
  }
  
});