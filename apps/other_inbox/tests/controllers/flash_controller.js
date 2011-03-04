htmlbody("<style>.sc-main{display:none}</style>");

module("Flash controller",{
  setup:function(){
  },

  teardown:function(){

  }
});

test("firstMessage",function(){
       CoreOI.makeGeneralFlash('foo');
       equals(OI.flashController.get('firstMessage').get('message'),'foo',
	      "After I post a message, it should be the firstMessage");
});
