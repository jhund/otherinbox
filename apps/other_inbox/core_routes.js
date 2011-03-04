// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

SC.mixin(OI, {
  
  routeHandler: function(route) {
    console.log("OI.routeHandler() is not statechart-enabled. Skipping.") ;
    return ;
    
    var folderName = route.folderName;
    
    if (folderName) {
      var folder = OI._retrieveAndSetFolder(folderName);
      
      if (folder) {
        var mailboxName = route.mailboxName;
        
        if (mailboxName) {
          var mailbox = OI._retrieveAndSetMailbox(folder,mailboxName);
          
          if (mailbox) {
            var messageGuid = route.messageGuid;
            
            if (messageGuid) {
              OI._retrieveAndSetMessage(mailbox,route.messageGuid);
            }
          }
        }
      }
    }
  },
  
  _retrieveAndSetFolder: function(folderName) {
    alert("OI._retrieveAndSetFolder() is not statechart-enabled. Skipping.") ;
    return ;
    
    // var q = SC.Query.create({ recordType: CoreOI.Folder, conditions: "name = '%@'".fmt(folderName) });
    // var folder = CoreOI.store.findAll(q).objectAt(0);
    // 
    // if (folder) {
    //   console.info("Route Folder = " + folder.get('name'));
    //   // FIXME this doesn't actually seem to work, a las
    //   OI.foldersController.set('selection',folder);
    // }
    // 
    // return folder;
  },
  
  _retrieveAndSetMailbox: function(folder, mailboxName) {
    alert("OI._retrieveAndSetMailbox() is not statechart-enabled. Skipping.") ;
    return ;
    
    // var q = SC.Query.create({ recordType: CoreOI.Mailbox, conditions: "name = '%@' AND folder = '%@'".fmt(mailboxName,folder.get('guid')) });
    // var mailbox = CoreOI.store.findAll(q).objectAt(0);
    // 
    // if (mailbox) {
    //   console.info("Route Mailbox = " + mailbox.get('name'));
    //   // FIXME this doesn't actually seem to work, a las
    //   OI.mailboxesController.set('selection',mailbox);
    // }
    // 
    // return mailbox;
  },
  
  _retrieveAndSetMessage: function(mailbox, messageGuid) {
    alert("OI._retrieveAndSetMessage() is not statechart-enabled. Skipping.") ;
    return ;
    
    // var q = SC.Query.create({ recordType: CoreOI.Message, conditions: "guid = '%@' AND mailbox = '%@'".fmt(messageGuid,mailbox.get('guid')) });
    // var message = CoreOI.store.findAll(q).objectAt(0);
    // 
    // if (message) {
    //   console.info("Route Message = " + message.get('guid'));
    //   // FIXME this doesn't actually seem to work, a las
    //   OI.messagesController.set('selection',message);
    // }
    // 
    // return message;
  }
  
});

SC.routes.add(':folderName', OI.routeHandler) ;
SC.routes.add(':folderName/:mailboxName', OI.routeHandler) ;
SC.routes.add(':folderName/:mailboxName/:messageGuid', OI.routeHandler) ;
