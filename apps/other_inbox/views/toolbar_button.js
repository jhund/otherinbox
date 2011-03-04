// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('views/action_button');

OI.ToolbarButtonView = OI.ActionButtonView.extend({
  tagName: 'div',
  classNames: 'toolbar_control',
  
  displayProperties: 'title value'.w(),
  
  actOnMouseDown: YES,
  
  isEnabled: YES,
  
  render: function(context, firstTime) {
    var t = this.get('title') ;
    var p = t.toLowerCase() ;
    context.push(
      '<img id="%@_image" src="%@" alt="%@" />'.fmt(p, this.get('value'), t),
      '<span id="%@_label" class="label">%@</span>'.fmt(p, t)
    );
  }
  
});