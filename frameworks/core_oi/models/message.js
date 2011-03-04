// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

sc_require('models/record');

CoreOI.Message = CoreOI.Record.extend({
  
  // useIsoDate: NO here forces SC to use Date.parse instead
  dateSent: SC.Record.attr(Date,{ useIsoDate: NO }),
  fromAddress: SC.Record.attr(String, { defaultValue: '' }),
  url: SC.Record.attr(String, { defaultValue: '', key: 's3_html_url' }),
  tagList: SC.Record.attr(String, { defaultValue: '' }),
  recipient: SC.Record.attr(String, { defaultValue: '' }),
  subject: SC.Record.attr(String, { defaultValue: '' }),
  mailbox: SC.Record.toOne('CoreOI.Mailbox'),
  
  hasAttachments: SC.RecordAttribute.create({
    defaultValue: NO,
    key: 'has_attachments',
    
    // use a custom Boolean transform
    toType: function(record, key, value) {
      return (value === '0') ? NO : YES ;
    },
    fromType: function(record, key, value) {
      return (value) ? '1' : '0' ;
    }
  }),
  
  isUnread: SC.RecordAttribute.create({
    defaultValue: '0',
    key: 'unread',
    
    // use a custom Boolean transform
    toType: function(record, key, value) {
      return (value === '0') ? NO : YES ;
    },
    fromType: function(record, key, value) {
      return (value) ? '1' : '0' ;
    }
  })
  
});
