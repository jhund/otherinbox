// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('lib/animator');

OI.Animator = SC.Object.create({
  
  isFlashVisible: NO,
  isFlashVisibleBinding: SC.Binding.bool('OI.flashController.firstMessage').oneWay(),
  
  _isFlashVisible: NO, // for animation
  
  isFlashVisibleDidChange: function() {
    var isFlashVisible = this.get('isFlashVisible') ;
    if (isFlashVisible !== this._isFlashVisible) {
      var wrapperAnimation = this._wrapperAnimation ;
      if (!wrapperAnimation) {
        var wrapper = OI.bodyPage.get('wrapper') ;
        wrapperAnimation = this._wrapperAnimation = new Animator({
          interval: 20,  // time between animation frames
          duration: 200, // length of animation
          onStep: function() {
            var top = (-36+Math.floor(36*this.state)) ;
            wrapper.adjust({ top: top }) ;
          },
          transition: Animator.tx.easeInOut
        });
      }
      this._isFlashVisible = isFlashVisible ;
      wrapperAnimation.toggle() ;
    }
  }.observes('isFlashVisible')
  
});
