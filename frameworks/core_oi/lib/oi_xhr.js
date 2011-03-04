// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

OIXHR = {
  _pendingRequests: [],
  _completedRequests: [],
  _isMeasuring: false
};

OIXHR.requestIsSuccessful = function(request) {
  alert("OI.requestIsSuccessful() is not statechart-enabled. Skipping.") ;
  return ;
  
  if (!request) { throw("Not a valid request"); }
  var status = request.rawResponse.status;
  return (status && status >= 200 && status < 300);
};

OIXHR.sendPost = function(url,body,notifyParams) {
  var request = SC.Request.postUrl(url);
  this.prepAndSendDestructiveRequest(request,body,notifyParams);
  return request;
};

OIXHR.sendPut = function(url,body,notifyParams) {
  var request = SC.Request.putUrl(url);
  this.prepAndSendDestructiveRequest(request,body,notifyParams);
  return request;
};

OIXHR.sendDelete = function(url,body,notifyParams) {
  var request = SC.Request.deleteUrl(url);
  this.prepAndSendDestructiveRequest(request,body,notifyParams);
  return request;
};

OIXHR.prepAndSendDestructiveRequest = function(request,params,notifyParams) {
  params.authenticity_token = CoreOI._rails_auth_token;
  this.prepAndSendRequest(request,params,notifyParams);
};

OIXHR.prepAndSendRequest = function(request,params,notifyParams) {
  params = params || {};
  params.version = CoreOI.version;
  
  var lastUpdatedAt = OI.userController.get('lastUpdatedAt');
  
  if (lastUpdatedAt) {
    params.user_updated_at = lastUpdatedAt.toJSON();
  }
  
  params.advanced = true;

  request.set('isJSON',true);
  request.set('tries',1);

  if (request.get('type') === 'GET') {
    this._appendQueryString(request,params);
  }

  request.notify(this,'_completeRequest',notifyParams);

  if (CoreOI.serverMode) {
    var startTime = new Date().getTime();
    request.send(params);
    OIXHR.addPendingRequest(request,startTime);
  } else {
    console.info("Ajax %@ request to %@ with options %@".fmt(request.get('type'),request.get('address'),params));
  }
};

OIXHR._completeRequest = function(source,params) {
  if (params.handlerFunction) {
    params.handlerFunction.call(params.target, source.get('response'),params);
  }
  // OIXHR.completeRequest(request);
};

OIXHR.sendPerformanceReports = function() {  
  var length = CoreOI._completedRequests.length;
  
  if (length > 0 && !CoreOI._isMeasuring) {

    CoreOI._isMeasuring = true;
    // Fire off one request to measure latency; when that succeeds, fire off another with the report

    var notifyParams = { pingStart: new Date().getTime() };

    var request = SC.Request.getUrl('/refresh?type=ping');
    request.notify(this,'_finishPingMeasurement',notifyParams);
    request.send();
  }
};

OIXHR._appendQueryString = function(request,params) {
  // very simple, does not handle arrays or objects, just takes a hashes of simple values
  var name,queryString = [],address = request.get('address');
  for (name in params) {
    if (params.hasOwnProperty(name)) {
      queryString.push("%@=%@".fmt(name,params[name]));
    }
  }
  request.set('address',[address,queryString.join('&')].join('?'));
};

OIXHR._finishPingMeasurement = function(request,source,params) {
  var pingDuration = new Date().getTime() - params.pingStart;
  
  if (OIXHR.requestIsSuccessful(request)) {  
    var user = OI.userController.get('content');
    var parameters = { performanceMeasurements: OI._completedRequests.toJSON(),
                       userID: user ? user.get('guid') : null,
                       version: CoreOI.version,
                       pingDuration: pingDuration };

    var newRequest = SC.Request.postUrl('/performance_reports');
    newRequest.notify(this,'_finishSendingPerformanceReports');
    newRequest.send();

  } else {
    console.warn("Unable to send performance report due to ping response %@".fmt(request.get('rawResponse')));
    OI._isMeasuring = false;
  }
};

OIXHR._finishSendingPerformanceReports = function(request,source,params) {
  if (OIXHR.requestIsSuccessful(request)) {  
    OI._completedRequests.splice(0,length);
  } else {
   console.warn("Received error %@ when sending performance report".fmt(request.get('rawResponse')));
  }

  OI._isMeasuring = false;
};
  
OIXHR.addPendingRequest = function(request,issuedAt) {
  this._pendingRequests.push({ request: request, issuedAt: issuedAt });
};
  
OIXHR._reportCompletedRequest = function(url,issuedAt,request) {
  report = { url: url, 
             requestIssuedAt: issuedAt, 
             requestCompletedAt: new Date().getTime(), 
             status: request.rawResponse.status, 
             length: null,
             jsonProcessStart: transport.jsonProcessStart,
             totalRecordCount: transport.totalRecordCount };

  this._completedRequests.push(report);
};

// OIXHR.completeRequest = function(request) {
//   var pendingRequest,completedRequest;
//   var idx = OIXHR._pendingRequests.length;
// 
//   while (idx--) {
//     pendingRequest = OIXHR._pendingRequests[idx];
//     if (pendingRequest.request === request) {
//       this._reportCompletedRequest(pendingRequest.request.get('address'),
//           pendingRequest.issuedAt,request);
//       this._pendingRequests.splice(idx,1);
//       break;
//     }
//   } 
// };