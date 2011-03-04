// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

OI.flashController = SC.ObjectController.create({
 
  removeFirstMessage: function() {
    var c = this.get('content') ;
    if (c) { c.removeFirstMessage(); }
  },
  
  addMessage: function(msg,msgType) {
    var c = this.get('content') ;
    if (c) { c.addMessage(msg,msgType); }
  }
  
});

OI.flashController.set('content', CoreOI.Flash.create({ guid: '2000' })) ;
