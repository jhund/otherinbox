// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('views/web');

OI.AttachmentIframeView = OI.WebView.extend({
  contentDisplayProperties: 'hasAttachments'.w(),
  
  value: function() {
    var content = this.get('content') ;
    var src = '' ;
    
    switch (content) {
      case SC.MULTIPLE_PLACEHOLDER:
      case SC.EMPTY_PLACEHOLDER:
      case SC.NULL_PLACEHOLDER:
      case null:
      case undefined:
        break;
      default:
        if (content.get('hasAttachments')) {
          src = '/messages/%@/attachments'.fmt(content.get('guid')) ;
        }
        break;
    }
    return src ;
  }.property() // not cacheable!
  
});
