// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

/** @class

  This view has better CSS positioning, enabling the browser to resize items itself.

  @extends SC.ListView
  @author Erich Ocean
  @version 0.1
*/
OI.MessageListView = SC.ListView.extend(
/** @scope OI.MessageListView.prototype */ {
  
  /** @private */
  layoutItemView: function(itemView, contentIndex, firstLayout) {
    
    var rowHeight = this.get('rowHeight') || 0 ;
    var parentView = itemView.get('parentView') ;
    var f = { 
      x: 0, 
      y: contentIndex*rowHeight,
      height: rowHeight, 
      width: (parentView || this).get('innerFrame').width 
    } ;
    
    if (firstLayout || !SC.rectsEqual(itemView.get('frame'), f)) {
      // copy and pasted from view.js
      itemView.viewFrameWillChange() ;
      
      var style = {} ;
      style.left = Math.floor(f.x) + 'px' ;
      style.right = '0px';
      style.top = Math.floor(f.y) + 'px' ;
      style.bottom = 'auto';
      
      // Resize Height
      var padding = 0 ;
      var idx = SC.View.HEIGHT_PADDING_STYLES.length;
      while(--idx >= 0) {
        padding += parseInt(this.getStyle(SC.View.HEIGHT_PADDING_STYLES[idx]), 0) || 0;
      }
      style.height = (Math.floor(f.height) - padding).toString() + 'px' ;
      
      // now apply style change and clear the cached frame
      itemView.setStyle(style) ;
      
      // notify for a resize only.
      itemView.viewFrameDidChange() ;

      itemView.setStyle({ zIndex: contentIndex.toString() }) ;
    }
  },

  doubleClick: function(ev) {
    var view = this.itemViewForEvent(ev);

    if (view && content) {
      OI.openMessage();
      return true;
    } else {
      return false;
    }
  },
  
  collectionViewShouldBeginDrag: function(view) { return true; },
  collectionViewDragDataTypes: function(view) { return [OI.MESSAGE_TYPE]; }
  
}) ;
