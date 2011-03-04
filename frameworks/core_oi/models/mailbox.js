// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

sc_require('models/record');

// FIXME This is a lame way to do this; comparison should be defined in
// SC.RecordAttribute, not globally!
SC.Query.comparisons['dateSent'] = function(l,r) {
  if (l == r) { return 0 }
  else { return l < r ? -1 : 1 }
};

CoreOI.Mailbox = CoreOI.Record.extend({
  
  unreadCount: SC.Record.attr(Number, { defaultValue: 0 }),
  totalCount: SC.Record.attr(Number, { defaultValue: 0 }),
  
  folder: SC.Record.toOne('CoreOI.Folder'),
  
  messages: SC.RecordAttribute.create({
    toType: function(record, key, value) {
      var ary = record._messages ;
      if (!ary) {
        console.log('creating a messages query for Mailbox[%@]'.fmt(record.get('guid')));
        CoreOI.Record.messages++ ;
        ary = record._messages = record.get('store').find(SC.Query.local('CoreOI.Message', {
          conditions: "mailbox = %@",
          parameters: [record],
          orderBy: "dateSent DESC"
        }));
      } else {
        console.log('verifying freshness of messages query for Mailbox[%@]'.fmt(record.get('guid')));
        ary.refresh() ;
      }
      return ary ;
    }
  }),
  
  updatedAtDidChange: function() {
    var ary = this._messages ;
    if (ary && this.get('updatedAt') > ary.getPath('queryKey.updatedAt')) {
      console.log('notifying MailBox[%@] that its messages did change'.fmt(this.get('guid')));
      this.propertyDidChange('messages') ;
    }
  }.observes('updatedAt'),
  
  isBlockable: function() {
    return Number(this.get('priority')) !== 5 ;
  }.property('priority').cacheable(),
  
  lowerCaseName: function() {
    var name = this.get('name');
    if (name) { return name.toLowerCase(); }
  }.property('name').cacheable()
  
});
