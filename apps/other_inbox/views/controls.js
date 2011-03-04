// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

OI.ControlsView = SC.View.extend({
  classNames: "controls",
  tagName: "p",
  layout: { top: 15, left: 0, bottom: 0, width: 360 },
  
  childViews: [
    OI.AnchorButtonView.extend({
      tagName: "a",
      classNames: 'admin',
      value: "_Admin".loc(),
      isVisibleBinding: SC.Binding.bool('OI.userController.admin').oneWay(),
      
      action: 'openAdmin',
      layout:{ top:2 }
    }),
      
    OI.AnchorButtonView.extend({
      tagName: "a",
      classNames: 'sign-out',
      value: "_Sign out".loc(),
      action: 'goToSignIn',
      layout:{ top:2 }
    })
  ]
  
});
