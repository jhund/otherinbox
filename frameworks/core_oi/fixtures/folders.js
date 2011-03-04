// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

sc_require('models/folder');

CoreOI.Folder.FIXTURES = [

{
    "name": "Inbox",
    "guid": "1",
    "icon": "mailbox-inbox",
    "count": 10,
    "inboxable": false,
    "deleteable": true,
    "blockable": true,
    "saveable": true,
    "lastUpdatedAt": Date.now(),
    "updatedAt": Date.now()
},
{
    "name": "Saved",
    "guid": "2",
    "icon": "mailbox-saved",
    "count": "",
    "inboxable": true,
    "deleteable": true,
    "blockable": true,
    "saveable": false,
    "lastUpdatedAt": Date.now(),
    "updatedAt": Date.now()
},
{
    "name": "Deleted",
    "guid": "3",
    "icon": "mailbox-trash",
    "count": "",
    "inboxable": true,
    "deleteable": false,
    "blockable": true,
    "saveable": true,
    "lastUpdatedAt": Date.now(),
    "updatedAt": Date.now()
},
{
    "name": "Sent",
    "guid": "4",
    "icon": "mailbox-sent",
    "count": "",
    "inboxable": true,
    "deleteable": true,
    "blockable": true,
    "saveable": true,
    "lastUpdatedAt": Date.now(),
    "updatedAt": Date.now()
},
{
    "name": "Blocked",
    "guid": "5",
    "icon": "mailbox-blocked",
    "count": "",
    "inboxable": true,
    "deleteable": true,
    "blockable": false,
    "saveable": true,
    "lastUpdatedAt": Date.now(),
    "updatedAt": Date.now()
}

];