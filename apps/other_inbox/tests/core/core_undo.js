htmlbody("<style>.sc-main{display:none}</style>");

module("Folder controller",{
  setup:function(){
    folderStoreKeys = CoreOI.store.loadRecords(CoreOI.Folder, [
      {"name": "Inbox", "guid": "1", "icon": "mailbox-inbox", "count": 10, "inboxable": false, "deleteable": true, "blockable": true, "saveable": true, "mailboxes": [] }
    ]);

    inbox = CoreOI.store.find(CoreOI.Folder, 1);
  },

  teardown:function(){

  }
});

test("pushUndo",function(){
       OI.folderController.set('content',inbox);
       CoreOI.pushUndo('/example',{foo:'bar'},'post',{});
       ok(OI.undoManager.undoStack.actions.length>0,
	  "There should be something on the undo stack");
     });
