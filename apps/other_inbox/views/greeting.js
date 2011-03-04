// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

OI.GreetingView = SC.LabelView.extend({
  classNames: 'oi-greeting',
  valueBinding: SC.binding('OI.userController.login').oneWay(),
  tagName: "p",
  
  render: function(context, firstTime) {
    context.push("_Hello %@".loc(this.get('value'))) ;
  }
  
});
