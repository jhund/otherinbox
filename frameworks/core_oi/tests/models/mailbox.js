var mailboxStoreKeys,amazon,ebay,craigs,inbox;

module("Mailbox methods", {
  setup: function() {

    CoreOI.store.loadRecords(CoreOI.Folder,[
      { 'guid': '1', 'name': 'Inbox', mailboxes: [1,2,3] }
    ]);
    
    mailboxStoreKeys = CoreOI.store.loadRecords(CoreOI.Mailbox, [
      { 'guid': '1', 'name': 'Amazon', 'folder': '1', 'priority': 3, 'totalCount': 2, 'messages':[1,2] },
      { 'guid': '2', 'name': 'Ebay', 'folder': '1', 'priority': 5, 'messages':[] },
      { 'guid': '3', 'name': 'CraigsList', 'folder': '1', 'priority': 2, 'totalCount': 4, 'messages': [3] }
    ]);

    amazon = CoreOI.store.find(CoreOI.Mailbox, 1);
    ebay = CoreOI.store.find(CoreOI.Mailbox, 2);
    craigs = CoreOI.store.find(CoreOI.Mailbox, 3);

    CoreOI.store.loadRecords(CoreOI.Message, [
      { 'guid': '1', 'subject': 'Amazon msg 1', 'priority': 3 },
      { 'guid': '2', 'subject': 'Amazon msg 2', 'priority': 5 },
      { 'guid': '3', 'subject': 'Craigslist msg 1', 'priority': 2 }
    ]);
    
  },
  
  teardown: function() {
    CoreOI.store.reset();
  }
});

test("should find record", function() {
  equals(craigs.storeKey, mailboxStoreKeys[2], 'successful');
});

test("blockable" ,function() {
  equals(craigs.get('blockable'), true, 'returns true if the mailbox priority is not 5');
  equals(ebay.get('blockable'), false, 'returns false if the mailbox priority is 5 (%@)'.fmt(ebay.get('priority')));
});

test("lowerCaseName" ,function() {
  equals(craigs.get('lowerCaseName'), 'craigslist',"sets title to all lowercase");
});

test("has many messages", function() {

  var amazon_msg_1 = CoreOI.store.find(CoreOI.Message,1);
  var amazon_msg_2 = CoreOI.store.find(CoreOI.Message,2);
  var craigs_msg = CoreOI.store.find(CoreOI.Message,3);

  equals(amazon.get('messages').objectAt(0),amazon_msg_1,'should get amazon msg instance 1 for amazon.messages');
  equals(amazon.get('messages').objectAt(1),amazon_msg_2,'should get amazon msg instance 2 for amazon.messages');
  equals(amazon.get('messages').get('length'),2,'should get correct number of instances amazon.messages');
  
  equals(craigs.get('messages').objectAt(0),craigs_msg,'should get craigslist message for craigslist.mailboxes');
  equals(craigs.get('messages').get('length'),1,'should get correct number of instances craigs.messages');

});

test("has one folder", function() {
  var inbox = CoreOI.store.find(CoreOI.Folder,1);
  equals(amazon.get('folder'),inbox,"should retrieve parent folder");
});

test("has older messages", function() {
  equals(craigs.get('hasOlderMessages'),true,"true if there are more available messages than are visible");
  equals(amazon.get('hasOlderMessages'),false,"false if there are as many available messages as are visible");
});