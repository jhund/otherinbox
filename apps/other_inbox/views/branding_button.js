// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('views/action_button');

OI.BrandingButtonView = OI.ActionButtonView.extend({
  classNames: 'branding_image toolbar_control'.w(),
  tagName: 'span',
  
  isEnabled: YES,
  target: OI, action: 'flushRecords',
  
  render: function(context, firstTime) {
    context.push('<img src="%@" alt="" />'.fmt(SC.BLANK_IMAGE_URL)) ;
  }
  
});
