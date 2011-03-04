htmlbody("<style>.sc-main{display:none}</style>");

var inbox,saved,deleted,unblockable;

module("Mailbox controller",{
  setup:function(){
    CoreOI.store.reset();

    folderStoreKeys = CoreOI.store.loadRecords(CoreOI.Folder, [
      {"name": "Inbox", "guid": "1", "icon": "mailbox-inbox", "count": 10, "inboxable": false, "deleteable": true, "blockable": true, "saveable": true, "mailboxes": ['1','2'] },
      {"name": "Saved", "guid": "2", "icon": "mailbox-saved", "inboxable": true, "deleteable": true, "blockable": true, "saveable": false, "mailboxes": ['3'] },
      {"name": "Deleted", "guid": "3", "icon": "mailbox-trash", "inboxable": true, "deleteable": false, "blockable": true, "saveable": true, "mailboxes": [] },
      {"name": "Unblockable", "guid": "4", "icon": "mailbox-trash", "inboxable": true, "deleteable": true, "blockable": false, "saveable": true, "mailboxes": ['4'] }
    ]);

    var mailboxStoreKeys = CoreOI.store.loadRecords(CoreOI.Mailbox, [
      { 'guid': '1', 'name': 'Amazon', 'folder': '1' },
      { 'guid': '2', 'name': 'Ebay', 'folder': '1' },
      { 'guid': '3', 'name': 'Craigslist', 'folder': '2' },
						      { 'guid': '4', 'name': 'Some mailbox', 'folder': '4', priority: 5 }
    ]);

    amazon = CoreOI.store.find(CoreOI.Mailbox, 1);
    someMailbox = CoreOI.store.find(CoreOI.Mailbox, 4);
  },

  teardown:function(){

  }
});

test("isBlockable",function(){
       OI.mailboxController.set('content',amazon);
       ok(OI.mailboxController.get('isBlockable'),"Returns true if the mailbox is blockable");

       OI.mailboxController.set('content',someMailbox);
       ok(!OI.mailboxController.get('isBlockable'),"Returns false if the mailbox is unblockable");

       OI.mailboxController.set('content',null);
       ok(!OI.mailboxController.get('isBlockable'),"Returns false if no mailbox is selected");
     });
