// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('controllers/flash');
sc_require('views/image_button');

OI.FlashView = SC.View.extend(SC.ContentDisplay, {
  classNames: 'flash',
  contentBinding: SC.Binding.single('OI.flashController.firstMessage'),
  contentDisplayProperties: 'message messageType'.w(),
  
  childViews: [
    OI.ImageButtonView.extend({
      layout: { top: 10, right: 10, width: 16, height: 16 },
      target: 'OI.flashController',
      action: 'removeFirstMessage',
      value: sc_static('images/close')
    })
  ],
  
  render: function(context,firstTime) {
    var content = this.get('content') ;
    
    if (content) {
      context.push("<div class='message'>%@</div>".fmt(content.get('message'))) ;
      context.setClass(content.get('messageType'), YES) ;
      
      // render our child views
      var cv = this.get('childViews'), len = cv.length, idx, view ;
      for (idx=0; idx<len; ++idx) {
        view = cv[idx] ;
        if (!view) continue;
        context = context.begin(view.get('tagName')) ;
        view.prepareContext(context, YES) ; // force firstTime behavior
        context = context.end() ;
      }
    }
  },
  
  mouseDown: function(evt) {
    this.getPath('pane.rootResponder').sendAction('removeFirstMessage', OI.flashController, this) ;
    return YES ;
  }
  
});
