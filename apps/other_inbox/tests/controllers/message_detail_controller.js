htmlbody("<style>.sc-main{display:none}</style>");

module("Message detail controller",{
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
      { guid: '1', subject: 'Amazon msg 1', mailbox: '1', priority: 3, unread: '1', has_attachments: '1' },
      { guid: '2', subject: 'Amazon msg 2', mailbox: '1', priority: 5, unread: '0', has_attachments: '0' },
      { guid: '3', subject: 'Craigslist msg 1', mailbox: '2', priority: 2, unread: '0', tagList:'foo, bar' },
      { guid: '4', subject: 'Craigslist msg 2', mailbox: '2', priority: 2, unread: '0', tagList:'foo, baz' }
    ]);

    amazon = CoreOI.store.find(CoreOI.Mailbox,1);
    craigs = CoreOI.store.find(CoreOI.Mailbox,2);

    amazon1 = CoreOI.store.find(CoreOI.Message,1);
    amazon2 = CoreOI.store.find(CoreOI.Message,2);

    craigs1 = CoreOI.store.find(CoreOI.Message,3);
    craigs2 = CoreOI.store.find(CoreOI.Message,4);
  },

  teardown:function(){

  }
});

test("hasAttachments",function(){
       OI.messageDetailController.set('content',[amazon1]);
       ok(OI.messageDetailController.get('hasAttachments'),"Returns true if one message is selected, with an attachment");

       OI.messageDetailController.set('content',[amazon2]);
       ok(!OI.messageDetailController.get('hasAttachments'),"Returns false if one message is selected, without an attachment");

       OI.messageDetailController.set('content',[amazon1,amazon2]);
       ok(!OI.messageDetailController.get('hasAttachments'),"Returns false if many messages are selected");

       OI.messageDetailController.set('content',[]);
       ok(!OI.messageDetailController.get('hasAttachments'),"Returns false if no messages are selected");
     });

/* // Deferred because we're not sure what .each is in messageDetailController.activeTags
test("activeTags",function(){
       OI.messageDetailController.set('content',new Array(craigs1,craigs2));
       equals(OI.messageDetailController.get('activeTags'),['foo'],"For many messages, intersection of tag list");
     });
//*/
