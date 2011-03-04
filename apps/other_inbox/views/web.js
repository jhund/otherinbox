// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

OI.WebView = SC.WebView.extend(SC.ContentDisplay, {
  
  render: function(context, firstTime) {
    var src = this.get('value') ;
    
    if (firstTime) {
      context.push(
        '<div style="position: absolute; width: 100%; height: 100%; border: 0px; margin: 0px; padding: 0px; overflow: hidden;">',
        '<iframe height="100%" width="100%" src="' + src + 
        '" style="border: 0px; margin: 0px; padding: 0px;">', // scrolling=no
        '</iframe></div>'
      );
    } else {
      var iframe = this.$('iframe') ;
      // clear out the previous src, to force a reload
      iframe.attr('src', 'javascript:;') ;
      iframe.attr('src', src) ;
    }
  },
  
  // TODO record iframe load times
  iframeDidLoad: function() {
    return ; // do nothing by default
  }
  
});
