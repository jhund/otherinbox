// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

sc_require('models/record');

CoreOI.Folder = CoreOI.Record.extend({
  
  name: SC.Record.attr(String),
  icon: SC.Record.attr(String),
  count: SC.Record.attr(Number, { defaultValue: 0 }),
  isInboxable: SC.Record.attr(Boolean, { key: 'inboxable' }),
  isDeleteable: SC.Record.attr(Boolean, { key: 'deleteable' }),
  isBlockable: SC.Record.attr(Boolean, { key: 'blockable' }),
  isSaveable: SC.Record.attr(Boolean, { key: 'saveable' }),
  
  mailboxes: SC.RecordAttribute.create({
    toType: function(record, key, value) {
      var ary = record._mailboxes ;
      if (!ary) {
        console.log('creating a mailboxes query for Folder[%@]'.fmt(record.get('guid')));
        CoreOI.Record.mailboxes++ ;
        ary = record._mailboxes = record.get('store').find(SC.Query.local('CoreOI.Mailbox',{
          conditions: "folder = %@",
          parameters: [record],
          orderBy: "priority DESC, lowerCaseName"
        }));
      } else {
        console.log('verifying freshness of mailboxes query for Folder[%@]'.fmt(record.get('guid')));
        ary.refresh() ;
      }
      return ary ;
    }
  }),
  
  updatedAtDidChange: function() {
    var ary = this._mailboxes ;
    if (ary && this.get('updatedAt') < CoreOI.lastUpdatedAt) {
      console.log('notifying Folder[%@] that its mailboxes did change'.fmt(this.get('guid')));
      this.propertyDidChange('mailboxes') ;
    }
  }.observes('updatedAt')
  
});
