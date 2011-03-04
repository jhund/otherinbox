// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

sc_require('lib/oi_xhr');
sc_require('lib/refresher');

CoreOI.Server = SC.DataSource.extend({
  
  fetch: function(store, fetchKey, params) {
    if (SC.instanceOf(fetchKey, SC.Query)) {
      var recordType = fetchKey.recordType ;
      if (SC.typeOf(recordType) === SC.T_STRING) {
        recordType = fetchKey.recordType = SC.objectForPropertyPath(recordType) ;
      }
      switch (recordType) {
        case CoreOI.Message: {
          var updatedAt = fetchKey.updatedAt ;
          var mailbox = fetchKey.parameters[0] ;
          var folder = mailbox.get('folder') ;
          if (!folder) return ;
          if (!updatedAt || updatedAt < folder.get('updatedAt')) {
            Refresher.sendRefreshRequest({
              mailbox_id: mailbox.get('guid'),
              folder_updated_at: folder.get('updatedAt')
            }, {
              query: fetchKey,
              folder: folder
            });
          }
          return ;
        }
        case CoreOI.Mailbox: {
          var folder = fetchKey.parameters[0] ;
          var updatedAt = folder.get('updatedAt') ;
          if (!fetchKey.updatedAt || updatedAt < CoreOI.lastUpdatedAt) {
            Refresher.sendRefreshRequest({
              folder_id: folder.get('guid'),
              folder_updated_at: folder.get('updatedAt')
            }, {
              query: fetchKey,
              folder: folder
            });
          }
          return ;
        }
      }
    } else if (fetchKey === CoreOI.User) {
      // ignore requsets to fetch users -- we return it with every response
    } else {
      console.log('ignoring fetch request with fetchKey: %@'.fmt(fetchKey));
    }
  }
  
});
