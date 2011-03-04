htmlbody("<style>.sc-main{display:none}</style>");

//var inbox,saved,deleted,unblockable;

module("Folder controller",{
  setup:function(){
    CoreOI.store.reset();

    folderStoreKeys = CoreOI.store.loadRecords(CoreOI.Folder, [
      {"name": "Inbox", "guid": "1", "icon": "mailbox-inbox", "count": 10, "inboxable": false, "deleteable": true, "blockable": true, "saveable": true, "mailboxes": ['1','2'] },
      {"name": "Saved", "guid": "2", "icon": "mailbox-saved", "inboxable": true, "deleteable": true, "blockable": true, "saveable": false, "mailboxes": ['3'] },
      {"name": "Deleted", "guid": "3", "icon": "mailbox-trash", "inboxable": true, "deleteable": false, "blockable": true, "saveable": true, "mailboxes": [] },
      {"name": "Unblockable", "guid": "4", "icon": "mailbox-trash", "inboxable": true, "deleteable": true, "blockable": false, "saveable": true, "mailboxes": ['4'] }
    ]);

    inbox = CoreOI.store.find(CoreOI.Folder, 1);
    saved = CoreOI.store.find(CoreOI.Folder, 2);
    deleted = CoreOI.store.find(CoreOI.Folder, 3);
    unblockable = CoreOI.store.find(CoreOI.Folder, 4);

    var mailboxStoreKeys = CoreOI.store.loadRecords(CoreOI.Mailbox, [
      { 'guid': '1', 'name': 'Amazon', 'folder': '1' },
      { 'guid': '2', 'name': 'Ebay', 'folder': '1' },
      { 'guid': '3', 'name': 'Craigslist', 'folder': '2' },
      { 'guid': '4', 'name': 'Some mailbox', 'folder': '4' }
    ]);
  },

  teardown:function(){

  }
});

test("content",function(){
       OI.folderController.set('content',inbox);
       equals(OI.folderController.get('content'),inbox,
	      "Should be able to set/retrieve content");
     });

test("inboxable",function(){
       // Both inbox and saved have mailboxes
       OI.folderController.set('content',inbox);
       ok(!OI.folderController.get('isInboxable'),"Returns false when the selection doesn't allow that");

       OI.folderController.set('content',saved);
       ok(OI.folderController.get('isInboxable'),"Returns true when the selection does allow that");
     });

test("deleteable",function(){
       OI.folderController.set('content',deleted);
       ok(!OI.folderController.get('isDeleteable'),"Returns false when the selection doesn't allow that");

       OI.folderController.set('content',unblockable);
       ok(OI.folderController.get('isDeleteable'),"Returns true when the selection does allow that");
     });

test("saveable",function(){
       OI.folderController.set('content',saved);
       ok(!OI.folderController.get('isSaveable'),"Returns false when the selection doesn't allow that");

       OI.folderController.set('content',inbox);
       ok(OI.folderController.get('isSaveable'),"Returns true when the selection does allow that");
     });

test("blockable",function(){
       OI.folderController.set('content',unblockable);
       ok(!OI.folderController.get('isBlockable'),"Returns false when the selection doesn't allow that");

       OI.folderController.set('content',inbox);
       ok(OI.folderController.get('isBlockable'),"Returns true when the selection does allow that");
     });

test("no mailboxes",function(){
       OI.folderController.set('content',deleted);
       ok(!OI.folderController.get('isInboxable'),"No properties should be true for a mailboxless folder");
       ok(!OI.folderController.get('isDeleteable'),"No properties should be true for a mailboxless folder");
       ok(!OI.folderController.get('isSaveable'),"No properties should be true for a mailboxless folder");
       ok(!OI.folderController.get('isBlockable'),"No properties should be true for a mailboxless folder");
     });
