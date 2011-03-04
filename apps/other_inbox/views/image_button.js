// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('lib/target_action'); // FIXME: temporary, remove when SC has this

/** @class
  A standard image view that functions as a button.
  
  @extends SC.ImageView
  @extends SC.Control
  @extends SC.TargetAction
*/
OI.ImageButtonView = SC.ImageView.extend(SC.Control, SC.TargetAction,
/** @scope OI.ImageButtonView.prototype */ {
  
});
