htmlbody("<style>.sc-main{display:none}</style>");

var lastRequest=null;

module("OIXHR",{
  setup:function(){
    SC.Request.prototype.send=function(params){
      lastRequest={
	request:this,
	params:params
      };
      return this;
    };
    
    lastRequest={};
    CoreOI._rails_auth_token='dummyauthtoken';
    
    OIXHR._reportCompletedRequest=function(){};
  },

  teardown:function(){

  }
});

test("sendPost",function(){
       OIXHR.sendPost("/example",{foo:'bar'},null);
       var req=lastRequest;
       
       equals(req.request.address,"/example","should set the address on the req");
       equals(req.request.type,"POST","should set the type on the req");
       
       equals(req.params.foo,"bar","should set the param I asked for");
       equals(req.params.advanced,true,"should set advanced");
       equals(req.params.authenticity_token,'dummyauthtoken',"should set auth token");
       ok(req.params.version!=null,"Should set version to something");
});

test("sendPut",function(){
       OIXHR.sendPut("/example",{foo:'bar'},null);
       var req=lastRequest;
       
       equals(req.request.address,"/example","should set the address on the req");
       equals(req.request.type,"PUT","should set the type on the req");
       
       equals(req.params.foo,"bar","should set the param I asked for");
       equals(req.params.advanced,true,"should set advanced");
       equals(req.params.authenticity_token,'dummyauthtoken',"should set auth token");
       ok(req.params.version!=null,"Should set version to something");       
});

test("sendDelete",function(){
       OIXHR.sendDelete("/example",{foo:'bar'},null);
       var req=lastRequest;
       
       equals(req.request.address,"/example","should set the address on the req");
       equals(req.request.type,"DELETE","should set the type on the req");
       
       equals(req.params.foo,"bar","should set the param I asked for");
       equals(req.params.advanced,true,"should set advanced");
       equals(req.params.authenticity_token,'dummyauthtoken',"should set auth token");
       ok(req.params.version!=null,"Should set version to something");       
});

test("pendingRequests",function(){
       var startPending = OIXHR._pendingRequests.length;
       
       var request = OIXHR.sendPost('/example',{},{});
       
       var afterSendPending = OIXHR._pendingRequests.length;
       
       OIXHR.completeRequest(request);
 
       var endPending = OIXHR._pendingRequests.length;
       
       equals(afterSendPending, startPending+1,
	 "should add a pending one when I send");

       equals(endPending, startPending,
	 "should remove a pending one when it completes");
});