// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

OI.AjaxActivityView = SC.View.extend({

  layerId: 'ajax_activity',
  classNames: 'ajax_activity',
  tagName:'span',
  isVisibleBinding: SC.Binding.bool('SC.Request.manager.numberOfCurrentRequests').oneWay(),

  childViews: [
    SC.ImageView.extend({ 
      value: sc_static('images/ajax_activity.gif')
    })
  ]

});