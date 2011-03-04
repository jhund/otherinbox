htmlbody("<style>.sc-main{display:none}</style>");

var lastRequest=null;

module("Refresher",{
  setup:function(){
    SC.Request.prototype.send=function(params){
      lastRequest={
	request:this,
	params:params
      };
      return this;
    };
    
    lastRequest={};
  },

  teardown:function(){

  }
});

test("sendRefreshRequest",function(){
       var req=Refresher.sendRefreshRequest({foo:'bar'},null);
       
       ok(req.address.match("^/refresh"),"should set the address");
       equals(req.type,"GET","should set the type on the req");

       equals(req.notifyParams.handlerFunction,Refresher.handleRefresh,
	     "Set the handler for the request");
});

test("processJson",function(){
       var openedUrl="";
       window.open=function(url){openedUrl=url;};
       
       Refresher.processJson({signedOut:true});
       equals(openedUrl,"/signin",
	      "Should redirect to signin if we're not already.");
});