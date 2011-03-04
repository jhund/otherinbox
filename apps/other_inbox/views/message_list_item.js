// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

OI.MessageListItemView = SC.ListItemView.extend({
  
  render: function(context,firstTime) {
    var content = this.get('content') ;
    
    if (content) {
      context.push('<span class="subject oi-truncate" style="position: absolute; left: 0px; right: 295px">');
      
      if (content.get('hasAttachments')) {
        context.push("<img class='attachments' src='%@' alt='This message has attachments' />".fmt(sc_static('images/docs_16x16.gif')));
      }
      
      context.push(content.get('subject'));
      
      if (OI.userController.get('canTag')) {
        var tagList = content.get('tagList') ;
        if (tagList.length > 0) {
          context.push('<em class="message_tags_small">');
          context.push(tagList);
          context.push('</em>');
        }
      }
      
      context.push('</span> <span class="date_sent oi-truncate" style="position: absolute; right: 175px; width: 108px">');
      context.push(OI.dateToShortDateString(content.get('dateSent'))); 
      context.push('</span> <span class="sender oi-truncate" style="position: absolute; right: 0px; width: 159px">');
      context.push(content.get('fromAddress') + '</span>');
      
      context.setClass({ unread: content.get('isUnread'), stale: content.get('isStale') });
    }
  }
  
});