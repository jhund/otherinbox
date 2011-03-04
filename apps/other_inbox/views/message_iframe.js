// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('views/web');

OI.MessageIframeView = OI.WebView.extend({
  contentDisplayProperties: 'url hasAttachments'.w(),
  
  value: function() {
    var content = this.get('content'), src ;
    
    switch (content) {
      case SC.MULTIPLE_PLACEHOLDER:
        src = sc_static('multiple_selection.html') ;
        break ;
      case SC.EMPTY_PLACEHOLDER:
      case SC.NULL_PLACEHOLDER:
      case null:
      case undefined:
        src = '' ;
        break ;
      default:
        src = content.get('url') ;
        break ;
    }
    return src ;
  }.property(), // not cacheable!
  
  iframeDidLoad: function() {
    SC.RunLoop.begin() ;
    if (OI.messageDetailController.get('hasAttachments')) {
      this.adjust({ bottom:69 }) ;
    } else {
      this.adjust({ bottom:0 }) ;
    }
    SC.RunLoop.end() ;
  }
  
});
