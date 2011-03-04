// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

OI.mailboxController = SC.ObjectController.create({
  
  contentBinding: 'OI*mailboxesController.selection',
  
  // _headElement: null,
  
  // insertAutoDiscovery: function() {    
  //   var newTag;
  //   var mailbox = this.get('content');
  //   
  //   if (mailbox) {
  //     var feed = mailbox.get('feed');
  //     if (feed) {
  //       var folder = OI.folderController.get('content');
  //       var folder_name;
  //   
  //       if (folder) {
  //         folder_name = folder.get('name');
  //       }
  //       newTag = "<link id='autodiscovery' href='https://%@/mailboxes/%@-%@/feed' rel='alternate' title='OtherInbox %@ %@ messages' type='application/atom+xml' />".fmt(window.location.host,feed,mailbox.get('folder'),mailbox.get('name'),folder_name);
  //     }
  //   }
  //   
  //   this._headElement = this._headElement || SC.$$('head')[0];
  //   
  //   var autoDiscoveryElement = SC.$('autodiscovery');
  //   
  //   if (autoDiscoveryElement) {
  //     // can't just do a replace of the element as that screws up Firefox; instead we delete and reinsert it
  //     autoDiscoveryElement.remove();
  //   }
  //   
  //   if (newTag) {
  //     this._headElement.insert(newTag);
  //   }
  // }.observes('selection'),
  
  // isBlockable: function() {
  //   var mailbox = this.get('content');
  //   return mailbox ? mailbox.get('blockable') : false;
  // }.property('selection')
  
  // showOlderMessageWarning: function() {
    // var content = this.get('content');
    // this._warning = this._warning || SC.$('older_messages');
    // this._scroll = this._scroll || SC.$('message_scroll');
    // 
    // if (this._warning && this._scroll) { 
    //   if (content && content.get('hasOlderMessages')) {
    //     this._warning.show();
    //     this._scroll.setStyle({ bottom: '18px' });
    //   } else {
    //     this._warning.hide();
    //     // this._scroll.setStyle({ bottom: '0px' })  ;
    //   }
    // }
  // }.observes('*content.hasOlderMessages')


});
