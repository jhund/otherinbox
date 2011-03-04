// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

OI.MessageDetailView = SC.View.extend(SC.ContentDisplay, {
  classNames: 'message_detail'.w(),
  
  contentDisplayProperties: 'fromAddress recipient dateSent'.w(),
  
  render: function(context,firstTime) {
    var content = this.get('content');
    
    switch (content) {
      case SC.MULTIPLE_PLACEHOLDER:
      case SC.EMPTY_PLACEHOLDER:
      case SC.NULL_PLACEHOLDER:
      case undefined:
        context.push([]);
        break;
      default:
        context.push("<div id='message_from'><span class='label'>From:</span> %@</div>".fmt(content.get('fromAddress')));
        context.push("<div id='message_to'><span class='label'>To:</span> %@</div>".fmt(content.get('recipient').capitalize()));
        context.push("<div id='message_date_sent'>");
        context.push("<span class='label'>Date Sent:</span> %@".fmt(OI.dateToLongDateString(content.get('dateSent'))));
        context.push("</div>");
        break;
    }
  }
  
});
