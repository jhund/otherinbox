var folderStoreKeys,inbox,saved,deleted;

module("Folder methods", {
  setup: function() {

    folderStoreKeys = CoreOI.store.loadRecords(CoreOI.Folder, [
      {"name": "Inbox", "guid": "1", "icon": "mailbox-inbox", "count": 10, "inboxable": false, "deleteable": true, "blockable": true, "saveable": true, "mailboxes": ['1','2'] }, 
      {"name": "Saved", "guid": "2", "icon": "mailbox-saved", "inboxable": true, "deleteable": true, "blockable": true, "saveable": false, "mailboxes": ['3'] }, 
      {"name": "Deleted", "guid": "3", "icon": "mailbox-trash", "inboxable": true, "deleteable": false, "blockable": true, "saveable": true, "mailboxes": [] }
    ]);
    
    inbox = CoreOI.store.find(CoreOI.Folder, 1);
    saved = CoreOI.store.find(CoreOI.Folder, 2);
    deleted = CoreOI.store.find(CoreOI.Folder, 3);

    var mailboxStoreKeys = CoreOI.store.loadRecords(CoreOI.Mailbox, [
      { 'guid': '1', 'name': 'Amazon', 'folder': '1' },
      { 'guid': '2', 'name': 'Ebay', 'folder': '1' },
      { 'guid': '3', 'name': 'Craigslist', 'folder': '2' }
    ]);
  }
});

test("should find record", function() {
  equals(inbox.storeKey, folderStoreKeys[0], 'successful');
});

test("count should default to empty value" ,function() {
  equals(saved.get('count'), '', 'null count returns empty string');
});

test("has many mailboxes", function() {

  var amazon = CoreOI.store.find(CoreOI.Mailbox, 1);
  var ebay = CoreOI.store.find(CoreOI.Mailbox, 2);
  var craigs = CoreOI.store.find(CoreOI.Mailbox, 3);

  equals(inbox.get('mailboxes').objectAt(0),amazon,'should get amazon instance for inbox.mailboxes');
  equals(inbox.get('mailboxes').objectAt(1),ebay,'should get amazon instance for inbox.mailboxes');
  equals(inbox.get('mailboxes').get('length'),2,'should get correct number of instances for inbox.mailboxes');
  
  equals(saved.get('mailboxes').objectAt(0),craigs,'should get craigslist instance for saved.mailboxes');
  equals(saved.get('mailboxes').get('length'),1,'should get correct number of instances for saved.mailboxes');

});
