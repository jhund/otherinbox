htmlbody("<style>.sc-main{display:none}</style>");

var amazon,craigs;
var amazon1,amazon2;

module("Messages controller",{
  setup:function(){
    CoreOI.store.reset();

    CoreOI.store.loadRecords(CoreOI.Folder,[
      { 'guid': '1', 'name': 'Inbox', mailboxes: [1,2,3] }
    ]);

    CoreOI.store.loadRecords(CoreOI.Mailbox,[
      { guid: '1', name: 'Amazon', folder: '1', priority: 3, 'messages':[1,2] },
      { guid: '2', name: 'Craigslist', folder: '1', priority: 3, 'messages':[3,4] }
    ]);

    CoreOI.store.loadRecords(CoreOI.Message, [
      { guid: '1', subject: 'Amazon msg 1', mailbox: '1', priority: 3, unread: '1' },
      { guid: '2', subject: 'Amazon msg 2', mailbox: '1', priority: 5, unread: '0' },
      { guid: '3', subject: 'Craigslist msg 1', mailbox: '2', priority: 2, unread: '0' },
      { guid: '4', subject: 'Craigslist msg 2', mailbox: '2', priority: 2, unread: '0' }
    ]);

    amazon = CoreOI.store.find(CoreOI.Mailbox,1);
    craigs = CoreOI.store.find(CoreOI.Mailbox,2);

    amazon1 = CoreOI.store.find(CoreOI.Message,1);
    amazon2 = CoreOI.store.find(CoreOI.Message,2);
  },

  teardown:function(){

  }
});

test("someUnread",function(){
       OI.messagesController.set('content',amazon.get('messages'));
       ok(OI.messagesController.get('someUnread'),"Returns true if at least one message is unread");

       OI.messagesController.set('content',craigs.get('messages'));
       ok(!OI.messagesController.get('someUnread'),"Returns false if there are no unread messages");

       OI.mailboxController.set('content',null);
       ok(!OI.messagesController.get('someUnread'),"Returns false if no mailbox is selected");
     });

test("noneUnread",function(){
       OI.messagesController.set('content',amazon.get('messages'));
       ok(!OI.messagesController.get('noneUnread'),"Returns false if at least one message is unread");

       OI.messagesController.set('content',craigs.get('messages'));
       ok(OI.messagesController.get('noneUnread'),"Returns true if there are no unread messages");

       OI.mailboxController.set('content',null);
       ok(OI.messagesController.get('noneUnread'),"Returns true if no mailbox is selected");
     });

test("someSelectedUnread",function(){
       OI.messagesController.set('content',amazon.get('messages'));

       OI.messagesController.set('selection',[amazon1]);
       ok(OI.messagesController.get('someSelectedUnread'),"Returns true if one unread message selected");

       OI.messagesController.set('selection',[amazon1,amazon2]);
       ok(OI.messagesController.get('someSelectedUnread'),"Returns true if multiple messages selected, one unread");

       OI.messagesController.set('selection',[amazon2]);
       ok(!OI.messagesController.get('someSelectedUnread'),"Returns false if one message selected, read");

       OI.messagesController.set('selection',[]);
       ok(!OI.messagesController.get('someSelectedUnread'),"Returns false if nothing selected");
     });

test("noneSelectedUnread",function(){
       OI.messagesController.set('content',amazon.get('messages'));

       OI.messagesController.set('selection',[amazon1]);
       ok(!OI.messagesController.get('noneSelectedUnread'),"Returns false if one unread message selected");

       OI.messagesController.set('selection',[amazon1,amazon2]);
       ok(!OI.messagesController.get('noneSelectedUnread'),"Returns true if multiple messages selected, one unread");

       OI.messagesController.set('selection',[amazon2]);
       ok(OI.messagesController.get('noneSelectedUnread'),"Returns true if one message selected, read");

       OI.messagesController.set('selection',[]);
       ok(OI.messagesController.get('noneSelectedUnread'),"Returns true if nothing selected");
     });
