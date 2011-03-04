// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

sc_require('models/mailbox');
 
CoreOI.Mailbox.FIXTURES = [

  { "name": "Producttestpanel", 
    "guid": "1", 
    "feed": "http://localhost/feed1",
    "priority": 2,
    "unreadCount": 4, 
    "folder": "1",
    "lastUpdatedAt": Date.now(),
    "updatedAt": Date.now()
    // "messages": [267,216,215,300]
  },
  { "name": "Freeslide", 
    "guid": "2", 
    "feed": "http://localhost/feed2",
    "priority": 3,
    "unreadCount": 3, 
    "folder": "1",
    "lastUpdatedAt": Date.now(),
    "updatedAt": Date.now()
    // "messages": [210,209,270]
  },
  { "name": "Amazon", 
    "guid": "3", 
    "feed": "http://localhost/feed3",
    "priority": 2,    
    "unreadCount": 4, 
    "folder": "1" ,
    "lastUpdatedAt": Date.now(),
    "updatedAt": Date.now()
    // "messages": [202,207,203]
  },
  { "name": "Ebay", 
    "guid": "4", 
    "feed": "http://localhost/feed4",
    "priority": 1,    
    "unreadCount": 4, 
    "folder": "3",
    "lastUpdatedAt": Date.now(),
    "updatedAt": Date.now()
    // "messages": [400,401,402]
  }
];

var ADD_LOTS_OF_MAILBOXES=false;

if(ADD_LOTS_OF_MAILBOXES){
  for(var n=5;n<60;n++){
    CoreOI.Mailbox.FIXTURES.push({
      name:'Mailbox-'+n,
      guid:""+n,
      feed: "http://localhost/feed"+n,
      priority: 1,    
      unreadCount: 0, 
      folder: "1",
      // messages:[],
      "lastUpdatedAt": Date.now(),
      "updatedAt": Date.now()
    });
  
    CoreOI.Folder.FIXTURES[0].mailboxes.push(""+n);
  }
}
