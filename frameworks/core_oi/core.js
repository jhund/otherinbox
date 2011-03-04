// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

sc_require('lib/statechart');

CoreOI = SC.Object.create(SC.Statechart, {
  
  serverMode: (window.location.toString().indexOf("http://localhost") === -1),
  
  version: 0,
  
  BATCH_UPDATE_URL: '/batch_update',
  STATE_CHANGE_URL: '/mailboxes/%@/state_change.json',
  TAG_URL: '/messages/tags.json',
  
  INBOX_FOLDER_ID: 1,
  SAVED_FOLDER_ID: 2,
  DELETED_FOLDER_ID: 3,
  BLOCKED_FOLDER_ID: 5
  
});

// give CoreOI.Server time to load...
SC.ready(function() {
  // CoreOI.store = SC.Store.create().from(CoreOI.Server.create()) ;
  CoreOI.store = SC.Store.create().from(SC.Record.fixtures) ;
});
