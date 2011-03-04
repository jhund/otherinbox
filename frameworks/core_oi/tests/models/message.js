var messageStoreKeys,amazon_msg_1,amazon_msg_2,craigs_msg;

module("Message methods", {
  setup: function() {

    CoreOI.store.loadRecords(CoreOI.Mailbox,[
      { guid: '1', name: 'Amazon', folder: '1', priority: 3, messages:[2] }
    ]);
    
    messageStoreKeys = CoreOI.store.loadRecords(CoreOI.Message, [
      { guid: '1', subject: 'Amazon msg 1', mailbox: '1', priority: 3, unread: '1' },
      { guid: '2', subject: 'Amazon msg 2', mailbox: '1', priority: 5, unread: '0' },
      { guid: '3', subject: 'Craigslist msg 1', mailbox: '1', priority: 2, unread: '1' }
    ]);

    amazon_msg_1 = CoreOI.store.find(CoreOI.Message,1);
    amazon_msg_2 = CoreOI.store.find(CoreOI.Message,2);
    craigs_msg = CoreOI.store.find(CoreOI.Message,3);    
  }
});

test("should find record", function() {
  equals(craigs_msg.storeKey, messageStoreKeys[2], 'successful');
});

test("has one mailbox", function() {
  var mailbox = CoreOI.store.find(CoreOI.Mailbox,1);
  equals(craigs_msg.get('mailbox'),mailbox,"retrieves mailbox");
});

test("isUnread", function() {
  equals(amazon_msg_1.get('isUnread'),true,"should be true if unread set to '1'");
  equals(amazon_msg_2.get('isUnread'),false,"should be false if unread set to '0'");
});