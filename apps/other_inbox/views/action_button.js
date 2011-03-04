// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('lib/target_action'); // FIXME: temporary, remove when SC has this

/** @class
  A standard image view that functions as a button.
  
  @extends SC.ImageView
  @extends SC.Control
  @extends SC.TargetAction
  @extends SC.StaticLayout
*/
OI.ActionButtonView = SC.View.extend(SC.Control, SC.TargetAction, SC.StaticLayout,
/** @scope OI.ActionButtonView.prototype */ {
  classNames: 'action_button',
  
  value: SC.BLANK_IMAGE_URL,
  
  isEnabled: NO, // don't enable action buttons by default
  
  target: 'OI',
  
  render: function(context, firstTime) {
    var title = this.get('title') ;
    
    if (title) {
      var id_prefix = title.toLowerCase().replace(/ /g,"_") ;
      context.push(
        '<a href="javascript:;">',
        '<img id="%@_image" src="%@" alt="%@" />'.fmt(id_prefix, this.get('value'), title),
        '<span id="%@_label" class="label">%@</span>'.fmt(id_prefix, title),
        '</a>'
      );
    }
  }
  
});