// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('core');

OI.MailboxSourceView = SC.SourceListView.extend({
  rowHeight: 27,
  dropTarget: YES,
  
  exampleView: SC.ListItemView,
  
  doubleClick: function(ev) {
    var view = this.itemViewForEvent(ev);
    var content = this.get('selection');
    if (view && content) {
      window.open("/mailboxes/%@/edit".fmt(content.get('guid')),'_blank');
      return true;
    } else {
      return false;
    }
  }

}) ;
