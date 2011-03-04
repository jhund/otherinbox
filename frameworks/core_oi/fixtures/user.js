// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

sc_require('models/user');

CoreOI.User.FIXTURES = [

  { guid: 1,
    type: 'User',
    login: "demouser",
    name: "John Smith",
    preferences: null,
    admin: true,
    invitationsRemaining: 2,
    state: 'completed',
    subscriptions: 'TaggingService PremiumService'.w(),
    lastUpdatedAt: Date.now()
  }

];