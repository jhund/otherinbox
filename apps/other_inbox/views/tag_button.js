// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

OI.TagButtonView = OI.ActionButtonView.extend({
  classNames: 'tag_button',
  tagName: 'a',
  displayProperties: 'tagged'.w(),
  isEnabled: YES,
  
  actOnMouseDown: YES,
  
  render: function(context, firstTime) {
    if (firstTime) {
      var value = this.get('value') ;
      context.push("<span class='tag_label'>%@</span>".fmt(value)) ;
    }
    context.setClass('tagged', this.get('tagged')) ;
  },
  
  tagged: function() {
    var activeTags = this.get('tags');
    return activeTags ? !!activeTags[this.get('value')] : NO ;
  }.property('tags')
  
});