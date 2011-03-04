// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

OI.messageDetailController = SC.ObjectController.create({
  
  contentBinding: SC.Binding.single('OI*messagesController.selection').notEmpty().oneWay(),
  
  // hasAttachments: function() {
  //   var c = this.get('content');
  //   return (c && c.get('has_attachments') == '1') ;
  // }.property('*content.has_attachments')
  
});