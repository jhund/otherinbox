// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

Refresher = {};

Refresher.sendRefreshRequest = function(params,notifyParams) {
  var request = SC.Request.getUrl('/refresh');
  notifyParams = notifyParams || {};
  notifyParams.handlerFunction = Refresher.handleRefresh;
  notifyParams.target = Refresher;
  OIXHR.prepAndSendRequest(request,params,notifyParams);
  return request;
};

Refresher.handleRefresh = function(source,params) {    
  // if (OIXHR.requestIsSuccessful(request)) {
    // console.log(source);

    Refresher.processJson(source,params);

    if (params && params.completionFuncton) {
      params.completionFuncton(source,params);
    }
  // } else {
  //   console.warn("Have not ported retry code yet");
  //   // TODO make sure the completion function gets called if retries are exhausted
  // }
};

Refresher.processJson = function(json,params,startup) {
  // unfortunately, XMLHttpRequest automatically follows 302s, so we can't just check for 302 status;
  // we have to have the server indicate that we need to signin in order to do things cleanly

  if (json.signedOut) {
    window.open('/signin','_self');
    return;
  }
  
  var currentAt = new Date(json.currentAt) ;
  CoreOI.lastUpdatedAt = currentAt ;
  
  if (params.query) {
    // console.log('setting query updatedAt');
    params.query.set('updatedAt', currentAt) ;
  }
  
  var totalRecordCount = this._processRecordHashes(json);
  totalRecordCount += this._processFlashRecords(json.flash);
  
  if (startup) {
    this._parseStartupData(json);
  }
  
  CoreOI.propertyDidChange('lastUpdatedAt') ;
};

Refresher.run = 0 ;
Refresher._processRecordHashes = function(hashes) {
  var benchKey = 'Refresher._processRecordHashes [%@]'.fmt(Refresher.run) ;
  console.log(hashes);
  SC.Benchmark.start(benchKey) ;
  var recordLen, changedObject, deletedObject, records, recordTypeIdx,
      recordHash, recordType, classObject, recordTypesIdx, recordIdx ;
  var totalRecordCount = 0 ;
  var recordTypes = hashes.recordTypes, storeKey, guid, success ;
  var currentAt = CoreOI.lastUpdatedAt, store = CoreOI.store ;
  
  if (recordTypes) {
    recordTypesIdx = recordTypes.length;
    
    while (recordTypesIdx--) {
      recordType = recordTypes[recordTypesIdx];
      classObject = CoreOI[recordType];
      
      records = hashes.created[recordType];
      if (records) {
        recordIdx = records.length;
        totalRecordCount += recordIdx;
        
        while (recordIdx--) {
          recordHash = records[recordIdx];
          recordHash.updatedAt = currentAt ;
          guid = recordHash.guid ;
          
          success = store.pushRetrieve(classObject, guid, recordHash) ;
          // if (!success) console.log('failed to insert %@:%@ with %@'.fmt(classObject, guid, SC.json.encode(recordHash)));
        }
      }
      
      // TODO: no need to separate "created" from "changed" in SC 1.0
      records = hashes.changed[recordType];
      if (records) {
        recordIdx = records.length;
        totalRecordCount += recordIdx;
        
        while (recordIdx--) {
          recordHash = records[recordIdx];
          recordHash.updatedAt = currentAt ;
          guid = recordHash.guid ;
          
          success = store.pushRetrieve(classObject, guid, recordHash) ;
          // if (!success) console.log('failed to update %@:%@ with %@'.fmt(classObject, guid, SC.json.encode(recordHash)));
        }
      }
      
      records = hashes.deleted[recordType];
      if (records) {
        recordIdx = records.length;
        totalRecordCount += recordIdx;
        
        while (recordIdx--) {
          success = store.pushDestroy(classObject, records[recordIdx].guid) ;
          // if (!success) console.log('failed to delete %@:%@ with %@'.fmt(classObject, guid, SC.json.encode(recordHash)));
        }
      }
    }
  }
  SC.Benchmark.end(benchKey) ;
  console.log(SC.Benchmark.report(benchKey)) ;
  Refresher.run++;
  console.log('Processed %@ records'.fmt(totalRecordCount));
  return totalRecordCount;
};

Refresher._parseStartupData = function(hashes) {
  // 
  //   if (location.hash !== "") {
  //     // anything the user has asked for in the route overrides what the server suggested
  //     var routeComponents = location.hash.split(/\//);
  //     OI.startupFolderName = decodeURI(routeComponents[0].replace(/#/,''));
  // 
  //     if (routeComponents[1] !== undefined) {
  //       OI.startupMailboxName = decodeURI(routeComponents[1]);
  //       OI.startupMessageGuid = routeComponents[2];
  //     }
  // 
  //   }
  // 
  //   if (hashes.selectFolderGuid) { 
  //     // if the initial refresh includes a folder and mailbox, we need to find them and make sure they know 
  //     // they've been preloaded, even if that's not what we show to the user first
  //     // TODO during the initial startup, we should be passing the route components back to the server
  //     // so selectMailboxGuid and selectFolderGuid match what the user asked for, which will save an extra two Ajax requests
  // 
  //     OI.startupFolder = OI.Folder.find(hashes.selectFolderGuid);
  // 
  //     if (hashes.selectMailboxGuid) { 
  //       OI.startupMailbox = OI.Mailbox.find(hashes.selectMailboxGuid); 
  //     }
  // 
  //     // configure object internals to avoid initial Ajax requests, since 
  //     if (OI.startupFolder) { OI.startupFolder.reloadMailboxes(lastUpdatedAt);  }
  //     if (OI.startupMailbox) { OI.startupMailbox.reloadMessages(lastUpdatedAt); }
  // 
  //     // at this point, there may be a startupFolderName/startupMailboxName that are different from startupFolder/startupMailbox
  //     // we let the controller sort it out

  // push this onto completedRequests so startup time gets measured
  // OI._reportCompletedRequest('/refresh?type=startup',transport.issuedAt,transport);

  // OI._initialFlashRecords = hashes.flash; // because the DOM is not ready to show these yet until startup is all done

  if (hashes.authenticityToken) {
    CoreOI._rails_auth_token = hashes.authenticityToken;
  }

};
 
Refresher._processFlashRecords = function(flashRecords) {
  var count = 0;

  if (flashRecords) {
    var recordIdx = flashRecords.length;
    count = recordIdx;
  
    while(recordIdx--) {
      // OI.flashController.addMessage(OI.FlashMessage.newRecord(flashRecords[recordIdx]));
    }
  }
  return count;
};

Refresher._updateUser = function(currentAt) {
  var user = OI.userController.get('content');
  
  if (user) {
    // console.log('updating user object\'s lastUpdateAt');
    var lastUpdatedAt = new Date(currentAt);
    user.set('lastUpdatedAt',lastUpdatedAt);
  }
};