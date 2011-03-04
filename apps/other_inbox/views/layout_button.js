// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('views/action_button');

OI.LayoutButtonView = OI.ActionButtonView.extend({
  isEnabled: YES,
  tagName:'a',
  selected: false,
  classNames:['segment'],

  render: function(context,firstTime) {
    context.push("<span class='button-inner'><span class='label'>%@</span></span>".fmt(this.get('value')));
    this.$().setClass('sel',this.get('selected'));
  }
  
});